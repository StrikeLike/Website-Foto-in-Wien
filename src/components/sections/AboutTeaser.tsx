"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui";

export function AboutTeaser() {
  return (
    <section className="section bg-gray-50">
      <div className="container px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] bg-gray-200"
          >
            {/* Placeholder for portrait image */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <i className="fa-solid fa-user text-6xl text-white/50" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-h1 font-semibold">Alexandru Bogdan</h2>
            <p className="text-h2 text-text-secondary font-light">
              Ihr Fotograf in Wien
            </p>

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
              <p>
                Von namhaften Unternehmen wie TU Wien bis hin zu lokalen
                Startups - ich arbeite eng mit meinen Kunden zusammen, um ihre
                Vision in aussagekraftige Bilder umzusetzen.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <p className="text-3xl font-semibold">20+</p>
                <p className="text-sm text-text-secondary">Jahre Erfahrung</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">500+</p>
                <p className="text-sm text-text-secondary">Projekte</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">100%</p>
                <p className="text-sm text-text-secondary">Zufriedenheit</p>
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
    </section>
  );
}
