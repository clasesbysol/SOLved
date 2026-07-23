# Biblioteca LBT — versión 0.4.2

Aplicación local-first de estudio para la Licenciatura en Biotecnología.

## Cambios de esta versión

- El resaltador de la 0.4.1 se conserva sin cambios.
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
- Zoom único.
- Mostrar u ocultar documento original.
- Pantalla completa.
- Índice y navegación.
- Guardado automático en IndexedDB.

## Probar rápido

Abrí el archivo autocontenido `biblioteca-lbt-v042-preview.html` incluido junto al ZIP.

## Probar la PWA completa

1. Abrí una terminal dentro de la carpeta.
2. Ejecutá `py -m http.server 8000`.
3. Abrí `http://localhost:8000`.

## Fuente

La matriz de correlatividades fue transcripta del PDF proporcionado por la usuaria y se conserva en `js/data.js`. El archivo `tests/correlations.test.mjs` audita las 26 materias con correlativas explícitas y el requisito TODAS de Proyectos Biotecnológicos. Se ejecuta con `node tests/correlations.test.mjs`.
