import type { Metadata, Viewport } from "next";
import { Archivo, Be_Vietnam_Pro } from "next/font/google";
import { EntryPopup } from "@/components/EntryPopup";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getEntryPopup, getSiteSettings } from "@/lib/cms";
import "./globals.css";

const bodyFont = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** One variable family; its width axis gives condensed headlines and expanded labels. */
const displayFont = Archivo({
  subsets: ["latin", "vietnamese"],
  variable: "--font-display",
  axes: ["wdth"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSiteSettings();
  return {
    title: { default: seo.siteName, template: `%s | ${seo.siteName}` },
    description: seo.description,
    openGraph: {
      siteName: seo.siteName,
      description: seo.description,
      images: seo.shareImage.url ? [{ url: seo.shareImage.url, alt: seo.shareImage.alt }] : undefined,
    },
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
      className={`${bodyFont.variable} ${displayFont.variable}`}
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
