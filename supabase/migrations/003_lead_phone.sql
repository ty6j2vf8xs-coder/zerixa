-- WhatsApp / phone as a first-class contact channel.
-- Run in Supabase SQL Editor (Dashboard → SQL → New query).
--
-- Safe to run before or after deploying: the /api/leads route falls back to
-- writing the number into `parsed` while this migration is still pending.

alter table public.leads
  add column if not exists phone text;

create index if not exists leads_phone_idx on public.leads (phone);
