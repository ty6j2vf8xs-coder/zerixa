import { RFQ_PRODUCT_PATTERNS } from "@/lib/product-catalog";

export const DELIVERY_OPTIONS = ["EXW", "FOB", "CIF", "CFR", "DDP"] as const;
export type Incoterm = (typeof DELIVERY_OPTIONS)[number];

export const PAYMENT_OPTIONS = [
  { value: "T/T", label: "T/T (Bank Transfer)" },
  { value: "LC at sight", label: "LC AT SIGHT" },
  { value: "Not sure", label: "NOT SURE" },
] as const;

export type PaymentOption = (typeof PAYMENT_OPTIONS)[number]["value"];
export type ParsedPayment = "T/T" | "LC at sight";

export function formatPaymentLabel(payment: string | null | undefined): string {
  const match = PAYMENT_OPTIONS.find((opt) => opt.value === payment);
  return match?.label ?? payment ?? "";
}

export {
  COUNTRY_OPTIONS,
  matchCountryFromDestination,
  type CountryOption,
} from "@/lib/countries";

export type ParsedRfq = {
  product: string | null;
  category: string | null;
  quantity: string | null;
  specification: string | null;
  destination: string | null;
  incoterms: Incoterm | null;
  payment: ParsedPayment | null;
  documents: string[];
  leadTime: string | null;
  confidence: "high" | "medium" | "low";
  fieldCount: number;
};

const PRODUCT_PATTERNS = RFQ_PRODUCT_PATTERNS;

const DESTINATIONS: { pattern: RegExp; name: string }[] = [
  { pattern: /\btripoli|trablus\b/i, name: "Tripoli, Libya" },
  { pattern: /\bbenghazi\b/i, name: "Benghazi, Libya" },
  { pattern: /\blibya\b/i, name: "Libya" },
  { pattern: /\bbasra|basrah\b/i, name: "Basra, Iraq" },
  { pattern: /\bbaghdad|bagdad\b/i, name: "Baghdad, Iraq" },
  { pattern: /\biraq\b/i, name: "Iraq" },
  { pattern: /\bjeddah|jedda\b/i, name: "Jeddah, Saudi Arabia" },
  { pattern: /\briyadh|riyad\b/i, name: "Riyadh, Saudi Arabia" },
  { pattern: /\bsaudi\b/i, name: "Saudi Arabia" },
  { pattern: /\balexandria\b/i, name: "Alexandria, Egypt" },
  { pattern: /\bcairo\b/i, name: "Cairo, Egypt" },
  { pattern: /\begypt|mısır\b/i, name: "Egypt" },
  { pattern: /\balgiers\b/i, name: "Algiers, Algeria" },
  { pattern: /\balgeria|cezayir\b/i, name: "Algeria" },
  { pattern: /\blagos\b/i, name: "Lagos, Nigeria" },
  { pattern: /\bnigeria\b/i, name: "Nigeria" },
  { pattern: /\bdubai|uae\b/i, name: "Dubai, United Arab Emirates" },
  { pattern: /\bamman|jordan\b/i, name: "Jordan" },
  { pattern: /\bkhartoum|sudan\b/i, name: "Sudan" },
  { pattern: /\bcasablanca|morocco|fas\b/i, name: "Morocco" },
  { pattern: /\bmersin\b/i, name: "Mersin, Türkiye (FOB)" },
  { pattern: /\biskenderun\b/i, name: "İskenderun, Türkiye (FOB)" },
  { pattern: /\bgermany|almanya\b/i, name: "Germany" },
  { pattern: /\bfrance|fransa\b/i, name: "France" },
  { pattern: /\bitaly|italya\b/i, name: "Italy" },
  { pattern: /\bspain|ispanya\b/i, name: "Spain" },
  { pattern: /\bunited\s+kingdom|\buk\b/i, name: "United Kingdom" },
  { pattern: /\bunited\s+states|\busa\b|\bu\.s\.a\b/i, name: "United States" },
];

function extractQuantity(text: string): string | null {
  const patterns = [
    /(\d[\d,.]*)\s*(?:metric\s+)?(?:tons?|tonnes?|ton|mt|adet)\b/i,
    /(\d[\d,.]*)\s*(?:kg|kilograms?|kilogram)\b/i,
    /(\d[\d,.]*)\s*(?:m²|m2|sqm|square\s+meters?|metrekare)\b/i,
    /(\d[\d,.]*)\s*(?:m³|m3|cubic\s+meters?|metreküp)\b/i,
    /(\d[\d,.]*)\s*(?:pieces?|units?|containers?|pallets?|slabs?|sheets?)\b/i,
    /(\d[\d,.]*)\s*x\s*(\d[\d,.]*)\s*(?:cm|mm|m)\b/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) return m[0].trim();
  }
  return null;
}

function extractSpec(text: string): string | null {
  const specs = [
    /\bCEM\s*I?\s*42\.?5\s*R?\b/i,
    /\bCEM\s*II?\s*42\.?5\b/i,
    /\b\d+\s*x\s*\d+\s*(?:cm|mm|m)?\b/i,
    /\b\d+\s*mm\s*(?:rebar|bar|diameter|kalınlık)?\b/i,
    /\bgrade\s*\d+\b/i,
    /\bISO\s*\d+/i,
    /\b\d+\s*cm\s*(?:tile|fayans)?\b/i,
  ];
  for (const s of specs) {
    const m = text.match(s);
    if (m) return m[0].trim();
  }
  return null;
}

/** When no keyword matches, extract the product phrase from free text */
function extractProductFallback(text: string): { product: string; category: string } | null {
  const mainPart = text
    .split(
      /\s*(?:,|\||;|\b(?:CIF|FOB|CFR|DDP|EXW)\b|\bpayment\b|\bödeme\b|\bdelivery\b|\bteslimat\b|\bto\b|\bfor\b(?=\s+[A-Z]))/i
    )[0]
    ?.trim();

  if (!mainPart || mainPart.length < 3) return null;

  let candidate = mainPart
    .replace(
      /^(?:i\s+need|we\s+need|looking\s+for|i\s+want|we\s+want|please\s+supply|request(?:ing)?|ihtiyacım|istiyorum|lazım)\s+/i,
      ""
    )
    .replace(
      /^\d[\d,.\s]*\s*(?:metric\s+)?(?:tons?|tonnes?|ton|mt|kg|kilograms?|m²|m2|sqm|m³|m3|pieces?|units?|containers?|adet|metrekare|metreküp)?\s*(?:of\s+|adet\s+)?/i,
      ""
    )
    .replace(/\s+(please|urgent|asap|acil)\.?$/i, "")
    .trim();

  if (candidate.length < 2 || candidate.length > 120) return null;
  if (/^\d+$/.test(candidate)) return null;
  if (/^(and|or|the|a|an|for|to|from|with)$/i.test(candidate)) return null;

  const product = candidate.charAt(0).toUpperCase() + candidate.slice(1);

  return { product, category: "Construction materials" };
}

export function parseRfq(text: string): ParsedRfq {
  const empty: ParsedRfq = {
    product: null,
    category: null,
    quantity: null,
    specification: null,
    destination: null,
    incoterms: null,
    payment: null,
    documents: [],
    leadTime: null,
    confidence: "low",
    fieldCount: 0,
  };

  const trimmed = text.trim();
  if (!trimmed || trimmed.length < 5) return empty;

  let product: string | null = null;
  let category: string | null = null;

  for (const { pattern, product: p, category: c } of PRODUCT_PATTERNS) {
    if (pattern.test(trimmed)) {
      product = p;
      category = c;
      break;
    }
  }

  if (!product) {
    const fallback = extractProductFallback(trimmed);
    if (fallback) {
      product = fallback.product;
      category = fallback.category;
    }
  }

  const quantity = extractQuantity(trimmed);
  const specification = extractSpec(trimmed);

  let destination: string | null = null;
  for (const { pattern, name } of DESTINATIONS) {
    if (pattern.test(trimmed)) {
      destination = name;
      break;
    }
  }

  let incoterms: ParsedRfq["incoterms"] = null;
  if (/\bDDP\b/i.test(trimmed)) incoterms = "DDP";
  else if (/\bCIF\b/i.test(trimmed)) incoterms = "CIF";
  else if (/\bCFR\b/i.test(trimmed)) incoterms = "CFR";
  else if (/\bFOB\b/i.test(trimmed)) incoterms = "FOB";
  else if (/\bEXW\b/i.test(trimmed)) incoterms = "EXW";
  else if (/delivery\s+to|deliver\s+to|ship\s+to|teslimat/i.test(trimmed) && destination) {
    incoterms = "CIF";
  }

  let payment: ParsedRfq["payment"] = null;
  if (
    /\bLC\s*(?:at\s+)?sight\b/i.test(trimmed) ||
    /\bletter\s+of\s+credit\s+at\s+sight\b/i.test(trimmed) ||
    /\bakkreditif\b/i.test(trimmed)
  ) {
    payment = "LC at sight";
  } else if (/\bLC\b/i.test(trimmed)) {
    payment = "LC at sight";
  } else if (
    /\bT\/T\b/i.test(trimmed) ||
    /\bwire\s+transfer\b/i.test(trimmed) ||
    /\bbank\s+transfer\b/i.test(trimmed) ||
    /\bhavale\b/i.test(trimmed)
  ) {
    payment = "T/T";
  }

  const documents: string[] = [];
  if (/\bISO\b/i.test(trimmed) || /\bcertificate/i.test(trimmed) || /\bsertifika/i.test(trimmed)) {
    documents.push("ISO 9001 Certificate");
  }
  if (/\bCOO\b|certificate\s+of\s+origin|origin\s+doc|menşe\s*şahadetnamesi/i.test(trimmed)) {
    documents.push("Certificate of Origin");
  }
  if (/\bmill\s+test|MTC\b/i.test(trimmed)) documents.push("Mill Test Certificate");
  if (/\bEUR\.?1\b/i.test(trimmed)) documents.push("EUR.1 Movement Certificate");
  if (/\bpacking\s+list\b/i.test(trimmed)) documents.push("Packing List");

  const leadTime = product ? "Quote within 24h" : null;

  let fieldCount = 0;
  if (product) fieldCount++;
  if (quantity) fieldCount++;
  if (destination) fieldCount++;
  if (incoterms) fieldCount++;
  if (payment) fieldCount++;
  if (specification) fieldCount++;

  const confidence: ParsedRfq["confidence"] =
    fieldCount >= 4 ? "high" : fieldCount >= 1 ? "medium" : "low";

  return {
    product,
    category,
    quantity,
    specification,
    destination,
    incoterms,
    payment,
    documents,
    leadTime,
    confidence,
    fieldCount,
  };
}

export const RFQ_EXAMPLES = [
  "500 tons Portland cement CEM I 42.5R, CIF Tripoli, LC at sight",
  "2000 m² marble slabs 2cm, CIF Dubai, T/T",
  "Aluminum windows and doors for residential project, DDP Germany",
  "Facade cladding panels 1500 m², FOB Mersin, LC at sight",
];
