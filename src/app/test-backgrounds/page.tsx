'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useState, useEffect, useRef, createContext, useContext } from 'react';

// ============================================
// MOUSE TRACKING CONTEXT
// ============================================
const MouseContext = createContext({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });

function MouseProvider({ children }: { children: React.ReactNode }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
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
// PARALLAX WRAPPER COMPONENT
// ============================================
function ParallaxElement({
  children,
  depth = 1,
  className = '',
  style = {}
}: {
  children: React.ReactNode;
  depth?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const mouse = useMouse();
  const x = useSpring(mouse.normalizedX * depth * 30, { stiffness: 100, damping: 30 });
  const y = useSpring(mouse.normalizedY * depth * 30, { stiffness: 100, damping: 30 });

  useEffect(() => {
    x.set(mouse.normalizedX * depth * 30);
    y.set(mouse.normalizedY * depth * 30);
  }, [mouse.normalizedX, mouse.normalizedY, depth, x, y]);

  return (
    <motion.div className={className} style={{ ...style, x, y }}>
      {children}
    </motion.div>
  );
}

// ============================================
// DARK BACKGROUNDS
// ============================================

// 1. BOKEH - Dark (WITH MOUSE PARALLAX)
function BokehDark() {
  const mouse = useMouse();
  const circles = [
    { size: 400, x: '5%', y: '10%', delay: 0, duration: 15, opacity: 0.15, depth: 2 },
    { size: 300, x: '85%', y: '15%', delay: 2, duration: 18, opacity: 0.12, depth: 1.5 },
    { size: 250, x: '15%', y: '60%', delay: 1, duration: 20, opacity: 0.18, depth: 3 },
    { size: 350, x: '75%', y: '70%', delay: 3, duration: 16, opacity: 0.1, depth: 1 },
    { size: 200, x: '50%', y: '40%', delay: 0.5, duration: 22, opacity: 0.14, depth: 2.5 },
    { size: 280, x: '90%', y: '50%', delay: 4, duration: 19, opacity: 0.16, depth: 1.8 },
    { size: 180, x: '30%', y: '80%', delay: 2.5, duration: 21, opacity: 0.12, depth: 2.2 },
    { size: 320, x: '60%', y: '20%', delay: 1.5, duration: 17, opacity: 0.11, depth: 1.3 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {circles.map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: c.size, height: c.size, left: c.x, top: c.y,
            background: `radial-gradient(circle, rgba(255,255,255,${c.opacity}) 0%, rgba(255,255,255,0.02) 50%, transparent 70%)`,
            x: mouse.normalizedX * c.depth * 20,
            y: mouse.normalizedY * c.depth * 20,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// 2. LENS FLARE - Dark (WITH MOUSE TRACKING)
function LensFlareDark() {
  const mouse = useMouse();
  const flareCircles = [
    { x: '50%', y: '35%', size: 80, opacity: 0.25, depth: 1.5 },
    { x: '40%', y: '45%', size: 50, opacity: 0.2, depth: 2 },
    { x: '30%', y: '55%', size: 100, opacity: 0.15, depth: 2.5 },
    { x: '20%', y: '65%', size: 60, opacity: 0.3, depth: 3 },
    { x: '55%', y: '30%', size: 40, opacity: 0.2, depth: 1 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sun source - follows mouse slightly */}
      <motion.div
        className="absolute"
        style={{
          width: 120, height: 120, right: '15%', top: '18%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.3) 30%, transparent 60%)',
          x: mouse.normalizedX * 15,
          y: mouse.normalizedY * 15,
        }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Main anamorphic streak - reacts to mouse */}
      <motion.div
        className="absolute w-full h-[3px] top-[20%]"
        style={{
          background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.6) 50%, transparent 95%)',
          y: mouse.normalizedY * 10,
        }}
        animate={{ opacity: [0.3, 0.9, 0.3], scaleX: [0.7, 1.2, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Secondary streak */}
      <motion.div
        className="absolute w-[80%] h-[1px] left-[10%] top-[21%]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          y: mouse.normalizedY * 8,
        }}
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      {/* Flare circles - B&W only - with parallax */}
      {flareCircles.map((f, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: f.size, height: f.size, left: f.x, top: f.y,
            background: `radial-gradient(circle, rgba(255,255,255,${f.opacity}) 0%, rgba(255,255,255,${f.opacity * 0.3}) 50%, transparent 70%)`,
            x: mouse.normalizedX * f.depth * 25,
            y: mouse.normalizedY * f.depth * 25,
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3 + i * 0.5, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Lens dirt spots */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`dirt-${i}`}
          className="absolute rounded-full"
          style={{
            width: 15 + i * 3,
            height: 15 + i * 3,
            left: `${20 + i * 8}%`,
            top: `${20 + (i % 4) * 15}%`,
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            x: mouse.normalizedX * (i + 1) * 5,
            y: mouse.normalizedY * (i + 1) * 5,
          }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4 + i, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// 3. PARTICLES - Dark (WITH MOUSE PARALLAX)
function ParticlesDark() {
  const mouse = useMouse();
  const [particles] = useState(() =>
    Array.from({ length: 100 }, (_, i) => ({
      id: i, size: Math.random() * 4 + 2, x: Math.random() * 100, y: Math.random() * 100,
      duration: Math.random() * 15 + 10, delay: Math.random() * 5, opacity: Math.random() * 0.2 + 0.1,
      depth: Math.random() * 3 + 0.5,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`,
            x: mouse.normalizedX * p.depth * 15,
            y: mouse.normalizedY * p.depth * 15,
          }}
          animate={{ y: [-40, 40, -40], x: [-25, 25, -25], opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5], scale: [1, 1.5, 1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Glowing orbs - stronger mouse reaction */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: 15 + i * 3, height: 15 + i * 3, left: `${8 + i * 8}%`, top: `${20 + (i % 4) * 20}%`,
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
            x: mouse.normalizedX * (i + 1) * 8,
            y: mouse.normalizedY * (i + 1) * 8,
          }}
          animate={{ y: [-30, 30, -30], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 10 + i, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// 4. SPOTLIGHT - Dark (WITH MOUSE TRACKING)
function SpotlightDark() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Center glow - follows mouse */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 800, height: 800,
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, transparent 70%)',
          x: mouse.normalizedX * 80,
          y: mouse.normalizedY * 80,
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Sweeping beams */}
      <motion.div
        className="absolute top-0 h-full"
        style={{
          width: 500,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
          filter: 'blur(50px)',
          y: mouse.normalizedY * 30,
        }}
        animate={{ left: ['-30%', '130%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-0 h-full"
        style={{
          width: 350,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
          filter: 'blur(40px)',
          y: mouse.normalizedY * -20,
        }}
        animate={{ right: ['-20%', '120%'] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
      {/* Corner glows - react to mouse */}
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
          filter: 'blur(30px)',
          x: mouse.normalizedX * 40,
          y: mouse.normalizedY * 40,
        }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          filter: 'blur(30px)',
          x: mouse.normalizedX * -30,
          y: mouse.normalizedY * -30,
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  );
}

// 5. CAMERA VIEWFINDER - Dark (WITH MOUSE TRACKING)
function ViewfinderDark() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Rule of thirds grid - subtle mouse movement */}
      <motion.div
        className="absolute inset-[10%]"
        style={{
          x: mouse.normalizedX * 5,
          y: mouse.normalizedY * 5,
        }}
      >
        {/* Vertical lines */}
        <motion.div
          className="absolute left-1/3 top-0 w-[1px] h-full bg-white/20"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-2/3 top-0 w-[1px] h-full bg-white/20"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        {/* Horizontal lines */}
        <motion.div
          className="absolute top-1/3 left-0 h-[1px] w-full bg-white/20"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-2/3 left-0 h-[1px] w-full bg-white/20"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      </motion.div>

      {/* Center focus brackets - follows mouse */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32"
        style={{
          x: mouse.normalizedX * 30,
          y: mouse.normalizedY * 30,
        }}
      >
        {/* Corner brackets */}
        <motion.div
          className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white/50"
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-white/50"
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-white/50"
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white/50"
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
        {/* Center dot */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/60"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Secondary focus points - different parallax depths */}
      {[
        { x: '25%', y: '35%', depth: 1.5 }, { x: '75%', y: '35%', depth: 2 },
        { x: '25%', y: '65%', depth: 2.5 }, { x: '75%', y: '65%', depth: 1 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4"
          style={{
            left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)',
            x: mouse.normalizedX * pos.depth * 20,
            y: mouse.normalizedY * pos.depth * 20,
          }}
        >
          <motion.div
            className="w-full h-full border border-white/30"
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      ))}

      {/* Floating bokeh in background - strong parallax */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`bokeh-${i}`}
          className="absolute rounded-full"
          style={{
            width: 150 + i * 50,
            height: 150 + i * 50,
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
            x: mouse.normalizedX * (i + 1) * 12,
            y: mouse.normalizedY * (i + 1) * 12,
          }}
          animate={{ y: [-20, 20, -20], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 12 + i * 2, delay: i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// 6. APERTURE / IRIS - Dark (WITH MOUSE TRACKING)
function ApertureDark() {
  const mouse = useMouse();
  // Calculate rotation based on mouse position
  const mouseRotation = (mouse.normalizedX + mouse.normalizedY) * 15;

  return (
    <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
      {/* Aperture blades - rotate with mouse */}
      <motion.div
        className="relative w-[500px] h-[500px]"
        style={{
          rotate: mouseRotation,
        }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 origin-bottom"
            style={{
              width: 150,
              height: 250,
              marginLeft: -75,
              marginTop: -250,
              transform: `rotate(${i * 45}deg)`,
            }}
          >
            <motion.div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(to top, rgba(255,255,255,0.08), transparent 60%)',
                clipPath: 'polygon(30% 100%, 70% 100%, 55% 0%, 45% 0%)',
              }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        ))}
        {/* Center opening - follows mouse */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/20"
          style={{
            width: 120, height: 120,
            x: mouse.normalizedX * 20,
            y: mouse.normalizedY * 20,
          }}
          animate={{ scale: [1, 1.2, 0.9, 1], opacity: [0.3, 0.6, 0.4, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
          style={{
            width: 180, height: 180,
            x: mouse.normalizedX * 15,
            y: mouse.normalizedY * 15,
          }}
          animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </motion.div>

      {/* Floating particles - parallax layers */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute w-1 h-1 rounded-full bg-white"
          style={{
            left: `${10 + (i * 4) % 80}%`,
            top: `${10 + (i * 5) % 80}%`,
            x: mouse.normalizedX * (i % 5 + 1) * 8,
            y: mouse.normalizedY * (i % 5 + 1) * 8,
          }}
          animate={{ opacity: [0.1, 0.4, 0.1], y: [-20, 20, -20] }}
          transition={{ duration: 8 + i * 0.3, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// 7. FOCUS PULL - Dark (NOU!)
function FocusPullDark() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Blurred background circles (out of focus) */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`blur-${i}`}
          className="absolute rounded-full"
          style={{
            width: 200 + i * 60,
            height: 200 + i * 60,
            left: `${5 + i * 12}%`,
            top: `${10 + (i % 4) * 22}%`,
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
          animate={{
            filter: ['blur(20px)', 'blur(5px)', 'blur(20px)'],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8 + i, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Sharp focus area (center) */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 300, height: 300 }}
      >
        {/* Focus ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/30"
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border border-white/20"
          animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        {/* Sharp particles inside */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`sharp-${i}`}
            className="absolute w-3 h-3 rounded-full bg-white/40"
            style={{
              left: `${30 + (i % 3) * 20}%`,
              top: `${30 + Math.floor(i / 3) * 30}%`,
            }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>

      {/* Depth markers */}
      <motion.div
        className="absolute left-4 top-1/2 -translate-y-1/2 w-1 h-40 bg-gradient-to-b from-transparent via-white/30 to-transparent"
        animate={{ height: ['30%', '50%', '30%'], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// 8. FILM STRIP - Dark (NOU!)
function FilmStripDark() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Top film strip */}
      <motion.div
        className="absolute top-8 left-0 w-full h-16 flex items-center"
        animate={{ x: ['-10%', '0%', '-10%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {[...Array(12)].map((_, i) => (
          <div key={`top-${i}`} className="flex-shrink-0 mx-4">
            {/* Sprocket holes */}
            <div className="flex gap-2 mb-1">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="w-2 h-3 rounded-sm bg-white/20" />
              ))}
            </div>
            {/* Frame */}
            <motion.div
              className="w-20 h-14 border border-white/20 bg-white/5"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
            />
            <div className="flex gap-2 mt-1">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="w-2 h-3 rounded-sm bg-white/20" />
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Bottom film strip */}
      <motion.div
        className="absolute bottom-8 left-0 w-full h-16 flex items-center"
        animate={{ x: ['0%', '-10%', '0%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        {[...Array(12)].map((_, i) => (
          <div key={`bot-${i}`} className="flex-shrink-0 mx-4">
            <div className="flex gap-2 mb-1">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="w-2 h-3 rounded-sm bg-white/15" />
              ))}
            </div>
            <motion.div
              className="w-20 h-14 border border-white/15 bg-white/3"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 4, delay: i * 0.3, repeat: Infinity }}
            />
            <div className="flex gap-2 mt-1">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="w-2 h-3 rounded-sm bg-white/15" />
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Center bokeh */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`c-${i}`}
          className="absolute rounded-full"
          style={{
            width: 200 + i * 50,
            height: 200 + i * 50,
            left: `${20 + i * 12}%`,
            top: `${30 + (i % 2) * 15}%`,
            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
          }}
          animate={{ y: [-15, 15, -15], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10 + i * 2, delay: i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// 9. SMOKE - Dark (WITH MOUSE TRACKING)
function SmokeDark() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Smoke clouds - drift with mouse */}
      {[...Array(7)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 350 + i * 120,
            height: 250 + i * 60,
            left: `${-15 + i * 18}%`,
            top: `${15 + (i % 3) * 25}%`,
            background: `radial-gradient(ellipse, rgba(255,255,255,${0.06 + i * 0.015}) 0%, transparent 70%)`,
            filter: 'blur(40px)',
            x: mouse.normalizedX * (i + 1) * 15,
            y: mouse.normalizedY * (i + 1) * 10,
          }}
          animate={{
            x: i % 2 === 0 ? [0, 120, 0] : [0, -120, 0],
            y: [-30, 30, -30],
            scale: [1, 1.25, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 12 + i * 3, delay: i * 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Ambient glow - follows mouse */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%)',
          x: mouse.normalizedX * 50,
          y: mouse.normalizedY * 50,
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Small floating particles in smoke - multi-layer parallax */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute w-1 h-1 rounded-full bg-white/20"
          style={{
            left: `${10 + i * 6}%`,
            top: `${20 + (i % 4) * 15}%`,
            x: mouse.normalizedX * (i % 4 + 1) * 10,
            y: mouse.normalizedY * (i % 4 + 1) * 10,
          }}
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 6 + i * 0.3, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ============================================
// LIGHT BACKGROUNDS
// ============================================

// 1. GRADIENT BLOBS - Light (WITH MOUSE PARALLAX)
function GradientBlobsLight() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          left: '-10%', top: '-20%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.08) 50%, transparent 75%)',
          x: mouse.normalizedX * 40,
          y: mouse.normalizedY * 40,
        }}
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          right: '-5%', top: '30%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 50%, transparent 75%)',
          x: mouse.normalizedX * -30,
          y: mouse.normalizedY * -30,
        }}
        animate={{ x: [0, -80, 0], y: [0, -40, 0], scale: [1.1, 0.9, 1.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full"
        style={{
          left: '30%', bottom: '-10%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.06) 50%, transparent 75%)',
          x: mouse.normalizedX * 50,
          y: mouse.normalizedY * 50,
        }}
        animate={{ x: [-50, 50, -50], y: [0, -60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
      {/* Extra blob for more presence */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          left: '50%', top: '40%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.04) 50%, transparent 70%)',
          x: mouse.normalizedX * 60,
          y: mouse.normalizedY * 60,
        }}
        animate={{ x: [-60, 60, -60], y: [-30, 30, -30], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>
  );
}

// 2. GEOMETRIC SHAPES - Light (VISIBILITY INCREASED)
function GeometricLight() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Floating squares */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`sq-${i}`}
          className="absolute border-2 border-black/25"
          style={{
            width: 80 + i * 30, height: 80 + i * 30,
            left: `${10 + i * 15}%`, top: `${15 + (i % 3) * 25}%`,
          }}
          animate={{ rotate: [0, 90, 180, 270, 360], y: [-20, 20, -20], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 20 + i * 3, delay: i * 0.5, repeat: Infinity, ease: 'linear' }}
        />
      ))}
      {/* Floating circles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`circ-${i}`}
          className="absolute rounded-full border-2 border-black/30"
          style={{
            width: 60 + i * 40, height: 60 + i * 40,
            right: `${5 + i * 12}%`, bottom: `${10 + i * 15}%`,
          }}
          animate={{ scale: [1, 1.2, 1], y: [-30, 30, -30], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 15 + i * 2, delay: i * 0.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Diagonal lines */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-[2px] bg-black/20"
          style={{ width: 200 + i * 50, left: `${20 + i * 20}%`, top: `${30 + i * 15}%`, transformOrigin: 'left center' }}
          animate={{ rotate: [30 + i * 10, 40 + i * 10, 30 + i * 10], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 12 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Extra filled shapes */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`fill-${i}`}
          className="absolute bg-black/8 rounded-lg"
          style={{
            width: 100 + i * 40, height: 100 + i * 40,
            left: `${15 + i * 30}%`, top: `${50 + (i % 2) * 20}%`,
          }}
          animate={{ rotate: [0, 45, 0], scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 15 + i * 3, delay: i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// 3. CAMERA GRID - Light (WITH MOUSE PARALLAX)
function CameraGridLight() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main rule of thirds grid - subtle mouse movement */}
      <motion.div
        className="absolute inset-[8%]"
        style={{
          x: mouse.normalizedX * 5,
          y: mouse.normalizedY * 5,
        }}
      >
        <motion.div
          className="absolute left-1/3 top-0 w-[1px] h-full bg-black/30"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-2/3 top-0 w-[1px] h-full bg-black/30"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.div
          className="absolute top-1/3 left-0 h-[1px] w-full bg-black/30"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-2/3 left-0 h-[1px] w-full bg-black/30"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      </motion.div>

      {/* Focus brackets at intersections - follow mouse with parallax */}
      {[
        { x: '33%', y: '33%', depth: 1.5 }, { x: '66%', y: '33%', depth: 2 },
        { x: '33%', y: '66%', depth: 2.5 }, { x: '66%', y: '66%', depth: 1 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)',
            x: mouse.normalizedX * pos.depth * 15,
            y: mouse.normalizedY * pos.depth * 15,
          }}
        >
          <motion.div
            className="w-12 h-12"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-black/50" />
            <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-black/50" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-black/50" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-black/50" />
          </motion.div>
        </motion.div>
      ))}

      {/* Center crosshair - follows mouse */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouse.normalizedX * 25,
          y: mouse.normalizedY * 25,
        }}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-[2px] bg-black/40 absolute -left-3 top-0" />
        <div className="h-6 w-[2px] bg-black/40 absolute left-0 -top-3" />
      </motion.div>

      {/* Bokeh blobs - strong parallax */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`blob-${i}`}
          className="absolute rounded-full"
          style={{
            width: 200 + i * 80,
            height: 200 + i * 80,
            left: `${-5 + i * 20}%`,
            top: `${10 + (i % 3) * 30}%`,
            background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, transparent 70%)',
            x: mouse.normalizedX * (i + 1) * 12,
            y: mouse.normalizedY * (i + 1) * 12,
          }}
          animate={{ y: [-30, 30, -30], x: [-20, 20, -20], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 15 + i * 3, delay: i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// 4. FOCUS FRAME - Light (VISIBILITY INCREASED)
function FocusFrameLight() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Multiple focus frames */}
      {[
        { x: '30%', y: '35%', size: 120, delay: 0 },
        { x: '65%', y: '40%', size: 100, delay: 1 },
        { x: '45%', y: '60%', size: 140, delay: 2 },
        { x: '70%', y: '70%', size: 90, delay: 3 },
        { x: '25%', y: '55%', size: 110, delay: 1.5 },
      ].map((frame, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: frame.x, top: frame.y,
            width: frame.size, height: frame.size,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Outer frame */}
          <motion.div
            className="absolute inset-0 border-2 border-black/30"
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, delay: frame.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Corner accents */}
          <motion.div
            className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-black/50"
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3, delay: frame.delay + 0.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-black/50"
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3, delay: frame.delay + 0.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-black/50"
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3, delay: frame.delay + 0.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-black/50"
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3, delay: frame.delay + 0.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Center dot */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black/40"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, delay: frame.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      ))}

      {/* Background gradient blobs */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{ left: '10%', top: '20%', background: 'radial-gradient(circle, rgba(0,0,0,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full"
        style={{ right: '15%', bottom: '25%', background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, transparent 70%)' }}
        animate={{ scale: [1.1, 0.9, 1.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </div>
  );
}

// 5. DEPTH OF FIELD - Light (VISIBILITY INCREASED)
function DepthOfFieldLight() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Blurred foreground elements */}
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full -left-20 top-1/4"
        style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)', filter: 'blur(30px)' }}
        animate={{ x: [-20, 20, -20], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full -right-10 bottom-1/4"
        style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.08) 40%, transparent 70%)', filter: 'blur(25px)' }}
        animate={{ x: [20, -20, 20], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Sharp center area */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80">
        {/* Focus indicator ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-black/30"
          animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border border-black/20"
          animate={{ scale: [1.02, 0.98, 1.02], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        {/* Inner details */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-5 h-5 rounded-full bg-black/20"
            style={{ left: `${25 + (i % 3) * 25}%`, top: `${30 + Math.floor(i / 3) * 35}%` }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Blurred background elements */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`bg-${i}`}
          className="absolute rounded-full"
          style={{
            width: 120 + i * 50,
            height: 120 + i * 50,
            left: `${15 + i * 25}%`,
            top: `${60 + (i % 2) * 20}%`,
            background: 'radial-gradient(circle, rgba(0,0,0,0.15) 0%, transparent 70%)',
            filter: 'blur(15px)',
          }}
          animate={{ y: [-15, 15, -15], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10 + i * 2, delay: i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// 6. LENS BOKEH - Light (VISIBILITY INCREASED)
function LensBokehLight() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[
        { size: 350, x: '5%', y: '10%', opacity: 0.22 },
        { size: 280, x: '70%', y: '5%', opacity: 0.18 },
        { size: 400, x: '80%', y: '60%', opacity: 0.25 },
        { size: 320, x: '15%', y: '70%', opacity: 0.2 },
        { size: 250, x: '50%', y: '40%', opacity: 0.22 },
        { size: 300, x: '30%', y: '20%', opacity: 0.16 },
        { size: 220, x: '60%', y: '30%', opacity: 0.18 },
      ].map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: c.size, height: c.size, left: c.x, top: c.y,
            background: `radial-gradient(circle, rgba(0,0,0,${c.opacity}) 0%, rgba(0,0,0,${c.opacity * 0.4}) 40%, transparent 75%)`,
          }}
          animate={{ y: [-40, 40, -40], x: [-30, 30, -30], scale: [1, 1.15, 1] }}
          transition={{ duration: 18 + i * 2, delay: i * 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute w-3 h-3 rounded-full bg-black/30"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ scale: [0, 1.8, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: 3, delay: Math.random() * 5, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

// 7. SHUTTER - Light (VISIBILITY INCREASED)
function ShutterLight() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Shutter blades effect */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2"
          style={{
            width: 500,
            height: 80,
            marginLeft: -250,
            marginTop: -40,
            background: 'linear-gradient(90deg, transparent 10%, rgba(0,0,0,0.15) 50%, transparent 90%)',
            transformOrigin: 'center',
            transform: `rotate(${i * 22.5}deg)`,
          }}
          animate={{
            rotate: [i * 22.5, i * 22.5 + 15, i * 22.5],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 8, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Center aperture rings */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-black/25"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-black/15"
        animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      {/* Inner ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-black/20"
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Corner focus indicators */}
      {[
        { x: '15%', y: '20%' }, { x: '85%', y: '20%' },
        { x: '15%', y: '80%' }, { x: '85%', y: '80%' },
      ].map((pos, i) => (
        <motion.div
          key={`corner-${i}`}
          className="absolute w-16 h-16"
          style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
        >
          <motion.div
            className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-black/40"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-black/40"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, delay: i * 0.4 + 0.1, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-black/40"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, delay: i * 0.4 + 0.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-black/40"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, delay: i * 0.4 + 0.3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      ))}

      {/* Background blobs */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full -left-20 top-20"
        style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full -right-10 bottom-20"
        style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1.1, 0.95, 1.1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </div>
  );
}

// 8. LIGHT RAYS - Light (VISIBILITY INCREASED)
function RaysLight() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Light source */}
      <motion.div
        className="absolute w-48 h-48 rounded-full"
        style={{ right: '8%', top: '8%', background: 'radial-gradient(circle, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)' }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Main rays */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute origin-top-right"
          style={{
            width: 4, height: '160%', right: '12%', top: '12%',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 30%, transparent 80%)',
            transform: `rotate(${i * 18 - 80}deg)`,
          }}
          animate={{ opacity: [0.3, 0.7, 0.3], scaleY: [0.85, 1.05, 0.85] }}
          transition={{ duration: 4 + i * 0.5, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Secondary thinner rays */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`thin-${i}`}
          className="absolute origin-top-right"
          style={{
            width: 2, height: '140%', right: '14%', top: '14%',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.15), transparent 70%)',
            transform: `rotate(${i * 30 - 60}deg)`,
          }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5 + i, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Dust particles */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute w-2 h-2 rounded-full bg-black/25"
          style={{ left: `${35 + Math.random() * 55}%`, top: `${Math.random() * 70}%` }}
          animate={{ y: [0, 120], x: [0, -40], opacity: [0.6, 0], scale: [1, 0.5] }}
          transition={{ duration: 5 + Math.random() * 4, delay: Math.random() * 6, repeat: Infinity, ease: 'linear' }}
        />
      ))}
      {/* Background gradient */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{ right: '-10%', top: '-10%', background: 'radial-gradient(circle, rgba(0,0,0,0.08) 0%, transparent 60%)' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// ============================================
// COMBINED BACKGROUNDS
// ============================================

function CombinedDark() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <BokehDark />
      <ParticlesDark />
      <motion.div
        className="absolute w-20 h-20 rounded-full"
        style={{ right: '25%', top: '20%', background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Anamorphic streak */}
      <motion.div
        className="absolute w-[70%] h-[2px] left-[15%] top-[22%]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
        animate={{ opacity: [0.2, 0.6, 0.2], scaleX: [0.8, 1.1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function CombinedLight() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <GradientBlobsLight />
      <CameraGridLight />
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
      {/* DARK 1 - Bokeh */}
      <Section dark title="Bokeh" subtitle="Cercuri mari cu blur floating - efect fotografic clasic">
        <BokehDark />
      </Section>

      {/* LIGHT 1 - Gradient Blobs */}
      <Section dark={false} title="Gradient Blobs" subtitle="Forme mari animate cu gradient - vizibil și elegant">
        <GradientBlobsLight />
      </Section>

      {/* DARK 2 - Lens Flare (B&W) */}
      <Section dark title="Lens Flare" subtitle="Efecte de lens flare cu anamorphic streaks - doar B&W">
        <LensFlareDark />
      </Section>

      {/* LIGHT 2 - Camera Grid */}
      <Section dark={false} title="Camera Grid" subtitle="Rule of thirds cu focus brackets la intersecții">
        <CameraGridLight />
      </Section>

      {/* DARK 3 - Particles */}
      <Section dark title="Particles" subtitle="100+ particule animate cu glowing orbs">
        <ParticlesDark />
      </Section>

      {/* LIGHT 3 - Focus Frame */}
      <Section dark={false} title="Focus Frame" subtitle="Multiple focus frames cu corner accents">
        <FocusFrameLight />
      </Section>

      {/* DARK 4 - Spotlight */}
      <Section dark title="Spotlight" subtitle="Spotlight-uri smooth cu sweeping beams">
        <SpotlightDark />
      </Section>

      {/* LIGHT 4 - Depth of Field */}
      <Section dark={false} title="Depth of Field" subtitle="Efect de adâncime de câmp cu blur foreground/background">
        <DepthOfFieldLight />
      </Section>

      {/* DARK 5 - Viewfinder */}
      <Section dark title="Viewfinder" subtitle="Camera viewfinder cu rule of thirds și focus brackets">
        <ViewfinderDark />
      </Section>

      {/* LIGHT 5 - Geometric */}
      <Section dark={false} title="Geometric" subtitle="Forme geometrice floating - pătrate, cercuri, linii">
        <GeometricLight />
      </Section>

      {/* DARK 6 - Aperture */}
      <Section dark title="Aperture" subtitle="Diafragmă de cameră cu blade animation">
        <ApertureDark />
      </Section>

      {/* LIGHT 6 - Lens Bokeh */}
      <Section dark={false} title="Lens Bokeh" subtitle="Cercuri bokeh mari cu sparkles">
        <LensBokehLight />
      </Section>

      {/* DARK 7 - Focus Pull */}
      <Section dark title="Focus Pull" subtitle="Efect de focus pull cu blur dinamic">
        <FocusPullDark />
      </Section>

      {/* LIGHT 7 - Shutter */}
      <Section dark={false} title="Shutter" subtitle="Efect de shutter blades cu focus indicators">
        <ShutterLight />
      </Section>

      {/* DARK 8 - Film Strip */}
      <Section dark title="Film Strip" subtitle="Benzi de film animate cu sprocket holes">
        <FilmStripDark />
      </Section>

      {/* LIGHT 8 - Light Rays */}
      <Section dark={false} title="Light Rays" subtitle="Raze de lumină cu particule de praf">
        <RaysLight />
      </Section>

      {/* DARK 9 - Smoke */}
      <Section dark title="Smoke" subtitle="Efect de fum / ceață în mișcare pe fundal întunecat">
        <SmokeDark />
      </Section>

      {/* DARK 10 - Combined */}
      <Section dark title="Combined Dark" subtitle="Bokeh + Particles + Lens Flare cu anamorphic streak">
        <CombinedDark />
      </Section>

      {/* LIGHT 10 - Combined */}
      <Section dark={false} title="Combined Light" subtitle="Gradient Blobs + Camera Grid - elegant și fotografic">
        <CombinedLight />
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
          <span>20 efecte fotografice cu interactivitate mouse</span>
        </div>
      </motion.div>
    </main>
    </MouseProvider>
  );
}
