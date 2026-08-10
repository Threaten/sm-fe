import { Scribble } from "@/components/Scribble";

type HomeQuoteContent = {
  quote: string;
  author: string;
  role: string;
};

export function HomeQuote({ content }: { content: HomeQuoteContent }) {
  return (
    <section className="home-quote">
      <span className="quote-mark">“</span>
      <blockquote>{content.quote}</blockquote>
      <div className="quote-credit">
        <Scribble />
        <p>
          {content.author}
          <br />
          <span>{content.role}</span>
        </p>
      </div>
    </section>
  );
}
