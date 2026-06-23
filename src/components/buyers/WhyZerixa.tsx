import Link from "next/link";

const reasons = [
  {
    title: "Strategic hub location",
    description:
      "Türkiye sits between Europe, MENA, and Africa — significantly lower ocean freight and faster transit than East Asian suppliers on these routes.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: "One point of contact",
    description:
      "No dealing with multiple factories, brokers, or freight forwarders. Zerixa is your single partner from quote to delivery.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: "Verified Turkish supply",
    description:
      "Every manufacturer is vetted for export capacity — EN standards, CE marking, and ISO 9001 where applicable. No unknown suppliers.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Best price comparison",
    description:
      "For every request, we benchmark market prices across multiple verified manufacturers — and present you with the most competitive offer, not just the first quote.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: "AI-powered procurement",
    description:
      "Describe your needs naturally. Our AI structures the request, matches suppliers, and generates documentation — saving days of back-and-forth.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    title: "Full documentation",
    description:
      "Proforma invoices, certificates of origin, EUR.1, quality certs, packing lists — all prepared and compliant with your country's import requirements.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
];

export default function WhyZerixa() {
  return (
    <section id="why-zerixa" className="border-t border-border bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Why Zerixa
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Not a directory.{" "}
              <span className="text-gradient">Your export partner.</span>
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Import from one of the world&apos;s leading construction export
              hubs — competitive pricing, EN/CE quality, and full-service
              delivery through a single partner.
            </p>

            <div className="mt-8 grid gap-4 grid-cols-2">
              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-accent-light">3–10</span>
                  <span className="text-sm font-medium text-foreground">
                    days sea transit to MENA
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  Lower freight and faster delivery vs East Asian suppliers on
                  European, African, and Middle Eastern routes.
                </p>
                <Link
                  href="/guides/turkiye-strategic-hub-shipping-advantages"
                  className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-light transition-colors"
                >
                  Shipping →
                </Link>
              </div>
              <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-accent-light">0%</span>
                  <span className="text-sm font-medium text-foreground">
                    EU duty on qualifying goods
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  Customs Union with the EU — duty-free industrial goods vs
                  Asian suppliers facing import tariffs.
                </p>
                <Link
                  href="/guides/turkiye-eu-customs-union-construction-export"
                  className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-light transition-colors"
                >
                  Customs Union →
                </Link>
              </div>
              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-2xl font-bold text-accent-light">EN · CE · ISO</span>
                </div>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  Major Turkish manufacturers produce to European Standards,
                  CE marking, and ISO 9001 — verified before every shipment.
                </p>
                <Link
                  href="/guides/european-standards-en-ce-iso-turkiye"
                  className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-light transition-colors"
                >
                  Standards guide →
                </Link>
              </div>
              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-accent-light">195+</span>
                  <span className="text-sm font-medium text-foreground">
                    countries
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  We source from Türkiye and deliver worldwide — wherever your
                  project is.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="flex items-start gap-4 rounded-xl border border-border bg-background p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{reason.title}</h3>
                  <p className="mt-1 text-sm text-muted leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
