import type { Course, CoursesPage } from "@/lib/types";

/** "Khoảnh khắc trong lớp": photos and clips from real classes. Hidden when the course has none. */
export function CourseClassMedia({ course, labels }: { course: Course; labels: CoursesPage["detail"] }) {
  if (!course.classMedia?.length) return null;

  return (
    <section className="course-section course-class-media">
      <div className="syllabus-intro">
        <p className="label">{labels.classMediaEyebrow}</p>
        <h2>{labels.classMediaTitle}</h2>
        {labels.classMediaCopy ? <p>{labels.classMediaCopy}</p> : null}
      </div>
      <div className="class-media-grid">
        {course.classMedia.map((item, index) => (
          <figure key={`${index}-${item.kind === "video" ? item.video.url : item.image.url}`} className="class-media-item">
            {item.kind === "video" ? (
              // Native player: keyboard and screen-reader accessible, works on every device.
              <video
                controls
                playsInline
                preload="metadata"
                poster={item.video.poster?.url || undefined}
                aria-label={item.video.title || undefined}
              >
                {/* .mov files are usually H.264 too; letting the browser try beats skipping them by type. */}
                <source
                  src={item.video.url}
                  {...(item.video.mimeType && item.video.mimeType !== "video/quicktime"
                    ? { type: item.video.mimeType }
                    : {})}
                />
              </video>
            ) : (
              <img src={item.image.url} alt={item.image.alt} loading="lazy" />
            )}
            {item.caption ? <figcaption>{item.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
    </section>
  );
}
