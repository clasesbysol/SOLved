(()=>{
  'use strict';
  const VERSION='3.4.0';
  const PROMPT=`<div class="qb-callout qb-callout-key qb-build-rule" id="qbBuildRule"><b>Criterio fijo para ampliar este resumen:</b> cada clase de Química Biológica se procesa como un conjunto de fuentes complementarias: el PDF 1 contiene las diapositivas o teórico base y debe revisarse completo, incluyendo texto, fórmulas, tablas, gráficos y contenido visual; el PDF 2 desarrolla esas mismas diapositivas y debe incorporarse íntegramente para transformar el esquema del PDF 1 en un texto de estudio autosuficiente, sin perder ejemplos, fundamentos, cálculos ni aclaraciones docentes; el PDF 3 suele contener la guía de ejercicios y debe copiarse completa, resolverse paso a paso y añadirse a una sección o carpeta de Ejercicios análoga a las existentes. Toda incorporación debe conservar el estilo de redacción, diseño, jerarquía visual y herramientas de este HTML, sumar uno o más capítulos propios y sus accesos en el índice lateral, mantener los conceptos técnicos nuevos subrayados con definición interactiva, preservar los bloques resaltables y la sincronización nativa de SOLved, no eliminar ni adelgazar contenido académico previo, evitar cambios que reposicionen la lectura y, antes de publicar, comprobar que la totalidad de las fuentes quedó representada y que el lector permanece en la posición donde estaba leyendo.</div>`;

  const CHAPTERS=`
<section class="qb-chapter" id="cap14">
  <div class="qb-chapter-number">14</div>
  <h2>Enzimas I: catálisis, energía libre, sitio activo y clasificación</h2>
  <p class="highlightable" data-block-id="qb:c14:scope">En esta y las dos clases siguientes el foco pasa a un tipo particular de proteínas: las <strong>enzimas</strong>. El objetivo inmediato es comprender sus propiedades generales y su cinética; este marco servirá después para estudiar las enzimas que participan en las principales vías metabólicas. La presencia de enzimas es esencial para la vida porque muchas reacciones termodinámicamente posibles serían, sin catálisis, demasiado lentas para sostener un organismo.</p>

  <h3>Por qué la vida necesita catalizadores biológicos</h3>
  <p class="highlightable" data-block-id="qb:c14:sugar">Un terrón de azúcar está formado por sacarosa. La sacarosa puede oxidarse espontáneamente con el O<sub>2</sub> del aire hasta CO<sub>2</sub>, transfiriendo energía a los alrededores, pero sin ayuda el proceso es extremadamente lento. Si se la calienta con una llama puede caramelizarse; si se la cubre con ceniza y se la enciende, la ceniza actúa como catalizador inorgánico y acelera la combustión a alta temperatura. Ese mecanismo no sería compatible con la vida. Las enzimas permiten que transformaciones equivalentes ocurran a la temperatura del organismo y en fracciones de segundo.</p>
  <div class="qb-callout qb-callout-key"><b>Idea central:</b> una reacción puede ser espontánea desde el punto de vista termodinámico y, aun así, ser prácticamente inútil biológicamente si su velocidad es demasiado baja. Las enzimas resuelven el problema cinético.</div>
  <p class="highlightable" data-block-id="qb:c14:rate-enhancement">La magnitud de la aceleración puede abarcar muchísimos órdenes de magnitud. En los ejemplos del teórico aparecen incrementos desde 10<sup>5</sup> hasta 10<sup>17</sup> veces. La orotidina monofosfato descarboxilasa cataliza su reacción aproximadamente 10<sup>17</sup> veces más rápido que la reacción no catalizada.</p>

  <h3>Energía interna, calor y trabajo</h3>
  <p class="highlightable" data-block-id="qb:c14:internal-energy">Antes de analizar qué hacen las enzimas se define la <strong>energía interna, U</strong>, como la suma de las energías cinéticas asociadas al movimiento y las energías potenciales, incluidas las de los enlaces químicos, de todas las moléculas del sistema.</p>
  <div class="qb-equation"><math display="block"><mrow><mi>U</mi><mo>=</mo><mo>∑</mo><mfenced><mrow><msub><mi>E</mi><mi>c</mi></msub><mo>+</mo><msub><mi>E</mi><mi>p</mi></msub></mrow></mfenced></mrow></math></div>
  <div class="qb-equation"><math display="block"><mrow><mi>ΔU</mi><mo>=</mo><msub><mi>U</mi><mi>f</mi></msub><mo>−</mo><msub><mi>U</mi><mi>i</mi></msub></mrow></math></div>
  <p class="highlightable" data-block-id="qb:c14:heat">Un cambio de energía interna implica intercambio de energía con los alrededores. Sólo existen dos formas de transferencia: <strong>calor, q</strong>, cuando la transferencia se debe a una diferencia de temperatura, y <strong>trabajo, w</strong>, cuando no depende de esa diferencia. Si un tubo con agua fría se coloca en un baño a 60 °C, el baño transfiere calor al tubo hasta el equilibrio térmico y, tomando al tubo como sistema, ΔU es positivo. Si el tubo cediera energía al baño, ΔU sería negativo.</p>
  <p class="highlightable" data-block-id="qb:c14:work">Como ejemplo de trabajo, un gas en un cilindro puede estar equilibrado por pesas. Al quitar pesas, el gas se expande contra la presión externa, realiza trabajo sobre los alrededores y pierde energía interna: ΔU &lt; 0. Al agregar pesas se realiza trabajo sobre el gas, este se comprime y ΔU &gt; 0. Calor y trabajo no son entidades almacenables: son procesos de transferencia; la propiedad que conserva el sistema es la energía interna.</p>
  <div class="qb-equation"><math display="block"><mrow><mi>ΔU</mi><mo>=</mo><mi>q</mi><mo>+</mo><mi>w</mi></mrow></math></div>
  <p class="highlightable" data-block-id="qb:c14:first-law">Esta expresión resume la primera ley de la termodinámica: la energía interna que un sistema gana o pierde coincide con la energía transferida en forma de calor y trabajo, con el signo correspondiente a la convención utilizada.</p>

  <h3>Trabajo de expansión y trabajo útil</h3>
  <p class="highlightable" data-block-id="qb:c14:work-types">Se distinguen dos grandes tipos de trabajo. El <strong>trabajo de expansión</strong> es trabajo mecánico asociado, por ejemplo, a la expansión de un gas contra una presión externa. El <strong>trabajo útil</strong> es todo trabajo diferente del de expansión: puede ser mecánico no expansivo, eléctrico, magnético u osmótico. Esta distinción permite interpretar luego la magnitud de la energía libre de Gibbs.</p>

  <h3>Energía libre de Gibbs y espontaneidad</h3>
  <p class="highlightable" data-block-id="qb:c14:gibbs">La <strong>energía libre de Gibbs, G</strong>, es una propiedad del sistema reaccionante, no una propiedad particular de las enzimas. Depende, entre otras variables, de la estructura y la concentración de las especies. En una reacción química la suma de energías libres de reactantes y productos evoluciona hacia un mínimo en el equilibrio.</p>
  <div class="qb-equation"><math display="block"><mrow><msub><mi>R</mi><mn>1</mn></msub><mo>+</mo><msub><mi>R</mi><mn>2</mn></msub><mo>⇌</mo><msub><mi>P</mi><mn>1</mn></msub><mo>+</mo><msub><mi>P</mi><mn>2</mn></msub></mrow></math></div>
  <div class="qb-equation"><math display="block"><mrow><mi>ΔG</mi><mo>=</mo><mo>∑</mo><msub><mi>G</mi><mi>f</mi></msub><mo>−</mo><mo>∑</mo><msub><mi>G</mi><mi>i</mi></msub></mrow></math></div>
  <p class="qb-muted">La relación anterior se considera a presión y temperatura constantes.</p>
  <div class="qb-equation"><math display="block"><mrow><mi>ΔG</mi><mo>=</mo><msup><mi>ΔG′</mi><mo>°</mo></msup><mo>+</mo><mi>R</mi><mi>T</mi><mi>ln</mi><mi>Q</mi></mrow></math></div>
  <div class="qb-equation"><math display="block"><mrow><mi>Q</mi><mo>=</mo><mfrac><mrow><mo>[</mo><msub><mi>P</mi><mn>1</mn></msub><mo>]</mo><mo>[</mo><msub><mi>P</mi><mn>2</mn></msub><mo>]</mo></mrow><mrow><mo>[</mo><msub><mi>R</mi><mn>1</mn></msub><mo>]</mo><mo>[</mo><msub><mi>R</mi><mn>2</mn></msub><mo>]</mo></mrow></mfrac></mrow></math></div>
  <p class="highlightable" data-block-id="qb:c14:gibbs-standard">El término ΔG′° depende de la naturaleza del sistema reaccionante e incluye información vinculada a la constante de equilibrio; el término RT ln Q incorpora las concentraciones instantáneas de reactantes y productos. <strong>Las enzimas no modifican ni el equilibrio ni el ΔG de una reacción.</strong> Aceleran la llegada al equilibrio, pero no cambian la posición del equilibrio.</p>

  <div class="qb-two-col">
    <div><h4>ΔG &lt; 0</h4><p>La reacción es espontánea en el sentido escrito y es <b>exergónica</b>. La magnitud de ΔG representa el trabajo útil máximo que potencialmente puede entregar.</p></div>
    <div><h4>ΔG = 0</h4><p>El sistema está en equilibrio. No existe impulso termodinámico neto ni trabajo útil neto puesto en juego.</p></div>
  </div>
  <div class="qb-callout"><b>ΔG &gt; 0:</b> la reacción no es espontánea en el sentido escrito y es <b>endergónica</b>; su magnitud representa el trabajo útil que debe suministrarse al sistema para que avance en ese sentido.</div>
  <p class="highlightable" data-block-id="qb:c14:q-example">Para una reacción con K<sub>eq</sub> = 1, si se parte idealmente sólo de reactivos, Q = 0, ln Q → −∞ y ΔG → −∞: el proceso es espontáneo. Si se parte del equilibrio, Q = K<sub>eq</sub> y ΔG = 0. Si se parte sólo de productos, Q → ∞ y ΔG → +∞: la reacción no es espontánea en el sentido escrito, sino en el inverso. ΔG es independiente del tiempo y del camino seguido.</p>

  <h3>Energía de activación y estado de transición</h3>
  <p class="highlightable" data-block-id="qb:c14:activation">Toda reacción puede representarse mediante un perfil de energía libre frente a la coordenada de reacción. La <strong>energía de activación</strong> es la barrera que debe superarse para pasar de reactivos a productos. Corresponde a la diferencia de energía libre entre el <strong>estado de transición</strong> —especie fugaz de máxima energía libre— y los reactivos.</p>
  <div class="qb-equation"><math display="block"><mrow><msup><mi>ΔG</mi><mo>‡</mo></msup><mo>=</mo><msub><mi>G</mi><mtext>estado de transición</mtext></msub><mo>−</mo><msub><mi>G</mi><mtext>reactivos</mtext></msub></mrow></math></div>
  <p class="highlightable" data-block-id="qb:c14:catalysis">Las enzimas disminuyen ΔG‡ porque facilitan la formación del estado de transición. En el mismo perfil energético, la reacción catalizada y la no catalizada poseen el mismo ΔG global: sólo difiere la altura de la barrera.</p>
  <div class="qb-equation"><math display="block"><mrow><msup><mi>ΔG</mi><mo>‡</mo></msup><msub><mtext>catalizada</mtext><mrow></mrow></msub><mo>&lt;</mo><msup><mi>ΔG</mi><mo>‡</mo></msup><msub><mtext>no catalizada</mtext><mrow></mrow></msub></mrow></math></div>
  <div class="qb-equation"><math display="block"><mrow><msub><mi>ΔG</mi><mtext>catalizada</mtext></msub><mo>=</mo><msub><mi>ΔG</mi><mtext>no catalizada</mtext></msub></mrow></math></div>
  <p class="highlightable" data-block-id="qb:c14:arrhenius">Para la forma simplificada mostrada en la clase, v = k[S]. La constante de velocidad sigue una relación de Arrhenius: al disminuir exponencialmente la barrera de activación aumenta k y, por lo tanto, aumenta mucho la velocidad.</p>
  <div class="qb-equation"><math display="block"><mrow><mi>v</mi><mo>=</mo><mi>k</mi><mo>[</mo><mi>S</mi><mo>]</mo></mrow></math></div>
  <div class="qb-equation"><math display="block"><mrow><mi>k</mi><mo>=</mo><mi>A</mi><msup><mi>e</mi><mrow><mo>−</mo><mfrac><msup><mi>ΔG</mi><mo>‡</mo></msup><mrow><mi>R</mi><mi>T</mi></mrow></mfrac></mrow></msup></mrow></math></div>

  <h3>Choques efectivos en ausencia de enzimas</h3>
  <p class="highlightable" data-block-id="qb:c14:collisions">Sin enzima, la reacción requiere <strong>choques efectivos</strong> entre los reactivos: colisiones con energía y orientación adecuadas para alcanzar el estado de transición. La velocidad depende del número de choques efectivos por unidad de tiempo. Al aumentar la temperatura aumenta la energía cinética molecular, crece el número de choques efectivos y aumenta la velocidad. La energía necesaria para llegar al estado de transición proviene de esas colisiones.</p>

  <h3>Sitio activo: fijación, catálisis y geometría</h3>
  <p class="highlightable" data-block-id="qb:c14:active-site">En las reacciones catalizadas los sustratos se unen al <strong>sitio activo</strong>, una hendidura tridimensional que ocupa un volumen relativamente pequeño de la enzima. Está formada por residuos que pueden estar muy alejados en la secuencia primaria y que convergen gracias al plegamiento de la estructura terciaria.</p>
  <div class="qb-steps">
    <div><b>Sitio de fijación</b><span>Residuos que reconocen y unen estereoespecíficamente al sustrato mediante interacciones débiles: puentes de H, puentes salinos e interacciones hidrofóbicas.</span></div>
    <div><b>Sitio catalítico</b><span>Residuos directamente implicados en ruptura y formación de enlaces y en la estabilización/formación del estado de transición; en algunos mecanismos forman enlaces covalentes transitorios con el sustrato.</span></div>
    <div><b>Residuos estructurales</b><span>Mantienen la geometría tridimensional correcta del sitio activo sin tener que interactuar directamente con el sustrato.</span></div>
  </div>
  <p class="highlightable" data-block-id="qb:c14:binding-energy">Cada interacción débil favorable libera una pequeña cantidad de energía libre denominada <strong>energía de fijación</strong>. En conjunto constituye una fuente central de la energía que permite estabilizar el estado de transición, disminuir la barrera de activación y, simultáneamente, generar especificidad.</p>

  <h3>Ejemplo molecular: metanol deshidrogenasa</h3>
  <p class="highlightable" data-block-id="qb:c14:mdh">La metanol deshidrogenasa utiliza <strong>PQQ, pirroloquinolino quinona</strong>, una o-quinona tricíclica aromática que funciona como grupo prostético. El Ca<sup>2+</sup> también forma parte del sitio activo: está hexacoordinado, favorece la desprotonación del metanol, polariza el carbonilo reactivo de PQQ y mantiene correctamente orientados los componentes catalíticos.</p>
  <p class="highlightable" data-block-id="qb:c14:mdh-residues"><b>Asp303</b> funciona como base catalítica que extrae H<sup>+</sup> del metanol. <b>Glu177</b> es esencial y coordina directamente al Ca<sup>2+</sup> mediante sus dos oxígenos. <b>Cys103–Cys104</b> forman un puente disulfuro adyacente inusual, situado sobre PQQ, que participa en la transferencia electrónica hacia un citocromo. <b>Trp243</b> forma el suelo de la cámara del sitio activo; <b>Trp265</b> y <b>Trp289</b>, no mostrados en la figura, estabilizan los anillos de PQQ mediante interacciones de apilamiento π.</p>
  <p class="highlightable" data-block-id="qb:c14:mdh-water">La molécula de agua <b>HOH362</b> se coordina con Ca<sup>2+</sup> y forma un puente de H con PQQ. Su función principal es conservar la orientación precisa entre el metal y el grupo prostético para que el metanol pueda ingresar y reaccionar.</p>

  <h3>Llave-cerradura frente a ajuste inducido</h3>
  <p class="highlightable" data-block-id="qb:c14:koshland">El modelo de Koshland se ilustra con una varilla metálica magnética que debe doblarse antes de romperse. Sin catalizador la deformación exige una barrera alta. Si el sitio activo fuera perfectamente complementario a la varilla sin deformar —modelo de llave-cerradura— sus imanes estabilizarían demasiado al sustrato y dificultarían que se doblara hasta el estado de transición.</p>
  <p class="highlightable" data-block-id="qb:c14:induced-fit">En el <strong>modelo de ajuste inducido</strong>, el complejo E–S inicial se establece con pocas interacciones; a medida que el sustrato se aproxima al estado de transición se forman interacciones débiles adicionales, cuya energía de fijación estabiliza especialmente ese estado. Así disminuye ΔG‡ y aumenta la velocidad. La complementariedad con el estado de transición también explica la especificidad: una molécula competidora no puede reproducir con la misma precisión todas las interacciones requeridas.</p>

  <h3>Hexoquinasa: fundamento estructural del ajuste inducido</h3>
  <p class="highlightable" data-block-id="qb:c14:hexokinase-open">La hexoquinasa es el ejemplo histórico. Posee un dominio grande y uno pequeño separados por una hendidura profunda. Sin glucosa adopta una conformación abierta: los dominios están separados, el sitio activo queda expuesto al solvente y los residuos de ambos lóbulos están demasiado lejos para catalizar con eficiencia la transferencia de fosfato desde ATP hacia glucosa. Además, un sitio activo lleno de agua favorecería la hidrólisis improductiva del ATP.</p>
  <p class="highlightable" data-block-id="qb:c14:hexokinase-close">Al unirse glucosa, un lóbulo rota aproximadamente 12° respecto del otro y se producen desplazamientos de hasta 8 Å en la cadena polipeptídica. La hendidura se cierra alrededor del sustrato. El cierre coloca los residuos catalíticos en la geometría correcta y excluye el agua, evitando la hidrólisis del ATP y favoreciendo la transferencia específica del grupo fosforilo a la glucosa.</p>

  <h3>Características generales de una enzima</h3>
  <div class="qb-two-col"><div><h4>Como catalizador</h4><p>Actúa en pequeña proporción respecto de los sustratos; no sufre alteración cualitativa ni cuantitativa neta al finalizar el proceso; no modifica K<sub>eq</sub> ni ΔG.</p></div><div><h4>Como proteína</h4><p>Es regulable, eficiente en condiciones suaves de temperatura y pH, específica, saturable porque posee un número limitado de sitios activos y susceptible de desnaturalización.</p></div></div>

  <h3>Clasificación y nomenclatura IUBMB</h3>
  <p class="highlightable" data-block-id="qb:c14:classification">Para evitar ambigüedades, el Comité de Nomenclatura de la IUBMB asigna a cada enzima un <strong>código EC de cuatro números</strong>, un nombre sistemático que identifica la reacción y un nombre recomendado o común. El sistema reconoce siete clases, subdivididas sucesivamente hasta identificar la reacción específica.</p>
  <div class="qb-table-wrap"><table class="qb-data-table"><thead><tr><th>Clase</th><th>Tipo de reacción</th></tr></thead><tbody>
    <tr><td><b>1 · Oxidorreductasas</b></td><td>Catalizan reacciones de oxidación-reducción.</td></tr>
    <tr><td><b>2 · Transferasas</b></td><td>Transfieren un grupo químico distinto del H desde un sustrato hacia otro.</td></tr>
    <tr><td><b>3 · Hidrolasas</b></td><td>Transfieren un grupo químico al agua; catalizan hidrólisis.</td></tr>
    <tr><td><b>4 · Liasas o sintasas</b></td><td>Rompen de manera no hidrolítica enlaces C–C, C–N, C–O o C–S, o catalizan la reacción inversa formando esos enlaces.</td></tr>
    <tr><td><b>5 · Isomerasas</b></td><td>Catalizan la interconversión de isómeros.</td></tr>
    <tr><td><b>6 · Ligasas o sintetasas</b></td><td>Unen dos sustratos formando enlaces C–C, C–N, C–O o C–S con hidrólisis simultánea de un nucleósido trifosfato.</td></tr>
    <tr><td><b>7 · Translocasas</b></td><td>Catalizan el movimiento de iones o moléculas a través de membranas.</td></tr>
  </tbody></table></div>

  <h3>Ejemplo de código: hexoquinasa</h3>
  <div class="qb-equation"><math display="block"><mrow><mi>ATP</mi><mo>+</mo><mtext>glucosa</mtext><mo>→</mo><mi>ADP</mi><mo>+</mo><mtext>glucosa-6-fosfato</mtext></mrow></math></div>
  <p class="highlightable" data-block-id="qb:c14:ec-example">Nombre recomendado: <b>hexoquinasa</b>. Nombre sistemático: <b>ATP:D-hexosa 6-fosfotransferasa</b>. Código: <b>EC 2.7.1.1</b>. El primer 2 indica transferasa; 7, fosfotransferasa; el primer 1, fosfotransferasa que utiliza un grupo hidroxilo como aceptor; el último 1 identifica a la D-glucosa como aceptor del grupo fosforilo.</p>
</section>

<section class="qb-chapter" id="cap15">
  <div class="qb-chapter-number">15</div>
  <h2>Cinética enzimática I: velocidad inicial, concentración de enzima y actividad</h2>
  <p class="highlightable" data-block-id="qb:c15:kinetics">La <strong>cinética enzimática</strong> estudia las velocidades de las reacciones catalizadas por enzimas y los factores que las modifican. Para una transformación hipotética S → P, la mezcla de reacción debe estar definida: buffer y fuerza iónica, pH, concentración de sustrato, cantidad de enzima, posibles cofactores, activadores o inhibidores y temperatura. La reacción se inicia, por ejemplo, al añadir la enzima o el sustrato, y se registra [S] o [P] en función del tiempo.</p>
  <div class="qb-equation"><math display="block"><mrow><mi>v</mi><mo>=</mo><mfrac><mrow><mi>d</mi><mo>[</mo><mi>P</mi><mo>]</mo></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>=</mo><mo>−</mo><mfrac><mrow><mi>d</mi><mo>[</mo><mi>S</mi><mo>]</mo></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac></mrow></math></div>
  <p class="highlightable" data-block-id="qb:c15:slope">La velocidad se informa como magnitud positiva. Gráficamente es la pendiente de la tangente a la curva concentración-tiempo en el instante considerado. Puede expresarse por volumen de mezcla o como cantidad total transformada por unidad de tiempo.</p>
  <div class="qb-equation"><math display="block"><mrow><mfrac><mi>mM</mi><mi>min</mi></mfrac><mo>=</mo><mfrac><mi>mmol</mi><mrow><mi>L</mi><mo>·</mo><mi>min</mi></mrow></mfrac><mo>=</mo><mfrac><mi>μmol</mi><mrow><mi>mL</mi><mo>·</mo><mi>min</mi></mrow></mfrac></mrow></math></div>

  <h3>Ejemplo: pasar de velocidad por volumen a velocidad total</h3>
  <p class="highlightable" data-block-id="qb:c15:volume-example">Si una mezcla tiene 3 mL y la velocidad medida es 5 μmol de P por mL y por minuto, cada mililitro produce 5 μmol/min. La producción total de los 3 mL se obtiene multiplicando por el volumen final.</p>
  <div class="qb-equation"><math display="block"><mrow><mn>5</mn><mfrac><mi>μmol</mi><mrow><mi>mL</mi><mo>·</mo><mi>min</mi></mrow></mfrac><mo>×</mo><mn>3</mn><mi>mL</mi><mo>=</mo><mn>15</mn><mfrac><mi>μmol</mi><mi>min</mi></mfrac></mrow></math></div>
  <p class="highlightable" data-block-id="qb:c15:activity-step">Esta forma de expresar la velocidad como μmol/min suele ser el paso previo para calcular actividad enzimática.</p>

  <h3>Por qué se trabaja con velocidad inicial, v<sub>0</sub></h3>
  <p class="highlightable" data-block-id="qb:c15:v0">La velocidad utilizada habitualmente es la <strong>velocidad inicial, v<sub>0</sub></strong>. Al comienzo de una reacción reversible [P] es despreciable, por lo que se minimiza la reacción inversa; también se reduce la inhibición por producto y el efecto de una eventual inactivación progresiva de la enzima. Durante segundos o minutos, v<sub>0</sub> suele mantenerse aproximadamente constante y puede medirse con facilidad.</p>
  <div class="qb-callout qb-callout-key"><b>Factores que afectan v<sub>0</sub>:</b> concentración de enzima, pH y fuerza iónica, temperatura, concentración de sustrato, activadores, inhibidores y cofactores —coenzimas y grupos prostéticos—.</div>

  <h3>Efecto de la concentración de enzima</h3>
  <p class="highlightable" data-block-id="qb:c15:enzyme-concentration">Con sustrato saturante y gran exceso de sustrato respecto de enzima existe un intervalo donde v<sub>0</sub> es directamente proporcional a la concentración de enzima funcional en la mezcla. Si la cantidad de enzima aumenta demasiado, el sustrato deja de estar en exceso, se vuelve limitante y la proporcionalidad se pierde. Al poner a punto un ensayo se debe trabajar dentro del rango lineal.</p>
  <div class="qb-equation"><math display="block"><mrow><msub><mi>v</mi><mn>0</mn></msub><mo>∝</mo><mo>[</mo><mi>E</mi><mo>]</mo></mrow></math></div>

  <h3>Ejemplo cuantitativo de proporcionalidad</h3>
  <p class="highlightable" data-block-id="qb:c15:e1">En una mezcla final de 3 mL con sustrato saturante se añade 1 μL de un extracto que contiene 1 ng de la enzima. La concentración final es:</p>
  <div class="qb-equation"><math display="block"><mrow><mo>[</mo><msub><mi>E</mi><mn>1</mn></msub><mo>]</mo><mo>=</mo><mfrac><mn>1</mn><mrow><mn>3</mn><mi>mL</mi></mrow></mfrac><mi>ng</mi><mo>=</mo><mn>0.33</mn><mfrac><mi>ng</mi><mi>mL</mi></mfrac></mrow></math></div>
  <p class="highlightable" data-block-id="qb:c15:e1-v">Se supone que en esas condiciones v<sub>0,1</sub> = 15 μmol/min.</p>
  <p class="highlightable" data-block-id="qb:c15:e2">Si se añaden 2 μL del mismo extracto se incorporan 2 ng de enzima:</p>
  <div class="qb-equation"><math display="block"><mrow><mo>[</mo><msub><mi>E</mi><mn>2</mn></msub><mo>]</mo><mo>=</mo><mfrac><mn>2</mn><mrow><mn>3</mn><mi>mL</mi></mrow></mfrac><mi>ng</mi><mo>=</mo><mn>0.67</mn><mfrac><mi>ng</mi><mi>mL</mi></mfrac></mrow></math></div>
  <div class="qb-equation"><math display="block"><mrow><msub><mi>v</mi><mrow><mn>0</mn><mo>,</mo><mn>2</mn></mrow></msub><mo>=</mo><mn>30</mn><mfrac><mi>μmol</mi><mi>min</mi></mfrac></mrow></math></div>
  <p class="highlightable" data-block-id="qb:c15:double">Al duplicarse [E] se duplica v<sub>0</sub>. El gráfico v<sub>0</sub> frente a [E] es lineal sólo dentro del rango donde el sustrato continúa en gran exceso. A concentraciones enzimáticas mayores se subestima la velocidad que correspondería a una proporcionalidad ideal.</p>

  <h3>Unidad enzimática, U</h3>
  <p class="highlightable" data-block-id="qb:c15:unit"><strong>Una unidad enzimática, 1 U</strong>, es la cantidad de enzima que cataliza el consumo o la formación de 1 μmol de sustrato o producto por minuto bajo condiciones definidas. Las condiciones deben declararse porque la actividad depende del ensayo: en el ejemplo, sustrato saturante, pH 7,5, 30 °C y 3 mL de mezcla final.</p>
  <div class="qb-equation"><math display="block"><mrow><mn>1</mn><mi>U</mi><mo>=</mo><mn>1</mn><mfrac><mi>μmol</mi><mi>min</mi></mfrac><mtext> bajo condiciones definidas</mtext></mrow></math></div>

  <h3>Cuánta masa de esta enzima equivale a 1 U</h3>
  <p class="highlightable" data-block-id="qb:c15:unit-calc">En el ejemplo, 1 ng de enzima produce 15 μmol/min, por lo que 1 ng equivale a 15 U. La masa capaz de producir 1 μmol/min se calcula por proporción:</p>
  <div class="qb-equation"><math display="block"><mrow><mi>x</mi><mo>=</mo><mfrac><mrow><mn>1</mn><mi>ng</mi><mo>×</mo><mn>1</mn><mi>U</mi></mrow><mrow><mn>15</mn><mi>U</mi></mrow></mfrac><mo>=</mo><mn>0.0667</mn><mi>ng</mi><mo>≈</mo><mn>0.067</mn><mi>ng</mi></mrow></math></div>
  <p class="highlightable" data-block-id="qb:c15:functional-unit">Por lo tanto, bajo esas condiciones, 1 U corresponde a 0,067 ng de enzima <b>funcionalmente activa</b>. La masa sola no garantiza actividad: si esos 0,067 ng se hierven, la masa permanece pero la proteína puede desnaturalizarse y v<sub>0</sub> puede hacerse cero.</p>

  <h3>Actividad enzimática: concentración funcional de enzima</h3>
  <p class="highlightable" data-block-id="qb:c15:enzyme-activity">Cuando la enzima está en un extracto impuro puede no conocerse su masa exacta. Entonces se expresa su cantidad por su capacidad funcional. La <strong>actividad enzimática</strong> es la cantidad de unidades por volumen de preparación enzimática.</p>
  <div class="qb-equation"><math display="block"><mrow><mtext>Actividad enzimática</mtext><mo>=</mo><mfrac><mi>U</mi><mrow><mi>mL</mi><mtext> de preparación</mtext></mrow></mfrac></mrow></math></div>
  <p class="highlightable" data-block-id="qb:c15:activity-example">Si 1 μL del extracto contiene suficiente enzima para generar 15 μmol/min, ese microlitro contiene 15 U. Como 1 mL = 1000 μL:</p>
  <div class="qb-equation"><math display="block"><mrow><mn>15</mn><mfrac><mi>U</mi><mi>μL</mi></mfrac><mo>×</mo><mn>1000</mn><mfrac><mi>μL</mi><mi>mL</mi></mfrac><mo>=</mo><mn>15000</mn><mfrac><mi>U</mi><mi>mL</mi></mfrac></mrow></math></div>
  <p class="highlightable" data-block-id="qb:c15:functional-concentration">La actividad enzimática puede interpretarse como una medida funcional de la concentración de enzima activa.</p>

  <h3>Actividad específica</h3>
  <p class="highlightable" data-block-id="qb:c15:specific-activity">La <strong>actividad específica</strong> relaciona las unidades de enzima con la masa total de proteínas de la preparación.</p>
  <div class="qb-equation"><math display="block"><mrow><mtext>Actividad específica</mtext><mo>=</mo><mfrac><mi>U</mi><mrow><mi>mg</mi><mtext> de proteína</mtext></mrow></mfrac></mrow></math></div>
  <p class="highlightable" data-block-id="qb:c15:specific-concentrated">Para una preparación con 15000 U/mL y 1 μg/mL de proteínas:</p>
  <div class="qb-equation"><math display="block"><mrow><mn>1</mn><mfrac><mi>μg</mi><mi>mL</mi></mfrac><mo>=</mo><mn>0.001</mn><mfrac><mi>mg</mi><mi>mL</mi></mfrac></mrow></math></div>
  <div class="qb-equation"><math display="block"><mrow><mfrac><mrow><mn>15000</mn><mi>U</mi><mo>/</mo><mi>mL</mi></mrow><mrow><mn>0.001</mn><mi>mg</mi><mo>/</mo><mi>mL</mi></mrow></mfrac><mo>=</mo><mn>1.5</mn><mo>×</mo><msup><mn>10</mn><mn>7</mn></msup><mfrac><mi>U</mi><mi>mg</mi></mfrac></mrow></math></div>
  <p class="highlightable" data-block-id="qb:c15:specific-diluted">Si se prepara un extracto 100 veces más diluido, la actividad baja a 150 U/mL y la concentración de proteínas a 0,00001 mg/mL:</p>
  <div class="qb-equation"><math display="block"><mrow><mfrac><mrow><mn>150</mn><mi>U</mi><mo>/</mo><mi>mL</mi></mrow><mrow><mn>0.00001</mn><mi>mg</mi><mo>/</mo><mi>mL</mi></mrow></mfrac><mo>=</mo><mn>1.5</mn><mo>×</mo><msup><mn>10</mn><mn>7</mn></msup><mfrac><mi>U</mi><mi>mg</mi></mfrac></mrow></math></div>
  <div class="qb-callout qb-callout-key"><b>Conclusión:</b> la actividad enzimática, expresada en U/mL, cambia al concentrar o diluir una preparación. La actividad específica, U/mg de proteína, no cambia por una simple dilución si la enzima conserva su actividad, porque unidades y masa proteica se modifican en la misma proporción.</div>
</section>`;

  const TERMS={
    'enzima':'Proteína —o en algunos casos ARN catalítico— que acelera una reacción al disminuir la barrera de activación sin modificar el ΔG ni la posición del equilibrio.',
    'catálisis':'Aumento de la velocidad de una reacción mediante una vía de menor energía de activación.',
    'energía interna':'Propiedad de un sistema que reúne las contribuciones cinéticas y potenciales de sus partículas.',
    'trabajo útil':'Transferencia de energía en forma de trabajo distinta del trabajo de expansión.',
    'energía libre de Gibbs':'Función termodinámica cuyo cambio, a presión y temperatura constantes, permite evaluar espontaneidad y trabajo útil máximo.',
    'exergónica':'Reacción con ΔG menor que cero; puede entregar trabajo útil al avanzar espontáneamente en el sentido considerado.',
    'endergónica':'Reacción con ΔG mayor que cero; requiere aporte de trabajo para avanzar en el sentido considerado.',
    'energía de activación':'Barrera energética entre reactivos y productos; en este contexto se expresa como la diferencia de energía libre hasta el estado de transición.',
    'estado de transición':'Configuración fugaz de máxima energía libre a lo largo de la coordenada de reacción.',
    'choques efectivos':'Colisiones entre reactivos con energía y orientación adecuadas para permitir la formación del estado de transición.',
    'sitio activo':'Hendidura tridimensional de la enzima donde se unen los sustratos y ocurre la catálisis.',
    'sitio de fijación':'Parte del sitio activo formada por residuos que reconocen y unen estereoespecíficamente al sustrato.',
    'sitio catalítico':'Parte del sitio activo que contiene residuos directamente implicados en la transformación química.',
    'energía de fijación':'Energía libre favorable liberada por interacciones débiles enzima-ligando; contribuye a especificidad y estabilización del estado de transición.',
    'grupo prostético':'Cofactor unido de manera estrecha o permanente a una proteína y necesario para su función.',
    'ajuste inducido':'Modelo en el que la unión del sustrato promueve cambios conformacionales que optimizan la complementariedad con el estado de transición.',
    'código EC':'Código jerárquico de cuatro números que clasifica una enzima según la reacción que cataliza.',
    'cinética enzimática':'Estudio de la velocidad de las reacciones catalizadas por enzimas y de los factores que la modifican.',
    'velocidad inicial':'Velocidad medida al comienzo de la reacción, cuando el producto es muy bajo y se minimizan reacción inversa, inhibición por producto e inactivación.',
    'sustrato saturante':'Concentración de sustrato suficientemente alta para que, en las condiciones del ensayo, la disponibilidad de sustrato no limite la velocidad por la cantidad de enzima usada.',
    'unidad enzimática':'Cantidad de enzima que transforma 1 μmol de sustrato o producto por minuto bajo condiciones experimentales definidas.',
    'actividad enzimática':'Cantidad de unidades enzimáticas por volumen de preparación; mide funcionalmente la concentración de enzima activa.',
    'actividad específica':'Cantidad de unidades enzimáticas por masa total de proteína de una preparación, habitualmente U/mg.'
  };

  const STYLE=`<link rel="stylesheet" href="concept-glossary.css?v=${VERSION}"><style id="qb-enzyme-extension-style">
    .qb-build-rule{margin-top:20px!important;font-size:.9rem;line-height:1.62}
    .solved-enzyme-term{display:inline;color:inherit;text-decoration-line:underline;text-decoration-style:dotted;text-decoration-thickness:1.5px;text-underline-offset:3px;text-decoration-color:color-mix(in srgb,var(--qb-accent) 68%,transparent);border-radius:.35em;cursor:pointer;transition:background .15s ease,color .15s ease;text-decoration-color .15s ease;-webkit-tap-highlight-color:transparent}
    .solved-enzyme-term:hover,.solved-enzyme-term:focus-visible,.solved-enzyme-term[aria-expanded="true"]{background:var(--qb-accent-soft);color:var(--qb-accent-strong);text-decoration-color:currentColor;outline:none}
  </style>`;

  function inject(html){
    let out=String(html||'');
    out=out.replace('Aminoácidos, proteínas, purificación y electroforesis','Aminoácidos, proteínas, enzimas, purificación y electroforesis');
    out=out.replace('13 capítulos','15 capítulos');
    out=out.replace('Resumen integrado de Química Biológica · Proteínas y métodos','Resumen integrado de Química Biológica · Proteínas, métodos y enzimas');
    if(!out.includes('id="qbBuildRule"')) out=out.replace(/(<p class="qb-lead"[\s\S]*?<\/p>)/i,'$1'+PROMPT);
    if(!out.includes('href="#cap14"')) out=out.replace(/(<a href="#cap13"[\s\S]*?<\/a>)/i,'$1\n    <a href="#cap14">14. Enzimas I: catálisis y sitio activo</a>\n    <a href="#cap15">15. Cinética enzimática I</a>');
    if(!out.includes('id="cap14"')) out=out.replace(/(<footer class="qb-footer")/i,CHAPTERS+'\n\n  $1');
    if(!out.includes('qb-enzyme-extension-style')) out=out.replace(/<\/head>/i,STYLE+'</head>');
    out=out.replace(/if\(data\.type===['"]lbt-qbi-section['"]&&data\.section===['"]theory['"]\)findScroll\([^;]*\);/g,'');
    out=out.replace(/if\(data\.type===['"]lbt-qbi-section['"]&&data\.section===['"]program['"]\)findScroll\([^;]*\);/g,'');
    return out;
  }

  function norm(text){return String(text||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim()}
  function existingConcept(root,term){const target=norm(term);return [...root.querySelectorAll('.solved-concept-term,.solved-enzyme-term')].some(el=>norm(el.textContent)===target)}
  function wrapFirst(root,term,definition){
    if(existingConcept(root,term)) return;
    const target=norm(term);
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){const p=node.parentElement;if(!p||p.closest('script,style,math,.solved-concept-term,.solved-enzyme-term'))return NodeFilter.FILTER_REJECT;return norm(node.nodeValue).includes(target)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
    const node=walker.nextNode();if(!node)return;
    const raw=node.nodeValue,plain=raw.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    const needle=term.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    const i=plain.indexOf(needle);if(i<0)return;
    const span=document.createElement('span');span.className='solved-enzyme-term';span.tabIndex=0;span.setAttribute('role','button');span.dataset.conceptTitle=term;span.dataset.conceptDefinition=definition;span.textContent=raw.slice(i,i+term.length);
    const frag=document.createDocumentFragment();frag.append(document.createTextNode(raw.slice(0,i)),span,document.createTextNode(raw.slice(i+term.length)));node.replaceWith(frag);
  }

  function ensureTerms(){const root=document.querySelector('.qb-summary');const area=document.querySelector('#cap14')?.parentElement||root;if(!root||!area)return;Object.entries(TERMS).forEach(([term,definition])=>wrapFirst(area,term,definition))}
  function wireTerms(){
    const root=document.querySelector('.qb-summary');if(!root||root.dataset.enzymeGlossaryBound==='1')return;root.dataset.enzymeGlossaryBound='1';
    let pop=document.getElementById('solvedEnzymePopover');if(!pop){pop=document.createElement('div');pop.id='solvedEnzymePopover';pop.className='solved-concept-popover';pop.setAttribute('role','dialog');pop.innerHTML='<button class="solved-concept-close" type="button" aria-label="Cerrar">×</button><p class="solved-concept-kicker">Concepto · Enzimas I</p><h4 class="solved-concept-title"></h4><p class="solved-concept-definition"></p>';document.body.append(pop)}
    const title=pop.querySelector('.solved-concept-title'),def=pop.querySelector('.solved-concept-definition'),close=pop.querySelector('.solved-concept-close');let current=null;
    const hide=()=>{pop.classList.remove('open');current?.setAttribute('aria-expanded','false');current=null};
    const show=el=>{current?.setAttribute('aria-expanded','false');current=el;el.setAttribute('aria-expanded','true');title.textContent=el.dataset.conceptTitle||el.textContent;def.textContent=el.dataset.conceptDefinition||'';pop.classList.add('open');requestAnimationFrame(()=>{const r=el.getBoundingClientRect(),w=pop.offsetWidth||360,h=pop.offsetHeight||160,pad=12;let left=Math.min(Math.max(pad,r.left+r.width/2-w/2),innerWidth-w-pad);let top=r.bottom+10,side='bottom';if(top+h>innerHeight-pad){top=Math.max(pad,r.top-h-10);side='top'}pop.dataset.side=side;pop.style.left=left+'px';pop.style.top=top+'px';pop.style.setProperty('--solved-arrow-left',Math.max(18,Math.min(w-28,r.left+r.width/2-left-6))+'px')})};
    root.addEventListener('click',e=>{const el=e.target.closest('.solved-enzyme-term');if(el&&root.contains(el)){e.preventDefault();e.stopPropagation();current===el?hide():show(el);return}if(!pop.contains(e.target))hide()});
    root.addEventListener('keydown',e=>{const el=e.target.closest('.solved-enzyme-term');if(el&&(e.key==='Enter'||e.key===' ')){e.preventDefault();current===el?hide():show(el)}if(e.key==='Escape')hide()});
    close.addEventListener('click',hide);window.addEventListener('resize',hide,{passive:true});window.addEventListener('scroll',()=>{if(current)hide()},{passive:true});
  }

  function preserveReadingPosition(){try{history.scrollRestoration='manual'}catch{};const host=document.querySelector('.qb-summary')?.closest('.content-pane');if(host)host.style.overflowAnchor='auto';document.documentElement.style.overflowAnchor='auto'}
  function after(){preserveReadingPosition();ensureTerms();wireTerms()}
  window.SOLVED_QB_ENZYMES={version:VERSION,transform:inject,after};
})();