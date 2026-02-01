'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect, createContext, useContext, useRef, ReactNode } from 'react';

// ============================================
// MOUSE TRACKING CONTEXT
// ============================================
const MouseContext = createContext({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });

function MouseProvider({ children }: { children: ReactNode }) {
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
// GRID BACKGROUNDS (Simplified for parallax)
// ============================================

function GoldenSpiralLight() {
  const mouse = useMouse();
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ x: mouse.normalizedX * 10, y: mouse.normalizedY * 10 }}>
        <motion.path d="M 100,0 L 100,100 L 0,100 L 0,38.2 A 38.2,38.2 0 0 1 38.2,0 L 100,0" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="0.3" />
      </motion.svg>
      {[{ w: 61.8, h: 61.8, x: 38.2, y: 38.2 }, { w: 38.2, h: 38.2, x: 0, y: 61.8 }, { w: 23.6, h: 23.6, x: 0, y: 38.2 }].map((rect, i) => (
        <motion.div key={i} className="absolute border border-black/15" style={{ width: `${rect.w}%`, height: `${rect.h}%`, left: `${rect.x}%`, top: `${rect.y}%`, x: mouse.normalizedX * (i + 1) * 5, y: mouse.normalizedY * (i + 1) * 5 }} />
      ))}
      {[{ x: '38.2%', y: '38.2%' }, { x: '61.8%', y: '38.2%' }, { x: '38.2%', y: '61.8%' }, { x: '61.8%', y: '61.8%' }].map((pos, i) => (
        <motion.div key={`fp-${i}`} className="absolute w-3 h-3 rounded-full border-2 border-black/20" style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)', x: mouse.normalizedX * 15, y: mouse.normalizedY * 15 }} />
      ))}
    </div>
  );
}

function CameraGridLight() {
  const mouse = useMouse();
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-[8%]" style={{ x: mouse.normalizedX * 5, y: mouse.normalizedY * 5 }}>
        <div className="absolute left-1/3 top-0 w-[1px] h-full bg-black/20" />
        <div className="absolute left-2/3 top-0 w-[1px] h-full bg-black/20" />
        <div className="absolute top-1/3 left-0 h-[1px] w-full bg-black/20" />
        <div className="absolute top-2/3 left-0 h-[1px] w-full bg-black/20" />
      </motion.div>
      {[{ x: '33%', y: '33%' }, { x: '66%', y: '33%' }, { x: '33%', y: '66%' }, { x: '66%', y: '66%' }].map((pos, i) => (
        <motion.div key={i} className="absolute" style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)', x: mouse.normalizedX * 15, y: mouse.normalizedY * 15 }}>
          <div className="w-10 h-10">
            <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-black/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-black/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-black/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-black/40" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ViewfinderDark() {
  const mouse = useMouse();
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-[10%]" style={{ x: mouse.normalizedX * 5, y: mouse.normalizedY * 5 }}>
        <div className="absolute left-1/3 top-0 w-[1px] h-full bg-white/15" />
        <div className="absolute left-2/3 top-0 w-[1px] h-full bg-white/15" />
        <div className="absolute top-1/3 left-0 h-[1px] w-full bg-white/15" />
        <div className="absolute top-2/3 left-0 h-[1px] w-full bg-white/15" />
      </motion.div>
      <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32" style={{ x: mouse.normalizedX * 30, y: mouse.normalizedY * 30 }}>
        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white/40" />
        <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-white/40" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-white/40" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white/40" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/50" />
      </motion.div>
    </div>
  );
}

function FocusFrameLight() {
  const mouse = useMouse();
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[{ x: '30%', y: '35%', size: 100 }, { x: '65%', y: '40%', size: 80 }, { x: '45%', y: '60%', size: 120 }].map((frame, i) => (
        <motion.div key={i} className="absolute" style={{ left: frame.x, top: frame.y, width: frame.size, height: frame.size, transform: 'translate(-50%, -50%)', x: mouse.normalizedX * (i + 1) * 8, y: mouse.normalizedY * (i + 1) * 8 }}>
          <div className="absolute inset-0 border-2 border-black/20" />
          <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-black/40" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-black/40" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-black/40" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-black/40" />
        </motion.div>
      ))}
    </div>
  );
}

function PerspectiveGridDark() {
  const mouse = useMouse();
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute w-3 h-3 rounded-full border-2 border-white/30" style={{ left: '50%', top: '40%', transform: 'translate(-50%, -50%)', x: mouse.normalizedX * 20, y: mouse.normalizedY * 20 }} />
      {[...Array(12)].map((_, i) => (
        <div key={`line-${i}`} className="absolute h-[1px] origin-left" style={{ width: '150%', left: '50%', top: '40%', background: 'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)', transform: `rotate(${(i * 30) - 180}deg)` }} />
      ))}
      {[20, 35, 50, 65, 80].map((top, i) => (
        <motion.div key={`h-${i}`} className="absolute left-[10%] right-[10%] h-[1px] bg-white/10" style={{ top: `${top}%`, x: mouse.normalizedX * (5 - i) * 3, y: mouse.normalizedY * (5 - i) * 3 }} />
      ))}
    </div>
  );
}

function DynamicSymmetryLight() {
  const mouse = useMouse();
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute w-[1px] h-[141%] bg-black/15 origin-top-left" style={{ left: 0, top: 0, transform: 'rotate(45deg)' }} />
      <div className="absolute w-[1px] h-[141%] bg-black/15 origin-top-right" style={{ right: 0, top: 0, transform: 'rotate(-45deg)' }} />
      {[{ x: '38.2%', y: '38.2%' }, { x: '61.8%', y: '38.2%' }, { x: '38.2%', y: '61.8%' }, { x: '61.8%', y: '61.8%' }, { x: '50%', y: '50%' }].map((pos, i) => (
        <motion.div key={`point-${i}`} className={`absolute ${i === 4 ? 'w-5 h-5' : 'w-3 h-3'} rounded-full border-2 border-black/20`} style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)', x: mouse.normalizedX * 15, y: mouse.normalizedY * 15 }} />
      ))}
    </div>
  );
}

function SafeZonesDark() {
  const mouse = useMouse();
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute border border-dashed border-white/15" style={{ left: '5%', right: '5%', top: '5%', bottom: '5%', x: mouse.normalizedX * 5, y: mouse.normalizedY * 5 }} />
      <motion.div className="absolute border border-white/20" style={{ left: '10%', right: '10%', top: '10%', bottom: '10%', x: mouse.normalizedX * 8, y: mouse.normalizedY * 8 }} />
      <motion.div className="absolute border border-white/10" style={{ left: '20%', right: '20%', top: '20%', bottom: '20%', x: mouse.normalizedX * 10, y: mouse.normalizedY * 10 }} />
      <div className="absolute top-[6%] left-1/2 -translate-x-1/2 text-[9px] text-white/25 font-mono tracking-widest">ACTION SAFE</div>
      <div className="absolute top-[11%] left-1/2 -translate-x-1/2 text-[9px] text-white/30 font-mono tracking-widest">TITLE SAFE</div>
      <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ x: mouse.normalizedX * 15, y: mouse.normalizedY * 15 }}>
        <div className="w-10 h-[1px] bg-white/25 absolute -left-5 top-0" />
        <div className="h-10 w-[1px] bg-white/25 absolute left-0 -top-5" />
      </motion.div>
    </div>
  );
}

function CenterWeightedLight() {
  const mouse = useMouse();
  return (
    <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
      {[...Array(8)].map((_, i) => (
        <motion.div key={`ring-${i}`} className="absolute rounded-full border" style={{ width: 60 + i * 70, height: 60 + i * 70, borderColor: `rgba(0,0,0,${0.2 - i * 0.02})`, borderWidth: i === 0 ? 2 : 1, borderStyle: i % 2 === 0 ? 'solid' : 'dashed', x: mouse.normalizedX * (8 - i) * 4, y: mouse.normalizedY * (8 - i) * 4 }} />
      ))}
      <motion.div className="absolute w-6 h-6 rounded-full border-2 border-black/30" style={{ x: mouse.normalizedX * 20, y: mouse.normalizedY * 20 }} />
      {[...Array(8)].map((_, i) => (
        <div key={`radial-${i}`} className="absolute w-[1px] h-[35%] bg-black/10 origin-bottom" style={{ bottom: '50%', left: '50%', marginLeft: -0.5, transform: `rotate(${i * 45}deg)` }} />
      ))}
    </div>
  );
}

// ============================================
// DEPTH PARALLAX SECTION - Apple Style
// ============================================
interface ParallaxSectionProps {
  dark: boolean;
  title: string;
  subtitle: string;
  index: number;
  background: ReactNode;
}

function ParallaxSection({ dark, title, subtitle, index, background }: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Layer 1: Background - slowest (creates depth)
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  // Layer 2: Main content - medium speed
  const contentY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  // Layer 3: Title - faster (foreground feel)
  const titleY = useTransform(scrollYProgress, [0, 1], ['40%', '-40%']);

  // Layer 4: Decorative elements - fastest
  const decorY = useTransform(scrollYProgress, [0, 1], ['60%', '-60%']);

  // Opacity based on position in viewport
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Scale for subtle zoom effect
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // Smooth springs for buttery animations
  const smoothBgY = useSpring(bgY, { stiffness: 50, damping: 20 });
  const smoothContentY = useSpring(contentY, { stiffness: 60, damping: 25 });
  const smoothTitleY = useSpring(titleY, { stiffness: 70, damping: 25 });
  const smoothDecorY = useSpring(decorY, { stiffness: 80, damping: 25 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={ref}
      className={`relative h-[120vh] overflow-hidden ${dark ? 'bg-[#0a0a0a]' : 'bg-white'}`}
    >
      {/* Layer 1: Background grid - slowest parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: smoothBgY }}
      >
        {background}
      </motion.div>

      {/* Layer 2: Large number watermark */}
      <motion.div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none ${dark ? 'text-white/[0.02]' : 'text-black/[0.02]'}`}
        style={{ y: smoothDecorY, opacity: smoothOpacity }}
      >
        <span className="text-[40vw] font-black leading-none select-none">
          {String(index + 1).padStart(2, '0')}
        </span>
      </motion.div>

      {/* Layer 3: Main content */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ y: smoothContentY, opacity: smoothOpacity, scale: smoothScale }}
      >
        <div className="text-center px-8 max-w-4xl">
          {/* Small label */}
          <motion.p
            className={`text-xs uppercase tracking-[0.4em] mb-6 ${dark ? 'text-white/30' : 'text-black/30'}`}
            style={{ y: smoothTitleY }}
          >
            {String(index + 1).padStart(2, '0')} — {dark ? 'Dark' : 'Light'}
          </motion.p>

          {/* Title - fastest parallax for foreground feel */}
          <motion.h2
            className={`text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8 ${dark ? 'text-white' : 'text-[#0a0a0a]'}`}
            style={{ y: smoothTitleY }}
          >
            {title}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className={`text-xl md:text-2xl max-w-xl mx-auto ${dark ? 'text-white/40' : 'text-black/40'}`}
          >
            {subtitle}
          </motion.p>

          {/* Accent line */}
          <motion.div
            className={`mt-12 mx-auto w-20 h-[2px] ${dark ? 'bg-white/20' : 'bg-black/20'}`}
          />
        </div>
      </motion.div>

      {/* Layer 4: Floating decorative dots - fastest parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: smoothDecorY, opacity: smoothOpacity }}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${dark ? 'bg-white/20' : 'bg-black/20'}`}
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}

// ============================================
// SCROLL PROGRESS
// ============================================
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-white z-[100] origin-left"
      style={{ scaleX }}
    />
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function TestScrollPage() {
  const sections = [
    { dark: false, title: "Golden Spiral", subtitle: "Fibonacci composition - regula de aur în fotografie", bg: <GoldenSpiralLight /> },
    { dark: false, title: "Camera Grid", subtitle: "Rule of thirds cu focus brackets", bg: <CameraGridLight /> },
    { dark: true, title: "Viewfinder", subtitle: "Camera viewfinder cu focus brackets", bg: <ViewfinderDark /> },
    { dark: false, title: "Focus Frame", subtitle: "Multiple focus frames cu corner accents", bg: <FocusFrameLight /> },
    { dark: true, title: "Perspective Grid", subtitle: "Vanishing point cu linii convergente", bg: <PerspectiveGridDark /> },
    { dark: false, title: "Dynamic Symmetry", subtitle: "Baroque diagonals - compoziție clasică", bg: <DynamicSymmetryLight /> },
    { dark: true, title: "Safe Zones", subtitle: "Film & TV safe areas", bg: <SafeZonesDark /> },
    { dark: false, title: "Center Weighted", subtitle: "Metering pattern - zone concentrice", bg: <CenterWeightedLight /> },
  ];

  return (
    <MouseProvider>
      <main className="relative bg-[#0a0a0a]">
        <ScrollProgress />

        {/* Hero */}
        <section className="h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden sticky top-0">
          <ViewfinderDark />

          <div className="relative z-10 text-center text-white">
            <motion.p
              className="text-xs uppercase tracking-[0.5em] text-white/30 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Depth Parallax Experience
            </motion.p>

            <motion.h1
              className="text-7xl md:text-9xl font-bold tracking-tighter mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              SCROLL
            </motion.h1>

            <motion.p
              className="text-xl text-white/40 mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Watch the layers move at different speeds
            </motion.p>

            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <motion.div
                className="w-8 h-14 border-2 border-white/20 rounded-full flex justify-center pt-3"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <motion.div
                  className="w-1.5 h-3 bg-white/40 rounded-full"
                  animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Parallax Sections */}
        {sections.map((section, i) => (
          <ParallaxSection
            key={i}
            dark={section.dark}
            title={section.title}
            subtitle={section.subtitle}
            index={i}
            background={section.bg}
          />
        ))}

        {/* Footer */}
        <section className="h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
          <PerspectiveGridDark />
          <div className="relative z-10 text-center text-white">
            <motion.h2
              className="text-6xl md:text-8xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              FIN
            </motion.h2>
            <motion.p
              className="text-white/30"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Depth Parallax - Apple Style
            </motion.p>
          </div>
        </section>
      </main>
    </MouseProvider>
  );
}
