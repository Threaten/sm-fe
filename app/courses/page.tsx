import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Marquee } from "@/components/Marquee";
import { PageIntro } from "@/components/PageIntro";
import { getCourses, getCoursesPage, getSiteSettings, pageNumber } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, courseList, faq } from "@/lib/structuredData";
import { CourseCatalog } from "./_components/CourseCatalog";
import { CourseFaq } from "./_components/CourseFaq";
import { CourseHelp } from "./_components/CourseHelp";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCoursesPage();
  return pageMetadata("/courses", page.seo, { description: page.intro.copy });
}

export default async function CoursesPage() {
  const [courses, page, settings] = await Promise.all([getCourses(), getCoursesPage(), getSiteSettings()]);

  const { siteUrl } = settings.seo;

  return (
    <>
      {siteUrl ? (
        <JsonLd items={[courseList(courses, siteUrl), faq(page.faq.items), breadcrumbs(settings, "/courses")]} />
      ) : null}
      <PageIntro intro={page.intro} number={pageNumber(settings.navigation, "/courses")} />
      <CourseCatalog courses={courses} catalog={page.catalog} labels={page.detail} />
      <Marquee text={page.marquee} />
      <CourseFaq content={page.faq} />
      <CourseHelp content={page.help} />
    </>
  );
}
