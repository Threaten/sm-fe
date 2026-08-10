import Link from "next/link";
import { Course } from "@/lib/data";

export function CourseHero({ course }: { course: Course }) {
  return (
    <section className="course-editorial" style={{ "--course-accent": course.tone } as React.CSSProperties}>
      <div className="course-editorial-copy">
        <div className="course-editorial-nav"><Link href="/courses">← Course library</Link><span>{course.index} / 06</span></div>
        <div className="course-editorial-title"><p>{course.level}</p><h1>{course.title}</h1></div>
        <p className="course-editorial-summary">{course.summary}</p>
        <dl className="course-editorial-facts">
          <div><dt>Duration</dt><dd>{course.duration}</dd></div>
          <div><dt>Tuition</dt><dd>{course.price}</dd></div>
          <div><dt>Class size</dt><dd>12 students</dd></div>
        </dl>
        <Link className="course-editorial-cta" href={`/contact-us?course=${course.slug}`}>Reserve a seat <span>↗</span></Link>
      </div>
      <figure className="course-editorial-image"><img src={course.image} alt={`${course.title} class in progress`} /><figcaption>Skill &amp; Mix / Ho Chi Minh City</figcaption></figure>
    </section>
  );
}
