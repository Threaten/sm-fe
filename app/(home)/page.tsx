import { Marquee } from "@/components/Marquee";
import { getCourses, getSiteContent, getStaff } from "@/lib/cms";
import { FeaturedCourses } from "./_components/FeaturedCourses";
import { FeaturedInstructor } from "./_components/FeaturedInstructor";
import { HomeHero } from "./_components/HomeHero";
import { HomeManifesto } from "./_components/HomeManifesto";
import { HomeTestimonials } from "./_components/HomeTestimonials";

export default async function HomePage() {
  const [courses, staff, content] = await Promise.all([
    getCourses(),
    getStaff(),
    getSiteContent(),
  ]);

  return (
    <>
      <HomeHero content={content.homeHero} />
      <Marquee text={content.marquees.home} />
      <HomeManifesto content={content.homeManifesto} />
      <FeaturedInstructor
        content={content.featuredInstructor}
        person={content.featuredInstructor.person ?? staff[0]}
      />
      <FeaturedCourses courses={courses} content={content.featuredCourses} />
      <HomeTestimonials testimonials={content.homeTestimonials} />
    </>
  );
}
