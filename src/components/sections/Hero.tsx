"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-8 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-hero font-semibold leading-tight mb-6"
          >
            Fotograf in Wien
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-text-secondary font-light mb-8 max-w-2xl mx-auto"
          >
            Professionelle Business, Event und Produktfotografie mit uber 20
            Jahren Erfahrung. Ihr Partner fur hochwertige visuelle Inhalte in
            Wien.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              href="/portfolio/"
              size="lg"
              icon="fa-solid fa-arrow-right"
            >
              Portfolio ansehen
            </Button>
            <Button href="/kontakt/" variant="secondary" size="lg">
              Kontakt aufnehmen
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-text-secondary"
            >
              <i className="fa-solid fa-chevron-down text-2xl" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
