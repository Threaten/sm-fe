import Link from "next/link";
import type { StaffMember } from "@/lib/types";

export function StaffGrid({ staff, cardLinkLabel }: { staff: StaffMember[]; cardLinkLabel: string }) {
  return (
    <section className="staff-grid">
      {staff.map((person, index) => (
        <article key={person.slug} className="staff-card">
          <Link href={`/staffs/${person.slug}`}>
            <figure className="staff-card-photo">
              <img src={person.image.url} alt={person.image.alt} />
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            </figure>
            <p className="label">{person.role}</p>
            <h2>{person.name}</h2>
            <p>{person.note}</p>
            <b className="staff-card-cta">
              {cardLinkLabel} {person.shortName}
            </b>
          </Link>
        </article>
      ))}
    </section>
  );
}
