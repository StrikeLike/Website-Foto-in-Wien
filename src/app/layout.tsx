import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/regular.min.css";
import "@fortawesome/fontawesome-free/css/brands.min.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fotoinwien.at"),
  title: {
    default: "Fotograf Wien - Alexandru Bogdan | Business & Event Fotografie",
    template: "%s | Foto in Wien",
  },
  description:
    "Professioneller Fotograf in Wien für Business, Event, Portrait und Produktfotografie. 20+ Jahre Erfahrung. Kunden: TU Wien, Autonom Health, Gerstner.",
  keywords: [
    "Fotograf Wien",
    "Business Fotografie Wien",
    "Eventfotograf Wien",
    "Porträtfotografie Wien",
    "Produktfotografie Wien",
    "Food Fotografie Wien",
  ],
  authors: [{ name: "Alexandru Bogdan" }],
  creator: "Alexandru Bogdan",
  publisher: "WELO MEDIA STUDIOS S.R.L.",

  openGraph: {
    type: "website",
    locale: "de_AT",
    url: "https://www.fotoinwien.at",
    siteName: "Foto in Wien",
    title: "Fotograf Wien - Alexandru Bogdan",
    description: "Professionelle Fotografie für Business, Events und mehr",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fotograf Wien - Alexandru Bogdan",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Fotograf Wien - Alexandru Bogdan",
    description: "Professionelle Business & Event Fotografie",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${jost.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
