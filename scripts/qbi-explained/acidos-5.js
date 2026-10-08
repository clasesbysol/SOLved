'use strict';
/* Ácidos nucleicos I · Repaso: preguntas resueltas y glosario. Capítulos 78 y 79. */
const { M } = require('./kit-an');
const G = 'Ácidos nucleicos I';
const PRACT = 'Práctica';

/* Contenido de cada página del material de origen (solo para docs/acidos-nucleicos-i-cobertura.md; no se muestra en la app). */
const MAPA = [
[1, 'Portada: título, docente, mail y fecha', '58 y 79'], [2, 'Hoja de ruta, bibliografía y meme de Watson y Crick', '58 y 79'], [3, 'Preguntas para responder antes de la clase y actividad en grupo', '58 y 78'],
[4, 'Definición de ácido nucleico; esquema de polinucleótido', '58'], [5, 'Partes y funciones de los nucleótidos', '58 y 77'], [6, 'Miescher, Kossel y Levene; tetranucleótido', '59'],
[7, 'Purinas y pirimidinas: estructuras, numeración y propiedades', '59'], [8, 'Bases del ADN y del ARN', '59'], [9, 'Ribosa y desoxirribosa; números con prima', '60'],
[10, 'Nucleósidos; enlace N-glicosídico; β', '61'], [11, 'El grupo fosfato; fosfoéster y fosfoanhídrido', '61'], [12, 'Mono, di y trifosfatos; ATP y dAMP', '61'],
[13, 'Nombres con «desoxi»; nucleótido de ADN vs. ARN; inestabilidad del ARN', '60 y 62'], [14, 'Tabla 25.1 de nomenclatura', '62'], [15, 'Desoxirribonucleótidos', '62'],
[16, 'Ribonucleótidos', '62'], [17, 'Lo que se sabía: proteínas vs. ácidos nucleicos', '63'], [18, 'Experimento de Griffith', '63'],
[19, 'Experimento de Avery, MacLeod y McCarty', '63'], [20, 'Experimento de Hershey y Chase (video)', '63 y 79'], [21, 'Pauling, Watson, Crick, Wilkins, Franklin; línea de tiempo', '64'],
[22, 'Foto 51', '64'], [23, 'Difracción de rayos X, ley de Bragg y lectura de la Foto 51', '64'], [24, 'Chargaff', '64'],
[25, 'Modelo de Watson y Crick', '65'], [26, 'Extremos 5′ y 3′; unión fosfodiéster', '65'], [27, 'El enlace fosfodiéster en la cadena', '65'],
[28, 'Puentes de hidrógeno A–T y G–C', '65'], [29, 'Dimensiones de la doble hélice', '66'], [30, 'Cadenas antiparalelas; información en el orden de bases', '65'],
[31, 'Formas A, B y Z', '66'], [32, 'Cronología 1951–1962 y documentales', '67 y 79'], [33, 'Nature, 25 de abril de 1953', '67'],
[34, 'The paper mountain', '67'], [35, 'The Eagle y el modelo original', '67'], [36, 'Desnaturalización y renaturalización', '68'],
[37, 'Efecto hipercrómico y Tm', '68'], [38, 'Características del ARN', '69'], [39, 'La molécula de ARN; pregunta T/U', '69'],
[40, '«Escucho respuestas!» (pausa)', '69 y 79'], [41, 'Respuesta: por qué el ADN tiene T y el ARN U', '69'], [42, 'Principales tipos de ARN', '70'],
[43, 'Diferencias entre ADN y ARN', '69'], [44, 'Dogma central', '70'], [45, 'Replicación', '71'],
[46, 'Transcripción y ARNm', '71'], [47, 'Traducción y código genético', '71'], [48, 'Mapa del metabolismo de nucleótidos', '72'],
[49, 'Vías de novo y de recuperación', '72'], [50, 'Origen de los átomos; PRPP', '72'], [51, 'Estrategias para purinas y pirimidinas; cafeína', '73 y 74'],
[52, 'Regulación de la síntesis de purinas; AMP y GMP', '73'], [53, 'Los nueve pasos hasta IMP', '73'], [54, 'Regulación de la síntesis de pirimidinas', '74'],
[55, 'Síntesis de desoxirribonucleótidos', '75'], [56, 'Timidilato y drogas', '75'], [57, 'Carlos V', '76'],
[58, 'Degradación de purinas a urato, gota, alopurinol y rescate', '76'], [59, 'Coenzimas y SAM', '77'], [60, '«Respondemos las preguntas de nuevo…»', '78'],
[61, 'Preguntas de diagnóstico resueltas', '78'], [62, 'Verdadero o falso', '78'], [63, 'Opción múltiple', '78'], [64, 'Memes de cierre', '79']
];

module.exports = [
{
n: 78, group: G, pages: '3 y 60–63', title: 'Preguntas de repaso resueltas',
lead: 'Preguntas para comprobar que entendiste la unidad. Tocá una opción para ver si es correcta y abrí la explicación paso a paso.',
blocks: [
['h', 'Para pensar'],
['quiz', { kind: 'mc', q: '1 · ¿Cuánto mide el ADN de una sola célula humana si lo estiramos?', opts: ['34 Å', '10.4 nm', '2 μm', '1 cm', '2 m', '10 km'], correct: [4], answer: '<b>2 m</b>.', steps: [
'Datos: cada par de bases ocupa ' + M(String.raw`h = 3{,}4\ \text{Å} = 3{,}4 \times 10^{-10}\ \text{m}`, 'h = 3,4 Å = 3,4 × 10⁻¹⁰ m') + ' (capítulo 66). Una célula humana diploide tiene ≈ ' + M(String.raw`N = 6{,}4 \times 10^{9}`, 'N = 6,4 × 10⁹') + ' pares de bases (dos juegos de ≈ 3,2 × 10⁹).',
'Fórmula: ' + M(String.raw`L = N \times h`, 'L = N × h') + '.',
'Cuenta: ' + M(String.raw`L = 6{,}4 \times 10^{9} \times 3{,}4 \times 10^{-10}\ \text{m} \approx 2{,}2\ \text{m}`, 'L = 6,4 × 10⁹ × 3,4 × 10⁻¹⁰ m ≈ 2,2 m') + ' → unos 2 m.',
'Las otras opciones: 34 Å es lo que mide <b>una vuelta</b> de la hélice; 10.4 nm son apenas unas tres vueltas (el «10,4» recuerda a los pares por vuelta, no a una longitud); 2 μm y 1 cm se quedan muy cortos; 10 km es demasiado.'
] }],
['quiz', { kind: 'mc', q: '2a · En una célula hepática, ¿hay más ADN o más ARN?', sub: 'Marcá cuál hay más y cuántas veces más.', opts: ['ADN', 'ARN'], correct: [1], answer: '<b>ARN</b>.', steps: [
'El ARN es el ácido nucleico más abundante en la célula.',
'Cada gen puede transcribirse muchas veces, y los ribosomas tienen mucho ARNr (≈ 80 % del ARN total). En una célula hepática, muy activa en síntesis de proteínas, eso se nota todavía más.'
] }],
['quiz', { kind: 'mc', q: '2b · ¿Cuántas veces más?', opts: ['2x', '4x', '8x', '100x', '>100x'], correct: [1, 2], answer: '<b>4x y 8x</b>, las dos.', steps: [
'Una célula típica contiene entre 4 y 10 veces más ARN que ADN (capítulo 69).',
'Las dos opciones que caen dentro de ese rango son 4x y 8x: las dos son correctas.',
'2x se queda corto; 100x y >100x se pasan del rango.'
] }],
['h', 'Verdadero o falso'],
['quiz', { kind: 'vf', q: '1) Los experimentos de Griffith en 1928 demostraron que el ADN era el principio transformante.', opts: ['V', 'F'], correct: [1], answer: '<b>Falso</b>.', steps: [
'Griffith demostró que existe un factor transformante en las bacterias S muertas por calor, capaz de transformar a las R de forma estable y heredable.',
'No identificó qué molécula era. Eso lo hicieron Avery, MacLeod y McCarty en 1944, destruyendo cada candidato con enzimas (capítulo 63).'
] }],
['quiz', { kind: 'vf', q: '2) En una molécula de ADN, la cantidad de purinas es igual a la de pirimidinas.', opts: ['V', 'F'], correct: [0], answer: '<b>Verdadero</b> (para el ADN de doble cadena).', steps: [
'En la doble hélice cada purina se aparea con una pirimidina: A con T y G con C.',
'Entonces [A] = [T] y [G] = [C], y sumando: [A + G] = [T + C], es decir [purinas] = [pirimidinas] (regla de Chargaff, capítulo 64).',
'Ojo: vale para el ADN bicatenario con apareamiento normal; en una cadena sola no tiene por qué cumplirse.'
] }],
['quiz', { kind: 'vf', q: '3) En humanos, los nucleótidos son compuestos esenciales (se obtienen de la dieta).', opts: ['V', 'F'], correct: [1], answer: '<b>Falso</b>.', steps: [
'«Esencial» significa que el organismo no lo puede fabricar y tiene que obtenerlo de la dieta.',
'Los humanos sintetizamos nucleótidos «de novo» a partir de precursores chicos (aminoácidos, CO₂, folato, PRPP), y además los reciclamos por rescate (capítulos 72 a 74).',
'Los ácidos nucleicos de la dieta se aprovechan, pero no son imprescindibles.'
] }],
['quiz', { kind: 'vf', q: '4) Los ribonucleótidos se obtienen a partir de los desoxirribonucleótidos.', opts: ['V', 'F'], correct: [1], answer: '<b>Falso</b>.', steps: [
'Es al revés: los desoxirribonucleótidos se obtienen por <b>reducción de ribonucleótidos</b> (ribonucleótido reductasa, sobre los difosfatos).',
'No hay ribonucleótidos que se formen a partir de desoxirribonucleótidos (capítulo 75).'
] }],
['h', 'Opción múltiple'],
['quiz', { kind: 'mc', q: 'Los experimentos de Avery, MacLeod y McCarty demostraron que:', opts: ['las células S inactivadas igual producen neumonía', 'el DNA era el material genético de los fagos', 'la transformación bacteriana requiere DNA', 'existía un "principio transformante"'], correct: [2], answer: '<b>c) la transformación bacteriana requiere DNA</b>.', steps: [
'a) Falso: las S inactivadas por calor, solas, no matan al ratón (eso ya lo mostraba Griffith).',
'b) Es la conclusión de <b>Hershey y Chase</b> (1952), no de Avery.',
'c) Correcta: al destruir el ADN con ADNasa, la transformación desaparece; al destruir polisacárido, proteínas o ARN, no.',
'd) Que existía un principio transformante lo mostró <b>Griffith</b> (1928). Avery identificó cuál era.'
] }],
['quiz', { kind: 'mc', q: 'La forma Z de DNA se caracteriza por:', opts: ['ser right-handed (giro a derecha)', 'ser la estructura helicoidal más común', 'ser monocatenaria', 'ocurrir in vitro si hay repeticiones de d(GC)'], correct: [3], answer: '<b>d) ocurrir in vitro si hay repeticiones de d(GC)</b>.', steps: [
'a) Falso: la forma Z es <b>levógira</b> (gira a la izquierda). A y B son dextrógiras.',
'b) Falso: la más común, en condiciones fisiológicas, es la forma <b>B</b>.',
'c) Falso: es una <b>doble</b> hélice, como A y B.',
'd) Correcta: «Z (zig-zag) ocurre in vitro ante ciertas secuencias con repeticiones de d(GC) y d(AC)» (capítulo 66).'
] }],
['h', 'Práctica adicional'],
['p', 'Más ejercicios para repasar toda la unidad.'],
['quiz', { tag: PRACT, kind: 'mc', q: '¿Qué enlace une la base con el azúcar en un nucleósido?', opts: ['Fosfoéster', 'N-glicosídico', 'Fosfodiéster', 'Puente de hidrógeno'], correct: [1], answer: 'N-glicosídico, entre el C1′ y el N9 (purinas) o N1 (pirimidinas).' }],
['quiz', { tag: PRACT, kind: 'mc', q: 'Un ADN de doble cadena tiene 18 % de citosina. ¿Qué porcentaje de adenina tiene?', opts: ['18 %', '32 %', '36 %', '64 %'], correct: [1], answer: '32 %.', steps: ['C = G = 18 % → G + C = 36 %.', 'A + T = 64 % → A = T = 32 %.'] }],
['quiz', { tag: PRACT, kind: 'mc', q: '¿Cuál es la cadena complementaria de 5′-AGTC-3′, escrita de 5′ a 3′?', opts: ['5′-TCAG-3′', '5′-GACT-3′', '5′-CTGA-3′', '5′-AGTC-3′'], correct: [1], answer: '5′-GACT-3′.', steps: ['Complementaria base a base: TCAG, que queda 3′-TCAG-5′ por ser antiparalela.', 'Leída de 5′ a 3′: GACT.'] }],
['quiz', { tag: PRACT, kind: 'mc', q: '¿Qué enzima cataliza el paso comprometido de la síntesis de pirimidinas?', opts: ['Glutamina-PRPP amidotransferasa', 'ATCasa (aspartato transcarbamilasa)', 'CTP sintetasa', 'Timidilato sintasa'], correct: [1], answer: 'La ATCasa: forma carbamoilaspartato y es inhibida por CTP.' }],
['quiz', { tag: PRACT, kind: 'mc', q: 'El metotrexato frena la síntesis de dTMP porque inhibe:', opts: ['la timidilato sintasa', 'la ribonucleótido reductasa', 'la dihidrofolato reductasa', 'la dUTPasa'], correct: [2], answer: 'La dihidrofolato reductasa (DHFR): sin THF regenerado no hay metilen-THF para metilar dUMP.' }],
['quiz', { tag: PRACT, kind: 'mc', q: '¿Cuál de estos ADN tiene la Tm más alta?', opts: ['35 % G+C', '50 % G+C', '66 % G+C', 'Todos igual'], correct: [2], answer: '66 % G+C: más pares G–C (3 puentes de H y mejor apilamiento) → más temperatura para separar.' }],
['quiz', { tag: PRACT, kind: 'mc', q: 'El alopurinol se usa en la gota porque:', opts: ['aumenta la síntesis de urato oxidasa', 'inhibe la xantina oxidasa', 'activa la HGPRT', 'bloquea la PRPP sintetasa'], correct: [1], answer: 'Inhibe la xantina oxidasa: se forma menos ácido úrico y se acumulan hipoxantina y xantina, más solubles.' }]
]
},
{
n: 79, group: G, pages: '1, 2, 20 y 32', title: 'Glosario y para seguir leyendo',
lead: 'Los conceptos clave de la unidad en una línea cada uno, y dónde profundizar.',
blocks: [
['h', 'Glosario'],
['defs', [
['Ácido nucleico', 'Polinucleótido que almacena y transfiere información: ADN o ARN.'],
['Nucleótido', 'Base nitrogenada + pentosa + uno o más fosfatos (en C5′).'],
['Nucleósido', 'Base nitrogenada + pentosa, sin fosfato.'],
['Purina', 'Base de dos anillos fusionados (6 + 5 átomos): adenina y guanina.'],
['Pirimidina', 'Base de un anillo de 6 átomos: citosina, timina y uracilo.'],
['Ribosa / desoxirribosa', 'Pentosas del ARN y del ADN; difieren en el C2′ (OH en ribosa, H en desoxirribosa).'],
['Enlace N-glicosídico', 'Une el C1′ del azúcar con N9 (purinas) o N1 (pirimidinas).'],
['Enlace fosfoéster', 'Une un fosfato con el OH de un azúcar (C5′).'],
['Enlace fosfoanhídrido', 'Une dos fosfatos; su hidrólisis libera mucha energía.'],
['Enlace fosfodiéster', 'Un fosfato que une el C3′ de un azúcar con el C5′ del siguiente: esqueleto de la cadena.'],
['Extremo 5′ / 3′', 'Puntas de una cadena: fosfato libre en C5′ / OH libre en C3′.'],
['Antiparalelas', 'Las dos cadenas del ADN corren en sentidos opuestos (5′→3′ y 3′→5′).'],
['Complementariedad', 'A se aparea con T (o U) y G con C.'],
['Reglas de Chargaff', '[A] = [T], [G] = [C] y [purinas] = [pirimidinas] en el ADN bicatenario.'],
['Foto 51', 'Imagen de difracción de rayos X del ADN obtenida por Franklin y Gosling.'],
['Ley de Bragg', 'nλ = 2d sen θ: relaciona el ángulo de difracción con la distancia que se repite.'],
['Formas A, B y Z', 'Conformaciones del ADN; B es la fisiológica, Z es levógira.'],
['Desnaturalización', 'Separación de las cadenas por ruptura de puentes de H; los enlaces covalentes quedan intactos.'],
['Efecto hipercrómico', 'Aumento de la absorbancia a 260 nm al separarse las cadenas.'],
['Tm', 'Temperatura a la que el 50 % del ADN está desapareado.'],
['Factor transformante', 'Lo que transformó a las bacterias R en S en el experimento de Griffith: el ADN.'],
['Dogma central', 'ADN → ADN (replicación), ADN → ARN (transcripción), ARN → proteína (traducción).'],
['Replicación semiconservativa', 'Cada ADN hijo tiene una cadena vieja y una nueva.'],
['Fragmentos de Okazaki', 'Tramos cortos de la cadena retrasada, unidos luego por la ADN ligasa.'],
['Splicing', 'Corte y empalme que elimina intrones del precursor del ARNm.'],
['Codón', 'Grupo de tres bases del ARNm que especifica un aminoácido o la terminación.'],
['PRPP', '5-fosforribosil-1-pirofosfato: dador de la ribosa-5-fosfato en todos los nucleótidos.'],
['Vía «de novo»', 'Síntesis de nucleótidos desde precursores chicos.'],
['Vía de rescate', 'Reciclado de bases ya formadas uniéndolas a PRPP.'],
['Paso comprometido', 'Primera reacción que lleva a un único destino; suele ser el punto de control.'],
['Retroinhibición', 'El producto final de una vía inhibe una enzima del comienzo.'],
['IMP (inosinato)', 'Primer nucleótido de purina completo; su base es la hipoxantina.'],
['ATCasa', 'Aspartato transcarbamilasa: paso comprometido de pirimidinas, inhibida por CTP.'],
['Ribonucleótido reductasa', 'Convierte ribonucleótidos difosfato en desoxirribonucleótidos.'],
['Timidilato sintasa', 'Metila dUMP para dar dTMP usando N⁵,N¹⁰-metilen-THF.'],
['DHFR', 'Dihidrofolato reductasa: regenera THF; la inhiben metotrexato y aminopterina.'],
['Xantina oxidasa', 'Oxida hipoxantina a xantina y xantina a ácido úrico; la inhibe el alopurinol.'],
['Gota', 'Inflamación por cristales de urato cuando el urato se acumula.'],
['HGPRT', 'Hipoxantina-guanina fosforribosiltransferasa: rescate de hipoxantina y guanina.'],
['SAM', 'S-adenosilmetionina: principal dador de metilos de la célula.']
]],
['h', 'Para seguir leyendo'],
['table', ['Libro o artículo', 'Qué parte'], [
['Lehninger, <i>Principles of Biochemistry</i>', 'Capítulo 8 (nucleótidos y ácidos nucleicos)'],
['Stryer, <i>Biochemistry</i>, 8.ª edición', 'Capítulo 25 (metabolismo de nucleótidos)'],
['Watson J. y Crick F., <i>A Structure for Deoxyribose Nucleic Acid</i>, Nature 171, 737 (1953)', 'El artículo original de la doble hélice']
]],
['links', [
['El experimento de Hershey y Chase (video)', 'https://www.youtube.com/watch?v=ZtSfFqqhEIY', 'YouTube'],
['Documental sobre el descubrimiento de la estructura del ADN', 'https://www.youtube.com/watch?v=1vm3od_UmFg', 'YouTube'],
['Otro documental (desde el minuto 9:31)', 'https://www.youtube.com/watch?v=FMIsQlrtg_w&t=571s', 'YouTube']
]]
]
}
];
module.exports.MAPA = MAPA;
