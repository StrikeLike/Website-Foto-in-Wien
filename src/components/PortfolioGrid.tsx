"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { categories, type Category, type Project } from "@/data/portfolio";

interface PortfolioGridProps {
  projects: Project[];
  initialCategory?: Category;
}

export function PortfolioGrid({
  projects,
  initialCategory = "all",
}: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] =
    useState<Category>(initialCategory);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(activeCategory));

  return (
    <div className="space-y-12">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 md:px-6 py-2 text-sm font-medium transition-all ${
              activeCategory === cat.value
                ? "text-black border-b-2 border-black"
                : "text-text-secondary hover:text-black"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={`/portfolio/${project.slug}/`}
                className="group block"
              >
                <motion.div
                  className="relative aspect-[4/3] overflow-hidden bg-gray-200"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Placeholder - will be replaced with actual images */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center text-white/50">
                    <i className="fa-solid fa-camera text-4xl" />
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 text-xs font-medium capitalize">
                    {project.categories[0]}
                  </div>
                </motion.div>

                <div className="mt-4 space-y-1">
                  <h3 className="text-lg font-medium text-black group-hover:underline">
                    {project.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
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
        <div className="text-center py-16">
          <i className="fa-solid fa-folder-open text-4xl text-gray-300 mb-4" />
          <p className="text-text-secondary">
            Keine Projekte in dieser Kategorie gefunden.
          </p>
        </div>
      )}
    </div>
  );
}
