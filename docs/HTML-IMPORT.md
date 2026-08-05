# HTML importados

Cada archivo se guarda como un registro `importedHtml` con `id`, `title`,
`originalFilename`, `htmlContent`, `subjectId`, `ownerId`, `createdAt`,
`updatedAt` y `order`. IndexedDB es la escritura inmediata; una cuenta
autenticada sincroniza el registro mediante `user_records`, cuyas políticas RLS
lo aíslan por `auth.uid()`.

## Aislamiento del visor

Los documentos se muestran con `srcdoc` y
`sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"`.

- `allow-scripts` conserva JavaScript autocontenido.
- Los permisos de popups permiten abrir enlaces externos reescritos con
  `target="_blank"` fuera del visor.
- No se concede `allow-same-origin`, formularios, descargas automáticas,
  navegación superior, modales ni acceso al almacenamiento de SOLved.
- La CSP inyectada bloquea red (`connect-src 'none'`), formularios y recursos
  externos. Se permiten estilos/scripts inline y recursos `data:`/`blob:`.

## ZIP

No se muestra un botón de ZIP porque aún no hay un desempaquetador mantenido en
el proyecto. El store separado y el visor permiten agregar después un manifiesto
de recursos. Antes de habilitarlo se deberán rechazar rutas `..`, limitar tamaño
y tipos, y reescribir referencias relativas a URLs `blob:` revocables.
