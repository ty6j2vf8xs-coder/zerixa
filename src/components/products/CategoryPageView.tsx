import Link from "next/link";
import GeoHeader from "@/components/geo/GeoHeader";
import BuyerFooter from "@/components/buyers/Footer";
import { getGeoPage, getGeoPageUrl } from "@/lib/geo-pages";
import {
  PRIORITY_EXPORT_PRODUCTS,
  type ProductCategory,
} from "@/lib/product-catalog";

type Props = {
  category: ProductCategory;
};

export default function CategoryPageView({ category }: Props) {
  const relatedPriority = PRIORITY_EXPORT_PRODUCTS.filter(
    (p) => p.categorySlug === category.slug,
  );

  const relatedGeoPages = relatedPriority
    .filter((p) => p.geoPageSlug)
    .map((p) => getGeoPage(p.geoPageSlug!))
    .filter(Boolean);

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
            <Link href="/products" className="hover:text-accent-light transition-colors">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{category.shortTitle}</span>
          </nav>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{category.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted">{category.description}</p>

          {relatedGeoPages.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {relatedGeoPages.map((page) => (
                <Link
                  key={page!.slug}
                  href={getGeoPageUrl(page!)}
                  className="text-sm font-medium text-accent hover:text-accent-light transition-colors"
                >
                  {page!.title} →
                </Link>
              ))}
            </div>
          )}

          <div className="mt-12">
            <h2 className="text-lg font-semibold">
              Products we source ({category.products.length})
            </h2>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {category.products.map((product) => (
                <li
                  key={product}
                  className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground"
                >
                  {product}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 rounded-xl border border-accent/20 bg-accent/5 p-8">
            <h2 className="text-lg font-semibold">Request a quote for {category.shortTitle}</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              List the products, quantities, destination port, and preferred incoterm. Zerixa
              benchmarks verified Turkish manufacturers and returns one consolidated quote
              within 24 hours.
            </p>
            <Link
              href="/#request-quote"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-light transition-colors hover:text-accent"
            >
              Get a quote
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="mt-10">
            <Link
              href="/products"
              className="text-sm text-muted hover:text-accent-light transition-colors"
            >
              ← All product categories
            </Link>
          </div>
        </div>
      </main>
      <BuyerFooter />
    </>
  );
}
