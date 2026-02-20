import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/regular.min.css";
import "@fortawesome/fontawesome-free/css/brands.min.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fotoinwien.at"),
  title: {
    default: "Fotograf Wien - Alexandru Bogdan | Business & Event Fotografie",
    template: "%s | Foto in Wien",
  },
  description:
    "Professioneller Fotograf in Wien. Business Portraits ab €100, Eventfotografie ab €400, Produktfotos ab €25. Über 12 Jahre Erfahrung. Jetzt kostenloses Angebot anfordern!",
  keywords: [
    "Fotograf Wien",
    "Business Fotografie Wien",
    "Eventfotograf Wien",
    "Porträtfotografie Wien",
    "Produktfotografie Wien",
    "Food Fotografie Wien",
  ],
  authors: [{ name: "Alexandru Bogdan" }],
  creator: "Alexandru Bogdan",
  publisher: "WELO MEDIA STUDIOS S.R.L.",

  openGraph: {
    type: "website",
    locale: "de_AT",
    url: "https://www.fotoinwien.at",
    siteName: "Foto in Wien",
    title: "Fotograf Wien - Alexandru Bogdan",
    description: "Professionelle Fotografie für Business, Events und mehr",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fotograf Wien - Alexandru Bogdan",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Fotograf Wien - Alexandru Bogdan",
    description: "Professionelle Business & Event Fotografie",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.fotoinwien.at/#business",
      "name": "Foto in Wien - Alexandru Bogdan",
      "image": "https://www.fotoinwien.at/images/hero/hero-studio-scene.jpg",
      "description": "Professioneller Fotograf in Wien für Business, Event, Portrait und Produktfotografie.",
      "url": "https://www.fotoinwien.at",
      "telephone": "+43-660-845-9895",
      "email": "info@fotoinwien.at",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Wien",
        "addressCountry": "AT"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 48.2082,
        "longitude": 16.3738
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "priceRange": "€€",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "sameAs": [
        "https://www.instagram.com/fotoinwien/",
        "https://www.facebook.com/fotoinwien/"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "47",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.fotoinwien.at/#service",
      "name": "Foto in Wien - Professionelle Fotografie",
      "serviceType": "Photography",
      "provider": { "@id": "https://www.fotoinwien.at/#business" },
      "areaServed": {
        "@type": "City",
        "name": "Wien"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Fotografie Dienstleistungen",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Businessfotografie" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Eventfotografie" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Portraitfotografie" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Produktfotografie" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Food Fotografie" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Familienfotografie" } }
        ]
      }
    },
    {
      "@type": "Person",
      "@id": "https://www.fotoinwien.at/#person",
      "name": "Alexandru Bogdan",
      "jobTitle": "Professioneller Fotograf",
      "worksFor": { "@id": "https://www.fotoinwien.at/#business" },
      "knowsAbout": ["Business Fotografie", "Event Fotografie", "Portrait Fotografie", "Produkt Fotografie"]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Was kostet ein Fotoshooting?", "acceptedAnswer": { "@type": "Answer", "text": "Die Preise variieren je nach Art des Shootings. Business Portraits starten ab €100, Eventfotografie ab €400, Produktfotos ab €25/Produkt. Kontaktieren Sie mich für ein individuelles Angebot." } },
        { "@type": "Question", "name": "Wie lange dauert es bis ich die Bilder bekomme?", "acceptedAnswer": { "@type": "Answer", "text": "Standardlieferung innerhalb von 5-7 Werktagen. Express-Lieferung in 48h ist gegen Aufpreis möglich." } },
        { "@type": "Question", "name": "Kann ich die Bilder kommerziell nutzen?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, alle Business- und Produktfotos beinhalten eine kommerzielle Nutzungslizenz. Die genauen Nutzungsrechte werden im Vertrag festgehalten." } },
        { "@type": "Question", "name": "Was passiert wenn mir die Bilder nicht gefallen?", "acceptedAnswer": { "@type": "Answer", "text": "Ich biete eine Zufriedenheitsgarantie. Sollten Sie nicht zufrieden sein, gibt es eine kostenlose Nachbearbeitung oder Neuaufnahme der Bilder." } },
        { "@type": "Question", "name": "Wo findet das Shooting statt?", "acceptedAnswer": { "@type": "Answer", "text": "Je nach Wunsch entweder in meinem Studio in Wien, bei Ihnen vor Ort (Büro, Event-Location) oder an einem Outdoor-Standort Ihrer Wahl in Wien und Umgebung." } },
        { "@type": "Question", "name": "Was muss ich mitbringen?", "acceptedAnswer": { "@type": "Answer", "text": "Für Business-Portraits empfehle ich 2-3 Outfit-Optionen. Für Produktfotos sollten die Produkte sauber und unbeschädigt sein. Bei Events organisiere ich alles vor Ort." } },
        { "@type": "Question", "name": "Wie viele Bilder bekomme ich?", "acceptedAnswer": { "@type": "Answer", "text": "Das hängt vom Paket ab. Bei Portraits erhalten Sie typischerweise 15-30 bearbeitete Bilder, bei Events 100-300 Bilder, bei Produkten alle vereinbarten Aufnahmen." } },
        { "@type": "Question", "name": "Kann ich die Location selbst wählen?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, absolut! Ich bin flexibel und komme gerne zu Ihrer Wunsch-Location in Wien und Umgebung. Fahrtkosten innerhalb Wiens sind inklusive." } }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${jost.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
