import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';

const expected={
  fisica1:{unit:'resumen-integral',version:'1.4.0',files:['summary.html','exercises.html','original.html','map.json','glossary.json']},
  quimica_organica:{unit:'resumen-integral',version:'0.7.0',files:['original.html','organic-mind-map.json','organic-cards-v2.json','exercises.json','glossary.json']},
  estadistica:{unit:'probabilidad-practica-1',version:'1.5.0',files:['estadistica-integral.html','estadistica-lab-24-08.html','estadistica-campus-exercises.html','estadistica-va-extension.html','exercises.json','glossary.json']},
  analisis2:{unit:'materia-integrada',version:'1.0.0',files:['integrated.html','map.json','glossary.json']}
};

test('las materias integradas conservan sus fuentes y usan una portada única',async()=>{
  const catalog=JSON.parse(await readFile('content/catalog.json','utf8'));
  for(const [subjectId,definition] of Object.entries(expected)){
    const base=`content/subjects/${subjectId}/units/${definition.unit}/`;
    const catalogItem=catalog.packages.find(item=>item.subjectId===subjectId&&item.unitId===definition.unit);
    assert.equal(catalogItem?.contentVersion,definition.version,`${subjectId}: versión de catálogo`);
    const manifest=JSON.parse(await readFile(base+'package.json','utf8'));
    const rich=JSON.parse(await readFile(base+'rich.json','utf8'));
    assert.equal(manifest.contentVersion,definition.version,`${subjectId}: versión de paquete`);
    assert.equal(rich.document,'integrated.html',`${subjectId}: documento integrado`);
    await access(base+'integrated.html');
    for(const file of definition.files)await access(base+file);
  }
});

test('el modo integrado incluye las cinco materias y no elimina los originales',async()=>{
  const app=await readFile('js/app.js','utf8'),shell=await readFile('js/integrated-subject-shell.js','utf8');
  for(const id of ['quimica_biologica1','fisica1','quimica_organica','estadistica','analisis2'])assert.ok(app.includes(`"${id}"`),`falta ${id}`);
  for(const feature of ['is-nav','is-search','data-highlight','data-note','highlightKey','localStorage'])assert.ok(shell.includes(feature),`falta ${feature}`);
});
