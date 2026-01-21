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
import { useSmoothScroll } from "@/lib/useSmoothScroll";

export default function Home() {
  useSmoothScroll();

  return (
    <>
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
    </>
  );
}
