import type { MetadataRoute } from "next";
import { getCourses, getNews, getSiteSettings, getStaff } from "@/lib/cms";

/** Every menu page plus each course, staff profile and news post; needs the website address from Site settings. */
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
  const paths = [
    ...new Set(["/", ...pages]),
    ...courses.filter((course) => !course.seo?.noIndex).map((course) => `/courses/${course.slug}`),
    ...staff.filter((person) => !person.seo?.noIndex).map((person) => `/staffs/${person.slug}`),
    ...news.filter((post) => !post.seo?.noIndex).map((post) => `/news/${post.slug}`),
  ];
  return paths.map((path) => ({ url: `${siteUrl}${path}`, changeFrequency: "weekly", priority: path === "/" ? 1 : 0.7 }));
}
