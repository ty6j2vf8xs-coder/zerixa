import type { ParsedRfq } from "@/lib/parseRfq";

export type RfqScoreTier = "draft" | "fair" | "good" | "strong";

export type RfqScoreCriterion = {
  id: string;
  label: string;
  tip: string;
  example: string;
  points: number;
  met: boolean;
};

export type RfqScore = {
  score: number;
  maxScore: number;
  tier: RfqScoreTier;
  tierLabel: string;
  tierMessage: string;
  criteria: RfqScoreCriterion[];
  missingTips: string[];
};

const TIER_CONFIG: Record<
  RfqScoreTier,
  { label: string; message: string; min: number }
> = {
  draft: {
    label: "Draft",
    message: "Add the basics so we can prepare a quote.",
    min: 0,
  },
  fair: {
    label: "Fair",
    message: "Good start — a few details will speed up your quote.",
    min: 30,
  },
  good: {
    label: "Good lead",
    message: "Solid request — we can quote this with minimal follow-up.",
    min: 60,
  },
  strong: {
    label: "Quote-ready",
    message: "Excellent detail — expect a faster, more accurate quote.",
    min: 80,
  },
};

function resolveTier(score: number): RfqScoreTier {
  if (score >= 80) return "strong";
  if (score >= 60) return "good";
  if (score >= 30) return "fair";
  return "draft";
}

export function scoreRfq(parsed: ParsedRfq | null, text: string): RfqScore {
  const hasDestination =
    Boolean(parsed?.city) ||
    Boolean(parsed?.country) ||
    Boolean(parsed?.destination);
  const hasSpecs =
    Boolean(parsed?.specification) || (parsed?.productDetails.length ?? 0) > 0;

  const criteria: RfqScoreCriterion[] = [
    {
      id: "product",
      label: "Product",
      tip: "Name the material you need",
      example: "Portland cement, steel rebar, ceramic tiles",
      points: 30,
      met: Boolean(parsed?.product),
    },
    {
      id: "quantity",
      label: "Quantity",
      tip: "Add amount and unit",
      example: "500 tons, 2,000 m², 40 containers",
      points: 25,
      met: Boolean(parsed?.quantity),
    },
    {
      id: "destination",
      label: "Destination",
      tip: "Where should it ship?",
      example: "Tripoli, Jeddah, Hamburg",
      points: 20,
      met: hasDestination,
    },
    {
      id: "incoterms",
      label: "Incoterm",
      tip: "Add delivery terms",
      example: "CIF, FOB, DDP, CFR",
      points: 15,
      met: Boolean(parsed?.incoterms),
    },
    {
      id: "payment",
      label: "Payment",
      tip: "Mention how you plan to pay",
      example: "T/T, wire transfer, LC at sight",
      points: 10,
      met: Boolean(parsed?.payment),
    },
  ];

  let score = criteria.reduce((sum, item) => sum + (item.met ? item.points : 0), 0);

  if (hasSpecs && score < 100) {
    score = Math.min(100, score + 5);
  }

  const trimmed = text.trim();
  if (trimmed.length > 0 && trimmed.length < 20 && score > 0) {
    score = Math.max(0, score - 10);
  }

  const tier = resolveTier(score);
  const tierConfig = TIER_CONFIG[tier];

  const missingTips = criteria
    .filter((item) => !item.met)
    .map((item) => `${item.tip} — e.g. ${item.example}`);

  if (!hasSpecs && score >= 50) {
    missingTips.push(
      "Optional: add specs or packaging — e.g. CEM I 42.5R, bagged, 2 cm slabs",
    );
  }

  return {
    score,
    maxScore: 100,
    tier,
    tierLabel: tierConfig.label,
    tierMessage: tierConfig.message,
    criteria,
    missingTips,
  };
}

export const RFQ_WRITING_GUIDE = [
  "Product",
  "Quantity",
  "Destination",
  "Incoterm",
  "Payment",
] as const;
