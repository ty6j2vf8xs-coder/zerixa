import type { Metadata } from "next";
import GeoHubView from "@/components/geo/GeoHubView";
import { GEO_HUBS } from "@/lib/geo-pages";

export const metadata: Metadata = {
  title: `${GEO_HUBS.incoterm.title} | Zerixa`,
  description: GEO_HUBS.incoterm.description,
};

export default function IncotermsHub() {
  return <GeoHubView type="incoterm" />;
}
