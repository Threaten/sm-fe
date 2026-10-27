import Link from "next/link";

export function ArrowLink({
  href,
  children,
  tone = "black",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "black" | "white" | "red";
}) {
  return (
    <Link href={href} className={`arrow-link arrow-link-${tone}`}>
      <span>{children}</span>
      <b className="icon icon-arrow" aria-hidden="true" />
    </Link>
  );
}
