(()=>{
  'use strict';
  if(window.__SOLVED_PERSISTENCE_REPAIR)return;
  window.__SOLVED_PERSISTENCE_REPAIR=true;

  const parse=(win,key)=>{try{return JSON.parse(win.localStorage.getItem(key)||'{}')}catch{return {}}};
  const sameOriginDoc=frame=>{try{return frame.contentDocument||null}catch{return null}};

  function wrapLogicalRange(doc,parent,start,end,{markerSelector,markClass,idAttr,id}){
    if(!parent||end<=start||parent.querySelector(`[${idAttr}="${CSS.escape(id)}"]`))return false;
    const walker=doc.createTreeWalker(parent,NodeFilter.SHOW_TEXT);
    const segments=[];
    let logical=0,node;
    while((node=walker.nextNode())){
      const el=node.parentElement;
      if(!el||el.closest(markerSelector)||el.closest('script,style,textarea'))continue;
      const length=node.nodeValue?.length||0,next=logical+length;
      const a=Math.max(start,logical),b=Math.min(end,next);
      if(b>a)segments.push({node,start:a-logical,end:b-logical});
      logical=next;
      if(logical>=end)break;
    }
    if(!segments.length)return false;
    for(let i=segments.length-1;i>=0;i--){
      const part=segments[i];
      if(!part.node.isConnected)continue;
      const range=doc.createRange();
      range.setStart(part.node,Math.min(part.start,part.node.nodeValue.length));
      range.setEnd(part.node,Math.min(part.end,part.node.nodeValue.length));
      if(range.collapsed)continue;
      const mark=doc.createElement('mark');
      mark.className=markClass;
      mark.setAttribute(idAttr,id);
      try{range.surroundContents(mark)}catch{}
    }
    return !!parent.querySelector(`[${idAttr}="${CSS.escape(id)}"]`);
  }

  function repairSkeleton(root){
    const id=root?.dataset?.skeletonSubject;
    if(!id)return;
    const data=parse(root.ownerDocument.defaultView,`solved-qbi-style-highlights-v2:${id}`);
    for(const [highlightId,item] of Object.entries(data)){
      if(!item?.selector||!Number.isFinite(Number(item.start))||!Number.isFinite(Number(item.end)))continue;
      const parent=root.querySelector(item.selector);
      wrapLogicalRange(root.ownerDocument,parent,Number(item.start),Number(item.end),{
        markerSelector:'.skeleton-note-marker',
        markClass:'study-highlight',
        idAttr:'data-skeleton-highlight-id',
        id:highlightId
      });
    }
  }

  function frameSubject(frame,doc){
    if(frame.classList.contains('stats-integral-document'))return 'estadistica';
    const source=frame.getAttribute('srcdoc')||'';
    if(source.includes('QBI_PAYLOAD_VERSION')||/Química Biológica/i.test(doc.title||'')||doc.querySelector('.qbi-integrated-map-head'))return 'quimica_biologica1';
    if(/Física/i.test(doc.title||'')||doc.querySelector('.main-content .page-header'))return 'fisica1';
    return '';
  }

  function repairFrame(frame){
    const doc=sameOriginDoc(frame);if(!doc?.documentElement)return;
    const subjectId=frameSubject(frame,doc);
    if(!subjectId||subjectId==='quimica_biologica1')return;
    const root=doc.querySelector('.qb-summary,.main-content')||doc.body;
    const data=parse(doc.defaultView,`solved-integral-highlights-v2:${subjectId}`);
    for(const [highlightId,item] of Object.entries(data)){
      if(!item?.selector||!Number.isFinite(Number(item.start))||!Number.isFinite(Number(item.end)))continue;
      const parent=root.querySelector(item.selector);
      wrapLogicalRange(doc,parent,Number(item.start),Number(item.end),{
        markerSelector:'.solved-integral-note-marker',
        markClass:'solved-integral-highlight',
        idAttr:'data-integral-highlight-id',
        id:highlightId
      });
    }
  }

  let timer;
  function repairAll(){
    clearTimeout(timer);
    timer=setTimeout(()=>{
      document.querySelectorAll('.subject-skeleton').forEach(repairSkeleton);
      document.querySelectorAll('iframe').forEach(repairFrame);
    },140);
  }

  function watchFrame(frame){
    if(!(frame instanceof HTMLIFrameElement)||frame.dataset.persistenceRepairBound)return;
    frame.dataset.persistenceRepairBound='1';
    frame.addEventListener('load',repairAll);
  }

  function boot(){
    document.querySelectorAll('iframe').forEach(watchFrame);
    const observer=new MutationObserver(records=>{
      let relevant=false;
      for(const record of records){
        if(record.type!=='childList')continue;
        for(const node of record.addedNodes){
          if(node.nodeType!==1)continue;
          relevant=true;
          if(node.tagName==='IFRAME')watchFrame(node);
          node.querySelectorAll?.('iframe').forEach(watchFrame);
        }
      }
      if(relevant)repairAll();
    });
    observer.observe(document.documentElement,{childList:true,subtree:true});
    repairAll();
    window.addEventListener('pageshow',repairAll);
    window.addEventListener('focus',repairAll);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();