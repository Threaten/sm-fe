import Link from "next/link";
import type { Course } from "@/lib/data";

export function FeaturedCourses({ courses, content }: { courses: Course[]; content: { eyebrow: string; title: string; linkLabel: string } }) {
  return (
    <section className="featured-courses">
      <div className="section-heading">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2>{content.title}</h2>
        <Link href="/courses">{content.linkLabel}</Link>
      </div>
      <div className="course-stack">
        {courses.map((course) => (
          <Link
            key={course.slug}
            href={`/courses/${course.slug}`}
            className="course-row"
          >
            <span className="course-index">{course.index}</span>
            <div className="course-thumb">
              <img src={course.image} alt="" />
            </div>
            <h3>{course.title}</h3>
            <p>{course.level}</p>
            <b>↗</b>
          </Link>
        ))}
      </div>
    </section>
  );
}
