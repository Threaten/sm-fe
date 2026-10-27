import { getSiteSettings } from "@/lib/cms";

/**
 * Browsers and crawlers also ask for /favicon.ico directly, ignoring the <link rel="icon">,
 * so serve the browser icon from Site settings here too.
 */
export async function GET() {
  const { seo } = await getSiteSettings();
  const response = seo.favicon ? await fetch(seo.favicon.url, { next: { revalidate: 60 } }).catch(() => null) : null;
  if (!response?.ok) return new Response(null, { status: 404 });
  return new Response(response.body, {
    headers: {
      "Content-Type": response.headers.get("content-type") ?? "image/png",
      "Cache-Control": "public, max-age=300",
    },
  });
}
