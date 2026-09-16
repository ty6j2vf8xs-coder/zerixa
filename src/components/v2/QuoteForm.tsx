"use client";

import { useMemo, useRef, useState } from "react";
import {
  parseRfq,
  DELIVERY_OPTIONS,
  matchCountryFromDestination,
  type Incoterm,
  type ParsedRfq,
} from "@/lib/parseRfq";
import { scoreRfq } from "@/lib/rfq-score";
import { BOQ_MAX_BYTES } from "@/lib/boq-storage";
import { COMPANY, whatsappHref, isPlaceholder } from "@/lib/v2-company";

const EXAMPLE =
  "1x40HQ mixed container: 1,800 m2 porcelain floor tiles 60x60 light grey, 200 sets WC + basin, 5 MT tile adhesive. CIF Tema, Ghana.";

const field =
  "w-full rounded-xl border border-border bg-background px-3.5 py-3 text-[15px] outline-none transition-colors placeholder:text-muted/60 focus:border-accent/60";

const label = "block text-sm font-medium text-foreground";
const hint = "mt-1 text-xs text-muted";

/**
 * Builds a human destination string out of whatever the parser found.
 * The parser only PREFILLS this field — the buyer's own typing always wins.
 */
function destinationFromParsed(parsed: ParsedRfq): string {
  const city = parsed.buyerCity ?? parsed.city;
  const rawCountry = parsed.buyerCountry ?? parsed.country;
  const country =
    rawCountry && rawCountry !== "Not sure" && rawCountry !== "Türkiye" ? rawCountry : null;

  if (city && country) return `${city}, ${country}`;
  if (city) return city;
  if (country) return country;
  return parsed.destination ?? "";
}

export default function QuoteForm() {
  const [request, setRequest] = useState("");
  const [destination, setDestination] = useState("");
  const [incoterm, setIncoterm] = useState<Incoterm>("CIF");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const [boqFile, setBoqFile] = useState<File | null>(null);
  const [boqError, setBoqError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // The buyer's edits are sticky: once they touch a field we stop prefilling it.
  const destinationTouched = useRef(false);
  const incotermTouched = useRef(false);

  const parsed = useMemo(
    () => (request.trim().length >= 8 ? parseRfq(request) : null),
    [request],
  );

  /**
   * The parser only PREFILLS destination and incoterm, and only until the
   * buyer touches those fields. Product and quantity are never "extracted"
   * into the contract — the buyer's own sentence is what we quote against.
   */
  function onRequestChange(value: string) {
    setRequest(value);
    if (value.trim().length < 8) return;
    const next = parseRfq(value);
    if (!destinationTouched.current) {
      const dest = destinationFromParsed(next);
      if (dest) setDestination(dest);
    }
    if (!incotermTouched.current && next.incoterms) setIncoterm(next.incoterms);
  }

  const hasRequest = request.trim().length >= 5 || boqFile !== null;
  const hasContact = whatsapp.trim().length >= 6 || email.trim().length > 3;
  const canSubmit = hasRequest && hasContact && !loading;

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    setBoqError("");
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setBoqError("Please upload a PDF. Export your BOQ from Excel as PDF.");
      setBoqFile(null);
      return;
    }
    if (file.size > BOQ_MAX_BYTES) {
      setBoqError("That file is over 20 MB. Send it on WhatsApp instead.");
      setBoqFile(null);
      return;
    }
    setBoqFile(file);
  }

  async function uploadBoq(file: File) {
    const res = await fetch("/api/leads/boq-upload-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name, fileSize: file.size }),
    });
    const data = (await res.json().catch(() => null)) as {
      error?: string;
      path?: string;
      signedUrl?: string;
      fileName?: string;
    } | null;

    if (!res.ok || !data?.path || !data.signedUrl) {
      throw new Error(data?.error ?? "Could not prepare the upload.");
    }

    const put = await fetch(data.signedUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/pdf" },
      body: file,
    });
    if (!put.ok) throw new Error("Upload failed. Try again, or send it on WhatsApp.");

    return { path: data.path, fileName: data.fileName ?? file.name };
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError("");

    try {
      let boqFilePath: string | null = null;
      let boqFileName: string | null = null;
      if (boqFile) {
        const uploaded = await uploadBoq(boqFile);
        boqFilePath = uploaded.path;
        boqFileName = uploaded.fileName;
      }

      const text = request.trim() || "See attached BOQ (PDF).";
      const fullRequest = destination.trim()
        ? `${text}\n\nDestination: ${destination.trim()} (${incoterm})`
        : text;

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim() || null,
          phone: whatsapp.trim() || null,
          name: name.trim() || null,
          company: company.trim() || null,
          request: fullRequest,
          country: matchCountryFromDestination(destination.trim() || null),
          delivery: incoterm,
          payment: null,
          parsed: parsed
            ? { ...parsed, destination_input: destination.trim() || null }
            : { destination_input: destination.trim() || null },
          rfqScore: scoreRfq(parsed, request).score,
          boqFilePath,
          boqFileName,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "Could not send your request. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Network error. Check your connection.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    const waReady = !isPlaceholder(COMPANY.whatsapp);
    return (
      <div className="rounded-2xl border border-accent/30 bg-surface p-6 sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-2xl text-accent">
          ✓
        </div>
        <h3 className="mt-4 text-xl font-bold">Got it — we&apos;re on it.</h3>
        <p className="mt-2 leading-relaxed text-muted">
          We&apos;ll come back with your price, the specifications and the
          certificates — usually within one working day.
        </p>
        {waReady && (
          <a
            href={whatsappHref(
              "Hello Zerixa — I just submitted a quote request on your site.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white"
          >
            Continue on WhatsApp →
          </a>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-surface p-5 sm:p-6"
      noValidate
    >
      <div>
        <label className={label} htmlFor="v2-request">
          What do you need?
        </label>
        <p className={hint}>
          Products, quantities, and the port. Write it however you normally would.
        </p>
        <textarea
          id="v2-request"
          value={request}
          onChange={(e) => onRequestChange(e.target.value)}
          rows={4}
          placeholder={EXAMPLE}
          className={`${field} mt-2 resize-y`}
        />
        <button
          type="button"
          onClick={() => onRequestChange(EXAMPLE)}
          className="mt-2 text-xs text-accent-light underline-offset-2 hover:underline"
        >
          Use an example
        </button>
      </div>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs uppercase tracking-wider text-muted">or / and</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div>
        <label className={label} htmlFor="v2-boq">
          Upload your BOQ
        </label>
        <p className={hint}>PDF, up to 20 MB. A bill of quantities gets the fastest quote.</p>
        <input
          ref={fileInput}
          id="v2-boq"
          type="file"
          accept="application/pdf,.pdf"
          onChange={onPickFile}
          className="mt-2 block w-full cursor-pointer rounded-xl border border-dashed border-border bg-background px-3.5 py-3 text-sm text-muted file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-surface-elevated file:px-3 file:py-2 file:text-sm file:font-medium file:text-foreground"
        />
        {boqFile && (
          <p className="mt-2 flex items-center gap-2 text-xs text-accent-light">
            <span>✓ {boqFile.name}</span>
            <button
              type="button"
              onClick={() => {
                setBoqFile(null);
                if (fileInput.current) fileInput.current.value = "";
              }}
              className="text-muted underline-offset-2 hover:underline"
            >
              remove
            </button>
          </p>
        )}
        {boqError && <p className="mt-2 text-xs text-red-400">{boqError}</p>}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto]">
        <div>
          <label className={label} htmlFor="v2-destination">
            Destination port or city
          </label>
          <input
            id="v2-destination"
            value={destination}
            onChange={(e) => {
              destinationTouched.current = true;
              setDestination(e.target.value);
            }}
            placeholder="Tema, Ghana"
            className={`${field} mt-2`}
          />
        </div>
        <div>
          <label className={label} htmlFor="v2-incoterm">
            Terms
          </label>
          <select
            id="v2-incoterm"
            value={incoterm}
            onChange={(e) => {
              incotermTouched.current = true;
              setIncoterm(e.target.value as Incoterm);
            }}
            className={`${field} mt-2 sm:w-32`}
          >
            {DELIVERY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <p className="text-sm font-medium">How should we reach you?</p>
        <p className={hint}>WhatsApp is fastest. Either one is enough.</p>

        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="sr-only" htmlFor="v2-whatsapp">
              WhatsApp number
            </label>
            <input
              id="v2-whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="WhatsApp — +233 …"
              className={field}
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="v2-email">
              Email
            </label>
            <input
              id="v2-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional)"
              className={field}
            />
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <input
            aria-label="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            className={field}
          />
          <input
            aria-label="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company (optional)"
            className={field}
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-6 w-full rounded-xl bg-accent px-5 py-3.5 text-base font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading ? "Sending…" : "Get my quote"}
      </button>

      <p className="mt-3 text-center text-xs text-muted">
        No commitment. We come back quickly with a price, lead time and full
        specifications.
      </p>
    </form>
  );
}
