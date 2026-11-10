import { TextBlocks } from "@/components/TextBlocks";
import type { Course, CoursesPage } from "@/lib/types";

/** "Về khóa học": the course's longer description. Hidden when the course has none. */
export function CourseAbout({ course, labels }: { course: Course; labels: CoursesPage["detail"] }) {
  if (!course.description) return null;

  return (
    <section className="course-section course-about">
      <div className="syllabus-intro">
        <p className="label">{labels.aboutEyebrow}</p>
        <h2>{labels.aboutTitle}</h2>
      </div>
      <TextBlocks className="course-about-body" text={course.description} />
    </section>
  );
}
