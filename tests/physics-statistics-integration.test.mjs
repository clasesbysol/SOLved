import test from "node:test";
import assert from "node:assert/strict";
import {readFile,stat} from "node:fs/promises";
import {gunzipSync} from "node:zlib";

const physics="content/subjects/fisica1/units/resumen-integral/";
const statistics="content/subjects/estadistica/units/probabilidad-practica-1/";

test("Física conserva el HTML integral, las fórmulas y los ejercicios",async()=>{
  const manifest=JSON.parse(await readFile(physics+"package.json","utf8"));
  const rich=JSON.parse(await readFile(physics+"rich.json","utf8"));
  assert.equal(manifest.contentVersion,"1.3.2");
  assert.deepEqual([rich.document,rich.exerciseDocument,rich.formulaDocument],["summary.html","exercises.html","original.html"]);
  assert.ok((await stat(physics+"summary.html")).size>450_000,"el resumen integral fue recortado");
  assert.ok((await stat(physics+"exercises.html")).size>450_000,"el banco de ejercicios fue recortado");
  assert.ok((await stat(physics+"original.html")).size>70_000,"la hoja de fórmulas fue recortada");
});

test("Estadística conserva y puede reconstruir exactamente la versión 1.4",async()=>{
  const manifest=JSON.parse(await readFile(statistics+"package.json","utf8"));
  const rich=JSON.parse(await readFile(statistics+"rich.json","utf8"));
  assert.equal(manifest.contentVersion,"1.4.0");
  assert.equal(rich.document,"estadistica-integral.html");
  const payloads=await Promise.all(Array.from({length:10},(_,i)=>readFile(`${statistics}estadistica-v140-payload-${i+1}.txt`,"utf8")));
  const html=gunzipSync(Buffer.from(payloads.join("").replace(/\s/g,""),"base64")).toString("utf8");
  for(const expected of ["Estadística Aplicada","Práctica 1","Práctica 2","Variables aleatorias","39 ejercicios"])assert.ok(html.includes(expected),`falta ${expected}`);
  assert.ok(html.length>150_000,"la versión acumulativa de Estadística fue recortada");
});

test("el formato integrado incluye Física I, Estadística y Física II",async()=>{
  const app=await readFile("js/app.js","utf8"),workspace=await readFile("js/study-workspace.js","utf8");
  for(const id of ["fisica1","estadistica","fisica2"])assert.ok(app.includes(`"${id}"`)&&workspace.includes(`"${id}"`));
  assert.ok(workspace.includes("currentRecords()")&&workspace.includes("data-integrated-content"),"el índice debe incluir materiales personales");
  assert.ok(workspace.includes("data-integrated-highlight")&&workspace.includes("data-integrated-note"));
  assert.doesNotMatch(workspace,/INTEGRATED_SUBJECTS[^\n]*quimica_organica/);
});
