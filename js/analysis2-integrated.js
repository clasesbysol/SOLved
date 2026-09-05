(()=>{
  "use strict";
  if(window.__SOLVED_ANALYSIS2_INTEGRATED_V1)return;
  window.__SOLVED_ANALYSIS2_INTEGRATED_V1=true;

  const SUBJECT_ID="analisis2";
  const SUBJECT_TITLE="Análisis II";
  const MASTER_TITLE="ANÁLISIS II · RESUMEN INTEGRAL";
  const YELLOW_HUE=46;
  const NAV_KEY="solved-analysis2-nav-v1";
  const SIDE_MODE_KEY="solved-study-sidecar-mode-v2:analisis2";
  const SIDE_OPEN_KEY="solved-study-sidecar-open-v2:analisis2";
  const FORMULA_KEY="solved-formula-cheatsheet-v2:analisis2";
  const STYLE_ID="solved-analysis2-integrated-style";
  let masterId=null,masterHtml="",active=false,building=false,retryTimer=null,mutationTimer=null;

  const compact=value=>String(value??"").replace(/\s+/g," ").trim();
  const read=(key,fallback)=>{try{const value=JSON.parse(localStorage.getItem(key));return value??fallback}catch{return fallback}};
  const write=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch{}};
  const unique=items=>[...new Set((items||[]).map(compact).filter(Boolean))];
  const currentTitle=()=>compact(document.getElementById("studyTitle")?.textContent);
  const studyVisible=()=>{const page=document.getElementById("studyPage");return !!page&&!page.hidden};
  const isAnalysis2=()=>studyVisible()&&currentTitle()===SUBJECT_TITLE;

  function patchSubjectHue(){
    const item=window.LBT_DATA?.SUBJECTS?.find?.(subject=>subject.id===SUBJECT_ID);
    if(item)item.hue=YELLOW_HUE;
    document.querySelectorAll('[data-open="analisis2"],[data-id="analisis2"],[data-correlation="analisis2"]').forEach(node=>node.style.setProperty("--hue",String(YELLOW_HUE)));
    const study=document.getElementById("studyPage"),mark=document.getElementById("subjectMark");
    if(isAnalysis2()){
      study?.style.setProperty("--hue",String(YELLOW_HUE));
      mark?.style.setProperty("--hue",String(YELLOW_HUE));
      document.documentElement.style.setProperty("--subject-hue",String(YELLOW_HUE));
    }
  }

  function injectStyles(){
    if(document.getElementById(STYLE_ID))return;
    const style=document.createElement("style");
    style.id=STYLE_ID;
    style.textContent=`
      html.analysis2-integrated-mode #studyPage .study-head,
      html.analysis2-integrated-mode #studyTabs,
      html.analysis2-integrated-mode #studyPage .study-toolbar,
      html.analysis2-integrated-mode #studyPage .preview-warning,
      html.analysis2-integrated-mode #studyPage .floating-note-btn{display:none!important}
      html.analysis2-integrated-mode #studyPage,
      html.analysis2-integrated-mode #studyPage .study-shell,
      html.analysis2-integrated-mode #studyBody{min-height:0!important;height:100%!important;max-height:none!important}
      html.analysis2-integrated-mode #studyPage .study-shell{display:block!important}
      html.analysis2-integrated-mode #studyBody{display:block!important;overflow:hidden!important;padding:0!important;background:#fffdf8!important}
      .analysis2-unified-shell{display:grid;grid-template-columns:286px minmax(0,1fr);width:100%;height:100%;min-height:0;background:#fffdf8;--a2:#d6a600;--a2-deep:#725800;--a2-soft:#fff2b5;--a2-faint:#fffaf0;--a2-line:#eadfb8;--a2-ink:#252319;--a2-muted:#70694f}
      .analysis2-unified-side{display:flex;min-height:0;flex-direction:column;border-right:1px solid var(--a2-line);background:#fff;padding:16px 12px;overflow:hidden;box-shadow:8px 0 24px rgba(96,77,16,.05);z-index:3}
      .analysis2-unified-side header{padding:3px 8px 14px;border-bottom:1px solid var(--a2-line)}
      .analysis2-unified-side header small{display:block;color:var(--a2-deep);font-size:10px;font-weight:950;letter-spacing:.14em;text-transform:uppercase}
      .analysis2-unified-side header h2{margin:6px 0 0;color:var(--a2-ink);font-size:20px;line-height:1.05}
      .analysis2-side-tabs{display:grid;grid-template-columns:1fr 1fr 32px;gap:5px;padding:10px 0 8px}
      .analysis2-side-tabs button,.analysis2-index button,.analysis2-side-footer button{border:1px solid var(--a2-line);border-radius:9px;background:#fff;color:var(--a2-ink);font:inherit;font-size:12px;font-weight:850;cursor:pointer}
      .analysis2-side-tabs button{min-height:34px}
      .analysis2-side-tabs button.active{background:var(--a2-soft);border-color:#d9bc4d;color:var(--a2-deep)}
      .analysis2-side-tabs [data-a2-close]{padding:0}
      .analysis2-side-scroll{min-height:0;overflow:auto;padding:3px 1px 10px;overscroll-behavior:contain}
      .analysis2-index{display:grid;gap:5px}
      .analysis2-index [data-a2-group]{padding:10px 8px 2px;color:var(--a2-muted);font-size:9px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
      .analysis2-index button{width:100%;padding:9px 10px;text-align:left;border-color:transparent;background:transparent}
      .analysis2-index button:hover,.analysis2-index button.active{background:var(--a2-faint);border-color:var(--a2-line);color:var(--a2-deep)}
      .analysis2-index button.sub{padding-left:20px;font-size:11px;color:#5f5a49}
      .analysis2-formulas{display:none}
      .analysis2-unified-side[data-mode="formulas"] .analysis2-index{display:none}
      .analysis2-unified-side[data-mode="formulas"] .analysis2-formulas{display:block}
      .analysis2-formulas-title{padding:9px 7px 5px;color:var(--a2-muted);font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
      .analysis2-formula-empty{margin:5px;padding:11px;border:1px dashed var(--a2-line);border-radius:11px;background:var(--a2-faint);color:var(--a2-muted);font-size:12px;line-height:1.45}
      .analysis2-formula-chip{margin:6px 4px;padding:9px 10px;border:1px solid var(--a2-line);border-left:4px solid var(--a2);border-radius:10px;background:#fff;color:var(--a2-ink);font:700 11px/1.4 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;overflow-wrap:anywhere}
      .analysis2-side-footer{display:grid;grid-template-columns:1fr 1fr;gap:6px;padding-top:9px;border-top:1px solid var(--a2-line)}
      .analysis2-side-footer button{min-height:34px;background:var(--a2-faint)}
      .analysis2-unified-view{min-width:0;min-height:0;height:100%;position:relative;background:#fffdf8;overflow:hidden}
      .analysis2-master-frame{display:block;width:100%;height:100%;min-height:0;border:0;background:#fffdf8}
      .analysis2-side-reopen{position:fixed;left:calc(var(--sidebar,230px) + 12px);top:calc(var(--header,62px) + 18px);z-index:2147482100;min-width:44px;height:40px;padding:0 11px;border:1px solid #eadfb8;border-radius:11px;background:#fffdf8;color:#725800;box-shadow:0 8px 24px rgba(70,55,5,.14);font:900 13px/1 Inter,"Segoe UI",sans-serif;cursor:pointer}
      .analysis2-side-reopen[hidden]{display:none!important}
      .analysis2-unified-shell.side-closed{grid-template-columns:minmax(0,1fr)}
      .analysis2-unified-shell.side-closed .analysis2-unified-side{display:none}
      @media(max-width:900px){.analysis2-unified-shell{grid-template-columns:minmax(0,1fr)}.analysis2-unified-side{position:fixed;left:8px;top:8px;bottom:8px;width:min(310px,calc(100vw - 28px));border:1px solid var(--a2-line);border-radius:16px;box-shadow:0 18px 50px rgba(40,31,3,.25);z-index:2147481200}.analysis2-unified-shell.side-closed .analysis2-unified-side{display:none}.analysis2-side-reopen{left:10px;top:72px}}
    `;
    document.head.append(style);
  }

  function indexMarkup(){
    return `
      <div class="analysis2-index">
        <div data-a2-group>Recorrido</div>
        <button data-a2-target="inicio">Inicio</button>
        <button data-a2-target="panorama">Panorama de la materia</button>
        <div data-a2-group>Teoría</div>
        <button data-a2-target="teoria">Teoría completa</button>
        <button class="sub" data-a2-target="theory:teoremasprofundos">Teoremas uno por uno</button>
        <button class="sub" data-a2-target="theory:teoria">Teoría pura e identidades</button>
        <button class="sub" data-a2-target="theory:derivadas">Derivadas y geometría local</button>
        <button class="sub" data-a2-target="theory:extremos">Extremos y Lagrange</button>
        <button class="sub" data-a2-target="theory:curvas">Curvas e integrales de línea</button>
        <button class="sub" data-a2-target="theory:green">Teorema de Green</button>
        <button class="sub" data-a2-target="theory:superficies">Superficies y flujo directo</button>
        <button class="sub" data-a2-target="theory:stokes">Teorema de Stokes</button>
        <button class="sub" data-a2-target="theory:gauss">Gauss / Divergencia</button>
        <button class="sub" data-a2-target="theory:triples">Integrales dobles y triples</button>
        <div data-a2-group>Mapas mentales</div>
        <button data-a2-target="map:route-map">Mapa general de decisiones</button>
        <button data-a2-target="map:topic-map">Árbol por tema</button>
        <button data-a2-target="map:first-partial">Mapa del primer parcial</button>
        <div data-a2-group>Práctica</div>
        <button data-a2-target="parciales">Parciales y banco por familias</button>
        <button data-a2-target="finales">5 finales resueltos</button>
        <div data-a2-group>Respaldo</div>
        <button data-a2-target="archivo">Fuentes históricas preservadas</button>
      </div>
      <div class="analysis2-formulas" data-a2-formulas></div>`;
  }

  function shellMarkup(){
    return `<div class="analysis2-unified-shell" data-analysis2-shell>
      <aside class="analysis2-unified-side" data-analysis2-side>
        <header><small>SOLved · resumen integral</small><h2>Análisis II</h2></header>
        <div class="analysis2-side-tabs"><button type="button" data-a2-mode="index">Índice</button><button type="button" data-a2-mode="formulas">Machete</button><button type="button" data-a2-close title="Ocultar panel">×</button></div>
        <div class="analysis2-side-scroll">${indexMarkup()}</div>
        <footer class="analysis2-side-footer"><button type="button" data-a2-note>＋ Nota</button><button type="button" data-a2-highlight>◆ Resaltar</button></footer>
      </aside>
      <main class="analysis2-unified-view"><iframe class="analysis2-master-frame" data-analysis2-frame title="Análisis II · resumen integral" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe></main>
    </div><button type="button" class="analysis2-side-reopen" data-a2-reopen hidden>Índice</button>`;
  }

  function renderFormulas(){
    const host=document.querySelector("[data-a2-formulas]");
    if(!host)return;
    const formulas=Array.isArray(read(FORMULA_KEY,[]))?read(FORMULA_KEY,[]):[];
    host.innerHTML='<div class="analysis2-formulas-title">Machete acumulativo</div>';
    if(!formulas.length){
      host.insertAdjacentHTML("beforeend",'<div class="analysis2-formula-empty">Todavía no hay fórmulas capturadas. Se van sumando automáticamente a medida que recorrés teoría, mapas, parciales y finales.</div>');
      return;
    }
    for(const formula of formulas){const div=document.createElement("div");div.className="analysis2-formula-chip";div.textContent=formula;host.append(div)}
  }

  function setMode(mode){
    const side=document.querySelector("[data-analysis2-side]");if(!side)return;
    const actual=mode==="index"?"index":"formulas";
    side.dataset.mode=actual;
    side.querySelectorAll("[data-a2-mode]").forEach(button=>button.classList.toggle("active",button.dataset.a2Mode===actual));
    write(SIDE_MODE_KEY,actual);
    if(actual==="formulas")renderFormulas();
  }

  function setSideOpen(open){
    const shell=document.querySelector("[data-analysis2-shell]"),reopen=document.querySelector("[data-a2-reopen]");if(!shell||!reopen)return;
    shell.classList.toggle("side-closed",!open);reopen.hidden=!!open;write(SIDE_OPEN_KEY,!!open);
  }

  function setActiveTarget(target){
    document.querySelectorAll("[data-a2-target]").forEach(button=>button.classList.toggle("active",button.dataset.a2Target===target));
    write(NAV_KEY,target);
  }

  function navigate(target,{remember=true}={}){
    const frame=document.querySelector("[data-analysis2-frame]");if(!frame)return;
    const actual=target||"inicio";
    if(remember)setActiveTarget(actual);
    try{frame.contentWindow?.postMessage({type:"solved-analysis2-go",target:actual},"*")}catch{}
  }

  function bindShell(){
    document.querySelectorAll("[data-a2-mode]").forEach(button=>button.onclick=()=>setMode(button.dataset.a2Mode));
    document.querySelectorAll("[data-a2-target]").forEach(button=>button.onclick=()=>navigate(button.dataset.a2Target));
    document.querySelector("[data-a2-close]")?.addEventListener("click",()=>setSideOpen(false));
    document.querySelector("[data-a2-reopen]")?.addEventListener("click",()=>setSideOpen(true));
    document.querySelector("[data-a2-note]")?.addEventListener("click",()=>document.getElementById("newNoteBtn")?.click());
    document.querySelector("[data-a2-highlight]")?.addEventListener("click",()=>document.getElementById("highlightBtn")?.click());
    setMode(read(SIDE_MODE_KEY,"index"));
    setSideOpen(read(SIDE_OPEN_KEY,true));
    setActiveTarget(read(NAV_KEY,"inicio"));
  }

  function mergeFormulaBatch(formulas){
    const previous=Array.isArray(read(FORMULA_KEY,[]))?read(FORMULA_KEY,[]):[];
    const incoming=(formulas||[]).map(compact).filter(value=>value.length>=2&&value.length<=280);
    const merged=unique([...previous,...incoming]).slice(0,500);
    if(JSON.stringify(merged)!==JSON.stringify(previous))write(FORMULA_KEY,merged);
    const side=document.querySelector("[data-analysis2-side]");if(side?.dataset.mode==="formulas")renderFormulas();
  }

  async function findMaster(){
    const DB=window.LBT_DB;if(!DB?.getAll)return null;
    try{
      const rows=await DB.getAll("officialMaterials");
      return rows.find(item=>item.subjectId===SUBJECT_ID&&!item.deletedAt&&item.type==="html"&&item.title===MASTER_TITLE)||null;
    }catch{return null}
  }

  async function build(){
    if(building||!isAnalysis2())return;
    building=true;
    try{
      patchSubjectHue();injectStyles();
      const master=await findMaster();
      if(!master?.textContent){scheduleRetry();return}
      masterId=master.id;masterHtml=master.textContent;
      const root=document.getElementById("studyBody");if(!root)return;
      const existing=root.querySelector("[data-analysis2-shell]");
      if(!existing||existing.dataset.masterId!==masterId){
        root.innerHTML=shellMarkup();
        const shell=root.querySelector("[data-analysis2-shell]");if(shell)shell.dataset.masterId=masterId;
        bindShell();
        const frame=root.querySelector("[data-analysis2-frame]");
        if(frame){
          frame.addEventListener("load",()=>setTimeout(()=>navigate(read(NAV_KEY,"inicio"),{remember:false}),250),{once:false});
          frame.srcdoc=masterHtml;
        }
      }
      document.documentElement.classList.add("analysis2-integrated-mode");
      active=true;
    }finally{building=false}
  }

  function deactivate(){
    if(!active)return;
    document.documentElement.classList.remove("analysis2-integrated-mode");active=false;
  }

  function scheduleRetry(){
    clearTimeout(retryTimer);
    if(!isAnalysis2())return;
    retryTimer=setTimeout(()=>build(),700);
  }

  function sync(){
    patchSubjectHue();
    if(isAnalysis2())build();else deactivate();
  }

  addEventListener("message",event=>{
    const data=event.data||{};
    if(data.type==="solved-formula-batch"&&data.subjectId===SUBJECT_ID){mergeFormulaBatch(data.formulas);return}
    if(data.type==="solved-analysis2-ready"&&isAnalysis2())navigate(read(NAV_KEY,"inicio"),{remember:false});
  });
  addEventListener("lbt-app-ready",()=>{patchSubjectHue();setTimeout(sync,0)});
  addEventListener("solved-cloud-error",()=>scheduleRetry());
  document.addEventListener("click",event=>{if(event.target.closest?.('[data-open="analisis2"],[data-id="analisis2"]'))setTimeout(sync,80)},true);

  const observer=new MutationObserver(()=>{
    clearTimeout(mutationTimer);
    mutationTimer=setTimeout(sync,90);
  });
  observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["hidden"]});

  let hueAttempts=0;
  const hueTimer=setInterval(()=>{patchSubjectHue();if(window.LBT_DATA||++hueAttempts>80)clearInterval(hueTimer)},50);
  injectStyles();setTimeout(sync,200);
})();