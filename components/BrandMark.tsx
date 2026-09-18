import Link from "next/link";

export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      className="brand-mark"
      aria-label="Skill & Mix home"
      style={inverse ? { color: "var(--paper)" } : undefined}
    >
      <span className="brand-mark-name">
        <span>skill</span>
        <span className="brand-mark-amp">&amp;</span>
        <span>mix</span>
        <span className="brand-mark-star" aria-hidden="true" />
      </span>
      <span className="brand-mark-school">bartending<br />school</span>
    </Link>
  );
}
