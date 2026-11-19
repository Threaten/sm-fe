#!/usr/bin/env bash
# Installs the Skill & Mix SEO agent on this server. Safe to run again (it keeps your answers).
#
#   cd <the sm-fe folder that serves skillandmix.com>
#   git pull
#   bash seo-agent/install.sh
#
# Uses your Claude Pro/Max subscription through Claude Code: no API credit is needed.
set -euo pipefail

KIT="$(cd "$(dirname "$(readlink -f "$0")")" && pwd)"
FE_GUESS="$(cd "$KIT/.." && pwd)"
HOME_DIR="$HOME/.seo-agent"
CONF="$HOME_DIR/env"
mkdir -p "$HOME_DIR/state" "$HOME_DIR/logs"
chmod 700 "$HOME_DIR"

bold() { printf '\n\033[1m%s\033[0m\n' "$*"; }
ok() { printf '  \033[32mok\033[0m %s\n' "$*"; }
warn() { printf '  \033[33m!!\033[0m %s\n' "$*"; }
ask() { # ask VAR "Question" "default"
  local var="$1" question="$2" default="${3:-}" answer
  read -r -p "  $question${default:+ [$default]}: " answer </dev/tty
  printf -v "$var" '%s' "${answer:-$default}"
}
ask_secret() { # ask_secret VAR "Question" (Enter keeps the current value)
  local var="$1" question="$2" answer
  read -r -s -p "  $question: " answer </dev/tty
  echo
  [ -n "$answer" ] && printf -v "$var" '%s' "$answer"
  return 0
}

# Earlier answers become the defaults.
# shellcheck disable=SC1090
[ -f "$CONF" ] && source "$CONF"

bold "1/7 Checking the server"
for tool in git node npm curl flock timeout crontab; do
  command -v "$tool" >/dev/null || { warn "missing: $tool (install it, then run this again)"; exit 1; }
done
node_major="$(node -p 'process.versions.node.split(".")[0]')"
[ "$node_major" -ge 18 ] || { warn "Node $node_major is too old; need 18+"; exit 1; }
ok "git, node $(node -v), npm, curl, flock, cron"

bold "2/7 Claude Code"
export PATH="$HOME/.local/bin:$PATH"
if ! command -v claude >/dev/null; then
  echo "  Installing Claude Code (official installer, into ~/.local/bin, no sudo)..."
  curl -fsSL https://claude.ai/install.sh | bash
  export PATH="$HOME/.local/bin:$PATH"
fi
command -v claude >/dev/null || { warn "Claude Code did not install; see https://docs.claude.com/en/docs/claude-code/setup"; exit 1; }
ok "claude $(claude --version 2>/dev/null | head -1)"

if [ -z "${CLAUDE_CODE_OAUTH_TOKEN:-}" ]; then
  cat <<'TXT'

  The agent signs in with your Claude Pro account (no API credit).
  Next, Claude Code prints a link: open it in your browser, log in with your Claude Pro account,
  approve, paste the code back here. It then prints a long token starting with "sk-ant-oat":
  copy it, and paste it at the prompt that follows.
TXT
  read -r -p "  Press Enter to start..." _ </dev/tty
  claude setup-token </dev/tty || true
  ask_secret CLAUDE_CODE_OAUTH_TOKEN "Paste the token (sk-ant-oat...)"
else
  ok "Claude login token already saved (run 'claude setup-token' again if it stops working)"
fi
[[ "${CLAUDE_CODE_OAUTH_TOKEN:-}" == sk-ant-oat* ]] || warn "That doesn't look like a subscription token (should start with sk-ant-oat)."

bold "3/7 Where the site lives"
FE_DIR="${FE_DIR:-$FE_GUESS}"
if [ -z "${BE_DIR:-}" ]; then
  BE_DIR="$(find "$HOME" /var/www /srv /opt -maxdepth 4 -type d -name .git 2>/dev/null | while read -r g; do
    d="$(dirname "$g")"; git -C "$d" remote get-url origin 2>/dev/null | grep -q 'sm-be' && { echo "$d"; break; }
  done || true)"
fi
ask FE_DIR "Frontend repo (sm-fe) folder" "$FE_DIR"
ask BE_DIR "Backend repo (sm-be) folder" "$BE_DIR"
for d in "$FE_DIR" "$BE_DIR"; do [ -d "$d/.git" ] || { warn "$d is not a git repo"; exit 1; }; done
ask SITE_URL "Live website" "${SITE_URL:-https://skillandmix.com}"
ask PAYLOAD_URL "CMS (Payload) address" "${PAYLOAD_URL:-https://admin.skillandmix.com}"

bold "4/7 How each app is deployed"
pm() { # package manager of a repo
  if [ -f "$1/pnpm-lock.yaml" ]; then echo pnpm; elif [ -f "$1/yarn.lock" ]; then echo yarn; else echo npm; fi
}
pm2_name() { # pm2 app whose folder is $1
  command -v pm2 >/dev/null || return 0
  pm2 jlist 2>/dev/null | node -e '
    let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{
      const hit=JSON.parse(s).find(p=>require("path").resolve(p.pm2_env.pm_cwd||"")===require("path").resolve(process.argv[1]));
      if(hit)console.log(hit.name)}catch{}})' "$1"
}
default_cmd() {
  local dir="$1" name manager
  name="$(pm2_name "$dir")"; manager="$(pm "$dir")"
  if [ -n "$name" ]; then
    echo "$manager install && $manager run build && pm2 restart $name --update-env"
  else
    echo ""
  fi
}
[ -n "${FE_DEPLOY_CMD:-}" ] || FE_DEPLOY_CMD="$(default_cmd "$FE_DIR")"
[ -n "${BE_DEPLOY_CMD:-}" ] || BE_DEPLOY_CMD="$(default_cmd "$BE_DIR")"
[ -n "$FE_DEPLOY_CMD" ] && ok "found frontend in pm2" || warn "no pm2 app found for the frontend: type the command you use to rebuild and restart it"
ask FE_DEPLOY_CMD "Frontend build+restart command (runs inside $FE_DIR)" "$FE_DEPLOY_CMD"
[ -n "$BE_DEPLOY_CMD" ] && ok "found backend in pm2" || warn "no pm2 app found for the backend: type the command you use to rebuild and restart it"
ask BE_DEPLOY_CMD "Backend build+restart command (runs inside $BE_DIR)" "$BE_DEPLOY_CMD"
ask FE_HEALTH_URL "Frontend health check URL" "${FE_HEALTH_URL:-$SITE_URL/}"
ask BE_HEALTH_URL "Backend health check URL" "${BE_HEALTH_URL:-${PAYLOAD_URL%/}/api/globals/site-settings}"

for d in "$FE_DIR" "$BE_DIR"; do
  if git -C "$d" push --dry-run origin HEAD >/dev/null 2>&1; then
    ok "can push to GitHub from $d"
  else
    warn "cannot push from $d. Give this server write access to the repo (a GitHub deploy key with"
    warn "'Allow write access', or 'gh auth login'), then run this installer again."
  fi
  if [ -z "$(git -C "$d" config user.email || true)" ]; then
    git -C "$d" config user.name "Skill & Mix SEO Agent"
    git -C "$d" config user.email "seo-agent@noreply.skillandmix.com"
  fi
done

bold "5/7 CMS access (lets the agent publish articles and edit page text)"
cat <<TXT
  In ${PAYLOAD_URL%/}/admin:
    1. Roles: create "SEO Agent" with Read on everything, Create+Update on News,
       Update on Courses, Home page, Courses page, About page, and Read on Media. Nothing on Users/Roles.
    2. Users: create user "SEO Agent" with that role, tick "Enable API Key", save, copy the key.
  Press Enter to skip; the agent then only does code work and writes CMS suggestions for you.
TXT
ask_secret PAYLOAD_API_KEY "Paste the SEO Agent API key (Enter to keep current/skip)"
PAYLOAD_API_KEY="${PAYLOAD_API_KEY:-}"
if [ -n "$PAYLOAD_API_KEY" ]; then
  code="$(curl -s -o /dev/null -w '%{http_code}' -H "Authorization: users API-Key $PAYLOAD_API_KEY" "${PAYLOAD_URL%/}/api/users/me")"
  [ "$code" = 200 ] && ok "API key works" || warn "API key check returned HTTP $code"
fi

bold "6/7 Google Search Console (optional, strongly recommended: real Google positions)"
cat <<'TXT'
  1. console.cloud.google.com → new project → enable "Google Search Console API".
  2. IAM → Service accounts → create one → Keys → Add key → JSON. Upload the file to this server.
  3. search.google.com/search-console → skillandmix.com → Settings → Users and permissions →
     add the service account's email as a "Restricted" user.
TXT
ask GSC_KEY_FILE "Path to the JSON key on this server (Enter to skip)" "${GSC_KEY_FILE:-}"
ask GSC_SITE "Search Console property" "${GSC_SITE:-sc-domain:skillandmix.com}"
[ -n "$GSC_KEY_FILE" ] && chmod 600 "$GSC_KEY_FILE" 2>/dev/null || true

bold "7/7 Schedule"
ask CLAUDE_MODEL "Model (sonnet uses less of your Pro limit; opus is stronger)" "${CLAUDE_MODEL:-sonnet}"
ask MAX_TURNS "Max steps per run" "${MAX_TURNS:-60}"
# Nightly at 02:30 Vietnam time, converted to this server's clock.
offset="$(date +%z)"; server_hours=$((10#${offset:1:2})); [ "${offset:0:1}" = "-" ] && server_hours=$((-server_hours))
hour=$(( (2 - 7 + server_hours + 48) % 24 ))
ask CRON_SCHEDULE "Cron schedule (server time; default = 02:30 in Vietnam)" "${CRON_SCHEDULE:-30 $hour * * *}"

umask 077
{
  echo "# Skill & Mix SEO agent settings. Re-run install.sh to change them."
  for key in CLAUDE_CODE_OAUTH_TOKEN FE_DIR BE_DIR SITE_URL PAYLOAD_URL PAYLOAD_API_KEY FE_DEPLOY_CMD BE_DEPLOY_CMD \
    FE_HEALTH_URL BE_HEALTH_URL GSC_KEY_FILE GSC_SITE CLAUDE_MODEL MAX_TURNS CRON_SCHEDULE; do
    printf '%s=%q\n' "$key" "${!key:-}"
  done
} > "$CONF"
# Skill & Mix SEO agent settings. Re-run install.sh to change them.
CLAUDE_CODE_OAUTH_TOKEN='$CLAUDE_CODE_OAUTH_TOKEN'
FE_DIR='$FE_DIR'
BE_DIR='$BE_DIR'
SITE_URL='$SITE_URL'
PAYLOAD_URL='$PAYLOAD_URL'
PAYLOAD_API_KEY='$PAYLOAD_API_KEY'
FE_DEPLOY_CMD='$FE_DEPLOY_CMD'
BE_DEPLOY_CMD='$BE_DEPLOY_CMD'
FE_HEALTH_URL='$FE_HEALTH_URL'
BE_HEALTH_URL='$BE_HEALTH_URL'
GSC_KEY_FILE='$GSC_KEY_FILE'
GSC_SITE='$GSC_SITE'
CLAUDE_MODEL='$CLAUDE_MODEL'
MAX_TURNS='$MAX_TURNS'
CRON_SCHEDULE='$CRON_SCHEDULE'
EOF
chmod 600 "$CONF"
ok "settings saved to $CONF"

ln -sfn "$KIT" "$HOME_DIR/kit"
[ -f "$HOME_DIR/state/facts.md" ] || cp "$KIT/facts.template.md" "$HOME_DIR/state/facts.md"
touch "$HOME_DIR/state/journal.md" "$HOME_DIR/state/owner-todo.md"
git -C "$FE_DIR" rev-parse HEAD > "$HOME_DIR/state/last-good-fe"
git -C "$BE_DIR" rev-parse HEAD > "$HOME_DIR/state/last-good-be"

line="$CRON_SCHEDULE $HOME_DIR/kit/run.sh >/dev/null 2>&1 # skillandmix-seo-agent"
( crontab -l 2>/dev/null | grep -v 'skillandmix-seo-agent' || true; echo "$line" ) | crontab -
ok "cron: $CRON_SCHEDULE (server time $(date +%Z))"

bold "Done"
cat <<TXT
  Add real facts (prices, intakes, certificates) here; the agent only writes facts it can verify:
      nano $HOME_DIR/state/facts.md
  What the agent did:   cat $HOME_DIR/state/journal.md
  Things for you to do: cat $HOME_DIR/state/owner-todo.md
  Logs:                 ls $HOME_DIR/logs
  Run now:              $HOME_DIR/kit/run.sh
  Pause / resume:       touch $HOME_DIR/PAUSED   /   rm $HOME_DIR/PAUSED
TXT
read -r -p "  Start the first run now? [y/N] " now </dev/tty
[[ "$now" =~ ^[Yy]$ ]] && exec "$HOME_DIR/kit/run.sh"
exit 0
