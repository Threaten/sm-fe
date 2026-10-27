import { Lines } from "@/components/Lines";
import type { ContactPage, SiteSettings } from "@/lib/types";

export function ContactDetails({
  panels,
  contact,
}: {
  panels: ContactPage["panels"];
  contact: SiteSettings["contact"];
}) {
  const items = [
    { title: panels.visitTitle, copy: contact.address, href: contact.mapUrl, link: panels.visitLinkLabel },
    { title: panels.emailTitle, copy: panels.emailNote, href: `mailto:${contact.email}`, link: contact.email },
    { title: panels.phoneTitle, copy: contact.hours, href: `tel:${contact.phone.replace(/\s/g, "")}`, link: contact.phone },
  ];

  return (
    <section className="contact-panels">
      {items.map((item, index) => (
        <div key={item.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h2>{item.title}</h2>
          <p>
            <Lines text={item.copy} />
          </p>
          <a
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
          >
            {item.link}
          </a>
        </div>
      ))}
    </section>
  );
}
