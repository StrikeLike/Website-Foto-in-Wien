"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui";
import { services } from "@/data/services";
import { useSmoothScroll } from "@/lib/useSmoothScroll";

export default function LeistungenPage() {
  useSmoothScroll();

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
              <h1 className="text-h1 font-semibold mb-4">Meine Leistungen</h1>
              <p className="text-xl text-text-secondary">
                Professionelle Fotografie-Dienstleistungen fur Unternehmen und
                Privatpersonen in Wien. Von Business-Portraits bis zur
                Eventfotografie - ich biete massgeschneiderte Losungen fur jeden
                Bedarf.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="pb-16 md:pb-24">
          <div className="container px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/leistungen/${service.slug}/`}
                    className="group block h-full p-8 border border-border hover:border-black transition-colors duration-300"
                  >
                    <i
                      className={`${service.icon} text-4xl mb-6 block group-hover:scale-110 transition-transform duration-300`}
                    />
                    <h2 className="text-xl font-semibold mb-3">
                      {service.shortTitle}
                    </h2>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">
                        {service.startingPrice}
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                        Details
                        <i className="fa-solid fa-arrow-right" />
                      </span>
                    </div>
                  </Link>
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
                Nicht sicher, welche Leistung Sie brauchen?
              </h2>
              <p className="text-text-secondary">
                Kontaktieren Sie mich fur eine kostenlose Beratung. Gemeinsam
                finden wir die perfekte Losung fur Ihr Projekt.
              </p>
              <Button href="/kontakt/" icon="fa-solid fa-paper-plane">
                Kostenlose Beratung
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
