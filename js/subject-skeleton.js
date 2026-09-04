(()=>{
  "use strict";

  const KEEP_CURRENT=new Set(["fisica1","estadistica","quimica_biologica1","quimica_organica"]);
  const SECTIONS=[
    {id:"resumen",label:"Resumen"},
    {id:"mapa-mental",label:"Mapa mental"},
    {id:"ejercicios",label:"Ejercicios"},
    {id:"parciales",label:"Parciales"}
  ];
  const STYLE_ID="solved-subject-skeleton-style";
  const BOUND="skeletonBound";

  const esc=value=>String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const normalize=value=>String(value??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim();
  const subject=id=>window.LBT_DATA?.SUBJECTS?.find(item=>item.id===id)||null;
  const skeletonIds=()=>new Set((window.LBT_DATA?.SUBJECTS||[]).map(item=>item.id).filter(id=>!KEEP_CURRENT.has(id)));
  const isSkeleton=id=>!!id&&skeletonIds().has(id);

  function injectStyle(){
    if(document.getElementById(STYLE_ID))return;
    const style=document.createElement("style");
    style.id=STYLE_ID;
    style.textContent=`
      #studyPage[data-skeleton="true"] #studyTabs,
      #studyPage[data-skeleton="true"] #studyUnit,
      #studyPage[data-skeleton="true"] #splitViewBtn{display:none!important}
      #studyPage[data-skeleton="true"] .workspace-panel-head{display:none!important}
      #studyPage[data-skeleton="true"] .workspace-panel-scroll{padding:0!important}
      #studyPage[data-skeleton="true"] .official-section{height:100%;min-height:100%;padding:0!important}
      #studyPage[data-skeleton="true"] .official-section>.library-label{display:none!important}
      #studyPage[data-skeleton="true"] .content-pane{overflow:auto}
      #studyPage[data-skeleton="true"] .workspace-panel{min-width:0}
      .subject-skeleton{--sk-hue:var(--hue,var(--subject-hue,210));display:grid;grid-template-columns:minmax(220px,270px) minmax(0,1fr);min-height:100%;width:100%;background:color-mix(in srgb,hsl(var(--sk-hue) 72% 50%) 4%,#fff);color:#17293d}
      .subject-skeleton *{box-sizing:border-box}
      .subject-skeleton-index{position:sticky;top:0;align-self:start;height:100%;max-height:100vh;overflow:auto;padding:20px 16px;background:linear-gradient(180deg,color-mix(in srgb,hsl(var(--sk-hue) 68% 34%) 88%,#071a2a),color-mix(in srgb,hsl(var(--sk-hue) 62% 22%) 86%,#06121d));color:#f6fbff;border-right:1px solid color-mix(in srgb,hsl(var(--sk-hue) 72% 62%) 35%,transparent);z-index:4}
      .subject-skeleton-brand{padding:4px 6px 18px;border-bottom:1px solid rgba(255,255,255,.16)}
      .subject-skeleton-brand small{display:block;font-size:.68rem;font-weight:900;letter-spacing:.16em;text-transform:uppercase;opacity:.72}
      .subject-skeleton-brand strong{display:block;margin-top:5px;font-size:1.08rem;line-height:1.2;letter-spacing:-.02em}
      .subject-skeleton-search{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:8px;margin:16px 0 8px;padding:9px 10px;border:1px solid rgba(255,255,255,.2);border-radius:12px;background:rgba(255,255,255,.08)}
      .subject-skeleton-search span{font-size:1.1rem;opacity:.8}
      .subject-skeleton-search input{min-width:0;width:100%;border:0;outline:0;background:transparent;color:#fff;font:inherit}
      .subject-skeleton-search input::placeholder{color:rgba(255,255,255,.62)}
      .subject-skeleton-results{display:grid;gap:5px;margin:0 0 12px}
      .subject-skeleton-results[hidden]{display:none}
      .subject-skeleton-results button{width:100%;border:0;border-radius:9px;padding:8px 9px;text-align:left;background:rgba(255,255,255,.1);color:#fff;font:inherit;font-size:.78rem;cursor:pointer}
      .subject-skeleton-results button:hover{background:rgba(255,255,255,.18)}
      .subject-skeleton-results p{margin:7px 5px;font-size:.76rem;opacity:.68}
      .subject-skeleton-index nav{display:grid;gap:7px;margin-top:14px}
      .subject-skeleton-index nav a{display:flex;align-items:center;gap:9px;padding:10px 11px;border-radius:11px;color:#eaf7ff;text-decoration:none;font-weight:760;font-size:.86rem}
      .subject-skeleton-index nav a::before{content:"";width:7px;height:7px;border-radius:50%;background:hsl(var(--sk-hue) 86% 72%);box-shadow:0 0 0 4px rgba(255,255,255,.07)}
      .subject-skeleton-index nav a:hover,.subject-skeleton-index nav a.active{background:rgba(255,255,255,.11)}
      .subject-skeleton-tools{display:grid;gap:7px;margin-top:22px;padding-top:16px;border-top:1px solid rgba(255,255,255,.15)}
      .subject-skeleton-tools button{border:1px solid rgba(255,255,255,.18);border-radius:10px;padding:9px 10px;background:rgba(255,255,255,.07);color:#f4fbff;text-align:left;font:inherit;font-size:.78rem;cursor:pointer}
      .subject-skeleton-tools button:hover{background:rgba(255,255,255,.14)}
      .subject-skeleton-main{min-width:0;padding:clamp(26px,4vw,58px) clamp(24px,6vw,84px) 90px}
      .subject-skeleton-hero{padding:8px 0 clamp(38px,6vw,72px);border-bottom:2px solid color-mix(in srgb,hsl(var(--sk-hue) 65% 48%) 28%,#d8e0e8)}
      .subject-skeleton-hero small{display:block;margin-bottom:10px;color:hsl(var(--sk-hue) 58% 38%);font-size:.72rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase}
      .subject-skeleton-hero h1{max-width:1000px;margin:0;font-size:clamp(2.25rem,5vw,4.65rem);line-height:1.02;letter-spacing:-.055em;color:#12283c}
      .subject-skeleton-section{min-height:260px;padding:clamp(38px,6vw,70px) 0 24px;scroll-margin-top:20px;border-bottom:1px solid color-mix(in srgb,hsl(var(--sk-hue) 55% 52%) 18%,#dce3ea)}
      .subject-skeleton-section:last-child{border-bottom:0}
      .subject-skeleton-section h2{margin:0 0 22px;font-size:clamp(1.65rem,3vw,2.45rem);line-height:1.08;letter-spacing:-.035em;color:#17293d}
      .subject-skeleton-slot{min-height:150px;border:1px dashed color-mix(in srgb,hsl(var(--sk-hue) 58% 48%) 34%,#cad5df);border-radius:18px;background:color-mix(in srgb,hsl(var(--sk-hue) 65% 58%) 3%,#fff)}
      .subject-skeleton-slot:empty{background-image:linear-gradient(135deg,transparent 0 49.5%,color-mix(in srgb,hsl(var(--sk-hue) 60% 50%) 3%,transparent) 50% 50.5%,transparent 51%)}
      .subject-skeleton-search-hit{animation:skeletonSearchHit 1.25s ease}
      @keyframes skeletonSearchHit{0%,100%{outline:0 solid transparent}35%{outline:5px solid color-mix(in srgb,hsl(var(--sk-hue) 90% 55%) 30%,transparent);outline-offset:5px}}
      html[data-theme="dark"] .subject-skeleton{background:color-mix(in srgb,hsl(var(--sk-hue) 55% 22%) 8%,#111820);color:#e9f1f7}
      html[data-theme="dark"] .subject-skeleton-hero h1,html[data-theme="dark"] .subject-skeleton-section h2{color:#edf5fa}
      html[data-theme="dark"] .subject-skeleton-hero small{color:hsl(var(--sk-hue) 72% 72%)}
      html[data-theme="dark"] .subject-skeleton-slot{background:rgba(255,255,255,.025);border-color:color-mix(in srgb,hsl(var(--sk-hue) 70% 66%) 28%,#45525e)}
      @media(max-width:820px){
        .subject-skeleton{grid-template-columns:1fr}
        .subject-skeleton-index{position:relative;height:auto;max-height:none;padding:14px 14px 12px;border-right:0;border-bottom:1px solid rgba(255,255,255,.15)}
        .subject-skeleton-brand{padding-bottom:10px}
        .subject-skeleton-index nav{grid-template-columns:repeat(2,minmax(0,1fr));gap:5px;margin-top:9px}
        .subject-skeleton-index nav a{padding:8px 9px;font-size:.8rem}
        .subject-skeleton-tools{grid-template-columns:repeat(3,minmax(0,1fr));gap:5px;margin-top:10px;padding-top:10px}
        .subject-skeleton-tools button{text-align:center;padding:8px 5px;font-size:.72rem}
        .subject-skeleton-main{padding:24px 18px 68px}
        .subject-skeleton-hero{padding-bottom:34px}
        .subject-skeleton-section{min-height:220px;padding:36px 0 18px}
      }
      @media(max-width:480px){.subject-skeleton-index nav{grid-template-columns:1fr 1fr}.subject-skeleton-tools{grid-template-columns:1fr}.subject-skeleton-hero h1{font-size:clamp(2rem,12vw,3.15rem)}}
    `;
    document.head.append(style);
  }

  function blankData(id){
    return {
      "package.json":{packageSchemaVersion:1,contentStandard:"SOLVED-SKELETON-V1",subjectId:id,unitId:"skeleton",title:subject(id)?.name||id,contentVersion:"1.0.0",status:"published",reviewedAt:"2026-09-04T00:00:00.000Z"},
      "summary.json":{schemaVersion:1,blocks:[]},
      "glossary.json":{schemaVersion:1,entries:[]},
      "cards.json":{schemaVersion:1,cards:[]},
      "exercises.json":{schemaVersion:1,exercises:[]},
      "map.json":{schemaVersion:1,nodes:[],edges:[]},
      "sources.json":{schemaVersion:1,sources:[]}
    };
  }

  function syntheticUnit(id){
    const item=subject(id);
    return {id:`${id}/skeleton`,subjectId:id,unitId:"skeleton",title:item?.name||id,contentVersion:"1.0.0",path:"",data:blankData(id),origin:"subject-skeleton",updatedAt:"2026-09-04T00:00:00.000Z"};
  }

  function shell(id){
    const item=subject(id),name=item?.name||id;
    const nav=SECTIONS.map(section=>`<a href="#sk-${section.id}" data-skeleton-link="${section.id}">${esc(section.label)}</a>`).join("");
    const sections=SECTIONS.map(section=>`<section class="subject-skeleton-section" id="sk-${section.id}" data-anchor-id="skeleton:${esc(id)}:${section.id}"><h2>${esc(section.label)}</h2><div class="subject-skeleton-slot" data-skeleton-slot="${section.id}"></div></section>`).join("");
    return `<div class="subject-skeleton zoom-target" data-skeleton-subject="${esc(id)}">
      <aside class="subject-skeleton-index summary-index" id="summaryIndex" aria-label="Índice de ${esc(name)}">
        <div class="subject-skeleton-brand"><small>SOLved</small><strong>${esc(name)}</strong></div>
        <label class="subject-skeleton-search"><span aria-hidden="true">⌕</span><input type="search" data-skeleton-search autocomplete="off" placeholder="Buscar en la materia…" aria-label="Buscar en ${esc(name)}"></label>
        <div class="subject-skeleton-results" data-skeleton-results hidden aria-live="polite"></div>
        <nav>${nav}</nav>
        <div class="subject-skeleton-tools"><button type="button" data-skeleton-note>＋ Agregar nota</button><button type="button" data-skeleton-highlight>◆ Resaltar selección</button><button type="button" data-skeleton-color>◉ Color de la materia</button></div>
      </aside>
      <main class="subject-skeleton-main">
        <header class="subject-skeleton-hero"><small>SOLved · materia</small><h1>${esc(name)}</h1></header>
        ${sections}
      </main>
    </div>`;
  }

  function hash(text){let value=2166136261;for(let i=0;i<text.length;i++){value^=text.charCodeAt(i);value=Math.imul(value,16777619)}return (value>>>0).toString(36)}

  function decorateHighlightables(root){
    const id=root.dataset.skeletonSubject||"subject";
    root.querySelectorAll(".subject-skeleton-slot p,.subject-skeleton-slot li,.subject-skeleton-slot blockquote,.subject-skeleton-slot td,.subject-skeleton-slot th,.subject-skeleton-slot [data-skeleton-highlightable]").forEach(node=>{
      const text=node.textContent?.trim();if(!text)return;
      node.classList.add("highlightable");
      const section=node.closest(".subject-skeleton-section")?.id||"section";
      if(!node.dataset.blockId)node.dataset.blockId=`skeleton:${id}:${section}:${hash(normalize(text))}`;
      if(node.__baseText===undefined)node.__baseText=node.textContent;
    });
  }

  function searchNodes(root){
    return [...root.querySelectorAll(".subject-skeleton-main h2,.subject-skeleton-main h3,.subject-skeleton-main p,.subject-skeleton-main li,.subject-skeleton-main blockquote,.subject-skeleton-main td,.subject-skeleton-main th,[data-skeleton-searchable]")].filter(node=>node.textContent?.trim());
  }

  function bindSearch(root){
    const input=root.querySelector("[data-skeleton-search]"),box=root.querySelector("[data-skeleton-results]");if(!input||!box)return;
    const run=()=>{
      const query=normalize(input.value);box.replaceChildren();
      if(!query){box.hidden=true;return}
      const matches=searchNodes(root).map(node=>({node,text:node.textContent.trim(),normalized:normalize(node.textContent)})).filter(item=>item.normalized.includes(query)||query.split(" ").every(word=>item.normalized.includes(word))).slice(0,12);
      box.hidden=false;
      if(!matches.length){const p=document.createElement("p");p.textContent="Sin coincidencias en esta materia.";box.append(p);return}
      for(const match of matches){const button=document.createElement("button");button.type="button";button.textContent=match.text.slice(0,82)+(match.text.length>82?"…":"");button.onclick=()=>{match.node.scrollIntoView({behavior:"smooth",block:"center"});match.node.classList.remove("subject-skeleton-search-hit");requestAnimationFrame(()=>match.node.classList.add("subject-skeleton-search-hit"));setTimeout(()=>match.node.classList.remove("subject-skeleton-search-hit"),1400)};box.append(button)}
    };
    input.addEventListener("input",run);
    input.addEventListener("search",run);
  }

  function bindRoot(root){
    if(root.dataset[BOUND])return;root.dataset[BOUND]="true";
    decorateHighlightables(root);bindSearch(root);
    root.querySelectorAll("[data-skeleton-link]").forEach(link=>link.onclick=event=>{event.preventDefault();const target=root.querySelector(link.getAttribute("href"));target?.scrollIntoView({behavior:"smooth",block:"start"})});
    root.querySelector("[data-skeleton-note]")?.addEventListener("click",()=>document.getElementById("newNoteBtn")?.click());
    root.querySelector("[data-skeleton-highlight]")?.addEventListener("click",()=>document.getElementById("highlightBtn")?.click());
    root.querySelector("[data-skeleton-color]")?.addEventListener("click",()=>{
      const select=document.getElementById("appearanceSubject"),button=document.getElementById("themeBtn");
      if(select){select.value=root.dataset.skeletonSubject;select.dispatchEvent(new Event("change",{bubbles:true}))}
      button?.click();
    });
    const observer=new MutationObserver(()=>decorateHighlightables(root));observer.observe(root.querySelector(".subject-skeleton-main"),{childList:true,subtree:true,characterData:true});
  }

  function install(){
    const API=window.LBT_CONTENT;if(!API?.render||!window.LBT_DATA?.SUBJECTS)return false;if(API.__subjectSkeletonV1)return true;
    injectStyle();
    const originalUnits=API.units.bind(API),originalGetUnit=API.getUnit.bind(API),originalRender=API.render.bind(API),originalBind=API.bind?.bind(API);
    API.units=id=>isSkeleton(id)?[syntheticUnit(id)]:originalUnits(id);
    API.getUnit=(id,unitId)=>isSkeleton(id)?syntheticUnit(id):originalGetUnit(id,unitId);
    API.render=(id,unitId,tab)=>{
      if(!isSkeleton(id))return originalRender(id,unitId,tab);
      if(tab==="summary")return shell(id);
      return `<div class="content-card empty-state" data-skeleton-fallback="${esc(tab)}"><strong>Esta sección está integrada en el esqueleto principal de ${esc(subject(id)?.name||id)}.</strong></div>`;
    };
    API.bind=container=>{
      originalBind?.(container);
      const roots=[...container.querySelectorAll(".subject-skeleton")];roots.forEach(bindRoot);
      const study=document.getElementById("studyPage");if(study)study.dataset.skeleton=roots.length?"true":"false";
    };
    API.__subjectSkeletonV1={isSkeleton,ids:skeletonIds,sections:SECTIONS};
    window.SOLVED_SUBJECT_SKELETON=API.__subjectSkeletonV1;
    return true;
  }

  let tries=0;
  (function waitForContent(){if(install())return;if(++tries<400)setTimeout(waitForContent,10)})();
})();