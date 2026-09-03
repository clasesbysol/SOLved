(()=>{
  'use strict';
  const VERSION='1.0.0',MAP_ID='qbi-mapa-integral',NOTES_KEY='qbi-integrated-notes-v1',MAP_STATE_KEY='qbi-integrated-map-open-v1';
  const safe=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const css=`
  #${MAP_ID}{scroll-margin-top:18px;margin:0 0 28px;padding:28px 0 0;border:0;border-radius:0;background:transparent;box-shadow:none}
  .qb-utility-bar,.qb-hero .qb-lead,.qb-hero .qb-build-rule,.qb-hero .qb-hero-badges,.qb-hero .qb-hero-rules{display:none!important}
  .qbi-integrated-map-head{padding:0 0 34px;border-bottom:2px solid var(--qb-border,#ead8df)}.qbi-integrated-map-head h1{max-width:920px;margin:8px 0 0;color:var(--qb-ink,#382734);font-size:clamp(2.2rem,5vw,4.8rem);line-height:1.02;letter-spacing:-.052em}
  .qbi-integrated-map-tools{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:18px 0}.qbi-integrated-map-tools input{flex:1 1 260px;min-height:42px;padding:0 13px;border:1px solid color-mix(in srgb,var(--qb-accent,#e74888) 25%,#ddd);border-radius:11px;background:#fff}.qbi-integrated-map-tools button,.qbi-integrated-side-button{min-height:38px;padding:0 11px;border:1px solid color-mix(in srgb,var(--qb-accent,#e74888) 25%,#ddd);border-radius:10px;background:#fff;color:var(--qb-accent-strong,#8d2452);font-weight:800;cursor:pointer}
  .qbi-integrated-group{margin:16px 0}.qbi-integrated-group>header{display:flex;gap:12px;align-items:flex-start;margin-bottom:10px}.qbi-integrated-group>header>b{display:grid;place-items:center;flex:0 0 34px;height:34px;border-radius:50%;background:var(--qb-accent,#e74888);color:#fff}.qbi-integrated-group h3{margin:0 0 3px}.qbi-integrated-group header p{margin:0;color:var(--qb-muted,#75596a)}
  .qbi-integrated-chapter{margin:9px 0;border:1px solid color-mix(in srgb,var(--qb-accent,#e74888) 20%,#ddd);border-radius:14px;background:rgba(255,255,255,.84);overflow:hidden}.qbi-integrated-chapter>summary{padding:14px 16px;cursor:pointer;font-weight:850;color:var(--qb-accent-strong,#8d2452)}.qbi-integrated-chapter-body{padding:0 16px 16px}.qbi-integrated-intro{color:var(--qb-muted,#75596a)}.qbi-integrated-topics{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px}.qbi-integrated-topic{border:1px solid rgba(113,78,99,.15);border-radius:12px;background:#fff}.qbi-integrated-topic>summary{padding:11px 12px;cursor:pointer;font-weight:800}.qbi-integrated-topic-body{padding:0 12px 12px}.qbi-integrated-topic-body p{margin-top:0;line-height:1.55}.qbi-integrated-deep{padding:10px 12px;border-left:3px solid var(--qb-accent,#e74888);border-radius:0 9px 9px 0;background:var(--qb-accent-soft,#fff0f6)}.qbi-integrated-deep ol{margin:7px 0 0;padding-left:20px}.qbi-integrated-equation{margin:8px 0;padding:9px 11px;border-radius:9px;background:var(--qb-accent-soft,#fff0f6);font-family:'Cambria Math','STIX Two Math',serif;text-align:center}.qbi-map-go{margin-top:10px;border:0;background:transparent;color:var(--qb-accent-strong,#8d2452);font-weight:850;cursor:pointer}.qbi-integrated-visual{margin:11px 0 0;padding:8px;border:1px solid rgba(113,78,99,.14);border-radius:11px;background:#fff}.qbi-integrated-visual svg{display:block;width:100%;height:auto}.qbi-v-axis,.qbi-v-guide{stroke:#9a8691;stroke-width:2;fill:none}.qbi-v-guide{stroke-dasharray:7 7;opacity:.55}.qbi-v-main{stroke:var(--qb-accent,#e74888);stroke-width:6;fill:none}.qbi-v-alt{stroke:#7957c8;stroke-width:5;fill:none}.qbi-v-low{stroke:#2e9a89;stroke-width:5;fill:none}.qbi-integrated-visual text{fill:#67515e;font:18px Inter,Arial,sans-serif}.qbi-v-pore{fill:#f4dbea;stroke:#bd7398;stroke-width:3}.qbi-v-big{fill:#e74888}.qbi-v-small{fill:#7957c8}
  .qbi-note-marker{display:inline-grid;place-items:center;width:26px;height:26px;margin:0 4px;border:2px solid #d8aa28;border-radius:50%;background:#fff2a8;box-shadow:0 3px 10px #735d1830;vertical-align:middle;cursor:pointer;font-size:.76rem}.qbi-note-placement .qb-document{cursor:crosshair}.qbi-note-placement .qb-chapter:hover,.qbi-note-placement #${MAP_ID}:hover{outline:2px dashed color-mix(in srgb,var(--qb-accent,#e74888) 58%,transparent);outline-offset:3px}
  .qbi-note-editor{position:fixed;z-index:10000;right:20px;bottom:20px;width:min(360px,calc(100vw - 28px));overflow:hidden;border:1px solid #e2ca79;border-radius:16px;background:#fffdf2;box-shadow:0 18px 55px rgba(67,49,10,.22)}.qbi-note-editor[hidden]{display:none}.qbi-note-editor header{display:flex;align-items:center;justify-content:space-between;padding:11px 13px;background:#fff0a9}.qbi-note-editor header div{display:flex;gap:5px}.qbi-note-editor button{border:0;border-radius:8px;padding:6px 9px;cursor:pointer}.qbi-note-editor textarea{display:block;width:100%;height:170px;padding:13px;border:0;outline:0;resize:vertical;background:#fffdf2;box-sizing:border-box;font:inherit}.qbi-note-editor small{display:block;padding:0 13px 10px;color:#776b46}
  .qbi-search-stepper{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:7px}.qbi-search-stepper button{min-height:32px;border:1px solid rgba(113,78,99,.18);border-radius:8px;background:#fff;color:inherit;cursor:pointer}.qbi-sidebar-note-help{display:block;margin-top:7px;font-size:.78rem;line-height:1.35;opacity:.7}
  @media(max-width:650px){#${MAP_ID}{padding:14px}.qbi-integrated-topics{grid-template-columns:1fr}.qbi-note-editor{right:14px;bottom:14px}}
  `;

  function visualHtml(kind){
    if(!kind)return '';
    const axes='<path class="qbi-v-axis" d="M48 28 V222 H585"/>';
    const visuals={
      michaelis:'<path class="qbi-v-main" d="M50 220 C115 112 220 62 560 48"/><line class="qbi-v-guide" x1="48" y1="48" x2="560" y2="48"/><line class="qbi-v-guide" x1="48" y1="134" x2="178" y2="134"/><line class="qbi-v-guide" x1="178" y1="134" x2="178" y2="222"/><text x="66" y="43">Vmax</text><text x="184" y="151">KM → Vmax/2</text><text x="88" y="205">casi lineal</text><text x="420" y="78">saturación</text>',
      progress:'<path class="qbi-v-alt" d="M52 44 C190 62 355 128 560 211"/><path class="qbi-v-main" d="M52 216 C195 208 360 136 560 52"/><path class="qbi-v-main" d="M52 211 C75 105 105 104 468 108 C515 110 540 160 558 206"/><text x="505" y="205">S</text><text x="530" y="48">P</text><text x="220" y="99">ES ≈ constante</text>',
      inhibition:'<path class="qbi-v-main" d="M50 220 C115 110 225 66 560 50"/><path class="qbi-v-alt" d="M50 220 C170 150 285 70 560 53"/><path class="qbi-v-low" d="M50 220 C120 150 245 112 560 103"/><text x="404" y="43">sin I</text><text x="390" y="76">competitiva</text><text x="390" y="122">Vmax menor</text>',
      ph:'<path class="qbi-v-main" d="M52 215 C150 210 205 54 310 48 C417 52 462 210 558 216"/><line class="qbi-v-guide" x1="310" y1="48" x2="310" y2="222"/><text x="275" y="244">pH óptimo</text>',
      temperature:'<path class="qbi-v-main" d="M52 216 C165 205 260 135 346 50 C400 72 435 190 558 217"/><line class="qbi-v-guide" x1="346" y1="50" x2="346" y2="222"/><text x="312" y="244">T óptima</text><text x="105" y="190">más choques</text><text x="430" y="174">inactivación</text>',
      'gel-filtration':'<circle class="qbi-v-pore" cx="150" cy="80" r="25"/><circle class="qbi-v-pore" cx="240" cy="145" r="25"/><circle class="qbi-v-pore" cx="350" cy="75" r="25"/><circle class="qbi-v-big" cx="95" cy="55" r="18"/><circle class="qbi-v-small" cx="145" cy="80" r="6"/><path class="qbi-v-main" d="M95 74 C110 125 130 165 500 175"/><path class="qbi-v-alt" d="M145 87 C200 105 200 145 240 145 C290 145 295 80 350 75 C410 72 430 125 500 145"/><text x="385" y="196">grande: camino corto</text><text x="385" y="137">pequeña: entra en poros</text>'
    };
    if(!visuals[kind])return '';
    return '<figure class="qbi-integrated-visual"><svg viewBox="0 0 620 260" role="img" aria-label="Gráfico explicativo">'+(kind==='gel-filtration'?'':axes)+visuals[kind]+'</svg></figure>';
  }
  function topicHtml(topic){
    if(typeof topic==='string')return `<div class="qbi-integrated-topic"><div class="qbi-integrated-topic-body">${safe(topic)}</div></div>`;
    const searchable=normalize([topic.label,topic.explanation,...(topic.deep||[]),...(topic.equations||[])].join(' '));
    return `<details class="qbi-integrated-topic" data-map-search="${safe(searchable)}"><summary>${safe(topic.label)}</summary><div class="qbi-integrated-topic-body"><p>${safe(topic.explanation)}</p>${topic.deep?.length?`<div class="qbi-integrated-deep"><strong>Entenderlo paso a paso</strong><ol>${topic.deep.map(step=>`<li>${safe(step)}</li>`).join('')}</ol></div>`:''}${(topic.equations||[]).map(eq=>`<div class="qbi-integrated-equation">${safe(eq)}</div>`).join('')}${visualHtml(topic.visual)}</div></details>`;
  }
  function chapterHtml(chapter){
    const searchable=normalize([chapter.label,chapter.intro,...chapter.topics.map(topic=>typeof topic==='string'?topic:topic.label+' '+topic.explanation)].join(' '));
    return `<details class="qbi-integrated-chapter" data-map-search="${safe(searchable)}"><summary>${safe(chapter.label)}</summary><div class="qbi-integrated-chapter-body"><p class="qbi-integrated-intro">${safe(chapter.intro)}</p><div class="qbi-integrated-topics">${chapter.topics.map(topicHtml).join('')}</div><button class="qbi-map-go" type="button" data-map-target="${safe(chapter.target)}">Ir a esta parte del resumen →</button></div></details>`;
  }
  function renderMap(){
    const data=window.QBI_MIND_MAP_DATA||[],section=document.createElement('section');section.id=MAP_ID;
    section.innerHTML=`<header class="qbi-integrated-map-head"><h1>QUÍMICA BIOLÓGICA</h1></header><div class="qbi-integrated-map-tools"><input type="search" data-map-filter placeholder="Buscar dentro del mapa…"><button type="button" data-map-expand>Abrir todo</button><button type="button" data-map-collapse>Cerrar todo</button><output data-map-count></output></div>${data.map((group,index)=>`<section class="qbi-integrated-group"><header><b>${index+1}</b><div><h3>${safe(group.label)}</h3><p>${safe(group.description)}</p></div></header>${group.chapters.map(chapterHtml).join('')}</section>`).join('')}`;
    let openState={};try{openState=JSON.parse(localStorage.getItem(MAP_STATE_KEY)||'{}')}catch{}
    const mapDetails=[...section.querySelectorAll('details')];mapDetails.forEach((item,index)=>{item.dataset.mapStateKey=String(index);if(Object.hasOwn(openState,index))item.open=!!openState[index]});
    const saveOpen=()=>{const state={};mapDetails.forEach((item,index)=>state[index]=item.open);localStorage.setItem(MAP_STATE_KEY,JSON.stringify(state))};
    section.addEventListener('toggle',event=>{if(event.target.matches('details[data-map-state-key]'))saveOpen()},true);
    section.querySelector('[data-map-expand]').onclick=()=>{section.querySelectorAll('details:not([hidden])').forEach(item=>item.open=true);saveOpen()};
    section.querySelector('[data-map-collapse]').onclick=()=>{section.querySelectorAll('details').forEach(item=>item.open=false);saveOpen()};
    const output=section.querySelector('[data-map-count]'),chapters=[...section.querySelectorAll('.qbi-integrated-chapter')];output.textContent=chapters.length+' capítulos';
    section.querySelector('[data-map-filter]').oninput=event=>{const term=normalize(event.target.value.trim());let visible=0;chapters.forEach(chapter=>{const match=!term||chapter.dataset.mapSearch.includes(term)||[...chapter.querySelectorAll('[data-map-search]')].some(topic=>topic.dataset.mapSearch.includes(term));chapter.hidden=!match;if(match){visible++;if(term)chapter.open=true}});section.querySelectorAll('.qbi-integrated-group').forEach(group=>group.hidden=![...group.querySelectorAll('.qbi-integrated-chapter')].some(chapter=>!chapter.hidden));output.textContent=visible+' capítulos'};
    section.addEventListener('click',event=>{const button=event.target.closest('[data-map-target]');if(button)document.getElementById(button.dataset.mapTarget)?.scrollIntoView({behavior:'smooth',block:'start'})});
    return section;
  }
  function addIndexEntry(index){
    if(index.querySelector('a[href="#'+MAP_ID+'"]'))return;
    const link=document.createElement('a');link.href='#'+MAP_ID;link.innerHTML='<b>Mapa mental integral</b>';
    const first=index.querySelector('a');index.insertBefore(link,first);
  }
  function enhanceSearch(side){
    const input=side.querySelector('#qbGlobalSearch');if(!input||side.querySelector('.qbi-search-stepper'))return;
    const stepper=document.createElement('div');stepper.className='qbi-search-stepper';stepper.innerHTML='<button type="button" data-search-prev>↑ Anterior</button><button type="button" data-search-next>↓ Siguiente</button>';
    input.closest('label')?.after(stepper);
    const find=back=>{const value=input.value.trim();if(value)window.find(value,false,back,true,false,true,false)};
    stepper.querySelector('[data-search-prev]').onclick=()=>find(true);stepper.querySelector('[data-search-next]').onclick=()=>find(false);
  }
  function removeObsoleteFullscreen(){
    document.querySelectorAll('button,[role="button"]').forEach(button=>{
      if(/pantalla completa/i.test(button.textContent||''))button.remove();
    });
  }
  function installNotes(side,root){
    let notes={};try{notes=JSON.parse(localStorage.getItem(NOTES_KEY)||'{}')}catch{}
    const tools=side.querySelector('.qb-sidebar-tools')||side;
    const box=document.createElement('details');box.open=true;box.innerHTML='<summary>Notas y resaltado</summary><button class="qb-side-button qbi-integrated-side-button" type="button" data-add-note>📝 Agregar nota</button><button class="qb-side-button qbi-integrated-side-button" type="button" data-highlight>🖍️ Resaltar selección</button><small class="qbi-sidebar-note-help" data-note-help>Agregá una nota y después tocá el punto exacto donde querés fijarla.</small>';tools.prepend(box);
    const editor=document.createElement('aside');editor.className='qbi-note-editor';editor.hidden=true;editor.innerHTML='<header><strong>Nota fijada aquí</strong><div><button type="button" data-note-delete>Eliminar</button><button type="button" data-note-close>×</button></div></header><textarea placeholder="Escribí tu nota…"></textarea><small data-note-status>Se guarda automáticamente</small>';document.body.append(editor);
    const help=box.querySelector('[data-note-help]'),add=box.querySelector('[data-add-note]'),text=editor.querySelector('textarea');let placing=false,active=null,timer;
    const saveNotes=()=>localStorage.setItem(NOTES_KEY,JSON.stringify(notes));
    const noteTextValue=id=>typeof notes[id]==='string'?notes[id]:notes[id]?.text||'';
    const markerFor=id=>{const marker=document.createElement('button');marker.type='button';marker.className='qbi-note-marker';marker.dataset.noteId=id;marker.title=noteTextValue(id)||'Abrir nota fijada';marker.textContent='📝';return marker};
    const anchorSelector=element=>element.id?'#'+CSS.escape(element.id):element.dataset.blockId?'[data-block-id="'+CSS.escape(element.dataset.blockId)+'"]':'';
    const textOffset=(parent,range)=>{const before=document.createRange();before.selectNodeContents(parent);before.setEnd(range.startContainer,range.startOffset);return before.toString().length};
    const restoreMarker=(id,note)=>{if(!note?.anchor||root.querySelector('[data-note-id="'+CSS.escape(id)+'"]'))return true;const parent=root.querySelector(note.anchor.selector);if(!parent)return false;const walker=document.createTreeWalker(parent,NodeFilter.SHOW_TEXT);let remaining=Math.max(0,Number(note.anchor.offset)||0),node;while((node=walker.nextNode())){if(remaining<=node.nodeValue.length){const range=document.createRange();range.setStart(node,remaining);range.collapse(true);range.insertNode(markerFor(id));return true}remaining-=node.nodeValue.length}return false};
    const placeMode=value=>{placing=value;root.classList.toggle('qbi-note-placement',value);add.classList.toggle('active',value);help.textContent=value?'Ahora tocá el punto exacto del contenido donde querés fijarla.':'Agregá una nota y después tocá el punto exacto donde querés fijarla.'};
    const open=id=>{active=id;text.value=noteTextValue(id);editor.hidden=false;placeMode(false);setTimeout(()=>text.focus(),0)};
    add.onclick=()=>placeMode(!placing);const highlight=box.querySelector('[data-highlight]');highlight.onmousedown=event=>{event.preventDefault();root.querySelector('#qbHighlightButton')?.dispatchEvent(new MouseEvent('mousedown',{bubbles:true,cancelable:true}));help.textContent='El texto seleccionado quedó resaltado.'};highlight.ontouchstart=event=>{event.preventDefault();root.querySelector('#qbHighlightButton')?.dispatchEvent(new MouseEvent('mousedown',{bubbles:true,cancelable:true}));help.textContent='El texto seleccionado quedó resaltado.'};
    root.addEventListener('click',event=>{const marker=event.target.closest('.qbi-note-marker');if(marker){event.preventDefault();open(marker.dataset.noteId);return}if(!placing||event.target.closest('a,button,input,textarea,summary'))return;let range=document.caretRangeFromPoint?.(event.clientX,event.clientY);if(!range&&document.caretPositionFromPoint){const p=document.caretPositionFromPoint(event.clientX,event.clientY);range=document.createRange();range.setStart(p.offsetNode,p.offset);range.collapse(true)}if(!range||!root.contains(range.startContainer))return;const parent=(range.startContainer.nodeType===3?range.startContainer.parentElement:range.startContainer).closest('[data-block-id],[id]');const selector=parent&&anchorSelector(parent);if(!parent||!selector)return;event.preventDefault();const id='note-'+Date.now(),offset=textOffset(parent,range);range.insertNode(markerFor(id));notes[id]={text:'',anchor:{selector,offset}};saveNotes();open(id)});
    text.oninput=()=>{if(!active)return;clearTimeout(timer);editor.querySelector('[data-note-status]').textContent='Guardando…';timer=setTimeout(()=>{const previous=notes[active];notes[active]={text:text.value,anchor:typeof previous==='object'?previous.anchor:null};saveNotes();const marker=root.querySelector('[data-note-id="'+CSS.escape(active)+'"]');if(marker)marker.title=text.value||'Abrir nota fijada';editor.querySelector('[data-note-status]').textContent='Guardada en este dispositivo'},180)};
    editor.querySelector('[data-note-close]').onclick=()=>{editor.hidden=true;active=null};
    editor.querySelector('[data-note-delete]').onclick=()=>{if(!active)return;root.querySelector('[data-note-id="'+CSS.escape(active)+'"]')?.remove();delete notes[active];saveNotes();editor.hidden=true;active=null};
    const restoreAll=()=>Object.entries(notes).forEach(([id,note])=>restoreMarker(id,note));
    restoreAll();
    let restoreTimer;new MutationObserver(()=>{clearTimeout(restoreTimer);restoreTimer=setTimeout(restoreAll,80)}).observe(root,{childList:true,subtree:true});
  }
  function install(){
    const root=document.querySelector('.qb-summary'),documentMain=root?.querySelector('.qb-document'),side=root?.querySelector('.qb-sidebar'),index=root?.querySelector('#summaryIndex');
    if(!root||!documentMain||!side||!index||document.getElementById(MAP_ID))return false;
    const style=document.createElement('style');style.id='qbi-integrated-subject-style';style.textContent=css;document.head.append(style);
    const firstContent=documentMain.querySelector('.qb-hero,.qbi-exercises-section,.qb-method-hub,.qb-chapter');documentMain.insertBefore(renderMap(),firstContent||documentMain.firstChild);
    addIndexEntry(index);enhanceSearch(side);installNotes(side,root);removeObsoleteFullscreen();
    root.dataset.integratedSubject=VERSION;
    parent.postMessage({type:'qbi-integrated-ready'},'*');
    return true;
  }
  let attempts=0;const timer=setInterval(()=>{if(install()||attempts++>240){clearInterval(timer);removeObsoleteFullscreen()}},100);
})();
