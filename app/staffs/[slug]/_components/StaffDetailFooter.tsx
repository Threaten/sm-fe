import Link from "next/link";
import type { StaffMember, TeamPage } from "@/lib/types";

export function StaffDetailFooter({ nextPerson, labels }: { nextPerson: StaffMember; labels: TeamPage["profile"] }) {
  return (
    <section className="next-up">
      <p className="label">{labels.nextLabel}</p>
      <Link href={`/staffs/${nextPerson.slug}`}>
        <img src={nextPerson.image.url} alt="" />
        <span>{nextPerson.name}</span>
        <b className="icon icon-arrow" aria-hidden="true" />
      </Link>
    </section>
  );
}
