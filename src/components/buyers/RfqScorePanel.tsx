"use client";

import type { ParsedRfq } from "@/lib/parseRfq";
import {
  RFQ_WRITING_GUIDE,
  scoreRfq,
  type RfqScoreTier,
} from "@/lib/rfq-score";

const TIER_STYLES: Record<
  RfqScoreTier,
  { bar: string; text: string; ring: string }
> = {
  draft: {
    bar: "bg-muted",
    text: "text-muted",
    ring: "stroke-muted",
  },
  fair: {
    bar: "bg-yellow-500",
    text: "text-yellow-400",
    ring: "stroke-yellow-500",
  },
  good: {
    bar: "bg-accent",
    text: "text-accent-light",
    ring: "stroke-accent",
  },
  strong: {
    bar: "bg-green-500",
    text: "text-green-400",
    ring: "stroke-green-500",
  },
};

function ScoreRing({ score, tier }: { score: number; tier: RfqScoreTier }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative h-12 w-12 shrink-0">
      <svg className="h-12 w-12 -rotate-90" viewBox="0 0 44 44" aria-hidden>
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-border"
        />
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${TIER_STYLES[tier].ring} transition-all duration-500`}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
        {score}
      </span>
    </div>
  );
}

type Props = {
  text: string;
  parsed: ParsedRfq | null;
};

export function RfqWritingGuide() {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <p className="text-xs font-medium text-muted">
        For a fast, accurate quote, include:
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {RFQ_WRITING_GUIDE.map((item, index) => (
          <span
            key={item}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted"
          >
            <span className="font-mono text-[10px] text-accent">{index + 1}</span>
            {item}
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted leading-relaxed">
        One sentence is enough — e.g.{" "}
        <span className="text-foreground/80">
          &ldquo;500 tons cement CEM I 42.5R, CIF Tripoli, wire transfer&rdquo;
        </span>
        {" "}or for FOB/EXW:{" "}
        <span className="text-foreground/80">
          &ldquo;FOB Mersin, buyer in Libya&rdquo;
        </span>
      </p>
    </div>
  );
}

export default function RfqScorePanel({ text, parsed }: Props) {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const result = scoreRfq(parsed, text);
  const styles = TIER_STYLES[result.tier];
  const metCount = result.criteria.filter((item) => item.met).length;

  return (
    <div className="rounded-2xl border border-border bg-background p-5 space-y-3">
      <div className="flex items-start gap-4">
        <ScoreRing score={result.score} tier={result.tier} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold">RFQ Score</p>
            <span
              className={`rounded-full border border-border px-2 py-0.5 text-[11px] font-medium ${styles.text}`}
            >
              {result.tierLabel}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted leading-relaxed">{result.tierMessage}</p>
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between text-[11px] text-muted">
          <span>
            {metCount} of {result.criteria.length} essentials detected
          </span>
          <span>{result.score}/100</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-border">
          <div
            className={`h-full rounded-full transition-all duration-500 ${styles.bar}`}
            style={{ width: `${result.score}%` }}
          />
        </div>
      </div>

      <ul className="grid gap-2 sm:grid-cols-2">
        {result.criteria.map((item) => (
          <li
            key={item.id}
            className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-xs ${
              item.met
                ? "border-accent/25 bg-accent/5 text-foreground"
                : "border-border text-muted"
            }`}
          >
            <span className={item.met ? "text-accent-light" : "text-muted"}>
              {item.met ? "✓" : "○"}
            </span>
            <span>
              <span className="font-medium">{item.label}</span>
              {!item.met && (
                <span className="mt-0.5 block text-[11px] leading-relaxed opacity-80">
                  {item.tip}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {result.missingTips.length > 0 && (
        <div className="rounded-xl border border-dashed border-border bg-surface px-4 py-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
            To improve your score
          </p>
          <ul className="mt-2 space-y-1.5">
            {result.missingTips.slice(0, 2).map((tip) => (
              <li key={tip} className="text-xs text-muted leading-relaxed">
                → {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
