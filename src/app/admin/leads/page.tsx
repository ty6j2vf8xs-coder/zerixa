import { redirect } from "next/navigation";
import AdminLogoutButton from "@/app/admin/AdminLogoutButton";
import LeadsTable from "@/app/admin/leads/LeadsTable";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseAdmin, isSupabaseConfigured, type LeadRow } from "@/lib/supabase";

export default async function AdminLeadsPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  let leads: LeadRow[] = [];
  let configError: string | null = null;

  if (!isSupabaseConfigured()) {
    configError = "Supabase is not configured. Add environment variables in Vercel.";
  } else {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase!
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      configError = `Database error: ${error.message}`;
    } else {
      leads = (data ?? []) as LeadRow[];
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-accent">Zerixa Admin</p>
          <h1 className="mt-1 text-2xl font-bold">RFQ Leads</h1>
          <p className="mt-1 text-sm text-muted">{leads.length} lead(s)</p>
        </div>
        <AdminLogoutButton />
      </div>

      {configError ? (
        <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          {configError}
        </p>
      ) : (
        <LeadsTable leads={leads} />
      )}
    </div>
  );
}
