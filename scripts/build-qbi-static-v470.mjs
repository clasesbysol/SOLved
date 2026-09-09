import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';

const PORT=4177;
const ROOT=`http://127.0.0.1:${PORT}`;
const UNIT='content/subjects/quimica_biologica1/units/proteinas-i';
const SOURCE_VERSION='4.6.4';
const STATIC_VERSION='4.7.0';
const FRAME_FIX_VERSION='1.2.0';
const STATIC_FILE='qbi-static.html';
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));

async function waitServer(){
  for(let i=0;i<120;i++){
    try{const response=await fetch(`${ROOT}/index.html`,{cache:'no-store'});if(response.ok)return}catch{}
    await sleep(125);
  }
  throw new Error('No inició el servidor local para compilar QBI');
}

const server=spawn('pnpm',['exec','http-server','-p',String(PORT),'-c-1','.'],{stdio:'inherit'});
let browser;
try{
  await waitServer();
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const pageErrors=[];
  page.on('pageerror',error=>pageErrors.push(String(error)));
  await page.goto(`${ROOT}/${UNIT}/original.html?v=${SOURCE_VERSION}`,{waitUntil:'domcontentloaded'});

  // Esperamos únicamente la FUENTE académica completa. El bug que estamos eliminando es
  // precisamente que el índice dinámico vuelve 41 -> 28; no usamos ese índice inestable
  // como requisito para generar la versión final.
  await page.waitForFunction(()=>Array.from({length:41},(_,i)=>i+1).every(n=>document.getElementById(`cap${n}`)),null,{timeout:45000});

  // Verificamos que los capítulos no sean una aparición fugaz. Si el cuerpo desaparece,
  // abortamos en vez de publicar una fotografía incompleta.
  for(const delay of [700,1400,2600]){
    await page.waitForTimeout(delay);
    const chapters=await page.evaluate(()=>Array.from({length:41},(_,i)=>i+1).filter(n=>document.getElementById(`cap${n}`)).length);
    if(chapters!==41)throw new Error(`QBI perdió capítulos antes de compilar: quedaron ${chapters}/41`);
  }
  if(pageErrors.length)throw new Error(`Errores en QBI antes de compilar: ${pageErrors.join(' | ')}`);

  // Todo esto ocurre dentro de UNA tarea JS. Reconstruimos el índice y serializamos antes
  // de que los MutationObserver/intervalos viejos tengan oportunidad de volver a tocarlo.
  const html=await page.evaluate(version=>{
    const structural=['qbi-enzimas3-integration.js','qbi-glucidos-force-463.js','qbi-index-sync-464.js'];
    document.querySelectorAll('script[src]').forEach(script=>{
      const src=script.getAttribute('src')||'';
      if(structural.some(name=>src.includes(name)))script.remove();
    });

    document.documentElement.dataset.qbiStatic='1';
    document.documentElement.dataset.qbiStaticVersion=version;
    document.documentElement.dataset.qbiStableReady='1';
    let meta=document.querySelector('meta[name="qbi-static-version"]');
    if(!meta){meta=document.createElement('meta');meta.name='qbi-static-version';document.head.append(meta)}
    meta.content=version;

    const badge=[...document.querySelectorAll('.qb-hero-badges span')].find(node=>/cap[ií]tulos/i.test(node.textContent||''));
    if(badge)badge.textContent='41 capítulos';

    const nav=document.querySelector('.qb-summary .qb-sidebar #summaryIndex')||document.querySelector('#summaryIndex');
    if(!nav)throw new Error('No se encontró el índice lateral canónico');
    const cap28=nav.querySelector('a[href="#cap28"]');
    if(!cap28)throw new Error('No se encontró cap28 en el índice base');

    // Limpiamos cualquier intento parcial 29–41 y lo construimos una sola vez a partir de
    // los H2 reales ya cargados. Conservamos TP1/TP2 y cualquier acceso especial existente.
    for(let n=29;n<=41;n++)nav.querySelectorAll(`a[href="#cap${n}"]`).forEach(link=>link.remove());
    nav.querySelectorAll('[data-qbi-glucidos-index],[data-qbi-index-sync]').forEach(link=>{
      const href=link.getAttribute('href')||'';
      if(/^#cap(?:29|3\d|4[01])$/.test(href))link.remove();
    });
    let cursor=cap28;
    for(let n=29;n<=41;n++){
      const title=document.querySelector(`#cap${n} h2`)?.textContent?.replace(/\s+/g,' ').trim();
      if(!title)throw new Error(`Falta título de cap${n}`);
      const link=cap28.cloneNode(false);
      link.removeAttribute('id');
      link.classList.remove('active');
      link.removeAttribute('style');
      link.href=`#cap${n}`;
      link.textContent=`${n}. ${title}`;
      link.dataset.qbiStaticIndex='1';
      link.dataset.qbiChapter=String(n);
      cursor.insertAdjacentElement('afterend',link);
      cursor=link;
    }

    for(let n=1;n<=28;n++){
      const link=nav.querySelector(`a[href="#cap${n}"]`);
      if(!link)throw new Error(`Falta cap${n} en el índice base`);
      link.dataset.qbiStaticIndex='1';
      link.dataset.qbiChapter=String(n);
    }

    const complete=Array.from({length:41},(_,i)=>i+1).every(n=>document.getElementById(`cap${n}`)&&nav.querySelector(`a[href="#cap${n}"]`));
    if(!complete)throw new Error('No se pudo congelar QBI con capítulos e índice 1–41');

    // Guard de diagnóstico únicamente: jamás reconstruye ni borra contenido.
    const guard=document.createElement('script');
    guard.id='qbi-static-structure-guard';
    guard.textContent=`(()=>{const verify=()=>{const nav=document.querySelector('.qb-summary .qb-sidebar #summaryIndex')||document.querySelector('#summaryIndex');const chapters=Array.from({length:41},(_,i)=>i+1).every(n=>document.getElementById('cap'+n));const links=Array.from({length:41},(_,i)=>i+1).every(n=>nav?.querySelector('a[href="#cap'+n+'"]'));document.documentElement.dataset.qbiStaticIntegrity=chapters&&links?'complete':'broken';if(!(chapters&&links))console.error('QBI static integrity failure',{chapters,links});};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',verify,{once:true});else verify();setTimeout(verify,1200);})();`;
    document.body.append(guard);

    return '<!doctype html>'+document.documentElement.outerHTML;
  },STATIC_VERSION);

  if(!html.includes('id="cap41"')||!html.includes('href="#cap41"')||!html.includes('data-qbi-static-version="4.7.0"'))throw new Error('El HTML estático no contiene la estructura completa 1–41');
  await writeFile(`${UNIT}/${STATIC_FILE}`,html,'utf8');
  await page.close();

  const richPath=`${UNIT}/rich.json`;
  const rich=JSON.parse(await readFile(richPath,'utf8'));
  rich.document=STATIC_FILE;
  await writeFile(richPath,JSON.stringify(rich,null,2)+'\n','utf8');

  const packagePath=`${UNIT}/package.json`;
  const manifest=JSON.parse(await readFile(packagePath,'utf8'));
  manifest.title='Resumen integral · Proteínas, métodos, TP1, enzimas I–III, TP2 y Glúcidos I';
  manifest.contentVersion=STATIC_VERSION;
  manifest.reviewedAt=new Date().toISOString();
  await writeFile(packagePath,JSON.stringify(manifest,null,2)+'\n','utf8');

  const catalogPath='content/catalog.json';
  const catalog=JSON.parse(await readFile(catalogPath,'utf8'));
  const entry=catalog.packages.find(item=>item.subjectId==='quimica_biologica1'&&item.unitId==='proteinas-i');
  if(!entry)throw new Error('No existe QBI en content/catalog.json');
  entry.title=manifest.title;
  entry.contentVersion=STATIC_VERSION;
  await writeFile(catalogPath,JSON.stringify(catalog,null,2)+'\n','utf8');

  // Defensa en el shell: cualquier iframe viejo de QBI (original.html o srcdoc cacheado)
  // se redirige a la única fuente canónica 4.7.0.
  const frameFix=`(()=>{\n  'use strict';\n  const VERSION='${FRAME_FIX_VERSION}';\n  const QBI_STATIC='content/subjects/quimica_biologica1/units/proteinas-i/${STATIC_FILE}?v=${STATIC_VERSION}';\n  const SANDBOX='allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox';\n  const isQbi=frame=>{\n    if(!(frame instanceof HTMLIFrameElement))return false;\n    const src=frame.getAttribute('src')||'';\n    const source=frame.getAttribute('srcdoc')||'';\n    const title=frame.getAttribute('title')||'';\n    return /quimica_biologica1\\/units\\/proteinas-i\\/(?:original|qbi-static)\\.html/i.test(src)||source.includes('QBI_PAYLOAD_VERSION')&&source.includes('quimica_biologica1/units/proteinas-i')||frame.classList.contains('rich-document')&&/Química Biológica/i.test(title);\n  };\n  const canonical=()=>new URL(QBI_STATIC,location.href).href;\n  function fix(frame){\n    if(!isQbi(frame))return;\n    const target=canonical();\n    if(frame.dataset.qbiCanonicalFix===VERSION&&frame.src===target&&!frame.hasAttribute('srcdoc'))return;\n    frame.dataset.qbiCanonicalFix=VERSION;\n    frame.setAttribute('sandbox',SANDBOX);\n    if(frame.hasAttribute('srcdoc'))frame.removeAttribute('srcdoc');\n    if(frame.src!==target)frame.src=target;\n  }\n  function scan(root=document){\n    if(root instanceof HTMLIFrameElement)fix(root);\n    root.querySelectorAll?.('iframe').forEach(fix);\n  }\n  const observer=new MutationObserver(records=>{\n    for(const record of records){\n      if(record.type==='attributes'){if(record.target instanceof HTMLIFrameElement)fix(record.target)}\n      else record.addedNodes.forEach(node=>{if(node.nodeType===1)scan(node)});\n    }\n  });\n  function boot(){scan();observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['src','srcdoc']})}\n  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();\n})();\n`;
  await writeFile('js/qbi-official-frame-fix.js',frameFix,'utf8');

  const swPath='sw.js';
  let sw=await readFile(swPath,'utf8');
  sw=sw.replace(/const CACHE_VERSION = "[^"]+";/,'const CACHE_VERSION = "biblioteca-lbt-v01119-qbi-static-v470";');
  sw=sw.replaceAll('./js/qbi-official-frame-fix.js?v=1.0.0',`./js/qbi-official-frame-fix.js?v=${FRAME_FIX_VERSION}`);
  sw=sw.replaceAll('qbi-official-frame-fix.js?v=1.0.0',`qbi-official-frame-fix.js?v=${FRAME_FIX_VERSION}`);
  sw=sw.replaceAll('./content/subjects/quimica_biologica1/units/proteinas-i/original.html?v=4.6.3',`./content/subjects/quimica_biologica1/units/proteinas-i/${STATIC_FILE}?v=${STATIC_VERSION}`);
  sw=sw.replaceAll('?v=4.6.3','?v=4.7.0');
  if(!sw.includes(`${STATIC_FILE}?v=${STATIC_VERSION}`))throw new Error('No se pudo agregar QBI estático al service worker');
  await writeFile(swPath,sw,'utf8');

  console.log(`QBI estático ${STATIC_VERSION}: compilado con capítulos 1–41 e índice completo.`);
}finally{
  await browser?.close().catch(()=>{});
  server.kill('SIGTERM');
}
