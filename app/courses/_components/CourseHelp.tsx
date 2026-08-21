import { ArrowLink } from "@/components/ArrowLink";

export function CourseHelp({ content }: { content: { eyebrow: string; title: string; linkLabel: string } }) {
  return (
    <section className="course-help">
      <span>?</span>
      <div>
        <p className="eyebrow">{content.eyebrow}</p>
        <h2>{content.title}</h2>
      </div>
      <ArrowLink href="/contact-us">{content.linkLabel}</ArrowLink>
    </section>
  );
}
