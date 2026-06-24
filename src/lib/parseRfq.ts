import { RFQ_PRODUCT_PATTERNS } from "@/lib/product-catalog";
import { matchCountryFromText, type CountryOption } from "@/lib/countries";

export const DELIVERY_OPTIONS = ["EXW", "FOB", "CIF", "CFR", "DDP"] as const;
export type Incoterm = (typeof DELIVERY_OPTIONS)[number];

export const PAYMENT_OPTIONS = [
  { value: "T/T", label: "T/T (Bank Transfer) — Recommended", recommended: true },
  { value: "Not sure", label: "NOT SURE" },
  { value: "LC at sight", label: "LC at sight (on request)", secondary: true },
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
  city: string | null;
  country: CountryOption | null;
  incoterms: Incoterm | null;
  payment: ParsedPayment | null;
  documents: string[];
  leadTime: string | null;
  confidence: "high" | "medium" | "low";
  fieldCount: number;
};

const PRODUCT_PATTERNS = RFQ_PRODUCT_PATTERNS;

const PORT_CITIES: { pattern: RegExp; city: string; country: CountryOption }[] = [
  { pattern: /\btripoli|trablus\b/i, city: "Tripoli", country: "Libya" },
  { pattern: /\bbenghazi\b/i, city: "Benghazi", country: "Libya" },
  { pattern: /\bmisrata\b/i, city: "Misrata", country: "Libya" },
  { pattern: /\bbasra|basrah\b/i, city: "Basra", country: "Iraq" },
  { pattern: /\bbaghdad|bagdad\b/i, city: "Baghdad", country: "Iraq" },
  { pattern: /\bjeddah|jedda\b/i, city: "Jeddah", country: "Saudi Arabia" },
  { pattern: /\briyadh|riyad\b/i, city: "Riyadh", country: "Saudi Arabia" },
  { pattern: /\bdammam\b/i, city: "Dammam", country: "Saudi Arabia" },
  { pattern: /\balexandria\b/i, city: "Alexandria", country: "Egypt" },
  { pattern: /\bcairo\b/i, city: "Cairo", country: "Egypt" },
  { pattern: /\bport\s+said\b/i, city: "Port Said", country: "Egypt" },
  { pattern: /\balgiers\b/i, city: "Algiers", country: "Algeria" },
  { pattern: /\boran\b/i, city: "Oran", country: "Algeria" },
  { pattern: /\blagos\b/i, city: "Lagos", country: "Nigeria" },
  { pattern: /\babuja\b/i, city: "Abuja", country: "Nigeria" },
  { pattern: /\bdubai\b/i, city: "Dubai", country: "United Arab Emirates" },
  { pattern: /\babu\s+dhabi\b/i, city: "Abu Dhabi", country: "United Arab Emirates" },
  { pattern: /\bsharjah\b/i, city: "Sharjah", country: "United Arab Emirates" },
  { pattern: /\bamman\b/i, city: "Amman", country: "Jordan" },
  { pattern: /\baqaba\b/i, city: "Aqaba", country: "Jordan" },
  { pattern: /\bkhartoum\b/i, city: "Khartoum", country: "Sudan" },
  { pattern: /\bcasablanca\b/i, city: "Casablanca", country: "Morocco" },
  { pattern: /\btangier\b/i, city: "Tangier", country: "Morocco" },
  { pattern: /\bmersin\b/i, city: "Mersin", country: "Türkiye" },
  { pattern: /\biskenderun\b/i, city: "İskenderun", country: "Türkiye" },
  { pattern: /\bizmir\b/i, city: "İzmir", country: "Türkiye" },
  { pattern: /\bistanbul\b/i, city: "Istanbul", country: "Türkiye" },
  { pattern: /\bambarl[ıi]\b/i, city: "Ambarlı", country: "Türkiye" },
  { pattern: /\bhamburg\b/i, city: "Hamburg", country: "Germany" },
  { pattern: /\bbremen\b/i, city: "Bremen", country: "Germany" },
  { pattern: /\bmarseille\b/i, city: "Marseille", country: "France" },
  { pattern: /\ble\s+havre\b/i, city: "Le Havre", country: "France" },
  { pattern: /\bgenoa|genova\b/i, city: "Genoa", country: "Italy" },
  { pattern: /\bnaples|napoli\b/i, city: "Naples", country: "Italy" },
  { pattern: /\bbarcelona\b/i, city: "Barcelona", country: "Spain" },
  { pattern: /\bvalencia\b/i, city: "Valencia", country: "Spain" },
  { pattern: /\brotterdam\b/i, city: "Rotterdam", country: "Netherlands" },
  { pattern: /\bantwerp|antwerpen\b/i, city: "Antwerp", country: "Belgium" },
  { pattern: /\blondon\b/i, city: "London", country: "United Kingdom" },
  { pattern: /\bfelixstowe\b/i, city: "Felixstowe", country: "United Kingdom" },
  { pattern: /\bnew\s+york\b/i, city: "New York", country: "United States" },
  { pattern: /\blos\s+angeles\b/i, city: "Los Angeles", country: "United States" },
  { pattern: /\bmumbai|bombay\b/i, city: "Mumbai", country: "India" },
  { pattern: /\bkarachi\b/i, city: "Karachi", country: "Pakistan" },
  { pattern: /\bdoha\b/i, city: "Doha", country: "Qatar" },
  { pattern: /\bkuwait\s+city\b/i, city: "Kuwait City", country: "Kuwait" },
  { pattern: /\bmanama\b/i, city: "Manama", country: "Bahrain" },
  { pattern: /\bmuscat\b/i, city: "Muscat", country: "Oman" },
  { pattern: /\bbeirut\b/i, city: "Beirut", country: "Lebanon" },
  { pattern: /\btel\s+aviv\b/i, city: "Tel Aviv", country: "Israel" },
  { pattern: /\bdar\s+es\s+salaam\b/i, city: "Dar es Salaam", country: "Tanzania" },
  { pattern: /\bmombasa\b/i, city: "Mombasa", country: "Kenya" },
  { pattern: /\bdakar\b/i, city: "Dakar", country: "Senegal" },
  { pattern: /\baccra\b/i, city: "Accra", country: "Ghana" },
  { pattern: /\btunis\b/i, city: "Tunis", country: "Tunisia" },
];

function cleanLocationPhrase(value: string): string {
  return value
    .replace(/\s+/g, " ")
    .replace(/[.:;|]+$/g, "")
    .trim();
}

function extractIncotermLocation(text: string): string | null {
  const match = text.match(
    /\b(?:CIF|CFR|FOB|DDP|EXW)\s+([A-Za-zÀ-ÿİıÖöÜüŞşÇçĞğ][A-Za-zÀ-ÿİıÖöÜüŞşÇçĞğ\s.'-]{1,48})/i,
  );
  if (!match) return null;
  return cleanLocationPhrase(match[1]);
}

function extractDeliveryLocation(text: string): string | null {
  const match = text.match(
    /\b(?:deliver(?:y)?\s+to|ship(?:ping)?\s+to|destination|port\s+of\s+discharge|to)\s+([A-Za-zÀ-ÿİıÖöÜüŞşÇçĞğ][A-Za-zÀ-ÿİıÖöÜüŞşÇçĞğ\s.'-]{1,48})/i,
  );
  if (!match) return null;
  return cleanLocationPhrase(match[1]);
}

function matchPortCity(text: string): { city: string; country: CountryOption } | null {
  for (const entry of PORT_CITIES) {
    if (entry.pattern.test(text)) {
      return { city: entry.city, country: entry.country };
    }
  }
  return null;
}

function extractLocations(text: string): {
  city: string | null;
  country: CountryOption | null;
  destination: string | null;
} {
  const hints = [extractIncotermLocation(text), extractDeliveryLocation(text)].filter(
    Boolean,
  ) as string[];

  let city: string | null = null;
  let country: CountryOption | null = matchCountryFromText(text);

  for (const hint of hints) {
    const port = matchPortCity(hint);
    if (port) {
      city = port.city;
      country = port.country;
      break;
    }
    const hintCountry = matchCountryFromText(hint);
    if (hintCountry) {
      country = hintCountry;
      if (!city) city = hint.replace(new RegExp(`\\b${hintCountry}\\b`, "i"), "").trim() || null;
      if (city) break;
    }
    if (!city && hint.length >= 2 && hint.length <= 40) {
      city = hint;
    }
  }

  if (!city) {
    const port = matchPortCity(text);
    if (port) {
      city = port.city;
      country = port.country;
    }
  }

  if (city && !country) {
    const port = PORT_CITIES.find((entry) => entry.city === city);
    if (port) country = port.country;
  }

  if (!country) {
    country = matchCountryFromText(text);
  }

  let destination: string | null = null;
  if (city && country) destination = `${city}, ${country}`;
  else if (city) destination = city;
  else if (country) destination = country;

  return { city, country, destination };
}

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
    city: null,
    country: null,
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

  const { city, country, destination } = extractLocations(trimmed);

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
  if (city) fieldCount++;
  if (country) fieldCount++;
  if (destination && !city && !country) fieldCount++;
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
    city,
    country,
    incoterms,
    payment,
    documents,
    leadTime,
    confidence,
    fieldCount,
  };
}

export const RFQ_EXAMPLES = [
  "500 tons Portland cement CEM I 42.5R, CIF Tripoli, T/T bank transfer",
  "2000 m² marble slabs 2cm, CIF Dubai, T/T",
  "Aluminum windows and doors, DDP Germany, T/T",
  "Facade cladding panels 1500 m², FOB Mersin, T/T",
];
