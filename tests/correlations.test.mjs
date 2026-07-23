import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const code=fs.readFileSync(new URL('../js/data.js',import.meta.url),'utf8');
const context={window:{}};
vm.createContext(context);
vm.runInContext(code,context);
const byId=Object.fromEntries(context.window.LBT_DATA.SUBJECTS.map(s=>[s.id,s]));
const expected={
  intro_biotec:{c:['quimica_general','cts'],f:[],r:['quimica_general','cts']},
  biologia2:{c:['quimica_general','biologia1'],f:[],r:['quimica_general','biologia1']},
  quimica_inorganica:{c:['quimica_general','analisis1'],f:[],r:['quimica_general','analisis1']},
  quimica_organica:{c:['quimica_inorganica'],f:['quimica_general','analisis1'],r:['quimica_inorganica']},
  analisis2:{c:['analisis1'],f:[],r:['analisis1']},
  fisica1:{c:['analisis1'],f:[],r:['analisis1']},
  fisica2:{c:['analisis2','fisica1'],f:['analisis1'],r:['analisis2','fisica1']},
  biologia3:{c:['biologia2'],f:['quimica_general','biologia1'],r:['biologia2']},
  estadistica:{c:['analisis1','algebra'],f:[],r:['analisis1','algebra']},
  quimica_biologica1:{c:['quimica_organica','biologia2'],f:['quimica_general','analisis1','biologia1'],r:['quimica_organica','biologia2']},
  fisicoquimica:{c:['quimica_inorganica','fisica2'],f:['quimica_general','analisis1','analisis2','fisica1'],r:['quimica_inorganica','fisica2']},
  genetica_general:{c:['biologia2','estadistica','quimica_biologica1'],f:['quimica_general','biologia1','analisis1','algebra','quimica_organica'],r:['biologia2','estadistica','quimica_biologica1']},
  quimica_biologica2:{c:['quimica_biologica1'],f:['quimica_organica','biologia2'],r:['quimica_biologica1']},
  biologia4:{c:['biologia2','quimica_organica'],f:['quimica_inorganica','quimica_general','biologia1'],r:['biologia2','quimica_organica']},
  microbiologia:{c:['intro_biotec','quimica_biologica2','genetica_general'],f:['cts','quimica_biologica1','biologia2','estadistica'],r:['intro_biotec','quimica_biologica2','genetica_general']},
  biologia_celular:{c:['quimica_biologica2','biologia3'],f:['quimica_biologica1','biologia2'],r:['quimica_biologica2','biologia3']},
  bioinformatica:{c:['estadistica','biologia2'],f:['analisis1','algebra','quimica_general','biologia1'],r:['estadistica','biologia2']},
  inmunologia_basica:{c:['quimica_biologica2','genetica_general'],f:['quimica_biologica1','biologia2','estadistica'],r:['quimica_biologica2','genetica_general']},
  genetica_molecular:{c:['genetica_general','microbiologia','biologia_celular'],f:['biologia2','estadistica','quimica_biologica1','intro_biotec','quimica_biologica2','genetica_general','biologia3'],r:['genetica_general','microbiologia','biologia_celular']},
  quimica_analitica:{c:['quimica_organica','estadistica','fisicoquimica'],f:['quimica_inorganica','analisis1','algebra','fisica2'],r:['quimica_organica','estadistica','fisicoquimica']},
  inmunologia_molecular:{c:['inmunologia_basica','genetica_molecular'],f:['quimica_biologica2','genetica_general','microbiologia','biologia_celular'],r:['inmunologia_basica','genetica_molecular']},
  biotecnologia_animal:{c:['genetica_molecular'],f:['genetica_general','microbiologia','biologia_celular'],r:['genetica_molecular']},
  bioquimica_proteinas:{c:['quimica_biologica2','quimica_analitica','fisicoquimica'],f:['quimica_organica','estadistica','quimica_biologica1','quimica_inorganica','fisica2'],r:['quimica_biologica2','quimica_analitica','fisicoquimica']},
  biotecnologia_vegetal:{c:['biologia4','bioinformatica','genetica_molecular'],f:['genetica_general','microbiologia','biologia_celular','biologia2','quimica_organica','estadistica'],r:['biologia4','bioinformatica','genetica_molecular']},
  bioprocesos:{c:['microbiologia','genetica_molecular','fisicoquimica'],f:['genetica_general','microbiologia','biologia_celular','intro_biotec','quimica_biologica2','quimica_inorganica','fisica2'],r:['microbiologia','genetica_molecular','fisicoquimica']},
  analisis_biomoleculas:{c:['quimica_analitica','inmunologia_molecular','bioinformatica'],f:['quimica_organica','estadistica','fisicoquimica','inmunologia_basica','genetica_molecular','biologia2'],r:['quimica_analitica','inmunologia_molecular','bioinformatica']}
};
for(const [id,e] of Object.entries(expected)){
  const s=byId[id];
  assert.ok(s,`Falta ${id}`);
  assert.deepEqual(Array.from(s.courseReqCursadas||[]),e.c,`${id}: cursadas para cursar`);
  assert.deepEqual(Array.from(s.courseReqFinals||[]),e.f,`${id}: finales para cursar`);
  assert.deepEqual(Array.from(s.finalReqFinals||[]),e.r,`${id}: finales para rendir`);
}
assert.equal(byId.proyectos_biotecnologicos.allCursadasRequired,true,'Proyectos debe exigir TODAS las cursadas');
console.log(`OK: ${Object.keys(expected).length} materias auditadas + Proyectos Biotecnológicos.`);
