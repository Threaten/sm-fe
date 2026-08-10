import { Course } from "@/lib/data";

export function CourseSyllabus({ course }: { course: Course }) {
  return (
    <section className="course-lessons">
      <div className="course-lessons-intro">
        <p className="eyebrow">Course structure</p>
        <h2>What you will practice</h2>
        <p>Each session combines demonstration, guided drills, independent work, and direct feedback.</p>
      </div>
      <div className="course-lesson-list">
        {course.syllabus.map((item, index) => (
          <details key={item} open={index === 0}>
            <summary><span>0{index + 1}</span><h3>{item}</h3><b aria-hidden="true">+</b></summary>
            <p>{index === 0 ? "Learn it, taste it, and repeat it until the movement feels obvious." : "See the technique, understand why it works, then build dependable muscle memory."}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
