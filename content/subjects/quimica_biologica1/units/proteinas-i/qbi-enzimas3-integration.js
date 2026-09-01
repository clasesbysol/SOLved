(()=>{
'use strict';
const VERSION='4.1.0';
const THEORY_ID='qbi-enzimas3-theory';
const GUIDE_ID='qbi-enzimas3-guide';
const STYLE_ID='qbi-enzimas3-style';
const FILES={
 theory:['qbi-enzimas3-theory-1.txt'],
 exercises:['qbi-enzimas3-exercises-1.txt','qbi-enzimas3-exercises-2.txt','qbi-enzimas3-exercises-3.txt','qbi-enzimas3-exercises-4.txt'],
 style:['qbi-enzimas3-style-1.txt']
};
let payloadPromise=null,running=false,timer=0;
async function fetchParts(names){
 const rows=await Promise.all(names.map(name=>fetch(name+'?v='+VERSION,{cache:'default'}).then(r=>{if(!r.ok)throw Error(name+' '+r.status);return r.text()})));
 return rows.join('');
}
function payload(){return payloadPromise||(payloadPromise=Promise.all([fetchParts(FILES.theory),fetchParts(FILES.exercises),fetchParts(FILES.style)]).then(([theory,exercises,css])=>({theory,exercises,css})).catch(error=>{payloadPromise=null;throw error}))}
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
function roots(){
 return {
  exercises:document.querySelector('#qbiEmbeddedExercises,.qbi-exercises-section,#ejercicios-qbi,.qbi-exercise-bank'),
  summary:document.querySelector('.qb-summary')||document.querySelector('main')||document.body
 };
}
async function insert(){
 if(running)return false;
 const {exercises,summary}=roots();
 if(!summary||!exercises)return false;
 running=true;
 try{
  const data=await payload();
  if(!document.getElementById(STYLE_ID)){const style=document.createElement('style');style.id=STYLE_ID;style.textContent=data.css;document.head.append(style)}
  let theory=document.getElementById(THEORY_ID);
  if(!theory){const holder=document.createElement('div');holder.innerHTML=data.theory.trim();theory=holder.firstElementChild;exercises.parentNode.insertBefore(theory,exercises);wire(theory);typeset(theory)}
  let guide=document.getElementById(GUIDE_ID);
  if(!guide){const holder=document.createElement('div');holder.innerHTML=data.exercises.trim();guide=holder.firstElementChild;exercises.append(guide);wire(guide);typeset(guide)}
  window.QBI_MATH_RENDER_FIX?.repair?.();
  return Boolean(theory&&guide);
 }catch(error){console.error('QBI Enzimas III',error);return false}
 finally{running=false}
}
let attempts=0;
function retry(){insert();if(++attempts<100)timer=setTimeout(retry,180)}
const observer=new MutationObserver(()=>{clearTimeout(timer);timer=setTimeout(insert,90)});
function start(){observer.observe(document.documentElement,{subtree:true,childList:true});retry();setTimeout(insert,900);setTimeout(insert,2200)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
window.QBI_ENZIMAS3={version:VERSION,insert};
})();
