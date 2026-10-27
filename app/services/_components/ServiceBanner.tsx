import type { ServicesPage } from "@/lib/types";

export function ServiceBanner({ content, email }: { content: ServicesPage["banner"]; email: string }) {
  return (
    <section className="callout callout-white">
      <div>
        <p className="label">{content.eyebrow}</p>
        <h2>{content.title}</h2>
      </div>
      <a className="callout-mail" href={`mailto:${email}`}>
        {email} <span className="icon icon-arrow" aria-hidden="true" />
      </a>
    </section>
  );
}
