import { services } from "@/data/services";
import ServicePageClient from "./ServicePageClient";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  return <ServicePageClient slug={params.slug} />;
}
