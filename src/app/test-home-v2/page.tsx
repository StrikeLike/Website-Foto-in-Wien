'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect, createContext, useContext, useRef } from 'react';
import Link from 'next/link';

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

function CameraGridLight() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-[8%]" style={{ x: mouse.normalizedX * 5, y: mouse.normalizedY * 5 }}>
        <motion.div className="absolute left-1/3 top-0 w-[1px] h-full bg-black/20" animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute left-2/3 top-0 w-[1px] h-full bg-black/20" animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
        <motion.div className="absolute top-1/3 left-0 h-[1px] w-full bg-black/20" animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
        <motion.div className="absolute top-2/3 left-0 h-[1px] w-full bg-black/20" animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} />
      </motion.div>

      {[{ x: '33%', y: '33%', depth: 1.5 }, { x: '66%', y: '33%', depth: 2 }, { x: '33%', y: '66%', depth: 2.5 }, { x: '66%', y: '66%', depth: 1 }].map((pos, i) => (
        <motion.div key={i} className="absolute" style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)', x: mouse.normalizedX * pos.depth * 15, y: mouse.normalizedY * pos.depth * 15 }}>
          <motion.div className="w-10 h-10" animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}>
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-l-2 border-t-2 border-black/40" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-r-2 border-t-2 border-black/40" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-l-2 border-b-2 border-black/40" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-r-2 border-b-2 border-black/40" />
          </motion.div>
        </motion.div>
      ))}

      {[...Array(5)].map((_, i) => (
        <motion.div key={`blob-${i}`} className="absolute rounded-full" style={{ width: 200 + i * 80, height: 200 + i * 80, left: `${-5 + i * 20}%`, top: `${10 + (i % 3) * 30}%`, background: 'radial-gradient(circle, rgba(0,0,0,0.06) 0%, transparent 70%)', x: mouse.normalizedX * (i + 1) * 12, y: mouse.normalizedY * (i + 1) * 12 }}
          animate={{ y: [-20, 20, -20], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 15 + i * 3, delay: i, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  );
}

function FocusFrameLight() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[
        { x: '30%', y: '35%', size: 100, delay: 0 },
        { x: '65%', y: '40%', size: 80, delay: 1 },
        { x: '45%', y: '60%', size: 120, delay: 2 },
        { x: '70%', y: '70%', size: 70, delay: 3 },
      ].map((frame, i) => (
        <motion.div key={i} className="absolute" style={{ left: frame.x, top: frame.y, width: frame.size, height: frame.size, transform: 'translate(-50%, -50%)', x: mouse.normalizedX * (i + 1) * 8, y: mouse.normalizedY * (i + 1) * 8 }}>
          <motion.div className="absolute inset-0 border-2 border-black/20" animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, delay: frame.delay, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-black/40" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, delay: frame.delay + 0.2, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-black/40" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, delay: frame.delay + 0.4, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-black/40" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, delay: frame.delay + 0.6, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-black/40" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, delay: frame.delay + 0.8, repeat: Infinity, ease: 'easeInOut' }} />
        </motion.div>
      ))}

      <motion.div className="absolute w-[350px] h-[350px] rounded-full" style={{ left: '10%', top: '20%', background: 'radial-gradient(circle, rgba(0,0,0,0.08) 0%, transparent 70%)' }} animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute w-[300px] h-[300px] rounded-full" style={{ right: '15%', bottom: '25%', background: 'radial-gradient(circle, rgba(0,0,0,0.06) 0%, transparent 70%)' }} animate={{ scale: [1.1, 0.9, 1.1] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }} />
    </div>
  );
}

// ============================================
// SCROLL TRANSITION SECTION COMPONENT
// ============================================
interface TransitionSectionProps {
  dark: boolean;
  children: React.ReactNode;
  background: React.ReactNode;
  className?: string;
  enableDoF?: boolean;
  index?: number;
}

function TransitionSection({ dark, children, background, className = '', enableDoF = false, index = 0 }: TransitionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Scale effect - section scales up as it enters
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.98]);

  // Parallax for background (slower)
  const bgY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  // Parallax for content (medium)
  const contentY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  // Opacity for smooth entrance
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.5, 1, 1, 0.5]);

  // Depth of Field blur
  const blurFilter = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], ['blur(4px)', 'blur(0px)', 'blur(0px)', 'blur(4px)']);

  return (
    <motion.section
      ref={sectionRef}
      className={`relative min-h-screen overflow-hidden ${dark ? 'bg-[#0a0a0a]' : 'bg-white'} ${className}`}
      style={{ scale }}
    >
      {/* Background with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: bgY,
          filter: enableDoF ? blurFilter : undefined
        }}
      >
        {background}
      </motion.div>

      {/* Depth of Field: Far blur layer */}
      {enableDoF && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ filter: blurFilter }}
        >
          <div className={`absolute top-[15%] left-[10%] w-32 h-32 rounded-full ${dark ? 'bg-white/5' : 'bg-black/5'}`} />
          <div className={`absolute top-[60%] right-[15%] w-48 h-48 rounded-full ${dark ? 'bg-white/3' : 'bg-black/3'}`} />
          <div className={`absolute bottom-[20%] left-[20%] w-24 h-24 rounded-full ${dark ? 'bg-white/4' : 'bg-black/4'}`} />
        </motion.div>
      )}

      {/* Large watermark number */}
      {index > 0 && (
        <motion.div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none ${dark ? 'text-white/[0.02]' : 'text-black/[0.02]'}`}
          style={{ y: contentY, opacity }}
        >
          <span className="text-[40vw] font-black leading-none select-none">
            {String(index).padStart(2, '0')}
          </span>
        </motion.div>
      )}

      {/* Content with parallax */}
      <motion.div
        className="relative z-10"
        style={{ y: contentY, opacity }}
      >
        {children}
      </motion.div>

      {/* Floating particles for DoF */}
      {enableDoF && (
        <motion.div className="absolute inset-0 pointer-events-none" style={{ filter: blurFilter }}>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${dark ? 'bg-white/20' : 'bg-black/20'}`}
              style={{ left: `${10 + i * 15}%`, top: `${15 + (i % 3) * 30}%` }}
              animate={{ y: [-10, 10, -10], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
            />
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}

// ============================================
// DATA - Real content from fotoinwien.at
// ============================================

const services = [
  { icon: "fa-solid fa-user", title: "Portraitfotografie", description: "Authentische und einzigartige Portraits im Studio oder Outdoor in Wien.", href: "/leistungen/portraitfotografie/" },
  { icon: "fa-solid fa-briefcase", title: "Businessfotografie", description: "Firmen- und Business-Portraits fur Webseite und Marketing.", href: "/leistungen/businessfotografie/" },
  { icon: "fa-solid fa-calendar-days", title: "Eventfotografie", description: "Professionelle Dokumentation von Firmenveranstaltungen in Wien.", href: "/leistungen/eventfotografie/" },
  { icon: "fa-solid fa-box", title: "Produktfotografie", description: "Perfekte Produktfotos zur Prasentation fur E-Commerce und Kataloge.", href: "/leistungen/produktfotografie/" },
  { icon: "fa-solid fa-utensils", title: "Foodfotografie", description: "Hochwertige Food Fotos fur Restaurants und Social Media.", href: "/leistungen/foodfotografie/" },
  { icon: "fa-solid fa-people-roof", title: "Familienfotografie", description: "Professionelle Familienfotos und Paarshootings in naturlicher Umgebung.", href: "/leistungen/familienfotografie/" },
];

const clients = [
  { name: "TU Wien", icon: "fa-solid fa-graduation-cap" },
  { name: "Autonom Health", icon: "fa-solid fa-heart-pulse" },
  { name: "Gerstner", icon: "fa-solid fa-utensils" },
  { name: "V-Suit", icon: "fa-solid fa-shirt" },
  { name: "Hope for the Future", icon: "fa-solid fa-hands-holding-heart" },
];

const testimonials = [
  { id: "1", quote: "Die Bilder sind von hoher Qualitat und zeigen unsere Produkte perfekt. Seine Professionalitat und Kreativitat haben unser Marketing erheblich unterstutzt.", author: "Dr. med. Alfred Lohninger", position: "Geschaftsfuhrer", company: "Autonom Health" },
  { id: "2", quote: "Seine Eventfotografie fangt die Atmosphare und besonderen Momente perfekt ein.", author: "Dr. Birgit Hofreiter", position: "Programmleiterin", company: "TU Wien i2ncubator" },
  { id: "3", quote: "Seine kreative Herangehensweise hat die einzigartigen Details unserer Produkte perfekt in Szene gesetzt.", author: "Katja Radlgruber", position: "CEO", company: "V-Suit" },
  { id: "4", quote: "Die hochwertigen Bilder verbessern die Attraktivitat unseres Shops erheblich.", author: "Andrea Staudenherzl", position: "Vorstandsmitglied", company: "Hope for the Future" },
  { id: "5", quote: "Er hat es geschafft, die Freude und Verbundenheit in unseren Bildern perfekt einzufangen.", author: "Sergiu & Raluca", position: "Paar", company: "Familienshooting" },
];

const featuredProjects = [
  { id: "1", slug: "cristina-studio", title: "Cristina", category: "Portrait & Boudoir", description: "Studio Portrat Fotografie", dark: true },
  { id: "2", slug: "andrei-portrait", title: "Andrei", category: "Portrait", description: "Portrait Fotografie - Studio", dark: false },
  { id: "3", slug: "katarina-boudoir", title: "Katarina", category: "Portrait & Boudoir", description: "Portrait Fotografie - Studio", dark: true },
  { id: "4", slug: "tu-wien-event", title: "TU Wien Event", category: "Event", description: "i2ncubator Networking", dark: true },
  { id: "5", slug: "autonom-health", title: "Autonom Health", category: "Produkt", description: "HRV-Monitoring Gerate", dark: false },
  { id: "6", slug: "gerstner-food", title: "Gerstner", category: "Food", description: "Kulinarische Meisterwerke", dark: true },
];

// ============================================
// SCROLL PROGRESS
// ============================================
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-white z-[200] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function TestHomeV2Page() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Hero scroll effects
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.9]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroBgY = useTransform(heroProgress, [0, 1], ['0%', '30%']);
  const heroContentY = useTransform(heroProgress, [0, 1], ['0%', '50%']);

  // Testimonial auto-rotation
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Carousel scroll
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <MouseProvider>
      <main className="relative">
        <ScrollProgress />

        {/* ====== SECTION 1: HERO (DARK) - SafeZonesDark + Sticky Scale Parallax DoF ====== */}
        <motion.section
          ref={heroRef}
          className="sticky top-0 h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden z-0"
          style={{ scale: heroScale }}
        >
          {/* Background with parallax */}
          <motion.div className="absolute inset-0" style={{ y: heroBgY }}>
            <SafeZonesDark />
          </motion.div>

          {/* Depth layers */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <div className="absolute top-[20%] left-[15%] w-40 h-40 rounded-full bg-white/[0.02] blur-2xl" />
            <div className="absolute bottom-[25%] right-[10%] w-60 h-60 rounded-full bg-white/[0.015] blur-3xl" />
          </motion.div>

          {/* Content with parallax */}
          <motion.div
            className="relative z-10 text-center text-white px-4"
            style={{ y: heroContentY, opacity: heroOpacity }}
          >
            {/* Subtitle label */}
            <motion.p
              className="text-xs uppercase tracking-[0.5em] text-white/30 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Sticky + Scale + Parallax + Depth of Field
            </motion.p>

            {/* Main title */}
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              FOTOGRAF
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/40 mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Alexandru Bogdan - Wien
            </motion.p>

            {/* Scroll indicator */}
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
              <span className="text-xs text-white/20 mt-2">Scroll to explore</span>
            </motion.div>
          </motion.div>

          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`hero-particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-white/30"
              style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 4) * 20}%` }}
              animate={{ y: [-20, 20, -20], opacity: [0.1, 0.4, 0.1], scale: [1, 1.5, 1] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            />
          ))}
        </motion.section>

        {/* ====== SECTION 2: SERVICES (LIGHT) - CameraGridLight ====== */}
        <TransitionSection dark={false} background={<CameraGridLight />} index={1} enableDoF>
          <div className="py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 tracking-tight text-[#0a0a0a]">
                  Meine Dienstleistungen
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                  Vielseitige Fotografie-Dienstleistungen fur Unternehmen und Privatpersonen in Wien.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={service.href} className="group block h-full">
                      <div className="p-8 h-full rounded-3xl bg-white/70 backdrop-blur-sm border border-black/5 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                        <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center mb-6 group-hover:bg-black/10 group-hover:scale-110 transition-all duration-500">
                          <i className={`${service.icon} text-xl text-gray-700`} />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-[#0a0a0a]">{service.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.description}</p>
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 group-hover:gap-3 transition-all">
                          Mehr erfahren <i className="fa-solid fa-arrow-right text-xs" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </TransitionSection>

        {/* ====== SECTION 3: CLIENT LOGOS (DARK) - ViewfinderDark ====== */}
        <TransitionSection dark={true} background={<ViewfinderDark />} index={2} enableDoF>
          <div className="py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-8">
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

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 pt-12 border-t border-white/[0.05]"
              >
                {[{ value: "50+", label: "Firmenkunden" }, { value: "500+", label: "Projekte" }, { value: "100%", label: "Zufriedenheit" }].map((stat, index) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 + index * 0.1 }} className="text-center">
                    <p className="text-3xl md:text-4xl font-semibold text-white mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </TransitionSection>

        {/* ====== SECTION 4: FEATURED PORTFOLIO (LIGHT) - CameraGridLight ====== */}
        <TransitionSection dark={false} background={<CameraGridLight />} index={3}>
          <div className="py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
              >
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-2">
                    <span className="text-gray-900">Ausgewahlte Arbeiten.</span>{" "}
                    <span className="text-gray-500">Entdecken Sie mein Portfolio.</span>
                  </h2>
                  <p className="text-gray-500 max-w-xl">
                    Ein Einblick in meine aktuellen Projekte fur namhafte Kunden aus Wien.
                  </p>
                </div>

                <div className="hidden lg:flex items-center gap-2 pb-2 flex-shrink-0">
                  <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all">
                    <i className="fa-solid fa-chevron-left" />
                  </button>
                  <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all">
                    <i className="fa-solid fa-chevron-right" />
                  </button>
                </div>
              </motion.div>

              <div className="relative">
                <div ref={scrollRef} className="flex gap-5 overflow-x-auto scroll-smooth pb-6 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {featuredProjects.map((project, index) => (
                    <motion.div key={project.id} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex-shrink-0 snap-start" style={{ width: "340px" }}>
                      <Link href={`/portfolio/${project.slug}/`} className="group block h-full">
                        <div className={`relative h-[420px] sm:h-[460px] rounded-3xl p-6 flex flex-col overflow-hidden transition-all duration-500 group-hover:scale-[0.98] ${project.dark ? "bg-[#1d1d1f] text-white" : "bg-[#f5f5f7] text-gray-900"}`}>
                          <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <i className="fa-solid fa-camera text-8xl" />
                          </div>
                          <div className="relative z-10">
                            <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 ${project.dark ? "bg-white/10 text-white/80" : "bg-black/5 text-gray-600"}`}>{project.category}</span>
                            <h3 className="text-2xl font-semibold mb-1 tracking-tight">{project.title}</h3>
                            <p className={`text-sm ${project.dark ? "text-gray-400" : "text-gray-500"}`}>{project.description}</p>
                          </div>
                          <div className="relative z-10 mt-auto">
                            <span className={`inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3 ${project.dark ? "text-white/70" : "text-gray-600"}`}>
                              Projekt ansehen <i className="fa-solid fa-arrow-right text-xs" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
                <Link href="/portfolio/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a0a0a] text-white font-semibold rounded-full hover:bg-black/80 transition-all">
                  Gesamtes Portfolio ansehen <i className="fa-solid fa-arrow-right" />
                </Link>
              </motion.div>
            </div>
          </div>
        </TransitionSection>

        {/* ====== SECTION 5: TESTIMONIALS (DARK) - SafeZonesDark ====== */}
        <TransitionSection dark={true} background={<SafeZonesDark />} index={4} enableDoF>
          <div className="py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 tracking-tight text-white">Kundenstimmen</h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">Was meine Kunden uber die Zusammenarbeit sagen.</p>
              </motion.div>

              <div className="max-w-4xl mx-auto" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <AnimatePresence mode="wait">
                    <motion.div key={currentTestimonial} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="text-center space-y-8">
                      <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (<i key={i} className="fa-solid fa-star text-yellow-400 text-lg" />))}
                      </div>
                      <blockquote className="text-xl md:text-2xl font-light italic text-white/90 leading-relaxed">
                        &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
                      </blockquote>
                      <div>
                        <p className="font-semibold text-lg text-white">{testimonials[currentTestimonial].author}</p>
                        <p className="text-gray-400">{testimonials[currentTestimonial].position}</p>
                        <p className="text-gray-500 text-sm">{testimonials[currentTestimonial].company}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                <div className="flex justify-center gap-2 mt-8">
                  {testimonials.map((_, idx) => (
                    <button key={idx} onClick={() => setCurrentTestimonial(idx)} className={`h-2 rounded-full transition-all duration-300 ${idx === currentTestimonial ? "bg-white w-8" : "bg-white/30 w-2 hover:bg-white/50"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TransitionSection>

        {/* ====== SECTION 6: ABOUT TEASER (LIGHT) - FocusFrameLight ====== */}
        <TransitionSection dark={false} background={<FocusFrameLight />} index={5} enableDoF>
          <div className="py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
                  <div className="p-4 rounded-3xl bg-white/70 backdrop-blur-sm border border-black/5 shadow-xl">
                    <div className="relative aspect-[4/5] bg-gray-200 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                        <i className="fa-solid fa-user text-6xl text-white/50" />
                      </div>
                    </div>
                  </div>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="absolute -bottom-6 -right-6 lg:right-auto lg:-left-6">
                    <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-black/5 shadow-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                          <i className="fa-solid fa-award text-white text-lg" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">10+</p>
                          <p className="text-sm text-gray-600">Jahre Erfahrung</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Uber mich</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0a0a0a]">Alexandru Bogdan</h2>
                    <p className="text-xl text-gray-500 font-light mt-2">Ihr Fotograf in Wien</p>
                  </div>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>Mit uber 10 Jahren Erfahrung in der Portraitfotografie, Business Fotografie, Familienfotografie, Produktfotografie und Eventfotografie.</p>
                    <p>Meine Leidenschaft ist es, die Geschichte hinter jedem Bild zu erzahlen und authentische Momente festzuhalten.</p>
                  </div>
                  <div className="flex flex-wrap gap-4 pt-4">
                    {[{ value: "100+", label: "Projekte" }, { value: "50+", label: "Firmenkunden" }, { value: "100%", label: "Zufriedenheit" }].map((stat) => (
                      <div key={stat.label} className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-black/5 text-center min-w-[100px]">
                        <p className="text-2xl font-bold text-[#0a0a0a]">{stat.value}</p>
                        <p className="text-xs text-gray-600">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4">
                    <Link href="/uber-mich/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a0a0a] text-white font-semibold rounded-full hover:bg-black/80 transition-all">
                      Mehr uber mich <i className="fa-solid fa-arrow-right" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </TransitionSection>

        {/* ====== SECTION 7: CTA (DARK) - ViewfinderDark ====== */}
        <TransitionSection dark={true} background={<ViewfinderDark />} index={6} enableDoF>
          <div className="py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
                <div className="p-10 md:p-16 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-8">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-white/10 flex items-center justify-center">
                      <i className="fa-solid fa-camera text-3xl text-white/70" />
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">Bereit fur Ihr Fotoshooting?</h2>
                    <p className="text-xl text-white/50 max-w-2xl mx-auto">Lassen Sie uns gemeinsam Ihre Vision verwirklichen. Kontaktieren Sie mich fur ein unverbindliches Beratungsgesprach.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                      <Link href="/kontakt/" className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all inline-flex items-center justify-center gap-2">
                        <i className="fa-solid fa-paper-plane" /> Beratungsgesprach buchen
                      </Link>
                      <a href="https://wa.me/436608459895" className="px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2">
                        <i className="fa-brands fa-whatsapp" /> WhatsApp
                      </a>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm text-white/40">
                      <span className="flex items-center gap-2"><i className="fa-solid fa-clock" /> Antwort in 24h</span>
                      <span className="flex items-center gap-2"><i className="fa-solid fa-shield" /> Unverbindlich</span>
                      <span className="flex items-center gap-2"><i className="fa-solid fa-star" /> 5-Sterne Bewertungen</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </TransitionSection>

        {/* ====== SECTION 8: FOOTER (DARK) - SafeZonesDark ====== */}
        <footer className="relative py-20 bg-[#0a0a0a] overflow-hidden">
          <SafeZonesDark />
          <div className="absolute inset-0 bg-[#0a0a0a]/90" />

          <div className="relative z-10 container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Foto in Wien</h3>
                <p className="text-white/40 text-sm">Eventfotografie, Portratfotografie, Businessfotografie, und Produktfotografie in Wien.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Navigation</h4>
                <ul className="space-y-2 text-white/40 text-sm">
                  <li><Link href="/" className="hover:text-white transition-colors">Startseite</Link></li>
                  <li><Link href="/portfolio/" className="hover:text-white transition-colors">Portfolio</Link></li>
                  <li><Link href="/leistungen/" className="hover:text-white transition-colors">Leistungen</Link></li>
                  <li><Link href="/kontakt/" className="hover:text-white transition-colors">Kontakt</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Leistungen</h4>
                <ul className="space-y-2 text-white/40 text-sm">
                  <li><Link href="/leistungen/businessfotografie/" className="hover:text-white transition-colors">Businessfotografie</Link></li>
                  <li><Link href="/leistungen/eventfotografie/" className="hover:text-white transition-colors">Eventfotografie</Link></li>
                  <li><Link href="/leistungen/portraitfotografie/" className="hover:text-white transition-colors">Portraitfotografie</Link></li>
                  <li><Link href="/leistungen/produktfotografie/" className="hover:text-white transition-colors">Produktfotografie</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Kontakt</h4>
                <ul className="space-y-2 text-white/40 text-sm">
                  <li>Wien, Osterreich</li>
                  <li>info@fotoinwien.at</li>
                  <li>+43 660-845-9895</li>
                </ul>
                <div className="flex gap-4 mt-4">
                  <a href="#" className="text-white/40 hover:text-white transition-colors"><i className="fa-brands fa-instagram text-xl" /></a>
                  <a href="#" className="text-white/40 hover:text-white transition-colors"><i className="fa-brands fa-facebook text-xl" /></a>
                  <a href="https://wa.me/436608459895" className="text-white/40 hover:text-white transition-colors"><i className="fa-brands fa-whatsapp text-xl" /></a>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/30 text-sm">© 2026 fotoinwien.at. Alle Rechte vorbehalten.</p>
              <div className="flex gap-6 text-white/30 text-sm">
                <Link href="/impressum/" className="hover:text-white transition-colors">Impressum</Link>
                <Link href="/datenschutz/" className="hover:text-white transition-colors">Datenschutz</Link>
              </div>
            </div>
          </div>
        </footer>

        {/* Fixed indicator */}
        <motion.div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1 }}>
          <div className="px-6 py-3 bg-black/80 backdrop-blur-md rounded-full text-white text-sm flex items-center gap-3 border border-white/10">
            <i className="fa-solid fa-wand-magic-sparkles" />
            <span>V2 - Scroll Transitions + Scale + Parallax + DoF</span>
          </div>
        </motion.div>
      </main>
    </MouseProvider>
  );
}
