import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GeoPageView from "@/components/geo/GeoPageView";
import { getGeoPage, getGeoPagesByType } from "@/lib/geo-pages";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getGeoPagesByType("incoterm").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getGeoPage(slug);
  if (!page || page.type !== "incoterm") return {};

  return {
    title: `${page.title} | Zerixa`,
    description: page.metaDescription,
    keywords: page.keywords,
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: `https://zerixa.ai/incoterms/${page.slug}`,
    },
  };
}

export default async function IncotermPage({ params }: Props) {
  const { slug } = await params;
  const page = getGeoPage(slug);
  if (!page || page.type !== "incoterm") notFound();
  return <GeoPageView page={page} />;
}
