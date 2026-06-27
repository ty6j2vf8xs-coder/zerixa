-- BOQ PDF attachments (Supabase Storage + leads metadata)

alter table public.leads
  add column if not exists boq_file_path text,
  add column if not exists boq_file_name text;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'boq-uploads',
  'boq-uploads',
  false,
  20971520,
  array['application/pdf']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
