'use strict';
/* Ácidos nucleicos I · Bloque 1: las piezas (nucleótidos, bases, azúcares, enlaces y nombres). Capítulos 58 a 62. */
const { F } = require('./figs-acidos');
const G = 'Ácidos nucleicos I';

module.exports = [
{
n: 58, group: G, pages: '1–5', title: 'Qué es un ácido nucleico y por qué los nucleótidos están en todo el metabolismo',
lead: 'Antes de hablar de ADN y ARN conviene conocer la pieza con la que se arman: el nucleótido. Esa misma pieza aparece en la energía de la célula, en las coenzimas, en las señales y, por supuesto, en la información genética.',
blocks: [
['h', 'El recorrido de la unidad'],
['p', 'La unidad avanza de lo chico a lo grande y termina en el metabolismo:'],
['table', ['Parte', 'Qué vas a entender', 'Capítulos'], [
['Las piezas', 'Qué es un nucleótido, qué bases y azúcares tiene, cómo se unen y cómo se nombran', '58 a 62'],
['El ADN como material genético', 'Cómo se demostró que los genes son ADN y cómo se descubrió su forma', '63 y 64'],
['La doble hélice', 'Cómo está armado el ADN, sus medidas, sus formas y cómo se separan sus cadenas', '65 a 68'],
['ARN y flujo de la información', 'En qué se diferencia el ARN, qué tipos hay y cómo se copia y se lee la información', '69 a 71'],
['Metabolismo de nucleótidos', 'Cómo se fabrican, se reciclan y se degradan los nucleótidos, y qué fármacos actúan ahí', '72 a 77'],
['Repaso', 'Preguntas resueltas y glosario', '78 y 79']
]],
['h', 'Qué es un ácido nucleico'],
['p', 'Un <b>ácido nucleico</b> es un <b>polinucleótido</b>: una molécula muy larga formada por muchos nucleótidos unidos en fila, como los vagones de un tren. Igual que una proteína es un polímero de aminoácidos, un ácido nucleico es un polímero de nucleótidos. Su función es <b>almacenar y transferir la información</b> de la célula.'],
['p', 'Hay dos tipos: el <b>ADN</b> (ácido desoxirribonucleico), que guarda la información genética a largo plazo, y el <b>ARN</b> (ácido ribonucleico), que la transporta y la usa para fabricar proteínas. Se llaman «ácidos» porque sus grupos fosfato liberan protones, y «nucleicos» porque se descubrieron en el núcleo celular.'],
['img', 'p004-polinucleotido', 'Esquema de un polinucleótido: un esqueleto que alterna azúcar (Sugar) y fosfato (Phosphate), con una base colgando de cada azúcar (Base<sub>i</sub>, Base<sub>i+1</sub>, Base<sub>i+2</sub>).', 4],
['steps', 'Cómo leer el esquema', [
'La fila de abajo, <b>azúcar – fosfato – azúcar – fosfato…</b>, es el <b>esqueleto</b> de la cadena. Es igual en toda la molécula: siempre se repite el mismo par.',
'De cada azúcar sale una <b>base</b> (los rectángulos de colores). Los subíndices i, i+1, i+2 indican bases consecutivas.',
'Lo único que cambia de un nucleótido a otro es la base. Por eso la información está en la <b>secuencia de bases</b>, como las letras de una palabra, y no en el esqueleto.',
'Las flechas indican que la cadena tiene <b>dirección</b>: no es lo mismo leerla de un extremo que del otro (capítulo 65).'
]],
['img', 'p002-watson-crick', 'James Watson y Francis Crick junto a su modelo de ADN. El chiste del dibujo («Elemental Watson! es en sentido 5′ – 3′») recuerda que las cadenas tienen dirección y se fabrican en sentido 5′→3′.', 2],
['h', 'Las tres partes de un nucleótido'],
['p', 'Todo nucleótido tiene tres componentes:'],
['cols', [
['1 · Una base nitrogenada', 'Un anillo con nitrógenos. Puede ser una <b>purina</b> (dos anillos: adenina, guanina) o una <b>pirimidina</b> (un anillo: citosina, timina, uracilo).'],
['2 · Una pentosa', 'Un azúcar de cinco carbonos: <b>ribosa</b> en el ARN y <b>desoxirribosa</b> en el ADN.'],
['3 · Uno o más fosfatos', 'Grupos derivados del ácido fosfórico, unidos al carbono 5′ del azúcar. Pueden ser uno, dos o tres.']
]],
['fig', F.anatomy, 'Un nucleótido con tres fosfatos (como el ATP). Cada unión tiene nombre: base–azúcar = enlace N-glicosídico; azúcar–primer fosfato = enlace fosfoéster; fosfato–fosfato = enlace fosfoanhídrido.'],
['p', 'Si a la base y al azúcar no les agregás fosfato, la molécula se llama <b>nucleósido</b>. Recordalo así: nucleó<b>s</b>ido = <b>s</b>in fosfato; nucleó<b>t</b>ido = con fosfa<b>t</b>o.'],
['h', 'Cinco funciones de los nucleótidos'],
['p', 'Los nucleótidos no son solo las letras del ADN: están en todo el metabolismo.'],
['table', ['Función', 'Qué hacen', 'Ejemplos'], [
['<b>Energía</b>', 'Transfieren energía dentro de la célula. Son estables cuando tienen un solo fosfato; con dos o tres funcionan como «moneda energética».', '<b>ATP</b> (nucleótido de adenina) y <b>GTP</b> (nucleótido de guanina), los más usados.'],
['<b>Electrones</b>', 'Forman parte de coenzimas que transportan electrones en las reacciones de óxido-reducción.', 'NADH, NADPH, FADH₂. También la coenzima A contiene un nucleótido (capítulo 77).'],
['<b>Señalización y regulación</b>', 'Funcionan como segundos mensajeros: llevan una señal desde la membrana hacia el interior de la célula. Además, el ATP aporta el fosfato para fosforilar proteínas y encenderlas o apagarlas.', '<b>AMPc</b> y <b>GMPc</b>; fosforilación.'],
['<b>Intermediarios activados</b>', 'Se unen a otra molécula para dejarla «lista» para ser transferida en una biosíntesis.', '<b>UDP-glucosa</b> (precursor del glucógeno) y <b>S-adenosilmetionina</b> (SAM, que transfiere grupos metilo).'],
['<b>Información</b>', 'Son los precursores activados del ADN y del ARN.', 'Los nucleótidos trifosfato (ATP, GTP, CTP, UTP y sus formas desoxi) se encadenan para formar los ácidos nucleicos.']
]],
['why', 'Con un solo fosfato (como en el AMP), el fosfato está unido al azúcar por un enlace fosfoéster, que es estable. Con dos o tres fosfatos aparecen enlaces fosfoanhídrido entre fosfatos: ahí se juntan cargas negativas que se repelen, y romper esos enlaces libera mucha energía. Por eso el ATP es un buen dador de energía y el AMP no (capítulo 61).', 'Por qué un solo fosfato es «estable»'],
['p', 'Cada función aprovecha una parte distinta del nucleótido. Los fosfatos encadenados almacenan energía. La adenina funciona como un «mango» que muchas enzimas reconocen, y por eso aparece en coenzimas como NAD, FAD y CoA. Un azúcar o un metilo unidos a un nucleótido quedan activados para ser transferidos. Y en los polímeros, el orden de las bases es la información.'],
['check', [
['¿Qué es un ácido nucleico?', 'Un polinucleótido: un polímero de nucleótidos que almacena y transfiere información. Los dos tipos son ADN y ARN.'],
['¿Cuáles son las tres partes de un nucleótido?', 'Una base nitrogenada (purina o pirimidina), una pentosa (ribosa o desoxirribosa) y uno o más fosfatos.'],
['¿Qué diferencia hay entre nucleósido y nucleótido?', 'El nucleósido es base + azúcar; el nucleótido además tiene uno o más fosfatos.'],
['Nombrá las cinco funciones de los nucleótidos con un ejemplo de cada una.', 'Energía (ATP, GTP); electrones (NADH, NADPH, FADH₂); señalización (AMPc, GMPc); intermediarios activados (UDP-glucosa, SAM); información (precursores de ADN y ARN).'],
['En un polinucleótido, ¿qué parte lleva la información?', 'La secuencia de bases. El esqueleto azúcar-fosfato es igual en toda la cadena.']
]]
]
},
{
n: 59, group: G, pages: '6–8', title: 'Las bases nitrogenadas: purinas y pirimidinas',
lead: 'Las bases son la parte del nucleótido que lleva la información. Hay cinco bases principales, agrupadas en dos familias según tengan uno o dos anillos.',
blocks: [
['h', 'Cómo se descubrieron'],
['table', ['Investigador', 'Qué aportó'], [
['<b>Johann Friedrich Miescher</b> (1844–1895), biólogo suizo', 'Aisló del núcleo celular unas moléculas ricas en fosfato a las que llamó <b>nucleínas</b>.'],
['<b>Albrecht Kossel</b> (1853–1927), bioquímico alemán', 'Descubrió los ácidos nucleicos tal como los conocemos: estudió de qué estaban hechas las nucleínas y describió sus componentes (base + azúcar + fosfato). Identificó <b>adenina, citosina, guanina, timina y uracilo</b>.'],
['<b>Phoebus A. Theodore Levene</b> (1869–1940), bioquímico', 'Llamó <b>nucleótido</b> a la unidad base + azúcar + fosfato y estableció cómo se unen entre sí. En 1910 propuso que el ADN era un <b>tetranucleótido</b>: un bloque de cuatro nucleótidos, uno de cada base, repetido.']
]],
['gallery', [['p006-miescher', 'Miescher'], ['p006-kossel', 'Kossel'], ['p006-levene', 'Levene'], ['p006-tetranucleotido', 'Modelo de tetranucleótido: dGMP, dCMP, dTMP y dAMP unidos por fosfatos']], 6],
['why', 'Si el ADN fuera un mismo bloque de cuatro nucleótidos repetido una y otra vez, su secuencia sería monótona y no podría guardar información distinta en cada organismo. Esa idea hizo que durante décadas el ADN pareciera «demasiado simple» para ser el material genético (capítulo 63). Después se vio que la composición de bases cambia de una especie a otra (capítulo 64) y la hipótesis se abandonó.', 'Por qué la idea del tetranucleótido frenó a la ciencia'],
['h', 'Dos familias de bases'],
['p', 'Las bases son moléculas en forma de anillo que contienen nitrógeno (por eso «nitrogenadas»). Según su esqueleto se dividen en dos familias:'],
['cols', [
['Purinas: dos anillos', 'Un anillo de 6 átomos fusionado con uno de 5. Los átomos se numeran del 1 al 9. Son la <b>adenina (A)</b> y la <b>guanina (G)</b>.'],
['Pirimidinas: un anillo', 'Un único anillo de 6 átomos, numerados del 1 al 6. Son la <b>citosina (C)</b>, la <b>timina (T)</b> y el <b>uracilo (U)</b>.']
]],
['ex', '«<b>PURo AGua</b>»: las PURinas son A y G. Las otras tres (C, T, U) son pirimidinas. Otro truco: «pirimidina» es la palabra más larga pero la molécula más chica (un solo anillo).', 'Mnemotecnia'],
['img', 'p007-purinas-pirimidinas', 'Estructuras numeradas: purina, adenina y guanina (arriba); pirimidina, citosina, uracilo y timina (abajo). En rosa, el nitrógeno que se une al azúcar: N9 en las purinas y N1 en las pirimidinas.', 7],
['steps', 'Cómo reconocer cada base', [
'<b>Adenina:</b> purina con un grupo <b>amino (–NH₂) en el C6</b>.',
'<b>Guanina:</b> purina con un <b>carbonilo (C=O) en el C6</b> y un <b>amino en el C2</b>.',
'<b>Citosina:</b> pirimidina con un <b>amino en el C4</b> y un carbonilo en el C2.',
'<b>Uracilo:</b> pirimidina con <b>dos carbonilos</b> (C2 y C4).',
'<b>Timina:</b> un uracilo con un <b>metilo (–CH₃) en el C5</b>; por eso también se la llama 5-metiluracilo.'
]],
['h', 'Propiedades que salen de la estructura'],
['table', ['Propiedad', 'Por qué ocurre', 'Consecuencia'], [
['Aromáticas e hidrofóbicas', 'Son anillos planos con dobles enlaces alternados. Sus caras planas no forman puentes de hidrógeno con el agua.', 'Tienden a apilarse unas sobre otras, lejos del agua: en el ADN quedan hacia adentro (capítulo 65).'],
['Poco solubles en agua (más solubles en medio ácido o básico)', 'A pH neutro casi no tienen carga. En medio ácido sus nitrógenos ganan protones y en medio básico los pierden; con carga interactúan mejor con el agua.', 'El pH extremo cambia sus cargas y puede separar las cadenas del ADN (capítulo 68).'],
['Absorben luz ultravioleta a ~260 nm', 'Los electrones de los dobles enlaces están deslocalizados en el anillo y absorben esa luz.', 'Se usa para medir ADN y ARN y para seguir su desnaturalización (capítulo 68).']
]],
['h', 'Tres bases emparentadas: C, U y T'],
['p', 'Si a la citosina se le quita el grupo amino del C4 (<b>desaminación</b>), queda un carbonilo en su lugar: se obtiene <b>uracilo</b>. Si al uracilo se le agrega un metilo en el C5 (<b>metilación</b>), se obtiene <b>timina</b>. Estas tres bases son químicamente muy parecidas, y ese parecido explica por qué el ADN usa timina y no uracilo (capítulo 69).'],
['trap', 'Es una relación química entre estructuras. En la célula la timina no se fabrica metilando uracilo suelto: se metila el nucleótido dUMP para dar dTMP (capítulo 75). Y cuando una citosina del ADN se desamina sola, eso es un daño que hay que reparar (capítulo 69).'],
['h', 'Qué bases tiene el ADN y cuáles el ARN'],
['p', 'El ADN y el ARN tienen cuatro bases cada uno. Comparten tres (adenina, guanina y citosina) y difieren en una: el ADN tiene <b>timina</b> y el ARN tiene <b>uracilo</b> en su lugar.'],
['img', 'p008-bases-adn-arn', 'Bases del ADN (celeste) y del ARN (amarillo). La única diferencia está resaltada: el metilo (H₃C–) de la timina, que falta en el uracilo.', 8],
['table', ['', 'Purinas', 'Pirimidinas'], [
['ADN', 'Adenina (A), Guanina (G)', 'Citosina (C), <b>Timina (T)</b>'],
['ARN', 'Adenina (A), Guanina (G)', 'Citosina (C), <b>Uracilo (U)</b>']
]],
['check', [
['¿Cuántos anillos tiene una purina? ¿Y una pirimidina?', 'Purina: dos anillos fusionados (6 + 5 átomos). Pirimidina: un anillo de 6 átomos.'],
['¿Qué diferencia hay entre timina y uracilo?', 'La timina tiene un metilo en el C5; el uracilo no.'],
['¿Por qué los ácidos nucleicos absorben luz a 260 nm?', 'Por los electrones deslocalizados de los anillos aromáticos de las bases.'],
['¿Qué base aparece solo en el ADN y cuál solo en el ARN?', 'Timina solo en el ADN; uracilo solo en el ARN.'],
['¿Qué base se obtiene al desaminar citosina?', 'Uracilo.']
]]
]
},
{
n: 60, group: G, pages: '9 y 13', title: 'El azúcar: ribosa y desoxirribosa',
lead: 'La pentosa es el conector del nucleótido: a ella se unen la base y el fosfato. Entre ARN y ADN cambia un solo grupo, y ese detalle decide cuál molécula es estable y cuál no.',
blocks: [
['p', 'Los azúcares de los ácidos nucleicos son pentosas: azúcares de cinco carbonos. En el ARN el azúcar es la <b>ribosa</b>; en el ADN es la <b>desoxirribosa</b>, que es una ribosa a la que le falta un oxígeno. De ahí el nombre: «des-oxi» = sin oxígeno.'],
['p', 'Su nombre químico completo es <b>β-D-ribofuranosa</b>. Leámoslo por partes, con lo que ya viste en Glúcidos: <b>ribo-</b> es el azúcar (ribosa, una aldopentosa); <b>-furanosa</b> indica que forma un anillo de cinco miembros (cuatro carbonos y un oxígeno); <b>D</b> es la serie, como casi todos los azúcares biológicos; <b>β</b> indica hacia dónde queda el grupo unido al carbono anomérico (C1′), que en los nucleósidos es la base.'],
['img', 'p009-ribosa-desoxirribosa', 'Arriba, modelos de desoxirribosa (ADN) y ribosa (ARN). Abajo, sus fórmulas con la numeración 1′ a 5′: en el C2′ la desoxirribosa tiene H y la ribosa tiene OH.', 9],
['h', 'Números con prima'],
['p', 'La base ya usa los números 1 a 9 para sus átomos. Para no confundir, los carbonos del azúcar se numeran con prima: 1′, 2′, 3′, 4′ y 5′ (se lee «uno prima», «dos prima»…).'],
['table', ['Carbono', 'Qué tiene', 'Para qué importa'], [
['C1′', 'Unión con la base (enlace N-glicosídico)', 'Forma el nucleósido (capítulo 61)'],
['C2′', 'OH en la ribosa · H en la desoxirribosa', 'Es la diferencia entre ARN y ADN, y decide su estabilidad'],
['C3′', 'Grupo OH', 'Se une al fosfato del nucleótido siguiente: es el extremo 3′'],
['C4′', 'Forma parte del anillo', 'Conecta el anillo con el C5′'],
['C5′', 'CH₂ fuera del anillo', 'Lleva el o los fosfatos: es el extremo 5′']
]],
['quote', 'Ribosa: OH en el C2′. Desoxirribosa: H en el C2′. Todo lo demás es igual.', 'La única diferencia'],
['img', 'p013-nucleotido-adn-arn', 'Nucleótido de ADN (fosfato + desoxirribosa + base) y nucleótido de ARN (fosfato + ribosa + base). El círculo rojo marca el OH en 2′ que solo tiene la ribosa.', 13],
['h', 'Por qué el ARN es menos estable'],
['p', 'Ese OH libre en el C2′ vuelve al ARN químicamente inestable: en solución acuosa, sobre todo en medio alcalino, se hidroliza (se corta) con mucha más facilidad que el ADN.'],
['why', 'En una cadena de ARN, el OH del C2′ queda justo al lado del enlace fosfodiéster que une ese nucleótido con el siguiente. Ese OH puede atacar al fósforo desde adentro de la misma molécula y cortar la cadena. En medio alcalino el OH pierde su protón y ataca todavía mejor. El ADN no tiene ese OH, así que su esqueleto resiste mucho más: por eso es la molécula elegida para guardar la información a largo plazo.', 'Cómo el 2′-OH corta su propia cadena'],
['check', [
['¿Qué significa la β en β-D-ribofuranosa?', 'Que en el carbono anomérico (C1′) la base queda del mismo lado que el C5′.'],
['¿Por qué se usan números con prima?', 'Para distinguir los carbonos del azúcar (1′ a 5′) de los átomos de la base (1 a 9).'],
['¿Qué tiene la ribosa en el C2′ y qué tiene la desoxirribosa?', 'Ribosa: OH. Desoxirribosa: H.'],
['¿Por qué el ADN es mejor que el ARN para guardar información?', 'Porque sin OH en el C2′ su esqueleto no se corta solo: es químicamente más estable.']
]]
]
},
{
n: 61, group: G, pages: '10–12', title: 'Nucleósidos y nucleótidos: cada enlace con su nombre',
lead: 'La base, el azúcar y los fosfatos se unen con tres tipos de enlaces distintos. Saber cuál es cuál evita la confusión más común de la unidad.',
blocks: [
['h', 'Nucleósido = base + azúcar'],
['p', 'La combinación de una base y un azúcar se llama <b>nucleósido</b>. Base y azúcar se unen por un <b>enlace N-glicosídico</b>, que se forma entre el <b>C1′ del azúcar</b> y un <b>nitrógeno de la base</b>: el <b>N9 en las purinas</b> y el <b>N1 en las pirimidinas</b>.'],
['p', 'Se llama N-glicosídico porque une el carbono anomérico de un azúcar con un nitrógeno. En Glúcidos viste el enlace O-glicosídico, que une el carbono anomérico con un oxígeno: es la misma idea.'],
['img', 'p010-nucleosidos', 'Adenosina y citidina (arriba), guanosina y uridina (abajo). Los círculos amarillos marcan los átomos del enlace N-glicosídico: N9 con C1′ en la adenosina (purina) y N1 con C1′ en la citidina (pirimidina).', 10],
['p', 'La unión es siempre <b>β</b>: si mirás el anillo del azúcar, la base (en el C1′) y el C5′ quedan del mismo lado del plano. Esa orientación se mantiene cuando después se agregan fosfatos, así que vale para nucleósidos y nucleótidos.'],
['p', 'Para nombrar un nucleósido se cambia la terminación de la base:'],
['table', ['Base', 'Nucleósido', 'Regla'], [
['Adenina', 'Adenosina', 'purinas → <b>-osina</b>'],
['Guanina', 'Guanosina', 'purinas → <b>-osina</b>'],
['Citosina', 'Citidina', 'pirimidinas → <b>-idina</b>'],
['Uracilo', 'Uridina', 'pirimidinas → <b>-idina</b>'],
['Timina', 'Timidina', 'pirimidinas → <b>-idina</b>']
]],
['h', 'Nucleótido = nucleósido + fosfato'],
['p', 'El grupo fosfato deriva del <b>ácido fosfórico</b> (H₃PO₄, también llamado ortofosfórico). Cuando un fosfato se une al <b>C5′</b> de un nucleósido, la molécula pasa a llamarse <b>nucleótido</b>. Los fosfatos se pueden unir de dos maneras:'],
['cols', [
['Enlace fosfoéster', 'Fosfato unido al OH de un azúcar. Un ácido (el fosfórico) con un alcohol (el OH) forma un <b>éster</b>.'],
['Enlace fosfoanhídrido', 'Fosfato unido a otro fosfato. Dos ácidos unidos con pérdida de agua forman un <b>anhídrido</b>.']
]],
['img', 'p011-fosfato', 'Arriba: ácido ortofosfórico. Adenosina (nucleósido) + fosfato → AMP (nucleótido) + H₂O, con el fosfato en el C5′. Abajo: AMP + fosfato → ADP + H₂O.', 11],
['steps', 'De adenosina a ATP, enlace por enlace', [
'<b>Adenosina + fosfato → AMP + H₂O.</b> El fosfato se une al OH del C5′: enlace <b>fosfoéster</b>.',
'<b>AMP + fosfato → ADP + H₂O.</b> El nuevo fosfato se une al anterior: enlace <b>fosfoanhídrido</b>.',
'<b>ADP + fosfato → ATP + H₂O.</b> Se suma un segundo enlace fosfoanhídrido.',
'Resultado: el ATP tiene <b>un</b> enlace fosfoéster (azúcar–fosfato) y <b>dos</b> fosfoanhídrido (fosfato–fosfato).'
]],
['p', 'En cada paso se libera agua: son reacciones de <b>condensación</b>. En la célula los fosfatos casi nunca se agregan como fosfato suelto: los transfieren enzimas llamadas quinasas, usando otro nucleótido trifosfato (normalmente ATP) como dador.'],
['h', 'Mono, di y trifosfatos'],
['p', 'La cantidad de fosfatos se indica con los prefijos mono-, di- y tri-: AMP (adenosín <b>mono</b>fosfato), ADP (<b>di</b>fosfato), ATP (<b>tri</b>fosfato). Los fosfatos se nombran con letras griegas desde el azúcar hacia afuera: el unido al C5′ es el <b>α</b>, el siguiente el <b>β</b> y el último el <b>γ</b>.'],
['img', 'p012-atp-damp', 'Adenosín trifosfato (ATP) y desoxiadenosín monofosfato (dAMP), en modelo y en fórmula. El ATP lleva ribosa (OH en 2′, en rojo) y tres fosfatos; el dAMP lleva desoxirribosa (H en 2′, en azul) y un solo fosfato.', 12],
['p', 'Las moléculas con dos o tres fosfatos son buenos <b>dadores de energía</b>: liberan energía al transferir sus fosfatos. Además, como cada fosfato está cargado negativamente, los nucleótidos son moléculas <b>muy polares y con carga negativa</b>.'],
['why', 'A pH fisiológico cada fosfato lleva cargas negativas. En un trifosfato esas cargas quedan muy cerca y se repelen. Cuando se rompe un enlace fosfoanhídrido, las cargas se separan y los productos quedan más estables (por resonancia y por hidratación). Esa diferencia es la energía que se libera y que la célula usa para impulsar otras reacciones. El enlace fosfoéster (el α) no tiene ese problema: por eso es estable.', 'Por qué los di- y trifosfatos guardan energía'],
['h', 'Todos los enlaces de la unidad'],
['table', ['Enlace', 'Qué une', 'Dónde', 'Tipo', 'Ejemplo'], [
['<b>N-glicosídico</b>', 'base con azúcar', 'C1′ con N9 (purinas) o N1 (pirimidinas)', 'covalente', 'adenosina'],
['<b>Fosfoéster</b>', 'fosfato con azúcar', 'O del C5′ con el fósforo', 'covalente, estable', 'AMP'],
['<b>Fosfoanhídrido</b>', 'fosfato con fosfato', 'P–O–P', 'covalente, mucha energía de hidrólisis', 'ADP, ATP'],
['<b>Fosfodiéster</b>', 'un azúcar con otro, a través de un fosfato', 'C3′–O–P–O–C5′', 'covalente, <b>intracatenario</b>', 'esqueleto de ADN y ARN (capítulo 65)'],
['<b>Puente de hidrógeno</b>', 'base con base', 'entre las dos cadenas', 'no covalente, <b>intercatenario</b>', 'A=T (2), G≡C (3) (capítulo 65)']
]],
['trap', 'Fosfo<b>éster</b> = un fosfato unido a <b>un</b> azúcar (AMP). Fosfo<b>diéster</b> = un fosfato unido a <b>dos</b> azúcares (la cadena). Fosfo<b>anhídrido</b> = un fosfato unido a <b>otro fosfato</b>. «Intracatenario» = dentro de una misma cadena; «intercatenario» = entre dos cadenas.', 'No mezclar los nombres'],
['check', [
['¿Qué átomos forman el enlace N-glicosídico en la guanosina? ¿Y en la uridina?', 'Guanosina (purina): N9 de la base con C1′ del azúcar. Uridina (pirimidina): N1 con C1′.'],
['¿Cuántos enlaces fosfoanhídrido tiene el ATP? ¿Y el AMP?', 'ATP: dos. AMP: ninguno (solo un fosfoéster).'],
['¿Cómo se llama el fosfato unido directamente al C5′?', 'Fosfato α.'],
['¿Por qué los nucleótidos tienen carga negativa a pH fisiológico?', 'Por sus grupos fosfato, que pierden protones y quedan con carga negativa.']
]]
]
},
{
n: 62, group: G, pages: '13–16', title: 'Cómo se nombran: bases, nucleósidos y nucleótidos',
lead: 'Con tres reglas podés nombrar cualquier nucleótido y entender todos los símbolos: A, dA, dAMP, ATP, dTTP…',
blocks: [
['steps', 'Tres reglas para nombrar', [
'<b>Base → nucleósido:</b> purinas con -osina (adenosina, guanosina); pirimidinas con -idina (citidina, uridina, timidina).',
'<b>Si el azúcar es desoxirribosa</b>, se antepone «desoxi» (desoxiadenosina) y en el símbolo se agrega una <b>d</b> minúscula (dA, dAMP). Si es ribosa, no se agrega nada (adenosina, AMP).',
'<b>Nucleósido → nucleótido:</b> se agrega cuántos fosfatos tiene: monofosfato (MP), difosfato (DP), trifosfato (TP). Para el 5′-monofosfato también se usa la terminación <b>-ilato</b>: adenilato = AMP, desoxiadenilato = dAMP.'
]],
['ex', 'dGTP = <b>d</b>esoxi + <b>G</b>uanosina + <b>T</b>ri<b>P</b>hosphate = desoxiguanosín trifosfato: guanina + desoxirribosa + tres fosfatos. Es uno de los cuatro ladrillos que usa la ADN polimerasa.', 'Desarmar un símbolo'],
['p', 'Las palabras «nucleósido» y «nucleótido» sirven para las dos formas: hay ribonucleósidos y desoxirribonucleósidos, ribonucleótidos y desoxirribonucleótidos.'],
['table', ['Ácido', 'Base', 'Nucleósido', 'Nucleótido (5′-monofosfato)', 'Símbolos'], [
['ARN', 'Adenina', 'Adenosina', 'Adenilato (AMP)', 'A, AMP'],
['ARN', 'Guanina', 'Guanosina', 'Guanilato (GMP)', 'G, GMP'],
['ARN', 'Uracilo', 'Uridina', 'Uridilato (UMP)', 'U, UMP'],
['ARN', 'Citosina', 'Citidina', 'Citidilato (CMP)', 'C, CMP'],
['ADN', 'Adenina', 'Desoxiadenosina', 'Desoxiadenilato (dAMP)', 'A, dA, dAMP'],
['ADN', 'Guanina', 'Desoxiguanosina', 'Desoxiguanilato (dGMP)', 'G, dG, dGMP'],
['ADN', 'Timina', 'Timidina o desoxitimidina', 'Timidilato (TMP o dTMP)', 'T, dT, dTMP'],
['ADN', 'Citosina', 'Desoxicitidina', 'Desoxicitidilato (dCMP)', 'C, dC, dCMP']
]],
['p', 'Vas a encontrar la timidina escrita con y sin «desoxi» (timidina o desoxitimidina; TMP o dTMP). Es la misma molécula: como la timina está casi solo en el ADN, muchos libros omiten el prefijo porque se sobreentiende.'],
['img', 'p014-tabla-nomenclatura', 'Tabla de nomenclatura en inglés (Stryer, tabla 25.1): base, nucleósido y nucleótido para ARN y ADN.', 14],
['img', 'p015-desoxirribonucleotidos', 'Desoxirribonucleótidos: desoxiadenilato, desoxiguanilato, desoxitimidilato y desoxicitidilato (cada uno es el 5′-monofosfato de su desoxinucleósido). Símbolos: A, dA, dAMP · G, dG, dGMP · T, dT, dTMP · C, dC, dCMP.', 15],
['img', 'p016-ribonucleotidos', 'Ribonucleótidos: adenilato, guanilato, uridilato y citidilato (5′-monofosfatos de adenosina, guanosina, uridina y citidina). Símbolos: A, AMP · G, GMP · U, UMP · C, CMP.', 16],
['steps', 'Qué mirar en las dos figuras', [
'En todas, el fosfato (⁻O–P–O⁻) está a la izquierda, unido por un enlace fosfoéster al CH₂ del C5′.',
'La base, en el recuadro rosado, está unida al C1′ por el enlace N-glicosídico (N9 en A y G; N1 en T, U y C).',
'Debajo del anillo del azúcar están los grupos del C3′ y del C2′: en los <b>desoxirribonucleótidos</b> se lee «OH H» (no hay OH en 2′); en los <b>ribonucleótidos</b>, «OH OH».',
'La timina se reconoce por el CH₃ del anillo; el uracilo, por no tenerlo.'
]],
['check', [
['¿Cómo se llama el nucleótido que tiene citosina, ribosa y un fosfato?', 'Citidilato o citidina 5′-monofosfato (CMP).'],
['¿Qué es el dATP?', 'Desoxiadenosín trifosfato: adenina + desoxirribosa + tres fosfatos.'],
['¿Uridina es una base, un nucleósido o un nucleótido?', 'Un nucleósido: uracilo + ribosa, sin fosfato.'],
['¿Por qué no aparece dUMP entre los nucleótidos del ADN?', 'Porque el ADN usa timina, no uracilo. El dUMP existe como intermediario: es el precursor del dTMP (capítulo 75).']
]]
]
}
];
