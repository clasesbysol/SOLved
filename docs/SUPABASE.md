# Supabase en SOLved

## Configuración

1. En Supabase, aplicá en orden `supabase/migrations/202608030001_solved.sql` y `supabase/migrations/202608050001_imported_html.sql` desde SQL Editor (o con Supabase CLI).
2. Registrá `clasesbysol@gmail.com` desde SOLved y confirmá el email. La migración le asigna automáticamente el rol propietario usando la identidad verificada de Supabase Auth.
3. La Project URL y la **Publishable Key** ya están configuradas en `js/supabase-config.js`.
4. En Authentication > URL Configuration agregá:
   - Site URL: `https://clasesbysol.github.io/biblioteca-lbt/`
   - Redirect URL: `https://clasesbysol.github.io/biblioteca-lbt/`

No se utiliza ni debe agregarse una `secret`, `anon service key` privilegiada o `service_role` al frontend.

## Modelo y comportamiento

- `official_content`: lectura pública de publicaciones; sólo `solved_admins` puede crear, editar o borrar.
- `user_content`: copias y contenido privado, aislado por `auth.uid()`.
- `content_preferences`: ocultamiento de contenido oficial por usuario.
- `user_records`: progreso, notas, agenda, estados, favoritos y actividad privados.
- Los HTML importados se guardan en el store `importedHtml` de IndexedDB y en `user_records` para cuentas autenticadas. Cada registro conserva propietario, materia, título, nombre original, HTML, fechas y orden; RLS impide leer o modificar registros de otra cuenta.
- IndexedDB sigue siendo la escritura inmediata y el modo sin conexión. El primer acceso autenticado conserva la migración histórica y luego combina datos locales/remotos por `updatedAt`.
- Los cambios remotos llegan por Supabase Realtime. Una falla de red no borra ni bloquea los datos locales.

Desde código, `LBT_CONTENT.setOfficialHidden(id, true|false)` oculta/restaura una publicación para la cuenta actual y `LBT_CONTENT.duplicateOfficial(id)` crea una copia privada editable.

## Publicar contenido oficial

Una cuenta administradora puede insertar o actualizar un paquete validado:

```js
await SOLVED_AUTH.client.from("official_content").upsert({
  subject_id: "fisica1",
  unit_id: "resumen-integral",
  title: "Resumen integral",
  content_version: "2026.08.1",
  status: "published",
  package: paqueteCompleto
}, { onConflict: "subject_id,unit_id" });
```

Aunque alguien altere el JavaScript o falsifique el rol visual, RLS rechaza la escritura si su UUID no está en `solved_admins`.
