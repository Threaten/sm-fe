import { ArrowLink } from "@/components/ArrowLink";
import type { HomePage, StaffMember } from "@/lib/types";

export function FeaturedInstructor({
  content,
  person,
}: {
  content: HomePage["featuredInstructor"];
  person: StaffMember;
}) {
  return (
    <section className="featured-instructor">
      <div className="featured-instructor-head">
        <p className="label">{content.eyebrow}</p>
        <h2>{content.title}</h2>
      </div>
      <figure className="featured-instructor-portrait tape">
        <img src={person.image.url} alt={person.image.alt} />
        <figcaption>{person.note}</figcaption>
      </figure>
      <div className="featured-instructor-body">
        <p className="featured-instructor-name">{person.name}</p>
        <p className="label">{person.role}</p>
        <blockquote>“{person.quote}”</blockquote>
        <ul className="chips" aria-label="Chuyên môn">
          {person.specialties.map((specialty) => (
            <li key={specialty}>{specialty}</li>
          ))}
        </ul>
        <ArrowLink href={`/staffs/${person.slug}`} tone="red">
          {content.linkLabel}
        </ArrowLink>
      </div>
    </section>
  );
}
