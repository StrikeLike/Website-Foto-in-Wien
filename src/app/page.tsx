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

export default function Home() {
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
