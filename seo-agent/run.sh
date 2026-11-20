#!/usr/bin/env bash
# One agent run: update the repos, start Claude Code headless with PROMPT.md, keep a log.
# Cron runs this nightly. Run it by hand any time: ~/.seo-agent/kit/run.sh
# Pause: touch ~/.seo-agent/PAUSED     Resume: rm ~/.seo-agent/PAUSED
set -uo pipefail
HOME_DIR="${SEO_AGENT_HOME:-$HOME/.seo-agent}"
KIT="$(cd "$(dirname "$(readlink -f "$0")")" && pwd)"
# shellcheck disable=SC1091
source "$HOME_DIR/env"
export SEO_AGENT_HOME="$HOME_DIR" PATH="$HOME/.local/bin:$HOME/.npm-global/bin:/usr/local/bin:$PATH"
export CLAUDE_CODE_OAUTH_TOKEN GSC_KEY_FILE GSC_SITE
# Pro/Max subscription only: an API key in the environment would bill API credit instead.
unset ANTHROPIC_API_KEY

[ -f "$HOME_DIR/PAUSED" ] && { echo "Paused ($HOME_DIR/PAUSED exists)."; exit 0; }
exec 9>"$HOME_DIR/run.lock"
flock -n 9 || { echo "Another run is in progress."; exit 0; }

mkdir -p "$HOME_DIR/logs"
log="$HOME_DIR/logs/$(date +%F_%H%M).log"
exec > >(tee -a "$log") 2>&1
echo "=== SEO agent run $(date '+%F %T') ==="

for dir in "$FE_DIR" "$BE_DIR"; do
  if [ -n "$(git -C "$dir" status --porcelain --untracked-files=no)" ]; then
    echo "Uncommitted changes in $dir; not pulling. Fix by hand: git -C $dir status"
  else
    git -C "$dir" pull --ff-only --quiet || echo "git pull failed in $dir"
  fi
done

# shellcheck disable=SC1091
source "$KIT/permissions.sh"

prompt="$(cat "$KIT/PROMPT.md")

## This server
- Frontend repo: $FE_DIR
- Backend repo: $BE_DIR
- Live site: ${SITE_URL}   CMS API: ${PAYLOAD_URL}
- CMS writes enabled: $([ -n "${PAYLOAD_API_KEY:-}" ] && echo yes || echo 'no (read-only: do code work and write CMS proposals to owner-todo.md)')
- Search Console: $([ -n "${GSC_KEY_FILE:-}" ] && echo configured || echo 'not configured')
- Tools: $KIT/tools   Deploy: $KIT/deploy.sh fe|be
- State folder (journal, facts, notes): $HOME_DIR/state
- Today: $(date +%F)"

cd "$FE_DIR"
trace="${log%.log}.jsonl"
timeout --foreground "${RUN_TIMEOUT:-90m}" claude -p "$prompt" \
  --model "${CLAUDE_MODEL:-sonnet}" \
  --max-turns "${MAX_TURNS:-60}" \
  --add-dir "$BE_DIR" "$HOME_DIR/state" \
  --allowedTools "${allowed[@]}" \
  --disallowedTools "${denied[@]}" \
  --output-format stream-json --verbose </dev/null | tee "$trace" | node "$KIT/tools/trace.mjs"
status=${PIPESTATUS[0]}
echo "=== finished $(date '+%F %T') with status $status ==="
find "$HOME_DIR/logs" \( -name '*.log' -o -name '*.jsonl' \) -mtime +60 -delete
exit $status
