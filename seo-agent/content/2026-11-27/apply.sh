#!/usr/bin/env bash
# Applies the 2026-11-27 rewrite (course descriptions, two articles, home Guide & FAQ) with the SEO agent's CMS key.
# Run on the server after git pull:  bash seo-agent/content/2026-11-27/apply.sh
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
P="$HERE/../../tools/payload.sh"
echo "PATCH /api/courses/6a942921b9ddc8de23d2fb19"; "$P" PATCH /api/courses/6a942921b9ddc8de23d2fb19 "$HERE/course-bartender-co-ban.json" > /dev/null && echo "  ok"
echo "PATCH /api/courses/6a942921b9ddc8de23d2fb20"; "$P" PATCH /api/courses/6a942921b9ddc8de23d2fb20 "$HERE/course-bartender-nang-cao.json" > /dev/null && echo "  ok"
echo "PATCH /api/courses/6a942921b9ddc8de23d2fb24"; "$P" PATCH /api/courses/6a942921b9ddc8de23d2fb24 "$HERE/course-flair-bartending.json" > /dev/null && echo "  ok"
echo "PATCH /api/courses/6a942921b9ddc8de23d2fb27"; "$P" PATCH /api/courses/6a942921b9ddc8de23d2fb27 "$HERE/course-bar-skill.json" > /dev/null && echo "  ok"
echo "PATCH /api/courses/6a942921b9ddc8de23d2fb2c"; "$P" PATCH /api/courses/6a942921b9ddc8de23d2fb2c "$HERE/course-mot-kem-mot.json" > /dev/null && echo "  ok"
echo "PATCH /api/news/6b0888fc2fd3e73580e45d22"; "$P" PATCH /api/news/6b0888fc2fd3e73580e45d22 "$HERE/news-hoc-bartender-o-dau-tai.json" > /dev/null && echo "  ok"
echo "PATCH /api/news/6b006a62f38f8d0bfd12f1db"; "$P" PATCH /api/news/6b006a62f38f8d0bfd12f1db "$HERE/news-hoc-bartender-mat-bao-lau.json" > /dev/null && echo "  ok"
echo "POST /api/globals/home-page"; "$P" POST /api/globals/home-page "$HERE/home-page.json" > /dev/null && echo "  ok"
