import { NextResponse } from "next/server";
import { getSupabaseAdmin, type LeadInsert } from "@/lib/supabase";

type LeadPayload = {
  email?: string;
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

  const email = body.email?.trim().toLowerCase() ?? "";
  const requestText = body.request?.trim() ?? "";

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (requestText.length < 5) {
    return NextResponse.json({ error: "Request text is too short." }, { status: 400 });
  }

  const row: LeadInsert = {
    email,
    name: body.name?.trim() || null,
    company: body.company?.trim() || null,
    request: requestText,
    country: body.country?.trim() || null,
    delivery: body.delivery?.trim() || null,
    payment: body.payment?.trim() || null,
    parsed: body.parsed ?? null,
    rfq_score: typeof body.rfqScore === "number" ? body.rfqScore : null,
    source: "website",
    boq_file_path: body.boqFilePath?.trim() || null,
    boq_file_name: body.boqFileName?.trim() || null,
  };

  const { data, error } = await supabase.from("leads").insert(row).select("id").single();

  if (error) {
    console.error("Lead insert failed:", error.message);
    return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data.id }, { status: 201 });
}
