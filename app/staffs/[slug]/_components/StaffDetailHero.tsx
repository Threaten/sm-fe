import Link from "next/link";
import { StaffMember } from "@/lib/data";

export function StaffDetailHero({ person, index }: { person: StaffMember; index: number }) {
  return (
    <section className="staff-detail-hero">
      <div className="staff-detail-topline">
        <Link href="/staffs">← All staff</Link>
        <span>Profile / 0{index + 1}</span>
      </div>
      <div className="staff-detail-title">
        <p>{person.role}</p>
        <h1>{person.name}</h1>
      </div>
      <figure className="staff-detail-portrait">
        <img src={person.image} alt={`${person.name}, ${person.role}`} />
        <figcaption>{person.note}</figcaption>
      </figure>
      <div className="staff-detail-stamp">Skill<br />&amp; Mix<br />faculty</div>
    </section>
  );
}
