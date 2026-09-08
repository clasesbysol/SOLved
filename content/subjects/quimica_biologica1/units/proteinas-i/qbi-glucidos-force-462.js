(()=>{
'use strict';
const VERSION='4.6.2';
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
const FILES=['qbi-glucidos-summary-1.txt','qbi-glucidos-summary-2.txt','qbi-glucidos-summary-3.txt','qbi-glucidos-summary-4.txt'];
const SUBHEADS=new Set(['Aminozúcares','Desoxiazúcares','Azúcares ácidos','Lactonas','Ésteres fosfato','Azúcares nucleotídicos','Ácidos siálicos','Maltosa','Lactosa','Sacarosa','Trehalosa','Amilosa','Amilopectina','Hialuronano','Condroitín sulfato','Dermatán sulfato','Queratán sulfato','Heparán sulfato y heparina','Selectinas y reclutamiento de leucocitos','Receptor de manosa-6-fosfato','Toxina colérica y GM1','Virus influenza','Recambio de glicoproteínas plasmáticas','Dulzor y estereoquímica','HbA1c y productos de glicación avanzada','Glicómica','Glicosilación y enfermedad','Glicanos de superficie y grupos sanguíneos','Patógenos y glicanos','Fuentes integradas']);
const FIGURES={
'01':[['Carbohydrate Metabolism.png','Metabolismo y uso de glucosa']],
'02':[['Gliceraldehido-enantiomeros.jpg','D- y L-gliceraldehído como enantiómeros']],
'03':[['Glucose mannose epimerization.png','Epimerización glucosa/manosa en C2']],
'04':[['Glucose equilibrium.svg','Forma abierta y formas cíclicas de glucosa']],
'05':[['Mutarotation glucose.jpg','Mutarrotación de D-glucosa']],
'06':[['Conformations of B-glucopyranose.png','Conformaciones de beta-D-glucopiranosa']],
'07':[['Fehling test.png','Ensayo de Fehling']],
'08':[['N-Acetylglucosamine.svg','N-acetilglucosamina (GlcNAc)'],['N-Acetylneuraminic acid.svg','Ácido N-acetilneuramínico (Neu5Ac)']],
'09':[['Maillard.svg','Reacción de Maillard'],['Figure 1B.png','Productos finales de glicación avanzada (AGE)']],
'10':[['Maltose Sucrose Lactose.jpg','Maltosa, sacarosa y lactosa']],
'11':[['Amylose-amylopectin.gif','Amilosa y amilopectina'],['Amilopectina.jpg','Representaciones de amilopectina']],
'12':[['Branching in Amylopectin and Glycogen.jpg','Ramificación en amilopectina y glucógeno']],
'13':[['219 Three Important Polysaccharides-01-es.png','Almidón, glucógeno y celulosa']],
'14':[['Chitin and Chitosan.jpg','Quitina y quitosano']],
'15':[['Hyaluronic acid.svg','Unidad repetitiva del hialuronano'],['Glycosaminoglycans.png','GAG, proteoglicanos y matriz de cartílago']],
'16':[['Extracellular Matrix Components of Cartilage.jpg','Proteoglicanos en matriz extracelular de cartílago']],
'17':[['N-linked vs O-linked Glycosylation.png','Glicosilación N-unida y O-unida']],
'18':[['Gram negative cell wall.svg','LPS en una bacteria Gram negativa']],
'19':[['Leukocyte adhesion cascade.JPG','Selectinas y adhesión leucocitaria'],['The cation-independent mannose 6-phosphate receptor and ligand.png','Receptor de manosa-6-fosfato']],
'20':[['Glycan NMR investigation.jpg','RMN y elucidación estructural de glicanos']]
};
const FORMULAS=[
'Geometría tetraédrica del C sp³ ≈ 109,5°','N(estereoisómeros) = 2ⁿ','n = número de centros quirales','β-D-glucopiranosa ≈ 63,6 %','α-D-glucopiranosa ≈ 36,4 %','forma abierta ≈ 0,003 %','Maltosa = Glc α(1→4) Glc · reductora','Lactosa = Gal β(1→4) Glc · reductora','Sacarosa = Glc α(1→2)β Fru · no reductora','Trehalosa = Glc α(1→1)α Glc · no reductora','Amilosa = [Glc α(1→4)]ₙ','Amilopectina = α(1→4) + ramas α(1→6) cada ~24–30 residuos','Glucógeno = α(1→4) + ramas α(1→6) cada ~8–12 residuos','Celulosa = [Glc β(1→4)]ₙ','Quitina = [GlcNAc β(1→4)]ₙ'
];
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function sidebar(){return document.querySelector('#summaryIndex,.summary-index.qb-index,.qb-index')}
function imageUrl(file){return 'https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(file)}
function figureHtml(n){return (FIGURES[n]||[]).map(([file,label])=>`<figure class="qbi-glu-figure"><img loading="lazy" decoding="async" referrerpolicy="no-referrer" src="${imageUrl(file)}" alt="${esc(label)}"><figcaption>${esc(label)} · Wikimedia Commons</figcaption></figure>`).join('')}
function parse(text){const lines=text.replace(/\r/g,'').split('\n').map(x=>x.trim());const chapters=Array.from({length:13},()=>[]),preface=[];let current=-1;for(const line of lines){const idx=TITLES.findIndex((t,i)=>line===`${i+1}. ${t}`);if(idx>=0){current=idx;continue}if(current<0){if(line&&!/^Glúcidos I —/.test(line)&&!/^Estructura, estereoquímica,/.test(line))preface.push(line)}else chapters[current].push(line)}return {chapters,preface}}
function render(lines,index,preface){const out=[];if(index===0&&preface.length)out.push(`<aside class="qbi-glu-preface"><h3>${esc(preface[0])}</h3>${preface.slice(1).map(x=>`<p>${esc(x)}</p>`).join('')}</aside>`);let list=[];const flush=()=>{if(!list.length)return;out.push('<ul>'+list.map(x=>`<li>${esc(x)}</li>`).join('')+'</ul>');list=[]};for(const line of lines){if(!line){flush();continue}const im=line.match(/^IMAGEN PARA INSERTAR\s+(\d{2})\b/);if(im){flush();out.push(`<div class="qbi-glu-figure-grid">${figureHtml(im[1])}</div>`);continue}const h=line.match(/^\d+\.\d+\s+(.+)$/);if(h){flush();out.push(`<h3>${esc(h[1])}</h3>`);continue}if(SUBHEADS.has(line)){flush();out.push(`<h4>${esc(line)}</h4>`);continue}if(line.startsWith('- ')){list.push(line.slice(2));continue}flush();out.push(`<p>${esc(line)}</p>`)}flush();if(index===12)out.push(`<details class="qbi-glu-cheats" open><summary>Relaciones rápidas de Glúcidos I</summary><div class="qbi-glu-formulas">${FORMULAS.map(f=>`<div class="formula-box" data-formula>${esc(f)}</div>`).join('')}</div></details>`);return out.join('')}
function ensureStyle(){if(document.getElementById('qbi-glucidos-force-style'))return;const s=document.createElement('style');s.id='qbi-glucidos-force-style';s.textContent='.qbi-glu-native-chapter{scroll-margin-top:18px}.qbi-glu-native-chapter h3{margin:26px 0 9px;color:var(--qb-accent-strong,#8d2452)}.qbi-glu-native-chapter h4{margin:18px 0 7px}.qbi-glu-native-chapter p,.qbi-glu-native-chapter li{line-height:1.68}.qbi-glu-preface{padding:16px 18px;margin:0 0 20px;border-left:4px solid var(--qb-accent,#e74888);border-radius:12px;background:var(--qb-accent-soft,#fff0f6)}.qbi-glu-figure-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px;margin:18px 0 22px}.qbi-glu-figure{margin:0;border:1px solid rgba(113,78,99,.15);border-radius:14px;overflow:hidden;background:#fff}.qbi-glu-figure img{display:block;width:100%;max-height:420px;object-fit:contain;padding:10px}.qbi-glu-figure figcaption{padding:9px 11px;border-top:1px solid rgba(113,78,99,.12);font-size:.78rem;color:var(--qb-muted,#75596a)}.qbi-glu-cheats{margin-top:22px;padding:12px;border:1px solid rgba(113,78,99,.16);border-radius:14px;background:#fff}.qbi-glu-formulas{display:grid;gap:8px;margin-top:12px}.qbi-glu-formulas .formula-box{padding:10px 12px;border-left:4px solid var(--qb-accent,#e74888);border-radius:10px;background:var(--qb-accent-soft,#fff0f6)}@media(max-width:680px){.qbi-glu-figure-grid{grid-template-columns:1fr}}';document.head.append(s)}
async function load(){const parts=await Promise.all(FILES.map(name=>fetch(new URL(name,document.baseURI).href+'?v='+VERSION,{cache:'reload'}).then(r=>{if(!r.ok)throw Error(name+' '+r.status);return r.text()})));return parse(parts.join('\n'))}
function addIndex(){const nav=sidebar();if(!nav)return false;if(nav.querySelectorAll('[data-qbi-glucidos-index="1"]').length===13)return true;nav.querySelectorAll('[data-qbi-glucidos-index="1"]').forEach(x=>x.remove());let cursor=nav.querySelector('a[href="#cap28"]')||[...nav.querySelectorAll('a[href^="#"]')].at(-1);if(!cursor)return false;TITLES.forEach((t,i)=>{const n=29+i,a=cursor.cloneNode(false);a.removeAttribute('id');a.classList.remove('active');a.dataset.qbiGlucidosIndex='1';a.href='#cap'+n;a.textContent=`${n}. ${t}`;cursor.insertAdjacentElement('afterend',a);cursor=a});return true}
function build(parsed){const anchor=document.getElementById('cap28');if(!anchor?.parentNode)return false;for(let n=29;n<=41;n++)document.getElementById('cap'+n)?.remove();let cursor=anchor;TITLES.forEach((t,i)=>{const n=29+i,s=document.createElement('section');s.id='cap'+n;s.className='qb-chapter qbi-glu-native-chapter';s.dataset.qbiGlucidosChapter=String(i+1);s.innerHTML=`<div class="qb-chapter-number">${n}</div><h2>${esc(t)}</h2>${render(parsed.chapters[i]||[],i,parsed.preface)}`;cursor.insertAdjacentElement('afterend',s);cursor=s});const badge=[...document.querySelectorAll('.qb-hero-badges span')].find(x=>/cap[ií]tulos/i.test(x.textContent));if(badge&&/\b(?:19|28|41)\b/.test(badge.textContent))badge.textContent='41 capítulos';return true}
let done=false,tries=0;async function run(){if(done)return true;if(!document.getElementById('cap28')||!sidebar())return false;try{ensureStyle();const parsed=await load();if(!build(parsed)||!addIndex())return false;document.documentElement.dataset.qbiGlucidosAudit='complete';document.documentElement.dataset.qbiGlucidosForce='4.6.2';window.QBI_MATH_RENDER_FIX?.repair?.();done=true;return true}catch(e){console.error('QBI Glúcidos force 4.6.2',e);return false}}
async function boot(){if(await run())return;if(++tries<120)setTimeout(boot,250)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();