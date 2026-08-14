# SOLved · Química Biológica · candidata 2.0.3

Estado: **candidata local, no publicada**.

## Alcance entregado

- Plantilla maestra nueva en `factory/templates/solved-summary-base.html`.
- Resumen de Química Biológica migrado exclusivamente desde esa plantilla.
- 101.424 bytes, 6.323 palabras de estudio, 13 capítulos y 76 bloques con identificadores estables.
- Cobertura: aminoácidos, carga, pKa, pI, enlace peptídico, niveles estructurales, proteínas globulares y de membrana, plegamiento, desnaturalización, purificación, cromatografías, medición de rendimiento, electroforesis, SDS-PAGE, IEF, 2D-PAGE, Western blot, espectrometría de masas, PCR e integración para ejercicios.
- Incluye ejemplos resueltos, errores frecuentes, seis tablas comparativas, ocho detalles desplegables, dos simuladores y mapa de elección de técnicas.

## Herramientas implementadas y verificadas localmente

- Buscador global: probado con `Anfinsen` (1 resultado), `intercambio iónico` (5) y `Western blot` (3).
- Índice lateral, navegación interna y regreso al inicio.
- Tema, color, zoom, pantalla completa, impresión y apertura/cierre de detalles están vinculados a acciones reales; no hay botones decorativos.
- Puente iframe–SOLved por `postMessage` para `highlight`, `remove-highlight`, `zoom`, `fullscreen`, `open-index`, `save-theme` y `save-color`.
- Color y zoom sincronizados con el estado de SOLved durante la prueba integrada.
- Diseño responsive definido para escritorio y celular.
- Corrección del error de sandbox que impedía iniciar las herramientas dentro del iframe.

## Aplicación

- Arranque local-first: los datos locales se cargan antes que Supabase y las actualizaciones remotas.
- Reconexión automática de Drive cuando existe una preferencia previa habilitada; conserva el modo de reconexión manual si Google requiere interacción.
- Medición `solved-local-startup` mediante Performance API y evento `solved-performance`.
- Versionado de contenido y caché actualizado para evitar servir el HTML anterior.

## Validación técnica

- Sintaxis JavaScript: aprobada.
- Pruebas estáticas y PWA: aprobadas.
- Build de distribución: aprobado.
- Pruebas de sincronización/merge, utilidades, correlatividades, tarjetas y mapa de Orgánica: aprobadas.
- La suite global conserva un fallo preexistente ajeno a QB: 39 entradas del glosario de Estadística no cumplen el esquema actual (`explanation`, `example`, `unit`, `related`). No se modificó contenido de otra materia.

## Verificaciones que requieren autorización externa

No se declaran aprobadas todavía:

- Recorrido manual final de tema, pantalla completa e impresión en la sesión de publicación.
- Comprobación visual final en un teléfono físico; el CSS responsive y los controles móviles sí fueron inspeccionados.
- Persistencia del resaltado después de recargar en una sesión autenticada.
- Sincronización real del resaltado con Google Drive.
- Reconexión automática usando una cuenta que ya haya otorgado `drive.appdata`.

La prueba disponible se realizó en modo invitado; por eso la candidata **no debe publicarse ni reemplazar la versión activa** hasta completar esas tres comprobaciones con la cuenta autorizada y recibir aprobación explícita.
