"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui";
import { getServiceBySlug, services } from "@/data/services";

interface ServicePageClientProps {
  slug: string;
}

export default function ServicePageClient({ slug }: ServicePageClientProps) {
  const service = getServiceBySlug(slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!service) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-h1 font-semibold mb-4">
              Leistung nicht gefunden
            </h1>
            <Button href="/leistungen/">Zuruck zu den Leistungen</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section bg-gray-50">
          <div className="container px-4 md:px-8">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <ol className="flex items-center gap-2 text-sm text-text-secondary">
                <li>
                  <Link href="/" className="hover:text-black">
                    Home
                  </Link>
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right text-xs" />
                </li>
                <li>
                  <Link href="/leistungen/" className="hover:text-black">
                    Leistungen
                  </Link>
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right text-xs" />
                </li>
                <li className="text-black">{service.shortTitle}</li>
              </ol>
            </motion.nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-3 text-text-secondary">
                  <i className={`${service.icon} text-2xl`} />
                  <span className="text-sm uppercase tracking-wider">
                    {service.shortTitle}
                  </span>
                </div>
                <h1 className="text-h1 font-semibold">{service.title}</h1>
                <p className="text-xl text-text-secondary">
                  {service.heroDescription}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button href="/kontakt/" icon="fa-solid fa-paper-plane">
                    Anfrage senden
                  </Button>
                  <Button href="/preise/" variant="secondary">
                    Preise ansehen
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative aspect-[4/3] bg-gray-200"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <i className={`${service.icon} text-6xl text-white/50`} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section">
          <div className="container px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-h2 font-semibold mb-4">
                Das ist inklusive
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Alle Vorteile meiner {service.shortTitle} auf einen Blick.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-gray-50"
                >
                  <i className="fa-solid fa-check text-green-600 mt-1" />
                  <p>{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section bg-gray-50">
          <div className="container px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-h2 font-semibold mb-4">So lauft es ab</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Der Ablauf eines {service.shortTitle} Projekts.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-black text-white flex items-center justify-center text-xl font-semibold">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-text-secondary text-sm">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="section">
          <div className="container px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-h2 font-semibold mb-4">Beispielarbeiten</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="relative aspect-square bg-gray-200 group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center text-white/50">
                    <i className="fa-solid fa-camera text-2xl" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <Button href="/portfolio/" variant="secondary">
                Mehr im Portfolio
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Pricing Teaser */}
        <section className="section bg-black text-white">
          <div className="container px-4 md:px-8">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-h2 font-semibold">
                {service.shortTitle} {service.startingPrice}
              </h2>
              <p className="text-gray-400">
                Transparente Preise ohne versteckte Kosten. Alle Details finden
                Sie auf meiner Preisseite.
              </p>
              <Button
                href="/preise/"
                variant="secondary"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                Alle Preise ansehen
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section">
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
              {service.faq.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="border border-border"
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

        {/* Other Services */}
        <section className="section bg-gray-50">
          <div className="container px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-h2 font-semibold mb-4">Weitere Leistungen</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherServices.map((other, index) => (
                <motion.div
                  key={other.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/leistungen/${other.slug}/`}
                    className="group block p-6 bg-white border border-border hover:border-black transition-colors"
                  >
                    <i
                      className={`${other.icon} text-2xl mb-4 block group-hover:scale-110 transition-transform`}
                    />
                    <h3 className="font-semibold mb-2">{other.shortTitle}</h3>
                    <span className="text-sm text-text-secondary">
                      {other.startingPrice}
                    </span>
                  </Link>
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
                Interesse an {service.shortTitle}?
              </h2>
              <p className="text-text-secondary">
                Kontaktieren Sie mich fur ein unverbindliches Angebot und lassen
                Sie uns Ihr Projekt besprechen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/kontakt/" icon="fa-solid fa-paper-plane">
                  Anfrage senden
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
