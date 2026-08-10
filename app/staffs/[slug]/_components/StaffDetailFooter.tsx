import Link from "next/link";
import { StaffMember } from "@/lib/data";

export function StaffDetailFooter({ nextPerson }: { nextPerson: StaffMember }) {
  return (
    <section className="staff-detail-footer">
      <p className="eyebrow">Next behind the bar</p>
      <Link href={`/staffs/${nextPerson.slug}`}>
        <span>{nextPerson.name}</span>
        <b>↗</b>
      </Link>
    </section>
  );
}
