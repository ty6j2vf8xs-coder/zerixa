import { redirect } from "next/navigation";
import AdminLogoutButton from "@/app/admin/AdminLogoutButton";
import LeadsTable from "@/app/admin/leads/LeadsTable";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseAdmin, isSupabaseConfigured, type LeadRow } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  let leads: LeadRow[] = [];
  let configError: string | null = null;
  let supabaseHost: string | null = null;

  try {
    const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
    if (rawUrl) supabaseHost = new URL(rawUrl).host;
  } catch {
    supabaseHost = "invalid URL";
  }

  if (!isSupabaseConfigured()) {
    configError = "Supabase is not configured. Add environment variables in Vercel.";
  } else {
    try {
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase!
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);

      if (error) {
        const msg = error.message || "Unknown database error";
        if (/fetch failed|ECONNREFUSED|ENOTFOUND|network/i.test(msg)) {
          configError =
            "Cannot reach Supabase. The database host is unreachable — usually the project is paused or the URL is wrong.";
        } else {
          configError = `Database error: ${msg}`;
        }
      } else {
        leads = (data ?? []) as LeadRow[];
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      configError =
        /fetch failed|ECONNREFUSED|ENOTFOUND|network/i.test(msg)
          ? "Cannot reach Supabase. The database host is unreachable — usually the project is paused or the URL is wrong."
          : `Database error: ${msg}`;
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
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-300 space-y-3">
          <p className="font-medium text-red-200">{configError}</p>
          {supabaseHost && (
            <p className="text-xs text-red-300/80">
              Configured host: <span className="font-mono text-red-100">{supabaseHost}</span>
            </p>
          )}
          <ol className="list-decimal space-y-1.5 pl-5 text-red-300/90">
            <li>
              Open{" "}
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-red-100"
              >
                Supabase Dashboard
              </a>
            </li>
            <li>If the project shows Paused, click Restore / Resume and wait 1–2 minutes</li>
            <li>
              Confirm Vercel env vars match Project Settings → API (URL + service_role key)
            </li>
            <li>Refresh this page</li>
          </ol>
        </div>
      ) : (
        <LeadsTable leads={leads} />
      )}
    </div>
  );
}
