import { ArrowLink } from "@/components/ArrowLink";

export function StaffNote() {
  return (
    <section className="staff-note">
      <div>
        <p className="eyebrow">Guest teachers, too</p>
        <h2>The team changes with the season.</h2>
      </div>
      <p>Distillers, bar owners, ceramicists, chefs, and the occasional deeply opinionated ice sculptor join selected classes.</p>
      <ArrowLink href="/contact-us">Teach with us</ArrowLink>
    </section>
  );
}
