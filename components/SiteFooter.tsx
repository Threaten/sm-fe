import Link from "next/link";
import { BrandMark } from "./BrandMark";

type FooterData = {
  tagline: string;
  address: string;
  email: string;
  phone: string;
};

export function SiteFooter({ footer }: { footer: FooterData }) {
  const addressLines = footer.address.split("\n");

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <p className="eyebrow">{footer.tagline}</p>
        <h2>Practice makes delicious.</h2>
        <Link
          className="circle-link"
          href="/contact-us"
        >
          <span>Let&apos;s talk</span>
          <b aria-hidden="true">↗</b>
        </Link>
      </div>
      <div className="footer-bottom">
        <BrandMark />
        <div className="footer-detail">
          <p className="footer-meta-label">Find us</p>
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
          <p className="footer-meta-label">Talk to us</p>
          <Link href={`mailto:${footer.email}`}>{footer.email}</Link>
          <p><a href={`tel:${footer.phone.replace(/\s/g, "")}`}>{footer.phone}</a></p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <p className="footer-meta-label">Explore</p>
          <Link href="/courses">Courses</Link>
          <Link href="/gallery">Instagram</Link>
          <Link href="/contact-us">Visit</Link>
        </nav>
      </div>
      <p className="copyright">© 2026 Skill &amp; Mix. Practice responsibly.</p>
    </footer>
  );
}
