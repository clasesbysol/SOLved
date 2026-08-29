(()=>{
  'use strict';
  const SUBJECT='estadistica',UNIT='probabilidad-practica-1';
  const API=window.LBT_CONTENT;if(!API?.render||API.__statsIntegralBridge)return;
  const originalRender=API.render.bind(API),originalBind=API.bind?.bind(API);
  const safe=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const target={summary:'program',exercises:'guide',map:'mindmap',glossary:'glossary'};
  API.render=(subjectId,unitId,tab)=>{
    if(subjectId===SUBJECT&&unitId===UNIT&&target[tab]){
      const record=API.getUnit(subjectId,unitId),version=record?.contentVersion||'1.3.0',base=record?.path||`content/subjects/${SUBJECT}/units/${UNIT}/`;
      return `<div class="content-card rich-content rich-document-card zoom-target stats-integral-host"><div class="rich-document-head"><h2>${safe(record?.title||'Estadística Aplicada')}</h2><small>Contenido ${safe(version)}</small></div><iframe class="rich-document stats-integral-document" title="Estadística Aplicada" src="${safe(base)}estadistica-integral.html?v=${encodeURIComponent(version)}#${target[tab]}" sandbox="allow-scripts allow-same-origin"></iframe></div>`;
    }
    return originalRender(subjectId,unitId,tab);
  };
  API.bind=container=>{originalBind?.(container)};
  API.__statsIntegralBridge=true;
})();