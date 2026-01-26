"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui";

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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section - Gradient mesh with floating elements */}
        <section className="section relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50" />

          {/* Floating price tags */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute top-32 left-[10%] glass-dark-strong px-4 py-2 rounded-full text-sm rotate-6"
            >
              ab 35 EUR
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="absolute top-48 right-[15%] glass-dark-strong px-4 py-2 rounded-full text-sm -rotate-3"
            >
              Fair & Transparent
            </motion.div>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full border border-gray-200/30" />
          <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full border border-gray-200/20" />

          <div className="container px-4 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 mx-auto rounded-2xl glass-dark-strong flex items-center justify-center mb-8"
              >
                <i className="fa-solid fa-tag text-3xl text-gray-700" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight">
                Transparente Preise
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Faire und transparente Preise fur professionelle Fotografie. Keine
                versteckten Kosten, klare Leistungen.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Categories - Alternating backgrounds */}
        {pricingCategories.map((category, catIndex) => (
          <section
            key={category.category}
            className={`section relative overflow-hidden ${
              catIndex % 2 === 0 ? "section-dark" : "bg-gray-50"
            }`}
          >
            {/* Background patterns - different for each */}
            {catIndex === 0 && (
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
                  backgroundSize: '30px 30px',
                }}
              />
            )}
            {catIndex === 1 && (
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(45deg, #1b1b1b 25%, transparent 25%), linear-gradient(-45deg, #1b1b1b 25%, transparent 25%)`,
                  backgroundSize: '60px 60px',
                  backgroundPosition: '0 0, 30px 0',
                }}
              />
            )}
            {catIndex === 2 && (
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, white, white 1px, transparent 1px, transparent 50px)`,
                }}
              />
            )}
            {catIndex === 3 && (
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, #1b1b1b 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
              />
            )}

            <div className="container px-4 md:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 ${
                  catIndex % 2 === 0 ? "glass-card-on-dark" : "glass-dark-strong"
                }`}>
                  <i className={`${category.icon} text-2xl ${catIndex % 2 === 0 ? "text-white" : "text-gray-700"}`} />
                </div>
                <h2 className={`text-3xl md:text-4xl font-semibold tracking-tight ${
                  catIndex % 2 === 0 ? "text-white" : ""
                }`}>
                  {category.category}
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {category.packages.map((pkg, index) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative ${
                      catIndex % 2 === 0 ? "glass-card-on-dark" : "glass-card-3d"
                    } p-8`}
                  >
                    {pkg.popular && (
                      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-medium rounded-full ${
                        catIndex % 2 === 0 ? "bg-white text-black" : "bg-black text-white"
                      }`}>
                        Beliebt
                      </div>
                    )}
                    <div className="text-center mb-6">
                      <h3 className={`text-xl font-semibold mb-2 ${catIndex % 2 === 0 ? "text-white" : ""}`}>
                        {pkg.name}
                      </h3>
                      <p className={`text-sm mb-4 ${catIndex % 2 === 0 ? "text-gray-400" : "text-text-secondary"}`}>
                        {pkg.description}
                      </p>
                      <p className={`text-4xl font-semibold ${catIndex % 2 === 0 ? "text-white" : ""}`}>
                        {pkg.price}
                        <span className={`text-lg ${catIndex % 2 === 0 ? "text-gray-400" : "text-text-secondary"}`}>
                          {pkg.price.includes("/") ? "" : " EUR"}
                        </span>
                      </p>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {pkg.includes.map((item, i) => (
                        <li key={i} className={`flex items-start gap-3 text-sm ${catIndex % 2 === 0 ? "text-gray-300" : ""}`}>
                          <i className={`fa-solid fa-check mt-0.5 ${catIndex % 2 === 0 ? "text-green-400" : "text-green-600"}`} />
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

        {/* Add-Ons Section - Diamond pattern */}
        <section className="section relative overflow-hidden">
          {/* Diamond pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20L20 0z' fill='none' stroke='%231b1b1b' stroke-width='1'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="container px-4 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                Zusatzleistungen
              </h2>
              <p className="text-text-secondary">
                Erweitern Sie Ihr Paket nach Bedarf.
              </p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              <div className="glass-card-3d p-6 md:p-8">
                {addOns.map((addon, index) => (
                  <motion.div
                    key={addon.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-gray-700">{addon.name}</span>
                    <span className="font-semibold glass-dark-strong px-3 py-1 rounded-full text-sm">
                      {addon.price}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Dark with wave */}
        <section className="section-dark py-24 relative overflow-hidden">
          {/* Wave at top */}
          <svg className="absolute top-0 left-0 w-full h-16 opacity-10" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path fill="white" d="M0,50 C360,100 720,0 1080,50 C1260,75 1380,25 1440,50 L1440,0 L0,0 Z" />
          </svg>

          <div className="container px-4 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight text-white">
                Haufige Fragen
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faq.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="glass-card-on-dark overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-medium pr-4 text-white">{item.question}</span>
                    <i
                      className={`fa-solid fa-chevron-down transition-transform text-white/60 ${
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
                        <p className="px-6 pb-6 text-gray-400">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Gradient with circles */}
        <section className="section relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
          {/* Decorative circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[300px] h-[300px] rounded-full border border-gray-200/20" />
            <div className="absolute inset-0 w-[500px] h-[500px] -ml-[100px] -mt-[100px] rounded-full border border-gray-200/15" />
          </div>

          <div className="container px-4 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="glass-card-3d p-10 md:p-14 text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                  Individuelles Angebot gefallig?
                </h2>
                <p className="text-text-secondary mb-8 text-lg max-w-xl mx-auto">
                  Haben Sie spezielle Anforderungen? Kontaktieren Sie mich fur ein
                  massgeschneidertes Angebot.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button href="/kontakt/" icon="fa-solid fa-paper-plane" size="lg">
                    Angebot anfragen
                  </Button>
                  <Button
                    href="https://wa.me/436608459895"
                    variant="secondary"
                    size="lg"
                    icon="fa-brands fa-whatsapp"
                    iconPosition="left"
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
