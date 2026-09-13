import type { Metadata } from "next";
import { Marquee } from "@/components/Marquee";
import { PageIntro } from "@/components/PageIntro";
import { getCourses, getPageIntro, getSiteContent } from "@/lib/cms";
import { CourseCatalog } from "./_components/CourseCatalog";
import { CourseFaq } from "./_components/CourseFaq";
import { CourseHelp } from "./_components/CourseHelp";

export const metadata: Metadata = { title: "Courses" };

export default async function CoursesPage() {
  const [courses, content] = await Promise.all([
    getCourses(),
    getSiteContent(),
  ]);
  const intro = getPageIntro(content, "courses");

  return (
    <>
      <PageIntro {...intro} />
      <CourseCatalog courses={courses} />
      <Marquee text={content.marquees.courses} />
      <CourseFaq content={content.courseFaq} />
      <CourseHelp content={content.courseHelp} />
    </>
  );
}
