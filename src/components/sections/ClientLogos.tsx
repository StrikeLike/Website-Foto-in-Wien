"use client";

import { motion } from "framer-motion";
import { TransitionSection, ViewfinderDark } from "@/components/effects";

const clients = [
  { name: "TU Wien", icon: "fa-solid fa-graduation-cap" },
  { name: "Autonom Health", icon: "fa-solid fa-heart-pulse" },
  { name: "Gerstner", icon: "fa-solid fa-utensils" },
  { name: "V-Suit", icon: "fa-solid fa-shirt" },
  { name: "Hope for the Future", icon: "fa-solid fa-hands-holding-heart" },
];

export function ClientLogos() {
  return (
    <TransitionSection dark={true} background={<ViewfinderDark />} index={2}>
      <div className="py-24 md:py-32">
        <div className="container px-4 md:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center"
            >
              <i className="fa-solid fa-handshake text-2xl text-white/70" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-tight">
              Vertrauen von fuhrenden Unternehmen
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Stolze Zusammenarbeit mit renommierten Institutionen und Marken aus Wien
            </p>
          </motion.div>

          {/* Client Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center h-full flex flex-col items-center justify-center gap-4 hover:bg-white/[0.08] transition-all duration-500 group-hover:scale-[1.02]">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center group-hover:bg-white/[0.1] transition-colors">
                    <i className={`${client.icon} text-xl text-white/50 group-hover:text-white/80 transition-colors`} />
                  </div>
                  <span className="text-sm md:text-base font-medium text-gray-300 group-hover:text-white transition-colors">
                    {client.name}
                  </span>
                  <div className="w-8 h-[2px] bg-white/10 group-hover:w-12 group-hover:bg-white/30 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 pt-12 border-t border-white/[0.05]"
          >
            {[
              { value: "50+", label: "Firmenkunden" },
              { value: "500+", label: "Projekte" },
              { value: "100%", label: "Zufriedenheit" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-semibold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </TransitionSection>
  );
}
