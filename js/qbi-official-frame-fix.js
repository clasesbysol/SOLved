(()=>{
  'use strict';
  const SANDBOX='allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox';
  const isQbiSummary=frame=>{
    const source=frame.getAttribute('srcdoc')||'';
    return source.includes("QBI_PAYLOAD_VERSION")&&source.includes("quimica_biologica1/units/proteinas-i");
  };
  function fix(frame){
    if(!(frame instanceof HTMLIFrameElement)||!frame.classList.contains('imported-html-frame')||!isQbiSummary(frame))return;
    if(frame.getAttribute('sandbox')===SANDBOX)return;
    const source=frame.getAttribute('srcdoc')||'';
    frame.setAttribute('sandbox',SANDBOX);
    frame.srcdoc=source;
  }
  function scan(root=document){
    if(root instanceof HTMLIFrameElement)fix(root);
    root.querySelectorAll?.('iframe.imported-html-frame').forEach(fix);
  }
  const observer=new MutationObserver(records=>{
    for(const record of records){
      if(record.type==='attributes')fix(record.target);
      else record.addedNodes.forEach(node=>{if(node.nodeType===1)scan(node)});
    }
  });
  function boot(){scan();observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['srcdoc']})}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
