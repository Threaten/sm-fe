# Skill & Mix SEO agent

An autonomous agent that runs on the VPS every night and works on getting skillandmix.com onto
page 1 of Google for "học bartender", "học bartender tphcm", "khóa học bartender tphcm" and
related searches. It runs Claude Code with your **Claude Pro/Max subscription**: no API credit.

Each night it:
1. Measures: real Google positions from Search Console (if connected) and an on-page audit of every page.
2. Picks the 1–3 most useful tasks: fix broken or unindexed pages, rewrite weak titles/descriptions,
   strengthen course pages and home text, publish a Vietnamese article (at most one per 6 days),
   clean up old posts, small code fixes.
3. Publishes CMS changes through the Payload API, and code changes as commits pushed to GitHub,
   then deploys with automatic rollback if the build or the site health check fails.
4. Writes what it did to a journal and what only you can do (Google Business Profile, reviews, prices) to a to-do list.

It only uses facts from the site, the CMS, or `~/.seo-agent/state/facts.md`, never deletes content,
and never uses black-hat tactics. Rules: [PROMPT.md](PROMPT.md).

## Install (once, on the VPS)

```bash
cd /path/to/sm-fe        # the folder your server builds skillandmix.com from
git pull
bash seo-agent/install.sh
```

The installer asks a few questions and detects most answers itself (your pm2 apps, folders, package manager):
- **Claude login**: runs `claude setup-token`; you open a link, log in with your Claude Pro account, and paste the token back.
- **GitHub push**: the server needs write access to both repos (deploy key with write access, or `gh auth login`).
- **CMS API key** (optional but needed for content): create a "SEO Agent" role and user in admin.skillandmix.com, enable its API key.
- **Search Console** (optional, recommended): a service-account JSON key, added to the property as a Restricted user.

## Day to day

| What | Command |
| --- | --- |
| What the agent did | `cat ~/.seo-agent/state/journal.md` |
| Things for you to do | `cat ~/.seo-agent/state/owner-todo.md` |
| Target keywords | `nano ~/.seo-agent/state/keywords.txt` |
| Add real facts (prices, intakes, ...) | `nano ~/.seo-agent/state/facts.md` |
| Competitors it studies | `nano ~/.seo-agent/state/competitors.txt` |
| What it learned from them | `cat ~/.seo-agent/state/competitor-notes.md` |
| Failed deploys | `cat ~/.seo-agent/state/ALERT.md` |
| Run now | `~/.seo-agent/kit/run.sh` |
| Pause / resume | `touch ~/.seo-agent/PAUSED` / `rm ~/.seo-agent/PAUSED` |
| Change settings | `bash seo-agent/install.sh` again |
| Uninstall | `crontab -l \| grep -v skillandmix-seo-agent \| crontab -` |

Each run uses part of your Claude Pro usage limit (the same pool as your own Claude use), so it runs once
a night at 02:30 Vietnam time with the Sonnet model by default. If the login token expires, run
`claude setup-token` on the server and re-run the installer.

## Files

- `install.sh`: setup and cron. `run.sh`: one run. `deploy.sh fe|be`: build, restart, health check, rollback.
- `site.conf`: this site's settings (the tools are shared with other sites' agents).
- `PROMPT.md`: the agent's standing instructions and rules.
- `tools/competitors.mjs`: weekly competitor research (pages listed in `~/.seo-agent/state/competitors.txt`; edit that file to add or remove competitors).
- `tools/audit.mjs`: on-page audit. `tools/gsc.mjs`: Search Console. `tools/payload.sh`: CMS API (no deletes, no users/roles).
  `tools/md2lexical.mjs`: Markdown to the CMS rich-text format.
