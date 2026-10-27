import Link from "next/link";

export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={`brand-mark ${inverse ? "brand-mark-inverse" : ""}`} aria-label="Skill & Mix home">
      <span className="brand-mark-name">
        skill<span className="brand-mark-amp">&amp;</span>mix
      </span>
      <span className="brand-mark-school">
        bartending
        <br />
        school
      </span>
    </Link>
  );
}
