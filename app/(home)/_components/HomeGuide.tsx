import Link from "next/link";
import { TextBlocks } from "@/components/TextBlocks";
import type { HomePage } from "@/lib/types";

/** Longer text answering "học bartender TP.HCM" searches, with links into the course pages. */
export function HomeGuide({ content }: { content: HomePage["guide"] }) {
  if (!content.title && !content.sections.length) return null;

  return (
    <section className="course-section home-guide">
      <div className="syllabus-intro">
        {content.eyebrow ? <p className="label">{content.eyebrow}</p> : null}
        <h2>{content.title}</h2>
        {content.intro ? <p>{content.intro}</p> : null}
      </div>
      <div className="home-guide-body">
        {content.sections.map((section) => (
          <article key={section.heading}>
            <h3>{section.heading}</h3>
            <TextBlocks className="course-about-body" text={section.body ?? ""} />
            {section.linkLabel && section.linkHref ? (
              <Link className="home-guide-link" href={section.linkHref}>
                {section.linkLabel}
              </Link>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
