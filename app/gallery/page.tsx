import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { getGalleryItems, getPageIntro, getSiteContent } from "@/lib/cms";
import { GallerySocial } from "./_components/GallerySocial";
import { GalleryWall } from "./_components/GalleryWall";

export const metadata: Metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const items = await getGalleryItems();
  const content = await getSiteContent();
  const intro = getPageIntro(content, "gallery");

  return (
    <>
      <PageIntro
        {...intro}
      />
      <GalleryWall items={items} />
      <GallerySocial content={content.gallerySocial} />
    </>
  );
}
