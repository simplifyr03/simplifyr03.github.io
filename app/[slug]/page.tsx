import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services } from "@/lib/content";
import ServiceDetail from "@/components/ServiceDetail";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = services.find((x) => x.slug === params.slug);
  return { title: s ? `${s.title} | Simplifyr` : "Simplifyr" };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const s = services.find((x) => x.slug === params.slug);
  if (!s) notFound();
  return <ServiceDetail slug={s.slug} />;
}
