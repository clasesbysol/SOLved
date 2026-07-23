import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

const required = [
  "index.html", "styles.css", "manifest.webmanifest", "sw.js", "privacy.html", "terms.html", "version.json",
  "js/data.js", "js/db.js", "js/app.js", "icons/icon.svg"
];
for (const path of required) await access(path);

const index = await readFile("index.html", "utf8");
for (const ref of ["styles.css", "manifest.webmanifest", "js/data.js", "js/db.js", "js/app.js"]) {
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
for (const ref of ["./index.html", "./styles.css", "./js/app.js", "./privacy.html", "./terms.html"]) {
  assert.ok(sw.includes(ref), `El service worker no precachea ${ref}`);
}
console.log("Pruebas estáticas y PWA: OK");
