import type { Metadata } from "next";
import { Be_Vietnam_Pro, Montserrat } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { EntryPopup } from "@/components/EntryPopup";
import { getSiteContent, getSiteSettings } from "@/lib/cms";
import "./globals.css";
import "./typography-fixes.css";
import "./popup.css";

const vietnameseFont = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-vietnamese",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const displayFont = Montserrat({
  subsets: ["latin", "vietnamese"],
  variable: "--font-display",
  weight: ["700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Skill & Mix", template: "%s | Skill & Mix" },
  description:
    "A hands-on academy for better drinks, sharper service, and braver ideas.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  themeColor: "#f4efe4",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [settings, content] = await Promise.all([
    getSiteSettings(),
    getSiteContent(),
  ]);

  return (
    <html
      lang="vi"
      className={[vietnameseFont.variable, displayFont.variable].join(" ")}
      style={{
        color: settings.theme.foreground,
        background: settings.theme.background,
      }}
    >
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader
          announcementBar={settings.announcementBar}
          navigation={settings.navigation}
        />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter footer={settings.footer} />
        <EntryPopup content={content.entryPopup} />
      </body>
    </html>
  );
}
