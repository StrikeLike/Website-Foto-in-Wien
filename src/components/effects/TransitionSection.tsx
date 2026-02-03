"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface TransitionSectionProps {
  dark?: boolean;
  children: ReactNode;
  background?: ReactNode;
  className?: string;
  enableDoF?: boolean;
  enableScale?: boolean;
  enableParallax?: boolean;
  index?: number;
}

export function TransitionSection({
  dark = false,
  children,
  background,
  className = "",
  enableDoF = false,
  enableScale = true,
  enableParallax = true,
  index = 0,
}: TransitionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scale effect - section scales up as it enters
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    enableScale ? [0.95, 1, 1, 0.98] : [1, 1, 1, 1]
  );

  // Parallax for background (slower)
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    enableParallax ? ["8%", "-8%"] : ["0%", "0%"]
  );

  // Parallax for content (medium)
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    enableParallax ? ["20%", "-20%"] : ["0%", "0%"]
  );

  // Opacity for smooth entrance
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.5, 1, 1, 0.5]);

  // Depth of Field blur
  const blurFilter = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)"]
  );

  return (
    <motion.section
      ref={sectionRef}
      className={`relative overflow-hidden ${
        dark ? "bg-[#0a0a0a]" : "bg-white"
      } ${className}`}
      style={{ scale }}
    >
      {/* Background with parallax */}
      {background && (
        <motion.div
          className="absolute inset-0"
          style={{
            y: bgY,
            filter: enableDoF ? blurFilter : undefined,
          }}
        >
          {background}
        </motion.div>
      )}

      {/* Depth of Field: Far blur layer */}
      {enableDoF && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ filter: blurFilter }}
        >
          <div
            className={`absolute top-[15%] left-[10%] w-32 h-32 rounded-full ${
              dark ? "bg-white/5" : "bg-black/5"
            }`}
          />
          <div
            className={`absolute top-[60%] right-[15%] w-48 h-48 rounded-full ${
              dark ? "bg-white/3" : "bg-black/3"
            }`}
          />
          <div
            className={`absolute bottom-[20%] left-[20%] w-24 h-24 rounded-full ${
              dark ? "bg-white/4" : "bg-black/4"
            }`}
          />
        </motion.div>
      )}

      {/* Large watermark number */}
      {index > 0 && (
        <motion.div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
            dark ? "text-white/[0.02]" : "text-black/[0.02]"
          }`}
          style={{ y: contentY, opacity }}
        >
          <span className="text-[40vw] font-black leading-none select-none">
            {String(index).padStart(2, "0")}
          </span>
        </motion.div>
      )}

      {/* Content with parallax */}
      <motion.div className="relative z-10" style={{ y: contentY, opacity }}>
        {children}
      </motion.div>

      {/* Floating particles for DoF */}
      {enableDoF && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ filter: blurFilter }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                dark ? "bg-white/20" : "bg-black/20"
              }`}
              style={{ left: `${10 + i * 15}%`, top: `${15 + (i % 3) * 30}%` }}
              animate={{ y: [-10, 10, -10], opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}
