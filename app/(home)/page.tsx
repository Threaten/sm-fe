import type { Metadata } from "next";
import { Marquee } from "@/components/Marquee";
import { getCourses, getCoursesPage, getHomePage, getTestimonials } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { FeaturedCourses } from "./_components/FeaturedCourses";
import { FeaturedInstructor } from "./_components/FeaturedInstructor";
import { HomeHero } from "./_components/HomeHero";
import { HomeManifesto } from "./_components/HomeManifesto";
import { HomeTestimonials } from "./_components/HomeTestimonials";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage();
  return pageMetadata("/", page.seo);
}

export default async function HomePage() {
  const [home, courses, coursesPage, testimonials] = await Promise.all([
    getHomePage(),
    getCourses(),
    getCoursesPage(),
    getTestimonials(),
  ]);

  return (
    <>
      <HomeHero content={home.hero} />
      <Marquee text={home.marquee} />
      <HomeManifesto content={home.manifesto} />
      {home.featuredPerson ? (
        <FeaturedInstructor content={home.featuredInstructor} person={home.featuredPerson} />
      ) : null}
      <FeaturedCourses courses={courses} content={home.featuredCourses} labels={coursesPage.detail} />
      <HomeTestimonials eyebrow={home.testimonials.eyebrow} testimonials={testimonials} />
    </>
  );
}
