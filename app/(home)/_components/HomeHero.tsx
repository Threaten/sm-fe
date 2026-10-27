import { ArrowLink } from "@/components/ArrowLink";
import { Lines } from "@/components/Lines";
import { Starburst } from "@/components/Starburst";
import type { HomePage } from "@/lib/types";

export function HomeHero({ content }: { content: HomePage["hero"] }) {
  return (
    <section className="home-hero">
      <div className="hero-kicker label">
        <span>{content.kickerLeft}</span>
        <span>{content.kickerRight}</span>
      </div>
      <h1 className="hero-title">
        <span className="hero-line">{content.titleLineOne}</span>
        <span className="hero-line hero-line-big">
          {content.titleWord} <em>{content.titleEmphasis}</em>
        </span>
        <span className="hero-line">{content.titleLineThree}</span>
      </h1>
      <div className="hero-stage">
        <figure className="hero-photo hero-photo-left tape">
          <img src={content.imageLeft.url} alt={content.imageLeft.alt} />
        </figure>
        <figure className="hero-photo hero-photo-right tape">
          <img src={content.imageRight.url} alt={content.imageRight.alt} />
        </figure>
        <Starburst text={content.burst} className="hero-burst" />
      </div>
      <div className="hero-foot">
        <p className="hero-summary">{content.summary}</p>
        <ArrowLink href="/courses" tone="red">
          {content.buttonLabel}
        </ArrowLink>
        <p className="hero-note">
          <Lines text={content.note} />
        </p>
      </div>
    </section>
  );
}
