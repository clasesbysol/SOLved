import {chromium} from '@playwright/test';
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';

const source=await readFile('js/developer-comments-v101.js','utf8');
const browser=await chromium.launch({headless:true});
try{
  const page=await browser.newPage({viewport:{width:1200,height:800}});
  await page.setContent(`<!doctype html><html><head><title>Estadística Aplicada</title></head><body>
    <span class="app-version">v-test</span>
    <h1 id="studyTitle">Estadística Aplicada</h1>
    <select id="studyUnit"><option value="probabilidad-practica-1" selected>Probabilidad</option></select>
    <nav id="studyTabs"><button class="active" data-tab="summary">Resumen</button></nav>
    <main class="main-content">
      <section id="variables-discretas"><h2>Variables aleatorias discretas</h2>
        <p id="definition">La función de distribución acumulada indica la probabilidad acumulada hasta un valor determinado.</p>
      </section>
    </main>
  </body></html>`);

  await page.evaluate(()=>{
    const rows=[];
    window.__DEV_ROWS=rows;
    window.LBT_DATA={SUBJECTS:[{id:'estadistica',name:'Estadística Aplicada'}]};
    window.LBT_CONTENT={getUnit:()=>({contentVersion:'1.5.0',path:'content/subjects/estadistica/units/probabilidad-practica-1/'})};
    const makeQuery=()=>{
      let action='select',payload=null;
      const q={
        select(){return q},
        order(){return q},
        limit(){return Promise.resolve({data:[...rows],error:null})},
        insert(value){action='insert';payload=value;return q},
        single(){
          if(action!=='insert')return Promise.resolve({data:null,error:null});
          const row={id:'comment-'+(rows.length+1),created_at:new Date().toISOString(),updated_at:new Date().toISOString(),...payload};
          rows.unshift(row);return Promise.resolve({data:row,error:null});
        },
        update(value){action='update';payload=value;return q},
        eq(key,value){
          if(action==='update'){const row=rows.find(item=>item[key]===value);if(row)Object.assign(row,payload);return Promise.resolve({data:null,error:null})}
          return q;
        }
      };
      return q;
    };
    window.SOLVED_AUTH={
      ready:Promise.resolve(),
      profile:()=>({role:'owner',sub:'owner-test'}),
      client:{from:()=>makeQuery()}
    };
  });

  await page.addScriptTag({content:source});
  const fab=page.locator('[data-capture]');
  await fab.waitFor({state:'visible'});
  await fab.click();
  await page.locator('#definition').click({position:{x:170,y:8}});
  await page.locator('[data-modal]').waitFor({state:'visible'});

  const preview=await page.locator('[data-preview]').innerText();
  assert.match(preview,/Variables aleatorias discretas/);
  assert.match(preview,/función de distribución acumulada/i);
  assert.match(preview,/content\/subjects\/estadistica\/units\/probabilidad-practica-1/);

  await page.locator('[data-instruction]').fill('Explicar esto con palabras simples y agregar un ejemplo acumulado.');
  await page.locator('[data-save]').click();
  await page.waitForFunction(()=>window.__DEV_ROWS.length===1);

  const row=await page.evaluate(()=>window.__DEV_ROWS[0]);
  assert.equal(row.subject_id,'estadistica');
  assert.equal(row.unit_id,'probabilidad-practica-1');
  assert.equal(row.tab_id,'summary');
  assert.equal(row.selector,'#definition');
  assert.match(row.focus_text,/distribución acumulada/i);
  assert.ok(row.heading_path.includes('Variables aleatorias discretas'));
  assert.match(row.repo_path_hint,/content\/subjects\/estadistica\/units\/probabilidad-practica-1/);
  assert.equal('x' in row,false);
  assert.equal('y' in row,false);
  assert.equal(typeof row.anchor.offset,'number');
  assert.match(row.anchor.exactQuote,/distribución acumulada/i);

  await page.waitForSelector('#definition .dev-marker');
  await page.locator('[data-badge]').click();
  await page.locator('[data-panel]').waitFor({state:'visible'});
  assert.match(await page.locator('[data-list]').innerText(),/Explicar esto con palabras simples/);

  await page.evaluate(()=>{
    const f=document.createElement('iframe');
    f.id='lateFrame';
    f.srcdoc='<!doctype html><html><body><section><h2>Densidad continua</h2><p id="lateText">La densidad reparte probabilidad sobre intervalos.</p></section></body></html>';
    document.body.append(f);
  });
  const frame=page.frameLocator('#lateFrame');
  await frame.locator('#lateText').waitFor();
  await fab.click();
  await frame.locator('#lateText').click();
  await page.locator('[data-modal]').waitFor({state:'visible'});
  assert.match(await page.locator('[data-preview]').innerText(),/densidad reparte probabilidad/i);

  console.log('Comentarios dev v1.0.1: OK · ancla semántica + sin coordenadas + iframe tardío');
} finally {
  await browser.close();
}
