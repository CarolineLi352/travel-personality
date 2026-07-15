#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOCS_DIR="$ROOT_DIR/docs"

required_paths=(
  "index.html"
  "styles.css"
  "script.js"
  "favicon.svg"
  "favicon-32.png"
  "apple-touch-icon.png"
  "assets"
  "vendor"
)

for path in "${required_paths[@]}"; do
  if [[ ! -e "$ROOT_DIR/$path" ]]; then
    echo "Missing required source: $path" >&2
    exit 1
  fi
done

if ! command -v rsync >/dev/null 2>&1; then
  echo "rsync is required to build docs/." >&2
  exit 1
fi

mkdir -p "$DOCS_DIR"

site_files=(
  "index.html"
  "styles.css"
  "script.js"
  "favicon.svg"
  "favicon-32.png"
  "apple-touch-icon.png"
)

for file in "${site_files[@]}"; do
  cp "$ROOT_DIR/$file" "$DOCS_DIR/$file"
done

rsync -a --delete "$ROOT_DIR/assets/" "$DOCS_DIR/assets/"
rsync -a --delete "$ROOT_DIR/vendor/" "$DOCS_DIR/vendor/"

for file in "${site_files[@]}"; do
  cmp "$ROOT_DIR/$file" "$DOCS_DIR/$file"
done

diff -qr "$ROOT_DIR/assets" "$DOCS_DIR/assets" >/dev/null
diff -qr "$ROOT_DIR/vendor" "$DOCS_DIR/vendor" >/dev/null

echo "Built GitHub Pages files in docs/."
