import Link from "next/link";
import { HOMEPAGE_PRODUCT_GROUPS, getCategoryUrl } from "@/lib/product-catalog";

export default function ProductCategories() {
  return (
    <section id="products" className="border-t border-border bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            What We Source
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            All construction materials{" "}
            <span className="text-gradient">in one place</span>
          </h2>
          <p className="mt-4 text-muted leading-relaxed md:text-lg">
            Access one of the world&apos;s leading construction export hubs —
            structure, facade, MEP, finishes, and raw materials from verified
            manufacturers in Türkiye.{" "}
            <Link
              href="/guides/turkiye-leading-construction-materials-exporter"
              className="text-accent-light hover:text-accent transition-colors"
            >
              Why Türkiye →
            </Link>
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HOMEPAGE_PRODUCT_GROUPS.map((group) => (
            <Link
              key={group.title}
              href={getCategoryUrl(group.categorySlugs[0])}
              className="group rounded-2xl border border-border bg-background p-7 transition-colors hover:border-accent/30"
            >
              <div className="mb-4 h-0.5 w-10 rounded-full bg-accent" />
              <h3 className="text-base font-semibold leading-snug group-hover:text-accent-light transition-colors">
                {group.title}
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {group.description}
              </p>
              <span className="mt-4 inline-block text-xs font-medium text-accent">
                Browse category →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="text-sm font-medium text-accent hover:text-accent-light transition-colors"
          >
            View all 29 product categories →
          </Link>
        </div>

        <div className="mt-14 rounded-2xl border border-accent/20 bg-accent/5 px-6 py-8 text-center max-w-3xl mx-auto">
          <p className="text-sm leading-relaxed text-foreground md:text-base">
            Don&apos;t see your product here? No problem — describe what you need
            and we will source it for you.
          </p>
          <a
            href="#request-quote"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-light transition-colors hover:text-accent"
          >
            Get a quote
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
