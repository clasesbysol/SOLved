(()=>{
  'use strict';
  const VERSION='1.0.0';
  const BASE='content/subjects/quimica_biologica1/units/proteinas-i/';
  const HUB_ID='qbi-exercises-hub-v1';
  const TP3_ID='qbi-tp3-glucidos';
  const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  const compact=value=>String(value??'').replace(/\s+/g,' ').trim();
  const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  function styleText(){return `
    .qbi-hub{--rose:#e74888;--rose2:#fff0f6;--ink:#3c2935;--line:#efd3e0;max-width:1180px;margin:0 auto;padding:2px 0 42px;color:var(--ink)}
    .qbi-hub *{box-sizing:border-box}.qbi-hub-head{padding:20px 22px;border:1px solid var(--line);border-radius:22px;background:linear-gradient(180deg,#fff,#fff8fc);box-shadow:0 10px 30px rgba(91,42,67,.06);margin-bottom:18px}
    .qbi-hub-head h2{margin:0 0 7px;font-size:clamp(1.35rem,2.5vw,2rem)}.qbi-hub-head p{margin:0;line-height:1.55;color:#6f5967}
    .qbi-hub-family,.qbi-hub-guide,.qbi-hub-problem,.qbi-hub-solution{border:1px solid var(--line);border-radius:18px;background:#fff;margin:12px 0;overflow:hidden}
    .qbi-hub-family>summary,.qbi-hub-guide>summary,.qbi-hub-problem>summary,.qbi-hub-solution>summary{cursor:pointer;list-style:none;font-weight:800;display:flex;align-items:center;gap:10px;padding:16px 18px}
    .qbi-hub-family>summary::-webkit-details-marker,.qbi-hub-guide>summary::-webkit-details-marker,.qbi-hub-problem>summary::-webkit-details-marker,.qbi-hub-solution>summary::-webkit-details-marker{display:none}
    .qbi-hub-family>summary{font-size:1.2rem;background:var(--rose2);border-bottom:1px solid transparent}.qbi-hub-family[open]>summary{border-bottom-color:var(--line)}
    .qbi-hub-family>summary:after,.qbi-hub-guide>summary:after,.qbi-hub-problem>summary:after,.qbi-hub-solution>summary:after{content:'⌄';margin-left:auto;transition:transform .18s ease}.qbi-hub-family[open]>summary:after,.qbi-hub-guide[open]>summary:after,.qbi-hub-problem[open]>summary:after,.qbi-hub-solution[open]>summary:after{transform:rotate(180deg)}
    .qbi-hub-family-body{padding:8px 14px 16px}.qbi-hub-guide>summary{background:#fffafd}.qbi-hub-guide-body{padding:0 14px 14px}
    .qbi-hub-problem>summary{align-items:flex-start;font-size:1rem}.qbi-hub-number{display:inline-grid;place-items:center;min-width:30px;height:30px;border-radius:50%;background:var(--rose);color:white;font-weight:900;font-size:.82rem}
    .qbi-hub-question{padding:0 18px 16px;line-height:1.6}.qbi-hub-question table,.qbi-hub-answer table{width:100%;border-collapse:collapse;margin:12px 0;display:table}.qbi-hub-question th,.qbi-hub-question td,.qbi-hub-answer th,.qbi-hub-answer td{border:1px solid #ead6e0;padding:8px 10px;text-align:center}
    .qbi-hub-solution{margin:0 14px 16px;border-color:#e7c2d3}.qbi-hub-solution>summary{background:#fff4f8;color:#9f315f}.qbi-hub-answer{padding:4px 18px 18px;line-height:1.62}.qbi-hub-answer h3{font-size:1.02rem;margin:18px 0 7px;color:#742747}.qbi-hub-answer p{margin:8px 0}.qbi-hub-answer ul{margin:8px 0 12px;padding-left:22px}
    .qbi-hub-result,.qbi-hub-tip{margin:16px 0 4px;padding:13px 15px;border-radius:14px;background:#f8eef4;border-left:4px solid var(--rose)}.qbi-hub-tip{background:#fff9ee;border-left-color:#d6992e}
    .qbi-hub-math{overflow-x:auto;text-align:center;padding:7px 4px;margin:7px 0;min-height:28px}.qbi-hub-loading{padding:24px;text-align:center;color:#725b68}
    .qbi-hub-practices-title{font-size:.9rem;text-transform:uppercase;letter-spacing:.08em;color:#a34c71;margin:18px 6px 8px}.qbi-hub-note{font-size:.9rem;color:#765f6c;margin:8px 5px 14px}
    #${TP3_ID}{scroll-margin-top:20px}.qbi-tp3-lead{font-size:1.04rem;line-height:1.65}.qbi-tp3-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:14px 0}.qbi-tp3-card{border:1px solid #efd3e0;border-radius:16px;padding:15px;background:#fff}.qbi-tp3-card h3{margin:0 0 7px}.qbi-tp3-card p,.qbi-tp3-card li{line-height:1.58}.qbi-tp3-eq{text-align:center;overflow-x:auto;padding:7px 4px}.qbi-tp3-table{width:100%;border-collapse:collapse;margin:12px 0}.qbi-tp3-table th,.qbi-tp3-table td{border:1px solid #ead6e0;padding:8px 10px;vertical-align:top}.qbi-tp3-route{border-left:4px solid #e74888;background:#fff3f8;border-radius:12px;padding:12px 14px;margin:12px 0}
    @media(max-width:700px){.qbi-tp3-grid{grid-template-columns:1fr}.qbi-hub-family-body{padding-left:8px;padding-right:8px}.qbi-hub-guide-body{padding-left:7px;padding-right:7px}.qbi-hub-question,.qbi-hub-answer{padding-left:12px;padding-right:12px}}
  `}

  function ensureGlobalStyle(){if(document.getElementById('qbi-glucidos-study-pack-style'))return;const style=document.createElement('style');style.id='qbi-glucidos-study-pack-style';style.textContent=styleText();document.head.append(style)}

  function mathify(html){
    return String(html||'')
      .replace(/<p>\s*\[([\s\S]*?)\]\s*<\/p>/g,(m,tex)=>`<div class="qbi-hub-math">\\[${tex.trim()}\\]</div>`);
  }

  let mathPromise=null;
  function ensureMathJax(){
    if(window.MathJax?.typesetPromise)return Promise.resolve(window.MathJax);
    if(mathPromise)return mathPromise;
    mathPromise=new Promise(resolve=>{
      window.MathJax=window.MathJax||{tex:{inlineMath:[['\\(','\\)']],displayMath:[['\\[','\\]']]},svg:{fontCache:'global'},options:{skipHtmlTags:['script','noscript','style','textarea','pre','code']}};
      const existing=document.querySelector('script[data-qbi-hub-mathjax]');
      if(existing){existing.addEventListener('load',()=>resolve(window.MathJax),{once:true});setTimeout(()=>resolve(window.MathJax),2500);return}
      const script=document.createElement('script');script.src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';script.async=true;script.dataset.qbiHubMathjax='1';script.onload=()=>resolve(window.MathJax);script.onerror=()=>resolve(null);document.head.append(script)
    });
    return mathPromise
  }

  async function typeset(root){const mj=await ensureMathJax();if(!mj?.typesetPromise)return;try{mj.typesetClear?.([root]);await mj.typesetPromise([root])}catch(error){console.warn('QBI MathJax',error)}}

  function problemCard(card){return `<details class="qbi-hub-problem"><summary><span class="qbi-hub-number">${esc(card.number)}</span><span>${esc(card.title)}</span></summary><div class="qbi-hub-question">${mathify(card.question)}</div><details class="qbi-hub-solution"><summary>Ver resolución paso a paso</summary><div class="qbi-hub-answer">${mathify(card.answer)}</div></details></details>`}
  function cardsSection(title,cards,open=false){return `<details class="qbi-hub-guide"${open?' open':''}><summary>${esc(title)} <small>(${cards.length})</small></summary><div class="qbi-hub-guide-body">${cards.map(problemCard).join('')}</div></details>`}

  async function loadJson(path){const response=await fetch(`${path}${path.includes('?')?'&':'?'}v=${VERSION}`,{cache:'no-store'});if(!response.ok)throw Error(`${path}: ${response.status}`);return response.json()}
  async function loadText(path){const response=await fetch(`${path}${path.includes('?')?'&':'?'}v=${VERSION}`,{cache:'no-store'});if(!response.ok)throw Error(`${path}: ${response.status}`);return response.text()}

  function splitProtein(cards){
    const study=[],practice=[];
    for(const card of cards||[]){const label=compact(card.guide).toLocaleLowerCase('es');if(label.includes('problemas')||label.includes('electroforesis')||label.includes('2025'))practice.push(card);else study.push(card)}
    return {study:study.length?study:(cards||[]),practice}
  }

  async function renderHub(host){
    if(host.dataset.qbiHubReady===VERSION)return;
    host.dataset.qbiHubReady=VERSION;host.innerHTML='<div class="qbi-hub-loading">Armando las guías de Química Biológica…</div>';
    try{
      const [protein,enz1,glu1,glu2,glu3,e3a,e3b,e3c,e3d]=await Promise.all([
        loadJson(BASE+'qbi-exercises-v1.json'),loadJson(BASE+'qbi-exercises-enzimas-i.json'),
        loadJson(BASE+'qbi-exercises-glucidos-part-1.json'),loadJson(BASE+'qbi-exercises-glucidos-part-2.json'),loadJson(BASE+'qbi-exercises-glucidos-part-3.json'),
        loadText(BASE+'qbi-enzimas3-exercises-1.txt'),loadText(BASE+'qbi-enzimas3-exercises-2.txt'),loadText(BASE+'qbi-enzimas3-exercises-3.txt'),loadText(BASE+'qbi-enzimas3-exercises-4.txt')
      ]);
      const glucidos={cards:[...(glu1.cards||[]),...(glu2.cards||[]),...(glu3.cards||[])]};
      const parts=splitProtein(protein.cards||[]);
      host.innerHTML=`<div class="qbi-hub" id="${HUB_ID}"><div class="qbi-hub-head"><h2>Ejercicios · Química Biológica I</h2><p>Las guías quedaron ordenadas por bloque. Abrí sólo la que vas a estudiar; cada ejercicio mantiene la consigna y la resolución queda colapsada para que puedas intentarlo primero.</p></div>
        <details class="qbi-hub-family" open><summary>Proteínas y enzimas</summary><div class="qbi-hub-family-body">
          ${cardsSection('Guía de estudio 1 · Proteínas',parts.study,true)}
          ${cardsSection('Guía de estudio 2 · Enzimas I',enz1.cards||[])}
          <details class="qbi-hub-guide"><summary>Guía de estudio 3 · Enzimas III</summary><div class="qbi-hub-guide-body qbi-hub-e3">${e3a+e3b+e3c+e3d}</div></details>
          <div class="qbi-hub-practices-title">Prácticas</div>
          ${parts.practice.length?cardsSection('Prácticas · Proteínas y electroforesis',parts.practice):'<p class="qbi-hub-note">Las prácticas existentes quedan integradas dentro de las tres guías anteriores.</p>'}
        </div></details>
        <details class="qbi-hub-family"><summary>Glúcidos</summary><div class="qbi-hub-family-body">${cardsSection('Guía de Problemas · Glúcidos · resuelta y explicada',glucidos.cards||[],true)}</div></details>
      </div>`;
      await typeset(host);
    }catch(error){console.error('QBI exercise hub',error);host.innerHTML=`<div class="qbi-hub-loading"><strong>No se pudieron cargar las guías.</strong><br>${esc(error.message)}</div>`}
  }

  function patchContent(){
    const api=window.LBT_CONTENT;if(!api||api.__qbiGlucidosStudyPack===VERSION)return Boolean(api?.__qbiGlucidosStudyPack);
    const originalRender=api.render.bind(api),originalBind=api.bind.bind(api);
    api.render=(subjectId,unitId,tab)=>{
      if(subjectId==='quimica_biologica1'&&tab==='exercises')return `<div class="content-card zoom-target" data-qbi-exercises-hub><div class="qbi-hub-loading">Cargando guías de Química Biológica…</div></div>`;
      return originalRender(subjectId,unitId,tab)
    };
    api.bind=container=>{originalBind(container);const host=container.querySelector('[data-qbi-exercises-hub]');if(host)renderHub(host)};
    api.__qbiGlucidosStudyPack=VERSION;
    return true
  }

  function tp3Html(){return `<section id="${TP3_ID}" class="qb-chapter qbi-tp3" data-qbi-tp3-version="${VERSION}"><div class="qb-chapter-kicker">TP3 · GLÚCIDOS</div><h2>TP3 · Métodos de glúcidos y cómo se calculan</h2><p class="qbi-tp3-lead">Este bloque junta exactamente los cuatro métodos de la clase de problemas: <strong>Somogyi–Nelson</strong>, <strong>Roe/Seliwanoff</strong>, <strong>metilación exhaustiva + hidrólisis ácida</strong> y <strong>oxidación con periodato</strong>. La idea no es memorizar nombres: es saber <em>qué dato entrega cada técnica</em> y cómo convertir ese dato en concentración, número de unidades o estructura.</p>
  <div class="qbi-tp3-grid">
    <article class="qbi-tp3-card"><h3>1 · Somogyi–Nelson</h3><p><strong>Qué mide:</strong> cantidad de azúcar reductor. Rango de la clase: 0,1–1 μmol/mL. Se lee a <strong>530 nm</strong>.</p><p><strong>Etapa Somogyi:</strong> medio alcalino + Cu²⁺. Las aldosas reducen Cu²⁺→Cu⁺; las cetosas se isomerizan en medio alcalino y también responden. Tartrato mantiene el cobre soluble; Na₂SO₄ disminuye reoxidación por O₂.</p><p><strong>Etapa Nelson:</strong> el Cu⁺ reduce arsenomolibdato a molibdeno azul. La absorbancia es proporcional al azúcar reductor. <strong>Siempre restar el blanco</strong>.</p></article>
    <article class="qbi-tp3-card"><h3>2 · Roe / Seliwanoff</h3><p><strong>Qué mide:</strong> cetohexosas, sobre todo fructosa. Rango: 0,1–0,5 μmol/mL. Reacción ácida con resorcinol y lectura a <strong>530 nm</strong>.</p><p>Las aldohexosas no reaccionan cuantitativamente en esas condiciones. La sacarosa sin hidrólisis previa puede dar una reacción tenue por hidrólisis parcial, por eso <strong>para cuantificar se trabaja después de hidrólisis completa</strong>.</p></article>
    <article class="qbi-tp3-card"><h3>3 · Metilación exhaustiva</h3><p>En medio básico se metilan los <strong>OH libres</strong>. Luego la hidrólisis ácida rompe enlaces glucosídicos y el patrón de metilos que queda revela qué posiciones estaban libres y cuáles participaban de enlaces.</p><table class="qbi-tp3-table"><tr><th>Derivado de glucosa</th><th>Lectura rápida</th></tr><tr><td>2,3,4,6-tetra-O-metil</td><td>residuo terminal</td></tr><tr><td>2,3,6-tri-O-metil</td><td>C4 estaba enlazado</td></tr><tr><td>2,3,4-tri-O-metil</td><td>C6 estaba enlazado</td></tr><tr><td>2,3-di-O-metil</td><td>C4 y C6 enlazados → ramificación</td></tr></table></article>
    <article class="qbi-tp3-card"><h3>4 · Oxidación con periodato</h3><p>Se rompe un enlace C–C cuando los dos carbonos adyacentes tienen grupos oxidables. <strong>Cada corte consume 1 mol de periodato.</strong></p><table class="qbi-tp3-table"><tr><th>Grupo</th><th>Producto útil</th></tr><tr><td>alcohol primario</td><td>metanal (M)</td></tr><tr><td>alcohol secundario</td><td>aldehído; si sigue oxidándose puede dar fórmico</td></tr><tr><td>aldehído</td><td>ácido fórmico (F)</td></tr><tr><td>cetona</td><td>ácidos carboxílicos</td></tr></table><p><strong>Regla de examen:</strong> si hay extremo reductor libre, considerar la forma abierta; si el anomérico está bloqueado, trabajar con la forma cíclica.</p></article>
  </div>
  <details open><summary><strong>Cálculo tipo A · tengo un testigo y una absorbancia</strong></summary><div class="qbi-tp3-card"><p>Primero calculá cuántos μmol había en el testigo.</p><div class="qbi-tp3-eq">\\[n_{testigo}=C_{testigo}\,V_{testigo}\\]</div><p>Si testigo y muestra se midieron con el mismo método y en el rango lineal:</p><div class="qbi-tp3-eq">\\[n_{muestra}=n_{testigo}\frac{A_{muestra,corr}}{A_{testigo,corr}}\\]</div><div class="qbi-tp3-eq">\\[C_{muestra}=\frac{n_{muestra}}{V_{muestra}}\\]</div><p><strong>“corr” = absorbancia con el blanco ya restado.</strong></p></div></details>
  <details><summary><strong>Cálculo tipo B · tengo una curva de calibración</strong></summary><div class="qbi-tp3-card"><p>Si la recta es:</p><div class="qbi-tp3-eq">\\[A=m\,n+b\\]</div><p>despejá la cantidad de azúcar:</p><div class="qbi-tp3-eq">\\[n=\frac{A-b}{m}\\]</div><p>Después dividí por el volumen de muestra. Si la muestra fue diluida, deshacé la dilución al final.</p><div class="qbi-tp3-eq">\\[C_{original}=C_{diluida}\,FD\\]</div></div></details>
  <details><summary><strong>Cálculo tipo C · antes vs. después de hidrólisis</strong></summary><div class="qbi-tp3-card"><p>Este cociente sirve para inferir cuántos monómeros libera una molécula, siempre corrigiendo volúmenes y diluciones.</p><div class="qbi-tp3-eq">\\[N\approx\frac{C_{equiv\,reductores,despues}}{C_{moleculas,antes}}\\]</div><p><strong>Ojo:</strong> sólo podés usar la señal “antes” como concentración molecular directa si sabés cuántos extremos reductores aporta cada molécula. Una sacarosa aporta 0; maltosa/lactosa aportan 1.</p></div></details>
  <details><summary><strong>Cálculo tipo D · Somogyi–Nelson + Roe juntos</strong></summary><div class="qbi-tp3-card"><p>Después de hidrólisis:</p><div class="qbi-tp3-eq">\\[SN\Rightarrow\text{moles totales de monosacáridos reductores}\\]</div><div class="qbi-tp3-eq">\\[Roe\Rightarrow\text{moles de cetohexosa (fructosa)}\\]</div><p>Entonces Roe te dice cuántas fructosas había por molécula y S.N. cuántas unidades reductoras totales se liberaron. El cruce de ambos resultados es una forma de <strong>chequear la estructura y la concentración</strong>.</p></div></details>
  <details><summary><strong>Polisacáridos · ramificación</strong></summary><div class="qbi-tp3-card"><div class="qbi-tp3-eq">\\[ENR=PR+1\\]</div><div class="qbi-tp3-eq">\\[\text{residuos promedio por rama}=\frac{N_{residuos\ totales}}{ENR}\\]</div><p>Para un glucano grande, el número aproximado de residuos sale de:</p><div class="qbi-tp3-eq">\\[N_{residuos}\approx\frac{PM_{polisacarido}}{162}\\]</div><p>En metilación de glucógeno, 2,3-di-O-metilglucosa marca puntos 1→6 y tetra-O-metilglucosa marca extremos no reductores.</p></div></details>
  <div class="qbi-tp3-route"><strong>Ruta de resolución para cualquier problema de TP3:</strong> 1) identificá qué ve cada método; 2) pasá la señal a μmol; 3) corregí alícuota y dilución; 4) compará antes/después de hidrólisis; 5) recién después usá metilación o periodato para decidir posiciones de enlace y ramificaciones.</div>
</section>`}

  function injectTP3(doc){
    if(!doc?.documentElement||doc.getElementById(TP3_ID))return;
    const anchor=doc.getElementById('cap38')||doc.getElementById('cap41')||doc.querySelector('.qb-document section:last-of-type');
    if(!anchor)return;
    if(!doc.getElementById('qbi-glucidos-study-pack-frame-style')){const style=doc.createElement('style');style.id='qbi-glucidos-study-pack-frame-style';style.textContent=styleText();doc.head.append(style)}
    anchor.insertAdjacentHTML('afterend',tp3Html());
    const nav=doc.querySelector('.qb-summary .qb-sidebar #summaryIndex,#summaryIndex');
    if(nav&&!nav.querySelector(`a[href="#${TP3_ID}"]`)){
      const ref=nav.querySelector('a[href="#cap38"]')||nav.lastElementChild;
      const link=doc.createElement('a');link.href=`#${TP3_ID}`;link.textContent='TP3 · Métodos y cálculos de glúcidos';link.dataset.qbiTp3Index='1';
      if(ref)ref.insertAdjacentElement('afterend',link);else nav.append(link)
    }
    const target=doc.getElementById(TP3_ID),mj=doc.defaultView?.MathJax;
    if(mj?.typesetPromise){try{mj.typesetClear?.([target]);mj.typesetPromise([target]).catch(()=>{})}catch(_){}}
  }

  function isQbiFrame(frame){if(!(frame instanceof HTMLIFrameElement))return false;if(!frame.closest('.rich-document-card,.official-section,.workspace-panel,#studyBody'))return false;const src=frame.getAttribute('src')||'',title=frame.getAttribute('title')||'';return /quimica_biologica1\/units\/proteinas-i\/(?:qbi-static|original)\.html/i.test(src)||/Química Biológica/i.test(title)}
  function bindFrame(frame){if(!isQbiFrame(frame)||frame.dataset.qbiGlucidosStudyPack===VERSION)return;frame.dataset.qbiGlucidosStudyPack=VERSION;const run=()=>{try{injectTP3(frame.contentDocument)}catch(_){}};frame.addEventListener('load',()=>{setTimeout(run,30);setTimeout(run,400);setTimeout(run,1200)});run()}
  function scan(){document.querySelectorAll('iframe').forEach(bindFrame)}

  ensureGlobalStyle();
  let attempts=0;const timer=setInterval(()=>{attempts++;const patched=patchContent();scan();if(patched&&attempts>12)clearInterval(timer);if(attempts>120)clearInterval(timer)},100);
  const observer=new MutationObserver(records=>{for(const record of records)for(const node of record.addedNodes)if(node.nodeType===1){if(node.matches?.('iframe'))bindFrame(node);node.querySelectorAll?.('iframe').forEach(bindFrame)}});observer.observe(document.documentElement,{childList:true,subtree:true});
  patchContent();scan();
})();