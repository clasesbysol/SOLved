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
      #studyPage[data-unit-id="skeleton"] .study-head,
      #studyPage[data-unit-id="skeleton"] #studyTabs,
      #studyPage[data-unit-id="skeleton"] #studyToolbar,
      #studyPage[data-unit-id="skeleton"] #previewWarning,
      #studyPage[data-unit-id="skeleton"] #studyUnit,
      #studyPage[data-unit-id="skeleton"] #splitViewBtn,
      #studyPage[data-skeleton="true"] .study-head,
      #studyPage[data-skeleton="true"] #studyTabs,
      #studyPage[data-skeleton="true"] #studyToolbar,
      #studyPage[data-skeleton="true"] #previewWarning{display:none!important}
      #studyPage[data-unit-id="skeleton"] .study-shell,
      #studyPage[data-skeleton="true"] .study-shell{padding:0!important;display:block!important;min-height:100%}
      #studyPage[data-unit-id="skeleton"] .study-body,
      #studyPage[data-skeleton="true"] .study-body{min-height:calc(100vh - 64px);height:auto!important;border:0!important;background:transparent!important}
      #studyPage[data-unit-id="skeleton"] .study-workspace,
      #studyPage[data-skeleton="true"] .study-workspace{display:block!important;min-height:calc(100vh - 64px);height:auto!important}
      #studyPage[data-unit-id="skeleton"] .workspace-panel,
      #studyPage[data-skeleton="true"] .workspace-panel{min-width:0!important;width:100%!important;min-height:calc(100vh - 64px);border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important}
      #studyPage[data-unit-id="skeleton"] .workspace-panel-head,
      #studyPage[data-skeleton="true"] .workspace-panel-head,
      #studyPage[data-unit-id="skeleton"] .official-section>.library-label,
      #studyPage[data-skeleton="true"] .official-section>.library-label{display:none!important}
      #studyPage[data-unit-id="skeleton"] .workspace-panel-scroll,
      #studyPage[data-skeleton="true"] .workspace-panel-scroll,
      #studyPage[data-unit-id="skeleton"] .official-section,
      #studyPage[data-skeleton="true"] .official-section,
      #studyPage[data-unit-id="skeleton"] .content-pane,
      #studyPage[data-skeleton="true"] .content-pane{padding:0!important;margin:0!important;min-height:calc(100vh - 64px);height:auto!important;overflow:visible!important;background:transparent!important}
      html:has(#studyPage[data-unit-id="skeleton"]:not([hidden])) #newNoteBtn{display:none!important}

      .subject-skeleton.qb-summary{
        --qb-hue:var(--hue,var(--subject-hue,214));
        --qb-accent:hsl(var(--qb-hue) 72% 45%);
        --qb-accent-strong:hsl(var(--qb-hue) 70% 28%);
        --qb-accent-soft:hsl(var(--qb-hue) 72% 94%);
        --qb-accent-faint:hsl(var(--qb-hue) 58% 98%);
        --qb-ink:#202a38;
        --qb-muted:#596577;
        --qb-bg:#f8fafc;
        --qb-panel:#ffffff;
        --qb-panel-2:#f5f7fa;
        --qb-border:#dce2e9;
        --qb-shadow:0 12px 28px rgba(28,39,52,.07);
        --qb-highlight:#ffe56f;
        --qb-sidebar-w:252px;
        color:var(--qb-ink);background:var(--qb-bg);position:relative;line-height:1.72;min-height:calc(100vh - 64px);width:100%;font-family:Inter,"Segoe UI",Arial,sans-serif;
      }
      html[data-theme="dark"] .subject-skeleton.qb-summary{
        --qb-ink:#f3f6f9;--qb-muted:#bec7d1;--qb-bg:#151a20;--qb-panel:#1e252d;--qb-panel-2:#252d36;--qb-border:#3a4652;--qb-accent:hsl(var(--qb-hue) 72% 67%);--qb-accent-strong:hsl(var(--qb-hue) 76% 76%);--qb-accent-soft:hsl(var(--qb-hue) 30% 22%);--qb-accent-faint:#1a2027;--qb-shadow:none;--qb-highlight:#8b720c;
      }
      .subject-skeleton *{box-sizing:border-box}
      .subject-skeleton a{color:inherit}.subject-skeleton button,.subject-skeleton input{font:inherit}
      .subject-skeleton .qb-reading-progress{position:sticky;top:0;height:4px;z-index:60;background:transparent}
      .subject-skeleton .qb-reading-progress i{display:block;width:0;height:100%;background:var(--qb-accent);transition:width .08s linear}
      .subject-skeleton .qb-doc-shell{display:grid;grid-template-columns:var(--qb-sidebar-w) minmax(0,1fr);align-items:start;min-height:100%}
      .subject-skeleton .qb-sidebar{position:sticky;top:14px;max-height:calc(100vh - 92px);overflow:auto;margin:14px 0 14px 14px;border:1px solid var(--qb-border);border-radius:20px;background:var(--qb-panel);box-shadow:var(--qb-shadow);z-index:20}
      .subject-skeleton .qb-sidebar::-webkit-scrollbar{width:5px}.subject-skeleton .qb-sidebar::-webkit-scrollbar-thumb{background:var(--qb-border);border-radius:10px}
      .subject-skeleton .qb-sidebar-brand{padding:20px 18px 15px;border-bottom:1px solid var(--qb-border)}
      .subject-skeleton .qb-sidebar-brand span{display:block;font-size:.68rem;letter-spacing:.16em;font-weight:900;color:var(--qb-accent-strong);text-transform:uppercase}
      .subject-skeleton .qb-sidebar-brand strong{display:block;font-size:1.02rem;margin-top:3px;color:var(--qb-ink);line-height:1.25}
      .subject-skeleton .qb-sidebar-brand small{display:block;color:var(--qb-muted);margin-top:2px;font-size:.76rem}
      .subject-skeleton .qb-search{display:grid;grid-template-columns:24px 1fr 25px;align-items:center;gap:2px;margin:13px 12px 8px;padding:7px 9px;border:1px solid var(--qb-border);border-radius:11px;background:var(--qb-bg)}
      .subject-skeleton .qb-search input{min-width:0;border:0;outline:0;background:transparent;color:var(--qb-ink);font-size:.83rem}
      .subject-skeleton .qb-search input::placeholder{color:var(--qb-muted);opacity:1}
      .subject-skeleton .qb-search>span{color:var(--qb-accent-strong);font-weight:900}.subject-skeleton .qb-search button{border:0;background:transparent;color:var(--qb-muted);cursor:pointer;padding:0}
      .subject-skeleton .qb-search-results{display:none;margin:0 12px 10px;border:1px solid var(--qb-border);border-radius:11px;background:var(--qb-panel);overflow:hidden}
      .subject-skeleton .qb-search-results.open{display:block}.subject-skeleton .qb-search-results button{display:block;width:100%;text-align:left;border:0;border-bottom:1px solid var(--qb-border);padding:9px 10px;background:transparent;color:var(--qb-ink);cursor:pointer;font-size:.78rem}.subject-skeleton .qb-search-results button:last-child{border-bottom:0}.subject-skeleton .qb-search-results button:hover{background:var(--qb-accent-soft)}.subject-skeleton .qb-search-results p{margin:9px 10px;color:var(--qb-muted);font-size:.78rem}
      .subject-skeleton .qb-index{padding:6px 10px 10px;display:flex;flex-direction:column;gap:2px}
      .subject-skeleton .qb-index strong{display:block;padding:8px 8px 6px;font-size:.68rem;letter-spacing:.13em;text-transform:uppercase;color:var(--qb-muted)}
      .subject-skeleton .qb-index a{display:block;text-decoration:none;padding:7px 8px;border-radius:8px;font-size:.79rem;line-height:1.25;color:var(--qb-muted);border-left:3px solid transparent;font-weight:650}
      .subject-skeleton .qb-index a:hover,.subject-skeleton .qb-index a.active{background:var(--qb-accent-soft);color:var(--qb-ink);border-left-color:var(--qb-accent)}
      .subject-skeleton .qb-sidebar-tools{padding:9px 12px 14px;border-top:1px solid var(--qb-border)}
      .subject-skeleton .qb-sidebar-tools strong{display:block;margin:0 0 6px;padding:2px;font-size:.68rem;letter-spacing:.13em;text-transform:uppercase;color:var(--qb-muted)}
      .subject-skeleton .qb-side-button{width:100%;margin:4px 0;border:1px solid var(--qb-border);background:var(--qb-bg);color:var(--qb-ink);border-radius:9px;padding:7px 9px;text-align:left;font-size:.77rem;cursor:pointer;font-weight:700}
      .subject-skeleton .qb-side-button:hover{border-color:var(--qb-accent);background:var(--qb-accent-soft)}
      .subject-skeleton .qb-sidebar-scrim{display:none}.subject-skeleton .qb-mobile-index{display:none}
      .subject-skeleton .qb-document{min-width:0;max-width:1180px;width:100%;margin:0 auto;padding:18px clamp(18px,4vw,56px) 70px;position:relative}
      .subject-skeleton .qb-hero{padding:28px 0 34px;border-bottom:2px solid var(--qb-border)}
      .subject-skeleton .qb-kicker{display:inline-block;color:var(--qb-accent-strong);font-size:.71rem;font-weight:900;letter-spacing:.15em;text-transform:uppercase}
      .subject-skeleton .qb-hero h1{font-size:clamp(2.2rem,5vw,4.8rem);line-height:1.02;letter-spacing:-.052em;margin:8px 0 0;max-width:920px;color:var(--qb-ink);font-weight:800;overflow-wrap:normal;word-break:normal}
      .subject-skeleton .qb-chapter{padding:54px 0 34px;border-bottom:1px solid var(--qb-border);scroll-margin-top:28px;min-height:150px}
      .subject-skeleton .qb-chapter:last-child{border-bottom:0}.subject-skeleton .qb-chapter-number{font-size:.73rem;font-weight:900;letter-spacing:.18em;color:var(--qb-accent-strong);margin-bottom:4px}
      .subject-skeleton .qb-chapter h2{font-size:clamp(1.6rem,3vw,2.4rem);line-height:1.08;letter-spacing:-.032em;margin:0;color:var(--qb-ink);font-weight:800}
      .subject-skeleton-slot{min-height:28px;padding-top:8px;color:var(--qb-ink)}
      .subject-skeleton-slot:empty{min-height:28px}
      .subject-skeleton-search-hit{animation:skeletonSearchHit 1.25s ease}
      @keyframes skeletonSearchHit{0%,100%{outline:0 solid transparent}35%{outline:5px solid color-mix(in srgb,var(--qb-accent) 28%,transparent);outline-offset:5px}}
      .subject-skeleton mark.study-highlight{background:var(--qb-highlight);color:#241f0a;border-radius:3px;padding:0 .04em}
      html[data-theme="dark"] .subject-skeleton mark.study-highlight{color:#fff7cf}

      @media(max-width:900px){
        .subject-skeleton .qb-doc-shell{display:block}
        .subject-skeleton .qb-sidebar{position:fixed;top:0;bottom:0;left:0;width:min(86vw,320px);max-height:none;margin:0;border-radius:0 20px 20px 0;transform:translateX(-105%);transition:transform .2s ease;z-index:2147482000}
        .subject-skeleton.sidebar-open .qb-sidebar{transform:translateX(0)}
        .subject-skeleton .qb-sidebar-scrim{display:block;position:fixed;inset:0;background:rgba(15,23,32,.38);opacity:0;pointer-events:none;transition:opacity .2s;z-index:2147481999}
        .subject-skeleton.sidebar-open .qb-sidebar-scrim{opacity:1;pointer-events:auto}
        .subject-skeleton .qb-mobile-index{display:block;position:fixed;left:18px;bottom:18px;z-index:2147481900;border:0;border-radius:999px;width:50px;height:50px;background:var(--qb-accent-strong);color:#fff;box-shadow:0 8px 22px rgba(0,0,0,.2);font-weight:900;cursor:pointer}
        .subject-skeleton .qb-document{padding:18px 18px 76px}
        .subject-skeleton .qb-hero{padding-top:18px}.subject-skeleton .qb-hero h1{font-size:clamp(2.2rem,11vw,4.1rem)}
        .subject-skeleton .qb-chapter{padding-top:44px}
      }
      @media(max-width:560px){.subject-skeleton .qb-document{padding-left:14px;padding-right:14px}.subject-skeleton .qb-hero h1{letter-spacing:-.045em}}
    `;
    document.head.append(style);
  }

  function blankData(id){
    return {
      "package.json":{packageSchemaVersion:1,contentStandard:"SOLVED-SKELETON-V2",subjectId:id,unitId:"skeleton",title:subject(id)?.name||id,contentVersion:"2.0.0",status:"published",reviewedAt:"2026-09-04T00:00:00.000Z"},
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
    return {id:`${id}/skeleton`,subjectId:id,unitId:"skeleton",title:item?.name||id,contentVersion:"2.0.0",path:"",data:blankData(id),origin:"subject-skeleton",updatedAt:"2026-09-04T00:00:00.000Z"};
  }

  function shell(id){
    const item=subject(id),name=item?.name||id;
    const nav=SECTIONS.map(section=>`<a href="#sk-${section.id}" data-skeleton-link="${section.id}">${esc(section.label)}</a>`).join("");
    const sections=SECTIONS.map((section,index)=>`<section class="subject-skeleton-section qb-chapter" id="sk-${section.id}" data-anchor-id="skeleton:${esc(id)}:${section.id}"><div class="qb-chapter-number">${String(index+1).padStart(2,"0")}</div><h2>${esc(section.label)}</h2><div class="subject-skeleton-slot" data-skeleton-slot="${section.id}"></div></section>`).join("");
    return `<div class="subject-skeleton qb-summary zoom-target" data-skeleton-subject="${esc(id)}">
      <div class="qb-reading-progress" aria-hidden="true"><i></i></div>
      <div class="qb-doc-shell">
        <aside class="subject-skeleton-index qb-sidebar summary-index" id="summaryIndex" aria-label="Índice de ${esc(name)}">
          <div class="qb-sidebar-brand"><span>SOLved</span><strong>${esc(name)}</strong><small>Resumen integral</small></div>
          <label class="qb-search"><span aria-hidden="true">⌕</span><input type="search" data-skeleton-search autocomplete="off" placeholder="Buscar en el resumen…" aria-label="Buscar en ${esc(name)}"><button type="button" data-skeleton-clear aria-label="Borrar búsqueda">×</button></label>
          <div class="subject-skeleton-results qb-search-results" data-skeleton-results aria-live="polite"></div>
          <nav class="qb-index"><strong>Índice</strong>${nav}</nav>
          <div class="qb-sidebar-tools"><strong>Herramientas</strong><button type="button" class="qb-side-button" data-skeleton-note>＋ Agregar nota</button><button type="button" class="qb-side-button" data-skeleton-highlight>◆ Resaltar selección</button><button type="button" class="qb-side-button" data-skeleton-color>◉ Color de la materia</button></div>
        </aside>
        <div class="qb-sidebar-scrim" data-skeleton-scrim></div>
        <button type="button" class="qb-mobile-index" data-skeleton-mobile-index aria-label="Abrir índice">☰</button>
        <main class="subject-skeleton-main qb-document">
          <header class="subject-skeleton-hero qb-hero"><span class="qb-kicker">SOLved · ${esc(name)}</span><h1>${esc(name)}</h1></header>
          ${sections}
        </main>
      </div>
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
    const input=root.querySelector("[data-skeleton-search]"),box=root.querySelector("[data-skeleton-results]"),clear=root.querySelector("[data-skeleton-clear]");if(!input||!box)return;
    const run=()=>{
      const query=normalize(input.value);box.replaceChildren();
      if(!query){box.classList.remove("open");return}
      const matches=searchNodes(root).map(node=>({node,text:node.textContent.trim(),normalized:normalize(node.textContent)})).filter(item=>item.normalized.includes(query)||query.split(" ").every(word=>item.normalized.includes(word))).slice(0,12);
      box.classList.add("open");
      if(!matches.length){const p=document.createElement("p");p.textContent="Sin coincidencias en esta materia.";box.append(p);return}
      for(const match of matches){const button=document.createElement("button");button.type="button";button.textContent=match.text.slice(0,82)+(match.text.length>82?"…":"");button.onclick=()=>{match.node.scrollIntoView({behavior:"smooth",block:"center"});match.node.classList.remove("subject-skeleton-search-hit");requestAnimationFrame(()=>match.node.classList.add("subject-skeleton-search-hit"));setTimeout(()=>match.node.classList.remove("subject-skeleton-search-hit"),1400);root.classList.remove("sidebar-open")};box.append(button)}
    };
    input.addEventListener("input",run);input.addEventListener("search",run);
    clear?.addEventListener("click",()=>{input.value="";run();input.focus()});
  }

  function bindRoot(root){
    if(root.dataset[BOUND])return;root.dataset[BOUND]="true";
    decorateHighlightables(root);bindSearch(root);
    const progress=root.querySelector(".qb-reading-progress i"),main=root.querySelector(".subject-skeleton-main");
    const updateProgress=()=>{if(!progress||!main)return;const rect=main.getBoundingClientRect(),viewport=window.innerHeight||document.documentElement.clientHeight,total=Math.max(1,main.scrollHeight-viewport),passed=Math.max(0,-rect.top);progress.style.width=`${Math.min(100,passed/total*100)}%`};
    document.querySelector(".content-pane")?.addEventListener("scroll",updateProgress,{passive:true});window.addEventListener("scroll",updateProgress,{passive:true});updateProgress();
    const closeSidebar=()=>root.classList.remove("sidebar-open");
    root.querySelector("[data-skeleton-mobile-index]")?.addEventListener("click",()=>root.classList.toggle("sidebar-open"));root.querySelector("[data-skeleton-scrim]")?.addEventListener("click",closeSidebar);
    root.querySelectorAll("[data-skeleton-link]").forEach(link=>link.onclick=event=>{event.preventDefault();const target=root.querySelector(link.getAttribute("href"));target?.scrollIntoView({behavior:"smooth",block:"start"});root.querySelectorAll("[data-skeleton-link]").forEach(item=>item.classList.toggle("active",item===link));closeSidebar()});
    root.querySelector("[data-skeleton-note]")?.addEventListener("click",()=>document.getElementById("newNoteBtn")?.click());
    root.querySelector("[data-skeleton-highlight]")?.addEventListener("click",()=>document.getElementById("highlightBtn")?.click());
    root.querySelector("[data-skeleton-color]")?.addEventListener("click",()=>{
      const select=document.getElementById("appearanceSubject"),button=document.getElementById("themeBtn");
      if(select){select.value=root.dataset.skeletonSubject;select.dispatchEvent(new Event("change",{bubbles:true}))}
      button?.click();
    });
    const sections=[...root.querySelectorAll(".subject-skeleton-section")],links=[...root.querySelectorAll("[data-skeleton-link]")];
    if("IntersectionObserver" in window){const spy=new IntersectionObserver(entries=>{const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(!visible)return;links.forEach(link=>link.classList.toggle("active",link.getAttribute("href")===`#${visible.target.id}`))},{root:null,rootMargin:"-20% 0px -65% 0px",threshold:[0,.01]});sections.forEach(section=>spy.observe(section))}
    const observer=new MutationObserver(()=>decorateHighlightables(root));observer.observe(main,{childList:true,subtree:true,characterData:true});
  }

  function install(){
    const API=window.LBT_CONTENT;if(!API?.render||!window.LBT_DATA?.SUBJECTS)return false;if(API.__subjectSkeletonV2)return true;
    injectStyle();
    const originalUnits=API.units.bind(API),originalGetUnit=API.getUnit.bind(API),originalRender=API.render.bind(API),originalBind=API.bind?.bind(API);
    API.units=id=>isSkeleton(id)?[syntheticUnit(id)]:originalUnits(id);
    API.getUnit=(id,unitId)=>isSkeleton(id)?syntheticUnit(id):originalGetUnit(id,unitId);
    API.render=(id,unitId,tab)=>{
      if(!isSkeleton(id))return originalRender(id,unitId,tab);
      if(tab==="summary")return shell(id);
      return `<div class="content-card empty-state" data-skeleton-fallback="${esc(tab)}"><strong>Esta sección está integrada en el resumen de ${esc(subject(id)?.name||id)}.</strong></div>`;
    };
    API.bind=container=>{
      originalBind?.(container);
      const roots=[...container.querySelectorAll(".subject-skeleton")];roots.forEach(bindRoot);
      const study=document.getElementById("studyPage");if(study)study.dataset.skeleton=roots.length?"true":"false";
    };
    API.__subjectSkeletonV2={isSkeleton,ids:skeletonIds,sections:SECTIONS};
    API.__subjectSkeletonV1=API.__subjectSkeletonV2;
    window.SOLVED_SUBJECT_SKELETON=API.__subjectSkeletonV2;
    return true;
  }

  let tries=0;
  (function waitForContent(){if(install())return;if(++tries<400)setTimeout(waitForContent,10)})();
})();