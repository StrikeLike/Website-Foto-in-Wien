"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { useSmoothScroll } from "@/lib/useSmoothScroll";

export default function DatenschutzPage() {
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
              <h1 className="text-h1 font-semibold mb-8">Datenschutzerklarung</h1>

              <div className="prose prose-lg max-w-none space-y-8">
                <section>
                  <h2 className="text-xl font-semibold mb-4">
                    1. Verantwortliche Stelle
                  </h2>
                  <p className="text-text-secondary">
                    Die verantwortliche Stelle fur die Datenverarbeitung auf
                    dieser Website ist:
                  </p>
                  <p className="text-text-secondary mt-4">
                    <strong>WELO MEDIA STUDIOS S.R.L.</strong>
                    <br />
                    Vertreten durch: Alexandru-Sebastian Bogdan
                    <br />
                    C.A. Rosetti Strasse, Nr. 20 / P9 / 05
                    <br />
                    Corabia, Rumanien
                    <br />
                    E-Mail:{" "}
                    <a
                      href="mailto:info@fotoinwien.at"
                      className="underline hover:text-black"
                    >
                      info@fotoinwien.at
                    </a>
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">
                    2. Datenerfassung bei Webseitenbesuchen
                  </h2>
                  <p className="text-text-secondary">
                    Bei jedem Zugriff auf diese Website werden automatisch
                    folgende Informationen erfasst:
                  </p>
                  <ul className="list-disc list-inside text-text-secondary mt-4 space-y-2">
                    <li>IP-Adresse des anfragenden Rechners</li>
                    <li>Datum und Uhrzeit des Zugriffs</li>
                    <li>Name und URL der abgerufenen Datei</li>
                    <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
                    <li>Verwendeter Browser und Betriebssystem</li>
                  </ul>
                  <p className="text-text-secondary mt-4">
                    Diese Daten werden ausschliesslich fur technische Zwecke und
                    zur Verbesserung unseres Angebots verwendet.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">
                    3. Kontaktformular und E-Mail-Kontakt
                  </h2>
                  <p className="text-text-secondary">
                    Bei Anfragen uber das Kontaktformular, per E-Mail oder Telefon
                    werden Ihre angegebenen Daten zur Bearbeitung der Anfrage
                    gespeichert. Diese Daten werden sechs Monate nach Abschluss
                    der Anfrage geloscht, sofern keine gesetzlichen
                    Aufbewahrungspflichten bestehen.
                  </p>
                  <p className="text-text-secondary mt-4">
                    Ihre Daten werden ohne Ihre ausdruckliche Zustimmung nicht an
                    Dritte weitergegeben.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">
                    4. Bildrechte und Urheberrecht
                  </h2>
                  <p className="text-text-secondary">
                    Alle auf dieser Website veroffentlichten fotografischen
                    Aufnahmen sind urheberrechtlich geschutzt und Eigentum von
                    Alexandru-Sebastian Bogdan / WELO MEDIA STUDIOS S.R.L.
                  </p>
                  <p className="text-text-secondary mt-4">
                    Eine Nutzung oder Vervielfaltigung der Bilder ohne
                    ausdruckliche schriftliche Genehmigung ist nicht gestattet.
                    Ein Urheberrechtsubertrag ist ausschliesslich durch
                    schriftlichen Vertrag moglich.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">5. Cookies</h2>
                  <p className="text-text-secondary">
                    Diese Website verwendet Cookies, um die Benutzerfreundlichkeit
                    zu verbessern. Wir unterscheiden zwischen:
                  </p>
                  <ul className="list-disc list-inside text-text-secondary mt-4 space-y-2">
                    <li>
                      <strong>Technische Cookies:</strong> Erforderlich fur den
                      Betrieb der Website (keine Zustimmung erforderlich)
                    </li>
                    <li>
                      <strong>Statistik-Cookies:</strong> Zur Analyse der
                      Websitenutzung (Zustimmung erforderlich)
                    </li>
                    <li>
                      <strong>Marketing-Cookies:</strong> Fur personalisierte
                      Werbung (Zustimmung erforderlich)
                    </li>
                  </ul>
                  <p className="text-text-secondary mt-4">
                    Sie konnen Ihre Cookie-Einstellungen jederzeit in Ihrem
                    Browser andern.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">
                    6. Ihre Rechte (DSGVO)
                  </h2>
                  <p className="text-text-secondary">
                    Gemas der Datenschutz-Grundverordnung (DSGVO) haben Sie
                    folgende Rechte:
                  </p>
                  <ul className="list-disc list-inside text-text-secondary mt-4 space-y-2">
                    <li>
                      <strong>Auskunftsrecht:</strong> Sie konnen jederzeit
                      Auskunft uber Ihre gespeicherten personenbezogenen Daten
                      verlangen.
                    </li>
                    <li>
                      <strong>Berichtigungsrecht:</strong> Sie konnen die
                      Berichtigung unrichtiger Daten verlangen.
                    </li>
                    <li>
                      <strong>Loschungsrecht:</strong> Sie konnen die Loschung
                      Ihrer Daten verlangen, sofern keine gesetzlichen
                      Aufbewahrungspflichten bestehen.
                    </li>
                    <li>
                      <strong>Widerspruchsrecht:</strong> Sie konnen der
                      Verarbeitung Ihrer Daten jederzeit widersprechen.
                    </li>
                    <li>
                      <strong>Recht auf Datenubertragbarkeit:</strong> Sie konnen
                      Ihre Daten in einem maschinenlesbaren Format erhalten.
                    </li>
                  </ul>
                  <p className="text-text-secondary mt-4">
                    Zur Ausubung Ihrer Rechte kontaktieren Sie uns bitte unter:{" "}
                    <a
                      href="mailto:info@fotoinwien.at"
                      className="underline hover:text-black"
                    >
                      info@fotoinwien.at
                    </a>
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">
                    7. Haftungsbeschrankung
                  </h2>
                  <p className="text-text-secondary">
                    Weder das Unternehmen noch der Fotograf ubernehmen Haftung fur
                    Schaden, die aus der Nutzung dieser Website oder der
                    Datenverarbeitung entstehen, ausser bei Vorsatz oder grober
                    Fahrlassigkeit.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">
                    8. Anderungen dieser Datenschutzerklarung
                  </h2>
                  <p className="text-text-secondary">
                    Wir behalten uns vor, diese Datenschutzerklarung jederzeit zu
                    andern. Die aktuelle Version ist stets auf dieser Seite
                    verfugbar.
                  </p>
                </section>

                <section className="pt-4 border-t border-border">
                  <p className="text-sm text-text-secondary">Stand: Januar 2026</p>
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
