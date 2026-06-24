import type { Metadata } from "next";
import MarketsHubView from "@/components/markets/MarketsHubView";
import { GEO_HUBS } from "@/lib/geo-pages";
import { GLOBAL_MARKET_STATS } from "@/lib/markets";

export const metadata: Metadata = {
  title: `${GEO_HUBS.market.title} | Zerixa`,
  description: `Construction materials export from Türkiye to ${GLOBAL_MARKET_STATS.label} countries. Regional logistics, payment guides, and RFQ within 24h.`,
};

export default function MarketsHub() {
  return <MarketsHubView />;
}
