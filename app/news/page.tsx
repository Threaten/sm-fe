import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { getNews, getNewsPage, getSiteSettings, pageNumber } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { NewsList } from "./_components/NewsList";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getNewsPage();
  return pageMetadata("/news", page.seo, { description: page.intro.copy });
}

export default async function NewsPage() {
  const [posts, page, settings] = await Promise.all([getNews(), getNewsPage(), getSiteSettings()]);

  return (
    <>
      <PageIntro intro={page.intro} number={pageNumber(settings.navigation, "/news")} />
      <NewsList posts={posts} readMoreLabel={page.readMoreLabel} emptyLabel={page.emptyLabel} />
    </>
  );
}
