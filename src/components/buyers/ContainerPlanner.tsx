"use client";

import { useMemo, useState } from "react";
import {
  PLANNER_PRESETS,
  PLANNER_UNITS,
  ROUGH_ESTIMATE_DISCLAIMER,
  MAX_CONTAINER_PAYLOAD_KG,
  TAIL_20DC_MAX_CBM,
  buildRfqSummaryFromPlan,
  formatFclBreakdown,
  getCategoryOptions,
  newLineItem,
  planContainers,
  type ContainerPlanResult,
  type PlannerLineItem,
} from "@/lib/container-planner";

type Props = {
  onContinue: (summary: string) => void;
};

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent/50";

function UtilBar({ label, value }: { label: string; value: number }) {
  const color =
    value > 90 ? "bg-red-500" : value > 75 ? "bg-amber-500" : "bg-accent";
  return (
    <div>
      <div className="flex justify-between text-xs text-muted">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-border">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  );
}

function PlanResults({ plan }: { plan: ContainerPlanResult }) {
  if (plan.containers.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5">
        <p className="text-sm font-semibold text-accent-light">Rough cargo estimate</p>
        <p className="mt-1 text-sm text-muted">
          {formatFclBreakdown(plan.estimate)} · ~{plan.totals.cbm} CBM · ~
          {plan.totals.weightKg.toLocaleString()} kg total
        </p>
        <p className="mt-2 text-xs text-muted">
          By volume (40′ HC): ~{plan.estimate.containersByVolume} · By weight (
          {MAX_CONTAINER_PAYLOAD_KG.toLocaleString()} kg max): ~{plan.estimate.containersByWeight}
          {plan.estimate.n20dc > 0 &&
            ` · Tail under ${TAIL_20DC_MAX_CBM} CBM → ${plan.estimate.n20dc} × 20′ DC`}
        </p>
        <p className="mt-3 text-xs text-muted leading-relaxed">{ROUGH_ESTIMATE_DISCLAIMER}</p>
      </div>

      {plan.globalWarnings
        .filter((warning) => warning !== ROUGH_ESTIMATE_DISCLAIMER)
        .map((warning) => (
        <p key={warning} className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-200/90">
          {warning}
        </p>
      ))}

      <p className="text-xs font-medium text-muted">
        Illustrative groupings below — not a confirmed loading plan:
      </p>

      <div className="grid gap-4">
        {plan.containers.map((container) => (
          <div
            key={container.index}
            className="rounded-2xl border border-border bg-background p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-accent">
                  Illustrative group {container.index}
                </p>
                <h3 className="mt-1 font-semibold">{container.type.label}</h3>
              </div>
              <p className="text-xs text-muted">
                ~{container.usedCbm} / {container.type.maxCbm} CBM · ~
                {container.usedWeightKg.toLocaleString()} / {container.type.maxPayloadKg.toLocaleString()} kg
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <UtilBar label="Approx. volume fill" value={container.cbmUtilization} />
              <UtilBar label="Approx. weight fill" value={container.weightUtilization} />
            </div>

            <ul className="mt-4 space-y-2">
              {container.items.map((item) => (
                <li
                  key={item.lineId}
                  className="flex items-start justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2 text-sm"
                >
                  <span>{item.product}</span>
                  <span className="shrink-0 text-muted">
                    {item.quantity} {item.unit === "tons" ? "MT" : item.unit}
                  </span>
                </li>
              ))}
            </ul>

            {container.mixWarnings.length > 0 && (
              <ul className="mt-3 space-y-1">
                {container.mixWarnings.map((w) => (
                  <li key={w} className="text-xs text-amber-200/80">
                    ⚠ {w}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-muted leading-relaxed">
        Zerixa confirms the final FCL count, stowage, and freight options after reviewing
        your product specs and packaging.
      </p>
    </div>
  );
}

export default function ContainerPlanner({ onContinue }: Props) {
  const categories = useMemo(() => getCategoryOptions(), []);
  const [lines, setLines] = useState<PlannerLineItem[]>([
    newLineItem({ product: "Portland cement CEM I 42.5R", quantity: 200, unit: "tons" }),
    newLineItem({ product: "Ceramic floor tiles", categorySlug: "flooring-materials", quantity: 800, unit: "m²" }),
  ]);
  const [destination, setDestination] = useState("");
  const [incoterm, setIncoterm] = useState("CIF");
  const [plan, setPlan] = useState<ContainerPlanResult | null>(null);

  function updateLine(id: string, patch: Partial<PlannerLineItem>) {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    setPlan(null);
  }

  function removeLine(id: string) {
    setLines((prev) => prev.filter((l) => l.id !== id));
    setPlan(null);
  }

  function addLine() {
    setLines((prev) => [...prev, newLineItem()]);
    setPlan(null);
  }

  function applyPreset(index: number) {
    const preset = PLANNER_PRESETS[index];
    setLines(preset.items.map((item) => newLineItem(item)));
    setPlan(null);
  }

  function handlePlan() {
    setPlan(planContainers(lines));
  }

  function handleContinue() {
    const activePlan = plan ?? planContainers(lines);
    if (activePlan.estimate.fclCount === 0) return;
    const summary = buildRfqSummaryFromPlan(lines, activePlan, destination, incoterm);
    onContinue(summary);
  }

  const canPlan = lines.some((l) => l.product.trim() && l.quantity > 0);
  const activePlan = plan ?? (canPlan ? null : null);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-background p-5">
        <p className="text-sm text-muted leading-relaxed">
          List every product your project needs. We&apos;ll estimate rough cargo volume and
          weight, then turn it into one consolidated RFQ — Zerixa confirms the actual FCL
          count after reviewing specs and packaging.
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
        disabled={!canPlan}
        onClick={handlePlan}
        className="w-full rounded-xl border border-accent/40 bg-accent/10 py-3.5 text-sm font-semibold text-accent-light transition-colors hover:bg-accent/20 disabled:opacity-40"
      >
        Estimate cargo volume
      </button>

      {activePlan && <PlanResults plan={activePlan} />}

      <button
        type="button"
        disabled={!canPlan}
        onClick={handleContinue}
        className="glow-amber w-full rounded-xl bg-accent py-4 text-base font-semibold text-background transition-all hover:bg-accent-light disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue with consolidated RFQ
      </button>
    </div>
  );
}
