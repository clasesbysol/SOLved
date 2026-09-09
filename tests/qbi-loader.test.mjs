import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';

const PORT=4174;
const ROOT=`http://127.0.0.1:${PORT}`;
const UNIT='content/subjects/quimica_biologica1/units/proteinas-i';
const VERSION='4.7.0';
const STATIC=`${UNIT}/qbi-static.html?v=${VERSION}`;
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));

async function waitServer(){
  for(let i=0;i<100;i++){
    try{const response=await fetch(`${ROOT}/index.html`);if(response.ok)return}catch{}
    await sleep(125);
  }
  throw new Error('No inició el servidor de prueba');
}

function auditScript(){
  const nav=document.querySelector('.qb-summary .qb-sidebar #summaryIndex')||document.querySelector('#summaryIndex');
  return {
    version:document.documentElement.dataset.qbiStaticVersion||'',
    integrity:document.documentElement.dataset.qbiStaticIntegrity||'',
    chapters:Array.from({length:41},(_,i)=>i+1).filter(n=>document.getElementById(`cap${n}`)).length,
    links:Array.from({length:41},(_,i)=>i+1).filter(n=>nav?.querySelector(`a[href="#cap${n}"]`)).length,
    glucidos:document.querySelectorAll('.qbi-glu-native-chapter').length,
    text:document.body.innerText,
    path:location.pathname
  };
}

function assertComplete(state,label){
  if(state.version!==VERSION)throw new Error(`${label}: versión estática=${state.version||'ausente'}`);
  if(state.chapters!==41)throw new Error(`${label}: capítulos=${state.chapters}/41`);
  if(state.links!==41)throw new Error(`${label}: índice=${state.links}/41`);
  if(state.glucidos!==13)throw new Error(`${label}: capítulos de Glúcidos=${state.glucidos}/13`);
  if(!state.text.includes('Enzimas III')||!state.text.includes('Dixon'))throw new Error(`${label}: faltó contenido de Enzimas III`);
  if(!state.text.includes('Panorama general: qué son los glúcidos y por qué importan'))throw new Error(`${label}: faltó Glúcidos I`);
}

const server=spawn('pnpm',['exec','http-server','-p',String(PORT),'-c-1','.'],{stdio:'ignore'});
let browser;
try{
  await waitServer();
  browser=await chromium.launch({headless:true});

  // 1) La fuente publicada abre completa desde el primer render y NO cambia sola con el tiempo.
  {
    const page=await browser.newPage();
    const pageErrors=[];
    page.on('pageerror',error=>pageErrors.push(String(error)));
    await page.goto(`${ROOT}/${STATIC}`,{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>document.documentElement.dataset.qbiStaticVersion==='4.7.0'&&!!document.getElementById('cap41'),null,{timeout:30000});
    const first=await page.evaluate(auditScript);
    assertComplete(first,'QBI estático inicial');

    // Reproduce el bug reportado: antes 19 -> 28 -> 41 -> 28. Ahora la estructura debe ser idéntica.
    await page.waitForTimeout(8000);
    const later=await page.evaluate(auditScript);
    assertComplete(later,'QBI estático después de 8 s');
    if(first.chapters!==later.chapters||first.links!==later.links)throw new Error(`QBI cambió solo: ${first.chapters}/${first.links} -> ${later.chapters}/${later.links}`);

    const before=new URL(page.url()).pathname;
    await page.click('.qb-summary .qb-sidebar #summaryIndex a[href="#cap20"]');
    await page.waitForTimeout(150);
    await page.click('.qb-summary .qb-sidebar #summaryIndex a[href="#cap41"]');
    await page.waitForTimeout(150);
    const after=new URL(page.url()).pathname;
    if(before!==after||!after.endsWith('/qbi-static.html'))throw new Error(`El índice salió del documento estático: ${before} -> ${after}`);
    if(pageErrors.length)throw new Error(`Errores de página en QBI estático: ${pageErrors.join(' | ')}`);
    await page.close();
  }

  // 2) Defensa contra caché viejo: si el shell recibe un iframe apuntando al antiguo original.html,
  // el frame-fix lo reemplaza por la única fuente canónica qbi-static.html 4.7.0.
  {
    const page=await browser.newPage();
    await page.goto(`${ROOT}/index.html`,{waitUntil:'domcontentloaded'});
    await page.waitForSelector('script[data-solved-qbi-frame-fix]',{timeout:10000});
    await page.evaluate(({root,unit})=>{
      const frame=document.createElement('iframe');
      frame.id='qbi-old-cache-probe';
      frame.className='rich-document';
      frame.title='Química Biológica';
      frame.setAttribute('sandbox','allow-scripts allow-same-origin');
      frame.src=`${root}/${unit}/original.html?v=4.6.4`;
      document.body.append(frame);
    },{root:ROOT,unit:UNIT});
    await page.waitForFunction(()=>{
      const frame=document.getElementById('qbi-old-cache-probe');
      return frame?.src.includes('/qbi-static.html?v=4.7.0');
    },null,{timeout:15000});
    await page.waitForFunction(()=>{
      const frame=document.getElementById('qbi-old-cache-probe');
      try{
        const doc=frame?.contentDocument;
        const nav=doc?.querySelector('.qb-summary .qb-sidebar #summaryIndex')||doc?.querySelector('#summaryIndex');
        return !!doc?.getElementById('cap41')&&Array.from({length:41},(_,i)=>i+1).every(n=>doc.getElementById(`cap${n}`)&&nav?.querySelector(`a[href="#cap${n}"]`));
      }catch{return false}
    },null,{timeout:30000});
    const state=await page.evaluate(()=>{
      const frame=document.getElementById('qbi-old-cache-probe');
      const doc=frame.contentDocument;
      const nav=doc.querySelector('.qb-summary .qb-sidebar #summaryIndex')||doc.querySelector('#summaryIndex');
      return {
        src:frame.src,
        chapters:Array.from({length:41},(_,i)=>i+1).filter(n=>doc.getElementById(`cap${n}`)).length,
        links:Array.from({length:41},(_,i)=>i+1).filter(n=>nav?.querySelector(`a[href="#cap${n}"]`)).length
      };
    });
    if(!state.src.endsWith('/qbi-static.html?v=4.7.0')||state.chapters!==41||state.links!==41)throw new Error(`El shell no corrigió la copia vieja: ${JSON.stringify(state)}`);
    await page.waitForTimeout(5000);
    const stable=await page.evaluate(()=>{
      const doc=document.getElementById('qbi-old-cache-probe').contentDocument;
      const nav=doc.querySelector('.qb-summary .qb-sidebar #summaryIndex')||doc.querySelector('#summaryIndex');
      return {chapters:Array.from({length:41},(_,i)=>i+1).filter(n=>doc.getElementById(`cap${n}`)).length,links:Array.from({length:41},(_,i)=>i+1).filter(n=>nav?.querySelector(`a[href="#cap${n}"]`)).length};
    });
    if(stable.chapters!==41||stable.links!==41)throw new Error(`QBI volvió para atrás dentro del shell: ${JSON.stringify(stable)}`);
    await page.close();
  }

  console.log('QBI 4.7.0: estático desde el primer render, índice 1–41 estable y defensa contra caché viejo OK');
}finally{
  await browser?.close().catch(()=>{});
  server.kill('SIGTERM');
}
