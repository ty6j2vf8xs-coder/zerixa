import { NextResponse } from "next/server";
import { getSupabaseAdmin, type LeadInsert } from "@/lib/supabase";

type LeadPayload = {
  email?: string | null;
  /** WhatsApp / phone. Optional — but one of email or phone is required. */
  phone?: string | null;
  name?: string | null;
  company?: string | null;
  request?: string;
  country?: string | null;
  delivery?: string | null;
  payment?: string | null;
  parsed?: Record<string, unknown> | null;
  rfqScore?: number | null;
  boqFilePath?: string | null;
  boqFileName?: string | null;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizePhone(value: string): string {
  const digits = value.replace(/[^\d]/g, "");
  return digits.length >= 7 && digits.length <= 15 ? digits : "";
}

/**
 * `leads.email` is NOT NULL in migration 001. When a buyer leaves only a
 * WhatsApp number we store a non-deliverable stand-in on the reserved
 * .invalid TLD, so the real contact is never ambiguous and nobody can
 * accidentally email a fabricated address. The real number lives in
 * `phone` (migration 003) and in `parsed.contact_phone`.
 */
function placeholderEmailForPhone(digits: string): string {
  return `wa-${digits}@whatsapp.invalid`;
}

export async function POST(request: Request) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Lead storage is not configured yet." },
      { status: 503 },
    );
  }

  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const rawEmail = body.email?.trim().toLowerCase() ?? "";
  const rawPhone = body.phone?.trim() ?? "";
  const phone = rawPhone ? normalizePhone(rawPhone) : "";
  const requestText = body.request?.trim() ?? "";

  if (rawEmail && !isValidEmail(rawEmail)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }
  if (rawPhone && !phone) {
    return NextResponse.json(
      { error: "That phone number doesn't look right." },
      { status: 400 },
    );
  }
  if (!rawEmail && !phone) {
    return NextResponse.json(
      { error: "Give us a WhatsApp number or an email so we can send the quote." },
      { status: 400 },
    );
  }
  if (requestText.length < 5 && !body.boqFilePath) {
    return NextResponse.json({ error: "Request text is too short." }, { status: 400 });
  }

  const parsed: Record<string, unknown> = {
    ...(body.parsed ?? {}),
    ...(phone ? { contact_phone: rawPhone, contact_phone_digits: phone } : {}),
    contact_channel: rawEmail ? (phone ? "both" : "email") : "whatsapp",
  };

  const row: LeadInsert = {
    email: rawEmail || placeholderEmailForPhone(phone),
    name: body.name?.trim() || null,
    company: body.company?.trim() || null,
    request: requestText || "See attached BOQ (PDF).",
    country: body.country?.trim() || null,
    delivery: body.delivery?.trim() || null,
    payment: body.payment?.trim() || null,
    parsed,
    rfq_score: typeof body.rfqScore === "number" ? body.rfqScore : null,
    source: "website",
    boq_file_path: body.boqFilePath?.trim() || null,
    boq_file_name: body.boqFileName?.trim() || null,
  };

  // Write the dedicated phone column when it exists (migration 003). If it
  // hasn't been applied yet, retry without it — the number is already
  // preserved inside `parsed`, so a lead is never lost to a pending migration.
  let insert = await supabase
    .from("leads")
    .insert(phone ? { ...row, phone: rawPhone } : row)
    .select("id")
    .single();

  if (insert.error && phone && /phone/i.test(insert.error.message)) {
    insert = await supabase.from("leads").insert(row).select("id").single();
  }

  if (insert.error || !insert.data) {
    console.error("Lead insert failed:", insert.error?.message);
    return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: insert.data.id }, { status: 201 });
}
