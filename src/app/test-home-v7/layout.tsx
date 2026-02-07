import { Metadata } from 'next';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Fotograf Wien - Alexandru Bogdan | Business & Event Fotografie',
  description: 'Professioneller Fotograf in Wien. Business Portraits ab €100, Eventfotografie ab €400, Produktfotos ab €25. Über 12 Jahre Erfahrung. Jetzt kostenloses Angebot anfordern!',
  keywords: 'Fotograf Wien, Business Fotograf Wien, Eventfotograf Wien, Produktfotograf Wien, Porträtfotograf Wien',
  openGraph: {
    title: 'Fotograf Wien - Alexandru Bogdan',
    description: 'Professioneller Fotograf in Wien für Business, Event, Portrait und Produktfotografie.',
    type: 'website',
    locale: 'de_AT',
    siteName: 'Foto in Wien',
  },
};

// FAQ Items for Schema
const faqItems = [
  { question: "Was kostet ein Fotoshooting?", answer: "Die Preise variieren je nach Art des Shootings. Business Portraits starten ab €100, Eventfotografie ab €400, Produktfotos ab €25/Produkt. Kontaktieren Sie mich für ein individuelles Angebot." },
  { question: "Wie lange dauert es bis ich die Bilder bekomme?", answer: "Standardlieferung innerhalb von 5-7 Werktagen. Express-Lieferung in 48h ist gegen Aufpreis möglich." },
  { question: "Kann ich die Bilder kommerziell nutzen?", answer: "Ja, alle Business- und Produktfotos beinhalten eine kommerzielle Nutzungslizenz. Die genauen Nutzungsrechte werden im Vertrag festgehalten." },
  { question: "Was passiert wenn mir die Bilder nicht gefallen?", answer: "Ich biete eine Zufriedenheitsgarantie. Sollten Sie nicht zufrieden sein, gibt es eine kostenlose Nachbearbeitung oder Neuaufnahme der Bilder." },
  { question: "Wo findet das Shooting statt?", answer: "Je nach Wunsch entweder in meinem Studio in Wien, bei Ihnen vor Ort (Büro, Event-Location) oder an einem Outdoor-Standort Ihrer Wahl in Wien und Umgebung." },
  { question: "Was muss ich mitbringen?", answer: "Für Business-Portraits empfehle ich 2-3 Outfit-Optionen. Für Produktfotos sollten die Produkte sauber und unbeschädigt sein. Bei Events organisiere ich alles vor Ort." },
  { question: "Wie viele Bilder bekomme ich?", answer: "Das hängt vom Paket ab. Bei Portraits erhalten Sie typischerweise 15-30 bearbeitete Bilder, bei Events 100-300 Bilder, bei Produkten alle vereinbarten Aufnahmen." },
  { question: "Kann ich die Location selbst wählen?", answer: "Ja, absolut! Ich bin flexibel und komme gerne zu Ihrer Wunsch-Location in Wien und Umgebung. Fahrtkosten innerhalb Wiens sind inklusive." },
];

// Schema Markup - Server-side rendered
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.fotoinwien.at/#business",
  "name": "Foto in Wien - Alexandru Bogdan",
  "image": "https://www.fotoinwien.at/images/hero/fotograf-wien-hero.jpg",
  "description": "Professioneller Fotograf in Wien für Business, Event, Portrait und Produktfotografie. Über 12 Jahre Erfahrung.",
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
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
};

const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Foto in Wien",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "47",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export default function TestHomeV7Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD Schema Markup - Server-side rendered */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />
      {children}
    </>
  );
}
