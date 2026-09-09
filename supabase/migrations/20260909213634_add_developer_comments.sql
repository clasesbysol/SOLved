create table if not exists public.developer_comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','resolved','dismissed')),
  subject_id text,
  unit_id text,
  tab_id text,
  surface text not null default 'app',
  document_title text,
  document_path text,
  repo_path_hint text,
  heading_path text[] not null default '{}'::text[],
  selected_text text,
  focus_text text,
  block_text text,
  context_before text,
  context_after text,
  selector text,
  anchor jsonb not null default '{}'::jsonb,
  instruction text not null check (length(trim(instruction)) > 0),
  app_version text,
  content_version text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  resolved_at timestamptz,
  resolved_commit_sha text,
  resolution_note text
);

create index if not exists developer_comments_status_idx on public.developer_comments(status, created_at desc);
create index if not exists developer_comments_subject_idx on public.developer_comments(subject_id, unit_id, status);
create index if not exists developer_comments_user_idx on public.developer_comments(user_id, status);

drop trigger if exists developer_comments_touch on public.developer_comments;
create trigger developer_comments_touch before update on public.developer_comments for each row execute function public.touch_updated_at();

alter table public.developer_comments enable row level security;

revoke all on table public.developer_comments from anon, authenticated;
grant select, insert, update, delete on table public.developer_comments to authenticated;

drop policy if exists "admins read developer comments" on public.developer_comments;
create policy "admins read developer comments" on public.developer_comments for select to authenticated using (public.is_solved_admin());

drop policy if exists "admins create developer comments" on public.developer_comments;
create policy "admins create developer comments" on public.developer_comments for insert to authenticated with check (public.is_solved_admin() and user_id = auth.uid());

drop policy if exists "admins update developer comments" on public.developer_comments;
create policy "admins update developer comments" on public.developer_comments for update to authenticated using (public.is_solved_admin()) with check (public.is_solved_admin());

drop policy if exists "admins delete developer comments" on public.developer_comments;
create policy "admins delete developer comments" on public.developer_comments for delete to authenticated using (public.is_solved_admin());
