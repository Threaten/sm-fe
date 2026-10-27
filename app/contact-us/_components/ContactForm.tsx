"use client";

import { FormEvent, useEffect, useState } from "react";
import type { ContactPage, Course } from "@/lib/types";

export function ContactForm({ courses, content }: { courses: Course[]; content: ContactPage["form"] }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("course");
    if (requested && courses.some((course) => course.slug === requested)) setSelected([requested]);
  }, [courses]);

  function toggleCourse(slug: string) {
    setError("");
    setSelected((current) => (current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selected.length === 0) {
      setError("Chọn ít nhất một khoá học.");
      return;
    }

    setSending(true);
    setError("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
      courses: courses.filter((course) => selected.includes(course.slug)).map((course) => course.id),
    };

    try {
      const response = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setSelected([]);
      setSent(true);
    } catch {
      setError("Chưa gửi được. Kiểm tra kết nối và thử lại nhé.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="contact-form">
      <div className="contact-form-head">
        <p className="label">{content.eyebrow}</p>
        <h2>{content.title}</h2>
      </div>
      {sent ? (
        <div className="form-success" role="status">
          <h3>{content.successTitle}</h3>
          <p>{content.successCopy}</p>
          <button type="button" onClick={() => setSent(false)}>
            Gửi tin nhắn khác
          </button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <label>
            {content.nameLabel}
            <input name="name" required autoComplete="name" />
          </label>
          <label>
            {content.phoneLabel}
            <input name="phone" type="tel" required autoComplete="tel" placeholder="+84 90 123 4567" />
          </label>
          <fieldset>
            <legend>
              {content.coursesLabel}
              <span aria-live="polite">
                {selected.length}/{courses.length}
              </span>
            </legend>
            <div className="course-options">
              {courses.map((course, index) => (
                <label key={course.slug} className={`course-option accent-${course.accent}`}>
                  <input
                    type="checkbox"
                    checked={selected.includes(course.slug)}
                    onChange={() => toggleCourse(course.slug)}
                  />
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <strong>{course.title}</strong>
                  <small>{course.duration}</small>
                </label>
              ))}
            </div>
            {error ? (
              <p className="form-error" role="alert">
                {error}
              </p>
            ) : null}
          </fieldset>
          <label className="form-wide">
            {content.messageLabel}
            <textarea name="message" required rows={5} placeholder={content.messagePlaceholder} />
          </label>
          <button type="submit" className="button-solid" disabled={sending} aria-busy={sending}>
            {content.submitLabel}
            {sending ? <b className="spinner" aria-hidden="true" /> : null}
          </button>
        </form>
      )}
    </section>
  );
}
