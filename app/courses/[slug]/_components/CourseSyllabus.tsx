import { Course } from "@/lib/data";

export function CourseSyllabus({ course, content }: { course: Course; content: any }) {
  return (
    <section className="course-lessons">
      <div className="course-lessons-intro">
        <p className="eyebrow">{content.syllabusEyebrow}</p>
        <h2>{content.syllabusTitle}</h2>
        <p>{content.syllabusCopy}</p>
      </div>
      <div className="course-lesson-list">
        {course.syllabus.map((item, index) => (
          <details key={item} open={index === 0}>
            <summary><span>0{index + 1}</span><h3>{item}</h3><b aria-hidden="true">+</b></summary>
            <p>{index === 0 ? content.firstLessonCopy : content.lessonCopy}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
