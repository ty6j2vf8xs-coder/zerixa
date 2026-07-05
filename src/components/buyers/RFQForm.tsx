"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
import RfqScorePanel from "@/components/buyers/RfqScorePanel";
import { scoreRfq } from "@/lib/rfq-score";
import { BOQ_MAX_BYTES } from "@/lib/boq-storage";

type Step = 1 | 2;
type InputMode = "text" | "planner";

const fieldClass =
  "w-full h-11 rounded-xl border border-border bg-background px-3.5 text-sm outline-none transition-colors focus:border-accent/50";

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
    <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs text-accent-light">
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
      {parsed.loadingPort && <AiChip label={`${parsed.loadingPort} (loading)`} />}
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

function StepIndicator({ step }: { step: Step }) {
  const steps = [
    { n: 1 as const, label: "Your request" },
    { n: 2 as const, label: "Contact details" },
  ];

  return (
    <ol className="mt-8 flex items-center justify-center gap-2 sm:gap-4">
      {steps.map((item, index) => {
        const active = step === item.n;
        const done = step > item.n;
        return (
          <li key={item.n} className="flex items-center gap-2 sm:gap-4">
            {index > 0 && (
              <div
                className={`hidden h-px w-8 sm:block ${done || active ? "bg-accent/50" : "bg-border"}`}
                aria-hidden
              />
            )}
            <div className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                  done
                    ? "bg-accent text-background"
                    : active
                      ? "bg-accent/20 text-accent-light ring-1 ring-accent/40"
                      : "bg-background text-muted ring-1 ring-border"
                }`}
              >
                {done ? "✓" : item.n}
              </span>
              <span
                className={`text-sm ${active ? "font-medium text-foreground" : "text-muted"}`}
              >
                {item.label}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function BoqUploadField({
  boqFile,
  boqError,
  onSelect,
}: {
  boqFile: File | null;
  boqError: string;
  onSelect: (file: File | null) => void;
}) {
  return (
    <div>
      {boqFile ? (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{boqFile.name}</p>
            <p className="text-xs text-muted">
              {(boqFile.size / (1024 * 1024)).toFixed(1)} MB · PDF attached
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="shrink-0 text-xs text-muted hover:text-foreground"
          >
            Remove
          </button>
        </div>
      ) : (
        <>
          <input
            id="boq"
            name="boq"
            type="file"
            accept="application/pdf,.pdf"
            className="sr-only"
            onChange={(e) => onSelect(e.target.files?.[0] ?? null)}
          />
          <label
            htmlFor="boq"
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border px-4 py-3 transition-colors hover:border-accent/40"
          >
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </span>
            <span className="min-w-0 text-left">
              <span className="block text-sm font-medium">Upload BOQ (PDF)</span>
              <span className="block text-xs text-muted">Optional · max 20 MB</span>
            </span>
          </label>
        </>
      )}
      {boqError && <p className="mt-2 text-xs text-red-400">{boqError}</p>}
    </div>
  );
}

export default function RFQForm() {
  const [step, setStep] = useState<Step>(1);
  const [inputMode, setInputMode] = useState<InputMode>("text");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [request, setRequest] = useState("");
  const [parsed, setParsed] = useState<ParsedRfq | null>(null);
  const [delivery, setDelivery] = useState<Incoterm>("CIF");
  const [payment, setPayment] = useState<PaymentOption>("T/T");
  const [country, setCountry] = useState<CountryOption>("Not sure");
  const [boqFile, setBoqFile] = useState<File | null>(null);
  const [boqError, setBoqError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") === "planner") {
      setInputMode("planner");
    }
  }, []);

  useEffect(() => {
    if (step !== 2) return;
    emailRef.current?.focus({ preventScroll: true });
  }, [step]);

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
    (boqFile != null ||
      (parsed?.product
        ? request.trim().length >= 5
        : parsed?.city || parsed?.country || parsed?.destination || parsed?.buyerCountry
          ? request.trim().length >= 5
          : request.trim().length >= 15));

  function handlePlannerContinue(summary: string) {
    setRequest(summary);
    runParse(summary);
    setStep(2);
  }

  function handleBoqSelect(file: File | null) {
    setBoqError("");
    if (!file) {
      setBoqFile(null);
      return;
    }
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setBoqError("Only PDF files are accepted.");
      setBoqFile(null);
      return;
    }
    if (file.size > BOQ_MAX_BYTES) {
      setBoqError("PDF must be 20 MB or smaller.");
      setBoqFile(null);
      return;
    }
    setBoqFile(file);
  }

  async function uploadBoqPdf(file: File): Promise<{ path: string; fileName: string }> {
    const urlRes = await fetch("/api/leads/boq-upload-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name, fileSize: file.size }),
    });
    const urlData = (await urlRes.json().catch(() => null)) as {
      error?: string;
      path?: string;
      signedUrl?: string;
      fileName?: string;
    } | null;

    if (!urlRes.ok || !urlData?.path || !urlData.signedUrl) {
      throw new Error(urlData?.error ?? "Could not prepare PDF upload.");
    }

    const uploadRes = await fetch(urlData.signedUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/pdf" },
      body: file,
    });

    if (!uploadRes.ok) {
      throw new Error("PDF upload failed. Please try again.");
    }

    return { path: urlData.path, fileName: urlData.fileName ?? file.name };
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSubmitError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const score = scoreRfq(parsed, request);

    try {
      let boqFilePath: string | null = null;
      let boqFileName: string | null = null;

      if (boqFile) {
        const uploaded = await uploadBoqPdf(boqFile);
        boqFilePath = uploaded.path;
        boqFileName = uploaded.fileName;
      }

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          name: formData.get("name"),
          company: formData.get("company"),
          request: request.trim() || (boqFile ? "See attached BOQ (PDF)." : ""),
          country,
          delivery,
          payment,
          parsed,
          rfqScore: score.score,
          boqFilePath,
          boqFileName,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setSubmitError(data?.error ?? "Could not send your request. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
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
            We&apos;ll send your formal quote within{" "}
            <strong className="text-foreground">24 hours</strong>. Check your inbox for
            confirmation.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="request-quote" className="border-t border-border bg-surface py-24">
      <div
        className={`mx-auto px-6 ${step === 1 && inputMode === "planner" ? "max-w-3xl" : "max-w-2xl"}`}
      >
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Request a Quote
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            {step === 1 ? (
              <>
                What do you <span className="text-gradient">need?</span>
              </>
            ) : (
              <>
                Where should we send <span className="text-gradient">your quote?</span>
              </>
            )}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            {step === 1
              ? inputMode === "planner"
                ? "Add each product line — we’ll consolidate into one quote."
                : "One sentence is enough. Include product, quantity, and destination for a faster quote."
              : "Confirm contact and trade preferences. Takes under a minute."}
          </p>
        </div>

        <StepIndicator step={step} />

        {step === 1 ? (
          inputMode === "planner" ? (
            <div className="mt-10 space-y-5">
              <button
                type="button"
                onClick={() => setInputMode("text")}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                ← Back to quick request
              </button>
              <BoqUploadField
                boqFile={boqFile}
                boqError={boqError}
                onSelect={handleBoqSelect}
              />
              <ContainerPlanner onContinue={handlePlannerContinue} />
            </div>
          ) : (
            <div className="mt-10 space-y-6">
              {/* Primary: describe request */}
              <div className="rounded-2xl border border-border bg-background p-5 sm:p-6">
                <label htmlFor="request" className="block text-sm font-medium">
                  Describe your request
                </label>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  e.g. Porcelain tiles 1400 m², CIF Hamburg, T/T payment
                </p>

                <textarea
                  id="request"
                  name="request"
                  rows={4}
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  placeholder="What material, how much, and where should it ship?"
                  className="mt-4 w-full resize-none rounded-xl border border-border bg-surface px-4 py-3.5 text-base leading-relaxed outline-none transition-colors focus:border-accent/50"
                />

                <div className="mt-4">
                  <RfqScorePanel text={request} parsed={parsed} />
                </div>

                {parsed && parsed.fieldCount > 0 && (
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="mb-2 text-xs font-medium text-accent">
                      ✦ We understood
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <ParsedAiChips parsed={parsed} />
                    </div>
                  </div>
                )}
              </div>

              {/* Examples */}
              <div>
                <p className="mb-2 text-xs font-medium text-muted">Or start from an example</p>
                <div className="flex flex-wrap gap-2">
                  {RFQ_EXAMPLES.slice(0, 3).map((ex, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRequest(ex)}
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-left text-xs text-muted transition-colors hover:border-accent/40 hover:text-foreground"
                    >
                      {ex.length > 48 ? `${ex.slice(0, 48)}…` : ex}
                    </button>
                  ))}
                </div>
              </div>

              {/* Secondary paths */}
              <div className="grid gap-3 sm:grid-cols-2">
                <BoqUploadField
                  boqFile={boqFile}
                  boqError={boqError}
                  onSelect={handleBoqSelect}
                />
                <button
                  type="button"
                  onClick={() => setInputMode("planner")}
                  className="flex items-center gap-3 rounded-xl border border-dashed border-border px-4 py-3 text-left transition-colors hover:border-accent/40"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                      />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-sm font-medium">Multi-product list</span>
                    <span className="block text-xs text-muted">Several items in one RFQ</span>
                  </span>
                </button>
              </div>

              <button
                type="button"
                disabled={!canContinue}
                onClick={() => setStep(2)}
                className="glow-amber w-full rounded-xl bg-accent py-4 text-base font-semibold text-background transition-all hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue to contact details
              </button>

              {!canContinue && (request.length > 0 || boqFile) && (
                <p className="text-center text-xs text-muted">
                  {parsed?.needsBuyerDestination
                    ? "EXW/FOB with a Turkish port — add your country (e.g. buyer in Libya)"
                    : !boqFile
                      ? "Add product and quantity, or attach a BOQ PDF"
                      : null}
                </p>
              )}
            </div>
          )
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {/* Request summary */}
            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted">Your request</p>
                  <p className="mt-1 text-sm leading-relaxed line-clamp-3">
                    {request.trim() || (boqFile ? "BOQ attached — see PDF." : "")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="shrink-0 text-xs font-medium text-accent hover:text-accent-light"
                >
                  Edit
                </button>
              </div>
              {boqFile && (
                <p className="mt-2 text-xs text-accent-light">Attached: {boqFile.name}</p>
              )}
              {parsed && parsed.fieldCount > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <ParsedAiChips parsed={parsed} />
                </div>
              )}
            </div>

            {/* Contact */}
            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold">Contact</legend>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                  Work email <span className="text-accent">*</span>
                </label>
                <input
                  ref={emailRef}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={fieldClass}
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
                    autoComplete="name"
                    placeholder="Optional"
                    className={fieldClass}
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
                    autoComplete="organization"
                    placeholder="Optional"
                    className={fieldClass}
                  />
                </div>
              </div>
            </fieldset>

            {/* Trade preferences — always visible */}
            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold">Trade preferences</legend>
              <p className="text-xs text-muted -mt-2">
                Pre-filled from your request when possible — adjust if needed.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="country" className="mb-1.5 block text-xs font-medium text-muted">
                    Your country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value as CountryOption)}
                    className={fieldClass}
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
                    Delivery terms
                  </label>
                  <select
                    id="delivery"
                    name="delivery"
                    value={delivery}
                    onChange={(e) => setDelivery(e.target.value as Incoterm)}
                    className={fieldClass}
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
                    className={fieldClass}
                  >
                    {PAYMENT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Recommended: T/T (SWIFT) bank transfer. We issue a proforma invoice before you
                wire.
              </p>
            </fieldset>

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
                {loading
                  ? boqFile
                    ? "Uploading PDF…"
                    : "Sending…"
                  : "Get my free quote"}
              </button>
            </div>

            {submitError && (
              <p className="text-center text-sm text-red-400">{submitError}</p>
            )}

            <p className="text-center text-xs text-muted">
              No commitment · Formal quote within 24 hours
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
