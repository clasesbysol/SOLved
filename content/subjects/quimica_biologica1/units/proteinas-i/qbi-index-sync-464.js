(()=>{
'use strict';
const VERSION='4.6.4';
const FIRST=29;
const LAST=41;
const RANGE=Array.from({length:LAST-FIRST+1},(_,i)=>FIRST+i);

function visibleIndexes(){
  const candidates=[
    ...document.querySelectorAll('.qb-summary .qb-sidebar #summaryIndex'),
    ...document.querySelectorAll('.qb-sidebar #summaryIndex'),
    ...document.querySelectorAll('#summaryIndex')
  ];
  return [...new Set(candidates)].filter(nav=>nav?.querySelector('a[href="#cap28"]'));
}

function chapterTitle(n){
  return document.querySelector(`#cap${n} h2`)?.textContent?.replace(/\s+/g,' ').trim()||`Capítulo ${n}`;
}

function chapterReady(){
  return RANGE.every(n=>document.getElementById(`cap${n}`));
}

function expectedText(n){
  return `${n}. ${chapterTitle(n)}`;
}

function indexReady(nav){
  if(!nav)return false;
  const links=RANGE.map(n=>nav.querySelector(`a[href="#cap${n}"]`));
  return links.every((link,i)=>link&&link.textContent.replace(/\s+/g,' ').trim()===expectedText(RANGE[i]));
}

function syncOne(nav){
  const anchor=nav.querySelector('a[href="#cap28"]');
  if(!anchor||!chapterReady())return false;
  if(indexReady(nav)){
    RANGE.forEach(n=>{
      const link=nav.querySelector(`a[href="#cap${n}"]`);
      if(link){
        link.dataset.qbiGlucidosIndex='1';
        link.dataset.qbiIndexSync='1';
      }
    });
    return true;
  }

  RANGE.forEach(n=>nav.querySelectorAll(`a[href="#cap${n}"]`).forEach(link=>link.remove()));
  nav.querySelectorAll('[data-qbi-glucidos-index="1"],[data-qbi-index-sync="1"]').forEach(link=>{
    const href=link.getAttribute('href')||'';
    if(/^#cap(?:29|3\d|4[01])$/.test(href))link.remove();
  });

  let cursor=anchor;
  for(const n of RANGE){
    const link=anchor.cloneNode(false);
    link.removeAttribute('id');
    link.classList.remove('active');
    link.removeAttribute('style');
    link.href=`#cap${n}`;
    link.textContent=expectedText(n);
    link.dataset.qbiGlucidosIndex='1';
    link.dataset.qbiIndexSync='1';
    cursor.insertAdjacentElement('afterend',link);
    cursor=link;
  }
  return indexReady(nav);
}

function sync(){
  if(!chapterReady())return false;
  const indexes=visibleIndexes();
  if(!indexes.length)return false;
  const ok=indexes.every(syncOne);
  if(ok){
    document.documentElement.dataset.qbiIndexSync=VERSION;
    document.documentElement.dataset.qbiVisibleIndex='41';
  }
  return ok;
}

let timer=0;
function schedule(delay=60){
  clearTimeout(timer);
  timer=setTimeout(sync,delay);
}

function start(){
  const observer=new MutationObserver(records=>{
    if(records.some(record=>[...record.addedNodes,...record.removedNodes].some(node=>node.nodeType===1)))schedule();
  });
  observer.observe(document.documentElement,{subtree:true,childList:true});

  let tries=0;
  const boot=()=>{
    if(sync())return;
    if(++tries<160)setTimeout(boot,250);
  };
  boot();
  setTimeout(sync,1200);
  setTimeout(sync,3000);
  setInterval(()=>{if(!visibleIndexes().every(indexReady))sync()},4000);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
else start();
})();
