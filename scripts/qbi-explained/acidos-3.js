'use strict';
/* Ácidos nucleicos I · Bloque 4: ARN y flujo de la información (diapositivas 38–47). Capítulos 69 a 71. */
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
lead: 'El ARN se parece mucho al ADN, pero tres diferencias químicas cambian todo: el azúcar, una base y el número de cadenas. Acá también está la respuesta a la pregunta de la actividad en grupo.',
blocks: [
['quote', 'El ARN se sintetiza por la polimerización de ribonucleótidos y forma una cadena de moléculas implicadas en el proceso de transferencia de la información. · Es el ácido nucleico más abundante en la célula. · Una célula típica contiene entre <b>4–10 veces más RNA que DNA</b>. · El azúcar presente en el RNA es la ribosa. Esto indica que en la posición 2′ del anillo del azúcar hay un grupo hidroxilo (OH) libre (químicamente inestable). · En la mayor parte de los casos es un polímero monocatenario, pero en ciertos casos puede presentar zonas en su secuencia con apareamientos intercatenarios. · Principalmente es citoplasmático.', 38],
['gallery', [['p038-cadena-arn', 'Cadena de ARN de extremo 5′ a extremo 3′: fosfatos (P), ribosas (R) y bases U, G, C, A'], ['p038-horquilla', 'Una cadena de ARN que se pliega sobre sí misma y aparea algunas de sus bases']], 38],
['table', ['Característica', 'Explicación'], [
['Polímero de ribonucleótidos', 'Sus unidades llevan ribosa y las bases A, G, C y U, unidas por enlaces fosfodiéster 3′→5′, igual que en el ADN.'],
['El más abundante: 4–10 veces más que ADN', 'Cada gen puede copiarse muchas veces en ARN; además, los ribosomas tienen mucho ARN. Es la respuesta a la pregunta 2 del diagnóstico (capítulo 78).'],
['Químicamente inestable', 'El OH libre del C2′ puede atacar el enlace fosfodiéster vecino (capítulo 60).'],
['Casi siempre monocatenario', 'Una sola cadena, que puede plegarse y aparear partes de sí misma.'],
['Principalmente citoplasmático', 'Se fabrica en el núcleo (eucariotas), pero la mayor parte trabaja en el citoplasma, donde ocurre la traducción.']
]],
['note', 'La diapositiva habla de «apareamientos <b>intercatenarios</b>». Lo más frecuente en el ARN son los apareamientos <b>intracatenarios</b>: la misma cadena se dobla y forma tramos de doble hélice local (horquillas, tallos y lazos), como en el dibujo de la horquilla y en el ARNt (capítulo 71). También existen apareamientos entre dos moléculas distintas (ARN–ARN o ARN–ADN), que serían intercatenarios. Las dos cosas pueden ocurrir.', 'intra o intercatenario'],
['h', 'La molécula de ARN comparada con el ADN'],
['img', 'p039-adn-vs-arn', 'El ARN es estructuralmente similar al ADN. Arriba, nucleótidos (desoxirribosa vs. ribosa con OH en 2′); en el medio, bases (T en el ADN, U en el ARN); abajo, polinucleótidos (ADN de dos cadenas, ARN de una).', 39],
['img', 'p039-cadena-arn', 'Cadena polinucleótida de ARN del extremo 5′ al 3′: cada ribosa (roja) tiene su OH en 2′; los fosfatos (amarillos) forman las uniones fosfodiéster; bases U, G, C y A.', 39],
['h', 'El DNA y el RNA se diferencian porque…'],
['table', ['', 'ADN', 'ARN'], [
['Azúcar', 'Desoxirribosa', 'Ribosa'],
['Base exclusiva', 'Timina (ya sabemos por qué)', 'Uracilo'],
['Configuración espacial', 'Doble helicoide', 'Polinucleótido lineal, que ocasionalmente puede presentar apareamientos'],
['Estabilidad', 'Mayor', 'Menor'],
['Ubicación', 'Principalmente nuclear', 'Principalmente citoplasmático'],
['Abundancia', '—', 'Entre 4 y 10 veces más abundante que el ADN']
]],
['img', 'p043-diferencias', 'Lista original de diferencias entre DNA y RNA. La diapositiva cierra con la pregunta: «¿Alguna de estas diferencias les sorprendió?»', 43],
['note', '«Principalmente nuclear» describe a las células eucariotas. Las mitocondrias y los cloroplastos tienen su propio ADN, y las procariotas no tienen núcleo: su ADN está en el citoplasma (nucleoide).', 'ubicación'],
['h', '¿Por qué el ADN tiene T y el ARN tiene U?'],
['p', 'Es la pregunta de la actividad en grupo (diapositivas 3 y 39). Después de la pausa «¡Escucho respuestas!» (diapositiva 40), la clase da esta respuesta:'],
['quote', '<b>Problema:</b> la citosina se desamina de forma espontánea y se convierte en uracilo. Le pasa a miles de bases por día en cada célula. Si el ADN usara U normalmente, la célula no podría distinguir un U «legítimo» de uno que en realidad era una C dañada. Sin corrección, esa C pasaría a aparearse con A y en la siguiente replicación quedaría una mutación (G–C → A–T). <b>Solución:</b> el ADN usa T, que es un uracilo con un metilo en el C5. Ese metilo funciona como etiqueta de «base original». Cualquier U que aparezca en el ADN es necesariamente un error, y la enzima uracilo-ADN glicosilasa lo detecta y lo saca. Después, la reparación por escisión de bases repone la C. <b>¿Por qué el ARN no lo necesita?</b> Porque el ARN dura poco y se hacen muchas copias: un error en una molécula no se hereda ni es grave. Además, usar U es más barato, porque fabricar T requiere un paso extra (la timidilato sintasa, con gasto de folato). En el ADN, que guarda la información a largo plazo, vale la pena pagar ese costo.', 41],
['fig', F.tvsu, 'Esquema propio del argumento: la T funciona como etiqueta de «base original», así que todo U en el ADN se reconoce como daño.'],
['steps', 'Cómo una C desaminada se convierte en mutación', [
'Par original: <b>G–C</b>.',
'La C se desamina espontáneamente y queda <b>G–U</b>.',
'Si no se repara, en la replicación cada cadena sirve de molde. La cadena con G da otra vez G–C (bien). La cadena con U se aparea con <b>A</b>: queda U–A.',
'En la siguiente replicación, la A se aparea con T: <b>A–T</b>. El par G–C original se transformó en A–T: una mutación permanente.'
]],
['note', 'Es una explicación simplificada. «Un error no se hereda ni es grave» vale para los ARN celulares que se copian del ADN (como el ARNm). En los virus cuyo genoma es ARN, los errores sí se heredan.', 'alcance'],
['check', [
['¿Cuántas veces más ARN que ADN tiene una célula típica?', 'Entre 4 y 10 veces más.'],
['¿Por qué el ARN es químicamente inestable?', 'Por el OH libre en el C2′ de la ribosa.'],
['¿Qué enzima saca el uracilo del ADN?', 'La uracilo-ADN glicosilasa; después la reparación por escisión de bases repone la C.'],
['Si el ADN usara U normalmente, ¿qué problema habría?', 'No se podría distinguir un U legítimo de uno que proviene de una C desaminada, y esos daños no se repararían.']
]]
]
},
{
n: 70, group: G, pages: '42 y 44', title: 'Tipos de ARN y dogma central de la biología molecular',
lead: 'Distintos ARN cumplen distintos trabajos en el camino de la información, desde el ADN hasta la proteína. Crick resumió ese camino en el «dogma central».',
blocks: [
['h', 'Principales tipos de ARN'],
['quote', 'Hay 4 tipos de ARN, cada uno codificado por su propio gen.', 42],
['img', 'p042-tipos-arn', 'Célula eucariota: en el ADN del núcleo hay genes de ARNt [2], genes codificadores de proteína (de donde sale el ARNm [1]), genes de ARNr [3] y genes de ARNnp [4]. Al lado, la descripción de cada tipo.', 42],
['table', ['Tipo', 'Qué hace (según la clase)', 'Para entenderlo'], [
['<b>[1] ARNm</b> · ARN mensajero', 'Lleva la información para la síntesis de proteínas desde el núcleo al citoplasma.', 'Es la «copia de trabajo» de un gen; sus codones se leen en el ribosoma.'],
['<b>[2] ARNt</b> · ARN de transferencia', 'Lleva los aminoácidos a los ribosomas durante la traducción de proteínas.', 'Es el adaptador: con su anticodón reconoce un codón y en su otra punta lleva el aminoácido correspondiente.'],
['<b>[3] ARNr</b> · ARN ribosomal', 'Constituye aprox. el 80 % del RNA total. Se asocia a riboproteínas y se une al RE formando un complejo capaz de sintetizar proteínas.', 'Junto con proteínas forma el ribosoma, la máquina que fabrica proteínas.'],
['<b>[4] ARNnp</b> · ARN nuclear pequeño (snRNA, <i>small nuclear RNA</i>)', 'Interviene en el procesamiento: reacción de corte y empalme para eliminar los intrones del ARNm precursor.', 'Forma parte de la maquinaria del <i>splicing</i> (capítulo 71).']
]],
['note', 'Son los cuatro tipos que presenta la clase, no todos los ARN que existen (hay otros, como los microARN). Además, los ribosomas pueden estar libres en el citoplasma o unidos al retículo endoplásmico: el ARNr forma ribosomas en los dos casos.', 'alcance'],
['h', 'El dogma central'],
['p', 'Francis Crick lo formuló en 1958 y lo revisó en <i>Central dogma of molecular biology</i>, Nature. 1970 Aug 8;227(5258):561-3, la referencia que muestra la clase.'],
['img', 'p044-dogma', 'DNA → (Replication) DNA; DNA → (Transcription) RNA → (Translation) protein. Al lado, Sir Francis Crick y el triángulo del flujo de la información biológica (Biological information flow) con cruces rojas en las flechas que salen de PROTEIN.', 44],
['fig', F.dogma, 'Esquema propio del dogma central y de lo que prohíbe.'],
['quote', 'FRASE CLAVE: “Once (sequential) information has passed into protein it cannot get out again”.', 44],
['p', 'En castellano: «Una vez que la información (de secuencia) pasó a la proteína, no puede volver a salir». Las cruces del triángulo marcan justamente eso: no hay flechas de proteína a ADN, de proteína a ARN ni de proteína a proteína.'],
['note', 'El dogma no dice que la información solo vaya de ADN a ARN. Existe la <b>retrotranscripción</b> (ARN → ADN, por ejemplo en retrovirus) y la replicación de ARN en algunos virus. Lo que el dogma restringe es que la secuencia de una proteína se use para fabricar un ácido nucleico u otra proteína.', 'qué prohíbe y qué no'],
['quote', 'Los ácidos nucleicos participan en los procesos de replicación (slide 42), transcripción (slide 43) y traducción (slide 44).', 44],
['p', 'En este resumen, esos tres procesos están en el capítulo 71 (diapositivas 45, 46 y 47 del PDF).'],
['check', [
['¿Qué tipo de ARN es el más abundante?', 'El ARNr: aproximadamente el 80 % del ARN total.'],
['¿Qué ARN interviene en el corte y empalme?', 'El ARNnp (snRNA).'],
['Nombrá los tres procesos del dogma central.', 'Replicación (ADN → ADN), transcripción (ADN → ARN) y traducción (ARN → proteína).'],
['¿La retrotranscripción contradice el dogma central?', 'No: el dogma restringe que la información salga de la proteína. ARN → ADN está permitido.']
]]
]
},
{
n: 71, group: G, pages: '45–47', title: 'Replicación, transcripción y traducción',
lead: 'Las tres flechas del dogma central, una por una: quién participa, dónde ocurre y en qué dirección se lee y se escribe cada cadena.',
blocks: [
['h', 'Replicación: copiar el ADN'],
['quote', '·Ubicación: núcleo ·Semiconservativa ·Intervienen complejos sistemas de proteínas: polimerasas, ligasas, topoisomerasas, helicasas… ·El resultado son dos moléculas de DNA idénticas. ·El proceso es distinto entre procariotas y eucariotas (dónde y cuándo) ·Dirección de síntesis es 5′–3′.', 45],
['img', 'p045-horquilla', 'Horquilla de replicación: cadenas molde (Template Strands), horquilla (Replication Fork), ADN polimerasa (DNA Polymerase), ADN ligasa (DNA Ligase), fragmentos de Okazaki, cadena retrasada (Lagging Strand) y cadena adelantada o conductora (Leading Strand).', 45],
['steps', 'Cómo leer la horquilla', [
'Las dos cadenas del ADN original se separan (eso lo hace la helicasa) y cada una sirve de <b>molde</b>.',
'La ADN polimerasa solo agrega nucleótidos al extremo 3′ de la cadena nueva: <b>sintetiza en sentido 5′→3′</b> y lee el molde de 3′ a 5′.',
'En una cadena molde eso coincide con el sentido en que se abre la horquilla: la cadena nueva crece de forma continua (<b>cadena adelantada</b> o conductora, leading).',
'En la otra, la polimerasa tiene que trabajar «hacia atrás», en tramos cortos: los <b>fragmentos de Okazaki</b> (cadena retrasada, lagging). Cada fragmento empieza sobre un cebador corto de ARN.',
'La <b>ADN ligasa</b> une los fragmentos con enlaces fosfodiéster. Las topoisomerasas alivian la tensión del enrollamiento por delante de la horquilla.'
]],
['img', 'p045-semiconservativa', 'Replicación semiconservativa: la molécula original (Original parent molecule) da dos moléculas hijas de primera generación (First-generation daughter molecules) y cuatro de segunda generación (Second-generation daughter molecules).', 45],
['why', 'Cada molécula hija conserva una cadena de la madre y tiene una cadena nueva. Como la cadena nueva se arma por complementariedad con la vieja, las dos moléculas hijas quedan idénticas a la original. En la segunda generación, dos de las cuatro moléculas todavía llevan una cadena original.', 'Qué significa semiconservativa'],
['note', '«Ubicación: núcleo» describe a las eucariotas. En las procariotas la replicación ocurre en el citoplasma (no tienen núcleo), y mitocondrias y cloroplastos replican su propio ADN.', 'dónde'],
['h', 'Transcripción: del ADN al ARN'],
['quote', 'Proceso por el cual la información genética de la molécula de DNA se transfiere a una molécula de RNA. Puede ser mRNA, rRNA, tRNA… ·Intervienen complejos proteicos: RNA polimerasa, factores de transcripción, reguladores. ·En eucariotas: existe un precursor de mRNA y ocurren mecanismos de splicing constitutivo/alternativo. ·Tres procesos: iniciación (RNA polimerasa se une al promotor), elongación (RNA polimerasa transcribe) y terminación (RNApol reconoce un terminador).', 46],
['img', 'p046-transcripcion', 'Cadena no molde de ADN (DNA nontemplate strand), cadena molde (DNA template strand), promotor (Promoter, en rojo), ARN polimerasa (RNA polymerase) y el ARN naciente con la dirección de síntesis (Direction of synthesis).', 46],
['steps', 'Las tres etapas', [
'<b>Iniciación:</b> la ARN polimerasa (con factores de transcripción) se une al <b>promotor</b>, una secuencia del ADN que marca dónde empezar.',
'<b>Elongación:</b> la polimerasa abre localmente la doble hélice, lee la <b>cadena molde</b> de 3′ a 5′ y arma el ARN de 5′ a 3′, con ribonucleótidos trifosfato (ATP, GTP, CTP, UTP).',
'<b>Terminación:</b> al reconocer una secuencia <b>terminadora</b>, la polimerasa se suelta y libera el ARN.'
]],
['why', 'El ARN es complementario a la cadena molde, así que resulta <b>igual</b> a la otra cadena (la no molde), cambiando T por U. Por eso a la cadena no molde también se la llama cadena codificante.', 'Por qué el ARN «se parece» a la cadena no molde'],
['img', 'p046-arnm', 'ARNm eucariota maduro: capuchón metilado en 5′ (5′ methylated cap), codón de inicio AUG, secuencias codificantes con los intrones ya removidos por splicing (coding sequences with introns removed by splicing), codón de terminación UAG y cola de poli(A) en 3′ (3′-Poly [A] tail).', 46],
['p', 'En eucariotas se transcribe primero un <b>precursor</b> del ARNm que tiene exones (partes que quedan) e intrones (partes que se eliminan). El <b>splicing</b> o corte y empalme saca los intrones y une los exones; lo hacen complejos que contienen ARNnp (capítulo 70). Si siempre se unen los mismos exones es <b>constitutivo</b>; si un mismo precursor puede empalmarse de distintas formas para dar distintos ARNm es <b>alternativo</b>. El ARNm maduro tiene además un capuchón en 5′ y una cola de poli(A) en 3′; entre esos extremos y la zona que codifica quedan regiones que no se traducen (5′ y 3′ no traducidas).'],
['h', 'Traducción: del ARN a la proteína'],
['quote', 'Ribosoma lee el ARNm de a tres bases (codones) y lo convierte a una secuencia de aminoácidos según el código genético que se muestra abajo. ·En eucariotas es citoplasmático. ·Intervienen: mRNA, tRNA, rRNA. ·4 etapas: activación, iniciación, elongación, terminación.', 47],
['img', 'p047-codigo', 'El código genético tal como aparece en la diapositiva: los codones agrupados sobre cada aminoácido, con la abreviatura de tres letras (Ala, Arg, Asp…) y la de una letra (A, R, D…).', 47],
['table', ['Aminoácido', 'Tres letras', 'Una letra', 'Codones (ARNm)'], CODE],
['p', 'Son 64 codones: 61 codifican aminoácidos y 3 son de terminación. Casi todos los aminoácidos tienen más de un codón (el código es <b>degenerado</b>); solo metionina (AUG) y triptófano (UGG) tienen uno. AUG también es la señal de <b>inicio</b>.'],
['gallery', [['p047-traduccion', 'Traducción: ribosoma, ARNm, ARNt que entra (tRNA docking) y que sale (tRNA leaving), y la cadena de aminoácidos que crece (Growing amino acid chain)'], ['p047-arnt', 'ARNt: lazo del anticodón (se une al ARNm) y sitio de unión del aminoácido (Glu en el ejemplo)'], ['p047-arnt-estructura', 'Estructura plegada de un ARN']], 47],
['steps', 'Las cuatro etapas', [
'<b>Activación:</b> cada aminoácido se une a su ARNt (en el sitio de unión del aminoácido). Lo hacen las aminoacil-ARNt sintetasas, con gasto de ATP.',
'<b>Iniciación:</b> el ribosoma se arma sobre el ARNm en el codón de inicio AUG, con el ARNt que lleva metionina.',
'<b>Elongación:</b> el ribosoma avanza de a un codón (tres bases). Entra el ARNt cuyo anticodón es complementario al codón, y se forma el enlace peptídico con la cadena que viene creciendo.',
'<b>Terminación:</b> al llegar a UAA, UAG o UGA no entra ningún ARNt; se libera la proteína.'
]],
['steps', 'Ejercicio integrador: del ADN a la proteína', [
'Cadena molde de ADN: 3′-TAC CGA ACC ATT-5′.',
'Transcripción (complementaria, con U en lugar de T): ARNm 5′-AUG GCU UGG UAA-3′.',
'Traducción con la tabla: AUG = Met (inicio) · GCU = Ala · UGG = Trp · UAA = stop.',
'Proteína: <b>Met–Ala–Trp</b>.'
]],
['check', [
['¿Por qué una de las cadenas se sintetiza en fragmentos?', 'Porque la ADN polimerasa solo sintetiza 5′→3′; en la cadena retrasada eso va en contra del avance de la horquilla, así que se fabrica en tramos (Okazaki) que después une la ligasa.'],
['¿Qué es el splicing alternativo?', 'Que un mismo precursor de ARNm se pueda cortar y empalmar de distintas maneras para dar distintos ARNm maduros.'],
['Traducí 5′-AUG AAA GAU UGA-3′.', 'Met–Lys–Asp (UGA = stop).'],
['¿Qué tres ARN intervienen en la traducción?', 'ARNm (el mensaje), ARNt (trae los aminoácidos) y ARNr (forma el ribosoma).']
]]
]
}
];
