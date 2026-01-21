"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui";
import { useSmoothScroll } from "@/lib/useSmoothScroll";

const pricingCategories = [
  {
    category: "Business Fotografie",
    icon: "fa-solid fa-briefcase",
    packages: [
      {
        name: "Basic",
        price: "290",
        description: "Ideal fur Einzelpersonen",
        includes: [
          "1 Person",
          "30 Minuten Shooting",
          "5 bearbeitete Bilder",
          "Online-Galerie zur Auswahl",
          "Digitale Lieferung",
        ],
      },
      {
        name: "Standard",
        price: "490",
        description: "Fur kleine Teams",
        popular: true,
        includes: [
          "Bis zu 5 Personen",
          "2 Stunden Shooting",
          "15 bearbeitete Bilder",
          "Einheitlicher Bildstil",
          "Web + Print Formate",
        ],
      },
      {
        name: "Premium",
        price: "890",
        description: "Fur grossere Teams",
        includes: [
          "Bis zu 15 Personen",
          "Halber Tag (4 Std.)",
          "40 bearbeitete Bilder",
          "Gruppenfotos inklusive",
          "Express-Lieferung",
        ],
      },
    ],
  },
  {
    category: "Event Fotografie",
    icon: "fa-solid fa-calendar-days",
    packages: [
      {
        name: "Kompakt",
        price: "490",
        description: "Kurze Events",
        includes: [
          "Bis zu 3 Stunden",
          "50+ bearbeitete Bilder",
          "Online-Galerie",
          "Digitale Lieferung",
          "Nachbearbeitung inklusive",
        ],
      },
      {
        name: "Standard",
        price: "790",
        description: "Halbtages-Events",
        popular: true,
        includes: [
          "Bis zu 5 Stunden",
          "100+ bearbeitete Bilder",
          "Gruppenfotos",
          "VIP-Portraits",
          "Social Media Auswahl",
        ],
      },
      {
        name: "Ganztag",
        price: "1290",
        description: "Volle Event-Abdeckung",
        includes: [
          "Bis zu 10 Stunden",
          "200+ bearbeitete Bilder",
          "Zweiter Fotograf moglich",
          "Same-Day Preview",
          "Alle Nutzungsrechte",
        ],
      },
    ],
  },
  {
    category: "Portrait Fotografie",
    icon: "fa-solid fa-user",
    packages: [
      {
        name: "Mini",
        price: "190",
        description: "Schnelle Session",
        includes: [
          "20 Minuten Shooting",
          "1 Outfit",
          "3 bearbeitete Bilder",
          "Studio oder Outdoor",
          "Digitale Lieferung",
        ],
      },
      {
        name: "Classic",
        price: "350",
        description: "Vollstandige Session",
        popular: true,
        includes: [
          "1 Stunde Shooting",
          "2-3 Outfits",
          "10 bearbeitete Bilder",
          "Styling-Beratung",
          "Online-Galerie",
        ],
      },
      {
        name: "Deluxe",
        price: "590",
        description: "Premium Erlebnis",
        includes: [
          "2 Stunden Shooting",
          "Unbegrenzte Outfits",
          "20 bearbeitete Bilder",
          "Make-up Artist Option",
          "Print-Paket inklusive",
        ],
      },
    ],
  },
  {
    category: "Produkt Fotografie",
    icon: "fa-solid fa-box",
    packages: [
      {
        name: "Pro Produkt",
        price: "35",
        description: "Ab 10 Produkten",
        includes: [
          "Weisser Hintergrund",
          "2 Perspektiven",
          "Professionelle Retusche",
          "Web-optimiert",
          "Freisteller inklusive",
        ],
      },
      {
        name: "Lifestyle",
        price: "75",
        description: "Pro Produkt",
        popular: true,
        includes: [
          "Kreatives Setup",
          "3-4 Perspektiven",
          "Props inklusive",
          "Stimmungsbilder",
          "Social Media Format",
        ],
      },
      {
        name: "360 Grad",
        price: "120",
        description: "Pro Produkt",
        includes: [
          "36 Einzelaufnahmen",
          "Interaktive Ansicht",
          "Alle Winkel",
          "E-Commerce optimiert",
          "Webplayer inklusive",
        ],
      },
    ],
  },
];

const addOns = [
  { name: "Express-Lieferung (48h)", price: "+50%" },
  { name: "Zusatzliche Bildbearbeitung", price: "15/Bild" },
  { name: "Zweiter Fotograf", price: "350/Tag" },
  { name: "Drohnenaufnahmen", price: "ab 290" },
  { name: "Social Media Paket (Stories/Reels)", price: "ab 190" },
];

const faq = [
  {
    question: "Was ist in den Preisen enthalten?",
    answer:
      "Alle Preise verstehen sich inklusive Anfahrt innerhalb Wiens, professioneller Bildbearbeitung und digitaler Lieferung in hochster Auflosung.",
  },
  {
    question: "Wie lauft die Bezahlung ab?",
    answer:
      "Bei Buchung wird eine Anzahlung von 30% fallig. Der Restbetrag ist vor Lieferung der Bilder zu begleichen.",
  },
  {
    question: "Kann ich auch individuelle Pakete buchen?",
    answer:
      "Selbstverstandlich! Kontaktieren Sie mich fur ein massgeschneidertes Angebot, das genau Ihren Anforderungen entspricht.",
  },
  {
    question: "Wie lange im Voraus sollte ich buchen?",
    answer:
      "Fur Events empfehle ich 2-4 Wochen Vorlauf, fur Portraits ist oft auch kurzfristig etwas moglich.",
  },
  {
    question: "Erhalte ich alle Bilder oder nur eine Auswahl?",
    answer:
      "Sie erhalten die angegebene Anzahl professionell bearbeiteter Bilder. Zusatzliche Bilder konnen gegen Aufpreis hinzugefugt werden.",
  },
  {
    question: "Wer hat die Nutzungsrechte an den Bildern?",
    answer:
      "Sie erhalten umfassende Nutzungsrechte fur alle gewahlten Bilder fur Ihre personlichen oder geschaftlichen Zwecke.",
  },
];

export default function PreisePage() {
  useSmoothScroll();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section">
          <div className="container px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-h1 font-semibold mb-4">
                Transparente Preise
              </h1>
              <p className="text-xl text-text-secondary">
                Faire und transparente Preise fur professionelle Fotografie. Keine
                versteckten Kosten, klare Leistungen.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Categories */}
        {pricingCategories.map((category, catIndex) => (
          <section
            key={category.category}
            className={`section ${catIndex % 2 === 1 ? "bg-gray-50" : ""}`}
          >
            <div className="container px-4 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <i className={`${category.icon} text-3xl mb-4`} />
                <h2 className="text-h2 font-semibold">{category.category}</h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {category.packages.map((pkg, index) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative p-8 border ${
                      pkg.popular ? "border-black" : "border-border"
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-black text-white text-xs font-medium">
                        Beliebt
                      </div>
                    )}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                      <p className="text-sm text-text-secondary mb-4">
                        {pkg.description}
                      </p>
                      <p className="text-4xl font-semibold">
                        {pkg.price}
                        <span className="text-lg text-text-secondary">
                          {pkg.price.includes("/") ? "" : " EUR"}
                        </span>
                      </p>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {pkg.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <i className="fa-solid fa-check text-green-600 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Button
                      href="/kontakt/"
                      fullWidth
                      variant={pkg.popular ? "primary" : "secondary"}
                    >
                      Anfragen
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Add-Ons Section */}
        <section className="section">
          <div className="container px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-h2 font-semibold mb-4">Zusatzleistungen</h2>
              <p className="text-text-secondary">
                Erweitern Sie Ihr Paket nach Bedarf.
              </p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              {addOns.map((addon, index) => (
                <motion.div
                  key={addon.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-center justify-between py-4 border-b border-border last:border-0"
                >
                  <span>{addon.name}</span>
                  <span className="font-semibold">{addon.price}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section bg-gray-50">
          <div className="container px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-h2 font-semibold mb-4">Haufige Fragen</h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faq.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="border border-border bg-white"
                >
                  <button
                    onClick={() =>
                      setOpenFaq(openFaq === index ? null : index)
                    }
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-medium pr-4">{item.question}</span>
                    <i
                      className={`fa-solid fa-chevron-down transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-text-secondary">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section">
          <div className="container px-4 md:px-8">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-h2 font-semibold">
                Individuelles Angebot gefallig?
              </h2>
              <p className="text-text-secondary">
                Haben Sie spezielle Anforderungen? Kontaktieren Sie mich fur ein
                massgeschneidertes Angebot.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/kontakt/" icon="fa-solid fa-paper-plane">
                  Angebot anfragen
                </Button>
                <Button
                  href="https://wa.me/436608459895"
                  variant="secondary"
                  icon="fa-brands fa-whatsapp"
                  iconPosition="left"
                >
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
