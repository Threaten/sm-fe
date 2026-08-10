import { Starburst } from "@/components/Starburst";

type StoryContent = {
  eyebrow: string;
  title: string;
  copy: string;
  imageOne: string;
  imageOneAlt: string;
  imageOneCaption: string;
  imageTwo: string;
  imageTwoAlt: string;
  stampTop: string;
  stampBottom: string;
};

export function StoryCollage({ content }: { content: StoryContent }) {
  return (
    <section className="story-collage">
      <div className="story-lead">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2>{content.title}</h2>
        <p>{content.copy}</p>
      </div>
      <figure className="story-image story-image-one">
        <img src={content.imageOne} alt={content.imageOneAlt} />
        <figcaption>{content.imageOneCaption}</figcaption>
      </figure>
      <figure className="story-image story-image-two">
        <img src={content.imageTwo} alt={content.imageTwoAlt} />
      </figure>
      <Starburst>
        {content.stampTop}
        <br />
        {content.stampBottom}
      </Starburst>
    </section>
  );
}
