"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui";
import { getProjectBySlug, projects } from "@/data/portfolio";
import { useSmoothScroll } from "@/lib/useSmoothScroll";

interface ProjectPageClientProps {
  slug: string;
}

export default function ProjectPageClient({ slug }: ProjectPageClientProps) {
  useSmoothScroll();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-h1 font-semibold mb-4">
              Projekt nicht gefunden
            </h1>
            <Button href="/portfolio/">Zuruck zum Portfolio</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const relatedProjects = projects
    .filter(
      (p) =>
        p.id !== project.id &&
        p.categories.some((c) => project.categories.includes(c))
    )
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section">
          <div className="container px-4 md:px-8">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <ol className="flex items-center gap-2 text-sm text-text-secondary">
                <li>
                  <Link href="/" className="hover:text-black">
                    Home
                  </Link>
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right text-xs" />
                </li>
                <li>
                  <Link href="/portfolio/" className="hover:text-black">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right text-xs" />
                </li>
                <li className="text-black">{project.title}</li>
              </ol>
            </motion.nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Project Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-1 space-y-6"
              >
                <h1 className="text-h1 font-semibold">{project.title}</h1>
                <p className="text-text-secondary leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-4 pt-4 border-t border-border">
                  {project.client && (
                    <div>
                      <p className="text-sm text-text-secondary">Kunde</p>
                      <p className="font-medium">{project.client}</p>
                    </div>
                  )}
                  {project.date && (
                    <div>
                      <p className="text-sm text-text-secondary">Jahr</p>
                      <p className="font-medium">{project.date}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-text-secondary">Kategorie</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.categories.map((cat) => (
                        <span
                          key={cat}
                          className="px-3 py-1 bg-gray-100 text-sm capitalize"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Bilder</p>
                    <p className="font-medium">{project.imageCount}+ Fotos</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    href="/kontakt/"
                    icon="fa-solid fa-paper-plane"
                    fullWidth
                  >
                    Ahnliches Projekt anfragen
                  </Button>
                </div>
              </motion.div>

              {/* Featured Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="relative aspect-[16/10] bg-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <i className="fa-solid fa-camera text-6xl text-white/50" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="section bg-gray-50">
          <div className="container px-4 md:px-8">
            <h2 className="text-h2 font-semibold mb-8">Galerie</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="relative aspect-[4/3] bg-gray-200 cursor-pointer group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center text-white/50 group-hover:text-white/70 transition-colors">
                    <i className="fa-solid fa-camera text-2xl" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="section">
            <div className="container px-4 md:px-8">
              <h2 className="text-h2 font-semibold mb-8">Ahnliche Projekte</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((related, index) => (
                  <motion.div
                    key={related.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={`/portfolio/${related.slug}/`}
                      className="group block"
                    >
                      <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center text-white/50">
                          <i className="fa-solid fa-camera text-3xl" />
                        </div>
                      </div>
                      <h3 className="mt-4 text-lg font-medium group-hover:underline">
                        {related.title}
                      </h3>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="section bg-gray-50">
          <div className="container px-4 md:px-8">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-h2 font-semibold">
                Interesse an einem ahnlichen Projekt?
              </h2>
              <p className="text-text-secondary">
                Kontaktieren Sie mich fur ein unverbindliches Beratungsgesprach
                und lassen Sie uns Ihre Ideen besprechen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/kontakt/" icon="fa-solid fa-paper-plane">
                  Kontakt aufnehmen
                </Button>
                <Button href="/portfolio/" variant="secondary">
                  Weitere Projekte
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
