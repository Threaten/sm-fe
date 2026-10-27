import { ArrowLink } from "@/components/ArrowLink";
import type { Service } from "@/lib/types";

export function ServiceList({ services, linkLabel }: { services: Service[]; linkLabel: string }) {
  return (
    <section className="services">
      {services.map((service, index) => (
        <article key={service.title} className="service">
          <figure className="service-image">
            <img src={service.image.url} alt={service.image.alt} />
          </figure>
          <span className="service-number" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="service-copy">
            <p className="label">{service.label}</p>
            <h2>{service.title}</h2>
            <p>{service.copy}</p>
            <ArrowLink href="/contact-us">{linkLabel}</ArrowLink>
          </div>
        </article>
      ))}
    </section>
  );
}
