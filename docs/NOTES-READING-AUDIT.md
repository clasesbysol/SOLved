# Auditoría previa: notas y modo lectura v0.5.1

- El arrastre anterior acumulaba el delta del puntero sobre porcentajes y aplicaba topes fijos (`0.92`/`0.88`). No medía el elemento, no preservaba el punto de agarre y posicionaba directamente en `.study-shell`; por eso saltaba y podía quedar mal después de zoom, visor o rotación.
- El contenedor que realmente desplaza el documento de estudio es `.content-pane` (`overflow:auto`). `.workspace` desplaza las páginas generales, pero la vista de materia mantiene su propio scroll.
- `.zoom-target` cambia con el zoom. La grilla `.study-body` cambia de ancho cuando se oculta el visor y en viewport móvil. `.study-shell` es el elemento que entra en pantalla completa. Todos esos cambios alteran el espacio útil para notas.
- El hue de la materia se obtiene desde `LBT_DATA.SUBJECTS` por `subjectId`; el mismo valor se aplica como `--hue` a la vista de estudio.
- `notes` ya es una store con `keyPath: "id"`. IndexedDB permite agregar propiedades a sus registros sin recrearla ni incrementar `DB_VERSION`.
- Las notas ya forman parte del snapshot, validación y merge determinista del envelope Drive schema 3. `displayMode` y el nuevo objeto `position` viajan como propiedades del mismo registro, sin cambiar el protocolo.

La implementación mantiene el módulo `LBT_NOTES`, la store y el flujo de guardado/sincronización existentes. No crea una arquitectura paralela.

Compatibilidad: una nota histórica sin `displayMode` inicia como libro. La única excepción es un registro que ya tenga `collapsed: false`, porque ese campo expresa de manera explícita que la usuaria lo dejó abierto en v0.5.0.
