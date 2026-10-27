import Link from "next/link";
import type { Image } from "@/lib/types";

export function BrandMark({ logo, inverse = false }: { logo?: Image | null; inverse?: boolean }) {
  return (
    <Link href="/" className={`brand-mark ${inverse ? "brand-mark-inverse" : ""}`} aria-label="Skill & Mix home">
      {logo ? (
        <img className="brand-mark-logo" src={logo.url} alt="" loading={inverse ? "lazy" : undefined} />
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
