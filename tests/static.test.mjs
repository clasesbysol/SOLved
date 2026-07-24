import assert from "node:assert/strict";
import { readFile, access, readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const textExtensions=new Set([".js",".mjs",".cjs",".html",".css",".md",".json",".webmanifest",".yaml",".yml"]);
const ignoredDirectories=new Set([".git","node_modules","dist","test-results",".playwright-browsers"]);
const mojibake=/\u00c3.|\u00c2.|\u00e2(?:\u20ac|\u2026|\u20ac\u0153|\u20ac\u009d|\u20ac\u2122)|\ufffd/;
async function sourceFiles(directory="."){
  const files=[];
  for(const entry of await readdir(directory,{withFileTypes:true})){
    if(entry.isDirectory()){if(!ignoredDirectories.has(entry.name))files.push(...await sourceFiles(`${directory}/${entry.name}`));continue}
    const dot=entry.name.lastIndexOf("."),extension=dot>=0?entry.name.slice(dot):"";
    if(textExtensions.has(extension))files.push(`${directory}/${entry.name}`);
  }
  return files;
}
const allTextFiles=await sourceFiles(),decoder=new TextDecoder("utf-8",{fatal:true});for(const path of allTextFiles){const bytes=await readFile(path);let decoded;assert.doesNotThrow(()=>{decoded=decoder.decode(bytes)},`${path} no puede decodificarse como UTF-8 estricto`);assert.doesNotMatch(decoded,mojibake,`${path} contiene texto con codificación corrupta`)}
for(const path of allTextFiles.filter(path=>/\.(?:js|mjs|cjs)$/.test(path))){const result=spawnSync(process.execPath,["--check",path],{encoding:"utf8"});assert.equal(result.status,0,`${path} no pasa node --check\n${result.stderr}`)}

const required = [
  "index.html", "styles.css", "manifest.webmanifest", "sw.js", "privacy.html", "terms.html", "version.json",
  "js/data.js", "js/db.js", "js/sync.js", "js/content.js", "js/notes.js", "js/app.js", "content/catalog.json", "icons/icon.svg"
];
for (const path of required) await access(path);

const index = await readFile("index.html", "utf8");
for (const ref of ["styles.css?v=0.5.0", "manifest.webmanifest", "js/data.js?v=0.5.0", "js/db.js?v=0.5.0", "js/sync.js?v=0.5.0", "js/content.js?v=0.5.0", "js/notes.js?v=0.5.0", "js/app.js?v=0.5.0"]) {
  assert.ok(index.includes(ref), `index.html no referencia ${ref}`);
}
const app = await readFile("js/app.js", "utf8");
const syncSource = await readFile("js/sync.js", "utf8");
assert.ok(syncSource.includes('requestAccessToken({prompt:""})'),"Drive debe reutilizar el consentimiento con prompt vacío");
assert.ok(!syncSource.includes('prompt:"consent"')&&!syncSource.includes("prompt: \"consent\""),"Drive no debe forzar consentimiento");
assert.ok(syncSource.includes("authInFlight")&&syncSource.includes("tokenClient"),"Drive debe compartir cliente y solicitud de autorización");
for (const id of ["highlightBtn", "newNoteBtn", "contentUpdateBtn", "zoomBtn", "viewerBtn", "indexBtn", "fullscreenBtn", "backupBtn", "installBtn", "updateBtn"]) {
  assert.ok(index.includes(`id="${id}"`), `Falta el botón ${id}`);
  assert.ok(app.includes(`els.${id}`), `El botón ${id} no está vinculado en app.js`);
}
const manifest = JSON.parse(await readFile("manifest.webmanifest", "utf8"));
assert.equal(manifest.start_url, "./");
assert.equal(manifest.scope, "./");
assert.equal(manifest.display, "standalone");
const sw = await readFile("sw.js", "utf8");
for (const ref of ["./index.html", "./styles.css?v=0.5.0", "./js/sync.js?v=0.5.0", "./js/content.js?v=0.5.0", "./js/notes.js?v=0.5.0", "./js/app.js?v=0.5.0", "./privacy.html", "./terms.html"]) {
  assert.ok(sw.includes(ref), `El service worker no precachea ${ref}`);
}
assert.match(sw, /key\.startsWith\(CACHE_PREFIX\)/, "El service worker solo debe borrar cachés de la aplicación");
assert.equal(JSON.parse(await readFile("version.json", "utf8")).appVersion, "0.5.0");
assert.ok(index.includes("v0.5.0"), "La versión visible debe ser 0.5.0");
const db=await readFile("js/db.js","utf8");assert.ok(db.includes('DB_VERSION=5'));assert.ok(db.includes('"contentPackages"'));assert.ok(db.includes('"notes"'));
assert.ok(app.includes('"pointerdown","mousedown","touchstart"'), "Falta proteger la selección en pointer/mouse/touch");
assert.ok(app.includes('addEventListener("touchend"'), "Falta capturar la selección al finalizar touch");
const sync = await readFile("js/sync.js", "utf8");
assert.ok(index.includes("https://accounts.google.com/gsi/client"), "Falta Google Identity Services");
assert.ok(sync.includes("google.accounts.oauth2.initTokenClient"), "Falta initTokenClient");
assert.ok(sync.includes("https://www.googleapis.com/auth/drive.appdata"), "El scope debe ser drive.appdata");
assert.ok(!/client[_ -]?secret/i.test(sync), "No debe existir Client Secret");
assert.ok(!/localStorage|sessionStorage/.test(sync), "El token no debe persistirse en almacenamiento web");
console.log("Pruebas estáticas y PWA: OK");
