"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type EntryPopupContent = {
  enabled: boolean;
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
  ctaLabel: string;
  ctaHref: string;
  dismissLabel: string;
};

export function EntryPopup({ content }: { content: EntryPopupContent }) {
  const [open, setOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!content.enabled) return;
    const timer = window.setTimeout(() => setOpen(true), 450);
    return () => window.clearTimeout(timer);
  }, [content.enabled]);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [open]);

  const dismiss = () => {
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="entry-popup-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <section
        className={`entry-popup ${content.image ? "entry-popup-with-image" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="entry-popup-title"
        aria-describedby="entry-popup-copy"
      >
        <button
          ref={closeButton}
          className="entry-popup-close"
          type="button"
          onClick={dismiss}
          aria-label="Đóng thông báo"
        >
          ×
        </button>
        {content.image && (
          <figure>
            <img src={content.image} alt="" />
          </figure>
        )}
        <div className="entry-popup-content">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="entry-popup-title">{content.title}</h2>
          <p id="entry-popup-copy">{content.copy}</p>
          <div className="entry-popup-actions">
            <Link href={content.ctaHref} onClick={dismiss}>
              {content.ctaLabel} <span aria-hidden="true">↗</span>
            </Link>
            <button type="button" onClick={dismiss}>
              {content.dismissLabel}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
