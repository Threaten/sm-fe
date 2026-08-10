import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteSettings } from "@/lib/cms";
import "./globals.css";

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
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      style={{
        color: settings.theme.foreground,
        background: settings.theme.background,
      }}
    >
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader navigation={settings.navigation} />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <SiteFooter footer={settings.footer} />
      </body>
    </html>
  );
}
