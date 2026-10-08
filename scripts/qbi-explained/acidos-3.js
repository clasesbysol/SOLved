'use strict';
/* Ácidos nucleicos I · ARN y flujo de la información. Capítulos 69 a 71. */
const { F } = require('./figs-acidos');
const { M } = require('./kit-an');
const G = 'Ácidos nucleicos I';

const CODE = [
['Fenilalanina', 'Phe', 'F', 'UUU, UUC'],
['Leucina', 'Leu', 'L', 'UUA, UUG, CUU, CUC, CUA, CUG'],
['Isoleucina', 'Ile', 'I', 'AUU, AUC, AUA'],
['Metionina (inicio)', 'Met', 'M', '<b>AUG</b>'],
['Valina', 'Val', 'V', 'GUU, GUC, GUA, GUG'],
['Serina', 'Ser', 'S', 'UCU, UCC, UCA, UCG, AGU, AGC'],
['Prolina', 'Pro', 'P', 'CCU, CCC, CCA, CCG'],
['Treonina', 'Thr', 'T', 'ACU, ACC, ACA, ACG'],
['Alanina', 'Ala', 'A', 'GCU, GCC, GCA, GCG'],
['Tirosina', 'Tyr', 'Y', 'UAU, UAC'],
['Histidina', 'His', 'H', 'CAU, CAC'],
['Glutamina', 'Gln', 'Q', 'CAA, CAG'],
['Asparagina', 'Asn', 'N', 'AAU, AAC'],
['Lisina', 'Lys', 'K', 'AAA, AAG'],
['Aspartato', 'Asp', 'D', 'GAU, GAC'],
['Glutamato', 'Glu', 'E', 'GAA, GAG'],
['Cisteína', 'Cys', 'C', 'UGU, UGC'],
['Triptófano', 'Trp', 'W', 'UGG'],
['Arginina', 'Arg', 'R', 'CGU, CGC, CGA, CGG, AGA, AGG'],
['Glicina', 'Gly', 'G', 'GGU, GGC, GGA, GGG'],
['<b>Terminación</b>', 'stop', '—', '<b>UAA, UAG, UGA</b>']
];

module.exports = [
{
n: 69, group: G, pages: '38–41 y 43', title: 'El ARN: cómo es y por qué usa uracilo en lugar de timina',
lead: 'El ARN se parece mucho al ADN, pero tres diferencias químicas cambian todo: el azúcar, una base y la cantidad de cadenas.',
blocks: [
['h', 'Cómo es el ARN'],
['p', 'El ARN se forma por la unión (polimerización) de <b>ribonucleótidos</b>: nucleótidos con ribosa y con las bases A, G, C y U, unidos por enlaces fosfodiéster 3′→5′ igual que en el ADN. Es la molécula que participa en la <b>transferencia de la información</b> desde el ADN hasta las proteínas.'],
['gallery', [['p038-cadena-arn', 'Cadena de ARN del extremo 5′ al 3′: fosfatos (P), ribosas (R) y bases U, G, C, A'], ['p038-horquilla', 'Una cadena de ARN que se pliega sobre sí misma y aparea algunas de sus bases (horquilla)']], 38],
['table', ['Característica', 'Explicación'], [
['Es el ácido nucleico más abundante', 'Una célula típica tiene entre <b>4 y 10 veces más ARN que ADN</b>. Cada gen puede copiarse muchas veces en ARN y, además, los ribosomas están hechos en gran parte de ARN.'],
['Es químicamente inestable', 'Su ribosa tiene un OH libre en el C2′, que puede atacar y cortar el enlace fosfodiéster vecino (capítulo 60).'],
['Aparea A con U', 'En el ARN la base que se aparea con la adenina es el <b>uracilo</b> (A–U, con 2 puentes de hidrógeno), a diferencia del ADN, donde la A se aparea con T. G sigue apareándose con C.'],
['Casi siempre tiene una sola cadena', 'Es monocatenario, pero esa cadena puede doblarse y aparear algunas de sus propias bases, formando tramos cortos de doble hélice (horquillas, tallos y lazos). También puede aparearse con otra molécula de ARN o de ADN.'],
['Está principalmente en el citoplasma', 'En las células eucariotas se fabrica en el núcleo, pero la mayor parte trabaja en el citoplasma, donde están los ribosomas.']
]],
['img', 'p039-adn-vs-arn', 'Comparación de ADN y ARN: nucleótidos (desoxirribosa vs. ribosa con OH en 2′), bases (T en el ADN, U en el ARN) y polinucleótidos (ADN de dos cadenas, ARN de una).', 39],
['img', 'p039-cadena-arn', 'Cadena de ARN del extremo 5′ al 3′: cada ribosa (roja) tiene su OH en 2′; los fosfatos (amarillos) forman las uniones fosfodiéster; bases U, G, C y A.', 39],
['h', 'ADN y ARN, lado a lado'],
['table', ['', 'ADN', 'ARN'], [
['Azúcar', 'Desoxirribosa', 'Ribosa'],
['Base exclusiva', 'Timina', 'Uracilo'],
['Forma', 'Doble hélice', 'Cadena simple, que puede tener zonas apareadas'],
['Estabilidad', 'Mayor', 'Menor'],
['Ubicación (eucariotas)', 'Principalmente en el núcleo', 'Principalmente en el citoplasma'],
['Cantidad', 'Menor', 'Entre 4 y 10 veces más abundante'],
['Tamaño (peso molecular)', 'Generalmente mucho mayor: una sola molécula puede tener millones de pares de bases', 'Menor: cada ARN es la copia de un gen o de una parte'],
['Apareamiento', 'A–T y G–C', 'A–U y G–C']
]],
['p', 'En las células eucariotas el ADN está sobre todo en el núcleo, aunque mitocondrias y cloroplastos tienen su propio ADN. Las procariotas no tienen núcleo: su ADN está en el citoplasma, en una zona llamada nucleoide.'],
['h', '¿Por qué el ADN tiene T y el ARN tiene U?'],
['p', '<b>El problema.</b> La citosina se desamina de forma espontánea y se convierte en uracilo; le pasa a miles de bases por día en cada célula. Si el ADN usara uracilo como base normal, la célula no podría distinguir un U «legítimo» de uno que en realidad era una C dañada.'],
['steps', 'Qué pasaría si ese daño no se reparara', [
'Par original: <b>G–C</b>.',
'La C se desamina sola y queda <b>G–U</b>.',
'En la replicación cada cadena sirve de molde. La que tiene G vuelve a dar G–C (bien). La que tiene U se aparea con <b>A</b>: queda U–A.',
'En la siguiente replicación, esa A se aparea con T: <b>A–T</b>. El par G–C original se convirtió en A–T: una mutación permanente.'
]],
['p', '<b>La solución.</b> El ADN usa timina, que es un uracilo con un metilo en el C5. Ese metilo funciona como una <b>etiqueta de «base original»</b>. Así, cualquier U que aparezca en el ADN es necesariamente un error: la enzima <b>uracilo-ADN glicosilasa</b> lo detecta y lo saca, y después la <b>reparación por escisión de bases</b> vuelve a colocar la C.'],
['fig', F.tvsu, 'Con la timina como etiqueta, todo U en el ADN se reconoce como daño y se repara.'],
['p', '<b>¿Por qué el ARN no lo necesita?</b> Porque dura poco y se fabrican muchas copias: un error en una molécula de ARN no pasa a las células hijas ni suele ser grave. Además, usar U es <b>más barato</b>: fabricar T requiere un paso extra, el de la timidilato sintasa, que gasta folato (capítulo 75). En el ADN, que guarda la información a largo plazo, vale la pena pagar ese costo.'],
['trap', 'Esto vale para los ARN de la célula, que se copian del ADN. En los virus cuyo genoma es de ARN, los errores sí pasan a la descendencia.'],
['check', [
['¿Cuántas veces más ARN que ADN tiene una célula típica?', 'Entre 4 y 10 veces más.'],
['¿Por qué el ARN es químicamente inestable?', 'Por el OH libre en el C2′ de la ribosa.'],
['¿Qué enzima saca el uracilo del ADN?', 'La uracilo-ADN glicosilasa; después la reparación por escisión de bases repone la C.'],
['Si el ADN usara U normalmente, ¿qué problema habría?', 'No se podría distinguir un U legítimo de uno que viene de una C desaminada, y esos daños no se repararían.']
]]
]
},
{
n: 70, group: G, pages: '42 y 44', title: 'Tipos de ARN y dogma central de la biología molecular',
lead: 'Distintos ARN cumplen distintos trabajos en el camino de la información, desde el ADN hasta la proteína. Crick resumió ese camino en el «dogma central».',
blocks: [
['h', 'Los principales tipos de ARN'],
['p', 'Hay cuatro tipos principales de ARN, y cada uno se fabrica a partir de su propio gen:'],
['img', 'p042-tipos-arn', 'En una célula eucariota, el ADN del núcleo tiene genes de ARNt [2], genes que codifican proteínas (de ellos sale el ARNm [1]), genes de ARNr [3] y genes de ARNnp [4].', 42],
['table', ['Tipo', 'Qué hace', 'Para entenderlo'], [
['<b>ARNm</b> · ARN mensajero', 'Lleva la información para fabricar proteínas desde el núcleo hasta el citoplasma.', 'Es la «copia de trabajo» de un gen; sus codones se leen en el ribosoma.'],
['<b>ARNt</b> · ARN de transferencia', 'Lleva los aminoácidos a los ribosomas durante la traducción.', 'Es el adaptador: con su anticodón reconoce un codón y en su otra punta lleva el aminoácido que le corresponde.'],
['<b>ARNr</b> · ARN ribosomal', 'Es aproximadamente el <b>80 % del ARN total</b>. Junto con proteínas forma los ribosomas, la maquinaria que fabrica proteínas.', 'Los ribosomas pueden estar libres en el citoplasma o unidos al retículo endoplasmático.'],
['<b>ARNnp</b> · ARN nuclear pequeño (snRNA)', 'Participa en el procesamiento del ARNm: el corte y empalme que elimina los intrones del ARNm precursor.', 'Forma parte de la maquinaria del <i>splicing</i> (capítulo 71).']
]],
['h', 'El dogma central'],
['p', 'Francis Crick resumió cómo fluye la información biológica en el «dogma central de la biología molecular» (Nature, 1970):'],
['fig', F.dogma, 'El ADN se copia a sí mismo (replicación), se copia en ARN (transcripción) y el ARN se lee para fabricar proteínas (traducción). Desde la proteína la información no vuelve.'],
['img', 'p044-dogma', 'ADN → (replicación) ADN; ADN → (transcripción) ARN → (traducción) proteína. A la derecha, el triángulo del flujo de información con cruces rojas en las flechas que salen de la proteína.', 44],
['p', 'La frase clave de Crick es: «<i>Once (sequential) information has passed into protein it cannot get out again</i>», es decir, una vez que la información de secuencia pasó a una proteína, ya no puede salir de ella. Por eso en el triángulo están tachadas las flechas de proteína a ADN, de proteína a ARN y de proteína a proteína.'],
['trap', 'El dogma no prohíbe que la información vaya de ARN a ADN. Eso existe: es la <b>retrotranscripción</b> que hacen, por ejemplo, los retrovirus. Lo que el dogma prohíbe es usar la secuencia de una proteína para fabricar un ácido nucleico u otra proteína.'],
['check', [
['¿Qué tipo de ARN es el más abundante?', 'El ARNr: aproximadamente el 80 % del ARN total.'],
['¿Qué ARN participa en el corte y empalme?', 'El ARNnp (snRNA).'],
['Nombrá los tres procesos del dogma central.', 'Replicación (ADN → ADN), transcripción (ADN → ARN) y traducción (ARN → proteína).'],
['¿La retrotranscripción contradice el dogma central?', 'No: el dogma prohíbe que la información salga de la proteína. ARN → ADN está permitido.']
]]
]
},
{
n: 71, group: G, pages: '45–47', title: 'Replicación, transcripción y traducción',
lead: 'Las tres flechas del dogma central, una por una: quién participa, dónde ocurre y en qué dirección se lee y se escribe cada cadena.',
blocks: [
['h', 'Replicación: copiar el ADN'],
['table', ['Característica', 'Qué significa'], [
['Ocurre en el núcleo (eucariotas)', 'En las procariotas ocurre en el citoplasma; mitocondrias y cloroplastos replican su propio ADN. Dónde y cuándo se replica es distinto en procariotas y eucariotas.'],
['Es semiconservativa', 'Cada ADN hijo conserva una cadena del original y tiene una nueva.'],
['Participan muchas proteínas', 'Helicasas (abren la doble hélice), ADN polimerasas (copian), ligasas (unen fragmentos), topoisomerasas (alivian la torsión), entre otras.'],
['Dirección 5′→3′', 'Las cadenas nuevas siempre crecen agregando nucleótidos en su extremo 3′.'],
['Resultado', 'Dos moléculas de ADN idénticas.']
]],
['img', 'p045-horquilla', 'Horquilla de replicación: cadenas molde (template strands), ADN polimerasa, ADN ligasa, fragmentos de Okazaki, cadena retrasada (lagging strand) y cadena adelantada (leading strand).', 45],
['steps', 'Cómo funciona la horquilla', [
'La replicación empieza en sitios llamados <b>orígenes de replicación</b>. Desde cada origen se abren dos horquillas que avanzan en sentidos opuestos.',
'La helicasa separa las dos cadenas del ADN y cada una sirve de <b>molde</b>.',
'La ADN polimerasa solo puede agregar nucleótidos al extremo 3′: <b>sintetiza en sentido 5′→3′</b> y lee el molde de 3′ a 5′.',
'En una de las cadenas, ese sentido coincide con el avance de la horquilla: la cadena nueva crece de forma continua. Es la <b>cadena adelantada</b> o conductora.',
'En la otra, la polimerasa tiene que trabajar «hacia atrás», en tramos cortos llamados <b>fragmentos de Okazaki</b>: es la <b>cadena retrasada</b>.',
'La ADN polimerasa no puede empezar una cadena de cero: solo alarga un extremo 3′ que ya existe. Por eso una enzima llamada <b>primasa</b> fabrica primero un <b>cebador</b> corto de ARN; la polimerasa lo alarga con ADN. La cadena adelantada necesita un solo cebador; la retrasada, uno por cada fragmento de Okazaki. Después los cebadores se reemplazan por ADN.',
'La <b>ADN ligasa</b> une los fragmentos con enlaces fosfodiéster. Las topoisomerasas evitan que el ADN se retuerza por delante de la horquilla.'
]],
['img', 'p045-semiconservativa', 'Replicación semiconservativa: la molécula original da dos moléculas hijas en la primera generación y cuatro en la segunda.', 45],
['why', 'Cada molécula hija conserva una cadena de la madre y fabrica una nueva. Como la cadena nueva se arma por complementariedad con la vieja, las dos hijas quedan idénticas a la original. En la segunda generación, dos de las cuatro moléculas todavía llevan una cadena original.', 'Qué significa «semiconservativa»'],
['h', 'Transcripción: del ADN al ARN'],
['p', 'La <b>transcripción</b> copia la información de un tramo de ADN en una molécula de ARN, que puede ser ARNm, ARNr, ARNt u otro. La hace la <b>ARN polimerasa</b>, ayudada por <b>factores de transcripción</b> y por <b>reguladores</b> que deciden cuándo y cuánto se transcribe cada gen.'],
['img', 'p046-transcripcion', 'Cadena no molde de ADN, cadena molde, promotor (en rojo), ARN polimerasa y el ARN que se va formando, con la dirección de síntesis.', 46],
['steps', 'Las tres etapas', [
'<b>Iniciación:</b> la ARN polimerasa se une al <b>promotor</b>, una secuencia del ADN que marca dónde empezar.',
'<b>Elongación:</b> la polimerasa abre la doble hélice en una zona pequeña, lee la <b>cadena molde</b> de 3′ a 5′ y arma el ARN de 5′ a 3′ con ribonucleótidos trifosfato (ATP, GTP, CTP, UTP).',
'<b>Terminación:</b> al llegar a una secuencia <b>terminadora</b> del ADN, la polimerasa se suelta y libera el ARN. En las bacterias hay dos formas: el ARN recién hecho forma una horquilla que desprende a la polimerasa (terminación independiente de Rho), o una proteína llamada <b>Rho</b> la empuja fuera del ADN (terminación dependiente de Rho).'
]],
['trap', 'No confundas la terminación de la <b>transcripción</b> (una secuencia terminadora en el ADN) con la de la <b>traducción</b> (un codón de terminación en el ARNm: UAA, UAG o UGA).'],
['fig', F.strands, 'El ARN es complementario a la cadena molde, así que resulta igual a la cadena no molde, con U en lugar de T.'],
['p', 'En las células eucariotas primero se fabrica un <b>ARNm precursor</b> que tiene exones (partes que quedan) e intrones (partes que se eliminan). El <b>splicing</b> o corte y empalme saca los intrones y une los exones; lo hacen complejos que contienen ARNnp. Si siempre se unen los mismos exones es <b>constitutivo</b>; si un mismo precursor puede empalmarse de distintas formas para dar distintos ARNm es <b>alternativo</b>.'],
['img', 'p046-arnm', 'ARNm eucariota maduro: capuchón metilado en 5′, codón de inicio AUG, secuencia codificante (ya sin intrones), codón de terminación UAG y cola de poli(A) en 3′.', 46],
['p', 'El ARNm maduro tiene un <b>capuchón metilado en el extremo 5′</b> y una <b>cola de poli(A) en el 3′</b>, que lo protegen y ayudan a traducirlo. Entre esos extremos y la parte que codifica quedan regiones que no se traducen (5′ y 3′ no traducidas).'],
['h', 'Traducción: del ARN a la proteína'],
['p', 'La <b>traducción</b> decodifica un ARNm maduro para fabricar un polipéptido específico, siguiendo las reglas del código genético. El ribosoma lee el ARNm de a tres bases. Cada grupo de tres bases es un <b>codón</b>, y el <b>código genético</b> indica qué aminoácido corresponde a cada uno. En las eucariotas ocurre en el citoplasma y participan los tres ARN: ARNm (el mensaje), ARNt (trae los aminoácidos) y ARNr (forma el ribosoma).'],
['table', ['Aminoácido', 'Tres letras', 'Una letra', 'Codones (ARNm)'], CODE],
['p', 'Hay 64 codones: 61 indican aminoácidos y 3 indican el final. Casi todos los aminoácidos tienen más de un codón (el código es <b>degenerado</b>); solo la metionina (AUG) y el triptófano (UGG) tienen uno. AUG también marca el <b>inicio</b>.'],
['img', 'p047-codigo', 'El código genético en formato compacto: los codones agrupados sobre cada aminoácido, con su abreviatura de tres letras y de una letra.', 47],
['gallery', [['p047-traduccion', 'El ribosoma recorre el ARNm; entran ARNt cargados y la cadena de aminoácidos crece'], ['p047-arnt', 'ARNt: el lazo del anticodón se une al ARNm; en el otro extremo va el aminoácido'], ['p047-arnt-estructura', 'Estructura plegada de un ARN']], 47],
['steps', 'Las cuatro etapas', [
'<b>Activación:</b> cada aminoácido se une a su ARNt. Lo hacen las aminoacil-ARNt sintetasas, con gasto de ATP.',
'<b>Iniciación:</b> el ribosoma se arma sobre el ARNm en el codón de inicio AUG, con el ARNt que lleva metionina.',
'<b>Elongación:</b> el ribosoma tiene tres lugares para ARNt: <b>A</b> (entra el ARNt cargado con el aminoácido nuevo), <b>P</b> (está el ARNt que sostiene la cadena que crece) y <b>E</b> (sale el ARNt ya vacío). En cada ciclo entra al sitio A el ARNt cuyo anticodón es complementario al codón, se forma el enlace peptídico, y el ribosoma avanza un codón.',
'<b>Terminación:</b> al llegar a UAA, UAG o UGA no entra ningún ARNt y se libera la proteína.'
]],
['steps', 'Ejercicio integrador: del ADN a la proteína', [
'Cadena molde de ADN: 3′-TAC CGA ACC ATT-5′.',
'Transcripción (complementaria, con U en lugar de T): ARNm 5′-AUG GCU UGG UAA-3′.',
'Traducción con la tabla: AUG = Met (inicio) · GCU = Ala · UGG = Trp · UAA = fin.',
'Proteína: <b>Met–Ala–Trp</b>.'
]],
['check', [
['¿Por qué una de las cadenas se sintetiza en fragmentos?', 'Porque la ADN polimerasa solo sintetiza 5′→3′; en la cadena retrasada eso va en contra del avance de la horquilla, así que se fabrica en tramos (Okazaki) que después une la ligasa.'],
['¿Qué es el splicing alternativo?', 'Que un mismo ARNm precursor se pueda cortar y empalmar de distintas maneras para dar distintos ARNm maduros.'],
['Traducí 5′-AUG AAA GAU UGA-3′.', 'Met–Lys–Asp (UGA = fin).'],
['¿Qué tres ARN participan en la traducción?', 'ARNm, ARNt y ARNr.']
]]
]
}
];
