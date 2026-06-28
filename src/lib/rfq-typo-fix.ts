/** Typo tolerance for free-text RFQ parsing — dictionary fixes + fuzzy keyword match. */

export type FuzzyProductMatch = {
  product: string;
  category: string;
};

/** Whole-word replacements applied before regex parsing. Order matters for overlaps. */
const TYPO_REPLACEMENTS: [RegExp, string][] = [
  [/\bporcelin\b/gi, "porcelain"],
  [/\bporcelan\b/gi, "porcelain"],
  [/\bporceline\b/gi, "porcelain"],
  [/\bceremic\b/gi, "ceramic"],
  [/\bcemnt\b/gi, "cement"],
  [/\bcemet\b/gi, "cement"],
  [/\bcementt\b/gi, "cement"],
  [/\bmarbel\b/gi, "marble"],
  [/\bgranit\b/gi, "granite"],
  [/\btravertin\b/gi, "travertine"],
  [/\binsulaton\b/gi, "insulation"],
  [/\binsualtion\b/gi, "insulation"],
  [/\binsulationn\b/gi, "insulation"],
  [/\bwaterprof\b/gi, "waterproof"],
  [/\bwaterproff\b/gi, "waterproof"],
  [/\baluminim\b/gi, "aluminum"],
  [/\balluminum\b/gi, "aluminum"],
  [/\balluminium\b/gi, "aluminium"],
  [/\bhambrug\b/gi, "Hamburg"],
  [/\bhambur\b/gi, "Hamburg"],
  [/\bistanbull\b/gi, "Istanbul"],
  [/\bizmır\b/gi, "Izmir"],
  [/\btranfer\b/gi, "transfer"],
  [/\btrasnfer\b/gi, "transfer"],
  [/\btrasfer\b/gi, "transfer"],
  [/\bdelivary\b/gi, "delivery"],
  [/\bdeliverey\b/gi, "delivery"],
  [/\bsqure\b/gi, "square"],
  [/\bsqaure\b/gi, "square"],
  [/\bsanitarywere\b/gi, "sanitaryware"],
  [/\bsanitryware\b/gi, "sanitaryware"],
  [/\bfacde\b/gi, "facade"],
  [/\bfacad\b/gi, "facade"],
  [/\bclading\b/gi, "cladding"],
  [/\bcladdng\b/gi, "cladding"],
  [/\bnigerria\b/gi, "Nigeria"],
  [/\bghanna\b/gi, "Ghana"],
  [/\btanzanai\b/gi, "Tanzania"],
  [/\bromaniaa\b/gi, "Romania"],
  [/\bserbiaa\b/gi, "Serbia"],
  [/\bgermny\b/gi, "Germany"],
  [/\bpolnd\b/gi, "Poland"],
  [/\bCIFF\b/g, "CIF"],
  [/\bCFRR\b/g, "CFR"],
  [/\bFBO\b/g, "FOB"],
  [/\bFOBB\b/g, "FOB"],
  [/\bEXXW\b/g, "EXW"],
  [/\bDPD\b/g, "DDP"],
  [/\bDDPP\b/g, "DDP"],
  [/\bTELEGRAFIC\b/gi, "telegraphic"],
];

/** Keywords (incl. common typos) → canonical product. Earlier entries win. */
const PRODUCT_FUZZY_INDEX: Array<{
  terms: string[];
  product: string;
  category: string;
}> = [
  { terms: ["portland", "cement", "cemnt", "cemet"], product: "Portland Cement", category: "Structure & civil works" },
  { terms: ["rebar", "rebarr", "rebars"], product: "Reinforcing Steel (Rebar)", category: "Structure & civil works" },
  { terms: ["readymix", "ready mix"], product: "Ready-Mix Concrete", category: "Structure & civil works" },
  { terms: ["porcelain", "porcelin", "porcelan"], product: "Porcelain Tiles", category: "Floors, walls & ceilings" },
  { terms: ["ceramic", "ceremic", "ceramics"], product: "Ceramic Tiles", category: "Floors, walls & ceilings" },
  { terms: ["marble", "marbel", "granite", "granit", "travertine", "travertin", "limestone"], product: "Marble & Natural Stone", category: "Floors, walls & ceilings" },
  { terms: ["natural stone", "naturalstone"], product: "Marble & Natural Stone", category: "Floors, walls & ceilings" },
  { terms: ["sandwich panel", "sandwichpanel"], product: "Sandwich Panels", category: "Prefabricated" },
  { terms: ["sanitaryware", "sanitarywere", "sanitryware"], product: "Sanitaryware", category: "Bathrooms & kitchens" },
  { terms: ["aluminum window", "aluminium window", "aluminum door"], product: "Aluminum Windows & Doors", category: "Windows, doors & glass" },
  { terms: ["facade", "facde", "cladding", "clading"], product: "Facade Cladding Systems", category: "Roofing & facade" },
  { terms: ["insulation", "insulaton", "rockwool", "mineral wool"], product: "Insulation Materials", category: "Insulation & waterproofing" },
  { terms: ["waterproof", "waterprof", "bitumen membrane"], product: "Waterproofing Materials", category: "Insulation & waterproofing" },
  { terms: ["steel door", "steeldoor"], product: "Steel Doors", category: "Windows, doors & glass" },
  { terms: ["curtain wall", "curtainwall"], product: "Curtain Wall Systems", category: "Windows, doors & glass" },
  { terms: ["electrical cable", "power cable"], product: "Electrical Cables", category: "MEP systems" },
  { terms: ["ppr pipe", "pprpipe", "hdpe pipe", "pvc pipe"], product: "HDPE / PVC Pipes", category: "MEP systems" },
  { terms: ["gypsum", "drywall", "plasterboard"], product: "Gypsum & Drywall", category: "Floors, walls & ceilings" },
  { terms: ["roofing membrane", "epdm", "tpo membrane"], product: "Roofing Membranes", category: "Roofing & facade" },
  { terms: ["tile adhesive", "adhesive", "sealant"], product: "Construction Chemicals", category: "Adhesives & chemicals" },
  { terms: ["kitchen cabinet", "kitchencabinet"], product: "Kitchen Cabinets", category: "Bathrooms & kitchens" },
  { terms: ["structural steel", "structuralsteel"], product: "Structural Steel", category: "Structure & civil works" },
];

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = i - 1;
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const next = Math.min(row[j] + 1, row[j - 1] + 1, prev + cost);
      prev = row[j];
      row[j] = next;
    }
  }
  return row[b.length]!;
}

function maxEditDistance(token: string): number {
  if (token.length <= 4) return 1;
  if (token.length <= 8) return 2;
  return 2;
}

function fuzzyEquals(token: string, candidate: string): boolean {
  const a = token.toLowerCase();
  const b = candidate.toLowerCase();
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > maxEditDistance(a)) return false;
  return levenshtein(a, b) <= maxEditDistance(a);
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter((token) => token.length >= 3);
}

function getPhrases(tokens: string[]): string[] {
  const phrases: string[] = [...tokens];
  for (let i = 0; i < tokens.length - 1; i++) {
    phrases.push(`${tokens[i]} ${tokens[i + 1]}`);
  }
  for (let i = 0; i < tokens.length - 2; i++) {
    phrases.push(`${tokens[i]} ${tokens[i + 1]} ${tokens[i + 2]}`);
  }
  return phrases;
}

/** Apply deterministic typo fixes before structured parsing. */
export function normalizeRfqInput(text: string): string {
  let normalized = text.replace(/\s+/g, " ").trim();
  for (const [pattern, replacement] of TYPO_REPLACEMENTS) {
    normalized = normalized.replace(pattern, replacement);
  }
  return normalized;
}

/** Fuzzy product match when regex patterns miss due to typos. */
export function fuzzyMatchProduct(text: string): FuzzyProductMatch | null {
  const tokens = tokenize(text);
  const phrases = getPhrases(tokens);

  for (const entry of PRODUCT_FUZZY_INDEX) {
    for (const term of entry.terms) {
      const termTokens = term.includes(" ") ? [term] : [term];
      for (const phrase of phrases) {
        for (const candidate of termTokens) {
          if (phrase === candidate || fuzzyEquals(phrase, candidate)) {
            return { product: entry.product, category: entry.category };
          }
        }
      }
    }
  }

  return null;
}
