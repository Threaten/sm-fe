import Link from "next/link";
import type { StaffMember, TeamPage } from "@/lib/types";

export function StaffDetailFooter({ nextPerson, labels }: { nextPerson: StaffMember; labels: TeamPage["profile"] }) {
  return (
    <section className="next-up">
      <p className="label">{labels.nextLabel}</p>
      <Link href={`/staffs/${nextPerson.slug}`}>
        <img src={nextPerson.image.url} alt="" loading="lazy" />
        <span>{nextPerson.name}</span>
      </Link>
    </section>
  );
}
