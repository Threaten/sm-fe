import Link from "next/link";
import { formatDate } from "@/lib/date";
import type { NewsPost } from "@/lib/types";

/** Posts newest first: the latest gets a full accent block, the rest are rows in the index. */
export function NewsList({
  posts,
  readMoreLabel,
  emptyLabel,
  feature = true,
}: {
  posts: NewsPost[];
  readMoreLabel: string;
  emptyLabel?: string;
  feature?: boolean;
}) {
  if (!posts.length) return emptyLabel ? <p className="news-empty">{emptyLabel}</p> : null;
  const lead = feature ? posts[0] : null;
  const rest = feature ? posts.slice(1) : posts;

  return (
    <section className="news">
      {lead ? (
        <article className={`news-lead accent-${lead.accent}`}>
          <figure className="tape news-lead-image">
            <img src={lead.image.url} alt={lead.image.alt} />
          </figure>
          <div className="news-lead-copy">
            <time className="label" dateTime={lead.publishedAt}>
              {formatDate(lead.publishedAt)}
            </time>
            <h2>
              <Link href={`/news/${lead.slug}`}>{lead.title}</Link>
            </h2>
            <p>{lead.excerpt}</p>
            <Link className="catalog-link" href={`/news/${lead.slug}`} aria-hidden="true" tabIndex={-1}>
              {readMoreLabel}
            </Link>
          </div>
        </article>
      ) : null}
      {rest.length ? (
        <ol className="news-index">
          {rest.map((post) => (
            <li key={post.slug} className={`accent-${post.accent}`}>
              <Link href={`/news/${post.slug}`}>
                <time className="label" dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                <img src={post.image.url} alt={post.image.alt} loading="lazy" />
                <div className="news-index-copy">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
                <span className="news-index-more">{readMoreLabel}</span>
              </Link>
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
