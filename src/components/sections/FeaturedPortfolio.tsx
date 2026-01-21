"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";

const featuredProjects = [
  {
    id: "1",
    slug: "tu-wien-event-2024",
    title: "TU Wien i2ncubator Event",
    category: "Event",
    image: "/images/portfolio/tu-wien-event.jpg",
  },
  {
    id: "2",
    slug: "autonom-health-produktfotografie",
    title: "Autonom Health Produktfotografie",
    category: "Produkt",
    image: "/images/portfolio/autonom-health.jpg",
  },
  {
    id: "3",
    slug: "v-suit-fashion-event",
    title: "V-Suit Fashion Event",
    category: "Event",
    image: "/images/portfolio/v-suit.jpg",
  },
  {
    id: "4",
    slug: "gerstner-catering",
    title: "Gerstner Catering",
    category: "Food",
    image: "/images/portfolio/gerstner.jpg",
  },
  {
    id: "5",
    slug: "corporate-portraits-wien",
    title: "Corporate Portraits Wien",
    category: "Business",
    image: "/images/portfolio/corporate-portraits.jpg",
  },
  {
    id: "6",
    slug: "hope-for-the-future",
    title: "Hope for the Future Gala",
    category: "Event",
    image: "/images/portfolio/hope-future.jpg",
  },
];

export function FeaturedPortfolio() {
  return (
    <section className="section bg-gray-50">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-h1 font-semibold mb-4">Ausgewahlte Arbeiten</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Ein Einblick in meine aktuellen Projekte fur namhafte Kunden aus
            Wien und ganz Osterreich.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/portfolio/${project.slug}/`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                  {/* Placeholder - will be replaced with actual images */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center text-white/50">
                    <i className="fa-solid fa-camera text-4xl" />
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-xs font-medium">
                    {project.category}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium group-hover:underline">
                    {project.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button href="/portfolio/" icon="fa-solid fa-arrow-right">
            Gesamtes Portfolio ansehen
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
