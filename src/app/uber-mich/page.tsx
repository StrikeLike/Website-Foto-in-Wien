"use client";

import { motion } from "framer-motion";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui";

const timeline = [
  { year: "2004", event: "Beginn der professionellen Fotografie" },
  { year: "2008", event: "Spezialisierung auf Business & Event" },
  { year: "2012", event: "Erste Grosskunden in Wien" },
  { year: "2016", event: "Zusammenarbeit mit TU Wien" },
  { year: "2020", event: "Erweiterung um Produktfotografie" },
  { year: "2024", event: "20+ Jahre Erfahrung" },
];

const clients = [
  "TU Wien",
  "Autonom Health",
  "Gerstner",
  "V-Suit",
  "Hope for the Future",
];

const testimonials = [
  {
    quote:
      "Alexandru hat unsere Firmenveranstaltung perfekt eingefangen. Die Bilder sind professionell, kreativ und erzahlen eine Geschichte.",
    author: "Maria Schneider",
    position: "Marketing Director, TU Wien",
  },
  {
    quote:
      "Die Produktfotos fur unseren Online-Shop haben unsere Erwartungen ubertroffen. Detailgetreu und mit einem Auge fur das Wesentliche.",
    author: "Thomas Weber",
    position: "CEO, Autonom Health",
  },
  {
    quote:
      "Herr Bogdan versteht es, die Atmosphare eines Events einzufangen. Seine Arbeit bei unserem Fashion Event war erstklassig.",
    author: "Sophie Berger",
    position: "Event Manager, V-Suit",
  },
];

export default function UberMichPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section">
          <div className="container px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/5] bg-gray-200 order-2 lg:order-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <i className="fa-solid fa-user text-8xl text-white/50" />
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6 order-1 lg:order-2"
              >
                <p className="text-sm uppercase tracking-wider text-text-secondary">
                  Uber mich
                </p>
                <h1 className="text-h1 font-semibold">Alexandru Bogdan</h1>
                <p className="text-2xl text-text-secondary font-light">
                  Ihr Fotograf in Wien
                </p>

                <div className="space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    Mit uber 20 Jahren Erfahrung in der professionellen
                    Fotografie habe ich mich auf Business, Event und
                    Produktfotografie spezialisiert. Mein Ziel ist es, die
                    Geschichte hinter jedem Bild zu erzahlen.
                  </p>
                  <p>
                    Als geburtiger Rumane lebe und arbeite ich seit vielen Jahren
                    in Wien. Die Stadt mit ihrer reichen Kultur und Geschichte
                    inspiriert mich taglich in meiner Arbeit.
                  </p>
                  <p>
                    Neben der Fotografie bringe ich uber 20 Jahre Erfahrung im
                    Bereich SEO und Webentwicklung mit - ein Wissen, das mir
                    hilft, Bilder zu schaffen, die nicht nur schon, sondern auch
                    wirkungsvoll sind.
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button href="/kontakt/" icon="fa-solid fa-paper-plane">
                    Kontakt aufnehmen
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section bg-black text-white">
          <div className="container px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "20+", label: "Jahre Erfahrung" },
                { number: "500+", label: "Projekte" },
                { number: "50+", label: "Firmenkunden" },
                { number: "100%", label: "Zufriedenheit" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <p className="text-4xl md:text-5xl font-semibold mb-2">
                    {stat.number}
                  </p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="section">
          <div className="container px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-h2 font-semibold mb-4">Mein Werdegang</h2>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-6 py-4 border-b border-border last:border-0"
                >
                  <span className="text-2xl font-semibold w-20">
                    {item.year}
                  </span>
                  <span className="text-text-secondary">{item.event}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="section bg-gray-50">
          <div className="container px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-h2 font-semibold mb-4">Meine Kunden</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Ich arbeite mit fuhrenden Unternehmen und Institutionen in Wien
                zusammen.
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {clients.map((client, index) => (
                <motion.div
                  key={client}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-xl font-medium text-text-secondary"
                >
                  {client}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section">
          <div className="container px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-h2 font-semibold mb-4">
                Was Kunden sagen
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 bg-gray-50"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-text-secondary mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-text-secondary">
                      {testimonial.position}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-gray-50">
          <div className="container px-4 md:px-8">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-h2 font-semibold">
                Lassen Sie uns zusammenarbeiten
              </h2>
              <p className="text-text-secondary">
                Ich freue mich darauf, mehr uber Ihr Projekt zu erfahren und
                gemeinsam aussergewohnliche Bilder zu schaffen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/kontakt/" icon="fa-solid fa-paper-plane">
                  Kontakt aufnehmen
                </Button>
                <Button href="/portfolio/" variant="secondary">
                  Portfolio ansehen
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
