import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/regular.min.css";
import "@fortawesome/fontawesome-free/css/brands.min.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
    "Eventfotograf & Fotograf Wien - Eventfotografie ab €400, Business Portraits ab €100, Bewerbungsfotos & Produktfotos. Fotostudio Wien, 12+ Jahre Erfahrung. Jetzt Angebot!",
  keywords: [
    "Fotograf Wien",
    "Eventfotograf Wien",
    "Fotoshooting Wien",
    "Fotostudio Wien",
    "Bewerbungsfotos Wien",
    "Business Fotografie Wien",
    "Porträtfotografie Wien",
    "Produktfotografie Wien",
    "LinkedIn Fotograf Wien",
    "Mitarbeiterfotos Wien",
    "Corporate Fotografie Wien",
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
    title: "Fotograf Wien - Alexandru Bogdan | Business & Event Fotografie",
    description: "Eventfotograf & Fotograf Wien - Eventfotografie ab €400, Business Portraits ab €100, Bewerbungsfotos & Produktfotos. Fotostudio Wien, 12+ Jahre Erfahrung. Jetzt Angebot!",
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
    title: "Fotograf Wien - Alexandru Bogdan | Business & Event Fotografie",
    description: "Eventfotograf & Fotograf Wien - Eventfotografie ab €400, Business Portraits ab €100, Bewerbungsfotos & Produktfotos. Fotostudio Wien, 12+ Jahre Erfahrung.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: "https://www.fotoinwien.at",
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
          { "@type": "Offer", "price": "400", "priceCurrency": "EUR", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "400", "priceCurrency": "EUR", "minPrice": "400" }, "itemOffered": { "@type": "Service", "name": "Eventfotografie", "description": "Professionelle Eventfotografie in Wien für Firmenevents, Konferenzen und Galas." } },
          { "@type": "Offer", "price": "100", "priceCurrency": "EUR", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "100", "priceCurrency": "EUR", "minPrice": "100" }, "itemOffered": { "@type": "Service", "name": "Businessfotografie", "description": "Business Portraits, Bewerbungsfotos und Mitarbeiterfotos in Wien. Headshots für LinkedIn und Xing." } },
          { "@type": "Offer", "price": "150", "priceCurrency": "EUR", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "150", "priceCurrency": "EUR", "minPrice": "150" }, "itemOffered": { "@type": "Service", "name": "Portraitfotografie", "description": "Portraitfotografie im Studio oder Outdoor in Wien. Authentische Porträtfotos für jeden Anlass." } },
          { "@type": "Offer", "price": "25", "priceCurrency": "EUR", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "25", "priceCurrency": "EUR", "minPrice": "25" }, "itemOffered": { "@type": "Service", "name": "Produktfotografie", "description": "Produktfotografie in Wien für E-Commerce, Amazon und Kataloge." } },
          { "@type": "Offer", "price": "350", "priceCurrency": "EUR", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "350", "priceCurrency": "EUR", "minPrice": "350" }, "itemOffered": { "@type": "Service", "name": "Food Fotografie", "description": "Food Fotografie in Wien für Restaurants, Hotels und Social Media." } },
          { "@type": "Offer", "price": "200", "priceCurrency": "EUR", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "200", "priceCurrency": "EUR", "minPrice": "200" }, "itemOffered": { "@type": "Service", "name": "Familienfotografie", "description": "Familienfotografie und Babyfotos in Wien. Im Studio oder Outdoor." } }
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
        { "@type": "Question", "name": "Wo findet das Shooting statt?", "acceptedAnswer": { "@type": "Answer", "text": "Je nach Wunsch entweder in meinem Studio in Wien, bei Ihnen vor Ort (Büro, Event-Location) oder an einem Outdoor-Standort Ihrer Wahl in Wien und Umgebung." } },
        { "@type": "Question", "name": "Was muss ich mitbringen?", "acceptedAnswer": { "@type": "Answer", "text": "Für Business-Portraits empfehle ich 2-3 Outfit-Optionen. Für Produktfotos sollten die Produkte sauber und unbeschädigt sein. Bei Events organisiere ich alles vor Ort." } },
        { "@type": "Question", "name": "Wie viele Bilder bekomme ich?", "acceptedAnswer": { "@type": "Answer", "text": "Das hängt vom Paket ab. Bei Portraits erhalten Sie typischerweise 10-30 bearbeitete Bilder, bei Events 100-300 Bilder, bei Produkten alle vereinbarten Aufnahmen." } },
        { "@type": "Question", "name": "Kann ich die Location selbst wählen?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, absolut! Ich bin flexibel und komme gerne zu Ihrer Wunsch-Location in Wien und Umgebung. Fahrtkosten innerhalb Wiens sind inklusive." } },
        { "@type": "Question", "name": "Bieten Sie auch Bewerbungsfotos und LinkedIn-Headshots an?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, Bewerbungsfotos und professionelle LinkedIn-Headshots gehören zu meinen beliebtesten Dienstleistungen. Ab €100 erhalten Sie professionelle Bewerbungsbilder im Fotostudio in Wien." } },
        { "@type": "Question", "name": "Machen Sie auch Mitarbeiterfotos für Unternehmen?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, ich biete Corporate Fotografie und Mitarbeiterfotos für Unternehmen in Wien an. Ob im Büro, auf Events oder im Studio - flexible Pakete ab €20 pro Person." } },
        { "@type": "Question", "name": "Wie läuft die Buchung ab?", "acceptedAnswer": { "@type": "Answer", "text": "Ganz einfach: Schicken Sie mir eine Anfrage per E-Mail, Telefon oder WhatsApp. Ich melde mich innerhalb von 24 Stunden mit einem unverbindlichen Angebot. Nach Ihrer Zusage vereinbaren wir gemeinsam den Termin und alle Details." } }
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
