import type { Metadata, Viewport } from "next";
import { EntryPopup } from "@/components/EntryPopup";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getEntryPopup, getSiteSettings } from "@/lib/cms";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSiteSettings();
  const keywords = seo.keywords?.split(",").map((word) => word.trim()).filter(Boolean);
  return {
    metadataBase: seo.siteUrl ? new URL(seo.siteUrl) : undefined,
    applicationName: seo.siteName,
    title: { default: seo.siteName, template: `%s | ${seo.siteName}` },
    description: seo.description,
    keywords: keywords?.length ? keywords : undefined,
    icons: seo.favicon ? { icon: seo.favicon.url, apple: seo.favicon.url } : undefined,
    robots: seo.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: seo.siteName,
      description: seo.description,
      images: seo.shareImage.url ? [{ url: seo.shareImage.url, alt: seo.shareImage.alt }] : undefined,
    },
    twitter: { card: "summary_large_image" },
  };
}

export async function generateViewport(): Promise<Viewport> {
  const { theme } = await getSiteSettings();
  return { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: theme.white };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [settings, popup] = await Promise.all([getSiteSettings(), getEntryPopup()]);
  const { theme } = settings;

  return (
    <html
      lang="vi"
      style={
        {
          "--white": theme.white,
          "--black": theme.black,
          "--red": theme.red,
        } as React.CSSProperties
      }
    >
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader
          announcementBar={settings.announcementBar}
          navigation={settings.navigation}
          cta={settings.headerCta}
          logo={settings.logo.image}
        />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter settings={settings} />
        <EntryPopup content={popup} />
      </body>
    </html>
  );
}
