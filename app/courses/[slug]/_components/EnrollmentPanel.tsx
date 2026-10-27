import Link from "next/link";
import { Lines } from "@/components/Lines";
import { Price } from "@/components/Price";
import type { Course, CoursesPage } from "@/lib/types";

export function EnrollmentPanel({ course, labels }: { course: Course; labels: CoursesPage["detail"] }) {
  return (
    <section className="enroll">
      <div className="enroll-intake">
        <p className="label">{labels.intakeLabel}</p>
        <h2>{course.nextIntake}</h2>
      </div>
      <p className="enroll-schedule">
        <Lines text={course.schedule} />
        <br />
        <strong>{course.location}</strong>
      </p>
      <ul className="enroll-meta">
        <li>{course.duration}</li>
        <li>{course.classSize}</li>
        <li>
          <Price price={course.price} promotionPrice={course.promotionPrice} />
        </li>
      </ul>
      <Link className="button-solid" href={`/contact-us?course=${course.slug}`}>
        {labels.reserveLabel}
      </Link>
    </section>
  );
}
