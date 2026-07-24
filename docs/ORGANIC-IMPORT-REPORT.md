# Informe de importación de Química Orgánica

- Fuente: `organicabysoll-main/index.html`, leída exclusivamente por el importador desde el ZIP entregado.
- Unidad publicada: `quimica_organica/resumen-integral` — **Resumen integral de Química Orgánica**.
- Estructura conservada: 419 secciones desplegables y 13 tablas, en el orden documental de la fuente.
- Imágenes encontradas: 260. Recursos binarios únicos extraídos: 249 (las repeticiones se deduplicaron por SHA-256).
- Seguridad: no se copia HTML arbitrario. Scripts, estilos, formularios, iframes y manejadores de eventos quedan fuera; la interfaz renderiza un vocabulario JSON cerrado y escapa todo texto.
- Rendimiento: las imágenes son archivos locales separados y se cargan con `loading="lazy"`; no permanecen como base64 dentro del JSON ni se precargan todas al abrir la PWA.
- Caché offline: el service worker conserva cada recurso visitado mediante su estrategia de caché en tiempo de ejecución.
- Secciones todavía no revisadas: Glosario, Tarjetas, Ejercicios y Mapa mental muestran el mensaje neutral acordado y no inventan material académico.

El importador determinista está en `factory/importers/import-organica-html.mjs`. Puede volver a ejecutarse con el mismo ZIP sin alterar la salida.
