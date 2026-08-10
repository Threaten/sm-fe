import { Scribble } from "./Scribble";

export function PageIntro({
  index,
  eyebrow,
  title,
  intro,
  accent = "acid",
}: {
  index: string;
  eyebrow: string;
  title: string;
  intro: string;
  accent?: "acid" | "coral" | "cobalt";
}) {
  return (
    <section className={`page-intro page-intro-${accent}`}>
      <div className="page-intro-meta">
        <span>{index}</span>
        <p>{eyebrow}</p>
      </div>
      <h1>{title}</h1>
      <div className="page-intro-copy">
        <Scribble />
        <p>{intro}</p>
      </div>
    </section>
  );
}
