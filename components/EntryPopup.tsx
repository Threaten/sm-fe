"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type EntryPopupContent = {
  enabled: boolean;
  promotionActive: boolean;
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
  ctaLabel: string;
  ctaHref: string;
  dismissLabel: string;
  additionalSlides: {
    active: boolean;
    displayMode: "image" | "video";
    eyebrow?: string;
    title?: string;
    copy?: string;
    image?: string;
    imageAlt?: string;
    videoUrl?: string;
    ctaLabel?: string;
    ctaHref?: string;
  }[];
};

type PopupSlide =
  | {
      kind: "promotion";
      eyebrow: string;
      title: string;
      copy: string;
      image?: string;
      ctaLabel: string;
      ctaHref: string;
      dismissLabel: string;
    }
  | {
      kind: "image";
      image: string;
      imageAlt?: string;
      eyebrow?: string;
      title?: string;
      copy?: string;
      ctaLabel?: string;
      ctaHref?: string;
    }
  | {
      kind: "video";
      videoSrc: string;
      orientation: "portrait" | "landscape";
      title?: string;
    };

export function EntryPopup({ content }: { content: EntryPopupContent }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const closeButton = useRef<HTMLButtonElement>(null);

  const slides: PopupSlide[] = [];
  if (content.promotionActive) {
    slides.push({
      kind: "promotion",
      eyebrow: content.eyebrow,
      title: content.title,
      copy: content.copy,
      image: content.image,
      ctaLabel: content.ctaLabel,
      ctaHref: content.ctaHref,
      dismissLabel: content.dismissLabel,
    });
  }
  for (const item of content.additionalSlides ?? []) {
    if (!item.active) continue;
    if (item.displayMode === "video") {
      const videoEmbed = getVideoEmbed(item.videoUrl);
      if (videoEmbed) slides.push({ kind: "video", ...videoEmbed, title: item.title });
    } else if (item.image) {
      slides.push({
        kind: "image",
        image: item.image,
        imageAlt: item.imageAlt,
        eyebrow: item.eyebrow,
        title: item.title,
        copy: item.copy,
        ctaLabel: item.ctaLabel,
        ctaHref: item.ctaHref,
      });
    }
  }

  useEffect(() => {
    if (!content.enabled || slides.length === 0) return;
    const timer = window.setTimeout(() => {
      setActiveIndex(0);
      setOpen(true);
    }, 450);
    return () => window.clearTimeout(timer);
  }, [content.enabled, slides.length]);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) => (index - 1 + slides.length) % slides.length);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((index) => (index + 1) % slides.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [open, slides.length]);

  const dismiss = () => {
    setOpen(false);
    setActiveIndex(0);
  };

  if (!open || slides.length === 0) return null;

  const currentIndex = activeIndex % slides.length;
  const currentSlide = slides[currentIndex];
  const isFullMediaSlide = currentSlide.kind === "video";
  const carouselControls = slides.length > 1 && (
    <nav
      className={`entry-popup-carousel-nav ${isFullMediaSlide ? "entry-popup-carousel-nav-overlay" : ""}`}
      aria-label="Điều hướng nội dung popup"
    >
      <button
        type="button"
        aria-label="Slide trước"
        onClick={() => setActiveIndex((currentIndex - 1 + slides.length) % slides.length)}
      >
        <span aria-hidden="true">‹</span>
      </button>
      <div className="entry-popup-carousel-indicators">
        {slides.map((slide, index) => (
          <button
            key={`${slide.kind}-${index}`}
            type="button"
            aria-label={`Chuyển đến slide ${index + 1}`}
            aria-current={index === currentIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        type="button"
        aria-label="Slide tiếp theo"
        onClick={() => setActiveIndex((currentIndex + 1) % slides.length)}
      >
        <span aria-hidden="true">›</span>
      </button>
    </nav>
  );

  return (
    <div
      className="entry-popup-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <section
        className={`entry-popup ${((currentSlide.kind === "promotion" && currentSlide.image) || currentSlide.kind === "image") ? "entry-popup-with-image" : ""} ${currentSlide.kind === "video" ? `entry-popup-full-media entry-popup-full-media-${currentSlide.orientation}` : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={currentSlide.kind === "promotion" ? "entry-popup-title" : undefined}
        aria-label={currentSlide.kind !== "promotion" ? currentSlide.title || "Skill & Mix" : undefined}
        aria-describedby={currentSlide.kind === "promotion" ? "entry-popup-copy" : undefined}
      >
        <button
          ref={closeButton}
          className="entry-popup-close"
          type="button"
          onClick={dismiss}
          aria-label="Đóng thông báo"
        >
          <span className="icon icon-close" aria-hidden="true" />
        </button>
        {currentSlide.kind === "video" && (
          <iframe
            className="entry-popup-video"
            src={currentSlide.videoSrc}
            title={currentSlide.title || "Embedded video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
        {currentSlide.kind === "image" && (
          <>
            <figure>
              <img src={currentSlide.image} alt={currentSlide.imageAlt ?? ""} />
            </figure>
            <div className="entry-popup-content">
              {currentSlide.eyebrow && <p className="eyebrow">{currentSlide.eyebrow}</p>}
              {currentSlide.title && <h2>{currentSlide.title}</h2>}
              {currentSlide.copy && <p>{currentSlide.copy}</p>}
              {currentSlide.ctaLabel && currentSlide.ctaHref && (
                <div className="entry-popup-actions">
                  <Link href={currentSlide.ctaHref} onClick={dismiss}>
                    {currentSlide.ctaLabel} <span className="icon icon-arrow-up-right" aria-hidden="true" />
                  </Link>
                </div>
              )}
              {carouselControls}
            </div>
          </>
        )}
        {currentSlide.kind === "promotion" && (
          <>
            {currentSlide.image && (
              <figure>
                <img src={currentSlide.image} alt="" />
              </figure>
            )}
            <div className="entry-popup-content">
              <p className="eyebrow">{currentSlide.eyebrow}</p>
              <h2 id="entry-popup-title">{currentSlide.title}</h2>
              <p id="entry-popup-copy">{currentSlide.copy}</p>
              <div className="entry-popup-actions">
                <Link href={currentSlide.ctaHref} onClick={dismiss}>
                  {currentSlide.ctaLabel} <span className="icon icon-arrow-up-right" aria-hidden="true" />
                </Link>
                <button type="button" onClick={dismiss}>
                  {currentSlide.dismissLabel}
                </button>
              </div>
              {carouselControls}
            </div>
          </>
        )}
        {currentSlide.kind === "video" && carouselControls}
      </section>
    </div>
  );
}

function getVideoEmbed(value?: string):
  | { videoSrc: string; orientation: "portrait" | "landscape" }
  | undefined {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be" || host === "youtube.com" || host === "youtube-nocookie.com") {
      const id = host === "youtu.be"
        ? url.pathname.slice(1).split("/")[0]
        : url.pathname === "/watch"
          ? url.searchParams.get("v")
          : url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1];
      return id
        ? { videoSrc: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0`, orientation: "landscape" }
        : undefined;
    }

    if (host === "tiktok.com") {
      const id = url.pathname.match(/\/video\/(\d+)/)?.[1]
        ?? url.pathname.match(/^\/v\/(\d+)/)?.[1];
      return id
        ? { videoSrc: `https://www.tiktok.com/player/v1/${id}`, orientation: "portrait" }
        : undefined;
    }

    if (host === "instagram.com") {
      const match = url.pathname.match(/^\/(reel|reels|p|tv)\/([\w-]+)/);
      return match
        ? {
            videoSrc: `https://www.instagram.com/${match[1]}/${match[2]}/embed/`,
            orientation: "portrait",
          }
        : undefined;
    }

    if (["facebook.com", "m.facebook.com", "web.facebook.com", "fb.watch"].includes(host)) {
      if (!/\/(?:watch|videos|reel|reels|share\/v|share\/r)/.test(url.pathname) && host !== "fb.watch") {
        return undefined;
      }
      const facebookVideoUrl = new URL(value);
      const query = new URLSearchParams({
        href: facebookVideoUrl.toString(),
        show_text: "false",
        width: "1280",
      });
      return {
        videoSrc: `https://www.facebook.com/plugins/video.php?${query.toString()}`,
        orientation: "landscape",
      };
    }

    return undefined;
  } catch {
    return undefined;
  }
}
