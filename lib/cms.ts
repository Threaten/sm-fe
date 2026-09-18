import type { Course, StaffMember } from "./data";
import { courses, galleryImages, staff } from "./data";
import { backendUrl } from "./backend";

export type SiteNavigationItem = { label: string; href: string };
export type SiteAnnouncementBar = {
  enabled: boolean;
  message: string;
  linkLabel?: string;
  linkHref?: string;
};
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
  announcementBar: SiteAnnouncementBar;
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
  entryPopup: {
    enabled: boolean;
    eyebrow: string;
    title: string;
    copy: string;
    image?: string;
    ctaLabel: string;
    ctaHref: string;
    dismissLabel: string;
  };
  pageIntros: {
    page: string;
    index: string;
    eyebrow: string;
    title: string;
    intro: string;
    accent: "coral" | "cobalt";
  }[];
  marquees: { home: string; about: string; courses: string };
  featuredCourses: { eyebrow: string; title: string; linkLabel: string };
  featuredInstructor: {
    eyebrow: string;
    title: string;
    person?: StaffMember;
    linkLabel: string;
  };
  courseHelp: { eyebrow: string; title: string; linkLabel: string };
  courseFaq: {
    eyebrow: string;
    title: string;
    items: { question: string; answer: string }[];
  };
  staffNote: {
    eyebrow: string;
    title: string;
    copy: string;
    linkLabel: string;
  };
  courseDetail: {
    backLabel: string;
    durationLabel: string;
    tuitionLabel: string;
    classSizeLabel: string;
    reserveLabel: string;
    syllabusEyebrow: string;
    syllabusTitle: string;
    syllabusCopy: string;
    firstLessonCopy: string;
    lessonCopy: string;
    intakeLabel: string;
  };
  staffDetail: {
    backLabel: string;
    profileLabel: string;
    stamp: string;
    bioLabel: string;
    achievementsEyebrow: string;
    achievementsTitle: string;
    practiceEyebrow: string;
    practiceTitle: string;
    offDutyLabel: string;
    favoritePourLabel: string;
    nextLabel: string;
  };
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
  homeTestimonials: {
    quote: string;
    author: string;
    role: string;
  }[];
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
  announcementBar: {
    enabled: true,
    message: "Đăng ký tư vấn miễn phí cùng Skill & Mix.",
    linkLabel: "Đăng ký ngay",
    linkHref: "/contact-us",
  },
  navigation: [
    { label: "Trang Chủ", href: "/" },
    { label: "Khoá Học", href: "/courses" },
    { label: "Giảng Viên", href: "/staffs" },
    { label: "Thư Viện", href: "/gallery" },
    { label: "Dịch Vụ", href: "/services" },
  ],
  footer: {
    tagline: "Skill & Mix Academy",
    address: "643 Nguyen Kiem Street\nDuc Nhuan Ward, Ho Chi Minh City",
    email: "hello@skillandmix.com",
    phone: "+84 28 3822 0148",
    headline: "Sẵn Sàng Bắt Đầu Hành Trình Bartender?",
    ctaLabel: "Đăng Ký Tư Vấn Ngay",
    addressLabel: "Địa Chỉ",
    contactLabel: "Liên Hệ",
    linksLabel: "Khám Phá",
    copyright: "© 2026 Skill & Mix Academy.",
    links: [
      { label: "Trang Chủ", href: "/" },
      { label: "Khoá Học", href: "/courses" },
      { label: "Giảng Viên", href: "/staffs" },
      { label: "Thư Viện", href: "/gallery" },
      { label: "Dịch Vụ", href: "/services" },
      { label: "Liên Hệ", href: "/contact-us" },
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
  entryPopup: {
    enabled: false,
    eyebrow: "Ưu đãi hiện tại",
    title: "Đăng Ký Sớm – Giá Tốt Hơn",
    copy: "Đăng ký trước hạn để nhận mức giảm và ưu đãi theo số suất còn lại.",
    ctaLabel: "Xem Ưu Đãi",
    ctaHref: "/contact-us",
    dismissLabel: "Để sau",
  },
  pageIntros: [
    {
      page: "about",
      index: "01",
      eyebrow: "Inside Skill & Mix",
      title: "A SCHOOL FOR THIRSTY MINDS.",
      intro:
        "We built the class we wished existed: practical, demanding, generous, and a little bit chaotic.",
      accent: "coral",
    },
    {
      page: "staffs",
      index: "03",
      eyebrow: "Giảng viên",
      title: "GẶP GỠ ĐỘI NGŨ SKILL & MIX",
      intro:
        "Đội ngũ giảng viên của Skill & Mix là những người đang trực tiếp làm việc và tích lũy kinh nghiệm trong ngành Beverage & Hospitality. Mỗi người mang đến những góc nhìn, chuyên môn và trải nghiệm thực tế riêng trong quá trình đào tạo.",
      accent: "cobalt",
    },
    {
      page: "services",
      index: "05",
      eyebrow: "Beyond the classroom",
      title: "WE BRING THE BAR TO THE BRIEF.",
      intro:
        "Private workshops, sharper menus, stronger teams. Tell us what needs mixing.",
      accent: "coral",
    },
    {
      page: "courses",
      index: "02",
      eyebrow: "Khóa học",
      title: "KHÓA HỌC BARTENDER TẠI SKILL & MIX",
      intro:
        "Từ nền tảng cơ bản đến những kỹ năng chuyên sâu, các khóa học tại Skill & Mix được xây dựng theo từng mục tiêu và trình độ. Học viên được tiếp cận kiến thức, thực hành kỹ năng và từng bước phát triển năng lực phù hợp với định hướng của mình.",
      accent: "coral",
    },
    {
      page: "gallery",
      index: "04",
      eyebrow: "Inside the lab",
      title: "MESSY HANDS. CLEAN DRINKS.",
      intro:
        "Classes, experiments, guest shifts, bad ideas that became good ideas, and the occasional perfect lemon peel.",
      accent: "cobalt",
    },
    {
      page: "contact",
      index: "06",
      eyebrow: "Say hello",
      title: "QUESTIONS? GOOD.",
      intro:
        "Ask about a course, plan a private class, bring us a strange brief, or just come see the room.",
      accent: "coral",
    },
  ],
  marquees: {
    home: "Học Thật / Làm Thật / Sẵn Sàng Đi Làm",
    about: "Palate first / Ego last",
    courses: "Small class / Big practice",
  },
  featuredCourses: {
    eyebrow: "Khoá học nổi bật",
    title: "Các Khoá Học Tại Skill & Mix",
    linkLabel: "Xem Chi Tiết",
  },
  featuredInstructor: {
    eyebrow: "Giảng viên nổi bật",
    title: "Học trực tiếp cùng đội ngũ Skill & Mix.",
    linkLabel: "Gặp Grace",
  },
  courseHelp: {
    eyebrow: "Câu hỏi thường gặp",
    title: "Bạn chưa biết nên bắt đầu với khóa học nào?",
    linkLabel: "Liên hệ để được tư vấn",
  },
  courseFaq: {
    eyebrow: "FAQ",
    title: "Câu Hỏi Thường Gặp",
    items: [
      {
        question: "Tôi chưa biết gì về pha chế, có học được không?",
        answer:
          "Hoàn toàn có thể. Khóa học được xây dựng theo từng cấp độ, trong đó khóa Bartender Cơ Bản phù hợp với người mới bắt đầu.",
      },
      {
        question: "Skill & Mix có hỗ trợ giới thiệu việc làm không?",
        answer:
          "Skill & Mix có hỗ trợ kết nối và giới thiệu cơ hội phù hợp cho học viên sau khi hoàn thành khóa học, tùy theo năng lực và nhu cầu tuyển dụng tại từng thời điểm.",
      },
      {
        question: "Tôi có thể học thử trước khi đăng ký không?",
        answer:
          "Bạn có thể đăng ký tham quan hoặc tham gia buổi trải nghiệm theo lịch của Skill & Mix để tìm hiểu thêm về phương pháp học và môi trường đào tạo.",
      },
      {
        question: "Lịch học có linh hoạt không?",
        answer:
          "Lịch học được sắp xếp theo từng khóa và từng lớp. Bạn có thể liên hệ để được tư vấn lịch học phù hợp với thời gian của mình.",
      },
      {
        question: "Tôi nên bắt đầu với khóa học nào?",
        answer:
          "Đội ngũ Skill & Mix sẽ tư vấn dựa trên nền tảng hiện tại, mục tiêu học và định hướng của bạn để lựa chọn khóa học phù hợp.",
      },
    ],
  },
  staffNote: {
    eyebrow: "Học cùng đội ngũ",
    title: "Muốn Học Trực Tiếp Cùng Đội Ngũ Skill & Mix?",
    copy: "Mỗi hành trình học cần một người dẫn dắt phù hợp. Tại Skill & Mix, đội ngũ giảng viên đồng hành cùng học viên từ những kỹ năng nền tảng đến quá trình rèn luyện và phát triển theo mục tiêu riêng.",
    linkLabel: "Đăng Ký Tư Vấn",
  },
  courseDetail: {
    backLabel: "Tất cả khóa học",
    durationLabel: "Thời lượng",
    tuitionLabel: "Học phí",
    classSizeLabel: "Sĩ số",
    reserveLabel: "Đăng ký tư vấn",
    syllabusEyebrow: "Nội dung khóa học",
    syllabusTitle: "Bạn sẽ học",
    syllabusCopy:
      "Mỗi khóa học kết hợp kiến thức nền tảng, hướng dẫn trực tiếp và thực hành liên tục.",
    firstLessonCopy:
      "Nắm vững nền tảng, thực hành từng bước và nhận góp ý trực tiếp từ giảng viên.",
    lessonCopy:
      "Hiểu kỹ thuật, luyện tập đúng thao tác và ứng dụng vào môi trường làm việc thực tế.",
    intakeLabel: "Lịch khai giảng",
  },
  staffDetail: {
    backLabel: "All staff",
    profileLabel: "Profile",
    stamp: "Skill\n& Mix\nfaculty",
    bioLabel: "Behind the apron",
    achievementsEyebrow: "Awards & achievements",
    achievementsTitle: "A few things worth raising a glass to.",
    practiceEyebrow: "At the workbench",
    practiceTitle: "What {name} teaches.",
    offDutyLabel: "Off duty",
    favoritePourLabel: "Favorite pour:",
    nextLabel: "Next behind the bar",
  },
  homeHero: {
    kickerLeft: "Trung tâm đào tạo bartender tại TP.HCM",
    kickerRight: "Kỹ năng thực chiến · Kết nối nghề nghiệp",
    titleLineOne: "LEARN THE",
    titleWord: "SKILL.",
    titleEmphasis: "MASTER",
    titleLineThree: "THE MIX.",
    summary:
      "Trung tâm đào tạo bartender tại TP.HCM – kỹ năng thực chiến, kết nối nghề nghiệp.",
    buttonLabel: "Khám Phá Khoá Học",
    imageLeft:
      "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=1000&q=88",
    imageRight:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=88",
    burstTop: "Học",
    burstBottom: "thật",
    noteLineOne: "Tư vấn miễn phí.",
    noteLineTwo: "Học thử trước khi quyết định.",
  },
  homeManifesto: {
    eyebrow: "Về Skill & Mix",
    title: "Tại Sao Chọn Skill & Mix?",
    copy: "Skill & Mix không chỉ dạy cách pha chế – chúng tôi đào tạo bartender tự tin, chuyên nghiệp và sẵn sàng đi làm ngay. Nắm vững lý thuyết và thực hành, học từ bartender đang làm việc thực tế, kết nối cơ hội việc làm và lịch học linh hoạt.",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1400&q=88",
    stampTop: "HỌC",
    stampBottom: "THẬT",
  },
  homeTestimonials: [
    {
      quote:
        "Học rất thực tế, làm nhiều hơn ngồi nghe. Sau khóa mình tự tin hơn hẳn khi đứng quầy.",
      author: "Minh Tú",
      role: "Học viên · 22 tuổi",
    },
    {
      quote:
        "Trước khi học mình không biết gì về bartending. Giờ mình có thể tự tin pha những món cơ bản.",
      author: "Thảo Vy",
      role: "Học viên · 20 tuổi",
    },
    {
      quote:
        "Không khí lớp vui, thầy sửa từng động tác và không làm mình ngại khi hỏi.",
      author: "Hoàng Nam",
      role: "Học viên · 25 tuổi",
    },
    {
      quote:
        "Mình thích nhất là được thực hành liên tục. Học xong có thể áp dụng ngay khi đi làm.",
      author: "Bảo Anh",
      role: "Khoá Bartender Cơ Bản",
    },
    {
      quote:
        "Lớp nhỏ nên được hướng dẫn rất kỹ. Mỗi buổi đều thấy tay mình chắc hơn một chút.",
      author: "Linh Chi",
      role: "Học viên",
    },
    {
      quote:
        "Kiến thức dễ hiểu, không quá học thuật. Mình đi học sau giờ làm vẫn theo kịp.",
      author: "Quốc Huy",
      role: "Học viên buổi tối",
    },
    {
      quote:
        "Từ cách cầm jigger đến setup quầy đều được chỉ rõ. Những chi tiết nhỏ thật sự hữu ích.",
      author: "Gia Hân",
      role: "Khoá Bar Skill",
    },
    {
      quote:
        "Mình đăng ký vì tò mò, cuối cùng lại tìm được một công việc mà mình thật sự thích.",
      author: "Tuấn Kiệt",
      role: "Cựu học viên",
    },
    {
      quote:
        "Giảng viên gần gũi và feedback thẳng. Sai ở đâu là được sửa ngay ở đó.",
      author: "Ngọc Mai",
      role: "Khoá Nâng Cao",
    },
    {
      quote:
        "Buổi nào cũng vui nhưng vẫn học được rất nhiều. Đây là khóa học mình sẽ giới thiệu cho bạn bè.",
      author: "Đức Anh",
      role: "Học viên",
    },
  ],
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
      linkText: "Open maps",
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
    handle: "@skillandmix",
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

function mediaUrl(value: unknown, fallback = ""): string {
  const url =
    typeof value === "string"
      ? value
      : value && typeof value === "object" && "url" in value
        ? String((value as { url?: string }).url ?? "")
        : "";
  if (!url) return fallback;
  if (/^https?:\/\//.test(url)) return url;
  return backendUrl
    ? `${backendUrl}${url.startsWith("/") ? "" : "/"}${url}`
    : url;
}

function normalizeCourse(course: any): Course {
  const fallback =
    courses.find((item) => item.slug === course?.slug) ?? courses[0];
  return {
    ...fallback,
    ...course,
    image: mediaUrl(course?.image, fallback.image),
    syllabus: Array.isArray(course?.syllabus)
      ? course.syllabus
          .map((item: any) => (typeof item === "string" ? item : item?.item))
          .filter(Boolean)
      : [],
  };
}

function normalizeStaffMember(person: any): StaffMember {
  const fallback = staff.find((item) => item.slug === person?.slug) ?? staff[0];
  return {
    ...fallback,
    ...person,
    image: mediaUrl(person?.image, fallback.image),
    bio: Array.isArray(person?.bio)
      ? person.bio
          .map((item: any) =>
            typeof item === "string" ? item : item?.paragraph,
          )
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
  return requestJSON("/api/courses?limit=100&sort=createdAt", {
    docs: courses,
  }).then((result) => (result.docs ?? courses).map(normalizeCourse));
}

export async function getCourseBySlug(slug: string) {
  const list = await getCourses();
  return list.find((course) => course.slug === slug) ?? null;
}

export async function getStaff() {
  return requestJSON("/api/staff?limit=100&sort=createdAt", {
    docs: staff,
  }).then((result) => (result.docs ?? staff).map(normalizeStaffMember));
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
  }).then((result) =>
    (result.docs ?? []).map((item: any, index: number) => ({
      ...item,
      image: mediaUrl(item.image, galleryImages[index] ?? ""),
    })),
  );
}

export async function getSiteSettings() {
  const value = await requestJSON<Partial<SiteSettings>>(
    "/api/globals/site-settings",
    siteSettingsFallback,
  );
  return {
    ...siteSettingsFallback,
    ...value,
    announcementBar: {
      ...siteSettingsFallback.announcementBar,
      ...value.announcementBar,
    },
    navigation: value.navigation?.length
      ? value.navigation
      : siteSettingsFallback.navigation,
    footer: {
      ...siteSettingsFallback.footer,
      ...value.footer,
      links: value.footer?.links?.length
        ? value.footer.links
        : siteSettingsFallback.footer.links,
    },
    theme: { ...siteSettingsFallback.theme, ...value.theme },
  };
}

export async function getSiteContent() {
  const value = await requestJSON<Partial<SiteContent>>(
    "/api/globals/site-content",
    siteContentFallback,
  );
  const merged = {
    ...siteContentFallback,
    ...value,
    pageIntros: value.pageIntros?.length
      ? value.pageIntros
      : siteContentFallback.pageIntros,
    marquees: { ...siteContentFallback.marquees, ...value.marquees },
    featuredCourses: {
      ...siteContentFallback.featuredCourses,
      ...value.featuredCourses,
    },
    featuredInstructor: {
      ...siteContentFallback.featuredInstructor,
      ...value.featuredInstructor,
    },
    courseHelp: { ...siteContentFallback.courseHelp, ...value.courseHelp },
    courseFaq: {
      ...siteContentFallback.courseFaq,
      ...value.courseFaq,
      items: value.courseFaq?.items?.length
        ? value.courseFaq.items
        : siteContentFallback.courseFaq.items,
    },
    staffNote: { ...siteContentFallback.staffNote, ...value.staffNote },
    courseDetail: {
      ...siteContentFallback.courseDetail,
      ...value.courseDetail,
    },
    staffDetail: { ...siteContentFallback.staffDetail, ...value.staffDetail },
  };
  return {
    ...merged,
    entryPopup: {
      ...siteContentFallback.entryPopup,
      ...value.entryPopup,
      image: mediaUrl(value.entryPopup?.image),
    },
    featuredInstructor: {
      ...merged.featuredInstructor,
      person:
        value.featuredInstructor?.person &&
        typeof value.featuredInstructor.person === "object"
          ? normalizeStaffMember(value.featuredInstructor.person)
          : undefined,
    },
    homeHero: {
      ...siteContentFallback.homeHero,
      ...value.homeHero,
      imageLeft: mediaUrl(
        value.homeHero?.imageLeft,
        siteContentFallback.homeHero.imageLeft,
      ),
      imageRight: mediaUrl(
        value.homeHero?.imageRight,
        siteContentFallback.homeHero.imageRight,
      ),
    },
    homeManifesto: {
      ...siteContentFallback.homeManifesto,
      ...value.homeManifesto,
      image: mediaUrl(
        value.homeManifesto?.image,
        siteContentFallback.homeManifesto.image,
      ),
    },
    story: {
      ...siteContentFallback.story,
      ...value.story,
      imageOne: mediaUrl(
        value.story?.imageOne,
        siteContentFallback.story.imageOne,
      ),
      imageTwo: mediaUrl(
        value.story?.imageTwo,
        siteContentFallback.story.imageTwo,
      ),
    },
  };
}

export function getPageIntro(content: SiteContent, page: string) {
  return (
    content.pageIntros.find((intro) => intro.page === page) ??
    siteContentFallback.pageIntros.find((intro) => intro.page === page)!
  );
}

export async function getServices() {
  return requestJSON("/api/services?limit=100", {
    docs: servicesFallback,
  }).then((result) =>
    (result.docs ?? servicesFallback).map((service: any, index: number) => ({
      ...service,
      image: mediaUrl(service.image, servicesFallback[index]?.image ?? ""),
    })),
  );
}
