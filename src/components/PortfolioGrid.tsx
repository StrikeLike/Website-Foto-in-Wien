"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { categories, type Category, type Project } from "@/data/portfolio";

// Alternating dark gradient backgrounds for placeholder cards
const cardGradients = [
  "from-[#1a1a1a] to-[#0a0a0a]",
  "from-[#222] to-[#111]",
  "from-[#1e1e1e] to-[#0d0d0d]",
  "from-[#181818] to-[#080808]",
];

interface PortfolioGridProps {
  projects: Project[];
  initialCategory?: Category;
}

export function PortfolioGrid({
  projects,
  initialCategory = "all",
}: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState<Category>(initialCategory);

  const filteredProjects = [...(
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(activeCategory))
  )].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-10">
      {/* Filter Bar — glassmorphism pills */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              activeCategory === cat.value
                ? "bg-white text-black"
                : "bg-white/[0.06] border border-white/10 text-gray-400 hover:bg-white/[0.10] hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <Link href={`/portfolio/${project.slug}/`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  {/* Dark gradient placeholder */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cardGradients[i % cardGradients.length]} transition-transform duration-700 group-hover:scale-105`}
                  />

                  {/* Camera icon placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className="fa-solid fa-camera text-5xl text-white/10 group-hover:text-white/20 transition-colors duration-500" />
                  </div>

                  {/* Camera grid overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-4">
                      <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/20" />
                      <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/20" />
                      <div className="absolute top-1/3 left-0 right-0 h-px bg-white/20" />
                      <div className="absolute top-2/3 left-0 right-0 h-px bg-white/20" />
                    </div>
                    <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-white/50" />
                    <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-white/50" />
                    <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-white/50" />
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-white/50" />
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 backdrop-blur-sm border border-white/10">
                    {project.categories[0]}
                  </div>

                  {/* Image count badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 backdrop-blur-sm border border-white/10">
                    <i className="fa-solid fa-images text-[10px]" />
                    {project.imageCount}+
                  </div>

                  {/* Bottom info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white text-sm font-medium truncate">{project.title}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/70 mt-1">
                      Ansehen <i className="fa-solid fa-arrow-right text-[10px]" />
                    </span>
                  </div>
                </div>

                <div className="mt-3 space-y-0.5 px-1">
                  <h3 className="text-sm font-medium text-white group-hover:text-white/80 transition-colors truncate">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {project.imageCount}+ Bilder
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <i className="fa-solid fa-folder-open text-4xl text-white/10 mb-4 block" />
          <p className="text-gray-500">Keine Projekte in dieser Kategorie gefunden.</p>
        </motion.div>
      )}
    </div>
  );
}
