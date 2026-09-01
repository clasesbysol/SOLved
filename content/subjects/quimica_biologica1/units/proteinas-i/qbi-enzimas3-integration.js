(()=>{
'use strict';
const VERSION='4.1.2';
const THEORY_ID='qbi-enzimas3-theory';
const GUIDE_ID='qbi-enzimas3-guide';
const STYLE_ID='qbi-enzimas3-style';
const INDEX_CLASS='qbi-e3-index-link';
const FILES={
  theory:['qbi-enzimas3-theory-1.txt'],
  figures:['qbi-enzimas3-figures.txt'],
  exercises:['qbi-enzimas3-exercises-1.txt','qbi-enzimas3-exercises-2.txt','qbi-enzimas3-exercises-3.txt','qbi-enzimas3-exercises-4.txt'],
  style:['qbi-enzimas3-style-1.txt']
};
const TOPICS=[
  ['qbi-e3-t1','20.1 Inhibición enzimática e irreversibles'],
  ['qbi-e3-t2','20.2 Inhibición competitiva'],
  ['qbi-e3-t3','20.3 Inhibición acompetitiva'],
  ['qbi-e3-t4','20.4 Inhibición mixta y no competitiva'],
  ['qbi-e3-t5','20.5 Dixon y Cornish–Bowden'],
  ['qbi-e3-t6','20.6 pH: actividad y estabilidad'],
  ['qbi-e3-t7','20.7 Temperatura y Arrhenius'],
  ['qbi-e3-t8','20.8 Cooperatividad y alosterismo'],
  ['qbi-e3-t9','20.9 Modificación covalente y proteólisis']
];
let payloadPromise=null,running=false,timer=0,attempts=0;
const norm=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();

async function fetchParts(names){
  const rows=await Promise.all(names.map(name=>
    fetch(name+'?v='+VERSION,{cache:'reload'}).then(r=>{
      if(!r.ok) throw Error(name+' '+r.status);
      return r.text();
    })
  ));
  return rows.join('');
}
function payload(){
  return payloadPromise||(payloadPromise=Promise.all([
    fetchParts(FILES.theory),
    fetchParts(FILES.figures),
    fetchParts(FILES.exercises),
    fetchParts(FILES.style)
  ]).then(([theory,figures,exercises,css])=>({theory,figures,exercises,css}))
    .catch(error=>{payloadPromise=null;throw error}));
}
function readState(){try{return JSON.parse(localStorage.getItem('qbi-enzimas3-open-v1')||'{}')||{}}catch{return {}}}
function saveState(value){try{localStorage.setItem('qbi-enzimas3-open-v1',JSON.stringify(value))}catch{}}
function wire(root){
  if(!root||root.dataset.e3Wired)return;
  root.dataset.e3Wired='1';
  const state=readState();
  root.querySelectorAll('details[data-e3-key]').forEach(detail=>{
    const key=detail.dataset.e3Key;
    if(Object.hasOwn(state,key)) detail.open=Boolean(state[key]);
    detail.addEventListener('toggle',event=>{
      if(!event.isTrusted)return;
      state[key]=detail.open;
      saveState(state);
    });
  });
  root.querySelector('.qbi-e3-collapse')?.addEventListener('click',()=>{
    root.querySelectorAll('details[data-e3-key]').forEach(detail=>{
      detail.open=false;
      state[detail.dataset.e3Key]=false;
    });
    saveState(state);
  });
}
function typeset(root){
  const run=()=>{
    if(!window.MathJax?.typesetPromise)return false;
    window.MathJax.typesetPromise([root]).catch(()=>{});
    return true;
  };
  if(run())return;
  [300,800,1600,3000].forEach(delay=>setTimeout(run,delay));
}
function getSummary(){
  return document.querySelector('.qb-summary')||
         document.querySelector('.qb-main')||
         document.querySelector('main')||
         document.body;
}
function chapterText(node){
  return norm(node?.querySelector?.('h1,h2,h3,.qb-chapter-title')?.textContent||node?.textContent||'');
}
function findTp2Chapter(summary){
  const chapters=[...summary.querySelectorAll('.qb-chapter,section[id^="cap"],section')];
  const exact=chapters.filter(node=>{
    const text=chapterText(node);
    return /\btp\s*2\b/.test(text) ||
      (/trabajo (practico|práctico|de laboratorio)/.test(text)&&/\b2\b/.test(text)) ||
      (/cin[eé]tica enzim[aá]tica/.test(text)&&/tp/.test(text));
  });
  if(exact.length)return exact[exact.length-1];

  const byAnchor=[...document.querySelectorAll('#summaryIndex a[href^="#"],.summary-index a[href^="#"],.qb-index a[href^="#"]')]
    .find(a=>/\btp\s*2\b/.test(norm(a.textContent)));
  if(byAnchor){
    const id=String(byAnchor.getAttribute('href')||'').slice(1);
    const target=id&&document.getElementById(id);
    if(target)return target.closest?.('.qb-chapter,section')||target;
  }
  return document.getElementById('cap19')||chapters.at(-1)||null;
}
function appendFigures(theory,html){
  if(theory.querySelector('[data-e3-key="figures"]'))return;
  const holder=document.createElement('div');
  holder.innerHTML=html.trim();
  const node=holder.firstElementChild;
  if(node)theory.append(node);
}
function prepareAnchors(theory){
  theory.dataset.qbiChapter='20';
  theory.style.scrollMarginTop='24px';
  [...theory.querySelectorAll('details.qbi-e3-topic[data-e3-key]')]
    .filter(d=>/^t\d+$/.test(d.dataset.e3Key||''))
    .forEach((detail,index)=>{
      if(TOPICS[index]) detail.id=TOPICS[index][0];
      detail.style.scrollMarginTop='24px';
    });
}
function placeContent(summary,theory,guide){
  const tp2=findTp2Chapter(summary);
  let parent=tp2?.parentNode||summary;
  let ref=tp2?.nextSibling||null;

  if(!tp2){
    const footer=summary.querySelector('.qb-footer,footer');
    if(footer){parent=footer.parentNode;ref=footer;}
  }
  parent.insertBefore(theory,ref);
  theory.insertAdjacentElement('afterend',guide);
  return tp2;
}
function indexHost(){
  return document.querySelector('#summaryIndex,.summary-index.qb-index,.qb-index,.qb-toc,.summary-index,nav[aria-label*="ndice" i]');
}
function findTp2IndexLink(host,tp2){
  if(!host)return null;
  if(tp2?.id){
    const exact=[...host.querySelectorAll('a[href^="#"]')].find(a=>a.getAttribute('href')==='#'+tp2.id);
    if(exact)return exact;
  }
  const byText=[...host.querySelectorAll('a[href^="#"]')].reverse()
    .find(a=>/\btp\s*2\b/.test(norm(a.textContent)));
  if(byText)return byText;
  return [...host.querySelectorAll('a[href^="#cap"]')].at(-1)||
         host.querySelector('a[href="#methods"]')||
         null;
}
function makeIndexLink(template,href,label,kind){
  const link=template?template.cloneNode(false):document.createElement('a');
  link.removeAttribute('id');
  link.href='#'+href;
  link.textContent=label;
  link.classList.add(INDEX_CLASS,'qbi-e3-index-'+kind);
  link.dataset.qbiE3Index='1';
  return link;
}
function ensureIndex(theory,guide,tp2){
  prepareAnchors(theory);
  const host=indexHost();
  if(!host)return false;

  host.querySelectorAll('[data-qbi-e3-index="1"]').forEach(node=>node.remove());
  const anchor=findTp2IndexLink(host,tp2);
  const items=[
    [THEORY_ID,'20. Enzimas III · inhibición y regulación','main'],
    ...TOPICS.map(([id,label])=>[id,label,'sub']),
    [GUIDE_ID,'✎ Ejercicios · Enzimas III (21)','exercise']
  ];
  let cursor=anchor;
  for(const [id,label,kind] of items){
    const link=makeIndexLink(anchor,id,label,kind);
    if(cursor){cursor.insertAdjacentElement('afterend',link);cursor=link;}
    else host.append(link);
  }
  return true;
}
function auditGuide(guide){
  const keys=new Set([...guide.querySelectorAll('details.qbi-e3-exercise[data-e3-key]')].map(d=>d.dataset.e3Key));
  const missing=[];
  for(let i=1;i<=21;i++)if(!keys.has('e'+i))missing.push(i);
  guide.dataset.e3Audit=missing.length?'missing-'+missing.join('-'):'complete-21';
  if(missing.length)console.error('QBI Enzimas III: faltan ejercicios',missing);
  return !missing.length;
}
async function insert(){
  if(running)return false;
  const summary=getSummary();
  if(!summary)return false;
  running=true;
  try{
    const data=await payload();

    if(!document.getElementById(STYLE_ID)){
      const style=document.createElement('style');
      style.id=STYLE_ID;
      style.textContent=data.css+`
        .qbi-e3-index-sub{padding-left:1.3rem!important;font-size:.9em;opacity:.9}
        .qbi-e3-index-main{font-weight:900!important}
        .qbi-e3-index-exercise{margin-top:.35rem!important;font-weight:800!important}
      `;
      document.head.append(style);
    }

    let theory=document.getElementById(THEORY_ID);
    if(!theory){
      const holder=document.createElement('div');
      holder.innerHTML=data.theory.trim();
      theory=holder.firstElementChild;
    }
    appendFigures(theory,data.figures);

    let guide=document.getElementById(GUIDE_ID);
    if(!guide){
      const holder=document.createElement('div');
      holder.innerHTML=data.exercises.trim();
      guide=holder.firstElementChild;
    }

    const tp2=placeContent(summary,theory,guide);
    ensureIndex(theory,guide,tp2);
    wire(theory);
    wire(guide);
    auditGuide(guide);
    typeset(theory);
    typeset(guide);
    window.QBI_MATH_RENDER_FIX?.repair?.();

    document.documentElement.dataset.qbiEnzimas3='loaded-'+VERSION;
    return true;
  }catch(error){
    console.error('QBI Enzimas III',error);
    document.documentElement.dataset.qbiEnzimas3='error';
    return false;
  }finally{
    running=false;
  }
}
function retry(){
  insert();
  if(++attempts<120)timer=setTimeout(retry,200);
}
const observer=new MutationObserver(()=>{
  clearTimeout(timer);
  timer=setTimeout(insert,100);
});
function start(){
  observer.observe(document.documentElement,{subtree:true,childList:true});
  retry();
  [700,1500,3000,6000].forEach(delay=>setTimeout(insert,delay));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
else start();
window.QBI_ENZIMAS3={version:VERSION,insert};
})();