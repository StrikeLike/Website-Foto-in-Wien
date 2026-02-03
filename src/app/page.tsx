'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect, createContext, useContext, useRef, ReactNode } from 'react';
import Link from 'next/link';

// ============================================
// THEME CONTEXT
// ============================================
type ThemeMode = 'dark' | 'light';

const ThemeContext = createContext<{ theme: ThemeMode; toggleTheme: () => void }>({
  theme: 'dark',
  toggleTheme: () => {},
});

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

const useTheme = () => useContext(ThemeContext);

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

const useMouse = () => useContext(MouseContext);

// ============================================
// THEME TOGGLE
// ============================================
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className={`fixed top-6 right-6 z-[300] w-14 h-14 rounded-full backdrop-blur-xl flex items-center justify-center shadow-2xl transition-all duration-500 ${
        isDark ? 'bg-white/10 border border-white/20 text-white hover:bg-white/20' : 'bg-black/10 border border-black/20 text-black hover:bg-black/20'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <AnimatePresence mode="wait">
        <motion.i
          key={theme}
          className={isDark ? 'fa-solid fa-sun text-xl' : 'fa-solid fa-moon text-xl'}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>
    </motion.button>
  );
}

// ============================================
// ADAPTIVE BACKGROUNDS
// ============================================

function ViewfinderBg() {
  const mouse = useMouse();
  const { theme } = useTheme();
  const d = theme === 'dark';
  const line = d ? 'bg-white/20' : 'bg-black/20';
  const bracket = d ? 'border-white/50' : 'border-black/50';
  const dot = d ? 'bg-white/60' : 'bg-black/60';
  const border = d ? 'border-white/30' : 'border-black/30';
  const glow = d ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)';

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-[10%]" style={{ x: mouse.normalizedX * 5, y: mouse.normalizedY * 5 }}>
        {[1/3, 2/3].map((p, i) => <motion.div key={`v${i}`} className={`absolute top-0 w-[1px] h-full ${line}`} style={{ left: `${p*100}%` }} animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 3, repeat: Infinity, delay: i*0.5 }} />)}
        {[1/3, 2/3].map((p, i) => <motion.div key={`h${i}`} className={`absolute left-0 h-[1px] w-full ${line}`} style={{ top: `${p*100}%` }} animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 3, repeat: Infinity, delay: 1+i*0.5 }} />)}
      </motion.div>

      <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32" style={{ x: mouse.normalizedX * 30, y: mouse.normalizedY * 30 }}>
        {['top-0 left-0 border-l-2 border-t-2', 'top-0 right-0 border-r-2 border-t-2', 'bottom-0 left-0 border-l-2 border-b-2', 'bottom-0 right-0 border-r-2 border-b-2'].map((c, i) => (
          <motion.div key={i} className={`absolute w-6 h-6 ${c} ${bracket}`} animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i*0.2 }} />
        ))}
        <motion.div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${dot}`} animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} />
      </motion.div>

      {[{ x: '25%', y: '35%', dp: 1.5 }, { x: '75%', y: '35%', dp: 2 }, { x: '25%', y: '65%', dp: 2.5 }, { x: '75%', y: '65%', dp: 1 }].map((p, i) => (
        <motion.div key={i} className="absolute w-4 h-4" style={{ left: p.x, top: p.y, transform: 'translate(-50%,-50%)', x: mouse.normalizedX * p.dp * 20, y: mouse.normalizedY * p.dp * 20 }}>
          <motion.div className={`w-full h-full border ${border}`} animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.1, 0.9] }} transition={{ duration: 3, delay: i*0.5, repeat: Infinity }} />
        </motion.div>
      ))}

      {[...Array(6)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full" style={{ width: 150+i*50, height: 150+i*50, left: `${10+i*15}%`, top: `${20+(i%3)*25}%`, background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`, x: mouse.normalizedX*(i+1)*12, y: mouse.normalizedY*(i+1)*12 }} animate={{ y: [-20, 20, -20], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 12+i*2, delay: i, repeat: Infinity }} />
      ))}
    </div>
  );
}

function SafeZonesBg() {
  const mouse = useMouse();
  const { theme } = useTheme();
  const d = theme === 'dark';
  const bd = d ? 'border-white/20' : 'border-black/20';
  const bs = d ? 'border-white/30' : 'border-black/30';
  const bi = d ? 'border-white/15' : 'border-black/15';
  const txt = d ? 'text-white/30' : 'text-black/30';
  const txts = d ? 'text-white/40' : 'text-black/40';
  const ln = d ? 'bg-white/30' : 'bg-black/30';
  const glow = d ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div className={`absolute border border-dashed ${bd}`} style={{ left: '5%', right: '5%', top: '5%', bottom: '5%', x: mouse.normalizedX*5, y: mouse.normalizedY*5 }} animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 4, repeat: Infinity }} />
      <motion.div className={`absolute border ${bs}`} style={{ left: '10%', right: '10%', top: '10%', bottom: '10%', x: mouse.normalizedX*8, y: mouse.normalizedY*8 }} animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }} />
      <motion.div className={`absolute border ${bi}`} style={{ left: '20%', right: '20%', top: '20%', bottom: '20%', x: mouse.normalizedX*10, y: mouse.normalizedY*10 }} animate={{ opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} />

      <motion.div className={`absolute top-[6%] left-1/2 -translate-x-1/2 text-[9px] ${txt} font-mono tracking-widest`} animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 4, repeat: Infinity }}>ACTION SAFE 90%</motion.div>
      <motion.div className={`absolute top-[11%] left-1/2 -translate-x-1/2 text-[9px] ${txts} font-mono tracking-widest`} animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity, delay: 0.3 }}>TITLE SAFE 80%</motion.div>

      <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ x: mouse.normalizedX*15, y: mouse.normalizedY*15 }}>
        <motion.div className={`w-12 h-[1px] ${ln} absolute -left-6 top-0`} animate={{ opacity: [0.2, 0.5, 0.2], scaleX: [0.8, 1.2, 0.8] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.div className={`h-12 w-[1px] ${ln} absolute left-0 -top-6`} animate={{ opacity: [0.2, 0.5, 0.2], scaleY: [0.8, 1.2, 0.8] }} transition={{ duration: 3, repeat: Infinity, delay: 0.2 }} />
        <motion.div className={`absolute w-3 h-3 rounded-full border ${bs} -translate-x-1/2 -translate-y-1/2`} animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
      </motion.div>

      {[...Array(4)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full" style={{ width: 200+i*80, height: 200+i*80, left: `${15+i*20}%`, top: `${20+(i%2)*30}%`, background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`, x: mouse.normalizedX*(i+1)*10, y: mouse.normalizedY*(i+1)*10 }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10+i*2, repeat: Infinity }} />
      ))}
    </div>
  );
}

function FocusFrameBg() {
  const mouse = useMouse();
  const { theme } = useTheme();
  const d = theme === 'dark';
  const border = d ? 'border-white/30' : 'border-black/30';
  const corner = d ? 'border-white/50' : 'border-black/50';
  const dot = d ? 'bg-white/40' : 'bg-black/40';
  const glow = d ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';

  const frames = [{ x: '30%', y: '35%', size: 100, delay: 0 }, { x: '65%', y: '40%', size: 80, delay: 1 }, { x: '45%', y: '60%', size: 120, delay: 2 }, { x: '70%', y: '70%', size: 70, delay: 3 }];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {frames.map((f, i) => (
        <motion.div key={i} className="absolute" style={{ left: f.x, top: f.y, width: f.size, height: f.size, transform: 'translate(-50%,-50%)', x: mouse.normalizedX*(i+1)*8, y: mouse.normalizedY*(i+1)*8 }}>
          <motion.div className={`absolute inset-0 border-2 ${border}`} animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 4, delay: f.delay, repeat: Infinity }} />
          {['-top-1 -left-1 border-l-2 border-t-2', '-top-1 -right-1 border-r-2 border-t-2', '-bottom-1 -left-1 border-l-2 border-b-2', '-bottom-1 -right-1 border-r-2 border-b-2'].map((c, j) => (
            <motion.div key={j} className={`absolute w-3 h-3 ${c} ${corner}`} animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, delay: f.delay+j*0.2, repeat: Infinity }} />
          ))}
          <motion.div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${dot}`} animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, delay: f.delay, repeat: Infinity }} />
        </motion.div>
      ))}
      <motion.div className="absolute w-[350px] h-[350px] rounded-full" style={{ left: '10%', top: '20%', background: `radial-gradient(circle, ${glow} 0%, transparent 70%)` }} animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 15, repeat: Infinity }} />
      <motion.div className="absolute w-[300px] h-[300px] rounded-full" style={{ right: '15%', bottom: '25%', background: `radial-gradient(circle, ${glow} 0%, transparent 70%)` }} animate={{ scale: [1.1, 0.9, 1.1] }} transition={{ duration: 18, repeat: Infinity, delay: 3 }} />
    </div>
  );
}

function GoldenSpiralBg() {
  const mouse = useMouse();
  const { theme } = useTheme();
  const d = theme === 'dark';
  const border = d ? 'border-white/10' : 'border-black/8';
  const borderLight = d ? 'border-white/[0.06]' : 'border-black/[0.05]';
  const dot = d ? 'bg-white/40' : 'bg-black/30';
  const glow = d ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)';
  const glowStrong = d ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

  // Fibonacci rectangles
  const fibRects = [
    { w: 61.8, h: 61.8, x: 38.2, y: 0 },
    { w: 38.2, h: 38.2, x: 0, y: 0 },
    { w: 23.6, h: 23.6, x: 0, y: 38.2 },
    { w: 14.6, h: 14.6, x: 23.6, y: 38.2 },
  ];

  // Golden ratio points
  const goldenPoints = [
    { x: 38.2, y: 38.2 },
    { x: 61.8, y: 38.2 },
    { x: 38.2, y: 61.8 },
    { x: 61.8, y: 61.8 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Static Fibonacci rectangles - no animation, just mouse parallax */}
      {fibRects.map((r, i) => (
        <motion.div
          key={`rect-${i}`}
          className={`absolute border ${i < 2 ? border : borderLight}`}
          style={{
            width: `${r.w}%`,
            height: `${r.h}%`,
            left: `${r.x}%`,
            top: `${r.y}%`,
            x: mouse.normalizedX * (i + 1) * 4,
            y: mouse.normalizedY * (i + 1) * 4
          }}
        />
      ))}

      {/* Golden ratio intersection points with pulsing rings */}
      {goldenPoints.map((p, i) => (
        <motion.div
          key={`point-${i}`}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            x: mouse.normalizedX * 18,
            y: mouse.normalizedY * 18
          }}
        >
          {/* Outer pulse ring */}
          <motion.div
            className={`absolute w-8 h-8 rounded-full border ${borderLight} -translate-x-1/2 -translate-y-1/2`}
            animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 4, delay: i * 0.8, repeat: Infinity, ease: "easeOut" }}
          />
          {/* Inner ring */}
          <motion.div
            className={`absolute w-4 h-4 rounded-full border ${border} -translate-x-1/2 -translate-y-1/2`}
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Center dot */}
          <motion.div
            className={`absolute w-1.5 h-1.5 rounded-full ${dot} -translate-x-1/2 -translate-y-1/2`}
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      ))}

      {/* Animated glow orbs at golden positions */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 380, height: 380,
          left: '38.2%', top: '38.2%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${glowStrong} 0%, transparent 60%)`,
          x: mouse.normalizedX * 22,
          y: mouse.normalizedY * 22
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300, height: 300,
          left: '61.8%', top: '61.8%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
          x: mouse.normalizedX * 16,
          y: mouse.normalizedY * 16
        }}
        animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 220, height: 220,
          left: '23.6%', top: '61.8%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
          x: mouse.normalizedX * 12,
          y: mouse.normalizedY * 12
        }}
        animate={{ scale: [0.95, 1.1, 0.95] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => {
        const positions = [
          { x: 30, y: 25 }, { x: 70, y: 30 }, { x: 45, y: 55 },
          { x: 65, y: 70 }, { x: 25, y: 65 }, { x: 55, y: 40 }
        ];
        return (
          <motion.div
            key={`particle-${i}`}
            className={`absolute w-1 h-1 rounded-full ${dot}`}
            style={{
              left: `${positions[i].x}%`,
              top: `${positions[i].y}%`,
              x: mouse.normalizedX * (i + 1) * 8,
              y: mouse.normalizedY * (i + 1) * 8
            }}
            animate={{
              y: [-8, 8, -8],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </div>
  );
}

// ============================================
// DATA
// ============================================
const services = [
  { icon: "fa-solid fa-user", title: "Portraitfotografie", description: "Authentische Portraits im Studio oder Outdoor.", href: "/leistungen/portraitfotografie/" },
  { icon: "fa-solid fa-briefcase", title: "Businessfotografie", description: "Firmen- und Business-Portraits für Marketing.", href: "/leistungen/businessfotografie/" },
  { icon: "fa-solid fa-calendar-days", title: "Eventfotografie", description: "Dokumentation von Firmenveranstaltungen.", href: "/leistungen/eventfotografie/" },
  { icon: "fa-solid fa-box", title: "Produktfotografie", description: "Produktfotos für E-Commerce und Kataloge.", href: "/leistungen/produktfotografie/" },
  { icon: "fa-solid fa-utensils", title: "Foodfotografie", description: "Food Fotos für Restaurants und Social Media.", href: "/leistungen/foodfotografie/" },
  { icon: "fa-solid fa-people-roof", title: "Familienfotografie", description: "Familienfotos in natürlicher Umgebung.", href: "/leistungen/familienfotografie/" },
];

const clients = [
  { name: "TU Wien", icon: "fa-solid fa-graduation-cap" },
  { name: "Autonom Health", icon: "fa-solid fa-heart-pulse" },
  { name: "Gerstner", icon: "fa-solid fa-utensils" },
  { name: "V-Suit", icon: "fa-solid fa-shirt" },
  { name: "Hope for the Future", icon: "fa-solid fa-hands-holding-heart" },
];

const testimonials = [
  { quote: "Die Bilder zeigen unsere Produkte perfekt. Seine Professionalität hat unser Marketing erheblich unterstützt.", author: "Dr. med. Alfred Lohninger", position: "Geschäftsführer", company: "Autonom Health" },
  { quote: "Seine Eventfotografie fängt die Atmosphäre und besonderen Momente perfekt ein.", author: "Dr. Birgit Hofreiter", position: "Programmleiterin", company: "TU Wien i2ncubator" },
  { quote: "Seine kreative Herangehensweise hat unsere Produkte perfekt in Szene gesetzt.", author: "Katja Radlgruber", position: "CEO", company: "V-Suit" },
  { quote: "Die hochwertigen Bilder verbessern die Attraktivität unseres Shops erheblich.", author: "Andrea Staudenherzl", position: "Vorstandsmitglied", company: "Hope for the Future" },
];

const featuredProjects = [
  { slug: "cristina-studio", title: "Cristina", category: "Portrait", description: "Studio Portrait", dark: true },
  { slug: "andrei-portrait", title: "Andrei", category: "Portrait", description: "Portrait Studio", dark: false },
  { slug: "katarina-boudoir", title: "Katarina", category: "Boudoir", description: "Portrait Studio", dark: true },
  { slug: "tu-wien-event", title: "TU Wien", category: "Event", description: "i2ncubator", dark: true },
  { slug: "autonom-health", title: "Autonom Health", category: "Produkt", description: "HRV-Geräte", dark: false },
  { slug: "gerstner-food", title: "Gerstner", category: "Food", description: "Kulinarik", dark: true },
];

// ============================================
// SCROLL PROGRESS
// ============================================
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();
  return <motion.div className={`fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left transition-colors duration-500 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} style={{ scaleX: scrollYProgress }} />;
}

// ============================================
// SECTION WRAPPER
// ============================================
function Section({ children, background, className = '' }: { children: ReactNode; background: ReactNode; className?: string }) {
  const { theme } = useTheme();

  return (
    <section
      className={`relative overflow-hidden transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'} ${className}`}
    >
      <div className="absolute inset-0 transition-all duration-700">{background}</div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}

// ============================================
// GLASSMORPHISM CLASSES
// ============================================
function useGlass() {
  const { theme } = useTheme();
  const d = theme === 'dark';
  return {
    card: d ? 'bg-white/[0.06] backdrop-blur-xl border border-white/10' : 'bg-white/70 backdrop-blur-xl border border-black/5',
    cardHover: d ? 'hover:bg-white/[0.08]' : 'hover:bg-white hover:shadow-xl',
    text: d ? 'text-white' : 'text-[#0a0a0a]',
    textSub: d ? 'text-gray-400' : 'text-gray-500',
    textMuted: d ? 'text-gray-500' : 'text-gray-600',
    icon: d ? 'text-white/50' : 'text-gray-600',
    iconHover: d ? 'group-hover:text-white/80' : 'group-hover:text-gray-900',
    iconBg: d ? 'bg-white/[0.05]' : 'bg-black/5',
    iconBgHover: d ? 'group-hover:bg-white/[0.1]' : 'group-hover:bg-black/10',
    btn: d ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/90',
    btnSec: d ? 'border-white/30 text-white hover:bg-white/10' : 'border-black/30 text-black hover:bg-black/10',
    divider: d ? 'border-white/[0.05]' : 'border-black/[0.05]',
  };
}

// ============================================
// MAIN CONTENT
// ============================================
function MainContent() {
  const { theme } = useTheme();
  const g = useGlass();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => setCurrentTestimonial(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const scroll = (dir: 'left' | 'right') => scrollRef.current?.scrollBy({ left: dir === 'left' ? -360 : 360, behavior: 'smooth' });

  return (
    <main className={`relative transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <ScrollProgress />
      <ThemeToggle />

      {/* ========== HERO ========== */}
      <section className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className="absolute inset-0"><SafeZonesBg /></div>
        <motion.div className="absolute inset-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          <div className={`absolute top-[20%] left-[15%] w-40 h-40 rounded-full blur-2xl transition-colors duration-700 ${theme === 'dark' ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`} />
          <div className={`absolute bottom-[25%] right-[10%] w-60 h-60 rounded-full blur-3xl transition-colors duration-700 ${theme === 'dark' ? 'bg-white/[0.015]' : 'bg-black/[0.015]'}`} />
        </motion.div>

        <div className={`relative z-10 text-center px-4 transition-colors duration-700 ${g.text}`}>
          <motion.p className={`text-xs uppercase tracking-[0.5em] mb-8 transition-colors duration-700 ${g.textMuted}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
            Professionelle Fotografie in Wien
          </motion.p>
          <motion.h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6" initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            FOTOGRAF
          </motion.h1>
          <motion.p className={`text-xl md:text-2xl mb-12 transition-colors duration-700 ${g.textSub}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
            Alexandru Bogdan - Wien
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}>
            <Link href="/portfolio/" className={`px-8 py-4 font-semibold rounded-full transition-all inline-flex items-center justify-center gap-2 ${g.btn}`}>
              Portfolio ansehen <i className="fa-solid fa-arrow-right" />
            </Link>
            <Link href="/kontakt/" className={`px-8 py-4 border font-semibold rounded-full transition-all ${g.btnSec}`}>
              Kontakt aufnehmen
            </Link>
          </motion.div>
          <motion.div className="flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}>
            <motion.div className={`w-8 h-14 border-2 rounded-full flex justify-center pt-3 transition-colors duration-700 ${theme === 'dark' ? 'border-white/20' : 'border-black/20'}`} animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <motion.div className={`w-1.5 h-3 rounded-full transition-colors duration-700 ${theme === 'dark' ? 'bg-white/40' : 'bg-black/40'}`} animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            </motion.div>
          </motion.div>
        </div>

        {[...Array(6)].map((_, i) => (
          <motion.div key={i} className={`absolute w-1 h-1 rounded-full transition-colors duration-700 ${theme === 'dark' ? 'bg-white/30' : 'bg-black/30'}`} style={{ left: `${15+i*12}%`, top: `${25+(i%4)*15}%` }} animate={{ y: [-15, 15, -15], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 5+i, repeat: Infinity, delay: i*0.3 }} />
        ))}
      </section>

      {/* ========== SERVICES ========== */}
      <Section background={<ViewfinderBg />}>
        <div className="py-32">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 tracking-tight transition-colors duration-700 ${g.text}`}>Meine Dienstleistungen</h2>
              <p className={`max-w-2xl mx-auto text-lg transition-colors duration-700 ${g.textSub}`}>Vielseitige Fotografie-Dienstleistungen für Unternehmen und Privatpersonen in Wien.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i*0.1 }}>
                  <Link href={s.href} className="group block h-full">
                    <div className={`p-8 h-full rounded-3xl transition-all duration-500 hover:-translate-y-2 ${g.card} ${g.cardHover}`}>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 ${g.iconBg} ${g.iconBgHover}`}>
                        <i className={`${s.icon} text-xl transition-colors duration-500 ${g.icon} ${g.iconHover}`} />
                      </div>
                      <h3 className={`text-xl font-semibold mb-3 transition-colors duration-700 ${g.text}`}>{s.title}</h3>
                      <p className={`text-sm leading-relaxed mb-6 transition-colors duration-700 ${g.textSub}`}>{s.description}</p>
                      <span className={`inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all ${g.textMuted}`}>
                        Mehr erfahren <i className="fa-solid fa-arrow-right text-xs" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ========== CLIENTS ========== */}
      <Section background={<GoldenSpiralBg />}>
        <div className="py-32">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
              <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, type: "spring" }} className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${g.card}`}>
                <i className={`fa-solid fa-handshake text-2xl transition-colors duration-700 ${g.icon}`} />
              </motion.div>
              <h2 className={`text-3xl md:text-4xl font-semibold mb-4 tracking-tight transition-colors duration-700 ${g.text}`}>Vertrauen von führenden Unternehmen</h2>
              <p className={`max-w-xl mx-auto transition-colors duration-700 ${g.textSub}`}>Stolze Zusammenarbeit mit renommierten Institutionen und Marken aus Wien</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
              {clients.map((c, i) => (
                <motion.div key={c.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i*0.1 }} className="group">
                  <div className={`p-6 md:p-8 rounded-2xl text-center h-full flex flex-col items-center justify-center gap-4 transition-all duration-500 group-hover:scale-[1.02] ${g.card} ${g.cardHover}`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${g.iconBg} ${g.iconBgHover}`}>
                      <i className={`${c.icon} text-xl transition-colors duration-500 ${g.icon} ${g.iconHover}`} />
                    </div>
                    <span className={`text-sm md:text-base font-medium transition-colors duration-500 ${g.textSub}`}>{c.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className={`flex flex-wrap justify-center gap-8 md:gap-16 mt-20 pt-12 border-t ${g.divider}`}>
              {[{ value: "50+", label: "Firmenkunden" }, { value: "500+", label: "Projekte" }, { value: "100%", label: "Zufriedenheit" }].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7+i*0.1 }} className="text-center">
                  <p className={`text-3xl md:text-4xl font-semibold mb-1 transition-colors duration-700 ${g.text}`}>{s.value}</p>
                  <p className={`text-sm transition-colors duration-700 ${g.textMuted}`}>{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ========== PORTFOLIO ========== */}
      <Section background={<FocusFrameBg />}>
        <div className="py-32">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
              <div>
                <h2 className={`text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-2 transition-colors duration-700 ${g.text}`}>
                  Ausgewählte Arbeiten.
                </h2>
                <p className={`max-w-xl transition-colors duration-700 ${g.textSub}`}>Ein Einblick in meine Projekte für namhafte Kunden aus Wien.</p>
              </div>
              <div className="hidden lg:flex items-center gap-2 pb-2">
                {['left', 'right'].map(dir => (
                  <button key={dir} onClick={() => scroll(dir as 'left'|'right')} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${g.card} ${g.cardHover}`}>
                    <i className={`fa-solid fa-chevron-${dir} transition-colors duration-700 ${g.icon}`} />
                  </button>
                ))}
              </div>
            </motion.div>

            <div ref={scrollRef} className="flex gap-5 overflow-x-auto scroll-smooth pb-6 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
              {featuredProjects.map((p, i) => (
                <motion.div key={p.slug} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i*0.1 }} className="flex-shrink-0 snap-start" style={{ width: "340px" }}>
                  <Link href={`/portfolio/${p.slug}/`} className="group block h-full">
                    <div className={`relative h-[440px] rounded-3xl p-6 flex flex-col overflow-hidden transition-all duration-500 group-hover:scale-[0.98] ${p.dark ? (theme === 'dark' ? 'bg-white/[0.06]' : 'bg-[#1d1d1f]') : (theme === 'dark' ? 'bg-white/[0.12]' : 'bg-[#f5f5f7]')}`}>
                      <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <i className="fa-solid fa-camera text-8xl" />
                      </div>
                      <div className="relative z-10">
                        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 ${p.dark ? (theme === 'dark' ? 'bg-white/10 text-white/80' : 'bg-white/20 text-white/80') : (theme === 'dark' ? 'bg-black/20 text-black/80' : 'bg-black/5 text-gray-600')}`}>{p.category}</span>
                        <h3 className={`text-2xl font-semibold mb-1 tracking-tight ${p.dark ? 'text-white' : (theme === 'dark' ? 'text-gray-900' : 'text-gray-900')}`}>{p.title}</h3>
                        <p className={`text-sm ${p.dark ? 'text-gray-400' : 'text-gray-500'}`}>{p.description}</p>
                      </div>
                      <div className="relative z-10 mt-auto">
                        <span className={`inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all ${p.dark ? 'text-white/70' : 'text-gray-600'}`}>
                          Projekt ansehen <i className="fa-solid fa-arrow-right text-xs" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
              <Link href="/portfolio/" className={`inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full transition-all ${g.btn}`}>
                Gesamtes Portfolio <i className="fa-solid fa-arrow-right" />
              </Link>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ========== TESTIMONIALS ========== */}
      <Section background={<SafeZonesBg />}>
        <div className="py-32">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 tracking-tight transition-colors duration-700 ${g.text}`}>Kundenstimmen</h2>
              <p className={`max-w-2xl mx-auto text-lg transition-colors duration-700 ${g.textSub}`}>Was meine Kunden über die Zusammenarbeit sagen.</p>
            </motion.div>

            <div className="max-w-4xl mx-auto" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`p-8 md:p-12 rounded-3xl ${g.card}`}>
                <AnimatePresence mode="wait">
                  <motion.div key={currentTestimonial} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="text-center space-y-8">
                    <div className="flex justify-center gap-1">
                      {[...Array(5)].map((_, i) => <i key={i} className="fa-solid fa-star text-yellow-400 text-lg" />)}
                    </div>
                    <blockquote className={`text-xl md:text-2xl font-light italic leading-relaxed transition-colors duration-700 ${g.text}`}>
                      &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
                    </blockquote>
                    <div>
                      <p className={`font-semibold text-lg transition-colors duration-700 ${g.text}`}>{testimonials[currentTestimonial].author}</p>
                      <p className={`transition-colors duration-700 ${g.textSub}`}>{testimonials[currentTestimonial].position}</p>
                      <p className={`text-sm transition-colors duration-700 ${g.textMuted}`}>{testimonials[currentTestimonial].company}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrentTestimonial(i)} className={`h-2 rounded-full transition-all duration-300 ${i === currentTestimonial ? `${theme === 'dark' ? 'bg-white' : 'bg-black'} w-8` : `${theme === 'dark' ? 'bg-white/30 hover:bg-white/50' : 'bg-black/30 hover:bg-black/50'} w-2`}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ========== ABOUT ========== */}
      <Section background={<ViewfinderBg />}>
        <div className="py-32">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-6xl mx-auto">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
                <div className={`p-4 rounded-3xl shadow-2xl ${g.card}`}>
                  <div className={`relative aspect-[4/5] rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-gray-300 to-gray-400'} flex items-center justify-center`}>
                    <i className={`fa-solid fa-user text-6xl ${theme === 'dark' ? 'text-white/30' : 'text-white/50'}`} />
                  </div>
                </div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="absolute -bottom-6 -right-6 lg:right-auto lg:-left-6">
                  <div className={`p-6 rounded-2xl shadow-2xl ${g.card}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}>
                        <i className={`fa-solid fa-award text-lg ${theme === 'dark' ? 'text-black' : 'text-white'}`} />
                      </div>
                      <div>
                        <p className={`text-2xl font-bold transition-colors duration-700 ${g.text}`}>20+</p>
                        <p className={`text-sm transition-colors duration-700 ${g.textMuted}`}>Jahre Erfahrung</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-6">
                <div>
                  <p className={`text-sm font-medium uppercase tracking-wider mb-2 transition-colors duration-700 ${g.textMuted}`}>Über mich</p>
                  <h2 className={`text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight transition-colors duration-700 ${g.text}`}>Alexandru Bogdan</h2>
                  <p className={`text-xl font-light mt-2 transition-colors duration-700 ${g.textSub}`}>Ihr Fotograf in Wien</p>
                </div>
                <div className={`space-y-4 leading-relaxed transition-colors duration-700 ${g.textSub}`}>
                  <p>Mit über 20 Jahren Erfahrung in der Portraitfotografie, Business Fotografie, Familienfotografie, Produktfotografie und Eventfotografie.</p>
                  <p>Meine Leidenschaft ist es, die Geschichte hinter jedem Bild zu erzählen und authentische Momente festzuhalten.</p>
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  {[{ value: "500+", label: "Projekte" }, { value: "50+", label: "Firmenkunden" }, { value: "100%", label: "Zufriedenheit" }].map(s => (
                    <div key={s.label} className={`p-4 rounded-xl text-center min-w-[100px] ${g.card}`}>
                      <p className={`text-2xl font-bold transition-colors duration-700 ${g.text}`}>{s.value}</p>
                      <p className={`text-xs transition-colors duration-700 ${g.textMuted}`}>{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <Link href="/uber-mich/" className={`inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full transition-all ${g.btn}`}>
                    Mehr über mich <i className="fa-solid fa-arrow-right" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* ========== CTA ========== */}
      <Section background={<FocusFrameBg />}>
        <div className="py-32">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
              <div className={`p-10 md:p-16 rounded-3xl text-center ${g.card}`}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-8">
                  <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center ${g.iconBg}`}>
                    <i className={`fa-solid fa-camera text-3xl transition-colors duration-700 ${g.icon}`} />
                  </div>
                  <h2 className={`text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight transition-colors duration-700 ${g.text}`}>Bereit für Ihr Fotoshooting?</h2>
                  <p className={`text-xl max-w-2xl mx-auto transition-colors duration-700 ${g.textSub}`}>Lassen Sie uns gemeinsam Ihre Vision verwirklichen. Kontaktieren Sie mich für ein unverbindliches Beratungsgespräch.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Link href="/kontakt/" className={`px-8 py-4 font-semibold rounded-full transition-all inline-flex items-center justify-center gap-2 ${g.btn}`}>
                      <i className="fa-solid fa-paper-plane" /> Beratungsgespräch buchen
                    </Link>
                    <a href="https://wa.me/436608459895" className={`px-8 py-4 border font-semibold rounded-full transition-all inline-flex items-center justify-center gap-2 ${g.btnSec}`}>
                      <i className="fa-brands fa-whatsapp" /> WhatsApp
                    </a>
                  </div>
                  <div className={`flex flex-wrap justify-center gap-6 pt-6 text-sm transition-colors duration-700 ${g.textMuted}`}>
                    <span className="flex items-center gap-2"><i className="fa-solid fa-clock" /> Antwort in 24h</span>
                    <span className="flex items-center gap-2"><i className="fa-solid fa-shield" /> Unverbindlich</span>
                    <span className="flex items-center gap-2"><i className="fa-solid fa-star" /> 5-Sterne Bewertungen</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ========== FOOTER ========== */}
      <footer className={`relative py-20 overflow-hidden transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <GoldenSpiralBg />
        <div className={`absolute inset-0 transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0a0a0a]/90' : 'bg-white/90'}`} />

        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className={`text-2xl font-bold mb-4 transition-colors duration-700 ${g.text}`}>Foto in Wien</h3>
              <p className={`text-sm transition-colors duration-700 ${g.textMuted}`}>Eventfotografie, Porträtfotografie, Businessfotografie, und Produktfotografie in Wien.</p>
            </div>
            {[
              { title: 'Navigation', links: [{ label: 'Startseite', href: '/' }, { label: 'Portfolio', href: '/portfolio/' }, { label: 'Leistungen', href: '/leistungen/' }, { label: 'Kontakt', href: '/kontakt/' }] },
              { title: 'Leistungen', links: [{ label: 'Businessfotografie', href: '/leistungen/businessfotografie/' }, { label: 'Eventfotografie', href: '/leistungen/eventfotografie/' }, { label: 'Portraitfotografie', href: '/leistungen/portraitfotografie/' }, { label: 'Produktfotografie', href: '/leistungen/produktfotografie/' }] },
            ].map(col => (
              <div key={col.title}>
                <h4 className={`font-semibold mb-4 transition-colors duration-700 ${g.text}`}>{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(l => <li key={l.href}><Link href={l.href} className={`text-sm transition-colors ${g.textMuted}`}>{l.label}</Link></li>)}
                </ul>
              </div>
            ))}
            <div>
              <h4 className={`font-semibold mb-4 transition-colors duration-700 ${g.text}`}>Kontakt</h4>
              <ul className={`space-y-2 text-sm transition-colors duration-700 ${g.textMuted}`}>
                <li>Wien, Österreich</li>
                <li>info@fotoinwien.at</li>
                <li>+43 660-845-9895</li>
              </ul>
              <div className="flex gap-4 mt-4">
                {['instagram', 'facebook', 'whatsapp'].map(s => (
                  <a key={s} href={s === 'whatsapp' ? 'https://wa.me/436608459895' : '#'} className={`transition-colors ${g.textMuted}`}>
                    <i className={`fa-brands fa-${s} text-xl`} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className={`border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 ${g.divider}`}>
            <p className={`text-sm transition-colors duration-700 ${g.textMuted}`}>© 2026 fotoinwien.at. Alle Rechte vorbehalten.</p>
            <div className={`flex gap-6 text-sm transition-colors duration-700 ${g.textMuted}`}>
              <Link href="/impressum/">Impressum</Link>
              <Link href="/datenschutz/">Datenschutz</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

// ============================================
// EXPORT
// ============================================
export default function Home() {
  return (
    <ThemeProvider>
      <MouseProvider>
        <MainContent />
      </MouseProvider>
    </ThemeProvider>
  );
}
