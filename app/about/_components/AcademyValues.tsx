import type { AboutPage } from "@/lib/types";

export function AcademyValues({ content }: { content: AboutPage["values"] }) {
  return (
    <section className="values">
      <h2>{content.title}</h2>
      <ol>
        {content.items.map((value, index) => (
          <li key={value.title}>
            <span className="values-number">{String(index + 1).padStart(2, "0")}</span>
            <h3>{value.title}</h3>
            <p>{value.copy}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
