# Auditoría de Química Orgánica

Fuente canónica: `clasesbysol/organicabysoll`, commit `a3d9b95216e4516ef235c1bbd97307cba6e97064`. Destino inicial: SOLved, commit `0800d89`. El inventario completo y ordenado está en `organica-auditoria.json`.

## Correspondencia estructural

| Elemento | HTML fuente | Importación estructurada | Estado |
| --- | ---: | ---: | --- |
| Secciones `details` | 419 | 419 | Orden y títulos coinciden (419/419) |
| Títulos `h1`–`h4` | 520 | 520 | Orden y texto coinciden (520/520) |
| Imágenes/figuras | 260 | 260 | Referencias de asset válidas (260/260) |
| Tablas | 13 | 13 | Conteo coincidente |
| Assets únicos | — | 249 | 249 archivos presentes |
| Enlaces | 328 | No representados como enlaces en `rich.json` | Reconstruir navegación nativa |
| Botones internos | 7 | No representados | Sustituir por controles de SOLved |

La coincidencia de títulos se comprobó por texto normalizado y posición, no por tamaño de archivos. Las 260 figuras se enlazan a 249 archivos porque algunas imágenes se reutilizan. El inventario incluye títulos, secciones, rutas, texto alternativo, enlaces y existencia de archivos.

## Estado anterior en SOLved

- `summary.json` contiene un solo bloque genérico. `glossary.json`, `exercises.json` y `map.json` están vacíos.
- `rich.json` conserva 537 párrafos, 166 listas, 419 secciones, 520 títulos, 260 figuras y 13 tablas, pero `js/content.js` prioriza `original.html` dentro de `.rich-document`.
- `organic-cards-v2.json` y `organic-mind-map.json` contienen las interacciones más completas. Sus enlaces hacia teoría dependen hoy del `iframe`.
- La versión publicada figura como `0.6.2`, revisada el 3 de agosto de 2026.
- `tests/e2e/solved-organica.spec.mjs` exige el `iframe`; hay que reemplazar esas aserciones.

## Referencia visual

El contenedor de SOLved está en `index.html` (`#studyPage`, `#studyTabs`, `#studyToolbar`, `#studyBody`) y su estructura y espaciado base en `styles.css`. Estadística carga su lectura desde `content/subjects/estadistica/units/probabilidad-practica-1/estadistica-integral.html`; el archivo arma el documento visual a partir de los payloads `estadistica-v140-payload-*`. `js/estadistica-integral-bridge.js`, `js/estadistica-v120.js` y `js/organic-mind-map.js` añaden comportamiento. La nueva Orgánica debe usar el mismo contenedor de SOLved y un recorrido continuo, con los colores como acentos. El diseño viejo reside principalmente en `original.html` y en los estilos generales de `.rich-document-card`.

## Riesgos de paridad pendientes

- Los enlaces internos del HTML no fueron preservados por el importador. Se requiere un índice y resolución de destinos nativos para mapa y tarjetas.
- El esquema de `rich.json` guarda texto plano para listas y párrafos; parte del formato en línea, como superíndices y énfasis, requiere revisión visual.
- El banco de ejercicios y el glosario específicos siguen vacíos. Antes de inventar contenido hay que identificar ejercicios y definiciones realmente presentes en la fuente.
- La revisión académica de reacciones, condiciones y mecanismos aún requiere comparación por unidad. Cualquier error químico sospechoso debe registrarse, no corregirse silenciosamente.
