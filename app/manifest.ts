import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/cms";
import { ICON_SIZES } from "@/lib/icons";

/** Web app manifest: the name and icons Android and Chrome use when the site is saved to a home screen. */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { seo, theme } = await getSiteSettings();
  return {
    name: seo.siteName,
    short_name: seo.siteName,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: theme.white,
    theme_color: theme.white,
    icons: seo.favicon
      ? ICON_SIZES.filter((size) => size >= 192).map((size) => ({
          src: `/icons/icon-${size}.png`,
          sizes: `${size}x${size}`,
          type: "image/png",
        }))
      : [],
  };
}
