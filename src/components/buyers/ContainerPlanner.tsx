"use client";

import { useMemo, useState } from "react";
import {
  PLANNER_PRESETS,
  PLANNER_UNITS,
  buildRfqSummaryFromLines,
  getCategoryOptions,
  newLineItem,
  type PlannerLineItem,
} from "@/lib/container-planner";

type Props = {
  onContinue: (summary: string) => void;
};

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent/50";

export default function ContainerPlanner({ onContinue }: Props) {
  const categories = useMemo(() => getCategoryOptions(), []);
  const [lines, setLines] = useState<PlannerLineItem[]>([
    newLineItem({ product: "Portland cement CEM I 42.5R", quantity: 200, unit: "tons" }),
    newLineItem({ product: "Ceramic floor tiles", categorySlug: "flooring-materials", quantity: 800, unit: "m²" }),
  ]);
  const [destination, setDestination] = useState("");
  const [incoterm, setIncoterm] = useState("CIF");

  function updateLine(id: string, patch: Partial<PlannerLineItem>) {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }

  function removeLine(id: string) {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }

  function addLine() {
    setLines((prev) => [...prev, newLineItem()]);
  }

  function applyPreset(index: number) {
    const preset = PLANNER_PRESETS[index];
    setLines(preset.items.map((item) => newLineItem(item)));
  }

  function handleContinue() {
    const summary = buildRfqSummaryFromLines(lines, destination, incoterm);
    if (!summary) return;
    onContinue(summary);
  }

  const canContinue = lines.some((l) => l.product.trim() && l.quantity > 0);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-background p-5">
        <p className="text-sm text-muted leading-relaxed">
          List every product your project needs in one structured request. Zerixa reviews
          specs, packaging, and logistics — then sends a consolidated quote.
        </p>
      </div>

      <div>
        <p className="mb-2 text-xs text-muted">Quick presets:</p>
        <div className="flex flex-wrap gap-2">
          {PLANNER_PRESETS.map((preset, i) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => applyPreset(i)}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/40 hover:text-foreground"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {lines.map((line, index) => (
          <div
            key={line.id}
            className="grid gap-3 rounded-2xl border border-border bg-background p-4 sm:grid-cols-12"
          >
            <div className="sm:col-span-5">
              <label className="mb-1 block text-xs font-medium text-muted">
                Product {index + 1}
              </label>
              <input
                type="text"
                value={line.product}
                onChange={(e) => updateLine(line.id, { product: e.target.value })}
                placeholder="e.g. Steel rebar, ceramic tiles"
                className={fieldClass}
              />
            </div>
            <div className="sm:col-span-3">
              <label className="mb-1 block text-xs font-medium text-muted">Category</label>
              <select
                value={line.categorySlug}
                onChange={(e) => updateLine(line.id, { categorySlug: e.target.value })}
                className={fieldClass}
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-muted">Qty</label>
              <input
                type="number"
                min={0}
                step="any"
                value={line.quantity || ""}
                onChange={(e) =>
                  updateLine(line.id, { quantity: parseFloat(e.target.value) || 0 })
                }
                className={fieldClass}
              />
            </div>
            <div className="sm:col-span-2 flex gap-2">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-muted">Unit</label>
                <select
                  value={line.unit}
                  onChange={(e) =>
                    updateLine(line.id, { unit: e.target.value as PlannerLineItem["unit"] })
                  }
                  className={fieldClass}
                >
                  {PLANNER_UNITS.map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
              </div>
              {lines.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLine(line.id)}
                  className="mt-6 shrink-0 rounded-lg border border-border px-2 text-xs text-muted hover:border-red-500/40 hover:text-red-400"
                  aria-label="Remove line"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addLine}
        className="w-full rounded-xl border border-dashed border-border py-3 text-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground"
      >
        + Add product line
      </button>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-medium text-muted">
            Destination port or country (optional)
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g. Tripoli, Jeddah, Hamburg"
            className={fieldClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Incoterm</label>
          <select
            value={incoterm}
            onChange={(e) => setIncoterm(e.target.value)}
            className={fieldClass}
          >
            {["CIF", "CFR", "FOB", "DDP", "EXW"].map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="button"
        disabled={!canContinue}
        onClick={handleContinue}
        className="glow-amber w-full rounded-xl bg-accent py-4 text-base font-semibold text-background transition-all hover:bg-accent-light disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue with consolidated RFQ
      </button>
    </div>
  );
}
