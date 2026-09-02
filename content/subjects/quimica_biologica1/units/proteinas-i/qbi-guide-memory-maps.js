(()=>{
  'use strict';
  const VERSION='1.0.0';
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
  @media(max-width:650px){#${ID} .qbi-memory-body{padding:13px}#${ID} .qbi-memory-grid{grid-template-columns:1fr}#${ID} .qbi-memory-chain i{display:none}}
  `;

  const guide1=`
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

  const guide2=`
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
    wrap.innerHTML=`<div class="qbi-memory-heading"><strong>Mapas mentales para memorizar las guías</strong><span>No siguen el orden de los ejercicios: reagrupan la teoría por conexiones para que una idea lleve a la siguiente.</span></div>${guide1}${guide2}`;
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
