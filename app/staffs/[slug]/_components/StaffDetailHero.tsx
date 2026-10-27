import Link from "next/link";
import { Lines } from "@/components/Lines";
import type { StaffMember, TeamPage } from "@/lib/types";

export function StaffDetailHero({
  person,
  number,
  labels,
}: {
  person: StaffMember;
  number: number;
  labels: TeamPage["profile"];
}) {
  return (
    <section className="profile-hero">
      <nav className="crumb">
        <Link href="/staffs">
          <span className="icon icon-arrow-left" aria-hidden="true" /> {labels.backLabel}
        </Link>
        <span>
          {labels.profileLabel} / {String(number).padStart(2, "0")}
        </span>
      </nav>
      <div className="profile-hero-title">
        <p className="label">{person.role}</p>
        <h1>{person.name}</h1>
      </div>
      <figure className="profile-hero-portrait tape">
        <img src={person.image.url} alt={person.image.alt} />
        <figcaption>{person.note}</figcaption>
      </figure>
      <p className="stamp profile-hero-stamp" aria-hidden="true">
        <Lines text={labels.stamp} />
      </p>
    </section>
  );
}
