import type { Course, StaffMember } from "./data";
import { courses, galleryImages, staff } from "./data";
import { backendUrl } from "./backend";

export type SiteNavigationItem = { label: string; href: string };
export type SiteTheme = {
  background: string;
  foreground: string;
  accent: string;
  cobalt: string;
  acid: string;
};
export type SiteFooter = {
  tagline: string;
  address: string;
  email: string;
  phone: string;
  headline: string;
  ctaLabel: string;
  addressLabel: string;
  contactLabel: string;
  linksLabel: string;
  copyright: string;
  links: SiteNavigationItem[];
};
export type SiteSettings = {
  navigation: SiteNavigationItem[];
  footer: SiteFooter;
  theme: SiteTheme;
};

export type ServiceItem = {
  number: string;
  title: string;
  label: string;
  copy: string;
  image: string;
};

export type SiteContent = {
  pageIntros: { page: string; index: string; eyebrow: string; title: string; intro: string; accent: "coral" | "cobalt" }[];
  marquees: { home: string; about: string; courses: string };
  featuredCourses: { eyebrow: string; title: string; linkLabel: string };
  courseHelp: { eyebrow: string; title: string; linkLabel: string };
  staffNote: { eyebrow: string; title: string; copy: string; linkLabel: string };
  courseDetail: { backLabel: string; durationLabel: string; tuitionLabel: string; classSizeLabel: string; reserveLabel: string; syllabusEyebrow: string; syllabusTitle: string; syllabusCopy: string; firstLessonCopy: string; lessonCopy: string; intakeLabel: string };
  staffDetail: { backLabel: string; profileLabel: string; stamp: string; bioLabel: string; achievementsEyebrow: string; achievementsTitle: string; practiceEyebrow: string; practiceTitle: string; offDutyLabel: string; favoritePourLabel: string; nextLabel: string };
  homeHero: {
    kickerLeft: string;
    kickerRight: string;
    titleLineOne: string;
    titleWord: string;
    titleEmphasis: string;
    titleLineThree: string;
    summary: string;
    buttonLabel: string;
    imageLeft: string;
    imageRight: string;
    burstTop: string;
    burstBottom: string;
    noteLineOne: string;
    noteLineTwo: string;
  };
  homeManifesto: {
    eyebrow: string;
    title: string;
    copy: string;
    image: string;
    stampTop: string;
    stampBottom: string;
  };
  homeQuote: {
    quote: string;
    author: string;
    role: string;
  };
  story: {
    eyebrow: string;
    title: string;
    copy: string;
    imageOne: string;
    imageOneAlt: string;
    imageOneCaption: string;
    imageTwo: string;
    imageTwoAlt: string;
    stampTop: string;
    stampBottom: string;
  };
  aboutValues: { number: string; title: string; copy: string }[];
  contactDetails: {
    number: string;
    title: string;
    href: string;
    linkText: string;
    copy: string;
  }[];
  servicesBanner: { eyebrow: string; title: string; email: string };
  gallerySocial: { copy: string; handle: string; href: string };
};

const galleryCaptions = [
  "After class",
  "Acid test",
  "Service drill",
  "Good ice",
  "Final round",
  "Tuesday, 8:42",
  "Research",
  "First shake",
  "Clean station",
];
const servicesFallback: ServiceItem[] = [
  {
    number: "01",
    title: "Private Classes",
    label: "8 to 24 guests",
    copy: "A hands-on class built around your group, from first date to full team offsite. Everyone leaves knowing what they made and why it worked.",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=88",
  },
  {
    number: "02",
    title: "Menu Development",
    label: "For bars & restaurants",
    copy: "Concept, costing, prep systems, training, and launch. We make menus that sound like you and work on a real Friday night.",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=88",
  },
  {
    number: "03",
    title: "Bar Team Training",
    label: "On site or at Skill & Mix",
    copy: "A focused reset for service teams: technique, station systems, hospitality language, and drills built around your actual operation.",
    image:
      "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=1200&q=88",
  },
];

const siteSettingsFallback: SiteSettings = {
  navigation: [
    { label: "About", href: "/about" },
    { label: "Team", href: "/staffs" },
    { label: "Services", href: "/services" },
    { label: "Courses", href: "/courses" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact-us" },
  ],
  footer: {
    tagline: "Don't overthink it",
    address: "643 Nguyen Kiem Street\nDuc Nhuan Ward, Ho Chi Minh City",
    email: "hello@skillandmix.com",
    phone: "+84 28 3822 0148",
    headline: "Practice makes delicious.",
    ctaLabel: "Let's talk",
    addressLabel: "Find us",
    contactLabel: "Talk to us",
    linksLabel: "Explore",
    copyright: "© 2026 Skill & Mix. Practice responsibly.",
    links: [
      { label: "Courses", href: "/courses" },
      { label: "Instagram", href: "/gallery" },
      { label: "Visit", href: "/contact-us" },
    ],
  },
  theme: {
    background: "var(--paper)",
    foreground: "var(--ink)",
    accent: "var(--accent)",
    cobalt: "var(--cobalt)",
    acid: "var(--acid)",
  },
};

const siteContentFallback: SiteContent = {
  pageIntros: [
    { page: "about", index: "01", eyebrow: "Inside Skill & Mix", title: "A SCHOOL FOR THIRSTY MINDS.", intro: "We built the class we wished existed: practical, demanding, generous, and a little bit chaotic.", accent: "coral" },
    { page: "staffs", index: "02", eyebrow: "The people behind the bar", title: "GOOD HANDS. SHARP TONGUES.", intro: "Working bartenders, obsessive teachers, and generous critics. Meet the people who will make your next drink better.", accent: "cobalt" },
    { page: "services", index: "03", eyebrow: "Beyond the classroom", title: "WE BRING THE BAR TO THE BRIEF.", intro: "Private workshops, sharper menus, stronger teams. Tell us what needs mixing.", accent: "coral" },
    { page: "courses", index: "04", eyebrow: "The current menu", title: "PICK YOUR NEXT OBSESSION.", intro: "Small classes, real tools, working instructors, and enough repetition to turn knowledge into instinct.", accent: "coral" },
    { page: "gallery", index: "05", eyebrow: "Inside the lab", title: "MESSY HANDS. CLEAN DRINKS.", intro: "Classes, experiments, guest shifts, bad ideas that became good ideas, and the occasional perfect lemon peel.", accent: "cobalt" },
    { page: "contact", index: "06", eyebrow: "Say hello", title: "QUESTIONS? GOOD.", intro: "Ask about a course, plan a private class, bring us a strange brief, or just come see the room.", accent: "coral" },
  ],
  marquees: { home: "Shake / Stir / Taste / Repeat", about: "Palate first / Ego last", courses: "Small class / Big practice" },
  featuredCourses: { eyebrow: "Choose your poison", title: "Pick your lane.", linkLabel: "View all courses ↗" },
  courseHelp: { eyebrow: "Can't choose?", title: "Tell us what you can make now. We'll tell you what comes next.", linkLabel: "Ask a human" },
  staffNote: { eyebrow: "Guest teachers, too", title: "The team changes with the season.", copy: "Distillers, bar owners, ceramicists, chefs, and the occasional deeply opinionated ice sculptor join selected classes.", linkLabel: "Teach with us" },
  courseDetail: { backLabel: "Course library", durationLabel: "Duration", tuitionLabel: "Tuition", classSizeLabel: "Class size", reserveLabel: "Reserve a seat", syllabusEyebrow: "Course structure", syllabusTitle: "What you will practice", syllabusCopy: "Each session combines demonstration, guided drills, independent work, and direct feedback.", firstLessonCopy: "Learn it, taste it, and repeat it until the movement feels obvious.", lessonCopy: "See the technique, understand why it works, then build dependable muscle memory.", intakeLabel: "Next intake" },
  staffDetail: { backLabel: "All staff", profileLabel: "Profile", stamp: "Skill\n& Mix\nfaculty", bioLabel: "Behind the apron", achievementsEyebrow: "Awards & achievements", achievementsTitle: "A few things worth raising a glass to.", practiceEyebrow: "At the workbench", practiceTitle: "What {name} teaches.", offDutyLabel: "Off duty", favoritePourLabel: "Favorite pour:", nextLabel: "Next behind the bar" },
  homeHero: {
    kickerLeft: "Ho Chi Minh City / Since 2026",
    kickerRight: "Classes now mixing",
    titleLineOne: "LEARN TO",
    titleWord: "MIX",
    titleEmphasis: "better",
    titleLineThree: "DRINKS.",
    summary:
      "Cocktail classes for curious beginners, working bartenders, and anyone who wants sharper hands behind the bar.",
    buttonLabel: "Find your course",
    imageLeft:
      "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=1000&q=88",
    imageRight:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=88",
    burstTop: "Sip",
    burstBottom: "happens",
    noteLineOne: "Serious technique.",
    noteLineTwo: "No serious faces.",
  },
  homeManifesto: {
    eyebrow: "What we're about",
    title: "Cocktails are a craft, not a secret club.",
    copy: "We teach the why behind every move, then give you enough room to make the drink your own. Palate first. Ego last.",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1400&q=88",
    stampTop: "NO BAD",
    stampBottom: "QUESTIONS",
  },
  homeQuote: {
    quote:
      "We don't teach you to follow recipes. We teach you to notice things.",
    author: "Nguyễn Minh Anh",
    role: "Founder, head of taste",
  },
  story: {
    eyebrow: "One tiny bar. One big idea.",
    title: "It started with six stools and a Tuesday night class.",
    copy: "In 2026, Minh Anh pushed the bottles aside after service and invited a few curious regulars behind the bar. They asked better questions than most training manuals. Skill & Mix grew from there.",
    imageOne:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1400&q=88",
    imageOneAlt: "The warmly lit bar where Skill & Mix began",
    imageOneCaption: "Our first classroom, 2026",
    imageTwo:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=88",
    imageTwoAlt: "Cocktail ingredients and glassware on a work bench",
    stampTop: "Est. 2026",
    stampBottom: "fresh pour",
  },
  aboutValues: [
    {
      number: "01",
      title: "Taste before theory",
      copy: "Your palate is the tool. We train it before we ask you to memorize anything.",
    },
    {
      number: "02",
      title: "Clean is fast",
      copy: "Good systems make speed feel calm. Every class builds habits that survive a busy shift.",
    },
    {
      number: "03",
      title: "Hospitality wins",
      copy: "A technically perfect drink can still be a bad experience. People come first.",
    },
    {
      number: "04",
      title: "Stay curious",
      copy: "The minute you know everything is the minute your drinks get boring.",
    },
  ],
  contactDetails: [
    {
      number: "01",
      title: "Come by",
      href: "https://www.google.com/maps/search/?api=1&query=643+Nguyen+Kiem+Street+Duc+Nhuan+Ward+Ho+Chi+Minh+City",
      linkText: "Open maps ↗",
      copy: "643 Nguyen Kiem Street\nDuc Nhuan Ward, Ho Chi Minh City",
    },
    {
      number: "02",
      title: "Write us",
      href: "mailto:hello@skillandmix.com",
      linkText: "hello@skillandmix.com",
      copy: "We answer within two working days. Usually faster.",
    },
    {
      number: "03",
      title: "Call",
      href: "tel:+842838220148",
      linkText: "+84 28 3822 0148",
      copy: "Monday to Friday\n10:00 to 18:00",
    },
  ],
  servicesBanner: {
    eyebrow: "Need something stranger?",
    title: "We like a brief with a little bite.",
    email: "hello@skillandmix.com",
  },
  gallerySocial: {
    copy: "More spills, drills, and questionable garnishes:",
    handle: "@skillandmix ↗",
    href: "https://instagram.com",
  },
};

async function requestJSON<T>(path: string, fallback: T): Promise<T> {
  if (!backendUrl) return fallback;
  try {
    const response = await fetch(`${backendUrl}${path}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return fallback;
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

function normalizeCourse(course: any): Course {
  const fallback = courses.find((item) => item.slug === course?.slug) ?? courses[0];
  return {
    ...fallback,
    ...course,
    syllabus: Array.isArray(course?.syllabus)
      ? course.syllabus
          .map((item: any) => (typeof item === "string" ? item : item?.item))
          .filter(Boolean)
      : [],
  };
}

function normalizeStaffMember(person: any): StaffMember {
  return {
    ...person,
    bio: Array.isArray(person?.bio)
      ? person.bio
          .map((item: any) => (typeof item === "string" ? item : item?.paragraph))
          .filter(Boolean)
      : [],
    specialties: Array.isArray(person?.specialties)
      ? person.specialties
          .map((item: any) => (typeof item === "string" ? item : item?.item))
          .filter(Boolean)
      : [],
  };
}

export async function getCourses() {
  return requestJSON("/api/courses?limit=100", { docs: courses }).then(
    (result) => (result.docs ?? courses).map(normalizeCourse),
  );
}

export async function getCourseBySlug(slug: string) {
  const list = await getCourses();
  return list.find((course) => course.slug === slug) ?? null;
}

export async function getStaff() {
  return requestJSON("/api/staff?limit=100", { docs: staff }).then(
    (result) => (result.docs ?? staff).map(normalizeStaffMember),
  );
}

export async function getStaffBySlug(slug: string) {
  const list = await getStaff();
  return list.find((person) => person.slug === slug) ?? null;
}

export async function getGalleryItems() {
  return requestJSON("/api/gallery?limit=100", {
    docs: galleryImages.map((image, index) => ({
      image,
      caption: galleryCaptions[index],
    })),
  }).then((result) => result.docs ?? []);
}

export async function getSiteSettings() {
  const value = await requestJSON<Partial<SiteSettings>>("/api/globals/site-settings", siteSettingsFallback);
  return {
    ...siteSettingsFallback,
    ...value,
    navigation: value.navigation?.length ? value.navigation : siteSettingsFallback.navigation,
    footer: { ...siteSettingsFallback.footer, ...value.footer, links: value.footer?.links?.length ? value.footer.links : siteSettingsFallback.footer.links },
    theme: { ...siteSettingsFallback.theme, ...value.theme },
  };
}

export async function getSiteContent() {
  const value = await requestJSON<Partial<SiteContent>>("/api/globals/site-content", siteContentFallback);
  return {
    ...siteContentFallback,
    ...value,
    pageIntros: value.pageIntros?.length ? value.pageIntros : siteContentFallback.pageIntros,
    marquees: { ...siteContentFallback.marquees, ...value.marquees },
    featuredCourses: { ...siteContentFallback.featuredCourses, ...value.featuredCourses },
    courseHelp: { ...siteContentFallback.courseHelp, ...value.courseHelp },
    staffNote: { ...siteContentFallback.staffNote, ...value.staffNote },
    courseDetail: { ...siteContentFallback.courseDetail, ...value.courseDetail },
    staffDetail: { ...siteContentFallback.staffDetail, ...value.staffDetail },
  };
}

export function getPageIntro(content: SiteContent, page: string) {
  return content.pageIntros.find((intro) => intro.page === page) ??
    siteContentFallback.pageIntros.find((intro) => intro.page === page)!;
}

export async function getServices() {
  return requestJSON("/api/services?limit=100", {
    docs: servicesFallback,
  }).then((result) => result.docs ?? servicesFallback);
}
