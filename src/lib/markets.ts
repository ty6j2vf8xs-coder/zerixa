import { COUNTRIES } from "@/lib/countries";

export type MarketRegion = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  logisticsNote: string;
  paymentNote: string;
  countries: string[];
};

export type SpotlightMarket = {
  slug: string;
  title: string;
  regionSlug: string;
};

/** Buyer destination countries — Türkiye is the export hub, not a buyer market */
export const BUYER_COUNTRIES = COUNTRIES.filter((c) => c !== "Türkiye");

export const GLOBAL_MARKET_STATS = {
  countryCount: BUYER_COUNTRIES.length,
  regionCount: 5,
  label: "195+",
} as const;

const MENA_COUNTRIES = [
  "Algeria", "Bahrain", "Djibouti", "Egypt", "Iran", "Iraq", "Israel", "Jordan",
  "Kuwait", "Lebanon", "Libya", "Morocco", "Oman", "Palestine", "Qatar",
  "Saudi Arabia", "South Sudan", "Sudan", "Syria", "Tunisia", "United Arab Emirates", "Yemen",
] as const;

const SUB_SAHARAN_AFRICA_COUNTRIES = [
  "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cameroon", "Cape Verde",
  "Central African Republic", "Chad", "Comoros", "Congo", "Equatorial Guinea", "Eritrea",
  "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Ivory Coast",
  "Kenya", "Lesotho", "Liberia", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius",
  "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda", "Sao Tome and Principe", "Senegal",
  "Seychelles", "Sierra Leone", "Somalia", "South Africa", "Tanzania", "Togo", "Uganda", "Zambia",
  "Zimbabwe",
] as const;

const EUROPE_CIS_COUNTRIES = [
  "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium",
  "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark",
  "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", "Hungary", "Iceland",
  "Ireland", "Italy", "Kazakhstan", "Kosovo", "Kyrgyzstan", "Latvia", "Liechtenstein",
  "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands",
  "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino",
  "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Tajikistan",
  "Turkmenistan", "Ukraine", "United Kingdom", "Uzbekistan", "Vatican City",
] as const;

const AMERICAS_COUNTRIES = [
  "Antigua and Barbuda", "Argentina", "Bahamas", "Barbados", "Belize", "Bolivia", "Brazil",
  "Canada", "Chile", "Colombia", "Costa Rica", "Cuba", "Dominica", "Dominican Republic",
  "Ecuador", "El Salvador", "Grenada", "Guatemala", "Guyana", "Haiti", "Honduras", "Jamaica",
  "Mexico", "Nicaragua", "Panama", "Paraguay", "Peru", "Saint Kitts and Nevis", "Saint Lucia",
  "Saint Vincent and the Grenadines", "Suriname", "Trinidad and Tobago", "United States",
  "Uruguay", "Venezuela",
] as const;

const ASIA_PACIFIC_COUNTRIES = [
  "Afghanistan", "Australia", "Bangladesh", "Bhutan", "Brunei", "Cambodia", "China", "Fiji",
  "India", "Indonesia", "Japan", "Kiribati", "Laos", "Malaysia", "Maldives", "Marshall Islands",
  "Micronesia", "Mongolia", "Myanmar", "Nauru", "Nepal", "New Zealand", "North Korea",
  "Pakistan", "Palau", "Papua New Guinea", "Philippines", "Samoa", "Singapore",
  "Solomon Islands", "South Korea", "Sri Lanka", "Taiwan", "Thailand", "Timor-Leste", "Tonga",
  "Tuvalu", "Vanuatu", "Vietnam",
] as const;

export const MARKET_REGIONS: MarketRegion[] = [
  {
    slug: "mena",
    title: "Middle East & North Africa",
    shortTitle: "MENA",
    description:
      "A core export corridor from Türkiye — short sea routes, strong cement and steel demand, and LC-based project procurement.",
    logisticsNote: "CIF/CFR to major ports; 3–12 day transit from Turkish export hubs.",
    paymentNote: "LC at sight common; T/T for established buyers and repeat orders.",
    countries: [...MENA_COUNTRIES],
  },
  {
    slug: "sub-saharan-africa",
    title: "Sub-Saharan Africa",
    shortTitle: "Africa",
    description:
      "Growing infrastructure and housing demand — cement, steel, tiles, and MEP materials for public and private projects.",
    logisticsNote: "CIF to West, East, and Southern African ports; multimodal where needed.",
    paymentNote: "LC at sight standard; inspection certificates often required.",
    countries: [...SUB_SAHARAN_AFRICA_COUNTRIES],
  },
  {
    slug: "europe-cis",
    title: "Europe, UK & CIS",
    shortTitle: "Europe & CIS",
    description:
      "Windows, facade, insulation, and finishing materials — with Customs Union advantages for qualifying EU-bound goods.",
    logisticsNote: "Road, rail, and sea to EU; DDP delivery available for project materials.",
    paymentNote: "T/T and open account common; EUR.1 for EU Customs Union qualifying goods.",
    countries: [...EUROPE_CIS_COUNTRIES],
  },
  {
    slug: "americas",
    title: "Americas",
    shortTitle: "Americas",
    description:
      "North, Central, and South America — natural stone, tiles, steel, and specialty construction products by container.",
    logisticsNote: "FOB/CIF container export; longer transit via Mediterranean or Atlantic routes.",
    paymentNote: "T/T standard; LC available for larger project orders.",
    countries: [...AMERICAS_COUNTRIES],
  },
  {
    slug: "asia-pacific",
    title: "Asia-Pacific",
    shortTitle: "Asia-Pacific",
    description:
      "From South Asia to Oceania — competitive Turkish supply for tiles, stone, steel, and project finishing packages.",
    logisticsNote: "FOB/CIF via Suez or regional hubs; lead times vary by port and product.",
    paymentNote: "T/T and LC at sight depending on buyer bank and order size.",
    countries: [...ASIA_PACIFIC_COUNTRIES],
  },
];

export const SPOTLIGHT_MARKETS: SpotlightMarket[] = [
  { slug: "libya-construction-imports", title: "Libya", regionSlug: "mena" },
  { slug: "uae-dubai-construction-materials", title: "UAE & Dubai", regionSlug: "mena" },
  { slug: "saudi-arabia-building-materials", title: "Saudi Arabia", regionSlug: "mena" },
  { slug: "iraq-reconstruction-materials", title: "Iraq", regionSlug: "mena" },
  { slug: "germany-turkiye-supply", title: "Germany", regionSlug: "europe-cis" },
];

function validateRegionCoverage() {
  const assigned = new Set(MARKET_REGIONS.flatMap((r) => r.countries));
  const missing = BUYER_COUNTRIES.filter((c) => !assigned.has(c));
  const extra = [...assigned].filter((c) => !BUYER_COUNTRIES.includes(c as (typeof BUYER_COUNTRIES)[number]));
  if (missing.length > 0 || extra.length > 0) {
    throw new Error(
      `Market region coverage mismatch. Missing: ${missing.join(", ")}. Extra: ${extra.join(", ")}`,
    );
  }
}

validateRegionCoverage();

export function getRegionBySlug(slug: string): MarketRegion | undefined {
  return MARKET_REGIONS.find((r) => r.slug === slug);
}

export function getAllRegionSlugs(): string[] {
  return MARKET_REGIONS.map((r) => r.slug);
}

export function getRegionUrl(slug: string): string {
  return `/markets/region/${slug}`;
}

export function getRegionForCountry(country: string): MarketRegion | undefined {
  return MARKET_REGIONS.find((r) => r.countries.includes(country));
}

export function getSpotlightMarketsForRegion(regionSlug: string): SpotlightMarket[] {
  return SPOTLIGHT_MARKETS.filter((m) => m.regionSlug === regionSlug);
}
