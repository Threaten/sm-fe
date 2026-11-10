import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { getCourseBySlug, getCourses, getCoursesPage, getSiteSettings } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, course as courseLd } from "@/lib/structuredData";
import { CourseAbout } from "./_components/CourseAbout";
import { CourseHero } from "./_components/CourseHero";
import { CourseOutcomes } from "./_components/CourseOutcomes";
import { CourseSyllabus } from "./_components/CourseSyllabus";
import { EnrollmentPanel } from "./_components/EnrollmentPanel";

export async function generateStaticParams() {
  return (await getCourses()).map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const course = await getCourseBySlug((await params).slug);
  return course
    ? pageMetadata(`/courses/${course.slug}`, course.seo, {
        title: course.title,
        description: course.summary,
        image: course.image,
      })
    : { title: "Course" };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [courses, page, settings] = await Promise.all([getCourses(), getCoursesPage(), getSiteSettings()]);
  const index = courses.findIndex((course) => course.slug === slug);
  if (index === -1) notFound();
  const course = courses[index];
  const { siteUrl } = settings.seo;

  return (
    <div className={`accent-${course.accent}`}>
      {siteUrl ? (
        <JsonLd
          items={[
            courseLd(course, siteUrl),
            breadcrumbs(settings, "/courses", { name: course.title, path: `/courses/${course.slug}` }),
          ]}
        />
      ) : null}
      <CourseHero course={course} number={index + 1} labels={page.detail} />
      <CourseAbout course={course} labels={page.detail} />
      <CourseOutcomes course={course} labels={page.detail} />
      <CourseSyllabus course={course} labels={page.detail} />
      <EnrollmentPanel course={course} labels={page.detail} />
    </div>
  );
}
