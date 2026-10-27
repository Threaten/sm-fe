import type { Course, CoursesPage } from "@/lib/types";

export function CourseSyllabus({ course, labels }: { course: Course; labels: CoursesPage["detail"] }) {
  if (!course.syllabus.length) return null;

  return (
    <section className="syllabus">
      <div className="syllabus-intro">
        <p className="label">{labels.syllabusEyebrow}</p>
        <h2>{labels.syllabusTitle}</h2>
        <p>{labels.syllabusCopy}</p>
      </div>
      <div className="accordion">
        {course.syllabus.map((item, index) => {
          const number = <span>{String(index + 1).padStart(2, "0")}</span>;
          // A lesson only opens when it has something more to say.
          return item.description ? (
            <details key={item.title} open={index === 0}>
              <summary>
                {number}
                <h3>{item.title}</h3>
              </summary>
              <p>{item.description}</p>
            </details>
          ) : (
            <div key={item.title} className="accordion-row">
              {number}
              <h3>{item.title}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}
