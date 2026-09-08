(()=>{
'use strict';
const VERSION='4.6.0';
const STYLE_ID='qbi-glucidos-native-style';
const FILES=['qbi-glucidos-summary-1.txt','qbi-glucidos-summary-2.txt','qbi-glucidos-summary-3.txt','qbi-glucidos-summary-4.txt'];
const TITLES={
1:'Panorama general: qué son los glúcidos y por qué importan',
2:'Monosacáridos: estructura, nomenclatura y estereoquímica',
3:'De la forma lineal al anillo: ciclación, anómeros y conformación',
4:'Reactividad de los monosacáridos y derivados biológicos',
5:'Enlace glucosídico y disacáridos',
6:'Polisacáridos: de la secuencia a la arquitectura',
7:'Glicosaminoglicanos y matriz extracelular',
8:'Glicoconjugados: cuando el azúcar se une a proteínas o lípidos',
9:'Los carbohidratos como información: el “código de azúcares”',
10:'Cómo se estudian experimentalmente los carbohidratos',
11:'Conexiones que conviene razonar, no memorizar aisladas',
12:'Ampliaciones de bibliografía que no conviene perder',
13:'Qué hay que saber sí o sí'
};
const SUBLABELS=new Set(['Aminozúcares','Desoxiazúcares','Azúcares ácidos','Lactonas','Ésteres fosfato','Azúcares nucleotídicos','Ácidos siálicos','Maltosa','Lactosa','Sacarosa','Trehalosa','Amilosa','Amilopectina','Hialuronano','Condroitín sulfato','Dermatán sulfato','Queratán sulfato','Heparán sulfato y heparina','Selectinas y reclutamiento de leucocitos','Receptor de manosa-6-fosfato','Toxina colérica y GM1','Virus influenza','Recambio de glicoproteínas plasmáticas','Dulzor y estereoquímica','HbA1c y productos de glicación avanzada','Glicómica','Glicosilación y enfermedad','Glicanos de superficie y grupos sanguíneos','Patógenos y glicanos','Fuentes integradas']);
const FIGURES={
'01':[['Carbohydrate Metabolism.png','CC BY-SA 4.0','Metabolismo y uso de glucosa']],
'02':[['Gliceraldehido-enantiomeros.jpg','CC BY-SA 3.0','D- y L-gliceraldehído como enantiómeros']],
'03':[['Glucose mannose epimerization.png','Dominio público','Epimerización glucosa/manosa en C2']],
'04':[['Glucose equilibrium.svg','Dominio público','Equilibrio entre forma abierta y formas cíclicas de glucosa']],
'05':[['Mutarotation glucose.jpg','Licencia libre en Wikimedia Commons','Mutarrotación de D-glucosa']],
'06':[['Conformations of B-glucopyranose.png','Dominio público','Conformaciones de β-D-glucopiranosa']],
'07':[['Fehling test.png','Licencia libre en Wikimedia Commons','Ensayo de Fehling']],
'08':[['N-Acetylglucosamine.svg','Licencia libre en Wikimedia Commons','N-acetilglucosamina (GlcNAc)'],['N-Acetylneuraminic acid.svg','Dominio público','Ácido N-acetilneuramínico (Neu5Ac)']],
'09':[['Maillard.svg','CC BY-SA','Formación del producto de Amadori / reacción de Maillard'],['Figure 1B.png','CC0','Productos finales de glicación avanzada (AGE)']],
'10':[['Maltose Sucrose Lactose.jpg','Dominio público','Maltosa, sacarosa y lactosa']],
'11':[['Amylose-amylopectin.gif','CC BY-SA 4.0','Comparación entre amilosa y amilopectina'],['Amilopectina.jpg','Licencia libre en Wikimedia Commons','Representaciones de amilopectina']],
'12':[['Branching in Amylopectin and Glycogen.jpg','Licencia abierta (Wikimedia Commons / LibreTexts)','Ramificación en amilopectina y glucógeno']],
'13':[['219 Three Important Polysaccharides-01-es.png','CC BY 4.0','Almidón, glucógeno y celulosa comparados']],
'14':[['Chitin and Chitosan.jpg','Licencia abierta en Wikimedia Commons','Quitina y quitosano']],
'15':[['Hyaluronic acid.svg','Dominio público','Unidad repetitiva del hialuronano'],['Glycosaminoglycans.png','CC BY-SA 3.0','GAG, proteoglicanos y matriz de cartílago']],
'16':[['Extracellular Matrix Components of Cartilage.jpg','CC BY-SA 4.0','Agregados de proteoglicanos en matriz extracelular de cartílago']],
'17':[['N-linked vs O-linked Glycosylation.png','Licencia abierta en Wikimedia Commons','Glicosilación N-unida y O-unida']],
'18':[['Gram negative cell wall.svg','Licencia libre en Wikimedia Commons','Ubicación del LPS en la envoltura de una bacteria Gram negativa']],
'19':[['Leukocyte adhesion cascade.JPG','CC BY-SA 3.0','Selectinas y cascada de adhesión leucocitaria'],['The cation-independent mannose 6-phosphate receptor and ligand.png','Licencia abierta en Wikimedia Commons','Receptor de manosa-6-fosfato y reconocimiento del ligando']],
'20':[['Glycan NMR investigation.jpg','CC BY-SA 3.0','RMN y elucidación estructural de glicanos']]
};
const FORMULAS={
stereo:['Geometría tetraédrica del C sp3 ≈ 109,5°','N(estereoisómeros) = 2^n','n = número de centros quirales'],
mut:['β-D-glucopiranosa ≈ 63,6 %','α-D-glucopiranosa ≈ 36,4 %','forma abierta ≈ 0,003 %'],
dis:['Maltosa = Glc α(1-4) Glc · reductora','Lactosa = Gal β(1-4) Glc · reductora','Sacarosa = Glc α(1-2) βFru · no reductora','Trehalosa = Glc α(1-1) αGlc · no reductora'],
poly:['Amilosa = [Glc α(1-4)]n','Amilopectina = α(1-4) + ramas α(1-6) cada ~24-30 residuos','Glucógeno = α(1-4) + ramas α(1-6) cada ~8-12 residuos','Celulosa = [Glc β(1-4)]n','Quitina = [GlcNAc β(1-4)]n']
};
const css=`
.qbi-glu-native-chapter{scroll-margin-top:18px}.qbi-glu-native-chapter>h2{margin-bottom:18px}.qbi-glu-native-chapter h3{margin:28px 0 10px;color:var(--qb-accent-strong,#8d2452);font-size:1.18rem}.qbi-glu-native-chapter h4{margin:19px 0 8px;color:var(--qb-ink,#382734);font-size:1rem}.qbi-glu-native-chapter p,.qbi-glu-native-chapter li{line-height:1.68}.qbi-glu-native-chapter ul,.qbi-glu-native-chapter ol{padding-left:1.35rem}.qbi-glu-preface{margin:0 0 22px;padding:16px 18px;border:1px solid color-mix(in srgb,var(--qb-accent,#e74888) 18%,#ddd);border-left:4px solid var(--qb-accent,#e74888);border-radius:13px;background:var(--qb-accent-soft,#fff0f6)}.qbi-glu-preface h3{margin-top:0}.qbi-glu-figure-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;margin:20px 0 24px}.qbi-glu-figure{margin:0;overflow:hidden;border:1px solid color-mix(in srgb,var(--qb-accent,#e74888) 18%,#ddd);border-radius:16px;background:#fff;box-shadow:0 7px 20px rgba(93,52,76,.06)}.qbi-glu-figure img{display:block;width:100%;max-height:440px;object-fit:contain;background:#fff;padding:10px}.qbi-glu-figure figcaption{padding:10px 12px 12px;border-top:1px solid rgba(113,78,99,.12);font-size:.77rem;line-height:1.45;color:var(--qb-muted,#75596a)}.qbi-glu-figure figcaption b{display:block;color:var(--qb-ink,#382734);font-size:.83rem;margin-bottom:2px}.qbi-glu-figure figcaption a{color:var(--qb-accent-strong,#8d2452)}.qbi-glu-formulas{display:grid;gap:8px;margin:12px 0 16px}.qbi-glu-native-chapter .formula-box{padding:11px 13px;border:1px solid color-mix(in srgb,var(--qb-accent,#e74888) 24%,#ddd);border-left:4px solid var(--qb-accent,#e74888);border-radius:11px;background:var(--qb-accent-soft,#fff0f6);font:700 .92rem/1.45 'Cambria Math','STIX Two Math',Inter,Arial,sans-serif;overflow-wrap:anywhere}.qbi-glu-cheats{margin:24px 0 8px;border:1px solid color-mix(in srgb,var(--qb-accent,#e74888) 20%,#ddd);border-radius:14px;background:#fff;overflow:hidden}.qbi-glu-cheats>summary{padding:13px 15px;cursor:pointer;font-weight:850;color:var(--qb-accent-strong,#8d2452)}.qbi-glu-cheats>.qbi-glu-formulas{padding:0 14px 14px;margin:0}@media(max-width:680px){.qbi-glu-figure-grid{grid-template-columns:1fr}.qbi-glu-figure img{max-height:360px}}
`;
const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const norm=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function injectStyle(){if(document.getElementById(STYLE_ID))return;const s=document.createElement('style');s.id=STYLE_ID;s.textContent=css;document.head.append(s)}
function sidebarHost(){return document.querySelector('#summaryIndex,.summary-index.qb-index,.qb-index')}
function commonsImage(file){return 'https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(file)}
function commonsPage(file){return 'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file).replace(/%20/g,'_')}
function figureHtml(num){const rows=FIGURES[num]||[];if(!rows.length)return '';return `<div class="qbi-glu-figure-grid">${rows.map(([file,license,label])=>`<figure class="qbi-glu-figure"><img loading="lazy" decoding="async" src="${commonsImage(file)}" alt="${esc(label)}"><figcaption><b>${esc(label)}</b>${esc(file)} · ${esc(license)} · <a href="${commonsPage(file)}" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></figcaption></figure>`).join('')}</div>`}
function formulaHtml(items){return `<div class="qbi-glu-formulas">${items.map(x=>`<div class="formula-box" data-formula>${esc(x)}</div>`).join('')}</div>`}
function parseText(text){
  const lines=text.replace(/\r/g,'').split('\n').map(x=>x.trim());
  const chapters=new Map;let current=0,firstTitleSeen=false,preface=[];
  const h1=new Map(Object.entries(TITLES).map(([n,t])=>[`${n}. ${t}`,Number(n)]));
  for(const line of lines){
    if(!firstTitleSeen&&/^Glúcidos I —/.test(line)){firstTitleSeen=true;continue}
    if(firstTitleSeen&&/^Estructura, estereoquímica,/.test(line))continue;
    if(h1.has(line)){current=h1.get(line);if(!chapters.has(current))chapters.set(current,[]);continue}
    if(!current){if(line)preface.push(line);continue}
    chapters.get(current).push(line);
  }
  return {chapters,preface};
}
function chapterHtml(lines,chapterNo,preface){
  const out=[],para=[],bullets=[],numbers=[];
  const flushPara=()=>{if(!para.length)return;const text=para.splice(0).join(' ').trim();if(!text)return;out.push(`<p>${esc(text)}</p>`);if(text.includes('máximo teórico de estereoisómeros'))out.push(formulaHtml(FORMULAS.stereo));if(text.includes('63,6 % de beta'))out.push(formulaHtml(FORMULAS.mut));if(text.startsWith('Está formada por dos glucosas unidas por un enlace alfa(1-4)'))out.push(formulaHtml([FORMULAS.dis[0]]));if(text.startsWith('Está formada por galactosa y glucosa mediante un enlace beta(1-4)'))out.push(formulaHtml([FORMULAS.dis[1]]));if(text.startsWith('Está formada por glucosa y fructosa.'))out.push(formulaHtml([FORMULAS.dis[2]]));if(text.startsWith('Está formada por dos glucosas cuyos carbonos anoméricos'))out.push(formulaHtml([FORMULAS.dis[3]]));if(text.startsWith('Es esencialmente lineal y está formada por D-glucosas'))out.push(formulaHtml([FORMULAS.poly[0]]));if(text.startsWith('Posee cadenas principales con enlaces alfa(1-4)'))out.push(formulaHtml([FORMULAS.poly[1]]));if(text.startsWith('El glucógeno es el principal polisacárido de reserva'))out.push(formulaHtml([FORMULAS.poly[2]]));if(text.startsWith('La celulosa también es un homopolímero'))out.push(formulaHtml([FORMULAS.poly[3]]));if(text.startsWith('La quitina es un homopolisacárido lineal'))out.push(formulaHtml([FORMULAS.poly[4]]))};
  const flushBullets=()=>{if(bullets.length)out.push('<ul>'+bullets.splice(0).map(x=>`<li>${esc(x)}</li>`).join('')+'</ul>')};
  const flushNumbers=()=>{if(numbers.length)out.push('<ol>'+numbers.splice(0).map(x=>`<li>${esc(x)}</li>`).join('')+'</ol>')};
  if(chapterNo===1&&preface.length){const p=[...preface];const title=p.shift();out.push(`<aside class="qbi-glu-preface"><h3>${esc(title)}</h3>${p.map(x=>`<p>${esc(x)}</p>`).join('')}</aside>`)}
  for(const line of lines){
    if(!line){flushPara();flushBullets();flushNumbers();continue}
    const img=line.match(/^IMAGEN PARA INSERTAR\s+(\d{2})\b/);if(img){flushPara();flushBullets();flushNumbers();out.push(figureHtml(img[1]));continue}
    const h2=line.match(/^\d+\.\d+\s+(.+)$/);if(h2){flushPara();flushBullets();flushNumbers();out.push(`<h3>${esc(h2[1])}</h3>`);continue}
    if(SUBLABELS.has(line)){flushPara();flushBullets();flushNumbers();out.push(`<h4>${esc(line)}</h4>`);continue}
    if(line.startsWith('- ')){flushPara();flushNumbers();bullets.push(line.slice(2));continue}
    const n=line.match(/^\d+\.\s+(.+)$/);if(n){flushPara();flushBullets();numbers.push(n[1]);continue}
    flushBullets();flushNumbers();para.push(line)
  }
  flushPara();flushBullets();flushNumbers();
  if(chapterNo===13)out.push(`<details class="qbi-glu-cheats"><summary>Relaciones rápidas de Glúcidos I</summary>${formulaHtml([...FORMULAS.stereo.slice(1,2),...FORMULAS.mut,...FORMULAS.dis,...FORMULAS.poly])}</details>`);
  return out.join('')
}
let cache=null;async function loadText(){if(cache)return cache;cache=Promise.all(FILES.map(name=>fetch(name+'?v='+VERSION,{cache:'reload'}).then(r=>{if(!r.ok)throw Error(name+' '+r.status);return r.text()}))).then(parts=>parts.join('')).catch(e=>{cache=null;throw e});return cache}
function place(parsed){const anchor=document.getElementById('cap28');if(!anchor?.parentNode)return false;document.querySelectorAll('.qbi-glu-native-chapter').forEach(n=>n.remove());let cursor=anchor;for(let n=1;n<=13;n++){const s=document.createElement('section');s.className='qb-chapter qbi-glu-native-chapter';s.id='cap'+(28+n);s.dataset.qbiGlucidosChapter=String(n);s.innerHTML=`<div class="qb-chapter-number">${28+n}</div><h2>${esc(TITLES[n])}</h2>${chapterHtml(parsed.chapters.get(n)||[],n,parsed.preface)}`;cursor.insertAdjacentElement('afterend',s);cursor=s}const badges=[...document.querySelectorAll('.qb-hero-badges span')];const badge=badges.find(x=>/\b28\s+capitulos\b/.test(norm(x.textContent)));if(badge)badge.textContent='41 capítulos';return true}
function ensureSidebar(){const nav=sidebarHost();if(!nav)return false;nav.querySelectorAll('[data-qbi-glucidos-index="1"]').forEach(n=>n.remove());const anchor=nav.querySelector('a[href="#cap28"]')||[...nav.querySelectorAll('a[href^="#"]')].at(-1);if(!anchor)return false;let cursor=anchor;for(let n=1;n<=13;n++){const link=anchor.cloneNode(false);link.removeAttribute('id');link.classList.remove('active');link.removeAttribute('style');link.dataset.qbiGlucidosIndex='1';link.href='#cap'+(28+n);link.textContent=`${28+n}. ${TITLES[n]}`;cursor.insertAdjacentElement('afterend',link);cursor=link}return true}
function audit(){const chapters=document.querySelectorAll('.qbi-glu-native-chapter').length,links=sidebarHost()?.querySelectorAll('[data-qbi-glucidos-index="1"]').length||0,figures=document.querySelectorAll('.qbi-glu-native-chapter .qbi-glu-figure').length,formulas=document.querySelectorAll('.qbi-glu-native-chapter [data-formula]').length;const ok=chapters===13&&links===13&&figures===25&&formulas>=20;document.documentElement.dataset.qbiGlucidosAudit=ok?'complete':'incomplete';if(!ok)console.error('QBI Glúcidos audit',{chapters,links,figures,formulas});return ok}
let attempts=0,timer,running=false;async function insert(){if(running)return false;running=true;try{injectStyle();if(!document.getElementById('cap28'))return false;const parsed=parseText(await loadText());if(!place(parsed))return false;ensureSidebar();window.QBI_MATH_RENDER_FIX?.repair?.();return audit()}catch(error){console.error('QBI Glúcidos '+VERSION,error);return false}finally{running=false}}
async function retry(){if(await insert())return;if(++attempts<140)timer=setTimeout(retry,260)}
const observer=new MutationObserver(m=>{if(m.some(x=>[...x.addedNodes].some(n=>n.nodeType===1&&!n.matches?.('mjx-container')&&!n.closest?.('mjx-container')))){clearTimeout(timer);timer=setTimeout(insert,180)}});
function start(){observer.observe(document.documentElement,{subtree:true,childList:true});retry();setTimeout(insert,1600);setTimeout(insert,3800);setInterval(insert,4200)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
