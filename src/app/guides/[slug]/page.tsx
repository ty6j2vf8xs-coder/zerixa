import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GeoPageView from "@/components/geo/GeoPageView";
import { getGeoPage, getGeoPagesByType } from "@/lib/geo-pages";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getGeoPagesByType("guide").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getGeoPage(slug);
  if (!page || page.type !== "guide") return {};

  return {
    title: `${page.title} | Zerixa`,
    description: page.metaDescription,
    keywords: page.keywords,
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: `https://zerixa.ai/guides/${page.slug}`,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const page = getGeoPage(slug);
  if (!page || page.type !== "guide") notFound();
  return <GeoPageView page={page} />;
}
