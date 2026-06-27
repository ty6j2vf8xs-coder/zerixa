export const BOQ_BUCKET = "boq-uploads";
export const BOQ_MAX_BYTES = 20 * 1024 * 1024;

export function sanitizeBoqFileName(name: string): string {
  const trimmed = name.trim();
  const base = (trimmed || "boq.pdf")
    .replace(/[/\\]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .slice(0, 120);
  return base.toLowerCase().endsWith(".pdf") ? base : `${base}.pdf`;
}

export function isValidBoqFileSize(bytes: number): boolean {
  return Number.isFinite(bytes) && bytes > 0 && bytes <= BOQ_MAX_BYTES;
}
