export type Course = {
  slug: string;
  index: string;
  title: string;
  level: string;
  duration: string;
  price: string;
  summary: string;
  image: string;
  tone: string;
  syllabus: string[];
};

export const courses: Course[] = [
  {
    slug: "shake-the-basics",
    index: "01",
    title: "Shake the Basics",
    level: "No experience needed",
    duration: "4 weeks",
    price: "$480",
    summary: "Build proper technique, train your palate, and make twelve classics without hiding behind a recipe.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1400&q=88",
    tone: "var(--accent)",
    syllabus: ["Balance & dilution", "Shaking and stirring", "Classic families", "Home bar setup"],
  },
  {
    slug: "service-under-fire",
    index: "02",
    title: "Service Under Fire",
    level: "Working bartenders",
    duration: "2 weekends",
    price: "$620",
    summary: "Move faster, cleaner, and calmer. A service lab for bartenders who want their best shift to become normal.",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1400&q=88",
    tone: "var(--cobalt)",
    syllabus: ["Station architecture", "Batching systems", "Guest reading", "High-volume drills"],
  },
  {
    slug: "liquid-invention",
    index: "03",
    title: "Liquid Invention",
    level: "Intermediate",
    duration: "6 weeks",
    price: "$790",
    summary: "Turn ideas into original drinks through flavor mapping, modern prep, iteration, and honest critique.",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1400&q=88",
    tone: "var(--acid)",
    syllabus: ["Flavor architecture", "Infusions & acids", "Menu storytelling", "R&D critique"],
  },
  {
    slug: "zero-proof-full-flavor",
    index: "04",
    title: "Zero Proof, Full Flavor",
    level: "All levels",
    duration: "3 weeks",
    price: "$390",
    summary: "Build alcohol-free drinks with structure, texture, aroma, and enough character to stand beside any classic.",
    image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=1400&q=88",
    tone: "var(--accent)",
    syllabus: ["Zero-proof structure", "Tea & botanical extraction", "Texture without spirits", "Service-ready recipes"],
  },
  {
    slug: "inside-the-spirit",
    index: "05",
    title: "Inside the Spirit",
    level: "Beginner to intermediate",
    duration: "4 weekends",
    price: "$560",
    summary: "Taste across the major spirit families and learn how production choices become flavor in the glass.",
    image: "https://images.unsplash.com/photo-1556855810-ac404aa91e85?auto=format&fit=crop&w=1400&q=88",
    tone: "var(--cobalt)",
    syllabus: ["Distillation basics", "Agave & cane", "Whisky & grain", "Guided comparative tasting"],
  },
  {
    slug: "lead-the-bar",
    index: "06",
    title: "Lead the Bar",
    level: "Experienced bartenders",
    duration: "5 weeks",
    price: "$850",
    summary: "A working leadership course covering training, costing, culture, menu systems, and the decisions nobody sees.",
    image: "https://images.unsplash.com/photo-1436076863939-06870fe779c2?auto=format&fit=crop&w=1400&q=88",
    tone: "var(--acid)",
    syllabus: ["Coaching a team", "Costing & controls", "Menu operations", "Culture under pressure"],
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
    slug: "nguyen-minh-anh",
    name: "Nguyễn Minh Anh",
    shortName: "Minh Anh",
    role: "Founder / Head of Taste",
    note: "15 years behind bars. Still obsessed with ice.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=88",
    bio: [
      "Minh Anh started behind a twelve-seat hotel bar, where every quiet shift became an excuse to taste, test, and take better notes. Fifteen years later, she still believes attention is the most useful tool behind the bar.",
      "She founded Skill & Mix after realizing that most training taught people what to make but rarely how to notice. Her classes begin with the palate, move through technique, and end when every student can explain their own decisions.",
    ],
    quote: "The recipe is only the beginning. Your attention is the real ingredient.",
    specialties: ["Palate training", "Classic structure", "Ice & dilution", "Menu direction"],
    teachingFocus: "Helping students taste precisely, speak clearly, and trust what they notice.",
    favoritePour: "A very cold Bamboo",
    achievements: [
      { year: "2025", title: "Hospitality Educator of the Year", organization: "Vietnam Bar Awards" },
      { year: "2023", title: "Founded the Open Bar Scholarship", organization: "Skill & Mix" },
      { year: "2019", title: "Best New Cocktail Program", organization: "Saigon Hospitality Circle" },
    ],
  },
  {
    slug: "tran-quoc-bao",
    name: "Trần Quốc Bảo",
    shortName: "Quốc Bảo",
    role: "Technique Director",
    note: "Fast hands, quiet station, zero wasted movement.",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=1000&q=88",
    bio: [
      "Quốc Bảo learned high-volume service in Ho Chi Minh City, then spent a decade building teams across the city's hotel bars and independent cocktail rooms. He can spot a slow station from across the room and fix it without adding a single gadget.",
      "At Skill & Mix, Quốc Bảo turns technique into repeatable movement. His drills are exacting, practical, and designed to hold up when the printer will not stop.",
    ],
    quote: "Speed is not rushing. Speed is removing every movement that does not help.",
    specialties: ["Station systems", "High-volume service", "Batching", "Team training"],
    teachingFocus: "Building calm, clean habits that survive the busiest night of the week.",
    favoritePour: "Tommy's Margarita",
    achievements: [
      { year: "2025", title: "Technical Excellence Award", organization: "Vietnam Bar Awards" },
      { year: "2022", title: "Built the 90-Second Service System", organization: "Skill & Mix" },
      { year: "2018", title: "National Speed Challenge Finalist", organization: "Vietnam Cocktail Week" },
    ],
  },
  {
    slug: "le-ngoc-mai",
    name: "Lê Ngọc Mai",
    shortName: "Ngọc Mai",
    role: "Flavor & Fermentation",
    note: "Makes complicated flavor feel obvious.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=88",
    bio: [
      "Ngọc Mai came to drinks through kitchens, preserves, and a stubborn fascination with what microbes can do to fruit. Her work moves between culinary technique and the clean logic of a well-built cocktail.",
      "She leads the academy's flavor labs, where students learn to turn an abstract idea into something balanced, stable, and genuinely delicious.",
    ],
    quote: "Interesting is easy. Delicious is the discipline.",
    specialties: ["Fermentation", "Acid adjustment", "Infusions", "Flavor mapping"],
    teachingFocus: "Making modern preparation understandable, repeatable, and useful in real service.",
    favoritePour: "A saison with a side of amaro",
    achievements: [
      { year: "2026", title: "Innovation in Flavor Award", organization: "Saigon Drinks Forum" },
      { year: "2024", title: "Published the Tropical Acids Field Guide", organization: "Skill & Mix Press" },
      { year: "2021", title: "Zero-Waste Menu of the Year", organization: "Vietnam Hospitality Circle" },
    ],
  },
  {
    slug: "pham-gia-huy",
    name: "Phạm Gia Huy",
    shortName: "Gia Huy",
    role: "Guest Experience",
    note: "Teaches the part no recipe book can.",
    image: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?auto=format&fit=crop&w=1000&q=88",
    bio: [
      "Gia Huy has opened neighborhood bars, trained hotel teams, and hosted more first dates than anyone should be asked to count. His specialty is the invisible architecture of a good night out.",
      "In class, Gia Huy works on language, timing, observation, and recovery. The goal is not scripted charm. It is making every guest feel that the room has noticed them.",
    ],
    quote: "Hospitality starts one second before someone has to ask.",
    specialties: ["Guest reading", "Service language", "Conflict recovery", "Team culture"],
    teachingFocus: "Turning technical service into a generous, human experience.",
    favoritePour: "Half a Martini, then another",
    achievements: [
      { year: "2025", title: "Guest Experience Leader", organization: "Vietnam Hospitality Awards" },
      { year: "2023", title: "Created the Service Recovery Lab", organization: "Skill & Mix" },
      { year: "2020", title: "Opening Team Mentor of the Year", organization: "Saigon Bar Community" },
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
