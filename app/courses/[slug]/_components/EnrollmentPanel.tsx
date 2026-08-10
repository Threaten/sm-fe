import Link from "next/link";
import { Course } from "@/lib/data";

export function EnrollmentPanel({ course }: { course: Course }) {
  return (
    <section className="course-enroll-strip" style={{ "--course-accent": course.tone } as React.CSSProperties}>
      <div><p className="eyebrow">Next intake</p><h2>September 14</h2></div>
      <p>Tuesday evenings<br />6:30 to 9:00<br />Ho Chi Minh City</p>
      <p>{course.duration}<br />12 students<br />{course.price}</p>
      <Link href={`/contact-us?course=${course.slug}`}>Reserve your seat <span>↗</span></Link>
    </section>
  );
}
