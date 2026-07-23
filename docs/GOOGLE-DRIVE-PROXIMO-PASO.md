# Google Drive — preparación para 0.4D

No crear credenciales hasta que la URL de GitHub Pages esté funcionando.

Después se configurarán como orígenes JavaScript autorizados:

- `http://localhost`
- `http://localhost:4173`
- `https://clasesbysol.github.io`

El origen no incluye la ruta `/biblioteca-lbt/`.

Se habilitará Google Drive API y se solicitará el alcance mínimo de `appDataFolder`. El cliente para navegador usa un **Client ID público**; no debe incorporarse ningún client secret al repositorio.
