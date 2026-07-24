# Utilidades de estudio v0.5.1

Todas las utilidades funcionan primero en IndexedDB y no envían consultas ni contenido a servicios nuevos. Google Drive conserva su alcance exclusivo `drive.appdata`.

## Datos y migración

IndexedDB sube a la versión 6 y crea de forma no destructiva `studySessions`, `collections`, `bookmarks` y `activityLog`. Drive usa envelope schema 3: puede leer schemas 1 y 2, normaliza las colecciones nuevas como arrays vacíos y mantiene tombstones/`updatedAt`.

Los respaldos incluyen sesiones finalizadas o canceladas, colecciones, favoritos y actividad. Excluyen sesiones activas, tokens, locks y el identificador de instalación. Una sesión activa se recupera localmente por timestamps y su creación se coordina con Web Locks cuando el navegador los ofrece.

## Uso

- Dentro de una materia, **Nueva nota** crea una nota anclada a la selección o libre. **Minimizar** la convierte en un marcador-librito del color de la materia.
- **Temporizador** ofrece cuenta regresiva y cronómetro; las sesiones terminadas alimentan el panel semanal.
- **Repaso aleatorio** usa solamente paquetes publicados y admite una semilla reproducible.
- **Favoritos** conserva referencias estables incluso si el contenido deja de estar publicado; esos casos aparecen en *Elementos sin ubicación*.
- La búsqueda global ignora mayúsculas, tildes, puntuación, plurales sencillos y errores tipográficos acotados.
- **Fórmulas** reúne los bloques `kind: "formula"` de todas las unidades publicadas.
- **Modo lectura** guarda preferencias personales por materia sin modificar el contenido.

## Riesgos conocidos

Web Locks no está disponible en navegadores antiguos; allí la deduplicación usa la comprobación transaccional del estado persistido. Los favoritos cuyo contenido se despublique se conservan, pero no pueden abrirse hasta que el paquete vuelva a estar disponible.
