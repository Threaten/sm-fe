import { ArrowLink } from "@/components/ArrowLink";

type ServiceItem = {
  number: string;
  title: string;
  label: string;
  copy: string;
  image: string;
};

export function ServiceList({ services }: { services: ServiceItem[] }) {
  return (
    <section className="service-list">
      {services.map((service, index) => (
        <article
          key={service.number}
          className={index % 2 ? "service-reverse" : ""}
        >
          <div className="service-image">
            <img src={service.image} alt="" />
            <span>{service.number}</span>
          </div>
          <div className="service-copy">
            <p className="eyebrow">{service.label}</p>
            <h2>{service.title}</h2>
            <p>{service.copy}</p>
            <ArrowLink href="/contact-us">Start a conversation</ArrowLink>
          </div>
        </article>
      ))}
    </section>
  );
}
