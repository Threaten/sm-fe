import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/cms";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { seo } = await getSiteSettings();
  if (seo.noIndex) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: seo.siteUrl ? `${seo.siteUrl}/sitemap.xml` : undefined,
  };
}
