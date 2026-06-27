import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type LeadRow = {
  id: string;
  created_at: string;
  email: string;
  name: string | null;
  company: string | null;
  request: string;
  country: string | null;
  delivery: string | null;
  payment: string | null;
  parsed: Record<string, unknown> | null;
  rfq_score: number | null;
  status: "new" | "contacted" | "quoted" | "closed";
  source: string;
  boq_file_path: string | null;
  boq_file_name: string | null;
};

export type LeadInsert = {
  email: string;
  name?: string | null;
  company?: string | null;
  request: string;
  country?: string | null;
  delivery?: string | null;
  payment?: string | null;
  parsed?: Record<string, unknown> | null;
  rfq_score?: number | null;
  source?: string;
  boq_file_path?: string | null;
  boq_file_name?: string | null;
};

let adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  if (!adminClient) {
    adminClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return adminClient;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}
