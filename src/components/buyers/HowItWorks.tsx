const steps = [
  {
    step: "01",
    title: "Describe your need",
    description:
      "Tell us what you need in plain language — product, quantity, destination, payment terms. No technical forms. AI structures your request instantly.",
    example: '"500 tons cement CEM I 42.5R, FOB Mersin, payment LC"',
  },
  {
    step: "02",
    title: "Receive a verified quote",
    description:
      "Within 24 hours, get a detailed quote from our verified Turkish supply network. Pricing, lead time, certifications — all included.",
    example: "Proforma invoice · ISO certs · Origin documents",
  },
  {
    step: "03",
    title: "Pay securely",
    description:
      "Pay via bank transfer or letter of credit. Funds held in escrow until delivery is confirmed. Your payment is protected.",
    example: "T/T (Bank Transfer) · LC AT SIGHT · Escrow protection",
  },
  {
    step: "04",
    title: "We deliver",
    description:
      "We handle sourcing, quality control, shipping, customs, and delivery. Track your order from factory to your site.",
    example: "EXW · FOB · CIF · CFR · DDP",
  },
];

export default function BuyerHowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            From request to delivery —{" "}
            <span className="text-gradient">we handle everything</span>
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            No browsing supplier directories. No negotiating with multiple
            factories. One request, one quote, one delivery.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {steps.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-accent/30"
            >
              <span className="text-xs font-mono text-accent/70">
                STEP {item.step}
              </span>
              <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {item.description}
              </p>
              <p className="mt-4 rounded-lg bg-background px-4 py-2.5 text-xs font-mono text-accent-light/80">
                {item.example}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
