import Link from "next/link";
import { Price } from "@/components/Price";
import type { Course, CoursesPage, HomePage } from "@/lib/types";

export function FeaturedCourses({
  courses,
  content,
  labels,
}: {
  courses: Course[];
  content: HomePage["featuredCourses"];
  labels: CoursesPage["detail"];
}) {
  return (
    <section className="featured-courses">
      <div className="section-head">
        <p className="label">{content.eyebrow}</p>
        <h2>{content.title}</h2>
        <Link className="text-link" href="/courses">
          {content.linkLabel}
        </Link>
      </div>
      <ol className="course-index">
        {courses.map((course, index) => (
          <li key={course.slug} className={`accent-${course.accent}`}>
            <Link href={`/courses/${course.slug}`}>
              <span className="course-index-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="course-index-thumb">
                <img src={course.image.url} alt={course.image.alt} />
              </span>
              <span className="course-index-title">
                <strong>{course.title}</strong>
                <small>{course.level}</small>
              </span>
              <span className="course-index-meta">
                <small>{labels.durationLabel}</small>
                {course.duration}
              </span>
              <span className="course-index-meta">
                <small>{labels.tuitionLabel}</small>
                <Price price={course.price} promotionPrice={course.promotionPrice} />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
