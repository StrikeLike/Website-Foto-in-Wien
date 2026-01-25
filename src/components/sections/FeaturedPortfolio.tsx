"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui";

const featuredProjects = [
  {
    id: "1",
    slug: "tu-wien-event-2024",
    title: "TU Wien i2ncubator Event",
    category: "Event",
    description: "Networking & Innovation",
    image: "/images/portfolio/tu-wien-event.jpg",
    dark: true,
  },
  {
    id: "2",
    slug: "autonom-health-produktfotografie",
    title: "Autonom Health",
    category: "Produkt",
    description: "HRV-Monitoring Gerate",
    image: "/images/portfolio/autonom-health.jpg",
    dark: false,
  },
  {
    id: "3",
    slug: "v-suit-fashion-event",
    title: "V-Suit Fashion Event",
    category: "Event",
    description: "Runway & Backstage",
    image: "/images/portfolio/v-suit.jpg",
    dark: true,
  },
  {
    id: "4",
    slug: "gerstner-catering",
    title: "Gerstner Catering",
    category: "Food",
    description: "Kulinarische Meisterwerke",
    image: "/images/portfolio/gerstner.jpg",
    dark: true,
  },
  {
    id: "5",
    slug: "corporate-portraits-wien",
    title: "Corporate Portraits",
    category: "Business",
    description: "Fuhrungskrafte & Teams",
    image: "/images/portfolio/corporate-portraits.jpg",
    dark: false,
  },
  {
    id: "6",
    slug: "hope-for-the-future",
    title: "Hope for the Future",
    category: "Event",
    description: "Charity Gala Wien",
    image: "/images/portfolio/hope-future.jpg",
    dark: true,
  },
];

export function FeaturedPortfolio() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        scrollEl.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = 400;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="section bg-gray-50">
      <div className="container px-4 md:px-8">
        {/* Section Header - Apple style with navigation */}
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
            <p className="text-text-secondary max-w-xl">
              Ein Einblick in meine aktuellen Projekte fur namhafte Kunden aus Wien.
            </p>
          </div>

          {/* Navigation Arrows - Desktop only */}
          <div className="hidden lg:flex items-center gap-2 pb-2 flex-shrink-0">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                canScrollLeft
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
              aria-label="Scroll left"
            >
              <i className="fa-solid fa-chevron-left" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                canScrollRight
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
              aria-label="Scroll right"
            >
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="carousel-wrapper">
          {/* Left fade */}
          <div
            className="carousel-fade-left"
            style={{ opacity: canScrollLeft ? 1 : 0 }}
          />

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="carousel-container gap-5 pb-6"
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="carousel-item"
                style={{ width: "340px" }}
              >
                <Link
                  href={`/portfolio/${project.slug}/`}
                  className="group block h-full"
                >
                  <div
                    className={`relative h-[420px] sm:h-[460px] rounded-3xl p-6 flex flex-col overflow-hidden transition-all duration-500 group-hover:scale-[0.98] ${
                      project.dark
                        ? "bg-[#1d1d1f] text-white"
                        : "bg-[#f5f5f7] text-gray-900"
                    }`}
                  >
                    {/* Background gradient overlay */}
                    <div
                      className={`absolute inset-0 ${
                        project.dark
                          ? "bg-gradient-to-b from-[#1d1d1f] via-[#1d1d1f]/60 to-transparent"
                          : "bg-gradient-to-b from-[#f5f5f7] via-[#f5f5f7]/60 to-transparent"
                      }`}
                    />

                    {/* Placeholder image background */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <i className="fa-solid fa-camera text-8xl" />
                    </div>

                    {/* Text content at top */}
                    <div className="relative z-10">
                      {/* Category badge */}
                      <span
                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 ${
                          project.dark
                            ? "bg-white/10 text-white/80"
                            : "bg-black/5 text-gray-600"
                        }`}
                      >
                        {project.category}
                      </span>

                      <h3 className="text-2xl font-semibold mb-1 tracking-tight">
                        {project.title}
                      </h3>
                      <p
                        className={`text-sm ${
                          project.dark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {project.description}
                      </p>
                    </div>

                    {/* View project hint at bottom */}
                    <div className="relative z-10 mt-auto">
                      <span
                        className={`inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3 ${
                          project.dark ? "text-white/70" : "text-gray-600"
                        }`}
                      >
                        Projekt ansehen
                        <i className="fa-solid fa-arrow-right text-xs" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right fade */}
          <div
            className="carousel-fade-right"
            style={{ opacity: canScrollRight ? 1 : 0 }}
          />
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button href="/portfolio/" icon="fa-solid fa-arrow-right">
            Gesamtes Portfolio ansehen
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
