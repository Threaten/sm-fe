"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Link as NavLink, SiteSettings } from "@/lib/types";
import { BrandMark } from "./BrandMark";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export function SiteHeader({
  announcementBar,
  navigation,
  cta,
  logo,
}: {
  announcementBar: SiteSettings["announcementBar"];
  navigation: NavLink[];
  cta: NavLink;
  logo: SiteSettings["logo"]["image"];
}) {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    // The header is sticky below the topbar, so the menu starts wherever the header ends.
    const placeMenu = () => {
      const bottom = header.current?.getBoundingClientRect().bottom ?? 0;
      document.body.style.setProperty("--menu-top", `${Math.max(bottom, 0)}px`);
    };
    placeMenu();
    window.addEventListener("resize", placeMenu);
    return () => window.removeEventListener("resize", placeMenu);
  }, [open]);

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
              {announcementBar.linkLabel}
            </Link>
          ) : null}
        </aside>
      ) : null}
      <header ref={header} className="site-header">
        <BrandMark logo={logo} />
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
          {cta.label}
        </Link>
        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? "Đóng" : "Menu"}
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
            {cta.label}
          </Link>
        </nav>
      ) : null}
    </>
  );
}
