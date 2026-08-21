import type { Metadata } from "next";
import { Marquee } from "@/components/Marquee";
import { PageIntro } from "@/components/PageIntro";
import { getPageIntro, getSiteContent } from "@/lib/cms";
import { AcademyValues } from "./_components/AcademyValues";
import { StoryCollage } from "./_components/StoryCollage";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const content = await getSiteContent();
  const intro = getPageIntro(content, "about");

  return (
    <>
      <PageIntro
        {...intro}
      />
      <StoryCollage content={content.story} />
      <Marquee text={content.marquees.about} dark />
      <AcademyValues values={content.aboutValues} />
    </>
  );
}
