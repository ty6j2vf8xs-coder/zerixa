import {
  getAbsoluteUrl,
  getGeoPageUrl,
  type GeoPage,
} from "@/lib/geo-pages";

type Props = {
  page: GeoPage;
};

export default function GeoJsonLd({ page }: Props) {
  const url = getAbsoluteUrl(getGeoPageUrl(page));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Zerixa",
        url: "https://zerixa.ai",
        logo: "https://zerixa.ai/icon.svg",
        description:
          "Türkiye-based trading house for construction materials export. Single point of contact for international buyers.",
        areaServed: "Worldwide",
      },
      {
        "@type": "WebPage",
        name: page.title,
        description: page.metaDescription,
        url,
        isPartOf: { "@type": "WebSite", name: "Zerixa", url: "https://zerixa.ai" },
        about: {
          "@type": "Thing",
          name: page.h1,
          description: page.aiSummary,
        },
      },
      ...(page.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: page.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
