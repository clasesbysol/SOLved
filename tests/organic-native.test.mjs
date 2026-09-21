import assert from "node:assert/strict";
import {readFile,access} from "node:fs/promises";
import path from "node:path";

const base="content/subjects/quimica_organica",read=async relative=>JSON.parse(await readFile(path.join(base,relative),"utf8"));
const catalog=JSON.parse(await readFile("content/catalog.json","utf8"));
const units=catalog.packages.filter(item=>item.subjectId==="quimica_organica").sort((a,b)=>a.unitId.localeCompare(b.unitId));
assert.equal(units.length,19,"la jerarquía principal del original debe producir 19 unidades nativas");
assert.ok(units.every(item=>item.unitId.startsWith("organica-")&&item.path.endsWith(`${item.unitId}/`)));
assert.ok(!units.some(item=>item.unitId==="resumen-integral"),"la versión incrustada debe quedar fuera del catálogo");
const legacy=await read("units/resumen-integral/package.json");
assert.equal(legacy.status,"reviewed","la versión anterior queda disponible como referencia interna");

const anchors=await read("anchor-index.json"),assetRoot=path.join(base,"units/resumen-integral");
const counts={details:0,heading:0,figure:0,table:0,paragraph:0,list:0,glossary:0,exercises:0};
const figureAssets=new Set();
function walk(blocks,unitAssets){for(const block of blocks){if(block.type in counts)counts[block.type]++;if(block.type==="figure"){assert.ok(unitAssets.has(block.assetId),`figura sin asset: ${block.assetId}`);figureAssets.add(block.assetId)}walk(block.children||[],unitAssets)}}
for(const unit of units){
 const dir=`units/${unit.unitId}`,manifest=await read(`${dir}/package.json`),rich=await read(`${dir}/rich.json`),assets=await read(`${dir}/assets.json`),glossary=await read(`${dir}/glossary.json`),exercises=await read(`${dir}/exercises.json`);
 assert.equal(manifest.contentVersion,unit.contentVersion);
 assert.ok(!rich.document,"ninguna unidad nativa debe cargar el HTML anterior");
 const assetIds=new Set(assets.assets.map(asset=>asset.id));for(const asset of assets.assets)await access(path.join(assetRoot,asset.path));
 walk(rich.blocks,assetIds);counts.glossary+=glossary.entries.length;counts.exercises+=exercises.exercises.length;
 assert.ok(glossary.entries.every(entry=>entry.references.some(ref=>ref.sourceId==="organica-html")));
 assert.ok(exercises.exercises.every(entry=>entry.references.some(ref=>ref.sourceId==="organica-cards-v2")));
}
assert.deepEqual([counts.details,counts.heading,counts.figure,counts.table],[418,520,260,13]);
assert.equal(figureAssets.size,249);assert.ok(counts.glossary>150);assert.equal(counts.exercises,63);

const cardBank=await read("units/resumen-integral/organic-cards-v2.json"),mentalMap=await read("units/resumen-integral/organic-mind-map.json");
const targets=new Set(cardBank.cards.map(card=>card.summaryTarget));
function targetsFrom(node){if(Array.isArray(node))return node.forEach(targetsFrom);if(node&&typeof node==="object"){if(typeof node.target==="string")targets.add(node.target);Object.values(node).forEach(targetsFrom)}}
targetsFrom(mentalMap);for(const target of targets)assert.ok(anchors[target],`destino sin unidad nativa: ${target}`);
assert.ok(Object.values(anchors).every(value=>units.some(unit=>unit.unitId===value.unitId)));

const content=await readFile("js/content.js","utf8"),native=await readFile("js/organic-native.js","utf8"),html=await readFile("index.html","utf8");
assert.ok(content.includes("LBT_ORGANIC_NATIVE.render(nativeRecord)"));assert.ok(!native.includes("<iframe"));assert.ok(html.includes("js/organic-native.js"));
console.log(`Orgánica nativa: ${units.length} unidades, ${counts.details} secciones académicas, ${counts.heading} títulos, ${counts.figure} figuras, ${counts.table} tablas, ${counts.glossary} entradas de glosario, ${counts.exercises} ejercicios y ${targets.size} destinos enlazados.`);
