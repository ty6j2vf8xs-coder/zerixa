import Link from "next/link";

const exampleLines = [
  { product: "Portland cement CEM I 42.5R", qty: "500 MT" },
  { product: "Steel rebar", qty: "120 MT" },
  { product: "Ceramic floor tiles", qty: "2,500 m²" },
  { product: "Aluminum windows", qty: "40 pcs" },
];

export default function ContainerPlannerPromo() {
  return (
    <section id="multi-product-rfq" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Multi-Product RFQ
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              One project,{" "}
              <span className="text-gradient">many products</span> — one request
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Cement, steel, tiles, windows, insulation — list everything your build needs
              in a single structured RFQ. One partner, one consolidated quote from Türkiye.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              <li className="flex gap-2">
                <span className="text-accent">✦</span>
                Add unlimited product lines with category and quantity
              </li>
              <li className="flex gap-2">
                <span className="text-accent">✦</span>
                Set destination and incoterm in the same flow
              </li>
              <li className="flex gap-2">
                <span className="text-accent">✦</span>
                Zerixa handles sourcing, logistics, and consolidated pricing
              </li>
            </ul>
            <Link
              href="/?mode=planner#request-quote"
              className="glow-amber mt-8 inline-flex rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-background transition-all hover:bg-accent-light"
            >
              Build my project RFQ
            </Link>
          </div>

          <div className="rounded-2xl border border-accent/20 bg-surface p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-accent">
              Example project RFQ
            </p>
            <ul className="mt-4 space-y-2">
              {exampleLines.map((line) => (
                <li
                  key={line.product}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm"
                >
                  <span>{line.product}</span>
                  <span className="shrink-0 text-muted">{line.qty}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">
              CIF Tripoli · Payment: T/T bank transfer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
