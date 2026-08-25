import { readFile, writeFile, rm } from "node:fs/promises";
import { gzipSync, gunzipSync } from "node:zlib";
import { createHash } from "node:crypto";

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error("Uso: node scripts/publish-qbi-v4.mjs <html-aprobado>");

const unit = "content/subjects/quimica_biologica1/units/proteinas-i";
const version = "4.0.0";
let html = await readFile(sourcePath, "utf8");

html = html
  .replace("SOLved · Química Biológica · Enzimas II · revisión v2", "SOLved · Química Biológica · Resumen integral")
  .replace("Abriendo el resumen actual de SOLved y agregando Enzimas II, TP2 y la sección independiente de ejercicios…", "Preparando el resumen integral de Química Biológica I…")
  .replace("<small>Esta es una vista de revisión. No modifica la app publicada.</small>", "")
  .replaceAll("const BASE='https://raw.githubusercontent.com/clasesbysol/SOLved/main/content/subjects/quimica_biologica1/units/proteinas-i/';", "const BASE='./';")
  .replace("const STORAGE='qbi-enz2-review-open-v2';", "const STORAGE='qbi-v4-open-details';")
  .replace("const version='3.5.1-enzimas2-review-2';", `const version='${version}';`)
  .replace("SOLved · Química Biológica · Resumen integral 3.4.0", "SOLved · Química Biológica · Resumen integral 4.0.0")
  .replace("let out=String(html||'');", "let out=String(html||'').replace(/<title>[^<]*<\\/title>/i,'<title>SOLved · Química Biológica · Resumen integral 4.0.0</title>');")
  .replace("out=out.replace('15 capítulos','19 capítulos').replace('20 capítulos','19 capítulos');", "out=out.replace('15 capítulos','19 capítulos').replace('16 capítulos','19 capítulos').replace('20 capítulos','19 capítulos');")
  .replace(
    "function after(){cleanNavArtifacts();wireDefinitions();wireImages();prepareRawMath(document.querySelector('.qb-summary')||document.body);renderExercises();typeset(document.querySelector('.qb-summary')||document.body)}",
    `function wireDetailPersistence(){
  const root=document.querySelector('.qb-summary')||document.body,key='qbi-v4-theory-details';
  let state={};try{state=JSON.parse(localStorage.getItem(key)||'{}')||{}}catch{}
  const details=[...root.querySelectorAll('details')].filter(item=>!item.closest('.qbi-exercises-section'));
  details.forEach((item,index)=>{const id=item.id||item.closest('[id]')?.id||'detail';const stateKey=id+':'+index;item.dataset.qbiPersistKey=stateKey;if(Object.hasOwn(state,stateKey))item.open=Boolean(state[stateKey]);else state[stateKey]=item.open});
  try{localStorage.setItem(key,JSON.stringify(state))}catch{}
  root.addEventListener('toggle',event=>{const item=event.target;if(!item.matches?.('details[data-qbi-persist-key]'))return;const stateKey=item.dataset.qbiPersistKey;if(event.isTrusted){state[stateKey]=item.open;try{localStorage.setItem(key,JSON.stringify(state))}catch{}}else if(Object.hasOwn(state,stateKey)&&item.open!==Boolean(state[stateKey]))queueMicrotask(()=>{item.open=Boolean(state[stateKey])})},true)
}
function after(){cleanNavArtifacts();wireDefinitions();wireImages();wireDetailPersistence();prepareRawMath(document.querySelector('.qb-summary')||document.body);renderExercises();typeset(document.querySelector('.qb-summary')||document.body)}`
  );

if (html.includes("raw.githubusercontent.com/clasesbysol/SOLved/main")) {
  throw new Error("El HTML publicado todavía depende de raw.githubusercontent.com/main");
}

const compressed = gzipSync(Buffer.from(html), { level: 9 });
const encoded = compressed.toString("base64");
const chunkSize = 350_000;
const chunks = [];
for (let start = 0; start < encoded.length; start += chunkSize) chunks.push(encoded.slice(start, start + chunkSize));

for (let index = 0; index < chunks.length; index++) {
  await writeFile(`${unit}/qbi4-payload-${index + 1}.txt`, chunks[index] + "\n");
}

for (let index = chunks.length + 1; index <= 30; index++) {
  await rm(`${unit}/qbi4-payload-${index}.txt`, { force: true });
}

const names = chunks.map((_, index) => `qbi4-payload-${index + 1}.txt`);
const loader = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#e74888"><title>SOLved · Química Biológica · Resumen integral</title><style id="solved-standard-theme">:root{--solved-hue:344}html,body{margin:0;min-height:100%;font-family:Inter,Segoe UI,Arial,sans-serif;background:#fff8fc;color:#382734}.loading{min-height:100vh;display:grid;place-items:center;padding:28px}.card{max-width:520px;border:1px solid #efd3e0;border-radius:18px;background:#fff;padding:24px;box-shadow:0 10px 30px rgba(104,42,75,.08)}.dot{width:12px;height:12px;border-radius:50%;background:#e74888;display:inline-block;margin-right:8px;animation:pulse 1s infinite alternate}@keyframes pulse{to{opacity:.25}}</style></head><body><div class="loading"><div class="card"><b><span class="dot"></span>Cargando Química Biológica</b><p>Preparando el resumen integral de SOLved…</p></div></div><script>const SOLVED_RICH_BRIDGE=['solved-rich-selection','solved-rich-state'];void SOLVED_RICH_BRIDGE;
async function ungzip64(text){const raw=atob(String(text).replace(/\\s+/g,''));const bytes=Uint8Array.from(raw,c=>c.charCodeAt(0));if(typeof DecompressionStream==='undefined')throw Error('Tu navegador no soporta DecompressionStream');const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));return new Response(stream).text()}
(async()=>{try{const version='${version}',names=${JSON.stringify(names)};const parts=await Promise.all(names.map(name=>fetch(name+'?v='+version,{cache:'no-store'}).then(response=>{if(!response.ok)throw Error(name);return response.text()})));const html=await ungzip64(parts.join(''));document.open();document.write(html);document.close()}catch(error){console.error(error);document.body.innerHTML='<div class="loading"><div class="card"><b>No se pudo abrir el resumen</b><p>Actualizá SOLved y volvé a intentar.</p></div></div>'}})();<\/script></body></html>\n`;
await writeFile(`${unit}/original.html`, loader);

const restored = gunzipSync(Buffer.from(chunks.join(""), "base64"));
if (!restored.equals(Buffer.from(html))) throw new Error("La validación de los chunks no reconstruyó el HTML exacto");

console.log(JSON.stringify({
  version,
  chunks: chunks.length,
  sourceBytes: Buffer.byteLength(html),
  compressedBytes: compressed.length,
  sha256: createHash("sha256").update(html).digest("hex")
}, null, 2));
