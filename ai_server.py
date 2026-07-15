#!/usr/bin/env python3
"""Local static server plus a small provider-backed API for AI personalization."""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from ai_prompts import (
    DESTINATION_SEARCH_SCHEMA,
    DESTINATION_SEARCH_SYSTEM_PROMPT,
    QUESTION_SCHEMA,
    QUESTION_SYSTEM_PROMPT,
    RESULT_SCHEMA,
    RESULT_SYSTEM_PROMPT,
)


ROOT = Path(__file__).resolve().parent
OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses"
ANTHROPIC_MESSAGES_URL = "https://api.anthropic.com/v1/messages"
PORTKEY_MESSAGES_URL = "https://api.portkey.ai/v1/messages"
DEFAULT_OPENAI_MODEL = "gpt-4o-mini"
DEFAULT_ANTHROPIC_MODEL = "claude-sonnet-4-6"
DEFAULT_PORTKEY_MODEL = "anthropic.claude-haiku-4-5-20251001-v1:0"
DEFAULT_PORTKEY_PROVIDER = "@bedrock-sandbox"
DEFAULT_AI_PROVIDER = "anthropic"
DESTINATION_PHOTO_LIBRARY = [
    {"zh": "福冈", "en": "Fukuoka"},
    {"zh": "台北", "en": "Taipei"},
    {"zh": "新加坡", "en": "Singapore"},
    {"zh": "曼谷", "en": "Bangkok"},
    {"zh": "墨西哥城", "en": "Mexico City"},
    {"zh": "博洛尼亚", "en": "Bologna"},
    {"zh": "清迈", "en": "Chiang Mai"},
    {"zh": "河内", "en": "Hanoi"},
    {"zh": "第比利斯", "en": "Tbilisi"},
    {"zh": "京都", "en": "Kyoto"},
    {"zh": "巴厘岛", "en": "Bali"},
    {"zh": "马拉喀什", "en": "Marrakech"},
    {"zh": "首尔", "en": "Seoul"},
    {"zh": "巴黎", "en": "Paris"},
    {"zh": "伊斯坦布尔", "en": "Istanbul"},
    {"zh": "冲绳", "en": "Okinawa"},
    {"zh": "皇后镇", "en": "Queenstown"},
    {"zh": "雷克雅未克", "en": "Reykjavik"},
]


def load_dotenv() -> None:
    env_path = ROOT / ".env"
    if not env_path.exists():
        return

    for raw_line in env_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        # This is a local development server: an explicit project .env value
        # should win over stale keys inherited from an IDE or shell session.
        os.environ[key] = value


def json_response(handler: SimpleHTTPRequestHandler, status: int, payload: dict) -> None:
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def read_json_body(handler: SimpleHTTPRequestHandler) -> dict:
    length = int(handler.headers.get("Content-Length", "0") or "0")
    if length <= 0 or length > 80_000:
        raise ValueError("Invalid request body size.")
    raw_body = handler.rfile.read(length)
    return json.loads(raw_body.decode("utf-8"))


def build_result_ai_request(payload: dict) -> dict:
    persona = payload.get("persona", {})
    answers = payload.get("answers", [])
    scores = payload.get("scores", {})

    user_payload = {
        "language": payload.get("language", "zh"),
        "basePersona": persona,
        "destinationSearchResult": payload.get("destinationSearchResult") or {},
        "destinationPhotoLibrary": payload.get("destinationPhotoLibrary") or DESTINATION_PHOTO_LIBRARY,
        "scoreSummary": scores,
        "answers": answers,
        "constraints": {
            "maxPersonaSubtypeChars": 18 if payload.get("language") == "zh" else 34,
            "maxVibeLineChars": 34 if payload.get("language") == "zh" else 82,
            "maxResultNoteChars": 92 if payload.get("language") == "zh" else 190,
            "maxSkyscannerTitleChars": 30 if payload.get("language") == "zh" else 76,
            "maxSkyscannerCopyChars": 62 if payload.get("language") == "zh" else 140,
        },
    }

    return {
        "name": "travel_personality_lite_result",
        "systemPrompt": RESULT_SYSTEM_PROMPT,
        "userPrompt": json.dumps(user_payload, ensure_ascii=False),
        "schema": RESULT_SCHEMA,
        "temperature": float(os.environ.get("AI_TEMPERATURE", os.environ.get("OPENAI_TEMPERATURE", "0.8"))),
        "maxOutputTokens": int(
            os.environ.get("AI_MAX_OUTPUT_TOKENS", os.environ.get("OPENAI_MAX_OUTPUT_TOKENS", "900"))
        ),
    }


def build_question_ai_request(payload: dict) -> dict:
    language = payload.get("language", "zh")
    user_payload = {
        "language": language,
        "step": payload.get("step"),
        "totalSteps": payload.get("totalSteps"),
        "currentQuestion": payload.get("question", {}),
        "scoreSummary": payload.get("scores", {}),
        "previousAnswers": payload.get("answers", []),
        "sharedMatchMode": bool(payload.get("sharedMatchMode")),
        "constraints": {
            "maxLabelChars": 8 if language == "zh" else 18,
            "maxTitleChars": 28 if language == "zh" else 78,
            "maxOptionTitleChars": 18 if language == "zh" else 46,
            "maxOptionCopyChars": 26 if language == "zh" else 72,
        },
    }

    return {
        "name": "travel_personality_lite_question",
        "systemPrompt": QUESTION_SYSTEM_PROMPT,
        "userPrompt": json.dumps(user_payload, ensure_ascii=False),
        "schema": QUESTION_SCHEMA,
        "temperature": float(os.environ.get("AI_TEMPERATURE", os.environ.get("OPENAI_TEMPERATURE", "0.8"))),
        "maxOutputTokens": int(
            os.environ.get(
                "AI_QUESTION_MAX_OUTPUT_TOKENS",
                os.environ.get("OPENAI_QUESTION_MAX_OUTPUT_TOKENS", "650"),
            )
        ),
    }


def build_destination_ai_request(payload: dict) -> dict:
    language = payload.get("language", "zh")
    user_payload = {
        "language": language,
        "searchMode": payload.get("searchMode", "inspiration"),
        "tripRequirements": {
            "origin": payload.get("origin", ""),
            "travelWindow": payload.get("travelWindow") or {},
            "durationDays": payload.get("durationDays", 0),
            "travelers": payload.get("travelers", 0),
            "budget": payload.get("budget", ""),
            "hardConstraints": payload.get("hardConstraints") or [],
            "preferences": payload.get("preferences") or [],
        },
        "basePersona": payload.get("persona") or {},
        "scoreSummary": payload.get("scores") or {},
        "answers": payload.get("answers") or [],
        "candidateDestinations": payload.get("candidateDestinations") or [],
        "photoLibrary": payload.get("destinationPhotoLibrary") or DESTINATION_PHOTO_LIBRARY,
        "liveSearchResults": payload.get("liveSearchResults") or [],
        "constraints": {
            "maxSummaryChars": 90 if language == "zh" else 200,
            "maxReasonChars": 38 if language == "zh" else 90,
            "maxTradeoffChars": 42 if language == "zh" else 100,
            "maxClarifyingQuestionChars": 42 if language == "zh" else 110,
        },
    }

    return {
        "name": "travel_personality_destination_search",
        "systemPrompt": DESTINATION_SEARCH_SYSTEM_PROMPT,
        "userPrompt": json.dumps(user_payload, ensure_ascii=False),
        "schema": DESTINATION_SEARCH_SCHEMA,
        "temperature": float(os.environ.get("AI_TEMPERATURE", os.environ.get("OPENAI_TEMPERATURE", "0.8"))),
        "maxOutputTokens": int(
            os.environ.get(
                "AI_DESTINATION_MAX_OUTPUT_TOKENS",
                os.environ.get("OPENAI_DESTINATION_MAX_OUTPUT_TOKENS", "1200"),
            )
        ),
    }


ANTHROPIC_UNSUPPORTED_SCHEMA_KEYS = {
    "exclusiveMaximum",
    "exclusiveMinimum",
    "maxItems",
    "maxLength",
    "maxProperties",
    "maximum",
    "minItems",
    "minLength",
    "minProperties",
    "minimum",
    "multipleOf",
    "uniqueItems",
}


def build_openai_request(prompt_spec: dict) -> dict:
    return {
        "model": os.environ.get("OPENAI_MODEL", DEFAULT_OPENAI_MODEL),
        "input": [
            {"role": "system", "content": prompt_spec["systemPrompt"]},
            {"role": "user", "content": prompt_spec["userPrompt"]},
        ],
        "text": {
            "format": {
                "type": "json_schema",
                "name": prompt_spec["name"],
                "strict": True,
                "schema": prompt_spec["schema"],
            }
        },
        "temperature": prompt_spec["temperature"],
        "max_output_tokens": prompt_spec["maxOutputTokens"],
    }


def transform_schema_for_anthropic(value):
    """Remove constraints unsupported by raw Anthropic structured outputs."""
    if isinstance(value, list):
        return [transform_schema_for_anthropic(item) for item in value]
    if not isinstance(value, dict):
        return value

    transformed = {}
    removed_constraints = []
    for key, item in value.items():
        if key in ANTHROPIC_UNSUPPORTED_SCHEMA_KEYS:
            removed_constraints.append(f"{key}={item}")
            continue
        transformed[key] = transform_schema_for_anthropic(item)

    if removed_constraints:
        existing_description = str(transformed.get("description", "")).strip()
        constraint_note = f"Application constraints: {', '.join(removed_constraints)}."
        transformed["description"] = f"{existing_description} {constraint_note}".strip()

    return transformed


def build_anthropic_request(prompt_spec: dict) -> dict:
    return {
        "model": os.environ.get("ANTHROPIC_MODEL", DEFAULT_ANTHROPIC_MODEL),
        "max_tokens": prompt_spec["maxOutputTokens"],
        "temperature": prompt_spec["temperature"],
        "system": prompt_spec["systemPrompt"],
        "messages": [{"role": "user", "content": prompt_spec["userPrompt"]}],
        "output_config": {
            "format": {
                "type": "json_schema",
                "schema": transform_schema_for_anthropic(prompt_spec["schema"]),
            }
        },
    }


def build_portkey_request(prompt_spec: dict) -> dict:
    request_body = build_anthropic_request(prompt_spec)
    request_body["model"] = os.environ.get("PORTKEY_MODEL", DEFAULT_PORTKEY_MODEL)
    return request_body


def extract_openai_response_text(data: dict) -> str:
    if isinstance(data.get("output_text"), str):
        return data["output_text"]

    for item in data.get("output", []):
        for content in item.get("content", []):
            text = content.get("text")
            if isinstance(text, str):
                return text

    raise ValueError("OpenAI response did not include text output.")


def extract_anthropic_response_text(data: dict) -> str:
    stop_reason = data.get("stop_reason")
    if stop_reason == "max_tokens":
        raise ValueError("Claude reached max_tokens before completing structured output.")
    if stop_reason == "refusal":
        raise ValueError("Claude refused the request.")

    for content in data.get("content", []):
        if content.get("type") == "text" and isinstance(content.get("text"), str):
            return content["text"]

    raise ValueError("Claude response did not include text output.")


def post_json(url: str, request_body: dict, headers: dict, provider: str) -> dict:
    request_headers = {
        "Accept": "application/json",
        "User-Agent": "TravelPersonalityDemo/1.0",
        **headers,
    }
    request = urllib.request.Request(
        url,
        data=json.dumps(request_body, ensure_ascii=False).encode("utf-8"),
        method="POST",
        headers=request_headers,
    )

    timeout = float(os.environ.get("AI_REQUEST_TIMEOUT_SECONDS", "90"))
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return {"ok": True, "data": json.loads(response.read().decode("utf-8"))}
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        return {
            "ok": False,
            "error": f"{provider}_http_error",
            "status": exc.code,
            "message": detail[:1200],
        }
    except (urllib.error.URLError, TimeoutError) as exc:
        return {
            "ok": False,
            "error": f"{provider}_network_error",
            "message": str(exc),
        }


def validate_schema_value(value, schema: dict, path: str = "result") -> None:
    expected_type = schema.get("type")
    type_matches = {
        "object": isinstance(value, dict),
        "array": isinstance(value, list),
        "string": isinstance(value, str),
        "integer": isinstance(value, int) and not isinstance(value, bool),
        "number": isinstance(value, (int, float)) and not isinstance(value, bool),
        "boolean": isinstance(value, bool),
    }
    if expected_type in type_matches and not type_matches[expected_type]:
        raise ValueError(f"{path} must be {expected_type}.")

    if "enum" in schema and value not in schema["enum"]:
        raise ValueError(f"{path} must be one of {schema['enum']}.")

    if expected_type == "object":
        properties = schema.get("properties", {})
        missing = [key for key in schema.get("required", []) if key not in value]
        if missing:
            raise ValueError(f"{path} is missing required fields: {', '.join(missing)}.")
        if schema.get("additionalProperties") is False:
            extras = [key for key in value if key not in properties]
            if extras:
                raise ValueError(f"{path} includes unsupported fields: {', '.join(extras)}.")
        for key, item in value.items():
            if key in properties:
                validate_schema_value(item, properties[key], f"{path}.{key}")

    if expected_type == "array":
        if len(value) < schema.get("minItems", 0):
            raise ValueError(f"{path} has too few items.")
        if "maxItems" in schema and len(value) > schema["maxItems"]:
            raise ValueError(f"{path} has too many items.")
        item_schema = schema.get("items")
        if item_schema:
            for index, item in enumerate(value):
                validate_schema_value(item, item_schema, f"{path}[{index}]")

    if expected_type == "integer" and "minimum" in schema and value < schema["minimum"]:
        raise ValueError(f"{path} must be at least {schema['minimum']}.")


def parse_structured_result(data: dict, text_extractor, provider: str, schema: dict) -> dict:
    try:
        result = json.loads(text_extractor(data))
        validate_schema_value(result, schema)
    except (json.JSONDecodeError, ValueError) as exc:
        return {
            "ok": False,
            "error": "invalid_ai_response",
            "provider": provider,
            "message": str(exc),
        }
    return {"ok": True, "provider": provider, "result": result}


def call_openai(prompt_spec: dict) -> dict:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key or api_key == "sk-your-api-key":
        return {
            "ok": False,
            "error": "missing_api_key",
            "message": "Set OPENAI_API_KEY in your environment or a local .env file.",
        }

    response = post_json(
        OPENAI_RESPONSES_URL,
        build_openai_request(prompt_spec),
        {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        "openai",
    )
    if not response.get("ok"):
        return response
    return parse_structured_result(
        response["data"],
        extract_openai_response_text,
        "openai",
        prompt_spec["schema"],
    )


def call_anthropic(prompt_spec: dict) -> dict:
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key or api_key == "sk-ant-your-api-key":
        return {
            "ok": False,
            "error": "missing_api_key",
            "message": "Set ANTHROPIC_API_KEY in your environment or a local .env file.",
        }

    response = post_json(
        ANTHROPIC_MESSAGES_URL,
        build_anthropic_request(prompt_spec),
        {
            "x-api-key": api_key,
            "anthropic-version": os.environ.get("ANTHROPIC_VERSION", "2023-06-01"),
            "Content-Type": "application/json",
        },
        "anthropic",
    )
    if not response.get("ok"):
        return response
    return parse_structured_result(
        response["data"],
        extract_anthropic_response_text,
        "anthropic",
        prompt_spec["schema"],
    )


def call_portkey(prompt_spec: dict) -> dict:
    # Keep a temporary fallback for the existing local .env where the Portkey
    # key was previously placed under ANTHROPIC_API_KEY.
    api_key = os.environ.get("PORTKEY_API_KEY") or os.environ.get("ANTHROPIC_API_KEY")
    if not api_key or api_key in {"pc-your-portkey-key", "your-portkey-api-key"}:
        return {
            "ok": False,
            "error": "missing_api_key",
            "message": "Set PORTKEY_API_KEY in your environment or a local .env file.",
        }

    provider = os.environ.get("PORTKEY_PROVIDER", DEFAULT_PORTKEY_PROVIDER)
    response = post_json(
        os.environ.get("PORTKEY_BASE_URL", PORTKEY_MESSAGES_URL),
        build_portkey_request(prompt_spec),
        {
            "x-portkey-api-key": api_key,
            "x-portkey-provider": provider,
            "Content-Type": "application/json",
        },
        "portkey",
    )
    if not response.get("ok"):
        return response
    return parse_structured_result(
        response["data"],
        extract_anthropic_response_text,
        "portkey",
        prompt_spec["schema"],
    )


def call_ai(payload: dict, prompt_builder=build_result_ai_request) -> dict:
    provider = os.environ.get("AI_PROVIDER", DEFAULT_AI_PROVIDER).strip().lower()
    prompt_spec = prompt_builder(payload)

    if provider == "anthropic":
        return call_anthropic(prompt_spec)
    if provider == "portkey":
        return call_portkey(prompt_spec)
    if provider == "openai":
        return call_openai(prompt_spec)

    return {
        "ok": False,
        "error": "unsupported_ai_provider",
        "message": f"Unsupported AI_PROVIDER: {provider}. Use portkey, anthropic or openai.",
    }


class TravelPersonalityHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_OPTIONS(self) -> None:
        if self.path in {
            "/api/generate-result",
            "/api/personalize-question",
            "/api/search-destinations",
        }:
            self.send_response(HTTPStatus.NO_CONTENT)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            self.end_headers()
            return
        json_response(self, HTTPStatus.NOT_FOUND, {"ok": False, "error": "not_found"})

    def do_POST(self) -> None:
        prompt_builders = {
            "/api/generate-result": build_result_ai_request,
            "/api/personalize-question": build_question_ai_request,
            "/api/search-destinations": build_destination_ai_request,
        }
        if self.path not in prompt_builders:
            json_response(self, HTTPStatus.NOT_FOUND, {"ok": False, "error": "not_found"})
            return

        try:
            payload = read_json_body(self)
        except (ValueError, json.JSONDecodeError) as exc:
            json_response(self, HTTPStatus.BAD_REQUEST, {"ok": False, "error": "bad_request", "message": str(exc)})
            return

        prompt_builder = prompt_builders[self.path]
        result = call_ai(payload, prompt_builder)
        status = HTTPStatus.OK if result.get("ok") else HTTPStatus.SERVICE_UNAVAILABLE
        json_response(self, status, result)


def main() -> int:
    load_dotenv()
    port = int(os.environ.get("PORT", "5173"))
    provider = os.environ.get("AI_PROVIDER", DEFAULT_AI_PROVIDER).strip().lower()
    server = ThreadingHTTPServer(("127.0.0.1", port), TravelPersonalityHandler)
    print(f"Travel Personality AI server running at http://127.0.0.1:{port}")
    print(f"AI provider: {provider}")
    required_keys = {
        "portkey": "PORTKEY_API_KEY",
        "anthropic": "ANTHROPIC_API_KEY",
        "openai": "OPENAI_API_KEY",
    }
    required_key = required_keys.get(provider, "the matching provider API key")
    print(f"Set {required_key} in .env or your shell to enable AI personalization.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server.")
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
