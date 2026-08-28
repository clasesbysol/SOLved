(()=>{
  "use strict";

  const UNIT_ID="probabilidad-practica-1";
  const THEORY_PATH="/content/subjects/estadistica/units/probabilidad-practica-1/theory.html";
  const LAB_PATH="content/subjects/estadistica/units/probabilidad-practica-1/estadistica-lab-24-08.html?v=1.1.0";
  const CAMPUS_EXERCISES_PATH="content/subjects/estadistica/units/probabilidad-practica-1/estadistica-campus-exercises.html?v=1.1.0";
  const INDEX=[
    ["conteo","1 · Conteo"],
    ["conjuntos","2 · Conjuntos"],
    ["basicos","3 · Conceptos básicos"],
    ["frecuencia","4 · Axiomas y frecuencia"],
    ["equiprobable","5 · Equiprobabilidad"],
    ["ejemplos1","6 · Ejemplos: dados y urnas"],
    ["ejemplos2","7 · Ejemplos: eventos"],
    ["practica","8 · Práctica 1"],
    ["va-discreta","9 · V.A. discreta"],
    ["discretas-famosas","10 · Elegir distribución"],
    ["binomial","11 · Binomial"],
    ["geometrica","12 · Geométrica"],
    ["hipergeometrica","13 · Hipergeométrica"],
    ["poisson","14 · Poisson"],
    ["va-continua","15 · V.A. continua"],
    ["densidad","16 · Densidad"],
    ["distribucion-continua","17 · Distribución acumulada"],
    ["percentiles","18 · Percentiles"],
    ["uniforme","19 · Uniforme"],
    ["laboratorio-24-08","20 · Laboratorio 24/08"],
    ["videos-campus","21 · Material del campus"]
  ];

  const markupPromises=new Map();
  let scheduled=false;

  const statsUnitActive=()=>{
    const unit=document.getElementById("studyUnit");
    const title=document.getElementById("studyTitle");
    return unit?.value===UNIT_ID&&/Estadística Aplicada/i.test(title?.textContent||"");
  };
  const activeTab=()=>document.querySelector("#studyTabs .tab.active")?.dataset.tab||null;
  const statsTheoryFrame=()=>[...document.querySelectorAll("#studyBody iframe.rich-document")].find(frame=>{
    try{return new URL(frame.src,location.href).pathname.endsWith(THEORY_PATH)}catch(_){return String(frame.src||"").includes("/estadistica/units/probabilidad-practica-1/theory.html")}
  })||null;

  function statsIndex(){return document.querySelector('#summaryIndex[data-stats-index="1"]')}

  function buildIndex(frame){
    let index=statsIndex();
    if(index)return index;
    index=document.createElement("aside");
    index.id="summaryIndex";
    index.className="summary-index stats-summary-index";
    index.dataset.statsIndex="1";
    const heading=document.createElement("strong");
    heading.textContent="Índice · Estadística Aplicada";
    const nav=document.createElement("nav");
    for(const [id,label] of INDEX){
      const link=document.createElement("a");
      link.href="#"+id;
      link.dataset.statsAnchor=id;
      link.textContent=label;
      link.addEventListener("click",event=>{
        event.preventDefault();
        const target=statsTheoryFrame()||frame;
        if(!target)return;
        const current=target.getAttribute("src")||target.src||"";
        const base=current.split("#")[0];
        target.src=base+"#"+encodeURIComponent(id);
        target.focus();
      });
      nav.append(link);
    }
    index.append(heading,nav);
    const card=frame.closest(".rich-document-card");
    const host=card?.parentElement||frame.parentElement;
    if(host&&card)host.insertBefore(index,card);else host?.prepend(index);
    return index;
  }

  function ensureStatsIndex(){
    const summary=statsUnitActive()&&activeTab()==="summary";
    const button=document.getElementById("indexBtn");
    const own=statsIndex();
    if(!summary){
      own?.remove();
      return;
    }
    const frame=statsTheoryFrame();
    if(!frame)return;
    if(button?.hidden)button.hidden=false;
    const index=buildIndex(frame);
    if(index&&button)index.hidden=!button.classList.contains("active");
  }

  async function fetchMarkup(path){
    if(!markupPromises.has(path)){
      const url=new URL(path,location.href).href;
      markupPromises.set(path,fetch(url,{cache:"default"}).then(async response=>{
        if(!response.ok)throw Error(`${path} respondió ${response.status}`);
        return response.text();
      }).catch(error=>{
        console.error("SOLved Estadística · ejercicios",error);
        return "";
      }));
    }
    return markupPromises.get(path);
  }

  function appendMarkup(host,html,marker){
    if(!html||host.querySelector(marker))return;
    const template=document.createElement("template");
    template.innerHTML=html;
    host.append(template.content.cloneNode(true));
  }

  async function ensureExercises(){
    if(!statsUnitActive()||activeTab()!=="exercises")return;
    const host=[...document.querySelectorAll("#studyBody .official-section")].find(section=>section.querySelector(".content-card"));
    if(!host)return;
    const [lab,campus]=await Promise.all([fetchMarkup(LAB_PATH),fetchMarkup(CAMPUS_EXERCISES_PATH)]);
    if(!statsUnitActive()||activeTab()!=="exercises")return;
    appendMarkup(host,lab,'[data-stats-lab-24-08="1"]');
    appendMarkup(host,campus,'[data-stats-campus-exercises="1"]');
  }

  function refresh(){
    scheduled=false;
    ensureStatsIndex();
    ensureExercises();
  }
  function schedule(){
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(refresh);
  }

  function boot(){
    const body=document.getElementById("studyBody");
    const tabs=document.getElementById("studyTabs");
    const unit=document.getElementById("studyUnit");
    const button=document.getElementById("indexBtn");
    const observer=new MutationObserver(schedule);
    if(body)observer.observe(body,{subtree:true,childList:true});
    if(tabs)observer.observe(tabs,{subtree:true,attributes:true,attributeFilter:["class"]});
    if(button)observer.observe(button,{attributes:true,attributeFilter:["hidden","class"]});
    unit?.addEventListener("change",schedule);
    document.addEventListener("click",event=>{
      if(event.target.closest?.("#indexBtn")){
        const frame=statsTheoryFrame();
        if(frame)buildIndex(frame);
        queueMicrotask(schedule);
      }
    },true);
    window.addEventListener("lbt-app-ready",schedule);
    schedule();
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
