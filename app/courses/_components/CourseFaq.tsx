import type { CoursesPage } from "@/lib/types";

export function CourseFaq({ content }: { content: CoursesPage["faq"] }) {
  if (!content.items.length) return null;

  return (
    <section className="faq">
      <header>
        <p className="label">{content.eyebrow}</p>
        <h2>{content.title}</h2>
      </header>
      <div className="accordion">
        {content.items.map((item, index) => (
          <details key={item.question} name="course-faq">
            <summary>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.question}</h3>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
