import Link from "next/link";
import GeoHeader from "@/components/geo/GeoHeader";
import BuyerFooter from "@/components/buyers/Footer";
import { GEO_HUBS, getGeoPageUrl, getGeoPagesByType } from "@/lib/geo-pages";
import {
  GLOBAL_MARKET_STATS,
  MARKET_REGIONS,
  SPOTLIGHT_MARKETS,
  getRegionUrl,
} from "@/lib/markets";

export default function MarketsHubView() {
  const hub = GEO_HUBS.market;
  const geoMarkets = getGeoPagesByType("market");

  return (
    <>
      <GeoHeader />
      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <nav className="mb-6 text-sm text-muted">
            <Link href="/" className="hover:text-accent-light transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{hub.title}</span>
          </nav>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{hub.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted">{hub.description}</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface p-6 text-center">
              <p className="text-3xl font-bold text-accent-light">{GLOBAL_MARKET_STATS.label}</p>
              <p className="mt-1 text-sm text-muted">countries & territories</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6 text-center">
              <p className="text-3xl font-bold text-accent-light">{GLOBAL_MARKET_STATS.regionCount}</p>
              <p className="mt-1 text-sm text-muted">global regions</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6 text-center">
              <p className="text-3xl font-bold text-accent-light">EXW–DDP</p>
              <p className="mt-1 text-sm text-muted">incoterms worldwide</p>
            </div>
          </div>

          <section className="mt-16">
            <h2 className="text-xl font-semibold">Export regions</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Zerixa ships construction materials from Türkiye to buyers worldwide. Select your
              region to see covered countries, logistics, and payment norms.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MARKET_REGIONS.map((region) => (
                <Link
                  key={region.slug}
                  href={getRegionUrl(region.slug)}
                  className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40 hover:bg-surface-elevated"
                >
                  <h3 className="font-semibold group-hover:text-accent-light transition-colors">
                    {region.shortTitle}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
                    {region.description}
                  </p>
                  <p className="mt-3 text-xs text-muted">
                    {region.countries.length} countries
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-xl font-semibold">Spotlight markets</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Detailed guides for high-volume corridors. Your country not listed? We still serve you —
              submit an RFQ with your destination.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SPOTLIGHT_MARKETS.map((spotlight) => {
                const page = geoMarkets.find((p) => p.slug === spotlight.slug);
                if (!page) return null;
                return (
                  <Link
                    key={spotlight.slug}
                    href={getGeoPageUrl(page)}
                    className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40 hover:bg-surface-elevated"
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-accent">
                      {MARKET_REGIONS.find((r) => r.slug === spotlight.regionSlug)?.shortTitle}
                    </p>
                    <h3 className="mt-2 font-semibold group-hover:text-accent-light transition-colors">
                      {spotlight.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
                      {page.metaDescription}
                    </p>
                    <span className="mt-4 inline-block text-xs font-medium text-accent">
                      Read guide →
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          <div className="mt-16 rounded-xl border border-accent/20 bg-accent/5 p-8">
            <h2 className="text-lg font-semibold">Your country not listed?</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Zerixa exports to {GLOBAL_MARKET_STATS.label} countries. Name your destination port or
              delivery address in the RFQ — we quote CIF, CFR, FOB, EXW, or DDP within 24 hours.
            </p>
            <Link
              href="/#request-quote"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-light transition-colors hover:text-accent"
            >
              Request a quote
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </main>
      <BuyerFooter />
    </>
  );
}
