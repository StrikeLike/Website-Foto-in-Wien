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

    // Honeypot check
    if (formData.honeypot) {
      return;
    }

    // Validation
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

    // Simulate form submission
    // In production, this would send to an API endpoint
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
        {/* Hero Section */}
        <section className="section">
          <div className="container px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-h1 font-semibold mb-4">Kontakt</h1>
              <p className="text-xl text-text-secondary">
                Ich freue mich auf Ihre Anfrage. Kontaktieren Sie mich fur ein
                unverbindliches Beratungsgesprach.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="pb-16 md:pb-24">
          <div className="container px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-h2 font-semibold mb-6">
                    Kontaktieren Sie mich
                  </h2>
                  <p className="text-text-secondary">
                    Ob per Telefon, E-Mail oder WhatsApp - ich bin fur Sie da und
                    antworte in der Regel innerhalb von 24 Stunden.
                  </p>
                </div>

                <div className="space-y-6">
                  <a
                    href="tel:+436608459895"
                    className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
                      <i className="fa-solid fa-phone" />
                    </div>
                    <div>
                      <p className="font-medium">Telefon</p>
                      <p className="text-text-secondary">+43 660 845 9895</p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@fotoinwien.at"
                    className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
                      <i className="fa-solid fa-envelope" />
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
                    className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-12 h-12 bg-green-600 text-white flex items-center justify-center">
                      <i className="fa-brands fa-whatsapp text-xl" />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-text-secondary">Schnelle Antwort</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 bg-gray-50">
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
                      <i className="fa-solid fa-location-dot" />
                    </div>
                    <div>
                      <p className="font-medium">Standort</p>
                      <p className="text-text-secondary">Wien, Osterreich</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-sm text-text-secondary mb-4">
                    <i className="fa-solid fa-clock mr-2" />
                    Antwortzeit: Innerhalb von 24 Stunden
                  </p>
                  <p className="text-sm text-text-secondary">
                    <i className="fa-solid fa-calendar mr-2" />
                    Verfugbar: Mo-Fr 9:00-18:00 Uhr
                  </p>
                </div>

                {/* Social Links */}
                <div className="pt-4">
                  <p className="font-medium mb-4">Folgen Sie mir</p>
                  <div className="flex gap-4">
                    <a
                      href="https://www.instagram.com/fotoinwien"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition-colors"
                    >
                      <i className="fa-brands fa-instagram text-xl" />
                    </a>
                    <a
                      href="https://www.facebook.com/fotoinwien"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition-colors"
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
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
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
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
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
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                    >
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium mb-2"
                    >
                      Gewunschte Leistung
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition"
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
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Nachricht *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition resize-none"
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
                      <a
                        href="/datenschutz/"
                        className="underline hover:text-black"
                      >
                        Datenschutzerklarung
                      </a>{" "}
                      gelesen und akzeptiere diese. *
                    </label>
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    disabled={status === "loading"}
                    icon={
                      status === "loading"
                        ? undefined
                        : "fa-solid fa-paper-plane"
                    }
                  >
                    {status === "loading"
                      ? "Wird gesendet..."
                      : "Nachricht senden"}
                  </Button>

                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-50 border border-green-200 text-green-800 text-center"
                    >
                      <i className="fa-solid fa-check-circle mr-2" />
                      Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Ich
                      melde mich innerhalb von 24 Stunden bei Ihnen.
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 border border-red-200 text-red-800 text-center"
                    >
                      <i className="fa-solid fa-exclamation-circle mr-2" />
                      {errorMessage}
                    </motion.div>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
