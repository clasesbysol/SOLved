drop policy if exists "admins create developer comments" on public.developer_comments;
create policy "admins create developer comments"
on public.developer_comments
for insert
to authenticated
with check (public.is_solved_admin() and user_id = (select auth.uid()));
