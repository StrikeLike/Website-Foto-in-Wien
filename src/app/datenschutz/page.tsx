"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";

export default function DatenschutzPage() {

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section - Dark with shield icon */}
        <section className="section-dark py-20 md:py-24 relative overflow-hidden">
          {/* Radial gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_50%)]" />

          {/* Scattered circles */}
          <div className="absolute top-10 right-20 w-32 h-32 rounded-full border border-white/5" />
          <div className="absolute bottom-10 left-1/4 w-24 h-24 rounded-full border border-white/5" />

          <div className="container px-4 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 glass-card-on-dark rounded-xl flex items-center justify-center">
                  <i className="fa-solid fa-shield-halved text-xl text-white" />
                </div>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
                Datenschutzerklarung
              </h1>
              <p className="text-gray-400 mt-4">
                Ihre Privatsphare ist uns wichtig. Hier erfahren Sie, wie wir Ihre Daten schutzen.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section - Light with sidebar accent */}
        <section className="section relative overflow-hidden">
          {/* Left sidebar accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200" />

          {/* Subtle cross pattern */}
          <div
            className="absolute inset-0 opacity-[0.01]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v60M0 30h60' stroke='%231b1b1b' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />

          <div className="container px-4 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <div className="space-y-8">
                <div className="glass-card-3d p-8 md:p-10">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 glass-dark-strong rounded-lg flex items-center justify-center text-sm">1</span>
                    Verantwortliche Stelle
                  </h2>
                  <p className="text-text-secondary mb-4">
                    Die verantwortliche Stelle fur die Datenverarbeitung auf
                    dieser Website ist:
                  </p>
                  <div className="glass-dark p-4 rounded-xl">
                    <p className="text-text-secondary">
                      <strong>WELO MEDIA STUDIOS S.R.L.</strong>
                      <br />
                      Vertreten durch: Alexandru-Sebastian Bogdan
                      <br />
                      C.A. Rosetti Strasse, Nr. 20 / P9 / 05
                      <br />
                      Corabia, Rumanien
                      <br />
                      E-Mail:{" "}
                      <a href="mailto:info@fotoinwien.at" className="underline hover:text-black">
                        info@fotoinwien.at
                      </a>
                    </p>
                  </div>
                </div>

                <div className="glass-card-3d p-8 md:p-10">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 glass-dark-strong rounded-lg flex items-center justify-center text-sm">2</span>
                    Datenerfassung bei Webseitenbesuchen
                  </h2>
                  <p className="text-text-secondary mb-4">
                    Bei jedem Zugriff auf diese Website werden automatisch
                    folgende Informationen erfasst:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "IP-Adresse des anfragenden Rechners",
                      "Datum und Uhrzeit des Zugriffs",
                      "Name und URL der abgerufenen Datei",
                      "Website, von der aus der Zugriff erfolgt (Referrer-URL)",
                      "Verwendeter Browser und Betriebssystem",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-text-secondary">
                        <i className="fa-solid fa-circle-check text-gray-400 mt-1" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass-card-3d p-8 md:p-10">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 glass-dark-strong rounded-lg flex items-center justify-center text-sm">3</span>
                    Kontaktformular und E-Mail-Kontakt
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
                </div>

                <div className="glass-card-3d p-8 md:p-10">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 glass-dark-strong rounded-lg flex items-center justify-center text-sm">4</span>
                    Bildrechte und Urheberrecht
                  </h2>
                  <p className="text-text-secondary">
                    Alle auf dieser Website veroffentlichten fotografischen
                    Aufnahmen sind urheberrechtlich geschutzt und Eigentum von
                    Alexandru-Sebastian Bogdan / WELO MEDIA STUDIOS S.R.L.
                  </p>
                  <p className="text-text-secondary mt-4">
                    Eine Nutzung oder Vervielfaltigung der Bilder ohne
                    ausdruckliche schriftliche Genehmigung ist nicht gestattet.
                  </p>
                </div>

                <div className="glass-card-3d p-8 md:p-10">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 glass-dark-strong rounded-lg flex items-center justify-center text-sm">5</span>
                    Cookies
                  </h2>
                  <p className="text-text-secondary mb-4">
                    Diese Website verwendet Cookies, um die Benutzerfreundlichkeit
                    zu verbessern. Wir unterscheiden zwischen:
                  </p>
                  <div className="grid gap-3">
                    {[
                      { type: "Technische Cookies", desc: "Erforderlich fur den Betrieb (keine Zustimmung erforderlich)" },
                      { type: "Statistik-Cookies", desc: "Zur Analyse der Websitenutzung (Zustimmung erforderlich)" },
                      { type: "Marketing-Cookies", desc: "Fur personalisierte Werbung (Zustimmung erforderlich)" },
                    ].map((cookie, i) => (
                      <div key={i} className="glass-dark p-4 rounded-xl">
                        <p className="font-medium text-sm">{cookie.type}</p>
                        <p className="text-text-secondary text-sm">{cookie.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card-3d p-8 md:p-10">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 glass-dark-strong rounded-lg flex items-center justify-center text-sm">6</span>
                    Ihre Rechte (DSGVO)
                  </h2>
                  <p className="text-text-secondary mb-4">
                    Gemas der Datenschutz-Grundverordnung (DSGVO) haben Sie
                    folgende Rechte:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { right: "Auskunftsrecht", desc: "Auskunft uber gespeicherte Daten" },
                      { right: "Berichtigungsrecht", desc: "Berichtigung unrichtiger Daten" },
                      { right: "Loschungsrecht", desc: "Loschung Ihrer Daten" },
                      { right: "Widerspruchsrecht", desc: "Widerspruch gegen Verarbeitung" },
                    ].map((item, i) => (
                      <div key={i} className="glass-dark p-4 rounded-xl">
                        <p className="font-medium text-sm">{item.right}</p>
                        <p className="text-text-secondary text-xs">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-text-secondary mt-4 text-sm">
                    Zur Ausubung Ihrer Rechte kontaktieren Sie uns unter:{" "}
                    <a href="mailto:info@fotoinwien.at" className="underline hover:text-black">
                      info@fotoinwien.at
                    </a>
                  </p>
                </div>

                <div className="glass-dark-strong p-6 rounded-2xl text-center">
                  <p className="text-sm text-gray-600">Stand: Januar 2026</p>
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
