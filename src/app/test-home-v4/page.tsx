'use client';

import { motion, useScroll, AnimatePresence } from 'framer-motion';
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
// HEADER WITH PHONE NUMBER
// ============================================
function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Portfolio', href: '/portfolio/' },
    { label: 'Leistungen', href: '/leistungen/' },
    { label: 'Preise', href: '/preise/' },
    { label: 'Kontakt', href: '/kontakt/' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
          scrolled
            ? isDark
              ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10'
              : 'bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <motion.div whileHover={{ scale: 1.02 }}>
                <img
                  src="/images/logos/fotograf-wien-logo.svg"
                  alt="Foto in Wien"
                  className={`h-10 md:h-12 w-auto transition-all duration-500 ${
                    isDark ? '' : 'invert'
                  }`}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-300 hover:opacity-70 ${
                    isDark ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side: Phone + Theme toggle + Mobile menu */}
            <div className="flex items-center gap-4">
              {/* Phone Number - Desktop */}
              <a
                href="tel:+436608459895"
                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isDark
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-black/5 text-gray-700 hover:bg-black/10'
                }`}
              >
                <i className="fa-solid fa-phone text-xs" />
                +43 660 845 9895
              </a>

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-black/5 hover:bg-black/10 text-gray-600'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  <motion.i
                    key={theme}
                    className={isDark ? 'fa-solid fa-sun text-sm' : 'fa-solid fa-moon text-sm'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </AnimatePresence>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-black/5 hover:bg-black/10 text-gray-600'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-sm`} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-[190] lg:hidden ${
              isDark ? 'bg-[#0a0a0a]/95' : 'bg-white/95'
            } backdrop-blur-xl`}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-2xl font-semibold transition-colors ${
                      isDark ? 'text-white hover:text-white/70' : 'text-gray-900 hover:text-gray-500'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href="tel:+436608459895"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className={`mt-4 flex items-center gap-2 text-lg ${
                  isDark ? 'text-white/70' : 'text-gray-600'
                }`}
              >
                <i className="fa-solid fa-phone" />
                +43 660 845 9895
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================
// FLOATING WHATSAPP BUTTON
// ============================================
function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.a
      href="https://wa.me/436608459895"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-[180] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl bg-[#25D366] text-white hover:bg-[#20BD5A]"
      aria-label="WhatsApp kontaktieren"
    >
      <i className="fa-brands fa-whatsapp text-2xl" />
    </motion.a>
  );
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
function BackToTop() {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className={`fixed bottom-6 left-6 z-[180] w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
              : 'bg-black/5 text-gray-700 hover:bg-black/10 backdrop-blur-sm'
          }`}
          aria-label="Nach oben scrollen"
        >
          <i className="fa-solid fa-arrow-up" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ============================================
// COOKIE CONSENT BANNER
// ============================================
function CookieConsent() {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ necessary: true, analytics: true, marketing: true }));
    setVisible(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ necessary: true, analytics: false, marketing: false }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed bottom-0 left-0 right-0 z-[250] p-4 md:p-6 ${
          isDark
            ? 'bg-[#1a1a1a]/95 border-t border-white/10'
            : 'bg-white/95 border-t border-black/5 shadow-2xl'
        } backdrop-blur-xl`}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <p className={`text-sm md:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <i className="fa-solid fa-cookie-bite mr-2" />
                Diese Website verwendet Cookies, um Ihnen das beste Erlebnis zu bieten.
              </p>
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Weitere Informationen finden Sie in unserer{' '}
                <Link href="/datenschutz/" className="underline hover:no-underline">
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={acceptNecessary}
                className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  isDark
                    ? 'border border-white/20 text-white hover:bg-white/10'
                    : 'border border-black/20 text-gray-600 hover:bg-black/5'
                }`}
              >
                Nur notwendige
              </button>
              <button
                onClick={acceptAll}
                className={`flex-1 md:flex-none px-6 py-2 text-sm font-medium rounded-full transition-all ${
                  isDark
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'bg-black text-white hover:bg-black/90'
                }`}
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================
// SUBTLE BACKGROUND ANIMATIONS
// ============================================
function SubtleGridBg() {
  const mouse = useMouse();
  const { theme } = useTheme();
  const d = theme === 'dark';
  const line = d ? 'bg-white/[0.03]' : 'bg-black/[0.03]';
  const glow = d ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Subtle grid */}
      <motion.div className="absolute inset-0" style={{ x: mouse.normalizedX * 3, y: mouse.normalizedY * 3 }}>
        {[0.25, 0.5, 0.75].map((p, i) => (
          <div key={`v${i}`} className={`absolute top-0 w-px h-full ${line}`} style={{ left: `${p * 100}%` }} />
        ))}
        {[0.25, 0.5, 0.75].map((p, i) => (
          <div key={`h${i}`} className={`absolute left-0 h-px w-full ${line}`} style={{ top: `${p * 100}%` }} />
        ))}
      </motion.div>

      {/* Soft glow orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 300 + i * 100,
            height: 300 + i * 100,
            left: `${20 + i * 25}%`,
            top: `${30 + (i % 2) * 20}%`,
            background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
            x: mouse.normalizedX * (i + 1) * 8,
            y: mouse.normalizedY * (i + 1) * 8
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
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
    iconBg: d ? 'bg-white/[0.05]' : 'bg-black/5',
    btn: d ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/90',
    btnSec: d ? 'border-white/30 text-white hover:bg-white/10' : 'border-black/30 text-black hover:bg-black/10',
    divider: d ? 'border-white/[0.05]' : 'border-black/[0.05]',
  };
}

// ============================================
// SCROLL PROGRESS
// ============================================
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();
  return <motion.div className={`fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left transition-colors duration-500 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} style={{ scaleX: scrollYProgress }} />;
}

// ============================================
// DATA
// ============================================
const services = [
  { icon: "fa-solid fa-briefcase", title: "Businessfotografie", description: "Professionelle Business Portraits", href: "/leistungen/businessfotografie/", price: "Ab 100", popular: true, image: "/images/portfolio/portraits/DSC_3017.jpg" },
  { icon: "fa-solid fa-calendar-days", title: "Eventfotografie", description: "Firmenveranstaltungen & Galas", href: "/leistungen/eventfotografie/", price: "Ab 400", image: "/images/portfolio/events/tu-wien/tu-wien-event-01.jpg" },
  { icon: "fa-solid fa-user", title: "Portraitfotografie", description: "Authentische Porträtfotos", href: "/leistungen/portraitfotografie/", price: "Ab 150", image: "/images/portfolio/portraits/1-1.jpg" },
  { icon: "fa-solid fa-box", title: "Produktfotografie", description: "E-Commerce & Kataloge", href: "/leistungen/produktfotografie/", price: "Ab 25/Produkt", image: "/images/portfolio/products/DSC_0007-1.jpg" },
  { icon: "fa-solid fa-utensils", title: "Foodfotografie", description: "Restaurants & Hotels", href: "/leistungen/foodfotografie/", price: "Auf Anfrage", image: "/images/portfolio/food/DSC_8186.jpg" },
  { icon: "fa-solid fa-people-roof", title: "Familienfotografie", description: "Studio oder Outdoor", href: "/leistungen/familienfotografie/", price: "Ab 200", image: "/images/portfolio/family/DSC_0987-1.jpg" },
];

const clients = [
  { name: "Thales", logo: "/images/clients/Thales_Group-Logo.wine.png", scale: 1.6 },
  { name: "TU Wien", logo: "/images/clients/tu-wien-logo.png", scale: 1 },
  { name: "Gourmet", logo: "/images/clients/gourmet-logo.png", scale: 1.4 },
  { name: "Gerstner", logo: "/images/clients/gerstner-logo.png", scale: 1.4 },
  { name: "AIM Group", logo: "/images/clients/aim group international.png", scale: 1.1 },
  { name: "First Event", logo: "/images/clients/cropped-first_event_logo.png", scale: 1.1 },
  { name: "Autonom Health", logo: "/images/clients/autonom_Health.png", scale: 1.2 },
];

const testimonials = [
  { quote: "Die Bilder zeigen unsere Produkte perfekt. Seine Professionalität hat unser Marketing erheblich unterstützt.", author: "Dr. med. Alfred Lohninger", position: "Geschäftsführer", company: "Autonom Health", initials: "AL" },
  { quote: "Seine Eventfotografie fängt die Atmosphäre und besonderen Momente perfekt ein.", author: "Dr. Birgit Hofreiter", position: "Programmleiterin", company: "TU Wien", initials: "BH" },
  { quote: "Seine kreative Herangehensweise hat unsere Produkte perfekt in Szene gesetzt.", author: "Katja Radlgruber", position: "CEO", company: "V-Suit", initials: "KR" },
];

const featuredProjects = [
  { slug: "cristina-studio", title: "Cristina", category: "Portrait", image: "/images/portfolio/portraits/1-1.jpg" },
  { slug: "tu-wien-event", title: "TU Wien", category: "Event", image: "/images/portfolio/events/tu-wien/tu-wien-event-01.jpg" },
  { slug: "autonom-health", title: "Produktfotos", category: "Produkt", image: "/images/portfolio/products/DSC_0007-1.jpg" },
  { slug: "gerstner-food", title: "Gerstner", category: "Food", image: "/images/portfolio/food/DSC_8186.jpg" },
];

const faqItems = [
  {
    question: "Was kostet ein Fotoshooting?",
    answer: "Die Preise variieren je nach Art des Shootings. Business Portraits starten ab 100, Eventfotografie ab 400, Produktfotos ab 25/Produkt. Kontaktieren Sie mich für ein individuelles Angebot."
  },
  {
    question: "Wie lange dauert es bis ich die Bilder bekomme?",
    answer: "Standardlieferung innerhalb von 5-7 Werktagen. Express-Lieferung in 48h ist gegen Aufpreis möglich."
  },
  {
    question: "Kann ich die Bilder kommerziell nutzen?",
    answer: "Ja, alle Business- und Produktfotos beinhalten eine kommerzielle Nutzungslizenz. Die genauen Nutzungsrechte werden im Vertrag festgehalten."
  },
  {
    question: "Was passiert wenn mir die Bilder nicht gefallen?",
    answer: "Ich biete eine Zufriedenheitsgarantie. Sollten Sie nicht zufrieden sein, gibt es eine kostenlose Nachbearbeitung oder Neuaufnahme der Bilder."
  },
];

// ============================================
// MAIN CONTENT
// ============================================
function MainContent() {
  const { theme } = useTheme();
  const g = useGlass();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const scroll = (dir: 'left' | 'right') => scrollRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });

  return (
    <main className={`relative transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <Header />
      <ScrollProgress />
      <WhatsAppButton />
      <BackToTop />
      <CookieConsent />

      {/* ========== 1. HERO - ABOVE THE FOLD ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero/fotograf-wien-hero.jpg"
            alt="Professionelle Fotografie in Wien"
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 35%' }}
          />
          <div className={`absolute inset-0 transition-colors duration-700 ${
            theme === 'dark'
              ? 'bg-gradient-to-b from-black/70 via-black/50 to-black/80'
              : 'bg-gradient-to-b from-white/60 via-white/40 to-white/70'
          }`} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Main Headline */}
          <motion.h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Professionelle Fotografie in Wien
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className={`text-xl md:text-2xl mb-8 ${theme === 'dark' ? 'text-white/80' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ihr Moment, perfekt festgehalten.
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            className={`flex flex-wrap justify-center gap-4 md:gap-6 mb-10 text-sm ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-star text-yellow-400" />
              <span className="font-semibold">5.0</span> Google
            </span>
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-camera" />
              <span className="font-semibold">500+</span> Projekte
            </span>
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-check-circle text-green-400" />
              Zufriedenheitsgarantie
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              href="/kontakt/"
              className={`px-8 py-4 font-semibold rounded-full transition-all inline-flex items-center justify-center gap-2 ${
                theme === 'dark'
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-black text-white hover:bg-black/90'
              }`}
            >
              <i className="fa-solid fa-paper-plane" />
              Kostenlos beraten lassen
            </Link>
            <Link
              href="/portfolio/"
              className={`px-8 py-4 border font-semibold rounded-full transition-all inline-flex items-center justify-center gap-2 ${
                theme === 'dark'
                  ? 'border-white/50 text-white hover:bg-white/10'
                  : 'border-black/50 text-gray-900 hover:bg-black/10'
              }`}
            >
              Portfolio ansehen
              <i className="fa-solid fa-arrow-right" />
            </Link>
          </motion.div>

          {/* Urgency Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
              theme === 'dark'
                ? 'bg-amber-500/20 text-amber-300'
                : 'bg-amber-500/10 text-amber-700'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Nur noch 3 Termine im Februar verfügbar
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <motion.div
              className={`w-6 h-10 border-2 rounded-full flex justify-center pt-2 ${theme === 'dark' ? 'border-white/30' : 'border-black/30'}`}
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className={`w-1 h-2 rounded-full ${theme === 'dark' ? 'bg-white/50' : 'bg-black/50'}`}
                animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========== 2. SOCIAL PROOF - CLIENT LOGOS ========== */}
      <section className={`relative py-12 overflow-hidden transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`text-center text-sm mb-8 ${g.textMuted}`}
          >
            Vertrauen von führenden Unternehmen
          </motion.p>

          {/* Infinite Marquee */}
          <div className="relative overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-r from-[#0a0a0a] to-transparent' : 'bg-gradient-to-r from-gray-50 to-transparent'}`} />
            <div className={`absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-l from-[#0a0a0a] to-transparent' : 'bg-gradient-to-l from-gray-50 to-transparent'}`} />

            <motion.div
              className="flex gap-12 md:gap-16"
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[...clients, ...clients].map((c, i) => (
                <div key={`${c.name}-${i}`} className="flex-shrink-0">
                  <img
                    src={c.logo}
                    alt={c.name}
                    style={{ transform: `scale(${c.scale || 1})` }}
                    className={`h-10 md:h-12 w-auto object-contain transition-all duration-500 ${
                      theme === 'dark'
                        ? 'brightness-0 invert opacity-40'
                        : 'grayscale opacity-40'
                    }`}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== 3. WIE ES FUNKTIONIERT - 3 STEPS ========== */}
      <section className={`relative py-20 overflow-hidden transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <SubtleGridBg />
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-semibold tracking-tight mb-4 ${g.text}`}>
              So einfach geht&apos;s
            </h2>
            <p className={`max-w-xl mx-auto ${g.textSub}`}>
              In drei einfachen Schritten zu Ihren perfekten Fotos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: 1, title: "Anfrage senden", description: "Kostenlos & unverbindlich. Beschreiben Sie Ihr Projekt.", icon: "fa-paper-plane" },
              { step: 2, title: "Beratungsgespräch", description: "Wir besprechen Ihre Wünsche und planen das Shooting.", icon: "fa-comments" },
              { step: 3, title: "Fotoshooting", description: "Professionelle Aufnahmen und schnelle Lieferung.", icon: "fa-camera" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${g.card}`}>
                  <i className={`fa-solid ${item.icon} text-2xl ${g.icon}`} />
                  <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                    theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
                  }`}>
                    {item.step}
                  </span>
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${g.text}`}>{item.title}</h3>
                <p className={`text-sm ${g.textSub}`}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 4. SERVICES - COMPACT WITH PRICES ========== */}
      <section className={`relative py-20 overflow-hidden transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
        <SubtleGridBg />
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-semibold tracking-tight mb-4 ${g.text}`}>
              Meine Dienstleistungen
            </h2>
            <p className={`max-w-xl mx-auto ${g.textSub}`}>
              Transparente Preise, professionelle Qualität
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={s.href} className="group block">
                  <div className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${g.card} ${g.cardHover}`}>
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {s.popular && (
                        <span className="absolute top-3 right-3 text-[10px] font-semibold text-amber-500 bg-amber-500/20 backdrop-blur-sm px-2 py-1 rounded-full">
                          Beliebt
                        </span>
                      )}
                    </div>
                    {/* Content */}
                    <div className="p-4">
                      <h3 className={`font-semibold mb-1 ${g.text}`}>{s.title}</h3>
                      <p className={`text-xs mb-3 ${g.textSub}`}>{s.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${g.text}`}>{s.price}</span>
                        <span className={`text-xs ${g.textMuted} group-hover:gap-2 transition-all inline-flex items-center gap-1`}>
                          Details <i className="fa-solid fa-arrow-right text-[10px]" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 5. WARUM ICH - DIFFERENTIATORS ========== */}
      <section className={`relative py-20 overflow-hidden transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <SubtleGridBg />
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-semibold tracking-tight mb-4 ${g.text}`}>
              Warum Kunden mich wählen
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: "fa-clock", title: "12+ Jahre Erfahrung", desc: "Professionelle Fotografie in Wien seit 2012" },
              { icon: "fa-bolt", title: "Schnelle Lieferung", desc: "Standardlieferung in 5-7 Tagen, Express in 48h möglich" },
              { icon: "fa-calendar-check", title: "Flexible Termine", desc: "Auch Wochenende und Abendtermine verfügbar" },
              { icon: "fa-shield", title: "Zufriedenheitsgarantie", desc: "Nicht zufrieden? Kostenlose Nachbearbeitung" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-start gap-4 p-5 rounded-2xl ${g.card}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  theme === 'dark' ? 'bg-green-500/20' : 'bg-green-500/10'
                }`}>
                  <i className={`fa-solid ${item.icon} text-green-500`} />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${g.text}`}>{item.title}</h3>
                  <p className={`text-sm ${g.textSub}`}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 6. TESTIMONIALS ========== */}
      <section className={`relative py-20 overflow-hidden transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
        <SubtleGridBg />
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-semibold tracking-tight mb-4 ${g.text}`}>
              Was Kunden sagen
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-2xl ${g.card}`}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <i key={j} className="fa-solid fa-star text-yellow-400 text-sm" />
                  ))}
                </div>
                {/* Quote */}
                <p className={`text-sm mb-6 leading-relaxed ${g.textSub}`}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/10 text-gray-700'
                  }`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${g.text}`}>{t.author}</p>
                    <p className={`text-xs ${g.textMuted}`}>{t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 7. PORTFOLIO PREVIEW ========== */}
      <section className={`relative py-20 overflow-hidden transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <SubtleGridBg />
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <h2 className={`text-3xl md:text-4xl font-semibold tracking-tight mb-2 ${g.text}`}>
                Ausgewählte Arbeiten
              </h2>
              <p className={`${g.textSub}`}>Ein Einblick in meine aktuellen Projekte</p>
            </div>
            <div className="hidden md:flex gap-2">
              {['left', 'right'].map(dir => (
                <button
                  key={dir}
                  onClick={() => scroll(dir as 'left' | 'right')}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${g.card} ${g.cardHover}`}
                >
                  <i className={`fa-solid fa-chevron-${dir} ${g.icon}`} />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none' }}
          >
            {featuredProjects.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-shrink-0 snap-start w-[280px] md:w-[320px]"
              >
                <Link href={`/portfolio/${p.slug}/`} className="group block">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className={`inline-block px-2 py-1 text-[10px] font-medium rounded-full mb-2 bg-white/20 text-white backdrop-blur-sm`}>
                        {p.category}
                      </span>
                      <h3 className="text-white font-semibold">{p.title}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Link
              href="/portfolio/"
              className={`inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full transition-all ${g.btn}`}
            >
              Alle Projekte ansehen <i className="fa-solid fa-arrow-right" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== 8. FAQ ========== */}
      <section className={`relative py-20 overflow-hidden transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
        <SubtleGridBg />
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-semibold tracking-tight mb-4 ${g.text}`}>
              Häufige Fragen
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqItems.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-xl overflow-hidden ${g.card}`}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className={`w-full flex items-center justify-between p-5 text-left transition-colors ${g.cardHover}`}
                >
                  <span className={`font-medium ${g.text}`}>{faq.question}</span>
                  <i className={`fa-solid fa-chevron-down transition-transform duration-300 ${g.icon} ${expandedFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className={`px-5 pb-5 text-sm leading-relaxed ${g.textSub}`}>
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 9. FINAL CTA ========== */}
      <section className={`relative py-24 overflow-hidden transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <SubtleGridBg />
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-10 md:p-16 rounded-3xl text-center ${g.card}`}
          >
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 ${g.text}`}>
              Bereit für Ihr Fotoshooting?
            </h2>

            {/* Contact Methods */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8">
              <a
                href="tel:+436608459895"
                className={`flex items-center gap-2 text-lg ${g.text} hover:opacity-70 transition-opacity`}
              >
                <i className="fa-solid fa-phone" />
                +43 660 845 9895
              </a>
              <a
                href="mailto:info@fotoinwien.at"
                className={`flex items-center gap-2 text-lg ${g.text} hover:opacity-70 transition-opacity`}
              >
                <i className="fa-solid fa-envelope" />
                info@fotoinwien.at
              </a>
              <a
                href="https://wa.me/436608459895"
                className={`flex items-center gap-2 text-lg ${g.text} hover:opacity-70 transition-opacity`}
              >
                <i className="fa-brands fa-whatsapp" />
                WhatsApp
              </a>
            </div>

            {/* Main CTA */}
            <Link
              href="/kontakt/"
              className={`inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-semibold rounded-full transition-all ${g.btn}`}
            >
              <i className="fa-solid fa-paper-plane" />
              Jetzt kostenlos beraten lassen
            </Link>

            {/* Trust signals */}
            <div className={`flex flex-wrap justify-center gap-6 mt-8 text-sm ${g.textMuted}`}>
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-clock" />
                Antwort in 24h
              </span>
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-hand-holding-heart" />
                Unverbindlich
              </span>
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-credit-card" />
                Keine Anzahlung
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== 10. FOOTER ========== */}
      <footer className={`relative py-16 overflow-hidden transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <SubtleGridBg />
        <div className={`absolute inset-0 transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0a0a0a]/90' : 'bg-white/90'}`} />

        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Logo & Description */}
            <div>
              <img
                src="/images/logos/fotograf-wien-logo.svg"
                alt="Foto in Wien"
                className={`h-10 w-auto mb-4 transition-all duration-500 ${theme === 'dark' ? '' : 'invert'}`}
              />
              <p className={`text-sm ${g.textMuted}`}>
                Professionelle Fotografie in Wien seit 2012.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className={`font-semibold mb-4 ${g.text}`}>Navigation</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Startseite', href: '/' },
                  { label: 'Portfolio', href: '/portfolio/' },
                  { label: 'Leistungen', href: '/leistungen/' },
                  { label: 'Kontakt', href: '/kontakt/' },
                ].map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className={`text-sm transition-colors hover:opacity-70 ${g.textMuted}`}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className={`font-semibold mb-4 ${g.text}`}>Leistungen</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Businessfotografie', href: '/leistungen/businessfotografie/' },
                  { label: 'Eventfotografie', href: '/leistungen/eventfotografie/' },
                  { label: 'Portraitfotografie', href: '/leistungen/portraitfotografie/' },
                  { label: 'Produktfotografie', href: '/leistungen/produktfotografie/' },
                ].map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className={`text-sm transition-colors hover:opacity-70 ${g.textMuted}`}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className={`font-semibold mb-4 ${g.text}`}>Kontakt</h4>
              <ul className={`space-y-2 text-sm ${g.textMuted}`}>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-location-dot w-4" />
                  Wien, Österreich
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-envelope w-4" />
                  info@fotoinwien.at
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-phone w-4" />
                  +43 660 845 9895
                </li>
                <li className="flex items-center gap-2 mt-3">
                  <i className="fa-solid fa-clock w-4" />
                  Mo-Fr: 09:00 - 18:00
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-calendar w-4" />
                  Sa: Nach Vereinbarung
                </li>
              </ul>
              {/* Social */}
              <div className="flex gap-4 mt-4">
                {[
                  { icon: 'instagram', href: 'https://www.instagram.com/fotoinwien/' },
                  { icon: 'facebook', href: 'https://www.facebook.com/fotoinwien/' },
                  { icon: 'whatsapp', href: 'https://wa.me/436608459895' },
                ].map(s => (
                  <a
                    key={s.icon}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-colors hover:opacity-70 ${g.textMuted}`}
                  >
                    <i className={`fa-brands fa-${s.icon} text-xl`} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className={`border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 ${g.divider}`}>
            <p className={`text-sm ${g.textMuted}`}>
              © 2026 fotoinwien.at. Alle Rechte vorbehalten.
            </p>
            <div className={`flex gap-6 text-sm ${g.textMuted}`}>
              <Link href="/impressum/" className="hover:opacity-70 transition-opacity">Impressum</Link>
              <Link href="/datenschutz/" className="hover:opacity-70 transition-opacity">Datenschutz</Link>
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
export default function TestHomeV4() {
  return (
    <ThemeProvider>
      <MouseProvider>
        <MainContent />
      </MouseProvider>
    </ThemeProvider>
  );
}
