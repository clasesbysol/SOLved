(()=>{
  'use strict';
  const VERSION='1.0.0';
  const CHAPTER=`
<section class="qb-chapter qb-tp2-chapter" id="cap-tp2">
  <div class="qb-chapter-number">TP2</div>
  <h2>Trabajo Práctico Nº 2 · Puesta a punto y cinética enzimática</h2>
  <p class="highlightable" data-block-id="qb:tp2:scope">Este TP es un bloque práctico independiente. Su lógica tiene tres partes encadenadas: <strong>primero</strong> se eligen una cantidad de enzima y una ventana temporal que permitan medir velocidad inicial; <strong>después</strong> se determinan K<sub>M</sub> y V<sub>max</sub> variando un sustrato por vez; <strong>por último</strong> se estudia el efecto de la temperatura y se estima la energía de activación aparente. Cada parte usa las condiciones validadas en la anterior.</p>

  <h3>Parte 1 · Elegir cantidad de enzima y tiempo lineal</h3>
  <p class="highlightable" data-block-id="qb:tp2:p1-purpose"><strong>Objetivo:</strong> encontrar una condición donde el cambio de señal sea claramente medible, pero el sustrato no se consuma tan rápido que la curva se doble casi de inmediato. Se preparan ensayos con diferentes alícuotas de la misma preparación enzimática, manteniendo constantes sustrato, pH, temperatura, volumen final y composición del medio.</p>
  <div class="qb-tp-protocol">
    <span>1</span><p>Rotular un blanco y una serie con cantidades crecientes de enzima. Preparar todos los componentes menos el que inicia la reacción.</p>
    <span>2</span><p>Equilibrar los tubos a la temperatura de trabajo e iniciar todos de manera reproducible, por ejemplo agregando la enzima al final.</p>
    <span>3</span><p>Registrar producto formado o sustrato consumido en varios tiempos tempranos. No usar solamente el valor final.</p>
    <span>4</span><p>Graficar concentración o señal corregida frente al tiempo para cada cantidad de enzima y ajustar una recta sólo al tramo inicial.</p>
    <span>5</span><p>Comparar pendientes. Elegir una cantidad que dé varios puntos lineales, pendiente distinta del blanco y consumo pequeño del sustrato inicial.</p>
  </div>
  <div class="qb-equation"><math display="block"><mrow><msub><mi>v</mi><mn>0</mn></msub><mo>=</mo><mfrac><mrow><mi>Δ</mi><mo>[</mo><mi>P</mi><mo>]</mo></mrow><mrow><mi>Δ</mi><mi>t</mi></mrow></mfrac><mo>=</mo><mo>−</mo><mfrac><mrow><mi>Δ</mi><mo>[</mo><mi>S</mi><mo>]</mo></mrow><mrow><mi>Δ</mi><mi>t</mi></mrow></mfrac></mrow></math></div>
  <div class="qb-callout qb-callout-key"><b>Por qué el inicio es especial:</b> [S] todavía se parece a la inicial, [P] es casi cero, la reacción inversa y la inhibición por producto son pequeñas y la enzima tuvo menos tiempo para inactivarse. “Lineal” describe ese tramo de la curva concentración–tiempo; no significa que toda la reacción sea una recta.</div>
  <p class="highlightable" data-block-id="qb:tp2:p1-enzyme">Con sustrato en gran exceso, duplicar la enzima activa debería duplicar aproximadamente v<sub>0</sub>. Muy poca enzima produce una señal comparable con el ruido. Demasiada enzima agota sustrato, acorta el tramo recto y hace que las velocidades queden subestimadas. La cantidad elegida y la ventana temporal se mantienen luego constantes.</p>

  <h3>Parte 2 · Determinar K<sub>M</sub> y V<sub>max</sub></h3>
  <p class="highlightable" data-block-id="qb:tp2:p2-purpose"><strong>Objetivo:</strong> obtener una velocidad inicial independiente para cada concentración de sustrato y ajustar la relación entre v<sub>0</sub> y [S]. Deben incluirse concentraciones bajas, intermedias y suficientemente altas como para observar curvatura y aproximación a la meseta.</p>
  <div class="qb-tp-protocol">
    <span>1</span><p>Preparar una serie de [S] manteniendo idénticas la cantidad de enzima, el pH, la temperatura, el volumen y los demás componentes.</p>
    <span>2</span><p>Iniciar y medir cada tubo en la ventana lineal elegida en la parte 1. Corregir con el blanco correspondiente.</p>
    <span>3</span><p>Para cada tubo, obtener v<sub>0</sub> como pendiente inicial. Cada pendiente será un punto del gráfico v<sub>0</sub> frente a [S].</p>
    <span>4</span><p>Ajustar directamente la hipérbola de Michaelis–Menten. V<sub>max</sub> es la meseta estimada; K<sub>M</sub> es la [S] que produce V<sub>max</sub>/2.</p>
    <span>5</span><p>En una reacción bisustrato, variar A manteniendo B saturante y luego variar B manteniendo A saturante. Así se obtiene un par de parámetros aparentes para cada serie.</p>
  </div>
  <div class="qb-equation"><math display="block"><mrow><msub><mi>v</mi><mn>0</mn></msub><mo>=</mo><mfrac><mrow><msub><mi>V</mi><mi>max</mi></msub><mo>[</mo><mi>S</mi><mo>]</mo></mrow><mrow><msub><mi>K</mi><mi>M</mi></msub><mo>+</mo><mo>[</mo><mi>S</mi><mo>]</mo></mrow></mfrac></mrow></math></div>
  <div class="qb-callout"><b>Lectura simple:</b> a baja [S] quedan muchos sitios libres y agregar sustrato aumenta mucho la velocidad. A alta [S] casi todos los sitios están ocupados y agregar más sustrato cambia poco la velocidad. K<sub>M</sub> no es “la mitad de la concentración máxima”: es una concentración concreta de sustrato definida por la media velocidad.</div>
  <p class="highlightable" data-block-id="qb:tp2:p2-fit">Lineweaver–Burk, Hanes–Woolf y Eadie–Hofstee son transformaciones lineales útiles para reconocer relaciones, pero alteran la distribución del error. En particular, los recíprocos de Lineweaver–Burk exageran la influencia de los puntos a baja [S]. Para estimar parámetros, se prefiere la regresión no lineal sobre la hipérbola cuando está disponible.</p>
  <div class="qb-callout qb-callout-key"><b>Control de calidad:</b> una recta transformada prolija no compensa una serie mal diseñada. Si no hay puntos a ambos lados de K<sub>M</sub>, réplicas o aproximación a saturación, K<sub>M</sub> y V<sub>max</sub> quedarán poco determinados.</div>

  <h3>Parte 3 · Temperatura y energía de activación aparente</h3>
  <p class="highlightable" data-block-id="qb:tp2:p3-purpose"><strong>Objetivo:</strong> separar conceptualmente dos efectos que ocurren a la vez. Al aumentar la temperatura crece la fracción de choques capaces de alcanzar el estado de transición y la velocidad suele subir; a temperaturas mayores, la inactivación o desnaturalización puede dominar y hacerla caer.</p>
  <div class="qb-tp-protocol">
    <span>1</span><p>Seleccionar varias temperaturas y equilibrar realmente tubos y reactivos antes de iniciar.</p>
    <span>2</span><p>Mantener constantes pH, sustrato, enzima, volumen y ventana de medición. Iniciar y medir v<sub>0</sub> del mismo modo en toda la serie.</p>
    <span>3</span><p>Graficar v<sub>0</sub> frente a temperatura para reconocer la rama ascendente, el máximo aparente y la rama descendente.</p>
    <span>4</span><p>Para Arrhenius, convertir °C a kelvin, calcular 1/T y ln(v<sub>0</sub>) y usar sólo el intervalo donde todavía no domina la inactivación.</p>
    <span>5</span><p>Ajustar ln(v<sub>0</sub>) frente a 1/T. La pendiente es −E<sub>a</sub>/R; por lo tanto E<sub>a</sub> = −pendiente·R.</p>
  </div>
  <div class="qb-equation"><math display="block"><mrow><mi>T</mi><mo>(</mo><mi>K</mi><mo>)</mo><mo>=</mo><mi>T</mi><mo>(</mo><mi>°C</mi><mo>)</mo><mo>+</mo><mn>273.15</mn></mrow></math></div>
  <div class="qb-equation"><math display="block"><mrow><mi>ln</mi><mo>(</mo><msub><mi>v</mi><mn>0</mn></msub><mo>)</mo><mo>=</mo><mi>C</mi><mo>−</mo><mfrac><msub><mi>E</mi><mi>a</mi></msub><mi>R</mi></mfrac><mo>·</mo><mfrac><mn>1</mn><mi>T</mi></mfrac></mrow></math></div>
  <div class="qb-callout"><b>No incluir la rama descendente en Arrhenius:</b> allí la pérdida de enzima activa modifica la velocidad además de la energía cinética. El máximo observado es un óptimo bajo ese pH, tiempo y ensayo; no una propiedad universal e inmutable de la enzima.</div>

  <h3>Planilla mínima y revisión antes de entregar</h3>
  <div class="qb-tp-table-wrap"><table class="qb-tp-table">
    <thead><tr><th>Parte</th><th>Variable que cambia</th><th>Variables que se mantienen</th><th>Gráfico principal</th><th>Resultado</th></tr></thead>
    <tbody>
      <tr><td>1</td><td>Cantidad de enzima y tiempo observado</td><td>[S], pH, T, volumen</td><td>[P] o [S] frente a tiempo; v<sub>0</sub> frente a enzima</td><td>Enzima y ventana lineal elegidas</td></tr>
      <tr><td>2</td><td>[S]</td><td>Enzima, pH, T, volumen, ventana</td><td>v<sub>0</sub> frente a [S]</td><td>K<sub>M</sub> y V<sub>max</sub></td></tr>
      <tr><td>3</td><td>Temperatura</td><td>Enzima, [S], pH, volumen, ventana</td><td>v<sub>0</sub> frente a T; ln(v<sub>0</sub>) frente a 1/T</td><td>Óptimo aparente y E<sub>a</sub></td></tr>
    </tbody>
  </table></div>
  <div class="qb-callout qb-callout-key"><b>Errores que cambian el significado del resultado:</b> llamar velocidad a una lectura final, usar tramos curvos, comparar ensayos con tiempos distintos, extrapolar V<sub>max</sub> sin datos cercanos a saturación, usar °C dentro de 1/T, usar log<sub>10</sub> en lugar de ln o mezclar en Arrhenius puntos donde la enzima ya se inactiva.</div>
</section>`;

  const STYLE=`<style id="qb-tp2-extension-style">
    .qb-tp2-chapter{scroll-margin-top:24px}
  </style>`;

  function inject(){
    const root=document.querySelector('.qb-summary');
    if(!root)return false;
    if(document.getElementById('cap-tp2'))return true;
    const template=document.createElement('template');template.innerHTML=CHAPTER.trim();
    const next=document.getElementById('cap16')||document.getElementById('cap17')||root.querySelector('.qb-footer');
    (next?.parentNode||root).insertBefore(template.content,next||null);
    if(!document.getElementById('qb-tp2-extension-style'))document.head.insertAdjacentHTML('beforeend',STYLE);
    const nav=root.querySelector('.qb-toc');
    if(nav&&!nav.querySelector('a[href="#cap-tp2"]')){
      const link=document.createElement('a');link.href='#cap-tp2';link.textContent='TP2. Puesta a punto y cinética enzimática';
      const before=nav.querySelector('a[href="#cap16"],a[href="#cap17"]');nav.insertBefore(link,before||null);
    }
    return true;
  }
  function start(){
    if(inject())return;
    let attempts=0;const timer=setInterval(()=>{attempts++;if(inject()||attempts>=120)clearInterval(timer)},100);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
  window.SOLVED_QB_TP2={version:VERSION,inject};
})();
