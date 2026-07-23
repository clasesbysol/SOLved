# Sincronización opcional con Google Drive

Biblioteca LBT guarda siempre primero en IndexedDB. Google Drive es una copia opcional para combinar progreso entre navegadores mediante un único archivo privado de la aplicación, `biblioteca-lbt-sync-v1.json`, dentro de `appDataFolder`.

## Qué guarda

- preferencias de interfaz;
- estado y progreso personal de materias;
- eventos del calendario;
- resaltados y sus eliminaciones.

## Qué nunca guarda

- tokens o credenciales;
- contraseñas o Client Secret;
- PDF, resúmenes, documentos académicos o archivos normales de Drive.

## Uso

1. Pulsá **Conectar Google Drive** y aceptá el permiso limitado a datos privados de esta aplicación.
2. Para renovar un token vencido, pulsá **Reconectar Drive**. La aplicación nunca abre OAuth automáticamente.
3. Sin internet, seguí trabajando normalmente: los cambios quedan en IndexedDB y se marcan como pendientes.
4. Pulsá **Desconectar** para olvidar el token en memoria. No se borran datos locales ni el archivo remoto.
5. **Importar y combinar** incorpora el respaldo y lo sincroniza cuando hay autorización.
6. **Importar y reemplazar** cambia solo la copia local. Para reemplazar Drive hace falta una segunda confirmación explícita.

Los conflictos se resuelven por `updatedAt`; las configuraciones se combinan por campo. Las eliminaciones de eventos y resaltados viajan como tombstones para que no reaparezcan desde otro dispositivo.
