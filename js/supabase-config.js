/* Configuración pública. La Publishable Key es segura para el navegador cuando RLS está activo. */
window.SOLVED_SUPABASE_CONFIG = Object.freeze({
  url: "https://ljmqvrgfbmyxhzmwxrkj.supabase.co",
  publishableKey: "sb_publishable_rkHcbqDI8NN4zGGnhoAyWA_enAzCcbZ"
});

(()=>{
  "use strict";
  if(window.__SOLVED_STUDY_CHROME_V4)return;
  window.__SOLVED_STUDY_CHROME_V4=true;

  const APP_SIDEBAR_KEY="solved-app-sidebar-collapsed-v1";
  const SIDE_MODE_KEY=id=>`solved-study-sidecar-mode-v1:${id||"global"}`;
  const FORMULA_KEY=id=>`solved-formula-cheatsheet-v1:${id||"global"}`;
  const STYLE_ID="solved-study-chrome-v4-style";
  const FRAME_STYLE_ID="solved-study-chrome-v4-frame-style";

  const read=(win,key,fallback)=>{try{const value=JSON.parse(win.localStorage.getItem(key));return value??fallback}catch{return fallback}};
  const write=(win,key,value)=>{try{win.localStorage.setItem(key,JSON.stringify(value))}catch{}};
  const text=value=>String(value??"").replace(/\s+/g," ").trim();
  const unique=items=>[...new Set(items.map(text).filter(Boolean))];
  const currentSubject=()=>{
    const title=text(document.getElementById("studyTitle")?.textContent);
    const subjects=window.LBT_DATA?.SUBJECTS||[];
    return subjects.find(item=>title===text(item.name)||title.includes(text(item.name)))?.id||document.querySelector(".subject-skeleton")?.dataset.skeletonSubject||"";
  };

  function injectParentStyle(){
    if(document.getElementById(STYLE_ID))return;
    const style=document.createElement("style");style.id=STYLE_ID;style.textContent=`
      #solvedAppSidebarToggle{position:fixed;top:17px;left:calc(var(--sidebar,230px) - 15px);z-index:2147482400;width:30px;height:30px;border:1px solid var(--line);border-radius:999px;background:var(--panel);color:var(--text);box-shadow:0 4px 14px rgba(25,35,50,.14);display:grid;place-items:center;font:900 16px/1 var(--font);padding:0;transition:left .18s ease,transform .18s ease}
      #solvedAppSidebarToggle:hover{background:var(--panel-2)}
      .solved-sidecar-tabs{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:8px 10px;border-bottom:1px solid var(--qb-border,var(--line));background:var(--qb-panel,var(--panel));position:sticky;top:0;z-index:5}
      .solved-sidecar-tabs button{min-height:32px;border:1px solid var(--qb-border,var(--line));border-radius:9px;background:var(--qb-bg,var(--panel-2));color:var(--qb-ink,var(--text));font:inherit;font-size:.76rem;font-weight:850;cursor:pointer}
      .solved-sidecar-tabs button.active{border-color:var(--qb-accent,var(--orange));background:var(--qb-accent-soft,var(--orange-soft));color:var(--qb-accent-strong,var(--orange-strong))}
      .solved-formula-sheet{padding:8px 11px 13px}
      .solved-formula-sheet>strong{display:block;padding:7px 2px 5px;font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--qb-muted,var(--muted))}
      .solved-formula-sheet-empty{padding:10px;border:1px dashed var(--qb-border,var(--line));border-radius:10px;color:var(--qb-muted,var(--muted));font-size:.75rem;line-height:1.4;background:var(--qb-accent-faint,var(--panel-2))}
      .solved-formula-chip{display:block;width:100%;margin:5px 0;padding:8px 9px;border:1px solid var(--qb-border,var(--line));border-left:3px solid var(--qb-accent,var(--orange));border-radius:9px;background:var(--qb-panel,var(--panel));color:var(--qb-ink,var(--text));font:700 .76rem/1.35 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;text-align:left;overflow-wrap:anywhere}
      .solved-sidecar-formulas .qb-search,.solved-sidecar-formulas .qb-search-results,.solved-sidecar-formulas .qb-index{display:none!important}
      .subject-skeleton:not(.solved-sidecar-formulas) .solved-formula-sheet{display:none!important}
      .subject-skeleton,.subject-skeleton-main,#studyPage[data-skeleton="true"]{touch-action:pan-y!important}
      #studyPage[data-skeleton="true"]{height:auto!important;min-height:100%!important;overflow:visible!important}
      #studyPage[data-skeleton="true"] .study-shell,#studyPage[data-skeleton="true"] .study-body,#studyPage[data-skeleton="true"] .study-workspace,#studyPage[data-skeleton="true"] .workspace-panel,#studyPage[data-skeleton="true"] .workspace-panel-scroll,#studyPage[data-skeleton="true"] .official-section,#studyPage[data-skeleton="true"] .content-pane{height:auto!important;max-height:none!important;overflow:visible!important;touch-action:pan-y!important}
      #studyPage[data-skeleton="true"] .subject-skeleton-section{display:block!important;visibility:visible!important}
      @media(min-width:901px){
        html.solved-app-sidebar-collapsed{--sidebar:64px!important}
        html.solved-app-sidebar-collapsed .brand>div,html.solved-app-sidebar-collapsed .sidebar .nav-btn span,html.solved-app-sidebar-collapsed .sidebar .course-link .label,html.solved-app-sidebar-collapsed .sidebar .side-head span,html.solved-app-sidebar-collapsed .sidebar .account-card span{display:none!important}
        html.solved-app-sidebar-collapsed .brand{justify-content:center;padding-inline:7px}
        html.solved-app-sidebar-collapsed .sidebar{padding-inline:7px}
        html.solved-app-sidebar-collapsed .sidebar .nav-btn,html.solved-app-sidebar-collapsed .sidebar .course-link{justify-content:center;padding-inline:6px}
        html.solved-app-sidebar-collapsed .sidebar .side-head{justify-content:center;padding-inline:0}
        html.solved-app-sidebar-collapsed .sidebar .side-bottom{padding-inline:0}
        html.solved-app-sidebar-collapsed .sidebar #accountMenuToggle{justify-content:center;padding-inline:0}
        .subject-skeleton .qb-doc-shell{display:grid!important;grid-template-columns:280px minmax(0,1fr)!important;align-items:start!important}
        .subject-skeleton .subject-skeleton-index{position:fixed!important;top:calc(var(--header,62px) + 14px)!important;left:calc(var(--sidebar,230px) + 14px)!important;bottom:14px!important;width:252px!important;height:auto!important;max-height:none!important;margin:0!important;overflow:auto!important;z-index:80!important}
        .subject-skeleton .subject-skeleton-main{grid-column:2!important;min-width:0!important}
      }
      @media(max-width:900px){#solvedAppSidebarToggle{display:none!important}.solved-sidecar-tabs{position:static}}
    `;document.head.append(style);
  }

  function installAppSidebar(){
    const brand=document.querySelector(".brand"),sidebar=document.querySelector(".sidebar");if(!brand||!sidebar)return;
    let button=document.getElementById("solvedAppSidebarToggle");
    if(!button){button=document.createElement("button");button.type="button";button.id="solvedAppSidebarToggle";button.title="Plegar o desplegar menú de SOLved";button.setAttribute("aria-label",button.title);document.body.append(button)}
    const apply=value=>{const collapsed=!!value&&matchMedia("(min-width:901px)").matches;document.documentElement.classList.toggle("solved-app-sidebar-collapsed",collapsed);button.textContent=collapsed?"›":"‹";button.setAttribute("aria-expanded",String(!collapsed))};
    let collapsed=read(window,APP_SIDEBAR_KEY,false);apply(collapsed);
    button.onclick=()=>{collapsed=!document.documentElement.classList.contains("solved-app-sidebar-collapsed");write(window,APP_SIDEBAR_KEY,collapsed);apply(collapsed)};
    addEventListener("resize",()=>apply(read(window,APP_SIDEBAR_KEY,false)),{passive:true});
  }

  function formulaCandidates(root){
    if(!root)return [];
    const strongSelectors=".qb-equation,.formula,.formula-box,.formula-card,.fml,.fml-box,[data-formula],mjx-container,.MathJax,.katex-display,math";
    const direct=[...root.querySelectorAll(strongSelectors)].map(node=>text(node.textContent)).filter(value=>value.length>=2&&value.length<=260);
    const contextual=[...root.querySelectorAll("p,li,td,th")].map(node=>text(node.textContent)).filter(value=>value.length>=3&&value.length<=180&&(/[=≈≃≤≥∑∫√±→⇌Δμσλπ∞]/.test(value)||/\b(?:Km|Vmax|kcat|pKa|pH|P\(|E\(|Var\(|sen\(|cos\(|tan\()/.test(value))));
    return unique([...direct,...contextual]).slice(0,120);
  }

  function formulaStore(win,subjectId,root){
    const old=read(win,FORMULA_KEY(subjectId),[]),stored=Array.isArray(old)?old:[];
    const merged=unique([...stored,...formulaCandidates(root)]).slice(0,120);
    if(JSON.stringify(merged)!==JSON.stringify(stored))write(win,FORMULA_KEY(subjectId),merged);
    return merged;
  }

  function renderFormulaSheet(host,win,subjectId,root){
    const formulas=formulaStore(win,subjectId,root);host.replaceChildren();const title=host.ownerDocument.createElement("strong");title.textContent="Machete acumulativo";host.append(title);
    if(!formulas.length){const empty=host.ownerDocument.createElement("div");empty.className="solved-formula-sheet-empty";empty.textContent="Todavía no hay fórmulas cargadas. Cuando aparezcan en el resumen, se van a sumar automáticamente acá.";host.append(empty);return}
    formulas.forEach(value=>{const item=host.ownerDocument.createElement("div");item.className="solved-formula-chip";item.textContent=value;host.append(item)});
  }

  function addSidecarTabs({doc,sidebar,subjectId,root,formulaRoot=root,modeHost=root}){
    if(!sidebar||sidebar.dataset.solvedSidecarV4)return;
    sidebar.dataset.solvedSidecarV4="1";
    const tabs=doc.createElement("div");tabs.className="solved-sidecar-tabs";tabs.innerHTML='<button type="button" data-sidecar-mode="index">Índice</button><button type="button" data-sidecar-mode="formulas">Machete</button>';
    const formula=doc.createElement("div");formula.className="solved-formula-sheet";
    const brand=sidebar.querySelector(".qb-sidebar-brand,header");brand?.after(tabs);if(!brand)sidebar.prepend(tabs);tabs.after(formula);
    const apply=mode=>{mode=mode==="index"?"index":"formulas";modeHost.classList.toggle("solved-sidecar-formulas",mode==="formulas");sidebar.classList.toggle("solved-sidecar-formulas",mode==="formulas");tabs.querySelectorAll("button").forEach(button=>button.classList.toggle("active",button.dataset.sidecarMode===mode));formula.hidden=mode!=="formulas";write(doc.defaultView,SIDE_MODE_KEY(subjectId),mode);if(mode==="formulas")renderFormulaSheet(formula,doc.defaultView,subjectId,formulaRoot)};
    tabs.querySelectorAll("button").forEach(button=>button.onclick=()=>apply(button.dataset.sidecarMode));
    apply(read(doc.defaultView,SIDE_MODE_KEY(subjectId),"formulas"));
    let timer;new doc.defaultView.MutationObserver(()=>{clearTimeout(timer);timer=setTimeout(()=>{if(!formula.hidden)renderFormulaSheet(formula,doc.defaultView,subjectId,formulaRoot)},180)}).observe(formulaRoot,{childList:true,subtree:true,characterData:true});
  }

  function selectedMarks(doc,selector){
    const selection=doc.getSelection?.();if(!selection||selection.rangeCount<1||selection.isCollapsed)return [];
    const range=selection.getRangeAt(0);return [...doc.querySelectorAll(selector)].filter(mark=>{try{return range.intersectsNode(mark)}catch{return false}});
  }

  function unwrap(mark){const parent=mark.parentNode;if(!parent)return;while(mark.firstChild)parent.insertBefore(mark.firstChild,mark);mark.remove();parent.normalize?.()}

  function enableSkeletonUnhighlight(root){
    if(root.dataset.solvedUnhighlightV4)return;root.dataset.solvedUnhighlightV4="1";
    const id=root.dataset.skeletonSubject,key=`solved-qbi-style-highlights-v2:${id}`,button=root.querySelector("[data-highlight]"),help=root.querySelector("[data-note-help]");if(!button)return;
    const toggle=event=>{const marks=selectedMarks(document,"mark[data-skeleton-highlight-id]").filter(mark=>root.contains(mark));if(!marks.length)return;event.preventDefault();event.stopImmediatePropagation();const data=read(window,key,{});const ids=new Set(marks.map(mark=>mark.dataset.skeletonHighlightId).filter(Boolean));for(const hid of ids)delete data[hid];write(window,key,data);root.querySelectorAll("mark[data-skeleton-highlight-id]").forEach(mark=>{if(ids.has(mark.dataset.skeletonHighlightId))unwrap(mark)});document.getSelection()?.removeAllRanges();if(help)help.textContent="Resaltado eliminado. Seleccioná texto y tocá Resaltar para marcar o desmarcar."};
    button.addEventListener("mousedown",toggle,true);button.addEventListener("touchstart",toggle,{capture:true,passive:false});
    if(help)help.textContent="Seleccioná texto y tocá Resaltar. Si ya estaba marcado, se desresalta.";
  }

  function enableSkeletonScroll(root){
    if(root.dataset.solvedContinuousScrollV4)return;root.dataset.solvedContinuousScrollV4="1";
    root.querySelectorAll(".subject-skeleton-section").forEach(section=>{section.hidden=false;section.style.removeProperty("display")});
    const workspace=document.querySelector(".workspace");if(!workspace)return;
    root.addEventListener("wheel",event=>{if(event.target.closest(".subject-skeleton-index,.skeleton-note-editor,textarea,input,select"))return;if(Math.abs(event.deltaY)<1)return;workspace.scrollTop+=event.deltaY;event.preventDefault()},{passive:false});
    let lastY=null;root.addEventListener("touchstart",event=>{if(event.touches.length===1&&!event.target.closest(".subject-skeleton-index,.skeleton-note-editor,textarea,input,select"))lastY=event.touches[0].clientY},{passive:true});
    root.addEventListener("touchmove",event=>{if(lastY===null||event.touches.length!==1)return;const y=event.touches[0].clientY,delta=lastY-y;if(Math.abs(delta)>1){workspace.scrollTop+=delta;lastY=y;event.preventDefault()}},{passive:false});
    root.addEventListener("touchend",()=>{lastY=null},{passive:true});
  }

  function enhanceSkeleton(root){
    if(!root)return;const id=root.dataset.skeletonSubject;if(!id)return;
    const sidebar=root.querySelector(".subject-skeleton-index,.qb-sidebar");
    addSidecarTabs({doc:document,sidebar,subjectId:id,root,formulaRoot:root.querySelector(".subject-skeleton-main")||root,modeHost:root});
    enableSkeletonUnhighlight(root);enableSkeletonScroll(root);
  }

  function frameSubject(frame,doc){
    if(frame.classList.contains("stats-integral-document"))return "estadistica";
    const src=frame.getAttribute("srcdoc")||"",title=text(doc.title);
    if(src.includes("QBI_PAYLOAD_VERSION")||/Química Biológica/i.test(title)||doc.querySelector(".qbi-integrated-map-head,.qbi-summary"))return "quimica_biologica1";
    if(/Estadística/i.test(title))return "estadistica";
    if(/Física/i.test(title)||doc.querySelector(".main-content .page-header"))return "fisica1";
    return currentSubject();
  }

  function injectFrameStyle(doc){
    if(doc.getElementById(FRAME_STYLE_ID))return;
    const style=doc.createElement("style");style.id=FRAME_STYLE_ID;style.textContent=`
      .solved-sidecar-tabs{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:8px 10px;border-bottom:1px solid var(--qb-border,#dce2e9);background:var(--qb-panel,#fff);position:sticky;top:0;z-index:9}
      .solved-sidecar-tabs button{min-height:32px;border:1px solid var(--qb-border,#dce2e9);border-radius:9px;background:var(--qb-bg,#f8fafc);color:var(--qb-ink,#202a38);font:inherit;font-size:.76rem;font-weight:850;cursor:pointer}.solved-sidecar-tabs button.active{border-color:var(--qb-accent,#c88918);background:var(--qb-accent-soft,#fff2d4);color:var(--qb-accent-strong,#76500c)}
      .solved-formula-sheet{padding:8px 11px 13px}.solved-formula-sheet>strong{display:block;padding:7px 2px 5px;font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--qb-muted,#596577)}.solved-formula-sheet-empty{padding:10px;border:1px dashed var(--qb-border,#dce2e9);border-radius:10px;color:var(--qb-muted,#596577);font-size:.75rem;line-height:1.4;background:var(--qb-accent-faint,#f8fafc)}.solved-formula-chip{display:block;width:100%;margin:5px 0;padding:8px 9px;border:1px solid var(--qb-border,#dce2e9);border-left:3px solid var(--qb-accent,#c88918);border-radius:9px;background:var(--qb-panel,#fff);color:var(--qb-ink,#202a38);font:700 .76rem/1.35 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;overflow-wrap:anywhere}
      .solved-sidecar-formulas .qb-search,.solved-sidecar-formulas .qb-search-results,.solved-sidecar-formulas .qb-index{display:none!important}
      @media(min-width:760px){.qb-sidebar.solved-fixed-study-sidebar,.summary-index.solved-fixed-study-sidebar{position:fixed!important;top:14px!important;left:14px!important;bottom:14px!important;width:252px!important;height:auto!important;max-height:none!important;margin:0!important;overflow:auto!important;z-index:2147481500!important}.qb-doc-shell.solved-has-fixed-study-sidebar{display:grid!important;grid-template-columns:280px minmax(0,1fr)!important;align-items:start!important}.qb-doc-shell.solved-has-fixed-study-sidebar>.qb-document,.qb-doc-shell.solved-has-fixed-study-sidebar>main{grid-column:2!important;min-width:0!important}}
    `;doc.head.append(style);
  }

  function enableFrameUnhighlight(doc,subjectId){
    if(doc.documentElement.dataset.solvedUnhighlightV4)return;doc.documentElement.dataset.solvedUnhighlightV4="1";
    const button=doc.querySelector("[data-integral-highlight]");if(!button)return;
    const toggle=event=>{const marks=selectedMarks(doc,"mark[data-integral-highlight-id]");if(!marks.length)return;event.preventDefault();event.stopImmediatePropagation();const key=`solved-integral-highlights-v2:${subjectId}`,data=read(doc.defaultView,key,{}),ids=new Set(marks.map(mark=>mark.dataset.integralHighlightId).filter(Boolean));for(const id of ids)delete data[id];write(doc.defaultView,key,data);doc.querySelectorAll("mark[data-integral-highlight-id]").forEach(mark=>{if(ids.has(mark.dataset.integralHighlightId))unwrap(mark)});doc.getSelection()?.removeAllRanges();const help=doc.querySelector("[data-integral-help]");if(help)help.textContent="Resaltado eliminado. Seleccioná texto y tocá Resaltar para marcar o desmarcar."};
    button.addEventListener("mousedown",toggle,true);button.addEventListener("touchstart",toggle,{capture:true,passive:false});
    const help=doc.querySelector("[data-integral-help]");if(help)help.textContent="Seleccioná texto y tocá Resaltar. Si ya estaba marcado, se desresalta.";
  }

  function enhanceFrame(frame){
    let doc;try{doc=frame.contentDocument}catch{return}if(!doc?.documentElement)return;const subjectId=frameSubject(frame,doc);if(!subjectId)return;
    injectFrameStyle(doc);
    const root=doc.querySelector(".qb-summary,.main-content")||doc.body,sidebar=doc.querySelector(".qb-sidebar,.summary-index,#qbSidebar");
    if(sidebar){sidebar.classList.add("solved-fixed-study-sidebar");sidebar.closest(".qb-doc-shell")?.classList.add("solved-has-fixed-study-sidebar");addSidecarTabs({doc,sidebar,subjectId,root,formulaRoot:root,modeHost:sidebar})}
    enableFrameUnhighlight(doc,subjectId);
  }

  function watchFrame(frame){
    if(!(frame instanceof HTMLIFrameElement)||frame.dataset.solvedChromeV4)return;frame.dataset.solvedChromeV4="1";frame.addEventListener("load",()=>setTimeout(()=>enhanceFrame(frame),80));setTimeout(()=>enhanceFrame(frame),80);
  }

  let scanTimer;
  function scan(){
    clearTimeout(scanTimer);scanTimer=setTimeout(()=>{installAppSidebar();document.querySelectorAll(".subject-skeleton").forEach(enhanceSkeleton);document.querySelectorAll("iframe").forEach(watchFrame)},80);
  }

  function boot(){
    injectParentStyle();installAppSidebar();scan();
    new MutationObserver(records=>{let relevant=false;for(const record of records)for(const node of record.addedNodes){if(node.nodeType!==1)continue;relevant=true;if(node.tagName==="IFRAME")watchFrame(node);node.querySelectorAll?.("iframe").forEach(watchFrame)}if(relevant)scan()}).observe(document.documentElement,{childList:true,subtree:true});
    addEventListener("pageshow",scan);addEventListener("lbt-app-ready",scan);addEventListener("focus",scan);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
