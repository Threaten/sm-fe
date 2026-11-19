import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Marquee } from "@/components/Marquee";
import { CourseFaq } from "@/app/courses/_components/CourseFaq";
import { getCourses, getCoursesPage, getHomePage, getSiteSettings, getTestimonials } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { faq } from "@/lib/structuredData";
import { FeaturedCourses } from "./_components/FeaturedCourses";
import { FeaturedInstructor } from "./_components/FeaturedInstructor";
import { HomeGuide } from "./_components/HomeGuide";
import { HomeHero } from "./_components/HomeHero";
import { HomeManifesto } from "./_components/HomeManifesto";
import { HomeTestimonials } from "./_components/HomeTestimonials";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage();
  return pageMetadata("/", page.seo);
}

export default async function HomePage() {
  const [home, courses, coursesPage, testimonials, settings] = await Promise.all([
    getHomePage(),
    getCourses(),
    getCoursesPage(),
    getTestimonials(),
    getSiteSettings(),
  ]);
  const faqItems = home.faq.items.filter((item) => item.question && item.answer);
  const showStructuredData = settings.seo.siteUrl && !settings.seo.noIndex;

  return (
    <>
      {showStructuredData && faqItems.length ? <JsonLd items={[faq(faqItems)]} /> : null}
      <HomeHero content={home.hero} />
      <Marquee text={home.marquee} />
      <HomeManifesto content={home.manifesto} />
      {home.featuredPerson ? (
        <FeaturedInstructor content={home.featuredInstructor} person={home.featuredPerson} />
      ) : null}
      <FeaturedCourses courses={courses} content={home.featuredCourses} labels={coursesPage.detail} />
      <HomeGuide content={home.guide} />
      <HomeTestimonials eyebrow={home.testimonials.eyebrow} testimonials={testimonials} />
      <CourseFaq content={{ ...home.faq, items: faqItems }} />
    </>
  );
}
