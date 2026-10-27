import Link from "next/link";
import { Price } from "@/components/Price";
import type { Course, CoursesPage } from "@/lib/types";

export function CourseCatalog({
  courses,
  catalog,
  labels,
}: {
  courses: Course[];
  catalog: CoursesPage["catalog"];
  labels: CoursesPage["detail"];
}) {
  return (
    <section className="catalog">
      {courses.map((course, index) => (
        <article key={course.slug} className={`catalog-course accent-${course.accent}`}>
          <div className="catalog-visual">
            <span className="catalog-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <figure className="tape">
              <img src={course.image.url} alt={course.image.alt} loading="lazy" />
              <figcaption>{course.imageCaption}</figcaption>
            </figure>
            <span className="catalog-sticker" aria-hidden="true">
              {course.duration}
              <small>{catalog.stickerLabel}</small>
            </span>
          </div>
          <div className="catalog-copy">
            <p className="label">{course.level}</p>
            <h2>
              <Link href={`/courses/${course.slug}`}>{course.title}</Link>
            </h2>
            <p>{course.summary}</p>
            <dl className="spec">
              <div>
                <dt>{labels.durationLabel}</dt>
                <dd>{course.duration}</dd>
              </div>
              <div>
                <dt>{labels.classSizeLabel}</dt>
                <dd>{course.classSize}</dd>
              </div>
              <div>
                <dt>{labels.intakeLabel}</dt>
                <dd>{course.nextIntake}</dd>
              </div>
              <div>
                <dt>{labels.tuitionLabel}</dt>
                <dd>
                  <Price price={course.price} promotionPrice={course.promotionPrice} />
                </dd>
              </div>
            </dl>
            <Link className="catalog-link" href={`/courses/${course.slug}`} aria-hidden="true" tabIndex={-1}>
              {catalog.viewCourseLabel}
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}
