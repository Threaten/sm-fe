import { ArrowLink } from "@/components/ArrowLink";

export function CourseHelp() {
  return (
    <section className="course-help">
      <span>?</span>
      <div>
        <p className="eyebrow">Can&apos;t choose?</p>
        <h2>Tell us what you can make now. We&apos;ll tell you what comes next.</h2>
      </div>
      <ArrowLink href="/contact-us">Ask a human</ArrowLink>
    </section>
  );
}
