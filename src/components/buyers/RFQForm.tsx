"use client";

import { useState, useEffect, useCallback } from "react";
import {
  parseRfq,
  RFQ_EXAMPLES,
  DELIVERY_OPTIONS,
  PAYMENT_OPTIONS,
  COUNTRY_OPTIONS,
  formatPaymentLabel,
  matchCountryFromDestination,
  type ParsedRfq,
  type Incoterm,
  type PaymentOption,
  type CountryOption,
} from "@/lib/parseRfq";
import ContainerPlanner from "@/components/buyers/ContainerPlanner";
import RfqScorePanel, { RfqWritingGuide } from "@/components/buyers/RfqScorePanel";

type Step = 1 | 2;
type InputMode = "text" | "planner";

const detailFieldClass =
  "w-full h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-accent/50";

function mapDelivery(incoterms: ParsedRfq["incoterms"]): Incoterm {
  if (incoterms) return incoterms;
  return "CIF";
}

function mapPayment(payment: ParsedRfq["payment"]): PaymentOption {
  if (payment === "T/T") return "T/T";
  if (payment === "LC at sight") return "LC at sight";
  return "Not sure";
}

function AiChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent-light">
      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      {label}
    </span>
  );
}

function ParsedAiChips({ parsed }: { parsed: ParsedRfq }) {
  return (
    <>
      {parsed.product && <AiChip label={parsed.product} />}
      {parsed.category && parsed.category !== "Construction materials" && (
        <AiChip label={parsed.category} />
      )}
      {parsed.quantity && <AiChip label={parsed.quantity} />}
      {parsed.productDetails.map((detail) => (
        <AiChip key={detail} label={detail} />
      ))}
      {parsed.specification &&
        !parsed.productDetails.some(
          (detail) => detail.toLowerCase() === parsed.specification!.toLowerCase(),
        ) && <AiChip label={parsed.specification} />}
      {parsed.loadingPort && (
        <AiChip label={`${parsed.loadingPort} (loading)`} />
      )}
      {parsed.buyerCity && <AiChip label={parsed.buyerCity} />}
      {parsed.buyerCountry && <AiChip label={`Buyer: ${parsed.buyerCountry}`} />}
      {!parsed.loadingPort && parsed.city && <AiChip label={parsed.city} />}
      {!parsed.buyerCountry && parsed.country && parsed.country !== "Türkiye" && (
        <AiChip label={parsed.country} />
      )}
      {!parsed.city &&
        !parsed.country &&
        !parsed.buyerCountry &&
        parsed.destination && <AiChip label={parsed.destination} />}
      {parsed.incoterms && <AiChip label={parsed.incoterms} />}
      {parsed.payment && <AiChip label={formatPaymentLabel(parsed.payment)} />}
    </>
  );
}

export default function RFQForm() {
  const [step, setStep] = useState<Step>(1);
  const [inputMode, setInputMode] = useState<InputMode>("text");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState("");
  const [parsed, setParsed] = useState<ParsedRfq | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [delivery, setDelivery] = useState<Incoterm>("CIF");
  const [payment, setPayment] = useState<PaymentOption>("T/T");
  const [country, setCountry] = useState<CountryOption>("Not sure");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") === "planner") {
      setInputMode("planner");
    }
  }, []);

  const runParse = useCallback((text: string) => {
    const result = parseRfq(text);
    setParsed(result.fieldCount > 0 ? result : null);
    if (result.buyerCountry) {
      setCountry(result.buyerCountry);
    } else if (result.country && result.country !== "Türkiye") {
      setCountry(result.country);
    } else if (result.destination && !result.needsBuyerDestination) {
      setCountry(matchCountryFromDestination(result.destination));
    }
    if (result.incoterms) setDelivery(mapDelivery(result.incoterms));
    if (result.payment) setPayment(mapPayment(result.payment));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => runParse(request), 400);
    return () => clearTimeout(timer);
  }, [request, runParse]);

  const canContinue =
    !parsed?.needsBuyerDestination &&
    (parsed?.product
      ? request.trim().length >= 5
      : parsed?.city || parsed?.country || parsed?.destination || parsed?.buyerCountry
        ? request.trim().length >= 5
        : request.trim().length >= 15);

  function handlePlannerContinue(summary: string) {
    setRequest(summary);
    runParse(summary);
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section id="request-quote" className="border-t border-border bg-surface py-24">
        <div className="mx-auto max-w-xl px-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-3xl">
            ✓
          </div>
          <h2 className="mt-6 text-2xl font-bold">You&apos;re all set!</h2>
          <p className="mt-3 text-muted leading-relaxed">
            We&apos;ll send your formal quote within <strong className="text-foreground">24 hours</strong>.
            Check your inbox for confirmation.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="request-quote" className="border-t border-border bg-surface py-24">
      <div className={`mx-auto px-6 ${step === 1 && inputMode === "planner" ? "max-w-3xl" : "max-w-2xl"}`}>
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Request a Quote
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            {step === 1 ? (
              <>
                What do you{" "}
                <span className="text-gradient">need?</span>
              </>
            ) : (
              <>
                Almost{" "}
                <span className="text-gradient">done.</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-muted">
            {step === 1
              ? inputMode === "planner"
                ? "List every product line — we'll build one consolidated request."
                : "Just describe it — no forms, no jargon."
              : "Where should we send your quote?"}
          </p>
        </div>

        {/* Progress */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className={`h-1.5 w-16 rounded-full ${step >= 1 ? "bg-accent" : "bg-border"}`} />
          <div className={`h-1.5 w-16 rounded-full ${step >= 2 ? "bg-accent" : "bg-border"}`} />
        </div>

        {step === 1 ? (
          <div className="mt-10 space-y-5">
            <div className="flex rounded-xl border border-border bg-background p-1">
              <button
                type="button"
                onClick={() => setInputMode("text")}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  inputMode === "text"
                    ? "bg-accent/15 text-accent-light"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Quick request
              </button>
              <button
                type="button"
                onClick={() => setInputMode("planner")}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  inputMode === "planner"
                    ? "bg-accent/15 text-accent-light"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Multi-product RFQ
              </button>
            </div>

            {inputMode === "planner" ? (
              <ContainerPlanner onContinue={handlePlannerContinue} />
            ) : (
              <>
            <RfqWritingGuide />

            <div className="relative">
              <textarea
                id="request"
                name="request"
                rows={5}
                autoFocus
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                placeholder="e.g. 500 tons Portland cement CEM I 42.5R bagged, CIF Tripoli, wire transfer"
                className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-base outline-none transition-colors focus:border-accent/50 resize-none leading-relaxed"
              />
            </div>

            <RfqScorePanel text={request} parsed={parsed} />

            <div>
              <p className="mb-2 text-xs text-muted">Try an example:</p>
              <div className="flex flex-wrap gap-2">
                {RFQ_EXAMPLES.map((ex, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRequest(ex)}
                    className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/40 hover:text-foreground text-left"
                  >
                    {ex.length > 55 ? `${ex.slice(0, 55)}…` : ex}
                  </button>
                ))}
              </div>
            </div>

            {parsed && parsed.fieldCount > 0 && (
              <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5">
                <p className="text-xs font-medium text-accent mb-3">
                  ✦ AI understood your request
                </p>
                <div className="flex flex-wrap gap-2">
                  <ParsedAiChips parsed={parsed} />
                </div>
              </div>
            )}

            <button
              type="button"
              disabled={!canContinue}
              onClick={() => setStep(2)}
              className="glow-amber w-full rounded-xl bg-accent py-4 text-base font-semibold text-background transition-all hover:bg-accent-light disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
            </button>

            {!canContinue && request.length > 0 && (
              <p className="text-center text-xs text-muted">
                {parsed?.needsBuyerDestination
                  ? "EXW/FOB with a Turkish port — add your country (e.g. buyer in Libya)"
                  : "Add product, quantity, or destination to continue"}
              </p>
            )}
              </>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            {/* Request summary */}
            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm text-muted line-clamp-2">{request}</p>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="shrink-0 text-xs text-accent hover:text-accent-light"
                >
                  Edit
                </button>
              </div>
              {parsed && parsed.fieldCount > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <ParsedAiChips parsed={parsed} />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Email <span className="text-accent">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoFocus
                placeholder="you@company.com"
                className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition-colors focus:border-accent/50"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Optional"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition-colors focus:border-accent/50"
                />
              </div>
              <div>
                <label htmlFor="company" className="mb-1.5 block text-sm font-medium">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Optional"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition-colors focus:border-accent/50"
                />
              </div>
            </div>

            {/* Collapsible details — only if user wants to refine */}
            <div>
              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
              >
                <svg
                  className={`h-4 w-4 transition-transform ${showDetails ? "rotate-90" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                {showDetails ? "Hide" : "Refine"} country, delivery & payment
                {!showDetails && (parsed?.incoterms || parsed?.destination) && (
                  <span className="text-xs text-accent">(AI pre-filled)</span>
                )}
              </button>

              {showDetails && (
                <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-3">
                  <div>
                    <label htmlFor="country" className="mb-1.5 block text-xs font-medium text-muted">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value as CountryOption)}
                      className={detailFieldClass}
                    >
                      {COUNTRY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="delivery" className="mb-1.5 block text-xs font-medium text-muted">
                      Delivery
                    </label>
                    <select
                      id="delivery"
                      name="delivery"
                      value={delivery}
                      onChange={(e) => setDelivery(e.target.value as Incoterm)}
                      className={detailFieldClass}
                    >
                      {DELIVERY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="payment" className="mb-1.5 block text-xs font-medium text-muted">
                      Payment
                    </label>
                    <select
                      id="payment"
                      name="payment"
                      value={payment}
                      onChange={(e) => setPayment(e.target.value as PaymentOption)}
                      className={detailFieldClass}
                    >
                      {PAYMENT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <p className="mt-2 text-xs text-muted leading-relaxed">
                      Recommended: secure T/T (SWIFT) bank transfer. Proforma invoice
                      issued before you wire — tracked, documented, and straightforward.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <input type="hidden" name="request" value={request} />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-xl border border-border px-6 py-4 text-sm font-medium transition-colors hover:border-accent/40"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="glow-amber flex-1 rounded-xl bg-accent py-4 text-base font-semibold text-background transition-all hover:bg-accent-light disabled:opacity-60"
              >
                {loading ? "Sending…" : "Get My Free Quote"}
              </button>
            </div>

            <p className="text-center text-xs text-muted">
              No commitment · Formal quote within 24 hours
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
