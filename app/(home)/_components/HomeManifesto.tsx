import { ArrowLink } from "@/components/ArrowLink";

type HomeManifestoContent = {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  stampTop: string;
  stampBottom: string;
};

export function HomeManifesto({ content }: { content: HomeManifestoContent }) {
  return (
    <section className="home-manifesto">
      <div className="manifesto-photo">
        <img
          src={content.image}
          alt="Friends raising cocktails around a lively table"
        />
        <span className="photo-stamp">
          {content.stampTop}
          <br />
          {content.stampBottom}
        </span>
      </div>
      <div className="manifesto-copy">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2>{content.title}</h2>
        <p>{content.copy}</p>
        <ArrowLink href="/about">Meet the academy</ArrowLink>
      </div>
    </section>
  );
}
