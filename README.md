# SOLved — versión 0.6.0

SOLved es tu espacio de estudio local-first. La versión 0.6.0 incorpora acceso invitado o Google autorizado, un dashboard simplificado y el resumen enriquecido importado de Química Orgánica. **Fabricar resumen** continúa generando prompts sin enviar ni procesar documentos.

El panel semanal distingue el tiempo de temporizadores terminados del estudio detectado mediante interacción reciente dentro de una materia. La detección se detiene al ocultar la pestaña o superar el umbral de inactividad y usa Web Locks para que dos pestañas de la misma instalación no contabilicen simultáneamente. Los tramos terminados se guardan como actividad sincronizable, sin ampliar el esquema de IndexedDB ni el schema 3 de Drive.

Aplicación local-first de estudio para la Licenciatura en Biotecnología.

## Cambios de esta versión

- Nueva nota flotante con guardado automático y marcadores compactos por materia, unidad y pestaña.
- Temporizador local, repaso aleatorio reproducible, favoritos y colecciones sincronizables.
- Búsqueda global tolerante, hoja de fórmulas, modo lectura y resumen semanal local-first.
- Las sesiones activas permanecen solo en el dispositivo; las finalizadas, colecciones, marcadores y actividad se incluyen en respaldo y Drive schema 3.

- Sincronización opcional local-first mediante Google Drive `appDataFolder`.
- IndexedDB sigue siendo la fuente inmediata y funciona sin conexión ni cuenta Google.
- Combinación determinista de progreso, eventos, resaltados y preferencias por campo.
- El resaltador persistente de la 0.4.4 se conserva, incluidas sus eliminaciones como tombstones.
- Ver [uso y privacidad de la sincronización](docs/GOOGLE-DRIVE-SYNC.md).
- Auditoría completa de las correlatividades contra las tres páginas del PDF provisto.
- Corrección de la lógica de disponibilidad:
  - una materia con estado **Sin estado** ya no se considera automáticamente incumplida;
  - se muestra como dato desconocido hasta que se cargue su estado;
  - solo los estados explícitamente incompatibles aparecen como faltantes.
- Los requisitos se siguen separando exactamente en:
  - cursadas aprobadas necesarias para cursar;
  - finales aprobados necesarios para cursar;
  - finales aprobados necesarios para rendir el final.
- La ventana de correlatividades indica la página fuente del plan.
- La sección “desbloquea” ahora explica si la materia interviene por cursada aprobada, final aprobado para cursar o final aprobado para rendir.
- Proyectos Biotecnológicos mantiene el requisito **TODAS** en la columna de cursadas aprobadas, tal como figura en el PDF.

## Por qué algunas correlatividades parecían incorrectas

La matriz de materias estaba transcripta según el PDF, pero la versión 0.4.1 trataba `Sin estado` como si fuera `Falta`. Eso podía mostrar una materia bloqueada aunque el dato académico simplemente no estuviera cargado. La 0.4.2 distingue **Cumplida**, **Falta** y **Sin estado**.

## Herramientas del resumen

- Resaltar selección y quitar resaltado.
- Crear notas desde el botón flotante, moverlas sobre el documento y minimizarlas como libros del color de la materia.
- Las posiciones usan proporción horizontal y coordenada vertical de documento; se conservan al desplazar, cambiar zoom, visor o tamaño.
- Modo lectura con preferencias globales o por materia, regla móvil y foco navegable por párrafos.
- Zoom único.
- Mostrar u ocultar documento original.
- Pantalla completa.
- Índice y navegación.
- Guardado automático en IndexedDB.

## Probar la PWA completa

1. Abrí una terminal dentro de la carpeta.
2. Ejecutá `pnpm install` y luego `pnpm start`.
3. Abrí `http://localhost:4173`.

La suite completa se ejecuta con `pnpm test` y el build con `pnpm build`. Playwright usa el mismo comando y puerto en Windows, Linux y CI.

## Fuente

La matriz de correlatividades fue transcripta del PDF proporcionado por la usuaria y se conserva en `js/data.js`. El archivo `tests/correlations.test.mjs` audita las 26 materias con correlativas explícitas y el requisito TODAS de Proyectos Biotecnológicos. Se ejecuta con `node tests/correlations.test.mjs`.
