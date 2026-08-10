import Link from "next/link";

export function ArrowLink({ href, children, inverse = false }: { href: string; children: React.ReactNode; inverse?: boolean }) {
  return (
    <Link href={href} className={`arrow-link ${inverse ? "arrow-link-inverse" : ""}`}>
      <span>{children}</span><b>↗</b>
    </Link>
  );
}
