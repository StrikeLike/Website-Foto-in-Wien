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
        {/* Hero Section */}
        <section className="section">
          <div className="container px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-h1 font-semibold mb-4">Portfolio</h1>
              <p className="text-xl text-text-secondary">
                Eine Auswahl meiner Arbeiten aus den Bereichen Business, Event,
                Portrait und Produktfotografie. Jedes Projekt erzahlt eine
                einzigartige Geschichte.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="pb-16 md:pb-24">
          <div className="container px-4 md:px-8">
            <PortfolioGrid projects={projects} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
