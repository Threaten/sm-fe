import { ArrowLink } from "@/components/ArrowLink";
import type { CoursesPage } from "@/lib/types";

export function CourseHelp({ content }: { content: CoursesPage["help"] }) {
  return (
    <section className="callout callout-red">
      <span className="callout-glyph" aria-hidden="true">?</span>
      <div>
        <p className="label">{content.eyebrow}</p>
        <h2>{content.title}</h2>
      </div>
      <ArrowLink href="/contact-us" tone="white">
        {content.linkLabel}
      </ArrowLink>
    </section>
  );
}
