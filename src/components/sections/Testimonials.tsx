"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: "1",
    quote:
      "Alexandru hat unsere Firmenveranstaltung perfekt eingefangen. Die Bilder sind professionell, kreativ und erzahlen eine Geschichte. Absolute Empfehlung!",
    author: "Maria Schneider",
    position: "Marketing Director",
    company: "TU Wien",
  },
  {
    id: "2",
    quote:
      "Die Produktfotos fur unseren Online-Shop haben unsere Erwartungen ubertroffen. Detailgetreu und mit einem Auge fur das Wesentliche.",
    author: "Thomas Weber",
    position: "CEO",
    company: "Autonom Health",
  },
  {
    id: "3",
    quote:
      "Herr Bogdan versteht es, die Atmosphare eines Events einzufangen. Seine Arbeit bei unserem Fashion Event war erstklassig.",
    author: "Sophie Berger",
    position: "Event Manager",
    company: "V-Suit",
  },
  {
    id: "4",
    quote:
      "Die Food-Fotografie fur unser Restaurant ist einfach atemberaubend. Unsere Gerichte wurden noch nie so appetitlich prasentiert.",
    author: "Klaus Gerstner",
    position: "Geschaftsfuhrer",
    company: "Gerstner",
  },
  {
    id: "5",
    quote:
      "Professionell, punktlich und kreativ. Alexandru ist unser Go-to-Fotograf fur alle Charity-Events geworden.",
    author: "Elisabeth Hoffmann",
    position: "Prasidentin",
    company: "Hope for the Future",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="section">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-h1 font-semibold mb-4">Kundenstimmen</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Was meine Kunden uber die Zusammenarbeit sagen.
          </p>
        </motion.div>

        <div
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-8"
            >
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star text-yellow-400" />
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl font-light italic text-text-primary leading-relaxed">
                &ldquo;{testimonials[current].quote}&rdquo;
              </blockquote>

              <div>
                <p className="font-semibold text-lg">
                  {testimonials[current].author}
                </p>
                <p className="text-text-secondary">
                  {testimonials[current].position}
                </p>
                <p className="text-text-secondary text-sm">
                  {testimonials[current].company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === current ? "bg-black w-8" : "bg-gray-300 w-2"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
