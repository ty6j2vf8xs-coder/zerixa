"use client";

import type { ParsedRfq } from "@/lib/parseRfq";
import { scoreRfq, type RfqScoreTier } from "@/lib/rfq-score";

const TIER_STYLES: Record<RfqScoreTier, { bar: string; text: string }> = {
  draft: { bar: "bg-muted", text: "text-muted" },
  fair: { bar: "bg-yellow-500", text: "text-yellow-400" },
  good: { bar: "bg-accent", text: "text-accent-light" },
  strong: { bar: "bg-green-500", text: "text-green-400" },
};

type Props = {
  text: string;
  parsed: ParsedRfq | null;
};

/** Compact checklist under the request field — guides without clutter. */
export default function RfqScorePanel({ text, parsed }: Props) {
  const trimmed = text.trim();
  if (!trimmed) {
    return (
      <div className="flex flex-wrap gap-2">
        {["Product", "Quantity", "Destination", "Incoterm", "Payment"].map(
          (label) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs text-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-border" />
              {label}
            </span>
          ),
        )}
      </div>
    );
  }

  const result = scoreRfq(parsed, text);
  const styles = TIER_STYLES[result.tier];
  const metCount = result.criteria.filter((item) => item.met).length;
  const nextTip = result.criteria.find((item) => !item.met);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {result.criteria.map((item) => (
          <span
            key={item.id}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors ${
              item.met
                ? "border-accent/30 bg-accent/10 text-accent-light"
                : "border-border text-muted"
            }`}
            title={item.met ? item.label : item.tip}
          >
            <span aria-hidden>{item.met ? "✓" : "○"}</span>
            {item.label}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-border">
          <div
            className={`h-full rounded-full transition-all duration-500 ${styles.bar}`}
            style={{ width: `${result.score}%` }}
          />
        </div>
        <span className={`shrink-0 text-xs font-medium ${styles.text}`}>
          {metCount}/{result.criteria.length} · {result.tierLabel}
        </span>
      </div>

      {nextTip && (
        <p className="text-xs text-muted leading-relaxed">
          Tip: {nextTip.tip}
          <span className="text-foreground/70"> — e.g. {nextTip.example}</span>
        </p>
      )}
    </div>
  );
}
