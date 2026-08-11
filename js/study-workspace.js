(function(){
  "use strict";
  const DB=window.LBT_DB,TABS={summary:"Resumen",glossary:"Glosario",cards:"Tarjetas",exercises:"Ejercicios",map:"Mapa mental",formulas:"Fórmulas"};
  let context=null,records=[],pendingFile=null,editingId=null;
  const $=id=>document.getElementById(id),safe=value=>String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const key=ctx=>`solved-study-workspace-v2:${ctx?.subjectId||"global"}`;
  const defaults=()=>({mode:"single",ratio:50,collapsed:null,left:"tab:summary",right:"tab:cards",unitId:null,tabContext:null});
  function loadLayout(){try{return {...defaults(),...JSON.parse(localStorage.getItem(key(context))||"{}")}}catch(_){return defaults()}}
  function saveLayout(state){state.subjectId=context?.subjectId||null;state.unitId=context?.unitId||null;localStorage.setItem(key(context),JSON.stringify(state));return state}
  const uuid=()=>crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const isOwner=()=>window.SOLVED_AUTH?.profile()?.role==="owner";

  function prepareDocument(source,{preview=false}={}){
    const doc=new DOMParser().parseFromString(String(source||""),"text/html");
    doc.querySelectorAll("base,meta[http-equiv='Content-Security-Policy']").forEach(node=>node.remove());
    if(!doc.querySelector('meta[name="viewport"]')){
      const viewport=doc.createElement("meta");
      viewport.name="viewport";
      viewport.content="width=device-width, initial-scale=1, viewport-fit=cover";
      doc.head.prepend(viewport);
    }
    doc.querySelectorAll("a[href]").forEach(link=>{
      if(!String(link.getAttribute("href")).startsWith("#")){link.target="_blank";link.rel="noopener noreferrer"}
    });
    if(preview)doc.querySelectorAll("script,iframe,object,embed,form").forEach(node=>node.remove());
    const csp=doc.createElement("meta");
    csp.httpEquiv="Content-Security-Policy";
    csp.content=preview
      ? "default-src data: blob: https:; img-src data: blob: https:; media-src data: blob: https:; font-src data: blob: https:; style-src 'unsafe-inline' data: blob: https:; script-src 'none'; connect-src 'none'; frame-src 'none'; form-action 'none'; base-uri 'none'"
      : "default-src data: blob: https:; img-src data: blob: https:; media-src data: blob: https:; font-src data: blob: https:; style-src 'unsafe-inline' data: blob: https:; script-src 'unsafe-inline' 'unsafe-eval' data: blob: https:; connect-src https:; frame-src https:; form-action 'none'; base-uri 'none'";
    doc.head.prepend(csp);
    if(!preview){
      const bridge=doc.createElement("script");
      bridge.textContent=`addEventListener('message',e=>{if(e.data?.type==='solved-copy-selection')parent.postMessage({type:'solved-html-selection',text:getSelection()?.toString()||''},'*')});`;
      doc.body.append(bridge);
    }
    return "<!doctype html>\n"+doc.documentElement.outerHTML;
  }
  const sanitize=source=>prepareDocument(source);
  const sanitizePreview=source=>prepareDocument(source,{preview:true});
  const validFile=file=>!!file&&/\.(txt|md|pdf|html?)$/i.test(file.name);

  async function refresh(){
    const migrated=await DB.get("meta","user-materials-html-v1");
    if(!migrated){
      for(const old of await DB.getAll("importedHtml"))await DB.put("userMaterials",{
        id:old.id,userId:old.ownerId||null,subjectId:old.subjectId,section:"summary",type:"html",title:old.title||"HTML personal",
        textContent:old.htmlContent||"",originalFilename:old.originalFilename||null,mimeType:"text/html",order:old.order||0,
        createdAt:old.createdAt,updatedAt:old.updatedAt,deletedAt:old.deletedAt||null
      });
      await DB.put("meta",{key:"user-materials-html-v1",done:true,updatedAt:new Date().toISOString()});
    }
    records=[...(await DB.getAll("officialMaterials")),...(await DB.getAll("userMaterials"))]
      .filter(item=>!item.deletedAt)
      .sort((a,b)=>(a.subjectId||"").localeCompare(b.subjectId||"")||(a.order||0)-(b.order||0));
    return records;
  }
  const currentRecords=()=>records.filter(item=>item.subjectId===context?.subjectId);
  const currentHtml=()=>currentRecords().filter(item=>item.type==="html");
  const materialValue=item=>`material:${item.id}`;
  const findMaterial=value=>records.find(item=>materialValue(item)===value||`html:${item.id}`===value);

  function normalize(state){
    const valid=value=>value?.startsWith("tab:")&&TABS[value.slice(4)]||value==="library:html"||value?.startsWith("material:")&&currentRecords().some(item=>materialValue(item)===value)||value?.startsWith("html:")&&currentRecords().some(item=>`html:${item.id}`===value);
    if(!valid(state.left))state.left=`tab:${context?.tab||"summary"}`;
    if(!valid(state.right))state.right="tab:cards";
    state.ratio=Math.min(90,Math.max(10,Number(state.ratio)||50));
    if(!["left","right",null].includes(state.collapsed))state.collapsed=null;
    state.unitId=context?.unitId||null;
    return state;
  }

  function options(selected){
    const htmlCount=currentHtml().length;
    const tabs=Object.entries(TABS).map(([id,title])=>`<option value="tab:${id}" ${selected===`tab:${id}`?"selected":""}>${title}</option>`).join("");
    const library=htmlCount?`<option value="library:html" ${selected==="library:html"?"selected":""}>Biblioteca · Todos los HTML (${htmlCount})</option>`:"";
    const materials=currentRecords().map(item=>`<option value="material:${item.id}" ${selected===`material:${item.id}`||selected===`html:${item.id}`?"selected":""}>${item.origin==="official"?"SOLved":"Mi"} ${String(item.type||"archivo").toUpperCase()} · ${safe(item.title||item.originalFilename||"Sin título")}</option>`).join("");
    return tabs+library+materials;
  }

  function panel(side,state){
    const value=state[side],material=findMaterial(value),title=value==="library:html"?"Biblioteca de HTML":material?.title||TABS[value.slice(4)]||"Contenido",collapsed=state.collapsed===side;
    return `<section class="workspace-panel ${collapsed?"is-collapsed":""}" data-side="${side}"><header class="workspace-panel-head"><select aria-label="Contenido del panel ${side}">${options(value)}</select><strong>${safe(title)}</strong><button data-panel-action="collapse">${collapsed?"Restaurar":"Colapsar"}</button><button data-panel-action="expand">Expandir</button><button data-panel-action="close">Cerrar</button></header><div class="workspace-panel-scroll content-pane"></div></section>`;
  }

  function manageButtons(item,{reorder=false}={}){
    if(item.origin==="official"){
      if(!isOwner())return "";
      return `<button data-material-edit="${safe(item.id)}">Editar</button><button class="danger-btn" data-material-delete="${safe(item.id)}">Eliminar</button>`;
    }
    return `<button data-material-edit="${safe(item.id)}">Editar</button>${reorder?`<button data-material-up="${safe(item.id)}" title="Mover arriba">↑</button><button data-material-down="${safe(item.id)}" title="Mover abajo">↓</button>`:""}<button class="danger-btn" data-material-delete="${safe(item.id)}">Eliminar</button>`;
  }

  function htmlViewer(item){
    return `<article class="html-viewer personal-material" data-html-id="${safe(item.id)}"><header class="html-viewer-toolbar"><strong>${safe(item.title||item.originalFilename||"HTML")}</strong><div><button data-html-action="zoom-out">−</button><span data-html-zoom>100%</span><button data-html-action="zoom-in">+</button><button data-html-action="reload">Recargar</button><button data-html-action="copy">Copiar selección</button><button data-html-action="download">Descargar</button>${manageButtons(item)}<button data-html-action="fullscreen">Modo lectura</button></div></header><iframe class="imported-html-frame" title="${safe(item.title||"HTML")}" sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"></iframe></article>`;
  }
  function materialActions(item){const controls=manageButtons(item,{reorder:true});return controls?`<div class="personal-actions">${controls}</div>`:""}
  function textViewer(item){return `<article class="content-card personal-material"><span class="library-label">${item.origin==="official"?"Biblioteca SOLved":"Mis apuntes"}</span><h2>${safe(item.title||item.originalFilename||"Sin título")}</h2><div class="personal-text">${safe(item.textContent).replace(/\n/g,"<br>")}</div>${materialActions(item)}</article>`}
  function pdfViewer(item){return `<article class="html-viewer personal-material" data-material-id="${safe(item.id)}"><header class="html-viewer-toolbar"><strong>${safe(item.title||item.originalFilename||"PDF personal")}</strong>${materialActions(item)}</header><iframe class="personal-pdf-frame" title="${safe(item.title||"PDF personal")}"></iframe></article>`}

  function libraryCard(item){
    const origin=item.origin==="official"?"Biblioteca SOLved":"Mi HTML";
    return `<article class="material-library-card" data-library-id="${safe(item.id)}"><header class="material-library-card-head"><div><strong title="${safe(item.title||item.originalFilename||"HTML")}">${safe(item.title||item.originalFilename||"HTML")}</strong><small>${safe(origin)}</small></div></header><div class="material-library-preview" aria-hidden="true"><iframe class="material-library-preview-frame" data-preview-html-id="${safe(item.id)}" title="Vista previa de ${safe(item.title||"HTML")}" sandbox="" loading="lazy" tabindex="-1"></iframe></div><div class="material-library-card-actions"><button class="material-library-open" data-open-material="${safe(item.id)}">Abrir</button>${manageButtons(item)}</div></article>`;
  }
  function libraryView(items,{title="Biblioteca de HTML",all=false}={}){
    const htmlItems=(items||[]).filter(item=>item.type==="html");
    if(!htmlItems.length)return all?'<div class="empty-state"><strong>No hay HTML cargados en esta materia</strong><p>Cuando subas uno, va a aparecer acá como tarjeta.</p></div>':"";
    return `<section class="material-library"><header class="material-library-head"><div><span class="library-label">Biblioteca SOLved</span><h2>${safe(title)}</h2></div>${!all&&currentHtml().length>htmlItems.length?'<button class="material-library-all" data-open-library>Ver todos los HTML</button>':""}</header><div class="material-library-grid">${htmlItems.map(libraryCard).join("")}</div></section>`;
  }
  function bindLibrary(host,side){
    host.querySelectorAll("[data-preview-html-id]").forEach(frame=>{
      const item=records.find(value=>value.id===frame.dataset.previewHtmlId);
      if(item)frame.srcdoc=sanitizePreview(item.textContent||"");
    });
    host.querySelectorAll("[data-open-material]").forEach(button=>button.onclick=()=>openMaterial(button.dataset.openMaterial,{side}));
    host.querySelectorAll("[data-open-library]").forEach(button=>button.onclick=async()=>{
      const state=normalize(loadLayout());
      const target=state.mode==="single"?"left":side;
      state[target]="library:html";state.collapsed=null;state.tabContext=context?.tab||null;saveLayout(state);await render(context);
    });
  }

  function sectionExtras(section){
    const items=currentRecords().filter(item=>item.section===section),htmlItems=items.filter(item=>item.type==="html"),others=items.filter(item=>item.type!=="html");
    const html=libraryView(htmlItems,{title:"HTML de esta sección"});
    const official=others.filter(item=>item.origin==="official").map(item=>item.type==="pdf"?pdfViewer(item):textViewer(item)).join("");
    const personal=others.filter(item=>item.origin!=="official");
    const personalMarkup=personal.length?`<section class="personal-section"><header><span>Mis apuntes</span><button data-add-personal="${safe(section)}">+ Agregar contenido personal</button></header>${personal.map(item=>item.type==="pdf"?pdfViewer(item):textViewer(item)).join("")}</section>`:"";
    return html+official+personalMarkup;
  }

  async function deleteMaterial(item){
    if(!item)return;
    if(item.origin==="official"){
      if(!isOwner())throw Error("No tenés permiso para eliminar material oficial");
      await window.SOLVED_CLOUD?.deleteOfficialMaterial?.(item.id);
    }else{
      const stamp=new Date().toISOString();
      await DB.put("userMaterials",{...item,deletedAt:stamp,updatedAt:stamp});
      window.dispatchEvent(new CustomEvent("solved-user-material-changed"));
    }
    await render(context);
  }

  function bindMaterialActions(host){
    host.querySelectorAll("[data-add-personal]").forEach(button=>button.onclick=()=>openImport(null,button.dataset.addPersonal));
    host.querySelectorAll("[data-material-edit]").forEach(button=>button.onclick=()=>openImport(records.find(item=>item.id===button.dataset.materialEdit)));
    host.querySelectorAll("[data-material-delete]").forEach(button=>button.onclick=async()=>{
      const item=records.find(value=>value.id===button.dataset.materialDelete);
      if(!item||!confirm(`¿Eliminar “${item.title||item.originalFilename||"este apunte"}”? Esta acción no se puede deshacer.`))return;
      try{button.disabled=true;await deleteMaterial(item)}catch(error){button.disabled=false;window.dispatchEvent(new CustomEvent("solved-toast",{detail:error.message||"No se pudo eliminar el material"}))}
    });
    for(const direction of ["up","down"])host.querySelectorAll(`[data-material-${direction}]`).forEach(button=>button.onclick=async()=>{
      const keyName=`material${direction[0].toUpperCase()+direction.slice(1)}`,item=records.find(value=>value.id===button.dataset[keyName]),delta=direction==="up"?-1:1;
      if(item&&item.origin!=="official"){
        await DB.put("userMaterials",{...item,order:(item.order||0)+delta*1.5,updatedAt:new Date().toISOString()});
        await render(context);
      }
    });
  }

  function loadPdf(frame,item){
    if(!item?.blobContent||!frame)return;
    const url=URL.createObjectURL(item.blobContent);
    frame.src=url;
    frame.addEventListener("load",()=>setTimeout(()=>URL.revokeObjectURL(url),1000),{once:true});
  }

  function fillPanel(panel,value){
    const host=panel.querySelector(".workspace-panel-scroll"),side=panel.dataset.side,item=findMaterial(value);
    host.classList.toggle("is-material-view",!!item);
    host.classList.toggle("is-library-view",value==="library:html");
    if(item){
      host.innerHTML=item.type==="html"?htmlViewer(item):item.type==="pdf"?pdfViewer(item):textViewer(item);
      if(item.type==="html"){
        const viewer=host.querySelector(`.html-viewer[data-html-id="${CSS.escape(item.id)}"]`)||host.querySelector(".html-viewer");
        const frame=viewer?.querySelector(".imported-html-frame");
        if(frame)frame.srcdoc=sanitize(item.textContent||"");
        if(viewer)bindHtmlViewer(viewer,item);
      }
      if(item.type==="pdf")loadPdf(host.querySelector(".personal-pdf-frame"),item);
      bindMaterialActions(host);
      return;
    }
    if(value==="library:html"){
      host.innerHTML=libraryView(currentHtml(),{title:"Todos los HTML",all:true});
      bindLibrary(host,side);
      bindMaterialActions(host);
      return;
    }
    const tab=value.slice(4),supportsMaterials=["summary","glossary"].includes(tab);
    host.innerHTML=`<div class="official-section"><span class="library-label">Biblioteca SOLved</span>${context.contentByTab[tab]||'<div class="content-card empty-state">Todavía no hay contenido publicado para esta sección.</div>'}${supportsMaterials?sectionExtras(tab):""}</div>`;
    window.LBT_CONTENT?.bind(host);
    if(supportsMaterials)bindLibrary(host,side);
    host.querySelectorAll(".personal-pdf-frame").forEach(frame=>{
      const material=records.find(value=>value.id===frame.closest(".personal-material")?.dataset.materialId);
      loadPdf(frame,material);
    });
    bindMaterialActions(host);
  }

  function bindPanels(root,state){
    root.querySelectorAll(".workspace-panel").forEach(panel=>{
      const side=panel.dataset.side,select=panel.querySelector("select");
      fillPanel(panel,state[side]);
      select.onchange=async()=>{
        state[side]=select.value;state.tabContext=context?.tab||null;state.collapsed=null;saveLayout(normalize(state));await render(context);
      };
      panel.querySelector('[data-panel-action="collapse"]').onclick=()=>{state.collapsed=state.collapsed===side?null:side;saveLayout(state);render(context)};
      panel.querySelector('[data-panel-action="expand"]').onclick=()=>{state.collapsed=side==="left"?"right":"left";saveLayout(state);render(context)};
      panel.querySelector('[data-panel-action="close"]').onclick=()=>{state.mode="single";state.left=state[side];state.collapsed=null;state.tabContext=context?.tab||null;saveLayout(state);render(context)};
    });
  }

  function bindDivider(root,state){
    const divider=root.querySelector(".workspace-divider");if(!divider)return;
    const vertical=()=>matchMedia("(max-width:760px)").matches,apply=value=>{state.ratio=Math.min(90,Math.max(10,value));root.style.setProperty("--split",`${state.ratio}%`);divider.setAttribute("aria-valuenow",String(Math.round(state.ratio)))};
    const end=event=>{try{divider.releasePointerCapture(event.pointerId)}catch(_){}divider.onpointermove=null;divider.onpointerup=null;divider.onpointercancel=null;saveLayout(state)};
    divider.onpointerdown=event=>{try{divider.setPointerCapture(event.pointerId)}catch(_){}divider.onpointermove=move=>{const rect=root.getBoundingClientRect();apply(vertical()?(move.clientY-rect.top)/rect.height*100:(move.clientX-rect.left)/rect.width*100)};divider.onpointerup=end;divider.onpointercancel=end};
    divider.onkeydown=event=>{const delta=event.key===(vertical()?"ArrowDown":"ArrowRight")?2:event.key===(vertical()?"ArrowUp":"ArrowLeft")?-2:0;if(delta){event.preventDefault();apply(state.ratio+delta);saveLayout(state)}};
  }

  async function render(next){
    context=next;await refresh();
    const state=normalize(loadLayout()),root=$("studyBody");
    if(state.tabContext!==context.tab){
      state.tabContext=context.tab;
      if(state.mode==="single")state.left=`tab:${context.tab}`;
    }
    saveLayout(state);
    root.className=`study-body workspace-${state.mode}`;
    root.style.setProperty("--split",`${state.ratio}%`);
    if(state.mode==="single"){
      root.innerHTML=panel("left",state);bindPanels(root,state);
    }else{
      root.innerHTML=panel("left",state)+`<div class="workspace-divider" role="separator" aria-label="Ajustar tamaño de paneles" aria-orientation="${matchMedia("(max-width:760px)").matches?"horizontal":"vertical"}" aria-valuemin="10" aria-valuemax="90" aria-valuenow="${Math.round(state.ratio)}" tabindex="0"><i></i></div>`+panel("right",state);
      bindPanels(root,state);bindDivider(root,state);
    }
    $("splitViewBtn").setAttribute("aria-pressed",String(state.mode==="split"));
    $("splitViewBtn").classList.toggle("active",state.mode==="split");
    return root;
  }

  async function openMaterial(id,{side="left",reading=false}={}){
    await refresh();
    const item=currentRecords().find(value=>value.id===id);
    if(!item)throw Error("No se encontró ese material en esta materia");
    const state=normalize(loadLayout());
    if(state.mode==="single")side="left";
    state[side]=materialValue(item);state.collapsed=null;state.tabContext=context?.tab||null;saveLayout(state);
    await render(context);
    if(reading)requestAnimationFrame(()=>document.querySelector("#readingBtn")?.click());
    return item;
  }

  async function openInPanel({side="left",tab="summary",anchor="",section=""}={}){
    const state=normalize(loadLayout());
    if(state.mode==="single"){
      side="left";context.tab=tab;$("studyPage").dataset.tab=tab;
      document.querySelectorAll("#studyTabs .tab").forEach(button=>button.classList.toggle("active",button.dataset.tab===tab));
    }
    state[side]=`tab:${tab}`;state.tabContext=tab;state.collapsed=null;saveLayout(state);await render(context);
    const panel=$("studyBody").querySelector(`[data-side="${side}"]`),frame=panel?.querySelector(".rich-document");
    if(!frame||(!anchor&&!section))return {found:!anchor};
    return new Promise(resolve=>{
      const token=uuid(),timer=setTimeout(()=>{removeEventListener("message",receive);resolve({found:false})},5000),send=()=>frame.contentWindow?.postMessage({type:"lbt-qbi-navigate",section,anchor,token},"*"),receive=event=>{if(event.source!==frame.contentWindow||event.data?.type!=="lbt-qbi-navigate-result"||event.data.token!==token)return;clearTimeout(timer);removeEventListener("message",receive);resolve({found:!!event.data.found})};
      addEventListener("message",receive);frame.addEventListener("load",send,{once:true});if(frame.contentDocument?.readyState==="complete")send();
    });
  }

  function toggleSplit(){const state=normalize(loadLayout());state.mode=state.mode==="split"?"single":"split";state.collapsed=null;state.tabContext=context?.tab||state.tabContext;saveLayout(state);render(context)}

  function applyFrameZoom(frame,zoom){
    frame.style.zoom="";
    frame.style.transformOrigin="0 0";
    frame.style.transform=`scale(${zoom})`;
    frame.style.width=`${100/zoom}%`;
    frame.style.height=`${100/zoom}%`;
  }
  function bindHtmlViewer(viewer,item){
    const frame=viewer.querySelector(".imported-html-frame");if(!frame)return;
    let zoom=1;
    viewer.querySelectorAll("[data-html-action]").forEach(button=>button.onclick=async()=>{
      const action=button.dataset.htmlAction;
      if(action==="zoom-in"||action==="zoom-out"){
        zoom=Math.min(2,Math.max(.5,zoom+(action==="zoom-in"?.1:-.1)));applyFrameZoom(frame,zoom);
        viewer.querySelector("[data-html-zoom]").textContent=`${Math.round(zoom*100)}%`;return;
      }
      if(action==="reload"){const src=frame.srcdoc;frame.srcdoc="";requestAnimationFrame(()=>frame.srcdoc=src);return}
      if(action==="copy"){frame.contentWindow?.postMessage({type:"solved-copy-selection"},"*");return}
      if(action==="fullscreen"){
        const readingBtn=document.querySelector("#readingBtn");
        if(readingBtn){readingBtn.click();return}
        if(frame.requestFullscreen)await frame.requestFullscreen();
        return;
      }
      if(action==="download")download(item);
    });
  }

  function download(item){const link=document.createElement("a");link.href=URL.createObjectURL(new Blob([item.textContent||""],{type:"text/html;charset=utf-8"}));link.download=item.originalFilename||`${item.title||"material"}.html`;link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1000)}
  async function update(item,changes){await DB.put("userMaterials",{...item,...changes,updatedAt:new Date().toISOString()});await render(context)}
  async function duplicate(item){const stamp=new Date().toISOString();await DB.put("userMaterials",{...item,id:uuid(),title:`${item.title} (copia)`,createdAt:stamp,updatedAt:stamp,order:Math.max(0,...currentRecords().map(value=>value.order||0))+1});await render(context)}

  function openImport(item=null,section=context?.tab){
    editingId=item?.id||null;pendingFile=null;$("htmlImportForm").reset();
    $("htmlImportTitle").textContent=item?.origin==="official"?"Editar material de Biblioteca SOLved":item?"Editar contenido personal":"Agregar contenido personal";
    $("materialSection").value=item?.section||(["summary","glossary"].includes(section)?section:"summary");
    $("htmlTitleInput").value=item?.title||"";
    $("materialTextInput").value=["text","markdown"].includes(item?.type)?item.textContent||"":"";
    $("htmlPreviewFrame").src="";$("htmlPreviewFrame").srcdoc=item?.type==="html"?sanitize(item.textContent):"";
    $("officialMaterialLabel").hidden=!isOwner();$("officialMaterialInput").checked=item?.origin==="official";
    $("htmlImportMessage").textContent=item?.type==="html"?"Podés cambiar el título o elegir otro HTML para reemplazarlo.":item?"Editá el contenido y guardá los cambios.":"Podés escribir directamente o elegir TXT, Markdown, PDF, HTML o HTM.";
    $("htmlImportSave").disabled=false;$("htmlImportSave").textContent="Guardar";$("htmlImportModal").hidden=false;
  }
  function closeImport(){$("htmlImportModal").hidden=true;pendingFile=null;editingId=null}
  async function readFile(file){if(!validFile(file))throw Error("El archivo debe ser TXT, Markdown, PDF, HTML o HTM.");if(file.size>50*1024*1024)throw Error("El archivo supera el límite de 50 MB.");return /\.pdf$/i.test(file.name)?file:file.text()}
  async function saveImport(event){
    event.preventDefault();
    const button=$("htmlImportSave"),message=$("htmlImportMessage"),existing=editingId?records.find(item=>item.id===editingId):null,stamp=new Date().toISOString(),ownerId=window.SOLVED_AUTH?.profile()?.sub||`guest:${DB.dbName}`;
    button.disabled=true;button.textContent="Guardando…";message.textContent="Guardando…";
    try{
      let type=existing?.type||"text",textContent=existing?.textContent||"",blobContent=existing?.blobContent||null,originalFilename=existing?.originalFilename||null,mimeType=existing?.mimeType||"text/plain";
      if(!existing||["text","markdown"].includes(type))textContent=$("materialTextInput").value;
      if(pendingFile){
        originalFilename=pendingFile.name;mimeType=pendingFile.type||"application/octet-stream";
        if(/\.pdf$/i.test(pendingFile.name)){type="pdf";blobContent=pendingFile;textContent=""}
        else{textContent=await pendingFile.text();type=/\.html?$/i.test(pendingFile.name)?"html":/\.md$/i.test(pendingFile.name)?"markdown":"text";blobContent=null}
      }
      if(!textContent&&!blobContent)throw Error("Escribí texto o elegí un archivo.");
      const item={...existing,id:existing?.id||uuid(),userId:ownerId,subjectId:existing?.subjectId||context.subjectId,section:$("materialSection").value,type,title:$("htmlTitleInput").value.trim(),textContent,blobContent,originalFilename,mimeType,createdAt:existing?.createdAt||stamp,updatedAt:stamp,deletedAt:null,order:existing?.order??Math.max(-1,...currentRecords().map(value=>value.order||0))+1};
      if($("officialMaterialInput").checked){
        if(type==="pdf")throw Error("Por ahora los PDF se guardan como privados. Para publicar usá HTML, TXT o Markdown.");
        await window.SOLVED_CLOUD.publishOfficialMaterial(item);
      }else{
        if(existing?.origin==="official")throw Error("Un material oficial no puede convertirse en privado desde esta edición. Creá una copia personal nueva.");
        await DB.put("userMaterials",item);window.dispatchEvent(new CustomEvent("solved-user-material-changed"));
      }
      closeImport();await render(context);window.dispatchEvent(new CustomEvent("solved-toast",{detail:"Contenido guardado"}));
    }catch(error){message.textContent=error.message||"No se pudo guardar el contenido"}
    finally{if(!$("htmlImportModal").hidden){button.disabled=false;button.textContent="Guardar"}}
  }

  function bind(){
    const upload=$("uploadHtmlBtn"),add=$("addPersonalBtn"),split=$("splitViewBtn");if(!upload||!split)return;
    upload.onclick=()=>openImport(null,"summary");add.onclick=()=>openImport(null,context?.tab);split.onclick=toggleSplit;
    $("htmlImportClose").onclick=$("htmlImportCancel").onclick=closeImport;
    $("materialTextInput").oninput=()=>{$("htmlImportSave").disabled=false};
    $("htmlFileInput").onchange=async event=>{
      try{
        pendingFile=event.target.files[0];const content=await readFile(pendingFile);
        if(!$("htmlTitleInput").value)$("htmlTitleInput").value=pendingFile.name.replace(/\.(txt|md|pdf|html?)$/i,"");
        $("htmlPreviewFrame").src="";
        if(/\.html?$/i.test(pendingFile.name)){$("htmlPreviewFrame").srcdoc=sanitize(content);$("materialTextInput").value=""}
        else if(!/\.pdf$/i.test(pendingFile.name)){$("materialTextInput").value=content;$("htmlPreviewFrame").srcdoc=""}
        else{$("htmlPreviewFrame").srcdoc="";$("htmlPreviewFrame").src=URL.createObjectURL(pendingFile)}
        $("htmlImportMessage").textContent="Vista previa lista para guardar.";$("htmlImportSave").disabled=false;
      }catch(error){pendingFile=null;$("htmlImportMessage").textContent=error.message;$("htmlImportSave").disabled=true}
    };
    $("htmlImportForm").onsubmit=saveImport;
    addEventListener("message",async event=>{if(event.data?.type==="solved-html-selection"&&event.data.text)await navigator.clipboard.writeText(event.data.text)});
    addEventListener("lbt-open-material",event=>{const id=event.detail?.id;if(id)openMaterial(id,{side:event.detail?.side||"left",reading:!!event.detail?.reading}).catch(error=>window.dispatchEvent(new CustomEvent("solved-toast",{detail:error.message}))) });
  }

  document.addEventListener("DOMContentLoaded",bind);
  window.LBT_STUDY_WORKSPACE={render,toggleSplit,openImport,openInPanel,openMaterial,sanitize,sanitizePreview,validFile,refresh};
  addEventListener("solved-user-material-changed",()=>window.LBT_DRIVE_SYNC?.localChanged?.());
})();
