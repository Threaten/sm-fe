import Link from "next/link";
import { Course } from "@/lib/data";
import { formatCoursePrice } from "@/lib/price";

export function CourseHero({ course, content }: { course: Course; content: any }) {
  return (
    <section className="course-editorial" style={{ "--course-accent": course.tone } as React.CSSProperties}>
      <div className="course-editorial-copy">
        <div className="course-editorial-nav"><Link href="/courses">← {content.backLabel}</Link><span>{course.index}</span></div>
        <div className="course-editorial-title"><p>{course.level}</p><h1>{course.title}</h1></div>
        <p className="course-editorial-summary">{course.summary}</p>
        <dl className="course-editorial-facts">
          <div><dt>{content.durationLabel}</dt><dd>{course.duration}</dd></div>
          <div>
            <dt>{content.tuitionLabel}</dt>
            <dd className="course-price course-price-compact">
              {course.promotionPrice ? (
                <>
                  <del>{formatCoursePrice(course.price)}</del>
                  <strong>{formatCoursePrice(course.promotionPrice)}</strong>
                </>
              ) : (
                <strong>{formatCoursePrice(course.price)}</strong>
              )}
            </dd>
          </div>
          <div><dt>{content.classSizeLabel}</dt><dd>{course.classSize}</dd></div>
        </dl>
        <Link className="course-editorial-cta" href={`/contact-us?course=${course.slug}`}>{content.reserveLabel} <span>↗</span></Link>
      </div>
      <figure className="course-editorial-image"><img src={course.image} alt={course.imageAlt} /><figcaption>{course.imageCaption}</figcaption></figure>
    </section>
  );
}
