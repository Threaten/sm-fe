import { getIconSource, iconHeaders, renderIco } from "@/lib/icons";

/**
 * Browsers and crawlers also ask for /favicon.ico directly, ignoring the <link rel="icon">,
 * so serve the browser icon from Site settings here too, as a real 16/32/48px .ico.
 */
export async function GET() {
  const source = await getIconSource();
  if (!source) return new Response(null, { status: 404 });
  try {
    return new Response(new Uint8Array(await renderIco(source)), { headers: iconHeaders("image/x-icon") });
  } catch {
    return new Response(null, { status: 404 });
  }
}
