import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { getGalleryItems, getGalleryPage, getSiteSettings, pageNumber } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { GallerySocial } from "./_components/GallerySocial";
import { GalleryWall } from "./_components/GalleryWall";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGalleryPage();
  return pageMetadata("/gallery", page.seo, { description: page.intro.copy });
}

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
