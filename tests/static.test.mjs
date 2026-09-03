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
  "js/data.js", "js/db.js", "js/sync.js", "js/supabase-config.js", "js/supabase-sync.js", "js/content.js", "js/study-workspace.js", "js/notes.js", "js/utilities.js", "js/qbi-mind-map-data.js", "js/organic-mind-map.js", "organic-mind-map.css", "styles-personal.css", "js/app.js", "content/catalog.json", "content/subjects/quimica_organica/units/resumen-integral/organic-mind-map.json", "icons/icon.svg", "supabase/migrations/202608030001_solved.sql", "supabase/migrations/202608050001_imported_html.sql", "supabase/migrations/202608090001_user_materials.sql"
];
for (const path of required) await access(path);

const index = await readFile("index.html", "utf8");
const auth=await readFile("js/auth.js","utf8"),cloud=await readFile("js/supabase-sync.js","utf8"),migration=await readFile("supabase/migrations/202608030001_solved.sql","utf8");assert.ok(auth.includes("signUp")&&auth.includes("signInWithPassword")&&auth.includes("resetPasswordForEmail")&&auth.includes("updateUser")&&auth.includes("guest"));assert.ok(cloud.includes("postgres_changes")&&cloud.includes("user_records"));assert.ok(migration.includes("enable row level security")&&migration.includes("is_solved_admin")&&migration.includes("auth.uid()"));assert.ok(!/service_role|secretKey/.test(auth+cloud));assert.ok(index.includes("Configuración")&&index.includes("Continuar como invitado"));
for (const ref of ["styles.css", "styles-enhancements.css", "manifest.webmanifest", "js/data.js", "js/db.js", "js/sync.js", "js/content.js", "js/notes.js", "js/utilities.js", "js/app.js"]) {
  assert.ok(index.includes(ref), `index.html no referencia ${ref}`);
}
const app = await readFile("js/app.js", "utf8");
for(const ref of ["organic-mind-map.css?v=0.7.4","js/qbi-mind-map-data.js?v=1.1.0","js/organic-mind-map.js?v=0.11.1"])assert.ok(index.includes(ref),`index.html no referencia ${ref}`);
const syncSource = await readFile("js/sync.js", "utf8");
assert.ok(syncSource.includes('requestAccessToken({prompt:""})'),"Drive debe reutilizar el consentimiento con prompt vacío");
assert.ok(!syncSource.includes('prompt:"consent"')&&!syncSource.includes("prompt: \"consent\""),"Drive no debe forzar consentimiento");
assert.ok(syncSource.includes("authInFlight")&&syncSource.includes("tokenClient"),"Drive debe compartir cliente y solicitud de autorización");
for (const id of ["highlightBtn", "newNoteBtn", "contentUpdateBtn", "zoomBtn", "indexBtn", "fullscreenBtn", "backupBtn", "installBtn", "updateBtn"]) {
  assert.ok(index.includes(`id="${id}"`), `Falta el botón ${id}`);
  assert.ok(app.includes(`els.${id}`), `El botón ${id} no está vinculado en app.js`);
}
const manifest = JSON.parse(await readFile("manifest.webmanifest", "utf8"));
assert.equal(manifest.start_url, "./");
assert.equal(manifest.scope, "./");
assert.equal(manifest.display, "standalone");
const sw = await readFile("sw.js", "utf8");
for(const ref of ["./organic-mind-map.css?v=0.7.4","./js/qbi-mind-map-data.js?v=1.1.0","./js/organic-mind-map.js?v=0.11.1","./content/subjects/quimica_biologica1/units/proteinas-i/qbi-integrated-subject.js?v=4.4.0","./content/subjects/quimica_organica/units/resumen-integral/organic-mind-map.json"])assert.ok(sw.includes(ref),`El service worker no precachea ${ref}`);
for (const ref of ["./index.html", "./styles.css", "./styles-enhancements.css", "./js/sync.js", "./js/content.js", "./js/notes.js", "./js/utilities.js", "./js/app.js", "./privacy.html", "./terms.html"]) {
  assert.ok(sw.includes(ref), `El service worker no precachea ${ref}`);
}
assert.ok(index.includes("js/study-workspace.js?v=0.10.10")&&sw.includes("./js/study-workspace.js?v=0.10.10"),"el workspace debe estar disponible offline");
for(const ref of ["js/supabase-config.js?v=0.8.0","js/supabase-sync.js?v=0.10.9","@supabase/supabase-js"])assert.ok(index.includes(ref),`index.html no referencia ${ref}`);
assert.match(sw, /key\.startsWith\(CACHE_PREFIX\)/, "El service worker solo debe borrar cachés de la aplicación");
assert.equal(JSON.parse(await readFile("version.json", "utf8")).appVersion, "0.11.2");
assert.ok(index.includes("v0.11.2"), "La versión visible debe ser 0.11.2");
const db=await readFile("js/db.js","utf8");assert.ok(db.includes('DB_VERSION=9'));for(const store of ["contentPackages","importedHtml","userMaterials","officialMaterials","notes","studySessions","collections","bookmarks","activityLog"])assert.ok(db.includes(`"${store}"`),`falta store ${store}`);
const contentSource=await readFile("js/content.js","utf8");assert.ok(contentSource.includes("compareContentVersions(staticRecord.contentVersion,item.content_version)>=0"),"Supabase no debe reemplazar un paquete estático más nuevo");assert.ok(contentSource.includes('record.origin==="official-supabase"')&&contentSource.includes('DB.del("contentPackages",key)'),"la sincronización debe retirar copias cloud obsoletas");
assert.ok(contentSource.includes('version=`?v=${encodeURIComponent(record.contentVersion||"latest")}`')&&contentSource.includes("base+document+version"),"los HTML enriquecidos deben invalidar caché según su versión de contenido");
const qbiHtml=await readFile("content/subjects/quimica_biologica1/units/proteinas-i/original.html","utf8"),qbiIntegrated=await readFile("content/subjects/quimica_biologica1/units/proteinas-i/qbi-integrated-subject.js","utf8");assert.ok(qbiHtml.includes("--solved-hue:344")&&qbiHtml.includes("qbi-integrated-subject.js"),"QBI debe conservar el diseño rosado y cargar la materia integrada");for(const feature of ["qbi-mapa-integral","data-add-note","data-highlight","data-search-next","restoreMarker","visualHtml"])assert.ok(qbiIntegrated.includes(feature),`QBI integrado debe incluir ${feature}`);assert.ok(app.includes("sendRichFrameState")&&app.includes("richHighlights"),"QBI debe conectar selección y resaltados persistentes con la app");
const workspace=await readFile("js/study-workspace.js","utf8");for(const id of ["uploadHtmlBtn","splitViewBtn"])assert.ok(index.includes(`id="${id}"`)&&workspace.includes(`$("${id}")`),`${id} debe estar vinculado`);assert.ok(workspace.includes('sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"')&&workspace.includes("connect-src 'none'")&&!workspace.includes("allow-same-origin"),"el HTML debe permanecer aislado");assert.doesNotMatch(app,/Documentos de la materia|Documentos de \$\{/i,"la sección antigua no debe renderizarse");
assert.ok(db.includes("biblioteca-lbt-v050-fallback")&&db.includes("biblioteca-lbt-v04-fallback"),"el fallback nuevo debe migrar la clave histórica");
assert.ok(db.includes("lbt-fallback-error"),"una cuota agotada debe producir una advertencia visible");
assert.ok(app.includes("flushPendingSaves"),"la actualización PWA debe vaciar notas pendientes");
assert.ok(app.includes('register(`./sw.js?v=${APP_VERSION}`')&&app.includes('worker?.postMessage({type:"SKIP_WAITING"})'),"la PWA debe detectar y activar automáticamente una versión nueva");
assert.ok(index.includes('id="accountInstall"')&&index.includes('id="installHelpModal"')&&app.includes('beforeinstallprompt')&&app.includes('appinstalled'),"la instalación PWA debe estar disponible desde la cuenta con fallback");
assert.ok(app.includes("contentByTab")&&workspace.includes("openInPanel")&&workspace.includes("pointercancel")&&workspace.includes("aria-orientation"),"el workspace debe usar contenido real, apertura dirigida y divisor accesible");
assert.ok(app.includes("solved-fisica-integral-v3")&&app.includes('fisica1:"resumen-integral"'),"Física debe migrar una vez al resumen integral y persistir la elección");
const config=await readFile("playwright.config.mjs","utf8");assert.ok(config.includes("pnpm exec http-server")&&!/\.CMD\b/i.test(config),"Playwright debe iniciar igual en Windows y Linux");
const workflow=await readFile(".github/workflows/ci.yml","utf8");assert.ok(workflow.includes("ubuntu-latest")&&workflow.includes("playwright test --reporter=list"),"CI debe ejecutar Playwright en Linux sin retries");
assert.ok(app.includes('"pointerdown","mousedown","touchstart"'), "Falta proteger la selección en pointer/mouse/touch");
assert.ok(app.includes('addEventListener("touchend"'), "Falta capturar la selección al finalizar touch");
const sync = await readFile("js/sync.js", "utf8");
assert.ok(index.includes("https://accounts.google.com/gsi/client"), "Falta Google Identity Services");
assert.ok(sync.includes("google.accounts.oauth2.initTokenClient"), "Falta initTokenClient");
assert.ok(sync.includes("https://www.googleapis.com/auth/drive.appdata"), "El scope debe ser drive.appdata");
assert.ok(!/client[_ -]?secret/i.test(sync), "No debe existir Client Secret");
assert.ok(!/localStorage|sessionStorage/.test(sync), "El token no debe persistirse en almacenamiento web");
const notes=await readFile("js/notes.js","utf8");
for(const event of ["pointerdown","pointermove","pointerup","pointercancel","lostpointercapture"])assert.ok(notes.includes(`"${event}"`),`notas debe manejar ${event}`);
assert.ok(app.includes('className="notes-layer"'),"la vista de estudio debe crear una capa exclusiva de notas");
assert.ok(notes.includes("xRatio")&&notes.includes("documentY")&&notes.includes("offsetX")&&notes.includes("offsetY"),"falta el modelo documental de posición");
assert.ok(sync.includes('schemaVersion:4')&&sync.includes('"readingGlobal","readingBySubject"')&&sync.includes("userMaterials"),"Drive debe sincronizar lectura y materiales personales con schema 4");
const styles=await readFile("styles.css","utf8");for(const theme of ["chalkboard","sand","soft-night","technical-blue"])assert.ok(styles.includes(`data-visual-theme="${theme}"`),`falta el tema ${theme}`);
for(const field of ["visualTheme","subjectHueOverrides","studyIdleSeconds"])assert.ok(sync.includes(`"${field}"`),`Drive debe sincronizar ${field}`);
assert.ok(styles.includes("--subject-hue")&&styles.includes("mark.study-highlight"),"el resaltado debe usar el matiz de la materia");
assert.ok(sync.includes('"checklist"'),"Drive debe sincronizar la checklist");assert.ok(index.includes('id="settingsPage"')&&index.includes('id="checklistForm"'),"Configuración y checklist deben existir");assert.doesNotMatch(index,/Vista general|Repaso aleatorio|Favoritos|Fabricar resumen|Crear mi carrera/,"La interfaz no debe conservar funciones retiradas");
console.log("Pruebas estáticas y PWA: OK");
