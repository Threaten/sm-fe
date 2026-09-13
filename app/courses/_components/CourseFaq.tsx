type CourseFaqContent = {
  eyebrow: string;
  title: string;
  items: { question: string; answer: string }[];
};

export function CourseFaq({ content }: { content: CourseFaqContent }) {
  if (!content.items.length) return null;

  return (
    <section className="course-faq">
      <header className="course-faq-heading">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2>{content.title}</h2>
      </header>
      <div className="course-faq-list">
        {content.items.map((item, index) => (
          <details key={item.question} name="course-faq">
            <summary>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.question}</h3>
              <b aria-hidden="true">+</b>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
