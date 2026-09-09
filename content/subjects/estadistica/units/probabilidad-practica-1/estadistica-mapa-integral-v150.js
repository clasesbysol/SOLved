(()=>{
  'use strict';
  const ID='stats-integral-mental-map';
  if(document.getElementById(ID))return;

  const frac=(a,b)=>`<span class="stats-im-frac"><span>${a}</span><span>${b}</span></span>`;
  const eq=(formula,simple='')=>`<div class="stats-im-eq"><div class="stats-im-eq-main">${formula}</div>${simple?`<div class="stats-im-plain">(${simple})</div>`:''}</div>`;
  const concept=(title,formal,simple,use='')=>`<article class="stats-im-concept"><h5>${title}</h5>${formal?eq(formal,simple):`<p class="stats-im-plain">(${simple})</p>`}${use?`<p class="stats-im-use"><b>¿Para qué sirve?</b> (${use})</p>`:''}</article>`;
  const tip=(title,text)=>`<div class="stats-im-tip"><b>${title}</b><span>(${text})</span></div>`;

  const style=document.createElement('style');
  style.id='stats-integral-mental-map-style';
  style.textContent=`
  #${ID}{margin:22px 0 30px;color:inherit;scroll-margin-top:18px}
  #${ID},#${ID} *{box-sizing:border-box}
  #${ID} .stats-im-head{padding:18px 19px;border:2px solid rgba(222,173,30,.48);border-radius:20px;background:var(--paper,#fff);box-shadow:0 10px 28px rgba(83,65,10,.08)}
  #${ID} .stats-im-kicker{display:inline-flex;align-items:center;gap:7px;padding:5px 10px;border-radius:999px;background:rgba(244,197,66,.17);border:1px solid rgba(222,173,30,.34);font-size:.78rem;font-weight:900;letter-spacing:.035em;text-transform:uppercase}
  #${ID} .stats-im-head h2{margin:10px 0 5px;font-size:clamp(1.45rem,3vw,2rem);line-height:1.1;color:inherit}
  #${ID} .stats-im-head p{margin:6px 0;line-height:1.5}
  #${ID} .stats-im-head .stats-im-plain{opacity:.82}
  #${ID} .stats-im-route{display:flex;flex-wrap:wrap;align-items:center;gap:7px;margin-top:14px}
  #${ID} .stats-im-route span{padding:7px 9px;border-radius:999px;border:1px solid rgba(222,173,30,.30);background:rgba(244,197,66,.08);font-size:.86rem;font-weight:750;text-align:center}
  #${ID} .stats-im-route i{font-style:normal;opacity:.52}
  #${ID} .stats-im-legend{margin-top:14px;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px}
  #${ID} .stats-im-symbol{padding:9px 10px;border-radius:12px;border:1px solid rgba(120,104,52,.16);background:rgba(255,255,255,.54);line-height:1.35}
  #${ID} .stats-im-symbol b{display:block;color:#9a7610;font-size:.95rem}
  #${ID} details.stats-im-chapter{margin:13px 0;border:1px solid rgba(222,173,30,.30);border-radius:19px;overflow:hidden;background:var(--paper,#fff);box-shadow:0 8px 24px rgba(83,65,10,.055)}
  #${ID} details.stats-im-chapter>summary{cursor:pointer;list-style:none;padding:16px 17px;display:flex;gap:11px;align-items:flex-start;background:rgba(244,197,66,.09);font-weight:900;line-height:1.25}
  #${ID} details.stats-im-chapter>summary::-webkit-details-marker{display:none}
  #${ID} details.stats-im-chapter>summary::before{content:'▸';display:inline-block;margin-top:1px;transition:transform .16s ease;color:#b58a12}
  #${ID} details.stats-im-chapter[open]>summary::before{transform:rotate(90deg)}
  #${ID} .stats-im-summary-title{display:block}
  #${ID} .stats-im-summary-sub{display:block;margin-top:3px;font-size:.84rem;font-weight:650;opacity:.72}
  #${ID} .stats-im-body{padding:16px}
  #${ID} .stats-im-bigidea{padding:13px 14px;border-radius:14px;background:rgba(244,197,66,.09);border-left:5px solid rgba(222,173,30,.70);line-height:1.48;margin-bottom:13px}
  #${ID} details.stats-im-part{margin:10px 0;border:1px solid rgba(120,104,52,.16);border-radius:15px;overflow:hidden;background:rgba(255,255,255,.46)}
  #${ID} details.stats-im-part>summary{cursor:pointer;list-style:none;padding:12px 14px;font-weight:850;color:#8b6b0f;background:rgba(244,197,66,.055)}
  #${ID} details.stats-im-part>summary::-webkit-details-marker{display:none}
  #${ID} .stats-im-part-body{padding:13px 14px}
  #${ID} .stats-im-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(245px,1fr));gap:10px}
  #${ID} .stats-im-concept{padding:12px 13px;border-radius:14px;border:1px solid rgba(120,104,52,.15);background:rgba(255,255,255,.60);min-width:0}
  #${ID} .stats-im-concept h5{margin:0 0 8px;color:#8b6b0f;font-size:.97rem}
  #${ID} .stats-im-eq{margin:7px 0;padding:9px 9px;border-radius:11px;background:rgba(55,48,22,.045);border:1px solid rgba(120,104,52,.13);overflow-x:auto;text-align:center}
  #${ID} .stats-im-eq-main{font-family:Cambria Math,'STIX Two Math','Times New Roman',serif;font-size:1.06rem;line-height:1.55;white-space:normal}
  #${ID} .stats-im-plain{font-size:.88rem;line-height:1.42;opacity:.80;margin-top:5px}
  #${ID} .stats-im-use{margin:7px 0 0;font-size:.88rem;line-height:1.42}
  #${ID} .stats-im-frac{display:inline-grid;grid-template-rows:auto auto;vertical-align:middle;text-align:center;line-height:1.06;margin:0 .12em}
  #${ID} .stats-im-frac>span:first-child{border-bottom:1.4px solid currentColor;padding:0 .25em .10em}
  #${ID} .stats-im-frac>span:last-child{padding:.10em .25em 0}
  #${ID} .stats-im-example{padding:14px;border-radius:15px;border:1px solid rgba(222,173,30,.25);background:rgba(244,197,66,.045)}
  #${ID} .stats-im-example h4{margin:0 0 9px;color:#8b6b0f}
  #${ID} .stats-im-example p{margin:7px 0;line-height:1.48}
  #${ID} .stats-im-step{margin:9px 0;padding:10px 11px;border-left:4px solid rgba(222,173,30,.58);border-radius:9px;background:rgba(255,255,255,.55)}
  #${ID} .stats-im-step b{color:#8b6b0f}
  #${ID} .stats-im-tip{display:flex;gap:8px;align-items:flex-start;margin:8px 0;padding:9px 11px;border-radius:11px;border:1px dashed rgba(222,173,30,.42);background:rgba(244,197,66,.06);line-height:1.4}
  #${ID} .stats-im-tip b{white-space:nowrap;color:#8b6b0f}
  #${ID} .stats-im-table-wrap{overflow-x:auto;margin:10px 0}
  #${ID} table{width:100%;border-collapse:collapse;min-width:560px;font-size:.88rem}
  #${ID} th,#${ID} td{padding:8px 9px;border-bottom:1px solid rgba(120,104,52,.16);text-align:left;vertical-align:top}
  #${ID} th{background:rgba(244,197,66,.08);color:#8b6b0f}
  #${ID} .stats-im-traps{margin-top:12px;padding:12px 13px;border:1px dashed rgba(179,117,20,.45);border-radius:13px;background:rgba(255,245,214,.40);line-height:1.48}
  #${ID} .stats-im-traps b{color:#8b6b0f}
  #${ID} .stats-im-mini{font-size:.86rem;opacity:.78}
  @media(prefers-color-scheme:dark){#${ID} .stats-im-symbol,#${ID} .stats-im-concept,#${ID} details.stats-im-part,#${ID} .stats-im-step{background:rgba(255,255,255,.035)}#${ID} .stats-im-example{background:rgba(244,197,66,.055)}#${ID} .stats-im-traps{background:rgba(244,197,66,.045)}}
  @media(max-width:680px){#${ID} .stats-im-head{padding:15px 14px}#${ID} .stats-im-body{padding:12px}#${ID} .stats-im-grid{grid-template-columns:1fr}#${ID} .stats-im-route i{display:none}#${ID} details.stats-im-chapter>summary{padding:14px 13px}#${ID} .stats-im-tip{display:block}#${ID} .stats-im-tip b{display:block;margin-bottom:2px}}
  `;
  document.head.append(style);

  const root=document.createElement('section');
  root.id=ID;
  root.dataset.version='1.5.0';
  root.innerHTML=`
    <div class="stats-im-head">
      <span class="stats-im-kicker">🧠 Mapa mental integral</span>
      <h2>Probabilidad y variables aleatorias · desde cero</h2>
      <p><strong>Idea del mapa:</strong> primero entendé qué objeto estás mirando; recién después elegí la fórmula.</p>
      <p class="stats-im-plain">(Este bloque está hecho para estudiar sin clase: cada fórmula formal tiene abajo una traducción simple, para recordar qué significa y cuándo usarla.)</p>
      <div class="stats-im-route" aria-label="Ruta conceptual">
        <span>experimento</span><i>→</i><span>Ω y eventos</span><i>→</i><span>P</span><i>→</i><span>condicional / Bayes</span><i>→</i><span>X(ω)</span><i>→</i><span>discreta o continua</span><i>→</i><span>p<sub>X</sub> o f<sub>X</sub></span><i>→</i><span>F<sub>X</sub></span><i>→</i><span>percentiles</span>
      </div>
      <div class="stats-im-legend">
        <div class="stats-im-symbol"><b>Ω</b><span>(todos los resultados posibles)</span></div>
        <div class="stats-im-symbol"><b>ω</b><span>(un resultado concreto de Ω)</span></div>
        <div class="stats-im-symbol"><b>A, B</b><span>(eventos: grupos de resultados que me interesan)</span></div>
        <div class="stats-im-symbol"><b>X</b><span>(la regla que convierte cada resultado en un número)</span></div>
        <div class="stats-im-symbol"><b>x o k</b><span>(un valor concreto que puede tomar X)</span></div>
        <div class="stats-im-symbol"><b>R<sub>X</sub></b><span>(rango: lista de valores posibles de X)</span></div>
        <div class="stats-im-symbol"><b>p<sub>X</sub>(x)</b><span>(probabilidad exacta de x, si X es discreta)</span></div>
        <div class="stats-im-symbol"><b>f<sub>X</sub>(x)</b><span>(densidad, si X es continua; la probabilidad sale del área)</span></div>
        <div class="stats-im-symbol"><b>F<sub>X</sub>(x)</b><span>(probabilidad acumulada hasta x: “hasta acá”)</span></div>
      </div>
    </div>

    <details class="stats-im-chapter" data-key="cap0" open>
      <summary><span><span class="stats-im-summary-title">0 · Base: conteo, conjuntos, experimento, axiomas y equiprobabilidad</span><span class="stats-im-summary-sub">(armar el universo antes de calcular probabilidades)</span></span></summary>
      <div class="stats-im-body">
        <div class="stats-im-bigidea"><b>Idea central.</b> (Primero describís qué puede pasar y cómo contarlo. Después asignás probabilidades a esos resultados.)</div>
        <details class="stats-im-part" open><summary>Definiciones formales + fórmulas</summary><div class="stats-im-part-body">
          <div class="stats-im-grid">
            ${concept('Principio de multiplicación','N = m · n','si una tarea tiene etapas, combinás cada opción de una etapa con todas las de la otra','contar resultados de procesos por etapas')}
            ${concept('Factorial','n! = n · (n−1) · (n−2) · … · 2 · 1','cantidad de maneras de ordenar n cosas distintas; por convenio 0! = 1','permutaciones u ordenamientos')}
            ${concept('Permutaciones con repetición',`N = ${frac('n!','n<sub>1</sub>! · n<sub>2</sub>! · … · n<sub>r</sub>!')}`,'ordeno n cosas pero algunas son iguales, así que divido los cambios que no generan un orden nuevo','palabras, códigos o secuencias con elementos repetidos')}
            ${concept('Número combinatorio',`C(n,k) = ${frac('n!','k! (n−k)!')}`,'elijo k cosas entre n y NO importa el orden','elegir grupos, muestras o subconjuntos')}
            ${concept('Espacio muestral','Ω = {todos los resultados posibles}','es la caja grande que contiene absolutamente todo lo que puede pasar','definir el universo del experimento')}
            ${concept('Evento','A ⊆ Ω','es una condición que me interesa; junta los resultados que cumplen esa condición','traducir una pregunta a un conjunto')}
            ${concept('Unión','A ∪ B = {ω ∈ Ω : ω ∈ A o ω ∈ B}','pasa A o B, incluyendo el caso en que pasan los dos','consignas con “o” / “al menos uno”')}
            ${concept('Intersección','A ∩ B = {ω ∈ Ω : ω ∈ A y ω ∈ B}','pasan A y B a la vez','consignas con “y”, “ambos”, “simultáneamente”')}
            ${concept('Complemento','A<sup>c</sup> = {ω ∈ Ω : ω ∉ A}','todo lo que NO está en A','resolver “ninguno”, “no”, “al menos uno” por complemento')}
            ${concept('Eventos disjuntos','A ∩ B = ∅','no tienen ningún resultado en común; no pueden pasar juntos','saber cuándo las probabilidades se suman directamente')}
            ${concept('De Morgan I','(A ∪ B)<sup>c</sup> = A<sup>c</sup> ∩ B<sup>c</sup>','que NO ocurra A o B equivale a que no ocurra A Y tampoco B','traducir complementos de uniones')}
            ${concept('De Morgan II','(A ∩ B)<sup>c</sup> = A<sup>c</sup> ∪ B<sup>c</sup>','que no ocurran ambos juntos equivale a que al menos uno falle','traducir complementos de intersecciones')}
            ${concept('Frecuencia relativa',`f<sub>A</sub> = ${frac('cantidad de veces que ocurre A','n')}`,'qué fracción de las repeticiones terminó en A','aproximar una probabilidad a partir de muchas repeticiones')}
            ${concept('Axioma 1','P(A) ≥ 0','una probabilidad nunca puede ser negativa','control básico')}
            ${concept('Axioma 2','P(Ω) = 1','algún resultado posible seguro ocurre','la probabilidad total es 100%')}
            ${concept('Axioma 3','P(A<sub>1</sub> ∪ A<sub>2</sub> ∪ …) = P(A<sub>1</sub>) + P(A<sub>2</sub>) + …, si son disjuntos','si los eventos no se pisan, puedo sumar sus probabilidades','sumar alternativas incompatibles')}
            ${concept('Consecuencia','P(∅) = 0','el evento imposible tiene probabilidad cero','control básico')}
            ${concept('Cota de probabilidad','0 ≤ P(A) ≤ 1','ninguna probabilidad baja de 0 ni pasa de 1','control básico')}
            ${concept('Unión general','P(A ∪ B) = P(A) + P(B) − P(A ∩ B)','sumo A y B y resto la zona que conté dos veces','cuando A y B pueden ocurrir juntos')}
            ${concept('Complemento','P(A<sup>c</sup>) = 1 − P(A)','lo que falta hasta 1 es la probabilidad de que A no pase','atajo para “al menos uno”')}
            ${concept('Equiprobabilidad simple',`P({ω}) = ${frac('1','#Ω')}`,'si todos los resultados elementales son igual de probables, cada uno vale uno dividido la cantidad total','dados equilibrados, selecciones uniformes')}
            ${concept('Casos favorables / posibles',`P(A) = ${frac('#A','#Ω')}`,'cuento cuántos casos sirven y los divido por todos los casos posibles; SOLO si son equiprobables','probabilidad clásica')}
          </div>
          ${tip('Ojo','“favorables / posibles” no es una ley universal: sólo vale cuando los resultados elementales tienen la misma probabilidad')}
          ${tip('Ojo','disjuntos no significa independientes: disjuntos con probabilidad positiva se afectan muchísimo, porque si ocurrió uno el otro ya no puede ocurrir')}
        </div></details>
        <details class="stats-im-part" open><summary>Ejemplo integrador del capítulo</summary><div class="stats-im-part-body">
          <div class="stats-im-example">
            <h4>Ejemplo · una jornada de laboratorio</h4>
            <p>Tenemos 5 tubos distintos A, B, C, D y E. Primero elegimos 2 tubos al azar, sin importar el orden. Después tiramos un dado equilibrado para decidir una condición experimental.</p>
            <div class="stats-im-step"><b>1 · Conteo de la muestra.</b> (Elegir A+B es lo mismo que B+A, así que uso combinación.) ${eq(`C(5,2) = ${frac('5!','2!·3!')} = 10`,'hay 10 parejas distintas de tubos')}</div>
            <div class="stats-im-step"><b>2 · Proceso por etapas.</b> (Cada pareja se puede combinar con cualquiera de las 6 caras del dado.) ${eq('10 · 6 = 60','hay 60 resultados completos equiprobables')}</div>
            <div class="stats-im-step"><b>3 · Espacio muestral.</b> (Un resultado ω podría ser “pareja AB y dado 4”. Todos esos resultados forman Ω.) ${eq('#Ω = 60','cantidad total de resultados posibles')}</div>
            <div class="stats-im-step"><b>4 · Eventos.</b> Sea A = “el dado sale par” y B = “la pareja contiene el tubo A”. Entonces A∩B significa (sale par Y además elegí el tubo A), A∪B significa (pasa al menos una de las dos cosas) y A<sup>c</sup> significa (sale impar).</div>
            <div class="stats-im-step"><b>5 · Equiprobabilidad.</b> Hay 3 caras pares de 6, entonces ${eq(`P(A) = ${frac('3','6')} = ${frac('1','2')}`,'tres resultados favorables del dado sobre seis posibles')}</div>
            <div class="stats-im-step"><b>6 · Complemento.</b> ${eq(`P(A<sup>c</sup>) = 1 − ${frac('1','2')} = ${frac('1','2')}`,'la probabilidad de impar es lo que falta hasta 1')}</div>
            <div class="stats-im-step"><b>7 · Permutación con repetición, dentro del mismo laboratorio.</b> Si una etiqueta usa las letras AABBC, ${eq(`N = ${frac('5!','2!·2!')} = 30`,'divido por las repeticiones de A y de B')}</div>
            <p class="stats-im-mini">(La idea del ejemplo no es memorizar “tubos”: es ver que primero construís y contás Ω, después definís eventos y recién ahí calculás P.)</p>
          </div>
        </div></details>
      </div>
    </details>

    <details class="stats-im-chapter" data-key="cap1">
      <summary><span><span class="stats-im-summary-title">1 · Condicional, multiplicación, probabilidad total, Bayes e independencia</span><span class="stats-im-summary-sub">(qué cambia cuando ya sé algo y cómo conectar caminos posibles)</span></span></summary>
      <div class="stats-im-body">
        <div class="stats-im-bigidea"><b>Idea central.</b> (La probabilidad condicional achica el universo. Probabilidad total suma caminos. Bayes recorre esos caminos al revés.)</div>
        <details class="stats-im-part" open><summary>Definiciones formales + fórmulas</summary><div class="stats-im-part-body">
          <div class="stats-im-grid">
            ${concept('Probabilidad condicional',`P(A | B) = ${frac('P(A ∩ B)','P(B)')}, &nbsp; P(B)&gt;0`,'probabilidad de A sabiendo que B ya pasó; ahora miro sólo dentro de B','consignas con “dado que”, “sabiendo que”, “entre los que…”')}
            ${concept('Teorema de multiplicación','P(A ∩ B) = P(A | B) · P(B)','para que pasen los dos: llego a B y, dentro de B, ocurre A','calcular una intersección por etapas')}
            ${concept('Multiplicación equivalente','P(A ∩ B) = P(B | A) · P(A)','puedo recorrer la misma intersección empezando por A','elegir el orden más cómodo')}
            ${concept('Partición','A<sub>1</sub> ∪ A<sub>2</sub> ∪ … = Ω &nbsp; y &nbsp; A<sub>i</sub> ∩ A<sub>j</sub> = ∅ para i≠j','divido Ω en caminos que cubren todo y no se pisan','preparar probabilidad total y Bayes')}
            ${concept('Probabilidad total','P(B) = Σ P(B | A<sub>i</sub>) · P(A<sub>i</sub>)','B puede aparecer por distintos caminos; calculo cada camino y los sumo','varios grupos, fábricas, urnas o causas pueden producir el mismo resultado')}
            ${concept('Bayes',`P(A<sub>j</sub> | B) = ${frac('P(B | A<sub>j</sub>) · P(A<sub>j</sub>)','Σ P(B | A<sub>i</sub>) · P(A<sub>i</sub>)')}`,'ya vi B y quiero saber de qué causa A<sub>j</sub> es más probable que haya venido','invertir una condicional')}
            ${concept('Independencia','P(A ∩ B) = P(A) · P(B)','saber que ocurrió uno no cambia la probabilidad del otro','decidir si dos eventos realmente no se afectan')}
            ${concept('Independencia equivalente','P(A | B) = P(A)','después de enterarme de B, A sigue teniendo exactamente la misma probabilidad','comprobar independencia si P(B)>0')}
          </div>
          <div class="stats-im-table-wrap"><table><thead><tr><th>Si la consigna dice…</th><th>Traducilo mentalmente como…</th><th>Herramienta</th></tr></thead><tbody>
            <tr><td>“dado que / sabiendo que”</td><td>(me achicaron el universo)</td><td>Condicional</td></tr>
            <tr><td>“A y B” por etapas</td><td>(quiero que pasen ambas cosas)</td><td>Multiplicación</td></tr>
            <tr><td>“puede venir de varios grupos”</td><td>(sumo caminos hacia el mismo resultado)</td><td>Probabilidad total</td></tr>
            <tr><td>“ya vi el resultado, ¿de qué grupo vino?”</td><td>(quiero recorrer los caminos al revés)</td><td>Bayes</td></tr>
            <tr><td>“una cosa no afecta la otra”</td><td>(condicionar no cambia nada)</td><td>Independencia</td></tr>
          </tbody></table></div>
        </div></details>
        <details class="stats-im-part" open><summary>Ejemplo integrador del capítulo</summary><div class="stats-im-part-body">
          <div class="stats-im-example">
            <h4>Ejemplo · dos equipos procesan muestras</h4>
            <p>El equipo A procesa el 70% de las muestras y el equipo B el 30%. Una muestra procesada por A falla con probabilidad 0,02; una procesada por B falla con probabilidad 0,08.</p>
            ${eq('P(A)=0,70 &nbsp;&nbsp; P(B)=0,30 &nbsp;&nbsp; P(F|A)=0,02 &nbsp;&nbsp; P(F|B)=0,08','F significa “la muestra falla”')}
            <div class="stats-im-step"><b>1 · Multiplicación.</b> (Probabilidad de que la muestra venga de A Y falle.) ${eq('P(A ∩ F)=P(F|A)·P(A)=0,02·0,70=0,014','camino A → falla')}</div>
            <div class="stats-im-step"><b>2 · Probabilidad total.</b> (Una falla puede venir por A o por B, así que sumo los dos caminos.) ${eq('P(F)=0,02·0,70 + 0,08·0,30 = 0,038','probabilidad total de falla')}</div>
            <div class="stats-im-step"><b>3 · Bayes.</b> (Ya vi que falló; ahora quiero saber si probablemente vino de B.) ${eq(`P(B|F) = ${frac('0,08·0,30','0,038')} ≈ 0,632`,'aprox. 63,2% de las fallas provienen de B')}</div>
            <div class="stats-im-step"><b>4 · Independencia.</b> Si equipo y falla fueran independientes tendría que cumplirse P(F|A)=P(F). Pero ${eq('0,02 ≠ 0,038','entonces el equipo usado sí cambia la probabilidad de falla; no son independientes')}</div>
            <p class="stats-im-mini">(Este mismo esqueleto sirve para test diagnóstico, fábrica–defectuoso, urna–color, tratamiento–respuesta, etc.)</p>
          </div>
        </div></details>
      </div>
    </details>

    <details class="stats-im-chapter" data-key="cap2">
      <summary><span><span class="stats-im-summary-title">2 · Variables aleatorias discretas y distribuciones famosas</span><span class="stats-im-summary-sub">(transformar resultados en números y asignar probabilidad a valores exactos)</span></span></summary>
      <div class="stats-im-body">
        <div class="stats-im-bigidea"><b>Idea central.</b> (X no es “una probabilidad”: X es una función que traduce cada resultado ω a un número. Después p<sub>X</sub> dice qué probabilidad tiene cada número y F<sub>X</sub> va acumulando.)</div>
        <details class="stats-im-part" open><summary>Definiciones formales + fórmulas</summary><div class="stats-im-part-body">
          <div class="stats-im-grid">
            ${concept('Variable aleatoria','X : Ω → ℝ','X es una regla: entra un resultado ω y sale un número','quedarme con la característica numérica del experimento que me interesa')}
            ${concept('Evaluación de la variable','X(ω) = x','para ese resultado concreto ω, la máquina X devolvió el número x','conectar el resultado original con el valor de la variable')}
            ${concept('Rango',`R<sub>X</sub> = {x ∈ ℝ : existe ω ∈ Ω con X(ω)=x}`,'lista de números que X realmente puede devolver','saber qué valores son posibles antes de calcular probabilidades')}
            ${concept('Evento asociado a X=x','{ω ∈ Ω : X(ω)=x}','junto todos los resultados originales que X transforma en el mismo valor x','entender por qué “X=x” también describe un evento')}
            ${concept('Probabilidad puntual',`p<sub>X</sub>(x) = P({ω ∈ Ω : X(ω)=x}) = P(X=x)`,'probabilidad de que X valga EXACTAMENTE x','variables discretas')}
            ${concept('Propiedades de p<sub>X</sub>','p<sub>X</sub>(x) ≥ 0 &nbsp; y &nbsp; Σ<sub>x∈R<sub>X</sub></sub> p<sub>X</sub>(x)=1','cada probabilidad es no negativa y, sumadas todas, dan 1','comprobar que una función puntual sea válida')}
            ${concept('Distribución acumulada',`F<sub>X</sub>(t) = P(X≤t) = Σ<sub>x∈R<sub>X</sub>, x≤t</sub> p<sub>X</sub>(x)`,'probabilidad de estar HASTA t; en discreta voy sumando barritas','preguntas “como máximo”, “menor o igual”, “hasta…”')}
          </div>
          <div class="stats-im-route"><span>ω</span><i>→</i><span>X(ω)</span><i>→</i><span>R<sub>X</sub></span><i>→</i><span>p<sub>X</sub>(x)</span><i>→</i><span>sumo</span><i>→</i><span>F<sub>X</sub>(x)</span></div>
          <h4 style="margin:16px 0 8px;color:#8b6b0f">Distribuciones discretas del resumen</h4>
          <div class="stats-im-grid">
            ${concept('Binomial',`X ~ Bi(n,p) &nbsp;&nbsp; R<sub>X</sub>={0,1,…,n}<br>P(X=k)=C(n,k)·p<sup>k</sup>·(1−p)<sup>n−k</sup>`,'hago n intentos fijos, cada uno éxito/fracaso, independientes y con el mismo p; X cuenta éxitos','cuando n está fijado de antemano y cuento cuántos éxitos hubo')}
            ${concept('Geométrica',`X ~ G(p) &nbsp;&nbsp; R<sub>X</sub>={1,2,3,…}<br>P(X=k)=(1−p)<sup>k−1</sup>·p`,'repito hasta el PRIMER éxito; para llegar al intento k hubo k−1 fracasos y después éxito','cuando la pregunta es “¿en qué intento aparece el primero?”')}
            ${concept('Hipergeométrica',`X ~ H(D,N−D,n)<br>P(X=k)=${frac('C(D,k)·C(N−D,n−k)','C(N,n)')}<br>max{n−(N−D),0} ≤ k ≤ min{D,n}`,'tengo una población finita, saco n SIN reposición y cuento k éxitos','muestras sin devolver elementos; las extracciones ya no son independientes')}
            ${concept('Poisson',`X ~ P(λ) &nbsp;&nbsp; R<sub>X</sub>={0,1,2,…}<br>P(X=k)=${frac('e<sup>−λ</sup> λ<sup>k</sup>','k!')}`,'cuento cuántos eventos aparecen en una unidad de tiempo, espacio, volumen, masa, etc.; λ es la cantidad media esperada','conteos de ocurrencias con una tasa media')}
          </div>
          <div class="stats-im-table-wrap"><table><thead><tr><th>Historia del problema</th><th>Modelo</th><th>R puntual</th><th>R acumulada</th></tr></thead><tbody>
            <tr><td>n intentos fijos + cuento éxitos</td><td>Binomial</td><td>dbinom(k,n,p)</td><td>pbinom(t,n,p)</td></tr>
            <tr><td>repito hasta primer éxito</td><td>Geométrica</td><td>dgeom(k−1,p)</td><td>pgeom(t−1,p)</td></tr>
            <tr><td>población finita sin reposición</td><td>Hipergeométrica</td><td>dhyper(k,D,N−D,n)</td><td>phyper(t,D,N−D,n)</td></tr>
            <tr><td>cuento eventos con tasa λ</td><td>Poisson</td><td>dpois(k,λ)</td><td>ppois(t,λ)</td></tr>
          </tbody></table></div>
          ${tip('Trampa de R en geométrica','la cátedra define X como número TOTAL de intentos, pero R usa cantidad de fracasos antes del primer éxito; por eso aparece k−1')}
          ${tip('Binomial negativa','el resumen la identifica como repeticiones hasta el r-ésimo éxito, pero el material aclara que no se ve este cuatrimestre')}
          ${tip('Poisson','λ NO es una probabilidad; puede ser mayor que 1 porque es una cantidad media de eventos')}
        </div></details>
        <details class="stats-im-part" open><summary>Ejemplo integrador del capítulo</summary><div class="stats-im-part-body">
          <div class="stats-im-example">
            <h4>Ejemplo · control de cultivos</h4>
            <p>Primero tomamos dos placas y definimos X = “cantidad de placas positivas”. Si cada placa puede ser + o −:</p>
            ${eq('R<sub>X</sub> = {0,1,2}','X no guarda cuál placa fue positiva; sólo guarda cuántas')}
            <div class="stats-im-step"><b>Variable como función.</b> Si ω=(+,−), entonces X(ω)=1. Si ω=(−,+), también X(ω)=1. (Dos resultados originales diferentes pueden caer en el mismo número.)</div>
            <div class="stats-im-step"><b>Puntual vs acumulada.</b> Si p<sub>X</sub>(0)=0,25, p<sub>X</sub>(1)=0,50 y p<sub>X</sub>(2)=0,25: ${eq('F<sub>X</sub>(1)=P(X≤1)=0,25+0,50=0,75','puntual pregunta “exactamente”; acumulada pregunta “hasta acá”')}</div>
            <p><strong>Ahora cambiamos sólo la historia del experimento:</strong></p>
            <div class="stats-im-step"><b>Binomial.</b> Analizo exactamente 10 placas independientes y cada una tiene p=0,20 de ser positiva. (n es fijo y cuento positivos.) ${eq('Y ~ Bi(10,0,20)','Y = cantidad de positivas entre las 10')}</div>
            <div class="stats-im-step"><b>Geométrica.</b> Sigo analizando placas hasta encontrar la primera positiva. (No fijo cuántas haré; paro cuando aparece el primer éxito.) ${eq('Z ~ G(0,20)','Z = número de intento del primer positivo')}</div>
            <div class="stats-im-step"><b>Hipergeométrica.</b> Tengo una caja cerrada de 20 placas, sé que 4 son positivas y extraigo 5 sin reposición. ${eq('W ~ H(4,16,5)','W = cantidad de positivas entre las 5; “sin reposición” es la alarma')}</div>
            <div class="stats-im-step"><b>Poisson.</b> En una cámara se observan en promedio 3 colonias por campo microscópico. ${eq('V ~ P(3)','V = cantidad de colonias en un campo; λ=3 es una media de conteo')}</div>
          </div>
        </div></details>
      </div>
    </details>

    <details class="stats-im-chapter" data-key="cap3">
      <summary><span><span class="stats-im-summary-title">3 · Variables aleatorias continuas, densidad, acumulada, percentiles y uniforme</span><span class="stats-im-summary-sub">(en continua la probabilidad ya no vive en puntos: vive en áreas)</span></span></summary>
      <div class="stats-im-body">
        <div class="stats-im-bigidea"><b>Idea central.</b> (Si X puede tomar infinitos valores intermedios, un valor exacto tiene probabilidad 0. La densidad reparte “qué tan concentrada” está la probabilidad y el área bajo la curva da la probabilidad real.)</div>
        <details class="stats-im-part" open><summary>Definiciones formales + fórmulas</summary><div class="stats-im-part-body">
          <div class="stats-im-grid">
            ${concept('Variable continua','P(X=x)=0','un punto aislado tiene ancho cero; no significa que el valor sea imposible','entender por qué preguntamos por intervalos y no por valores exactos')}
            ${concept('Histograma de densidad',`altura = ${frac('frecuencia relativa','longitud del intervalo')}`,'la barra se ajusta para que su ÁREA, no sólo su altura, represente frecuencia relativa','puente entre datos observados y una densidad continua')}
            ${concept('Densidad no negativa','f<sub>X</sub>(x) ≥ 0','la curva de densidad nunca baja de cero','condición para que f pueda ser una densidad')}
            ${concept('Área total',`∫<sub>−∞</sub><sup>∞</sup> f<sub>X</sub>(x) dx = 1`,'toda la probabilidad junta tiene que sumar un área de 1','condición para que f sea densidad')}
            ${concept('Probabilidad de un intervalo',`P(a&lt;X&lt;b) = ∫<sub>a</sub><sup>b</sup> f<sub>X</sub>(x) dx`,'la probabilidad es el área bajo la curva entre a y b','calcular probabilidades en variables continuas')}
            ${concept('Extremos abiertos/cerrados','P(a&lt;X≤b)=P(a≤X≤b)=P(a&lt;X&lt;b)','agregar o quitar puntos sueltos no cambia nada porque cada punto tiene probabilidad 0','no perder tiempo por &lt; versus ≤ en una continua')}
            ${concept('Acumulada continua',`F<sub>X</sub>(x)=P(X≤x)=∫<sub>−∞</sub><sup>x</sup> f<sub>X</sub>(t) dt`,'junto todo el área que quedó a la izquierda de x','preguntas “menor o igual que”, “hasta x”')}
            ${concept('Intervalo usando F','P(a&lt;X≤b)=F<sub>X</sub>(b)−F<sub>X</sub>(a)','a toda el área hasta b le saco toda el área hasta a y queda sólo el medio','calcular intervalos cuando ya tengo la acumulada')}
            ${concept('Propiedades de F','0≤F<sub>X</sub>(x)≤1; F no decrece; F→0 a la izquierda y F→1 a la derecha','al avanzar hacia la derecha sólo puedo acumular más probabilidad, nunca perderla','controlar si una acumulada tiene sentido')}
            ${concept('Percentil / cuantil','F<sub>X</sub>(q<sub>p</sub>) = p','ahora me dan la probabilidad acumulada p y tengo que encontrar el valor que la deja a su izquierda','buscar el punto que deja, por ejemplo, 90% de los casos debajo')}
            ${concept('Mediana','F<sub>X</sub>(q<sub>0,50</sub>) = 0,50','es el percentil 50: deja la mitad de la distribución a cada lado','ubicar el centro por acumulación')}
            ${concept('Uniforme continua',`X ~ U(a,b)<br>f<sub>X</sub>(x)=${frac('1','b−a')} para a≤x&lt;b; 0 fuera`,'dentro de [a,b] la densidad es plana: intervalos del mismo largo tienen la misma probabilidad','situaciones donde cualquier posición dentro del intervalo es igualmente probable')}
            ${concept('Acumulada uniforme',`F<sub>X</sub>(x)=0 si x&lt;a;<br>F<sub>X</sub>(x)=${frac('x−a','b−a')} si a≤x&lt;b;<br>F<sub>X</sub>(x)=1 si x≥b`,'antes de a no acumulé nada; dentro sube en línea recta; después de b ya acumulé todo','probabilidades y percentiles de una uniforme')}
            ${concept('Atajo uniforme',`P(c&lt;X&lt;d) = ${frac('longitud favorable','longitud total')}`,'como la densidad es constante, la probabilidad depende sólo de cuánto mide el pedazo pedido','intervalos completamente contenidos dentro de [a,b]')}
          </div>
          ${tip('Densidad ≠ probabilidad puntual','f<sub>X</sub>(x) puede ser mayor que 1; lo que debe quedar entre 0 y 1 es el ÁREA que representa una probabilidad')}
          ${tip('Percentil','es la acumulada “al revés”: en F(x) te dan x y buscás probabilidad; en un percentil te dan la probabilidad y buscás x')}
        </div></details>
        <details class="stats-im-part" open><summary>Ejemplo integrador del capítulo</summary><div class="stats-im-part-body">
          <div class="stats-im-example">
            <h4>Ejemplo · tiempo de incubación uniforme</h4>
            <p>Supongamos que el tiempo X puede caer uniformemente entre 2 y 10 minutos.</p>
            ${eq('X ~ U(2,10)','todos los subintervalos del mismo largo dentro de 2–10 tienen la misma probabilidad')}
            <div class="stats-im-step"><b>1 · Densidad.</b> El intervalo total mide 8, así que ${eq(`f<sub>X</sub>(x)=${frac('1','8')} para 2≤x&lt;10`,'la altura del rectángulo es 1/8 para que el área total sea 1')}</div>
            <div class="stats-im-step"><b>2 · Valor exacto.</b> ${eq('P(X=5)=0','5 puede ocurrir, pero un único punto no tiene área')}</div>
            <div class="stats-im-step"><b>3 · Intervalo.</b> Queremos esperar entre 4 y 7 minutos. El pedazo favorable mide 3. ${eq(`P(4≤X≤7)=${frac('7−4','10−2')}=${frac('3','8')}=0,375`,'probabilidad = longitud favorable / longitud total')}</div>
            <div class="stats-im-step"><b>4 · Acumulada.</b> Para 2≤x&lt;10: ${eq(`F<sub>X</sub>(x)=${frac('x−2','8')}`,'mido cuánto recorrido desde el extremo izquierdo y lo divido por el largo total')}</div>
            <div class="stats-im-step"><b>5 · Percentil 90.</b> Busco q<sub>0,90</sub> tal que F(q)=0,90. ${eq(`${frac('q−2','8')}=0,90 &nbsp; ⇒ &nbsp; q−2=7,2 &nbsp; ⇒ &nbsp; q=9,2`,'el 90% de los tiempos queda por debajo de 9,2 min')}</div>
            <div class="stats-im-step"><b>6 · Mediana.</b> ${eq(`${frac('q−2','8')}=0,50 &nbsp; ⇒ &nbsp; q=6`,'la mitad de la distribución queda por debajo de 6 min')}</div>
            <p class="stats-im-mini">(Acá aparecen juntos continua, densidad, área, acumulada, percentiles y uniforme. Si entendés este ejemplo, ya tenés el esqueleto del capítulo.)</p>
          </div>
        </div></details>
      </div>
    </details>

    <div class="stats-im-traps"><b>Brújula final:</b> (Si preguntan “exactamente” y X es discreta → p<sub>X</sub>. Si preguntan “hasta” → F<sub>X</sub>. Si X es continua → probabilidad = área. Si te dan un porcentaje acumulado y piden el valor → percentil. Antes de usar Binomial/Geométrica/Hipergeométrica/Poisson, reconocé la historia.)</div>
  `;

  const firstExistingMap=document.querySelector('#methods, #stats-guide-memory-maps, #ejercicios-estadistica');
  if(firstExistingMap?.parentNode) firstExistingMap.parentNode.insertBefore(root,firstExistingMap);
  else (document.querySelector('.qb-content, main, .qb-main, body')||document.body).append(root);

  const index=document.getElementById('summaryIndex');
  if(index && !index.querySelector(`a[href="#${ID}"]`)){
    const link=document.createElement('a');
    link.href=`#${ID}`;
    link.textContent='Mapa mental integral';
    link.dataset.statsIntegralMap='1';
    const firstLink=index.querySelector('a');
    if(firstLink) index.insertBefore(link,firstLink); else index.append(link);
  }

  const STORAGE='stats-integral-mental-map-open-v1';
  let state={};
  try{state=JSON.parse(localStorage.getItem(STORAGE)||'{}')||{}}catch{}
  root.querySelectorAll('details.stats-im-chapter[data-key]').forEach((d,i)=>{
    const key=d.dataset.key;
    if(Object.prototype.hasOwnProperty.call(state,key))d.open=!!state[key];
    else d.open=i===0;
    d.addEventListener('toggle',()=>{
      state[key]=d.open;
      try{localStorage.setItem(STORAGE,JSON.stringify(state))}catch{}
    });
  });

  document.documentElement.dataset.statsIntegralMentalMapReady='1';
})();