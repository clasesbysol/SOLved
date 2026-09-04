import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

const PORT=4176;
const ROOT=`http://127.0.0.1:${PORT}`;
const UNIT='content/subjects/estadistica/units/probabilidad-practica-1';
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function waitServer(){for(let i=0;i<80;i++){try{const r=await fetch(`${ROOT}/index.html`);if(r.ok)return}catch{}await sleep(125)}throw new Error('No inició el servidor de prueba de Estadística')}
const server=spawn('pnpm',['exec','http-server','-p',String(PORT),'-c-1','.'],{stdio:'ignore'});
let browser;
try{
  await waitServer();
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  await page.goto(`${ROOT}/${UNIT}/estadistica-integral.html?v=1.4.0#ejercicios-estadistica`,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.documentElement.dataset.statsIntegralReady==='1',null,{timeout:30000});

  assert.equal(await page.locator('.qb-doc-shell').count(),1);
  assert.equal(await page.locator('#qbSidebar.qb-sidebar').count(),1);
  assert.equal(await page.locator('#qbGlobalSearch').getAttribute('placeholder'),'Buscar en el resumen…');
  assert.equal(await page.locator('#summaryIndex').count(),1);
  assert.match(await page.locator('#summaryIndex').innerText(),/Mapa de métodos/);
  assert.match(await page.locator('#summaryIndex').innerText(),/Ejercicios/);
  assert.match(await page.locator('.qb-sidebar-tools').innerText(),/Apariencia/);
  assert.equal(await page.locator('[data-qb-hue]').count(),5);
  assert.match(await page.locator('#qbThemeToggle').innerText(),/Cambiar claro \/ oscuro/);

  const indexText=await page.locator('#summaryIndex').innerText();
  for(const heading of ['Técnicas de conteo','Probabilidad condicional','Variables aleatorias discretas','Binomial','Poisson','Distribución acumulada continua'])assert.match(indexText,new RegExp(heading));
  assert.equal(await page.locator('.qb-chapter').count(),22);
  assert.equal(await page.locator('#guide-p1 .exercise-card').count(),17);
  assert.equal(await page.locator('#guide-p2 .exercise-card').count(),10);
  assert.equal(await page.locator('#guide-discretas .exercise-card').count(),5);
  assert.equal(await page.locator('#guide-continuas .exercise-card').count(),3);
  assert.equal(await page.locator('#guide-lab .exercise-card').count(),4);
  assert.equal(await page.locator('.exercise-card').count(),39);
  assert.equal(await page.locator('#stats-guide-memory-maps .qbi-memory-guide').count(),5);

  const memoryHeading=await page.locator('.stats-memory-heading').innerText();
  assert.match(memoryHeading,/Mapas mentales para memorizar las guías/);
  assert.match(memoryHeading,/No siguen el orden de los ejercicios: reagrupan la teoría por conexiones para que una idea lleve a la siguiente\./);
  const body=await page.locator('body').innerText();
  assert.match(body,/ESTADÍSTICA APLICADA · RESUMEN INTEGRADO/);
  assert.match(body,/39 ejercicios de fuente/);
  assert.match(body,/5 mapas para memorizar/);
  assert.match(body,/Primero reconocé la historia, después elegí la fórmula/);
  assert.match(body,/Las técnicas de conteo permiten averiguar cuántos resultados distintos puede producir una situación/);

  const first=page.locator('#guide-p1 .exercise-card').first();
  await first.evaluate(el=>el.open=false);
  await first.locator('summary').click();
  assert.equal(await first.evaluate(el=>el.open),true);

  console.log('Estadística v1.4.0: OK · diseño QBI vigente · 22 capítulos · 39 ejercicios · 5 mapas conceptuales');
} finally { await browser?.close().catch(()=>{}); server.kill('SIGTERM'); }