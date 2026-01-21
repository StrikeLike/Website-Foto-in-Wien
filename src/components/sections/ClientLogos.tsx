"use client";

import { motion } from "framer-motion";

const clients = [
  { name: "TU Wien", logo: "/images/clients/tu-wien.svg" },
  { name: "Autonom Health", logo: "/images/clients/autonom-health.svg" },
  { name: "Gerstner", logo: "/images/clients/gerstner.svg" },
  { name: "V-Suit", logo: "/images/clients/v-suit.svg" },
  { name: "Hope for the Future", logo: "/images/clients/hope-future.svg" },
];

export function ClientLogos() {
  return (
    <section className="py-16 border-y border-border">
      <div className="container px-4 md:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-text-secondary uppercase tracking-wider mb-8"
        >
          Vertrauen von fuhrenden Unternehmen
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              {/* Placeholder for logo - will be replaced with actual logos */}
              <div className="h-12 flex items-center justify-center px-4">
                <span className="text-lg font-medium text-text-secondary">
                  {client.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
