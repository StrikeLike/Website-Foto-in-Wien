"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    icon: "fa-solid fa-briefcase",
    title: "Business Fotografie",
    description:
      "Professionelle Mitarbeiterportraits und Corporate-Fotografie fur Ihr Unternehmen.",
    href: "/leistungen/businessfotografie/",
  },
  {
    icon: "fa-solid fa-calendar-days",
    title: "Event Fotografie",
    description:
      "Dokumentation von Firmenevents, Konferenzen und besonderen Anlassen.",
    href: "/leistungen/eventfotografie/",
  },
  {
    icon: "fa-solid fa-user",
    title: "Portrait Fotografie",
    description:
      "Ausdrucksstarke Portraits fur personliche und professionelle Zwecke.",
    href: "/leistungen/portraitfotografie/",
  },
  {
    icon: "fa-solid fa-box",
    title: "Produkt Fotografie",
    description:
      "Hochwertige Produktfotos fur E-Commerce, Kataloge und Marketing.",
    href: "/leistungen/produktfotografie/",
  },
  {
    icon: "fa-solid fa-utensils",
    title: "Food Fotografie",
    description:
      "Appetitliche Aufnahmen fur Restaurants, Hotels und Lebensmittelmarken.",
    href: "/leistungen/foodfotografie/",
  },
  {
    icon: "fa-solid fa-people-roof",
    title: "Familien Fotografie",
    description:
      "Naturliche Familienportraits und besondere Momente festgehalten.",
    href: "/leistungen/familienfotografie/",
  },
];

export function Services() {
  return (
    <section className="section relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 tracking-tight">
            Meine Leistungen
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Vielseitige Fotografie-Dienstleistungen fur Unternehmen und
            Privatpersonen in Wien und Umgebung.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={service.href}
                className="group block h-full"
              >
                <div className="glass-card-3d p-8 h-full glass-shimmer">
                  {/* Icon with glass background */}
                  <div className="w-14 h-14 rounded-2xl glass-dark-strong flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <i className={`${service.icon} text-xl text-gray-700`} />
                  </div>

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-gray-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 group-hover:gap-3 transition-all">
                    Mehr erfahren
                    <i className="fa-solid fa-arrow-right text-xs" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
