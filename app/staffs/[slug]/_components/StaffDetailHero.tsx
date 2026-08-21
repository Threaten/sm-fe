import Link from "next/link";
import { StaffMember } from "@/lib/data";

export function StaffDetailHero({ person, index, content }: { person: StaffMember; index: number; content: any }) {
  return (
    <section className="staff-detail-hero">
      <div className="staff-detail-topline">
        <Link href="/staffs">← {content.backLabel}</Link>
        <span>{content.profileLabel} / 0{index + 1}</span>
      </div>
      <div className="staff-detail-title">
        <p>{person.role}</p>
        <h1>{person.name}</h1>
      </div>
      <figure className="staff-detail-portrait">
        <img src={person.image} alt={`${person.name}, ${person.role}`} />
        <figcaption>{person.note}</figcaption>
      </figure>
      <div className="staff-detail-stamp">{content.stamp.split("\n").map((line: string) => <span key={line}>{line}<br /></span>)}</div>
    </section>
  );
}
