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
        {/* Hero Section - Noise texture with gradient */}
        <section className="section relative overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100" />

          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.3]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Decorative ring */}
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full border border-gray-200/50 -translate-y-1/2 translate-x-1/2" />

          <div className="container px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image with elegant frame */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative order-2 lg:order-1"
              >
                <div className="glass-card-3d p-4">
                  <div className="relative aspect-[4/5] bg-gray-200 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <i className="fa-solid fa-user text-8xl text-white/50" />
                    </div>
                  </div>
                </div>

                {/* Experience badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-4 -right-4 lg:-right-8"
                >
                  <div className="glass-dark-strong p-6 rounded-2xl shadow-3d-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center">
                        <i className="fa-solid fa-award text-white text-xl" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold">20+</p>
                        <p className="text-sm text-gray-600">Jahre Erfahrung</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6 order-1 lg:order-2"
              >
                <div>
                  <span className="inline-block px-4 py-2 glass-dark rounded-full text-sm font-medium text-gray-600 mb-4">
                    <i className="fa-solid fa-camera mr-2" />
                    Uber mich
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
                    Alexandru Bogdan
                  </h1>
                  <p className="text-2xl text-text-secondary font-light mt-2">
                    Ihr Fotograf in Wien
                  </p>
                </div>

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

        {/* Stats Section - Dark with radial gradient */}
        <section className="section-dark py-20 relative overflow-hidden">
          {/* Radial gradient background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)]" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
              backgroundSize: '100px 100px',
            }}
          />

          <div className="container px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                  className="text-center"
                >
                  <div className="glass-card-on-dark p-6 rounded-2xl">
                    <p className="text-4xl md:text-5xl font-semibold mb-2 text-white">
                      {stat.number}
                    </p>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section - Wave pattern */}
        <section className="section relative overflow-hidden">
          {/* Wave pattern */}
          <div className="absolute inset-0">
            <svg className="absolute bottom-0 left-0 w-full h-32 opacity-[0.03]" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="#1b1b1b" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
            </svg>
          </div>

          <div className="container px-4 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                Mein Werdegang
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-6 py-5"
                >
                  <div className="glass-dark-strong px-4 py-2 rounded-xl">
                    <span className="text-xl font-bold">{item.year}</span>
                  </div>
                  <span className="text-text-secondary flex-1">{item.event}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients Section - Dot matrix background */}
        <section className="section relative overflow-hidden bg-gray-50">
          {/* Dot matrix */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #1b1b1b 2px, transparent 2px)`,
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
                Meine Kunden
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Ich arbeite mit fuhrenden Unternehmen und Institutionen in Wien zusammen.
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6">
              {clients.map((client, index) => (
                <motion.div
                  key={client}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="glass-card-3d px-8 py-4">
                    <span className="text-lg font-medium">{client}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section - Dark with floating shapes */}
        <section className="section-dark py-24 relative overflow-hidden">
          {/* Floating glass shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 glass-card-on-dark rounded-3xl rotate-12 opacity-30" />
          <div className="absolute bottom-20 right-20 w-48 h-48 glass-card-on-dark rounded-2xl -rotate-6 opacity-20" />

          <div className="container px-4 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight text-white">
                Was Kunden sagen
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="glass-card-on-dark p-8 h-full">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-white/80 mb-6 italic leading-relaxed">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div>
                      <p className="font-semibold text-white">{testimonial.author}</p>
                      <p className="text-sm text-gray-400">{testimonial.position}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section relative overflow-hidden">
          {/* Concentric circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-[200px] h-[200px] rounded-full border border-gray-200/30" />
            <div className="absolute inset-0 w-[400px] h-[400px] -ml-[100px] -mt-[100px] rounded-full border border-gray-200/20" />
            <div className="absolute inset-0 w-[600px] h-[600px] -ml-[200px] -mt-[200px] rounded-full border border-gray-200/10" />
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
                  Lassen Sie uns zusammenarbeiten
                </h2>
                <p className="text-text-secondary mb-8 text-lg">
                  Ich freue mich darauf, mehr uber Ihr Projekt zu erfahren und
                  gemeinsam aussergewohnliche Bilder zu schaffen.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button href="/kontakt/" icon="fa-solid fa-paper-plane" size="lg">
                    Kontakt aufnehmen
                  </Button>
                  <Button href="/portfolio/" variant="secondary" size="lg">
                    Portfolio ansehen
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
