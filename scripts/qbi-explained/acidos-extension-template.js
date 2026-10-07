(()=>{
'use strict';
/* Ácidos nucleicos (Química Biológica I) · se inserta después del TP4 de Lípidos.
   Archivo generado por scripts/qbi-explained/build.js a partir de acidos-extension-template.js: no editar a mano. */
if(window.__qbiAcidos)return;window.__qbiAcidos=true;
const VERSION='/*AN:VERSION*/';
const SELF=(document.currentScript&&document.currentScript.src)||[...document.scripts].map(s=>s.src).find(s=>/qbi-acidos-nucleicos-extension/.test(s))||location.href;
const ASSETS=new URL('assets/acidos-nucleicos-i/',SELF).href;
const QBX_CSS=''/*AN:QBXCSS*/;
const AN_CSS=''/*AN:CSS*/;
const UNITS=[]/*AN:UNITS*/;
const chapters=[]/*AN:DATA*/;
const FIRST=chapters[0].n,LAST=chapters[chapters.length-1].n;
const GROUP_ID='acidos-nucleicos';

function ensureStyle(){
 if(!document.getElementById('qbi-explained-style')){const s=document.createElement('style');s.id='qbi-explained-style';s.textContent=QBX_CSS;document.head.append(s)}
 if(!document.getElementById('qbi-acidos-style')){const s=document.createElement('style');s.id='qbi-acidos-style';s.textContent=AN_CSS;document.head.append(s)}
}
function headHtml(){
 const chips=UNITS.map(u=>u.ready?'<a href="#'+u.id+'">'+u.label+'</a>':'<span>'+u.label+' · próximamente</span>').join('');
 return '<section id="'+GROUP_ID+'" class="anx-group-head"><div class="qbx-kicker">Química Biológica I · nueva sección</div><h2>Ácidos nucleicos</h2><p>De la pieza (el nucleótido) a la molécula de la herencia (ADN), el mensajero (ARN) y el metabolismo que los fabrica y los recicla.</p><div class="anx-units">'+chips+'</div></section>';
}
function anchorNode(){return document.getElementById('tp4')||document.getElementById('cap57')||document.getElementById('cap41')}
function build(){
 if(chapters.every(ch=>document.getElementById('cap'+ch.n))&&document.getElementById(GROUP_ID))return true;
 const anchor=anchorNode();if(!anchor?.parentNode)return false;
 for(let n=FIRST;n<=LAST;n++)document.getElementById('cap'+n)?.remove();
 document.getElementById(GROUP_ID)?.remove();UNITS.forEach(u=>document.getElementById(u.id)?.remove());
 const wrap=document.createElement('div');
 const unitAnchors=UNITS.filter(u=>u.ready).map(u=>'<div id="'+u.id+'" class="qbi-lip-anchor"></div>');
 wrap.innerHTML=headHtml()+unitAnchors[0]+chapters.map(ch=>ch.html.split('{{AN_ASSETS}}').join(ASSETS)).join('');
 let cursor=anchor;
 [...wrap.children].forEach(node=>{cursor.insertAdjacentElement('afterend',node);cursor=node});
 return true;
}
function nav(){return document.querySelector('.qb-summary .qb-sidebar #summaryIndex')||document.querySelector('.qb-sidebar #summaryIndex')||document.querySelector('#summaryIndex')}
function addIndex(){
 const index=nav();if(!index)return false;
 index.querySelectorAll('[data-qbi-an-index]').forEach(x=>x.remove());
 const anchor=index.querySelector('a[href="#tp4"]')||index.querySelector('a[href="#cap57"]')||[...index.querySelectorAll('a[href^="#cap"]')].pop();
 if(!anchor)return false;
 let cursor=anchor;
 const add=(href,text,group)=>{const a=document.createElement('a');a.href=href;a.textContent=text;a.dataset.qbiAnIndex='1';if(group){a.className='qbi-lip-index-group';a.dataset.qbiIndexGroup='1'}cursor.insertAdjacentElement('afterend',a);cursor=a};
 add('#'+GROUP_ID,'Ácidos nucleicos I · Bases, nucleósidos y nucleótidos',true);
 chapters.forEach(ch=>add('#cap'+ch.n,ch.n+'. '+ch.title,false));
 return true;
}
function updateMeta(){
 const badge=[...document.querySelectorAll('.qb-hero-badges span')].find(x=>/cap[ií]tulos/i.test(x.textContent||''));if(badge&&badge.textContent!==LAST+' capítulos')badge.textContent=LAST+' capítulos';
 const d=document.documentElement.dataset;if(d.qbiAcidos!==VERSION)d.qbiAcidos=VERSION;if(d.qbiVisibleIndex!==String(LAST))d.qbiVisibleIndex=String(LAST);
}

/* ---- Fórmulas: MathJax del proyecto (el mismo que usa el resumen); si no carga, queda el texto de respaldo ---- */
let mathPromise=null;
function ensureMathJax(){
 if(window.MathJax?.startup?.promise&&(window.MathJax.tex2svg||window.MathJax.tex2chtml))return window.MathJax.startup.promise.then(()=>window.MathJax);
 if(mathPromise)return mathPromise;
 mathPromise=new Promise(resolve=>{
  if(!window.MathJax)window.MathJax={tex:{inlineMath:[['\\(','\\)']],displayMath:[['\\[','\\]']]},svg:{fontCache:'local'},startup:{typeset:false},options:{skipHtmlTags:['script','noscript','style','textarea','pre','code']}};
  const done=()=>{const mj=window.MathJax;if(mj?.startup?.promise)mj.startup.promise.then(()=>resolve(mj)).catch(()=>resolve(null));else resolve(null)};
  const existing=document.querySelector('script[data-qbi-hub-mathjax]');
  if(existing){if(window.MathJax?.startup)done();else existing.addEventListener('load',done,{once:true});setTimeout(done,4000);return}
  const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';s.async=true;s.dataset.qbiHubMathjax='1';s.onload=done;s.onerror=()=>resolve(null);document.head.append(s);
  setTimeout(()=>resolve(window.MathJax?.tex2svg?window.MathJax:null),12000);
 });
 return mathPromise;
}
async function renderMath(){
 const nodes=[...document.querySelectorAll('.anx-chapter .anx-m[data-tex]:not([data-done])')];
 if(!nodes.length)return;
 nodes.forEach(el=>{el.dataset.done='wait'});
 const mj=await ensureMathJax();
 if(!mj?.typesetPromise){nodes.forEach(el=>{el.dataset.done='fallback'});return}
 nodes.forEach(el=>{el.dataset.fallback=el.innerHTML;el.title=el.textContent;el.classList.add('anx-m-pending');el.textContent=el.dataset.display==='1'?'\\['+el.dataset.tex+'\\]':'\\('+el.dataset.tex+'\\)'});
 try{mj.typesetClear?.(nodes);await mj.typesetPromise(nodes);nodes.forEach(el=>{el.dataset.done=el.querySelector('mjx-container')?'1':'fallback';if(!el.querySelector('mjx-container'))el.innerHTML=el.dataset.fallback})}
 catch(e){nodes.forEach(el=>{el.innerHTML=el.dataset.fallback;el.dataset.done='fallback'})}
 finally{nodes.forEach(el=>el.classList.remove('anx-m-pending'))}
}

/* ---- Preguntas: tocar una opción muestra si es correcta y abre la explicación ---- */
function bindQuiz(){
 if(document.documentElement.dataset.qbiAcidosQuiz)return;document.documentElement.dataset.qbiAcidosQuiz='1';
 document.addEventListener('click',e=>{
  const b=e.target.closest&&e.target.closest('.anx-opt');if(!b)return;
  const li=b.closest('li'),quiz=b.closest('.anx-quiz');if(!li||!quiz)return;
  li.classList.remove('is-ok','is-bad');li.classList.add(li.dataset.ok==='1'?'is-ok':'is-bad');
  if(li.dataset.ok==='1'){const sol=quiz.querySelector('.anx-sol');if(sol)sol.open=true}
 });
}

/* ---- Figuras: tocar abre la imagen grande con zoom ---- */
let box=null,scale=1,natural=[0,0];
function lightbox(){
 if(box)return box;
 box=document.createElement('div');box.className='anx-lightbox';box.hidden=true;box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');
 box.innerHTML='<div class="anx-lb-bar"><p data-cap></p><div><button type="button" data-z="-" aria-label="Alejar">−</button><button type="button" data-z="fit" aria-label="Ajustar a la pantalla">⤢</button><button type="button" data-z="+" aria-label="Acercar">+</button><button type="button" data-close aria-label="Cerrar">✕</button></div></div><div class="anx-lb-stage"><img alt=""></div>';
 document.body.append(box);
 const img=box.querySelector('img'),stage=box.querySelector('.anx-lb-stage');
 const fit=()=>{const w=stage.clientWidth-16,h=stage.clientHeight-16;scale=Math.min(w/natural[0],h/natural[1],2);apply()};
 const apply=()=>{img.style.width=Math.round(natural[0]*scale)+'px';img.style.height='auto'};
 box.addEventListener('click',e=>{
  const z=e.target.closest('[data-z]');if(z){const v=z.dataset.z;if(v==='fit')fit();else{scale=Math.max(.2,Math.min(6,scale*(v==='+'?1.35:1/1.35)));apply()}return}
  if(e.target.closest('[data-close]')||e.target===stage)close();
 });
 img.addEventListener('dblclick',()=>{scale=scale<1.5?Math.min(6,scale*2):1;apply()});
 document.addEventListener('keydown',e=>{if(!box.hidden&&e.key==='Escape')close()});
 box.fit=fit;
 return box;
}
function close(){if(box){box.hidden=true;document.documentElement.style.overflow=''}}
function bindZoom(){
 if(document.documentElement.dataset.qbiAcidosZoom)return;document.documentElement.dataset.qbiAcidosZoom='1';
 document.addEventListener('click',e=>{
  const z=e.target.closest&&e.target.closest('.anx-zoom');if(!z)return;
  const src=z.querySelector('img');if(!src)return;e.preventDefault();
  const lb=lightbox(),img=lb.querySelector('img');
  natural=[Number(src.getAttribute('width'))||src.naturalWidth||1200,Number(src.getAttribute('height'))||src.naturalHeight||900];
  img.src=src.currentSrc||src.src;img.alt=src.alt;
  lb.querySelector('[data-cap]').textContent=(z.closest('figure')?.querySelector('figcaption')?.textContent||'').trim();
  lb.hidden=false;document.documentElement.style.overflow='hidden';
  requestAnimationFrame(()=>lb.fit());
 });
}

/* ---- Buscador del índice: el original solo indexa lo que había al cargar; acá se suman Lípidos, TP4 y Ácidos nucleicos ---- */
function bindSearch(){
 const input=document.getElementById('qbGlobalSearch'),box=document.getElementById('qbSearchResults');
 if(!input||!box||input.dataset.anxSearch)return;input.dataset.anxSearch='1';
 const SEL='.anx-chapter :is(h2,h3,h4,p,li,td,figcaption,summary,dt,dd),.qbi-lip-chapter :is(h2,h3,h4,p,li,td),#tp4 :is(h2,h3,h4,p,li,td)';
 const extra=()=>{
  const q=input.value.trim().toLowerCase();if(q.length<2)return;
  const hits=[...document.querySelectorAll(SEL)].filter(n=>!n.querySelector('p,li,td')&&n.textContent.toLowerCase().includes(q)).slice(0,14);
  if(!hits.length)return;
  box.querySelectorAll('button[disabled]').forEach(b=>b.remove());box.classList.add('open');
  hits.forEach(n=>{const b=document.createElement('button');b.type='button';const ch=n.closest('.qb-chapter'),title=(ch?.querySelector('h2')?.textContent||'').trim();const bt=document.createElement('b');bt.textContent=title.slice(0,38);b.append(bt,document.createElement('br'),document.createTextNode(n.textContent.trim().slice(0,92)));
   b.onclick=()=>{const d=n.closest('details');if(d)d.open=true;n.scrollIntoView({behavior:'smooth',block:'start'});setTimeout(()=>{n.classList.add('qb-jump-hit');setTimeout(()=>n.classList.remove('qb-jump-hit'),1200)},350);box.classList.remove('open');document.getElementById('qbSidebar')?.classList.remove('open');document.getElementById('qbSidebarScrim')?.classList.remove('show')};
   box.append(b)});
 };
 input.addEventListener('input',()=>setTimeout(extra,0));
}
function ensure(){
 ensureStyle();bindQuiz();bindZoom();bindSearch();
 if(!build())return false;
 addIndex();updateMeta();renderMath();
 return true;
}
let tries=0;function boot(){if(ensure())return;if(++tries<200)setTimeout(boot,150)}
function maintain(){
 const idx=nav();
 if(!document.getElementById('cap'+LAST)||!document.getElementById(GROUP_ID)||(idx&&!idx.querySelector('[data-qbi-an-index]')))ensure();
 else{updateMeta();if(document.querySelector('.anx-chapter .anx-m[data-tex]:not([data-done])'))renderMath()}
}
const observer=new MutationObserver(()=>{clearTimeout(observer.timer);observer.timer=setTimeout(maintain,120)});
function start(){observer.observe(document.documentElement,{subtree:true,childList:true});boot();setTimeout(maintain,1200);setInterval(maintain,3000)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
