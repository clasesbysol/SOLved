(()=>{
  'use strict';
  const VERSION='2.0.0';
  const ID='qbi-guide-memory-maps';
  const STORAGE='qbi-guide-memory-maps-open-v1';

  const css=`
  #${ID}{margin:20px 0 28px;padding:0;border:0;background:transparent}
  #${ID} .qbi-memory-heading{margin:0 0 12px;padding:14px 16px;border:1px solid rgba(231,72,136,.22);border-radius:18px;background:linear-gradient(135deg,rgba(231,72,136,.10),rgba(255,255,255,.72));box-shadow:0 8px 24px rgba(104,42,75,.07)}
  #${ID} .qbi-memory-heading strong{display:block;font-size:1.05rem;color:#9d285b}
  #${ID} .qbi-memory-heading span{display:block;margin-top:4px;font-size:.92rem;line-height:1.45;color:inherit;opacity:.82}
  #${ID} details.qbi-memory-guide{margin:12px 0;border:1px solid rgba(231,72,136,.24);border-radius:18px;background:rgba(255,255,255,.82);overflow:hidden;box-shadow:0 8px 28px rgba(104,42,75,.06)}
  #${ID} details.qbi-memory-guide>summary{cursor:pointer;list-style:none;padding:16px 18px;font-weight:800;color:#8d2452;background:rgba(231,72,136,.075);display:flex;align-items:center;gap:10px}
  #${ID} details.qbi-memory-guide>summary::-webkit-details-marker{display:none}
  #${ID} details.qbi-memory-guide>summary::before{content:'▸';display:inline-block;transition:transform .16s ease}
  #${ID} details.qbi-memory-guide[open]>summary::before{transform:rotate(90deg)}
  #${ID} .qbi-memory-body{padding:18px}
  #${ID} .qbi-memory-core{margin:0 auto 16px;max-width:760px;padding:15px 17px;border:2px solid rgba(231,72,136,.32);border-radius:18px;background:rgba(231,72,136,.08);text-align:center}
  #${ID} .qbi-memory-core b{display:block;font-size:1.06rem;color:#8d2452;margin-bottom:5px}
  #${ID} .qbi-memory-chain{display:flex;flex-wrap:wrap;align-items:stretch;justify-content:center;gap:8px;margin:14px 0 18px}
  #${ID} .qbi-memory-chain span{padding:8px 10px;border-radius:999px;background:rgba(231,72,136,.09);border:1px solid rgba(231,72,136,.20);font-size:.9rem;font-weight:700;text-align:center}
  #${ID} .qbi-memory-chain i{font-style:normal;display:grid;place-items:center;opacity:.55}
  #${ID} .qbi-memory-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px}
  #${ID} .qbi-memory-branch{padding:14px 15px;border:1px solid rgba(113,78,99,.16);border-radius:15px;background:rgba(255,255,255,.72)}
  #${ID} .qbi-memory-branch h4{margin:0 0 9px;color:#8d2452;font-size:.98rem}
  #${ID} .qbi-memory-branch ul,#${ID} .qbi-memory-branch ol{margin:0;padding-left:19px}
  #${ID} .qbi-memory-branch li{margin:6px 0;line-height:1.45}
  #${ID} .qbi-memory-rule{margin-top:12px;padding:11px 13px;border-left:4px solid rgba(231,72,136,.58);border-radius:10px;background:rgba(231,72,136,.07);line-height:1.45}
  #${ID} .qbi-memory-traps{margin-top:14px;padding:13px 15px;border:1px dashed rgba(231,72,136,.42);border-radius:14px;background:rgba(255,248,252,.8)}
  #${ID} .qbi-memory-traps b{color:#8d2452}
  #${ID} table{width:100%;border-collapse:collapse;margin:9px 0 0;font-size:.92rem}
  #${ID} th,#${ID} td{padding:8px 9px;border-bottom:1px solid rgba(113,78,99,.14);text-align:left;vertical-align:top}
  #${ID} th{color:#8d2452;background:rgba(231,72,136,.06)}
  #${ID} .qbi-memory-figure{margin:14px 0;padding:12px;border:1px solid rgba(113,78,99,.16);border-radius:14px;background:#fff;overflow-x:auto}
  #${ID} .qbi-memory-figure svg{display:block;width:100%;min-width:430px;height:auto}
  #${ID} .qbi-memory-figure figcaption{margin-top:9px;font-size:.88rem;line-height:1.45;opacity:.8}
  #${ID} .qbi-axis{stroke:currentColor;stroke-width:1.5}.qbi-curve{fill:none;stroke:#e74888;stroke-width:4;stroke-linecap:round}.qbi-curve-2{fill:none;stroke:#7857c5;stroke-width:3;stroke-linecap:round}.qbi-guide-line{stroke:currentColor;stroke-width:1;stroke-dasharray:5 5;opacity:.45}.qbi-svg-text{font:13px Inter,Arial,sans-serif;fill:currentColor}.qbi-svg-note{font:12px Inter,Arial,sans-serif;fill:#8d2452;font-weight:700}
  #${ID} .qbi-mnemonic{display:grid;gap:10px;margin-top:10px}
  #${ID} .qbi-mnemonic>div{padding:11px 13px;border-radius:13px;border:1px solid rgba(231,72,136,.18);background:rgba(231,72,136,.055)}
  #${ID} .qbi-mnemonic strong{display:block;color:#8d2452;margin-bottom:4px}
  @media(max-width:650px){#${ID} .qbi-memory-body{padding:13px}#${ID} .qbi-memory-grid{grid-template-columns:1fr}#${ID} .qbi-memory-chain i{display:none}}
  `;

  const guide1=String.raw`
  <details class="qbi-memory-guide" data-memory-key="guia-1">
    <summary>Guía 1 · Mapa para memorizar — aminoácidos, ácido–base, péptidos y electroforesis</summary>
    <div class="qbi-memory-body">
      <div class="qbi-memory-core">
        <b>Idea central</b>
        La estructura química determina qué grupos pueden ionizarse; los pKa determinan qué forma predomina; esa forma determina la carga neta, y la carga neta determina comportamiento, solubilidad y migración electroforética.
      </div>
      <div class="qbi-memory-chain">
        <span>Estructura</span><i>→</i><span>grupos ionizables</span><i>→</i><span>pKa</span><i>→</i><span>especiación</span><i>→</i><span>carga neta</span><i>→</i><span>pI / migración</span>
      </div>
      <div class="qbi-memory-grid">
        <section class="qbi-memory-branch">
          <h4>1. El aminoácido como punto de partida</h4>
          <ul>
            <li>Los aminoácidos proteicos son, casi siempre, <strong>α-aminoácidos</strong>: amino, carboxilo, H y R sobre el mismo carbono α.</li>
            <li>La cadena lateral <strong>R</strong> explica polaridad, carga, tamaño, reactividad, hidrofobicidad y ubicación probable en una proteína.</li>
            <li>Salvo Gly, el carbono α es quiral; en proteínas ribosomales predominan los <strong>L-aminoácidos</strong>. L/D no indica el signo de rotación óptica.</li>
            <li>Gly es pequeña y flexible; Pro restringe la rotación; Cys puede formar disulfuros; Tyr/Trp explican buena parte de la absorbancia a 280 nm.</li>
          </ul>
        </section>
        <section class="qbi-memory-branch">
          <h4>2. Clasificación que conviene recordar por comportamiento</h4>
          <ul>
            <li><strong>No polares:</strong> tienden a esconderse del agua en proteínas solubles.</li>
            <li><strong>Aromáticos:</strong> Phe, Tyr, Trp; anillos π, interacción hidrofóbica y absorción UV.</li>
            <li><strong>Polares sin carga:</strong> forman puentes de H; Ser, Thr, Cys, Asn, Gln.</li>
            <li><strong>Ácidos:</strong> Asp y Glu → carboxilatos laterales, típicamente negativos cerca de pH fisiológico.</li>
            <li><strong>Básicos:</strong> Lys, Arg, His → grupos capaces de protonarse; His es especialmente sensible alrededor de pH fisiológico.</li>
          </ul>
        </section>
        <section class="qbi-memory-branch">
          <h4>2 bis. Tus reglas mnemotécnicas</h4>
          <div class="qbi-mnemonic">
            <div><strong>🚫🧲 + 🫃 “Pero metele lengua, Ala Val”</strong><b>P</b>ro, <b>Met</b>, <b>Ile</b>, <b>Leu</b>, <b>Gly</b>, <b>Ala</b>, <b>Val</b> → apolares alifáticos. El símbolo recuerda “no polar” y el gordito ayuda a imaginar cadenas que se juntan lejos del agua.</div>
            <div><strong>🤏⌬ “Pe-Ti-Tri”</strong><b>Phe</b> (fenilalanina), <b>Tyr</b> (tirosina), <b>Trp</b> (triptófano) → aromáticos. Los tres poseen anillo aromático; Tyr y Trp también pueden aportar polaridad.</div>
            <div><strong>🇦🇷 “Los argentinos tienen historia”</strong><b>Arg</b>inina, <b>Lys</b>ina, <b>His</b>tidina → básicos, con carga positiva predominante o capacidad de protonarse. Tu frase sirve por Arg–Lys–His; los nombres correctos son lisina, arginina e histidina.</div>
            <div><strong>😐 0️⃣ “Cexis, Ases, Glu/Gln, todo serio”</strong><b>Ser</b>, <b>Thr</b>, <b>Cys</b>, <b>Asn</b>, <b>Gln</b> → polares sin carga neta lateral a pH fisiológico. La cara neutra recuerda <b>carga 0</b>. Ojo: acá es <b>Gln</b> (glutamina), no Glu.</div>
            <div><strong>😢🤢 “Glu–Asp”</strong><b>Glu</b>tamato y <b>Asp</b>artato → ácidos, negativos cerca de pH fisiológico. El ruido de vómito fija el par.</div>
          </div>
        </section>
        <section class="qbi-memory-branch">
          <h4>3. Algoritmo de especiación: no memorizar dibujos aislados</h4>
          <ol>
            <li>Listar todos los grupos ionizables y ordenar sus pKa de menor a mayor.</li>
            <li>Empezar a pH muy bajo: <strong>todo lo protonable está protonado</strong>.</li>
            <li>Cada vez que el pH atraviesa un pKa, se pierde un H⁺ del grupo correspondiente.</li>
            <li>Después de cada desprotonación, recalcular la carga neta.</li>
            <li>La especie dominante en cada intervalo es la que queda entre dos pKa consecutivos.</li>
          </ol>
          <div class="qbi-memory-rule">Regla útil: si <strong>pH &lt; pKa</strong>, el grupo tiende a estar protonado; si <strong>pH &gt; pKa</strong>, tiende a estar desprotonado.</div>
        </section>
        <section class="qbi-memory-branch">
          <h4>4. pI: se obtiene mirando la especie neutra</h4>
          <ul>
            <li>El pI es el pH donde la <strong>carga neta promedio es cero</strong>.</li>
            <li>No se promedian “siempre los dos primeros pKa”. Se promedian los <strong>dos pKa que flanquean la especie con Q = 0</strong>.</li>
            <li>Para aminoácidos sin R ionizable suele quedar entre pKa del COOH α y pKa del NH₃⁺ α.</li>
            <li>Para Asp/Glu, la especie neutra queda entre los dos pKa ácidos; para Lys/Arg, entre los dos pKa más altos.</li>
          </ul>
          <div class="qbi-memory-rule">\(pI=\frac{pK_{a,\,antes\ de\ Q=0}+pK_{a,\,después\ de\ Q=0}}{2}\)</div>
        </section>
        <section class="qbi-memory-branch">
          <h4>5. pH vs pI: la regla que conecta todo</h4>
          <table><thead><tr><th>Condición</th><th>Carga promedio</th><th>Electroforesis</th></tr></thead><tbody>
            <tr><td>pH &lt; pI</td><td>positiva</td><td>migración hacia el <strong>cátodo (−)</strong></td></tr>
            <tr><td>pH = pI</td><td>0</td><td>movilidad mínima; queda cerca del origen</td></tr>
            <tr><td>pH &gt; pI</td><td>negativa</td><td>migración hacia el <strong>ánodo (+)</strong></td></tr>
          </tbody></table>
          <div class="qbi-memory-rule">Cerca del pI también disminuye la repulsión electrostática entre moléculas; por eso muchas proteínas/aminoácidos muestran solubilidad mínima y mayor tendencia a precipitar.</div>
        </section>
        <section class="qbi-memory-branch">
          <h4>6. Zwitterión ≠ molécula sin cargas</h4>
          <ul>
            <li>Un zwitterión tiene simultáneamente cargas positivas y negativas.</li>
            <li>Puede tener <strong>carga neta cero</strong> sin estar “descargado”.</li>
            <li>En el pI la forma de carga neta cero es máxima, pero siguen existiendo equilibrios con especies vecinas.</li>
            <li>En una corrida se observa movilidad promedio porque las microespecies ácido–base se interconvierten rápidamente.</li>
          </ul>
        </section>
        <section class="qbi-memory-branch">
          <h4>7. Cuando se forma un péptido cambia quién puede titular</h4>
          <ul>
            <li>El enlace peptídico consume el COOH α de un residuo y el NH₂/NH₃⁺ α del siguiente.</li>
            <li>En un péptido quedan como grupos principales: <strong>N-terminal, C-terminal y cadenas laterales ionizables</strong>.</li>
            <li>Los pKa cambian con el entorno: cargas cercanas estabilizan o desestabilizan formas protonadas/desprotonadas.</li>
            <li>Al alargar un oligopéptido se separan los extremos y disminuye su influencia electrostática mutua.</li>
          </ul>
        </section>
        <section class="qbi-memory-branch">
          <h4>8. Electroforesis: primero preguntar “¿qué propiedad manda?”</h4>
          <table><thead><tr><th>Técnica</th><th>Qué determina la separación</th><th>Qué información conserva</th></tr></thead><tbody>
            <tr><td>PAGE nativo</td><td>carga + tamaño + forma</td><td>estructura nativa/oligomérica en buena medida</td></tr>
            <tr><td>SDS-PAGE</td><td>principalmente tamaño</td><td>SDS desnaturaliza y uniformiza carga negativa; disulfuros permanecen</td></tr>
            <tr><td>SDS + β-mercaptoetanol</td><td>tamaño de cada cadena</td><td>además rompe puentes disulfuro</td></tr>
          </tbody></table>
          <div class="qbi-memory-rule">Urea desnaturaliza, pero <strong>no uniformiza la relación carga/masa</strong> como SDS; por eso urea sola no convierte PAGE en una medición simple de PM.</div>
        </section>
        <section class="qbi-memory-branch">
          <h4>9. Cómo leer una SDS-PAGE</h4>
          <ul>
            <li>Las proteínas migran hacia el ánodo porque el SDS les aporta carga negativa.</li>
            <li>Las cadenas pequeñas atraviesan con mayor facilidad la malla del gel y migran más.</li>
            <li>\(R_f=\frac{\text{distancia recorrida por la proteína}}{\text{distancia recorrida por el frente}}\).</li>
            <li>Comparar nativo, SDS y SDS reductora permite inferir subunidades y si están unidas por interacciones no covalentes o disulfuros.</li>
          </ul>
        </section>
      </div>
      <div class="qbi-memory-traps"><b>Errores que esta guía busca evitar:</b> confundir pKa con pI; creer que pH bajo da carga negativa; olvidar el signo de ánodo/cátodo; calcular pI promediando pKa equivocados; considerar al zwitterión “sin cargas”; asumir que SDS rompe disulfuros; asumir que urea permite medir PM igual que SDS.</div>
    </div>
  </details>`;

  const guide3=String.raw`
  <details class="qbi-memory-guide" data-memory-key="guia-3">
    <summary>Guía 3 · Mapa para memorizar — electroforesis, detección y TP1</summary>
    <div class="qbi-memory-body">
      <div class="qbi-memory-core"><b>Idea central</b>Un campo eléctrico mueve especies cargadas. El gel agrega fricción y funciona como tamiz. La técnica elegida decide si la separación conserva carga, forma y complejos o si muestra principalmente masa molecular.</div>
      <div class="qbi-memory-chain"><span>carga</span><i>+</i><span>campo eléctrico</span><i>+</i><span>fricción del soporte</span><i>→</i><span>movilidad</span><i>→</i><span>bandas</span></div>
      <div class="qbi-memory-grid">
        <section class="qbi-memory-branch"><h4>1. Ánodo, cátodo y dirección</h4><ul><li><b>Ánodo = positivo (+)</b>; atrae aniones.</li><li><b>Cátodo = negativo (−)</b>; atrae cationes.</li><li>Si \(pH&gt;pI\), la proteína es negativa y va al ánodo.</li><li>Si \(pH&lt;pI\), es positiva y va al cátodo.</li><li>La fricción hidrodinámica es la resistencia del medio: aumenta con tamaño y forma menos compacta.</li></ul><div class="qbi-memory-rule">Más voltaje acelera la migración, pero genera más calor: difusión, “sonrisas”, bandas deformadas y pérdida de resolución.</div></section>
        <section class="qbi-memory-branch"><h4>2. Qué es cada material</h4><ul><li><b>Agarosa:</b> polisacárido de poros grandes; usual para ADN/ARN, gel horizontal.</li><li><b>Acrilamida:</b> monómero que forma poliacrilamida, con poros pequeños y regulables; usual para proteínas, gel vertical.</li><li><b>Bisacrilamida:</b> enlaza cadenas y arma la red tridimensional.</li><li><b>APS:</b> inicia la formación de radicales.</li><li><b>TEMED:</b> acelera la generación de radicales y la polimerización.</li></ul></section>
        <section class="qbi-memory-branch"><h4>3. Horizontal, vertical y exceso de muestra</h4><ul><li>Agarosa: típicamente horizontal y sumergida en buffer.</li><li>PAGE nativa y SDS-PAGE: típicamente vertical entre placas.</li><li>Más concentración de acrilamida → poros menores → mejor para proteínas pequeñas.</li><li>Demasiada muestra no crea más especies reales: satura la tinción y el volumen del carril, aumenta difusión/interacciones y produce bandas anchas, colas o bandas superpuestas.</li></ul></section>
        <section class="qbi-memory-branch"><h4>4. Nativa, SDS y reductora</h4><table><thead><tr><th>Técnica</th><th>Qué conserva</th><th>Qué separa</th></tr></thead><tbody><tr><td>PAGE nativa</td><td>Forma, carga, complejos</td><td>Carga + forma + tamaño</td></tr><tr><td>SDS-PAGE</td><td>Disulfuros</td><td>Principalmente masa de cadenas unidas por S–S</td></tr><tr><td>SDS + BME/DTT</td><td>No conserva S–S</td><td>Masa de cada cadena individual</td></tr></tbody></table><div class="qbi-memory-rule">SDS desnaturaliza y aporta carga negativa; <b>no reduce</b> disulfuros. Eso lo hace β-mercaptoetanol o DTT.</div></section>
        <section class="qbi-memory-branch"><h4>5. Agarosa, capilar, IEF y 2D</h4><ul><li><b>Agarosa:</b> ADN/ARN; los fragmentos pequeños atraviesan mejor la malla y migran más rápido/lejos.</li><li><b>Capilar:</b> separación muy eficiente dentro de un capilar bajo alto campo.</li><li><b>Isoelectroenfoque:</b> cada proteína migra por un gradiente de pH hasta \(pH=pI\), donde su carga neta promedio es cero.</li><li><b>2D-PAGE:</b> primera dimensión por pI; segunda, perpendicular, por masa en SDS-PAGE. Separa proteínas de masa parecida pero pI distinto y viceversa. No es cromatografía.</li></ul></section>
        <section class="qbi-memory-branch"><h4>6. Cómo ver e identificar</h4><ul><li><b>Coomassie:</b> simple, económico, sensibilidad intermedia.</li><li><b>Plata:</b> muy sensible, más laboriosa y menos lineal.</li><li><b>Fluorescencia:</b> amplia sensibilidad y rango dinámico.</li><li><b>Western/inmunoblot:</b> transfiere y detecta una proteína con anticuerpos; aporta identidad inmunológica.</li><li><b>Espectrometría de masas:</b> identifica por masas de péptidos/fragmentos.</li></ul><div class="qbi-memory-rule">Una sola banda visible sugiere alta pureza, pero no demuestra pureza absoluta: puede haber contaminantes co-migrantes o debajo del límite de detección.</div></section>
        <section class="qbi-memory-branch"><h4>7. TP1: Biuret, Lowry y Bradford</h4><table><thead><tr><th>Método</th><th>Señal principal</th><th>Idea práctica</th></tr></thead><tbody><tr><td>Biuret</td><td>Complejo Cu²⁺–enlaces peptídicos</td><td>Robusto, menos sensible; útil a concentraciones relativamente altas.</td></tr><tr><td>Lowry</td><td>Biuret + reducción de Folin por residuos aromáticos</td><td>Más sensible, pero más pasos e interferencias.</td></tr><tr><td>Bradford</td><td>Coomassie se estabiliza al unirse, sobre todo a residuos básicos/aromáticos</td><td>Rápido y sensible; respuesta depende más del tipo de proteína.</td></tr></tbody></table><p>Siempre se construye una curva con estándar, se interpola la absorbancia de la muestra dentro del rango lineal y se corrige por dilución.</p></section>
      </div>
    </div>
  </details>`;

  const guide4=String.raw`
  <details class="qbi-memory-guide" data-memory-key="guia-4">
    <summary>Guía 4 · Mapa para memorizar — catálisis, Michaelis–Menten, linealizaciones y TP2</summary>
    <div class="qbi-memory-body">
      <div class="qbi-memory-core"><b>Idea central</b>Una enzima acelera la llegada al equilibrio al disminuir la barrera de activación. No cambia el \(\Delta G\) global ni la posición del equilibrio. Michaelis–Menten conecta cuánto sustrato hay, cuánto complejo ES se forma y qué velocidad inicial observamos.</div>
      <div class="qbi-memory-grid">
        <section class="qbi-memory-branch"><h4>1. Energía y velocidad: no confundir dos ΔG</h4><div class="qbi-memory-rule">\(\Delta G_{reacción}=G_P-G_S\)</div><div class="qbi-memory-rule">\(\Delta G^{\ddagger}=G_{estado\ de\ transición}-G_S\)</div><p>La enzima reduce \(\Delta G^{\ddagger}\), no \(\Delta G_{reacción}\). Si la barrera catalizada fuera igual a la no catalizada, no habría aceleración.</p><div class="qbi-memory-rule">\(k=Ae^{-\Delta G^{\ddagger}/RT}\)</div><p>Una barrera menor vuelve menos negativo el exponente y aumenta \(k\). Los choques deben tener energía y orientación adecuadas. El sitio activo aporta residuos de fijación, catalíticos y estructurales.</p></section>
        <section class="qbi-memory-branch"><h4>2. Llave–cerradura y ajuste inducido</h4><ul><li>Una enzima perfectamente complementaria al sustrato estable lo estabilizaría demasiado.</li><li>La mejor complementariedad es con el <b>estado de transición</b>.</li><li>En ajuste inducido (Koshland), el contacto inicial promueve cambios de conformación que alinean grupos, deforman el sustrato y estabilizan el estado de transición.</li></ul></section>
        <section class="qbi-memory-branch"><h4>3. Los tres momentos de una reacción</h4><ul><li><b>Transitorio inicial:</b> ES todavía se está acumulando; cambia rápido.</li><li><b>Estado estacionario:</b> ES se forma y desaparece a igual velocidad; su concentración queda aproximadamente constante. No significa que la reacción se detenga.</li><li><b>Etapa tardía:</b> baja S, aumenta P y dejan de cumplirse las condiciones de velocidad inicial.</li></ul></section>
        <section class="qbi-memory-branch"><h4>4. Mecanismo y balance de ES</h4><div class="qbi-memory-rule">\(E+S\underset{k_{-1}}{\overset{k_1}{\rightleftharpoons}}ES\overset{k_2}{\rightarrow}E+P\)</div><div class="qbi-memory-rule">\(v_{formación\ de\ ES}=k_1[E][S]\)</div><div class="qbi-memory-rule">\(v_{desaparición\ de\ ES}=(k_{-1}+k_2)[ES]\)</div><p>ES desaparece por dos salidas paralelas: volver a E+S o avanzar a E+P; por eso se suman. En estado estacionario se igualan.</p><div class="qbi-memory-rule">\(k_1[E][S]=(k_{-1}+k_2)[ES]\)</div></section>
        <section class="qbi-memory-branch"><h4>5. De dónde salen KM y Michaelis–Menten</h4><div class="qbi-memory-rule">\(K_M=\frac{k_{-1}+k_2}{k_1}\)</div><div class="qbi-memory-rule">\([E]_T=[E]+[ES]\)</div><div class="qbi-memory-rule">\([ES]=\frac{[E]_T[S]}{K_M+[S]}\)</div><div class="qbi-memory-rule">\(v_0=k_2[ES]\)</div><div class="qbi-memory-rule">\(V_{max}=k_2[E]_T\)</div><div class="qbi-memory-rule">\(v_0=\frac{V_{max}[S]}{K_M+[S]}\)</div><p>\(K_M\) reúne las constantes que forman y vacían ES. Solo bajo condiciones especiales equivale directamente a una constante de disociación.</p></section>
        <section class="qbi-memory-branch"><h4>6. Cómo leer la hipérbola</h4><figure class="qbi-memory-figure"><svg viewBox="0 0 620 300" role="img" aria-label="Curva de Michaelis-Menten explicada"><line x1="65" y1="245" x2="580" y2="245" class="qbi-axis"/><line x1="65" y1="245" x2="65" y2="35" class="qbi-axis"/><path d="M65 245 C120 145 190 92 300 70 C410 50 500 46 570 44" class="qbi-curve"/><line x1="65" y1="44" x2="570" y2="44" class="qbi-guide-line"/><line x1="65" y1="145" x2="188" y2="145" class="qbi-guide-line"/><line x1="188" y1="145" x2="188" y2="245" class="qbi-guide-line"/><text x="268" y="286" class="qbi-svg-text">[S]</text><text x="18" y="130" class="qbi-svg-text">v₀</text><text x="75" y="35" class="qbi-svg-note">Vmax: meseta</text><text x="194" y="164" class="qbi-svg-note">[S]=KM → v₀=Vmax/2</text><text x="90" y="225" class="qbi-svg-note">poca S: casi lineal</text><text x="410" y="83" class="qbi-svg-note">saturación</text></svg><figcaption>Al inicio, la mayoría de la enzima está libre y agregar S aumenta mucho ES. En la meseta, casi toda la enzima está ocupada: agregar más S ya casi no aumenta la velocidad.</figcaption></figure></section>
        <section class="qbi-memory-branch"><h4>7. kcat: velocidad de cada enzima saturada</h4><div class="qbi-memory-rule">\(k_{cat}=\frac{V_{max}}{[E]_T}\)</div><p>Del gráfico se estima \(V_{max}\) en la meseta; con la concentración total de enzima se calcula \(k_{cat}\). Su unidad es \(s^{-1}\): cantidad de moléculas de sustrato convertidas por sitio activo y por segundo cuando la enzima está saturada.</p></section>
        <section class="qbi-memory-branch"><h4>8. Concentraciones durante el tiempo</h4><figure class="qbi-memory-figure"><svg viewBox="0 0 620 320" role="img" aria-label="Sustrato, producto, enzima libre y complejo ES en función del tiempo"><line x1="60" y1="270" x2="580" y2="270" class="qbi-axis"/><line x1="60" y1="270" x2="60" y2="35" class="qbi-axis"/><path d="M65 55 C170 70 315 125 565 250" class="qbi-curve-2"/><path d="M65 265 C190 255 330 190 565 70" class="qbi-curve"/><path d="M65 255 C85 130 110 125 500 130 C535 130 555 170 570 235" class="qbi-curve"/><path d="M65 80 C85 205 110 210 500 205 C535 205 555 165 570 100" class="qbi-curve-2"/><text x="275" y="305" class="qbi-svg-text">tiempo</text><text x="8" y="155" class="qbi-svg-text">concentración</text><text x="510" y="249" class="qbi-svg-note">S</text><text x="540" y="69" class="qbi-svg-note">P</text><text x="275" y="120" class="qbi-svg-note">ES ≈ constante</text><text x="275" y="224" class="qbi-svg-note">E libre ≈ constante</text></svg><figcaption>Tras un transitorio muy corto, ES alcanza una meseta aproximada: esa es la zona estacionaria usada para medir \(v_0\). Mucho después, al agotarse S, ES cae y E libre vuelve a subir.</figcaption></figure></section>
        <section class="qbi-memory-branch"><h4>9. Las tres linealizaciones son regresiones lineales</h4><table><thead><tr><th>Método</th><th>y vs x</th><th>Pendiente</th><th>Ordenada</th></tr></thead><tbody><tr><td>Lineweaver–Burk</td><td>\(1/v_0\) vs \(1/[S]\)</td><td>\(K_M/V_{max}\)</td><td>\(1/V_{max}\)</td></tr><tr><td>Hanes–Woolf</td><td>\([S]/v_0\) vs \([S]\)</td><td>\(1/V_{max}\)</td><td>\(K_M/V_{max}\)</td></tr><tr><td>Eadie–Hofstee</td><td>\(v_0\) vs \(v_0/[S]\)</td><td>\(-K_M\)</td><td>\(V_{max}\)</td></tr></tbody></table><div class="qbi-memory-rule">\(\frac1{v_0}=\frac{K_M}{V_{max}}\frac1{[S]}+\frac1{V_{max}}\)</div><div class="qbi-memory-rule">\(\frac{[S]}{v_0}=\frac1{V_{max}}[S]+\frac{K_M}{V_{max}}\)</div><div class="qbi-memory-rule">\(v_0=-K_M\frac{v_0}{[S]}+V_{max}\)</div><p>Son transformaciones algebraicas de la misma hipérbola y luego se ajusta una recta. Hoy suele preferirse regresión no lineal directa porque los recíprocos distorsionan los errores, sobre todo a baja [S].</p></section>
        <section class="qbi-memory-branch"><h4>10. Reacciones bisustrato</h4><ul><li><b>Secuencial:</b> ambos sustratos están unidos antes de liberar el primer producto; puede ser ordenado o al azar.</li><li><b>Ping-pong:</b> entra A, sale P y queda E modificada; recién entonces entra B y sale Q.</li><li>Al variar A con varios B fijos, Lineweaver–Burk da rectas que <b>se intersectan</b> en secuencial porque ambos sustratos comparten un complejo ternario.</li><li>En ping-pong da rectas <b>paralelas</b> porque no hay complejo EAB; cambia la ordenada manteniendo una relación de pendientes constante.</li><li>El patrón solo no distingue secuencial ordenado de al azar; hacen falta inhibición por productos, dead-end u otra evidencia.</li></ul></section>
        <section class="qbi-memory-branch"><h4>11. Ayudantes de la enzima</h4><ul><li><b>Cofactor:</b> componente no proteico necesario; puede ser ion metálico o molécula orgánica.</li><li><b>Coenzima:</b> cofactor orgánico que transporta grupos/electrones, a menudo unido transitoriamente.</li><li><b>Grupo prostético:</b> cofactor firmemente unido durante el ciclo.</li><li><b>Activador:</b> sustancia que aumenta la actividad; no necesariamente forma parte estable de la enzima.</li></ul></section>
        <section class="qbi-memory-branch"><h4>12. TP2: qué busca cada parte</h4><ol><li><b>Cantidad de enzima:</b> elegir una señal medible y proporcional a enzima; demasiada agota S o sale del rango.</li><li><b>Tiempo lineal:</b> usar el tramo inicial donde \(\Delta P/\Delta t\) es constante y todavía casi no cambió S.</li><li><b>KM y Vmax:</b> medir \(v_0\) a varias [S], ajustar Michaelis–Menten y repetir para cada sustrato manteniendo el otro saturante.</li><li><b>Temperatura/Ea:</b> medir velocidades en la rama donde no domina la desnaturalización y usar Arrhenius.</li></ol></section>
      </div>
    </div>
  </details>`;

  const guide5=String.raw`
  <details class="qbi-memory-guide" data-memory-key="guia-5">
    <summary>Guía 5 · Mapa para memorizar — inhibición, pH, temperatura y regulación</summary>
    <div class="qbi-memory-body">
      <div class="qbi-memory-core"><b>Idea central</b>Un inhibidor reversible redistribuye E, ES, EI y ESI; por eso cambia el \(K_M\) aparente, el \(V_{max}\) aparente o ambos. Las formas de los gráficos salen de preguntar a qué especie puede unirse I y si mucho sustrato puede vencerlo.</div>
      <div class="qbi-memory-grid">
        <section class="qbi-memory-branch"><h4>1. Reversible e irreversible</h4><ul><li><b>Reversible:</b> unión en equilibrio; al retirar I puede recuperarse la actividad.</li><li><b>Irreversible:</b> inactivación persistente, muchas veces covalente.</li><li><b>Suicida:</b> la propia enzima transforma al inhibidor en la especie reactiva que la inactiva.</li><li><b>Análogo del estado de transición:</b> imita la geometría/cargas del estado de transición y se une con enorme afinidad; no todo análogo es necesariamente covalente.</li></ul></section>
        <section class="qbi-memory-branch"><h4>2. Qué significan α y α′</h4><div class="qbi-memory-rule">\(\alpha=1+\frac{[I]}{K_i}\)</div><div class="qbi-memory-rule">\(\alpha'=1+\frac{[I]}{K'_i}\)</div><p>\(\alpha\) cuantifica cuánto pesa la unión de I a E; \(\alpha'\), la unión a ES. Más I o menor \(K_i\) produce un factor mayor. La ecuación general es:</p><div class="qbi-memory-rule">\(v_0=\frac{V_{max}[S]}{\alpha K_M+\alpha'[S]}\)</div></section>
        <section class="qbi-memory-branch"><h4>3. Tabla que organiza toda la inhibición reversible</h4><table><thead><tr><th>Tipo</th><th>Se une a</th><th>\(V_{max}^{ap}\)</th><th>\(K_M^{ap}\)</th><th>LB</th></tr></thead><tbody><tr><td>Competitiva</td><td>E</td><td>igual</td><td>sube</td><td>corte en y</td></tr><tr><td>Acompetitiva</td><td>ES</td><td>baja</td><td>baja</td><td>paralelas</td></tr><tr><td>Mixta</td><td>E y ES, distinta afinidad</td><td>baja</td><td>sube o baja</td><td>corte fuera de ejes</td></tr><tr><td>No competitiva pura</td><td>E y ES igual</td><td>baja</td><td>igual</td><td>corte en x</td></tr></tbody></table><p>Competitiva se vence con mucha S porque S ocupa E. Acompetitiva no: I espera a que exista ES. En mixta quedan secuestradas ambas poblaciones.</p></section>
        <section class="qbi-memory-branch"><h4>4. Gráficos directos: qué mirar</h4><figure class="qbi-memory-figure"><svg viewBox="0 0 620 320" role="img" aria-label="Efectos de inhibidores sobre curvas directas"><line x1="55" y1="265" x2="590" y2="265" class="qbi-axis"/><line x1="55" y1="265" x2="55" y2="35" class="qbi-axis"/><path d="M55 265 C120 150 210 90 570 65" class="qbi-curve"/><path d="M55 265 C175 185 290 100 570 68" class="qbi-curve-2"/><path d="M55 265 C120 185 230 145 570 132" style="fill:none;stroke:#159a7a;stroke-width:3"/><text x="255" y="302" class="qbi-svg-text">[S]</text><text x="17" y="150" class="qbi-svg-text">v₀</text><text x="410" y="52" class="qbi-svg-note">sin I</text><text x="410" y="91" class="qbi-svg-note">competitiva: misma meseta</text><text x="350" y="150" class="qbi-svg-note">I que baja Vmax</text></svg><figcaption>La competitiva desplaza la curva a la derecha, pero con mucha S alcanza la misma meseta. Acompetitiva, mixta y no competitiva reducen la meseta; se distinguen observando además qué pasa con la concentración que da la mitad de esa nueva meseta.</figcaption></figure></section>
        <section class="qbi-memory-branch"><h4>5. Lineweaver–Burk: por qué giran las rectas</h4><div class="qbi-memory-rule">\(\frac1{v_0}=\frac{\alpha K_M}{V_{max}}\frac1{[S]}+\frac{\alpha'}{V_{max}}\)</div><ul><li>La pendiente contiene \(\alpha\); la ordenada contiene \(\alpha'\).</li><li>Competitiva: cambia pendiente, no ordenada → mismo \(1/V_{max}\).</li><li>Acompetitiva: no cambia pendiente porque \(K_M\) y \(V_{max}\) bajan en la misma proporción → paralelas.</li><li>No competitiva pura: cambia pendiente y ordenada manteniendo \(-1/K_M\) → corte en x.</li><li>Mixta: cambian ambos de modo desigual → corte fuera de los ejes.</li></ul></section>
        <section class="qbi-memory-branch"><h4>6. Dixon y Cornish–Bowden</h4><div class="qbi-memory-rule">\(Dixon:\ \frac1{v_0}\;vs\;[I]\)</div><div class="qbi-memory-rule">\(Cornish\!\!\text{–}\!Bowden:\ \frac{[S]}{v_0}\;vs\;[I]\)</div><p>Se hacen varias rectas, cada una a [S] fija. Dixon ayuda a obtener \(K_i\), unión a E; Cornish–Bowden ayuda a obtener \(K'_i\), unión a ES. Son especialmente útiles en inhibición mixta porque separan las dos afinidades.</p></section>
        <section class="qbi-memory-branch"><h4>7. pH: actividad instantánea vs daño</h4><figure class="qbi-memory-figure"><svg viewBox="0 0 620 280" role="img" aria-label="Curva de actividad en función del pH"><line x1="55" y1="230" x2="580" y2="230" class="qbi-axis"/><line x1="55" y1="230" x2="55" y2="35" class="qbi-axis"/><path d="M65 220 C170 215 210 65 315 60 C420 58 455 214 565 220" class="qbi-curve"/><line x1="315" y1="60" x2="315" y2="230" class="qbi-guide-line"/><text x="282" y="255" class="qbi-svg-note">pH óptimo</text><text x="235" y="25" class="qbi-svg-text">actividad máxima observada</text></svg><figcaption>Al alejarse del óptimo cambian la protonación del sustrato y de residuos catalíticos/estructurales. Para saber si hubo desnaturalización: preincubar a cada pH, devolver todas las alícuotas al pH óptimo y medir. Si recupera actividad, era reversible; si no, hubo daño/inestabilidad.</figcaption></figure></section>
        <section class="qbi-memory-branch"><h4>8. Temperatura: dos efectos opuestos</h4><figure class="qbi-memory-figure"><svg viewBox="0 0 620 280" role="img" aria-label="Actividad en función de temperatura"><line x1="55" y1="230" x2="580" y2="230" class="qbi-axis"/><line x1="55" y1="230" x2="55" y2="35" class="qbi-axis"/><path d="M65 220 C160 210 250 155 345 63 C390 80 420 185 565 224" class="qbi-curve"/><line x1="345" y1="63" x2="345" y2="230" class="qbi-guide-line"/><text x="315" y="255" class="qbi-svg-note">T óptima</text><text x="90" y="190" class="qbi-svg-note">más choques</text><text x="420" y="175" class="qbi-svg-note">inactivación</text></svg><figcaption>Primero aumenta la velocidad molecular y \(k\); después domina la pérdida de estructura activa. La “temperatura óptima” depende también del tiempo de ensayo. Para estabilidad, preincubar, enfriar y medir todo a una misma temperatura.</figcaption></figure><div class="qbi-memory-rule">\(\ln k=\ln A-\frac{E_a}{R}\frac1T\)</div><div class="qbi-memory-rule">\(m=-\frac{E_a}{R}\quad\Rightarrow\quad E_a=-mR\)</div></section>
        <section class="qbi-memory-branch"><h4>9. Regulación, alosterismo y cooperatividad</h4><ul><li><b>Cooperatividad:</b> la unión del propio S a una subunidad cambia la afinidad/actividad de otras; S es efector homotrópico.</li><li><b>Alosterismo:</b> otra molécula se une a un sitio regulador; es efector heterotrópico.</li><li>Efector positivo desplaza la respuesta hacia menor [S] y/o eleva actividad; negativo hacia mayor [S] y/o la reduce.</li><li>La curva sigmoidea permite una zona de gran sensibilidad: un cambio pequeño de [S] produce un cambio grande de velocidad.</li></ul><div class="qbi-memory-rule">\(S_{0.5}:\quad v_0=\frac{V_{max}}2\)</div><div class="qbi-memory-rule">\(n_H>1:\ positiva\qquad n_H=1:\ sin\ cooperatividad\qquad n_H<1:\ negativa\)</div><p>\(n_H\) es el coeficiente de Hill: mide cuán empinada/cooperativa es la transición; no debe confundirse automáticamente con el número real de sitios.</p></section>
        <section class="qbi-memory-branch"><h4>10. Monod vs Koshland</h4><table><thead><tr><th>Modelo</th><th>Imagen mental</th></tr></thead><tbody><tr><td>Monod–Wyman–Changeux, concertado</td><td>Todas las subunidades cambian juntas entre T (menor afinidad) y R (mayor afinidad). El ligando selecciona/estabiliza R.</td></tr><tr><td>Koshland, secuencial</td><td>La unión cambia primero una subunidad y ese cambio modifica progresivamente a las vecinas; pueden coexistir conformaciones.</td></tr></tbody></table></section>
        <section class="qbi-memory-branch"><h4>11. Otras regulaciones</h4><ul><li><b>Modificación covalente:</b> agregar/quitar un grupo, por ejemplo fosfato, cambia actividad de manera reversible.</li><li><b>Proteólisis:</b> corte de un precursor inactivo; suele ser irreversible y activa zimógenos.</li></ul></section>
      </div>
    </div>
  </details>`;

  const guide2=String.raw`
  <details class="qbi-memory-guide" data-memory-key="guia-2">
    <summary>Guía 2 · Mapa para memorizar — estructura, plegamiento y purificación de proteínas</summary>
    <div class="qbi-memory-body">
      <div class="qbi-memory-core">
        <b>Idea central</b>
        La secuencia contiene la información para plegarse; el medio favorece ciertas interacciones; el plegamiento produce estructura y la estructura permite función. Para purificar una proteína se explotan diferencias físicas o químicas sin perder de vista su actividad.
      </div>
      <div class="qbi-memory-chain">
        <span>secuencia</span><i>→</i><span>interacciones</span><i>→</i><span>plegamiento</span><i>→</i><span>estructura 3D</span><i>→</i><span>función</span><i>→</i><span>ensayo de actividad</span>
      </div>
      <div class="qbi-memory-grid">
        <section class="qbi-memory-branch">
          <h4>1. Los niveles de estructura son capas de una misma molécula</h4>
          <ul>
            <li><strong>Primaria:</strong> secuencia covalente de aminoácidos.</li>
            <li><strong>Secundaria:</strong> arreglos locales del esqueleto, sobre todo α-hélice y β-lámina, estabilizados por puentes de H del backbone.</li>
            <li><strong>Terciaria:</strong> organización tridimensional completa de una cadena; combina estructura secundaria, giros, motivos y dominios.</li>
            <li><strong>Cuaternaria:</strong> asociación definida de varias cadenas o subunidades.</li>
          </ul>
        </section>
        <section class="qbi-memory-branch">
          <h4>2. Qué fuerzas sostienen el plegamiento</h4>
          <ul>
            <li>El <strong>efecto hidrofóbico</strong> es el gran organizador de proteínas solubles: residuos apolares tienden a quedar enterrados.</li>
            <li>Puentes de H, interacciones iónicas, van der Waals y contactos hidrofóbicos afinan y estabilizan la estructura.</li>
            <li>Los puentes disulfuro son covalentes y pueden fijar regiones alejadas de la secuencia.</li>
            <li>Una interacción aislada es débil; la estabilidad surge de muchas contribuciones cooperativas.</li>
          </ul>
        </section>
        <section class="qbi-memory-branch">
          <h4>3. Motivo, dominio y subunidad no son sinónimos</h4>
          <ul>
            <li><strong>Motivo:</strong> patrón estructural recurrente, no necesariamente estable o funcional por sí solo.</li>
            <li><strong>Dominio:</strong> región que puede plegarse de manera relativamente independiente y suele asociarse a una función.</li>
            <li><strong>Subunidad:</strong> cadena polipeptídica individual dentro de un complejo oligomérico.</li>
            <li>Una proteína puede tener varios dominios en una sola cadena o varias subunidades, cada una con uno o más dominios.</li>
          </ul>
        </section>
        <section class="qbi-memory-branch">
          <h4>4. Anfinsen, Levinthal y chaperonas encajan en la misma historia</h4>
          <ul>
            <li><strong>Anfinsen:</strong> en condiciones apropiadas, la secuencia primaria contiene la información necesaria para alcanzar la conformación nativa.</li>
            <li><strong>Levinthal:</strong> una proteína no puede probar al azar todas las conformaciones posibles; el plegamiento sigue rutas favorecidas en un paisaje energético.</li>
            <li><strong>Chaperonas:</strong> ayudan a evitar agregación y estados atrapados; no “escriben” la estructura final ni reemplazan la información de la secuencia.</li>
          </ul>
          <div class="qbi-memory-rule">Pensarlo como un embudo energético: muchas conformaciones posibles arriba → menos estados favorables → mínimo de energía libre compatible con la forma nativa.</div>
        </section>
        <section class="qbi-memory-branch">
          <h4>5. Desnaturalizar no es cortar la cadena</h4>
          <ul>
            <li>Desnaturalización = pérdida de estructura secundaria/terciaria/cuaternaria y, en general, de función.</li>
            <li>La estructura primaria suele quedar intacta salvo tratamientos que rompan enlaces covalentes.</li>
            <li>Calor, pH extremo, urea y detergentes alteran interacciones no covalentes; reductores afectan disulfuros.</li>
            <li>Puede ser reversible o irreversible; agregación y modificaciones químicas favorecen irreversibilidad.</li>
          </ul>
        </section>
        <section class="qbi-memory-branch">
          <h4>6. Proteínas de membrana: el medio invierte la lógica de exposición</h4>
          <ul>
            <li>En regiones transmembrana, las superficies que miran a lípidos suelen ser <strong>hidrofóbicas</strong>.</li>
            <li>Hélices α transmembrana aparecen en proteínas como bacteriorrodopsina y transportadores tipo GLUT.</li>
            <li>Las porinas suelen formar barriles β: exterior hidrofóbico hacia la membrana e interior más polar hacia el canal.</li>
            <li>La distribución de residuos siempre se interpreta respecto del <strong>entorno</strong>, no con la regla automática “hidrofóbico adentro”.</li>
          </ul>
        </section>
        <section class="qbi-memory-branch">
          <h4>7. Purificación: antes de separar hay que saber qué seguir</h4>
          <ul>
            <li>Primero se necesita un <strong>ensayo</strong> que permita reconocer la proteína de interés durante todo el procedimiento.</li>
            <li>La cantidad total de proteína suele disminuir a medida que se eliminan contaminantes.</li>
            <li>La actividad total también puede disminuir por pérdidas.</li>
            <li>La señal clave de enriquecimiento es que aumente la <strong>actividad específica</strong>.</li>
          </ul>
          <div class="qbi-memory-rule">\(\text{actividad específica}=\frac{\text{actividad enzimática total}}{\text{masa total de proteína}}\). Si el proceso purifica bien, este cociente aumenta.</div>
        </section>
        <section class="qbi-memory-branch">
          <h4>7 bis. Recorrido completo desde la fuente</h4>
          <ol>
            <li><b>Fuente biológica:</b> elegir tejido, células o cultivo donde la proteína sea abundante.</li>
            <li><b>Ruptura:</b> mecánica (homogeneización), física (sonicación, congelamiento/descongelamiento u ósmosis), química (detergentes) o enzimática (lisozima, proteasas controladas).</li>
            <li><b>Extracto:</b> centrifugar para separar restos insolubles del sobrenadante que contiene las proteínas solubles.</li>
            <li><b>Fraccionar y concentrar:</b> precipitación, diálisis y ultrafiltración.</li>
            <li><b>Resolver:</b> cromatografías sucesivas por propiedades diferentes.</li>
            <li><b>Controlar:</b> actividad, proteína total, electroforesis e identificación.</li>
          </ol>
        </section>
        <section class="qbi-memory-branch">
          <h4>7 ter. Salting out, pI, diálisis y ultrafiltración</h4>
          <ul>
            <li><b>Salting out:</b> mucho sulfato de amonio atrae y organiza gran parte del agua. Queda menos agua disponible para hidratar la superficie proteica; se favorecen contactos proteína–proteína y algunas precipitan antes que otras.</li>
            <li><b>Cerca del pI:</b> la carga neta promedio se acerca a cero. Hay menos repulsión entre moléculas, pueden aproximarse y agregarse con mayor facilidad; no significa que desaparezcan todas las cargas internas.</li>
            <li><b>Diálisis de laboratorio:</b> la membrana retiene proteínas y permite que sales/solutos pequeños difundan hasta equilibrarse con el buffer externo.</li>
            <li><b>Diálisis clínica:</b> no “pone sangre nueva”. La sangre de la persona circula junto a una membrana; urea, exceso de sales y agua pasan hacia el líquido de diálisis y las células/proteínas sanguíneas quedan retenidas. Luego vuelve la misma sangre depurada.</li>
            <li><b>Ultrafiltración:</b> la presión fuerza solvente y moléculas pequeñas a atravesar una membrana; la proteína retenida queda más concentrada.</li>
          </ul>
        </section>
        <section class="qbi-memory-branch">
          <h4>8. Cromatografía: elegir qué diferencia explotar</h4>
          <table><thead><tr><th>Método</th><th>Propiedad</th><th>Idea para recordarlo</th></tr></thead><tbody>
            <tr><td>Intercambio iónico</td><td>carga</td><td>la resina retiene especies de carga opuesta</td></tr>
            <tr><td>Exclusión molecular</td><td>tamaño</td><td>las grandes salen primero; las pequeñas entran en los poros y tardan más</td></tr>
            <tr><td>Afinidad</td><td>reconocimiento específico</td><td>la proteína objetivo se une a un ligando elegido para ella</td></tr>
          </tbody></table>
        </section>
        <section class="qbi-memory-branch">
          <h4>9. Intercambio iónico: resolverlo con pH vs pI</h4>
          <ul>
            <li>Primero determinar el signo de la proteína al pH de trabajo.</li>
            <li>Si pH &gt; pI → proteína negativa; si pH &lt; pI → positiva.</li>
            <li>Un <strong>intercambiador catiónico</strong> posee grupos negativos y retiene proteínas positivas.</li>
            <li>Un <strong>intercambiador aniónico</strong> posee grupos positivos y retiene proteínas negativas.</li>
            <li>Elución: aumentar fuerza iónica o cambiar pH para debilitar la interacción.</li>
          </ul>
        </section>
        <section class="qbi-memory-branch">
          <h4>10. Exclusión molecular: no hay unión específica</h4>
          <ul>
            <li>Las partículas grandes no entran o entran poco en los poros → recorren un camino más corto → salen antes.</li>
            <li>Las pequeñas exploran más volumen interno → salen después.</li>
            <li>Sirve para separar por tamaño y también para estimar tamaño aparente o cambiar buffer.</li>
            <li>La lógica es opuesta a la intuición de “lo pequeño corre más”: aquí lo grande <strong>eluye primero</strong>.</li>
          </ul>
        </section>
        <section class="qbi-memory-branch">
          <h4>11. Estrategia de purificación: encadenar propiedades distintas</h4>
          <ul>
            <li>No conviene repetir separaciones que explotan exactamente la misma propiedad si otra etapa puede aportar ortogonalidad.</li>
            <li>Una secuencia típica combina tamaño, carga y/o afinidad.</li>
            <li>Cada etapa sacrifica algo de rendimiento para ganar pureza.</li>
            <li>La electroforesis sirve como control visual de cuántas especies quedan, pero el ensayo funcional confirma si la proteína objetivo sigue activa.</li>
          </ul>
        </section>
        <section class="qbi-memory-branch">
          <h4>12. Cómo leer una columna sin perderse</h4>
          <ul>
            <li><b>Fase estacionaria:</b> matriz empaquetada. <b>Fase móvil:</b> buffer que arrastra la muestra.</li>
            <li>El mal empaquetamiento crea caminos preferenciales, mezcla zonas, ensancha picos y baja la resolución.</li>
            <li>El detector suele seguir \(A_{280}\), pero un pico a 280 nm indica proteína, no necesariamente la proteína buscada.</li>
            <li>El <b>volumen de elución</b> es cuánto buffer pasó hasta que apareció el pico. El <b>tiempo de retención</b> es cuánto tardó: \(t_R=V_e/Q\), donde \(Q\) es el caudal.</li>
            <li>Uniones débiles eluyen antes; las fuertes requieren más sal, otro pH o un competidor. Gradiente continuo cambia suavemente; escalones cambian de golpe.</li>
          </ul>
        </section>
        <section class="qbi-memory-branch">
          <h4>13. ¿La purificación funcionó?</h4>
          <div class="qbi-memory-rule">\(\text{proteína total}=[\text{proteína}]\cdot V\)</div>
          <div class="qbi-memory-rule">\(\text{actividad total}=[\text{actividad}]\cdot V\)</div>
          <div class="qbi-memory-rule">\(AE=\frac{\text{actividad total}}{\text{proteína total}}\)</div>
          <div class="qbi-memory-rule">\(FP=\frac{AE_{etapa}}{AE_{inicial}}\)</div>
          <div class="qbi-memory-rule">\(R(\%)=\frac{\text{actividad total de la etapa}}{\text{actividad total inicial}}\cdot100\)</div>
          <p><b>Factor de purificación:</b> dice cuántas veces quedó más “concentrada en actividad” la proteína buscada respecto del conjunto total. Si pasa de 2 a 20 U/mg, el factor es 10. No mide cuánto recuperaste: eso lo mide el rendimiento.</p>
        </section>
      </div>
      <div class="qbi-memory-traps"><b>Errores que esta guía busca evitar:</b> decir que la proteína “prueba todas las conformaciones”; pensar que las chaperonas determinan la secuencia de plegamiento; confundir motivo con dominio; asumir que desnaturalización rompe enlaces peptídicos; olvidar que las proteínas de membrana exponen zonas hidrofóbicas al lípido; confundir intercambiador catiónico con “resina positiva”; creer que en exclusión molecular lo pequeño sale primero; evaluar purificación solo por proteína total y no por actividad específica.</div>
    </div>
  </details>`;

  function readState(){try{return JSON.parse(localStorage.getItem(STORAGE)||'{}')||{}}catch{return {}}}
  function saveState(state){try{localStorage.setItem(STORAGE,JSON.stringify(state))}catch{}}

  function build(){
    const wrap=document.createElement('section');
    wrap.id=ID;
    wrap.dataset.version=VERSION;
    wrap.innerHTML=`<div class="qbi-memory-heading"><strong>Mapa mental integral de Química Biológica</strong><span>Recorrido completo y ordenado: conceptos base, métodos, trabajos prácticos y Enzimas I–III. Cada bloque difícil incluye el razonamiento, las ecuaciones y la lectura de sus gráficos.</span></div>${guide1}${guide2}${guide3}${guide4}${guide5}`;
    const state=readState();
    wrap.querySelectorAll('details[data-memory-key]').forEach(detail=>{
      const key=detail.dataset.memoryKey;
      if(Object.hasOwn(state,key))detail.open=Boolean(state[key]);
      detail.addEventListener('toggle',event=>{if(!event.isTrusted)return;state[key]=detail.open;saveState(state)});
    });
    return wrap;
  }

  function target(){
    return document.querySelector('#qbiEmbeddedExercises,.qbi-exercises-section,#ejercicios-qbi')||document.querySelector('.qb-summary');
  }

  function insert(){
    if(document.getElementById(ID))return true;
    const root=target();
    if(!root)return false;
    if(!document.getElementById('qbi-guide-memory-maps-style')){
      const style=document.createElement('style');style.id='qbi-guide-memory-maps-style';style.textContent=css;document.head.append(style);
    }
    const node=build();
    const heading=[...root.children].find(item=>/^H[1-3]$/.test(item.tagName||''));
    if(heading?.nextSibling)root.insertBefore(node,heading.nextSibling);else root.prepend(node);
    if(window.MathJax?.typesetPromise)window.MathJax.typesetPromise([node]).catch(()=>{});
    return true;
  }

  let tries=0;
  function boot(){
    if(insert())return;
    if(++tries<80)setTimeout(boot,150);
  }
  const observer=new MutationObserver(()=>insert());
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{observer.observe(document.documentElement,{childList:true,subtree:true});boot()},{once:true});else{observer.observe(document.documentElement,{childList:true,subtree:true});boot()}
  window.QBI_GUIDE_MEMORY_MAPS={version:VERSION,insert};
})();
