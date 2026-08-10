import Link from "next/link";
import type { Course } from "@/lib/data";

export function CourseCatalog({ courses }: { courses: Course[] }) {
  return (
    <section className="course-catalog">
      {courses.map((course, index) => (
        <article key={course.slug} className="catalog-course">
          <div
            className="catalog-visual"
            style={{
              backgroundColor: course.tone,
              color:
                course.tone === "var(--acid)"
                  ? "var(--ink)"
                  : "var(--paper)",
            }}
          >
            <span className="catalog-number">{course.index}</span>
            <img
              src={course.image}
              alt=""
              className={index % 2 ? "tilt-right" : "tilt-left"}
            />
            <span className="catalog-sticker">
              {course.duration}
              <br />
              hands on
            </span>
          </div>
          <div className="catalog-copy">
            <div>
              <span>{course.level}</span>
              <span>{course.duration}</span>
            </div>
            <h2>{course.title}</h2>
            <p>{course.summary}</p>
            <div className="catalog-action">
              <strong>{course.price}</strong>
              <Link href={`/courses/${course.slug}`}>
                View course <b>↗</b>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
