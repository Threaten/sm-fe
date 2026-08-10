import { ArrowLink } from "@/components/ArrowLink";

export default function NotFound() {
  return (
    <section className="not-found">
      <span>404</span>
      <h1>Wrong bottle.</h1>
      <p>Whatever you were looking for isn&apos;t behind this door.</p>
      <ArrowLink href="/">Back to the bar</ArrowLink>
    </section>
  );
}
