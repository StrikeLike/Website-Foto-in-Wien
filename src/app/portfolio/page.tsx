"use client";

import { motion } from "framer-motion";
import { Header, Footer } from "@/components/layout";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { projects } from "@/data/portfolio";

export default function PortfolioPage() {

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section - Mesh gradient background */}
        <section className="section relative overflow-hidden">
          {/* Mesh gradient orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-gray-100 to-transparent opacity-60 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-gray-200 to-transparent opacity-40 blur-3xl" />
          </div>

          {/* Geometric lines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 right-10 w-64 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent rotate-45" />
            <div className="absolute bottom-32 left-20 w-48 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent -rotate-12" />
          </div>

          <div className="container px-4 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 glass-dark-strong rounded-full text-sm font-medium text-gray-600 mb-6"
              >
                <i className="fa-solid fa-images mr-2" />
                Uber 500 abgeschlossene Projekte
              </motion.span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight">
                Portfolio
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Eine Auswahl meiner Arbeiten aus den Bereichen Business, Event,
                Portrait und Produktfotografie. Jedes Projekt erzahlt eine
                einzigartige Geschichte.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Grid - with subtle pattern */}
        <section className="pb-16 md:pb-24 relative">
          {/* Subtle dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #1b1b1b 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          <div className="container px-4 md:px-8 relative z-10">
            <PortfolioGrid projects={projects} />
          </div>
        </section>

        {/* CTA Section - Dark with glass */}
        <section className="section-dark py-24 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-white/[0.02] blur-3xl -translate-y-1/2" />
            <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-white/[0.015] blur-3xl" />
          </div>

          <div className="container px-4 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="glass-card-on-dark p-10 md:p-14">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
                  Mochten Sie Ihr Projekt besprechen?
                </h2>
                <p className="text-gray-400 mb-8 text-lg">
                  Ich freue mich auf Ihre Anfrage und berate Sie gerne zu Ihrem Fotoprojekt.
                </p>
                <a
                  href="/kontakt/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors"
                >
                  Projekt anfragen
                  <i className="fa-solid fa-arrow-right" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
