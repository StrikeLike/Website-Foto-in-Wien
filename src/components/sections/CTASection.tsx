"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui";

export function CTASection() {
  return (
    <section className="section">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <h2 className="text-h1 font-semibold">
            Bereit fur Ihr Fotoshooting?
          </h2>
          <p className="text-xl text-text-secondary">
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

          <p className="text-sm text-text-secondary">
            <i className="fa-solid fa-clock mr-2" />
            Antwort innerhalb von 24 Stunden
          </p>
        </motion.div>
      </div>
    </section>
  );
}
