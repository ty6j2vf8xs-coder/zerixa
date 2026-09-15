/**
 * Single source of truth for every contact / identity detail on the homepage.
 *
 * Zerixa is the export brand; the contracting party is the legal entity below.
 * Keep these exact — a buyer verifies them against the trade registry.
 */

export const COMPANY = {
  /** Full legal entity name, exactly as registered. */
  legalName: "ELLA PRODUCTS DIŞ TİCARET LİMİTED ŞİRKETİ",
  displayName: "Zerixa",

  city: "İstanbul",
  addressLines: [
    "Altıntepe Mah. İstasyon Yolu Sk. No:3",
    "Maltepe, İstanbul, Türkiye",
  ],

  taxOffice: "Küçükyalı Vergi Dairesi",
  taxNumber: "3320731191",
  tradeRegistryNo: "122138-5",
  exportersAssociation:
    "İstanbul Demir ve Demirdışı Metaller İhracatçıları Birliği — sicil no 83301",

  /** Display format. */
  phone: "+90 542 472 38 92",
  /** Digits only, country code first, no +, no spaces. */
  whatsapp: "905424723892",
  /** Optional — leave as a <placeholder> and the email links simply won't render. */
  email: "<quotes@zerixa.ai>",

  founderName: "Alperen Çavdar",
  founderRole: "Founder",
  /** Drop a photo in /public and set e.g. "/alperen.jpg". Empty = initials avatar. */
  founderPhotoUrl: "",

  /** Ports you actually ship from. Keep this honest and short. */
  loadingPorts: ["İstanbul (Ambarlı)", "Mersin", "İzmir"],
} as const;

/** A value is a placeholder while it still carries the angle brackets. */
export function isPlaceholder(value: string): boolean {
  return value.includes("<") || value.includes(">");
}

/**
 * Email is optional — WhatsApp is the primary channel for our markets.
 * The identity block renders as soon as the entity, address and phone are real.
 */
export const COMPANY_DETAILS_READY = !(
  isPlaceholder(COMPANY.legalName) ||
  isPlaceholder(COMPANY.phone) ||
  isPlaceholder(COMPANY.whatsapp)
);

export function whatsappHref(message?: string): string {
  const digits = COMPANY.whatsapp.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telHref(): string {
  return `tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`;
}

export const WHATSAPP_PREFILL =
  "Hello Zerixa — I'd like a quote for construction materials from Türkiye.";
