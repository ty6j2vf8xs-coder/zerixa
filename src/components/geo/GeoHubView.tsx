import Link from "next/link";
import GeoHeader from "@/components/geo/GeoHeader";
import BuyerFooter from "@/components/buyers/Footer";
import {
  GEO_HUBS,
  getGeoPageUrl,
  getGeoPagesByType,
  type GeoPageType,
} from "@/lib/geo-pages";

type Props = {
  type: GeoPageType;
};

export default function GeoHubView({ type }: Props) {
  const hub = GEO_HUBS[type];
  const pages = getGeoPagesByType(type);

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
            <span className="text-foreground">{hub.title}</span>
          </nav>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {hub.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{hub.description}</p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <Link
                key={page.slug}
                href={getGeoPageUrl(page)}
                className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40 hover:bg-surface-elevated"
              >
                <h2 className="font-semibold group-hover:text-accent-light transition-colors">
                  {page.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
                  {page.metaDescription}
                </p>
                <span className="mt-4 inline-block text-xs font-medium text-accent">
                  Read →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-16 rounded-xl border border-border bg-surface p-6">
            <h2 className="font-semibold">Other resources</h2>
            <ul className="mt-4 flex flex-wrap gap-4 text-sm">
              {(Object.keys(GEO_HUBS) as GeoPageType[])
                .filter((t) => t !== type)
                .map((t) => (
                  <li key={t}>
                    <Link
                      href={GEO_HUBS[t].path}
                      className="text-muted hover:text-accent-light transition-colors"
                    >
                      {GEO_HUBS[t].title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </main>
      <BuyerFooter />
    </>
  );
}
