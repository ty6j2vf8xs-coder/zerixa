import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RegionPageView from "@/components/markets/RegionPageView";
import { getAllRegionSlugs, getRegionBySlug } from "@/lib/markets";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllRegionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegionBySlug(slug);
  if (!region) return {};

  return {
    title: `${region.title} | Zerixa Markets`,
    description: `${region.description} ${region.countries.length} countries served from Türkiye.`,
    openGraph: {
      title: region.title,
      description: region.description,
      url: `https://zerixa.ai/markets/region/${region.slug}`,
    },
  };
}

export default async function MarketRegionPage({ params }: Props) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);
  if (!region) notFound();
  return <RegionPageView region={region} />;
}
