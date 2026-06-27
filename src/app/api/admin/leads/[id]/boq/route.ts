import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { BOQ_BUCKET } from "@/lib/boq-storage";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  }

  const { id } = await params;
  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .select("boq_file_path, boq_file_name")
    .eq("id", id)
    .single();

  if (leadError || !lead?.boq_file_path) {
    return NextResponse.json({ error: "BOQ file not found." }, { status: 404 });
  }

  const { data, error } = await supabase.storage
    .from(BOQ_BUCKET)
    .createSignedUrl(lead.boq_file_path, 60 * 60);

  if (error || !data?.signedUrl) {
    console.error("BOQ signed download URL failed:", error?.message);
    return NextResponse.json({ error: "Could not generate download link." }, { status: 500 });
  }

  const response = NextResponse.redirect(data.signedUrl);
  if (lead.boq_file_name) {
    response.headers.set(
      "Content-Disposition",
      `inline; filename="${lead.boq_file_name.replace(/"/g, "")}"`,
    );
  }
  return response;
}
