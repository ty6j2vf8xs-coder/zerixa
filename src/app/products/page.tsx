import type { Metadata } from "next";
import GeoHubView from "@/components/geo/GeoHubView";
import { GEO_HUBS } from "@/lib/geo-pages";

export const metadata: Metadata = {
  title: `${GEO_HUBS.product.title} | Zerixa`,
  description: GEO_HUBS.product.description,
};

export default function ProductsHub() {
  return <GeoHubView type="product" />;
}
