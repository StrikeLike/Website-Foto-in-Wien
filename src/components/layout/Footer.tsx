import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="relative py-20 overflow-hidden bg-[#0a0a0a]">
      <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <Image
              src="/images/logos/fotograf-wien-logo.svg"
              alt="Foto in Wien - Professioneller Fotograf"
              width={150}
              height={40}
              className="h-10 w-auto mb-4"
            />
            <p className="text-sm text-gray-500">
              Eventfotografie, Porträtfotografie, Businessfotografie und Produktfotografie in Wien.
            </p>
          </div>

          {[
            {
              title: 'Navigation',
              links: [
                { label: 'Startseite', href: '/' },
                { label: 'Portfolio', href: '/portfolio/' },
                { label: 'Leistungen', href: '/leistungen/' },
                { label: 'Kontakt', href: '/kontakt/' },
              ],
            },
            {
              title: 'Leistungen',
              links: [
                { label: 'Businessfotografie', href: '/leistungen/businessfotografie/' },
                { label: 'Eventfotografie', href: '/leistungen/eventfotografie/' },
                { label: 'Portraitfotografie', href: '/leistungen/portraitfotografie/' },
                { label: 'Produktfotografie', href: '/leistungen/produktfotografie/' },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold mb-4 text-white">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-semibold mb-4 text-white">Kontakt</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-location-dot w-4" /> Wien, Österreich
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-envelope w-4" /> info@fotoinwien.at
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-phone w-4" /> +43 660-845-9895
              </li>
              <li className="flex items-center gap-2 mt-3">
                <i className="fa-solid fa-clock w-4" /> Mo-Fr: 09:00 - 18:00
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-calendar w-4" /> Sa: Nach Vereinbarung
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              {[
                { icon: 'instagram', href: 'https://www.instagram.com/fotoinwien/' },
                { icon: 'facebook', href: 'https://www.facebook.com/fotoinwien/' },
                { icon: 'whatsapp', href: 'https://wa.me/436608459895' },
              ].map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <i className={`fa-brands fa-${s.icon} text-xl`} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2026 fotoinwien.at. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/impressum/" className="hover:text-white transition-colors">Impressum</Link>
            <Link href="/datenschutz/" className="hover:text-white transition-colors">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
