import test from "node:test";
import assert from "node:assert/strict";
import {access,readFile,stat} from "node:fs/promises";
import {gunzipSync} from "node:zlib";

const physics="content/subjects/fisica1/units/resumen-integral/";
const statistics="content/subjects/estadistica/units/probabilidad-practica-1/";

test("Física conserva el HTML integral, las fórmulas y los ejercicios",async()=>{
  const manifest=JSON.parse(await readFile(physics+"package.json","utf8"));
  const rich=JSON.parse(await readFile(physics+"rich.json","utf8"));
  assert.equal(manifest.contentVersion,"1.4.0");
  assert.deepEqual([rich.document,rich.exerciseDocument,rich.formulaDocument],["summary.html","summary.html","summary.html"]);
  assert.ok((await stat(physics+"summary.html")).size>700_000,"el documento único fue recortado");
  const html=await readFile(physics+"summary.html","utf8");
  for(const expected of ["FORMULARIO DE FÍSICA","Ejercicios del primer parcial","Parciales resueltos","7 exámenes y 28 ejercicios completos","<physics-partials>"])assert.match(html,new RegExp(expected));
  for(const retired of ["exercises.html","original.html","parciales.html","physics-integrated-partials.js"]){
    await assert.rejects(access(physics+retired),`${retired} ya no debe existir`);
  }
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

test("el formato integrado usa sólo el índice interno coloreado",async()=>{
  const app=await readFile("js/app.js","utf8"),workspace=await readFile("js/study-workspace.js","utf8");
  for(const id of ["fisica1","estadistica","fisica2","analisis1"])assert.ok(app.includes(`"${id}"`)&&workspace.includes(`"${id}"`));
  assert.ok(workspace.includes('root.innerHTML=panel("left",state)'),"no debe renderizarse un segundo índice blanco");
  assert.ok(workspace.includes('state.left="tab:summary"'),"la materia integrada debe abrir su HTML integral");
  assert.doesNotMatch(workspace,/INTEGRATED_SUBJECTS[^\n]*quimica_organica/);
});

test("las navegaciones internas no vuelven a cargar la app dentro del HTML",async()=>{
  const sw=await readFile("sw.js","utf8");
  assert.match(sw,/internalDocument=url\.pathname\.includes\("\/content\/"\)/);
  assert.match(sw,/internalDocument\?cacheFirstAndRefresh\(request\):injectAppShell/);
});

test("Física integra los siete parciales sin iframe ni cargador central",async()=>{
  const html=await readFile(physics+"summary.html","utf8");
  assert.doesNotMatch(html,/physics-partials-frame|parciales\.html|Cargando parciales resueltos/);
  assert.match(html,/customElements\.define\('physics-partials'/);
});
