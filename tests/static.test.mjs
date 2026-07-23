import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

const required = [
  "index.html", "styles.css", "manifest.webmanifest", "sw.js", "privacy.html", "terms.html", "version.json",
  "js/data.js", "js/db.js", "js/sync.js", "js/app.js", "icons/icon.svg"
];
for (const path of required) await access(path);

const index = await readFile("index.html", "utf8");
for (const ref of ["styles.css?v=0.4.5", "manifest.webmanifest", "js/data.js?v=0.4.5", "js/db.js?v=0.4.5", "js/sync.js?v=0.4.5", "js/app.js?v=0.4.5"]) {
  assert.ok(index.includes(ref), `index.html no referencia ${ref}`);
}
const app = await readFile("js/app.js", "utf8");
for (const id of ["highlightBtn", "zoomBtn", "viewerBtn", "indexBtn", "fullscreenBtn", "backupBtn", "installBtn", "updateBtn"]) {
  assert.ok(index.includes(`id="${id}"`), `Falta el botón ${id}`);
  assert.ok(app.includes(`els.${id}`), `El botón ${id} no está vinculado en app.js`);
}
const manifest = JSON.parse(await readFile("manifest.webmanifest", "utf8"));
assert.equal(manifest.start_url, "./");
assert.equal(manifest.scope, "./");
assert.equal(manifest.display, "standalone");
const sw = await readFile("sw.js", "utf8");
for (const ref of ["./index.html", "./styles.css?v=0.4.5", "./js/sync.js?v=0.4.5", "./js/app.js?v=0.4.5", "./privacy.html", "./terms.html"]) {
  assert.ok(sw.includes(ref), `El service worker no precachea ${ref}`);
}
assert.match(sw, /key\.startsWith\(CACHE_PREFIX\)/, "El service worker solo debe borrar cachés de la aplicación");
assert.equal(JSON.parse(await readFile("version.json", "utf8")).appVersion, "0.4.5");
assert.ok(index.includes("v0.4.5"), "La versión visible debe ser 0.4.5");
assert.ok(app.includes('"pointerdown","mousedown","touchstart"'), "Falta proteger la selección en pointer/mouse/touch");
assert.ok(app.includes('addEventListener("touchend"'), "Falta capturar la selección al finalizar touch");
const sync = await readFile("js/sync.js", "utf8");
assert.ok(index.includes("https://accounts.google.com/gsi/client"), "Falta Google Identity Services");
assert.ok(sync.includes("google.accounts.oauth2.initTokenClient"), "Falta initTokenClient");
assert.ok(sync.includes("https://www.googleapis.com/auth/drive.appdata"), "El scope debe ser drive.appdata");
assert.ok(!/client[_ -]?secret/i.test(sync), "No debe existir Client Secret");
assert.ok(!/localStorage|sessionStorage/.test(sync), "El token no debe persistirse en almacenamiento web");
console.log("Pruebas estáticas y PWA: OK");
