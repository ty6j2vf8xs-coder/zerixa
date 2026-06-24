import Link from "next/link";
import GeoHeader from "@/components/geo/GeoHeader";
import BuyerFooter from "@/components/buyers/Footer";
import { getGeoPage, getGeoPageUrl } from "@/lib/geo-pages";
import {
  type MarketRegion,
  getSpotlightMarketsForRegion,
} from "@/lib/markets";

type Props = {
  region: MarketRegion;
};

export default function RegionPageView({ region }: Props) {
  const spotlights = getSpotlightMarketsForRegion(region.slug);

  return (
    <>
      <GeoHeader />
      <main className="pt-16">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <nav className="mb-6 text-sm text-muted">
            <Link href="/" className="hover:text-accent-light transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/markets" className="hover:text-accent-light transition-colors">
              Markets
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{region.shortTitle}</span>
          </nav>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{region.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted">{region.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
                Logistics
              </h2>
              <p className="mt-2 text-sm text-muted leading-relaxed">{region.logisticsNote}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
                Payment
              </h2>
              <p className="mt-2 text-sm text-muted leading-relaxed">{region.paymentNote}</p>
            </div>
          </div>

          {spotlights.length > 0 && (
            <section className="mt-12">
              <h2 className="text-lg font-semibold">Market guides</h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {spotlights.map((spotlight) => {
                  const page = getGeoPage(spotlight.slug);
                  if (!page) return null;
                  return (
                    <li key={spotlight.slug}>
                      <Link
                        href={getGeoPageUrl(page)}
                        className="rounded-full border border-border bg-surface px-4 py-2 text-sm transition-colors hover:border-accent/40 hover:text-accent-light"
                      >
                        {spotlight.title} →
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <section className="mt-12">
            <h2 className="text-lg font-semibold">
              Countries served ({region.countries.length})
            </h2>
            <ul className="mt-6 columns-2 gap-x-8 sm:columns-3 lg:columns-4">
              {region.countries.map((country) => (
                <li
                  key={country}
                  className="mb-2 text-sm text-muted break-inside-avoid"
                >
                  {country}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-16 rounded-xl border border-accent/20 bg-accent/5 p-8">
            <h2 className="text-lg font-semibold">Quote for {region.shortTitle}</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Describe your products, quantity, and destination. Zerixa coordinates export from
              Türkiye with full documentation and delivery — quote within 24 hours.
            </p>
            <Link
              href="/#request-quote"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-light transition-colors hover:text-accent"
            >
              Request a quote
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="mt-10">
            <Link
              href="/markets"
              className="text-sm text-muted hover:text-accent-light transition-colors"
            >
              ← All markets
            </Link>
          </div>
        </div>
      </main>
      <BuyerFooter />
    </>
  );
}
