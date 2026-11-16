import { TextBlocks } from "@/components/TextBlocks";
import type { Course, CoursesPage } from "@/lib/types";

/** "Thông tin khóa học": what happens each day. Rows without a label are numbered ("Ngày 1", "Ngày 2"...). Hidden when the course has none. */
export function CourseDetails({ course, labels }: { course: Course; labels: CoursesPage["detail"] }) {
  if (!course.details?.length) return null;

  return (
    <section className="course-section course-details">
      <div className="syllabus-intro">
        <p className="label">{labels.detailsEyebrow}</p>
        <h2>{labels.detailsTitle}</h2>
      </div>
      <dl className="course-details-list">
        {course.details.map((item, index) => (
          <div key={`${index}-${item.label ?? ""}`}>
            <dt>{item.label?.trim() || `${labels.detailsDayLabel} ${index + 1}`}</dt>
            <dd>
              <TextBlocks text={item.value} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
