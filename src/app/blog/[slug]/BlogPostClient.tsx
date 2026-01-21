"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui";
import { getBlogPostBySlug, blogPosts } from "@/data/blog";
import { useSmoothScroll } from "@/lib/useSmoothScroll";

interface BlogPostClientProps {
  slug: string;
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  useSmoothScroll();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-h1 font-semibold mb-4">Beitrag nicht gefunden</h1>
            <Button href="/blog/">Zuruck zum Blog</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section bg-gray-50">
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
                  <Link href="/blog/" className="hover:text-black">
                    Blog
                  </Link>
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right text-xs" />
                </li>
                <li className="text-black truncate max-w-[200px]">
                  {post.title}
                </li>
              </ol>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                <span className="px-3 py-1 bg-black text-white">
                  {post.category}
                </span>
                <span>{post.readTime} Lesezeit</span>
              </div>

              <h1 className="text-h1 font-semibold mb-6">{post.title}</h1>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-user text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">{post.author}</p>
                  <p className="text-sm text-text-secondary">
                    {new Date(post.date).toLocaleDateString("de-AT", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8">
          <div className="container px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[21/9] bg-gray-200 max-w-5xl mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <i className="fa-solid fa-camera text-6xl text-white/50" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section">
          <div className="container px-4 md:px-8">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-3xl mx-auto prose prose-lg"
            >
              <div
                className="space-y-6 text-text-secondary leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .replace(/^# .+$/gm, "")
                    .replace(/## (.+)/g, '<h2 class="text-xl font-semibold text-black mt-8 mb-4">$1</h2>')
                    .replace(/### (.+)/g, '<h3 class="text-lg font-semibold text-black mt-6 mb-3">$1</h3>')
                    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-black">$1</strong>')
                    .replace(/- (.+)/g, '<li class="ml-4">$1</li>')
                    .replace(/(\d+)\. (.+)/g, '<li class="ml-4">$2</li>')
                    .split("\n\n")
                    .map((p) =>
                      p.startsWith("<") ? p : `<p>${p}</p>`
                    )
                    .join(""),
                }}
              />
            </motion.article>
          </div>
        </section>

        {/* Share Section */}
        <section className="py-8 border-y border-border">
          <div className="container px-4 md:px-8">
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="font-medium">Artikel teilen:</p>
              <div className="flex gap-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://www.fotoinwien.at/blog/${post.slug}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition-colors"
                >
                  <i className="fa-brands fa-facebook" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=https://www.fotoinwien.at/blog/${post.slug}/&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition-colors"
                >
                  <i className="fa-brands fa-x-twitter" />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=https://www.fotoinwien.at/blog/${post.slug}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition-colors"
                >
                  <i className="fa-brands fa-linkedin-in" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="section">
            <div className="container px-4 md:px-8">
              <h2 className="text-h2 font-semibold mb-8 text-center">
                Ahnliche Beitrage
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {relatedPosts.map((related, index) => (
                  <motion.div
                    key={related.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={`/blog/${related.slug}/`}
                      className="group block"
                    >
                      <div className="relative aspect-[16/10] bg-gray-200 overflow-hidden mb-4">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center text-white/50">
                          <i className="fa-solid fa-camera text-3xl" />
                        </div>
                      </div>
                      <h3 className="font-semibold group-hover:underline">
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
                Bereit fur Ihr Fotoshooting?
              </h2>
              <p className="text-text-secondary">
                Kontaktieren Sie mich fur ein unverbindliches Beratungsgesprach.
              </p>
              <Button href="/kontakt/" icon="fa-solid fa-paper-plane">
                Kontakt aufnehmen
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
