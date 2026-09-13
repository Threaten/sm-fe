"use client";

import { useEffect, useState } from "react";

export type HomeTestimonial = {
  quote: string;
  author: string;
  role: string;
};

export function HomeTestimonials({
  testimonials,
}: {
  testimonials: HomeTestimonial[];
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  useEffect(() => {
    if (
      paused ||
      total < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % total),
      6500,
    );
    return () => window.clearInterval(timer);
  }, [paused, total]);

  if (!total) return null;
  const testimonial = testimonials[active];
  const move = (direction: number) =>
    setActive((current) => (current + direction + total) % total);

  return (
    <section
      className="home-testimonials"
      aria-roledescription="carousel"
      aria-label="Học viên nói gì"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="testimonial-topline">
        <p className="eyebrow">Học viên nói gì</p>
        <span>
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>
      <div className="testimonial-card" aria-live="polite">
        <span className="testimonial-mark" aria-hidden="true">
          “
        </span>
        <blockquote key={active}>{testimonial.quote}</blockquote>
        <p className="testimonial-credit">
          <strong>{testimonial.author}</strong>
          <span>{testimonial.role}</span>
        </p>
      </div>
      <div className="testimonial-controls">
        <div>
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Feedback trước"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Feedback tiếp theo"
          >
            →
          </button>
        </div>
        <div className="testimonial-dots" aria-label="Chọn feedback">
          {testimonials.map((item, index) => (
            <button
              type="button"
              key={`${item.author}-${index}`}
              className={index === active ? "is-active" : ""}
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
