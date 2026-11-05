import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { RichText } from "@/components/RichText";
import { getNews, getNewsBySlug, getNewsPage, getSiteSettings } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { article, breadcrumbs } from "@/lib/structuredData";
import { NewsList } from "../_components/NewsList";
import { NewsHero } from "./_components/NewsHero";

export async function generateStaticParams() {
  return (await getNews()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getNewsBySlug((await params).slug);
  return post
    ? pageMetadata(`/news/${post.slug}`, post.seo, {
        title: post.title,
        description: post.excerpt,
        image: post.image,
      })
    : { title: "News" };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, posts, page, settings] = await Promise.all([
    getNewsBySlug(slug),
    getNews(),
    getNewsPage(),
    getSiteSettings(),
  ]);
  if (!post) notFound();
  const { siteUrl } = settings.seo;
  const more = posts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <div className={`accent-${post.accent}`}>
      {siteUrl ? (
        <JsonLd
          items={[
            article(post, siteUrl),
            breadcrumbs(settings, "/news", { name: post.title, path: `/news/${post.slug}` }),
          ]}
        />
      ) : null}
      <NewsHero post={post} labels={page.detail} />
      <article className="news-body">
        <RichText content={post.content} className="prose" />
      </article>
      {more.length ? (
        <aside className="news-more">
          <h2>{page.detail.moreTitle}</h2>
          <NewsList posts={more} readMoreLabel={page.readMoreLabel} feature={false} />
        </aside>
      ) : null}
    </div>
  );
}
