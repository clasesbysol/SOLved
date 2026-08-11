begin;

create table if not exists public.user_materials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  subject_id text not null,
  section text not null check (section in ('summary','glossary')),
  type text not null check (type in ('text','markdown','html','pdf')),
  title text,
  text_content text,
  file_path text,
  original_filename text,
  mime_type text,
  "order" integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.solved_admin_emails (
  email text primary key check (email = lower(trim(email))),
  created_at timestamptz not null default now()
);
insert into public.solved_admin_emails(email) values ('clasesbysol@gmail.com') on conflict do nothing;
revoke all on public.solved_admin_emails from anon, authenticated;

create table if not exists public.official_materials (
  id uuid primary key default gen_random_uuid(),
  subject_id text not null,
  section text not null check (section in ('summary','glossary')),
  type text not null check (type in ('text','markdown','html')),
  title text,
  text_content text not null,
  original_filename text,
  mime_type text,
  "order" integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index if not exists official_materials_subject_section_order on public.official_materials(subject_id,section,"order");
alter table public.official_materials enable row level security;
drop policy if exists "everyone reads official materials" on public.official_materials;
create policy "everyone reads official materials" on public.official_materials for select to anon, authenticated using (deleted_at is null or public.is_solved_admin());
drop policy if exists "admins insert official materials" on public.official_materials;
create policy "admins insert official materials" on public.official_materials for insert to authenticated with check (public.is_solved_admin());
drop policy if exists "admins update official materials" on public.official_materials;
create policy "admins update official materials" on public.official_materials for update to authenticated using (public.is_solved_admin()) with check (public.is_solved_admin());
drop policy if exists "admins delete official materials" on public.official_materials;
create policy "admins delete official materials" on public.official_materials for delete to authenticated using (public.is_solved_admin());
grant select on public.official_materials to anon, authenticated;
grant insert,update,delete on public.official_materials to authenticated;
drop trigger if exists official_materials_touch on public.official_materials;
create trigger official_materials_touch before update on public.official_materials for each row execute function public.touch_updated_at();

create index if not exists user_materials_owner_section_order
  on public.user_materials(user_id, subject_id, section, "order");
alter table public.user_materials enable row level security;
drop policy if exists "users read own materials" on public.user_materials;
create policy "users read own materials" on public.user_materials for select to authenticated using (auth.uid() = user_id);
drop policy if exists "users create own materials" on public.user_materials;
create policy "users create own materials" on public.user_materials for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "users update own materials" on public.user_materials;
create policy "users update own materials" on public.user_materials for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "users delete own materials" on public.user_materials;
create policy "users delete own materials" on public.user_materials for delete to authenticated using (auth.uid() = user_id);
grant select, insert, update, delete on public.user_materials to authenticated;
drop trigger if exists user_materials_touch on public.user_materials;
create trigger user_materials_touch before update on public.user_materials for each row execute function public.touch_updated_at();

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('user-materials','user-materials',false,52428800,array['application/pdf'])
on conflict (id) do update set public=false,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;
drop policy if exists "users read own material files" on storage.objects;
create policy "users read own material files" on storage.objects for select to authenticated using (bucket_id='user-materials' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists "users upload own material files" on storage.objects;
create policy "users upload own material files" on storage.objects for insert to authenticated with check (bucket_id='user-materials' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists "users update own material files" on storage.objects;
create policy "users update own material files" on storage.objects for update to authenticated using (bucket_id='user-materials' and (storage.foldername(name))[1]=auth.uid()::text) with check (bucket_id='user-materials' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists "users delete own material files" on storage.objects;
create policy "users delete own material files" on storage.objects for delete to authenticated using (bucket_id='user-materials' and (storage.foldername(name))[1]=auth.uid()::text);

do $$ begin
  alter publication supabase_realtime add table public.user_materials;
exception when duplicate_object then null;
end $$;
do $$ begin
  alter publication supabase_realtime add table public.official_materials;
exception when duplicate_object then null;
end $$;

create or replace function public.assign_solved_owner()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if exists(select 1 from public.solved_admin_emails where email=lower(trim(new.email))) then
    insert into public.solved_admins(user_id) values (new.id) on conflict do nothing;
  end if;
  return new;
end $$;

insert into public.solved_admins(user_id)
select u.id from auth.users u join public.solved_admin_emails e on e.email=lower(trim(u.email))
on conflict do nothing;

commit;
