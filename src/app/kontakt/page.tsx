"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  gdpr: boolean;
  honeypot: string;
}

const services = [
  "Business Fotografie",
  "Event Fotografie",
  "Portrait Fotografie",
  "Produkt Fotografie",
  "Food Fotografie",
  "Familien Fotografie",
  "Sonstiges",
];

export default function KontaktPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    gdpr: false,
    honeypot: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) {
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Bitte fullen Sie alle Pflichtfelder aus.");
      return;
    }

    if (!formData.gdpr) {
      setStatus("error");
      setErrorMessage("Bitte akzeptieren Sie die Datenschutzerklarung.");
      return;
    }

    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      gdpr: false,
      honeypot: "",
    });
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section - Hexagon pattern with gradient */}
        <section className="section-dark py-24 md:py-32 relative overflow-hidden">
          {/* Hexagon-like pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 15V45L30 60L0 45V15L30 0z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/[0.02] blur-3xl" />

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
                className="w-20 h-20 mx-auto rounded-2xl glass-card-on-dark flex items-center justify-center mb-8"
              >
                <i className="fa-solid fa-envelope text-3xl text-white" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight text-white">
                Kontakt
              </h1>
              <p className="text-xl text-gray-400">
                Ich freue mich auf Ihre Anfrage. Kontaktieren Sie mich fur ein
                unverbindliches Beratungsgesprach.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section - Split layout with pattern */}
        <section className="section relative overflow-hidden">
          {/* Diagonal gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />

          {/* Plus pattern */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 0v19H0v2h19v19h2V21h19v-2H21V0h-2z' fill='%231b1b1b'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Decorative elements */}
          <div className="absolute top-32 right-10 w-32 h-32 glass-dark rounded-2xl rotate-12 opacity-30" />
          <div className="absolute bottom-32 left-10 w-24 h-24 glass-dark rounded-xl -rotate-6 opacity-20" />

          <div className="container px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                    Kontaktieren Sie mich
                  </h2>
                  <p className="text-text-secondary">
                    Ob per Telefon, E-Mail oder WhatsApp - ich bin fur Sie da und
                    antworte in der Regel innerhalb von 24 Stunden.
                  </p>
                </div>

                <div className="space-y-4">
                  <a
                    href="tel:+436608459895"
                    className="group flex items-center gap-4 p-5 glass-card-3d hover:scale-[1.02] transition-transform"
                  >
                    <div className="w-14 h-14 bg-black text-white flex items-center justify-center rounded-xl">
                      <i className="fa-solid fa-phone text-lg" />
                    </div>
                    <div>
                      <p className="font-medium">Telefon</p>
                      <p className="text-text-secondary">+43 660 845 9895</p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@fotoinwien.at"
                    className="group flex items-center gap-4 p-5 glass-card-3d hover:scale-[1.02] transition-transform"
                  >
                    <div className="w-14 h-14 bg-black text-white flex items-center justify-center rounded-xl">
                      <i className="fa-solid fa-envelope text-lg" />
                    </div>
                    <div>
                      <p className="font-medium">E-Mail</p>
                      <p className="text-text-secondary">info@fotoinwien.at</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/436608459895"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-5 glass-card-3d hover:scale-[1.02] transition-transform"
                  >
                    <div className="w-14 h-14 bg-green-600 text-white flex items-center justify-center rounded-xl">
                      <i className="fa-brands fa-whatsapp text-2xl" />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-text-secondary">Schnelle Antwort</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-5 glass-dark-strong rounded-3xl">
                    <div className="w-14 h-14 bg-gray-800 text-white flex items-center justify-center rounded-xl">
                      <i className="fa-solid fa-location-dot text-lg" />
                    </div>
                    <div>
                      <p className="font-medium">Standort</p>
                      <p className="text-text-secondary">Wien, Osterreich</p>
                    </div>
                  </div>
                </div>

                {/* Availability info */}
                <div className="glass-dark p-6 rounded-2xl space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <i className="fa-solid fa-clock text-gray-500" />
                    <span className="text-text-secondary">Antwortzeit: Innerhalb von 24 Stunden</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <i className="fa-solid fa-calendar text-gray-500" />
                    <span className="text-text-secondary">Verfugbar: Mo-Fr 9:00-18:00 Uhr</span>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <p className="font-medium mb-4">Folgen Sie mir</p>
                  <div className="flex gap-3">
                    <a
                      href="https://www.instagram.com/fotoinwien"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 glass-dark-strong hover:bg-black hover:text-white flex items-center justify-center rounded-xl transition-all"
                    >
                      <i className="fa-brands fa-instagram text-xl" />
                    </a>
                    <a
                      href="https://www.facebook.com/fotoinwien"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 glass-dark-strong hover:bg-black hover:text-white flex items-center justify-center rounded-xl transition-all"
                    >
                      <i className="fa-brands fa-facebook text-xl" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="glass-card-3d p-8 md:p-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot field */}
                    <input
                      type="text"
                      name="website"
                      value={formData.honeypot}
                      onChange={(e) =>
                        setFormData({ ...formData, honeypot: e.target.value })
                      }
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:border-black focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:border-black focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:border-black focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium mb-2">
                        Gewunschte Leistung
                      </label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:border-black focus:outline-none transition"
                      >
                        <option value="">Bitte wahlen...</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Nachricht *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:border-black focus:outline-none transition resize-none"
                        placeholder="Erzahlen Sie mir von Ihrem Projekt..."
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="gdpr"
                        required
                        checked={formData.gdpr}
                        onChange={(e) =>
                          setFormData({ ...formData, gdpr: e.target.checked })
                        }
                        className="mt-1"
                      />
                      <label htmlFor="gdpr" className="text-sm text-text-secondary">
                        Ich habe die{" "}
                        <a href="/datenschutz/" className="underline hover:text-black">
                          Datenschutzerklarung
                        </a>{" "}
                        gelesen und akzeptiere diese. *
                      </label>
                    </div>

                    <Button
                      type="submit"
                      fullWidth
                      disabled={status === "loading"}
                      icon={status === "loading" ? undefined : "fa-solid fa-paper-plane"}
                    >
                      {status === "loading" ? "Wird gesendet..." : "Nachricht senden"}
                    </Button>

                    {status === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-50 border border-green-200 text-green-800 text-center rounded-xl"
                      >
                        <i className="fa-solid fa-check-circle mr-2" />
                        Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.
                      </motion.div>
                    )}

                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 border border-red-200 text-red-800 text-center rounded-xl"
                      >
                        <i className="fa-solid fa-exclamation-circle mr-2" />
                        {errorMessage}
                      </motion.div>
                    )}
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
