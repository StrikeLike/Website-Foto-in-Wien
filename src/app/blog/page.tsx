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
        {/* Hero Section */}
        <section className="section">
          <div className="container px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-h1 font-semibold mb-4">Blog</h1>
              <p className="text-xl text-text-secondary">
                Tipps, Einblicke und Neuigkeiten aus der Welt der professionellen
                Fotografie.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="pb-16 md:pb-24">
          <div className="container px-4 md:px-8">
            {/* Featured Post */}
            {blogPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <Link
                  href={`/blog/${blogPosts[0].slug}/`}
                  className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                >
                  <div className="relative aspect-[16/10] bg-gray-200 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center text-white/50">
                      <i className="fa-solid fa-camera text-6xl" />
                    </div>
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-xs font-medium">
                      Featured
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-text-secondary">
                      <span>{blogPosts[0].category}</span>
                      <span>|</span>
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                    <h2 className="text-h2 font-semibold group-hover:underline">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-text-secondary">{blogPosts[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-medium">{blogPosts[0].author}</span>
                      <span className="text-text-secondary">
                        {new Date(blogPosts[0].date).toLocaleDateString("de-AT", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Other Posts */}
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
                    className="group block"
                  >
                    <div className="relative aspect-[16/10] bg-gray-200 overflow-hidden mb-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center text-white/50">
                        <i className="fa-solid fa-camera text-4xl" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm text-text-secondary">
                        <span>{post.category}</span>
                        <span>|</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-semibold group-hover:underline">
                        {post.title}
                      </h3>
                      <p className="text-sm text-text-secondary line-clamp-2">
                        {post.excerpt}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {new Date(post.date).toLocaleDateString("de-AT", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Empty state if no posts */}
            {blogPosts.length === 0 && (
              <div className="text-center py-16">
                <i className="fa-solid fa-pen-to-square text-4xl text-gray-300 mb-4" />
                <p className="text-text-secondary">
                  Noch keine Beitrage verfugbar. Kommen Sie bald wieder!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
