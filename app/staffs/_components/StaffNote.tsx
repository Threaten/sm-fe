import { ArrowLink } from "@/components/ArrowLink";

export function StaffNote({ content }: { content: { eyebrow: string; title: string; copy: string; linkLabel: string } }) {
  return (
    <section className="staff-note">
      <div>
        <p className="eyebrow">{content.eyebrow}</p>
        <h2>{content.title}</h2>
      </div>
      <p>{content.copy}</p>
      <ArrowLink href="/contact-us">{content.linkLabel}</ArrowLink>
    </section>
  );
}
