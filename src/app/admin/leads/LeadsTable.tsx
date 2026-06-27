"use client";

import { useState } from "react";
import type { LeadRow } from "@/lib/supabase";

const STATUS_OPTIONS: LeadRow["status"][] = ["new", "contacted", "quoted", "closed"];

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

function parsedSummary(parsed: Record<string, unknown> | null): string[] {
  if (!parsed) return [];
  const chips: string[] = [];
  const pick = (key: string) => {
    const value = parsed[key];
    if (typeof value === "string" && value.trim()) chips.push(value);
  };
  pick("product");
  pick("quantity");
  pick("buyerCountry");
  pick("country");
  pick("city");
  pick("incoterms");
  pick("payment");
  return chips;
}

function LeadStatusSelect({ lead }: { lead: LeadRow }) {
  const [status, setStatus] = useState(lead.status);
  const [saving, setSaving] = useState(false);

  async function handleChange(next: LeadRow["status"]) {
    setSaving(true);
    setStatus(next);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) setStatus(lead.status);
    } catch {
      setStatus(lead.status);
    } finally {
      setSaving(false);
    }
  }

  return (
    <select
      value={status}
      disabled={saving}
      onChange={(e) => handleChange(e.target.value as LeadRow["status"])}
      className="rounded-lg border border-border bg-background px-2 py-1 text-xs outline-none focus:border-accent/50"
    >
      {STATUS_OPTIONS.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default function LeadsTable({ leads }: { leads: LeadRow[] }) {
  if (leads.length === 0) {
    return (
      <p className="rounded-2xl border border-border bg-surface p-8 text-center text-muted">
        No leads yet. They will appear here when buyers submit the RFQ form.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {leads.map((lead) => {
        const chips = parsedSummary(lead.parsed);
        return (
          <article
            key={lead.id}
            className="rounded-2xl border border-border bg-surface p-5 space-y-3"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{lead.email}</p>
                <p className="text-sm text-muted">
                  {[lead.name, lead.company].filter(Boolean).join(" · ") || "—"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {lead.rfq_score != null && (
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs text-accent-light">
                    Score {lead.rfq_score}
                  </span>
                )}
                <LeadStatusSelect lead={lead} />
              </div>
            </div>

            <p className="text-xs text-muted">{formatDate(lead.created_at)}</p>

            <p className="text-sm leading-relaxed whitespace-pre-wrap">{lead.request}</p>

            {lead.boq_file_path && (
              <a
                href={`/api/admin/leads/${lead.id}/boq`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-xs font-medium text-accent-light transition-colors hover:border-accent/50"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                {lead.boq_file_name ?? "Download BOQ (PDF)"}
              </a>
            )}

            {chips.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-4 text-xs text-muted">
              {lead.country && <span>Country: {lead.country}</span>}
              {lead.delivery && <span>Incoterm: {lead.delivery}</span>}
              {lead.payment && <span>Payment: {lead.payment}</span>}
            </div>
          </article>
        );
      })}
    </div>
  );
}
