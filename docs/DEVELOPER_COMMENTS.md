# Comentarios de desarrollo de SOLved

Esta función existe para que la cuenta `owner` pueda dejar instrucciones directamente sobre el contenido mientras estudia y, más tarde, ChatGPT/Codex pueda resolverlas sin depender de capturas ni coordenadas de pantalla.

## Qué se guarda

Cada fila de `public.developer_comments` conserva:

- `subject_id`, `unit_id`, `tab_id`: ubicación lógica dentro de SOLved.
- `heading_path`: títulos/encabezados cercanos al bloque señalado.
- `selected_text`: texto seleccionado exactamente por el usuario, cuando existe.
- `focus_text`: frase alrededor del punto tocado cuando no hubo selección.
- `block_text`: texto del párrafo/bloque completo.
- `context_before` / `context_after`: contexto textual alrededor del punto.
- `selector` y `anchor`: ayudas DOM para volver a dibujar el pin, nunca como fuente principal de verdad.
- `repo_path_hint`: archivo o carpeta del repositorio donde probablemente vive el contenido.
- `instruction`: cambio pedido por el owner.
- `status`, `resolved_commit_sha`, `resolution_note`: ciclo de resolución.

No se guardan coordenadas de pantalla como referencia de trabajo.

## Flujo recomendado para ChatGPT/Codex

Cuando el usuario diga algo como “revisá todos mis comentarios pendientes”, consultar primero:

```sql
select
  id,
  instruction,
  subject_id,
  unit_id,
  tab_id,
  heading_path,
  selected_text,
  focus_text,
  block_text,
  context_before,
  context_after,
  repo_path_hint,
  document_path,
  anchor,
  created_at
from public.developer_comments
where status = 'pending'
order by created_at asc;
```

Para localizar el código fuente, usar en este orden:

1. `repo_path_hint`, si apunta a un archivo concreto.
2. Buscar `selected_text` exacto en GitHub.
3. Si no existe selección, buscar una frase distintiva de `focus_text`.
4. Usar `heading_path`, `block_text`, `context_before` y `context_after` para desambiguar.
5. `selector`/`anchor` sirven como respaldo para entender la ubicación en el DOM, no como coordenadas visuales.

Después de resolver y verificar el cambio, actualizar la fila:

```sql
update public.developer_comments
set
  status = 'resolved',
  resolved_at = now(),
  resolved_commit_sha = '<sha del commit>',
  resolution_note = '<resumen corto de lo corregido>'
where id = '<id del comentario>';
```

## Seguridad

El botón sólo se muestra al perfil `owner`. La seguridad real está en Supabase: RLS exige `public.is_solved_admin()` para seleccionar, insertar, actualizar o borrar comentarios. `anon` no tiene permisos sobre la tabla.
