export type Course = {
  slug: string;
  index: string;
  title: string;
  level: string;
  duration: string;
  price: string;
  promotionPrice?: string;
  classSize: string;
  nextIntake: string;
  schedule: string;
  location: string;
  summary: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  tone: string;
  syllabus: string[];
};

export const courses: Course[] = [
  {
    slug: "bartender-co-ban",
    index: "01",
    title: "Bartender Cơ Bản",
    level: "Người mới 100%, sinh viên, người muốn chuyển ngành",
    duration: "1,5–2 tháng, tùy lịch giảng viên",
    price: "Liên hệ",
    classSize: "Tối đa 6 học viên/lớp",
    nextIntake: "Liên hệ để nhận lịch gần nhất",
    schedule: "Lịch học theo từng lớp và lịch giảng viên",
    location: "TP. Hồ Chí Minh",
    summary: "Khóa học dành cho người mới bắt đầu, giúp xây dựng kiến thức nền tảng, kỹ thuật pha chế và quy trình làm việc tại quầy bar.",
    image: "https://images.unsplash.com/photo-1436076863939-06870fe779c2?auto=format&fit=crop&w=1400&q=88",
    imageAlt: "Học viên thực hành pha chế tại quầy với shaker và dụng cụ bartender",
    imageCaption: "Skill & Mix Academy · TP.HCM",
    tone: "var(--accent)",
    syllabus: [
      "Kiến thức nền tảng về rượu và cocktail",
      "Làm quen với dụng cụ và kỹ thuật pha chế cơ bản",
      "Thực hành các công thức cocktail phổ biến",
      "Kỹ năng giao tiếp và phục vụ khách hàng",
      "Rèn luyện thao tác và quy trình tại quầy bar",
      "Thực hành trong môi trường mô phỏng thực tế",
    ],
  },
  {
    slug: "bartender-nang-cao",
    index: "02",
    title: "Bartender Nâng Cao",
    level: "Đã hoàn thành khóa cơ bản hoặc bartender muốn lên tay",
    duration: "6 tuần",
    price: "Liên hệ",
    classSize: "Lớp thực hành chuyên sâu",
    nextIntake: "Liên hệ để nhận lịch gần nhất",
    schedule: "Lịch học theo từng lớp",
    location: "TP. Hồ Chí Minh",
    summary: "Khóa học dành cho học viên đã có nền tảng, tập trung vào kỹ thuật nâng cao, thiết kế menu và vận hành quầy bar chuyên nghiệp.",
    image: "https://images.unsplash.com/photo-1556855810-ac404aa91e85?auto=format&fit=crop&w=1400&q=88",
    imageAlt: "Bartender thực hành kỹ thuật nâng cao tại quầy bar",
    imageCaption: "Skill & Mix Academy · TP.HCM",
    tone: "var(--cobalt)",
    syllabus: [
      "Kỹ thuật nâng cao: layering, infusion và smoke",
      "Thiết kế menu cocktail signature",
      "Inventory và cost control",
      "Mixology và pairing",
      "Phong cách phục vụ tại bar chuyên nghiệp",
      "Thực hành tại bar đối tác của Skill & Mix",
    ],
  },
  {
    slug: "flair-bartending",
    index: "03",
    title: "Flair Bartending",
    level: "Bartender muốn nâng cao kỹ năng biểu diễn",
    duration: "8 buổi",
    price: "Liên hệ",
    classSize: "Lớp thực hành",
    nextIntake: "Liên hệ để nhận lịch gần nhất",
    schedule: "Lịch học theo từng lớp",
    location: "TP. Hồ Chí Minh",
    summary: "Phát triển kỹ năng biểu diễn, khả năng kiểm soát dụng cụ và dấu ấn cá nhân thông qua luyện tập liên tục.",
    image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=1400&q=88",
    imageAlt: "Flair bartender biểu diễn và kiểm soát dụng cụ",
    imageCaption: "Skill & Mix Academy · TP.HCM",
    tone: "var(--acid)",
    syllabus: [
      "Kỹ thuật Flair cơ bản và kiểm soát dụng cụ",
      "Phát triển phong cách biểu diễn cá nhân",
      "Luyện tập theo chủ đề và mục tiêu cụ thể",
      "Hoàn thiện kỹ năng qua thực hành liên tục",
    ],
  },
  {
    slug: "bar-skill",
    index: "04",
    title: "Bar Skill",
    level: "Bartender muốn rèn luyện thao tác và độ chính xác",
    duration: "8 buổi",
    price: "Liên hệ",
    classSize: "Lớp thực hành",
    nextIntake: "Liên hệ để nhận lịch gần nhất",
    schedule: "Lịch học theo từng lớp",
    location: "TP. Hồ Chí Minh",
    summary: "Rèn luyện khả năng sử dụng dụng cụ, tốc độ, độ chính xác và sự mượt mà khi làm việc sau quầy bar.",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1400&q=88",
    imageAlt: "Học viên luyện tập kỹ năng Bar Skill với dụng cụ bartender",
    imageCaption: "Skill & Mix Academy · TP.HCM",
    tone: "var(--accent)",
    syllabus: [
      "Sử dụng và kiểm soát các dụng cụ bartender",
      "Thao tác với Shaker, Jigger, Pour và Bar Spoon",
      "Rolling, Shaking và Chill Glass",
      "Phối hợp kỹ năng trong quá trình pha chế",
      "Rèn luyện tốc độ, độ chính xác và sự mượt mà",
      "Ứng dụng kỹ năng vào quy trình làm việc tại quầy",
    ],
  },
  {
    slug: "mot-kem-mot",
    index: "05",
    title: "1 Kèm 1",
    level: "Lộ trình cá nhân theo mục tiêu học viên",
    duration: "Theo lộ trình cá nhân",
    price: "Liên hệ",
    classSize: "1 học viên",
    nextIntake: "Liên hệ để nhận lịch gần nhất",
    schedule: "Lịch học linh hoạt cùng giảng viên",
    location: "TP. Hồ Chí Minh",
    summary: "Lộ trình được xây dựng theo nền tảng, nhu cầu và mục tiêu riêng, với hướng dẫn trực tiếp từ giảng viên.",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1400&q=88",
    imageAlt: "Học viên học và thực hành trực tiếp một kèm một cùng giảng viên",
    imageCaption: "Skill & Mix Academy · TP.HCM",
    tone: "var(--cobalt)",
    syllabus: [
      "Nội dung theo nền tảng và mục tiêu của học viên",
      "Rèn luyện kỹ thuật theo nhu cầu cá nhân",
      "Thực hành trực tiếp cùng giảng viên",
      "Điều chỉnh thao tác trong quá trình học",
      "Tập trung cải thiện kỹ năng cần phát triển",
      "Xây dựng lộ trình phù hợp với định hướng cá nhân",
    ],
  },
];

export type StaffMember = {
  slug: string;
  name: string;
  shortName: string;
  role: string;
  note: string;
  image: string;
  bio: string[];
  quote: string;
  specialties: string[];
  teachingFocus: string;
  favoritePour: string;
  achievements: {
    year: string;
    title: string;
    organization: string;
  }[];
};

export const staff: StaffMember[] = [
  {
    slug: "grace-truong",
    name: "Grace Trương",
    shortName: "Grace",
    role: "Group Beverage Manager & Training Lead",
    note: "Hơn 10 năm kinh nghiệm trong Beverage & Hospitality.",
    image: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?auto=format&fit=crop&w=1000&q=88",
    bio: [
      "Hơn 10 năm kinh nghiệm trong lĩnh vực Beverage & Hospitality, từng đảm nhiệm các vị trí quản lý, xây dựng concept đồ uống và đào tạo đội ngũ tại nhiều mô hình F&B.",
      "Kinh nghiệm tại Tipsy Entertainment, Rémy Cointreau Vietnam và Tribe Hospitality Group.",
    ],
    quote: "Hơn 10 năm kinh nghiệm trong Beverage & Hospitality.",
    specialties: ["Beverage Management", "Training", "Concept Development"],
    teachingFocus: "Quản lý đồ uống, xây dựng concept và đào tạo đội ngũ.",
    favoritePour: "Chưa cập nhật",
    achievements: [
      { year: "2016", title: "Champion", organization: "Patron Tequila Competition" },
      { year: "2018", title: "Top 3", organization: "Bacardi Vietnam Competition" },
      { year: "2019", title: "Top 10", organization: "Bacardi Legacy South Asia" },
      { year: "2017", title: "Top 10", organization: "OPIHR Gin Vietnam" },
      { year: "2017", title: "Top 10", organization: "Fosters Gin Vietnam" },
    ],
  },
  {
    slug: "duong-minh-tri",
    name: "Dương Minh Trí",
    shortName: "Minh Trí",
    role: "Flair Bartender / Instructor",
    note: "Chuyên về Flair Bartending và biểu diễn kỹ thuật pha chế.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=88",
    bio: [
      "Có kinh nghiệm tham gia và đạt thành tích tại nhiều cuộc thi Flair trong nước và quốc tế.",
      "Chuyên đào tạo kỹ năng Flair, kiểm soát dụng cụ và phát triển khả năng biểu diễn sau quầy bar.",
    ],
    quote: "Kiểm soát dụng cụ là nền tảng của một màn trình diễn tự tin.",
    specialties: ["Flair Bartending", "Tool Control", "Performance"],
    teachingFocus: "Flair, kiểm soát dụng cụ và phong cách biểu diễn cá nhân.",
    favoritePour: "Chưa cập nhật",
    achievements: [
      { year: "2025", title: "Top 6", organization: "Barchef 8 Philippine Flair Open" },
      { year: "2025", title: "Top 6", organization: "The Mondo Flair Master Thailand" },
      { year: "2024", title: "Top 7", organization: "World Flair Championship" },
      { year: "2023", title: "Top 10", organization: "World Flair Championship" },
      { year: "2023", title: "Champion", organization: "Vietnam Flair Championship" },
      { year: "2023", title: "Champion", organization: "Flair Forever" },
      { year: "2023", title: "Champion", organization: "Vietnam Flair Show" },
      { year: "2022", title: "Champion", organization: "Monkey Shoulder Flair Championship" },
      { year: "2022", title: "Top 2", organization: "Vietnam Flair Championship" },
      { year: "2019", title: "Champion", organization: "The Cocktail HCHC Open" },
      { year: "2018", title: "Champion", organization: "Flair Competition Hutech" },
    ],
  },
  {
    slug: "hoai-le",
    name: "Hoài Lê",
    shortName: "Hoài",
    role: "Head Bartender · Chill Sky Bar",
    note: "Mixology Specialist / Instructor.",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=1000&q=88",
    bio: [
      "Hiện đang làm việc tại Chill Sky Bar với vai trò Head Bartender.",
      "Mixology Specialist / Instructor, chuyên môn Mixology và Spirit Knowledge.",
    ],
    quote: "Hiểu nguyên liệu để sáng tạo đồ uống có chủ đích.",
    specialties: ["Mixology", "Spirit Knowledge"],
    teachingFocus: "Mixology và Spirit Knowledge.",
    favoritePour: "Chưa cập nhật",
    achievements: [
      { year: "Hiện tại", title: "Head Bartender", organization: "Chill Sky Bar" },
    ],
  },
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=1200&q=88",
  "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=88",
  "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=1200&q=88",
  "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1200&q=88",
  "https://images.unsplash.com/photo-1556855810-ac404aa91e85?auto=format&fit=crop&w=1200&q=88",
  "https://images.unsplash.com/photo-1436076863939-06870fe779c2?auto=format&fit=crop&w=1200&q=88",
  "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=88",
  "https://images.unsplash.com/photo-1486947799489-3fabdd7d32a6?auto=format&fit=crop&w=1200&q=88",
  "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=1200&q=88",
];
