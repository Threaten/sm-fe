import type { Course, CoursesPage } from "@/lib/types";

export function CourseSyllabus({ course, labels }: { course: Course; labels: CoursesPage["detail"] }) {
  if (!course.syllabus.length) return null;

  return (
    <section className="syllabus">
      <div className="syllabus-intro">
        <p className="label">{labels.syllabusEyebrow}</p>
        <h2>{labels.syllabusTitle}</h2>
        <p>{labels.syllabusCopy}</p>
      </div>
      <div className="accordion">
        {course.syllabus.map((item, index) => {
          const number = <span>{String(index + 1).padStart(2, "0")}</span>;
          // A lesson only opens when it has something more to say.
          return item.description ? (
            <details key={item.title} open={index === 0}>
              <summary>
                {number}
                <h3>{item.title}</h3>
              </summary>
              <LessonBody text={item.description} />
            </details>
          ) : (
            <div key={item.title} className="accordion-row">
              {number}
              <h3>{item.title}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Editors type plain text in the CMS: lines starting with "-", "•", "*" or "+"
// become a bulleted list; other lines stay as paragraphs, in the order written.
const BULLET = /^\s*[-•*+]\s*/;

function LessonBody({ text }: { text: string }) {
  const blocks: ({ type: "p"; text: string } | { type: "ul"; items: string[] })[] = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    if (BULLET.test(line)) {
      const item = line.replace(BULLET, "");
      if (!item) continue;
      const last = blocks[blocks.length - 1];
      if (last?.type === "ul") last.items.push(item);
      else blocks.push({ type: "ul", items: [item] });
    } else {
      blocks.push({ type: "p", text: line });
    }
  }

  return (
    <div className="accordion-body">
      {blocks.map((block, i) =>
        block.type === "ul" ? (
          <ul key={i}>
            {block.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{block.text}</p>
        ),
      )}
    </div>
  );
}
