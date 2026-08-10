import { Marquee } from "@/components/Marquee";
import { getCourses, getSiteContent } from "@/lib/cms";
import { FeaturedCourses } from "./_components/FeaturedCourses";
import { HomeHero } from "./_components/HomeHero";
import { HomeManifesto } from "./_components/HomeManifesto";
import { HomeQuote } from "./_components/HomeQuote";

export default async function HomePage() {
  const courses = await getCourses();
  const content = await getSiteContent();

  return (
    <>
      <HomeHero content={content.homeHero} />
      <Marquee text="Shake / Stir / Taste / Repeat" />
      <HomeManifesto content={content.homeManifesto} />
      <FeaturedCourses courses={courses} />
      <HomeQuote content={content.homeQuote} />
    </>
  );
}
