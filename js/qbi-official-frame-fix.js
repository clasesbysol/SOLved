(()=>{
  'use strict';
  const VERSION='1.2.0';
  const QBI_STATIC='content/subjects/quimica_biologica1/units/proteinas-i/qbi-static.html?v=4.7.0';
  const SANDBOX='allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox';
  const isQbi=frame=>{
    if(!(frame instanceof HTMLIFrameElement))return false;
    const src=frame.getAttribute('src')||'';
    const source=frame.getAttribute('srcdoc')||'';
    const title=frame.getAttribute('title')||'';
    return /quimica_biologica1\/units\/proteinas-i\/(?:original|qbi-static)\.html/i.test(src)||source.includes('QBI_PAYLOAD_VERSION')&&source.includes('quimica_biologica1/units/proteinas-i')||frame.classList.contains('rich-document')&&/Química Biológica/i.test(title);
  };
  const canonical=()=>new URL(QBI_STATIC,location.href).href;
  function fix(frame){
    if(!isQbi(frame))return;
    const target=canonical();
    if(frame.dataset.qbiCanonicalFix===VERSION&&frame.src===target&&!frame.hasAttribute('srcdoc'))return;
    frame.dataset.qbiCanonicalFix=VERSION;
    frame.setAttribute('sandbox',SANDBOX);
    if(frame.hasAttribute('srcdoc'))frame.removeAttribute('srcdoc');
    if(frame.src!==target)frame.src=target;
  }
  function scan(root=document){
    if(root instanceof HTMLIFrameElement)fix(root);
    root.querySelectorAll?.('iframe').forEach(fix);
  }
  const observer=new MutationObserver(records=>{
    for(const record of records){
      if(record.type==='attributes'){if(record.target instanceof HTMLIFrameElement)fix(record.target)}
      else record.addedNodes.forEach(node=>{if(node.nodeType===1)scan(node)});
    }
  });
  function boot(){scan();observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['src','srcdoc']})}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
