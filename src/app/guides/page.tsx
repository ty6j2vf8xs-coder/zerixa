import type { Metadata } from "next";
import GeoHubView from "@/components/geo/GeoHubView";
import { GEO_HUBS } from "@/lib/geo-pages";

export const metadata: Metadata = {
  title: `${GEO_HUBS.guide.title} | Zerixa`,
  description: GEO_HUBS.guide.description,
};

export default function GuidesHub() {
  return <GeoHubView type="guide" />;
}
