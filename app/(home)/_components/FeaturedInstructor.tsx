import Link from "next/link";
import type { StaffMember } from "@/lib/data";

type FeaturedInstructorContent = {
  eyebrow: string;
  title: string;
  linkLabel: string;
};

export function FeaturedInstructor({
  content,
  person,
}: {
  content: FeaturedInstructorContent;
  person?: StaffMember;
}) {
  if (!person) return null;

  return (
    <section className="featured-instructor">
      <figure className="featured-instructor__portrait">
        <img src={person.image} alt={`${person.name}, ${person.role}`} />
        <figcaption>{person.role}</figcaption>
      </figure>
      <div className="featured-instructor__copy">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2>{content.title}</h2>
        <div className="featured-instructor__identity">
          <p>{person.name}</p>
          <span>{person.role}</span>
        </div>
        <blockquote>“{person.quote}”</blockquote>
        <div className="featured-instructor__specialties" aria-label="Chuyên môn">
          {person.specialties.slice(0, 4).map((specialty) => (
            <span key={specialty}>{specialty}</span>
          ))}
        </div>
        <Link className="arrow-link" href={`/staffs/${person.slug}`}>
          {content.linkLabel} <b aria-hidden="true">↗</b>
        </Link>
      </div>
    </section>
  );
}
