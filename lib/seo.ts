import type { Metadata } from "next";
import { getSiteSettings } from "./cms";
import type { Image, Seo } from "./types";

/**
 * Metadata for one page: the editor's SEO overrides first, then the page's own
 * content, then the site-wide defaults from Site settings → Brand.
 */
export async function pageMetadata(
  path: string,
  seo: Seo | undefined,
  page: { title?: string; description?: string; image?: Image | null } = {},
): Promise<Metadata> {
  const settings = await getSiteSettings();
  const site = settings.seo;
  // The home page is titled by the site name alone, not its menu label.
  const navTitle = path === "/" ? undefined : settings.navigation.find((link) => link.href === path)?.label;
  const pageTitle = page.title ?? navTitle;
  const description = seo?.description || page.description || site.description;
  const image = seo?.image ?? page.image ?? site.shareImage;
  // An SEO title is used as written; otherwise the layout's "%s | Site name" template applies.
  const title = seo?.title ? { absolute: seo.title } : pageTitle ? pageTitle : { absolute: site.siteName };
  const shareTitle = seo?.title || (pageTitle ? `${pageTitle} | ${site.siteName}` : site.siteName);

  return {
    title,
    description,
    alternates: site.siteUrl ? { canonical: path } : undefined,
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: site.siteName,
      title: shareTitle,
      description,
      url: site.siteUrl ? path : undefined,
      images: image?.url ? [{ url: image.url, alt: image.alt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: image?.url ? [image.url] : undefined,
    },
    robots: site.noIndex || seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}
