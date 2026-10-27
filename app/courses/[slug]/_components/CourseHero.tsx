import Link from "next/link";
import { Price } from "@/components/Price";
import type { Course, CoursesPage } from "@/lib/types";

export function CourseHero({
  course,
  number,
  labels,
}: {
  course: Course;
  number: number;
  labels: CoursesPage["detail"];
}) {
  return (
    <section className="course-hero">
      <div className="course-hero-copy">
        <nav className="crumb">
          <Link href="/courses">
            <span className="icon icon-arrow-left" aria-hidden="true" /> {labels.backLabel}
          </Link>
          <span className="course-hero-number">{String(number).padStart(2, "0")}</span>
        </nav>
        <p className="label">{course.level}</p>
        <h1>{course.title}</h1>
        <p className="course-hero-summary">{course.summary}</p>
        <dl className="spec spec-inverse">
          <div>
            <dt>{labels.durationLabel}</dt>
            <dd>{course.duration}</dd>
          </div>
          <div>
            <dt>{labels.tuitionLabel}</dt>
            <dd>
              <Price price={course.price} promotionPrice={course.promotionPrice} />
            </dd>
          </div>
          <div>
            <dt>{labels.classSizeLabel}</dt>
            <dd>{course.classSize}</dd>
          </div>
        </dl>
        <Link className="button-solid" href={`/contact-us?course=${course.slug}`}>
          {labels.reserveLabel} <b className="icon icon-arrow" aria-hidden="true" />
        </Link>
      </div>
      <figure className="course-hero-image">
        <img src={course.image.url} alt={course.image.alt} />
        <figcaption>{course.imageCaption}</figcaption>
      </figure>
    </section>
  );
}
