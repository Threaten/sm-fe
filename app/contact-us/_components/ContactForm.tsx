"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Course } from "@/lib/data";

export function ContactForm({ courses }: { courses: Course[] }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [courseError, setCourseError] = useState("");

  useEffect(() => {
    const requestedCourse = new URLSearchParams(window.location.search).get(
      "course",
    );
    if (
      requestedCourse &&
      courses.some((course) => course.slug === requestedCourse)
    ) {
      setSelectedCourses([requestedCourse]);
    }
  }, []);

  function toggleCourse(slug: string) {
    setCourseError("");
    setSelectedCourses((current) =>
      current.includes(slug)
        ? current.filter((course) => course !== slug)
        : [...current, slug],
    );
  }

  function toggleAllCourses() {
    setCourseError("");
    setSelectedCourses((current) =>
      current.length === courses.length
        ? []
        : courses.map((course) => course.slug),
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectedCourses.length === 0) {
      setCourseError("Choose at least one course.");
      return;
    }

    setSending(true);
    setCourseError("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
      courses: selectedCourses.map((slug) => ({ slug })),
    };

    try {
      const response = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setSelectedCourses([]);
      setSent(true);
    } catch {
      setCourseError("We could not send that. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="contact-form-section">
      <div className="contact-form-title">
        <p className="eyebrow">What&apos;s on your mind?</p>
        <h2>Drop us a line.</h2>
      </div>
      {sent ? (
        <div className="form-success">
          <span>✓</span>
          <h3>Message mixed.</h3>
          <p>We&apos;ll get back to you shortly.</p>
          <button onClick={() => setSent(false)}>Send another</button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <label>
            Name
            <input name="name" required placeholder="Your name" />
          </label>
          <label>
            Phone
            <input
              name="phone"
              type="tel"
              required
              placeholder="+84 90 123 4567"
              autoComplete="tel"
            />
          </label>
          <fieldset className="course-fieldset">
            <legend>Course</legend>
            <input
              type="hidden"
              name="courses"
              value={selectedCourses.join(",")}
            />
            <div className="course-selector-meta">
              <span aria-live="polite">
                {selectedCourses.length} of {courses.length} selected
              </span>
              <button type="button" onClick={toggleAllCourses}>
                {selectedCourses.length === courses.length
                  ? "Clear all"
                  : "Select all"}
              </button>
            </div>
            <div className="course-options">
              {courses.map((course) => (
                <label className="course-option" key={course.slug}>
                  <input
                    type="checkbox"
                    checked={selectedCourses.includes(course.slug)}
                    onChange={() => toggleCourse(course.slug)}
                  />
                  <span aria-hidden="true" className="course-check">
                    ✓
                  </span>
                  <b>{course.index}</b>
                  <strong>{course.title}</strong>
                  <small>
                    {course.duration} / {course.level}
                  </small>
                </label>
              ))}
            </div>
            {courseError && (
              <p className="form-error" role="alert">
                {courseError}
              </p>
            )}
          </fieldset>
          <label className="form-message">
            Message
            <textarea
              name="message"
              required
              placeholder="Tell us everything..."
              rows={5}
            />
          </label>
          <button type="submit" disabled={sending} aria-busy={sending}>
            {sending ? "Mixing your message..." : "Send it"} <span>{sending ? "···" : "↗"}</span>
          </button>
        </form>
      )}
    </section>
  );
}
