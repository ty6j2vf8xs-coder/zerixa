/** All countries A–Z, plus NOT SURE as the last option. */
export const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Türkiye",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
] as const;

export const COUNTRY_OPTIONS = [
  ...COUNTRIES.map((name) => ({ value: name, label: name })),
  { value: "Not sure" as const, label: "NOT SURE" },
];

export type CountryOption =
  | (typeof COUNTRIES)[number]
  | "Not sure";

const COUNTRY_ALIASES: Record<string, CountryOption> = {
  uae: "United Arab Emirates",
  uk: "United Kingdom",
  "united kingdom": "United Kingdom",
  usa: "United States",
  us: "United States",
  "united states of america": "United States",
  turkey: "Türkiye",
  turkiye: "Türkiye",
  türkiye: "Türkiye",
  saudi: "Saudi Arabia",
  "saudi arabia": "Saudi Arabia",
  libya: "Libya",
  iraq: "Iraq",
  egypt: "Egypt",
  mısır: "Egypt",
  algeria: "Algeria",
  cezayir: "Algeria",
  morocco: "Morocco",
  fas: "Morocco",
  germany: "Germany",
  almanya: "Germany",
  france: "France",
  fransa: "France",
  italy: "Italy",
  italya: "Italy",
  spain: "Spain",
  ispanya: "Spain",
  "ivory coast": "Ivory Coast",
  "cote d'ivoire": "Ivory Coast",
  korea: "South Korea",
  "south korea": "South Korea",
};

function normalizeCountry(input: string): CountryOption | null {
  const trimmed = input.trim();
  const lower = trimmed.toLowerCase();

  const alias = COUNTRY_ALIASES[lower];
  if (alias) return alias;

  const exact = COUNTRY_OPTIONS.find(
    (c) => c.value !== "Not sure" && c.value.toLowerCase() === lower
  );
  if (exact) return exact.value as CountryOption;

  const partial = COUNTRIES.find(
    (c) => lower.includes(c.toLowerCase()) || c.toLowerCase().includes(lower)
  );
  return partial ?? null;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Find the first country name or alias mentioned in free text. */
export function matchCountryFromText(text: string): CountryOption | null {
  const lower = text.toLowerCase();

  for (const [alias, country] of Object.entries(COUNTRY_ALIASES)) {
    if (new RegExp(`\\b${escapeRegExp(alias)}\\b`, "i").test(lower)) {
      return country;
    }
  }

  const sorted = [...COUNTRIES].sort((a, b) => b.length - a.length);
  for (const country of sorted) {
    if (new RegExp(`\\b${escapeRegExp(country)}\\b`, "i").test(text)) {
      return country;
    }
  }

  return null;
}

export function matchCountryFromDestination(destination: string | null): CountryOption {
  if (!destination) return "Not sure";

  const parts = destination.split(",").map((p) => p.trim()).filter(Boolean);
  for (let i = parts.length - 1; i >= 0; i--) {
    const match = normalizeCountry(parts[i]);
    if (match) return match;
  }

  const whole = normalizeCountry(destination);
  return whole ?? "Not sure";
}
