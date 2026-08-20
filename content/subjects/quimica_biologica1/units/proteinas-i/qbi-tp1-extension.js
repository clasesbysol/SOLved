(()=>{
  'use strict';
  const VERSION='3.5.0';

  const CHAPTER=`
<section class="qb-chapter qb-tp1-chapter" id="cap-tp1">
  <div class="qb-chapter-number">TP1</div>
  <h2>Determinación de proteínas: métodos de cuantificación y trabajo práctico</h2>
  <p class="highlightable" data-block-id="qb:tp1:scope">Este capítulo reúne la teoría necesaria para el <strong>Trabajo Práctico Nº 1: Determinación de proteínas</strong>, el contenido del material introductorio de la clase y la lógica de cálculo preparada para procesar los resultados experimentales. El objetivo del TP es determinar la concentración de proteínas de muestras incógnitas mediante <strong>Biuret</strong> y <strong>Bradford</strong>, utilizando curvas de calibración construidas con seroalbúmina bovina (BSA).</p>

  <h3>Antes de elegir una técnica: métodos generales y métodos específicos</h3>
  <div class="qb-two-col">
    <div><h4>Métodos generales</h4><p class="highlightable" data-block-id="qb:tp1:general-methods">Estiman la <strong>cantidad total de proteínas</strong> de una muestra a partir de una propiedad compartida por muchas proteínas. En este grupo se ubican los métodos trabajados en el TP y en el video: espectrofotometría UV, Lowry, Biuret y Bradford. El resultado no identifica qué proteína particular originó la señal.</p></div>
    <div><h4>Métodos específicos</h4><p class="highlightable" data-block-id="qb:tp1:specific-methods">Buscan cuantificar o detectar una <strong>proteína particular</strong> aprovechando una propiedad exclusiva o selectiva del analito, por ejemplo su actividad funcional o un reconocimiento molecular específico. Son conceptualmente distintos de una determinación de proteínas totales: una muestra puede contener la misma masa total de proteínas pero distinta cantidad de la proteína de interés.</p></div>
  </div>
  <div class="qb-callout qb-callout-key"><b>En este TP:</b> Biuret y Bradford son métodos generales de cuantificación de proteínas totales. Primero se construye una relación señal–cantidad con un estándar conocido y luego se usa esa relación para estimar la muestra incógnita.</div>

  <h3>Métodos directos e indirectos de cuantificación total</h3>
  <p class="highlightable" data-block-id="qb:tp1:direct-indirect">Dentro de los métodos generales también puede distinguirse entre <strong>métodos directos</strong>, que aprovechan la absorción propia de la proteína o de sus enlaces, y <strong>métodos indirectos</strong>, en los que la proteína reacciona con un reactivo y genera una especie coloreada cuya absorbancia se relaciona con la cantidad de proteína.</p>
  <div class="qb-tp-method-map">
    <div class="qb-tp-method-card"><span class="qb-tp-badge">Directos</span><b>Espectrofotometría UV</b><span>A<sub>280</sub> y A<sub>205–210</sub></span></div>
    <div class="qb-tp-method-card"><span class="qb-tp-badge">Indirectos</span><b>Lowry</b><span>Complejo de Cu y reactivo de Folin</span></div>
    <div class="qb-tp-method-card"><span class="qb-tp-badge">Indirectos</span><b>Biuret</b><span>Complejo púrpura Cu–enlaces peptídicos</span></div>
    <div class="qb-tp-method-card"><span class="qb-tp-badge">Indirectos</span><b>Bradford</b><span>Unión de Coomassie Brilliant Blue G-250</span></div>
  </div>

  <h3>Base espectrofotométrica: absorbancia y ley de Lambert–Beer</h3>
  <p class="highlightable" data-block-id="qb:tp1:beer">La <strong>absorbancia</strong> puede relacionarse con la concentración de una especie absorbente mediante la ley de Lambert–Beer. Mientras el sistema permanezca dentro de su rango lineal, la señal aumenta de manera proporcional a la concentración.</p>
  <div class="qb-equation"><math display="block"><mrow><mi>A</mi><mo>=</mo><mi>ε</mi><mo>·</mo><mi>b</mi><mo>·</mo><mi>C</mi></mrow></math></div>
  <p class="qb-muted">A es la absorbancia, ε la absortividad, b el camino óptico de la cubeta y C la concentración. En las curvas experimentales del TP esta proporcionalidad se expresa mediante una recta de calibración.</p>

  <h3>Espectrofotometría UV</h3>
  <h4>Absorbancia a 280 nm</h4>
  <p class="highlightable" data-block-id="qb:tp1:a280">La mayoría de las proteínas presenta un máximo de absorción cercano a 280 nm debido principalmente a los aminoácidos aromáticos <strong>tirosina</strong> y <strong>triptófano</strong>. La absortividad depende de la composición aminoacídica y puede variar aproximadamente entre 0,4 y 1,5 en las unidades indicadas en la guía. Como aproximación práctica, para una cubeta de 1 cm se puede tomar una unidad de absorbancia como equivalente a una concentración cercana a 1 mg/mL de proteína cuando se adopta una absortividad igual a 1.</p>
  <div class="qb-equation"><math display="block"><mrow><msub><mi>A</mi><mrow><mn>280</mn><mtext> nm</mtext></mrow></msub><mo>=</mo><msub><mi>ε</mi><mrow><mn>280</mn><mtext> nm</mtext></mrow></msub><mo>·</mo><mn>1</mn><mtext> cm</mtext><mo>·</mo><mi>C</mi></mrow></math></div>
  <div class="qb-callout"><b>Ventajas:</b> rápido y sencillo; conserva la muestra. <b>Limitaciones:</b> depende del contenido de Tyr y Trp y el ADN/ARN también aporta señal a 280 nm. En el material introductorio se ubica un rango aproximado de 50–2000 µg.</div>

  <h4>Absorbancia a 205–210 nm</h4>
  <p class="highlightable" data-block-id="qb:tp1:a205">A 205–210 nm absorbe la <strong>unión peptídica</strong>. Por eso el método es más sensible y depende mucho menos de qué aminoácidos particulares compongan la proteína. Su principal limitación es que muchos buffers y componentes habituales de las soluciones también absorben intensamente en esa región.</p>
  <div class="qb-callout"><b>Ventajas:</b> sensible e independiente de la composición aminoacídica en comparación con A<sub>280</sub>. <b>Limitación principal:</b> interferencia de buffers. El material introductorio señala un rango aproximado de 10–50 µg.</div>

  <h3>Método de Lowry</h3>
  <p class="highlightable" data-block-id="qb:tp1:lowry-1">El método de Lowry combina dos etapas. En la primera, los iones Cu<sup>2+</sup> en medio alcalino se unen a las proteínas formando complejos con los nitrógenos de los enlaces peptídicos. Se genera un color azul pálido y se favorece el despliegue de la proteína, dejando más expuestos residuos fenólicos de tirosina. El Cu<sup>2+</sup> se mantiene en solución alcalina mediante su complejo con tartrato.</p>
  <p class="highlightable" data-block-id="qb:tp1:lowry-2">En la segunda etapa, los grupos fenólicos —principalmente de tirosina— reducen el reactivo de <strong>Folin–Ciocalteau</strong>, con participación catalítica del cobre. El ácido fosfomolibdotúngstico del reactivo, inicialmente amarillo, se transforma al reducirse en una especie de color azul intenso. La señal se cuantifica a <strong>660 nm</strong>.</p>
  <div class="qb-callout"><b>Sensibilidad:</b> aproximadamente 5–100 µg de proteína. <b>Interferentes:</b> buffers, detergentes, lípidos y otras sustancias. La guía indica que una estrategia para resolver interferencias es precipitar las proteínas y resuspenderlas en un buffer sin interferentes. El esquema de clase muestra un Lowry modificado con un paso DCO/TCA y destaca su utilidad para proteínas de membrana.</div>

  <h3>Método de Biuret</h3>
  <p class="highlightable" data-block-id="qb:tp1:biuret-theory">Bajo condiciones alcalinas, sustancias que contienen dos o más <strong>uniones peptídicas</strong> forman un complejo púrpura con sales de cobre. La reacción recibe su nombre del biuret, una molécula obtenida a partir de dos moléculas de urea y suficientemente simple para dar una reacción positiva. El fundamento coincide con la primera etapa del método de Lowry.</p>
  <div class="qb-callout"><b>Perfil del método:</b> rápido y relativamente sencillo, independiente de aminoácidos particulares y con pocos interferentes; uno de los señalados es el sulfato de amonio. Es menos sensible que Lowry y requiere más muestra. El rango adecuado indicado es 0,1–1 mg de proteína en 1 mL final, es decir, aproximadamente 100–1000 µg.</div>

  <h4>Reactivo y protocolo de Biuret de la guía</h4>
  <p class="highlightable" data-block-id="qb:tp1:biuret-reagent">El reactivo se prepara con 2,25 g de tartrato de sodio y potasio (PM 282,22), 0,75 g de sulfato cúprico pentahidratado (PM 249,68) y 1,25 g de ioduro de potasio (PM 166,0), disueltos en ese orden en 100 mL de NaOH 0,2 M. Finalmente se lleva a 250 mL con agua destilada.</p>
  <div class="qb-tp-protocol">
    <span>1</span><p>Tomar <b>0,1 mL (100 µL)</b> de muestra o estándar.</p>
    <span>2</span><p>Agregar <b>0,9 mL (900 µL)</b> de reactivo de Biuret.</p>
    <span>3</span><p>Mezclar e incubar <b>20 min a temperatura ambiente</b>.</p>
    <span>4</span><p>Leer la absorbancia a <b>550 nm</b> e interpolar en la curva estándar. La guía indica llevar a cero el espectrofotómetro con agua.</p>
  </div>

  <h3>Método de Bradford</h3>
  <p class="highlightable" data-block-id="qb:tp1:bradford-theory">El ensayo de Bradford utiliza <strong>Coomassie Brilliant Blue G-250</strong>. En las condiciones del ensayo, el colorante pasa de una forma leuco marrón–naranja a una forma intensamente azul cuando sus grupos aniónicos interactúan con grupos amino de las proteínas. La señal se mide a <strong>595 nm</strong> y existe una relación aproximadamente lineal dentro de un intervalo limitado de cantidades de proteína.</p>
  <div class="qb-callout qb-callout-key"><b>Perfil del método:</b> rápido, barato y muy sensible. El rango de trabajo señalado es 1–25 µg para un volumen final de 1 mL. Interfieren detergentes y soluciones alcalinas; el material introductorio también enumera líquidos orgánicos.</div>

  <h4>Reactivo y protocolo de Bradford de la guía</h4>
  <p class="highlightable" data-block-id="qb:tp1:bradford-reagent">El reactivo se prepara disolviendo 100 mg de Coomassie Brilliant Blue G-250 en 50 mL de etanol y 100 mL de ácido fosfórico al 85 %. Se ajusta el volumen final a 1 L con agua y se filtra. La guía señala una estabilidad de aproximadamente dos meses.</p>
  <div class="qb-tp-protocol">
    <span>1</span><p>Llevar cada muestra o estándar a <b>800 µL con agua</b>.</p>
    <span>2</span><p>Agregar <b>200 µL</b> de reactivo de Bradford, de modo que el volumen final de reacción sea <b>1 mL</b>.</p>
    <span>3</span><p>Agitar e incubar <b>5 min a temperatura ambiente</b>.</p>
    <span>4</span><p>Leer la absorbancia a <b>595 nm</b> e interpolar en la curva estándar.</p>
  </div>

  <h3>Comparación de los métodos presentados</h3>
  <div class="qb-tp-table-wrap"><table class="qb-tp-table">
    <thead><tr><th>Método</th><th>Qué genera la señal</th><th>Ventajas destacadas</th><th>Limitaciones / interferentes</th><th>Rango aproximado del material</th></tr></thead>
    <tbody>
      <tr><td>A<sub>280</sub></td><td>Tyr y Trp</td><td>Rápido, barato, sencillo; conserva muestra</td><td>Depende de composición; ADN/ARN</td><td>50–2000 µg</td></tr>
      <tr><td>A<sub>205–210</sub></td><td>Enlace peptídico</td><td>Muy sensible; menos dependiente de composición</td><td>Buffers absorben en la misma región</td><td>10–50 µg</td></tr>
      <tr><td>Biuret</td><td>Complejo púrpura Cu–enlaces peptídicos</td><td>Rápido; pocos interferentes</td><td>Poco sensible; sulfato de amonio</td><td>100–1000 µg</td></tr>
      <tr><td>Lowry</td><td>Complejo de Cu + reducción de Folin</td><td>Muy sensible; existe variante para proteínas de membrana</td><td>Composición y múltiples interferentes</td><td>5–100 µg</td></tr>
      <tr><td>Bradford</td><td>Unión de Coomassie G-250 a proteínas</td><td>Rápido, barato, muy sensible</td><td>Detergentes, soluciones alcalinas y líquidos orgánicos</td><td>1–25 µg</td></tr>
    </tbody>
  </table></div>

  <h3>Parte experimental I: curva estándar de Biuret</h3>
  <p class="highlightable" data-block-id="qb:tp1:biuret-standard">Se parte de BSA de <strong>10 mg/mL</strong>. Como 10 mg/mL equivalen a 0,01 mg/µL, el volumen de estándar necesario se calcula dividiendo la masa buscada por esa concentración. Luego se completa con agua hasta 100 µL y se agregan 900 µL de reactivo.</p>
  <div class="qb-equation"><math display="block"><mrow><mi>V</mi><mo>=</mo><mfrac><mi>m</mi><mi>C</mi></mfrac></mrow></math></div>
  <div class="qb-tp-table-wrap"><table class="qb-tp-table qb-tp-table-compact">
    <thead><tr><th>mg de BSA</th><th>µL de BSA 10 mg/mL</th><th>H<sub>2</sub>O (µL)</th><th>Biuret (µL)</th></tr></thead>
    <tbody>
      <tr><td>0,0</td><td>0</td><td>100</td><td>900</td></tr>
      <tr><td>0,2</td><td>20</td><td>80</td><td>900</td></tr>
      <tr><td>0,4</td><td>40</td><td>60</td><td>900</td></tr>
      <tr><td>0,6</td><td>60</td><td>40</td><td>900</td></tr>
      <tr><td>0,8</td><td>80</td><td>20</td><td>900</td></tr>
      <tr><td>1,0</td><td>100</td><td>0</td><td>900</td></tr>
    </tbody>
  </table></div>
  <p class="highlightable" data-block-id="qb:tp1:biuret-read">Después de incubar 20 min se registran las absorbancias a 550 nm. El tubo de 0 mg funciona como <strong>blanco</strong> de la curva y permite corregir la señal basal.</p>

  <h3>Parte experimental II: curva estándar de Bradford</h3>
  <p class="highlightable" data-block-id="qb:tp1:bradford-standard">La BSA estándar es de <strong>0,1 mg/mL</strong>, equivalente a 100 µg/mL o 0,1 µg/µL. Para cada masa se toma el volumen correspondiente de BSA, se completa con agua hasta 800 µL y finalmente se agregan 200 µL de reactivo de Bradford.</p>
  <div class="qb-equation"><math display="block"><mrow><mi>V</mi><mo>=</mo><mfrac><mtext>µg de BSA requeridos</mtext><mrow><mn>0.1</mn><mtext> µg/µL</mtext></mrow></mfrac></mrow></math></div>
  <div class="qb-tp-table-wrap"><table class="qb-tp-table qb-tp-table-compact">
    <thead><tr><th>µg de BSA</th><th>µL de BSA 0,1 mg/mL</th><th>H<sub>2</sub>O (µL)</th><th>Bradford (µL)</th></tr></thead>
    <tbody>
      <tr><td>0</td><td>0</td><td>800</td><td>200</td></tr>
      <tr><td>2</td><td>20</td><td>780</td><td>200</td></tr>
      <tr><td>4</td><td>40</td><td>760</td><td>200</td></tr>
      <tr><td>7</td><td>70</td><td>730</td><td>200</td></tr>
      <tr><td>10</td><td>100</td><td>700</td><td>200</td></tr>
      <tr><td>25</td><td>250</td><td>550</td><td>200</td></tr>
    </tbody>
  </table></div>

  <h3>De la absorbancia a la masa de proteína</h3>
  <p class="highlightable" data-block-id="qb:tp1:blank-correction">La primera operación es la <strong>corrección por blanco</strong>. Se resta la absorbancia del tubo sin proteína a cada lectura para eliminar la señal proveniente del reactivo, la cubeta y el fondo del sistema.</p>
  <div class="qb-equation"><math display="block"><mrow><msub><mi>A</mi><mtext>corregida</mtext></msub><mo>=</mo><msub><mi>A</mi><mtext>medida</mtext></msub><mo>−</mo><msub><mi>A</mi><mtext>blanco</mtext></msub></mrow></math></div>
  <p class="highlightable" data-block-id="qb:tp1:calibration-line">Luego se grafica absorbancia corregida en función de la masa de proteína estándar y se ajusta una recta utilizando <strong>sólo los puntos que pertenecen al rango lineal</strong>. Fuera de ese intervalo, la proporcionalidad señal–cantidad deja de ser válida y una recta forzada produciría una estimación sesgada de la incógnita.</p>
  <div class="qb-equation"><math display="block"><mrow><mi>A</mi><mo>=</mo><mi>m</mi><mo>·</mo><mi>x</mi><mo>+</mo><mi>b</mi></mrow></math></div>
  <div class="qb-equation"><math display="block"><mrow><mi>x</mi><mo>=</mo><mfrac><mrow><mi>A</mi><mo>−</mo><mi>b</mi></mrow><mi>m</mi></mfrac></mrow></math></div>
  <p class="highlightable" data-block-id="qb:tp1:factor-f">La guía también pide calcular el <strong>factor f</strong>. Si la recta corregida tiene una ordenada al origen despreciable, el factor es el inverso de la pendiente y permite convertir directamente absorbancia en masa.</p>
  <div class="qb-equation"><math display="block"><mrow><mi>f</mi><mo>=</mo><mfrac><mn>1</mn><mi>m</mi></mfrac></mrow></math></div>
  <div class="qb-equation"><math display="block"><mrow><mi>x</mi><mo>=</mo><mi>A</mi><mo>·</mo><mi>f</mi></mrow></math></div>
  <div class="qb-callout qb-callout-key"><b>No mezclar las dos formas:</b> si el ajuste conserva una ordenada al origen b distinta de cero, se usa x = (A − b)/m. El atajo x = A·f corresponde al caso en que la corrección por blanco y el ajuste permiten considerar b ≈ 0.</div>

  <h4>Ejemplo del material introductorio</h4>
  <p class="highlightable" data-block-id="qb:tp1:example">En el ejemplo mostrado, una muestra tiene una absorbancia medida de 0,322 y una absorbancia corregida de 0,223. La recta ilustrada es A = 0,016·x + 0,004, con x expresado en µg.</p>
  <div class="qb-equation"><math display="block"><mrow><mi>x</mi><mo>=</mo><mfrac><mrow><mn>0.223</mn><mo>−</mo><mn>0.004</mn></mrow><mn>0.016</mn></mfrac><mo>=</mo><mn>13.68</mn><mtext> µg</mtext></mrow></math></div>
  <p class="highlightable" data-block-id="qb:tp1:example-f">El mismo material también muestra el atajo con f = 1/m = 62,5. Si se multiplica directamente la absorbancia corregida por ese factor, ignorando la pequeña ordenada, se obtiene aproximadamente 13,93 µg. La diferencia entre 13,68 y 13,93 µg proviene precisamente de considerar o no el término b = 0,004.</p>

  <h3>Muestra incógnita y factor de dilución</h3>
  <p class="highlightable" data-block-id="qb:tp1:unknown">Para Biuret la muestra incógnita se procesa simultáneamente con la curva estándar. Para Bradford la guía pide realizar diluciones de la muestra y extrapolar/interpolar las lecturas en la curva. Una vez obtenida la masa correspondiente a la alícuota analizada, se convierte a concentración y se corrige por el <strong>factor de dilución</strong> cuando corresponda.</p>
  <div class="qb-equation"><math display="block"><mrow><msub><mi>C</mi><mtext>alícuota</mtext></msub><mo>=</mo><mfrac><mi>x</mi><msub><mi>V</mi><mtext>muestra agregada</mtext></msub></mfrac></mrow></math></div>
  <div class="qb-equation"><math display="block"><mrow><msub><mi>C</mi><mtext>original</mtext></msub><mo>=</mo><msub><mi>C</mi><mtext>alícuota</mtext></msub><mo>·</mo><mi>FD</mi></mrow></math></div>

  <h3>La hoja de cálculo preparada para el TP</h3>
  <p class="highlightable" data-block-id="qb:tp1:spreadsheet">Las anotaciones incorporadas a la guía piden que las tablas de preparación y las tablas de absorbancia corregida queden conectadas a sus gráficos. La estructura preparada respeta esa lógica: <strong>Biuret y Bradford están en una misma hoja</strong>, con las celdas experimentales listas para completar y gráficos vinculados que se actualizan al cargar las absorbancias.</p>
  <div class="qb-two-col">
    <div><h4>Hoja “Para completar”</h4><p>Contiene las tablas de preparación, las lecturas, la corrección del blanco, la selección de puntos que entran en el ajuste lineal, el cálculo de pendiente y factor f, y los gráficos automáticos. No contiene resultados experimentales inventados.</p></div>
    <div><h4>Hoja “Ejemplo ideal”</h4><p>Es un duplicado de la estructura anterior cargado con números ideales únicamente para visualizar cómo debería verse una curva aproximadamente lineal y comprobar la lógica de los gráficos. Esos valores no deben copiarse como resultados del laboratorio.</p></div>
  </div>
  <div class="qb-callout"><b>Durante el laboratorio conviene registrar:</b> absorbancia cruda de cada estándar, absorbancia de cada incógnita, dilución aplicada a cada incógnita, cualquier punto que se aparte claramente de la zona lineal y cualquier modificación real del protocolo.</div>

  <h3>Objetivo operativo del TP</h3>
  <p class="highlightable" data-block-id="qb:tp1:objective">El trabajo práctico compara dos ensayos con sensibilidades muy diferentes. En Biuret se trabaja en el orden de décimas de miligramo; en Bradford, en el orden de microgramos. En ambos casos la concentración incógnita no surge de una absorbancia aislada: depende de una <strong>curva de calibración adecuada</strong>, del rango lineal y, cuando corresponda, de la corrección por dilución.</p>

  <details class="qb-tp-details"><summary>Información de la clase práctica 2026</summary><div><p>El material del campus indica que el TP1 se realiza el jueves 20 de agosto a las 13:30. El encuentro comienza con una explicación introductoria en el aula 19 del Edificio Tornavías y luego continúa en el Laboratorio de Biología y Química. Se recomienda llevar una copia impresa de la guía, guardapolvo y rotulador.</p></div></details>
</section>`;

  const TERMS={
    'métodos generales':'Métodos que estiman la cantidad total de proteínas mediante una propiedad compartida por muchas proteínas, sin identificar una proteína particular.',
    'métodos específicos':'Métodos que detectan o cuantifican una proteína particular mediante una propiedad o reconocimiento selectivo.',
    'métodos directos':'Métodos que obtienen la señal a partir de una propiedad óptica propia de la proteína o de sus enlaces, sin generar primero un producto coloreado con otro reactivo.',
    'métodos indirectos':'Métodos en los que la proteína reacciona o se asocia con un reactivo para generar una señal cuantificable relacionada con su cantidad.',
    'absorbancia':'Magnitud adimensional que expresa cuánto se atenúa la luz al atravesar una muestra a una longitud de onda determinada.',
    'ley de Lambert–Beer':'Relación lineal ideal A = ε·b·C entre absorbancia, absortividad, camino óptico y concentración.',
    'absortividad':'Constante que relaciona la capacidad de una especie para absorber radiación con su concentración y el camino óptico.',
    'unión peptídica':'Enlace amida que une el grupo carboxilo de un aminoácido con el grupo amino del siguiente en una cadena peptídica.',
    'Folin–Ciocalteau':'Reactivo oxidante empleado en Lowry cuya reducción genera una coloración azul cuantificable.',
    'Coomassie Brilliant Blue G-250':'Colorante utilizado en Bradford que cambia su estado espectral al asociarse con proteínas y produce una señal intensa a 595 nm.',
    'blanco':'Tubo de referencia sin proteína utilizado para estimar la señal basal del sistema y corregir las lecturas.',
    'corrección por blanco':'Resta de la absorbancia del blanco a la absorbancia medida para obtener la señal atribuible al analito.',
    'curva de calibración':'Relación experimental entre una señal medida y cantidades conocidas de un estándar, utilizada para determinar una muestra incógnita.',
    'rango lineal':'Intervalo de cantidades o concentraciones en el que la señal conserva una relación aproximadamente lineal con el analito.',
    'factor f':'Inverso de la pendiente de una curva lineal cuando se trabaja con el esquema x = A·f y la ordenada al origen es despreciable.',
    'factor de dilución':'Factor multiplicativo que permite recuperar la concentración original a partir de una muestra que fue diluida antes de medirse.',
    'BSA':'Seroalbúmina bovina utilizada como estándar de concentración conocida para construir las curvas del TP.'
  };

  const STYLE=`<style id="qb-tp1-extension-style">
    .qb-tp1-chapter{scroll-margin-top:24px}
    .qb-tp-method-map{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:16px 0 22px}
    .qb-tp-method-card{border:1px solid var(--qb-border);background:var(--qb-surface);border-radius:16px;padding:14px;display:grid;gap:5px}
    .qb-tp-badge{display:inline-flex;width:max-content;padding:3px 8px;border-radius:999px;background:var(--qb-accent-soft);color:var(--qb-accent-strong);font-size:.78rem;font-weight:800;letter-spacing:.02em}
    .qb-tp-protocol{display:grid;grid-template-columns:auto 1fr;gap:9px 12px;align-items:start;margin:14px 0 20px}
    .qb-tp-protocol>span{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--qb-accent);color:white;font-weight:800}
    .qb-tp-protocol>p{margin:3px 0}
    .qb-tp-table-wrap{overflow-x:auto;margin:14px 0 22px;border:1px solid var(--qb-border);border-radius:16px;background:var(--qb-surface)}
    .qb-tp-table{border-collapse:collapse;width:100%;min-width:720px;font-size:.92rem}
    .qb-tp-table-compact{min-width:560px}
    .qb-tp-table th,.qb-tp-table td{padding:10px 12px;border-bottom:1px solid var(--qb-border);border-right:1px solid var(--qb-border);vertical-align:top}
    .qb-tp-table th:last-child,.qb-tp-table td:last-child{border-right:0}.qb-tp-table tr:last-child td{border-bottom:0}
    .qb-tp-table th{background:var(--qb-accent-soft);color:var(--qb-accent-strong);text-align:left;font-weight:800}
    .qb-tp-details{margin:20px 0;border:1px solid var(--qb-border);border-radius:14px;background:var(--qb-surface);overflow:hidden}
    .qb-tp-details summary{cursor:pointer;padding:13px 15px;font-weight:800;color:var(--qb-accent-strong)}.qb-tp-details>div{padding:0 15px 14px}
    .solved-tp1-term{display:inline;color:inherit;text-decoration-line:underline;text-decoration-style:dotted;text-decoration-thickness:1.5px;text-underline-offset:3px;text-decoration-color:color-mix(in srgb,var(--qb-accent) 68%,transparent);border-radius:.35em;cursor:pointer;transition:background .15s ease,color .15s ease;-webkit-tap-highlight-color:transparent}
    .solved-tp1-term:hover,.solved-tp1-term:focus-visible,.solved-tp1-term[aria-expanded="true"]{background:var(--qb-accent-soft);color:var(--qb-accent-strong);outline:none}
    @media(max-width:720px){.qb-tp-method-map{grid-template-columns:1fr}.qb-tp-table{font-size:.86rem}}
  </style>`;

  function inject(html){
    let out=String(html||'');
    out=out.replace('Aminoácidos, proteínas, enzimas, purificación y electroforesis','Aminoácidos, proteínas, cuantificación, enzimas, purificación y electroforesis');
    out=out.replace('15 capítulos','16 capítulos');
    out=out.replace('Resumen integrado de Química Biológica · Proteínas, métodos y enzimas','Resumen integrado de Química Biológica · Proteínas, métodos, TP1 y enzimas');
    if(!out.includes('href="#cap-tp1"')){
      if(out.includes('href="#cap14"')) out=out.replace(/(<a href="#cap14"[\s\S]*?<\/a>)/i,'<a href="#cap-tp1">TP1. Determinación de proteínas</a>\n    $1');
      else out=out.replace(/(<a href="#cap13"[\s\S]*?<\/a>)/i,'$1\n    <a href="#cap-tp1">TP1. Determinación de proteínas</a>');
    }
    if(!out.includes('id="cap-tp1"')){
      if(out.includes('id="cap14"')) out=out.replace(/(<section class="qb-chapter" id="cap14">)/i,CHAPTER+'\n\n$1');
      else out=out.replace(/(<footer class="qb-footer")/i,CHAPTER+'\n\n  $1');
    }
    if(!out.includes('qb-tp1-extension-style')) out=out.replace(/<\/head>/i,STYLE+'</head>');
    return out;
  }

  function norm(text){return String(text||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim()}
  function existingConcept(root,term){const target=norm(term);return [...root.querySelectorAll('.solved-concept-term,.solved-enzyme-term,.solved-tp1-term')].some(el=>norm(el.textContent)===target)}
  function wrapFirst(root,term,definition){
    if(existingConcept(root,term))return;
    const target=norm(term);
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){const p=node.parentElement;if(!p||p.closest('script,style,math,.solved-concept-term,.solved-enzyme-term,.solved-tp1-term'))return NodeFilter.FILTER_REJECT;return norm(node.nodeValue).includes(target)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
    const node=walker.nextNode();if(!node)return;
    const raw=node.nodeValue,plain=raw.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    const needle=term.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    const i=plain.indexOf(needle);if(i<0)return;
    const span=document.createElement('span');span.className='solved-tp1-term';span.tabIndex=0;span.setAttribute('role','button');span.dataset.conceptTitle=term;span.dataset.conceptDefinition=definition;span.textContent=raw.slice(i,i+term.length);
    const frag=document.createDocumentFragment();frag.append(document.createTextNode(raw.slice(0,i)),span,document.createTextNode(raw.slice(i+term.length)));node.replaceWith(frag);
  }

  function ensureTerms(){const area=document.querySelector('#cap-tp1');if(!area)return;Object.entries(TERMS).forEach(([term,definition])=>wrapFirst(area,term,definition))}
  function wireTerms(){
    const root=document.querySelector('.qb-summary');if(!root||root.dataset.tp1GlossaryBound==='1')return;root.dataset.tp1GlossaryBound='1';
    let pop=document.getElementById('solvedTp1Popover');if(!pop){pop=document.createElement('div');pop.id='solvedTp1Popover';pop.className='solved-concept-popover';pop.setAttribute('role','dialog');pop.innerHTML='<button class="solved-concept-close" type="button" aria-label="Cerrar">×</button><p class="solved-concept-kicker">Concepto · TP1</p><h4 class="solved-concept-title"></h4><p class="solved-concept-definition"></p>';document.body.append(pop)}
    const title=pop.querySelector('.solved-concept-title'),def=pop.querySelector('.solved-concept-definition'),close=pop.querySelector('.solved-concept-close');let current=null;
    const hide=()=>{pop.classList.remove('open');current?.setAttribute('aria-expanded','false');current=null};
    const show=el=>{current?.setAttribute('aria-expanded','false');current=el;el.setAttribute('aria-expanded','true');title.textContent=el.dataset.conceptTitle||el.textContent;def.textContent=el.dataset.conceptDefinition||'';pop.classList.add('open');requestAnimationFrame(()=>{const r=el.getBoundingClientRect(),w=pop.offsetWidth||360,h=pop.offsetHeight||160,pad=12;let left=Math.min(Math.max(pad,r.left+r.width/2-w/2),innerWidth-w-pad);let top=r.bottom+10,side='bottom';if(top+h>innerHeight-pad){top=Math.max(pad,r.top-h-10);side='top'}pop.dataset.side=side;pop.style.left=left+'px';pop.style.top=top+'px';pop.style.setProperty('--solved-arrow-left',Math.max(18,Math.min(w-28,r.left+r.width/2-left-6))+'px')})};
    root.addEventListener('click',e=>{const el=e.target.closest('.solved-tp1-term');if(el&&root.contains(el)){e.preventDefault();e.stopPropagation();current===el?hide():show(el);return}if(!pop.contains(e.target))hide()});
    root.addEventListener('keydown',e=>{const el=e.target.closest('.solved-tp1-term');if(el&&(e.key==='Enter'||e.key===' ')){e.preventDefault();current===el?hide():show(el)}if(e.key==='Escape')hide()});
    close.addEventListener('click',hide);window.addEventListener('resize',hide,{passive:true});window.addEventListener('scroll',()=>{if(current)hide()},{passive:true});
  }

  function after(){ensureTerms();wireTerms()}
  window.SOLVED_QB_TP1={version:VERSION,transform:inject,after};
})();
