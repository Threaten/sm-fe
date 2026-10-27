import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { getGalleryItems, getGalleryPage, getSiteSettings, pageNumber } from "@/lib/cms";
import { GallerySocial } from "./_components/GallerySocial";
import { GalleryWall } from "./_components/GalleryWall";

export const metadata: Metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const [items, page, settings] = await Promise.all([getGalleryItems(), getGalleryPage(), getSiteSettings()]);

  return (
    <>
      <PageIntro intro={page.intro} number={pageNumber(settings.navigation, "/gallery")} />
      <GalleryWall items={items} graffiti={page.graffiti} />
      <GallerySocial copy={page.social.copy} social={settings.social} />
    </>
  );
}
