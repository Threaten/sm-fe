import type { Metadata } from "next";
import { Marquee } from "@/components/Marquee";
import { PageIntro } from "@/components/PageIntro";
import { getSiteContent } from "@/lib/cms";
import { AcademyValues } from "./_components/AcademyValues";
import { StoryCollage } from "./_components/StoryCollage";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const content = await getSiteContent();

  return (
    <>
      <PageIntro
        index="01"
        eyebrow="Inside Skill & Mix"
        title="A SCHOOL FOR THIRSTY MINDS."
        intro="We built the class we wished existed: practical, demanding, generous, and a little bit chaotic."
        accent="coral"
      />
      <StoryCollage content={content.story} />
      <Marquee text="Palate first / Ego last" dark />
      <AcademyValues values={content.aboutValues} />
    </>
  );
}
