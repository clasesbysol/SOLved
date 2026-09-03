import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';

const PORT=4174;
const ROOT=`http://127.0.0.1:${PORT}`;
const UNIT='content/subjects/quimica_biologica1/units/proteinas-i';
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));

async function waitServer(){
  for(let i=0;i<80;i++){
    try{const response=await fetch(`${ROOT}/index.html`);if(response.ok)return}catch{}
    await sleep(125);
  }
  throw new Error('No inició el servidor de prueba');
}

const server=spawn('pnpm',['exec','http-server','-p',String(PORT),'-c-1','.'],{stdio:'ignore'});
let browser;
try{
  await waitServer();
  browser=await chromium.launch({headless:true});

  {
    const page=await browser.newPage();
    const pageErrors=[];
    page.on('pageerror',error=>pageErrors.push(String(error)));
    await page.goto(`${ROOT}/${UNIT}/original.html?v=4.0.4`,{waitUntil:'domcontentloaded'});
    await page.waitForSelector('#qbi-guide-memory-maps',{timeout:30000});
    const result=await page.evaluate(()=>({
      text:document.body.innerText,
      maps:document.querySelectorAll('#qbi-guide-memory-maps details.qbi-memory-guide').length
    }));
    if(result.text.includes('No se pudo abrir el resumen'))throw new Error('El loader directo cayó en la pantalla de error');
    if(result.text.includes('qbiFetchBundle')||result.text.includes('qbiPrepareDocument'))throw new Error('Se imprimió JavaScript del loader como texto');
    if(result.maps!==2)throw new Error(`Se esperaban 2 mapas de guía y aparecieron ${result.maps}`);
    if(!result.text.includes('Trabajo Práctico Nº 2 · Puesta a punto y cinética enzimática'))throw new Error('TP2 no apareció como capítulo práctico independiente');
    if(!result.text.includes('Enzimas III')||!result.text.includes('Dixon'))throw new Error('El resumen definitivo perdió contenido posterior al TP2');
    if(pageErrors.length)throw new Error(`Errores de página: ${pageErrors.join(' | ')}`);
    await page.close();
  }

  {
    const page=await browser.newPage();
    await page.goto(`${ROOT}/index.html`,{waitUntil:'domcontentloaded'});
    await page.addScriptTag({url:`${ROOT}/js/qbi-official-frame-fix.js?v=1.0.0`});
    await page.evaluate(async ({unit})=>{
      document.body.innerHTML='';
      const source=await fetch(`${unit}/original.html?v=4.0.4`,{cache:'no-store'}).then(response=>response.text());
      const frame=document.createElement('iframe');
      frame.className='imported-html-frame';
      frame.setAttribute('sandbox','allow-scripts allow-popups allow-popups-to-escape-sandbox');
      document.body.append(frame);
      frame.srcdoc=source;
    },{unit:UNIT});
    await page.waitForFunction(()=>document.querySelector('iframe.imported-html-frame')?.sandbox.contains('allow-same-origin'),null,{timeout:10000});
    await page.waitForFunction(()=>{
      const frame=document.querySelector('iframe.imported-html-frame');
      try{return frame?.contentDocument?.querySelectorAll('#qbi-guide-memory-maps details.qbi-memory-guide').length===2}catch{return false}
    },null,{timeout:30000});
    const state=await page.evaluate(()=>{
      const frame=document.querySelector('iframe.imported-html-frame');
      return {sandbox:frame.getAttribute('sandbox'),text:frame.contentDocument?.body?.innerText||''};
    });
    if(!state.sandbox.includes('allow-same-origin'))throw new Error('El iframe oficial siguió aislado sin allow-same-origin');
    if(state.text.includes('No se pudo abrir el resumen'))throw new Error('El loader falló dentro del iframe de SOLved');
    if(state.text.includes('qbiFetchBundle')||state.text.includes('qbiPrepareDocument'))throw new Error('El iframe imprimió JavaScript del loader como texto');
    await page.close();
  }

  console.log('QBI loader: OK directo + sandbox SOLved + 2 mapas');
}finally{
  await browser?.close().catch(()=>{});
  server.kill('SIGTERM');
}
