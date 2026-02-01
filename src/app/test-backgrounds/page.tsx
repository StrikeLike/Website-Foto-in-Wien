'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, createContext, useContext } from 'react';

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
// ORIGINAL BACKGROUNDS (KEPT)
// ============================================

// 1. GOLDEN SPIRAL - Fibonacci composition
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

// 2. CAMERA GRID - Rule of thirds
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

// 3. VIEWFINDER - Dark
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

// 4. FOCUS FRAME - Light
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

// ============================================
// NEW GRID BACKGROUNDS
// ============================================

// 5. PERSPECTIVE GRID - Vanishing point composition (DARK)
function PerspectiveGridDark() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Vanishing point */}
      <motion.div
        className="absolute w-4 h-4 rounded-full border-2 border-white/40"
        style={{
          left: '50%', top: '40%', transform: 'translate(-50%, -50%)',
          x: mouse.normalizedX * 20, y: mouse.normalizedY * 20,
        }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Converging lines from vanishing point */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30) - 180;
        return (
          <motion.div
            key={`line-${i}`}
            className="absolute h-[1px] origin-left"
            style={{
              width: '150%',
              left: '50%', top: '40%',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
              transform: `rotate(${angle}deg)`,
              x: mouse.normalizedX * 5, y: mouse.normalizedY * 5,
            }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        );
      })}

      {/* Horizontal depth lines */}
      {[20, 35, 50, 65, 80].map((top, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-[10%] right-[10%] h-[1px] bg-white/15"
          style={{ top: `${top}%`, x: mouse.normalizedX * (5 - i) * 3, y: mouse.normalizedY * (5 - i) * 3 }}
          animate={{ opacity: [0.1, 0.3, 0.1], scaleX: [0.9, 1, 0.9] }}
          transition={{ duration: 5, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Corner depth markers */}
      {[
        { x: '15%', y: '25%' }, { x: '85%', y: '25%' },
        { x: '10%', y: '75%' }, { x: '90%', y: '75%' },
      ].map((pos, i) => (
        <motion.div
          key={`corner-${i}`}
          className="absolute w-8 h-8"
          style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)', x: mouse.normalizedX * (i + 1) * 10, y: mouse.normalizedY * (i + 1) * 10 }}
        >
          <motion.div
            className={`absolute ${i < 2 ? 'top-0' : 'bottom-0'} ${i % 2 === 0 ? 'left-0' : 'right-0'} w-4 h-4 ${i < 2 ? (i % 2 === 0 ? 'border-l border-t' : 'border-r border-t') : (i % 2 === 0 ? 'border-l border-b' : 'border-r border-b')} border-white/30`}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      ))}

      {/* Floating depth particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute w-1 h-1 rounded-full bg-white/30"
          style={{
            left: `${20 + i * 8}%`, top: `${30 + (i % 3) * 15}%`,
            x: mouse.normalizedX * (i + 1) * 8, y: mouse.normalizedY * (i + 1) * 8,
          }}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6 + i, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// 6. DYNAMIC SYMMETRY - Baroque diagonal composition (LIGHT)
function DynamicSymmetryLight() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main diagonals */}
      <motion.div
        className="absolute w-[1px] h-[141%] bg-black/20 origin-top-left"
        style={{ left: 0, top: 0, transform: 'rotate(45deg)', x: mouse.normalizedX * 5, y: mouse.normalizedY * 5 }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[1px] h-[141%] bg-black/20 origin-top-right"
        style={{ right: 0, top: 0, transform: 'rotate(-45deg)', x: mouse.normalizedX * -5, y: mouse.normalizedY * 5 }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Reciprocal lines (baroque diagonals) */}
      {[
        { x1: 0, y1: 0, x2: 100, y2: 61.8 },
        { x1: 0, y1: 38.2, x2: 100, y2: 100 },
        { x1: 100, y1: 0, x2: 0, y2: 61.8 },
        { x1: 100, y1: 38.2, x2: 0, y2: 100 },
      ].map((line, i) => (
        <motion.svg key={`baroque-${i}`} className="absolute inset-0 w-full h-full" style={{ x: mouse.normalizedX * 8, y: mouse.normalizedY * 8 }}>
          <motion.line
            x1={`${line.x1}%`} y1={`${line.y1}%`} x2={`${line.x2}%`} y2={`${line.y2}%`}
            stroke="rgba(0,0,0,0.15)" strokeWidth="1" strokeDasharray="8 4"
            animate={{ opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 6, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.svg>
      ))}

      {/* Golden ratio intersection points */}
      {[
        { x: '38.2%', y: '38.2%' }, { x: '61.8%', y: '38.2%' },
        { x: '38.2%', y: '61.8%' }, { x: '61.8%', y: '61.8%' },
        { x: '50%', y: '50%' },
      ].map((pos, i) => (
        <motion.div
          key={`point-${i}`}
          className="absolute"
          style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)', x: mouse.normalizedX * 15, y: mouse.normalizedY * 15 }}
        >
          <motion.div
            className={`${i === 4 ? 'w-6 h-6' : 'w-4 h-4'} rounded-full border-2 border-black/30`}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          />
          {i === 4 && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-3 h-[1px] bg-black/30" />
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Sinister and dexter indicators */}
      <motion.div
        className="absolute left-[5%] top-1/2 -translate-y-1/2 text-[10px] text-black/20 font-mono tracking-widest rotate-[-90deg]"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        SINISTER
      </motion.div>
      <motion.div
        className="absolute right-[5%] top-1/2 -translate-y-1/2 text-[10px] text-black/20 font-mono tracking-widest rotate-90"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
      >
        DEXTER
      </motion.div>

      {/* Background gradients */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`bg-${i}`}
          className="absolute rounded-full"
          style={{
            width: 300 + i * 100, height: 300 + i * 100,
            left: `${20 + i * 25}%`, top: `${25 + i * 15}%`,
            background: 'radial-gradient(circle, rgba(0,0,0,0.08) 0%, transparent 70%)',
            x: mouse.normalizedX * (i + 1) * 12, y: mouse.normalizedY * (i + 1) * 12,
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// 7. SAFE ZONES - Film/TV safe areas (DARK)
function SafeZonesDark() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Action Safe (90%) */}
      <motion.div
        className="absolute border border-dashed border-white/20"
        style={{
          left: '5%', right: '5%', top: '5%', bottom: '5%',
          x: mouse.normalizedX * 5, y: mouse.normalizedY * 5,
        }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Title Safe (80%) */}
      <motion.div
        className="absolute border border-white/30"
        style={{
          left: '10%', right: '10%', top: '10%', bottom: '10%',
          x: mouse.normalizedX * 8, y: mouse.normalizedY * 8,
        }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Center safe (60%) */}
      <motion.div
        className="absolute border border-white/15"
        style={{
          left: '20%', right: '20%', top: '20%', bottom: '20%',
          x: mouse.normalizedX * 10, y: mouse.normalizedY * 10,
        }}
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Corner brackets for action safe */}
      {[
        { x: '5%', y: '5%', rotate: 0 },
        { x: '95%', y: '5%', rotate: 90 },
        { x: '95%', y: '95%', rotate: 180 },
        { x: '5%', y: '95%', rotate: 270 },
      ].map((corner, i) => (
        <motion.div
          key={`action-${i}`}
          className="absolute w-8 h-8"
          style={{
            left: corner.x, top: corner.y,
            transform: `translate(-50%, -50%) rotate(${corner.rotate}deg)`,
            x: mouse.normalizedX * 5, y: mouse.normalizedY * 5,
          }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-[2px] bg-white/30"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-0 left-0 w-[2px] h-full bg-white/30"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
          />
        </motion.div>
      ))}

      {/* Labels */}
      <motion.div
        className="absolute top-[6%] left-1/2 -translate-x-1/2 text-[9px] text-white/30 font-mono tracking-widest"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        ACTION SAFE 90%
      </motion.div>
      <motion.div
        className="absolute top-[11%] left-1/2 -translate-x-1/2 text-[9px] text-white/40 font-mono tracking-widest"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.3 }}
      >
        TITLE SAFE 80%
      </motion.div>

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

      {/* Aspect ratio indicators */}
      <motion.div
        className="absolute bottom-[6%] right-[6%] text-[9px] text-white/30 font-mono"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        16:9
      </motion.div>

      {/* Background glow */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          className="absolute rounded-full"
          style={{
            width: 200 + i * 80, height: 200 + i * 80,
            left: `${15 + i * 20}%`, top: `${20 + (i % 2) * 30}%`,
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
            x: mouse.normalizedX * (i + 1) * 10, y: mouse.normalizedY * (i + 1) * 10,
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// 8. CENTER WEIGHTED - Metering pattern (LIGHT)
function CenterWeightedLight() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
      {/* Concentric circles - metering zones */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border"
          style={{
            width: 60 + i * 70, height: 60 + i * 70,
            borderColor: `rgba(0,0,0,${0.25 - i * 0.025})`,
            borderWidth: i === 0 ? 2 : 1,
            borderStyle: i % 2 === 0 ? 'solid' : 'dashed',
            x: mouse.normalizedX * (8 - i) * 4,
            y: mouse.normalizedY * (8 - i) * 4,
          }}
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.3 + (7 - i) * 0.05, 0.5 + (7 - i) * 0.05, 0.3 + (7 - i) * 0.05],
          }}
          transition={{ duration: 4 + i * 0.5, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Center spot */}
      <motion.div
        className="absolute w-8 h-8 rounded-full border-2 border-black/40"
        style={{ x: mouse.normalizedX * 20, y: mouse.normalizedY * 20 }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-black/50"
        style={{ x: mouse.normalizedX * 25, y: mouse.normalizedY * 25 }}
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Radial lines */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`radial-${i}`}
          className="absolute w-[1px] h-[35%] bg-black/15 origin-bottom"
          style={{
            bottom: '50%', left: '50%', marginLeft: -0.5,
            transform: `rotate(${i * 45}deg)`,
          }}
          animate={{ opacity: [0.1, 0.25, 0.1], scaleY: [0.9, 1.1, 0.9] }}
          transition={{ duration: 5, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Zone labels */}
      {[
        { text: 'CENTER', distance: 0 },
        { text: '60%', distance: 100 },
        { text: '40%', distance: 180 },
        { text: '20%', distance: 260 },
      ].map((zone, i) => (
        <motion.div
          key={`label-${i}`}
          className="absolute text-[8px] text-black/30 font-mono tracking-wider"
          style={{
            left: '50%', top: '50%',
            transform: `translate(-50%, ${-zone.distance / 2 - 20}px)`,
          }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, delay: i * 0.3, repeat: Infinity }}
        >
          {zone.text}
        </motion.div>
      ))}

      {/* Metering mode indicator */}
      <motion.div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 px-4 py-2 border border-black/20 rounded-full"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <span className="text-[10px] text-black/40 font-mono tracking-widest">CENTER-WEIGHTED METERING</span>
      </motion.div>

      {/* Corner weights */}
      {[
        { x: '15%', y: '15%' }, { x: '85%', y: '15%' },
        { x: '15%', y: '85%' }, { x: '85%', y: '85%' },
      ].map((pos, i) => (
        <motion.div
          key={`weight-${i}`}
          className="absolute text-[10px] text-black/25 font-mono"
          style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)', x: mouse.normalizedX * 10, y: mouse.normalizedY * 10 }}
          animate={{ opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 4, delay: i * 0.3, repeat: Infinity }}
        >
          10%
        </motion.div>
      ))}

      {/* Background soft gradients */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.02) 40%, transparent 70%)',
          x: mouse.normalizedX * 30, y: mouse.normalizedY * 30,
        }}
      />
    </div>
  );
}

// ============================================
// SECTION COMPONENT
// ============================================
function Section({ dark, title, subtitle, children }: { dark: boolean; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${dark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      {children}
      <div className={`relative z-10 text-center px-4 ${dark ? 'text-white' : 'text-[#0a0a0a]'}`}>
        <p className={`text-sm uppercase tracking-widest mb-4 ${dark ? 'text-white/50' : 'text-black/40'}`}>
          {dark ? 'Dark Background' : 'Light Background'}
        </p>
        <h2 className="text-5xl md:text-7xl font-semibold mb-4">{title}</h2>
        <p className={`max-w-md mx-auto ${dark ? 'text-white/60' : 'text-black/60'}`}>{subtitle}</p>
      </div>
    </section>
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function TestBackgroundsPage() {
  return (
    <MouseProvider>
    <main className="min-h-screen">
      {/* 1. Golden Spiral */}
      <Section dark={false} title="Golden Spiral" subtitle="Fibonacci composition - regula de aur în fotografie">
        <GoldenSpiralLight />
      </Section>

      {/* 2. Camera Grid */}
      <Section dark={false} title="Camera Grid" subtitle="Rule of thirds cu focus brackets la intersecții">
        <CameraGridLight />
      </Section>

      {/* 3. Viewfinder */}
      <Section dark title="Viewfinder" subtitle="Camera viewfinder cu rule of thirds și focus brackets">
        <ViewfinderDark />
      </Section>

      {/* 4. Focus Frame */}
      <Section dark={false} title="Focus Frame" subtitle="Multiple focus frames cu corner accents">
        <FocusFrameLight />
      </Section>

      {/* 5. Perspective Grid (NEW) */}
      <Section dark title="Perspective Grid" subtitle="Vanishing point composition cu linii convergente">
        <PerspectiveGridDark />
      </Section>

      {/* 6. Dynamic Symmetry (NEW) */}
      <Section dark={false} title="Dynamic Symmetry" subtitle="Baroque diagonals - compoziție clasică de artă">
        <DynamicSymmetryLight />
      </Section>

      {/* 7. Safe Zones (NEW) */}
      <Section dark title="Safe Zones" subtitle="Film & TV safe areas - action safe, title safe">
        <SafeZonesDark />
      </Section>

      {/* 8. Center Weighted (NEW) */}
      <Section dark={false} title="Center Weighted" subtitle="Metering pattern - zone concentrice de expunere">
        <CenterWeightedLight />
      </Section>

      {/* Navigation */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="px-6 py-3 bg-black/80 backdrop-blur-md rounded-full text-white text-sm flex items-center gap-3">
          <i className="fa-solid fa-camera" />
          <span>8 grid-uri fotografice cu interactivitate mouse</span>
        </div>
      </motion.div>
    </main>
    </MouseProvider>
  );
}
