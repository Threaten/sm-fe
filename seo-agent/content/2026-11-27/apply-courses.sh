#!/usr/bin/env bash
# Applies the 2026-11-27 rewrite (course descriptions only; the articles and home page were applied on 2026-11-27) with the SEO agent's CMS key.
# Run on the server after git pull:  bash seo-agent/content/2026-11-27/apply-courses.sh
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
P="$HERE/../../tools/payload.sh"
echo "PATCH /api/courses/6a942921b9ddc8de23d2fb19"; if out=$("$P" PATCH /api/courses/6a942921b9ddc8de23d2fb19 "$HERE/course-bartender-co-ban.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "PATCH /api/courses/6a942921b9ddc8de23d2fb20"; if out=$("$P" PATCH /api/courses/6a942921b9ddc8de23d2fb20 "$HERE/course-bartender-nang-cao.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "PATCH /api/courses/6a942921b9ddc8de23d2fb24"; if out=$("$P" PATCH /api/courses/6a942921b9ddc8de23d2fb24 "$HERE/course-flair-bartending.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "PATCH /api/courses/6a942921b9ddc8de23d2fb27"; if out=$("$P" PATCH /api/courses/6a942921b9ddc8de23d2fb27 "$HERE/course-bar-skill.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "PATCH /api/courses/6a942921b9ddc8de23d2fb2c"; if out=$("$P" PATCH /api/courses/6a942921b9ddc8de23d2fb2c "$HERE/course-mot-kem-mot.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
