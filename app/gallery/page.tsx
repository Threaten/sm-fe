import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { getGalleryItems, getSiteContent } from "@/lib/cms";
import { GallerySocial } from "./_components/GallerySocial";
import { GalleryWall } from "./_components/GalleryWall";

export const metadata: Metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const items = await getGalleryItems();
  const content = await getSiteContent();

  return (
    <>
      <PageIntro
        index="05"
        eyebrow="Inside the lab"
        title="MESSY HANDS. CLEAN DRINKS."
        intro="Classes, experiments, guest shifts, bad ideas that became good ideas, and the occasional perfect lemon peel."
        accent="cobalt"
      />
      <GalleryWall items={items} />
      <GallerySocial content={content.gallerySocial} />
    </>
  );
}
