import Link from "next/link";
import { COMPANY, COMPANY_DETAILS_READY, telHref, whatsappHref, WHATSAPP_PREFILL, isPlaceholder } from "@/lib/v2-company";

/* ---------------------------------------------------------------- */
/* 2. What we source — text and chips. No card grid, no icons.       */
/* ---------------------------------------------------------------- */

const CATEGORIES = [
  { label: "Ceramic & porcelain tiles", slug: "flooring-materials" },
  { label: "Sanitaryware & faucets", slug: "bathroom-sanitaryware" },
  { label: "Aluminium windows & curtain wall", slug: "windows-glazing-curtain-wall" },
  { label: "Doors & ironmongery", slug: "doors-interior-joinery-hardware" },
  { label: "PPR & PVC pipes", slug: "plumbing-water-drainage" },
  { label: "Tile adhesives & sealants", slug: "adhesives-sealants-fixing" },
  { label: "Paints & coatings", slug: "paints-coatings-finishes" },
  { label: "Gypsum boards & ceilings", slug: "ceiling-systems" },
];

export function WhatWeSource() {
  return (
    <section id="what-we-source" className="border-b border-border">
      <div className="mx-auto max-w-5xl px-5 py-14">
        <h2 className="text-xl font-bold sm:text-2xl">What we source</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/category/${cat.slug}`}
              className="rounded-full border border-border bg-surface px-3.5 py-2 text-sm text-muted transition-colors hover:border-accent/50 hover:text-foreground"
            >
              {cat.label}
            </Link>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted">
          Something else? Describe it in the form — we source it.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 3. How it works — three lines.                                    */
/* ---------------------------------------------------------------- */

const STEPS = [
  {
    title: "Send your list",
    body: "Plain text, a photo of a spec sheet, or your BOQ. However you already write it.",
  },
  {
    title: "One consolidated quote",
    body: "CIF price, factory names, certificates and lead time in a single document — usually back within one working day.",
  },
  {
    title: "We ship it",
    body: "Production follow-up, inspection, export documents, delivery to your port.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border bg-surface/40">
      <div className="mx-auto max-w-5xl px-5 py-14">
        <h2 className="text-xl font-bold sm:text-2xl">How it works</h2>
        <ol className="mt-6 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <span className="text-sm font-mono text-accent">0{i + 1}</span>
              <h3 className="mt-1.5 font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 4. Why us — three sentences, not ten tiles.                       */
/* ---------------------------------------------------------------- */

const REASONS = [
  {
    title: "Consolidation",
    body: "Tiles from one factory, sanitaryware from another, adhesive from a third — loaded into one container, on one invoice, under one bill of lading.",
  },
  {
    title: "Distance",
    body: "Turkish ports are roughly two weeks closer to West Africa than East Asian ones. Less freight, less working capital tied up at sea.",
  },
  {
    title: "Transparency",
    body: "We name the factories in the quote. And we will arrange SGS or Bureau Veritas inspection before loading if you want it — at your cost, on your instruction.",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="border-b border-border">
      <div className="mx-auto max-w-5xl px-5 py-14">
        <h2 className="text-xl font-bold sm:text-2xl">Why buy through us</h2>
        <div className="mt-6 grid gap-7 sm:grid-cols-3">
          {REASONS.map((reason) => (
            <div key={reason.title}>
              <h3 className="font-semibold text-accent-light">{reason.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{reason.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 5. Who we are — proof, not claims.                                */
/* ---------------------------------------------------------------- */

function Initials({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-surface-elevated text-lg font-semibold text-muted">
      {initials}
    </div>
  );
}

export function WhoWeAre() {
  if (!COMPANY_DETAILS_READY) {
    // Never ship a half-filled identity block — that is worse than none.
    if (process.env.NODE_ENV === "production") return null;
    return (
      <section className="border-b border-border bg-amber-500/10">
        <div className="mx-auto max-w-5xl px-5 py-10">
          <h2 className="text-lg font-bold text-accent-light">
            ⚠ &ldquo;Who we are&rdquo; is not configured
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            Fill in <code className="text-foreground">src/lib/v2-company.ts</code> — legal
            name, address, tax number, phone, WhatsApp, email. This section is hidden in
            production until you do, because a half-filled identity block costs more trust
            than it earns. This warning only appears in development.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="who-we-are" className="border-b border-border bg-surface/40">
      <div className="mx-auto max-w-5xl px-5 py-14">
        <h2 className="text-xl font-bold sm:text-2xl">Who we are</h2>

        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
          {COMPANY.founderPhotoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={COMPANY.founderPhotoUrl}
              alt={COMPANY.founderName}
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 rounded-full object-cover"
            />
          ) : (
            <Initials name={COMPANY.founderName} />
          )}
          <div>
            <p className="font-semibold">{COMPANY.founderName}</p>
            <p className="text-sm text-muted">
              {COMPANY.founderRole}, {COMPANY.legalName}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Zerixa is the export brand of {COMPANY.legalName}, a registered trading
              company in {COMPANY.city}. We buy from Turkish factories in our own name,
              consolidate, and ship. If something goes wrong with your order, you call
              the number below and I answer.
            </p>
          </div>
        </div>

        <dl className="mt-8 grid gap-x-10 gap-y-4 border-t border-border pt-6 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted">Registered name</dt>
            <dd className="mt-0.5 font-medium">{COMPANY.legalName}</dd>
          </div>
          <div>
            <dt className="text-muted">Address</dt>
            <dd className="mt-0.5 font-medium">
              {COMPANY.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </dd>
          </div>
          {!isPlaceholder(COMPANY.taxNumber) && (
            <div>
              <dt className="text-muted">Tax office / number</dt>
              <dd className="mt-0.5 font-medium">
                {COMPANY.taxOffice} · {COMPANY.taxNumber}
              </dd>
            </div>
          )}
          {!isPlaceholder(COMPANY.tradeRegistryNo) && (
            <div>
              <dt className="text-muted">Trade registry no</dt>
              <dd className="mt-0.5 font-medium">{COMPANY.tradeRegistryNo}</dd>
            </div>
          )}
          {!isPlaceholder(COMPANY.exportersAssociation) && (
            <div>
              <dt className="text-muted">Exporters&rsquo; association</dt>
              <dd className="mt-0.5 font-medium">{COMPANY.exportersAssociation}</dd>
            </div>
          )}
          <div>
            <dt className="text-muted">Loading ports</dt>
            <dd className="mt-0.5 font-medium">{COMPANY.loadingPorts.join(" · ")}</dd>
          </div>
        </dl>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={telHref()}
            className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent/50"
          >
            {COMPANY.phone}
          </a>
          <a
            href={whatsappHref(WHATSAPP_PREFILL)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white"
          >
            WhatsApp
          </a>
          {!isPlaceholder(COMPANY.email) && (
            <a
              href={`mailto:${COMPANY.email}`}
              className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent/50"
            >
              {COMPANY.email}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
