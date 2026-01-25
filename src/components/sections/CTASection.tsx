"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui";

export function CTASection() {
  return (
    <section className="section relative overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />

      {/* Decorative glass elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 glass-dark rounded-full opacity-50" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 glass-dark rounded-full opacity-50" />
      </div>

      <div className="container px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Glass Card CTA */}
          <div className="glass-card-3d p-10 md:p-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              {/* Icon */}
              <div className="w-20 h-20 mx-auto rounded-2xl glass-dark-strong flex items-center justify-center">
                <i className="fa-solid fa-camera text-3xl text-gray-700" />
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                Bereit fur Ihr Fotoshooting?
              </h2>

              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Lassen Sie uns gemeinsam Ihre Vision verwirklichen. Kontaktieren Sie
                mich fur ein unverbindliches Beratungsgesprach.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button href="/kontakt/" size="lg" icon="fa-solid fa-paper-plane">
                  Beratungsgesprach buchen
                </Button>
                <Button
                  href="https://wa.me/436608459895"
                  variant="secondary"
                  size="lg"
                  icon="fa-brands fa-whatsapp"
                  iconPosition="left"
                >
                  WhatsApp
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm text-text-secondary">
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-clock" />
                  Antwort in 24h
                </span>
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-shield-check" />
                  Unverbindlich
                </span>
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-star" />
                  5-Sterne Bewertungen
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
