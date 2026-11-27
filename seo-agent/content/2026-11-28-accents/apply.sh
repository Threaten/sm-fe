#!/usr/bin/env bash
# Makes the accent colours of news posts and courses alternate red/black in the order the site shows them (2026-11-28).
# Run on the server after git pull:  bash seo-agent/content/2026-11-28-accents/apply.sh
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
P="$HERE/../../tools/payload.sh"
echo "red -> black: Học bartender mất bao lâu? Lộ trình từ c"; if out=$("$P" PATCH /api/news/6b006a62f38f8d0bfd12f1db "$HERE/news-6b006a62f38f8d0bfd12f1db.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "red -> black: 🍸 GÓC HỌC VIÊN: LẦN ĐẦU CẦM SHAKER TẠI "; if out=$("$P" PATCH /api/news/6af8a64c26009ef2f55f0831 "$HERE/news-6af8a64c26009ef2f55f0831.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "black -> red: 🍸 LÝ DO KHIẾN NGHỀ BARTENDER TRỞ NÊN HẤ"; if out=$("$P" PATCH /api/news/6af8a4da26009ef2f55f05d6 "$HERE/news-6af8a4da26009ef2f55f05d6.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "red -> black: 🍸 WHY SKILL & MIX? Học viên đến vì điều"; if out=$("$P" PATCH /api/news/6af357be2de62c15cea12274 "$HERE/news-6af357be2de62c15cea12274.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "black -> red: 🍸 SHAKE HAY STIR? "; if out=$("$P" PATCH /api/news/6af3838a18b66dddf2d0d032 "$HERE/news-6af3838a18b66dddf2d0d032.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "red -> black: 🍸 LỊCH KHAI GIẢNG THÁNG 11"; if out=$("$P" PATCH /api/news/6ae3140dbdd840bf0208233f "$HERE/news-6ae3140dbdd840bf0208233f.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "red -> black: 🍸 HỌC BARTENDER 1 KÈM 1 | TỰ TAY LÀM, T"; if out=$("$P" PATCH /api/news/6afc1186647925a6f39e788e "$HERE/news-6afc1186647925a6f39e788e.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "red -> black: Bar Skill"; if out=$("$P" PATCH /api/courses/6a942921b9ddc8de23d2fb27 "$HERE/courses-6a942921b9ddc8de23d2fb27.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
echo "black -> red: 1 Kèm 1"; if out=$("$P" PATCH /api/courses/6a942921b9ddc8de23d2fb2c "$HERE/courses-6a942921b9ddc8de23d2fb2c.json" 2>&1); then echo "  ok"; else echo "  FAILED: ${out:0:400}"; fi
