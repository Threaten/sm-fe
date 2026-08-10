import Link from "next/link";
import type { StaffMember } from "@/lib/data";

export function StaffGrid({ staff }: { staff: StaffMember[] }) {
  return (
    <section className="staff-grid">
      {staff.map((person, index) => (
        <article
          key={person.name}
          className={`staff-card staff-card-${index + 1}`}
        >
          <Link
            href={`/staffs/${person.slug}`}
            className="staff-card-link"
            aria-label={`Meet ${person.name}`}
          >
            <div className="staff-photo">
              <img src={person.image} alt={`${person.name}, ${person.role}`} />
              <span>0{index + 1}</span>
            </div>
            <h2>{person.name}</h2>
            <p className="staff-role">{person.role}</p>
            <p>{person.note}</p>
            <b className="staff-card-arrow">Meet {person.shortName} ↗</b>
          </Link>
        </article>
      ))}
    </section>
  );
}
