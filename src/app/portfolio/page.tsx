"use client";

import { motion } from "framer-motion";
import { Header, Footer } from "@/components/layout";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { projects } from "@/data/portfolio";
import { useMouse } from "@/context/MouseContext";

// ============================================
// BACKGROUND — Viewfinder (same as homepage)
// ============================================
function ViewfinderBg() {
  const mouse = useMouse();
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-[10%]"
        style={{ x: mouse.normalizedX * 5, y: mouse.normalizedY * 5 }}
      >
        {[1/3, 2/3].map((p, i) => (
          <motion.div
            key={`v${i}`}
            className="absolute top-0 w-[1px] h-full bg-white/20"
            style={{ left: `${p * 100}%` }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
        {[1/3, 2/3].map((p, i) => (
          <motion.div
            key={`h${i}`}
            className="absolute left-0 h-[1px] w-full bg-white/20"
            style={{ top: `${p * 100}%` }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 + i * 0.5 }}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32"
        style={{ x: mouse.normalizedX * 30, y: mouse.normalizedY * 30 }}
      >
        {[
          "top-0 left-0 border-l-2 border-t-2",
          "top-0 right-0 border-r-2 border-t-2",
          "bottom-0 left-0 border-l-2 border-b-2",
          "bottom-0 right-0 border-r-2 border-b-2",
        ].map((c, i) => (
          <motion.div
            key={i}
            className={`absolute w-6 h-6 ${c} border-white/50`}
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/60"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 120 + i * 60,
            height: 120 + i * 60,
            left: `${15 + i * 16}%`,
            top: `${20 + (i % 3) * 25}%`,
            background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
            x: mouse.normalizedX * (i + 1) * 10,
            y: mouse.normalizedY * (i + 1) * 10,
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10 + i * 2, delay: i, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

// ============================================
// BACKGROUND — Focus Frames
// ============================================
function FocusFrameBg() {
  const mouse = useMouse();
  const frames = [
    { x: "25%", y: "30%", size: 90, delay: 0 },
    { x: "70%", y: "35%", size: 70, delay: 1 },
    { x: "40%", y: "65%", size: 110, delay: 2 },
    { x: "75%", y: "65%", size: 60, delay: 3 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {frames.map((f, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: f.x,
            top: f.y,
            width: f.size,
            height: f.size,
            transform: "translate(-50%,-50%)",
            x: mouse.normalizedX * (i + 1) * 8,
            y: mouse.normalizedY * (i + 1) * 8,
          }}
        >
          <motion.div
            className="absolute inset-0 border-2 border-white/30"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4, delay: f.delay, repeat: Infinity }}
          />
          {[
            "-top-1 -left-1 border-l-2 border-t-2",
            "-top-1 -right-1 border-r-2 border-t-2",
            "-bottom-1 -left-1 border-l-2 border-b-2",
            "-bottom-1 -right-1 border-r-2 border-b-2",
          ].map((c, j) => (
            <motion.div
              key={j}
              className={`absolute w-3 h-3 ${c} border-white/50`}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, delay: f.delay + j * 0.2, repeat: Infinity }}
            />
          ))}
        </motion.div>
      ))}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          left: "5%",
          top: "15%",
          background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          right: "10%",
          bottom: "20%",
          background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
        animate={{ scale: [1.1, 0.9, 1.1] }}
        transition={{ duration: 17, repeat: Infinity, delay: 3 }}
      />
    </div>
  );
}

// ============================================
// PAGE
// ============================================
export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main className="pt-20 bg-[#0a0a0a]">

        {/* ========== HERO ========== */}
        <section className="relative overflow-hidden bg-[#0a0a0a]">
          <ViewfinderBg />

          <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto py-20 md:py-28"
            >
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-6 text-white">
                Portfolio
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                Eine Auswahl meiner Arbeiten aus den Bereichen Business, Event, Portrait und Produktfotografie in Wien. Jedes Projekt erzählt eine einzigartige Geschichte.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ========== GRID ========== */}
        <section className="relative pb-16 md:pb-24 bg-[#0a0a0a]">
          <FocusFrameBg />
          <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl">
            <PortfolioGrid projects={projects} />
          </div>
        </section>

        {/* ========== CTA ========== */}
        <section className="relative py-24 overflow-hidden bg-[#0a0a0a]">
          <ViewfinderBg />

          <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="bg-white/[0.06] border border-white/10 backdrop-blur-xl rounded-3xl p-10 md:p-14">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-white/[0.05]">
                  <i className="fa-solid fa-camera text-2xl text-white/50" />
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
                  Möchten Sie Ihr Projekt besprechen?
                </h2>
                <p className="text-gray-400 mb-8 text-lg">
                  Ich freue mich auf Ihre Anfrage und berate Sie gerne zu Ihrem Fotoprojekt.
                </p>
                <a
                  href="/kontakt/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors"
                >
                  Projekt anfragen
                  <i className="fa-solid fa-arrow-right" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
