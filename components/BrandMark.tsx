import Link from "next/link";
import type { Image } from "@/lib/types";

// The trimmed copy from app/brand; the file name changes with each upload, so it doubles as a cache key.
const logoSrc = (logo: Image, inverse: boolean) =>
  `/brand/${inverse ? "dark" : "light"}?v=${encodeURIComponent(logo.url.split("/").pop() ?? "")}`;

export function BrandMark({ logo, inverse = false }: { logo?: Image | null; inverse?: boolean }) {
  return (
    <Link href="/" className={`brand-mark ${inverse ? "brand-mark-inverse" : ""}`} aria-label="Skill & Mix home">
      {logo ? (
        <img className="brand-mark-logo" src={logoSrc(logo, inverse)} alt="" loading={inverse ? "lazy" : undefined} />
      ) : (
        <>
          <span className="brand-mark-name">
            skill<span className="brand-mark-amp">&amp;</span>mix
          </span>
          <span className="brand-mark-school">
            bartending
            <br />
            school
          </span>
        </>
      )}
    </Link>
  );
}
