# Sincronización opcional con Google Drive

Biblioteca LBT guarda siempre primero en IndexedDB. Google Drive es una copia opcional para combinar progreso entre navegadores. Cada instalación mantiene su propia réplica privada dentro de `appDataFolder`; todas conservan el nombre lógico `biblioteca-lbt-sync-v1.json` y se distinguen mediante `appProperties` con el `deviceId` local.

Al sincronizar, la aplicación lee y combina todas las réplicas válidas, pero actualiza únicamente la réplica de su instalación. Así, dos dispositivos que parten del mismo estado pueden subir simultáneamente sin reemplazar el archivo completo del otro. Las pestañas de una misma instalación coordinan sus rondas con Web Locks y comparten una sola réplica.

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

Las réplicas antiguas sin `appProperties` se siguen leyendo para migrar datos, pero no se sobrescriben ni se eliminan automáticamente.
