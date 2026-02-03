"use client";

import { motion } from "framer-motion";
import { useMouse } from "./MouseProvider";

// ============================================
// DARK BACKGROUNDS
// ============================================

export function ViewfinderDark() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Rule of thirds grid */}
      <motion.div
        className="absolute inset-[10%]"
        style={{ x: mouse.normalizedX * 5, y: mouse.normalizedY * 5 }}
      >
        <motion.div
          className="absolute left-1/3 top-0 w-[1px] h-full bg-white/20"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-2/3 top-0 w-[1px] h-full bg-white/20"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="absolute top-1/3 left-0 h-[1px] w-full bg-white/20"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-2/3 left-0 h-[1px] w-full bg-white/20"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </motion.div>

      {/* Center focus brackets */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32"
        style={{ x: mouse.normalizedX * 30, y: mouse.normalizedY * 30 }}
      >
        <motion.div
          className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white/50"
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-white/50"
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-white/50"
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white/50"
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/60"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Focus points */}
      {[
        { x: "25%", y: "35%", depth: 1.5 },
        { x: "75%", y: "35%", depth: 2 },
        { x: "25%", y: "65%", depth: 2.5 },
        { x: "75%", y: "65%", depth: 1 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4"
          style={{
            left: pos.x,
            top: pos.y,
            transform: "translate(-50%, -50%)",
            x: mouse.normalizedX * pos.depth * 20,
            y: mouse.normalizedY * pos.depth * 20,
          }}
        >
          <motion.div
            className="w-full h-full border border-white/30"
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      ))}

      {/* Bokeh orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`bokeh-${i}`}
          className="absolute rounded-full"
          style={{
            width: 150 + i * 50,
            height: 150 + i * 50,
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
            x: mouse.normalizedX * (i + 1) * 12,
            y: mouse.normalizedY * (i + 1) * 12,
          }}
          animate={{ y: [-20, 20, -20], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 12 + i * 2, delay: i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function SafeZonesDark() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Safe zone borders */}
      <motion.div
        className="absolute border border-dashed border-white/20"
        style={{
          left: "5%",
          right: "5%",
          top: "5%",
          bottom: "5%",
          x: mouse.normalizedX * 5,
          y: mouse.normalizedY * 5,
        }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute border border-white/30"
        style={{
          left: "10%",
          right: "10%",
          top: "10%",
          bottom: "10%",
          x: mouse.normalizedX * 8,
          y: mouse.normalizedY * 8,
        }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute border border-white/15"
        style={{
          left: "20%",
          right: "20%",
          top: "20%",
          bottom: "20%",
          x: mouse.normalizedX * 10,
          y: mouse.normalizedY * 10,
        }}
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Center crosshair */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ x: mouse.normalizedX * 15, y: mouse.normalizedY * 15 }}
      >
        <motion.div
          className="w-12 h-[1px] bg-white/30 absolute -left-6 top-0"
          animate={{ opacity: [0.2, 0.5, 0.2], scaleX: [0.8, 1.2, 0.8] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="h-12 w-[1px] bg-white/30 absolute left-0 -top-6"
          animate={{ opacity: [0.2, 0.5, 0.2], scaleY: [0.8, 1.2, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="absolute w-3 h-3 rounded-full border border-white/40 -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Glowing orbs */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          className="absolute rounded-full"
          style={{
            width: 200 + i * 80,
            height: 200 + i * 80,
            left: `${15 + i * 20}%`,
            top: `${20 + (i % 2) * 30}%`,
            background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
            x: mouse.normalizedX * (i + 1) * 10,
            y: mouse.normalizedY * (i + 1) * 10,
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ============================================
// LIGHT BACKGROUNDS
// ============================================

export function CameraGridLight() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Rule of thirds */}
      <motion.div
        className="absolute inset-[8%]"
        style={{ x: mouse.normalizedX * 5, y: mouse.normalizedY * 5 }}
      >
        <motion.div
          className="absolute left-1/3 top-0 w-[1px] h-full bg-black/20"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-2/3 top-0 w-[1px] h-full bg-black/20"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="absolute top-1/3 left-0 h-[1px] w-full bg-black/20"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-2/3 left-0 h-[1px] w-full bg-black/20"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </motion.div>

      {/* Focus brackets at intersections */}
      {[
        { x: "33%", y: "33%", depth: 1.5 },
        { x: "66%", y: "33%", depth: 2 },
        { x: "33%", y: "66%", depth: 2.5 },
        { x: "66%", y: "66%", depth: 1 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: pos.x,
            top: pos.y,
            transform: "translate(-50%, -50%)",
            x: mouse.normalizedX * pos.depth * 15,
            y: mouse.normalizedY * pos.depth * 15,
          }}
        >
          <motion.div
            className="w-10 h-10"
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-l-2 border-t-2 border-black/40" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-r-2 border-t-2 border-black/40" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-l-2 border-b-2 border-black/40" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-r-2 border-b-2 border-black/40" />
          </motion.div>
        </motion.div>
      ))}

      {/* Soft blobs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`blob-${i}`}
          className="absolute rounded-full"
          style={{
            width: 200 + i * 80,
            height: 200 + i * 80,
            left: `${-5 + i * 20}%`,
            top: `${10 + (i % 3) * 30}%`,
            background: "radial-gradient(circle, rgba(0,0,0,0.06) 0%, transparent 70%)",
            x: mouse.normalizedX * (i + 1) * 12,
            y: mouse.normalizedY * (i + 1) * 12,
          }}
          animate={{ y: [-20, 20, -20], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15 + i * 3, delay: i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function FocusFrameLight() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[
        { x: "30%", y: "35%", size: 100, delay: 0 },
        { x: "65%", y: "40%", size: 80, delay: 1 },
        { x: "45%", y: "60%", size: 120, delay: 2 },
        { x: "70%", y: "70%", size: 70, delay: 3 },
      ].map((frame, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: frame.x,
            top: frame.y,
            width: frame.size,
            height: frame.size,
            transform: "translate(-50%, -50%)",
            x: mouse.normalizedX * (i + 1) * 8,
            y: mouse.normalizedY * (i + 1) * 8,
          }}
        >
          <motion.div
            className="absolute inset-0 border-2 border-black/20"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, delay: frame.delay, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-black/40"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, delay: frame.delay + 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-black/40"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, delay: frame.delay + 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-black/40"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, delay: frame.delay + 0.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-black/40"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, delay: frame.delay + 0.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      ))}

      {/* Large soft gradients */}
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full"
        style={{
          left: "10%",
          top: "20%",
          background: "radial-gradient(circle, rgba(0,0,0,0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          right: "15%",
          bottom: "25%",
          background: "radial-gradient(circle, rgba(0,0,0,0.06) 0%, transparent 70%)",
        }}
        animate={{ scale: [1.1, 0.9, 1.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
    </div>
  );
}
