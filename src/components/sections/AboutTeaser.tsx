"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { TransitionSection, FocusFrameLight } from "@/components/effects";

export function AboutTeaser() {
  return (
    <TransitionSection dark={false} background={<FocusFrameLight />} enableDoF index={5}>
      <div className="py-24 md:py-32">
        <div className="container px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Image with glass frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Glass frame around image */}
            <div className="glass-card-3d p-4">
              <div className="relative aspect-[4/5] bg-gray-200 rounded-2xl overflow-hidden">
                {/* Placeholder for portrait image */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <i className="fa-solid fa-user text-6xl text-white/50" />
                </div>
              </div>
            </div>

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-6 lg:right-auto lg:-left-6"
            >
              <div className="glass-dark-strong p-6 rounded-2xl shadow-3d-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                    <i className="fa-solid fa-award text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">20+</p>
                    <p className="text-sm text-gray-600">Jahre Erfahrung</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                Uber mich
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                Alexandru Bogdan
              </h2>
              <p className="text-xl text-text-secondary font-light mt-2">
                Ihr Fotograf in Wien
              </p>
            </div>

            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Mit uber 20 Jahren Erfahrung in der professionellen Fotografie
                habe ich mich auf Business, Event und Produktfotografie
                spezialisiert.
              </p>
              <p>
                Meine Leidenschaft ist es, die Geschichte hinter jedem Bild zu
                erzahlen und authentische Momente festzuhalten, die einen
                bleibenden Eindruck hinterlassen.
              </p>
            </div>

            {/* Stats with glass styling */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="glass-dark p-4 rounded-xl text-center min-w-[100px]">
                <p className="text-2xl font-bold">500+</p>
                <p className="text-xs text-gray-600">Projekte</p>
              </div>
              <div className="glass-dark p-4 rounded-xl text-center min-w-[100px]">
                <p className="text-2xl font-bold">50+</p>
                <p className="text-xs text-gray-600">Firmenkunden</p>
              </div>
              <div className="glass-dark p-4 rounded-xl text-center min-w-[100px]">
                <p className="text-2xl font-bold">100%</p>
                <p className="text-xs text-gray-600">Zufriedenheit</p>
              </div>
            </div>

            <div className="pt-4">
              <Button href="/uber-mich/" icon="fa-solid fa-arrow-right">
                Mehr uber mich
              </Button>
            </div>
          </motion.div>
        </div>
        </div>
      </div>
    </TransitionSection>
  );
}
