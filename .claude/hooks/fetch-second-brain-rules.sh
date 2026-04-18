#!/bin/bash
# SessionStart hook: clone karyandrew/second-brain into .claude/.cache/ so
# agents can read canonical rules as local files. Fires on every session
# (web or local). Auth sources, in order:
#   1. GITHUB_TOKEN / GH_TOKEN env var (primary — only source in web sandbox)
#   2. `gh auth token` CLI (local fallback — needs gh installed and authed)
#   3. soft-fail so the session still starts if neither works

set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$PWD}"
CACHE_DIR="$PROJECT_DIR/.claude/.cache/second-brain"

# Prefer env var; fall back to gh CLI on local machines.
TOKEN="${GITHUB_TOKEN:-${GH_TOKEN:-}}"
if [ -z "$TOKEN" ] && command -v gh >/dev/null 2>&1; then
  TOKEN="$(gh auth token 2>/dev/null || true)"
fi

if [ -z "$TOKEN" ]; then
  echo "fetch-second-brain-rules: no GITHUB_TOKEN and no gh auth; skipping" >&2
  exit 0
fi

# URL-embedded auth works for both PATs (ghp_, github_pat_) and OAuth (gho_).
# http.extraheader rejects gho_ tokens, so we pay the cost of the token landing
# in the cache's .git/config — acceptable because .claude/.cache is gitignored
# and only exists on disk (never pushed).
AUTH_URL="https://x-access-token:${TOKEN}@github.com/karyandrew/second-brain.git"

mkdir -p "$(dirname "$CACHE_DIR")"

if [ -d "$CACHE_DIR/.git" ]; then
  git -C "$CACHE_DIR" remote set-url origin "$AUTH_URL"
  if ! git -C "$CACHE_DIR" fetch --depth 1 origin main >/dev/null 2>&1; then
    echo "fetch-second-brain-rules: fetch failed; using stale cache" >&2
    exit 0
  fi
  git -C "$CACHE_DIR" reset --hard origin/main >/dev/null
else
  if ! git clone --depth 1 "$AUTH_URL" "$CACHE_DIR" >/dev/null 2>&1; then
    echo "fetch-second-brain-rules: clone failed" >&2
    exit 0
  fi
fi

echo "fetch-second-brain-rules: second-brain refreshed at $CACHE_DIR" >&2
