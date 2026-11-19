#!/usr/bin/env bash
# Calls the Payload CMS REST API with the agent's API key, which never leaves this script.
# Usage:
#   payload.sh GET    '/api/news?limit=50&depth=0'
#   payload.sh POST   /api/news            body.json     (create)
#   payload.sh PATCH  /api/news/<id>       body.json     (update)
#   payload.sh POST   /api/globals/home-page body.json   (update a global)
set -euo pipefail
# shellcheck disable=SC1091
source "${SEO_AGENT_HOME:-$HOME/.seo-agent}/env"
method="${1:?method}"
path="${2:?path}"
body="${3:-}"
case "$method" in GET | POST | PATCH) ;; *) echo "Only GET, POST and PATCH are allowed (nothing is ever deleted)." >&2; exit 2 ;; esac
[[ "$path" == /api/* ]] || { echo "Path must start with /api/" >&2; exit 2; }
[[ "$path" == /api/users* || "$path" == /api/roles* ]] && { echo "Users and roles are off limits." >&2; exit 2; }
[ -n "${PAYLOAD_API_KEY:-}" ] || { echo "PAYLOAD_API_KEY is not set in ~/.seo-agent/env; CMS writes are disabled." >&2; [ "$method" = GET ] || exit 3; }
args=(-sS --fail-with-body -X "$method" -H "Content-Type: application/json")
[ -n "${PAYLOAD_API_KEY:-}" ] && args+=(-H "Authorization: ${PAYLOAD_AUTH_COLLECTION:-users} API-Key $PAYLOAD_API_KEY")
[ -n "$body" ] && args+=(--data-binary "@$body")
curl "${args[@]}" "${PAYLOAD_URL%/}$path"
echo
