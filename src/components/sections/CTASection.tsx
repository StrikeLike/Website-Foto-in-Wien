"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TransitionSection, ViewfinderDark } from "@/components/effects";

export function CTASection() {
  return (
    <TransitionSection dark={true} background={<ViewfinderDark />} index={6}>
      <div className="py-24 md:py-32">
        <div className="container px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-10 md:p-16 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                <div className="w-20 h-20 mx-auto rounded-2xl bg-white/10 flex items-center justify-center">
                  <i className="fa-solid fa-camera text-3xl text-white/70" />
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
                  Bereit fur Ihr Fotoshooting?
                </h2>

                <p className="text-xl text-white/50 max-w-2xl mx-auto">
                  Lassen Sie uns gemeinsam Ihre Vision verwirklichen. Kontaktieren Sie
                  mich fur ein unverbindliches Beratungsgesprach.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link
                    href="/kontakt/"
                    className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all inline-flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-paper-plane" /> Beratungsgesprach buchen
                  </Link>
                  <a
                    href="https://wa.me/436608459895"
                    className="px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2"
                  >
                    <i className="fa-brands fa-whatsapp" /> WhatsApp
                  </a>
                </div>

                <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm text-white/40">
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-clock" />
                    Antwort in 24h
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-shield" />
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
      </div>
    </TransitionSection>
  );
}
