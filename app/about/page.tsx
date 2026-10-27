import type { Metadata } from "next";
import { Marquee } from "@/components/Marquee";
import { PageIntro } from "@/components/PageIntro";
import { getAboutPage, getSiteSettings, pageNumber } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { AcademyValues } from "./_components/AcademyValues";
import { StoryCollage } from "./_components/StoryCollage";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage();
  return pageMetadata("/about", page.seo, { description: page.intro.copy });
}

export default async function AboutPage() {
  const [page, settings] = await Promise.all([getAboutPage(), getSiteSettings()]);

  return (
    <>
      <PageIntro intro={page.intro} number={pageNumber(settings.navigation, "/about")} />
      <StoryCollage content={page.story} />
      <Marquee text={page.marquee} tone="black" />
      <AcademyValues content={page.values} />
    </>
  );
}
