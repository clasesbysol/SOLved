begin;

-- Permite sincronizar los HTML privados dentro de user_records. El contenido
-- queda en payload y continúa protegido por las políticas auth.uid() existentes.
alter table public.user_records drop constraint if exists user_records_store_check;
alter table public.user_records add constraint user_records_store_check check (
  store in ('kv','subjects','events','highlights','cardProgress','exerciseProgress',
            'importedHtml','notes','studySessions','collections','bookmarks','activityLog')
);

create index if not exists user_records_imported_html_by_user
  on public.user_records(user_id, updated_at desc)
  where store = 'importedHtml';

commit;
