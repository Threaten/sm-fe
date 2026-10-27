"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Link as NavLink, SiteSettings } from "@/lib/types";
import { BrandMark } from "./BrandMark";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export function SiteHeader({
  announcementBar,
  navigation,
  cta,
}: {
  announcementBar: SiteSettings["announcementBar"];
  navigation: NavLink[];
  cta: NavLink;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      {announcementBar.enabled && announcementBar.message ? (
        <aside className="topbar" aria-label="Thông báo">
          <span>{announcementBar.message}</span>
          {announcementBar.linkHref && announcementBar.linkLabel ? (
            <Link href={announcementBar.linkHref}>
              {announcementBar.linkLabel} <b className="icon icon-arrow" aria-hidden="true" />
            </Link>
          ) : null}
        </aside>
      ) : null}
      <header className="site-header">
        <BrandMark />
        <nav className="site-nav" aria-label="Primary navigation">
          {navigation.map(({ label, href }, index) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(pathname, href) ? "page" : undefined}
            >
              <small>{String(index + 1).padStart(2, "0")}</small>
              {label}
            </Link>
          ))}
        </nav>
        <Link href={cta.href} className="header-cta">
          {cta.label} <b className="icon icon-arrow" aria-hidden="true" />
        </Link>
        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          <span className="menu-button-bars" aria-hidden="true" />
          <span className="sr-only">Menu</span>
        </button>
      </header>
      {open ? (
        <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
          {navigation.map(({ label, href }, index) => (
            <Link key={href} href={href} aria-current={isActive(pathname, href) ? "page" : undefined}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              {label}
            </Link>
          ))}
          <Link href={cta.href} className="mobile-menu-cta">
            {cta.label} <b className="icon icon-arrow" aria-hidden="true" />
          </Link>
        </nav>
      ) : null}
    </>
  );
}
