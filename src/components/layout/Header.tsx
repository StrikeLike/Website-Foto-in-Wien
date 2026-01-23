"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Portfolio", href: "/portfolio/" },
  { name: "Leistungen", href: "/leistungen/" },
  { name: "Preise", href: "/preise/" },
  { name: "Blog", href: "/blog/" },
  { name: "Uber mich", href: "/uber-mich/" },
  { name: "Kontakt", href: "/kontakt/" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[#1b1b1b] transition-all duration-300 ${
        isScrolled ? "shadow-lg shadow-black/20" : ""
      }`}
    >
      <nav className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-semibold tracking-tight text-white">
            Foto in Wien
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-gray-300 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/kontakt/"
              className="ml-4 px-6 py-2.5 bg-[#1b1b1b] text-white text-sm font-medium hover:bg-black transition-colors rounded-full"
            >
              Anfrage senden
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Menu"
          >
            <i
              className={`fa-solid ${
                isMobileMenuOpen ? "fa-xmark" : "fa-bars"
              } text-xl`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#1b1b1b] border-t border-gray-700"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-gray-300 hover:text-white transition-colors py-2"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/kontakt/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 px-6 py-3 bg-[#1b1b1b] text-white text-center font-medium hover:bg-black transition-colors rounded-full"
                >
                  Anfrage senden
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
