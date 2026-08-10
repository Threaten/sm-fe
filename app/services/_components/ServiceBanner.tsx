type ServiceBannerContent = {
  eyebrow: string;
  title: string;
  email: string;
};

export function ServiceBanner({ content }: { content: ServiceBannerContent }) {
  return (
    <section className="service-banner">
      <p>{content.eyebrow}</p>
      <h2>{content.title}</h2>
      <a href={`mailto:${content.email}`}>{content.email} ↗</a>
    </section>
  );
}
