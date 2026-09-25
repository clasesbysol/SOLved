/*
 * Pantalla de espera al abrir SOLved.
 * Antes de pedir el inicio de sesión con Google busca si hay una versión nueva.
 * Si la hay, la instala y recarga una sola vez; recién después se pide el login.
 * Así el login no se pierde por una recarga de actualización.
 * app.js espera window.SOLVED_BOOT_GATE antes de reconectar Google Drive.
 */
(()=>{
  "use strict";
  const MIN_VISIBLE_MS=500;     // evita un parpadeo si todo responde al instante
  const CHECK_TIMEOUT_MS=5000;  // tiempo máximo para preguntar si hay versión nueva
  const INSTALL_TIMEOUT_MS=25000; // tiempo máximo para descargar la versión nueva
  const RELOAD_GUARD_KEY="solved-boot-update-reloads";
  const started=Date.now();
  const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  const withTimeout=(promise,ms)=>Promise.race([promise,sleep(ms).then(()=>"timeout")]);

  function setText(text){
    const node=document.querySelector("#solvedBootSplash [data-boot-text]");
    if(node)node.textContent=text;
  }
  function hideSplash(){
    const splash=document.getElementById("solvedBootSplash");
    if(!splash)return;
    splash.classList.add("is-leaving");
    setTimeout(()=>splash.remove(),320);
  }
  /* Si algo falla y la actualización se repite, no se recarga más de dos veces por minuto. */
  function mayReload(){
    try{
      const now=Date.now(),recent=JSON.parse(sessionStorage.getItem(RELOAD_GUARD_KEY)||"[]").filter(at=>now-at<60000);
      if(recent.length>=2)return false;
      recent.push(now);sessionStorage.setItem(RELOAD_GUARD_KEY,JSON.stringify(recent));
      return true;
    }catch(_){return true}
  }

  async function checkForUpdate(){
    if(!("serviceWorker" in navigator)||!location.protocol.startsWith("http")||!navigator.onLine)return "skip";
    const registration=await withTimeout(navigator.serviceWorker.getRegistration("./").catch(()=>null),1500);
    /* Primera visita: todavía no hay versión instalada, no hay nada que actualizar. */
    if(!registration||registration==="timeout"||!navigator.serviceWorker.controller)return "skip";
    if(!registration.installing&&!registration.waiting){
      const result=await withTimeout(registration.update().catch(()=>null),CHECK_TIMEOUT_MS);
      if(result==="timeout")return "timeout";
    }
    const worker=registration.installing||registration.waiting;
    if(!worker)return "current";
    if(!mayReload())return "guard";
    setText("Instalando la nueva versión…");
    const activated=new Promise(resolve=>navigator.serviceWorker.addEventListener("controllerchange",()=>resolve("activated"),{once:true}));
    const activate=()=>{try{(registration.waiting||worker).postMessage({type:"SKIP_WAITING"})}catch(_){}};
    if(registration.waiting)activate();
    worker.addEventListener("statechange",()=>{if(worker.state==="installed")activate()});
    const result=await withTimeout(activated,INSTALL_TIMEOUT_MS);
    if(result!=="activated")return "timeout";
    setText("Listo, abriendo SOLved…");
    location.reload();
    return new Promise(()=>{}); // la página se recarga; el login se pide en la versión nueva
  }

  window.SOLVED_BOOT_GATE=(async()=>{
    let result="error";
    try{result=await checkForUpdate()}catch(error){console.warn("SOLved: no se pudo comprobar la actualización",error)}
    const wait=MIN_VISIBLE_MS-(Date.now()-started);
    if(wait>0)await sleep(wait);
    document.documentElement.dataset.bootUpdate=result;
    if(document.readyState==="loading")await new Promise(resolve=>document.addEventListener("DOMContentLoaded",resolve,{once:true}));
    hideSplash();
    return result;
  })();
})();
