export type Category =
  | "all"
  | "business"
  | "portrait"
  | "event"
  | "product"
  | "food"
  | "family"
  | "boudoir";

export interface Project {
  id: string;
  slug: string;
  title: string;
  client?: string;
  date?: string;
  categories: Category[];
  description: string;
  featuredImage: string;
  images: string[];
  imageCount: number;
}

export const categories: { value: Category; label: string }[] = [
  { value: "all", label: "Alle" },
  { value: "business", label: "Business" },
  { value: "portrait", label: "Portrait" },
  { value: "event", label: "Event" },
  { value: "product", label: "Produkt" },
  { value: "food", label: "Food" },
  { value: "family", label: "Familie" },
  { value: "boudoir", label: "Boudoir" },
];

export const projects: Project[] = [
  {
    id: "1",
    slug: "tu-wien-event-2024",
    title: "TU Wien i2ncubator Event",
    client: "TU Wien",
    date: "2024",
    categories: ["event"],
    description:
      "Dokumentation des jahrlichen i2ncubator Events an der Technischen Universitat Wien. Networking, Pitches und Innovation im Fokus.",
    featuredImage: "/images/portfolio/tu-wien-event.jpg",
    images: [],
    imageCount: 45,
  },
  {
    id: "2",
    slug: "autonom-health-produktfotografie",
    title: "Autonom Health Produktfotografie",
    client: "Autonom Health",
    date: "2024",
    categories: ["product"],
    description:
      "Produktfotografie fur die HRV-Monitoring Gerate von Autonom Health. Hochwertige Packshots und Lifestyle-Aufnahmen.",
    featuredImage: "/images/portfolio/autonom-health.jpg",
    images: [],
    imageCount: 32,
  },
  {
    id: "3",
    slug: "v-suit-fashion-event",
    title: "V-Suit Fashion Event",
    client: "V-Suit",
    date: "2024",
    categories: ["event", "portrait"],
    description:
      "Fashion Event Coverage fur V-Suit. Runway, Backstage und VIP-Gaste.",
    featuredImage: "/images/portfolio/v-suit.jpg",
    images: [],
    imageCount: 78,
  },
  {
    id: "4",
    slug: "gerstner-catering",
    title: "Gerstner Catering",
    client: "Gerstner",
    date: "2023",
    categories: ["food", "event"],
    description:
      "Food Fotografie und Event-Dokumentation fur Gerstner. Kulinarische Meisterwerke in Szene gesetzt.",
    featuredImage: "/images/portfolio/gerstner.jpg",
    images: [],
    imageCount: 56,
  },
  {
    id: "5",
    slug: "corporate-portraits-wien",
    title: "Corporate Portraits Wien",
    client: "Diverse",
    date: "2024",
    categories: ["business", "portrait"],
    description:
      "Professionelle Business Portraits fur Fuhrungskrafte und Teams in Wien.",
    featuredImage: "/images/portfolio/corporate-portraits.jpg",
    images: [],
    imageCount: 124,
  },
  {
    id: "6",
    slug: "hope-for-the-future",
    title: "Hope for the Future Gala",
    client: "Hope for the Future",
    date: "2023",
    categories: ["event"],
    description:
      "Charity Gala Dokumentation. Emotionale Momente und VIP-Gaste.",
    featuredImage: "/images/portfolio/hope-future.jpg",
    images: [],
    imageCount: 89,
  },
  {
    id: "7",
    slug: "wiener-startup-portraits",
    title: "Wiener Startup Portraits",
    client: "Diverse Startups",
    date: "2024",
    categories: ["business", "portrait"],
    description:
      "Team- und Grunderportraits fur Wiener Startups. Modern und authentisch.",
    featuredImage: "/images/portfolio/startup-portraits.jpg",
    images: [],
    imageCount: 67,
  },
  {
    id: "8",
    slug: "restaurant-interior-food",
    title: "Restaurant Interior & Food",
    client: "Diverses Restaurant",
    date: "2024",
    categories: ["food"],
    description:
      "Interior und Food Fotografie fur gehobene Gastronomie in Wien.",
    featuredImage: "/images/portfolio/restaurant-food.jpg",
    images: [],
    imageCount: 43,
  },
  {
    id: "9",
    slug: "familienportraits-outdoor",
    title: "Familienportraits Outdoor",
    client: "Private",
    date: "2024",
    categories: ["family", "portrait"],
    description:
      "Naturliche Familienportraits in Wiener Parks und Grunanlagen.",
    featuredImage: "/images/portfolio/family-outdoor.jpg",
    images: [],
    imageCount: 38,
  },
  {
    id: "10",
    slug: "konferenz-dokumentation",
    title: "Konferenz Dokumentation",
    client: "Diverse",
    date: "2024",
    categories: ["event", "business"],
    description:
      "Professionelle Dokumentation von Business-Konferenzen und Seminaren.",
    featuredImage: "/images/portfolio/conference.jpg",
    images: [],
    imageCount: 156,
  },
  {
    id: "11",
    slug: "e-commerce-produktfotos",
    title: "E-Commerce Produktfotos",
    client: "Diverse",
    date: "2024",
    categories: ["product"],
    description:
      "Produktfotografie fur Online-Shops. Freisteller und Lifestyle-Aufnahmen.",
    featuredImage: "/images/portfolio/ecommerce.jpg",
    images: [],
    imageCount: 234,
  },
  {
    id: "12",
    slug: "boudoir-eleganz",
    title: "Boudoir Eleganz",
    client: "Private",
    date: "2024",
    categories: ["boudoir", "portrait"],
    description:
      "Elegante und tastvolle Boudoir-Fotografie. Selbstbewusstsein im Fokus.",
    featuredImage: "/images/portfolio/boudoir.jpg",
    images: [],
    imageCount: 28,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: Category): Project[] {
  if (category === "all") return projects;
  return projects.filter((p) => p.categories.includes(category));
}
