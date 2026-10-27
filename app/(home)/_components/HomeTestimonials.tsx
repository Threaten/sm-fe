"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "@/lib/types";

export function HomeTestimonials({ eyebrow, testimonials }: { eyebrow: string; testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  useEffect(() => {
    if (paused || total < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % total), 6500);
    return () => window.clearInterval(timer);
  }, [paused, total]);

  if (!total) return null;
  const testimonial = testimonials[active % total];
  const move = (direction: number) => setActive((current) => (current + direction + total) % total);

  return (
    <section
      className="testimonials"
      aria-roledescription="carousel"
      aria-label={eyebrow}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="testimonials-top">
        <p className="label">{eyebrow}</p>
        <span className="testimonials-count">
          <b>{String(active + 1).padStart(2, "0")}</b> / {String(total).padStart(2, "0")}
        </span>
      </div>
      <figure className="testimonial" aria-live="polite">
        <blockquote key={active}>{testimonial.quote}</blockquote>
        <figcaption>
          <strong>{testimonial.author}</strong>
          <span>{testimonial.role}</span>
        </figcaption>
      </figure>
      <div className="testimonials-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Feedback trước">
          <span className="icon icon-arrow-left" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => move(1)} aria-label="Feedback tiếp theo">
          <span className="icon icon-arrow-right" aria-hidden="true" />
        </button>
        <div className="testimonials-dots">
          {testimonials.map((item, index) => (
            <button
              type="button"
              key={`${item.author}-${index}`}
              onClick={() => setActive(index)}
              aria-label={`Feedback ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
