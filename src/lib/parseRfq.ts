import { RFQ_PRODUCT_PATTERNS } from "@/lib/product-catalog";
import { matchCountryFromText, type CountryOption } from "@/lib/countries";
import { fuzzyMatchProduct, normalizeRfqInput } from "@/lib/rfq-typo-fix";

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
  productDetails: string[];
  destination: string | null;
  city: string | null;
  country: CountryOption | null;
  loadingPort: string | null;
  buyerCity: string | null;
  buyerCountry: CountryOption | null;
  needsBuyerDestination: boolean;
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

const TURKISH_EXPORT_PORTS = PORT_CITIES.filter((entry) => entry.country === "Türkiye");

export function isTurkishLoadingLocation(
  city: string | null,
  country: CountryOption | null,
): boolean {
  if (country === "Türkiye") return true;
  if (!city) return false;
  return TURKISH_EXPORT_PORTS.some((entry) => entry.city === city);
}

export function hasEffectiveBuyerDestination(parsed: ParsedRfq): boolean {
  if (parsed.buyerCountry || parsed.buyerCity) return true;
  if (parsed.needsBuyerDestination) return false;
  if (parsed.country && parsed.country !== "Türkiye") return true;
  if (parsed.city && !isTurkishLoadingLocation(parsed.city, parsed.country)) return true;
  return Boolean(parsed.destination) && !isTurkishLoadingLocation(parsed.city, parsed.country);
}

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

function findForeignCountriesInText(text: string): CountryOption[] {
  const found: CountryOption[] = [];
  const seen = new Set<string>();

  const addCountry = (country: CountryOption | null) => {
    if (!country || country === "Türkiye" || seen.has(country)) return;
    seen.add(country);
    found.push(country);
  };

  const lower = text.toLowerCase();
  for (const entry of PORT_CITIES) {
    if (entry.country !== "Türkiye" && entry.pattern.test(lower)) {
      addCountry(entry.country);
    }
  }

  const countryMatch = matchCountryFromText(text);
  if (countryMatch) addCountry(countryMatch);

  const segments = text.split(/[,;|]/);
  for (const segment of segments) {
    addCountry(matchCountryFromText(segment));
    const port = matchPortCity(segment);
    if (port && port.country !== "Türkiye") addCountry(port.country);
  }

  return found;
}

function extractBuyerDestination(
  text: string,
  loadingCity: string | null,
  loadingCountry: CountryOption | null,
  incoterms: Incoterm | null,
): { buyerCity: string | null; buyerCountry: CountryOption | null } {
  if (incoterms !== "EXW" && incoterms !== "FOB") {
    return { buyerCity: null, buyerCountry: null };
  }
  if (!isTurkishLoadingLocation(loadingCity, loadingCountry)) {
    return { buyerCity: null, buyerCountry: null };
  }

  const explicitPatterns = [
    /\b(?:buyer|client|customer|company|we(?:'re|\s+are)?)\s+(?:in|from|based\s+in)\s+([A-Za-zÀ-ÿİıÖöÜüŞşÇçĞğ][A-Za-zÀ-ÿİıÖöÜüŞşÇçĞğ\s.'-]{1,40})/i,
    /\bproject\s+in\s+([A-Za-zÀ-ÿİıÖöÜüŞşÇçĞğ][A-Za-zÀ-ÿİıÖöÜüŞşÇçĞğ\s.'-]{1,40})/i,
    /\bdestination[:\s]+([A-Za-zÀ-ÿİıÖöÜüŞşÇçĞğ][A-Za-zÀ-ÿİıÖöÜüŞşÇçĞğ\s.'-]{1,40})/i,
    /\b(?:import(?:ing)?\s+for|deliver(?:y)?\s+to|ship(?:ping)?\s+to)\s+([A-Za-zÀ-ÿİıÖöÜüŞşÇçĞğ][A-Za-zÀ-ÿİıÖöÜüŞşÇçĞğ\s.'-]{1,40})/i,
  ];

  for (const pattern of explicitPatterns) {
    const match = text.match(pattern);
    if (!match) continue;
    const phrase = cleanLocationPhrase(match[1]);
    const country = matchCountryFromText(phrase);
    if (country && country !== "Türkiye") {
      return {
        buyerCity: phrase.toLowerCase() === country.toLowerCase() ? null : phrase,
        buyerCountry: country,
      };
    }
    const port = matchPortCity(phrase);
    if (port && port.country !== "Türkiye") {
      return { buyerCity: port.city, buyerCountry: port.country };
    }
  }

  for (const entry of PORT_CITIES) {
    if (entry.country === "Türkiye") continue;
    if (!entry.pattern.test(text)) continue;
    if (loadingCity && entry.city === loadingCity) continue;
    return { buyerCity: entry.city, buyerCountry: entry.country };
  }

  const foreignCountries = findForeignCountriesInText(text);
  if (foreignCountries.length > 0) {
    return { buyerCity: null, buyerCountry: foreignCountries[0] };
  }

  return { buyerCity: null, buyerCountry: null };
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

const QUANTITY_UNIT_ALIASES =
  "(?:metric\\s+)?(?:tons?|tonnes?|tonne|ton|mt\\.?|metric\\s+tons?)";
const KG_ALIASES = "(?:kg|kgs|kilograms?|kilogrammes?)";
const METRIC_AREA_ALIASES =
  "(?:m²|m2|sq\\.?\\s*m(?:eters?|etres?)?|sqm|square\\s+meters?|square\\s+metres?|metrekare)";
const IMPERIAL_AREA_ALIASES =
  "(?:ft²|ft2|sq\\.?\\s*ft\\.?|sqft|square\\s+feet|square\\s+foot)";
const AREA_ALIASES = `(?:${METRIC_AREA_ALIASES}|${IMPERIAL_AREA_ALIASES})`;
const METRIC_VOLUME_ALIASES =
  "(?:m³|m3|cbm|cum|cu\\.?\\s*m(?:eters?|etres?)?|cubic\\s+meters?|cubic\\s+metres?|metreküp)";
const IMPERIAL_VOLUME_ALIASES =
  "(?:ft³|ft3|cu\\.?\\s*ft\\.?|cuft|cubic\\s+feet|cubic\\s+foot)";
const VOLUME_ALIASES = `(?:${METRIC_VOLUME_ALIASES}|${IMPERIAL_VOLUME_ALIASES})`;
const COUNT_ALIASES =
  "(?:pieces?|pcs?\\.?|units?|items?|sets?|lots?|adet|birim)";
const PACK_ALIASES = "(?:pallets?|plts?\\.?|slabs?|sheets?|bags?|big\\s+bags?|sacks?|bundles?|rolls?|boxes?|crates?)";
const CONTAINER_ALIASES = "(?:containers?|fcl|lcl|teu)";

/** Shared alternation for strip/prefix regexes (metric + imperial + legacy tokens). */
const QUANTITY_UNIT_PATTERN = [
  QUANTITY_UNIT_ALIASES,
  KG_ALIASES,
  AREA_ALIASES,
  VOLUME_ALIASES,
  COUNT_ALIASES,
  PACK_ALIASES,
  CONTAINER_ALIASES,
  "MT",
  "m2",
  "m²",
  "sqm",
  "m3",
  "m³",
  "cbm",
  "ft2",
  "ft²",
  "sqft",
  "ft3",
  "ft³",
  "cuft",
].join("|");

type QuantityMatch = { raw: string; normalized: string; index: number };

function formatQuantityNumber(value: string): string {
  return value.replace(/,/g, "").trim();
}

/** Superscript units break JS \\b — normalize before quantity regexes. */
function normalizeQuantityInput(text: string): string {
  return text
    .replace(/m²/gi, "m2")
    .replace(/m³/gi, "m3")
    .replace(/ft²/gi, "ft2")
    .replace(/ft³/gi, "ft3");
}

function stripQuantityPhrases(text: string): string {
  const normalized = normalizeQuantityInput(text);
  return normalized
    .replace(
      new RegExp(
        `\\d[\\d,.\\s]*\\s*(?:${QUANTITY_UNIT_PATTERN})\\b`,
        "gi",
      ),
      "",
    )
    .replace(/\s+/g, " ")
    .trim();
}

function isQuantityDetail(detail: string, quantity: string | null): boolean {
  const d = normalizeQuantityInput(detail).toLowerCase().trim();
  if (/^\d[\d,.]*\s*m$/i.test(d)) return true;
  if (!quantity) return false;
  const q = normalizeQuantityInput(quantity).toLowerCase();
  return d === q || d.includes(q);
}

function extractQuantities(text: string): QuantityMatch[] {
  const input = normalizeQuantityInput(text);
  const patterns: { regex: RegExp; normalize: (match: RegExpMatchArray) => string }[] = [
    {
      regex: new RegExp(`(\\d[\\d,.]*)\\s*${QUANTITY_UNIT_ALIASES}\\b`, "gi"),
      normalize: (m) => `${formatQuantityNumber(m[1])} MT`,
    },
    {
      regex: /(\d[\d,.]*)(?:MT)\b/g,
      normalize: (m) => `${formatQuantityNumber(m[1])} MT`,
    },
    {
      regex: new RegExp(`(\\d[\\d,.]*)\\s*${KG_ALIASES}\\b`, "gi"),
      normalize: (m) => `${formatQuantityNumber(m[1])} kg`,
    },
    {
      regex: new RegExp(`(\\d[\\d,.]*)\\s*${METRIC_AREA_ALIASES}\\b`, "gi"),
      normalize: (m) => `${formatQuantityNumber(m[1])} m²`,
    },
    {
      regex: /(\d[\d,.]*)(?:m2|m²|sqm)\b/gi,
      normalize: (m) => `${formatQuantityNumber(m[1])} m²`,
    },
    {
      regex: new RegExp(`(\\d[\\d,.]*)\\s*${IMPERIAL_AREA_ALIASES}\\b`, "gi"),
      normalize: (m) => `${formatQuantityNumber(m[1])} ft²`,
    },
    {
      regex: /(\d[\d,.]*)(?:ft2|ft²|sqft)\b/gi,
      normalize: (m) => `${formatQuantityNumber(m[1])} ft²`,
    },
    {
      regex: /(\d[\d,.]*)\s+sf\b/gi,
      normalize: (m) => `${formatQuantityNumber(m[1])} ft²`,
    },
    {
      regex: new RegExp(`(\\d[\\d,.]*)\\s*${METRIC_VOLUME_ALIASES}\\b`, "gi"),
      normalize: (m) => `${formatQuantityNumber(m[1])} m³`,
    },
    {
      regex: /(\d[\d,.]*)(?:m3|m³|cbm)\b/gi,
      normalize: (m) => `${formatQuantityNumber(m[1])} m³`,
    },
    {
      regex: new RegExp(`(\\d[\\d,.]*)\\s*${IMPERIAL_VOLUME_ALIASES}\\b`, "gi"),
      normalize: (m) => `${formatQuantityNumber(m[1])} ft³`,
    },
    {
      regex: /(\d[\d,.]*)(?:ft3|ft³|cuft)\b/gi,
      normalize: (m) => `${formatQuantityNumber(m[1])} ft³`,
    },
    {
      regex: new RegExp(`(\\d[\\d,.]*)\\s*${COUNT_ALIASES}\\b`, "gi"),
      normalize: (m) => `${formatQuantityNumber(m[1])} pcs`,
    },
    {
      regex: new RegExp(`(\\d[\\d,.]*)\\s*${PACK_ALIASES}\\b`, "gi"),
      normalize: (m) => {
        const unit = m[0].replace(m[1], "").trim().toLowerCase();
        if (unit.startsWith("pallet") || unit.startsWith("plt")) return `${formatQuantityNumber(m[1])} pallets`;
        if (unit.includes("bag")) return `${formatQuantityNumber(m[1])} bags`;
        if (unit.includes("slab")) return `${formatQuantityNumber(m[1])} slabs`;
        if (unit.includes("sheet")) return `${formatQuantityNumber(m[1])} sheets`;
        return `${formatQuantityNumber(m[1])} ${unit}`;
      },
    },
    {
      regex: new RegExp(`(\\d[\\d,.]*)\\s*${CONTAINER_ALIASES}\\b`, "gi"),
      normalize: (m) => `${formatQuantityNumber(m[1])} containers`,
    },
    {
      regex: /(\d[\d,.]*)\s*x\s*(\d[\d,.]*)\s*(cm|mm|m)\b/gi,
      normalize: (m) => `${formatQuantityNumber(m[1])} x ${formatQuantityNumber(m[2])} ${m[3]}`,
    },
    {
      regex: /(\d[\d,.]*)\s*(?:cm|mm|m)\s*(?:thick|thickness|kalınlık|kalinlik)\b/gi,
      normalize: (m) => `${formatQuantityNumber(m[1])} ${m[0].match(/(cm|mm|m)/i)?.[1] ?? "mm"} thick`,
    },
  ];

  const matches: QuantityMatch[] = [];
  const seen = new Set<string>();

  for (const { regex, normalize } of patterns) {
    for (const match of input.matchAll(regex)) {
      const normalized = normalize(match);
      const key = normalized.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      matches.push({
        raw: match[0].trim(),
        normalized,
        index: match.index ?? 0,
      });
    }
  }

  return matches.sort((a, b) => a.index - b.index);
}

function extractQuantity(text: string): string | null {
  const matches = extractQuantities(text);
  return matches[0]?.normalized ?? null;
}

const PRODUCT_DETAIL_PATTERNS: RegExp[] = [
  /\bCEM\s*(?:I{1,3}|IV|V)?\s*[\d.]+\s*[A-Z]?\b/gi,
  /\b(?:OPC|SRC|PPC|GGBS|fly\s+ash)\b/gi,
  /\bgrade\s*[\dA-Za-z./-]+\b/gi,
  /\bISO\s*[\d-]+\b/gi,
  /\bEN\s*[\d-]+\b/gi,
  /\bASTM\s*[\dA-Z./-]+\b/gi,
  /\b\d+(?:\.\d+)?\s*(?:mm|cm|m(?!2|3|²|³))\s*(?:rebar|bar|diameter|thick(?:ness)?|kalınlık|kalinlik|tile|fayans)?\b/gi,
  /\b\d+\s*x\s*\d+\s*(?:cm|mm|m)\b/gi,
  /\b\d+\s*(?:cm|mm|m)\s*(?:thick|thickness|kalınlık|kalinlik)\b/gi,
  /\b(?:bagged|in\s+bags|big\s+bags?|bulk|loose|palletized|crated|on\s+pallets)\b/gi,
  /\b(?:galvanized|galvanised|annealed|tempered|laminated|polished|honed|brushed)\b/gi,
  /\b(?:white\s+cement|sulphate\s+resisting|low\s+alkali|rapid\s+hardening)\b/gi,
  /\b(?:fe\s*500|fe\s*550|b500b|s235|s275|s355)\b/gi,
  /\b(?:2\s*cm|3\s*cm|20\s*mm|40\s*mm)\s*(?:slabs?|tiles?)?\b/gi,
];

function titleCaseDetail(value: string): string {
  return value
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
    .replace(/\bCem\b/g, "CEM")
    .replace(/\bIso\b/g, "ISO")
    .replace(/\bEn\b/g, "EN")
    .replace(/\bAstm\b/g, "ASTM")
    .replace(/\bOpc\b/g, "OPC")
    .replace(/\bSrc\b/g, "SRC")
    .replace(/\bFe\b/g, "FE");
}

function extractProductDetails(text: string, product: string | null): string[] {
  const normalized = normalizeQuantityInput(text);
  const quantity = extractQuantity(text);
  const details = new Set<string>();
  const productLower = product?.toLowerCase() ?? "";

  for (const pattern of PRODUCT_DETAIL_PATTERNS) {
    for (const match of normalized.matchAll(pattern)) {
      const detail = match[0].trim().replace(/\s+/g, " ");
      if (detail.length < 2 || detail.length > 80) continue;
      if (productLower && productLower.includes(detail.toLowerCase())) continue;
      if (isQuantityDetail(detail, quantity)) continue;
      details.add(detail.replace(/\s+/g, " "));
    }
  }

  const descriptiveChunk = normalized
    .split(
      /\s*(?:,|\||;|\b(?:CIF|FOB|CFR|DDP|EXW)\b|\bpayment\b|\bödeme\b|\bdelivery\b|\bteslimat\b)/i,
    )[0]
    ?.trim();

  if (descriptiveChunk && product) {
    const withoutQty = stripQuantityPhrases(descriptiveChunk)
      .replace(new RegExp(product.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), "")
      .replace(/\b(?:of|for|and|with)\b/gi, " ")
      .replace(/\s+/g, " ")
      .trim();

    const extraPhrases = withoutQty
      .split(/\s+(?:and|&|\+)\s+|,\s+/i)
      .map((part) => part.trim())
      .filter((part) => part.length >= 3 && part.length <= 60);

    for (const phrase of extraPhrases) {
      if (productLower.includes(phrase.toLowerCase())) continue;
      if (/^(please|urgent|asap|acil)$/i.test(phrase)) continue;
      if (/^\d+$/.test(phrase)) continue;
      if (isQuantityDetail(phrase, quantity)) continue;
      if ([...details].some((d) => d.toLowerCase() === phrase.toLowerCase())) continue;
      details.add(titleCaseDetail(phrase));
    }
  }

  return [...details].filter((detail) => !isQuantityDetail(detail, quantity));
}

function extractSpec(text: string, productDetails: string[]): string | null {
  const fromDetails = productDetails.find((detail) =>
    /\b(CEM|ISO|EN|ASTM|grade|\d+\s*x\s*\d+|\d+\s*(?:mm|cm))\b/i.test(detail) &&
    !/^\d[\d,.]*\s*m$/i.test(normalizeQuantityInput(detail)),
  );
  if (fromDetails) return fromDetails;

  for (const pattern of PRODUCT_DETAIL_PATTERNS) {
    const match = text.match(pattern);
    if (match) return match[0].trim();
  }
  return null;
}

function extractPayment(text: string): ParsedRfq["payment"] | null {
  if (
    /\bLC\s*(?:at\s+)?sight\b/i.test(text) ||
    /\bletter\s+of\s+credit\s+at\s+sight\b/i.test(text) ||
    /\bakkreditif\b/i.test(text) ||
    /\b(?:sight\s+)?letter\s+of\s+credit\b/i.test(text)
  ) {
    return "LC at sight";
  }
  if (/\bLC\b/i.test(text)) {
    return "LC at sight";
  }

  const ttPatterns = [
    /\bT\s*\/\s*T\b/i,
    /\bTT\b/i,
    /\btelegraphic\s+transfer\b/i,
    /\bwire\s+transfer\b/i,
    /\bbank\s+transfer\b/i,
    /\bswift\s+(?:transfer|payment|wire)\b/i,
    /\b(?:payment|pay)\s+(?:by|via)\s+(?:wire|bank\s+transfer|tt|t\/t|swift)\b/i,
    /\b(?:payment|pay)\s+with\s+(?:wire|bank\s+transfer|tt|t\/t|swift)\b/i,
    /\btransfer\s+by\s+(?:wire|bank|swift)\b/i,
    /\belectronic\s+(?:wire\s+)?transfer\b/i,
    /\binternational\s+wire\b/i,
    /\bhavale\b/i,
    /\beft\s+transfer\b/i,
  ];

  if (ttPatterns.some((pattern) => pattern.test(text))) {
    return "T/T";
  }

  return null;
}

const QUANTITY_PREFIX_PATTERN = new RegExp(
  `^\\d[\\d,.\\s]*\\s*(?:${QUANTITY_UNIT_PATTERN}|sf)(?:\\s+of|\\s+adet)?\\s*`,
  "i",
);

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
      "",
    )
    .replace(QUANTITY_PREFIX_PATTERN, "")
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
    productDetails: [],
    destination: null,
    city: null,
    country: null,
    loadingPort: null,
    buyerCity: null,
    buyerCountry: null,
    needsBuyerDestination: false,
    incoterms: null,
    payment: null,
    documents: [],
    leadTime: null,
    confidence: "low",
    fieldCount: 0,
  };

  const trimmed = normalizeRfqInput(text.trim());
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
    const fuzzy = fuzzyMatchProduct(trimmed);
    if (fuzzy) {
      product = fuzzy.product;
      category = fuzzy.category;
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
  const productDetails = extractProductDetails(trimmed, product);
  const specification = extractSpec(trimmed, productDetails);

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

  const payment = extractPayment(trimmed);

  const isTurkishLoad = isTurkishLoadingLocation(city, country);
  const loadingPort = isTurkishLoad && (incoterms === "EXW" || incoterms === "FOB") ? city : null;
  const { buyerCity, buyerCountry } = extractBuyerDestination(
    trimmed,
    city,
    country,
    incoterms,
  );
  const needsBuyerDestination =
    (incoterms === "EXW" || incoterms === "FOB") &&
    isTurkishLoad &&
    !buyerCountry &&
    !buyerCity;

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
  if (buyerCountry || buyerCity) fieldCount++;
  else if (country && country !== "Türkiye") fieldCount++;
  else if (city && !isTurkishLoad) fieldCount++;
  else if (destination && !isTurkishLoad) fieldCount++;
  if (loadingPort) fieldCount++;
  if (incoterms) fieldCount++;
  if (payment) fieldCount++;
  if (specification) fieldCount++;
  if (productDetails.length > 0) fieldCount++;

  const confidence: ParsedRfq["confidence"] =
    fieldCount >= 4 && !needsBuyerDestination
      ? "high"
      : fieldCount >= 1
        ? "medium"
        : "low";

  return {
    product,
    category,
    quantity,
    specification,
    productDetails,
    destination,
    city,
    country,
    loadingPort,
    buyerCity,
    buyerCountry,
    needsBuyerDestination,
    incoterms,
    payment,
    documents,
    leadTime,
    confidence,
    fieldCount,
  };
}

export const RFQ_EXAMPLES = [
  "500 tons Portland cement CEM I 42.5R bagged, CIF Tripoli, wire transfer",
  "2000 sqm marble slabs 2cm thick, CIF Dubai, TT payment",
  "Porcelain floor tiles 3,200 sq ft, CIF Lagos, TT payment",
  "Aluminum windows and doors, DDP Germany, bank transfer",
  "Facade cladding panels 1500 m², FOB Mersin, buyer in Libya, SWIFT transfer",
];
