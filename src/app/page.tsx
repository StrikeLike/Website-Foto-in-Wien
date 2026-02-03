"use client";

import { Header, Footer } from "@/components/layout";
import {
  Hero,
  ClientLogos,
  Services,
  FeaturedPortfolio,
  Testimonials,
  AboutTeaser,
  CTASection,
} from "@/components/sections";
import { MouseProvider } from "@/components/effects";

export default function Home() {
  return (
    <MouseProvider>
      <Header />
      <main>
        <Hero />
        <ClientLogos />
        <Services />
        <FeaturedPortfolio />
        <Testimonials />
        <AboutTeaser />
        <CTASection />
      </main>
      <Footer />
    </MouseProvider>
  );
}
