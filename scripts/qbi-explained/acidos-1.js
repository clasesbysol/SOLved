'use strict';
/* Ácidos nucleicos I · Bloque 1: componentes (diapositivas 1–16). Capítulos 58 a 62. */
const { F } = require('./figs-acidos');
const { M } = require('./kit-an');
const G = 'Ácidos nucleicos I';

module.exports = [
{
n: 58, group: G, pages: '1–5', title: 'Qué es un ácido nucleico y por qué los nucleótidos están en todo el metabolismo',
lead: 'Antes de hablar de ADN y ARN conviene conocer la pieza con la que se arman: el nucleótido. Vas a ver que esa misma pieza aparece en la energía de la célula, en las coenzimas, en las señales y, por supuesto, en la información genética.',
blocks: [
['h', 'La clase y su hoja de ruta'],
['p', 'Esta unidad corresponde a la clase <b>«Ácidos nucleicos — Bases, nucleósidos y nucleótidos»</b> de Javier De Gaudenzi (jdegaudenzi@gmail.com), del 06/10/2026. La clase se organiza en cinco bloques, y el resumen sigue el mismo orden:'],
['table', ['Bloque de la clase', 'Slides según la hoja de ruta', 'Dónde está en este resumen'], [
['Componentes de los ácidos nucleicos', '3–16', 'Capítulos 58 a 62'],
['El ADN como material genético', '17–23', 'Capítulos 63 y 64'],
['Estructura del ADN', '24–36', 'Capítulos 65 a 68'],
['ARN y flujo de la información', '37–44', 'Capítulos 69 a 71'],
['Metabolismo de nucleótidos', '45–56', 'Capítulos 72 a 77'],
['Preguntas y recursos de la clase', '—', 'Capítulos 78 y 79']
]],
['note', 'Los números de slide que figuran en la hoja de ruta no coinciden siempre con las páginas del PDF, porque se agregaron diapositivas después. En todo este resumen la etiqueta <span class="anx-pg">Diap. N</span> indica siempre la <b>página física</b> del PDF de la clase.', 'numeración'],
['p', '<b>Bibliografía de la clase:</b> <i>Principles of Biochemistry</i>, Lehninger, capítulo 8 · <i>Biochemistry</i>, octava edición, Stryer, capítulo 25 · Watson J. y Crick F., <i>A Structure for Deoxyribose Nucleic Acid</i>, Nature 171, 737 (1953).'],
['img', 'p002-watson-crick', 'Watson y Crick con su modelo. Los globos dicen: «Crick, a veces me pregunto cuál es el sentido de la vida?» — «Elemental Watson! es en sentido 5′ – 3′». El chiste anticipa una idea clave: las cadenas de ácidos nucleicos tienen dirección y se sintetizan en sentido 5′→3′ (capítulos 65 y 71).', 2],
['h', 'Preguntas para responder antes de la clase'],
['p', 'La clase arranca con dos preguntas de diagnóstico. Respondelas ahora con lo que sepas; al final de la unidad (capítulo 78) están resueltas con las marcas de la clase.'],
['cols', [
['1 · ¿Cuánto mide el ADN de una sola célula humana si lo estiramos?', 'Opciones: 34 Å · 10.4 nm · 2 μm · 1 cm · 2 m · 10 km.'],
['2 · En una célula hepática, ¿hay más ADN o más ARN? ¿Cuántas veces más?', 'Marcá cuál hay más (ADN o ARN) y cuántas veces más: 2x · 4x · 8x · 100x · >100x.']
]],
['ex', '<b>PREGUNTANDO A LA IA:</b> formen grupos de 5–6 alumnos y discutan. Tienen 5 minutos. <b>¿Por qué el ADN tiene timina y el ARN tiene uracilo?</b> La respuesta de la clase está desarrollada en el capítulo 69.', 'Actividad en grupo'],
['h', 'Qué es un ácido nucleico'],
['quote', '<b>ÁCIDO NUCLEICO.</b> Def.: es un <u>polinucleótido</u> fuente de almacenamiento y transferencia de información celular. Ejemplos: dos tipos de polinucleótidos son el ácido desoxirribonucleico o <b>ADN</b> y el ácido ribonucleico o <b>ARN</b>.', 4],
['p', '«Poli-nucleótido» quiere decir muchos nucleótidos unidos en fila. Igual que una proteína es un polímero de aminoácidos, un ácido nucleico es un polímero de nucleótidos. La diferencia es <i>para qué</i> se usa: el orden de sus piezas guarda y transmite información.'],
['img', 'p004-polinucleotido', 'Esquema de un polinucleótido: un esqueleto que alterna azúcar (Sugar) y fosfato (Phosphate), y una base colgando de cada azúcar (Base<sub>i</sub>, Base<sub>i+1</sub>, Base<sub>i+2</sub>).', 4],
['steps', 'Cómo leer el esquema', [
'Mirá la fila de abajo: <b>azúcar – fosfato – azúcar – fosfato…</b> Ese es el <b>esqueleto</b>. Es igual en toda la molécula: se repite siempre el mismo par.',
'De cada azúcar sale hacia arriba una <b>base</b> (los rectángulos de colores). Los subíndices i, i+1, i+2 indican que son bases consecutivas.',
'Lo único que cambia de un nucleótido a otro es la base. Por eso la información está en la <b>secuencia de bases</b>, no en el esqueleto (lo vas a ver de nuevo en el capítulo 65).',
'Las flechas indican que la cadena tiene <b>dirección</b>: no es lo mismo recorrerla de un extremo que del otro.'
]],
['h', 'Las tres partes de un nucleótido'],
['quote', 'Tiene 3 partes: 1- una base nitrogenada → purina o pirimidina · 2- un azúcar de 5 carbonos o pentosa → ribosa · 3- uno o más grupos fosfato.', 5],
['fig', F.anatomy, 'Esquema propio: un nucleótido con tres fosfatos (como el ATP). Cada enlace tiene nombre: base–azúcar = N-glicosídico; azúcar–primer fosfato = fosfoéster; fosfato–fosfato = fosfoanhídrido.'],
['note', 'La diapositiva escribe «pentosa → ribosa». Es la pentosa del ARN; en el ADN la pentosa es la <b>desoxirribosa</b> (capítulo 60). Las dos son pentosas, y la diferencia está solo en el carbono 2′.', 'pentosa'],
['h', 'Cinco funciones: no son solo piezas de información'],
['table', ['Función', 'Qué dice la clase', 'Ejemplos de la clase'], [
['<b>Energía</b>', 'Son fuentes de transferencia de energía celular. Estables cuando poseen un solo grupo de ácido fosfórico.', 'Los más utilizados: <b>ATP</b> (nucleótido de adenina) y <b>GTP</b> (nucleótido de guanina).'],
['<b>Electrones</b>', 'Forman parte de coenzimas que transportan electrones.', 'NADPH / FADH / NADH y Coenzima A (capítulo 77).'],
['<b>Vías de señalización / regulación</b>', 'Actúan como segundos mensajeros en múltiples vías de señalización intracelular.', '<b>AMPc</b> y <b>GMPc</b>; fosforilación.'],
['<b>Intermediarios activados</b>', 'Forman intermediarios activados en varios procesos biosintéticos.', '<b>UDP-glucosa</b> (precursor del glucógeno) y <b>S-adenosilmetionina</b> (SAM, interviene en la transferencia de grupos metilo).'],
['<b>Información</b>', 'Son precursores activados del DNA y el RNA.', 'Los nucleósidos trifosfato (ATP, GTP, CTP, UTP y sus formas desoxi) se polimerizan para formar ARN y ADN.']
]],
['quote', 'NO SON SOLO PIEZAS DE INFORMACIÓN, ESTÁN EN TODO EL METABOLISMO!', 5],
['why', 'Con un solo fosfato (como el AMP), el fosfato está unido al azúcar por un enlace <b>fosfoéster</b>, que es estable. Con dos o tres fosfatos aparecen enlaces <b>fosfoanhídrido</b> entre fosfatos: ahí se acumulan cargas negativas que se repelen, y romper esos enlaces libera mucha energía. Por eso los di- y trifosfatos son buenos dadores de energía (capítulo 61) y los monofosfatos son la forma «tranquila».', 'Por qué «estables cuando tienen un solo fosfato»'],
['p', 'Cada función se apoya en una parte distinta del nucleótido. Los fosfatos encadenados almacenan energía (ATP, GTP). La parte de adenina funciona como un «mango» que las enzimas reconocen, por eso aparece en coenzimas como NAD, FAD y CoA. Un azúcar o un metilo unidos a un nucleótido quedan «activados», listos para ser transferidos (UDP-glucosa, SAM). Y en los polímeros, el orden de las bases es la información.'],
['note', 'Tres precisiones sobre la diapositiva 5: (1) la notación habitual es <b>FADH₂</b> (forma reducida del FAD); «FADH» de la diapositiva se refiere a esa forma reducida. (2) La <b>Coenzima A</b> contiene un nucleótido (ADP), pero su función es transferir <b>grupos acilo</b>, no electrones (capítulo 77). (3) Debajo de «Información», la diapositiva tiene una línea de caracteres sin sentido: es un error de tipeo, no contenido.', 'diapositiva 5'],
['check', [
['¿Qué es un ácido nucleico?', 'Un polinucleótido: un polímero de nucleótidos que almacena y transfiere información celular. Los dos tipos son ADN y ARN.'],
['¿Cuáles son las tres partes de un nucleótido?', 'Una base nitrogenada (purina o pirimidina), una pentosa (ribosa o desoxirribosa) y uno o más grupos fosfato.'],
['Nombrá las cinco funciones de los nucleótidos que da la clase, con un ejemplo de cada una.', 'Energía (ATP, GTP); electrones (NADH, NADPH, FADH₂); señalización (AMPc, GMPc); intermediarios activados (UDP-glucosa, SAM); información (precursores de ADN y ARN).'],
['En un polinucleótido, ¿qué parte lleva la información?', 'La secuencia de bases. El esqueleto azúcar-fosfato se repite igual en toda la cadena.']
]]
]
},
{
n: 59, group: G, pages: '6–8', title: 'Las bases nitrogenadas: purinas y pirimidinas',
lead: 'Las bases son la parte del nucleótido que lleva la información. Hay solo cinco bases principales, agrupadas en dos familias según tengan uno o dos anillos.',
blocks: [
['h', 'De las «nucleínas» a las bases: tres pioneros'],
['table', ['Investigador', 'Qué aportó (según la clase)'], [
['<b>Johann Friedrich Miescher</b> (1844–1895), biólogo suizo', 'Aisló varias moléculas ricas en fosfatos, a las cuales llamó <b>nucleínas</b>.'],
['<b>Albrecht Kossel</b> (1853–1927), bioquímico alemán', '<b>Descubrió los ácidos nucleicos:</b> estudió los constituyentes de las «nucleínas» y las describió (base + azúcar + grupo fosfato). Identificó <b>adenina, citosina, guanina, timina y uracilo</b>.'],
['<b>P. A. Theodore Levene</b> (1869–1940), bioquímico', 'Llamó por primera vez a la molécula <b>nucleótido</b> y estableció de qué manera estaban unidos. Fue uno de los pioneros en proponer una estructura del DNA como <b>tetranucleótido</b> (1910).']
]],
['gallery', [['p006-miescher', 'Miescher'], ['p006-kossel', 'Kossel'], ['p006-levene', 'Levene'], ['p006-tetranucleotido', 'Modelo de tetranucleótido: dGMP, dCMP, dTMP y dAMP unidos por fosfatos']], 6],
['why', 'Si el ADN fuera una repetición monótona de un bloque de cuatro nucleótidos (uno de cada base), su secuencia sería siempre la misma y no podría guardar información distinta en cada organismo. Esa idea hizo que durante décadas el ADN pareciera «demasiado simple» para ser el material genético (capítulo 63). Chargaff mostró después que la composición de bases cambia de una especie a otra (capítulo 64).', 'Por qué importa la hipótesis del tetranucleótido'],
['h', 'Dos familias de bases'],
['quote', 'Cada nucleótido contiene una base nitrogenada. Estas bases se clasifican en purinas (con dos anillos, uno de cinco y otro de seis átomos) y las pirimidinas (con un solo anillo de seis átomos).', 7],
['cols', [
['Purinas: dos anillos', 'Un anillo de 6 átomos fusionado con uno de 5. Los átomos se numeran del 1 al 9. Son la <b>adenina (A)</b> y la <b>guanina (G)</b>.'],
['Pirimidinas: un anillo', 'Un único anillo de 6 átomos, numerados del 1 al 6. Son la <b>citosina (C)</b>, la <b>timina (T)</b> y el <b>uracilo (U)</b>.']
]],
['ex', '«<b>PURo AGua</b>»: las PURinas son A y G. Las otras tres (C, T, U) son pirimidinas; un truco es que «pirimidina» es la palabra más larga pero la molécula más chica (un solo anillo).', 'Mnemotecnia'],
['img', 'p007-purinas-pirimidinas', 'Estructuras con numeración: purina, adenina y guanina (arriba); pirimidina, citosina, uracilo y timina (abajo). En rosa, el nitrógeno que se une al azúcar: N9 en las purinas y N1 en las pirimidinas.', 7],
['steps', 'Cómo distinguir cada base en el dibujo', [
'<b>Adenina:</b> purina con un grupo <b>amino (–NH₂) en el C6</b>.',
'<b>Guanina:</b> purina con un <b>carbonilo (C=O) en el C6</b> y un <b>amino en el C2</b>.',
'<b>Citosina:</b> pirimidina con un <b>amino en el C4</b> y un carbonilo en el C2.',
'<b>Uracilo:</b> pirimidina con <b>dos carbonilos</b> (C2 y C4).',
'<b>Timina:</b> es un uracilo con un <b>metilo (–CH₃) en el C5</b>. Por eso se la llama 5-metiluracilo.'
]],
['h', 'Propiedades que se explican por la estructura'],
['table', ['Propiedad (clase)', 'Por qué ocurre'], [
['Aromáticas / hidrofóbicas', 'Son anillos planos con dobles enlaces conjugados. Sus caras planas no forman puentes de H con el agua: prefieren apilarse unas sobre otras, lejos del agua. Por eso en el ADN quedan hacia adentro (capítulo 65).'],
['Insolubles en agua (en medio ácido o básico se cargan y son más solubles)', 'A pH neutro casi no tienen carga. En medio ácido se protonan sus nitrógenos y en medio básico pierden protones: con carga interactúan mucho mejor con el agua.'],
['Electrones deslocalizados en el anillo → absorción ~260 nm', 'Los electrones de los dobles enlaces conjugados absorben luz ultravioleta. Por eso el ADN y el ARN absorben a 260 nm, y esa absorción se usa para medirlos y para seguir la desnaturalización (capítulo 68).']
]],
['quote', 'La desaminación de la citosina produce Uracilo y la metilación del Uracilo, Timina.', 7],
['p', 'Desaminar es sacar el grupo amino: si a la citosina se le quita el –NH₂ del C4 y queda un C=O, se obtiene uracilo. Metilar es agregar un –CH₃: un uracilo con metilo en el C5 es timina. Estas tres bases son primas químicas cercanas, y esa cercanía explica por qué el ADN usa T (capítulo 69).'],
['note', 'Es una relación química entre estructuras. En la célula la timina no se fabrica metilando uracilo libre: se metila el nucleótido dUMP para dar dTMP (capítulo 75). Y la desaminación espontánea de citosina dentro del ADN es un daño que hay que reparar (capítulo 69).', 'relación C → U → T'],
['h', 'Qué bases hay en el ADN y en el ARN'],
['quote', 'En el ADN hay cuatro bases diferentes: la adenina (A) y la guanina (G) son las purinas. La citosina (C) y timina (T) son las pirimidinas. El ARN también tiene cuatro bases diferentes. Tres de ellas son las mismas que en el ADN: adenina, guanina, y citosina. El ARN tiene al uracilo (U) en lugar de la timina (T).', 8],
['img', 'p008-bases-adn-arn', 'Bases del ADN (celeste) y del ARN (amarillo). La única diferencia está resaltada: el metilo (H₃C–) de la timina, que falta en el uracilo (HC).', 8],
['table', ['', 'Purinas', 'Pirimidinas'], [
['ADN', 'Adenina (A), Guanina (G)', 'Citosina (C), <b>Timina (T)</b>'],
['ARN', 'Adenina (A), Guanina (G)', 'Citosina (C), <b>Uracilo (U)</b>']
]],
['check', [
['¿Cuántos anillos tiene una purina? ¿Y una pirimidina?', 'Purina: dos anillos fusionados (6 + 5 átomos). Pirimidina: un anillo de 6 átomos.'],
['¿Qué diferencia hay entre timina y uracilo?', 'La timina tiene un metilo en el C5; el uracilo no. Son iguales en todo lo demás.'],
['¿Por qué los ácidos nucleicos absorben luz a 260 nm?', 'Por los electrones deslocalizados de los anillos aromáticos de las bases.'],
['¿Qué base aparece solo en el ADN y cuál solo en el ARN?', 'Timina solo en el ADN; uracilo solo en el ARN.']
]]
]
},
{
n: 60, group: G, pages: '9 y 13', title: 'El azúcar: ribosa y desoxirribosa',
lead: 'La pentosa es el «conector» del nucleótido: a ella se unen la base y el fosfato. Entre ARN y ADN cambia un solo grupo, y ese detalle decide qué molécula es estable y cuál no.',
blocks: [
['quote', 'Los azúcares en los ácidos nucleicos son pentosas (β-D-ribofuranosa). La ribosa que encontramos en el ARN, es un azúcar «normal», con un átomo de oxígeno unido a cada átomo de carbono. La desoxirribosa que está en el ADN, es un azúcar modificada, puesto que carece de un átomo de oxígeno (de ahí el nombre de «desoxi»).', 9],
['p', 'Leamos el nombre <b>β-D-ribofuranosa</b> por partes, con lo que ya viste en Glúcidos I: <b>ribo-</b> es el azúcar (ribosa, una aldopentosa); <b>-furanosa</b> indica que forma un anillo de cinco miembros (cuatro carbonos y un oxígeno); <b>D</b> es la serie (como casi todos los azúcares biológicos); <b>β</b> describe hacia dónde queda el sustituyente del carbono anomérico (C1′), que acá es la base.'],
['note', 'La frase «un oxígeno unido a cada carbono» hay que leerla así: la ribosa tiene un grupo –OH en el C2′ y la desoxirribosa no. Esa es la diferencia que importa. No todos los carbonos llevan un –OH (por ejemplo, el C4′ forma parte del anillo).', 'cómo leer la diapositiva'],
['img', 'p009-ribosa-desoxirribosa', 'Arriba, modelos de desoxirribosa (ADN) y ribosa (ARN). Abajo, las fórmulas con la numeración 1′ a 5′: en el C2′ la desoxirribosa tiene H y la ribosa tiene OH.', 9],
['h', 'Números con prima'],
['quote', 'Números con prima (1′, 2′, 3′…) para los C del azúcar, los distingue de átomos de la base.', 9],
['p', 'La base ya usa los números 1 a 9 para sus átomos. Para no confundir, los carbonos del azúcar se numeran con prima: <b>1′</b> (se une a la base), <b>2′</b> (OH o H, según el azúcar), <b>3′</b> (lleva un OH que formará la unión con el siguiente nucleótido), <b>4′</b> (dentro del anillo) y <b>5′</b> (fuera del anillo, lleva el fosfato). Cuando digas «extremo 5′» o «extremo 3′» de una cadena, estás hablando de estos carbonos.'],
['table', ['Carbono', 'Qué tiene', 'Para qué importa'], [
['C1′', 'Unión a la base (enlace N-glicosídico)', 'Forma el nucleósido (capítulo 61)'],
['C2′', 'OH en ribosa · H en desoxirribosa', 'Diferencia ARN / ADN y su estabilidad'],
['C3′', 'Grupo OH', 'Se une al fosfato del nucleótido siguiente: extremo 3′'],
['C5′', 'CH₂ fuera del anillo', 'Lleva el o los fosfatos: extremo 5′']
]],
['quote', 'En la ribosa, el átomo de carbono 2′ tiene un grupo hidroxilo (en rojo). En la desoxirribosa, el átomo de carbono 2′ tiene un hidrógeno en lugar de un grupo hidroxilo.', 9],
['h', 'Por qué el ARN es menos estable'],
['quote', 'El azúcar presente en el RNA es la ribosa. Esto indica que en la posición 2′ del anillo del azúcar hay un grupo hidroxilo (OH) libre. Por esto, el RNA es químicamente inestable, de forma que en solución acuosa se hidroliza fácilmente.', 13],
['img', 'p013-nucleotido-adn-arn', 'Nucleótido de ADN (fosfato + desoxirribosa + base) y nucleótido de ARN (fosfato + ribosa + base). El círculo rojo marca el OH en 2′ que solo tiene la ribosa.', 13],
['why', 'En una cadena de ARN, el OH del C2′ queda justo al lado del enlace fosfodiéster que une ese nucleótido con el siguiente. Ese OH puede atacar al fósforo «desde adentro» de la misma molécula y cortar la cadena. En medio alcalino el OH pierde su protón y ataca todavía mejor. El ADN no tiene ese OH, así que su esqueleto resiste mucho más: es la molécula ideal para guardar información a largo plazo.', 'Por qué el 2′-OH vuelve inestable al ARN'],
['note', '«Se hidroliza fácilmente» no significa que el ARN se rompa al instante en cualquier agua: es mucho más susceptible que el ADN, sobre todo en medio alcalino y en presencia de enzimas (ribonucleasas).', 'estabilidad del ARN'],
['check', [
['¿Qué significa la β en β-D-ribofuranosa?', 'Que en el carbono anomérico (C1′) la base queda del mismo lado que el C5′ (capítulo 61).'],
['¿Por qué se usan números con prima?', 'Para distinguir los carbonos del azúcar (1′ a 5′) de los átomos de la base (1 a 9).'],
['¿Qué grupo tiene la ribosa en el C2′ y qué tiene la desoxirribosa?', 'Ribosa: OH. Desoxirribosa: H.'],
['¿Por qué el ADN es mejor para guardar información a largo plazo?', 'Porque al no tener OH en el C2′, su esqueleto no se autohidroliza como el del ARN: es químicamente más estable.']
]]
]
},
{
n: 61, group: G, pages: '10–12', title: 'Nucleósidos y nucleótidos: cada enlace con su nombre',
lead: 'La base, el azúcar y los fosfatos se unen con tres tipos de enlaces distintos. Saber cuál es cuál evita la confusión más común de la unidad.',
blocks: [
['h', 'Nucleósido = base + azúcar'],
['quote', 'A la combinación de una base y un azúcar se le llama nucleósido. El enlace es N-glicosídico.', 10],
['p', 'El enlace se forma entre el <b>C1′ del azúcar</b> y un <b>nitrógeno de la base</b>: el <b>N9 en las purinas</b> y el <b>N1 en las pirimidinas</b>. Se llama N-glicosídico porque une el carbono anomérico de un azúcar con un nitrógeno (en Glúcidos viste el enlace O-glicosídico, que une el carbono anomérico con un oxígeno).'],
['img', 'p010-nucleosidos', 'Adenosina, citidina (arriba), guanosina y uridina (abajo). Los círculos amarillos marcan los átomos que forman el enlace N-glicosídico: N9 con C1′ en la adenosina y N1 con C1′ en la citidina. A la derecha: «Son nucleótidos beta: la base y el C5′ quedan del mismo lado».', 10],
['p', 'La configuración es siempre <b>β</b>: si mirás el anillo del azúcar, la base (en el C1′) y el C5′ quedan del mismo lado del plano. Es la β de la β-D-ribofuranosa del capítulo anterior.'],
['note', 'En la diapositiva 10, que trata de nucleósidos, el recuadro dice «Son nucleótidos beta». La orientación β es una propiedad del enlace N-glicosídico: la tienen los nucleósidos y se conserva cuando se agregan fosfatos, así que vale para nucleósidos y nucleótidos.', 'terminología'],
['quote', 'El nombre de la purina o pirimidina es modificado para indicar que está combinado con el azúcar: la adenina se convierte en adenosina, la citosina en citidina, la guanina en guanosina, el uracilo en uridina y la timina en timidina.', 10],
['table', ['Base', 'Nucleósido', 'Regla'], [
['Adenina', 'Adenosina', 'purinas → <b>-osina</b>'],
['Guanina', 'Guanosina', 'purinas → <b>-osina</b>'],
['Citosina', 'Citidina', 'pirimidinas → <b>-idina</b>'],
['Uracilo', 'Uridina', 'pirimidinas → <b>-idina</b>'],
['Timina', 'Timidina', 'pirimidinas → <b>-idina</b>']
]],
['h', 'El grupo fosfato'],
['quote', 'Los grupos fosfato se unen por medio de enlaces fosfoanhídrido (entre sí) o fosfoéster a una molécula de azúcar. Cuando un fosfato es agregado a un nucleósido en el C5′, la molécula se llama nucleótido.', 11],
['img', 'p011-fosfato', 'Arriba: ácido ortofosfórico. Primera reacción: adenosina (nucleósido) + fosfato → adenosín monofosfato (AMP, nucleótido) + H₂O; el fosfato queda en el C5′ (círculo amarillo). Segunda reacción: AMP + fosfato → adenosín difosfato (ADP) + H₂O.', 11],
['steps', 'De adenosina a ATP, enlace por enlace', [
'<b>Adenosina + fosfato → AMP + H₂O.</b> El fosfato se une al OH del C5′ del azúcar. Un ácido (fosfórico) con un alcohol (el OH del azúcar) forma un <b>éster</b>: enlace <b>fosfoéster</b>.',
'<b>AMP + fosfato → ADP + H₂O.</b> Ahora el fosfato nuevo se une a otro fosfato. Dos ácidos unidos con pérdida de agua forman un <b>anhídrido</b>: enlace <b>fosfoanhídrido</b>.',
'<b>ADP + fosfato → ATP + H₂O.</b> Se agrega un segundo enlace fosfoanhídrido.',
'Resultado: el ATP tiene <b>un</b> enlace fosfoéster (azúcar–fosfato) y <b>dos</b> fosfoanhídrido (fosfato–fosfato).'
]],
['note', 'Las flechas de la diapositiva muestran qué enlace se forma y que se libera agua. En la célula, los fosfatos casi nunca se agregan como fosfato libre: enzimas llamadas quinasas los transfieren desde el ATP.', 'cómo ocurre en la célula'],
['h', 'Mono, di y trifosfatos'],
['quote', 'El número de grupos fosfato se indica por los términos mono, di y trifosfato. Las moléculas con dos o tres grupos fosfato son consideradas buenos dadores de energía, liberando energía junto con la transferencia de los grupos fosfato. Múltiples grupos fosfato tienen una fuerte tendencia a repelerse uno con otro, siendo los nucleótidos una molécula muy polar y cargada negativamente.', 12],
['img', 'p012-atp-damp', 'Adenosín trifosfato (ATP) y desoxiadenosín monofosfato (dAMP), en modelo y en fórmula. El ATP lleva ribosa (OH en 2′, en rojo) y tres fosfatos; el dAMP lleva desoxirribosa (H en 2′, en azul) y un solo fosfato.', 12],
['why', 'A pH fisiológico cada fosfato lleva cargas negativas. En un trifosfato esas cargas quedan muy cerca y se repelen. Cuando se rompe un enlace fosfoanhídrido, las cargas se separan y los productos quedan más estabilizados (por resonancia y por hidratación). Ese «alivio» es la energía que se libera y que la célula usa para impulsar otras reacciones.', 'Por qué los di- y trifosfatos son buenos dadores de energía'],
['p', 'Para nombrar los fosfatos se usan letras griegas desde el azúcar hacia afuera: el que está unido al C5′ es el <b>α</b>, el siguiente el <b>β</b> y el último el <b>γ</b>. En el ATP, el enlace α (fosfoéster) es el estable; los enlaces entre α–β y β–γ son los fosfoanhídrido «ricos en energía».'],
['h', 'Todos los enlaces de la unidad en una tabla'],
['table', ['Enlace', 'Qué une', 'Dónde', 'Tipo', 'Ejemplo'], [
['<b>N-glicosídico</b>', 'base con azúcar', 'C1′ con N9 (purinas) o N1 (pirimidinas)', 'covalente', 'adenosina'],
['<b>Fosfoéster</b>', 'fosfato con azúcar', 'O del C5′ con el fósforo', 'covalente, estable', 'AMP'],
['<b>Fosfoanhídrido</b>', 'fosfato con fosfato', 'P–O–P', 'covalente, mucha energía de hidrólisis', 'ADP, ATP'],
['<b>Fosfodiéster</b>', 'un azúcar con otro, a través de un fosfato', 'C3′–O–P–O–C5′', 'covalente, <b>intracatenario</b>', 'esqueleto de ADN y ARN (capítulo 65)'],
['<b>Puente de hidrógeno</b>', 'base con base', 'entre las dos cadenas', 'no covalente, <b>intercatenario</b>', 'A=T (2), G≡C (3) (capítulo 65)']
]],
['trap', 'Fosfo<b>éster</b> = un fosfato unido a <b>un</b> azúcar (como en el AMP). Fosfo<b>diéster</b> = un fosfato unido a <b>dos</b> azúcares (como en la cadena). Fosfo<b>anhídrido</b> = un fosfato unido a <b>otro fosfato</b>. «Intracatenario» = dentro de una misma cadena; «intercatenario» = entre dos cadenas.', 'No mezclar los nombres'],
['check', [
['¿Qué átomos forman el enlace N-glicosídico en la guanosina? ¿Y en la uridina?', 'Guanosina (purina): N9 de la base con C1′ del azúcar. Uridina (pirimidina): N1 con C1′.'],
['¿Cuántos enlaces fosfoanhídrido tiene el ATP? ¿Y el AMP?', 'ATP: dos. AMP: ninguno (solo un fosfoéster).'],
['¿Qué diferencia hay entre un nucleósido y un nucleótido?', 'El nucleótido es un nucleósido con uno o más fosfatos en el C5′.'],
['¿Por qué los nucleótidos están cargados negativamente a pH fisiológico?', 'Por sus grupos fosfato, que pierden protones y quedan con carga negativa.']
]]
]
},
{
n: 62, group: G, pages: '13–16', title: 'Cómo se nombran: tabla de bases, nucleósidos y nucleótidos',
lead: 'Con tres reglas podés nombrar cualquier nucleótido de la unidad y entender todos los símbolos (A, dA, dAMP, ATP, dTTP…).',
blocks: [
['quote', 'Si el azúcar es la desoxirribosa, el nombre del nucleótido empieza con «desoxi», como el desoxiadenosín monofosfato (dAMP). Si el azúcar es la ribosa, se llama adenosín monofosfato (AMP).', 13],
['steps', 'Tres reglas para nombrar', [
'<b>Base → nucleósido:</b> purinas con -osina (adenosina, guanosina); pirimidinas con -idina (citidina, uridina, timidina).',
'<b>Si el azúcar es desoxirribosa</b>, se antepone «desoxi» (desoxiadenosina) y en el símbolo se agrega una <b>d</b> minúscula (dA, dAMP).',
'<b>Nucleósido → nucleótido:</b> se agrega cuántos fosfatos tiene: monofosfato (MP), difosfato (DP), trifosfato (TP). También se usa la terminación -ilato para el 5′-monofosfato: adenilato = AMP, desoxiadenilato = dAMP.'
]],
['ex', 'dGTP = <b>d</b>esoxi + <b>G</b>uanosina + <b>T</b>ri<b>P</b>hosphate (trifosfato) = desoxiguanosín trifosfato: guanina + desoxirribosa + tres fosfatos. Es uno de los cuatro sustratos que usa la ADN polimerasa.', 'Desarmar un símbolo'],
['quote', '«nucleósido» y «nucleótido» también pueden ser usados como términos genéricos, tanto para las formas ribo, como desoxirribo.', 14],
['table', ['Ácido', 'Base', 'Nucleósido', 'Nucleótido (5′-monofosfato)', 'Original de la tabla 25.1'], [
['ARN', 'Adenina (A)', 'Adenosina', 'Adenilato (AMP)', 'Adenine · Adenosine · Adenylate (AMP)'],
['ARN', 'Guanina (G)', 'Guanosina', 'Guanilato (GMP)', 'Guanine · Guanosine · Guanylate (GMP)'],
['ARN', 'Uracilo (U)', 'Uridina', 'Uridilato (UMP)', 'Uracil · Uridine · Uridylate (UMP)'],
['ARN', 'Citosina (C)', 'Citidina', 'Citidilato (CMP)', 'Cytosine · Cytidine · Cytidylate (CMP)'],
['ADN', 'Adenina (A)', 'Desoxiadenosina', 'Desoxiadenilato (dAMP)', 'Adenine · Deoxyadenosine · Deoxyadenylate (dAMP)'],
['ADN', 'Guanina (G)', 'Desoxiguanosina', 'Desoxiguanilato (dGMP)', 'Guanine · Deoxyguanosine · Deoxyguanylate (dGMP)'],
['ADN', 'Timina (T)', 'Timidina (= desoxitimidina)', 'Timidilato (TMP = dTMP)', 'Thymine · Thymidine · Thymidylate (TMP)'],
['ADN', 'Citosina (C)', 'Desoxicitidina', 'Desoxicitidilato (dCMP)', 'Cytosine · Deoxycytidine · Deoxycytidylate (dCMP)']
]],
['img', 'p014-tabla-nomenclatura', 'Tabla 25.1 del Stryer, «Nomenclature of bases, nucleosides, and nucleotides», tal como aparece en la clase.', 14],
['note', 'La tabla 25.1 escribe «Thymidine» y «Thymidylate (TMP)» sin el prefijo desoxi, mientras que las figuras de las diapositivas 15 y 16 dicen «desoxitimidina» y «dTMP». Es la misma molécula: como la timina se encuentra casi solo en el ADN, muchos textos omiten el «desoxi» porque se sobreentiende. No es una contradicción.', 'TMP y dTMP'],
['img', 'p015-desoxirribonucleotidos', '(a) Desoxirribonucleótidos. Nucleótidos: desoxiadenilato (desoxiadenosina 5′-monofosfato), desoxiguanilato (desoxiguanosina 5′-monofosfato), desoxitimidilato (desoxitimidina 5′-monofosfato), desoxicitidilato (desoxicitidina 5′-monofosfato). Símbolos: A, dA, dAMP · G, dG, dGMP · T, dT, dTMP · C, dC, dCMP. Nucleósidos: desoxiadenosina, desoxiguanosina, desoxitimidina, desoxicitidina.', 15],
['img', 'p016-ribonucleotidos', '(b) Ribonucleótidos. Nucleótidos: adenilato (adenosina 5′-monofosfato), guanilato (guanosina 5′-monofosfato), uridilato (uridina 5′-monofosfato), citidilato (citidina 5′-monofosfato). Símbolos: A, AMP · G, GMP · U, UMP · C, CMP. Nucleósidos: adenosina, guanosina, uridina, citidina.', 16],
['steps', 'Qué mirar en las dos figuras', [
'En las dos, el fosfato (⁻O–P–O⁻) está a la izquierda, unido por un enlace fosfoéster al CH₂ del C5′.',
'La base, en el recuadro rosado, está unida al C1′ por el enlace N-glicosídico (N9 en A y G; N1 en T, U y C).',
'Abajo de cada anillo de azúcar aparecen los grupos del C3′ y del C2′: en los <b>desoxirribonucleótidos</b> se lee «OH H» (no hay OH en 2′); en los <b>ribonucleótidos</b> se lee «OH OH».',
'La timina se reconoce por el CH₃ en el anillo; el uracilo, por no tenerlo.'
]],
['check', [
['¿Cómo se llama el nucleótido que tiene citosina, ribosa y un fosfato?', 'Citidilato o citidina 5′-monofosfato (CMP).'],
['¿Qué es dATP?', 'Desoxiadenosín trifosfato: adenina + desoxirribosa + tres fosfatos.'],
['¿Uridina es una base, un nucleósido o un nucleótido?', 'Un nucleósido: uracilo + ribosa, sin fosfato.'],
['¿Por qué no hay «dUMP» en la tabla del ADN?', 'Porque el ADN usa timina, no uracilo. El dUMP existe como intermediario: es el precursor del dTMP (capítulo 75).']
]]
]
}
];
