# Integrar Proteínas I de Química Biológica I en SOLved

Trabajá en el repositorio `clasesbysol/biblioteca-lbt`, sobre la rama existente:

`feature/qbi-proteinas-i-v1`

## Objetivo

Integrar el primer contenido real de **Química Biológica I** sin alterar Química Orgánica, Física I, Supabase, progreso, notas ni navegación general.

La materia ya existe con el identificador:

`quimica_biologica1`

La nueva unidad debe ser:

`proteinas-i`

### Ubicación en SOLved

1. En la pestaña **Resumen** de Química Biológica I debe abrirse `original.html` dentro del visor HTML de SOLved.
2. En la pestaña **Ejercicios** debe aparecer la **Guía 1 · Proteínas I** como tarjetas interactivas análogas a las de Química Orgánica.
3. No colocar estas tarjetas en la pestaña Tarjetas. Son ejercicios completos con resolución y deben quedar en **Ejercicios**.

## Archivos preparados

Copiar todos los archivos del paquete entregado por ChatGPT a:

`content/subjects/quimica_biologica1/units/proteinas-i/`

Archivos de contenido:

- `package.json`
- `summary.json`
- `glossary.json`
- `cards.json`
- `exercises.json`
- `map.json`
- `sources.json`
- `rich.json`
- `assets.json`
- `original.html`
- `qbi-exercises-v1.json`
- `qbi-exercises.js`

`original.html` ya fue reducido a las secciones **Organización** y **Teoría**. No volver a insertar dentro del resumen la guía de tarjetas, la biblioteca de imágenes ni la explicación técnica. El resumen conserva el diseño rosado, los temas en orden, los apartados plegables, los botones que llevan de la organización a la teoría, las páginas fuente plegables y las notas contextualizadas.

## Catálogo

Agregar al `content/catalog.json` la siguiente entrada, sin borrar las actuales:

```json
{
  "subjectId": "quimica_biologica1",
  "unitId": "proteinas-i",
  "title": "Proteínas I · Parcial 1",
  "contentVersion": "1.0.0",
  "status": "published",
  "path": "content/subjects/quimica_biologica1/units/proteinas-i/"
}
```

Se incluye `catalog.proposed.json` como referencia. No reemplazar a ciegas si el catálogo cambió: fusionar la entrada nueva con el estado actual.

## Integración en `js/content.js`

Aplicar estas modificaciones sobre el archivo actual, evitando reemplazar código más nuevo que pueda haber aparecido:

1. El iframe del resumen debe admitir scripts para `quimica_biologica1`, igual que Física I, porque el HTML usa navegación interna y MathJax.

La condición debe equivaler a:

```js
const allowScripts = subjectId === "fisica1" || subjectId === "quimica_biologica1";
const sandbox = allowScripts ? ' sandbox="allow-scripts"' : " sandbox";
```

2. Antes del render genérico, al abrir la pestaña `exercises` de `quimica_biologica1`, devolver:

```html
<div class="qbi-exercises-host" data-qbi-exercises>
  <div class="empty-state">Cargando Guía 1 de Proteínas I…</div>
</div>
```

3. En el binding del contenido, cargar dinámicamente:

`content/subjects/quimica_biologica1/units/proteinas-i/qbi-exercises.js?v=1.0.0`

Y ejecutar:

```js
module.bind(target)
```

4. Mantener intactos los bindings existentes:

- `window.LBT_ORGANIC_CARDS?.bind(container)`
- `window.LBT_ORGANIC_MAP?.bind(container)`
- menú de reacciones
- contenido genérico
- Supabase

Se incluye `content.proposed.js` solo como referencia funcional completa. Preferir un cambio mínimo sobre el archivo actual en vez de reemplazarlo si el repositorio avanzó.

## Comportamiento obligatorio de los ejercicios

El archivo `qbi-exercises.js` ya implementa:

- selector por bloques temáticos;
- 28 ejercicios de la primera guía;
- enunciado completo en el frente;
- resolución explicada en el dorso;
- giro únicamente mediante **Ver respuesta**, **Volver a la consigna** o teclado;
- la cara oculta no debe verse espejada;
- derecha = correcta;
- izquierda = incorrecta;
- abajo = revisar;
- botones equivalentes;
- anterior, siguiente, deshacer y finalizar;
- persistencia en `cardProgress` mediante `window.LBT_DB`;
- repetición de incorrectas y revisar;
- copia de la tarjeta actual;
- copia conjunta de incorrectas y revisar;
- enlace desde cada respuesta hacia la teoría relacionada;
- MathJax para ecuaciones.

No convertir las tarjetas en una lista estática.

## Service worker

Cambiar el nombre de caché para forzar actualización y precachear:

- `original.html`
- `qbi-exercises.js`
- `qbi-exercises-v1.json`

Se incluye `sw.proposed.js` como referencia. Fusionar los cambios con el `sw.js` actual.

## Pruebas mínimas

Agregar pruebas que verifiquen:

1. Química Biológica I muestra la unidad `Proteínas I · Parcial 1`.
2. Resumen abre `original.html` y permite cambiar entre Organización y Teoría.
3. Organización posee botones que llevan a los temas de teoría.
4. Ejercicios carga 28 tarjetas.
5. La tarjeta no gira sola al tocar el texto.
6. La respuesta no muestra el frente espejado.
7. El botón Ver respuesta gira la tarjeta.
8. Después de girar, derecha/izquierda/abajo clasifican como correcta/incorrecta/revisar.
9. El progreso permanece después de recargar.
10. Química Orgánica conserva sus tarjetas y mapa sin cambios.
11. Ejecutar `npm test`, `npm run build` y, si existe, `npm run check`.

## Criterio de finalización

Crear un commit en `feature/qbi-proteinas-i-v1` y abrir un pull request contra `main` con un resumen breve de:

- contenido incorporado;
- ubicación del resumen;
- ubicación de la Guía 1;
- pruebas ejecutadas;
- cualquier limitación encontrada.
