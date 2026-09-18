import Link from "next/link";
import { StaffMember } from "@/lib/data";

export function StaffDetailFooter({ nextPerson, content }: { nextPerson: StaffMember; content: any }) {
  return (
    <section className="staff-detail-footer">
      <p className="eyebrow">{content.nextLabel}</p>
      <Link href={`/staffs/${nextPerson.slug}`}>
        <span>{nextPerson.name}</span>
        <b className="icon icon-arrow-up-right" aria-hidden="true" />
      </Link>
    </section>
  );
}
