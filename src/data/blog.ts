export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featuredImage: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "business-fotografie-wien-guide",
    title: "Business Fotografie Wien: Der ultimative Guide 2026",
    excerpt:
      "Alles, was Sie uber professionelle Business Fotografie in Wien wissen mussen - von der Planung bis zur perfekten Umsetzung.",
    content: `
# Business Fotografie Wien: Der ultimative Guide 2026

Professionelle Business Fotografie ist mehr als nur ein Foto vor weissem Hintergrund. In diesem umfassenden Guide erfahren Sie alles, was Sie uber erfolgreiche Corporate-Fotografie in Wien wissen mussen.

## Warum ist Business Fotografie wichtig?

In der heutigen digitalen Welt ist Ihr professionelles Image entscheidend. Ob auf LinkedIn, der Unternehmenswebsite oder in Pressemitteilungen - hochwertige Business Portraits vermitteln Kompetenz und Vertrauenswurdigkeit.

## Was kostet Business Fotografie in Wien?

Die Preise fur professionelle Business Fotografie in Wien variieren je nach Umfang:
- Einzelportrait: ab 290 EUR
- Team-Shooting (bis 5 Personen): ab 490 EUR
- Grosse Teams: ab 890 EUR

## Tipps fur Ihr Business Portrait

1. **Kleidung wahlen**: Tragen Sie Kleidung, in der Sie sich wohl fuhlen und die Ihre Branche widerspiegelt.
2. **Ausreichend schlafen**: Ein ausgeruhtes Aussehen macht einen grossen Unterschied.
3. **Styling beachten**: Dezentes Make-up fur Damen, frisch rasiert fur Herren.
4. **Entspannt bleiben**: Ein naturliches Lacheln wirkt authentischer als ein gezwungenes.

## Fazit

Investieren Sie in professionelle Business Fotografie - es ist eine Investition in Ihr berufliches Image.
    `,
    category: "Business Fotografie",
    author: "Alexandru Bogdan",
    date: "2026-01-15",
    readTime: "8 Min.",
    featuredImage: "/images/blog/business-fotografie-guide.jpg",
  },
  {
    slug: "eventfotografie-preise-wien",
    title: "Eventfotografie Preise Wien: Was kostet professionelle Fotografie?",
    excerpt:
      "Ein transparenter Uberblick uber Eventfotografie-Preise in Wien mit Tipps fur die Budgetplanung.",
    content: `
# Eventfotografie Preise Wien: Transparenter Uberblick

Sie planen ein Event und fragen sich, was professionelle Eventfotografie in Wien kostet? Hier finden Sie alle Antworten.

## Preisstruktur fur Eventfotografie

Die Kosten fur Eventfotografie hangen von verschiedenen Faktoren ab:
- Dauer des Events
- Anzahl der Fotografen
- Umfang der Nachbearbeitung
- Liefergeschwindigkeit

## Typische Preise in Wien

- Kurze Events (bis 3 Stunden): ab 490 EUR
- Halbtages-Events (bis 5 Stunden): ab 790 EUR
- Ganztages-Events: ab 1.290 EUR

## Was ist im Preis enthalten?

- Professionelle Fotografie wahrend des gesamten Events
- Bildauswahl und Nachbearbeitung
- Digitale Lieferung in hoher Auflosung
- Nutzungsrechte fur Ihre Zwecke

## Fazit

Qualitat hat ihren Preis - aber eine gute Eventdokumentation ist eine bleibende Erinnerung.
    `,
    category: "Event Fotografie",
    author: "Alexandru Bogdan",
    date: "2026-01-10",
    readTime: "6 Min.",
    featuredImage: "/images/blog/eventfotografie-preise.jpg",
  },
  {
    slug: "produktfotografie-e-commerce-tipps",
    title: "Produktfotografie fur E-Commerce: 10 Profi-Tipps",
    excerpt:
      "Wie Sie mit professionellen Produktfotos Ihre Online-Verkaufe steigern konnen.",
    content: `
# Produktfotografie fur E-Commerce: 10 Profi-Tipps

Gute Produktfotos sind der Schlussel zum Erfolg im Online-Handel. Hier sind 10 Tipps vom Profi.

## 1. Weisser Hintergrund ist Standard

Fur Amazon, eBay und die meisten Online-Shops benotigen Sie Freisteller auf weissem Hintergrund.

## 2. Mehrere Perspektiven zeigen

Zeigen Sie Ihr Produkt von verschiedenen Seiten - mindestens 3-4 Ansichten.

## 3. Details nicht vergessen

Nahaufnahmen von wichtigen Details steigern das Vertrauen der Kaufer.

## 4. Lifestyle-Fotos einsetzen

Zeigen Sie Ihr Produkt im Einsatz - das hilft Kunden, sich den Kauf vorzustellen.

## 5. Konsistenter Stil

Alle Produktfotos sollten einen einheitlichen Stil haben.

## 6. Hohe Auflosung

Ermoglichen Sie Zoom-Funktionen mit hochauflosenden Bildern.

## 7. Schnelle Ladezeiten

Optimieren Sie Ihre Bilder fur schnelle Ladezeiten ohne Qualitatsverlust.

## 8. Mobile First

Die meisten Kaufer shoppen mobil - optimieren Sie fur kleine Bildschirme.

## 9. Farbgenauigkeit

Die Farben mussen der Realitat entsprechen, um Retouren zu vermeiden.

## 10. Professionelle Hilfe holen

Investieren Sie in professionelle Produktfotografie - es zahlt sich aus.
    `,
    category: "Produktfotografie",
    author: "Alexandru Bogdan",
    date: "2026-01-05",
    readTime: "10 Min.",
    featuredImage: "/images/blog/produktfotografie-tipps.jpg",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
