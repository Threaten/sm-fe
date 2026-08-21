import Link from "next/link";
import { Course } from "@/lib/data";

export function EnrollmentPanel({ course, content }: { course: Course; content: any }) {
  return (
    <section className="course-enroll-strip" style={{ "--course-accent": course.tone } as React.CSSProperties}>
      <div><p className="eyebrow">{content.intakeLabel}</p><h2>{course.nextIntake}</h2></div>
      <p>{course.schedule.split("\n").map((line) => <span key={line}>{line}<br /></span>)}{course.location}</p>
      <p>{course.duration}<br />{course.classSize}<br />{course.price}</p>
      <Link href={`/contact-us?course=${course.slug}`}>{content.reserveLabel} <span>↗</span></Link>
    </section>
  );
}
