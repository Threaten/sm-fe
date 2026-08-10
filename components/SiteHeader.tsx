"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark } from "./BrandMark";

type NavigationItem = { label: string; href: string };

export function SiteHeader({ navigation }: { navigation: NavigationItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header className="site-header">
      <BrandMark />
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={pathname === href ? "active" : ""}
            aria-current={pathname === href ? "page" : undefined}
          >
            {label === "Staffs" ? "Team" : label}
          </Link>
        ))}
      </nav>
      <Link href="/contact-us" className="header-cta">
        Book a class <span>↗</span>
      </Link>
      <button
        className="menu-button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label="Toggle menu"
      >
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
          {navigation.map(({ label, href }, index) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>
              {label === "Staffs" ? "Team" : label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
