begin;

create extension if not exists pgcrypto;

create table if not exists public.solved_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_solved_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.solved_admins where user_id = auth.uid()) $$;

create table if not exists public.official_content (
  id uuid primary key default gen_random_uuid(),
  subject_id text not null,
  unit_id text not null,
  title text not null,
  content_version text not null,
  package jsonb not null,
  status text not null default 'published' check (status in ('draft','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(subject_id, unit_id)
);

create table if not exists public.user_content (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  source_official_id uuid references public.official_content(id) on delete set null,
  subject_id text not null,
  unit_id text not null,
  title text not null,
  package jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, subject_id, unit_id)
);

create table if not exists public.content_preferences (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  official_content_id uuid not null references public.official_content(id) on delete cascade,
  hidden boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key(user_id, official_content_id)
);

create table if not exists public.user_records (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  store text not null check (store in ('kv','subjects','events','highlights','cardProgress','exerciseProgress','importedHtml','notes','studySessions','collections','bookmarks','activityLog')),
  record_key text not null,
  payload jsonb not null,
  updated_at timestamptz not null default now(),
  primary key(user_id, store, record_key)
);

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists official_content_touch on public.official_content;
create trigger official_content_touch before update on public.official_content for each row execute function public.touch_updated_at();
drop trigger if exists user_content_touch on public.user_content;
create trigger user_content_touch before update on public.user_content for each row execute function public.touch_updated_at();
drop trigger if exists content_preferences_touch on public.content_preferences;
create trigger content_preferences_touch before update on public.content_preferences for each row execute function public.touch_updated_at();

alter table public.solved_admins enable row level security;
alter table public.official_content enable row level security;
alter table public.user_content enable row level security;
alter table public.content_preferences enable row level security;
alter table public.user_records enable row level security;

drop policy if exists "admins can see themselves" on public.solved_admins;
create policy "admins can see themselves" on public.solved_admins for select to authenticated using (user_id = auth.uid());

drop policy if exists "published official content is public" on public.official_content;
create policy "published official content is public" on public.official_content for select to anon, authenticated using (status = 'published' or public.is_solved_admin());
drop policy if exists "admins insert official content" on public.official_content;
create policy "admins insert official content" on public.official_content for insert to authenticated with check (public.is_solved_admin());
drop policy if exists "admins update official content" on public.official_content;
create policy "admins update official content" on public.official_content for update to authenticated using (public.is_solved_admin()) with check (public.is_solved_admin());
drop policy if exists "admins delete official content" on public.official_content;
create policy "admins delete official content" on public.official_content for delete to authenticated using (public.is_solved_admin());

drop policy if exists "users read own content" on public.user_content;
create policy "users read own content" on public.user_content for select to authenticated using (user_id = auth.uid());
drop policy if exists "users create own content" on public.user_content;
create policy "users create own content" on public.user_content for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "users update own content" on public.user_content;
create policy "users update own content" on public.user_content for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "users delete own content" on public.user_content;
create policy "users delete own content" on public.user_content for delete to authenticated using (user_id = auth.uid());

drop policy if exists "users manage own preferences" on public.content_preferences;
create policy "users manage own preferences" on public.content_preferences for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "users read own records" on public.user_records;
create policy "users read own records" on public.user_records for select to authenticated using (user_id = auth.uid());
drop policy if exists "users insert own records" on public.user_records;
create policy "users insert own records" on public.user_records for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "users update own records" on public.user_records;
create policy "users update own records" on public.user_records for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "users delete own records" on public.user_records;
create policy "users delete own records" on public.user_records for delete to authenticated using (user_id = auth.uid());

revoke all on function public.is_solved_admin() from public;
grant execute on function public.is_solved_admin() to anon, authenticated;
grant select on public.official_content to anon, authenticated;
grant select on public.solved_admins to authenticated;
grant insert, update, delete on public.official_content to authenticated;
grant select, insert, update, delete on public.user_content, public.content_preferences, public.user_records to authenticated;

alter publication supabase_realtime add table public.official_content;
alter publication supabase_realtime add table public.user_content;
alter publication supabase_realtime add table public.content_preferences;
alter publication supabase_realtime add table public.user_records;

-- La propiedad se asigna por identidad verificada de Auth, nunca por datos enviados
-- por el frontend. Funciona tanto si la cuenta ya existe como si se registra después.
create or replace function public.assign_solved_owner()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if lower(new.email) = lower('clasesbysol@gmail.com') then
    insert into public.solved_admins(user_id) values (new.id) on conflict do nothing;
  end if;
  return new;
end $$;

drop trigger if exists assign_solved_owner_after_signup on auth.users;
create trigger assign_solved_owner_after_signup
after insert or update of email on auth.users
for each row execute function public.assign_solved_owner();

insert into public.solved_admins(user_id)
select id from auth.users where lower(email) = lower('clasesbysol@gmail.com')
on conflict do nothing;

commit;
