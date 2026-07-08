#!/usr/bin/env python3
"""Local static server plus a tiny OpenAI-backed API for Lite personalization."""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parent
OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses"
DEFAULT_MODEL = "gpt-4o-mini"
DESTINATION_PHOTO_LIBRARY = [
    {"zh": "福冈", "en": "Fukuoka"},
    {"zh": "曼谷", "en": "Bangkok"},
    {"zh": "清迈", "en": "Chiang Mai"},
    {"zh": "京都", "en": "Kyoto"},
    {"zh": "首尔", "en": "Seoul"},
    {"zh": "冲绳", "en": "Okinawa"},
]

RESULT_SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "required": [
        "personaSubtype",
        "vibeLine",
        "destination",
        "resultNote",
        "tags",
        "skyscannerAngle",
        "skyscannerTitle",
        "skyscannerCopy",
        "skyscannerServices",
        "shareCaption",
    ],
    "properties": {
        "personaSubtype": {
            "type": "string",
            "description": "A short, memorable result name in the requested language.",
        },
        "vibeLine": {
            "type": "string",
            "description": "One punchy line that explains the user's travel vibe.",
        },
        "destination": {
            "type": "string",
            "description": "One recommended destination city or region.",
        },
        "resultNote": {
            "type": "string",
            "description": "A concise but specific result paragraph for the result card.",
        },
        "tags": {
            "type": "array",
            "minItems": 3,
            "maxItems": 3,
            "items": {"type": "string"},
        },
        "skyscannerAngle": {
            "type": "string",
            "enum": ["flights", "flight_deals", "hotels", "car_hire"],
        },
        "skyscannerTitle": {
            "type": "string",
            "description": "CTA title for the Skyscanner card.",
        },
        "skyscannerCopy": {
            "type": "string",
            "description": "CTA body copy for Skyscanner, tied to the user's preference.",
        },
        "skyscannerServices": {
            "type": "array",
            "minItems": 3,
            "maxItems": 3,
            "items": {"type": "string"},
        },
        "shareCaption": {
            "type": "string",
            "description": "One shareable caption for Instagram/Xiaohongshu.",
        },
    },
}

QUESTION_SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "required": ["label", "title", "options"],
    "properties": {
        "label": {
            "type": "string",
            "description": "A short label for the current question.",
        },
        "title": {
            "type": "string",
            "description": "The personalized current question title.",
        },
        "options": {
            "type": "array",
            "minItems": 4,
            "maxItems": 4,
            "items": {
                "type": "object",
                "additionalProperties": False,
                "required": ["letter", "title", "copy"],
                "properties": {
                    "letter": {
                        "type": "string",
                        "enum": ["A", "B", "C", "D"],
                    },
                    "title": {
                        "type": "string",
                        "description": "Personalized option title. Must keep the original option meaning.",
                    },
                    "copy": {
                        "type": "string",
                        "description": "Short supporting option copy. Must keep the original option meaning.",
                    },
                },
            },
        },
    },
}

RESULT_SYSTEM_PROMPT = """
You are the AI copywriter for a playful Travel Personality quiz.
Generate a Lite personalized result from the user's quiz answers.

Rules:
- Keep the existing base persona, but make the result feel more specific and shareable.
- Match the requested language exactly: zh means Simplified Chinese, en means English.
- Use a light Skyscanner-adjacent travel-search vibe: compare options, smarter trips, flights, hotels, car hire.
- Keep CTA copy useful and playful; avoid salesy words like unlock, gateway, exclusive, must-book, or their Chinese equivalents such as 解锁 and 入口.
- Do not claim affiliation, discounts, live prices, availability, or booking guarantees.
- Keep copy concise enough for a mobile result card.
- Chinese result names should be memorable internet-style nicknames, not literal explanations.
- The vibeLine field is the small caption under the persona name. Make it a youthful, Xiaohongshu-style meme sentence, like a friend teasing the user's travel habit, not a generic explanation.
- For zh vibeLine, use natural punchy Chinese with light internet humor. Avoid stiff labels such as 美食爱好者, 自由行玩家, or 预算优化者.
- Avoid emojis, hashtags inside fields, markdown, and quotation marks around the whole answer.
- Recommend one realistic destination that fits the persona and answer pattern.
- To keep the result-card photo aligned, prefer a destination from destinationPhotoLibrary when it is a reasonable fit; otherwise use the base persona destination.
""".strip()

QUESTION_SYSTEM_PROMPT = """
You are the adaptive question copywriter for a playful Travel Personality quiz.
Rewrite the current question and its four answer options based on the user's previous answers.

Rules:
- Match the requested language exactly: zh means Simplified Chinese, en means English.
- Keep the same four options, same letters, same order, and same underlying meaning.
- Do not invent new scoring, new destinations, new branches, new services, or live travel facts.
- Make the wording feel like it is reacting to the user's previous choices.
- Keep it concise enough for a mobile quiz card.
- Chinese copy should feel young, clear and Xiaohongshu-friendly, with light meme energy.
- English copy should feel playful, crisp and social-shareable.
- Use a light Skyscanner-adjacent travel-search vibe: compare options, smarter trips, flights, hotels, car hire.
- Avoid salesy words like unlock, gateway, exclusive, must-book, or their Chinese equivalents such as 解锁 and 入口.
- Do not claim affiliation, discounts, live prices, availability, or booking guarantees.
- Avoid emojis, hashtags, markdown, and quotation marks around the whole answer.
""".strip()


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
        os.environ.setdefault(key, value)


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


def build_result_openai_request(payload: dict) -> dict:
    persona = payload.get("persona", {})
    answers = payload.get("answers", [])
    scores = payload.get("scores", {})

    user_payload = {
        "language": payload.get("language", "zh"),
        "basePersona": persona,
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
        "model": os.environ.get("OPENAI_MODEL", DEFAULT_MODEL),
        "input": [
            {"role": "system", "content": RESULT_SYSTEM_PROMPT},
            {
                "role": "user",
                "content": json.dumps(user_payload, ensure_ascii=False),
            },
        ],
        "text": {
            "format": {
                "type": "json_schema",
                "name": "travel_personality_lite_result",
                "strict": True,
                "schema": RESULT_SCHEMA,
            }
        },
        "temperature": float(os.environ.get("OPENAI_TEMPERATURE", "0.8")),
        "max_output_tokens": int(os.environ.get("OPENAI_MAX_OUTPUT_TOKENS", "900")),
    }


def build_question_openai_request(payload: dict) -> dict:
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
        "model": os.environ.get("OPENAI_MODEL", DEFAULT_MODEL),
        "input": [
            {"role": "system", "content": QUESTION_SYSTEM_PROMPT},
            {
                "role": "user",
                "content": json.dumps(user_payload, ensure_ascii=False),
            },
        ],
        "text": {
            "format": {
                "type": "json_schema",
                "name": "travel_personality_lite_question",
                "strict": True,
                "schema": QUESTION_SCHEMA,
            }
        },
        "temperature": float(os.environ.get("OPENAI_TEMPERATURE", "0.8")),
        "max_output_tokens": int(os.environ.get("OPENAI_QUESTION_MAX_OUTPUT_TOKENS", "650")),
    }


def extract_response_text(data: dict) -> str:
    if isinstance(data.get("output_text"), str):
        return data["output_text"]

    for item in data.get("output", []):
        for content in item.get("content", []):
            text = content.get("text")
            if isinstance(text, str):
                return text

    raise ValueError("OpenAI response did not include text output.")


def call_openai(payload: dict, request_builder=build_result_openai_request) -> dict:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        return {
            "ok": False,
            "error": "missing_api_key",
            "message": "Set OPENAI_API_KEY in your environment or a local .env file.",
        }

    request_body = json.dumps(request_builder(payload), ensure_ascii=False).encode("utf-8")
    request = urllib.request.Request(
        OPENAI_RESPONSES_URL,
        data=request_body,
        method="POST",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            data = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        return {
            "ok": False,
            "error": "openai_http_error",
            "status": exc.code,
            "message": detail[:600],
        }
    except (urllib.error.URLError, TimeoutError) as exc:
        return {
            "ok": False,
            "error": "openai_network_error",
            "message": str(exc),
        }

    try:
        result = json.loads(extract_response_text(data))
    except (json.JSONDecodeError, ValueError) as exc:
        return {
            "ok": False,
            "error": "invalid_ai_response",
            "message": str(exc),
        }

    return {"ok": True, "result": result}


class TravelPersonalityHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_OPTIONS(self) -> None:
        if self.path in {"/api/generate-result", "/api/personalize-question"}:
            self.send_response(HTTPStatus.NO_CONTENT)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            self.end_headers()
            return
        json_response(self, HTTPStatus.NOT_FOUND, {"ok": False, "error": "not_found"})

    def do_POST(self) -> None:
        if self.path not in {"/api/generate-result", "/api/personalize-question"}:
            json_response(self, HTTPStatus.NOT_FOUND, {"ok": False, "error": "not_found"})
            return

        try:
            payload = read_json_body(self)
        except (ValueError, json.JSONDecodeError) as exc:
            json_response(self, HTTPStatus.BAD_REQUEST, {"ok": False, "error": "bad_request", "message": str(exc)})
            return

        request_builder = (
            build_question_openai_request
            if self.path == "/api/personalize-question"
            else build_result_openai_request
        )
        result = call_openai(payload, request_builder)
        status = HTTPStatus.OK if result.get("ok") else HTTPStatus.SERVICE_UNAVAILABLE
        json_response(self, status, result)


def main() -> int:
    load_dotenv()
    port = int(os.environ.get("PORT", "5173"))
    server = ThreadingHTTPServer(("127.0.0.1", port), TravelPersonalityHandler)
    print(f"Travel Personality AI server running at http://127.0.0.1:{port}")
    print("Set OPENAI_API_KEY in .env or your shell to enable AI personalization.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server.")
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
