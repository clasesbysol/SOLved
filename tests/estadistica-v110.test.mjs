import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

const root=new URL("../",import.meta.url);
const read=path=>fs.readFileSync(new URL(path,root),"utf8");

const script=read("js/estadistica-v110.js");
const sw=read("sw.js");
const theory=read("content/subjects/estadistica/units/probabilidad-practica-1/estadistica-va-extension.html");
const lab=read("content/subjects/estadistica/units/probabilidad-practica-1/estadistica-lab-24-08.html");
const campus=read("content/subjects/estadistica/units/probabilidad-practica-1/estadistica-campus-exercises.html");
const pkg=JSON.parse(read("content/subjects/estadistica/units/probabilidad-practica-1/package.json"));
const catalog=JSON.parse(read("content/catalog.json"));

new vm.Script(script,{filename:"estadistica-v110.js"});
new vm.Script(sw,{filename:"sw.js"});

assert.equal(pkg.contentVersion,"1.1.0");
assert.equal(catalog.packages.find(item=>item.subjectId==="estadistica")?.contentVersion,"1.1.0");

const sectionIds=[
  "va-discreta","discretas-famosas","binomial","geometrica","hipergeometrica","poisson",
  "va-continua","densidad","distribucion-continua","percentiles","uniforme","laboratorio-24-08","videos-campus"
];
for(const id of sectionIds)assert.ok(theory.includes(`id="${id}"`),`Falta sección teórica ${id}`);

for(const id of ["lab-24-08-ej1","lab-24-08-ej2","lab-24-08-ej3","lab-24-08-ej4"]){
  assert.ok(lab.includes(`id="${id}"`),`Falta ejercicio ${id}`);
}
assert.ok(lab.includes("P(G=−100)=5/6"));
assert.ok(lab.includes("41/75"));
assert.ok(lab.includes("P(A|D)=0,40=40%"));
assert.ok(lab.includes("0,336=33,6%"));

for(const id of ["discretas-ej1","discretas-ej2","discretas-ej3","discretas-ej4","discretas-ej5","continuas-ej1","continuas-ej2","uniforme-ej1"]){
  assert.ok(campus.includes(`id="${id}"`),`Falta ejercicio de apunte ${id}`);
}
assert.ok(campus.includes("0,132953"));
assert.ok(campus.includes("3/23"));
assert.ok(campus.includes("0,924081"));
assert.ok(campus.includes("0,142877"));
assert.ok(campus.includes("1,32·10<sup>−9</sup>"));
assert.ok(campus.includes("c=2"));
assert.ok(campus.includes("21 árboles"));
assert.ok(campus.includes("5/8=62,5%"));

assert.ok(script.includes('INDEX=['));
assert.ok(script.includes('"videos-campus","21 · Material del campus"'));
assert.ok(script.includes('data-stats-lab-24-08'));
assert.ok(script.includes('estadistica-campus-exercises.html?v=1.1.0'));
assert.ok(sw.includes("injectEstadisticaTheory"));
assert.ok(sw.includes("estadistica-v110.js?v=1.1.0"));
assert.ok(sw.includes("estadistica-va-extension.html?v=1.1.0"));

console.log("Estadística v1.1.0: OK · 21 secciones + 12 ejercicios nuevos resueltos + índice funcional");
