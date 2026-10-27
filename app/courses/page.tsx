import type { Metadata } from "next";
import { Marquee } from "@/components/Marquee";
import { PageIntro } from "@/components/PageIntro";
import { getCourses, getCoursesPage, getSiteSettings, pageNumber } from "@/lib/cms";
import { CourseCatalog } from "./_components/CourseCatalog";
import { CourseFaq } from "./_components/CourseFaq";
import { CourseHelp } from "./_components/CourseHelp";

export const metadata: Metadata = { title: "Courses" };

export default async function CoursesPage() {
  const [courses, page, settings] = await Promise.all([getCourses(), getCoursesPage(), getSiteSettings()]);

  return (
    <>
      <PageIntro intro={page.intro} number={pageNumber(settings.navigation, "/courses")} />
      <CourseCatalog courses={courses} catalog={page.catalog} labels={page.detail} />
      <Marquee text={page.marquee} />
      <CourseFaq content={page.faq} />
      <CourseHelp content={page.help} />
    </>
  );
}
