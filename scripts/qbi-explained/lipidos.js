'use strict';
/* Lípidos I y II · capítulos 42 a 57 del resumen, reescritos para entender el porqué de cada cosa. */
const { F } = require('./figs-lipidos');
const L1 = 'Lípidos I', L2 = 'Lípidos II';

module.exports = [
{
n: 42, group: L1, title: 'Qué son los lípidos y cómo se clasifican',
lead: 'A diferencia de proteínas o glúcidos, los lípidos no comparten una estructura química común: los agrupamos porque se comportan parecido frente al agua. Entender ese comportamiento es la llave de toda la unidad.',
blocks: [
['h', 'Un grupo definido por cómo se lleva con el agua'],
['p', 'Los lípidos son moléculas con <b>regiones hidrocarbonadas grandes</b>, hechas casi solo de C e H. Esas regiones no forman puentes de hidrógeno con el agua, así que los lípidos son <b>muy poco solubles en agua</b> y muy solubles en solventes orgánicos como el cloroformo.'],
['p', 'Algunos son completamente <b>apolares</b> (como los triglicéridos). Otros son <b>anfipáticos</b>: tienen una parte polar (la «cabeza») y una parte apolar (las «colas»). Esa doble personalidad es la que permite armar membranas.'],
['why', 'Porque en química, una «familia» suele ser un grupo con el mismo esqueleto (como los aminoácidos). En los lípidos hay esqueletos muy distintos: glicerol, esfingosina, anillos de esterol, isoprenos. Lo que los une es una propiedad física, la hidrofobicidad, no la estructura.', 'Por qué decimos que no son una familia química'],
['p', 'Para estudiar cualquier lípido conviene hacerse siempre las mismas preguntas: <b>¿qué esqueleto tiene? ¿tiene cabeza polar? ¿cuántas colas? ¿qué forma tiene en conjunto?</b> Las respuestas permiten predecir sus propiedades físicas, y de ahí, su función.'],
['eq', 'estructura química → propiedades físicas → función biológica'],
['fig', F.families, 'Las cinco grandes familias, dibujadas de forma esquemática: el esqueleto, si tienen cabeza y cuántas colas.'],
['h', 'Para qué los usa la célula'],
['table', ['Función', 'Lípidos', 'Por qué sirven para eso'], [
['Reserva de energía', 'Triacilglicéridos (en gotas lipídicas)', 'Están muy reducidos (mucha energía por gramo) y no llevan agua'],
['Membranas', 'Glicerofosfolípidos, esfingolípidos, esteroles, galactolípidos, éter-lípidos', 'Son anfipáticos: se ordenan solos en bicapas'],
['Señalización', 'DAG, PA, ceramida, S1P, fosfoinosítidos, derivados de ω-3 y ω-6', 'Se generan rápido desde lípidos de membrana'],
['Aislamiento e impermeabilización', 'Ceras, acilceramidas de la piel', 'Forman barreras que el agua no atraviesa'],
['Cofactores y pigmentos', 'Vitamina K, retinoides, carotenoides, dolicol', 'Cadenas hidrofóbicas que trabajan dentro de membranas'],
['Anclaje de proteínas', 'GPI, prenilación, miristoilación, palmitoilación', 'La cola lipídica «clava» la proteína en la membrana']
]],
['ex', 'En bacterias aparecen otras soluciones: muchas guardan reserva como gránulos de <b>polihidroxialcanoatos</b> (PHA, por ejemplo PHB, que además sirven para fabricar bioplásticos), y varias usan <b>hopanoides</b>, moléculas parecidas a los esteroles que ordenan su membrana de forma similar (no idéntica) al colesterol.'],
['check', [
['¿Qué tienen en común todos los lípidos?', 'Grandes regiones hidrocarbonadas que los hacen muy poco solubles en agua y solubles en solventes orgánicos.'],
['¿Qué significa anfipático?', 'Que la molécula tiene una parte polar (cabeza) y una parte apolar (colas).'],
['¿Por qué los triacilglicéridos no forman membranas?', 'No tienen cabeza polar: son totalmente apolares, así que no pueden ordenarse con una cara hacia el agua.']
]]
]
},
{
n: 43, group: L1, title: 'Ácidos grasos: cómo leer su nombre y su fórmula',
lead: 'Casi todos los lípidos llevan ácidos grasos. Saber leer su notación es imprescindible: con dos números ya podés predecir si una grasa es sólida o líquida y a qué familia nutricional pertenece.',
blocks: [
['h', 'Qué es un ácido graso'],
['p', 'Un ácido graso es un <b>ácido carboxílico</b> (–COOH) unido a una cadena larga de carbonos. Esa cadena puede no tener dobles enlaces (<b>saturada</b>), tener uno (<b>monoinsaturada</b>) o varios (<b>poliinsaturada</b>, PUFA). En las células casi siempre tienen número par de carbonos, entre 14 y 24.'],
['h', 'La notación C:D'],
['p', 'La forma más rápida de describir un ácido graso es con dos números: <b>carbonos : dobles enlaces</b>. El ácido palmítico es 16:0 (16 carbonos, ningún doble enlace) y el oleico es 18:1 (18 carbonos, un doble enlace).'],
['h', 'Dos maneras de contar: Δ y ω'],
['p', 'Para decir <i>dónde</i> está el doble enlace hay dos sistemas, que cuentan desde puntas opuestas. El sistema <b>Δ (delta)</b> cuenta desde el carbono del carboxilo, que es el C1. El sistema <b>ω (omega, también escrito n)</b> cuenta desde el otro extremo, el metilo.'],
['fig', F.numbering, 'Oleato (18:1). En negro, la numeración Δ desde el carboxilo; en violeta, la numeración ω desde el metilo. El mismo doble enlace es Δ9 y también ω-9.'],
['steps', 'Cómo pasar de Δ a ω', [
'Anotá el número total de carbonos. Ejemplo: α-linolénico, 18:3 Δ9,12,15 → 18 carbonos.',
'Buscá el doble enlace más cercano al metilo, que es el de número Δ más alto: Δ15.',
'Restá: 18 − 15 = 3. El primer doble enlace contando desde el metilo está en el carbono 3 → <b>ω-3</b>.',
'Comprobación con linoleico (18:2 Δ9,12): 18 − 12 = 6 → ω-6.'
]],
['why', 'Porque responden preguntas distintas. Δ te dice exactamente dónde está <i>cada</i> doble enlace, útil para la química y las enzimas (por ejemplo, una «desaturasa Δ9» pone el doble enlace en el C9). ω te dice a qué <i>familia</i> pertenece: cuando el cuerpo alarga un ácido graso agrega carbonos del lado del carboxilo, así que la posición ω no cambia. Un ω-3 sigue siendo ω-3 aunque crezca.', 'Por qué se usan dos sistemas'],
['table', ['Ácido graso', 'Notación', 'Familia', 'Comentario'], [
['Palmítico', '16:0', '—', 'Saturado; el producto principal de la síntesis'],
['Esteárico', '18:0', '—', 'Saturado'],
['Palmitoleico', '16:1 Δ9', 'ω-7', 'Monoinsaturado'],
['Oleico', '18:1 Δ9', 'ω-9', 'El del aceite de oliva'],
['Linoleico', '18:2 Δ9,12', 'ω-6', 'Esencial'],
['α-linolénico (ALA)', '18:3 Δ9,12,15', 'ω-3', 'Esencial'],
['Araquidónico (AA)', '20:4 Δ5,8,11,14', 'ω-6', 'Precursor de eicosanoides'],
['EPA', '20:5 Δ5,8,11,14,17', 'ω-3', 'Abundante en pescados'],
['DHA', '22:6 Δ4,7,10,13,16,19', 'ω-3', 'Abundante en retina y cerebro']
]],
['h', 'Cis y trans: la forma del doble enlace'],
['p', 'Un doble enlace no gira. Si los dos pedazos de cadena quedan del mismo lado, es <b>cis</b>, y la cadena se dobla formando un «codo». Si quedan de lados opuestos, es <b>trans</b>, y la cadena sigue casi recta, como si fuera saturada. En la naturaleza, casi todos los dobles enlaces son cis.'],
['fig', F.cisTrans, 'El codo del doble enlace cis es lo que cambia el comportamiento físico de la grasa.'],
['ex', 'Algunas bacterias usan además ácidos grasos <b>ramificados</b> (iso y anteiso) o con anillos de ciclopropano. Cambiando ramificación, saturación o largo pueden ajustar su membrana sin cambiar el tipo de cabeza polar.'],
['check', [
['¿Qué significa 20:4?', 'Un ácido graso de 20 carbonos con 4 dobles enlaces (por ejemplo, el araquidónico).'],
['EPA es 20:5 Δ5,8,11,14,17. ¿Qué familia es?', '20 − 17 = 3 → ω-3.'],
['Si un ω-6 se alarga en 2 carbonos, ¿sigue siendo ω-6?', 'Sí: los carbonos se agregan del lado del carboxilo, así que la distancia al metilo no cambia.'],
['¿Por qué una grasa trans se parece más a una saturada que a una cis?', 'Porque el doble enlace trans deja la cadena casi recta, igual que una saturada.']
]]
]
},
{
n: 44, group: L1, title: 'De la estructura a las propiedades: por qué unas grasas son sólidas y otras líquidas',
lead: 'Con solo dos datos de un ácido graso, el largo y la cantidad de dobles enlaces cis, se puede predecir su punto de fusión. Todo depende de qué tan bien se empaquetan las cadenas.',
blocks: [
['h', 'La idea central: empaquetamiento'],
['p', 'Entre dos cadenas hidrocarbonadas hay fuerzas débiles (de dispersión o van der Waals) que aparecen en cada punto de contacto. Cuantos más contactos haya, más cuesta separarlas, y más energía (temperatura) hace falta para fundir la grasa. Entonces la pregunta siempre es: <b>¿cuántos contactos pueden hacer estas cadenas?</b>'],
['steps', 'Efecto del largo', [
'Cadena más larga → más superficie de contacto con las vecinas.',
'Más contactos → más energía para separarlas.',
'Resultado: <b>mayor punto de fusión (Tm)</b> y menor solubilidad en agua.'
]],
['steps', 'Efecto de los dobles enlaces cis', [
'Cada doble enlace cis dobla la cadena.',
'Las cadenas dobladas no se pueden apilar prolijamente: quedan huecos entre ellas.',
'Menos contactos → <b>menor punto de fusión</b> y mayor fluidez.'
]],
['fig', F.packing, 'Las colas rectas se apilan como lápices en una caja; las colas con codos quedan desordenadas y con huecos.'],
['table', ['Tipo de cadena', 'Empaquetamiento', 'A igual largo…'], [
['Saturada', 'Compacto', 'Tm más alto: tiende a ser sólida'],
['Trans', 'Casi tan compacto como saturada', 'Tm alto, parecido a la saturada'],
['Monoinsaturada cis', 'Interrumpido por un codo', 'Tm más bajo'],
['Poliinsaturada cis', 'Muy desordenado', 'Tm todavía más bajo']
]],
['ex', 'El aceite de oliva es líquido a temperatura ambiente porque es rico en oleico (18:1 cis). La manteca y el sebo son sólidos porque tienen mucha más proporción de ácidos grasos saturados (palmítico, esteárico). No hace falta memorizar puntos de fusión: alcanza con el razonamiento.'],
['trap', 'Cuando compares dos ácidos grasos, primero mirá el largo, y si es parecido, mirá los dobles enlaces. Ejemplo: 18:0 tiene Tm mayor que 16:0 (más largo); 18:1 tiene Tm mucho menor que 18:0 (mismo largo, pero con un codo).'],
['h', 'En una membrana: la transición de fase'],
['p', 'Lo mismo pasa dentro de una bicapa. A baja temperatura las colas están ordenadas y estiradas: estado <b>gel</b>. Al calentar, pasan a un estado <b>líquido-cristalino</b>: las colas se mueven y se desordenan, cada lípido ocupa más área y la bicapa se vuelve más delgada. La temperatura de esa transición depende del largo, la saturación, la cabeza polar y el colesterol.'],
['check', [
['Ordená de mayor a menor Tm: 18:1 cis, 18:0, 16:0.', '18:0 > 16:0 > 18:1 cis.'],
['¿Por qué la margarina hecha con hidrogenación parcial es sólida?', 'Porque la hidrogenación satura dobles enlaces y además genera trans; ambas cosas dejan cadenas rectas que se empaquetan bien.'],
['¿Qué le pasa al espesor de una bicapa al pasar de gel a líquido-cristalino?', 'Disminuye, porque las colas se desordenan y cada lípido ocupa más área.']
]]
]
},
{
n: 45, group: L1, title: 'Familias ω-3 y ω-6: por qué son esenciales y qué señales generan',
lead: 'Hay dos ácidos grasos que tenemos que comer sí o sí. A partir de ellos el cuerpo arma moléculas largas que se convierten en mensajeros de la inflamación y de su resolución.',
blocks: [
['h', 'Por qué algunos ácidos grasos son esenciales'],
['p', 'Los mamíferos tenemos desaturasas que pueden poner dobles enlaces cerca del carboxilo (por ejemplo en Δ9), pero <b>no podemos poner dobles enlaces más allá del C9</b>, del lado del metilo. Las posiciones ω-3 y ω-6 quedan justamente ahí. Por eso no podemos fabricar desde cero ni el <b>linoleico</b> (ω-6) ni el <b>α-linolénico</b> (ω-3): son <b>esenciales</b> y vienen de la dieta, sobre todo de vegetales.'],
['p', 'Una vez que los comemos, sí podemos <b>alargarlos y agregarles dobles enlaces</b> del lado del carboxilo. Como la punta del metilo no se toca, cada familia se mantiene: de un ω-6 salen ω-6 y de un ω-3 salen ω-3.'],
['fig', F.omega, 'Cada familia tiene su propia ruta, y las dos compiten por las mismas enzimas de alargamiento y desaturación.'],
['h', 'De los ácidos grasos a los mensajeros'],
['table', ['Precursor', 'Mediadores', 'Función general'], [
['Araquidonato (ω-6)', 'Prostaglandinas, tromboxanos, leucotrienos, lipoxinas', 'Inflamación, coagulación, tono de los vasos; las lipoxinas ayudan a resolver'],
['EPA (ω-3)', 'Eicosanoides de otras series y resolvinas E', 'Modulan la inflamación'],
['DHA (ω-3)', 'Resolvinas D, protectinas, maresinas', 'Resolución de la inflamación; funciones especiales en retina y cerebro']
]],
['why', 'Los ácidos grasos no flotan sueltos esperando: están guardados dentro de los fosfolípidos de las membranas. Cuando llega una señal, una <b>fosfolipasa A₂</b> corta el ácido graso de la posición sn-2 y lo libera. Ahí recién otras enzimas lo convierten en un mediador. Por eso <b>qué ácidos grasos tengan tus membranas condiciona qué mensajeros podés fabricar</b>.', 'Por qué la composición de la membrana importa para la inflamación'],
['trap', '«ω-3» y «ω-6» no significan «bueno» y «malo». Son nombres que indican dónde está el primer doble enlace contando desde el metilo. Del ω-6 araquidonato salen tanto mediadores que inician la inflamación como lipoxinas que ayudan a terminarla. El efecto depende de la molécula concreta, del tejido y del momento.'],
['ex', 'Las aspirinas y otros antiinflamatorios no esteroideos actúan bloqueando las ciclooxigenasas, las enzimas que convierten el araquidonato en prostaglandinas. Es un ejemplo de cómo intervenir en esta ruta cambia la respuesta inflamatoria.'],
['check', [
['¿Por qué el linoleico es esencial?', 'Porque su doble enlace en ω-6 está en una posición donde los mamíferos no tenemos desaturasas.'],
['¿Qué enzima libera el araquidonato de la membrana?', 'La fosfolipasa A₂, que corta la cadena de la posición sn-2.'],
['¿Se puede fabricar DHA a partir de linoleico?', 'No: linoleico es ω-6 y el DHA es ω-3. Las familias no se mezclan.']
]]
]
},
{
n: 46, group: L1, title: 'Triacilglicéridos, gotas lipídicas, ceras y grasas trans',
lead: 'La forma en que guardamos energía a largo plazo son los triacilglicéridos. Entender por qué son tan buena reserva también explica por qué no sirven para hacer membranas.',
blocks: [
['h', 'Triacilglicéridos (TAG)'],
['p', 'Un TAG es una molécula de <b>glicerol</b> con sus tres OH unidos por enlaces éster a <b>tres ácidos grasos</b>. Si los tres son iguales es un TAG <b>simple</b> (tripalmitina, trioleína); si son distintos, <b>mixto</b>, que es lo más común en las grasas naturales. Las posiciones del glicerol se llaman sn-1, sn-2 y sn-3.'],
['why', 'Por dos razones. Primero, sus carbonos están muy <b>reducidos</b> (casi solo C–H), así que al oxidarlos liberan mucha energía: unas 9 kcal/g, frente a unas 4 kcal/g de glúcidos y proteínas. Segundo, son <b>apolares y no retienen agua</b>: el glucógeno se guarda con mucha agua alrededor, los TAG casi sin agua. Gramo por gramo de reserva real, los TAG ganan con amplitud.', 'Por qué son una reserva tan eficiente'],
['trap', 'Los TAG no tienen cabeza polar, así que <b>no forman bicapas</b>: no son componentes estructurales de las membranas. Se juntan entre sí, lejos del agua.'],
['h', 'Gotas lipídicas: el depósito'],
['p', 'Como los TAG se separan del agua, la célula los guarda en <b>gotas lipídicas</b>: un núcleo de TAG y ésteres de colesterol rodeado por <b>una sola capa</b> de fosfolípidos, con las cabezas hacia el citoplasma y las colas hacia el núcleo grasoso. En esa superficie hay proteínas, entre ellas <b>lipasas</b> que liberan ácidos grasos cuando la célula necesita combustible o materia prima.'],
['fig', F.droplet, 'Una gota lipídica no es una gota inerte: es una organela dinámica que crece, se achica y se comunica con otras organelas.'],
['h', 'Ceras'],
['p', 'Una cera es un ácido graso largo unido por éster a un <b>alcohol de cadena larga</b>. Las dos puntas son hidrofóbicas, así que forman barreras que repelen el agua: protegen hojas, plumas y piel.'],
['h', 'Hidrogenación parcial y grasas trans'],
['steps', 'Qué pasa en la industria', [
'Se agrega hidrógeno a aceites vegetales para saturar parte de sus dobles enlaces.',
'Ventajas: la grasa queda más sólida y se oxida menos (dura más sin ponerse rancia).',
'Problema: en el proceso, algunos dobles enlaces cis que no se saturan se reacomodan como <b>trans</b>.',
'Como la cadena trans es casi recta, empaqueta como una saturada y eleva el punto de fusión. El efecto sobre la salud se analiza aparte, pero el mecanismo físico es este.'
]],
['ex', 'Los enlaces éster de los TAG también pueden intercambiarse con otro alcohol (transesterificación). Haciendo reaccionar aceite con metanol se obtienen ésteres metílicos de ácidos grasos: el <b>biodiésel</b>.'],
['check', [
['¿Por qué un TAG almacena más energía por gramo que el glucógeno?', 'Porque sus carbonos están más reducidos y porque no se guarda con agua.'],
['¿Cuántas capas de fosfolípidos rodean una gota lipídica? ¿Por qué?', 'Una sola: las colas miran al núcleo grasoso de TAG y las cabezas al citoplasma acuoso.'],
['¿Por qué la hidrogenación parcial puede generar trans?', 'Porque al manipular los dobles enlaces, algunos cis que no se saturan se reacomodan en la forma trans, más estable.']
]]
]
},
{
n: 47, group: L1, title: 'Síntesis de ácidos grasos: el puente hacia las membranas',
lead: 'Antes de existir una membrana, la célula tiene que fabricar sus piezas. Cómo se sintetizan los ácidos grasos explica por qué casi todos tienen número par de carbonos y qué decide su destino.',
blocks: [
['h', 'Se arman de a dos carbonos'],
['p', 'El punto de partida es el <b>acetil-CoA</b> (2 carbonos). Primero se convierte en <b>malonil-CoA</b>, que funciona como donador de unidades de 2 carbonos. La <b>sintasa de ácidos grasos (FAS)</b> va sumando esas unidades en ciclos hasta llegar, en general, al <b>palmitato (16:0)</b>.'],
['fig', F.fas, 'Después de la FAS, otras enzimas pueden alargar la cadena (elongasas) o agregarle dobles enlaces (desaturasas). El producto final se activa como acil-CoA.'],
['why', 'Porque empieza con una unidad de 2 carbonos y crece sumando unidades de 2 carbonos. 2 + 2 + 2… siempre da par. Los de número impar existen pero son mucho menos frecuentes.', 'Por qué predominan los ácidos grasos pares'],
['p', 'Los sistemas FAS no son iguales en todos los seres vivos: en animales y hongos es una gran proteína con todas las actividades juntas (FAS I), y en bacterias y plantas son enzimas separadas (FAS II). Pero la lógica de alargar de a dos carbonos es la misma.'],
['h', 'Dos destinos posibles'],
['cols', [
['Energía', 'Se guardan como TAG o se oxidan para obtener ATP.'],
['Estructura y señal', 'Se incorporan a glicerofosfolípidos y esfingolípidos. Desde ahí pueden liberarse luego para fabricar mensajeros.']
]],
['why', 'Un ácido graso solo no alcanza para entender una membrana. Además importa qué cabeza polar lo acompaña, en qué posición del glicerol está (sn-1 o sn-2), cuál es la otra cadena de la molécula, qué esteroles hay alrededor y en qué capa u organela está. De eso trata Lípidos II.', 'El puente hacia Lípidos II'],
['check', [
['¿Qué molécula dona los 2 carbonos en cada ciclo de la FAS?', 'El malonil-CoA.'],
['¿Qué ácido graso suele salir de la FAS?', 'Palmitato, 16:0.'],
['¿Qué enzimas convierten el palmitato en oleato (18:1)?', 'Una elongasa (16 → 18 carbonos) y una desaturasa Δ9 (agrega el doble enlace).']
]]
]
},
{
n: 48, group: L2, title: 'Por qué las membranas se arman solas',
lead: 'Nadie «construye» una bicapa pieza por pieza: los lípidos anfipáticos se ordenan solos en el agua. Para entender cómo, hay que entender el efecto hidrofóbico y la forma de cada molécula.',
blocks: [
['h', 'El efecto hidrofóbico'],
['p', 'El agua forma muchísimos puentes de hidrógeno entre sus moléculas. Alrededor de una superficie apolar, las moléculas de agua no pueden formar esos puentes con el lípido, así que se acomodan de una manera más ordenada para no perderlos. Ese orden extra tiene un costo: baja la entropía.'],
['steps', 'Por qué las colas se juntan', [
'Cada cola apolar suelta en el agua obliga a ordenar una «jaula» de agua a su alrededor.',
'Si varias colas se juntan, la superficie total expuesta al agua disminuye.',
'Se libera el agua que estaba ordenada: la entropía del sistema aumenta.',
'Ese aumento de entropía hace que juntarse sea favorable. No es que las colas se «atraigan» mucho: es que el agua queda más libre.'
]],
['trap', 'No digas que la bicapa se forma «porque las colas se atraen». La fuerza principal es el efecto hidrofóbico, que depende del agua. Las atracciones entre colas (van der Waals) existen y ayudan, pero no son la causa principal.'],
['h', 'La forma de la molécula decide qué estructura arma'],
['p', 'Si imaginamos cada lípido como un sólido geométrico, comparando el tamaño de la cabeza con el ancho de las colas, aparecen tres formas. Cada forma encaja mejor en un tipo de agregado, igual que los ladrillos de distintas formas sirven para paredes rectas o para arcos.'],
['fig', F.shapes, 'Cono invertido (cabeza grande, una cola): micelas. Cilindro (cabeza y colas del mismo ancho): bicapas planas. Cono (cabeza chica, colas anchas): monocapas curvadas hacia las cabezas.'],
['table', ['Forma', 'Ejemplos', 'Agregado que favorece'], [
['Cono invertido', 'Ácidos grasos libres, lisofosfolípidos, detergentes', 'Micelas, curvatura positiva'],
['Cilindro', 'PC, PS', 'Bicapa plana'],
['Cono', 'PE, PA, DAG, cardiolipina', 'Curvatura negativa y estructuras no planas']
]],
['ex', 'Por eso los detergentes (forma de cono invertido) destruyen membranas: se meten entre los fosfolípidos y los arrastran a micelas. Así se extraen proteínas de membrana en el laboratorio.'],
['h', 'Vesículas y liposomas'],
['p', 'Una bicapa plana tiene bordes donde las colas quedarían en contacto con el agua. Eso es desfavorable, así que la bicapa se cierra sobre sí misma y forma una <b>vesícula</b>, sin bordes. Los <b>liposomas</b> y las <b>nanopartículas lipídicas (LNP)</b>, como las de las vacunas de ARN, aprovechan este principio para transportar moléculas. Eligiendo la composición se controla su estabilidad, su curvatura y cómo se fusionan para liberar la carga.'],
['check', [
['¿Qué aumenta cuando las colas apolares se agrupan?', 'La entropía del agua (y del sistema), porque se libera agua que estaba ordenada.'],
['¿Por qué un lisofosfolípido forma micelas y no bicapas?', 'Tiene una sola cola y la cabeza grande: su forma de cono invertido encaja en una esfera, no en una lámina plana.'],
['¿Por qué una bicapa forma vesículas cerradas?', 'Para no dejar bordes con colas expuestas al agua.']
]]
]
},
{
n: 49, group: L2, title: 'Glicerofosfolípidos, galactolípidos y éter-lípidos',
lead: 'Los glicerofosfolípidos son los ladrillos principales de casi todas las membranas. Una misma «clase» en realidad agrupa muchísimas moléculas distintas, según qué cadenas lleve.',
blocks: [
['h', 'La anatomía'],
['p', 'Un glicerofosfolípido tiene un <b>glicerol</b> como esqueleto. En las posiciones <b>sn-1 y sn-2</b> lleva dos cadenas de ácido graso (las colas) y en <b>sn-3</b> un <b>fosfato</b>, al que se une una <b>cabeza polar</b>. La cabeza define la <b>clase</b> (PC, PE, PS…); las dos cadenas definen la <b>especie molecular</b>.'],
['fig', F.gpl, 'Cambiando solo las cadenas, una misma clase (por ejemplo PC) puede tener decenas de especies distintas, con propiedades físicas distintas.'],
['h', 'Las clases que hay que conocer'],
['table', ['Clase', 'Cabeza', 'Carga (pH 7)', 'Para qué'], [
['PA (ácido fosfatídico)', 'Solo el fosfato', 'Negativa', 'Precursor de todas las demás y señal; forma de cono'],
['PE (fosfatidiletanolamina)', 'Etanolamina', 'Neutra (zwitterión)', 'Cara interna de la membrana y bacterias; forma de cono'],
['PC (fosfatidilcolina)', 'Colina', 'Neutra (zwitterión)', 'La más abundante en eucariotas; forma de cilindro'],
['PS (fosfatidilserina)', 'Serina', 'Negativa', 'Cara interna; si aparece afuera es señal de apoptosis'],
['PG (fosfatidilglicerol)', 'Glicerol', 'Negativa', 'Bacterias, tilacoides, surfactante pulmonar'],
['PI (fosfatidilinositol)', 'Inositol', 'Negativa', 'Se fosforila y da fosfoinosítidos (señales)'],
['Cardiolipina', 'Dos PA unidos por un glicerol', 'Muy negativa', 'Membrana interna mitocondrial y bacterias']
]],
['why', 'Porque la etanolamina es una cabeza chica en comparación con la colina, que tiene tres metilos. Con cabeza chica y dos colas, la PE tiene forma de cono; la PC, con cabeza voluminosa, es un cilindro. Esa diferencia, que parece mínima, cambia cómo se curva la membrana.', 'Por qué la PE es cónica y la PC cilíndrica'],
['h', 'Las posiciones sn-1 y sn-2 no son iguales'],
['p', 'En muchos fosfolípidos animales, la posición <b>sn-1</b> lleva una cadena <b>saturada</b> y la <b>sn-2</b> una <b>insaturada</b>. No es una regla absoluta, pero es muy frecuente. Además, la sn-2 es la que corta la fosfolipasa A₂ para liberar ácidos grasos como el araquidonato.'],
['h', 'Galactolípidos y sulfolípidos'],
['p', 'En los <b>tilacoides</b> de los cloroplastos predominan lípidos con DAG unido a azúcares en vez de fosfato: <b>MGDG</b> y <b>DGDG</b> (con una o dos galactosas) y <b>SQDG</b> (con un azúcar sulfonado). Permiten armar membranas usando poco fósforo, que en el suelo suele ser escaso. Las plantas igual tienen fosfolípidos; lo especial es el enriquecimiento en los tilacoides.'],
['h', 'Éter-lípidos y Archaea'],
['p', 'En los <b>plasmalógenos</b>, la cadena de sn-1 se une al glicerol por un enlace <b>vinil-éter</b> en vez de un éster. En las <b>Archaea</b> el cambio es más profundo: usan glicerol-1-fosfato (con la estereoquímica opuesta a la nuestra), cadenas de isoprenoides ramificadas unidas por <b>éter</b>, y algunas forman <b>tetraéteres</b>, moléculas que atraviesan toda la membrana de un lado al otro.'],
['why', 'El enlace éter es más resistente a la hidrólisis que el éster, las ramificaciones mantienen la membrana estable a temperaturas extremas, y un tetraéter es como una bicapa «cosida» en una sola capa. Por eso las arqueas viven en aguas hirvientes o muy ácidas.', 'Por qué las membranas de arqueas son tan resistentes'],
['check', [
['¿Qué define la clase de un glicerofosfolípido y qué define su especie?', 'La clase la define la cabeza polar; la especie, las dos cadenas de ácidos grasos.'],
['¿Qué fosfolípidos tienen carga negativa neta?', 'PA, PS, PG, PI y cardiolipina.'],
['¿Qué ventaja tienen los galactolípidos para una planta?', 'Le permiten armar membranas de tilacoides ahorrando fósforo.']
]]
]
},
{
n: 50, group: L2, title: 'Esfingolípidos: ceramida, mielina y reconocimiento',
lead: 'Los esfingolípidos se parecen a los fosfolípidos por fuera (una cabeza y dos colas), pero están armados sobre otro esqueleto. Son clave en la mielina, en la superficie celular y como señales.',
blocks: [
['h', 'Cómo se arman'],
['p', 'No usan glicerol. El esqueleto es la <b>esfingosina</b>, una base larga que ya aporta una de las colas. A su grupo amino se une un ácido graso por <b>enlace amida</b> (no éster): eso forma la <b>ceramida</b>, que tiene dos colas y todavía no tiene cabeza. Agregando una cabeza polar se obtienen todos los demás esfingolípidos.'],
['fig', F.sphingo, 'La ceramida es el «tronco común» de todos los esfingolípidos.'],
['table', ['Subclase', 'Cabeza sobre la ceramida', 'Dónde y para qué'], [
['Esfingomielina', 'Fosfocolina', 'Membrana plasmática animal; muy abundante en la mielina'],
['Cerebrósido', 'Un solo azúcar', 'Tejido nervioso y otros tejidos'],
['Globósido', 'Varios azúcares, sin carga', 'Superficie celular'],
['Gangliósido', 'Varios azúcares con ácido siálico', 'Receptores, identidad celular, señalización']
]],
['trap', 'La esfingomielina tiene fosfato y colina como la PC, así que se parece mucho por fuera. Pero no es un glicerofosfolípido: su esqueleto es la esfingosina, no el glicerol.'],
['h', 'Reconocimiento en la superficie'],
['p', 'Los azúcares de los glicoesfingolípidos siempre miran hacia el <b>exterior</b> de la célula. Funcionan como identidad: participan en la adhesión, en el reconocimiento entre células y en los grupos sanguíneos (los antígenos ABO pueden estar en glicolípidos y glicoproteínas). También pueden ser usados por patógenos: el gangliósido <b>GM1</b> es el receptor de la toxina del cólera.'],
['h', 'Señales y enfermedad'],
['p', 'La <b>ceramida</b> y la <b>esfingosina-1-fosfato (S1P)</b> no solo son piezas: actúan como mensajeros que regulan crecimiento, muerte celular y tránsito de células inmunes. Cuando falla alguna enzima de síntesis o de degradación, los esfingolípidos se acumulan y aparecen enfermedades, muchas con daño neurológico. En algunas neuropatías el sistema inmune fabrica anticuerpos contra gangliósidos propios.'],
['check', [
['¿Qué une el ácido graso a la esfingosina en la ceramida?', 'Un enlace amida.'],
['¿Qué diferencia a un gangliósido de un globósido?', 'El gangliósido tiene ácido siálico en su cadena de azúcares.'],
['¿Hacia dónde miran los azúcares de los glicoesfingolípidos?', 'Hacia el exterior de la célula.']
]]
]
},
{
n: 51, group: L2, title: 'Colesterol y esteroles: el amortiguador de la membrana',
lead: 'El colesterol no hace a la membrana simplemente más rígida o más fluida: la estabiliza para que cambie menos con la temperatura. Su forma explica por qué.',
blocks: [
['h', 'Una molécula con forma muy especial'],
['p', 'El colesterol tiene un <b>OH pequeño</b> (la única parte polar), un <b>núcleo de cuatro anillos fusionados</b>, plano y rígido, y una <b>cola hidrocarbonada</b> corta. Se mete entre los fosfolípidos con el OH a la altura de las cabezas y los anillos al lado de la primera parte de las colas.'],
['p', 'Cada grupo de seres vivos usa su esterol: los animales <b>colesterol</b>, los hongos <b>ergosterol</b> y las plantas <b>fitosteroles</b> como el estigmasterol. La mayoría de las bacterias no tiene esteroles (algunas usan hopanoides).'],
['h', 'El efecto de amortiguación'],
['fig', F.cholesterol, 'A temperatura alta el colesterol frena el movimiento; a temperatura baja impide que las colas se ordenen como un cristal.'],
['steps', 'Cómo funciona en cada extremo', [
'<b>A temperatura alta</b> las colas se mueven mucho. El núcleo rígido del colesterol queda pegado a ellas y les quita movilidad: la membrana gana orden y no se vuelve demasiado fluida.',
'<b>A temperatura baja</b> las colas tienden a estirarse y apilarse prolijamente, como en una grasa sólida. El colesterol se mete entre ellas, las separa e impide ese empaquetamiento perfecto: la membrana no se vuelve rígida.',
'Resultado: con colesterol, las propiedades de la membrana cambian mucho menos con la temperatura. Es un <b>amortiguador (buffer) de fluidez</b>.'
]],
['trap', 'Si te preguntan «¿el colesterol aumenta o disminuye la fluidez?», la respuesta correcta es «depende de la temperatura»: la disminuye a temperatura alta y la aumenta a temperatura baja. Lo que hace siempre es amortiguar.'],
['h', 'Derivados del colesterol'],
['p', 'A partir del colesterol se fabrican los <b>ácidos y sales biliares</b> (para digerir grasas), las <b>hormonas esteroideas</b> (cortisol, estrógenos, testosterona), la <b>vitamina D</b> y los <b>ésteres de colesterol</b>, que son la forma de guardarlo en gotas lipídicas.'],
['ex', 'Los glucocorticoides, como la prednisona, son derivados esteroideos que se usan como antiinflamatorios. Actúan sobre todo regulando la expresión de genes; no conviene resumir su acción como «inhiben la fosfolipasa A₂» y nada más.'],
['check', [
['¿Qué parte del colesterol queda a la altura de las cabezas de los fosfolípidos?', 'El grupo OH.'],
['¿Por qué el colesterol aumenta el orden a temperatura alta?', 'Su núcleo rígido limita el movimiento de las colas vecinas.'],
['¿Qué esterol tienen los hongos?', 'Ergosterol (es el blanco de varios antifúngicos).']
]]
]
},
{
n: 52, group: L2, title: 'Mosaico fluido, movimiento y asimetría de la membrana',
lead: 'Una membrana no es una lámina quieta y uniforme: sus lípidos y proteínas se mueven todo el tiempo, y las dos caras tienen composiciones distintas a propósito.',
blocks: [
['h', 'El modelo de mosaico fluido'],
['p', 'La membrana es una bicapa de lípidos con proteínas insertadas («mosaico») donde los componentes se pueden desplazar lateralmente («fluido»). De esta organización salen cuatro propiedades:'],
['table', ['Propiedad', 'Qué significa', 'Por qué ocurre'], [
['Barrera', 'Iones y moléculas polares grandes casi no la cruzan', 'El centro de la bicapa es hidrofóbico'],
['Difusión lateral', 'Lípidos y muchas proteínas se desplazan dentro de su capa', 'Las interacciones entre lípidos son débiles y no covalentes'],
['Autosellado', 'Si se rompe, se vuelve a cerrar', 'Los bordes expuestos al agua son desfavorables'],
['Asimetría', 'Cada capa tiene distinta composición', 'Enzimas la generan y la mantienen']
]],
['p', 'En cambio, el pasaje de un lípido de una capa a la otra («flip-flop») es muy lento si nadie lo ayuda, porque la cabeza polar tendría que atravesar el centro hidrofóbico.'],
['h', 'Las dos caras son distintas'],
['fig', F.asymmetry, 'En la membrana plasmática, la cara externa es rica en PC, esfingomielina y glicolípidos; la cara citoplasmática, en PE, PS y fosfoinosítidos.'],
['p', 'Esa asimetría la mantienen enzimas. Las <b>flipasas</b> llevan lípidos de la cara externa a la interna, gastando ATP (por ejemplo, devuelven la PS hacia adentro). Las <b>flopasas</b> los llevan hacia afuera. Las <b>scramblasas</b> mezclan las dos caras sin gastar energía y borran la asimetría cuando se activan.'],
['ex', 'Cuando una célula entra en apoptosis, se activa una scramblasa y la <b>PS aparece en la cara externa</b>. Los macrófagos reconocen esa PS como una señal de «comeme» y eliminan la célula sin generar inflamación.'],
['why', 'A lo largo del espesor de la bicapa, las fuerzas cambian: cerca de las cabezas las moléculas se empujan, un poco más adentro se atraen, y en el centro vuelven a empujarse. Ese perfil de presiones aprieta o afloja a las proteínas que atraviesan la membrana, y puede favorecer que un canal o un sensor cambie de forma.', 'Por qué la presión lateral puede afectar a las proteínas'],
['check', [
['¿Por qué el flip-flop espontáneo es tan lento?', 'Porque la cabeza polar tendría que atravesar el centro hidrofóbico de la bicapa.'],
['¿Qué lípido indica apoptosis cuando aparece en la cara externa?', 'La fosfatidilserina (PS).'],
['¿Qué enzima mezcla las dos capas sin gastar ATP?', 'La scramblasa.']
]]
]
},
{
n: 53, group: L2, title: 'Cada membrana tiene su composición',
lead: 'No existe una membrana estándar. El retículo, el Golgi, la membrana plasmática, la mitocondria y los cloroplastos tienen composiciones distintas porque cada una hace un trabajo distinto.',
blocks: [
['h', 'Dos tipos de diversidad'],
['cols', [
['Diversidad química', 'Cuántos tipos distintos de moléculas existen: esqueletos, cabezas, enlaces y cadenas.'],
['Diversidad de composición', 'Cuánto hay de cada uno en un lugar concreto: una célula, una organela, una de las dos caras o un pequeño dominio.']
]],
['p', 'Las dos determinan cómo funciona una membrana. Dos membranas pueden tener exactamente los mismos tipos de lípidos y aun así comportarse distinto si cambian las proporciones.'],
['h', 'El gradiente de la vía secretora'],
['fig', F.secretory, 'Del retículo hacia la membrana plasmática, las membranas se vuelven más gruesas y ordenadas.'],
['table', ['Membrana', 'Composición', 'Consecuencia'], [
['Retículo endoplasmático', 'Poco colesterol y pocos esfingolípidos; más cadenas insaturadas', 'Delgada y con defectos de empaquetamiento: fácil insertar proteínas nuevas'],
['Golgi tardío y membrana plasmática', 'Más colesterol, esfingolípidos y cadenas saturadas', 'Más gruesa, ordenada e impermeable: buena barrera'],
['Membrana mitocondrial interna', 'Rica en cardiolipina', 'Organiza los complejos de la cadena respiratoria'],
['Tilacoides', 'Muchos galactolípidos y sulfolípidos', 'Sostienen la maquinaria de la fotosíntesis con poco fósforo']
]],
['why', 'El retículo es donde se fabrican lípidos y proteínas de membrana; una membrana más fina y algo desordenada facilita insertar proteínas nuevas. La membrana plasmática, en cambio, tiene que separar el interior del exterior; ahí conviene una barrera gruesa y ordenada. A medida que los lípidos viajan por la vía secretora se van seleccionando y remodelando.', 'Por qué el retículo y la membrana plasmática son tan distintos'],
['check', [
['¿Qué lípido caracteriza a la membrana mitocondrial interna?', 'La cardiolipina.'],
['¿Cómo cambia la membrana del retículo a la plasmática?', 'Aumentan colesterol, esfingolípidos y saturación: se vuelve más gruesa y ordenada.']
]]
]
},
{
n: 54, group: L2, title: 'Cómo se fabrican y se retocan los fosfolípidos',
lead: 'La composición final de una membrana no sale solo de la síntesis: después las cadenas se cambian una y otra vez. Hay una ruta de fabricación y un ciclo de retoque.',
blocks: [
['h', 'Todo empieza en el ácido fosfatídico'],
['p', 'La célula parte de <b>glicerol-3-fosfato</b>. Una enzima (GPAT) le pone un ácido graso y se forma el <b>ácido lisofosfatídico (LPA)</b>; otra (LPAAT) le pone el segundo y se forma el <b>ácido fosfatídico (PA)</b>. El PA es el punto donde se separan los caminos.'],
['fig', F.kennedy, 'Desde el PA salen dos ramas: la que pasa por DAG (vía de Kennedy) y la que pasa por CDP-DAG.'],
['cols', [
['Rama del DAG (vía de Kennedy)', 'El PA pierde su fosfato y queda DAG. Luego se le agrega una cabeza ya activada (CDP-colina o CDP-etanolamina) y se forman <b>PC</b> y <b>PE</b>.'],
['Rama del CDP-DAG', 'El PA se activa como CDP-DAG y a él se le agrega la cabeza: así se forman <b>PI</b>, <b>PG</b> y <b>cardiolipina</b>.']
]],
['why', 'En las dos ramas aparece un compuesto con CDP. Unir una cabeza a un lípido requiere energía, y el CDP funciona como la «pila» de la reacción: al salir, libera la energía necesaria. Es la misma lógica que el UDP en los azúcares.', 'Por qué aparece CDP en ambas ramas'],
['h', 'Ciclo de Lands: cambiar las cadenas después'],
['p', 'La síntesis de novo deja fosfolípidos con ciertas cadenas, que dependen de los acil-CoA disponibles. Pero la célula los puede retocar sin fabricarlos de nuevo.'],
['fig', F.lands, 'La fosfolipasa A₂ quita la cadena de sn-2; una aciltransferasa pone otra elegida.'],
['steps', 'El ciclo paso a paso', [
'Una <b>fosfolipasa A₂</b> corta la cadena de la posición sn-2 y deja un <b>lisofosfolípido</b>.',
'Una <b>aciltransferasa</b> específica (LPCAT para PC, LPIAT para PI…) agrega una cadena nueva desde un acil-CoA.',
'Si la aciltransferasa prefiere un tipo de cadena (por ejemplo un PUFA), la clase de fosfolípido se va enriqueciendo en ese tipo.',
'Repitiendo el ciclo, la célula ajusta la composición sin rehacer toda la molécula.'
]],
['h', 'Sesgo metabólico: las enzimas eligen'],
['p', 'Las enzimas de estas rutas no solo reconocen la cabeza polar: también <b>prefieren ciertas cadenas</b>. Por eso algunas clases quedan con una «firma» de cadenas muy particular. Ejemplos de la bibliografía: el <b>PI</b> está muy enriquecido en la combinación <b>18:0 / 20:4</b>, y ciertas rutas de PC seleccionan especies con <b>DHA</b>.'],
['check', [
['¿Cuál es el punto de partida común de todos los glicerofosfolípidos?', 'El ácido fosfatídico (PA), que sale del glicerol-3-fosfato.'],
['¿Qué fosfolípidos salen de la vía de Kennedy?', 'PC y PE, a partir de DAG y CDP-colina o CDP-etanolamina.'],
['En el ciclo de Lands, ¿qué posición se cambia?', 'La sn-2.']
]]
]
},
{
n: 55, group: L2, title: 'Curvatura, dominios y el papel de los PUFA',
lead: 'Las membranas se doblan para formar vesículas, se fusionan y se dividen. La forma de cada lípido y lo flexible de sus colas deciden qué tan fácil es hacerlo.',
blocks: [
['h', 'Curvatura según la forma'],
['p', 'Ya vimos que hay lípidos cilíndricos (PC, PS), cónicos (PE, PA, DAG, cardiolipina) y de cono invertido (lisofosfolípidos). Cuando en una capa se acumulan lípidos de una forma, la capa tiende a curvarse en la dirección que esa forma favorece.'],
['fig', F.curvature, 'Izquierda: muchos lípidos cónicos juntos curvan la capa. Derecha: las colas poliinsaturadas son muy flexibles y facilitan doblar la membrana.'],
['ex', 'Para formar una vesícula hay que doblar mucho la membrana en un punto. Enzimas que convierten PC en PA o en DAG en ese lugar (cambiando cilindros por conos) ayudan a que la membrana se curve y se estrangule.'],
['h', 'Orden lateral y nanodominios'],
['p', 'Los lípidos no están mezclados de forma perfectamente uniforme. El <b>colesterol</b> y las <b>cadenas saturadas</b> (como las de la esfingomielina) tienden a juntarse y forman zonas más ordenadas, llamadas <b>líquido-ordenadas</b>. Las cadenas insaturadas forman zonas <b>líquido-desordenadas</b>.'],
['trap', 'Estos dominios no son «islas» rígidas y permanentes: son pequeños, se forman y se deshacen todo el tiempo. Sirven para reunir transitoriamente ciertas proteínas.'],
['h', 'Los PUFA'],
['p', 'El araquidonato y el DHA tienen muchos dobles enlaces cis. Eso les da una flexibilidad enorme: pueden adoptar muchísimas formas. Una membrana rica en PUFA tiene menor rigidez de flexión, es decir, cuesta menos doblarla. Por eso los PUFA facilitan la curvatura, la fusión, la fisión y la endocitosis.'],
['why', 'En la retina, los discos de los fotorreceptores están cargados de proteínas (rodopsina) que cambian de forma al recibir luz, y en las sinapsis hay fusión constante de vesículas. Membranas ricas en DHA, muy flexibles, permiten que esos procesos ocurran rápido.', 'Por qué el DHA abunda en la retina y en las neuronas'],
['h', 'Las dos capas se comunican'],
['p', 'Aunque son dos capas, no son independientes. Las cadenas muy largas de una capa pueden meterse en la otra (interdigitarse) y transmitir orden de un lado al otro. Así, la composición de la cara externa puede influir sobre dominios y proteínas de la cara interna.'],
['check', [
['¿Qué tipo de lípido se acumula para curvar una membrana hacia sus cabezas?', 'Lípidos cónicos, como PE, PA o DAG.'],
['¿Qué componentes forman zonas líquido-ordenadas?', 'Colesterol y cadenas saturadas, como las de los esfingolípidos.'],
['¿Por qué los PUFA facilitan la fusión de membranas?', 'Porque sus colas son muy flexibles y bajan la rigidez de flexión de la membrana.']
]]
]
},
{
n: 56, group: L2, title: 'Adaptación homeoviscosa: cómo una célula mantiene su membrana en el punto justo',
lead: 'Si baja la temperatura, una membrana se pone más rígida; si sube, más fluida. Muchos organismos detectan ese cambio y modifican su composición para volver al estado adecuado. Es un sistema de control, como un termostato.',
blocks: [
['h', 'La idea'],
['p', 'Las proteínas de membrana necesitan que la bicapa tenga cierto espesor, orden y flexibilidad para funcionar bien. Cuando la temperatura, la presión o un solvente alteran esas propiedades, la célula cambia qué lípidos fabrica para <b>recuperar el estado físico adecuado</b>. A eso se llama adaptación homeoviscosa.'],
['trap', '«Fluidez» es una palabra útil pero incompleta. Lo que se mantiene puede ser la viscosidad, el orden, el espesor, la permeabilidad, la presión lateral o la rigidez de flexión. No es solo «que no se ponga dura».'],
['table', ['Situación', 'Problema', 'Respuesta frecuente'], [
['Frío', 'La membrana se vuelve rígida', 'Más dobles enlaces cis, cadenas más cortas o más ramificadas (anteiso)'],
['Calor', 'La membrana se vuelve demasiado fluida', 'Más saturación y/o cadenas más largas'],
['Solventes que fluidifican', 'Desorden repentino', 'Algunas bacterias pasan rápido de cis a trans'],
['Alta presión y frío (fondo del mar)', 'La presión ordena y el frío también', 'Algunas bacterias marinas agregan PUFA como EPA y DHA']
]],
['why', 'Porque son justamente las dos variables que controlan el empaquetamiento (capítulo 44). Más dobles enlaces o cadenas más cortas → menos contactos → más fluidez, que compensa el frío. Más saturación o cadenas más largas → más contactos → más orden, que compensa el calor.', 'Por qué se cambia la saturación y el largo'],
['h', 'Un sensor bacteriano: DesK/DesR'],
['p', 'En la bacteria <i>Bacillus subtilis</i>, una proteína de membrana llamada <b>DesK</b> funciona como sensor. Cuando la membrana se pone más gruesa y empaquetada por el frío, DesK cambia de forma y pasa de actuar como fosfatasa a actuar como <b>quinasa</b>.'],
['fig', F.desk, 'El circuito se apaga solo cuando la membrana vuelve a su estado: es retroalimentación negativa.'],
['steps', 'El circuito completo', [
'Baja la temperatura: la membrana se vuelve más rígida y gruesa.',
'DesK detecta el cambio y, como quinasa, fosforila a <b>DesR</b>.',
'DesR fosforilado activa el gen de una <b>desaturasa</b>.',
'La desaturasa agrega dobles enlaces cis a las cadenas: la membrana vuelve a ser más fluida y delgada.',
'DesK percibe que la membrana se normalizó y vuelve a actuar como fosfatasa: el sistema se apaga.'
]],
['h', 'Un sensor de levadura: Mga2'],
['p', 'En levaduras, la proteína <b>Mga2</b> tiene una hélice que atraviesa la membrana del retículo y «siente» qué tan empaquetadas y saturadas están las cadenas a su alrededor. Si la membrana está demasiado saturada, Mga2 se procesa y activa la expresión de <b>OLE1</b>, una desaturasa Δ9. La lógica es la misma: <b>la membrana controla a la maquinaria que modifica su propia composición</b>.'],
['check', [
['¿Qué cambios de composición esperás en una bacteria pasada a 15 °C?', 'Más dobles enlaces cis, cadenas más cortas o más ramificadas, para recuperar fluidez.'],
['¿Qué hace DesK cuando la membrana está rígida?', 'Actúa como quinasa, fosforila a DesR y se activa la expresión de una desaturasa.'],
['¿Por qué decimos que es retroalimentación negativa?', 'Porque el resultado (una membrana más fluida) apaga al sensor que inició la respuesta.']
]]
]
},
{
n: 57, group: L2, title: 'Sensores, fisiología, enfermedad y aplicaciones: el cierre',
lead: 'Al final de la unidad, los lípidos aparecen en cuatro papeles a la vez: material de construcción, señales, reguladores de proteínas y variables que la célula controla. Estos ejemplos lo muestran.',
blocks: [
['h', 'Sensores que vigilan las membranas'],
['table', ['Sensor', 'Qué detecta', 'Para qué'], [
['Motivos ALPS', 'Huecos en el empaquetamiento (membranas muy curvas)', 'Llevar proteínas a vesículas y membranas curvadas'],
['Opi1 / PA', 'Cantidad de PA y pH', 'Ajustar la síntesis de fosfolípidos al estado metabólico'],
['TORC2–Orm', 'Nivel de esfingolípidos', 'Mantener su cantidad estable'],
['SREBP / Scap', 'Poco colesterol en el retículo', 'Activar genes para fabricar y captar colesterol']
]],
['h', 'Funciones especializadas'],
['p', 'El <b>DHA</b> abunda en la retina, el cerebro y en la formación de espermatozoides. Los <b>eicosanoides</b> y los mediadores pro-resolutivos controlan cómo empieza y cómo termina la inflamación. Los <b>fosfoinosítidos</b>, el <b>DAG</b> y el <b>PA</b> son mensajeros dentro de la célula. La <b>cardiolipina</b> sostiene la organización de la mitocondria.'],
['h', 'Cuando algo falla'],
['table', ['Ejemplo', 'Qué pasa con los lípidos'], [
['Síndrome de Barth', 'Falla la tafazina, la enzima que remodela la cardiolipina: la mitocondria funciona mal'],
['Ferroptosis', 'Muerte celular por oxidación de PUFA dentro de fosfolípidos; las enzimas que incorporan PUFA (ACSL4, LPCAT3) aumentan la sensibilidad'],
['Barrera de la piel', 'Las acilceramidas forman la capa que impide perder agua; si fallan, la piel se seca y se daña']
]],
['why', 'Porque sus muchos dobles enlaces tienen hidrógenos fáciles de arrancar, y así empieza una reacción en cadena con oxígeno. Cuantos más PUFA haya en los fosfolípidos, más «combustible» hay para esa oxidación descontrolada. Por eso las enzimas que meten PUFA en la membrana hacen a las células más sensibles a la ferroptosis.', 'Por qué los PUFA se relacionan con la ferroptosis'],
['h', 'Aplicaciones'],
['p', 'Los <b>liposomas</b> y las <b>nanopartículas lipídicas</b> transportan fármacos y ARN. Los <b>PHA/PHB</b> bacterianos sirven para fabricar bioplásticos. Y los perfiles de ácidos grasos se pueden usar como marcadores para saber qué come un organismo o qué microbios hay en un ambiente.'],
['h', 'El mapa que une Lípidos I y II'],
['fig', F.finalMap, 'Cada nivel explica al siguiente: si cambia la molécula, cambia cómo se empaqueta; eso cambia la membrana, las proteínas que trabajan en ella y finalmente la fisiología.'],
['key', [
'Los lípidos se agrupan por ser hidrofóbicos, no por tener una misma estructura.',
'Largo y dobles enlaces cis deciden el empaquetamiento y el punto de fusión.',
'ω dice la familia; Δ dice la posición de cada doble enlace.',
'Las membranas se arman solas por el efecto hidrofóbico; la forma de cada lípido decide la curvatura.',
'El colesterol amortigua; no «sube» ni «baja» la fluidez.',
'Cada membrana tiene su composición, y la célula la ajusta con síntesis, remodelado (Lands) y sensores.'
]],
['check', [
['¿Qué detecta el sistema SREBP/Scap?', 'Poco colesterol en el retículo; entonces activa genes para fabricar y captar colesterol.'],
['¿Qué enzima falla en el síndrome de Barth?', 'La tafazina, que remodela la cardiolipina.'],
['Explicá en una frase la cadena que une Lípidos I y II.', 'La estructura de cada lípido define cómo se empaqueta; eso define las propiedades de la membrana, que a su vez definen cómo trabajan sus proteínas y la fisiología de la célula.']
]]
]
}
];
