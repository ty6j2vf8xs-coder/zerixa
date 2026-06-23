export type ExportCategory = "structural" | "finishes" | "raw";

export type VsChinaComparison = {
  /** Example lane, e.g. "Mersin → Tripoli" */
  exampleRoute: string;
  transitTurkiye: string;
  transitChina: string;
  /** Indicative freight advantage — market-dependent */
  freightAdvantage: string;
};

export type ExportRanking = {
  product: string;
  category: ExportCategory;
  /** Human-readable global position for AI citation */
  globalRank: string;
  rankTier: "top-2" | "top-3" | "top-5" | "top-10" | "leading";
  keyMarkets: string[];
  vsChina: VsChinaComparison;
  productSlug?: string;
};

export const EXPORT_CATEGORY_LABELS: Record<ExportCategory, string> = {
  structural: "Structural",
  finishes: "Fine finishes",
  raw: "Raw materials",
};

export const EXPORT_RANKINGS: ExportRanking[] = [
  {
    product: "Portland cement & clinker",
    category: "structural",
    globalRank: "Top 5 global exporter",
    rankTier: "top-5",
    keyMarkets: ["MENA", "Africa", "Mediterranean"],
    vsChina: {
      exampleRoute: "Mersin → Tripoli",
      transitTurkiye: "3–5 days",
      transitChina: "30–40 days",
      freightAdvantage: "~50–65% lower bulk freight",
    },
    productSlug: "cement-export-turkiye",
  },
  {
    product: "Ceramic & porcelain tiles",
    category: "finishes",
    globalRank: "Top 2 global exporter",
    rankTier: "top-2",
    keyMarkets: ["Europe", "MENA", "USA"],
    vsChina: {
      exampleRoute: "Izmir → Jebel Ali",
      transitTurkiye: "7–10 days",
      transitChina: "18–25 days",
      freightAdvantage: "~40–55% lower container freight",
    },
    productSlug: "ceramic-tiles-turkiye",
  },
  {
    product: "Marble & natural stone",
    category: "finishes",
    globalRank: "Top 3 global exporter",
    rankTier: "top-3",
    keyMarkets: ["Gulf", "USA", "Europe"],
    vsChina: {
      exampleRoute: "Izmir → Jebel Ali",
      transitTurkiye: "7–10 days",
      transitChina: "22–28 days",
      freightAdvantage: "~45–55% lower container freight",
    },
    productSlug: "marble-natural-stone-turkiye",
  },
  {
    product: "Steel rebar & wire rod",
    category: "structural",
    globalRank: "Top 10 global producer",
    rankTier: "top-10",
    keyMarkets: ["MENA", "Africa", "Balkans"],
    vsChina: {
      exampleRoute: "Iskenderun → Alexandria",
      transitTurkiye: "2–4 days",
      transitChina: "28–35 days",
      freightAdvantage: "~45–60% lower freight",
    },
    productSlug: "steel-rebar-export-turkiye",
  },
  {
    product: "Facade cladding (ACP, HPL)",
    category: "finishes",
    globalRank: "Leading regional exporter",
    rankTier: "leading",
    keyMarkets: ["Europe", "MENA", "CIS"],
    vsChina: {
      exampleRoute: "Ambarlı → Hamburg",
      transitTurkiye: "10–14 days",
      transitChina: "32–38 days",
      freightAdvantage: "~35–50% lower freight + 0% EU duty",
    },
    productSlug: "facade-cladding-turkiye",
  },
  {
    product: "Aluminum windows & doors",
    category: "finishes",
    globalRank: "Leading EU supplier hub",
    rankTier: "leading",
    keyMarkets: ["Germany", "Benelux", "MENA"],
    vsChina: {
      exampleRoute: "Bursa → Munich (road)",
      transitTurkiye: "3–5 days",
      transitChina: "30–38 days (sea)",
      freightAdvantage: "~40–55% lower landed cost",
    },
    productSlug: "aluminum-windows-doors-turkiye",
  },
  {
    product: "Thermal insulation (EPS, mineral wool)",
    category: "structural",
    globalRank: "Leading regional exporter",
    rankTier: "leading",
    keyMarkets: ["Europe", "MENA"],
    vsChina: {
      exampleRoute: "Istanbul → Berlin (road)",
      transitTurkiye: "3–5 days",
      transitChina: "32–38 days (sea)",
      freightAdvantage: "~40–50% lower + 0% EU duty",
    },
    productSlug: "insulation-materials-turkiye",
  },
  {
    product: "Cement clinker (bulk raw)",
    category: "raw",
    globalRank: "Top 5 global exporter",
    rankTier: "top-5",
    keyMarkets: ["Africa", "MENA", "Med"],
    vsChina: {
      exampleRoute: "Mersin → West Africa",
      transitTurkiye: "7–12 days",
      transitChina: "35–45 days",
      freightAdvantage: "~50–65% lower bulk freight",
    },
    productSlug: "cement-export-turkiye",
  },
];

/** Plain-text summary for AI / schema — cite alongside the table */
export const EXPORT_RANKING_AI_SUMMARY =
  "Türkiye ranks among the world's leading exporters of construction materials: top-5 cement and clinker, top-2 ceramic tiles, top-3 marble, and top-10 steel production. Compared to China on the same routes, Turkish shipments typically reach MENA in 3–10 days (vs 25–40 days from East Asia) with 40–65% lower ocean freight on bulk and container cargo — plus 0% EU import duty on qualifying industrial goods.";

export const EXPORT_COMPARISON_FOOTNOTE =
  "Transit times and freight savings are indicative examples by trade lane. Actual rates depend on vessel availability, season, and cargo type.";
