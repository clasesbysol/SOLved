(function(){
  "use strict";
  const RETURN_KEY="solved-organic-native-return";
  const safe=value=>String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[char]));
  const root="content/subjects/quimica_organica/units/resumen-integral/";
  const heading=(block,level)=>`<h${level} data-anchor-id="organic:${safe(block.id)}">${safe(block.text)}</h${level}>`;
  function item(block,assets,assetRoot){
    if(block.type==="heading")return heading(block,Math.max(2,Math.min(5,(block.level||2)+1)));
    if(["paragraph","reaction","callout"].includes(block.type))return `<p class="highlightable organic-native-${safe(block.type)}" data-block-id="organic:${safe(block.id)}">${safe(block.text)}</p>`;
    if(block.type==="list")return `<${block.ordered?"ol":"ul"}>${(block.items||[]).map(text=>`<li>${safe(text)}</li>`).join("")}</${block.ordered?"ol":"ul"}>`;
    if(block.type==="table")return `<div class="organic-native-table"><table>${(block.rows||[]).map((row,index)=>`<tr>${row.map(cell=>`<${index===0?"th":"td"}>${safe(cell)}</${index===0?"th":"td"}>`).join("")}</tr>`).join("")}</table></div>`;
    if(block.type==="figure"){
      const asset=assets.get(block.assetId);if(!asset)return "";
      const url=`${assetRoot}${asset.path}`;
      return `<figure><button class="rich-image-open" type="button" data-image="${safe(url)}" aria-label="Ampliar imagen"><img loading="lazy" src="${safe(url)}" alt="${safe(block.alt||asset.alt)}"></button>${block.caption?`<figcaption>${safe(block.caption)}</figcaption>`:""}</figure>`;
    }
    if(block.type==="details")return section(block,assets,assetRoot,[]);
    return "";
  }
  function section(block,assets,assetRoot,anchorIds){
    const children=block.children||[],first=children[0],sameHeading=first?.type==="heading"&&first.text?.trim()===block.summary?.trim();
    const aliases=anchorIds.map(id=>`<span id="${safe(id)}" data-anchor-id="${safe(id)}" class="organic-native-anchor"></span>`).join("");
    const content=(sameHeading?children.slice(1):children).map(child=>item(child,assets,assetRoot)).join("");
    const level=first?.level===1?"chapter":"topic";
    return `<section class="organic-native-section is-${level}" data-section-id="${safe(block.id)}" data-anchor-id="organic:${safe(block.id)}">${aliases}<details open><summary>${safe(block.summary)}</summary><div class="organic-native-section-body">${content}</div></details></section>`;
  }
  function render(record){
    const rich=record.data["rich.json"],assets=new Map((record.data["assets.json"]?.assets||[]).map(asset=>[asset.id,asset]));
    const assetRoot=root;
    const units=window.LBT_ORGANIC_UNITS||window.LBT_CONTENT.units("quimica_organica").filter(unit=>/^organica-\d+$/.test(unit.unitId)).sort((a,b)=>a.unitId.localeCompare(b.unitId));
    const index=units.findIndex(unit=>unit.unitId===record.unitId),previous=units[index-1],next=units[index+1];
    const chapters=rich.blocks.filter(block=>block.children?.some(child=>child.type==="heading"&&child.level===1));
    const returnTab=sessionStorage.getItem(RETURN_KEY),aliasesBySection=new Map();
    for(const [anchor,destination] of Object.entries(window.LBT_ORGANIC_ANCHORS||{}))if(destination.unitId===record.unitId){const list=aliasesBySection.get(destination.sectionIndex)||[];list.push(anchor);aliasesBySection.set(destination.sectionIndex,list)}
    return `<article class="organic-native zoom-target" data-organic-native>
      <header class="organic-native-hero"><p class="organic-native-kicker">Química Orgánica · ${safe(String(index+1).padStart(2,"0"))} / ${units.length}</p><h2>${safe(record.title)}</h2><p>Teoría, reacciones e imágenes de la fuente original, integradas en la lectura de SOLved.</p><div class="organic-native-tags"><span>Contenido completo</span><span>${rich.blocks.length} secciones</span>${assets.size?`<span>${assets.size} imágenes</span>`:""}</div><div class="organic-native-search"><label>Buscar en esta unidad<input type="search" data-organic-search placeholder="Ej.: Claisen, hibridación"></label><button type="button" data-organic-prev aria-label="Coincidencia anterior">↑</button><button type="button" data-organic-next aria-label="Coincidencia siguiente">↓</button><output data-organic-search-count aria-live="polite"></output></div>${returnTab?`<button type="button" class="organic-native-return" data-organic-return="${safe(returnTab)}">Volver ${returnTab==="cards"?"a la tarjeta":"al mapa mental"}</button>`:""}</header>
      ${chapters.length>1?`<nav class="organic-native-chapters" aria-label="Capítulos de esta unidad">${chapters.map(chapter=>`<button type="button" data-organic-section="${safe(chapter.id)}">${safe(chapter.summary)}</button>`).join("")}</nav>`:""}
      <div class="organic-native-content">${rich.blocks.map((block,sectionIndex)=>section(block,assets,assetRoot,aliasesBySection.get(sectionIndex)||[])).join("")}</div>
      <nav class="organic-native-pager" aria-label="Unidades de Orgánica">${previous?`<button type="button" data-organic-unit="${safe(previous.unitId)}">← ${safe(previous.title)}</button>`:"<span></span>"}${next?`<button type="button" data-organic-unit="${safe(next.unitId)}">${safe(next.title)} →</button>`:"<span></span>"}</nav>
    </article>`;
  }
  function renderTab(record,tab){
    const title=tab==="glossary"?"Glosario":"Ejercicios de síntesis",items=tab==="glossary"?record.data["glossary.json"]?.entries||[]:record.data["exercises.json"]?.exercises||[];
    const content=tab==="glossary"?items.map(entry=>`<article class="organic-native-entry"><h3>${safe(entry.term)}</h3><p class="highlightable" data-block-id="organic:${safe(entry.id)}">${safe(entry.definition)}</p></article>`).join(""):items.map((exercise,index)=>`<article class="organic-native-entry"><span class="organic-native-number">Ejercicio ${index+1}</span><h3>${safe(exercise.prompt)}</h3><details><summary>Ver resolución</summary><p>${safe(exercise.result)}</p></details></article>`).join("");
    return `<article class="organic-native organic-native-supplement" data-organic-native><header class="organic-native-hero"><p class="organic-native-kicker">Química Orgánica · ${safe(record.title)}</p><h2>${title}</h2><p>${tab==="glossary"?"Conceptos y explicaciones tomados del contenido original.":"Consignas y respuestas conservadas del banco de síntesis de SOLved."}</p><div class="organic-native-tags"><span>${items.length} ${tab==="glossary"?"entradas":"ejercicios"}</span></div></header><div class="organic-native-entries">${content||`<p>Esta unidad no tiene ${tab==="glossary"?"entradas de glosario":"ejercicios de síntesis"} en la fuente.</p>`}</div></article>`;
  }
  function bind(container){
    container.querySelectorAll("[data-organic-section]").forEach(button=>button.onclick=()=>container.querySelector(`[data-section-id="${CSS.escape(button.dataset.organicSection)}"]`)?.scrollIntoView({behavior:"smooth",block:"start"}));
    container.querySelectorAll("[data-organic-unit]").forEach(button=>button.onclick=()=>window.dispatchEvent(new CustomEvent("lbt-open-content",{detail:{subjectId:"quimica_organica",unitId:button.dataset.organicUnit}})));
    container.querySelectorAll("[data-organic-return]").forEach(button=>button.onclick=()=>{sessionStorage.removeItem(RETURN_KEY);window.dispatchEvent(new CustomEvent("lbt-open-study-tab",{detail:{tab:button.dataset.organicReturn}}))});
    container.querySelectorAll(".organic-native-search").forEach(search=>{
      const input=search.querySelector("input"),output=search.querySelector("output"),content=container.querySelector(".organic-native-content");
      let matches=[],position=-1;
      const normalize=value=>String(value).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("es");
      const show=()=>{if(!matches.length){output.textContent=input.value.trim()?"Sin coincidencias":"";return}position=(position+matches.length)%matches.length;const range=matches[position],selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);range.startContainer.parentElement?.closest("details")?.setAttribute("open","");range.startContainer.parentElement?.scrollIntoView({behavior:"smooth",block:"center"});output.textContent=`${position+1} de ${matches.length}`};
      input.oninput=()=>{matches=[];position=0;const term=normalize(input.value.trim());if(term.length<2){output.textContent="";return}const walker=document.createTreeWalker(content,NodeFilter.SHOW_TEXT);for(let node=walker.nextNode();node;node=walker.nextNode()){const value=normalize(node.nodeValue),parent=node.parentElement;if(!parent||parent.closest("button"))continue;let start=0,index;while((index=value.indexOf(term,start))!==-1){const range=document.createRange();range.setStart(node,index);range.setEnd(node,index+term.length);matches.push(range);start=index+term.length}}show()};
      search.querySelector("[data-organic-prev]").onclick=()=>{if(matches.length){position-=1;show()}};
      search.querySelector("[data-organic-next]").onclick=()=>{if(matches.length){position+=1;show()}};
      input.onkeydown=event=>{if(event.key==="Enter"){event.preventDefault();if(matches.length){position+=event.shiftKey?-1:1;show()}}};
    });
  }
  async function openTarget(target,returnTab){
    const destination=window.LBT_ORGANIC_ANCHORS?.[target],unitId=destination?.unitId;
    if(!unitId)throw Error(`Destino de Orgánica no encontrado: ${target}`);
    if(returnTab)sessionStorage.setItem(RETURN_KEY,returnTab);
    window.dispatchEvent(new CustomEvent("lbt-open-content",{detail:{subjectId:"quimica_organica",unitId,targetId:target}}));
  }
  window.LBT_ORGANIC_NATIVE={render,renderTab,bind,openTarget};
})();
