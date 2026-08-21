import Link from "next/link";
import { BrandMark } from "./BrandMark";

type FooterData = {
  tagline: string;
  address: string;
  email: string;
  phone: string;
  headline: string; ctaLabel: string; addressLabel: string; contactLabel: string;
  linksLabel: string; copyright: string; links: { label: string; href: string }[];
};

export function SiteFooter({ footer }: { footer: FooterData }) {
  const addressLines = footer.address.split("\n");

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <p className="eyebrow">{footer.tagline}</p>
        <h2>{footer.headline}</h2>
        <Link
          className="circle-link"
          href="/contact-us"
        >
          <span>{footer.ctaLabel}</span>
          <b aria-hidden="true">↗</b>
        </Link>
      </div>
      <div className="footer-bottom">
        <BrandMark />
        <div className="footer-detail">
          <p className="footer-meta-label">{footer.addressLabel}</p>
          <p>
            {addressLines.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
        <div className="footer-detail">
          <p className="footer-meta-label">{footer.contactLabel}</p>
          <Link href={`mailto:${footer.email}`}>{footer.email}</Link>
          <p><a href={`tel:${footer.phone.replace(/\s/g, "")}`}>{footer.phone}</a></p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <p className="footer-meta-label">{footer.linksLabel}</p>
          {footer.links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
      </div>
      <p className="copyright">{footer.copyright}</p>
    </footer>
  );
}
