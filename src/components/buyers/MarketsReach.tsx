import Link from "next/link";
import {
  GLOBAL_MARKET_STATS,
  MARKET_REGIONS,
  getRegionUrl,
} from "@/lib/markets";

export default function MarketsReach() {
  return (
    <section id="markets" className="border-t border-border bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Global reach
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Export to{" "}
            <span className="text-gradient">{GLOBAL_MARKET_STATS.label} countries</span>
          </h2>
          <p className="mt-4 text-muted leading-relaxed md:text-lg">
            From Mersin and İskenderun to ports worldwide — one RFQ, one partner, full export
            execution from Türkiye.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {MARKET_REGIONS.map((region) => (
            <Link
              key={region.slug}
              href={getRegionUrl(region.slug)}
              className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/30"
            >
              <h3 className="text-sm font-semibold group-hover:text-accent-light transition-colors">
                {region.shortTitle}
              </h3>
              <p className="mt-2 text-xs text-muted leading-relaxed line-clamp-3">
                {region.description}
              </p>
              <p className="mt-3 text-xs font-medium text-accent">
                {region.countries.length} countries →
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/markets"
            className="text-sm font-medium text-accent hover:text-accent-light transition-colors"
          >
            Explore all markets we serve →
          </Link>
        </div>
      </div>
    </section>
  );
}
