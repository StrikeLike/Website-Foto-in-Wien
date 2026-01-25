"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />

      {/* Decorative Glass Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large glass circle - top right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)',
          }}
        />

        {/* Glass card decoration - left */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute top-1/4 -left-20 w-64 h-64 glass-dark rounded-3xl rotate-12"
        />

        {/* Small glass element - bottom */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-32 h-32 glass-dark rounded-2xl -rotate-6"
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-8 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 glass-dark-strong rounded-full text-sm font-medium text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Verfugbar fur neue Projekte
            </span>
          </motion.div>

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
            className="text-xl md:text-2xl text-text-secondary font-light mb-10 max-w-2xl mx-auto"
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

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12 mt-16 pt-8 border-t border-gray-200"
          >
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-semibold">20+</p>
              <p className="text-sm text-text-secondary mt-1">Jahre Erfahrung</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-semibold">500+</p>
              <p className="text-sm text-text-secondary mt-1">Projekte</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-semibold">50+</p>
              <p className="text-sm text-text-secondary mt-1">Firmenkunden</p>
            </div>
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
