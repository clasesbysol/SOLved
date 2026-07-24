# Fábrica LBT y contenido actualizable

## Preparación

Completá `factory/INTAKE-TEMPLATE.yaml` con IDs, alcance, metadatos de fuentes, páginas y notación. No copies documentos privados al repositorio. Los IDs y metadatos bastan.

Creá una unidad con:

```bash
npm run content:new -- --subject fisica1 --unit unidad-id --title "Título"
```

Completá los JSON siguiendo `factory/LBT-CONTENT-STANDARD.md`, los schemas y los prompts. Validá y regenerá el catálogo:

```bash
npm run content:validate
npm run content:catalog
```

`content/catalog.json` es generado: nunca se edita a mano. Para incorporar un ZIP, extraelo fuera del repositorio, inspeccioná que contenga una sola carpeta de unidad y ningún documento fuente, copiala a `content/subjects/{subjectId}/units/{unitId}/`, validá y recién entonces generá el catálogo.

## Actualización automática y rollback

La app pide el catálogo con `cache: no-store`, compara versiones y descarga todos los archivos modificados antes de instalar. Solo después de validar el paquete completo lo guarda atómicamente en `contentPackages`. Un fallo conserva la versión anterior y todos los datos personales. Se comprueba al abrir, al recuperar internet, al volver a la pestaña después de 15 minutos y con “Actualizar contenido”. La PWA no necesita reinstalarse.

Para volver atrás, republicá el paquete anterior con una versión nueva o restaurá el commit previo, regenerá el catálogo y desplegá. Los datos personales no se modifican.

## Notas

“Nueva nota” crea un post-it anclado a la selección o libre. Puede editarse, moverse con pointer/touch, minimizarse, colorearse, copiarse y borrarse. Las posiciones son relativas. Tras cambiar el contenido se intenta ubicar por target, texto y contexto; las no ubicables aparecen en “Notas sin ubicación”. El borrado crea un tombstone.

## Separación y sincronización

Los paquetes publicados (resumen, glosario, tarjetas, ejercicios, mapa y referencias) viven en `contentPackages`. Progreso, preferencias, eventos, resaltados, notas, respuestas y dominio de tarjetas son personales. Drive sincroniza solamente datos personales mediante réplicas por `deviceId`; el schema remoto 2 agrega `notes`, y los archivos schema 1 se normalizan con `notes: []`. Ni tokens ni Client Secret entran en IndexedDB o respaldos.
