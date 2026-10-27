import { ArrowLink } from "@/components/ArrowLink";
import type { TeamPage } from "@/lib/types";

export function StaffNote({ content }: { content: TeamPage["note"] }) {
  return (
    <section className="callout callout-red">
      <div>
        <p className="label">{content.eyebrow}</p>
        <h2>{content.title}</h2>
      </div>
      <p>{content.copy}</p>
      <ArrowLink href="/contact-us" tone="white">
        {content.linkLabel}
      </ArrowLink>
    </section>
  );
}
