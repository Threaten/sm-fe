import { ArrowLink } from "@/components/ArrowLink";
import { Lines } from "@/components/Lines";
import type { HomePage } from "@/lib/types";

export function HomeManifesto({ content }: { content: HomePage["manifesto"] }) {
  return (
    <section className="manifesto">
      <figure className="manifesto-photo">
        <img src={content.image.url} alt={content.image.alt} />
        <span className="stamp" aria-hidden="true">
          <Lines text={content.stamp} />
        </span>
      </figure>
      <div className="manifesto-copy">
        <p className="label">{content.eyebrow}</p>
        <h2>{content.title}</h2>
        <p>{content.copy}</p>
        <ArrowLink href="/about">{content.linkLabel}</ArrowLink>
      </div>
    </section>
  );
}
