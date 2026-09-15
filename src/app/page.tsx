import V2Header from "@/components/v2/V2Header";
import V2Hero from "@/components/v2/V2Hero";
import { WhatWeSource, HowItWorks, WhyUs, WhoWeAre } from "@/components/v2/V2Sections";
import V2Footer from "@/components/v2/V2Footer";
import WhatsAppFab from "@/components/v2/WhatsAppFab";
import { COMPANY, isPlaceholder } from "@/lib/v2-company";

/**
 * Real registration details in structured data: this is what lets Google — and
 * a buyer's compliance check — tie the brand to a verifiable legal entity.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.displayName,
  legalName: COMPANY.legalName,
  url: "https://zerixa.ai",
  logo: "https://zerixa.ai/apple-icon.png",
  description:
    "Türkiye-based export desk for construction materials. Tiles, sanitaryware, aluminium profiles and finishing products, consolidated into one container and one invoice.",
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.addressLines[0],
    addressLocality: "Maltepe",
    addressRegion: "İstanbul",
    addressCountry: "TR",
  },
  telephone: COMPANY.phone,
  taxID: COMPANY.taxNumber,
  ...(isPlaceholder(COMPANY.email) ? {} : { email: COMPANY.email }),
  areaServed: "Worldwide",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <V2Header />
      <main className="flex-1">
        <V2Hero />
        <WhatWeSource />
        <HowItWorks />
        <WhyUs />
        <WhoWeAre />
      </main>
      <V2Footer />
      <WhatsAppFab />
    </>
  );
}
