import type { MetadataRoute } from "next";
import {
  GEO_HUBS,
  GEO_PAGES,
  getAbsoluteUrl,
  getGeoPageUrl,
} from "@/lib/geo-pages";
import { PRODUCT_CATEGORIES, getCategoryUrl } from "@/lib/product-catalog";
import { MARKET_REGIONS, getRegionUrl } from "@/lib/markets";

export default function sitemap(): MetadataRoute.Sitemap {
  const hubs = (Object.keys(GEO_HUBS) as (keyof typeof GEO_HUBS)[]).map(
    (type) => ({
      url: getAbsoluteUrl(GEO_HUBS[type].path),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: type === "guide" ? 0.9 : 0.8,
    }),
  );

  const pages = GEO_PAGES.map((page) => ({
    url: getAbsoluteUrl(getGeoPageUrl(page)),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page.slug === "import-construction-materials-from-turkiye" ? 1 : 0.7,
  }));

  const categories = PRODUCT_CATEGORIES.map((category) => ({
    url: getAbsoluteUrl(getCategoryUrl(category.slug)),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: category.exportPriority === "high" ? 0.75 : 0.65,
  }));

  const marketRegions = MARKET_REGIONS.map((region) => ({
    url: getAbsoluteUrl(getRegionUrl(region.slug)),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: getAbsoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...hubs,
    ...pages,
    ...categories,
    ...marketRegions,
  ];
}
