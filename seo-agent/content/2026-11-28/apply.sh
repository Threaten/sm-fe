#!/usr/bin/env bash
# Applies the 2026-11-28 rewrite (formal Vietnamese for pages, services, courses and instructors) with the SEO agent's CMS key.
# Run on the server after git pull:  bash seo-agent/content/2026-11-28/apply.sh
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
P="$HERE/../../tools/payload.sh"
echo "POST /api/globals/about-page"; if out=$("$P" POST /api/globals/about-page "$HERE/about-page.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "POST /api/globals/contact-page"; if out=$("$P" POST /api/globals/contact-page "$HERE/contact-page.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "POST /api/globals/gallery-page"; if out=$("$P" POST /api/globals/gallery-page "$HERE/gallery-page.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "POST /api/globals/services-page"; if out=$("$P" POST /api/globals/services-page "$HERE/services-page.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "PATCH /api/services/6a8ad83e0542d04bd54cebfd"; if out=$("$P" PATCH /api/services/6a8ad83e0542d04bd54cebfd "$HERE/service-6a8ad83e0542d04bd54cebfd.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "PATCH /api/services/6a8ad83e0542d04bd54cec07"; if out=$("$P" PATCH /api/services/6a8ad83e0542d04bd54cec07 "$HERE/service-6a8ad83e0542d04bd54cec07.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "PATCH /api/services/6a8ad83f0542d04bd54cec11"; if out=$("$P" PATCH /api/services/6a8ad83f0542d04bd54cec11 "$HERE/service-6a8ad83f0542d04bd54cec11.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "POST /api/globals/home-page"; if out=$("$P" POST /api/globals/home-page "$HERE/home-page.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "POST /api/globals/news-page"; if out=$("$P" POST /api/globals/news-page "$HERE/news-page.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "POST /api/globals/site-settings"; if out=$("$P" POST /api/globals/site-settings "$HERE/site-settings.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "PATCH /api/courses/6a942921b9ddc8de23d2fb19"; if out=$("$P" PATCH /api/courses/6a942921b9ddc8de23d2fb19 "$HERE/course-bartender-co-ban.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "PATCH /api/courses/6a942921b9ddc8de23d2fb20"; if out=$("$P" PATCH /api/courses/6a942921b9ddc8de23d2fb20 "$HERE/course-bartender-nang-cao.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "PATCH /api/courses/6a942921b9ddc8de23d2fb24"; if out=$("$P" PATCH /api/courses/6a942921b9ddc8de23d2fb24 "$HERE/course-flair-bartending.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "PATCH /api/courses/6a942921b9ddc8de23d2fb27"; if out=$("$P" PATCH /api/courses/6a942921b9ddc8de23d2fb27 "$HERE/course-bar-skill.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "PATCH /api/courses/6a942921b9ddc8de23d2fb2c"; if out=$("$P" PATCH /api/courses/6a942921b9ddc8de23d2fb2c "$HERE/course-mot-kem-mot.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "PATCH /api/staff/6a942921b9ddc8de23d2fb33"; if out=$("$P" PATCH /api/staff/6a942921b9ddc8de23d2fb33 "$HERE/staff-duong-minh-tri.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "PATCH /api/staff/6a942921b9ddc8de23d2fb30"; if out=$("$P" PATCH /api/staff/6a942921b9ddc8de23d2fb30 "$HERE/staff-grace-truong.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "PATCH /api/staff/6a942921b9ddc8de23d2fb36"; if out=$("$P" PATCH /api/staff/6a942921b9ddc8de23d2fb36 "$HERE/staff-hoai-le.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
