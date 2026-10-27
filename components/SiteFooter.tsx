import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { BrandMark } from "./BrandMark";
import { Lines } from "./Lines";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const { footer, contact, social, navigation, headerCta, logo } = settings;

  return (
    <footer className="site-footer">
      <div className="footer-call">
        <p className="label">{footer.tagline}</p>
        <h2>{footer.headline}</h2>
        <Link className="footer-cta" href={headerCta.href}>
          <span>{footer.ctaLabel}</span>
        </Link>
      </div>
      <div className="footer-grid">
        <div>
          <p className="label">{footer.addressLabel}</p>
          <p>
            <Lines text={contact.address} />
          </p>
          <p className="footer-hours">
            <Lines text={contact.hours} />
          </p>
        </div>
        <div>
          <p className="label">{footer.contactLabel}</p>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
          <a href={social.url} target="_blank" rel="noreferrer">
            {social.handle}
          </a>
        </div>
        <nav aria-label="Footer navigation">
          <p className="label">{footer.linksLabel}</p>
          {navigation.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="footer-base">
        <BrandMark logo={logo.imageOnDark ?? logo.image} inverse />
        <p>{footer.copyright}</p>
      </div>
    </footer>
  );
}
