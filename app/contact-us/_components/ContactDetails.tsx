type ContactPanel = {
  number: string;
  title: string;
  href: string;
  linkText: string;
  copy: string;
};

export function ContactDetails({ panels }: { panels: ContactPanel[] }) {
  return (
    <section className="contact-details">
      {panels.map((panel) => (
        <div key={panel.number}>
          <span>{panel.number}</span>
          <h2>{panel.title}</h2>
          <p>{panel.copy}</p>
          <a
            href={panel.href}
            target={panel.href.startsWith("http") ? "_blank" : undefined}
            rel={panel.href.startsWith("http") ? "noreferrer" : undefined}
          >
            {panel.linkText}
          </a>
        </div>
      ))}
    </section>
  );
}
