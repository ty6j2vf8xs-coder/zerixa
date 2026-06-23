const packages = [
  {
    name: "EXW",
    price: "From order",
    description: "Ex Works — you collect goods from the factory or warehouse in Türkiye.",
    features: [
      "Factory gate pickup",
      "Export-ready packing",
      "Commercial invoice",
      "Certificate of origin",
    ],
    cta: "Get EXW Quote",
    highlighted: false,
  },
  {
    name: "FOB",
    price: "From order",
    description: "Free on Board — we deliver to the Turkish port. You handle ocean freight.",
    features: [
      "Factory to port logistics",
      "Export documentation",
      "Quality inspection",
      "Port handover",
    ],
    cta: "Get FOB Quote",
    highlighted: false,
  },
  {
    name: "CIF",
    price: "From order",
    description: "Cost, Insurance & Freight — we deliver to your port. Most popular option.",
    features: [
      "Everything in FOB",
      "Ocean freight arranged",
      "Marine insurance included",
      "Port-to-port tracking",
    ],
    cta: "Get CIF Quote",
    highlighted: true,
  },
  {
    name: "CFR",
    price: "From order",
    description: "Cost & Freight — freight to your port included; insurance is yours to arrange.",
    features: [
      "Everything in FOB",
      "Ocean freight arranged",
      "Port arrival coordination",
      "Buyer arranges insurance",
    ],
    cta: "Get CFR Quote",
    highlighted: false,
  },
  {
    name: "DDP",
    price: "From order",
    description: "Delivered Duty Paid — door-to-door. We handle customs and final delivery.",
    features: [
      "Everything in CIF",
      "Import customs clearance",
      "Inland delivery to site",
      "Full risk management",
    ],
    cta: "Get DDP Quote",
    highlighted: false,
  },
];

export default function ServicePackages() {
  return (
    <section id="services" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Incoterms
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Choose your{" "}
            <span className="text-gradient">delivery terms</span>
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            EXW, FOB, CIF, CFR, or DDP — pick the Incoterm that fits your
            logistics and risk preference.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative rounded-2xl border p-6 flex flex-col ${
                pkg.highlighted
                  ? "border-accent bg-accent/5 glow-amber"
                  : "border-border bg-surface"
              }`}
            >
              {pkg.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-background whitespace-nowrap">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{pkg.name}</h3>
              <p className="mt-1 text-2xl font-bold text-accent-light">
                {pkg.price}
              </p>
              <p className="mt-2 text-sm text-muted">{pkg.description}</p>
              <ul className="mt-6 flex-1 space-y-2">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 text-accent">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#request-quote"
                className={`mt-6 block rounded-xl py-3 text-center text-sm font-semibold transition-colors ${
                  pkg.highlighted
                    ? "bg-accent text-background hover:bg-accent-light"
                    : "border border-border hover:border-accent/40 hover:text-accent-light"
                }`}
              >
                {pkg.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
