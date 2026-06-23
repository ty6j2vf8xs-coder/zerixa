import type { Metadata } from "next";
import GeoHubView from "@/components/geo/GeoHubView";
import { GEO_HUBS } from "@/lib/geo-pages";

export const metadata: Metadata = {
  title: `${GEO_HUBS.market.title} | Zerixa`,
  description: GEO_HUBS.market.description,
};

export default function MarketsHub() {
  return <GeoHubView type="market" />;
}
