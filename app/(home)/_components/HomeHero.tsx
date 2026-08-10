import { ArrowLink } from "@/components/ArrowLink";
import { Scribble } from "@/components/Scribble";
import { Starburst } from "@/components/Starburst";

type HomeHeroContent = {
  kickerLeft: string;
  kickerRight: string;
  titleLineOne: string;
  titleWord: string;
  titleEmphasis: string;
  titleLineThree: string;
  summary: string;
  buttonLabel: string;
  imageLeft: string;
  imageRight: string;
  burstTop: string;
  burstBottom: string;
  noteLineOne: string;
  noteLineTwo: string;
};

export function HomeHero({ content }: { content: HomeHeroContent }) {
  return (
    <section className="home-hero">
      <div className="hero-kicker">
        <span>{content.kickerLeft}</span>
        <span>{content.kickerRight}</span>
      </div>
      <div className="hero-body">
        <div className="hero-copy">
          <h1>
            <span>{content.titleLineOne}</span>
            <span className="hero-word">
              {content.titleWord} <i>{content.titleEmphasis}</i>
            </span>
            <span>{content.titleLineThree}</span>
          </h1>
          <p className="hero-summary">{content.summary}</p>
          <div className="hero-actions">
            <ArrowLink href="/courses">{content.buttonLabel}</ArrowLink>
          </div>
        </div>
        <div className="hero-stage" aria-hidden="true">
          <div className="hero-photo hero-photo-left">
            <img src={content.imageLeft} alt="" />
          </div>
          <div className="hero-photo hero-photo-right">
            <img src={content.imageRight} alt="" />
          </div>
          <Starburst className="hero-burst">
            {content.burstTop}
            <br />
            {content.burstBottom}
          </Starburst>
          <div className="hero-note">
            <Scribble />
            <p>
              {content.noteLineOne}
              <br />
              {content.noteLineTwo}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
