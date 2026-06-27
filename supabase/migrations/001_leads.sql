-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  name text,
  company text,
  request text not null,
  country text,
  delivery text,
  payment text,
  parsed jsonb,
  rfq_score integer,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'quoted', 'closed')),
  source text not null default 'website'
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_email_idx on public.leads (email);

alter table public.leads enable row level security;

-- No public policies: server uses SUPABASE_SERVICE_ROLE_KEY only.
