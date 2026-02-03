"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TransitionSectionProps {
  dark?: boolean;
  children: ReactNode;
  background?: ReactNode;
  className?: string;
  index?: number;
}

export function TransitionSection({
  dark = false,
  children,
  background,
  className = "",
  index = 0,
}: TransitionSectionProps) {
  return (
    <section
      className={`relative overflow-hidden ${
        dark ? "bg-[#0a0a0a]" : "bg-white"
      } ${className}`}
    >
      {/* Background */}
      {background && (
        <div className="absolute inset-0">
          {background}
        </div>
      )}

      {/* Large watermark number */}
      {index > 0 && (
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
            dark ? "text-white/[0.02]" : "text-black/[0.02]"
          }`}
        >
          <span className="text-[40vw] font-black leading-none select-none">
            {String(index).padStart(2, "0")}
          </span>
        </div>
      )}

      {/* Content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
