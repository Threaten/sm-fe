import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseBySlug, getCourses, getCoursesPage } from "@/lib/cms";
import { CourseHero } from "./_components/CourseHero";
import { CourseSyllabus } from "./_components/CourseSyllabus";
import { EnrollmentPanel } from "./_components/EnrollmentPanel";

export async function generateStaticParams() {
  return (await getCourses()).map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const course = await getCourseBySlug((await params).slug);
  return course
    ? { title: course.title, description: course.summary, openGraph: { images: [course.image.url] } }
    : { title: "Course" };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [courses, page] = await Promise.all([getCourses(), getCoursesPage()]);
  const index = courses.findIndex((course) => course.slug === slug);
  if (index === -1) notFound();
  const course = courses[index];

  return (
    <div className={`accent-${course.accent}`}>
      <CourseHero course={course} number={index + 1} labels={page.detail} />
      <CourseSyllabus course={course} labels={page.detail} />
      <EnrollmentPanel course={course} labels={page.detail} />
    </div>
  );
}
