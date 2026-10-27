import { Starburst } from "@/components/Starburst";
import type { AboutPage } from "@/lib/types";

export function StoryCollage({ content }: { content: AboutPage["story"] }) {
  return (
    <section className="story">
      <div className="story-lead">
        <p className="label">{content.eyebrow}</p>
        <h2>{content.title}</h2>
        <p>{content.copy}</p>
      </div>
      <figure className="story-photo story-photo-one tape">
        <img src={content.imageOne.url} alt={content.imageOne.alt} loading="lazy" />
        <figcaption>{content.imageOneCaption}</figcaption>
      </figure>
      <figure className="story-photo story-photo-two tape">
        <img src={content.imageTwo.url} alt={content.imageTwo.alt} loading="lazy" />
      </figure>
      <Starburst text={content.stamp} className="story-burst" />
    </section>
  );
}
