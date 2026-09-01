(()=>{
'use strict';
const VERSION='4.1.1';
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
 ['qbi-e3-t1','Inhibición enzimática e irreversibles'],
 ['qbi-e3-t2','Inhibición competitiva'],
 ['qbi-e3-t3','Inhibición acompetitiva'],
 ['qbi-e3-t4','Inhibición mixta y no competitiva'],
 ['qbi-e3-t5','Dixon y Cornish–Bowden'],
 ['qbi-e3-t6','pH: actividad y estabilidad'],
 ['qbi-e3-t7','Temperatura y Arrhenius'],
 ['qbi-e3-t8','Cooperatividad y alosterismo'],
 ['qbi-e3-t9','Modificación covalente y proteólisis']
];
let payloadPromise=null,running=false,timer=0;
const norm=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
async function fetchParts(names){
 const rows=await Promise.all(names.map(name=>fetch(name+'?v='+VERSION,{cache:'default'}).then(r=>{if(!r.ok)throw Error(name+' '+r.status);return r.text()})));
 return rows.join('');
}
function payload(){
 return payloadPromise||(payloadPromise=Promise.all([fetchParts(FILES.theory),fetchParts(FILES.figures),fetchParts(FILES.exercises),fetchParts(FILES.style)])
  .then(([theory,figures,exercises,css])=>({theory,figures,exercises,css}))
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
  if(Object.hasOwn(state,key))detail.open=Boolean(state[key]);
  detail.addEventListener('toggle',event=>{if(!event.isTrusted)return;state[key]=detail.open;saveState(state)});
 });
 root.querySelector('.qbi-e3-collapse')?.addEventListener('click',()=>{
  root.querySelectorAll('details[data-e3-key]').forEach(detail=>{detail.open=false;state[detail.dataset.e3Key]=false});
  saveState(state);
 });
}
function typeset(root){
 const run=()=>{if(!window.MathJax?.typesetPromise)return false;window.MathJax.typesetPromise([root]).catch(()=>{});return true};
 if(run())return;
 [350,900,1800,3200].forEach(delay=>setTimeout(()=>run(),delay));
}
function roots(){return {exercises:document.querySelector('#qbiEmbeddedExercises,.qbi-exercises-section,#ejercicios-qbi,.qbi-exercise-bank'),summary:document.querySelector('.qb-summary')||document.querySelector('main')||document.body}}
function chapterText(node){return norm(node?.querySelector?.('h1,h2,h3,.qb-chapter-title')?.textContent||node?.textContent||'')}
function findTp2Chapter(summary){
 const chapters=[...summary.querySelectorAll('.qb-chapter,section[id^="cap"]')];
 const exact=chapters.filter(node=>{const text=chapterText(node);return /\btp\s*2\b/.test(text)||(/trabajo (practico|de laboratorio)/.test(text)&&/\b2\b/.test(text))});
 if(exact.length)return exact[exact.length-1];
 const byAnchor=[...document.querySelectorAll('a[href^="#"]')].find(a=>{const text=norm(a.textContent);return /\btp\s*2\b/.test(text)||(/trabajo (practico|de laboratorio)/.test(text)&&/\b2\b/.test(text))});
 if(byAnchor){const id=String(byAnchor.getAttribute('href')||'').slice(1);const target=id&&document.getElementById(id);if(target)return target.closest?.('.qb-chapter,section')||target}
 const cap19=document.getElementById('cap19');
 if(cap19)return cap19;
 return chapters.at(-1)||null;
}
function placeTheory(theory,summary,exercises){
 const tp2=findTp2Chapter(summary);
 if(tp2?.parentNode){if(tp2.nextElementSibling!==theory)tp2.insertAdjacentElement('afterend',theory);return tp2}
 if(exercises?.parentNode&&theory.nextElementSibling!==exercises)exercises.parentNode.insertBefore(theory,exercises);
 return null;
}
function prepareAnchors(theory){
 theory.setAttribute('data-qbi-chapter','20');
 theory.style.scrollMarginTop='24px';
 [...theory.querySelectorAll('details.qbi-e3-topic[data-e3-key]')].filter(d=>/^t\d+$/.test(d.dataset.e3Key||'')).forEach((detail,index)=>{if(TOPICS[index])detail.id=TOPICS[index][0];detail.style.scrollMarginTop='24px'});
}
function findIndexAnchor(tp2){
 if(tp2?.id){const a=document.querySelector(`a[href="#${CSS.escape(tp2.id)}"]`);if(a)return a}
 return [...document.querySelectorAll('a[href^="#"]')].reverse().find(a=>{const text=norm(a.textContent);return /\btp\s*2\b/.test(text)||(/trabajo (practico|de laboratorio)/.test(text)&&/\b2\b/.test(text))})||document.querySelector('a[href="#cap19"]');
}
function makeIndexLink(template,href,label,sub=false){
 const link=template?template.cloneNode(false):document.createElement('a');
 link.removeAttribute('id');
 link.href='#'+href;
 link.textContent=label;
 link.classList.add(INDEX_CLASS);
 if(sub)link.classList.add('qbi-e3-index-sub');else link.classList.add('qbi-e3-index-main');
 link.dataset.qbiE3Index='1';
 return link;
}
function ensureIndex(theory,tp2){
 prepareAnchors(theory);
 const existing=[...document.querySelectorAll('[data-qbi-e3-index="1"]')];
 if(existing.length===TOPICS.length+1)return true;
 existing.forEach(node=>node.remove());
 const anchor=findIndexAnchor(tp2);
 const fallback=document.querySelector('.qb-index,.qb-toc,.toc,.summary-index,nav[aria-label*="ndice" i],aside nav');
 const parent=anchor?.parentElement||fallback;
 if(!parent)return false;
 const items=[['qbi-enzimas3-theory','20. Enzimas III · regulación enzimática',false],...TOPICS.map(([id,label])=>[id,label,true])];
 let cursor=anchor||null;
 for(const [id,label,sub] of items){
  const link=makeIndexLink(anchor,id,label,sub);
  if(cursor){cursor.insertAdjacentElement('afterend',link);cursor=link}else parent.append(link);
 }
 return true;
}
function appendFigures(theory,html){
 if(theory.querySelector('[data-e3-key="figures"]'))return;
 const holder=document.createElement('div');holder.innerHTML=html.trim();const node=holder.firstElementChild;if(node)theory.append(node);
}
function auditGuide(guide){
 const keys=new Set([...guide.querySelectorAll('details.qbi-e3-exercise[data-e3-key]')].map(d=>d.dataset.e3Key));
 const missing=[];for(let i=1;i<=21;i++)if(!keys.has('e'+i))missing.push(i);
 guide.dataset.e3Audit=missing.length?'missing-'+missing.join('-'):'complete-21';
 if(missing.length)console.error('QBI Enzimas III: faltan ejercicios',missing);
 return !missing.length;
}
async function insert(){
 if(running)return false;
 const {exercises,summary}=roots();if(!summary||!exercises)return false;
 running=true;
 try{
  const data=await payload();
  if(!document.getElementById(STYLE_ID)){const style=document.createElement('style');style.id=STYLE_ID;style.textContent=data.css+'\n.qbi-e3-index-sub{padding-left:1.3rem!important;font-size:.9em;opacity:.88}.qbi-e3-index-main{font-weight:850!important}';document.head.append(style)}
  let theory=document.getElementById(THEORY_ID);
  if(!theory){const holder=document.createElement('div');holder.innerHTML=data.theory.trim();theory=holder.firstElementChild;exercises.parentNode.insertBefore(theory,exercises)}
  appendFigures(theory,data.figures);wire(theory);typeset(theory);
  const tp2=placeTheory(theory,summary,exercises);ensureIndex(theory,tp2);
  let guide=document.getElementById(GUIDE_ID);
  if(!guide){const holder=document.createElement('div');holder.innerHTML=data.exercises.trim();guide=holder.firstElementChild;exercises.append(guide)}
  wire(guide);auditGuide(guide);typeset(guide);
  window.QBI_MATH_RENDER_FIX?.repair?.();
  return Boolean(theory&&guide);
 }catch(error){console.error('QBI Enzimas III',error);return false}finally{running=false}
}
let attempts=0;
function retry(){insert();if(++attempts<100)timer=setTimeout(retry,180)}
const observer=new MutationObserver(()=>{clearTimeout(timer);timer=setTimeout(insert,90)});
function start(){observer.observe(document.documentElement,{subtree:true,childList:true});retry();setTimeout(insert,900);setTimeout(insert,2200)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
window.QBI_ENZIMAS3={version:VERSION,insert};
})();