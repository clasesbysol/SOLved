import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {execFileSync} from "node:child_process";
import {validateUnit,root} from "../factory/validators/lib.mjs";

const organica=path.join(root,"content/subjects/quimica_organica/units/resumen-integral");
assert.deepEqual(validateUnit(organica),[],"acepta la unidad enriquecida de Química Orgánica");
const rich=JSON.parse(fs.readFileSync(path.join(organica,"rich.json")));
const assets=JSON.parse(fs.readFileSync(path.join(organica,"assets.json")));
assert.equal(rich.blocks.filter(x=>x.type==="details").length,419);
assert.equal(assets.assets.length,249);
assert.ok(assets.assets.every(asset=>fs.existsSync(path.join(organica,asset.path))));

const unsafe=[];
(function inspect(value){if(Array.isArray(value))return value.forEach(inspect);if(value&&typeof value==="object")for(const [key,item] of Object.entries(value)){if(key==="html"||key==="script"||/^on[a-z]+$/i.test(key))unsafe.push(key);inspect(item)}else if(typeof value==="string"&&(/^data:image\//i.test(value)||/<script[\s>]/i.test(value)))unsafe.push(value)})(rich);
assert.deepEqual(unsafe,[],"el contenido importado no conserva código ni imágenes base64");

const physics=path.join(root,"content/subjects/fisica1/units/resumen-integral");
assert.deepEqual(validateUnit(physics),[],"acepta el contenido real de Física I");
const catalogPath=path.join(root,"content/catalog.json");
const node=process.execPath;
execFileSync(node,[path.join(root,"factory/validators/content-catalog.mjs")]);
const first=fs.readFileSync(catalogPath,"utf8");
execFileSync(node,[path.join(root,"factory/validators/content-catalog.mjs")]);
assert.equal(fs.readFileSync(catalogPath,"utf8"),first,"el catálogo es determinista");
const catalog=JSON.parse(first);
assert.deepEqual(catalog.packages.filter(item=>item.subjectId==="fisica1").map(item=>item.unitId),["resumen-integral"]);
assert.ok(!first.includes('"unitId": "demo"')&&!first.includes('"unitId": "formula-map"'),"el catálogo no publica paquetes de demostración");

const createRoot=path.join(root,"content/subjects/test-factory");
try{
  execFileSync(node,[path.join(root,"factory/validators/content-new.mjs"),"--subject","test-factory","--unit","unit-test","--title","Unidad de prueba"]);
  const fixture=path.join(createRoot,"units/unit-test");
  assert.equal(validateUnit(fixture).length,0,"content:new crea una unidad válida");
  const missing=fs.mkdtempSync(path.join(os.tmpdir(),"lbt-content-"));fs.cpSync(fixture,missing,{recursive:true});fs.rmSync(path.join(missing,"cards.json"));assert.ok(validateUnit(missing).some(x=>x.includes("Falta cards.json")));fs.rmSync(missing,{recursive:true,force:true});
  const invalid=fs.mkdtempSync(path.join(os.tmpdir(),"lbt-content-"));fs.cpSync(fixture,invalid,{recursive:true});const manifest=JSON.parse(fs.readFileSync(path.join(invalid,"package.json")));manifest.unexpected=true;fs.writeFileSync(path.join(invalid,"package.json"),JSON.stringify(manifest));assert.ok(validateUnit(invalid).some(x=>x.includes("additional properties")));fs.rmSync(invalid,{recursive:true,force:true});
  execFileSync(node,[path.join(root,"factory/validators/content-catalog.mjs")]);
  assert.ok(!JSON.parse(fs.readFileSync(catalogPath)).packages.some(item=>item.subjectId==="test-factory"),"el catálogo excluye paquetes draft");
}finally{fs.rmSync(createRoot,{recursive:true,force:true});execFileSync(node,[path.join(root,"factory/validators/content-catalog.mjs")])}

console.log("Fábrica y validación de contenido: OK");
