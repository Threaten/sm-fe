import { backendUrl } from "./backend";
import * as fallback from "./fallback";
import type {
  AboutPage,
  ContactPage,
  Course,
  CoursesPage,
  EntryPopup,
  GalleryItem,
  GalleryPage,
  HomePage,
  Image,
  Link,
  NewsPage,
  NewsPost,
  RichText,
  RichTextNode,
  Service,
  ServicesPage,
  SiteSettings,
  StaffMember,
  TeamPage,
  Seo,
  Testimonial,
} from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Doc = Record<string, any>;

async function requestJSON<T>(path: string): Promise<T | null> {
  if (!backendUrl) return null;
  try {
    const response = await fetch(`${backendUrl}${path}`, { next: { revalidate: 60 } });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function absoluteUrl(url: string) {
  if (!url || /^https?:\/\//.test(url)) return url;
  return backendUrl ? `${backendUrl}${url.startsWith("/") ? "" : "/"}${url}` : url;
}

/** Turns a populated Payload upload into `{ url, alt }`. */
function toImage(value: unknown, fallbackImage?: Image | null): Image {
  if (value && typeof value === "object" && "url" in value) {
    const media = value as { url?: string; alt?: string };
    if (media.url) return { url: absoluteUrl(media.url), alt: media.alt ?? "" };
  }
  return fallbackImage ?? { url: "", alt: "" };
}

const upload = (media: unknown) => {
  const image = toImage(media);
  return image.url ? image : null;
};

/** A page's SEO group with its share image resolved. */
const toSeo = (value: unknown): Seo | undefined =>
  value && typeof value === "object" ? { ...(value as Seo), image: upload((value as Doc).image) } : undefined;

const isEmpty = (value: unknown) =>
  value === null || value === undefined || (Array.isArray(value) && value.length === 0);

/**
 * Fills anything the CMS left empty (a global that was never saved, a new
 * field without a value yet) from the built-in content.
 */
function withFallback<T>(value: unknown, base: T): T {
  if (isEmpty(value)) return base;
  if (Array.isArray(base) || typeof base !== "object" || base === null) return value as T;
  if (typeof value !== "object" || "url" in (base as object)) return value as T;
  const merged: Doc = { ...(value as Doc) };
  for (const [key, inner] of Object.entries(base)) merged[key] = withFallback((value as Doc)[key], inner);
  return merged as T;
}

const list = (items: unknown, key: string): string[] =>
  Array.isArray(items) ? items.map((item) => (typeof item === "string" ? item : item?.[key])).filter(Boolean) : [];

function normalizeCourse(doc: Doc): Course {
  return {
    ...(doc as Course),
    id: doc.id ? String(doc.id) : undefined,
    image: toImage(doc.image),
    seo: toSeo(doc.seo),
    syllabus: Array.isArray(doc.syllabus) ? doc.syllabus.filter((item: Doc) => item?.title) : [],
  };
}

function normalizeStaff(doc: Doc): StaffMember {
  return {
    ...(doc as StaffMember),
    image: toImage(doc.image),
    bio: list(doc.bio, "paragraph"),
    specialties: list(doc.specialties, "item"),
    achievements: Array.isArray(doc.achievements) ? doc.achievements : [],
    seo: toSeo(doc.seo),
  };
}

/** Resolves the images inside a rich-text field, the same way as any other upload. */
function normalizeRichText(value: unknown): RichText {
  if (!value || typeof value !== "object" || !("root" in value)) return null;
  const walk = (node: RichTextNode & { value?: unknown }): RichTextNode => {
    const { value: media, ...rest } = node;
    return {
      ...rest,
      ...(node.type === "upload" ? { image: upload(media) } : {}),
      ...(node.children ? { children: node.children.map(walk) } : {}),
    };
  };
  return { root: walk((value as { root: RichTextNode }).root) };
}

function normalizeNews(doc: Doc): NewsPost {
  return {
    ...(doc as NewsPost),
    id: doc.id ? String(doc.id) : undefined,
    image: toImage(doc.image),
    content: normalizeRichText(doc.content),
    seo: toSeo(doc.seo),
  };
}

async function getCollection<T>(
  slug: string,
  normalize: (doc: Doc) => T,
  base: T[],
  query = "limit=100&sort=_order",
): Promise<T[]> {
  const result = await requestJSON<{ docs: Doc[] }>(`/api/${slug}?${query}&depth=1`);
  return result ? result.docs.map(normalize) : base;
}

async function getGlobal<T>(slug: string, base: T, depth = 1): Promise<Doc & T> {
  const value = await requestJSON<Doc>(`/api/globals/${slug}?depth=${depth}`);
  const merged = withFallback(value, base) as Doc & T;
  return "seo" in merged ? { ...merged, seo: toSeo(merged.seo) } : merged;
}

/* Collections */

export const getCourses = () => getCollection("courses", normalizeCourse, fallback.courses);

export async function getCourseBySlug(slug: string) {
  return (await getCourses()).find((course) => course.slug === slug) ?? null;
}

export const getStaff = () => getCollection("staff", normalizeStaff, fallback.staff);

export const getServices = () =>
  getCollection<Service>("services", (doc) => ({ ...(doc as Service), image: toImage(doc.image) }), fallback.services);

export const getGalleryItems = () =>
  getCollection<GalleryItem>(
    "gallery",
    (doc) => ({ caption: doc.caption, image: toImage(doc.image) }),
    fallback.gallery,
  );

export const getTestimonials = () =>
  getCollection<Testimonial>("testimonials", (doc) => doc as Testimonial, fallback.testimonials);

/** Newest first. The list leaves out each post's body; `getNewsBySlug` loads it. */
export const getNews = () =>
  getCollection("news", normalizeNews, fallback.news, "limit=100&sort=-publishedAt&select[content]=false");

export async function getNewsBySlug(slug: string) {
  const [post] = await getCollection(
    "news",
    normalizeNews,
    fallback.news.filter((item) => item.slug === slug),
    `limit=1&where[slug][equals]=${encodeURIComponent(slug)}`,
  );
  return post ?? null;
}

/* Globals */

const toOrigin = (value: unknown) => {
  try {
    return typeof value === "string" && value ? new URL(value).origin : null;
  } catch {
    return null;
  }
};

const isHexColour = (value: unknown) =>
  typeof value === "string" && /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(value);

export async function getSiteSettings(): Promise<SiteSettings> {
  const value = await getGlobal("site-settings", fallback.siteSettings);
  // A colour that is not plain hex (e.g. a legacy "var(--cobalt)" from the old schema) would break
  // the CSS variable it feeds and leave text on a transparent background.
  const theme = Object.fromEntries(
    Object.entries(fallback.siteSettings.theme).map(([key, base]) => {
      const colour = (value.theme as Doc)[key];
      return [key, isHexColour(colour) ? colour : base];
    }),
  ) as SiteSettings["theme"];

  const logo = (value.logo ?? {}) as Doc;

  return {
    ...value,
    theme,
    logo: { image: upload(logo.image), imageOnDark: upload(logo.imageOnDark) },
    seo: {
      ...value.seo,
      shareImage: toImage(value.seo.shareImage, fallback.siteSettings.seo.shareImage),
      siteUrl: toOrigin(value.seo.siteUrl),
      favicon: upload(value.seo.favicon),
    },
  };
}

export async function getHomePage(): Promise<HomePage & { featuredPerson: StaffMember | null }> {
  const value = await getGlobal("home-page", fallback.homePage, 2);
  const { hero, manifesto, featuredInstructor } = value;
  const person = featuredInstructor.person;
  const featuredPerson =
    person && typeof person === "object"
      ? normalizeStaff(person as Doc)
      : (await getStaff()).find((member) => member.slug === person) ?? null;

  return {
    ...value,
    hero: {
      ...hero,
      imageLeft: toImage(hero.imageLeft, fallback.homePage.hero.imageLeft),
      imageRight: toImage(hero.imageRight, fallback.homePage.hero.imageRight),
    },
    manifesto: { ...manifesto, image: toImage(manifesto.image, fallback.homePage.manifesto.image) },
    featuredPerson,
  };
}

export async function getAboutPage(): Promise<AboutPage> {
  const value = await getGlobal("about-page", fallback.aboutPage);
  const { story } = value;
  return {
    ...value,
    story: {
      ...story,
      imageOne: toImage(story.imageOne, fallback.aboutPage.story.imageOne),
      imageTwo: toImage(story.imageTwo, fallback.aboutPage.story.imageTwo),
    },
  };
}

export const getCoursesPage = () => getGlobal<CoursesPage>("courses-page", fallback.coursesPage);
export const getTeamPage = () => getGlobal<TeamPage>("team-page", fallback.teamPage);
export const getServicesPage = () => getGlobal<ServicesPage>("services-page", fallback.servicesPage);
export const getNewsPage = () => getGlobal<NewsPage>("news-page", fallback.newsPage);
export const getGalleryPage = () => getGlobal<GalleryPage>("gallery-page", fallback.galleryPage);
export const getContactPage = () => getGlobal<ContactPage>("contact-page", fallback.contactPage);

export async function getEntryPopup(): Promise<EntryPopup> {
  const value = await getGlobal("entry-popup", fallback.entryPopup);
  return {
    ...value,
    slides: value.slides.map((slide) => ({ ...slide, image: slide.image ? toImage(slide.image) : null })),
  };
}

/** "02" when the page is the second item in the main navigation. */
export function pageNumber(navigation: Link[], href: string) {
  const index = navigation.findIndex((item) => item.href === href);
  return index === -1 ? undefined : String(index + 1).padStart(2, "0");
}
