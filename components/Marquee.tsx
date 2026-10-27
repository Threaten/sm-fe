export function Marquee({ text, tone = "red" }: { text: string; tone?: "red" | "black" }) {
  const phrases = text.split("/").map((phrase) => phrase.trim()).filter(Boolean);
  const run = (
    <span>
      {phrases.map((phrase, index) => (
        <span key={index}>
          {phrase}
          <b className="marquee-sep" aria-hidden="true">/</b>
        </span>
      ))}
    </span>
  );
  return (
    <div className={`marquee marquee-${tone}`} role="presentation">
      <p className="sr-only">{phrases.join(", ")}</p>
      <div className="marquee-track" aria-hidden="true">
        {run}
        {run}
        {run}
        {run}
      </div>
    </div>
  );
}
