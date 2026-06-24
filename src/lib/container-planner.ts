import { PRODUCT_CATEGORIES } from "@/lib/product-catalog";

export type CargoUnit = "tons" | "m²" | "m³" | "pallets" | "pieces";

export type HandlingGroup = "bulk" | "pallet" | "crated" | "light";

export type PlannerLineItem = {
  id: string;
  product: string;
  categorySlug: string;
  quantity: number;
  unit: CargoUnit;
};

export type ContainerTypeId = "20ft" | "40ft" | "40hc";

export type ContainerSpec = {
  id: ContainerTypeId;
  label: string;
  maxCbm: number;
  maxPayloadKg: number;
};

export type EstimatedCargo = {
  lineId: string;
  product: string;
  categorySlug: string;
  quantity: number;
  unit: CargoUnit;
  cbm: number;
  weightKg: number;
  handlingGroup: HandlingGroup;
};

export type PackedItem = EstimatedCargo & {
  utilizationNote?: string;
};

export type PlannedContainer = {
  index: number;
  type: ContainerSpec;
  items: PackedItem[];
  usedCbm: number;
  usedWeightKg: number;
  cbmUtilization: number;
  weightUtilization: number;
  mixWarnings: string[];
};

export type ContainerPlanResult = {
  containers: PlannedContainer[];
  unassigned: EstimatedCargo[];
  globalWarnings: string[];
  totals: { cbm: number; weightKg: number; lineCount: number };
};

export const CONTAINER_SPECS: ContainerSpec[] = [
  { id: "20ft", label: "20′ Standard", maxCbm: 28, maxPayloadKg: 21_700 },
  { id: "40ft", label: "40′ Standard", maxCbm: 58, maxPayloadKg: 26_500 },
  { id: "40hc", label: "40′ High Cube", maxCbm: 76, maxPayloadKg: 26_500 },
];

const CATEGORY_CARGO_PROFILE: Record<
  string,
  { handlingGroup: HandlingGroup; cbmPerTon: number; kgPerTon: number; cbmPerM2: number; kgPerM2: number }
> = {
  "structural-civil-works": { handlingGroup: "bulk", cbmPerTon: 0.67, kgPerTon: 1000, cbmPerM2: 0.02, kgPerM2: 20 },
  "flooring-materials": { handlingGroup: "pallet", cbmPerTon: 0.5, kgPerTon: 1000, cbmPerM2: 0.045, kgPerM2: 18 },
  "wall-finishing-interior-cladding": { handlingGroup: "pallet", cbmPerTon: 0.5, kgPerTon: 1000, cbmPerM2: 0.04, kgPerM2: 16 },
  "bathroom-sanitaryware": { handlingGroup: "crated", cbmPerTon: 1.2, kgPerTon: 1000, cbmPerM2: 0.08, kgPerM2: 25 },
  "facade-exterior-cladding": { handlingGroup: "crated", cbmPerTon: 0.8, kgPerTon: 1000, cbmPerM2: 0.035, kgPerM2: 12 },
  "windows-glazing-curtain-wall": { handlingGroup: "crated", cbmPerTon: 1.5, kgPerTon: 1000, cbmPerM2: 0.06, kgPerM2: 15 },
  "prefabricated-modular": { handlingGroup: "crated", cbmPerTon: 1.8, kgPerTon: 1000, cbmPerM2: 0.05, kgPerM2: 20 },
};

const DEFAULT_PROFILE = {
  handlingGroup: "pallet" as HandlingGroup,
  cbmPerTon: 0.85,
  kgPerTon: 1000,
  cbmPerM2: 0.04,
  kgPerM2: 15,
};

const PALLET_CBM = 1.2;
const PALLET_KG = 750;
const PIECE_CBM = 0.08;
const PIECE_KG = 35;

export const PLANNER_UNITS: { value: CargoUnit; label: string }[] = [
  { value: "tons", label: "Tons (MT)" },
  { value: "m²", label: "m²" },
  { value: "m³", label: "m³" },
  { value: "pallets", label: "Pallets" },
  { value: "pieces", label: "Pieces" },
];

export const PLANNER_PRESETS: { label: string; items: Omit<PlannerLineItem, "id">[] }[] = [
  {
    label: "Cement + rebar project",
    items: [
      { product: "Portland cement CEM I 42.5R", categorySlug: "structural-civil-works", quantity: 500, unit: "tons" },
      { product: "Steel rebar", categorySlug: "structural-civil-works", quantity: 120, unit: "tons" },
    ],
  },
  {
    label: "Hotel fit-out mix",
    items: [
      { product: "Ceramic floor tiles", categorySlug: "flooring-materials", quantity: 2500, unit: "m²" },
      { product: "Sanitaryware", categorySlug: "bathroom-sanitaryware", quantity: 180, unit: "pieces" },
      { product: "Aluminum windows", categorySlug: "windows-glazing-curtain-wall", quantity: 40, unit: "pieces" },
    ],
  },
  {
    label: "Facade + insulation package",
    items: [
      { product: "ACP facade panels", categorySlug: "facade-exterior-cladding", quantity: 1800, unit: "m²" },
      { product: "EPS insulation boards", categorySlug: "thermal-acoustic-fire-insulation", quantity: 900, unit: "m²" },
    ],
  },
];

function getProfile(categorySlug: string) {
  return CATEGORY_CARGO_PROFILE[categorySlug] ?? DEFAULT_PROFILE;
}

export function estimateCargo(line: PlannerLineItem): EstimatedCargo {
  const profile = getProfile(line.categorySlug);
  let cbm = 0;
  let weightKg = 0;

  switch (line.unit) {
    case "tons":
      cbm = line.quantity * profile.cbmPerTon;
      weightKg = line.quantity * profile.kgPerTon;
      break;
    case "m²":
      cbm = line.quantity * profile.cbmPerM2;
      weightKg = line.quantity * profile.kgPerM2;
      break;
    case "m³":
      cbm = line.quantity;
      weightKg = line.quantity * (profile.kgPerTon / profile.cbmPerTon);
      break;
    case "pallets":
      cbm = line.quantity * PALLET_CBM;
      weightKg = line.quantity * PALLET_KG;
      break;
    case "pieces":
      cbm = line.quantity * PIECE_CBM;
      weightKg = line.quantity * PIECE_KG;
      break;
  }

  return {
    lineId: line.id,
    product: line.product,
    categorySlug: line.categorySlug,
    quantity: line.quantity,
    unit: line.unit,
    cbm: round2(cbm),
    weightKg: round0(weightKg),
    handlingGroup: profile.handlingGroup,
  };
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

function round0(n: number) {
  return Math.round(n);
}

function canMix(a: HandlingGroup, b: HandlingGroup): string | null {
  if (a === "bulk" && b !== "bulk") {
    return "Bulk cargo (cement/aggregates) should ship in a dedicated container when possible.";
  }
  if (b === "bulk" && a !== "bulk") {
    return "Bulk cargo (cement/aggregates) should ship in a dedicated container when possible.";
  }
  if ((a === "crated" && b === "bulk") || (b === "crated" && a === "bulk")) {
    return "Crated fragile cargo mixed with bulk — confirm loading plan with Zerixa.";
  }
  return null;
}

function fitsInContainer(
  cargo: EstimatedCargo,
  usedCbm: number,
  usedWeightKg: number,
  spec: ContainerSpec,
): boolean {
  return usedCbm + cargo.cbm <= spec.maxCbm && usedWeightKg + cargo.weightKg <= spec.maxPayloadKg;
}

function pickContainerType(totalCbm: number, totalWeightKg: number): ContainerSpec {
  if (totalCbm <= 28 && totalWeightKg <= 21_700) return CONTAINER_SPECS[0];
  if (totalCbm <= 58 && totalWeightKg <= 26_500) return CONTAINER_SPECS[1];
  return CONTAINER_SPECS[2];
}

function mixWarningsForItems(items: EstimatedCargo[]): string[] {
  const warnings = new Set<string>();
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const note = canMix(items[i].handlingGroup, items[j].handlingGroup);
      if (note) warnings.add(note);
    }
  }
  return [...warnings];
}

export function planContainers(lines: PlannerLineItem[]): ContainerPlanResult {
  const globalWarnings: string[] = [];
  if (lines.length === 0) {
    return {
      containers: [],
      unassigned: [],
      globalWarnings: ["Add at least one product line to plan containers."],
      totals: { cbm: 0, weightKg: 0, lineCount: 0 },
    };
  }

  const cargoItems = lines
    .filter((l) => l.product.trim() && l.quantity > 0)
    .map(estimateCargo)
    .sort((a, b) => b.cbm - a.cbm || b.weightKg - a.weightKg);

  if (cargoItems.length === 0) {
    return {
      containers: [],
      unassigned: [],
      globalWarnings: ["Enter valid quantities for your product lines."],
      totals: { cbm: 0, weightKg: 0, lineCount: 0 },
    };
  }

  const totals = cargoItems.reduce(
    (acc, item) => ({
      cbm: acc.cbm + item.cbm,
      weightKg: acc.weightKg + item.weightKg,
      lineCount: acc.lineCount + 1,
    }),
    { cbm: 0, weightKg: 0, lineCount: 0 },
  );

  const bulkLines = cargoItems.filter((c) => c.handlingGroup === "bulk");
  if (bulkLines.some((b) => b.weightKg >= 20_000)) {
    globalWarnings.push(
      "Large bulk cement or aggregate orders may require break-bulk or dedicated bulk vessels — container plan is indicative.",
    );
  }

  const containers: PlannedContainer[] = [];
  const unassigned: EstimatedCargo[] = [];
  const remaining = [...cargoItems];

  while (remaining.length > 0) {
    const seed = remaining.shift()!;
    const spec = pickContainerType(seed.cbm, seed.weightKg);
    let usedCbm = seed.cbm;
    let usedWeightKg = seed.weightKg;
    const packed: EstimatedCargo[] = [seed];

    for (let i = remaining.length - 1; i >= 0; i--) {
      const candidate = remaining[i];
      if (fitsInContainer(candidate, usedCbm, usedWeightKg, spec)) {
        packed.push(candidate);
        usedCbm += candidate.cbm;
        usedWeightKg += candidate.weightKg;
        remaining.splice(i, 1);
      }
    }

    if (remaining.length > 0) {
      const next = remaining[0];
      const singleSpec = pickContainerType(next.cbm, next.weightKg);
      if (!fitsInContainer(next, usedCbm, usedWeightKg, spec) && spec.id !== singleSpec.id) {
        // keep current container; next iteration opens new
      }
    }

    const mixWarnings = mixWarningsForItems(packed);
    containers.push({
      index: containers.length + 1,
      type: spec,
      items: packed,
      usedCbm: round2(usedCbm),
      usedWeightKg: round0(usedWeightKg),
      cbmUtilization: round2((usedCbm / spec.maxCbm) * 100),
      weightUtilization: round2((usedWeightKg / spec.maxPayloadKg) * 100),
      mixWarnings,
    });
  }

  // Second pass: try to merge underutilized containers
  if (containers.length >= 2) {
    const last = containers[containers.length - 1];
    if (last.cbmUtilization < 45 && last.weightUtilization < 45 && containers.length > 1) {
      globalWarnings.push(
        "Last container is lightly loaded — Zerixa may consolidate with other project cargo to optimize freight.",
      );
    }
  }

  if (totals.weightKg > CONTAINER_SPECS[2].maxPayloadKg * containers.length * 0.95) {
    globalWarnings.push("Total weight is high — verify axle and road limits at destination port.");
  }

  return {
    containers,
    unassigned,
    globalWarnings,
    totals: {
      cbm: round2(totals.cbm),
      weightKg: round0(totals.weightKg),
      lineCount: totals.lineCount,
    },
  };
}

export function formatQuantity(item: EstimatedCargo): string {
  const unitLabel =
    item.unit === "tons"
      ? "MT"
      : item.unit === "m²"
        ? "m²"
        : item.unit === "m³"
          ? "m³"
          : item.unit;
  return `${item.quantity} ${unitLabel}`;
}

export function buildRfqSummaryFromPlan(
  lines: PlannerLineItem[],
  plan: ContainerPlanResult,
  destination?: string,
  incoterm?: string,
): string {
  const dest = destination?.trim() ? `, ${incoterm ?? "CIF"} ${destination.trim()}` : "";
  const header = `Multi-product project RFQ — ${plan.containers.length} container(s), ${plan.totals.lineCount} product lines${dest}:`;
  const lineText = lines
    .filter((l) => l.product.trim() && l.quantity > 0)
    .map((l) => {
      const unit =
        l.unit === "tons" ? "MT" : l.unit === "pieces" ? "pcs" : l.unit;
      return `- ${l.product}: ${l.quantity} ${unit}`;
    })
    .join("\n");

  const containerText = plan.containers
    .map(
      (c) =>
        `Container ${c.index} (${c.type.label}): ${c.items.map((i) => `${i.product} ${formatQuantity(i)}`).join("; ")}`,
    )
    .join("\n");

  return `${header}\n\nProducts:\n${lineText}\n\nSuggested load plan:\n${containerText}\n\nPayment: T/T bank transfer. Please provide consolidated quote.`;
}

export function getCategoryOptions() {
  return PRODUCT_CATEGORIES.map((c) => ({
    slug: c.slug,
    label: c.shortTitle,
  }));
}

function newLineId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `line-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function newLineItem(partial?: Partial<PlannerLineItem>): PlannerLineItem {
  return {
    id: newLineId(),
    product: partial?.product ?? "",
    categorySlug: partial?.categorySlug ?? "structural-civil-works",
    quantity: partial?.quantity ?? 0,
    unit: partial?.unit ?? "tons",
  };
}
