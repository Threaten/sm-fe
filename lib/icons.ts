import sharp from "sharp";
import { getSiteSettings } from "./cms";

/**
 * Every size the site advertises. Google prefers multiples of 48px; 192 and 512 are what
 * Android and the web app manifest ask for.
 */
export const ICON_SIZES = [48, 96, 144, 192, 512] as const;
export const APPLE_ICON_SIZE = 180;
const ICO_SIZES = [16, 32, 48];

/** The browser icon uploaded in Site settings → Brand, or null when there is none. */
export async function getIconSource(): Promise<Buffer | null> {
  const { seo } = await getSiteSettings();
  if (!seo.favicon) return null;
  const response = await fetch(seo.favicon.url, { next: { revalidate: 300 } }).catch(() => null);
  return response?.ok ? Buffer.from(await response.arrayBuffer()) : null;
}

/** A square PNG. Non-square uploads are fitted, not cropped. `opaque` fills transparency (Apple icons). */
export async function renderIcon(source: Buffer, size: number, opaque = false) {
  let image = sharp(source).resize(size, size, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  if (opaque) image = image.flatten({ background: "#ffffff" });
  return image.png().toBuffer();
}

/** A real multi-size .ico (PNG-compressed entries, supported by every current browser and crawler). */
export async function renderIco(source: Buffer) {
  const images = await Promise.all(ICO_SIZES.map((size) => renderIcon(source, size)));
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach((image, index) => {
    const entry = 6 + 16 * index;
    header.writeUInt8(ICO_SIZES[index], entry);
    header.writeUInt8(ICO_SIZES[index], entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(image.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += image.length;
  });
  return Buffer.concat([header, ...images]);
}

export const iconHeaders = (type: string) => ({
  "Content-Type": type,
  "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
});
