'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, createContext, useContext, useRef, ReactNode, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
// DYNAMIC URGENCY - Get current/next month in German
// ============================================
function getUrgencyMonth(): string {
  const months = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];
  const now = new Date();
  const day = now.getDate();
  // If after 20th of month, show next month
  const monthIndex = day > 20 ? (now.getMonth() + 1) % 12 : now.getMonth();
  return months[monthIndex];
}

// ============================================
// STICKY HEADER (theme toggle removed)
// ============================================
function Header() {
  const { theme } = useTheme();
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
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[300] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded"
      >
        Zum Inhalt springen
      </a>
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
            <Link href="/" className="relative z-10">
              <motion.div whileHover={{ scale: 1.02 }}>
                <Image
                  src="/images/logos/fotograf-wien-logo.svg"
                  alt="Foto in Wien - Professioneller Fotograf"
                  width={150}
                  height={48}
                  className={`h-10 md:h-12 w-auto transition-all duration-500 ${isDark ? '' : 'invert'}`}
                  priority
                />
              </motion.div>
            </Link>

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

            <div className="flex items-center gap-3">
              {/* CTA Button */}
              <Link
                href="/kontakt/"
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all bg-white text-black hover:bg-white/90"
              >
                Jetzt Termin sichern
              </Link>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-white/10 hover:bg-white/20 text-white"
                whileTap={{ scale: 0.95 }}
              >
                <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-sm`} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-[190] lg:hidden ${isDark ? 'bg-[#0a0a0a]/95' : 'bg-white/95'} backdrop-blur-xl`}
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
                transition={{ duration: 0.3, delay: 0.4 }}
                className={`mt-4 flex items-center gap-2 text-lg ${isDark ? 'text-white/70' : 'text-gray-600'}`}
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
function WhatsAppButton({ cookieVisible }: { cookieVisible: boolean }) {
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
      className={`fixed right-6 z-[180] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl bg-[#25D366] text-white hover:bg-[#20BD5A] transition-all duration-300 ${
        cookieVisible ? 'bottom-24 md:bottom-6' : 'bottom-6'
      }`}
      aria-label="WhatsApp kontaktieren"
    >
      <i className="fa-brands fa-whatsapp text-2xl" />
    </motion.a>
  );
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
function BackToTop({ cookieVisible }: { cookieVisible: boolean }) {
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
          className={`fixed left-6 z-[180] w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
              : 'bg-black/5 text-gray-700 hover:bg-black/10 backdrop-blur-sm'
          } ${cookieVisible ? 'bottom-24 md:bottom-6' : 'bottom-6'}`}
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
function CookieConsent({ onVisibilityChange }: { onVisibilityChange: (visible: boolean) => void }) {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setVisible(true);
        onVisibilityChange(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [onVisibilityChange]);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ necessary: true, analytics: true, marketing: true }));
    setVisible(false);
    onVisibilityChange(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ necessary: true, analytics: false, marketing: false }));
    setVisible(false);
    onVisibilityChange(false);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed bottom-0 left-0 right-0 z-[250] p-3 md:p-6 ${
          isDark
            ? 'bg-[#1a1a1a]/95 border-t border-white/10'
            : 'bg-white/95 border-t border-black/5 shadow-2xl'
        } backdrop-blur-xl`}
      >
        <div className="container mx-auto px-2 md:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            <div className="flex-1 text-center md:text-left">
              <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <i className="fa-solid fa-cookie-bite mr-2" />
                Diese Website verwendet Cookies.{' '}
                <Link href="/datenschutz/" className="underline hover:no-underline">
                  Mehr erfahren
                </Link>
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={acceptNecessary}
                className={`flex-1 md:flex-none px-3 md:px-4 py-2 text-xs md:text-sm font-medium rounded-full transition-all ${
                  isDark
                    ? 'border border-white/20 text-white hover:bg-white/10'
                    : 'border border-black/20 text-gray-600 hover:bg-black/5'
                }`}
              >
                Nur notwendige
              </button>
              <button
                onClick={acceptAll}
                className={`flex-1 md:flex-none px-4 md:px-6 py-2 text-xs md:text-sm font-medium rounded-full transition-all ${
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
// STICKY CTA BAR
// ============================================
function StickyCTABar() {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [ctaInView, setCtaInView] = useState(false);
  const isDark = theme === 'dark';
  const urgencyMonth = useMemo(() => getUrgencyMonth(), []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const ctaSection = document.getElementById('cta-section');

      if (ctaSection) {
        const rect = ctaSection.getBoundingClientRect();
        setCtaInView(rect.top < window.innerHeight && rect.bottom > 0);
      }

      setVisible(scrollY > 500 && !ctaInView);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ctaInView]);

  return (
    <AnimatePresence>
      {visible && !ctaInView && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-20 left-0 right-0 z-[150] py-3 ${
            isDark
              ? 'bg-[#0a0a0a]/90 border-b border-white/10'
              : 'bg-white/90 border-b border-black/5 shadow-sm'
          } backdrop-blur-xl`}
        >
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="flex items-center justify-between">
              <div className="hidden md:flex items-center gap-4">
                <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                  <i className="fa-solid fa-calendar-check mr-2" />
                  Nur noch 3 Termine im {urgencyMonth} verfügbar
                </span>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
                <a
                  href="tel:+436608459895"
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    isDark
                      ? 'bg-white/10 text-white hover:bg-white/20'
                      : 'bg-black/5 text-gray-700 hover:bg-black/10'
                  }`}
                >
                  <i className="fa-solid fa-phone" />
                  +43 660 845 9895
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================
// EXIT INTENT POPUP
// ============================================
function ExitIntentPopup() {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const isDark = theme === 'dark';

  const triggerExitIntent = useCallback(() => {
    const hasShown = sessionStorage.getItem('exit-intent-shown');
    if (hasShown) return;
    setVisible(true);
    sessionStorage.setItem('exit-intent-shown', 'true');
  }, []);

  useEffect(() => {
    const hasShown = sessionStorage.getItem('exit-intent-shown');
    if (hasShown) return;

    // Desktop: mouse leave detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        triggerExitIntent();
      }
    };

    // Mobile: rapid scroll up detection
    let lastScrollY = window.scrollY;
    let scrollUpDistance = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = lastScrollY - currentScrollY;

      // If scrolling up
      if (scrollDiff > 0) {
        scrollUpDistance += scrollDiff;
        // If rapid scroll up > 300px while in upper half of page
        if (scrollUpDistance > 300 && currentScrollY < window.innerHeight * 0.5) {
          triggerExitIntent();
        }
      } else {
        // Reset on scroll down
        scrollUpDistance = 0;
      }
      lastScrollY = currentScrollY;
    };

    // Timeout trigger: 45 seconds on page without conversion
    const timeoutTimer = setTimeout(() => {
      triggerExitIntent();
    }, 45000);

    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timeoutTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [triggerExitIntent]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setVisible(false)}
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`relative max-w-md w-full p-8 rounded-3xl shadow-2xl ${
            isDark
              ? 'bg-[#1a1a1a] border border-white/10'
              : 'bg-white border border-black/5'
          }`}
        >
          <button
            onClick={() => setVisible(false)}
            className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isDark ? 'hover:bg-white/10 text-white/50' : 'hover:bg-black/5 text-gray-400'
            }`}
          >
            <i className="fa-solid fa-xmark" />
          </button>

          <div className="text-center">
            <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
              isDark ? 'bg-white/10' : 'bg-black/5'
            }`}>
              <i className={`fa-solid fa-gift text-2xl ${isDark ? 'text-white' : 'text-black'}`} />
            </div>

            <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Bevor Sie gehen...
            </h3>

            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Sichern Sie sich <span className="font-bold">10% Rabatt</span> auf Ihr erstes Fotoshooting!
            </p>

            <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Erwähnen Sie diesen Code bei Ihrer Anfrage:
              </p>
              <p className={`text-xl font-mono font-bold mt-1 ${isDark ? 'text-white' : 'text-black'}`}>
                WILLKOMMEN10
              </p>
            </div>

            <Link
              href="/kontakt/"
              onClick={() => setVisible(false)}
              className={`inline-flex items-center justify-center gap-2 w-full px-6 py-4 font-semibold rounded-full transition-all ${
                isDark
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-black text-white hover:bg-black/90'
              }`}
            >
              <i className="fa-solid fa-paper-plane" />
              Jetzt Angebot anfordern
            </Link>

            <p className={`text-xs mt-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Gültig für Neukunden. Nicht kombinierbar.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================
// BACKGROUND COMPONENTS
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

  const fibRects = [
    { w: 61.8, h: 61.8, x: 38.2, y: 0 },
    { w: 38.2, h: 38.2, x: 0, y: 0 },
    { w: 23.6, h: 23.6, x: 0, y: 38.2 },
    { w: 14.6, h: 14.6, x: 23.6, y: 38.2 },
  ];

  const goldenPoints = [
    { x: 38.2, y: 38.2 },
    { x: 61.8, y: 38.2 },
    { x: 38.2, y: 61.8 },
    { x: 61.8, y: 61.8 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
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
          <motion.div
            className={`absolute w-8 h-8 rounded-full border ${borderLight} -translate-x-1/2 -translate-y-1/2`}
            animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 4, delay: i * 0.8, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className={`absolute w-4 h-4 rounded-full border ${border} -translate-x-1/2 -translate-y-1/2`}
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className={`absolute w-1.5 h-1.5 rounded-full ${dot} -translate-x-1/2 -translate-y-1/2`}
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      ))}

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
  { icon: "fa-solid fa-calendar-days", title: "Eventfotografie", description: "Eventfotograf in Wien für Firmenveranstaltungen, Konferenzen und Galas. Professionelle Dokumentation.", href: "/leistungen/eventfotografie/", price: "Ab €400", image: "/images/portfolio/events/tu-wien/tu-wien-event-01.jpg", popular: true },
  { icon: "fa-solid fa-briefcase", title: "Businessfotografie", description: "Business Portraits und Mitarbeiterfotos in Wien. Professionelle Bilder für LinkedIn, Website und Marketing.", href: "/leistungen/businessfotografie/", price: "Ab €100", image: "/images/portfolio/portraits/DSC_3017.jpg" },
  { icon: "fa-solid fa-user", title: "Portraitfotografie", description: "Professionelle Porträtfotos in Wien. Authentische Aufnahmen im Studio oder an Outdoor-Locations.", href: "/leistungen/portraitfotografie/", price: "Ab €150", image: "/images/portfolio/portraits/1-1.jpg" },
  { icon: "fa-solid fa-box", title: "Produktfotografie", description: "Produktfotos für E-Commerce und Kataloge in Wien. Freisteller und Lifestyle-Aufnahmen.", href: "/leistungen/produktfotografie/", price: "Ab €25/Stk", image: "/images/portfolio/products/DSC_0007-1.jpg" },
  { icon: "fa-solid fa-utensils", title: "Foodfotografie", description: "Food Fotografie in Wien für Restaurants, Hotels und Social Media. Appetitliche Aufnahmen.", href: "/leistungen/foodfotografie/", price: "Ab €350", image: "/images/portfolio/food/DSC_8186.jpg" },
  { icon: "fa-solid fa-people-roof", title: "Familienfotografie", description: "Familienfotograf in Wien. Natürliche Familienfotos im Studio oder Outdoor in Wien.", href: "/leistungen/familienfotografie/", price: "Ab €200", image: "/images/portfolio/family/DSC_0987-1.jpg" },
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
  {
    quote: "Die Bilder zeigen unsere Produkte perfekt. Nach dem Shooting haben wir eine 35% höhere Conversion-Rate in unserem Online-Shop verzeichnet.",
    author: "Dr. med. Alfred Lohninger",
    position: "Geschäftsführer",
    company: "Autonom Health",
  },
  {
    quote: "Seine Eventfotografie fängt die Atmosphäre perfekt ein. Die Bilder wurden über 500 Mal auf LinkedIn geteilt und haben unsere Reichweite verdreifacht.",
    author: "Dr. Birgit Hofreiter",
    position: "Programmleiterin",
    company: "TU Wien i2ncubator",
  },
  {
    quote: "Seine kreative Herangehensweise hat unsere Produkte perfekt in Szene gesetzt. Unsere Instagram-Engagement ist um 40% gestiegen.",
    author: "Katja Radlgruber",
    position: "CEO",
    company: "V-Suit",
  },
  {
    quote: "Die hochwertigen Bilder haben die Spendenrate auf unserer Website um 25% erhöht. Ein echter Gamechanger für unsere gemeinnützige Arbeit.",
    author: "Andrea Staudenherzl",
    position: "Vorstandsmitglied",
    company: "Hope for the Future",
  },
];

const featuredProjects = [
  { slug: "cristina-studio", title: "Cristina", category: "Portrait", description: "Studio Portrait", dark: true, image: "/images/portfolio/portraits/1-1.jpg" },
  { slug: "andrei-portrait", title: "Andrei", category: "Portrait", description: "Portrait Studio", dark: false, image: "/images/portfolio/portraits/2.jpg" },
  { slug: "katarina-boudoir", title: "Katarina", category: "Boudoir", description: "Portrait Studio", dark: true, image: "/images/portfolio/boudoir/1-scaled.jpg" },
  { slug: "tu-wien-event", title: "TU Wien", category: "Event", description: "i2ncubator", dark: true, image: "/images/portfolio/events/tu-wien/tu-wien-event-01.jpg" },
  { slug: "autonom-health", title: "Produktfotos", category: "Produkt", description: "Produktfotografie", dark: false, image: "/images/portfolio/products/DSC_0007-1.jpg" },
  { slug: "gerstner-food", title: "Gerstner", category: "Food", description: "Kulinarik", dark: true, image: "/images/portfolio/food/DSC_8186.jpg" },
];

const faqItems = [
  { question: "Was kostet ein Fotoshooting?", answer: "Die Preise variieren je nach Art des Shootings. Business Portraits starten ab €100, Eventfotografie ab €400, Produktfotos ab €25/Produkt. Kontaktieren Sie mich für ein individuelles Angebot." },
  { question: "Wie lange dauert es bis ich die Bilder bekomme?", answer: "Standardlieferung innerhalb von 5-7 Werktagen. Express-Lieferung in 48h ist gegen Aufpreis möglich." },
  { question: "Kann ich die Bilder kommerziell nutzen?", answer: "Ja, alle Business- und Produktfotos beinhalten eine kommerzielle Nutzungslizenz. Die genauen Nutzungsrechte werden im Vertrag festgehalten." },
  { question: "Was passiert wenn mir die Bilder nicht gefallen?", answer: "Ich biete eine Zufriedenheitsgarantie. Sollten Sie nicht zufrieden sein, gibt es eine kostenlose Nachbearbeitung oder Neuaufnahme der Bilder." },
  { question: "Wo findet das Shooting statt?", answer: "Je nach Wunsch entweder in meinem Studio in Wien, bei Ihnen vor Ort (Büro, Event-Location) oder an einem Outdoor-Standort Ihrer Wahl in Wien und Umgebung." },
  { question: "Was muss ich mitbringen?", answer: "Für Business-Portraits empfehle ich 2-3 Outfit-Optionen. Für Produktfotos sollten die Produkte sauber und unbeschädigt sein. Bei Events organisiere ich alles vor Ort." },
  { question: "Wie viele Bilder bekomme ich?", answer: "Das hängt vom Paket ab. Bei Portraits erhalten Sie typischerweise 15-30 bearbeitete Bilder, bei Events 100-300 Bilder, bei Produkten alle vereinbarten Aufnahmen." },
  { question: "Kann ich die Location selbst wählen?", answer: "Ja, absolut! Ich bin flexibel und komme gerne zu Ihrer Wunsch-Location in Wien und Umgebung. Fahrtkosten innerhalb Wiens sind inklusive." },
];

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
// GLASSMORPHISM HELPER
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
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [cookieVisible, setCookieVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const urgencyMonth = useMemo(() => getUrgencyMonth(), []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => setCurrentTestimonial(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const scroll = (dir: 'left' | 'right') => scrollRef.current?.scrollBy({ left: dir === 'left' ? -360 : 360, behavior: 'smooth' });

  return (
    <main id="main-content" className={`relative transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <Header />
      <StickyCTABar />
      <WhatsAppButton cookieVisible={cookieVisible} />
      <BackToTop cookieVisible={cookieVisible} />
      <CookieConsent onVisibilityChange={setCookieVisible} />
      <ExitIntentPopup />

      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/fotograf-wien-hero.jpg"
            alt="Professioneller Fotograf in Wien - Studio mit Kameraausrüstung"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: '50% 35%' }}
            sizes="100vw"
          />
          <div className={`absolute inset-0 transition-colors duration-700 ${
            theme === 'dark'
              ? 'bg-gradient-to-b from-black/70 via-black/50 to-black/80'
              : 'bg-gradient-to-b from-white/60 via-white/40 to-white/70'
          }`} />
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.p
            className={`text-xs uppercase tracking-[0.5em] mb-8 ${theme === 'dark' ? 'text-white/70' : 'text-gray-700'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Professionelle Fotografie in Wien
          </motion.p>
          <motion.h1
            className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Ihr Fotograf in Wien
          </motion.h1>
          <motion.p
            className={`text-xl md:text-2xl mb-8 ${theme === 'dark' ? 'text-white/80' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Business · Event · Portrait · Produkt Fotografie seit 2012
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            className={`flex flex-wrap justify-center gap-4 md:gap-6 mb-10 text-sm ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <span className="flex items-center gap-2">
              <i className={`fa-solid fa-star ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
              <span className="font-semibold">5.0</span> Google
            </span>
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-camera" />
              <span className="font-semibold">500+</span> Projekte
            </span>
            <span className="flex items-center gap-2">
              <i className={`fa-solid fa-check-circle ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
              Zufriedenheitsgarantie
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link
              href="/kontakt/"
              className={`px-10 py-5 text-lg font-semibold rounded-full transition-all inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-black text-white hover:bg-black/90'
              }`}
            >
              <i className="fa-solid fa-paper-plane" />
              Kostenloses Angebot in 24h
            </Link>
            <Link
              href="/portfolio/"
              className={`px-6 py-3 border font-medium rounded-full transition-all inline-flex items-center justify-center gap-2 text-sm ${
                theme === 'dark'
                  ? 'border-white/30 text-white/80 hover:bg-white/10'
                  : 'border-black/30 text-gray-700 hover:bg-black/5'
              }`}
            >
              Portfolio ansehen <i className="fa-solid fa-arrow-right text-xs" />
            </Link>
          </motion.div>

          <motion.p
            className={`text-sm mb-8 ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.05 }}
          >
            Keine versteckten Kosten · Unverbindlich
          </motion.p>

          {/* Dynamic Urgency Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border ${
              theme === 'dark'
                ? 'bg-white/10 text-white border-white/20'
                : 'bg-black/5 text-black border-black/10'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></span>
              </span>
              Nur noch 3 Termine im {urgencyMonth} verfügbar
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-3 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            <motion.div
              className={`w-8 h-14 border-2 rounded-full flex justify-center pt-3 ${theme === 'dark' ? 'border-white/30' : 'border-black/30'}`}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className={`w-1.5 h-3 rounded-full ${theme === 'dark' ? 'bg-white/50' : 'bg-black/50'}`}
                animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========== CLIENTS ========== */}
      <Section background={<GoldenSpiralBg />}>
        <div className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
              <p className={`text-xs uppercase tracking-[0.3em] transition-colors duration-700 ${g.textMuted}`}>Vertrauen von führenden Unternehmen</p>
            </motion.div>

            <div className="relative overflow-hidden py-4">
              <div className={`absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-r from-[#0a0a0a] to-transparent' : 'bg-gradient-to-r from-white to-transparent'}`} />
              <div className={`absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-l from-[#0a0a0a] to-transparent' : 'bg-gradient-to-l from-white to-transparent'}`} />

              <motion.div
                className="flex gap-16 md:gap-24"
                animate={{ x: [0, -1400] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                {[...clients, ...clients].map((c, i) => (
                  <div key={`${c.name}-${i}`} className="flex-shrink-0 group cursor-pointer">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-[140px] md:w-[180px] h-16 md:h-20 flex items-center justify-center relative">
                        <Image
                          src={c.logo}
                          alt={`${c.name} - Business Fotografie Referenz Wien`}
                          width={180}
                          height={60}
                          style={{ transform: `scale(${c.scale || 1})` }}
                          className={`max-h-12 md:max-h-[60px] w-auto object-contain transition-all duration-500 ${
                            theme === 'dark'
                              ? 'brightness-0 invert opacity-50 group-hover:opacity-100'
                              : 'grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* ========== ABOUT ========== */}
      <Section background={<GoldenSpiralBg />}>
        <div className="py-20">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-6xl mx-auto">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
                <div className={`p-4 rounded-3xl shadow-2xl ${g.card}`}>
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/hero/fotograf-wien-studio.jpg"
                      alt="Alexandru Bogdan - Professioneller Fotograf in Wien seit 2012"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="absolute -bottom-6 -right-6 lg:right-auto lg:-left-6">
                  <div className={`p-6 rounded-2xl shadow-2xl ${g.card}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}>
                        <i className={`fa-solid fa-award text-lg ${theme === 'dark' ? 'text-black' : 'text-white'}`} />
                      </div>
                      <div>
                        <p className={`text-2xl font-bold transition-colors duration-700 ${g.text}`}>12+</p>
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
                  <p>Mit über 12 Jahren Erfahrung in der Portraitfotografie, Business Fotografie, Familienfotografie, Produktfotografie und Eventfotografie.</p>
                  <p>Meine Leidenschaft ist es, die Geschichte hinter jedem Bild zu erzählen und authentische Momente festzuhalten.</p>
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  {[{ value: "500+", label: "Projekte" }, { value: "100%", label: "Zufriedenheit" }].map(s => (
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

      {/* ========== PORTFOLIO ========== */}
      <Section background={<ViewfinderBg />}>
        <div className="py-20">
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

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`lg:hidden text-center mb-4 text-sm ${g.textMuted}`}
            >
              <i className="fa-solid fa-arrow-left mr-2" />
              Wischen
              <i className="fa-solid fa-arrow-right ml-2" />
            </motion.div>

            <div
              ref={scrollRef}
              role="region"
              aria-label="Portfolio Projekte Carousel"
              tabIndex={0}
              className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/20 dark:focus:ring-white/20 rounded-lg"
              style={{ scrollbarWidth: 'none' }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  scroll('left');
                } else if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  scroll('right');
                }
              }}
              onMouseDown={(e) => {
                const el = scrollRef.current;
                if (!el) return;
                el.dataset.isDragging = 'true';
                el.dataset.startX = String(e.pageX - el.offsetLeft);
                el.dataset.scrollLeft = String(el.scrollLeft);
                el.style.scrollBehavior = 'auto';
              }}
              onMouseMove={(e) => {
                const el = scrollRef.current;
                if (!el || el.dataset.isDragging !== 'true') return;
                e.preventDefault();
                const x = e.pageX - el.offsetLeft;
                const walk = (x - Number(el.dataset.startX)) * 1.5;
                el.scrollLeft = Number(el.dataset.scrollLeft) - walk;
              }}
              onMouseUp={() => {
                const el = scrollRef.current;
                if (el) {
                  el.dataset.isDragging = 'false';
                  el.style.scrollBehavior = 'smooth';
                }
              }}
              onMouseLeave={() => {
                const el = scrollRef.current;
                if (el) {
                  el.dataset.isDragging = 'false';
                  el.style.scrollBehavior = 'smooth';
                }
              }}
            >
              {featuredProjects.map((p, i) => (
                <motion.div key={p.slug} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i*0.1 }} className="flex-shrink-0 snap-start" style={{ width: "340px" }}>
                  <Link href={`/portfolio/${p.slug}/`} className="group block h-full" draggable={false}>
                    <div className="relative h-[440px] rounded-3xl overflow-hidden">
                      <div className="absolute inset-0">
                        <Image
                          src={p.image}
                          alt={`${p.title} - ${p.category} Fotografie Wien`}
                          fill
                          sizes="340px"
                          draggable={false}
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 transition-opacity duration-500 ${p.dark ? 'bg-gradient-to-t from-black/80 via-black/20 to-black/30' : 'bg-gradient-to-t from-white/90 via-white/30 to-white/40'}`} />
                      </div>

                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="absolute inset-4">
                          <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/30" />
                          <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/30" />
                          <div className="absolute top-1/3 left-0 right-0 h-px bg-white/30" />
                          <div className="absolute top-2/3 left-0 right-0 h-px bg-white/30" />
                        </div>
                        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/70" />
                        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/70" />
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/70" />
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/70" />
                      </div>

                      <div className="relative z-10 h-full p-6 flex flex-col">
                        <div>
                          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 backdrop-blur-sm ${p.dark ? 'bg-white/20 text-white' : 'bg-black/10 text-gray-800'}`}>{p.category}</span>
                        </div>
                        <div className="mt-auto">
                          <h3 className={`text-2xl font-semibold mb-1 tracking-tight ${p.dark ? 'text-white' : 'text-gray-900'}`}>{p.title}</h3>
                          <p className={`text-sm mb-4 ${p.dark ? 'text-gray-300' : 'text-gray-600'}`}>{p.description}</p>
                          <span className={`inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all ${p.dark ? 'text-white/90' : 'text-gray-700'}`}>
                            Projekt ansehen <i className="fa-solid fa-arrow-right text-xs" />
                          </span>
                        </div>
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

      {/* ========== SERVICES ========== */}
      <Section background={<GoldenSpiralBg />}>
        <div className="py-20">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 tracking-tight transition-colors duration-700 ${g.text}`}>Meine Dienstleistungen</h2>
              <p className={`max-w-2xl mx-auto text-lg transition-colors duration-700 ${g.textSub}`}>Vielseitige Fotografie-Dienstleistungen für Unternehmen und Privatpersonen in Wien.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((s, i) => (
                <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i*0.05 }}>
                  <Link href={s.href} className="group block">
                    <div className={`relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${g.card}`}>
                      <div className="flex flex-row h-[180px]">
                        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`text-base sm:text-lg font-semibold transition-colors duration-500 ${g.text}`}>{s.title}</h3>
                              {s.popular && (
                                <span className="text-[10px] font-semibold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">
                                  Beliebt
                                </span>
                              )}
                            </div>
                            <p className={`text-xs leading-relaxed line-clamp-3 transition-colors duration-500 ${g.textSub}`}>{s.description}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-semibold transition-colors duration-500 ${g.text}`}>
                              {s.price}
                            </span>
                            <span className={`inline-flex items-center gap-1.5 text-xs font-medium group-hover:gap-2 transition-all ${g.textMuted}`}>
                              Details <i className="fa-solid fa-arrow-right text-[10px]" />
                            </span>
                          </div>
                        </div>
                        <div className="relative w-[140px] sm:w-[160px] overflow-hidden flex-shrink-0">
                          <Image
                            src={s.image}
                            alt={`${s.title} Wien - Professionelle Fotografie Beispiel`}
                            fill
                            sizes="(max-width: 640px) 140px, 160px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ========== WARUM ICH ========== */}
      <Section background={<ViewfinderBg />}>
        <div className="py-16">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 tracking-tight transition-colors duration-700 ${g.text}`}>Warum Kunden mich wählen</h2>
              <p className={`max-w-xl mx-auto text-lg transition-colors duration-700 ${g.textSub}`}>Was mich von anderen Fotografen in Wien unterscheidet</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: "fa-clock", title: "12+ Jahre Erfahrung", desc: "Professionelle Fotografie in Wien seit 2012" },
                { icon: "fa-bolt", title: "Schnelle Lieferung", desc: "Standard 5-7 Tage, Express 48h möglich" },
                { icon: "fa-calendar-check", title: "Flexible Termine", desc: "Auch Wochenende und Abendtermine" },
                { icon: "fa-shield", title: "Zufriedenheitsgarantie", desc: "Kostenlose Nachbearbeitung bei Unzufriedenheit" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-6 rounded-2xl ${g.card} ${g.cardHover} transition-all duration-300`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${g.iconBg}`}>
                      <i className={`fa-solid ${item.icon} text-lg ${g.icon}`} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold mb-1 ${g.text}`}>{item.title}</h3>
                      <p className={`text-sm ${g.textSub}`}>{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ========== TESTIMONIALS ========== */}
      <Section background={<GoldenSpiralBg />}>
        <div className="py-20">
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
                      {[...Array(5)].map((_, i) => <i key={i} className={`fa-solid fa-star text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`} />)}
                    </div>
                    <blockquote className={`text-xl md:text-2xl font-light italic leading-relaxed transition-colors duration-700 ${g.text}`}>
                      &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
                    </blockquote>
                    <div className="flex flex-col items-center gap-3">
                      <div>
                        <p className={`font-semibold text-lg transition-colors duration-700 ${g.text}`}>{testimonials[currentTestimonial].author}</p>
                        <p className={`transition-colors duration-700 ${g.textSub}`}>{testimonials[currentTestimonial].position}</p>
                        <p className={`text-sm transition-colors duration-700 ${g.textMuted}`}>{testimonials[currentTestimonial].company}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Testimonials Navigation">
                {testimonials.map((t, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === currentTestimonial}
                    aria-label={`Testimonial ${i + 1} von ${t.author}`}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === currentTestimonial ? `${theme === 'dark' ? 'bg-white' : 'bg-black'} w-8` : `${theme === 'dark' ? 'bg-white/30 hover:bg-white/50' : 'bg-black/30 hover:bg-black/50'} w-2`}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ========== SO EINFACH GEHT'S ========== */}
      <Section background={<FocusFrameBg />}>
        <div className="py-16">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 tracking-tight transition-colors duration-700 ${g.text}`}>So einfach geht&apos;s</h2>
              <p className={`max-w-xl mx-auto text-lg transition-colors duration-700 ${g.textSub}`}>In drei Schritten zu Ihren perfekten Fotos</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                { step: 1, title: "Anfrage senden", description: "Kostenlos & unverbindlich. Beschreiben Sie kurz Ihr Projekt und Ihre Wünsche.", icon: "fa-paper-plane" },
                { step: 2, title: "Beratungsgespräch", description: "Wir besprechen Details, Stil und Ablauf. Persönlich oder per Telefon.", icon: "fa-comments" },
                { step: 3, title: "Fotoshooting", description: "Entspannte Aufnahmen und schnelle Lieferung Ihrer professionellen Bilder.", icon: "fa-camera" },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="text-center"
                >
                  <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 ${g.card}`}>
                    <i className={`fa-solid ${item.icon} text-2xl ${g.icon}`} />
                    <span className={`absolute -top-3 -right-3 w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center ${
                      theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
                    }`}>
                      {item.step}
                    </span>
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${g.text}`}>{item.title}</h3>
                  <p className={`${g.textSub}`}>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ========== FAQ ========== */}
      <Section background={<FocusFrameBg />}>
        <div className="py-16">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 tracking-tight transition-colors duration-700 ${g.text}`}>Häufige Fragen</h2>
              <p className={`max-w-xl mx-auto text-lg transition-colors duration-700 ${g.textSub}`}>Antworten auf die wichtigsten Fragen</p>
            </motion.div>

            <div className="space-y-3">
              {faqItems.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`rounded-2xl overflow-hidden ${g.card}`}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    aria-expanded={expandedFaq === i}
                    aria-controls={`faq-answer-${i}`}
                    className={`w-full flex items-center justify-between p-6 text-left transition-colors ${g.cardHover}`}
                  >
                    <span className={`font-medium pr-4 ${g.text}`}>{faq.question}</span>
                    <i className={`fa-solid fa-chevron-down transition-transform duration-300 flex-shrink-0 ${g.icon} ${expandedFaq === i ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  <AnimatePresence>
                    {expandedFaq === i && (
                      <motion.div
                        id={`faq-answer-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className={`px-6 pb-6 leading-relaxed ${g.textSub}`}>
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ========== CTA ========== */}
      <Section background={<ViewfinderBg />}>
        <div id="cta-section" className="py-20">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
              <div className={`p-10 md:p-16 rounded-3xl text-center ${g.card}`}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-8">
                  <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center ${g.iconBg}`}>
                    <i className={`fa-solid fa-camera text-3xl transition-colors duration-700 ${g.icon}`} />
                  </div>
                  <h2 className={`text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight transition-colors duration-700 ${g.text}`}>Bereit für Ihr Fotoshooting?</h2>
                  <p className={`text-xl max-w-2xl mx-auto transition-colors duration-700 ${g.textSub}`}>Lassen Sie uns gemeinsam Ihre Vision verwirklichen. Kontaktieren Sie mich für ein unverbindliches Beratungsgespräch.</p>

                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                    <a href="tel:+436608459895" className={`flex items-center gap-2 ${g.text} hover:opacity-70 transition-opacity`}>
                      <i className="fa-solid fa-phone" /> +43 660 845 9895
                    </a>
                    <a href="mailto:info@fotoinwien.at" className={`flex items-center gap-2 ${g.text} hover:opacity-70 transition-opacity`}>
                      <i className="fa-solid fa-envelope" /> info@fotoinwien.at
                    </a>
                    <a href="https://wa.me/436608459895" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 ${g.text} hover:opacity-70 transition-opacity`}>
                      <i className="fa-brands fa-whatsapp" /> WhatsApp
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Link href="/kontakt/" className={`px-10 py-5 text-lg font-semibold rounded-full transition-all inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 ${g.btn}`}>
                      <i className="fa-solid fa-paper-plane" /> Kostenloses Angebot in 24h
                    </Link>
                  </div>
                  <p className={`text-sm ${g.textMuted}`}>
                    Keine versteckten Kosten · Unverbindlich
                  </p>
                  <div className={`flex flex-wrap justify-center gap-6 pt-2 text-sm transition-colors duration-700 ${g.textMuted}`}>
                    <span className="flex items-center gap-2"><i className="fa-solid fa-clock" /> Antwort in 24h</span>
                    <span className="flex items-center gap-2"><i className="fa-solid fa-hand-holding-heart" /> Unverbindlich</span>
                    <span className="flex items-center gap-2"><i className="fa-solid fa-credit-card" /> Keine Anzahlung</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ========== FOOTER ========== */}
      <footer className={`relative py-20 overflow-hidden transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <ViewfinderBg />
        <div className={`absolute inset-0 transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0a0a0a]/90' : 'bg-white/90'}`} />

        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <Image
                src="/images/logos/fotograf-wien-logo.svg"
                alt="Foto in Wien - Professioneller Fotograf"
                width={150}
                height={40}
                className={`h-10 w-auto mb-4 transition-all duration-500 ${theme === 'dark' ? '' : 'invert'}`}
              />
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
                <li className="flex items-center gap-2"><i className="fa-solid fa-location-dot w-4" /> Wien, Österreich</li>
                <li className="flex items-center gap-2"><i className="fa-solid fa-envelope w-4" /> info@fotoinwien.at</li>
                <li className="flex items-center gap-2"><i className="fa-solid fa-phone w-4" /> +43 660-845-9895</li>
                <li className="flex items-center gap-2 mt-3"><i className="fa-solid fa-clock w-4" /> Mo-Fr: 09:00 - 18:00</li>
                <li className="flex items-center gap-2"><i className="fa-solid fa-calendar w-4" /> Sa: Nach Vereinbarung</li>
              </ul>
              <div className="flex gap-4 mt-4">
                {[
                  { icon: 'instagram', href: 'https://www.instagram.com/fotoinwien/' },
                  { icon: 'facebook', href: 'https://www.facebook.com/fotoinwien/' },
                  { icon: 'whatsapp', href: 'https://wa.me/436608459895' }
                ].map(s => (
                  <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer" className={`transition-colors hover:opacity-70 ${g.textMuted}`}>
                    <i className={`fa-brands fa-${s.icon} text-xl`} />
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
export default function HomePage() {
  return (
    <ThemeProvider>
      <MouseProvider>
        <MainContent />
      </MouseProvider>
    </ThemeProvider>
  );
}
