import type { MetadataRoute } from "next";
import { getCourses, getNews, getSiteSettings, getStaff } from "@/lib/cms";

/** Every page (menu pages, plus About and Contact, which are linked outside the menu) plus each course, staff profile and news post; needs the website address from Site settings. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, courses, staff, news] = await Promise.all([
    getSiteSettings(),
    getCourses(),
    getStaff(),
    getNews(),
  ]);
  const { siteUrl, noIndex } = settings.seo;
  if (!siteUrl || noIndex) return [];

  const pages = settings.navigation.map((link) => link.href).filter((href) => href.startsWith("/"));
  const entries: { path: string; updatedAt?: string }[] = [
    ...[...new Set(["/", ...pages, "/about", "/contact-us"])].map((path) => ({ path })),
    ...courses
      .filter((course) => !course.seo?.noIndex)
      .map((course) => ({ path: `/courses/${course.slug}`, updatedAt: course.updatedAt })),
    ...staff
      .filter((person) => !person.seo?.noIndex)
      .map((person) => ({ path: `/staffs/${person.slug}`, updatedAt: person.updatedAt })),
    ...news
      .filter((post) => !post.seo?.noIndex)
      .map((post) => ({ path: `/news/${post.slug}`, updatedAt: post.updatedAt })),
  ];
  return entries.map(({ path, updatedAt }) => ({
    url: `${siteUrl}${path}`,
    // Tells Google which pages changed, so edits get recrawled sooner.
    lastModified: updatedAt ? new Date(updatedAt) : undefined,
    changeFrequency: "weekly",
    // Courses are the pages that answer "học bartender" searches.
    priority: path === "/" ? 1 : path.startsWith("/courses") ? 0.9 : 0.7,
  }));
}
