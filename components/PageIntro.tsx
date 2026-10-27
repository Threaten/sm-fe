import type { PageIntro as PageIntroContent } from "@/lib/types";
import { Scribble } from "./Scribble";

export function PageIntro({ intro, number }: { intro: PageIntroContent; number?: string }) {
  return (
    <section className={`page-intro page-intro-${intro.accent}`}>
      <div className="page-intro-meta">
        {number ? <span className="page-intro-number">{number}</span> : null}
        <p className="label">{intro.eyebrow}</p>
      </div>
      <h1>{intro.title}</h1>
      <div className="page-intro-copy">
        <Scribble />
        <p>{intro.copy}</p>
      </div>
      <div className="ruler" aria-hidden="true" />
    </section>
  );
}
