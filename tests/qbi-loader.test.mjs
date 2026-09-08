import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';

const PORT=4174;
const ROOT=`http://127.0.0.1:${PORT}`;
const UNIT='content/subjects/quimica_biologica1/units/proteinas-i';
const VERSION='4.6.4';
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));

async function waitServer(){
  for(let i=0;i<80;i++){
    try{const response=await fetch(`${ROOT}/index.html`);if(response.ok)return}catch{}
    await sleep(125);
  }
  throw new Error('No inició el servidor de prueba');
}

function expectedGlucidosLinks(){return Array.from({length:13},(_,i)=>`#cap${29+i}`)}

const server=spawn('pnpm',['exec','http-server','-p',String(PORT),'-c-1','.'],{stdio:'ignore'});
let browser;
try{
  await waitServer();
  browser=await chromium.launch({headless:true});

  {
    const page=await browser.newPage();
    const pageErrors=[];
    page.on('pageerror',error=>pageErrors.push(String(error)));
    await page.goto(`${ROOT}/${UNIT}/original.html?v=${VERSION}`,{waitUntil:'domcontentloaded'});
    await page.waitForSelector('#qbi-guide-memory-maps',{timeout:30000});
    await page.waitForSelector('#cap-tp2',{timeout:30000});
    await page.waitForSelector('#qbi-mapa-integral',{timeout:30000});
    await page.waitForSelector('#cap28',{timeout:30000});
    await page.waitForSelector('#cap41',{timeout:30000});
    await page.waitForFunction(()=>{
      const nav=document.querySelector('.qb-summary .qb-sidebar #summaryIndex');
      return !!nav&&Array.from({length:13},(_,i)=>29+i).every(n=>nav.querySelector(`a[href="#cap${n}"]`));
    },null,{timeout:15000});
    const result=await page.evaluate(()=>{
      const visibleIndex=document.querySelector('.qb-summary .qb-sidebar #summaryIndex');
      return {
        text:document.body.innerText,
        maps:document.querySelectorAll('#qbi-guide-memory-maps details.qbi-memory-guide').length,
        integratedChapters:document.querySelectorAll('#qbi-mapa-integral .qbi-integrated-chapter').length,
        notes:Boolean(document.querySelector('[data-add-note]')),
        searchNext:Boolean(document.querySelector('[data-search-next]')),
        glucidos:document.querySelectorAll('.qbi-glu-native-chapter').length,
        glucidosIndex:visibleIndex?.querySelectorAll('[data-qbi-glucidos-index="1"]').length||0,
        visibleGlucidosLinks:[...(visibleIndex?.querySelectorAll('a')||[])].map(a=>a.getAttribute('href')).filter(href=>/^#cap(?:29|3\d|4[01])$/.test(href||'')),
        indexSync:document.documentElement.dataset.qbiIndexSync||'',
        cap41:Boolean(document.getElementById('cap41'))
      };
    });
    if(result.text.includes('No se pudo abrir el resumen'))throw new Error('El loader directo cayó en la pantalla de error');
    if(result.text.includes('qbiFetchBundle')||result.text.includes('qbiPrepareDocument'))throw new Error('Se imprimió JavaScript del loader como texto');
    if(result.maps!==8)throw new Error(`Se esperaban 8 mapas de guía y aparecieron ${result.maps}`);
    if(result.integratedChapters<15||!result.notes||!result.searchNext)throw new Error('La interfaz de materia integrada no quedó completa');
    if(!result.text.includes('Trabajo Práctico Nº 2 · Puesta a punto y cinética enzimática'))throw new Error('TP2 no apareció como capítulo práctico independiente');
    if(!result.text.includes('Enzimas III')||!result.text.includes('Dixon'))throw new Error('El resumen definitivo perdió contenido posterior al TP2');
    if(result.glucidos!==13||result.glucidosIndex!==13||!result.cap41)throw new Error(`Glúcidos I incompleto: capítulos=${result.glucidos}, índice visible=${result.glucidosIndex}, cap41=${result.cap41}`);
    if(JSON.stringify(result.visibleGlucidosLinks)!==JSON.stringify(expectedGlucidosLinks()))throw new Error(`El índice lateral visible no contiene 29–41 en orden: ${result.visibleGlucidosLinks.join(', ')}`);
    if(result.indexSync!==VERSION)throw new Error(`El sincronizador del índice lateral no quedó activo: ${result.indexSync||'sin versión'}`);
    const before=new URL(page.url()).pathname;
    await page.click('.qb-summary .qb-sidebar #summaryIndex a[href="#cap20"]');
    await page.waitForTimeout(300);
    const after20=new URL(page.url()).pathname;
    await page.click('.qb-summary .qb-sidebar #summaryIndex a[href="#cap41"]');
    await page.waitForTimeout(300);
    const after41=new URL(page.url()).pathname;
    if(before!==after20||before!==after41)throw new Error(`La navegación por fragmentos cambió de documento: ${before} -> ${after20} -> ${after41}`);
    if(pageErrors.length)throw new Error(`Errores de página: ${pageErrors.join(' | ')}`);
    await page.close();
  }

  {
    const page=await browser.newPage();
    await page.goto(`${ROOT}/index.html`,{waitUntil:'domcontentloaded'});
    await page.evaluate(({root,unit,version})=>{
      document.body.innerHTML='';
      const frame=document.createElement('iframe');
      frame.className='rich-document';
      frame.title='Química Biológica';
      frame.setAttribute('sandbox','allow-scripts allow-same-origin');
      frame.src=`${root}/${unit}/original.html?v=${version}`;
      document.body.append(frame);
    },{root:ROOT,unit:UNIT,version:VERSION});
    await page.waitForFunction(()=>{
      const frame=document.querySelector('iframe.rich-document');
      try{
        const doc=frame?.contentDocument;
        const nav=doc?.querySelector('.qb-summary .qb-sidebar #summaryIndex');
        return doc?.querySelectorAll('#qbi-guide-memory-maps details.qbi-memory-guide').length===8&&!!doc.querySelector('#qbi-mapa-integral')&&!!doc.querySelector('#cap41')&&!!nav&&Array.from({length:13},(_,i)=>29+i).every(n=>nav.querySelector(`a[href="#cap${n}"]`));
      }catch{return false}
    },null,{timeout:30000});
    const state=await page.evaluate(()=>{
      const frame=document.querySelector('iframe.rich-document');
      const doc=frame.contentDocument;
      const nav=doc?.querySelector('.qb-summary .qb-sidebar #summaryIndex');
      return {
        sandbox:frame.getAttribute('sandbox'),
        text:doc?.body?.innerText||'',
        glucidos:doc?.querySelectorAll('.qbi-glu-native-chapter').length||0,
        index:nav?.querySelectorAll('[data-qbi-glucidos-index="1"]').length||0,
        visibleGlucidosLinks:[...(nav?.querySelectorAll('a')||[])].map(a=>a.getAttribute('href')).filter(href=>/^#cap(?:29|3\d|4[01])$/.test(href||'')),
        indexSync:doc?.documentElement?.dataset?.qbiIndexSync||''
      };
    });
    if(!state.sandbox.includes('allow-same-origin'))throw new Error('El iframe de SOLved no tiene allow-same-origin');
    if(state.text.includes('No se pudo abrir el resumen'))throw new Error('El loader falló dentro del iframe de SOLved');
    if(state.text.includes('qbiFetchBundle')||state.text.includes('qbiPrepareDocument'))throw new Error('El iframe imprimió JavaScript del loader como texto');
    if(state.glucidos!==13||state.index!==13)throw new Error(`Glúcidos I no quedó completo dentro de SOLved: capítulos=${state.glucidos}, índice visible=${state.index}`);
    if(JSON.stringify(state.visibleGlucidosLinks)!==JSON.stringify(expectedGlucidosLinks()))throw new Error(`El iframe de SOLved no muestra 29–41 en el lateral: ${state.visibleGlucidosLinks.join(', ')}`);
    if(state.indexSync!==VERSION)throw new Error(`El iframe de SOLved no activó el sincronizador del índice: ${state.indexSync||'sin versión'}`);
    await page.close();
  }

  console.log('QBI loader: OK directo + iframe SOLved + índice lateral visible 1–41 + navegación por fragmentos');
}finally{
  await browser?.close().catch(()=>{});
  server.kill('SIGTERM');
}
