"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { useSmoothScroll } from "@/lib/useSmoothScroll";

export default function ImpressumPage() {
  useSmoothScroll();

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="section">
          <div className="container px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-h1 font-semibold mb-8">Impressum</h1>

              <div className="prose prose-lg max-w-none space-y-8">
                <section>
                  <h2 className="text-xl font-semibold mb-4">Firmenname</h2>
                  <p className="text-text-secondary">
                    <strong>WELO MEDIA STUDIOS S.R.L.</strong>
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">Dienstleistung</h2>
                  <p className="text-text-secondary">
                    Foto in Wien - Professionelle Fotografie
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">
                    Firmensitz (Rumanien)
                  </h2>
                  <p className="text-text-secondary">
                    C.A. Rosetti Strasse, Nr. 20 / P9 / 05
                    <br />
                    Corabia, Rumanien
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">
                    Geschaftsfuhrender Direktor
                  </h2>
                  <p className="text-text-secondary">Alexandru-Sebastian Bogdan</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">
                    Registrierungsdaten
                  </h2>
                  <ul className="text-text-secondary space-y-2">
                    <li>
                      <strong>Handelsregisternummer:</strong> J28/885/2022
                    </li>
                    <li>
                      <strong>Steuernummer (CUI):</strong> RO44714141
                    </li>
                    <li>
                      <strong>Einheitliche europaische Kennung (EUID):</strong>{" "}
                      ROONRC.J28/885/2022
                    </li>
                    <li>
                      <strong>Haupttatigkeit (CAEN):</strong> 7331 - Tatigkeiten
                      von Werbeagenturen
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">Kontaktdaten</h2>
                  <ul className="text-text-secondary space-y-2">
                    <li>
                      <strong>Telefon:</strong>{" "}
                      <a
                        href="tel:+436608459895"
                        className="underline hover:text-black"
                      >
                        +43 660 845 9895
                      </a>
                    </li>
                    <li>
                      <strong>E-Mail:</strong>{" "}
                      <a
                        href="mailto:info@fotoinwien.at"
                        className="underline hover:text-black"
                      >
                        info@fotoinwien.at
                      </a>
                    </li>
                    <li>
                      <strong>Website:</strong>{" "}
                      <a
                        href="https://www.fotoinwien.at"
                        className="underline hover:text-black"
                      >
                        https://www.fotoinwien.at
                      </a>
                    </li>
                    <li>
                      <strong>Hauptwebsite:</strong>{" "}
                      <a
                        href="https://www.welo-media.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-black"
                      >
                        https://www.welo-media.com
                      </a>
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">
                    Aufsichtsbehorde (Rumanien)
                  </h2>
                  <p className="text-text-secondary">
                    Registrul Comertului Olt
                    <br />
                    Strada Carpati, Nr. 6, Slatina, Judetul Olt, Rumanien
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">Urheberrecht</h2>
                  <p className="text-text-secondary">
                    Alle Fotografien WELO MEDIA STUDIOS S.R.L. /
                    Alexandru-Sebastian Bogdan. Alle Rechte vorbehalten.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">Streitschlichtung</h2>
                  <p className="text-text-secondary">
                    Plattform der Europaischen Kommission zur Online-Streitbeilegung:{" "}
                    <a
                      href="https://ec.europa.eu/consumers/odr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-black"
                    >
                      https://ec.europa.eu/consumers/odr
                    </a>
                  </p>
                </section>

                <section className="pt-4 border-t border-border">
                  <p className="text-sm text-text-secondary">
                    Stand: Januar 2026
                  </p>
                </section>
              </div>

              <div className="mt-12">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-text-secondary hover:text-black transition-colors"
                >
                  <i className="fa-solid fa-arrow-left" />
                  Zuruck zur Startseite
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
