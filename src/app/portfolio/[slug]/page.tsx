import { projects } from "@/data/portfolio";
import ProjectPageClient from "./ProjectPageClient";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  return <ProjectPageClient slug={params.slug} />;
}
