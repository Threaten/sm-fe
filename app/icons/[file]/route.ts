import { APPLE_ICON_SIZE, getIconSource, ICON_SIZES, iconHeaders, renderIcon } from "@/lib/icons";

/** `/icons/icon-{size}.png` for each advertised size, and `/icons/apple-touch-icon.png`. */
export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const match = /^icon-(\d+)\.png$/.exec(file);
  const size = file === "apple-touch-icon.png" ? APPLE_ICON_SIZE : Number(match?.[1]);
  if (size !== APPLE_ICON_SIZE && !ICON_SIZES.includes(size as (typeof ICON_SIZES)[number])) {
    return new Response(null, { status: 404 });
  }

  const source = await getIconSource();
  if (!source) return new Response(null, { status: 404 });
  try {
    const png = await renderIcon(source, size, size === APPLE_ICON_SIZE);
    return new Response(new Uint8Array(png), { headers: iconHeaders("image/png") });
  } catch {
    return new Response(null, { status: 404 });
  }
}
