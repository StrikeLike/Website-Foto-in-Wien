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
    <section className="section">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-h1 font-semibold mb-4">Meine Leistungen</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Vielseitige Fotografie-Dienstleistungen fur Unternehmen und
            Privatpersonen in Wien und Umgebung.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="group block p-8 border border-border hover:border-black transition-colors duration-300"
              >
                <i
                  className={`${service.icon} text-3xl mb-6 block group-hover:scale-110 transition-transform duration-300`}
                />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                  Mehr erfahren
                  <i className="fa-solid fa-arrow-right" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
