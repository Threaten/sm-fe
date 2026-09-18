export function Marquee({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div className={`marquee ${dark ? "marquee-dark" : ""}`} aria-hidden="true">
      <div>
        {Array.from({ length: 6 }).map((_, i) => <span key={i}>{text} <b className="marquee-mark" aria-hidden="true" /> </span>)}
      </div>
    </div>
  );
}
