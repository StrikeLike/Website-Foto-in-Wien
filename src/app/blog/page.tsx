"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { blogPosts } from "@/data/blog";

export default function BlogPage() {

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section - Typewriter-style with lines */}
        <section className="section-dark py-24 md:py-32 relative overflow-hidden">
          {/* Horizontal lines */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-[1px] bg-white/[0.03]"
                style={{ top: `${(i + 1) * 12}%` }}
              />
            ))}
          </div>

          {/* Glow orbs */}
          <div className="absolute -top-20 right-1/4 w-64 h-64 rounded-full bg-white/[0.02] blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-white/[0.015] blur-3xl" />

          <div className="container px-4 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 glass-card-on-dark rounded-full mb-8"
              >
                <i className="fa-solid fa-pen-nib text-white/60" />
                <span className="text-white/60 text-sm">Fotografie Insights</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight text-white">
                Blog
              </h1>
              <p className="text-xl text-gray-400">
                Tipps, Einblicke und Neuigkeiten aus der Welt der professionellen
                Fotografie.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Grid - Masonry-like with glass cards */}
        <section className="section relative overflow-hidden">
          {/* Scattered dots */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #1b1b1b 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          />

          {/* Floating elements */}
          <div className="absolute top-40 right-10 w-24 h-24 glass-dark rounded-xl rotate-12 opacity-30" />
          <div className="absolute bottom-60 left-20 w-16 h-16 glass-dark rounded-lg -rotate-6 opacity-20" />

          <div className="container px-4 md:px-8 relative z-10">
            {/* Featured Post */}
            {blogPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <Link
                  href={`/blog/${blogPosts[0].slug}/`}
                  className="group block"
                >
                  <div className="glass-card-3d overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="relative aspect-[16/10] lg:aspect-auto bg-gray-200 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 flex items-center justify-center text-white/50">
                          <i className="fa-solid fa-camera text-6xl" />
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="px-4 py-2 bg-black text-white text-xs font-medium rounded-full">
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-3 text-sm text-text-secondary mb-4">
                          <span className="glass-dark-strong px-3 py-1 rounded-full text-xs">
                            {blogPosts[0].category}
                          </span>
                          <span>{blogPosts[0].readTime}</span>
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-semibold mb-4 group-hover:text-gray-600 transition-colors">
                          {blogPosts[0].title}
                        </h2>
                        <p className="text-text-secondary mb-6 leading-relaxed">
                          {blogPosts[0].excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <i className="fa-solid fa-user text-gray-400" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{blogPosts[0].author}</p>
                              <p className="text-xs text-text-secondary">
                                {new Date(blogPosts[0].date).toLocaleDateString("de-AT", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                            Weiterlesen
                            <i className="fa-solid fa-arrow-right" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Other Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/blog/${post.slug}/`}
                    className="group block h-full"
                  >
                    <div className="glass-card-3d overflow-hidden h-full flex flex-col">
                      <div className="relative aspect-[16/10] bg-gray-200 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center text-white/50">
                          <i className="fa-solid fa-camera text-4xl" />
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-sm text-text-secondary mb-3">
                          <span className="glass-dark px-2 py-1 rounded text-xs">
                            {post.category}
                          </span>
                          <span className="text-xs">{post.readTime}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-3 group-hover:text-gray-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-text-secondary line-clamp-2 mb-4 flex-1">
                          {post.excerpt}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {new Date(post.date).toLocaleDateString("de-AT", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Empty state if no posts */}
            {blogPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="glass-card-3d inline-block p-12">
                  <i className="fa-solid fa-pen-to-square text-5xl text-gray-300 mb-6" />
                  <p className="text-text-secondary text-lg">
                    Noch keine Beitrage verfugbar. Kommen Sie bald wieder!
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Newsletter CTA - Dark with geometric pattern */}
        <section className="section-dark py-24 relative overflow-hidden">
          {/* Geometric squares */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(45deg, white 25%, transparent 25%),
                linear-gradient(-45deg, white 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, white 75%),
                linear-gradient(-45deg, transparent 75%, white 75%)
              `,
              backgroundSize: '40px 40px',
              backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px',
            }}
          />

          <div className="container px-4 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="glass-card-on-dark p-10 md:p-14">
                <i className="fa-solid fa-bell text-4xl text-white/60 mb-6" />
                <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
                  Bleiben Sie informiert
                </h2>
                <p className="text-gray-400 mb-8">
                  Erhalten Sie die neuesten Tipps und Einblicke direkt in Ihr Postfach.
                </p>
                <a
                  href="/kontakt/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors"
                >
                  Kontakt aufnehmen
                  <i className="fa-solid fa-arrow-right" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
