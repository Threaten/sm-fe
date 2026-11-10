import { TextBlocks } from "@/components/TextBlocks";
import type { Course, CoursesPage } from "@/lib/types";

/** "Bạn sẽ đạt được": what students walk away with. Hidden when the course lists none. */
export function CourseOutcomes({ course, labels }: { course: Course; labels: CoursesPage["detail"] }) {
  if (!course.outcomes?.length) return null;

  return (
    <section className="course-section course-outcomes">
      <div className="syllabus-intro">
        <p className="label">{labels.outcomesEyebrow}</p>
        <h2>{labels.outcomesTitle}</h2>
        {labels.outcomesCopy ? <p>{labels.outcomesCopy}</p> : null}
      </div>
      <ul className="outcome-list">
        {course.outcomes.map((item, index) => (
          <li key={`${index}-${item.title}`}>
            <h3>{item.title}</h3>
            {item.description ? <TextBlocks text={item.description} /> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
