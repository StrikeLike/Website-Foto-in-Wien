'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, createContext, useContext, useRef } from 'react';

// ============================================
// MOUSE TRACKING CONTEXT
// ============================================
const MouseContext = createContext({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });

function MouseProvider({ children }: { children: React.ReactNode }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x: e.clientX, y: e.clientY, normalizedX, normalizedY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <MouseContext.Provider value={mousePos}>{children}</MouseContext.Provider>;
}

function useMouse() {
  return useContext(MouseContext);
}

// ============================================
// DARK BACKGROUNDS
// ============================================

// Viewfinder - Dark
function ViewfinderDark() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-[10%]" style={{ x: mouse.normalizedX * 5, y: mouse.normalizedY * 5 }}>
        <motion.div className="absolute left-1/3 top-0 w-[1px] h-full bg-white/20" animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute left-2/3 top-0 w-[1px] h-full bg-white/20" animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
        <motion.div className="absolute top-1/3 left-0 h-[1px] w-full bg-white/20" animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
        <motion.div className="absolute top-2/3 left-0 h-[1px] w-full bg-white/20" animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} />
      </motion.div>

      <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32" style={{ x: mouse.normalizedX * 30, y: mouse.normalizedY * 30 }}>
        <motion.div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white/50" animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-white/50" animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }} />
        <motion.div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-white/50" animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }} />
        <motion.div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white/50" animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }} />
        <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/60" animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} />
      </motion.div>

      {[{ x: '25%', y: '35%', depth: 1.5 }, { x: '75%', y: '35%', depth: 2 }, { x: '25%', y: '65%', depth: 2.5 }, { x: '75%', y: '65%', depth: 1 }].map((pos, i) => (
        <motion.div key={i} className="absolute w-4 h-4" style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)', x: mouse.normalizedX * pos.depth * 20, y: mouse.normalizedY * pos.depth * 20 }}>
          <motion.div className="w-full h-full border border-white/30" animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.1, 0.9] }} transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }} />
        </motion.div>
      ))}

      {[...Array(6)].map((_, i) => (
        <motion.div key={`bokeh-${i}`} className="absolute rounded-full" style={{ width: 150 + i * 50, height: 150 + i * 50, left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 25}%`, background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', x: mouse.normalizedX * (i + 1) * 12, y: mouse.normalizedY * (i + 1) * 12 }}
          animate={{ y: [-20, 20, -20], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 12 + i * 2, delay: i, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  );
}

// Perspective Grid - Dark
function PerspectiveGridDark() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute w-4 h-4 rounded-full border-2 border-white/40"
        style={{ left: '50%', top: '40%', transform: 'translate(-50%, -50%)', x: mouse.normalizedX * 20, y: mouse.normalizedY * 20 }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-[1px] origin-left"
          style={{
            width: '150%', left: '50%', top: '40%',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
            transform: `rotate(${(i * 30) - 180}deg)`,
            x: mouse.normalizedX * 5, y: mouse.normalizedY * 5,
          }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {[20, 35, 50, 65, 80].map((top, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-[10%] right-[10%] h-[1px] bg-white/15"
          style={{ top: `${top}%`, x: mouse.normalizedX * (5 - i) * 3, y: mouse.normalizedY * (5 - i) * 3 }}
          animate={{ opacity: [0.1, 0.3, 0.1], scaleX: [0.9, 1, 0.9] }}
          transition={{ duration: 5, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute w-1 h-1 rounded-full bg-white/30"
          style={{ left: `${20 + i * 8}%`, top: `${30 + (i % 3) * 15}%`, x: mouse.normalizedX * (i + 1) * 8, y: mouse.normalizedY * (i + 1) * 8 }}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6 + i, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// Safe Zones - Dark
function SafeZonesDark() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute border border-dashed border-white/20" style={{ left: '5%', right: '5%', top: '5%', bottom: '5%', x: mouse.normalizedX * 5, y: mouse.normalizedY * 5 }} animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute border border-white/30" style={{ left: '10%', right: '10%', top: '10%', bottom: '10%', x: mouse.normalizedX * 8, y: mouse.normalizedY * 8 }} animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
      <motion.div className="absolute border border-white/15" style={{ left: '20%', right: '20%', top: '20%', bottom: '20%', x: mouse.normalizedX * 10, y: mouse.normalizedY * 10 }} animate={{ opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />

      <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ x: mouse.normalizedX * 15, y: mouse.normalizedY * 15 }}>
        <motion.div className="w-12 h-[1px] bg-white/30 absolute -left-6 top-0" animate={{ opacity: [0.2, 0.5, 0.2], scaleX: [0.8, 1.2, 0.8] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.div className="h-12 w-[1px] bg-white/30 absolute left-0 -top-6" animate={{ opacity: [0.2, 0.5, 0.2], scaleY: [0.8, 1.2, 0.8] }} transition={{ duration: 3, repeat: Infinity, delay: 0.2 }} />
        <motion.div className="absolute w-3 h-3 rounded-full border border-white/40 -translate-x-1/2 -translate-y-1/2" animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
      </motion.div>

      {[...Array(4)].map((_, i) => (
        <motion.div key={`glow-${i}`} className="absolute rounded-full" style={{ width: 200 + i * 80, height: 200 + i * 80, left: `${15 + i * 20}%`, top: `${20 + (i % 2) * 30}%`, background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', x: mouse.normalizedX * (i + 1) * 10, y: mouse.normalizedY * (i + 1) * 10 }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  );
}

// ============================================
// LIGHT BACKGROUNDS
// ============================================

// Golden Spiral - Light
function GoldenSpiralLight() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none"
        style={{ x: mouse.normalizedX * 10, y: mouse.normalizedY * 10 }}>
        <motion.path
          d="M 100,0 L 100,100 L 0,100 L 0,38.2 A 38.2,38.2 0 0 1 38.2,0 L 100,0"
          fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="0.3"
          animate={{ pathLength: [0, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 38.2,0 A 23.6,23.6 0 0 1 61.8,23.6"
          fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="0.3"
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 4, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.svg>

      {[
        { w: 61.8, h: 61.8, x: 38.2, y: 38.2 },
        { w: 38.2, h: 38.2, x: 0, y: 61.8 },
        { w: 23.6, h: 23.6, x: 0, y: 38.2 },
        { w: 14.6, h: 14.6, x: 23.6, y: 38.2 },
      ].map((rect, i) => (
        <motion.div
          key={i}
          className="absolute border border-black/20"
          style={{
            width: `${rect.w}%`, height: `${rect.h}%`,
            left: `${rect.x}%`, top: `${rect.y}%`,
            x: mouse.normalizedX * (i + 1) * 5,
            y: mouse.normalizedY * (i + 1) * 5,
          }}
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: 6 + i, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {[
        { x: '38.2%', y: '38.2%' },
        { x: '61.8%', y: '38.2%' },
        { x: '38.2%', y: '61.8%' },
        { x: '61.8%', y: '61.8%' },
      ].map((pos, i) => (
        <motion.div
          key={`fp-${i}`}
          className="absolute w-4 h-4 rounded-full border-2 border-black/30"
          style={{
            left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)',
            x: mouse.normalizedX * 15,
            y: mouse.normalizedY * 15,
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`bg-${i}`}
          className="absolute rounded-full"
          style={{
            width: 300 + i * 100, height: 300 + i * 100,
            left: `${10 + i * 20}%`, top: `${20 + i * 10}%`,
            background: 'radial-gradient(circle, rgba(0,0,0,0.08) 0%, transparent 70%)',
            x: mouse.normalizedX * (i + 1) * 10,
            y: mouse.normalizedY * (i + 1) * 10,
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// Camera Grid - Light
function CameraGridLight() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-[8%]" style={{ x: mouse.normalizedX * 5, y: mouse.normalizedY * 5 }}>
        <motion.div className="absolute left-1/3 top-0 w-[1px] h-full bg-black/30" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute left-2/3 top-0 w-[1px] h-full bg-black/30" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
        <motion.div className="absolute top-1/3 left-0 h-[1px] w-full bg-black/30" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
        <motion.div className="absolute top-2/3 left-0 h-[1px] w-full bg-black/30" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} />
      </motion.div>

      {[{ x: '33%', y: '33%', depth: 1.5 }, { x: '66%', y: '33%', depth: 2 }, { x: '33%', y: '66%', depth: 2.5 }, { x: '66%', y: '66%', depth: 1 }].map((pos, i) => (
        <motion.div key={i} className="absolute" style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)', x: mouse.normalizedX * pos.depth * 15, y: mouse.normalizedY * pos.depth * 15 }}>
          <motion.div className="w-12 h-12" animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}>
            <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-black/50" />
            <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-black/50" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-black/50" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-black/50" />
          </motion.div>
        </motion.div>
      ))}

      <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ x: mouse.normalizedX * 25, y: mouse.normalizedY * 25 }} animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="w-6 h-[2px] bg-black/40 absolute -left-3 top-0" />
        <div className="h-6 w-[2px] bg-black/40 absolute left-0 -top-3" />
      </motion.div>

      {[...Array(5)].map((_, i) => (
        <motion.div key={`blob-${i}`} className="absolute rounded-full" style={{ width: 200 + i * 80, height: 200 + i * 80, left: `${-5 + i * 20}%`, top: `${10 + (i % 3) * 30}%`, background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, transparent 70%)', x: mouse.normalizedX * (i + 1) * 12, y: mouse.normalizedY * (i + 1) * 12 }}
          animate={{ y: [-30, 30, -30], x: [-20, 20, -20], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 15 + i * 3, delay: i, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  );
}

// Focus Frame - Light
function FocusFrameLight() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[
        { x: '30%', y: '35%', size: 120, delay: 0 },
        { x: '65%', y: '40%', size: 100, delay: 1 },
        { x: '45%', y: '60%', size: 140, delay: 2 },
        { x: '70%', y: '70%', size: 90, delay: 3 },
        { x: '25%', y: '55%', size: 110, delay: 1.5 },
      ].map((frame, i) => (
        <motion.div key={i} className="absolute" style={{ left: frame.x, top: frame.y, width: frame.size, height: frame.size, transform: 'translate(-50%, -50%)', x: mouse.normalizedX * (i + 1) * 8, y: mouse.normalizedY * (i + 1) * 8 }}>
          <motion.div className="absolute inset-0 border-2 border-black/30" animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 4, delay: frame.delay, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-black/50" animate={{ opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 3, delay: frame.delay + 0.2, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-black/50" animate={{ opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 3, delay: frame.delay + 0.4, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-black/50" animate={{ opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 3, delay: frame.delay + 0.6, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-black/50" animate={{ opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 3, delay: frame.delay + 0.8, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black/40" animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, delay: frame.delay, repeat: Infinity, ease: 'easeInOut' }} />
        </motion.div>
      ))}

      <motion.div className="absolute w-[400px] h-[400px] rounded-full" style={{ left: '10%', top: '20%', background: 'radial-gradient(circle, rgba(0,0,0,0.12) 0%, transparent 70%)' }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute w-[350px] h-[350px] rounded-full" style={{ right: '15%', bottom: '25%', background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, transparent 70%)' }} animate={{ scale: [1.1, 0.9, 1.1] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }} />
    </div>
  );
}

// Dynamic Symmetry - Light
function DynamicSymmetryLight() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute w-[1px] h-[141%] bg-black/20 origin-top-left" style={{ left: 0, top: 0, transform: 'rotate(45deg)', x: mouse.normalizedX * 5, y: mouse.normalizedY * 5 }} animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute w-[1px] h-[141%] bg-black/20 origin-top-right" style={{ right: 0, top: 0, transform: 'rotate(-45deg)', x: mouse.normalizedX * -5, y: mouse.normalizedY * 5 }} animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />

      {[
        { x1: 0, y1: 0, x2: 100, y2: 61.8 },
        { x1: 0, y1: 38.2, x2: 100, y2: 100 },
        { x1: 100, y1: 0, x2: 0, y2: 61.8 },
        { x1: 100, y1: 38.2, x2: 0, y2: 100 },
      ].map((line, i) => (
        <motion.svg key={`baroque-${i}`} className="absolute inset-0 w-full h-full" style={{ x: mouse.normalizedX * 8, y: mouse.normalizedY * 8 }}>
          <motion.line x1={`${line.x1}%`} y1={`${line.y1}%`} x2={`${line.x2}%`} y2={`${line.y2}%`} stroke="rgba(0,0,0,0.15)" strokeWidth="1" strokeDasharray="8 4" animate={{ opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 6, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }} />
        </motion.svg>
      ))}

      {[
        { x: '38.2%', y: '38.2%' }, { x: '61.8%', y: '38.2%' },
        { x: '38.2%', y: '61.8%' }, { x: '61.8%', y: '61.8%' },
        { x: '50%', y: '50%' },
      ].map((pos, i) => (
        <motion.div key={`point-${i}`} className="absolute" style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)', x: mouse.normalizedX * 15, y: mouse.normalizedY * 15 }}>
          <motion.div className={`${i === 4 ? 'w-6 h-6' : 'w-4 h-4'} rounded-full border-2 border-black/30`} animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }} />
          {i === 4 && (
            <motion.div className="absolute inset-0 flex items-center justify-center" animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
              <div className="w-3 h-[1px] bg-black/30" />
            </motion.div>
          )}
        </motion.div>
      ))}

      {[...Array(3)].map((_, i) => (
        <motion.div key={`bg-${i}`} className="absolute rounded-full" style={{ width: 300 + i * 100, height: 300 + i * 100, left: `${20 + i * 25}%`, top: `${25 + i * 15}%`, background: 'radial-gradient(circle, rgba(0,0,0,0.08) 0%, transparent 70%)', x: mouse.normalizedX * (i + 1) * 12, y: mouse.normalizedY * (i + 1) * 12 }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 12 + i * 2, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  );
}

// Center Weighted - Light
function CenterWeightedLight() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
      {[...Array(8)].map((_, i) => (
        <motion.div key={`ring-${i}`} className="absolute rounded-full border" style={{ width: 60 + i * 70, height: 60 + i * 70, borderColor: `rgba(0,0,0,${0.25 - i * 0.025})`, borderWidth: i === 0 ? 2 : 1, borderStyle: i % 2 === 0 ? 'solid' : 'dashed', x: mouse.normalizedX * (8 - i) * 4, y: mouse.normalizedY * (8 - i) * 4 }} animate={{ scale: [1, 1.02, 1], opacity: [0.3 + (7 - i) * 0.05, 0.5 + (7 - i) * 0.05, 0.3 + (7 - i) * 0.05] }} transition={{ duration: 4 + i * 0.5, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }} />
      ))}

      <motion.div className="absolute w-8 h-8 rounded-full border-2 border-black/40" style={{ x: mouse.normalizedX * 20, y: mouse.normalizedY * 20 }} animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute w-2 h-2 rounded-full bg-black/50" style={{ x: mouse.normalizedX * 25, y: mouse.normalizedY * 25 }} animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />

      {[...Array(8)].map((_, i) => (
        <motion.div key={`radial-${i}`} className="absolute w-[1px] h-[35%] bg-black/15 origin-bottom" style={{ bottom: '50%', left: '50%', marginLeft: -0.5, transform: `rotate(${i * 45}deg)` }} animate={{ opacity: [0.1, 0.25, 0.1], scaleY: [0.9, 1.1, 0.9] }} transition={{ duration: 5, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  );
}

// ============================================
// SECTION COMPONENT
// ============================================
interface HomeSectionProps {
  dark: boolean;
  children: React.ReactNode;
  className?: string;
}

function HomeSection({ dark, children, className = '' }: HomeSectionProps) {
  return (
    <section className={`relative min-h-screen ${dark ? 'bg-[#0a0a0a]' : 'bg-white'} ${className}`}>
      {children}
    </section>
  );
}

// ============================================
// SCROLL PROGRESS
// ============================================
function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white/80 to-white/40 z-[200] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

// ============================================
// MAIN PAGE - HOME SIMULATION
// ============================================
export default function TestHomePage() {
  return (
    <MouseProvider>
      <main className="relative">
        <ScrollProgress />

        {/* ====== SECTION 1: HERO (DARK) ====== */}
        <HomeSection dark={true} className="flex items-center justify-center">
          <ViewfinderDark />

          {/* Hero Content */}
          <div className="relative z-10 text-center text-white px-4">
            <motion.p
              className="text-xs uppercase tracking-[0.5em] text-white/40 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Professionelle Fotografie in Wien
            </motion.p>
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Alexandru Bogdan
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Business, Event & Portrait Fotografie mit 20+ Jahren Erfahrung
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all">
                Portfolio ansehen
              </button>
              <button className="px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all">
                Kontakt aufnehmen
              </button>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-2 bg-white/50 rounded-full"
                animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </HomeSection>

        {/* ====== SECTION 2: SERVICES (LIGHT) ====== */}
        <HomeSection dark={false} className="flex items-center justify-center py-32">
          <GoldenSpiralLight />

          <div className="relative z-10 container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-black/40 mb-4">Leistungen</p>
              <h2 className="text-4xl md:text-6xl font-bold text-[#0a0a0a] mb-6">Meine Services</h2>
              <p className="text-lg text-black/50 max-w-2xl mx-auto">
                Professionelle Fotografie für jeden Anlass in Wien
              </p>
            </motion.div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {['Business', 'Event', 'Portrait', 'Produkt', 'Food', 'Familie'].map((service, i) => (
                <motion.div
                  key={service}
                  className="group p-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-black/5 hover:bg-white/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mb-6 group-hover:bg-black/10 transition-colors">
                    <i className="fa-solid fa-camera text-black/40" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#0a0a0a] mb-2">{service}fotografie</h3>
                  <p className="text-black/50 text-sm">Professionelle {service.toLowerCase()} Aufnahmen in Wien</p>
                </motion.div>
              ))}
            </div>
          </div>
        </HomeSection>

        {/* ====== SECTION 3: FEATURED PORTFOLIO (DARK) ====== */}
        <HomeSection dark={true} className="flex items-center justify-center py-32">
          <PerspectiveGridDark />

          <div className="relative z-10 container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-4">Portfolio</p>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Ausgewählte Arbeiten</h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                Eine Auswahl meiner besten Projekte aus Wien
              </p>
            </motion.div>

            {/* Portfolio Grid Placeholder */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="aspect-[4/5] rounded-2xl bg-white/5 border border-white/10 overflow-hidden group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
                    <span className="text-white/20 text-sm">Projekt {i + 1}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </HomeSection>

        {/* ====== SECTION 4: TESTIMONIALS (LIGHT) ====== */}
        <HomeSection dark={false} className="flex items-center justify-center py-32">
          <CameraGridLight />

          <div className="relative z-10 container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-black/40 mb-4">Kundenstimmen</p>
              <h2 className="text-4xl md:text-6xl font-bold text-[#0a0a0a] mb-6">Was Kunden sagen</h2>
            </motion.div>

            {/* Testimonial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { name: 'TU Wien', text: 'Hervorragende Zusammenarbeit bei unserem Corporate Event.' },
                { name: 'Autonom Health', text: 'Professionelle Produktfotos die unsere Marke perfekt repräsentieren.' },
                { name: 'V-Suit', text: 'Kreative Businessportraits die unsere Führungsriege ins beste Licht setzen.' },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  className="p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-black/5"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <i key={j} className="fa-solid fa-star text-yellow-500 text-sm" />
                    ))}
                  </div>
                  <p className="text-black/60 mb-6">&ldquo;{testimonial.text}&rdquo;</p>
                  <p className="font-semibold text-[#0a0a0a]">{testimonial.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </HomeSection>

        {/* ====== SECTION 5: ABOUT TEASER (DARK) ====== */}
        <HomeSection dark={true} className="flex items-center justify-center py-32">
          <SafeZonesDark />

          <div className="relative z-10 container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              {/* Image Placeholder */}
              <motion.div
                className="aspect-[4/5] rounded-3xl bg-white/5 border border-white/10 overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
                  <span className="text-white/20">Portrait</span>
                </div>
              </motion.div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-4">Über mich</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Alexandru Bogdan</h2>
                <p className="text-lg text-white/50 mb-6">
                  Mit über 20 Jahren Erfahrung in der Fotografie bringe ich Ihre Vision zum Leben.
                  Mein Studio in Wien ist der perfekte Ort für professionelle Aufnahmen.
                </p>
                <p className="text-white/40 mb-8">
                  Spezialisiert auf Business, Event und Portrait Fotografie arbeite ich mit
                  führenden Unternehmen in Wien zusammen.
                </p>
                <button className="px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all">
                  Mehr erfahren
                </button>
              </motion.div>
            </div>
          </div>
        </HomeSection>

        {/* ====== SECTION 6: CTA (LIGHT) ====== */}
        <HomeSection dark={false} className="flex items-center justify-center py-32">
          <FocusFrameLight />

          <div className="relative z-10 text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-black/40 mb-4">Bereit zu starten?</p>
              <h2 className="text-4xl md:text-6xl font-bold text-[#0a0a0a] mb-6">
                Lassen Sie uns zusammenarbeiten
              </h2>
              <p className="text-lg text-black/50 max-w-2xl mx-auto mb-10">
                Kontaktieren Sie mich für ein unverbindliches Beratungsgespräch
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-[#0a0a0a] text-white font-semibold rounded-full hover:bg-black/80 transition-all">
                  <i className="fa-solid fa-envelope mr-2" />
                  Kontakt aufnehmen
                </button>
                <button className="px-8 py-4 border border-black/20 text-[#0a0a0a] font-semibold rounded-full hover:bg-black/5 transition-all">
                  <i className="fa-solid fa-phone mr-2" />
                  Anrufen
                </button>
              </div>
            </motion.div>
          </div>
        </HomeSection>

        {/* ====== SECTION 7: FOOTER (DARK) ====== */}
        <HomeSection dark={true} className="py-20">
          <DynamicSymmetryLight />
          <div className="absolute inset-0 bg-[#0a0a0a]/95" />

          <div className="relative z-10 container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              {/* Logo */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Foto in Wien</h3>
                <p className="text-white/40 text-sm">
                  Professionelle Fotografie für Business, Events und Portraits in Wien.
                </p>
              </div>

              {/* Links */}
              <div>
                <h4 className="text-white font-semibold mb-4">Navigation</h4>
                <ul className="space-y-2 text-white/40 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Startseite</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Portfolio</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Leistungen</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Kontakt</a></li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-white font-semibold mb-4">Leistungen</h4>
                <ul className="space-y-2 text-white/40 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Businessfotografie</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Eventfotografie</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Portraitfotografie</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Produktfotografie</a></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-white font-semibold mb-4">Kontakt</h4>
                <ul className="space-y-2 text-white/40 text-sm">
                  <li>Wien, Österreich</li>
                  <li>info@fotoinwien.at</li>
                  <li>+43 123 456 789</li>
                </ul>
                <div className="flex gap-4 mt-4">
                  <a href="#" className="text-white/40 hover:text-white transition-colors">
                    <i className="fa-brands fa-instagram text-xl" />
                  </a>
                  <a href="#" className="text-white/40 hover:text-white transition-colors">
                    <i className="fa-brands fa-facebook text-xl" />
                  </a>
                  <a href="#" className="text-white/40 hover:text-white transition-colors">
                    <i className="fa-brands fa-whatsapp text-xl" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/30 text-sm">
                © 2026 Foto in Wien. Alle Rechte vorbehalten.
              </p>
              <div className="flex gap-6 text-white/30 text-sm">
                <a href="#" className="hover:text-white transition-colors">Impressum</a>
                <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
              </div>
            </div>
          </div>
        </HomeSection>

        {/* Fixed Navigation Label */}
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="px-6 py-3 bg-black/80 backdrop-blur-md rounded-full text-white text-sm flex items-center gap-3 border border-white/10">
            <i className="fa-solid fa-home" />
            <span>Homepage Test - Alternating Backgrounds</span>
          </div>
        </motion.div>
      </main>
    </MouseProvider>
  );
}
