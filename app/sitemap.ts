import type { MetadataRoute } from "next";
import { getCourses, getSiteSettings, getStaff } from "@/lib/cms";

/** Every menu page plus each course and staff profile; needs the website address from Site settings. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, courses, staff] = await Promise.all([getSiteSettings(), getCourses(), getStaff()]);
  const { siteUrl, noIndex } = settings.seo;
  if (!siteUrl || noIndex) return [];

  const pages = settings.navigation.map((link) => link.href).filter((href) => href.startsWith("/"));
  const paths = [
    ...new Set(["/", ...pages]),
    ...courses.filter((course) => !course.seo?.noIndex).map((course) => `/courses/${course.slug}`),
    ...staff.filter((person) => !person.seo?.noIndex).map((person) => `/staffs/${person.slug}`),
  ];
  return paths.map((path) => ({ url: `${siteUrl}${path}`, changeFrequency: "weekly", priority: path === "/" ? 1 : 0.7 }));
}
