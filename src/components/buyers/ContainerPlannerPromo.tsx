import Link from "next/link";

export default function ContainerPlannerPromo() {
  return (
    <section id="container-planner" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Multi-Product RFQ Builder
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              One project,{" "}
              <span className="text-gradient">many products</span> — one request
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Cement, steel, tiles, windows, insulation — list everything your build needs.
              Zerixa estimates rough cargo volume and weight, then builds a single
              consolidated RFQ for your team to quote.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              <li className="flex gap-2">
                <span className="text-accent">✦</span>
                Add unlimited product lines in one structured request
              </li>
              <li className="flex gap-2">
                <span className="text-accent">✦</span>
                See approximate CBM and weight before you submit
              </li>
              <li className="flex gap-2">
                <span className="text-accent">✦</span>
                Final FCL count confirmed by Zerixa after spec review
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
              Example rough estimate
            </p>
            <div className="mt-4 space-y-3">
              {[
                {
                  label: "Illustrative group 1 · 40′ HC",
                  util: "~78% volume",
                  items: "Cement 200 MT · Rebar 80 MT",
                },
                {
                  label: "Illustrative group 2 · 40′ Standard",
                  util: "~71% volume",
                  items: "Ceramic tiles 1,200 m² · Sanitaryware 60 pcs",
                },
              ].map((box) => (
                <div
                  key={box.label}
                  className="rounded-xl border border-border bg-background p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{box.label}</p>
                    <span className="text-xs text-accent">{box.util}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted">{box.items}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
                    <div className="h-full w-3/4 rounded-full bg-accent" />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted leading-relaxed">
              Indicative only (typically ±30–40%). Not a loading plan — Zerixa confirms
              final FCL count after reviewing packaging and product specs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
