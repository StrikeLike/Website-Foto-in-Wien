"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui";
import { services } from "@/data/services";

export default function LeistungenPage() {

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section - Diagonal stripes background */}
        <section className="section-dark py-24 md:py-32 relative overflow-hidden">
          {/* Diagonal stripes */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 40px,
                white 40px,
                white 41px
              )`,
            }}
          />

          {/* Gradient orbs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/[0.015] blur-3xl translate-y-1/2 -translate-x-1/4" />

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
                className="inline-flex items-center gap-3 mb-8"
              >
                <span className="w-12 h-[1px] bg-white/30" />
                <span className="text-white/60 text-sm uppercase tracking-widest">Fotografie Services</span>
                <span className="w-12 h-[1px] bg-white/30" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight text-white">
                Meine Leistungen
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Professionelle Fotografie-Dienstleistungen fur Unternehmen und
                Privatpersonen in Wien. Von Business-Portraits bis zur
                Eventfotografie.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid - Glass cards on light background */}
        <section className="section relative overflow-hidden">
          {/* Cross pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #1b1b1b 1px, transparent 1px),
                linear-gradient(to bottom, #1b1b1b 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />

          {/* Floating glass shapes */}
          <div className="absolute top-20 right-20 w-40 h-40 glass-dark rounded-3xl rotate-12 opacity-50" />
          <div className="absolute bottom-40 left-10 w-32 h-32 glass-dark rounded-2xl -rotate-6 opacity-40" />

          <div className="container px-4 md:px-8 relative z-10">
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
                    className="group block h-full"
                  >
                    <div className="glass-card-3d p-8 h-full">
                      <div className="w-16 h-16 rounded-2xl glass-dark-strong flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <i className={`${service.icon} text-2xl text-gray-700`} />
                      </div>

                      <h2 className="text-xl font-semibold mb-3">
                        {service.shortTitle}
                      </h2>
                      <p className="text-text-secondary text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-lg font-semibold">
                          {service.startingPrice}
                        </span>
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 group-hover:gap-3 transition-all">
                          Details
                          <i className="fa-solid fa-arrow-right" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Light with elegant gradient */}
        <section className="section relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
          {/* Decorative circles */}
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full border border-gray-200 opacity-30" />
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full border border-gray-200 opacity-20" />

          <div className="container px-4 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="glass-card-3d p-10 md:p-14 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl glass-dark-strong flex items-center justify-center mb-6">
                  <i className="fa-solid fa-question text-2xl text-gray-700" />
                </div>

                <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                  Nicht sicher, welche Leistung Sie brauchen?
                </h2>
                <p className="text-text-secondary mb-8 text-lg max-w-xl mx-auto">
                  Kontaktieren Sie mich fur eine kostenlose Beratung. Gemeinsam
                  finden wir die perfekte Losung fur Ihr Projekt.
                </p>
                <Button href="/kontakt/" icon="fa-solid fa-paper-plane" size="lg">
                  Kostenlose Beratung
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
