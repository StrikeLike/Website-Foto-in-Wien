import Link from "next/link";

const services = [
  { name: "Business Fotografie", href: "/leistungen/businessfotografie/" },
  { name: "Event Fotografie", href: "/leistungen/eventfotografie/" },
  { name: "Portrait Fotografie", href: "/leistungen/portraitfotografie/" },
  { name: "Produkt Fotografie", href: "/leistungen/produktfotografie/" },
  { name: "Food Fotografie", href: "/leistungen/foodfotografie/" },
  { name: "Familien Fotografie", href: "/leistungen/familienfotografie/" },
];

const quickLinks = [
  { name: "Portfolio", href: "/portfolio/" },
  { name: "Preise", href: "/preise/" },
  { name: "Blog", href: "/blog/" },
  { name: "Uber mich", href: "/uber-mich/" },
  { name: "Kontakt", href: "/kontakt/" },
];

const legal = [
  { name: "Impressum", href: "/impressum/" },
  { name: "Datenschutz", href: "/datenschutz/" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-semibold">
              Foto in Wien
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professioneller Fotograf in Wien mit 20+ Jahren Erfahrung.
              Spezialisiert auf Business, Event und Produktfotografie.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/fotoinwien"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram text-xl" />
              </a>
              <a
                href="https://www.facebook.com/fotoinwien"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook text-xl" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Leistungen
            </h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Kontakt
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+436608459895"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <i className="fa-solid fa-phone w-4" />
                  +43 660 845 9895
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@fotoinwien.at"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <i className="fa-solid fa-envelope w-4" />
                  info@fotoinwien.at
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/436608459895"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <i className="fa-brands fa-whatsapp w-4" />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <i className="fa-solid fa-location-dot w-4" />
                Wien, Osterreich
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              {currentYear} Alexandru Bogdan. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6">
              {legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
