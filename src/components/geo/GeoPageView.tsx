import Link from "next/link";
import GeoHeader from "@/components/geo/GeoHeader";
import GeoJsonLd from "@/components/geo/GeoJsonLd";
import ExportRankings from "@/components/buyers/ExportRankings";
import BuyerFooter from "@/components/buyers/Footer";
import {
  GEO_HUBS,
  getGeoPageUrl,
  resolveRelatedPages,
  type GeoPage,
  type GeoPageType,
} from "@/lib/geo-pages";

type Props = {
  page: GeoPage;
};

const TYPE_LABELS: Record<GeoPageType, string> = {
  guide: "Guide",
  product: "Product",
  market: "Market",
  incoterm: "Incoterm",
};

export default function GeoPageView({ page }: Props) {
  const hub = GEO_HUBS[page.type];
  const related = resolveRelatedPages(page.relatedSlugs);
  const wide = page.slug === "turkiye-leading-construction-materials-exporter";

  return (
    <>
      <GeoJsonLd page={page} />
      <GeoHeader />
      <main className="pt-16">
        <article
          className={`mx-auto px-6 py-16 ${wide ? "max-w-5xl" : "max-w-3xl"}`}
        >
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted">
            <Link href="/" className="hover:text-accent-light transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href={hub.path} className="hover:text-accent-light transition-colors">
              {hub.title}
            </Link>
            <span>/</span>
            <span className="text-foreground">{page.slug}</span>
          </nav>

          <div className="mb-4 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-light">
            {TYPE_LABELS[page.type]}
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{page.h1}</h1>

          <p className="mt-6 text-lg leading-relaxed text-muted">{page.aiSummary}</p>

          {page.slug === "turkiye-leading-construction-materials-exporter" && (
            <div className="mt-10 -mx-2">
              <ExportRankings compact />
            </div>
          )}

          <div className="mt-12 space-y-10">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold">{section.heading}</h2>
                <ul className="mt-4 space-y-2">
                  {section.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-muted leading-relaxed"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {page.faqs.length > 0 && (
            <section className="mt-14">
              <h2 className="text-xl font-semibold">Frequently asked questions</h2>
              <dl className="mt-6 space-y-6">
                {page.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-lg border border-border bg-surface p-5"
                  >
                    <dt className="font-medium text-foreground">{faq.question}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {related.length > 0 && (
            <section className="mt-14">
              <h2 className="text-xl font-semibold">Related pages</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {related.map((rel) => (
                  <li key={rel.slug}>
                    <Link
                      href={getGeoPageUrl(rel)}
                      className="block rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent/40 hover:bg-surface-elevated"
                    >
                      <span className="text-xs uppercase tracking-wider text-accent-light">
                        {TYPE_LABELS[rel.type]}
                      </span>
                      <span className="mt-1 block font-medium">{rel.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-14 rounded-2xl border border-accent/30 bg-surface-elevated p-8 text-center glow-amber">
            <h2 className="text-xl font-semibold">Get a verified quote</h2>
            <p className="mt-2 text-sm text-muted">
              Describe what you need — quote within 24 hours. No membership fee.
            </p>
            <Link
              href="/#request-quote"
              className="mt-6 inline-flex rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-light"
            >
              Request a Quote
            </Link>
          </div>
        </article>
      </main>
      <BuyerFooter />
    </>
  );
}
