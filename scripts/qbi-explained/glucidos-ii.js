'use strict';
/* Glúcidos II · Análisis estructural de glicanos (clase del Dr. Gabriel Briones; 72 diapositivas). Capítulos 42 a 53.
   Va justo después de Glúcidos I (caps. 29–41) y antes de Lípidos I. */
const { M } = require('./kit-an');
const { svg, T, R, arrow } = require('./kit');
const G = 'Glúcidos II';

/* ---------- Esquemas propios ---------- */
const box = (x, y, w, h, cls, l1, l2) => R(x, y, w, h, cls, 10) + T(x + w / 2, y + (l2 ? h / 2 - 3 : h / 2 + 5), l1, 'mid b sm') + (l2 ? T(x + w / 2, y + h / 2 + 14, l2, 'mid sm mut') : '');
const FIG = {
  ruta: svg(760, 330,
    box(10, 20, 130, 54, 'fn', 'Material', 'biológico') + arrow(140, 47, 162, 47) +
    box(164, 20, 130, 54, 'fy', 'Aislar', 'extraer y purificar') + arrow(294, 47, 316, 47) +
    box(318, 20, 130, 54, 'fy', 'Liberar', 'PNGasa · hidracina') + arrow(448, 47, 470, 47) +
    box(472, 20, 130, 54, 'fy', 'Limpiar y separar', 'PGC · SEC · iones') + arrow(602, 47, 624, 47) +
    box(626, 20, 124, 54, 'fy', 'Lectinas', 'afinidad') +
    arrow(688, 74, 688, 104) +
    box(560, 106, 190, 54, 'fg', '¿Está puro?', 'HPSEC · TLC · FACE') +
    arrow(560, 133, 520, 175) + arrow(655, 160, 655, 200) + arrow(750, 133, 760, 133, 'thin') +
    T(380, 196, 'Con el glicano puro se hacen tres preguntas distintas:', 'mid sm mut') +
    box(20, 210, 230, 100, 'fa', '¿Qué azúcares hay?', 'hidrólisis → HPAEC-PAD') + T(135, 296, 'composición', 'mid sm acc b') +
    box(265, 210, 230, 100, 'fb', '¿En qué OH se unen?', 'metilación → PMAA → GC-MS') + T(380, 296, 'posiciones de enlace', 'mid sm alt b') +
    box(510, 210, 240, 100, 'fg', '¿En qué orden? ¿α o β?', 'exoglicosidasas + SEC') + T(630, 296, 'secuencia y anomería', 'mid sm ok b'),
    'Ruta completa del análisis de un glicano'),
  xiii: svg(760, 210,
    box(8, 70, 104, 60, 'fn', 'Mezcla', 'I, III, VII, VIII…') + arrow(112, 100, 138, 100) +
    box(140, 70, 112, 60, 'fa', 'Con A', 'NO se une') + arrow(252, 100, 278, 100) +
    box(280, 70, 112, 60, 'fb', 'LCA', 'NO se une') + arrow(392, 100, 418, 100) +
    box(420, 70, 112, 60, 'fg', 'L₄-PHA', 'SÍ se une') + arrow(532, 100, 558, 100) +
    box(560, 70, 112, 60, 'fy', 'MAL', 'SÍ se une') + arrow(672, 100, 698, 100) +
    T(728, 106, 'XIII', 'mid lg b acc') +
    T(196, 40, 'sale en el', 'mid sm mut') + T(196, 56, '1.er pico', 'mid sm b') +
    T(336, 40, 'sale en el', 'mid sm mut') + T(336, 56, '1.er pico', 'mid sm b') +
    T(476, 40, 'sale en el', 'mid sm mut') + T(476, 56, '2.º pico', 'mid sm b') +
    T(616, 40, 'sale en el', 'mid sm mut') + T(616, 56, '2.º pico', 'mid sm b') +
    T(196, 156, 'no es alta manosa', 'mid sm mut') + T(196, 172, 'ni biantenario', 'mid sm mut') +
    T(336, 156, 'sin fucosa', 'mid sm mut') + T(336, 172, 'en el núcleo', 'mid sm mut') +
    T(476, 156, 'tri- o', 'mid sm mut') + T(476, 172, 'tetraantenario', 'mid sm mut') +
    T(616, 156, 'tiene ácido', 'mid sm mut') + T(616, 172, 'siálico', 'mid sm mut'),
    'Recorrido de la fracción XIII por las cuatro columnas de lectinas'),
  gu: svg(760, 250,
    T(10, 22, 'Unidades de glucosa (GU) del glicano después de cada enzima', 'b') +
    [['A · sin enzima', 14.47, 'fa'], ['B · β-galactosidasa', 12.25, 'fa'], ['C · β-hexosaminidasa', 8.20, 'fb'], ['D · α-manosidasa', 6.54, 'fg'], ['E · β-manosidasa', 5.50, 'fg'], ['F · α-fucosidasa', 4.45, 'fy']]
      .map(([l, v, c], i) => T(10, 52 + i * 33, l, 'sm') + R(190, 38 + i * 33, v * 36, 22, c, 5) + T(196 + v * 36, 54 + i * 33, String(v).replace('.', ','), 'sm b'))
      .join(''),
    'Unidades de glucosa después de cada exoglicosidasa'),
};

/* ---------- Capítulos ---------- */
module.exports = [
{
n: 42, group: G, pages: '1–4', title: 'Qué significa analizar la estructura de un glicano',
lead: 'Glúcidos I mostró que los azúcares guardan energía, construyen estructuras y llevan información. Esta clase responde la pregunta práctica: si tengo un glicano desconocido, ¿cómo averiguo exactamente qué es?',
blocks: [
['h', 'De dónde venimos'],
['p', 'Glúcidos I terminó en el repaso de monosacáridos, carbono quiral, disacáridos, polisacáridos de reserva, glicosaminoglicanos, glicoconjugados y funciones. El mensaje final es la idea que justifica toda esta unidad: <b>la estructura de los glúcidos determina su función</b>, y pequeños cambios de estructura producen grandes diferencias biológicas. Si la estructura importa tanto, hay que poder medirla.'],
['h', 'Glicano y aglicona'],
['defs', [
['Glicano', 'Polisacárido u oligosacárido <b>libre</b>, o la <b>porción glucídica</b> de un glicoconjugado.'],
['Aglicona', 'La porción <b>no glucídica</b> de un glicoconjugado: la proteína de una glicoproteína, el lípido de un glicolípido.'],
['Glicoconjugado', 'Molécula formada por un glicano unido covalentemente a otra cosa (proteína o lípido). Lo viste en Glúcidos I (capítulo 36).']
]],
['img', 'd03-glicanos-en-la-celula', 'Ejemplos de glicanos: a la izquierda, polisacáridos libres (glucógeno, amilopectina, amilosa); a la derecha, glicanos unidos a una aglicona en la membrana: N-glicano y O-glicano de una glicoproteína, cadenas de GAG de un proteoglicano y el glicano de un gangliósido. Las flechas azules señalan la aglicona.', 3],
['h', 'Los cinco datos que definen un glicano'],
['p', 'Para decir que «conocemos» un glicano hay que poder contestar cinco preguntas. Cada técnica de la clase contesta <b>una o dos</b>, nunca todas. Por eso el análisis es una combinación de métodos.'],
['table', ['Factor', 'Pregunta', 'Técnica que lo responde (capítulo)'], [
['<b>Naturaleza de los residuos</b>', '¿Qué monosacáridos hay y en qué proporción?', 'Hidrólisis ácida + HPAEC-PAD (49)'],
['<b>Orden de los residuos</b>', '¿Cuál va unido a cuál, desde el extremo no reductor?', 'Exoglicosidasas + SEC (52)'],
['<b>Posición de los enlaces</b>', '¿Qué OH de cada azúcar participa del enlace (1→4, 1→6…)?', 'Metilación + PMAA + GC-MS (50 y 51)'],
['<b>Configuración de los enlaces</b>', '¿El carbono anomérico está en α o en β?', 'Exoglicosidasas específicas de α o de β (52)'],
['<b>Naturaleza y sitio de unión en la aglicona</b>', '¿Está unido a Asn, a Ser/Thr, a un lípido?', 'Tipo de enzima o tratamiento que lo libera (44)']
]],
['fig', FIG.ruta, 'Mapa de la clase. Primero se obtiene el glicano puro; después, tres análisis independientes contestan qué azúcares hay, en qué posiciones se unen y en qué orden y configuración.'],
['why', 'Porque los azúcares, a diferencia del ADN o las proteínas, <b>no se fabrican copiando un molde</b>. Las glicosiltransferasas van agregando residuos de a uno, y el resultado puede ramificarse y variar de una molécula a otra (heterogeneidad). No hay una «secuencia» que se pueda leer de corrido: hay que reconstruirla con piezas de información.', 'Por qué no alcanza con una sola técnica'],
['check', [
['¿Qué es la aglicona de una glicoproteína?', 'La proteína: la parte que no es glúcido.'],
['¿Qué dos factores no se pueden deducir de la composición monosacarídica?', 'Ninguno de los otros cuatro: la composición dice qué azúcares hay y cuántos, pero no el orden, ni las posiciones, ni α/β, ni a qué se une.']
]]
]
},
{
n: 43, group: G, pages: '5–7', title: 'Purificar un glicano: del material biológico al extracto',
lead: 'Antes de analizar hay que tener el glicano solo. El camino depende de dónde está: libre como polisacárido o unido a una proteína o a un lípido.',
blocks: [
['h', 'El esquema general'],
['p', 'Todo empieza igual: <b>material biológico → extracto → aislamiento y purificación</b>. Según lo que se aísle, se obtienen cuatro tipos de moléculas: <b>glicoproteínas, proteoglicanos, glicolípidos y polisacáridos</b>. De las glicoproteínas y los glicolípidos se liberan <b>oligosacáridos</b>; de los proteoglicanos se liberan cadenas de <b>polisacáridos</b> (los GAG).'],
['table', ['Se aísla…', '…y de ahí se obtiene', 'Cómo'], [
['Glicoproteína', 'Oligosacáridos (N- y O-glicanos)', 'Enzimas o hidracinólisis (capítulo 44)'],
['Glicolípido', 'Oligosacáridos', 'Lipasas, ozonólisis, o se estudia directo por RMN'],
['Proteoglicano', 'Polisacáridos (cadenas de GAG)', 'Se separa la cadena de la proteína central'],
['Polisacárido libre', 'Ya es el glicano', 'Desproteinizar, precipitar, dializar']
]],
['h', 'Aislar polisacáridos: tres pasos'],
['steps', 'Del extracto al polisacárido', [
'<b>Desproteinización</b> con ácido tricloroacético (TCA) o con proteasas: se eliminan las proteínas, que precipitan con el TCA o quedan cortadas en péptidos.',
'<b>Precipitación con etanol</b> hasta 80 % final. Los polisacáridos, muy grandes y polares, dejan de ser solubles cuando baja la polaridad del medio y precipitan; los azúcares chicos y muchas sales quedan en solución.',
'<b>Disolución y diálisis</b> contra agua: se redisuelve el precipitado y se dializa para sacar sales y moléculas chicas que quedaron atrapadas.'
]],
['why', 'El etanol compite con el polisacárido por el agua. Con poca agua disponible para hidratarlo, las cadenas se asocian entre sí y precipitan. Es la misma lógica que el salting out de proteínas, pero con un solvente orgánico en lugar de sal.', 'Por qué el etanol precipita polisacáridos'],
['h', 'Aislar glicolípidos y glicoproteínas'],
['cols', [
['Glicolípidos', '<b>Partición con solventes</b>: como son anfipáticos, se reparten entre una fase orgánica y una acuosa. Es la misma idea que la extracción de lípidos del TP4 (capítulo de Lípidos).'],
['Glicoproteínas', 'Se aíslan como cualquier proteína: <b>precipitación y diálisis</b>, y después <b>purificación por cromatografía en columna</b> (lo que viste en Proteínas).']
]],
['check', [
['¿Para qué se usa el TCA al aislar un polisacárido?', 'Para desproteinizar: precipita las proteínas y las saca de la muestra.'],
['¿Por qué se dializa al final?', 'Para eliminar sales y moléculas chicas; el polisacárido, grande, queda dentro de la membrana.']
]]
]
},
{
n: 44, group: G, pages: '8–14', title: 'N-glicanos y O-glicanos: cómo están unidos y cómo se liberan',
lead: 'En una glicoproteína los glicanos se unen de dos maneras: al N de una asparagina o al O de una serina o treonina. Esa diferencia decide qué herramienta sirve para soltarlos.',
blocks: [
['h', 'Liberar el glicano: un método para cada tipo de unión'],
['table', ['Glicoconjugado', 'Cómo se libera el glicano'], [
['Glicolípidos', 'Lipasas, ozonólisis, o RMN directa sin liberar'],
['N-glicanos (unidos a Asn)', 'Métodos <b>enzimáticos</b> con N-glicosidasas (PNGasa F/A, Endo H)'],
['O-glicanos (unidos a Ser/Thr)', '<b>Hidracinólisis</b> (química)']
]],
['h', 'N-glicosilación'],
['p', 'El glicano se une al <b>nitrógeno del grupo amida</b> de la cadena lateral de una <b>asparagina</b>. No cualquier Asn: tiene que estar en la <b>secuencia consenso Asn–X–Ser/Thr</b>, donde X puede ser cualquier aminoácido <b>menos prolina</b>.'],
['img', 'd09-n-glicosilacion', 'N-glicosilación: (1) sitio de unión Asn–X–Ser/Thr; (2) el precursor Glc₃Man₉GlcNAc₂ (14 azúcares) se arma sobre dolicol-fosfato en la membrana del RE; (3) se transfiere en bloque a la proteína naciente, se recortan glucosas y manosas en el RE y se modifica en el Golgi; (4) funciones.', 9],
['steps', 'Cómo se arma un N-glicano', [
'En la membrana del <b>retículo endoplasmático rugoso</b> se construye un oligosacárido precursor sobre un lípido, el <b>dolicol-fosfato</b>: <b>Glc₃Man₉GlcNAc₂</b>, 14 azúcares.',
'Ese bloque entero se <b>transfiere en bloque</b> a la Asn de la proteína mientras se está sintetizando.',
'En el RE se eliminan las glucosas y algunas manosas: es parte del <b>control de calidad del plegamiento</b>.',
'En el <b>Golgi</b> se hacen modificaciones adicionales, que dan tres familias: ricos en manosa, híbridos o complejos.'
]],
['img', 'd10-tipos-n-glicanos', 'N-glicanos. Izquierda: el enlace N-glicosídico entre GlcNAc y el N de la amida de la Asn. Derecha: los tres tipos (oligomanosa, complejo e híbrido); el recuadro rojo marca el núcleo común a todos. Abajo, la secuencia del núcleo.', 10],
['p', 'Todos los N-glicanos comparten un <b>núcleo</b> (core) de cinco azúcares:'],
['eq', 'Manα1-3 (Manα1-6) Manβ1-4 GlcNAcβ1-4 GlcNAcβ1-N Asn-X-Ser/Thr (X ≠ Pro)'],
['cols', [
['Oligomanosa (alta manosa)', 'Sobre el núcleo solo se agregan <b>manosas</b>.'],
['Complejo', 'Las ramas (antenas) empiezan con GlcNAc y suelen seguir con Gal y ácido siálico; puede haber <b>fucosa en el núcleo</b>.'],
['Híbrido', 'Una rama tipo oligomanosa y otra tipo complejo.']
]],
['note', 'En la leyenda de la diapositiva 10 el círculo amarillo dice «Fuc» y el cuadrado azul dice «N-AcGln». En la notación de símbolos que usa toda la clase, el <b>círculo amarillo es galactosa (Gal)</b>, el <b>cuadrado azul es GlcNAc</b> y la <b>fucosa es el triángulo rojo</b> (como el que cuelga en α6 del núcleo del glicano complejo). Leelo así para que coincida con el resto de las diapositivas.', 'Para no confundirse: la leyenda de la diapositiva 10'],
['h', 'Enzimas para liberar N-glicanos'],
['img', 'd11-pngasa-endoh', 'Dónde corta cada enzima. La PNGasa F corta entre la GlcNAc y la Asn en los tres tipos de N-glicano. La Endo H corta entre las dos GlcNAc del núcleo, pero no en los complejos (cruz azul).', 11],
['table', ['Enzima', 'Dónde corta', 'Qué libera', 'Limitación'], [
['<b>PNGasa F y PNGasa A</b> (péptido-N-glicosidasas)', 'Entre la GlcNAc y la Asn; la Asn pasa a <b>Asp</b>', '<b>Todos</b> los N-glicanos, con el núcleo completo', 'Por impedimento estérico, uso limitado en proteínas <b>nativas</b> (plegadas)'],
['<b>Endo H</b> (endoglicosidasa H)', 'Entre las <b>dos GlcNAc</b> del núcleo; queda una GlcNAc pegada a la proteína', 'Oligomanosa e híbridos', 'Menos impedimento estérico, sirve para proteínas nativas, pero <b>no corta N-glicanos complejos</b>']
]],
['why', 'Porque la enzima corta el enlace amida de la cadena lateral: el –CO–NH–GlcNAc pasa a –COOH. Ese cambio de Asn a Asp (+1 de masa) sirve como marca: si se analiza el péptido, se sabe en qué Asn había un glicano.', 'Por qué la Asn pasa a Asp'],
['h', 'O-glicosilación'],
['img', 'd12-o-glicosilacion', 'O-glicosilación: el azúcar se une al O del hidroxilo de Ser o Thr, sin secuencia consenso estricta. Empieza en el Golgi con una GalNAc transferida desde UDP-GalNAc y se alarga de a un azúcar.', 12],
['table', ['', 'N-glicanos', 'O-glicanos (tipo mucina)'], [
['Aminoácido', 'Asn (N de la amida)', 'Ser o Thr (O del hidroxilo)'],
['Secuencia', 'Consenso Asn–X–Ser/Thr (X ≠ Pro)', 'No hay consenso estricto'],
['Dónde empieza', 'RE, sobre dolicol-fosfato', 'Golgi'],
['Cómo se arma', 'Bloque de 14 azúcares transferido de una vez, después recortado', 'Azúcar por azúcar, empezando por <b>GalNAc</b>'],
['Primer azúcar', 'GlcNAc', 'GalNAc (desde UDP-GalNAc)'],
['Se libera con', 'PNGasa F/A, Endo H', 'Hidracinólisis']
]],
['img', 'd13-mucinas-o-glicanos', 'Mucinas: una proteína con muchísimos O-glicanos en su región central (VNTR). A la derecha, los núcleos (cores) 1 a 4 extendidos. Abajo, los azúcares típicos y sus modificaciones.', 13],
['p', 'Muchas glicoproteínas, sobre todo las <b>mucinas</b>, llevan <b>GalNAc unida a Ser o Thr</b>. A partir de ahí se forman distintos núcleos (core 1, 2, 3, 4) y se agregan <b>Fuc, Sia (que puede O-acetilarse), Gal y GlcNAc (que pueden sulfatarse)</b>. Las mucinas forman barreras protectoras, lubrican y retienen agua.'],
['h', 'Hidracinólisis'],
['img', 'd14-hidracinolisis', 'Hidracinólisis. La hidracina anhidra (NH₂–NH₂) rompe la unión a la proteína y saca los grupos acetilo de las N-acetilhexosaminas; después se reacetila con anhídrido acético y NaHCO₃ y un ácido suave regenera el extremo reductor.', 14],
['p', 'La <b>hidracina anhidra</b> rompe la unión del glicano con el aminoácido. Como efecto secundario también saca los acetilos de GlcNAc y GalNAc (los deja como GlcN y GalN), así que después se <b>reacetila</b> con anhídrido acético y se trata con ácido suave para recuperar el azúcar con su extremo reductor libre.'],
['eq', 'O-glicanos: 60 °C · N-glicanos: 95 °C'],
['why', 'El enlace O-glicosídico a Ser/Thr es más lábil que el enlace N-glicosídico a Asn. Con temperatura moderada se sueltan solo los O-glicanos; para soltar también los N-glicanos hace falta calentar más. Así, eligiendo la temperatura, se puede elegir qué se libera.', 'Por qué dos temperaturas'],
['check', [
['¿Qué secuencia necesita una Asn para ser N-glicosilada?', 'Asn–X–Ser/Thr, con X distinto de prolina.'],
['Una glicoproteína tiene N-glicanos complejos. ¿Usarías Endo H para liberarlos?', 'No: Endo H no corta N-glicanos complejos. Habría que usar PNGasa F (idealmente con la proteína desnaturalizada).'],
['¿Qué aminoácido aparece en la proteína después de tratarla con PNGasa F?', 'Ácido aspártico, en el lugar donde estaba la Asn glicosilada.']
]]
]
},
{
n: 45, group: G, pages: '15–18', title: 'Marcar y limpiar: etiquetas fluorescentes y carbono grafitizado',
lead: 'Los azúcares no absorben luz visible ni ultravioleta de forma útil y vienen mezclados con sales. Antes de separarlos conviene darles una «etiqueta» para verlos y sacarles la sal.',
blocks: [
['h', 'Marcación con etiquetas (tags) fluorescentes'],
['p', 'Un glicano liberado tiene un <b>extremo reductor</b> libre: en equilibrio, una parte está abierta como aldehído. Ese aldehído reacciona con el grupo amino de una molécula fluorescente y forma una <b>base de Schiff</b> (C=N). Un <b>reductor</b> (por ejemplo cianoborohidruro de sodio) la convierte en una amina estable: el glicano queda marcado con <b>una</b> etiqueta, siempre en el extremo reductor.'],
['img', 'd15-2aa-2ab', 'Marcación por aminación reductiva con ácido 2-aminobenzoico (2-AA, arriba) y 2-aminobenzamida (2-AB, abajo): el colorante (dye) forma una base de Schiff con el extremo reductor y un reductor la estabiliza (labeled glycan).', 15],
['cols', [
['2-AA', 'Ácido 2-aminobenzoico. Además de fluorescencia aporta una <b>carga negativa</b> (el –COOH).'],
['2-AB', '2-aminobenzamida. Fluorescente y <b>neutra</b>: no cambia la carga del glicano.']
]],
['why', 'Porque hay una sola etiqueta por molécula, sin importar su tamaño. La intensidad de la señal de cada pico es proporcional al número de moléculas, y así se pueden comparar cantidades entre glicanos distintos.', 'Por qué marcar en el extremo reductor sirve para cuantificar'],
['h', 'Los cinco principios de separación'],
['table', ['Principio', 'Separa por', 'Técnica de la clase'], [
['Adsorción', 'Unión reversible a la superficie de un sólido', 'Carbono grafitizado, TLC en sílica'],
['Partición', 'Reparto entre fase móvil y estacionaria', 'Cromatografía gaseosa'],
['Intercambio iónico', 'Carga', 'Intercambio aniónico, HPAEC'],
['Exclusión por tamaño', 'Tamaño (acceso a los poros)', 'SEC, HPSEC, Biogel'],
['Afinidad', 'Reconocimiento específico', 'Lectinas inmovilizadas']
]],
['h', 'Desalado con carbono grafitizado (PGC-SPE)'],
['p', 'La <b>extracción en fase sólida (SPE)</b> con carbono grafitizado poroso es un cartucho que <b>adsorbe</b> los oligosacáridos. Lo que no queda pegado se lava; después se eluye cambiando el solvente.'],
['img', 'd17-pgc-elucion', 'Elución del cartucho de carbono grafitizado: el agua arrastra sales y monosacáridos; 25 % de acetonitrilo en agua eluye los oligosacáridos neutros; 25 % de acetonitrilo con 0,05 % de TFA eluye los ácidos.', 17],
['steps', 'Cómo se usa el cartucho', [
'<b>Acondicionar</b> con acetonitrilo/TFA y después agua.',
'<b>Cargar</b> la muestra acuosa: los oligosacáridos se adsorben al carbono.',
'<b>Lavar con agua</b>: salen las <b>sales y los monosacáridos</b>, que casi no se adsorben.',
'<b>Eluir con 25 % de acetonitrilo</b> en agua: salen los <b>oligosacáridos neutros</b>.',
'<b>Eluir con 25 % de acetonitrilo + 0,05 % de TFA</b>: salen los <b>oligosacáridos ácidos</b> (con ácido siálico, sulfatos), que quedaban más retenidos.'
]],
['quote', 'La SPE con carbono grafitizado se usa como tratamiento previo para purificar, concentrar y, en algunos casos, fraccionar los glicanos liberados, eliminando sales y otros contaminantes y adaptando la muestra para su análisis cromatográfico posterior.', 'Idea clave de la diapositiva'],
['check', [
['¿En qué extremo del glicano se une la etiqueta 2-AB?', 'En el extremo reductor, por aminación reductiva.'],
['En el cartucho de carbono grafitizado, ¿qué sale con el lavado de agua?', 'Las sales y los monosacáridos.']
]]
]
},
{
n: 46, group: G, pages: '19–26', title: 'Separar glicanos por tamaño y por carga',
lead: 'Las dos primeras herramientas para fraccionar una mezcla de glicanos son las mismas que usaste con proteínas: la exclusión por tamaño y el intercambio iónico.',
blocks: [
['h', 'Cromatografía de exclusión por tamaño (SEC)'],
['p', 'También se llama <b>filtración en geles</b>. La columna está rellena de bolitas porosas. Las moléculas <b>grandes no entran en los poros</b>, recorren solo el espacio entre bolitas y <b>salen primero</b>. Las <b>chicas entran</b> en los poros, recorren un camino más largo y <b>salen después</b>.'],
['img', 'd20-sec', 'SEC: las moléculas grandes no entran en los poros y eluyen primero (cerca del volumen vacío V₀); las pequeñas acceden a los poros y eluyen después (cerca del volumen total Vₜ). Mayor tamaño → menor volumen de elución.', 20],
['defs', [
['V₀ (volumen vacío)', 'Volumen de líquido entre las bolitas. Ahí eluyen las moléculas tan grandes que no entran en ningún poro.'],
['Vₜ (volumen total)', 'Volumen de líquido total de la columna, de afuera y de adentro de las bolitas. Ahí eluyen las moléculas tan chicas que entran en todos los poros.'],
['Vₑ (volumen de elución)', 'Volumen en el que sale una molécula. Siempre está entre V₀ y Vₜ.']
]],
['table', ['Gel', 'Material', 'Resuelve oligosacáridos de…'], [
['Biogel P-2', 'Poliacrilamida', '1 a 10 unidades de glucosa'],
['Biogel P-4', 'Poliacrilamida', '1 a 30 unidades de glucosa'],
['Sephadex', 'Dextranos', 'Según el grado de entrecruzamiento']
]],
['note', 'La diapositiva escribe «Shephadex»; el nombre comercial es <b>Sephadex</b>.'],
['h', 'Cromatografía de intercambio iónico'],
['img', 'd24-intercambio-ionico', 'Intercambio iónico: una resina con carga fija retiene moléculas de carga opuesta. Un intercambiador aniónico (resina +) retiene aniones; uno catiónico (resina −), cationes. Al aumentar la sal se debilita la unión: primero salen las de unión débil y después las de unión fuerte.', 24],
['p', 'Los glicanos neutros (solo hexosas, HexNAc, fucosa) <b>no tienen carga</b>. Los que llevan <b>ácido siálico, ácidos urónicos, sulfatos o fosfatos</b> son <b>negativos</b>. Por eso, para glicanos se usa sobre todo <b>intercambio aniónico</b>: resina positiva que retiene más cuanto más cargas negativas tiene el glicano.'],
['trap', 'El nombre dice qué ion <b>retiene</b> la resina, no el signo de la resina. Intercambiador <b>aniónico</b> = resina <b>positiva</b> que retiene <b>aniones</b>.'],
['h', 'Combinar carga y tamaño'],
['img', 'd25-ionico-y-sec-polisacaridos', 'Ejemplo con polisacáridos: el intercambio aniónico separa por carga con buffers de sal creciente (bajo, medio y alto); después la filtración en gel separa cada fracción por masa molecular (10⁶, 3×10⁵, 10⁵ y 10⁴ Da). Los más grandes no entran en el gel y salen primero.', 25],
['p', 'Una sola técnica casi nunca alcanza. En el ejemplo, primero se separan los polisacáridos por <b>carga</b> (los positivos no se retienen; los de baja densidad de carga negativa salen con poca sal; los de alta densidad, con mucha sal) y después cada fracción se separa por <b>tamaño</b>.'],
['h', 'Cómo se eluye: isocrática o en gradiente'],
['img', 'd26-isocratica-gradiente', 'Programas de elución: isocrática (composición constante), gradiente lineal (la fuerza de elución sube de forma continua) y gradiente escalonado (sube por etapas). En intercambio iónico el gradiente suele ser de concentración de sal.', 26],
['table', ['Programa', 'Qué cambia', 'Para qué sirve'], [
['Isocrática', 'Nada: la fase móvil es siempre igual', 'Mezclas simples; los picos tardíos salen anchos'],
['Gradiente lineal', 'La fuerza de elución sube de forma continua', 'Separar especies parecidas con picos finos'],
['Gradiente escalonado', 'La fuerza sube de golpe en etapas', 'Separar grupos bien distintos rápido']
]],
['check', [
['En una SEC, ¿sale primero un glicano de 20 unidades o uno de 5?', 'El de 20: es más grande, entra menos en los poros y eluye antes.'],
['¿Qué glicano queda más retenido en un intercambiador aniónico: uno neutro o uno con dos ácidos siálicos?', 'El que tiene dos ácidos siálicos: tiene más cargas negativas.']
]]
]
},
{
n: 47, group: G, pages: '27–32', title: 'Cromatografía de afinidad con lectinas',
lead: 'Las lectinas reconocen motivos de azúcares específicos. Inmovilizadas en una columna, retienen solo los glicanos que tienen ese motivo, y combinando varias se puede fraccionar una mezcla compleja.',
blocks: [
['h', 'Qué es una lectina'],
['img', 'd28-lectina', 'Una lectina es una proteína que reconoce y se une de forma específica y reversible a determinados carbohidratos. Reconoce el tipo de azúcar, sus enlaces y su disposición; no cataliza. Ejemplo: la concanavalina A (Con A) reconoce motivos con manosa o glucosa.', 28],
['cols', [
['Reconoce', 'El <b>tipo de azúcar</b>, sus <b>enlaces</b> y su <b>disposición</b> en el glicano.'],
['No cataliza', 'Se une y se suelta: <b>no rompe ni modifica</b> el glicano. No es una enzima.'],
['Es reversible', 'Un azúcar libre parecido al motivo puede <b>competir</b> y desplazar al glicano.']
]],
['p', 'Ya las viste en Glúcidos I (capítulo 37) como «lectoras» del código de azúcares. Acá se usan como herramienta.'],
['h', 'Cómo funciona la columna'],
['img', 'd29-afinidad-lectinas', 'Cromatografía de afinidad con lectinas en tres pasos: unión (la lectina inmovilizada reconoce su motivo), lavado (salen las moléculas no retenidas) y elución (un azúcar competidor libera la fracción retenida). Combinando lectinas se fraccionan mezclas.', 29],
['steps', 'Unión, lavado y elución', [
'<b>Unión</b>: se pasa la mezcla por una resina con la lectina inmovilizada. Los glicanos con el motivo quedan pegados.',
'<b>Lavado</b>: salen los que no tienen el motivo. Esa es la fracción <b>no retenida</b> (primer pico).',
'<b>Elución competitiva</b>: se agrega un azúcar libre que la lectina también reconoce (por ejemplo α-metilmanósido para Con A). Desplaza a los glicanos retenidos, que salen en un segundo pico.',
'Entre una columna y la siguiente se recolectan las fracciones y se <b>desala o se cambia el buffer</b> para sacar el azúcar competidor.'
]],
['table', ['Lectina (origen)', 'Reconoce', 'Se eluye con'], [
['<b>Con A</b> (<i>Canavalia ensiformis</i>)', 'Glicanos de <b>alta manosa</b>, híbridos y ciertos <b>biantenarios</b>', 'α-metilglucósido 10 mM o α-metilmanósido 100 mM'],
['<b>PSA</b> (arveja, <i>Pisum sativum</i>)', 'Bi- y triantenarios con <b>fucosa del núcleo</b>', 'α-metilmanósido 100 mM'],
['<b>LCA</b> (lenteja, <i>Lens culinaris</i>)', 'Bi- y triantenarios con <b>fucosa del núcleo</b>', 'α-metilmanósido 100 mM'],
['<b>RCA-I</b> (<i>Ricinus communis</i>)', '<b>Galactosa terminal β1-4</b>', 'Lactosa 100 mM'],
['<b>L₄-PHA</b> (<i>Phaseolus vulgaris</i>)', 'Ciertos glicanos <b>tri- y tetraantenarios</b>', 'GalNAc 400 mM, si se requiere'],
['<b>E₄-PHA</b> (<i>Phaseolus vulgaris</i>)', 'Bi- y triantenarios con <b>GlcNAc bisectriz</b>', 'GalNAc 400 mM, si se requiere'],
['<b>SNA</b> (<i>Sambucus nigra</i>)', '<b>Ácido siálico terminal α2-6</b> a Gal/GalNAc', 'Lactosa 100 mM, si se requiere']
]],
['why', 'Con A se une a los biantenarios con menos fuerza que a los de alta manosa. Un competidor débil y poco concentrado (α-metilglucósido 10 mM) alcanza para soltar los biantenarios; para soltar los de alta manosa hace falta uno más fuerte y más concentrado (α-metilmanósido 100 mM). Así una sola columna da tres fracciones.', 'Por qué Con A se eluye en dos pasos'],
['h', 'El ejercicio de la clase: separación secuencial'],
['img', 'd31-estructuras-ejercicio', 'Estructuras de los glicanos I a VII que usa el ejercicio: I alta manosa; II híbrido con ácido siálico α2-6; III biantenario con dos ácidos siálicos α2-6; IV biantenario con fucosa α1-6 en el núcleo; V biantenario con GlcNAc bisectriz; VI biantenario con GalNAc; VII biantenario con Galα1-3.', 31],
['img', 'd32-ejercicio-lectinas', 'Ejercicio: una mezcla (I, III, VII, VIII, X, XI, XII, XIII, XX) pasa por Con A, después por LCA, L₄-PHA y MAL. En cada gráfico, el primer pico es la fracción que no se une y el segundo la que se eluye con el competidor. Pregunta: ¿qué recorrido permite aislar la fracción XIII?', 32],
['steps', 'Cómo leer cada gráfico', [
'Cada recuadro es una columna. El eje horizontal es el número de fracción; el vertical, la señal.',
'El <b>primer pico</b> (verde) es lo que <b>no se une</b> a esa lectina y sale con el lavado.',
'Las flechas 1 y 2 marcan cuándo se agrega cada <b>competidor</b>. Los picos después de una flecha son glicanos que <b>estaban unidos</b>.',
'Las flechas de colores entre recuadros indican qué fracción se lleva a la columna siguiente.'
]],
['quiz', { kind: 'mc', tag: 'Ejercicio de la clase', q: '¿Qué recorrido permite aislar la fracción XIII?', opts: [
'Con A retenida (α-metilglucósido) → LCA retenida → L₄-PHA no retenida → MAL no retenida',
'Con A no retenida → LCA no retenida → L₄-PHA retenida → MAL retenida',
'Con A no retenida → LCA retenida → L₄-PHA no retenida → MAL retenida',
'Alcanza con Con A: XIII sale sola en el primer pico'
], correct: [1], answer: '<b>b)</b> Con A no retenida → LCA no retenida → L₄-PHA retenida → MAL retenida.', steps: [
'<b>Con A</b>: XIII aparece en el <b>primer pico</b> (junto con VIII, X, XI, XII y XX): no se une.',
'Esa fracción pasa a <b>LCA</b> (recuadro de la izquierda). XIII está otra vez en el <b>primer pico</b> (con VIII, XI y XX): no se une.',
'Esa fracción pasa a <b>L₄-PHA</b>. Ahora XIII está en el <b>segundo pico</b> (con XI): <b>se une</b>.',
'Esa fracción retenida pasa a <b>MAL</b> (flecha roja hacia la derecha). XIII sale en el <b>segundo pico</b>, sola: <b>se une</b>. En el primer pico sale XI.',
'La opción d) es incorrecta porque en el primer pico de Con A salen seis glicanos juntos.'
], after: '<p>El recorrido también dice algo de la estructura de XIII: no es de alta manosa ni un biantenario que Con A reconozca; no tiene fucosa en el núcleo (LCA); es tri- o tetraantenario (L₄-PHA); y tiene ácido siálico que reconoce MAL.</p>' }],
['fig', FIG.xiii, 'El recorrido de XIII y lo que cada paso dice de su estructura.'],
['note', 'MAL (lectina de <i>Maackia amurensis</i>) no está en la tabla de la diapositiva 30. Reconoce <b>ácido siálico unido en α2-3</b> a galactosa; por eso complementa a SNA, que reconoce el unido en α2-6.', 'Aclaración: qué es MAL'],
['note', 'En el recuadro de LCA de la derecha, el glicano <b>III</b> aparece en el segundo pico (retenido). Según la diapositiva 31, III es un biantenario con dos ácidos siálicos y <b>sin fucosa en el núcleo</b>, que es lo que reconoce LCA. Es probable que sea una simplificación del esquema. Para el ejercicio no cambia nada: la pregunta es sobre XIII, que va por la rama de la izquierda.', 'Ojo con una inconsistencia de la diapositiva 32'],
['check', [
['¿Qué diferencia una lectina de una enzima?', 'La lectina reconoce y se une de forma reversible, pero no cataliza: no rompe ni modifica el glicano.'],
['¿Con qué se eluyen los glicanos de alta manosa de Con A?', 'Con α-metilmanósido 100 mM.'],
['Un glicano se une a LCA. ¿Qué rasgo estructural probablemente tiene?', 'Fucosa en el núcleo (Fucα1-6 en la GlcNAc unida a la Asn).']
]]
]
},
{
n: 48, group: G, pages: '33–39', title: '¿Qué tan pura está la muestra? HPSEC, TLC y FACE',
lead: 'Antes de analizar la estructura hay que saber si el glicano está solo. Tres técnicas lo evalúan: una por tamaño (HPSEC), una por adsorción (TLC) y una por electroforesis (FACE).',
blocks: [
['h', 'HPSEC: exclusión por tamaño de alto desempeño'],
['p', 'Es la misma SEC del capítulo 46, pero en columnas de partículas muy finas y a alta presión. Resuelve <b>oligosacáridos y polisacáridos</b> y permite <b>estimar pesos moleculares</b>. Una muestra pura da un pico simétrico; una mezcla da varios picos o un pico ancho.'],
['img', 'd33-hpsec', 'HPSEC: principio (grandes primero, chicos después), perfil de una serie de oligosacáridos (n = 6 a n = 2) y calibración con patrones. Permite comparar distribuciones de tamaño y evaluar homogeneidad, pero no mide masa absoluta.', 33],
['img', 'd34-hpsec-calibracion', 'Ejemplo real: cromatograma de una serie de oligosacáridos (cada pico es un n distinto) y la recta de calibración log₁₀ MW = 7,689 − 1,783 (Vₑ/V₀), R² = 0,9914. Una muestra que eluye en Vₑ/V₀ ≈ 1,42 corresponde a unos 130 kDa.', 34],
['p', 'Para estimar el peso molecular se pasan <b>patrones de masa conocida</b> y se grafica el logaritmo de la masa contra el volumen de elución relativo:'],
['math', String.raw`\log_{10} MW = a - b\,\frac{V_e}{V_0}`, 'log₁₀ MW = a − b · (Vₑ / V₀)'],
['ex', 'Con la recta de la diapositiva, para ' + M(String.raw`V_e/V_0 = 1{,}42`, 'Vₑ/V₀ = 1,42') + ': ' + M(String.raw`\log_{10} MW = 7{,}689 - 1{,}783 \times 1{,}42 = 5{,}157`, 'log₁₀ MW = 7,689 − 1,783 × 1,42 = 5,157') + ', así que ' + M(String.raw`MW = 10^{5{,}157} \approx 1{,}4 \times 10^{5}\ \text{Da}`, 'MW = 10^5,157 ≈ 1,4 × 10⁵ Da') + ', del orden de los 130 kDa que marca el gráfico.', 'Usar la recta de calibración'],
['trap', 'La SEC separa por <b>tamaño hidrodinámico</b>, no por masa. Un polisacárido extendido ocupa más volumen que uno compacto de la misma masa y eluye antes. Por eso el valor es una <b>masa aparente</b>, que depende de que muestra y patrones tengan forma parecida.'],
['h', 'TLC: cromatografía en capa fina'],
['img', 'd35-tlc', 'TLC: (1) la muestra se siembra en la línea de origen de una placa de sílica gel; (2) la fase móvil sube por capilaridad y lo que más interactúa con la sílica migra menos; (3) se revela y se calcula Rf = b/a.', 35],
['table', ['', 'TLC de glicanos'], [
['Fase estacionaria', 'Sílica gel (polar, con grupos –OH)'],
['Fase móvil', 'n-butanol : isopropanol : agua (3:12:4)'],
['Revelador', 'p-anisaldehído (en medio ácido y con calor da manchas de color con los azúcares)'],
['Sirve para', 'Oligosacáridos: buena resolución']
]],
['math', String.raw`R_f = \frac{b}{a} = \frac{\text{distancia recorrida por la mancha}}{\text{distancia recorrida por el frente del solvente}}`, 'Rf = b / a = distancia de la mancha / distancia del frente del solvente'],
['img', 'd37-tlc-oligosacaridos', 'Izquierda: cálculo de Rf en una placa. Derecha: TLC de oligosacáridos (mono a hexa). Cuanto más largo el oligosacárido, más OH y más interacción con la sílica: queda más cerca del origen. Abajo, la estructura del revelador p-anisaldehído.', 37],
['why', 'Cada residuo agrega varios OH que forman puentes de hidrógeno con la sílica. Un hexasacárido tiene muchos más que un monosacárido, así que queda más «agarrado» a la placa y migra menos. En una serie homóloga, el Rf baja a medida que crece la cadena.', 'Por qué los oligosacáridos más largos migran menos'],
['trap', 'Una sola mancha no garantiza pureza absoluta: dos glicanos distintos pueden tener el mismo Rf en ese solvente.'],
['h', 'FACE: electroforesis de carbohidratos asistida por fluoróforos'],
['img', 'd38-face', 'FACE: (1) un fluoróforo (ANTS) se une al extremo reductor y aporta fluorescencia y carga negativa; (2) se separa por electroforesis en gel de poliacrilamida (PAGE); (3) se comparan las bandas con patrones.', 38],
['p', 'Los azúcares neutros no tienen carga, así que no migrarían en un campo eléctrico. FACE lo resuelve marcándolos con un fluoróforo cargado como el <b>ANTS</b> (ácido 8-aminonaftaleno-1,3,6-trisulfónico, con tres sulfonatos): el glicano queda <b>fluorescente y negativo</b> y migra hacia el ánodo en un gel de poliacrilamida. Resuelve <b>oligosacáridos y polisacáridos</b>.'],
['img', 'd39-face-gel', 'Gel de FACE de una serie de oligómeros de glucosa (G4 a G9) marcados con dos fluoróforos distintos, ANTS y ANDS. Con el mismo glicano, el fluoróforo cambia la movilidad.', 39],
['why', 'Cada molécula lleva una sola etiqueta, o sea la misma carga. Cuanto más larga la cadena, más masa por carga y más la frena el gel. En una serie homóloga, los más pequeños migran más.', 'Por qué los más chicos llegan más lejos'],
['table', ['Técnica', 'Separa por', 'Sirve para', 'Qué hay que agregarle'], [
['HPSEC', 'Tamaño', 'Oligo- y polisacáridos; estimar MW', 'Patrones para calibrar'],
['TLC', 'Adsorción a sílica (polaridad)', 'Oligosacáridos', 'Revelador (p-anisaldehído)'],
['FACE', 'Movilidad en PAGE', 'Oligo- y polisacáridos', 'Fluoróforo cargado (ANTS)']
]],
['check', [
['En una TLC, la mancha recorre 3 cm y el frente 12 cm. ¿Cuál es el Rf?', 'Rf = 3/12 = 0,25.'],
['¿Por qué FACE necesita un fluoróforo cargado y no solo fluorescente?', 'Porque los glicanos neutros no tienen carga y no migrarían en la electroforesis; el ANTS les da carga negativa.']
]]
]
},
{
n: 49, group: G, pages: '40–50', title: 'Composición monosacarídica: hidrólisis ácida y HPAEC-PAD',
lead: 'La primera pregunta sobre un glicano puro es qué azúcares tiene y en qué proporción. Se rompe todo hasta monosacáridos y se separan con una cromatografía que funciona a pH muy alto.',
blocks: [
['h', 'El procedimiento'],
['steps', 'De glicano a composición', [
'<b>Hidrólisis ácida</b> con HCl o ácido trifluoroacético (TFA) y calor: se rompen todos los enlaces glicosídicos y quedan los monosacáridos libres.',
'<b>HPAEC</b>: los monosacáridos se separan en una columna de intercambio aniónico a pH alto.',
'<b>PAD</b>: un detector amperométrico pulsado los detecta a la salida. Se identifica cada pico por su tiempo de retención y se cuantifica por el área.'
]],
['trap', 'La hidrólisis tiene que ser «adecuada a los azúcares buscados»: los ácidos siálicos se destruyen con ácido fuerte y necesitan condiciones suaves; los aminoazúcares necesitan ácido más fuerte para soltarse. Puede haber pérdidas: hay que controlar recuperación y degradación.'],
['h', 'HPAEC: intercambio aniónico a pH elevado'],
['p', 'Los azúcares neutros parecen no tener carga, pero sus OH son <b>ácidos muy débiles</b> (pKa entre 12 y 14), como el OH del metanol. A pH 12–13, con NaOH concentrado, una parte se <b>desprotona</b> y el azúcar queda como anión. Entonces una resina con <b>amonio cuaternario</b> (carga positiva fija) lo puede retener.'],
['img', 'd42-hpaec', 'HPAEC: (1) a pH elevado parte de los OH se desprotonan (azúcar–OH ⇌ azúcar–O⁻ + H⁺); (2) la resina con amonio cuaternario retiene los carbohidratos ionizados; (3) el hidróxido, y según el método el acetato, controlan la elución.', 42],
['table', ['', 'HPAEC'], [
['Fase estacionaria', 'Bolitas rodeadas de compuestos de <b>amonio cuaternario</b> (intercambio aniónico fuerte)'],
['Fase móvil', 'Solución de <b>NaOH</b>, con o sin <b>acetato de sodio</b>; elución isocrática o en gradiente'],
['Derivatización', '<b>No hace falta</b>: se detectan los azúcares tal cual']
]],
['h', 'Qué OH es más ácido'],
['p', 'No todos los OH de un azúcar tienen la misma acidez. El <b>OH del carbono anomérico</b> (C1) es el más ácido, porque está pegado al O del anillo, que le «tira» densidad electrónica (efecto inductivo). Después, el orden es:'],
['eq', '2-OH > 6-OH > 3-OH > 4-OH'],
['table', ['Azúcar', 'pKa'], [
['Fructosa', '12,03'], ['Manosa', '12,08'], ['Xilosa', '12,15'], ['Glucosa', '12,28'], ['Galactosa', '12,39'], ['Dulcitol (galactitol)', '13,43'], ['Sorbitol (glucitol)', '13,60'], ['α-metilglucósido', '13,71']
]],
['why', 'Un pKa más bajo significa más ácido: a un mismo pH alto, una fracción mayor del azúcar está como anión y la resina lo retiene más. Los <b>alditoles</b> (dulcitol, sorbitol) y el <b>α-metilglucósido</b> no tienen OH anomérico libre: su pKa sube más de un punto y casi no se retienen. Por eso la diferencia de una sola posición de un OH alcanza para separar azúcares muy parecidos.', 'Qué tiene que ver el pKa con el tiempo de retención'],
['note', 'En el cromatograma de la diapositiva 48 el orden de salida galactosa → glucosa → manosa coincide con pKa decreciente (12,39 → 12,28 → 12,08): el más ácido sale último. Pero la retención depende también de la estructura, así que el pKa sirve para entender la tendencia, no para predecir cada pico. La tabla de la diapositiva tiene errores de tipeo («Frutose», «gluside»).', 'Aclaración'],
['h', 'PAD: detección amperométrica pulsada'],
['img', 'd43-pad', 'PAD: el eluyente pasa por una celda con electrodo de oro; la oxidación del azúcar en la superficie del oro genera una corriente medible. Se aplica una secuencia de potenciales (medir, limpiar, reactivar) que renueva la superficie del electrodo.', 43],
['p', 'El detector tiene un <b>electrodo de oro</b> en medio alcalino. Los grupos alifáticos polares (–C–OH, –NH₂) se <b>oxidan</b> en su superficie y eso genera una <b>corriente</b>. Como los productos de oxidación ensucian el oro, se aplica una secuencia de <b>pulsos</b> de potencial: uno para medir, otro para limpiar y otro para reactivar el electrodo.'],
['table', ['Característica de PAD', 'Qué significa'], [
['Altamente sensible', 'Detecta picomoles'],
['No consume la muestra', 'Oxida solo una fracción mínima (estrictamente no es del todo no destructiva)'],
['Cuantificación', 'Por el <b>área bajo la curva</b> de cada pico'],
['Cada monosacárido da una señal diferente', 'Hay que calibrar con patrones de <b>cada</b> azúcar: la misma cantidad de glucosa y de manosa no da la misma área']
]],
['h', 'Leer los cromatogramas'],
['img', 'd44-composicion-hpaec-pad', 'Composición por HPAEC-PAD: liberar (hidrólisis), separar y detectar, identificar y cuantificar. Retención → identidad (comparando con patrones); área + calibración → cantidad. La composición indica qué monosacáridos hay y en qué proporción, no sus enlaces ni su secuencia.', 44],
['img', 'd48-cromatograma-monosacaridos', 'Separación de los monosacáridos neutros y amino de una glicoproteína (CarboPac PA1, NaOH 16 mM, detector PAD de oro): 1 fucosa, 2 galactosamina, 3 glucosamina, 4 galactosa, 5 glucosa, 6 manosa.', 48],
['steps', 'Cómo leer un cromatograma de HPAEC-PAD', [
'Mirá las <b>condiciones</b>: columna, eluyente (cuánto NaOH, si hay acetato), caudal y detector.',
'Asigná cada pico comparando su <b>tiempo de retención</b> con el de patrones corridos en las mismas condiciones.',
'Para la cantidad, usá el <b>área</b> de cada pico y la <b>curva de calibración de ese azúcar</b>.',
'Recordá lo que <b>no</b> dice: ni posiciones de enlace, ni orden, ni α/β.'
]],
['img', 'd45-fosforilados', 'HPAEC-PAD de azúcares fosforilados (gradiente de NaOH/acetato de sodio). Resuelve isómeros de posición (fosfato en C1 o en C6) y hasta las formas α y β de la glucosa-1-fosfato (picos 4 y 6). El pico 12 es el ácido glucurónico-1-fosfato, no el ácido glucurónico libre.', 45],
['img', 'd49-acidos-sialicos', 'Ácidos siálicos por HPAEC-PAD: separación isocrática con NaOH/acetato de N-acetilneuramínico (Neu5Ac), ácido glucurónico (estándar interno) y N-glicolilneuramínico (Neu5Gc); a la derecha, monosacáridos neutros y amino (A) y siálicos con gradiente de acetato (B).', 49],
['why', 'Los ácidos siálicos, los urónicos y los azúcares fosforilados ya tienen una carga negativa propia (carboxilato o fosfato), así que quedan mucho más retenidos que los neutros. Para despegarlos no alcanza con NaOH: se agrega <b>acetato de sodio</b>, que compite con ellos por la resina. Por eso «requieren condiciones específicas».', 'Por qué los azúcares ácidos necesitan acetato'],
['check', [
['¿Por qué un azúcar neutro puede retenerse en una columna de intercambio aniónico?', 'Porque a pH 12–13 sus OH (pKa 12–14) se desprotonan en parte y el azúcar queda como anión.'],
['¿Se puede cuantificar un azúcar en HPAEC-PAD con la curva de calibración de otro?', 'No: cada monosacárido da una respuesta diferente en el detector; hay que calibrar cada uno.'],
['Tenés la composición de un glicano. ¿Sabés si la glucosa está unida en 1→4 o en 1→6?', 'No: para eso hace falta el análisis de metilación (capítulo 50).']
]]
]
},
{
n: 50, group: G, pages: '51–56', title: 'Posiciones de enlace: metilación exhaustiva y PMAA',
lead: 'Para saber qué OH de cada azúcar está en un enlace se «pintan» los OH libres con metilos, se rompe el glicano y se mira qué OH quedaron sin pintar: esos son los que estaban unidos.',
blocks: [
['h', 'La idea en una frase'],
['quote', 'Los OH que estaban <b>libres</b> en el glicano terminan <b>metilados</b>; los que estaban <b>en un enlace</b> aparecen <b>sin metilar</b> después de la hidrólisis. En el producto final, esos se ven como <b>acetilos</b>.'],
['h', 'Los cuatro pasos'],
['steps', 'De glicano a acetatos de alditoles parcialmente metilados (PMAA)', [
'<b>Metilación exhaustiva</b> con CH₃I en medio básico: todos los OH libres pasan a –OCH₃. Los OH que forman enlaces glicosídicos no se pueden metilar porque no están libres.',
'<b>Hidrólisis</b> del glicano con ácido: se rompen los enlaces glicosídicos y aparecen OH nuevos <b>justo donde había enlaces</b>. Los metilos (éteres) resisten la hidrólisis.',
'<b>Reducción</b> del extremo reductor con NaBH₄ (o NaBD₄): el C1 pasa de aldehído a CH₂OH y el anillo queda abierto para siempre como <b>alditol</b>.',
'<b>Acetilación</b> de los –OH y –NH₂ restantes con anhídrido acético: quedan como –OAc. El producto es volátil y se analiza por <b>GC-MS</b> (capítulo 51).'
]],
['img', 'd53-reaccion-pmaa', 'Ejemplo con un polímero de galactosa unido en 1→3: metilación (CH₃I), hidrólisis (HCl), reducción (NaBH₄) y acetilación. Producto: 1,3,5-tri-O-acetil-2,4,6-tri-O-metil-galactitol. En rojo, los grupos que cambian en cada paso.', 53],
['note', 'En la diapositiva 53 el último paso dice «HAc». En la práctica la acetilación se hace con <b>anhídrido acético</b> (Ac₂O), como indica la diapositiva 52. «HAc» es solo una abreviatura del paso.', 'Para no confundirse'],
['img', 'd52-galactosa-c3', 'Cómo se identifica una galactosa enlazada en C3. Turquesa: OH originalmente libres (terminan metilados). Coral: el OH del enlace en C3 (termina acetilado). Violeta: C1 y C5, acetilados por la preparación (C1 por la hidrólisis y la reducción; C5 porque era el O del anillo).', 52],
['h', 'Cómo se lee el nombre de un PMAA'],
['p', 'El derivado de la galactosa enlazada en C3 se llama <b>1,3,5-tri-O-acetil-2,4,6-tri-O-metilgalactitol</b>. Se lee así:'],
['table', ['Parte del nombre', 'Qué significa'], [
['<b>galactitol</b>', 'Era una galactosa; ahora es el alditol (reducida, anillo abierto)'],
['<b>2,4,6-tri-O-metil</b>', 'C2, C4 y C6 tenían OH <b>libres</b> en el glicano'],
['<b>1-O-acetil</b>', 'C1: el carbono anomérico. Se acetila siempre (lo liberan la hidrólisis y la reducción)'],
['<b>5-O-acetil</b>', 'C5: su O formaba el anillo de piranosa. Se acetila siempre que el azúcar era piranosa'],
['<b>3-O-acetil</b>', 'C3: el único que no se explica por la preparación → <b>ahí estaba el enlace</b>']
]],
['trap', 'Las posiciones <b>1 y 5</b> acetiladas no son enlaces: salen de la preparación (anomérico y oxígeno del anillo de piranosa). Para encontrar las posiciones de enlace mirá los acetilos <b>que no sean 1 ni 5</b>. En una furanosa, el que queda acetilado por el anillo es el <b>4</b>, no el 5.'],
['h', 'Tabla para decodificar (hexopiranosas)'],
['table', ['Derivado metilado', 'Posiciones acetiladas', 'Qué era el residuo'], [
['2,3,4,6-tetra-O-metil', '1, 5', '<b>Terminal no reductor</b> (solo dona su C1)'],
['2,3,6-tri-O-metil', '1, 4, 5', 'Unido en <b>4</b> (→4)'],
['2,4,6-tri-O-metil', '1, 3, 5', 'Unido en <b>3</b> (→3)'],
['3,4,6-tri-O-metil', '1, 2, 5', 'Unido en <b>2</b> (→2)'],
['2,3,4-tri-O-metil', '1, 5, 6', 'Unido en <b>6</b> (→6)'],
['2,3-di-O-metil', '1, 4, 5, 6', '<b>Ramificación</b> en 4 y 6'],
['2,4-di-O-metil', '1, 3, 5, 6', '<b>Ramificación</b> en 3 y 6'],
['2,3,5,6-tetra-O-metil (galactosa)', '1, 4', 'Galactosa <b>furanosa</b> terminal (el 4 era el O del anillo)']
]],
['ex', 'En Glúcidos I (TP3 y guía) ya usaste esta lógica con los derivados metilados de glucosa: 2,3,6-tri-O-metil = unida en 4; 2,3-di-O-metil = punto de ramificación. Los PMAA son exactamente lo mismo, con dos pasos extra (reducción y acetilación) para que el derivado sea volátil y se pueda pasar por GC-MS.', 'Conexión con Glúcidos I'],
['h', 'El mecanismo de la metilación'],
['math', String.raw`\begin{aligned} R(OH)_{n-1}OH + OH^- &\rightleftharpoons R(OH)_{n-1}O^- + H_2O \\ R(OH)_{n-1}O^- + CH_3I &\rightarrow R(OH)_{n-1}OCH_3 + I^- \\ &\ \ \vdots \\ R(OCH_3)_{n-1}O^- + CH_3I &\rightarrow R(OCH_3)_n + I^- \end{aligned}`, 'R–OH + OH⁻ ⇌ R–O⁻ + H₂O; R–O⁻ + CH₃I → R–OCH₃ + I⁻ (se repite hasta metilar todos los OH)'],
['table', ['Reactivo', 'Función'], [
['<b>NaOH</b> (base)', 'Desprotona los OH y forma alcóxidos (R–O⁻), que son buenos nucleófilos'],
['<b>CH₃I</b> (agente metilante)', 'El alcóxido ataca al carbono del CH₃ y desplaza al ioduro'],
['<b>Dimetilsulfóxido</b> (solvente)', 'Disuelve el glicano y permite que la base sea muy reactiva']
]],
['why', 'Porque si queda un OH libre sin metilar, después aparece acetilado y se confunde con una posición de enlace. Por eso la metilación tiene que ser <b>exhaustiva</b>: se repite hasta que no quede ningún OH libre.', 'Por qué tiene que ser exhaustiva'],
['h', 'Por qué se reduce antes de acetilar'],
['img', 'd55-anomeros-anillos', 'Inconvenientes de derivatizar monosacáridos sin reducir: un mismo azúcar existe como anómeros α y β y como anillo de furanosa o piranosa. La galactosa daría cuatro derivados distintos (α- y β-galactopiranosa, α- y β-galactofuranosa) y cuatro picos.', 55],
['p', 'Si se acetilara el azúcar sin reducirlo, el anillo se seguiría abriendo y cerrando: cada azúcar daría hasta <b>cuatro derivados</b> (α y β, piranosa y furanosa) y el cromatograma se llenaría de picos. Al <b>reducir</b>, el C1 pasa a CH₂OH: ya no hay carbono anomérico ni anillo, y cada residuo da <b>un solo producto</b>.'],
['img', 'd56-nabd4', 'Reducción con NaBD₄. Arriba: con NaBH₄, el 3-O-metil- y el 4-O-metilglucitol acetilados son simétricos (leídos desde la otra punta parecen iguales). Abajo: con NaBD₄ el C1 lleva un deuterio (D) y los dos extremos se distinguen.', 56],
['steps', 'Por qué NaBD₄ y no NaBH₄', [
'<b>Se evitan las isomerizaciones</b>: como con NaBH₄, el azúcar queda abierto como alditol y da un solo producto.',
'<b>Se evita la simetría</b>: un alditol tiene CH₂ en las dos puntas (C1 y C6). Algunos derivados, como el del 3-O-metil y el del 4-O-metil, son el mismo esqueleto leído desde extremos opuestos y no se distinguirían.',
'Con <b>NaBD₄</b> el C1 recibe un <b>deuterio</b> (masa 2 en lugar de 1). Los fragmentos que contienen el C1 pesan una unidad más y en el espectro de masas se sabe cuál es la punta 1 y cuál la 6.'
]],
['note', 'Este análisis <b>no provee información de secuencia ni del carbono anomérico</b>. Dice qué posiciones de cada azúcar estaban ocupadas, pero no quién está unido a quién ni si el enlace era α o β. Eso se resuelve con exoglicosidasas (capítulo 52).', 'Lo que la metilación no dice'],
['check', [
['Un PMAA es 1,4,5-tri-O-acetil-2,3,6-tri-O-metilglucitol. ¿Cómo estaba unida esa glucosa?', 'Por C4 (y su C1 donaba otro enlace o era el extremo reductor). El 1 y el 5 salen de la preparación; el 4 es el enlace.'],
['¿Qué derivado da una manosa terminal no reductora?', '1,5-di-O-acetil-2,3,4,6-tetra-O-metilmanitol.'],
['¿Para qué se usa NaBD₄ en vez de NaBH₄?', 'Para marcar el C1 con deuterio y distinguir los dos extremos del alditol en el espectro de masas.']
]]
]
},
{
n: 51, group: G, pages: '57–66', title: 'GC-MS: separar e identificar los PMAA',
lead: 'Los PMAA de un glicano son una mezcla de derivados volátiles. La cromatografía gaseosa los separa y la espectrometría de masas dice cuál es cuál, porque cada uno se rompe en fragmentos característicos.',
blocks: [
['h', 'Cromatografía gaseosa (GC)'],
['img', 'd57-gc', 'Cromatografía gaseosa: el gas portador arrastra la muestra vaporizada en el inyector caliente por una columna capilar dentro de un horno; el detector registra los picos. GC separa los derivados; MS aporta el patrón de fragmentación para asignarlos.', 57],
['table', ['', 'Cromatografía gaseosa'], [
['Tipo', 'Cromatografía <b>gas–líquido</b> (partición)'],
['Columnas', 'Capilares: diámetro menor a 1 mm, largo de 5 a 50 m'],
['Soporte', 'Sílica fundida'],
['Fase móvil', 'Gas portador (<b>He</b>)'],
['Fase estacionaria', 'Cadenas poliméricas ligadas entre sí o al soporte (una película líquida en la pared)'],
['Muestra', '<b>Volátil y termoestable</b>'],
['La separación depende de', 'La estructura del compuesto, la de la fase estacionaria y la temperatura de la columna']
]],
['why', 'Un azúcar tiene muchos OH que forman puentes de hidrógeno: se descompone antes de evaporarse. Al cambiar todos los OH por –OCH₃ y –OAc, desaparecen los puentes de hidrógeno y el derivado se vuelve <b>volátil y estable al calor</b>. Por eso la metilación y la acetilación no solo marcan posiciones: también hacen posible la GC.', 'Por qué hay que derivatizar para GC'],
['p', 'Cada componente sale a un <b>tiempo de retención (Rₜ)</b> que lo caracteriza, comparándolo con un estándar corrido en las mismas condiciones. Pero el tiempo de retención solo no confirma la identidad: para eso está el espectrómetro de masas.'],
['h', 'Espectrometría de masas con impacto electrónico (EI)'],
['steps', 'Qué pasa adentro del espectrómetro', [
'La muestra se <b>bombardea con electrones</b>: ' + M(String.raw`\text{ABCDE} + e^- \rightarrow \text{ABCDE}^{\bullet +} + 2e^-`, 'ABCDE + e⁻ → ABCDE·⁺ + 2e⁻') + '. Se forma un ion radical.',
'Ese ion tiene mucha energía y <b>se fragmenta</b>: ' + M(String.raw`\text{ABCDE}^{\bullet +} \rightarrow \text{AB}^{\bullet} + \text{CDE}^{+}`, 'ABCDE·⁺ → AB· + CDE⁺') + ', o ' + M(String.raw`\text{AB}^{+} + \text{CDE}^{\bullet}`, 'AB⁺ + CDE·') + ', o ' + M(String.raw`\text{A}^{+} + \text{BCDE}^{\bullet}`, 'A⁺ + BCDE·') + '.',
'Solo los fragmentos <b>con carga</b> se detectan. Se separan según su relación <b>masa/carga (m/z)</b>.',
'El gráfico de abundancia de cada ion contra m/z es el <b>espectro de masas</b>: una «huella digital» del compuesto.'
]],
['img', 'd63-espectro-ei', 'A: espectro de masas EI de un derivado de ácido urónico (éster metílico del alditol acetilado). B: dónde se corta la cadena y qué m/z tiene cada fragmento; a la derecha, fragmentos secundarios de m/z 173, 203 y 143.', 63],
['p', 'En un PMAA, la cadena de carbonos se corta preferentemente <b>entre dos carbonos</b>, y la masa de cada fragmento depende de si los carbonos llevan –OCH₃ (más liviano) u –OAc (más pesado). Por eso los fragmentos dicen <b>dónde están los metilos y dónde los acetilos</b>, que es justamente la información de las posiciones de enlace.'],
['img', 'd64-iones-reporteros', 'Tabla de tiempos de retención (Rₜ) e iones reporteros (m/z) de distintos derivados. Recuadro rojo: manosa, galactosa y glucosa dan exactamente los mismos iones; solo se distinguen por el tiempo de retención.', 64],
['trap', 'Azúcares que son estereoisómeros (manosa, galactosa, glucosa) tienen la misma masa y el mismo patrón de metilos y acetilos, así que dan <b>el mismo espectro</b>. El espectro dice <b>dónde están los sustituyentes</b>; el tiempo de retención en la GC dice <b>qué azúcar</b> es. Hacen falta las dos cosas: por eso GC-MS.'],
['img', 'd65-pmaa-deuterados', 'Espectros EI de PMAA deuterados en C1: B1 (2-O-metil-hexitol) y B2 (3-O-metil-hexitol). Al costado, la cadena con los cortes y la masa de cada fragmento. El ion principal cambia según dónde está el metilo (118 en B1, 130 en B2).', 65],
['h', 'Ejemplo: identificar los PMAA de un glicano'],
['img', 'd66-pmaa-cromatograma', 'Cromatograma de los PMAA de un glicano desconocido (arriba) comparado con estándares de PMAA de galactosa, manosa y glucosa. Picos: 1 2,3,4,6-Me₄-Man; 2 2,3,4,6-Me₄-Glc; 3 2,3,5,6-Me₄-Gal; 4 2,3,4,6-Me₄-Gal; 5 3,4,6-Me₃-Man; 6 2,3,4-Me₃-Man; 7 2,3,6-Me₃-Gal.', 66],
['table', ['Pico', 'Derivado', 'Qué significa'], [
['1', '2,3,4,6-Me₄-Man', 'Manosa terminal no reductora'],
['2', '2,3,4,6-Me₄-Glc', 'Glucosa terminal no reductora'],
['3', '2,3,5,6-Me₄-Gal', 'Galactosa terminal en forma <b>furanosa</b> (el O del anillo está en C4)'],
['4', '2,3,4,6-Me₄-Gal', 'Galactosa terminal en forma piranosa'],
['5', '3,4,6-Me₃-Man', 'Manosa unida en <b>2</b>'],
['6', '2,3,4-Me₃-Man', 'Manosa unida en <b>6</b>'],
['7', '2,3,6-Me₃-Gal', 'Galactosa unida en <b>4</b>']
]],
['steps', 'Cómo razonar el ejemplo', [
'Se corre el glicano desconocido y, en las mismas condiciones, mezclas de PMAA estándar de cada azúcar (Gal, Man y Glc).',
'Cada pico del desconocido se asigna buscando el estándar que sale <b>al mismo tiempo</b> (las líneas verticales) y que da el mismo espectro.',
'En la imagen, los picos más altos del desconocido coinciden con el <b>3</b> (galactofuranosa terminal) y el <b>5</b> (manosa unida en 2); hay picos menores en 1, 6 y 7.',
'Conclusión: el glicano tiene manosas unidas en 2 y galactofuranosas en los extremos, con algo de manosa terminal, manosa unida en 6 y galactosa unida en 4.'
]],
['check', [
['¿Por qué no alcanza con el espectro de masas para distinguir un PMAA de glucosa de uno de manosa?', 'Porque son estereoisómeros con los mismos sustituyentes en las mismas posiciones: dan los mismos fragmentos. Se distinguen por el tiempo de retención.'],
['¿Qué condición tiene que cumplir una muestra para GC?', 'Ser volátil y termoestable.']
]]
]
},
{
n: 52, group: G, pages: '67–70', title: 'Secuencia y configuración anomérica: exoglicosidasas',
lead: 'Ni la composición ni la metilación dicen en qué orden están los azúcares ni si los enlaces son α o β. Para eso se usan enzimas que cortan solo un azúcar terminal específico, con un enlace específico.',
blocks: [
['h', 'Qué es una exoglicosidasa'],
['p', 'Una <b>exoglicosidasa</b> corta el último azúcar de un extremo no reductor, y solo si es <b>el azúcar correcto con la configuración correcta</b>. Una β-galactosidasa saca galactosas terminales unidas en <b>β</b>; una galactosa en α no la toca. Por eso cada corte da dos datos a la vez: <b>qué azúcar estaba en la punta</b> y <b>si su enlace era α o β</b>.'],
['img', 'd68-exoglicosidasas', 'Dónde actúa cada exoglicosidasa sobre un N-glicano complejo fucosilado: α-neuraminidasa (ácido siálico), α-fucosidasa, β-galactosidasa, β-N-acetilglucosaminidasa, α-manosidasa y β-manosidasa. Cada una solo puede cortar cuando su azúcar quedó en la punta.', 68],
['h', 'El método: digestión secuencial seguida por SEC'],
['steps', 'Cómo se hace', [
'Se corre el glicano intacto (marcado) en una columna de exclusión por tamaño y se registra dónde sale.',
'Se trata con una exoglicosidasa y se vuelve a correr. Si la enzima cortó, el glicano es más chico y el pico se <b>corre</b> hacia más tarde.',
'Se agrega la siguiente enzima <b>sobre el producto anterior</b> (tratamiento acumulativo) y se repite.',
'Cuánto se corre el pico dice cuántos residuos salieron. Qué enzima lo hizo correr dice qué azúcar era y si era α o β.'
]],
['p', 'El tamaño se expresa en <b>unidades de glucosa (GU)</b>: la columna se calibra con una serie de oligómeros de glucosa y la posición de cada pico se traduce a «a cuántas glucosas equivale». Es una escala de retención, no el número real de residuos.'],
['img', 'd69-digestion-secuencial', 'Digestión secuencial con exoglicosidasas de un oligosacárido biantenario con fucosa en el núcleo (de transferrina). A: sin tratar, 14,47 GU. B: β-galactosidasa, 12,25. C: β-hexosaminidasa, 8,20. D: α-manosidasa, 6,54. E: β-manosidasa, 5,50. F: α-fucosidasa, 4,45. A la derecha, el registro original de radiactividad contra número de fracción.', 69],
['fig', FIG.gu, 'Cada enzima achica el glicano y el pico sale más tarde (menos unidades de glucosa).'],
['table', ['Paso', 'Enzima (acumulativa)', 'Qué saca', 'GU', 'Qué se deduce'], [
['A', '—', '—', '14,47', 'Glicano inicial'],
['B', 'β-galactosidasa', '2 Gal terminales', '12,25', 'Las dos antenas terminaban en <b>Gal unida en β</b>'],
['C', 'β-hexosaminidasa', '2 GlcNAc', '8,20', 'Debajo de cada Gal había una <b>GlcNAc β</b>'],
['D', 'α-manosidasa', '2 Man', '6,54', 'Las GlcNAc colgaban de dos <b>Man unidas en α</b>'],
['E', 'β-manosidasa', '1 Man (la central)', '5,50', 'La manosa del núcleo está unida en <b>β</b>'],
['F', 'α-fucosidasa', '1 Fuc del núcleo', '4,45', 'Había una <b>Fuc α</b> en el núcleo; queda GlcNAcβ1-4GlcNAc']
]],
['why', 'Porque la β-hexosaminidasa no podía cortar las GlcNAc mientras tenían una galactosa encima: recién después de sacar las Gal quedaron en la punta. Por eso el orden en que «se habilitan» las enzimas reconstruye la secuencia desde afuera hacia adentro.', 'Por qué el orden importa'],
['trap', 'Las GU no son el número de residuos. Una galactosa no «vale» exactamente una unidad de glucosa: la caída de 14,47 a 12,25 (≈ 2,2 GU) corresponde a dos galactosas, pero la de 12,25 a 8,20 (≈ 4 GU) también corresponde a solo dos GlcNAc. Lo que importa es <b>si</b> el pico se corre y <b>con qué enzima</b>.'],
['check', [
['Un glicano no cambia de tamaño al tratarlo con β-galactosidasa, pero sí con α-galactosidasa. ¿Qué tiene en la punta?', 'Una galactosa unida en α.'],
['En el paso E la β-manosidasa achica el glicano. ¿Qué dato estructural aporta?', 'Que la manosa central del núcleo estaba unida en β a la GlcNAc (Manβ1-4GlcNAc): una α-manosidasa no la habría cortado.']
]]
]
},
{
n: 53, group: G, pages: '71–72', title: 'Repaso: qué técnica responde cada pregunta y un ejemplo industrial',
lead: 'El cierre de la clase ordena todas las técnicas según la pregunta que contestan y muestra cómo se usan juntas en la industria de anticuerpos terapéuticos.',
blocks: [
['h', 'Resumen de técnicas para determinar estructura'],
['table', ['Etapa', 'Técnicas', 'Capítulo'], [
['Obtención del extracto', 'Desproteinización, precipitación con etanol, diálisis, partición con solventes', '43'],
['Liberación del glicano', 'PNGasa F/A, Endo H, hidracinólisis', '44'],
['Purificación', '<b>Intercambio aniónico – SEC – lectinas inmovilizadas</b> (y antes, desalado con carbono grafitizado)', '45 a 47'],
['Pureza', 'HPSEC, TLC, FACE', '48'],
['Composición monosacarídica', '<b>Hidrólisis ácida – HPAEC-PAD</b>', '49'],
['Posición de uniones glicosídicas', '<b>Obtención de PMAA – GC – EI-MS</b>', '50 y 51'],
['Secuencia y configuración', '<b>Exoglicosidasas – SEC</b>', '52']
]],
['key', [
'La <b>composición</b> dice qué azúcares hay y en qué proporción; no dice enlaces ni orden.',
'La <b>metilación</b> dice qué OH de cada azúcar están ocupados; no dice el orden ni α/β.',
'Las <b>exoglicosidasas</b> dicen el orden desde la punta y la configuración α/β de cada enlace.',
'Solo juntando las tres se reconstruye el glicano completo.'
]],
['h', 'Ejemplo industrial: anticuerpos monoclonales'],
['img', 'd72-ejemplo-industrial', 'Ejemplo industrial: producción y purificación de un anticuerpo monoclonal en células CHO (biorreactor, captura con proteína A, pulido con CIX, HIC y SEC) y control de calidad: pureza e identidad, agregados, variantes de carga, actividad biológica y análisis de N-glicosilación (PNGasa F → marcación con 2-AA/2-AB → limpieza por SPE (PGC) → HPLC-FLD o LC-MS).', 72],
['p', 'Los anticuerpos terapéuticos son glicoproteínas: llevan un N-glicano en la región Fc. Ese glicano cambia cómo actúa el anticuerpo en el cuerpo (por ejemplo, su capacidad de activar células del sistema inmune) y cuánto dura. Por eso es un <b>atributo de calidad</b> que se controla en cada lote.'],
['steps', 'El análisis de N-glicosilación del ejemplo usa casi todo lo de la clase', [
'<b>Liberación</b> de los N-glicanos con <b>PNGasa F</b> (capítulo 44).',
'<b>Marcación</b> del extremo reductor con <b>2-AA o 2-AB</b> (capítulo 45).',
'<b>Purificación por SPE</b> con carbono grafitizado para sacar el exceso de marcador, sales y reactivos (capítulo 45).',
'<b>HPLC con detector de fluorescencia o LC-MS</b>: perfil y abundancia relativa de cada glicano, comparación entre lotes y con el producto de referencia (biosimilares).'
]],
['h', 'Preguntas de repaso'],
['quiz', { kind: 'mc', q: '1 · ¿Qué técnica usarías para saber si una glucosa de un glicano está unida en 1→4 o en 1→6?', opts: ['HPAEC-PAD después de hidrólisis ácida', 'Metilación exhaustiva, PMAA y GC-MS', 'TLC con p-anisaldehído', 'Cromatografía con Con A'], correct: [1], answer: '<b>b)</b>', steps: [
'La pregunta es por la <b>posición del enlace</b>: eso lo responde el análisis de metilación.',
'Unida en 4 da 2,3,6-tri-O-metil; unida en 6 da 2,3,4-tri-O-metil. Son PMAA distintos que se separan y se identifican por GC-MS.',
'HPAEC-PAD solo diría que hay glucosa; TLC evalúa pureza; Con A reconoce motivos, no posiciones.'
] }],
['quiz', { kind: 'mc', q: '2 · Un N-glicano complejo no se libera con Endo H. ¿Qué enzima lo libera completo?', opts: ['β-galactosidasa', 'PNGasa F', 'α-manosidasa', 'Neuraminidasa'], correct: [1], answer: '<b>b) PNGasa F</b>', steps: [
'La PNGasa F corta entre la GlcNAc del núcleo y la Asn y libera todos los N-glicanos, incluidos los complejos.',
'Las otras tres son exoglicosidasas: sacan un azúcar de la punta, no separan el glicano de la proteína.'
] }],
['quiz', { kind: 'mc', q: '3 · En HPAEC-PAD, ¿por qué los azúcares neutros se retienen en una columna de intercambio aniónico?', opts: ['Porque se marcan con ANTS, que les da carga', 'Porque a pH 12–13 sus OH se desprotonan en parte', 'Porque el amonio cuaternario forma puentes de hidrógeno con ellos', 'Porque se reducen a alditoles'], correct: [1], answer: '<b>b)</b>', steps: [
'Los OH de los azúcares son ácidos muy débiles (pKa 12–14). Con NaOH, a pH muy alto, una parte se ioniza (–O⁻) y la resina positiva los retiene.',
'HPAEC no necesita derivatización: ni ANTS ni reducción.'
] }],
['quiz', { kind: 'mc', q: '4 · Después de metilar, hidrolizar, reducir y acetilar un glicano aparece 1,5-di-O-acetil-2,3,4,6-tetra-O-metilgalactitol. ¿Qué indica?', opts: ['Una galactosa unida en 1→4', 'Una galactosa terminal no reductora', 'Una galactosa con una ramificación', 'Una galactosa en el extremo reductor unida en 6'], correct: [1], answer: '<b>b)</b>', steps: [
'Los únicos acetilos están en 1 y 5, que salen de la preparación (anomérico y O del anillo).',
'Todas las demás posiciones (2, 3, 4, 6) estaban libres y quedaron metiladas: la galactosa solo donaba su C1. Es un extremo no reductor.'
] }],
['quiz', { kind: 'mc', q: '5 · Un glicano marcado sale en 10,5 GU. Tratado con β-galactosidasa sale en 10,5 GU; tratado con α-galactosidasa sale en 8,4 GU. ¿Qué se concluye?', opts: ['No tiene galactosa', 'Tiene galactosa terminal unida en β', 'Tiene galactosa terminal unida en α', 'La galactosa está en el extremo reductor'], correct: [2], answer: '<b>c)</b>', steps: [
'La β-galactosidasa no cambió el tamaño: no había Gal β en la punta.',
'La α-galactosidasa sí lo achicó: había al menos una <b>Gal α</b> terminal (como en el glicano VII del ejercicio de lectinas).'
] }],
['quiz', { kind: 'mc', q: '6 · ¿Por qué se reduce el monosacárido con NaBH₄ (o NaBD₄) antes de acetilarlo?', opts: ['Para hacerlo más polar', 'Para que cada residuo dé un solo producto, sin anómeros ni formas de anillo', 'Para metilar los OH que faltan', 'Para romper los enlaces glicosídicos'], correct: [1], answer: '<b>b)</b>', steps: [
'Sin reducir, cada azúcar podría dar hasta cuatro derivados (α/β, piranosa/furanosa) y varios picos.',
'Al reducir, el C1 pasa a CH₂OH: se pierde el carbono anomérico y el anillo, y queda un único alditol.'
] }],
['quiz', { kind: 'mc', q: '7 · En una TLC de oligosacáridos en sílica, ¿cuál tiene mayor Rf?', opts: ['Un hexasacárido', 'Un tetrasacárido', 'Un disacárido', 'Todos igual'], correct: [2], answer: '<b>c) El disacárido</b>', steps: [
'Menos residuos = menos OH = menos interacción con la sílica polar.',
'El disacárido migra más y tiene el Rf más alto.'
] }],
['quiz', { kind: 'mc', q: '8 · Para fraccionar glicanos según la presencia de fucosa en el núcleo, ¿qué lectina elegirías?', opts: ['RCA-I', 'LCA (lenteja)', 'SNA', 'E₄-PHA'], correct: [1], answer: '<b>b) LCA</b> (o PSA, de arveja)', steps: [
'LCA y PSA reconocen glicanos bi- y triantenarios con fucosa del núcleo, y se eluyen con α-metilmanósido 100 mM.',
'RCA-I reconoce Gal β1-4 terminal; SNA, ácido siálico α2-6; E₄-PHA, GlcNAc bisectriz.'
] }],
['check', [
['¿Cuál es la única etapa que da información sobre α o β?', 'El tratamiento con exoglicosidasas, porque cada enzima es específica de α o de β.'],
['¿Qué técnica de la clase no necesita derivatizar los azúcares?', 'HPAEC-PAD.']
]]
]
}
];
