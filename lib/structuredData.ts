import type { Course, CoursesPage, NewsPost, SiteSettings, StaffMember } from "./types";

/**
 * schema.org data for search engines (JSON-LD). Everything comes from the CMS; a page only
 * gets the parts whose content exists. See components/JsonLd.tsx.
 */
type Thing = Record<string, unknown>;

const absolute = (siteUrl: string, path: string) => (/^https?:\/\//.test(path) ? path : `${siteUrl}${path}`);

/** A plain number such as "8000000" or "8.000.000"; text like "Liên hệ" has no price. */
const toPrice = (value?: string | null) => {
  const text = String(value ?? "").trim();
  if (!/^\d+$/.test(text) && !/^\d{1,3}(?:[.,\s]\d{3})+$/.test(text)) return null;
  const number = Number(text.replace(/[.,\s]/g, ""));
  return Number.isSafeInteger(number) && number > 0 ? number : null;
};

/** Profile links only: a bare "https://instagram.com" says nothing about this business. */
const isProfileUrl = (value: string) => {
  try {
    return new URL(value).pathname.replace(/\//g, "") !== "";
  } catch {
    return false;
  }
};

export const organizationId = (siteUrl: string) => `${siteUrl}/#organization`;

/** The academy itself, on every page: name, logo, address and contacts for the knowledge panel and maps. */
export function organization(settings: SiteSettings, siteUrl: string): Thing {
  const { seo, contact, socialLinks, logo } = settings;
  const profiles = socialLinks.map((link) => link.url).filter(isProfileUrl);
  const [street, ...locality] = contact.address.split("\n").map((line) => line.trim()).filter(Boolean);
  const logoUrl = logo.image?.url ?? seo.favicon?.url;
  return {
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": organizationId(siteUrl),
    name: seo.siteName,
    url: `${siteUrl}/`,
    description: seo.description,
    logo: logoUrl ? absolute(siteUrl, logoUrl) : undefined,
    image: seo.shareImage.url ? absolute(siteUrl, seo.shareImage.url) : undefined,
    email: contact.email || undefined,
    telephone: contact.phone || undefined,
    address: street
      ? {
          "@type": "PostalAddress",
          streetAddress: street,
          addressLocality: locality.join(", ") || undefined,
          addressCountry: "VN",
        }
      : undefined,
    hasMap: contact.mapUrl || undefined,
    sameAs: profiles.length ? profiles : undefined,
  };
}

export function website(settings: SiteSettings, siteUrl: string): Thing {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: settings.seo.siteName,
    url: `${siteUrl}/`,
    inLanguage: "vi-VN",
    publisher: { "@id": organizationId(siteUrl) },
  };
}

/**
 * Home → section → this page, shown in place of the bare URL in search results. Section names
 * are the menu labels from Site settings.
 */
export function breadcrumbs(settings: SiteSettings, section: string, page?: { name: string; path: string }): Thing {
  const label = (href: string) => settings.navigation.find((link) => link.href === href)?.label;
  const siteUrl = settings.seo.siteUrl ?? "";
  const items = [
    { name: label("/") ?? settings.seo.siteName, path: "/" },
    { name: label(section) ?? section, path: section },
    ...(page ? [page] : []),
  ];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(siteUrl, item.path),
    })),
  };
}

export function course(item: Course, siteUrl: string): Thing {
  const price = toPrice(item.promotionPrice) ?? toPrice(item.price);
  return {
    "@type": "Course",
    "@id": `${siteUrl}/courses/${item.slug}#course`,
    name: item.title,
    description: item.summary,
    url: `${siteUrl}/courses/${item.slug}`,
    image: item.image.url ? absolute(siteUrl, item.image.url) : undefined,
    inLanguage: "vi",
    educationalLevel: item.level || undefined,
    provider: { "@id": organizationId(siteUrl) },
    syllabusSections: item.syllabus.length
      ? item.syllabus.map((section) => ({
          "@type": "Syllabus",
          name: section.title,
          description: section.description || undefined,
        }))
      : undefined,
    offers: {
      "@type": "Offer",
      category: "Paid",
      url: `${siteUrl}/courses/${item.slug}`,
      ...(price ? { price, priceCurrency: "VND" } : {}),
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Onsite",
      location: item.location || undefined,
      courseSchedule: item.schedule ? { "@type": "Schedule", description: item.schedule } : undefined,
    },
  };
}

/** The course list, so search engines see every course from the catalogue page. */
export function courseList(courses: Course[], siteUrl: string): Thing {
  return {
    "@type": "ItemList",
    itemListElement: courses.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/courses/${item.slug}`,
      name: item.title,
    })),
  };
}

export function faq(items: CoursesPage["faq"]["items"]): Thing | null {
  if (!items.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function article(post: NewsPost, siteUrl: string): Thing {
  return {
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    url: `${siteUrl}/news/${post.slug}`,
    mainEntityOfPage: `${siteUrl}/news/${post.slug}`,
    image: post.image.url ? [absolute(siteUrl, post.image.url)] : undefined,
    datePublished: post.publishedAt,
    inLanguage: "vi",
    author: { "@id": organizationId(siteUrl) },
    publisher: { "@id": organizationId(siteUrl) },
  };
}

export function person(member: StaffMember, siteUrl: string): Thing {
  return {
    "@type": "Person",
    name: member.name,
    alternateName: member.shortName && member.shortName !== member.name ? member.shortName : undefined,
    jobTitle: member.role,
    description: member.note || undefined,
    url: `${siteUrl}/staffs/${member.slug}`,
    image: member.image.url ? absolute(siteUrl, member.image.url) : undefined,
    worksFor: { "@id": organizationId(siteUrl) },
    knowsAbout: member.specialties.length ? member.specialties : undefined,
  };
}
