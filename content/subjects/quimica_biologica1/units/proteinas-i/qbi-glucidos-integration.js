(()=>{
'use strict';
const VERSION='4.6.0';
const STYLE_ID='qbi-glucidos-v2-style';
const FILES=['qbi-glucidos-summary-1.txt','qbi-glucidos-summary-2.txt','qbi-glucidos-summary-3.txt','qbi-glucidos-summary-4.txt'];
const TITLES=[
'Panorama general: qué son los glúcidos y por qué importan',
'Monosacáridos: estructura, nomenclatura y estereoquímica',
'De la forma lineal al anillo: ciclación, anómeros y conformación',
'Reactividad de los monosacáridos y derivados biológicos',
'Enlace glucosídico y disacáridos',
'Polisacáridos: de la secuencia a la arquitectura',
'Glicosaminoglicanos y matriz extracelular',
'Glicoconjugados: cuando el azúcar se une a proteínas o lípidos',
'Los carbohidratos como información: el “código de azúcares”',
'Cómo se estudian experimentalmente los carbohidratos',
'Conexiones que conviene razonar, no memorizar aisladas',
'Ampliaciones de bibliografía que no conviene perder',
'Qué hay que saber sí o sí'
];
const SUBHEADS=new Set(['Aminozúcares','Desoxiazúcares','Azúcares ácidos','Lactonas','Ésteres fosfato','Azúcares nucleotídicos','Ácidos siálicos','Maltosa','Lactosa','Sacarosa','Trehalosa','Amilosa','Amilopectina','Hialuronano','Condroitín sulfato','Dermatán sulfato','Queratán sulfato','Heparán sulfato y heparina','Selectinas y reclutamiento de leucocitos','Receptor de manosa-6-fosfato','Toxina colérica y GM1','Virus influenza','Recambio de glicoproteínas plasmáticas','Dulzor y estereoquímica','HbA1c y productos de glicación avanzada','Glicómica','Glicosilación y enfermedad','Glicanos de superficie y grupos sanguíneos','Patógenos y glicanos','Fuentes integradas']);
const FIGURES={
'01':[['Carbohydrate Metabolism.png','CC BY-SA 4.0','Metabolismo y uso de glucosa']],
'02':[['Gliceraldehido-enantiomeros.jpg','CC BY-SA 3.0','D- y L-gliceraldehído como enantiómeros']],
'03':[['Glucose mannose epimerization.png','Dominio público','Epimerización glucosa/manosa en C2']],
'04':[['Glucose equilibrium.svg','Dominio público','Forma abierta y formas cíclicas de glucosa']],
'05':[['Mutarotation glucose.jpg','Licencia libre en Wikimedia Commons','Mutarrotación de D-glucosa']],
'06':[['Conformations of B-glucopyranose.png','Dominio público','Conformaciones de β-D-glucopiranosa']],
'07':[['Fehling test.png','Licencia libre en Wikimedia Commons','Ensayo de Fehling']],
'08':[['N-Acetylglucosamine.svg','Licencia libre en Wikimedia Commons','N-acetilglucosamina (GlcNAc)'],['N-Acetylneuraminic acid.svg','Dominio público','Ácido N-acetilneuramínico (Neu5Ac)']],
'09':[['Maillard.svg','CC BY-SA','Producto de Amadori / reacción de Maillard'],['Figure 1B.png','CC0','Productos finales de glicación avanzada (AGE)']],
'10':[['Maltose Sucrose Lactose.jpg','Dominio público','Maltosa, sacarosa y lactosa']],
'11':[['Amylose-amylopectin.gif','CC BY-SA 4.0','Amilosa y amilopectina'],['Amilopectina.jpg','Licencia libre en Wikimedia Commons','Representaciones de amilopectina']],
'12':[['Branching in Amylopectin and Glycogen.jpg','Licencia abierta (Wikimedia Commons / LibreTexts)','Ramificación en amilopectina y glucógeno']],
'13':[['219 Three Important Polysaccharides-01-es.png','CC BY 4.0','Almidón, glucógeno y celulosa']],
'14':[['Chitin and Chitosan.jpg','Licencia abierta en Wikimedia Commons','Quitina y quitosano']],
'15':[['Hyaluronic acid.svg','Dominio público','Unidad repetitiva del hialuronano'],['Glycosaminoglycans.png','CC BY-SA 3.0','GAG, proteoglicanos y matriz de cartílago']],
'16':[['Extracellular Matrix Components of Cartilage.jpg','CC BY-SA 4.0','Proteoglicanos en matriz extracelular de cartílago']],
'17':[['N-linked vs O-linked Glycosylation.png','Licencia abierta en Wikimedia Commons','Glicosilación N-unida y O-unida']],
'18':[['Gram negative cell wall.svg','Licencia libre en Wikimedia Commons','LPS en una bacteria Gram negativa']],
'19':[['Leukocyte adhesion cascade.JPG','CC BY-SA 3.0','Selectinas y adhesión leucocitaria'],['The cation-independent mannose 6-phosphate receptor and ligand.png','Licencia abierta en Wikimedia Commons','Receptor de manosa-6-fosfato']],
'20':[['Glycan NMR investigation.jpg','CC BY-SA 3.0','RMN y elucidación estructural de glicanos']]
};
const FORMULAS=[
'Geometría tetraédrica del C sp³ ≈ 109,5°',
'N(estereoisómeros) = 2ⁿ',
'n = número de centros quirales',
'β-D-glucopiranosa ≈ 63,6 %',
'α-D-glucopiranosa ≈ 36,4 %',
'forma abierta ≈ 0,003 %',
'Maltosa = Glc α(1→4) Glc · reductora',
'Lactosa = Gal β(1→4) Glc · reductora',
'Sacarosa = Glc α(1→2)β Fru · no reductora',
'Trehalosa = Glc α(1→1)α Glc · no reductora',
'Amilosa = [Glc α(1→4)]ₙ',
'Amilopectina = α(1→4) + ramas α(1→6) cada ~24–30 residuos',
'Glucógeno = α(1→4) + ramas α(1→6) cada ~8–12 residuos',
'Celulosa = [Glc β(1→4)]ₙ',
'Quitina = [GlcNAc β(1→4)]ₙ'
];
const CSS=`
.qbi-glu-native-chapter{scroll-margin-top:18px}.qbi-glu-native-chapter>h2{margin-bottom:18px}.qbi-glu-native-chapter h3{margin:28px 0 10px;color:var(--qb-accent-strong,#8d2452);font-size:1.18rem}.qbi-glu-native-chapter h4{margin:19px 0 8px;color:var(--qb-ink,#382734);font-size:1rem}.qbi-glu-native-chapter p,.qbi-glu-native-chapter li{line-height:1.68}.qbi-glu-native-chapter ul,.qbi-glu-native-chapter ol{padding-left:1.35rem}.qbi-glu-preface{margin:0 0 22px;padding:16px 18px;border:1px solid color-mix(in srgb,var(--qb-accent,#e74888) 18%,#ddd);border-left:4px solid var(--qb-accent,#e74888);border-radius:13px;background:var(--qb-accent-soft,#fff0f6)}.qbi-glu-preface h3{margin-top:0}.qbi-glu-figure-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;margin:20px 0 24px}.qbi-glu-figure{margin:0;overflow:hidden;border:1px solid color-mix(in srgb,var(--qb-accent,#e74888) 18%,#ddd);border-radius:16px;background:#fff;box-shadow:0 7px 20px rgba(93,52,76,.06)}.qbi-glu-figure img{display:block;width:100%;max-height:440px;object-fit:contain;background:#fff;padding:10px}.qbi-glu-figure figcaption{padding:10px 12px 12px;border-top:1px solid rgba(113,78,99,.12);font-size:.77rem;line-height:1.45;color:var(--qb-muted,#75596a)}.qbi-glu-figure figcaption b{display:block;color:var(--qb-ink,#382734);font-size:.83rem;margin-bottom:2px}.qbi-glu-figure figcaption a{color:var(--qb-accent-strong,#8d2452)}.qbi-glu-formulas{display:grid;gap:8px;margin:12px 0 16px}.qbi-glu-native-chapter .formula-box{padding:11px 13px;border:1px solid color-mix(in srgb,var(--qb-accent,#e74888) 24%,#ddd);border-left:4px solid var(--qb-accent,#e74888);border-radius:11px;background:var(--qb-accent-soft,#fff0f6);font:700 .92rem/1.45 'Cambria Math','STIX Two Math',Inter,Arial,sans-serif;overflow-wrap:anywhere}.qbi-glu-cheats{margin:24px 0 8px;border:1px solid color-mix(in srgb,var(--qb-accent,#e74888) 20%,#ddd);border-radius:14px;background:#fff;overflow:hidden}.qbi-glu-cheats>summary{padding:13px 15px;cursor:pointer;font-weight:850;color:var(--qb-accent-strong,#8d2452)}.qbi-glu-cheats>.qbi-glu-formulas{padding:0 14px 14px;margin:0}@media(max-width:680px){.qbi-glu-figure-grid{grid-template-columns:1fr}.qbi-glu-figure img{max-height:360px}}
`;
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function injectStyle(){if(document.getElementById(STYLE_ID))return;const s=document.createElement('style');s.id=STYLE_ID;s.textContent=CSS;document.head.append(s)}
function sidebarHost(){return document.querySelector('#summaryIndex,.summary-index.qb-index,.qb-index')}
function commonsImage(file){return 'https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(file)}
function commonsPage(file){return 'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file).replace(/%20/g,'_')}
function figures(num){const rows=FIGURES[num]||[];if(!rows.length)return '';return `<div class="qbi-glu-figure-grid">${rows.map(([file,license,label])=>`<figure class="qbi-glu-figure"><img loading="lazy" decoding="async" referrerpolicy="no-referrer" src="${commonsImage(file)}" alt="${esc(label)}"><figcaption><b>${esc(label)}</b>${esc(file)} · ${esc(license)} · <a href="${commonsPage(file)}" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></figcaption></figure>`).join('')}</div>`}
function formulaBoxes(items){return `<div class="qbi-glu-formulas">${items.map(x=>`<div class="formula-box" data-formula>${esc(x)}</div>`).join('')}</div>`}
let textPromise=null;function sourceText(){if(textPromise)return textPromise;textPromise=Promise.all(FILES.map(name=>fetch(name+'?v='+VERSION,{cache:'reload'}).then(r=>{if(!r.ok)throw Error(name+' '+r.status);return r.text()}))).then(x=>x.join('')).catch(e=>{textPromise=null;throw e});return textPromise}
function parse(text){const lines=text.replace(/\r/g,'').split('\n').map(x=>x.trim()),chapters=Array.from({length:13},()=>[]),preface=[];let current=-1,started=false;for(const line of lines){if(!started&&/^Glúcidos I —/.test(line)){started=true;continue}if(started&&/^Estructura, estereoquímica,/.test(line))continue;const idx=TITLES.findIndex((title,i)=>line===`${i+1}. ${title}`);if(idx>=0){current=idx;continue}if(current<0){if(line)preface.push(line)}else chapters[current].push(line)}return {chapters,preface}}
function contextualFormula(text){if(text.includes('máximo teórico de estereoisómeros'))return FORMULAS.slice(0,3);if(text.includes('63,6 % de beta'))return FORMULAS.slice(3,6);if(text.startsWith('Está formada por dos glucosas unidas por un enlace alfa(1-4)'))return [FORMULAS[6]];if(text.startsWith('Está formada por galactosa y glucosa mediante un enlace beta(1-4)'))return [FORMULAS[7]];if(text.startsWith('Está formada por glucosa y fructosa.'))return [FORMULAS[8]];if(text.startsWith('Está formada por dos glucosas cuyos carbonos anoméricos'))return [FORMULAS[9]];if(text.startsWith('Es esencialmente lineal y está formada por D-glucosas'))return [FORMULAS[10]];if(text.startsWith('Posee cadenas principales con enlaces alfa(1-4)'))return [FORMULAS[11]];if(text.startsWith('El glucógeno es el principal polisacárido de reserva'))return [FORMULAS[12]];if(text.startsWith('La celulosa también es un homopolímero'))return [FORMULAS[13]];if(text.startsWith('La quitina es un homopolisacárido lineal'))return [FORMULAS[14]];return []}
function renderChapter(lines,index,preface){const out=[];if(index===0&&preface.length){const [head,...rest]=preface;out.push(`<aside class="qbi-glu-preface"><h3>${esc(head)}</h3>${rest.map(x=>`<p>${esc(x)}</p>`).join('')}</aside>`)}let list=null,listType='';const flush=()=>{if(!list?.length)return;out.push(`<${listType}>${list.map(x=>`<li>${esc(x)}</li>`).join('')}</${listType}>`);list=null;listType=''};for(const line of lines){if(!line){flush();continue}const image=line.match(/^IMAGEN PARA INSERTAR\s+(\d{2})\b/);if(image){flush();out.push(figures(image[1]));continue}const h2=line.match(/^\d+\.\d+\s+(.+)$/);if(h2){flush();out.push(`<h3>${esc(h2[1])}</h3>`);continue}if(SUBHEADS.has(line)){flush();out.push(`<h4>${esc(line)}</h4>`);continue}if(line.startsWith('- ')){if(listType&&listType!=='ul')flush();listType='ul';(list||(list=[])).push(line.slice(2));continue}const numbered=line.match(/^\d+\.\s+(.+)$/);if(numbered){if(listType&&listType!=='ol')flush();listType='ol';(list||(list=[])).push(numbered[1]);continue}flush();out.push(`<p>${esc(line)}</p>`);const f=contextualFormula(line);if(f.length)out.push(formulaBoxes(f))}flush();if(index===12)out.push(`<details class="qbi-glu-cheats"><summary>Relaciones rápidas de Glúcidos I</summary>${formulaBoxes(FORMULAS)}</details>`);return out.join('')}
function chaptersReady(){return TITLES.every((_,i)=>document.getElementById('cap'+(29+i)))}
function build(parsed){const anchor=document.getElementById('cap28');if(!anchor?.parentNode)return false;if(chaptersReady())return true;document.querySelectorAll('.qbi-glu-native-chapter').forEach(n=>n.remove());let cursor=anchor;TITLES.forEach((title,i)=>{const n=29+i,s=document.createElement('section');s.id='cap'+n;s.className='qb-chapter qbi-glu-native-chapter';s.dataset.qbiGlucidosChapter=String(i+1);s.innerHTML=`<div class="qb-chapter-number">${n}</div><h2>${esc(title)}</h2>${renderChapter(parsed.chapters[i]||[],i,parsed.preface)}`;cursor.insertAdjacentElement('afterend',s);cursor=s});const badge=[...document.querySelectorAll('.qb-hero-badges span')].find(x=>/\b28\s+capitulos\b/.test(norm(x.textContent))||/\b41\s+capitulos\b/.test(norm(x.textContent)));if(badge)badge.textContent='41 capítulos';return true}
function indexReady(nav){const links=[...nav.querySelectorAll('[data-qbi-glucidos-index="1"]')];return links.length===13&&links.every((a,i)=>a.getAttribute('href')==='#cap'+(29+i))}
function ensureIndex(){const nav=sidebarHost();if(!nav)return false;if(indexReady(nav))return true;nav.querySelectorAll('[data-qbi-glucidos-index="1"]').forEach(n=>n.remove());const anchor=nav.querySelector('a[href="#cap28"]')||[...nav.querySelectorAll('a[href^="#"]')].at(-1);if(!anchor)return false;let cursor=anchor;TITLES.forEach((title,i)=>{const n=29+i,link=anchor.cloneNode(false);link.removeAttribute('id');link.classList.remove('active');link.removeAttribute('style');link.dataset.qbiGlucidosIndex='1';link.href='#cap'+n;link.textContent=`${n}. ${title}`;cursor.insertAdjacentElement('afterend',link);cursor=link});return true}
function audit(){const nav=sidebarHost(),chapters=document.querySelectorAll('.qbi-glu-native-chapter').length,links=nav?.querySelectorAll('[data-qbi-glucidos-index="1"]').length||0,imgs=document.querySelectorAll('.qbi-glu-native-chapter .qbi-glu-figure').length,formulas=document.querySelectorAll('.qbi-glu-native-chapter [data-formula]').length;const ok=chapters===13&&links===13&&imgs===25&&formulas>=15;document.documentElement.dataset.qbiGlucidosAudit=ok?'complete':'incomplete';if(!ok)console.error('QBI Glúcidos audit',{chapters,links,imgs,formulas});return ok}
let running=false,attempts=0,timer;async function install(){if(running)return false;if(document.documentElement.dataset.qbiGlucidosAudit==='complete'&&audit())return true;running=true;try{injectStyle();if(!document.getElementById('cap28'))return false;const parsed=parse(await sourceText());if(!build(parsed))return false;if(!ensureIndex())return false;window.QBI_MATH_RENDER_FIX?.repair?.();return audit()}catch(error){console.error('QBI Glúcidos '+VERSION,error);return false}finally{running=false}}
async function retry(){if(await install())return;if(++attempts<140)timer=setTimeout(retry,260)}
const observer=new MutationObserver(m=>{if(!m.some(x=>[...x.addedNodes,...x.removedNodes].some(n=>n.nodeType===1&&!n.matches?.('mjx-container')&&!n.closest?.('mjx-container'))))return;clearTimeout(timer);timer=setTimeout(install,180)});
function start(){observer.observe(document.documentElement,{subtree:true,childList:true});retry();setTimeout(install,1200);setTimeout(install,3200)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
