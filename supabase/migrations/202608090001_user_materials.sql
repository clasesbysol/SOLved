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

commit;
