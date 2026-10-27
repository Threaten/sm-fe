import sharp from "sharp";
import { getSiteSettings } from "@/lib/cms";

/**
 * The CMS logos cut to their artwork. Logos are often exported on a large padded canvas,
 * which would otherwise shrink the visible mark to a fraction of its slot.
 * `/brand/light` is the header logo, `/brand/dark` the footer one.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const { logo } = await getSiteSettings();
  const image = variant === "light" ? logo.image : variant === "dark" ? (logo.imageOnDark ?? logo.image) : null;
  const response = image ? await fetch(image.url, { next: { revalidate: 60 } }).catch(() => null) : null;
  if (!response?.ok) return new Response(null, { status: 404 });

  const type = response.headers.get("content-type") ?? "image/png";
  const source = Buffer.from(await response.arrayBuffer());
  const headers = { "Cache-Control": "public, max-age=300, stale-while-revalidate=86400" };
  // Vector logos keep their own viewBox and stay sharp at any size.
  if (type.includes("svg")) return new Response(source, { headers: { ...headers, "Content-Type": type } });

  try {
    // 240px tall covers the 48px slot on 3x screens.
    const trimmed = await sharp(source)
      .trim({ threshold: 10 })
      .resize({ height: 240, withoutEnlargement: true })
      .png()
      .toBuffer();
    return new Response(new Uint8Array(trimmed), { headers: { ...headers, "Content-Type": "image/png" } });
  } catch {
    // A logo with nothing to trim (or an unreadable file) is served as uploaded.
    return new Response(source, { headers: { ...headers, "Content-Type": type } });
  }
}
