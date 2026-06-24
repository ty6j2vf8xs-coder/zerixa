import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPageView from "@/components/products/CategoryPageView";
import {
  getAllCategorySlugs,
  getCategoryBySlug,
} from "@/lib/product-catalog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.title} | Zerixa`,
    description: `${category.description} Sourced from verified Turkish manufacturers — quote within 24h.`,
    openGraph: {
      title: category.title,
      description: category.description,
      url: `https://zerixa.ai/products/category/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  return <CategoryPageView category={category} />;
}
