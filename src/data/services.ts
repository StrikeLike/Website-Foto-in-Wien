export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
  heroDescription: string;
  benefits: string[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  startingPrice: string;
}

export const services: Service[] = [
  {
    slug: "businessfotografie",
    title: "Business Fotografie Wien",
    shortTitle: "Business Fotografie",
    icon: "fa-solid fa-briefcase",
    description:
      "Professionelle Business Fotografie fur Unternehmen in Wien. Mitarbeiterportraits, Teamfotos und Corporate-Fotografie auf hochstem Niveau.",
    heroDescription:
      "Professionelle Mitarbeiterportraits und Corporate-Fotografie, die Ihr Unternehmen ins beste Licht ruckt.",
    benefits: [
      "Professionelle Mitarbeiterportraits fur Website und LinkedIn",
      "Einheitlicher Bildstil fur alle Teammitglieder",
      "Flexible Shootings vor Ort oder im Studio",
      "Schnelle Lieferung der bearbeiteten Bilder",
      "Nutzungsrechte fur alle Unternehmenszwecke",
      "Erfahrung mit fuhrenden Wiener Unternehmen",
    ],
    process: [
      {
        step: 1,
        title: "Beratungsgesprach",
        description:
          "Wir besprechen Ihre Anforderungen, den gewunschten Bildstil und die logistischen Details.",
      },
      {
        step: 2,
        title: "Planung & Vorbereitung",
        description:
          "Ich erstelle ein detailliertes Konzept inkl. Location-Scouting und Zeitplan.",
      },
      {
        step: 3,
        title: "Fotoshooting",
        description:
          "Professionelle Durchfuhrung des Shootings mit Fokus auf Naturlichkeit und Qualitat.",
      },
      {
        step: 4,
        title: "Bildauswahl & Bearbeitung",
        description:
          "Sie wahlen Ihre Favoriten und ich optimiere diese professionell.",
      },
    ],
    faq: [
      {
        question: "Wie lange dauert ein Business Portrait Shooting?",
        answer:
          "Ein einzelnes Portrait dauert ca. 15-20 Minuten. Fur Teams plane ich entsprechend mehr Zeit ein.",
      },
      {
        question: "Kommen Sie auch in unser Buro?",
        answer:
          "Ja, ich biete mobile Shootings in Ihrem Buro oder an einer Location Ihrer Wahl an.",
      },
      {
        question: "Wie schnell erhalten wir die Bilder?",
        answer:
          "Die fertig bearbeiteten Bilder erhalten Sie in der Regel innerhalb von 5-7 Werktagen.",
      },
      {
        question: "In welcher Auflosung werden die Bilder geliefert?",
        answer:
          "Sie erhalten die Bilder in hochster Auflosung, optimiert fur Print und Web.",
      },
      {
        question: "Konnen wir die Bilder fur Social Media nutzen?",
        answer:
          "Ja, alle Bilder durfen fur samtliche Unternehmenszwecke verwendet werden.",
      },
    ],
    startingPrice: "ab 290",
  },
  {
    slug: "eventfotografie",
    title: "Event Fotografie Wien",
    shortTitle: "Event Fotografie",
    icon: "fa-solid fa-calendar-days",
    description:
      "Professionelle Eventfotografie in Wien. Dokumentation von Firmenevents, Konferenzen, Galas und besonderen Anlassen.",
    heroDescription:
      "Dokumentation Ihrer Firmenevents, Konferenzen und besonderen Anlasse mit einem Auge fur die entscheidenden Momente.",
    benefits: [
      "Unauffällige Dokumentation wichtiger Momente",
      "Erfahrung mit Corporate Events und Galas",
      "Schnelle Bereitstellung ausgewählter Bilder",
      "Professionelles Equipment fur jede Lichtsituation",
      "Live-Slideshow moglich",
      "Umfangreiche Nachbearbeitung inklusive",
    ],
    process: [
      {
        step: 1,
        title: "Briefing",
        description:
          "Wir besprechen das Event, wichtige Programmpunkte und Ihre Erwartungen.",
      },
      {
        step: 2,
        title: "Location-Check",
        description:
          "Nach Moglichkeit besichtige ich die Location vorab fur optimale Planung.",
      },
      {
        step: 3,
        title: "Event-Dokumentation",
        description:
          "Professionelle Fotografie wahrend des gesamten Events.",
      },
      {
        step: 4,
        title: "Auswahl & Lieferung",
        description:
          "Kuratierte Auswahl der besten Bilder, professionell bearbeitet.",
      },
    ],
    faq: [
      {
        question: "Wie viele Bilder erhalten wir von einem Event?",
        answer:
          "Je nach Eventlange erhalten Sie zwischen 50-300+ bearbeitete Bilder.",
      },
      {
        question: "Konnen wir einige Bilder noch am selben Abend erhalten?",
        answer:
          "Ja, auf Wunsch liefere ich eine Auswahl an Bildern noch wahrend des Events.",
      },
      {
        question: "Fotografieren Sie auch Gruppenfotos?",
        answer:
          "Selbstverstandlich, Gruppenfotos und VIP-Portraits gehoren zum Standard.",
      },
      {
        question: "Was passiert bei schlechtem Wetter bei Outdoor-Events?",
        answer:
          "Ich bin auf alle Wetterbedingungen vorbereitet und finde kreative Losungen.",
      },
      {
        question: "Brauchen Sie einen Assistenten?",
        answer:
          "Bei grosseren Events empfehle ich einen zweiten Fotografen fur optimale Abdeckung.",
      },
    ],
    startingPrice: "ab 490",
  },
  {
    slug: "portraitfotografie",
    title: "Portrait Fotografie Wien",
    shortTitle: "Portrait Fotografie",
    icon: "fa-solid fa-user",
    description:
      "Ausdrucksstarke Portraitfotografie in Wien. Personliche Portraits, Bewerbungsfotos und kreative Shootings.",
    heroDescription:
      "Ausdrucksstarke Portraits, die Ihre Personlichkeit authentisch einfangen und einen bleibenden Eindruck hinterlassen.",
    benefits: [
      "Personliche Beratung zum optimalen Bildstil",
      "Naturliche und entspannte Atmosphare",
      "Professionelles Styling-Beratung inklusive",
      "Mehrere Outfit-Wechsel moglich",
      "Indoor und Outdoor Optionen",
      "Hochwertige Retusche inklusive",
    ],
    process: [
      {
        step: 1,
        title: "Vorbesprechung",
        description:
          "Wir klaren Ihre Vorstellungen, den Verwendungszweck und den gewunschten Stil.",
      },
      {
        step: 2,
        title: "Styling & Location",
        description:
          "Beratung zu Outfit und Auswahl der perfekten Location.",
      },
      {
        step: 3,
        title: "Fotoshooting",
        description:
          "Entspanntes Shooting mit professioneller Anleitung.",
      },
      {
        step: 4,
        title: "Bildauswahl & Retusche",
        description:
          "Sie wahlen Ihre Favoriten, die ich professionell bearbeite.",
      },
    ],
    faq: [
      {
        question: "Wie bereite ich mich auf ein Portrait-Shooting vor?",
        answer:
          "Ich sende Ihnen vorab einen Leitfaden mit Tipps zu Outfit, Styling und Vorbereitung.",
      },
      {
        question: "Kann ich mehrere Outfits mitbringen?",
        answer:
          "Ja, je nach gewahltem Paket sind 2-4 Outfit-Wechsel moglich.",
      },
      {
        question: "Bieten Sie auch Bewerbungsfotos an?",
        answer:
          "Ja, professionelle Bewerbungsfotos sind eines meiner Spezialgebiete.",
      },
      {
        question: "Wie stark werden die Bilder retuschiert?",
        answer:
          "Ich optimiere Licht und Farben und retuschiere dezent - Sie sollen Sie selbst bleiben.",
      },
      {
        question: "Kann ich jemanden zum Shooting mitbringen?",
        answer:
          "Naturlich, eine Begleitperson ist herzlich willkommen.",
      },
    ],
    startingPrice: "ab 190",
  },
  {
    slug: "produktfotografie",
    title: "Produkt Fotografie Wien",
    shortTitle: "Produkt Fotografie",
    icon: "fa-solid fa-box",
    description:
      "Professionelle Produktfotografie in Wien. Hochwertige Packshots, Lifestyle-Aufnahmen und E-Commerce-Fotografie.",
    heroDescription:
      "Hochwertige Produktfotos, die Ihre Produkte optimal prasentieren und zum Kauf anregen.",
    benefits: [
      "Professionelle Freisteller fur Online-Shops",
      "Kreative Lifestyle-Aufnahmen",
      "360-Grad-Produktfotografie moglich",
      "Optimiert fur Amazon, Shopify und Co.",
      "Konsistenter Bildstil fur Ihr gesamtes Sortiment",
      "Schnelle Lieferung auch bei grossen Mengen",
    ],
    process: [
      {
        step: 1,
        title: "Produktubergabe",
        description:
          "Sie ubermitteln mir die Produkte und spezifischen Anforderungen.",
      },
      {
        step: 2,
        title: "Konzept & Setup",
        description:
          "Ich entwickle das optimale Setup fur Ihre Produkte.",
      },
      {
        step: 3,
        title: "Fotografie",
        description:
          "Professionelle Aufnahmen mit Liebe zum Detail.",
      },
      {
        step: 4,
        title: "Bildbearbeitung",
        description:
          "Freistellen, Farbkorrektur und Optimierung fur Web/Print.",
      },
    ],
    faq: [
      {
        question: "In welchen Formaten liefern Sie die Bilder?",
        answer:
          "Sie erhalten die Bilder in allen benotigten Formaten (JPG, PNG, TIFF) und Grossen.",
      },
      {
        question: "Wie viele Produkte konnen Sie pro Tag fotografieren?",
        answer:
          "Je nach Komplexitat fotografiere ich 15-50 Produkte pro Tag.",
      },
      {
        question: "Bieten Sie auch Lifestyle-Produktfotos an?",
        answer:
          "Ja, sowohl Studioaufnahmen als auch Lifestyle-Fotos in passenden Settings.",
      },
      {
        question: "Konnen Sie unsere Produkte abholen?",
        answer:
          "Ja, in Wien und Umgebung biete ich einen Abhol- und Bringservice an.",
      },
      {
        question: "Sind die Bilder Amazon-konform?",
        answer:
          "Ja, ich kenne alle Anforderungen von Amazon, eBay und anderen Plattformen.",
      },
    ],
    startingPrice: "ab 35 pro Produkt",
  },
  {
    slug: "foodfotografie",
    title: "Food Fotografie Wien",
    shortTitle: "Food Fotografie",
    icon: "fa-solid fa-utensils",
    description:
      "Appetitliche Food Fotografie in Wien. Professionelle Aufnahmen fur Restaurants, Hotels und Lebensmittelmarken.",
    heroDescription:
      "Appetitliche Aufnahmen, die Ihre Gerichte unwiderstehlich in Szene setzen und Ihre Gaste begeistern.",
    benefits: [
      "Erfahrung mit Top-Restaurants und Hotels",
      "Food-Styling Know-how inklusive",
      "Naturliches und kunstliches Licht Expertise",
      "Aufnahmen vor Ort oder im Studio",
      "Schnelle Turnaround-Zeiten",
      "Social-Media-optimierte Formate",
    ],
    process: [
      {
        step: 1,
        title: "Menuplanung",
        description:
          "Wir besprechen welche Gerichte fotografiert werden und definieren den Stil.",
      },
      {
        step: 2,
        title: "Styling-Konzept",
        description:
          "Ich entwickle das visuelle Konzept inkl. Props und Hintergrunde.",
      },
      {
        step: 3,
        title: "Fotoshooting",
        description:
          "Professionelle Aufnahmen mit Fokus auf appetitliche Prasentation.",
      },
      {
        step: 4,
        title: "Bildbearbeitung",
        description:
          "Farboptimierung und Retusche fur maximale Wirkung.",
      },
    ],
    faq: [
      {
        question: "Bringen Sie Props und Hintergrunde mit?",
        answer:
          "Ja, ich verfuge uber eine umfangreiche Sammlung an Food-Props und Hintergrunden.",
      },
      {
        question: "Wie lange bleiben die Gerichte frisch?",
        answer:
          "Mit professionellen Techniken sorge ich dafur, dass Gerichte lange fotogen bleiben.",
      },
      {
        question: "Fotografieren Sie auch in unserer Kuche?",
        answer:
          "Ja, ich komme gerne zu Ihnen und fotografiere direkt vor Ort.",
      },
      {
        question: "Konnen wir die Bilder fur die Speisekarte nutzen?",
        answer:
          "Ja, Sie erhalten alle Nutzungsrechte fur Print und Digital.",
      },
      {
        question: "Bieten Sie auch Video an?",
        answer:
          "Auf Anfrage erstelle ich auch kurze Food-Videos fur Social Media.",
      },
    ],
    startingPrice: "ab 390",
  },
  {
    slug: "familienfotografie",
    title: "Familien Fotografie Wien",
    shortTitle: "Familien Fotografie",
    icon: "fa-solid fa-people-roof",
    description:
      "Naturliche Familienfotografie in Wien. Authentische Familienportraits und besondere Momente festgehalten.",
    heroDescription:
      "Naturliche Familienportraits, die authentische Momente und echte Emotionen fur die Ewigkeit festhalten.",
    benefits: [
      "Entspannte und naturliche Atmosphare",
      "Outdoor-Shootings in Wiener Parks",
      "Auch Haustiere sind willkommen",
      "Flexible Terminvereinbarung",
      "Geduld und Erfahrung mit Kindern",
      "Verschiedene Locations zur Auswahl",
    ],
    process: [
      {
        step: 1,
        title: "Kennenlernen",
        description:
          "Wir besprechen Ihre Wunsche und finden den perfekten Termin.",
      },
      {
        step: 2,
        title: "Location-Auswahl",
        description:
          "Gemeinsam wahlen wir die ideale Location fur Ihr Familienshooting.",
      },
      {
        step: 3,
        title: "Fotoshooting",
        description:
          "Entspanntes Shooting mit viel Spass fur die ganze Familie.",
      },
      {
        step: 4,
        title: "Bildergalerie",
        description:
          "Sie erhalten eine Online-Galerie zur Auswahl Ihrer Lieblingsbilder.",
      },
    ],
    faq: [
      {
        question: "Ab welchem Alter fotografieren Sie Kinder?",
        answer:
          "Ich fotografiere Familien mit Kindern jeden Alters, auch Babys ab 3 Monaten.",
      },
      {
        question: "Was, wenn mein Kind nicht mitmachen will?",
        answer:
          "Kein Problem - ich arbeite spielerisch und geduldig. Die besten Bilder entstehen oft spontan.",
      },
      {
        question: "Konnen Grosseltern dabei sein?",
        answer:
          "Selbstverstandlich! Mehrgenerationen-Fotos sind wunderschone Erinnerungen.",
      },
      {
        question: "Wann ist die beste Zeit fur Outdoor-Shootings?",
        answer:
          "Die goldene Stunde (1-2 Std. vor Sonnenuntergang) bietet das schonste Licht.",
      },
      {
        question: "Bieten Sie auch Mini-Sessions an?",
        answer:
          "Ja, kurzere Sessions zu reduzierten Preisen sind auf Anfrage moglich.",
      },
    ],
    startingPrice: "ab 290",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
