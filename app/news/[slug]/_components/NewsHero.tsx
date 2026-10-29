import Link from "next/link";
import { formatDate } from "@/lib/date";
import type { NewsPage, NewsPost } from "@/lib/types";

export function NewsHero({ post, labels }: { post: NewsPost; labels: NewsPage["detail"] }) {
  return (
    <section className="course-hero news-hero">
      <div className="course-hero-copy">
        <nav className="crumb">
          <Link href="/news">{labels.backLabel}</Link>
        </nav>
        <p className="label">
          {labels.publishedLabel} <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </p>
        <h1>{post.title}</h1>
        <p className="course-hero-summary">{post.excerpt}</p>
      </div>
      <figure className="course-hero-image">
        <img src={post.image.url} alt={post.image.alt} />
        {post.imageCaption ? <figcaption>{post.imageCaption}</figcaption> : null}
      </figure>
    </section>
  );
}
