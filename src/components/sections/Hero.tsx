"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { CameraGridLight } from "@/components/effects";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0">
        <CameraGridLight />
      </div>

      {/* Depth layers */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-[20%] left-[15%] w-40 h-40 rounded-full bg-black/[0.02] blur-2xl" />
        <div className="absolute bottom-[25%] right-[10%] w-60 h-60 rounded-full bg-black/[0.015] blur-3xl" />
      </motion.div>

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
              Verfügbar für neue Projekte
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
            Professionelle Business, Event und Produktfotografie mit über 20
            Jahren Erfahrung. Ihr Partner für hochwertige visuelle Inhalte in
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
              className="w-8 h-14 border-2 border-black/20 rounded-full flex justify-center pt-3"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="w-1.5 h-3 bg-black/40 rounded-full"
                animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`hero-particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-black/20"
          style={{ left: `${15 + i * 12}%`, top: `${25 + (i % 4) * 15}%` }}
          animate={{ y: [-15, 15, -15], opacity: [0.1, 0.3, 0.1], scale: [1, 1.3, 1] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        />
      ))}
    </section>
  );
}
