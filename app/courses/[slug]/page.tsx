import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseBySlug, getCourses } from "@/lib/cms";
import { CourseHero } from "./_components/CourseHero";
import { CourseSyllabus } from "./_components/CourseSyllabus";
import { EnrollmentPanel } from "./_components/EnrollmentPanel";

export function generateStaticParams() {
  return getCourses().then((list) =>
    list.map((course) => ({ slug: course.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  return { title: course?.title ?? "Course" };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <>
      <CourseHero course={course} />
      <CourseSyllabus course={course} />
      <EnrollmentPanel course={course} />
    </>
  );
}
