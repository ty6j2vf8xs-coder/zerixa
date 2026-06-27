import Link from "next/link";
import GeoHeader from "@/components/geo/GeoHeader";
import BuyerFooter from "@/components/buyers/Footer";
import { GEO_HUBS, getGeoPageUrl, getGeoPagesByType } from "@/lib/geo-pages";
import {
  PRIORITY_EXPORT_PRODUCTS,
  PRODUCT_CATEGORIES,
  getCategoryUrl,
} from "@/lib/product-catalog";

export default function ProductsHubView() {
  const hub = GEO_HUBS.product;
  const geoProducts = getGeoPagesByType("product");

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

          <section className="mt-14">
            <h2 className="text-xl font-semibold">Priority export products</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              High-demand categories for international project procurement from Türkiye.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {PRIORITY_EXPORT_PRODUCTS.map((item) => (
                <Link
                  key={item.name}
                  href={
                    item.geoPageSlug
                      ? `/products/${item.geoPageSlug}`
                      : getCategoryUrl(item.categorySlug)
                  }
                  className="rounded-full border border-border bg-surface px-4 py-2 text-sm transition-colors hover:border-accent/40 hover:text-accent-light"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </section>

          {geoProducts.length > 0 && (
            <section className="mt-14">
              <h2 className="text-xl font-semibold">Detailed product guides</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {geoProducts.map((page) => (
                  <Link
                    key={page.slug}
                    href={getGeoPageUrl(page)}
                    className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40 hover:bg-surface-elevated"
                  >
                    <h3 className="font-semibold group-hover:text-accent-light transition-colors">
                      {page.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
                      {page.metaDescription}
                    </p>
                    <span className="mt-4 inline-block text-xs font-medium text-accent">
                      Read →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mt-16">
            <h2 className="text-xl font-semibold">All product categories</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Browse by category — every item can be quoted through a single RFQ.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PRODUCT_CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={getCategoryUrl(category.slug)}
                  className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40 hover:bg-surface-elevated"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold group-hover:text-accent-light transition-colors">
                      {category.shortTitle}
                    </h3>
                    {category.exportPriority === "high" && (
                      <span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent">
                        Export
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
                    {category.description}
                  </p>
                  <p className="mt-3 text-xs text-muted">
                    {category.products.length} products
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-16 rounded-xl border border-accent/20 bg-accent/5 p-8 text-center">
            <h2 className="text-lg font-semibold">Need a quote?</h2>
            <p className="mt-2 text-sm text-muted">
              Describe your products, quantity, and destination — verified quote within 24 hours.
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
