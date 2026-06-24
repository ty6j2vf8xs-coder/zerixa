"use client";

import { useState } from "react";
import { parseRfq, RFQ_EXAMPLES, formatPaymentLabel } from "@/lib/parseRfq";

const features = [
  {
    title: "Smart RFQ",
    description:
      "Describe your needs in any language. AI extracts product, quantity, specs, destination, and payment terms instantly.",
    tag: "Live demo below",
  },
  {
    title: "Quote in 24h",
    description:
      "Submit your request and receive a detailed, tailored quote from our team within 24 hours.",
    tag: "24h turnaround",
  },
  {
    title: "Document AI",
    description:
      "Proforma invoices, packing lists, and export documents — generated and verified before shipment.",
    tag: "Zero doc errors",
  },
  {
    title: "Order Copilot",
    description:
      "Track shipments, ask questions, get updates — 24/7 AI assistant for every active order.",
    tag: "Coming soon",
  },
];

function ConfidenceBadge({ level }: { level: "high" | "medium" | "low" }) {
  const styles = {
    high: "bg-green-500/15 text-green-400 border-green-500/30",
    medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    low: "bg-border text-muted border-border",
  };
  return (
    <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${styles[level]}`}>
      {level} confidence
    </span>
  );
}

export default function AIFeatures() {
  const [demoText, setDemoText] = useState(RFQ_EXAMPLES[0]);
  const parsed = parseRfq(demoText);

  return (
    <section id="ai" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            AI-Powered Procurement
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            10× faster sourcing,{" "}
            <span className="text-gradient">powered by AI</span>
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Traditional brokers take days to understand your request. Zerixa AI
            structures it in seconds — so you get accurate quotes faster.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <span className="text-xs font-mono text-accent">{f.tag}</span>
              <h3 className="mt-2 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-accent/20 bg-surface overflow-hidden">
          <div className="border-b border-border bg-accent/5 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-sm font-medium">Live AI Demo — try it now</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {RFQ_EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setDemoText(ex)}
                  className="rounded-lg border border-border bg-background px-3 py-1 text-xs text-muted transition-colors hover:border-accent/40 hover:text-foreground"
                >
                  Example {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
            <div className="p-6">
              <label htmlFor="ai-demo" className="mb-2 block text-sm font-medium text-muted">
                Your request (plain language)
              </label>
              <textarea
                id="ai-demo"
                value={demoText}
                onChange={(e) => setDemoText(e.target.value)}
                rows={6}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-mono outline-none transition-colors focus:border-accent/50 resize-none"
              />
              <p className="mt-2 text-xs text-muted">
                Edit the text or click an example — watch AI extract fields in real time.
              </p>
            </div>

            <div className="p-6 bg-background/50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">AI Extracted</span>
                {parsed.fieldCount > 0 && <ConfidenceBadge level={parsed.confidence} />}
              </div>

              {parsed.fieldCount === 0 ? (
                <p className="text-sm text-muted italic">
                  Start typing a request (min. 5 characters)…
                </p>
              ) : (
                <div className="space-y-3">
                  {[
                    { label: "Product", value: parsed.product },
                    { label: "Category", value: parsed.category },
                    { label: "Quantity", value: parsed.quantity },
                    { label: "Specification", value: parsed.specification },
                    ...parsed.productDetails.map((detail) => ({
                      label: "Product detail",
                      value: detail,
                    })),
                    { label: "City", value: parsed.city },
                    { label: "Country", value: parsed.country },
                    {
                      label: "Destination",
                      value:
                        !parsed.city && !parsed.country ? parsed.destination : null,
                    },
                    { label: "Incoterms", value: parsed.incoterms },
                    { label: "Payment", value: parsed.payment ? formatPaymentLabel(parsed.payment) : null },
                    { label: "Lead time", value: parsed.leadTime },
                  ].map(
                    (field) =>
                      field.value && (
                        <div
                          key={`${field.label}-${field.value}`}
                          className="flex items-start justify-between gap-4 text-sm"
                        >
                          <span className="text-muted shrink-0">{field.label}</span>
                          <span className="font-medium text-right text-accent-light">
                            {field.value}
                          </span>
                        </div>
                      )
                  )}

                  {parsed.documents.length > 0 && (
                    <div className="pt-2 border-t border-border">
                      <span className="text-xs text-muted">Required documents</span>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {parsed.documents.map((doc) => (
                          <span
                            key={doc}
                            className="rounded-md bg-accent/10 px-2 py-0.5 text-xs text-accent-light"
                          >
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="mt-8 text-center">
          <a
            href="#request-quote"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-light"
          >
            Try with your real request
            <span aria-hidden>→</span>
          </a>
        </p>
      </div>
    </section>
  );
}
