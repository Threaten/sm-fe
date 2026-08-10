import type { Metadata } from "next";
import { Marquee } from "@/components/Marquee";
import { PageIntro } from "@/components/PageIntro";
import { getCourses } from "@/lib/cms";
import { CourseCatalog } from "./_components/CourseCatalog";
import { CourseHelp } from "./_components/CourseHelp";

export const metadata: Metadata = { title: "Courses" };

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <>
      <PageIntro
        index="04"
        eyebrow="The current menu"
        title="PICK YOUR NEXT OBSESSION."
        intro="Small classes, real tools, working instructors, and enough repetition to turn knowledge into instinct."
        accent="coral"
      />
      <CourseCatalog courses={courses} />
      <Marquee text="Small class / Big practice" />
      <CourseHelp />
    </>
  );
}
