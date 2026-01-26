"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";

export default function ImpressumPage() {

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section - Minimal with accent line */}
        <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
          {/* Vertical accent line */}
          <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gray-200 to-transparent" />

          <div className="container px-4 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 glass-dark-strong rounded-xl flex items-center justify-center">
                  <i className="fa-solid fa-building text-gray-700" />
                </div>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Impressum</h1>
            </motion.div>
          </div>
        </section>

        {/* Content Section - Clean with glass accents */}
        <section className="pb-16 md:pb-24 relative">
          {/* Subtle dot pattern on the right */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1/3 opacity-[0.015]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #1b1b1b 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />

          <div className="container px-4 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <div className="glass-card-3d p-8 md:p-12">
                <div className="space-y-10">
                  <section>
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-black rounded-full" />
                      Firmenname
                    </h2>
                    <p className="text-text-secondary">
                      <strong>WELO MEDIA STUDIOS S.R.L.</strong>
                    </p>
                  </section>

                  <section>
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-black rounded-full" />
                      Dienstleistung
                    </h2>
                    <p className="text-text-secondary">
                      Foto in Wien - Professionelle Fotografie
                    </p>
                  </section>

                  <section>
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-black rounded-full" />
                      Firmensitz (Rumanien)
                    </h2>
                    <p className="text-text-secondary">
                      C.A. Rosetti Strasse, Nr. 20 / P9 / 05
                      <br />
                      Corabia, Rumanien
                    </p>
                  </section>

                  <section>
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-black rounded-full" />
                      Geschaftsfuhrender Direktor
                    </h2>
                    <p className="text-text-secondary">Alexandru-Sebastian Bogdan</p>
                  </section>

                  <section>
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-black rounded-full" />
                      Registrierungsdaten
                    </h2>
                    <ul className="text-text-secondary space-y-2">
                      <li className="flex gap-2">
                        <span className="text-gray-400">Handelsregisternummer:</span>
                        <span>J28/885/2022</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-gray-400">Steuernummer (CUI):</span>
                        <span>RO44714141</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-gray-400">EUID:</span>
                        <span>ROONRC.J28/885/2022</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-gray-400">CAEN:</span>
                        <span>7331 - Werbeagenturen</span>
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-black rounded-full" />
                      Kontaktdaten
                    </h2>
                    <ul className="text-text-secondary space-y-2">
                      <li>
                        <span className="text-gray-400">Telefon: </span>
                        <a href="tel:+436608459895" className="hover:text-black transition-colors">
                          +43 660 845 9895
                        </a>
                      </li>
                      <li>
                        <span className="text-gray-400">E-Mail: </span>
                        <a href="mailto:info@fotoinwien.at" className="hover:text-black transition-colors">
                          info@fotoinwien.at
                        </a>
                      </li>
                      <li>
                        <span className="text-gray-400">Website: </span>
                        <a href="https://www.fotoinwien.at" className="hover:text-black transition-colors">
                          www.fotoinwien.at
                        </a>
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-black rounded-full" />
                      Urheberrecht
                    </h2>
                    <p className="text-text-secondary">
                      Alle Fotografien WELO MEDIA STUDIOS S.R.L. /
                      Alexandru-Sebastian Bogdan. Alle Rechte vorbehalten.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-black rounded-full" />
                      Streitschlichtung
                    </h2>
                    <p className="text-text-secondary">
                      Plattform der Europaischen Kommission:{" "}
                      <a
                        href="https://ec.europa.eu/consumers/odr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-black transition-colors"
                      >
                        ec.europa.eu/consumers/odr
                      </a>
                    </p>
                  </section>

                  <div className="pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-400">Stand: Januar 2026</p>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-text-secondary hover:text-black transition-colors glass-dark px-4 py-2 rounded-full"
                >
                  <i className="fa-solid fa-arrow-left" />
                  Zuruck zur Startseite
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
