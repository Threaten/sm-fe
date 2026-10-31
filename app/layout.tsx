import type { Metadata, Viewport } from "next";
import { EntryPopup } from "@/components/EntryPopup";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getEntryPopup, getSiteSettings } from "@/lib/cms";
import { APPLE_ICON_SIZE, ICON_SIZES } from "@/lib/icons";
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
    // Generated from Site settings → Brand → Browser icon and served from this site at fixed
    // addresses (app/favicon.ico, app/icons), so a new upload never changes the URLs Google knows.
    icons: seo.favicon
      ? {
          icon: [
            { url: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
            ...ICON_SIZES.map((size) => ({ url: `/icons/icon-${size}.png`, sizes: `${size}x${size}`, type: "image/png" })),
          ],
          apple: { url: "/icons/apple-touch-icon.png", sizes: `${APPLE_ICON_SIZE}x${APPLE_ICON_SIZE}` },
        }
      : undefined,
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
