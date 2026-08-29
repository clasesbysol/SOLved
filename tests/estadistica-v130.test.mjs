import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

const server=spawn(process.execPath,['node_modules/http-server/bin/http-server','-p','4174','-c-1','.'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
try{
  await sleep(1200);
  const browser=await chromium.launch({headless:true});
  const page=await browser.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4174/content/subjects/estadistica/units/probabilidad-practica-1/estadistica-integral.html?v=1.3.0#guide',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.documentElement.dataset.statsIntegralReady==='1',{timeout:15000});

  const tabs=(await page.locator('.tabs .tab').allTextContents()).map(x=>x.trim());
  assert.deepEqual(tabs,['Programa · Parcial 1','Teoría','Guías y ejercicios','Mapa mental','Glosario']);
  assert.equal(await page.locator('#guide.tab-panel.active').count(),1);
  assert.equal(await page.locator('#guide-p1 .exercise-card').count(),17);
  assert.equal(await page.locator('#guide-p2 .exercise-card').count(),10);
  assert.equal(await page.locator('#guide-discretas .stats-lab details').count(),5);
  assert.equal(await page.locator('#guide-continuas .stats-lab details').count(),3);
  assert.equal(await page.locator('#guide-lab .stats-lab details').count(),4);
  assert.equal(await page.locator('#guide .memory-guide').count(),5);

  const body=await page.locator('body').innerText();
  assert.match(body,/Se sabe que el comportamiento de la planta de lechuga obedece a las siguientes reglas/);
  assert.match(body,/El número de ciero tipo de bacterias en un estanque/);
  assert.match(body,/exactamente 3 de ellas contengas 4 o más bacterias/);
  assert.match(body,/El número de microorganismos por gramo de una cierta muestra de suelo diluida en agua destilada/);
  assert.match(body,/El diámetro D \(expresado en dm\) del tronco de cierta especie de árboles/);
  assert.match(body,/Un juego, llamado Suma Siete, consiste en tirar dos dados/);
  assert.equal(errors.length,0,errors.join('\n'));

  await page.locator('.tab[data-tab="program"]').click();
  assert.equal(await page.locator('#program.tab-panel.active').count(),1);
  await page.locator('.tab[data-tab="guide"]').click();
  const first=page.locator('#guide-p1 .exercise-card').first();
  await first.evaluate(el=>el.open=false);
  await first.locator('summary').click();
  assert.equal(await first.evaluate(el=>el.open),true);

  await browser.close();
  console.log('Estadística v1.3.0: OK');
} finally {
  server.kill('SIGTERM');
}
