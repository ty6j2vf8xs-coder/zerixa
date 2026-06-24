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
  estimate: {
    fclCount: number;
    n40hc: number;
    n20dc: number;
    limitingFactor: "weight" | "volume";
    containersByWeight: number;
    containersByVolume: number;
    spec: ContainerSpec;
  };
};

export const MAX_CONTAINER_PAYLOAD_KG = 27_000;
export const TAIL_20DC_MAX_CBM = 32;

export const SPEC_20DC: ContainerSpec = {
  id: "20ft",
  label: "20′ DC",
  maxCbm: TAIL_20DC_MAX_CBM,
  maxPayloadKg: MAX_CONTAINER_PAYLOAD_KG,
};

export const SPEC_40HC: ContainerSpec = {
  id: "40hc",
  label: "40′ High Cube",
  maxCbm: 76,
  maxPayloadKg: MAX_CONTAINER_PAYLOAD_KG,
};

export const CONTAINER_SPECS: ContainerSpec[] = [
  SPEC_20DC,
  { id: "40ft", label: "40′ Standard", maxCbm: 58, maxPayloadKg: MAX_CONTAINER_PAYLOAD_KG },
  SPEC_40HC,
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

function qualifiesFor20Dc(cbm: number, weightKg: number): boolean {
  return cbm < TAIL_20DC_MAX_CBM && weightKg < MAX_CONTAINER_PAYLOAD_KG;
}

function needsFull40Hc(cbm: number, weightKg: number): boolean {
  return cbm >= TAIL_20DC_MAX_CBM || weightKg >= MAX_CONTAINER_PAYLOAD_KG;
}

function resolveContainerSpec(usedCbm: number, usedWeightKg: number): ContainerSpec {
  if (qualifiesFor20Dc(usedCbm, usedWeightKg)) return SPEC_20DC;
  return SPEC_40HC;
}

function sumCargo(items: EstimatedCargo[]) {
  return items.reduce(
    (acc, item) => ({
      cbm: acc.cbm + item.cbm,
      weightKg: acc.weightKg + item.weightKg,
    }),
    { cbm: 0, weightKg: 0 },
  );
}

function buildPlannedContainer(
  index: number,
  packed: EstimatedCargo[],
  spec: ContainerSpec,
): PlannedContainer {
  const usedCbm = round2(packed.reduce((sum, item) => sum + item.cbm, 0));
  const usedWeightKg = round0(packed.reduce((sum, item) => sum + item.weightKg, 0));
  return {
    index,
    type: spec,
    items: packed,
    usedCbm,
    usedWeightKg,
    cbmUtilization: round2((usedCbm / spec.maxCbm) * 100),
    weightUtilization: round2((usedWeightKg / spec.maxPayloadKg) * 100),
    mixWarnings: mixWarningsForItems(packed),
  };
}

export function estimateTieredFcl(
  totalCbm: number,
  totalWeightKg: number,
): ContainerPlanResult["estimate"] {
  let remCbm = totalCbm;
  let remWeight = totalWeightKg;
  let n40hc = 0;
  let n20dc = 0;

  while (needsFull40Hc(remCbm, remWeight)) {
    n40hc++;
    const weightShare = remWeight > 0 ? Math.min(1, SPEC_40HC.maxPayloadKg / remWeight) : 1;
    const cbmShare = remCbm > 0 ? Math.min(1, SPEC_40HC.maxCbm / remCbm) : 1;
    const share = Math.min(weightShare, cbmShare);
    if (share <= 0) break;
    remWeight = round0(remWeight - remWeight * share);
    remCbm = round2(remCbm - remCbm * share);
  }

  if (remCbm > 0.01 || remWeight > 0.5) {
    if (qualifiesFor20Dc(remCbm, remWeight)) {
      n20dc = 1;
    } else {
      n40hc += 1;
    }
  }

  const containersByWeight =
    totalWeightKg > 0 ? Math.ceil(totalWeightKg / MAX_CONTAINER_PAYLOAD_KG) : 0;
  const containersByVolume = totalCbm > 0 ? Math.ceil(totalCbm / SPEC_40HC.maxCbm) : 0;
  const limitingFactor =
    containersByWeight >= containersByVolume ? "weight" : "volume";
  const fclCount = Math.max(n40hc + n20dc, totalCbm > 0 || totalWeightKg > 0 ? 1 : 0);

  return {
    fclCount,
    n40hc,
    n20dc,
    limitingFactor,
    containersByWeight: containersByWeight || (totalWeightKg > 0 ? 1 : 0),
    containersByVolume: containersByVolume || (totalCbm > 0 ? 1 : 0),
    spec: SPEC_40HC,
  };
}

export function formatFclBreakdown(estimate: ContainerPlanResult["estimate"]): string {
  const parts: string[] = [];
  if (estimate.n40hc > 0) {
    parts.push(`${estimate.n40hc} × 40′ HC`);
  }
  if (estimate.n20dc > 0) {
    parts.push(`${estimate.n20dc} × 20′ DC`);
  }
  if (parts.length === 0) return getRoughFclLabel(0);
  return `~${parts.join(" + ")}`;
}

function splitIntoChunks(item: EstimatedCargo, spec: ContainerSpec): EstimatedCargo[] {
  if (item.cbm <= spec.maxCbm && item.weightKg <= spec.maxPayloadKg) {
    return [item];
  }

  const chunks: EstimatedCargo[] = [];
  let remQty = item.quantity;
  let remCbm = item.cbm;
  let remWeight = item.weightKg;

  while (remWeight > 0.5 && remCbm > 0.001) {
    const weightShare = spec.maxPayloadKg / remWeight;
    const cbmShare = spec.maxCbm / remCbm;
    const share = Math.min(weightShare, cbmShare, 1);

    const chunkQty = round2(remQty * share);
    const chunkCbm = round2(remCbm * share);
    const chunkWeight = round0(remWeight * share);

    if (chunkWeight <= 0 && chunkCbm <= 0) break;

    chunks.push({
      ...item,
      lineId: `${item.lineId}-${chunks.length}`,
      quantity: chunkQty,
      cbm: chunkCbm,
      weightKg: chunkWeight,
    });

    remQty = round2(remQty - chunkQty);
    remCbm = round2(remCbm - chunkCbm);
    remWeight = round0(remWeight - chunkWeight);
  }

  return chunks.length > 0 ? chunks : [item];
}

function emptyPlanResult(globalWarnings: string[]): ContainerPlanResult {
  return {
    containers: [],
    unassigned: [],
    globalWarnings,
    totals: { cbm: 0, weightKg: 0, lineCount: 0 },
    estimate: {
      fclCount: 0,
      n40hc: 0,
      n20dc: 0,
      limitingFactor: "volume",
      containersByWeight: 0,
      containersByVolume: 0,
      spec: SPEC_40HC,
    },
  };
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
    return emptyPlanResult(["Add at least one product line to plan containers."]);
  }

  const cargoItems = lines
    .filter((l) => l.product.trim() && l.quantity > 0)
    .map(estimateCargo);

  if (cargoItems.length === 0) {
    return emptyPlanResult(["Enter valid quantities for your product lines."]);
  }

  const totals = cargoItems.reduce(
    (acc, item) => ({
      cbm: acc.cbm + item.cbm,
      weightKg: acc.weightKg + item.weightKg,
      lineCount: acc.lineCount + 1,
    }),
    { cbm: 0, weightKg: 0, lineCount: 0 },
  );

  const estimate = estimateTieredFcl(totals.cbm, totals.weightKg);
  const packingSpec = SPEC_40HC;

  const bulkLines = cargoItems.filter((c) => c.handlingGroup === "bulk");
  if (bulkLines.some((b) => b.weightKg >= MAX_CONTAINER_PAYLOAD_KG)) {
    globalWarnings.push(
      "Large bulk cement or aggregate orders may require break-bulk or dedicated bulk vessels — container plan is indicative.",
    );
  }

  if (estimate.limitingFactor === "weight") {
    globalWarnings.push(
      `FCL count driven by weight (~${MAX_CONTAINER_PAYLOAD_KG.toLocaleString()} kg max per 40′ HC). Remaining cargo under ${TAIL_20DC_MAX_CBM} CBM and ${MAX_CONTAINER_PAYLOAD_KG.toLocaleString()} kg is estimated as 20′ DC.`,
    );
  } else if (estimate.n20dc > 0) {
    globalWarnings.push(
      `Tail cargo under ${TAIL_20DC_MAX_CBM} CBM and ${MAX_CONTAINER_PAYLOAD_KG.toLocaleString()} kg estimated as 20′ DC.`,
    );
  }

  const chunks = cargoItems
    .flatMap((item) => splitIntoChunks(item, packingSpec))
    .sort((a, b) => b.cbm - a.cbm || b.weightKg - a.weightKg);

  const containers: PlannedContainer[] = [];
  const unassigned: EstimatedCargo[] = [];
  const remaining = [...chunks];

  while (remaining.length > 0) {
    const remTotals = sumCargo(remaining);
    if (qualifiesFor20Dc(remTotals.cbm, remTotals.weightKg)) {
      containers.push(
        buildPlannedContainer(containers.length + 1, [...remaining], SPEC_20DC),
      );
      remaining.length = 0;
      continue;
    }

    const seed = remaining.shift()!;
    let usedCbm = seed.cbm;
    let usedWeightKg = seed.weightKg;
    const packed: EstimatedCargo[] = [seed];

    for (let i = remaining.length - 1; i >= 0; i--) {
      const candidate = remaining[i];
      const nextCbm = usedCbm + candidate.cbm;
      const nextWeight = usedWeightKg + candidate.weightKg;
      if (nextCbm <= packingSpec.maxCbm && nextWeight <= packingSpec.maxPayloadKg) {
        packed.push(candidate);
        usedCbm = nextCbm;
        usedWeightKg = nextWeight;
        remaining.splice(i, 1);
      }
    }

    const spec = resolveContainerSpec(usedCbm, usedWeightKg);
    containers.push(buildPlannedContainer(containers.length + 1, packed, spec));
  }

  const n40hc = containers.filter((c) => c.type.id === "40hc").length;
  const n20dc = containers.filter((c) => c.type.id === "20ft").length;
  const fclCount = containers.length;

  if (containers.length >= 2) {
    const last = containers[containers.length - 1];
    if (
      last.type.id !== "20ft" &&
      last.cbmUtilization < 45 &&
      last.weightUtilization < 45 &&
      containers.length > 1
    ) {
      globalWarnings.push(
        "Last 40′ HC is lightly loaded — Zerixa may consolidate with other project cargo to optimize freight.",
      );
    }
  }

  if (totals.weightKg > MAX_CONTAINER_PAYLOAD_KG * fclCount * 0.95) {
    globalWarnings.push("Total weight is high — verify axle and road limits at destination port.");
  }

  if (containers.length > 0) {
    globalWarnings.unshift(ROUGH_ESTIMATE_DISCLAIMER);
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
    estimate: {
      ...estimate,
      fclCount,
      n40hc,
      n20dc,
    },
  };
}

export const ROUGH_ESTIMATE_DISCLAIMER =
  "Rough estimate only (typically ±30–40%). Based on category averages — packaging, dimensions, and stowage will change the final FCL count.";

export function getRoughFclLabel(
  containerCount: number,
  limitingFactor?: "weight" | "volume",
): string {
  if (containerCount <= 0) return "FCL count TBD";
  const factor =
    limitingFactor === "weight"
      ? "weight-limited"
      : limitingFactor === "volume"
        ? "volume-limited"
        : null;
  if (containerCount === 1) {
    return factor ? `~1 FCL (${factor})` : "~1 FCL";
  }
  return factor
    ? `~${containerCount} FCL (${factor})`
    : `~${containerCount} FCL (indicative)`;
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

export function buildRfqSummaryFromLines(
  lines: PlannerLineItem[],
  destination?: string,
  incoterm?: string,
): string {
  const validLines = lines.filter((l) => l.product.trim() && l.quantity > 0);
  if (validLines.length === 0) return "";

  const dest = destination?.trim() ? `, ${incoterm ?? "CIF"} ${destination.trim()}` : "";
  const header = `Multi-product project RFQ — ${validLines.length} product line${validLines.length > 1 ? "s" : ""}${dest}:`;
  const lineText = validLines
    .map((l) => {
      const unit = l.unit === "tons" ? "MT" : l.unit === "pieces" ? "pcs" : l.unit;
      return `- ${l.product}: ${l.quantity} ${unit}`;
    })
    .join("\n");

  return `${header}\n\nProducts:\n${lineText}\n\nPayment: T/T bank transfer. Please provide consolidated quote.`;
}

export function buildRfqSummaryFromPlan(
  lines: PlannerLineItem[],
  plan: ContainerPlanResult,
  destination?: string,
  incoterm?: string,
): string {
  const dest = destination?.trim() ? `, ${incoterm ?? "CIF"} ${destination.trim()}` : "";
  const header = `Multi-product project RFQ — ${formatFclBreakdown(plan.estimate)} (${plan.estimate.limitingFactor}-limited), ${plan.totals.lineCount} product lines${dest}:`;
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
        `Illustrative group ${c.index} (${c.type.label}, ~${c.usedCbm} CBM): ${c.items.map((i) => `${i.product} ${formatQuantity(i)}`).join("; ")}`,
    )
    .join("\n");

  return `${header}\n\nProducts:\n${lineText}\n\nRough cargo estimate (not a loading plan):\n${containerText}\n\nNote: ${ROUGH_ESTIMATE_DISCLAIMER}\n\nPayment: T/T bank transfer. Please provide consolidated quote with confirmed FCL count.`;
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
