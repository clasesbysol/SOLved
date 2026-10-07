'use strict';
/* Ácidos nucleicos I · Bloques 2 y 3: el ADN como material genético y su estructura (diapositivas 17–37). Capítulos 63 a 68. */
const { F } = require('./figs-acidos');
const { M } = require('./kit-an');
const G = 'Ácidos nucleicos I';

module.exports = [
{
n: 63, group: G, pages: '17–20', title: 'El ADN como material genético: Griffith, Avery y Hershey–Chase',
lead: 'Hoy parece obvio que los genes son ADN, pero durante años la candidata favorita fue la proteína. Tres experimentos, uno tras otro, fueron cerrando la pregunta.',
blocks: [
['h', 'Lo que se sabía antes'],
['quote', 'Se sabía que… a) Las proteínas eran cadenas formadas de 20 aminoácidos diferentes. b) Los ácidos nucleicos eran polímeros de cuatro nucleótidos diferentes. 3 comunes en el DNA/RNA: Adenina (A), Guanina (G), Citosina (C); y además Timina (T, en DNA) o Uracilo (U, en RNA). Las proteínas parecían las candidatas obvias para llevar la información, y el ADN parecía demasiado simple!', 17],
['why', 'Con 20 «letras» distintas, una proteína puede escribir muchísimas más secuencias que un polímero de solo 4. Además, la idea del tetranucleótido de Levene (capítulo 59) sugería que el ADN era una repetición monótona. Faltaba entender que, aun con 4 letras, una secuencia muy larga puede guardar enorme cantidad de información.', 'Por qué se pensaba en las proteínas'],
['h', 'El experimento de Griffith (1928)'],
['cols', [
['Neumococos de tipo R (rugoso)', 'Forman colonias de aspecto rugoso sobre un medio sólido y son <b>poco virulentos</b>.'],
['Neumococos de tipo S (liso)', 'Forman colonias de aspecto liso y brillante sobre un medio sólido, y <b>provocan infecciones letales</b>. Son sensibles al calor.']
]],
['fig', F.griffith, 'Esquema propio de los cuatro ensayos de Griffith.'],
['img', 'p018-griffith', 'Diapositiva del experimento de Griffith: R strain → mouse lives; S strain → mouse dies; S strain heat-killed → mouse lives; R strain + S strain heat-killed → mouse dies. «Factor transformante?»', 18],
['quote', 'Los neumococos de tipo S (liso) provocan infecciones letales, pero son sensibles al calor. Si se inyectan al ratón neumococos de tipo S que han sido calentados, el animal sobrevive. Si se inyectan a un ratón neumococos vivos de tipo R y neumococos muertos de tipo S (ninguno de los dos es letal por separado) se produce la muerte del ratón. En los ratones muertos se encontraron neumococos vivos del tipo S que, a su vez, eran capaces de infectar a otros ratones: el cambio que se había producido era estable y era heredado por la descendencia.', 18],
['steps', 'El razonamiento de Griffith', [
'Ni las R vivas ni las S muertas matan por separado.',
'Juntas matan, y del ratón se recuperan bacterias <b>S vivas</b>. Las S muertas no resucitaron: fueron las R las que se <b>transformaron</b> en S.',
'Las nuevas S transmiten la característica a su descendencia: el cambio es <b>estable y heredable</b>, o sea, cambió la información genética de las R.',
'Conclusión: en las S muertas hay un «<b>factor transformante</b>» (FT) que pasa a las R. Griffith no sabía de qué estaba hecho.'
]],
['trap', 'Griffith demostró que <b>existe</b> la transformación y un factor transformante, pero <b>no identificó</b> qué molécula era. Por eso es falsa la frase «Los experimentos de Griffith en 1928 demostraron que el ADN era el principio transformante» (pregunta V/F del capítulo 78).'],
['h', 'El experimento de Avery, MacLeod y McCarty (1944)'],
['quote', 'Trataron los neumococos S muertos por calentamiento con detergente para obtener un lisado celular (un extracto libre de células que contenía el FT). Este lisado contiene (entre otras cosas) el polisacárido de la superficie celular, las proteínas, el ARN y el ADN de los neumococos S. Sometieron al lisado a diversos tratamientos enzimáticos. Inyectaron en ratones los neumococos de tipo R vivos junto con una fracción del lisado modificada enzimáticamente.', 19],
['table', ['Tratamiento realizado sobre el lisado', 'Resultado', 'Conclusión'], [
['Ninguno', 'El ratón muere', 'El FT está presente en el lisado'],
['Se añadió la enzima SIII, que degrada la cápsula de polisacárido', 'El ratón muere', 'El FT no era el polisacárido que estaba presente en el lisado'],
['Se añadieron al lisado anterior (con el polisacárido degradado) las enzimas proteolíticas tripsina y quimiotripsina', 'El ratón muere', 'El FT no era una proteína. Debía ser un ácido nucleico'],
['Se extrajeron los ácidos nucleicos del lisado anterior y se añadió la enzima ARNasa (que degrada el ARN)', 'El ratón muere', 'El FT no era el ARN'],
['Al extracto de ácidos nucleicos anterior se le añadió la enzima ADNasa (que degrada el ADN)', '<b>El ratón vive</b>', '<b>FT = ADN</b>']
]],
['fig', F.avery, 'Esquema propio: cada enzima destruye un candidato. Solo cuando se destruye el ADN la transformación desaparece y el ratón vive.'],
['img', 'p019-avery', 'Diapositiva del experimento de Avery, McLeod y McCarty con los dibujos de resultado (Mouse dies / Mouse lives) de cada tratamiento.', 19],
['why', 'Es un experimento por eliminación. Si destruís una molécula y la transformación <b>sigue</b> ocurriendo (el ratón muere), esa molécula no era el FT. Si destruís una molécula y la transformación <b>desaparece</b> (el ratón vive), esa molécula era imprescindible. Solo la ADNasa anula la transformación: la transformación bacteriana requiere ADN.', 'Por qué el ratón que vive es la clave'],
['note', 'En las diapositivas el apellido aparece como «McLeod» (diap. 19) y «McLeod y McCartney» (diap. 63). Los nombres correctos de los autores son <b>Oswald Avery, Colin MacLeod y Maclyn McCarty</b>.', 'nombres'],
['h', 'El experimento de Alfred Hershey y Martha Chase (1952)'],
['p', 'En la clase, esta diapositiva solo tiene el título y un video del experimento: <a href="https://www.youtube.com/watch?v=ZtSfFqqhEIY" target="_blank" rel="noopener">youtube.com/watch?v=ZtSfFqqhEIY</a>. Lo que sigue es una ampliación para que entiendas qué muestra el video.'],
['deep', 'Ampliación: cómo fue el experimento de Hershey y Chase', '<ol><li>Usaron un <b>bacteriófago</b> (virus que infecta bacterias), formado solo por ADN y una cubierta de proteína.</li><li>Marcaron una tanda de fagos con <b>³²P</b> (el fósforo está en el ADN, no en las proteínas) y otra con <b>³⁵S</b> (el azufre está en las proteínas, en Cys y Met, no en el ADN).</li><li>Dejaron que los fagos infectaran bacterias, agitaron en una licuadora para desprender lo que quedaba afuera y centrifugaron: las bacterias van al fondo.</li><li>El ³²P (ADN) apareció <b>dentro</b> de las bacterias; el ³⁵S (proteína) quedó <b>afuera</b>, en el sobrenadante. Y de esas bacterias salían fagos nuevos.</li><li>Conclusión: lo que entra a la bacteria y dirige la fabricación de nuevos fagos es el ADN. <b>El ADN es el material genético de los fagos.</b></li></ol>'],
['table', ['Experimento', 'Año', 'Qué demostró'], [
['Griffith', '1928', 'Existe un factor transformante en las S muertas; la transformación es estable y heredable'],
['Avery, MacLeod y McCarty', '1944', 'El factor transformante es el ADN: la transformación bacteriana requiere ADN'],
['Hershey y Chase', '1952', 'El ADN (no la proteína) es el material genético de los fagos']
]],
['check', [
['¿Qué controles necesitó Griffith para concluir que hubo transformación?', 'R vivas solas (el ratón vive) y S muertas solas (el ratón vive). Así se ve que la muerte con la mezcla no la causa ninguno de los dos por separado.'],
['En Avery, ¿por qué el tratamiento con ARNasa no alcanza para decir que el FT es ADN?', 'Solo descarta al ARN. Para afirmar que es ADN hace falta mostrar que al destruir el ADN (ADNasa) la transformación desaparece.'],
['¿Quiénes demostraron que el ADN es el material genético de los fagos?', 'Hershey y Chase (1952).']
]]
]
},
{
n: 64, group: G, pages: '21–24', title: 'Hacia la estructura: rayos X, Foto 51 y las reglas de Chargaff',
lead: 'Saber que los genes son ADN abrió otra pregunta: ¿qué forma tiene? Dos tipos de datos la respondieron: imágenes de difracción de rayos X y la composición de bases.',
blocks: [
['h', 'Los protagonistas'],
['fig', F.timeline, 'Esquema propio de la línea de tiempo que aparece al pie de la diapositiva 21.'],
['table', ['Persona', 'Lugar / dato de la clase'], [
['<b>Linus Pauling</b> (EE. UU.)', 'Desarrolló en 1939 el concepto de hibridación de los orbitales atómicos. Propuso la estructura de la α-hélice (en proteínas), lo que lo llevó a intentar resolver la estructura del ADN: propuso una <b>triple hélice</b>. En la diapositiva lleva las marcas 1954 y 1962.'],
['<b>James Watson</b> y <b>Francis Crick</b>', 'Universidad de Cambridge (escudo). Marca 1962.'],
['<b>Maurice Wilkins</b>', 'King’s College London. Marca 1962. Su frase: «El ADN es como el oro de Midas; todo el que lo toca, enloquece.»'],
['<b>Rosalind Franklin</b>', 'King’s College London. Sin marca de premio.']
]],
['gallery', [['p021-pauling', 'Linus Pauling (1954, 1962)'], ['p021-watson', 'James Watson (1962)'], ['p021-crick', 'Francis Crick (1962)'], ['p021-wilkins', 'Maurice Wilkins (1962)'], ['p021-franklin', 'Rosalind Franklin']], 21],
['img', 'p021-cronologia', 'Diapositiva completa: protagonistas y línea de tiempo 1865 Mendel · 1909 Johannsen · 1928 Griffith · 1944 Avery · 1952 H-C · 1953 Watson-Crick · 1962 Premio Nobel.', 21],
['note', 'Las marcas amarillas son los años de los premios Nobel: Pauling recibió el de Química en 1954 y el de la Paz en 1962; Watson, Crick y Wilkins compartieron el de Fisiología o Medicina en 1962. Franklin había muerto en 1958, y el Nobel no se otorga después de la muerte.', 'qué indican las fechas'],
['h', 'La Foto 51'],
['img', 'p022-foto51', 'Foto 51, obtenida por Franklin y Gosling: patrón de difracción de rayos X de fibras de ADN.', 22],
['h', 'Qué es la difracción de rayos X'],
['quote', 'Técnica analítica, no destructiva → da información sobre la estructura molecular, cristalográfica y propiedades físicas de la sustancia analizada. Marca radiográfica que se observa luego de interponer una muestra entre una placa y la fuente de RX (se analiza ángulo dispersado, la polarización, la longitud de onda o la energía). Experimentos de Rosalind Franklin.', 23],
['p', 'Los rayos X tienen una longitud de onda parecida a las distancias entre átomos. Cuando atraviesan una muestra con estructuras que se repiten (como las vueltas de una hélice), las ondas dispersadas se suman en algunas direcciones (<b>interferencia constructiva</b>: aparecen manchas en la película) y se anulan en otras (<b>interferencia destructiva</b>: no aparece nada). La posición de las manchas permite calcular qué distancias se repiten en la molécula.'],
['img', 'p023-bragg', 'Esquema de la técnica: los rayos X atraviesan el objeto y se dispersan con un ángulo 2θ hasta la película. Ley de Bragg y tabla de distancias d con su ángulo 2θ.', 23],
['p', 'La relación entre el ángulo y la distancia repetida es la <b>ley de Bragg</b>. Primero los símbolos: <b>n</b> es un número entero (el orden de la reflexión, 1, 2, 3…); <b>λ</b> es la longitud de onda de los rayos X; <b>d</b> es la distancia que se repite en la muestra; <b>θ</b> es el ángulo de dispersión (en la película se mide 2θ, el doble).'],
['math', String.raw`n\,\lambda = 2\,d\,\operatorname{sen}\theta`, 'n·λ = 2·d·sen θ'],
['steps', 'Comprobación con la tabla de la diapositiva (ampliación)', [
'Despejando: ' + M(String.raw`d = \dfrac{n\,\lambda}{2\,\operatorname{sen}\theta}`, 'd = n·λ / (2·sen θ)') + '. Con n = 1 y la radiación de cobre que se usa habitualmente, ' + M(String.raw`\lambda \approx 1{,}54\ \text{Å}`, 'λ ≈ 1,54 Å') + '.',
'Para la mancha de 2θ = 26,2°: θ = 13,1° y sen 13,1° ≈ 0,227. Entonces ' + M(String.raw`d = \dfrac{1{,}54\ \text{Å}}{2 \times 0{,}227} \approx 3{,}4\ \text{Å}`, 'd = 1,54 Å / (2 × 0,227) ≈ 3,4 Å') + ': la distancia entre bases apiladas.',
'Para 2θ = 2,6°: θ = 1,3° y sen 1,3° ≈ 0,0227. ' + M(String.raw`d = \dfrac{1{,}54\ \text{Å}}{2 \times 0{,}0227} \approx 34\ \text{Å}`, 'd = 1,54 Å / (2 × 0,0227) ≈ 34 Å') + ': la longitud de una vuelta.',
'Para 2θ = 4,0°: θ = 2,0° y sen 2,0° ≈ 0,0349. ' + M(String.raw`d \approx 22\ \text{Å}`, 'd ≈ 22 Å') + '.',
'Fijate en la relación inversa: <b>distancias chicas dan ángulos grandes</b>. Por eso la distancia entre bases (3,4 Å) aparece lejos del centro de la foto, arriba y abajo.'
]],
['img', 'p023-paneles', 'Cuatro lecturas de la Foto 51: la estructura en X indica un objeto helicoidal; cada giro de la hélice tiene 34 Å; la distancia entre nucleótidos es de 3,4 Å; la ausencia de la cuarta línea indica una doble hélice (interferencia).', 23],
['img', 'p023-helice-anotada', 'Esquema anotado: distancia entre pares de bases (3,4 Å), una vuelta = 34 Å (10 pares por vuelta) y diámetro de la hélice ≈ 20 Å.', 23],
['quote', '–Estructura en X indica un helicoidal · –Cada giro o vuelta de la hélice tiene 34 Å · –La distancia entre nucleótidos es de 3,4 Å · –10 a 10,5 nucleótidos por vuelta · –La ausencia de la 4ta línea indica una doble hélice · –El diámetro de la hélice es de 20–24 Å.', 23],
['why', 'En el patrón de una hélice, las manchas se ordenan en «líneas de capa» horizontales. Si hubiera una sola hélice, todas estarían. Pero con dos cadenas desplazadas una respecto de la otra, las ondas que vienen de ambas se anulan justo en la cuarta línea: esa interferencia destructiva delata que hay <b>dos</b> cadenas. Y 34 Å ÷ 3,4 Å = 10 nucleótidos por vuelta.', 'Por qué falta la cuarta línea'],
['h', 'Las reglas de Chargaff'],
['p', '<b>Erwin Chargaff</b> (1905–2002), químico austríaco, analizó la composición de bases del ADN de muchos organismos y encontró cuatro regularidades:'],
['quote', '1- Composición de bases en el DNA varía de un organismo a otro. 2. DNA de una misma especie aislado de distintos tejidos tiene la misma composición de bases. 3. Dicha composición no varía por la edad, estado nutricional o cambios ambientales. 4. La cantidad de A es igual a la de T, y el número de unidades de G es igual al de C: [A]=[T], [G]=[C]. Esto establece la unidad de medición del DNA como pares de bases. Esta es la llamada ley de Chargaff (1949): [A+G]=[T+C] o [purinas]=[pirimidinas].', 24],
['math', String.raw`[\mathrm{A}] = [\mathrm{T}] \qquad [\mathrm{G}] = [\mathrm{C}] \qquad [\mathrm{A}+\mathrm{G}] = [\mathrm{T}+\mathrm{C}]`, '[A] = [T] · [G] = [C] · [A + G] = [T + C]'],
['why', 'Los puntos 1 a 3 dicen que la composición es una «firma» de la especie: distinta entre especies, igual en todas las células de un mismo organismo. Eso es lo esperable para el material genético. El punto 4 sugiere que A siempre va con T y G con C: si las bases forman pares fijos, cada A tiene su T enfrente, y por eso se cuentan igual. De ahí que el ADN se mida en <b>pares de bases</b> (pb).', 'Qué significa cada regla'],
['steps', 'Ejercicio: un ADN bicatenario tiene 30 % de A. ¿Cuánto tiene de cada base?', [
'Como [A] = [T]: T = 30 %.',
'A + T = 60 %, así que G + C = 100 % − 60 % = 40 %.',
'Como [G] = [C]: G = C = 20 %.',
'Comprobación: purinas (A + G) = 30 + 20 = 50 %; pirimidinas (T + C) = 30 + 20 = 50 %. Se cumple [purinas] = [pirimidinas].'
]],
['note', 'Las igualdades de Chargaff valen para el <b>ADN de doble cadena</b> con apareamiento A–T y G–C. En una cadena sola (o en el ARN, que suele ser monocatenario) no tienen por qué cumplirse.', 'alcance'],
['check', [
['¿Qué distancia de la hélice corresponde a la mancha más alejada del centro de la Foto 51?', 'La más chica: 3,4 Å, la separación entre bases. En difracción, distancias chicas dan ángulos grandes.'],
['Un ADN bicatenario tiene 22 % de G. Calculá A, T y C.', 'C = 22 %; G + C = 44 %; A + T = 56 %; A = T = 28 %.'],
['¿Por qué el punto 2 de Chargaff es lo esperable para el material genético?', 'Porque todas las células de un organismo tienen la misma información genética, así que su ADN debe tener la misma composición en cualquier tejido.']
]]
]
},
{
n: 65, group: G, pages: '25–28 y 30', title: 'El modelo de Watson y Crick: cómo está armada la doble hélice',
lead: 'Con los datos de Franklin y de Chargaff, Watson y Crick propusieron en 1953 el modelo de la doble hélice. Cada característica del modelo tiene una razón química.',
blocks: [
['quote', 'La molécula de DNA es una doble hélice · Es dextrógira (enrollamiento de la cadena es hacia la derecha) · Las dos cadenas de polinucleótidos siguen un eje imaginario de simetría · Los grupos fosfatos se encuentran mirando hacia fuera (hidrofílicas) · Las bases (molécula plana) se localizan hacia el interior (hidrofóbicas) · Los pares de bases están formados siempre por una Purina–Pirimidina de manera que siempre están equidistantes y complementarias según A–T y C–G · Las cadenas son antiparalelas 5′–3′ 3′–5′.', 25],
['img', 'p025-modelo', 'El modelo de Watson y Crick (1953) en forma de escalera: cadena izquierda de 5′ (arriba) a 3′, cadena derecha de 3′ a 5′; pares T–A, G–C, C–G y A–T en el medio; fosfatos (P) y azúcares afuera.', 25],
['table', ['Característica', 'Qué significa', 'Por qué es así'], [
['Doble hélice', 'Dos cadenas enrolladas una alrededor de la otra', 'Lo indican la X de la Foto 51 y la cuarta línea ausente (capítulo 64)'],
['Dextrógira', 'Gira hacia la derecha, como un tornillo común', 'Es la forma más estable para el ADN en condiciones fisiológicas (forma B, capítulo 66)'],
['Eje de simetría', 'Las dos cadenas giran alrededor de un mismo eje imaginario', 'Las dos cadenas son equivalentes en forma'],
['Fosfatos afuera', 'El esqueleto azúcar-fosfato forma la parte externa', 'Los fosfatos están cargados: les conviene estar en contacto con el agua y con cationes'],
['Bases adentro', 'Las bases planas se apilan en el centro', 'Son hidrofóbicas: se protegen del agua y se apilan entre sí'],
['Purina–pirimidina', 'Cada par tiene una base de dos anillos y una de uno', 'Así todos los pares miden lo mismo y el diámetro es constante; explica [purinas] = [pirimidinas]'],
['Complementarias A–T y C–G', 'Frente a A siempre hay T; frente a G siempre hay C', 'Son las parejas cuyos puentes de H encajan; explica [A]=[T] y [G]=[C]'],
['Antiparalelas', 'Una cadena va 5′→3′ y la otra 3′→5′', 'Es la única orientación en la que los pares encajan geométricamente']
]],
['why', 'Una purina con otra purina sería demasiado ancha para el espacio entre los esqueletos; dos pirimidinas, demasiado angostas. Con una de cada tipo, todos los pares ocupan lo mismo y la hélice mantiene un diámetro constante (≈ 20 Å). Por eso Watson y Crick pudieron explicar a la vez la Foto 51 y las reglas de Chargaff.', 'Por qué siempre purina con pirimidina'],
['h', 'Los extremos 5′ y 3′ y el enlace fosfodiéster'],
['quote', 'Los grupos fosfato están unidos a los carbonos 5′ y 3′ de cada azúcar de la cadena de ADN. Un final de la cadena lleva un grupo fosfato libre pegado al carbono 5′; a este se le llama extremo 5′ de la molécula. El otro final tiene un grupo hidroxilo libre (–OH) en el carbono 3′ y se le llama extremo 3′ de la molécula.', 26],
['img', 'p026-fosfodiester', 'dCMP (círculo violeta) unido a dAMP (círculo rojo) por una UNIÓN FOSFODIÉSTER: el fosfato une el C3′ del primer azúcar con el C5′ del segundo. Abajo queda el OH libre del C3′ del dAMP: extremo 3′.', 26],
['quote', 'El enlace une 2 azúcares: En C3 de un azúcar y C5 de otro azúcar.', 27],
['img', 'p027-cadena', 'El enlace fosfodiéster en la cadena: esqueleto fosfato-desoxirribosa (Phosphate-deoxyribose backbone) con las bases, y la ampliación de un fosfato que une dos azúcares.', 27],
['steps', 'Cómo se forma la cadena', [
'El C5′ de cada nucleótido lleva el fosfato (enlace fosfoéster).',
'Ese fosfato se une también al OH del C3′ del nucleótido anterior. Ahora el fosfato está unido a <b>dos</b> azúcares: es un enlace fosfo<b>di</b>éster (3′→5′).',
'Así se repite: …C3′–O–P–O–C5′… Por eso la cadena tiene dos puntas distintas: una con el fosfato del C5′ libre (<b>extremo 5′</b>) y otra con el OH del C3′ libre (<b>extremo 3′</b>).',
'Por convención, las secuencias se escriben de 5′ a 3′.'
]],
['h', 'Puentes de hidrógeno entre bases'],
['img', 'p028-puentes-h', 'Par adenina–timina, con 2 puentes de hidrógeno, y par guanina–citosina, con 3 puentes de hidrógeno (zonas celestes).', 28],
['quote', 'Las uniones intercatenarias se dan por puentes de hidrógeno. El ADN rico en G+C es más estable y necesita más temperatura para separarse (slide 36).', 28],
['steps', 'Cómo leer los pares', [
'Un puente de hidrógeno se forma entre un H unido a N (dador) y un O o un N con pares libres (aceptor).',
'<b>A–T:</b> el NH₂ del C6 de la adenina dona un H al C=O de la timina; el NH del N3 de la timina dona un H al N1 de la adenina. Total: <b>2</b>.',
'<b>G–C:</b> el C=O de la guanina recibe un H del NH₂ de la citosina; el NH del N1 de la guanina dona al N3 de la citosina; el NH₂ del C2 de la guanina dona al C=O de la citosina. Total: <b>3</b>.',
'Si intentás aparear A con C o G con T, los dadores y aceptores no coinciden: por eso las parejas son fijas.'
]],
['fig', F.chainBonds, 'Esquema propio: enlaces covalentes dentro de cada cadena (fosfodiéster) y puentes de hidrógeno no covalentes entre cadenas. Las flechas muestran que las cadenas corren en sentidos opuestos.'],
['note', 'Contar puentes de H ayuda a recordar que el ADN rico en G+C es más estable, pero la estabilidad también depende mucho del <b>apilamiento</b> entre bases vecinas (que es mayor para los pares G–C), de la longitud de la molécula y de las condiciones (sales, pH).', 'estabilidad'],
['h', 'Antiparalelas: la información está en el orden de las bases'],
['img', 'p030-antiparalelas', 'Antiparalelas: a la izquierda la hélice con el surco menor (minor groove) y el surco mayor (major groove); a la derecha, las dos cadenas en fórmula, una de 5′ (arriba) a 3′ y la otra de 3′ a 5′, unidas por los pares C–G, G–C y T–A.', 30],
['quote', 'El orden lineal de las bases nitrogenadas conectadas al esqueleto azúcar-fosfato conforma el sistema de almacenamiento de información de la célula.', 30],
['steps', 'Ejercicio: escribí la cadena complementaria de 5′-ATGCCA-3′', [
'Apareá base por base: A→T, T→A, G→C, C→G, C→G, A→T. Queda TACGGT.',
'La complementaria es antiparalela: frente al extremo 5′ de la original está su extremo 3′. Entonces se lee 3′-TACGGT-5′.',
'Reescribila en el sentido convencional (de 5′ a 3′): <b>5′-TGGCAT-3′</b>.'
]],
['check', [
['¿Qué grupo libre tiene el extremo 5′ de una cadena? ¿Y el 3′?', 'Extremo 5′: un fosfato en el C5′. Extremo 3′: un OH en el C3′.'],
['¿Qué enlaces mantienen unida cada cadena y cuáles unen las dos cadenas?', 'Cada cadena: enlaces covalentes fosfodiéster (intracatenarios). Entre cadenas: puentes de hidrógeno entre bases (intercatenarios, no covalentes).'],
['¿Por qué el ADN rico en G+C necesita más temperatura para separarse?', 'Porque los pares G–C tienen 3 puentes de H (A–T tiene 2) y además se apilan mejor.'],
['Complementaria de 5′-GGATC-3′, escrita 5′→3′.', '5′-GATCC-3′.']
]]
]
},
{
n: 66, group: G, pages: '29 y 31', title: 'Dimensiones de la doble hélice y conformaciones A, B y Z',
lead: 'Los números de la hélice se relacionan entre sí con cuentas simples. Con ellos se puede calcular, por ejemplo, cuánto mide el ADN de una célula humana.',
blocks: [
['img', 'p029-vista-lateral', 'Vista lateral (side view): cadenas 1 y 2 antiparalelas; repetición de 34 Å con ≈ 10,4 bases por vuelta; bases casi perpendiculares al eje; separación de 3,4 Å entre bases; azúcares y fosfatos afuera; purinas y pirimidinas adentro.', 29],
['img', 'p029-vista-superior', 'Vista desde el extremo (end view): cada base gira ≈ 36° respecto de la anterior; azúcares y fosfatos afuera; ancho ≈ 20 Å.', 29],
['fig', F.helix, 'Esquema propio con las cotas de la forma B.'],
['h', 'Las cuentas que unen los números'],
['p', 'Llamemos <b>P</b> al paso de la hélice (lo que avanza en una vuelta), <b>n</b> al número de pares de bases por vuelta y <b>h</b> a la distancia entre pares consecutivos (la «subida» por par).'],
['math', String.raw`h = \frac{P}{n} = \frac{34\ \text{Å}}{10} = 3{,}4\ \text{Å por par}`, 'h = P / n = 34 Å / 10 = 3,4 Å por par'],
['math', String.raw`\text{giro por par} = \frac{360^\circ}{n} = \frac{360^\circ}{10} = 36^\circ`, 'giro por par = 360° / n = 360° / 10 = 36°'],
['note', 'Vas a ver números parecidos pero no idénticos: <b>10</b> pares por vuelta en el modelo original y en la tabla de la diapositiva 31; <b>≈ 10,4</b> en la figura de la diapositiva 29 (lo que se mide en el ADN B en solución); <b>10 a 10,5</b> en la diapositiva 23. Con 10,4 pares por vuelta el giro es 360°/10,4 ≈ 34,6°, que la figura redondea a ~36°. Lo mismo con el diámetro: <b>≈ 20 Å</b> en la figura y <b>20–24 Å</b> en la diapositiva 23. Son valores aproximados, medidos con métodos distintos; no se contradicen.', 'por qué 10, 10,4 o 10,5'],
['h', '¿Cuánto mide el ADN de una célula humana?'],
['p', 'Si estiramos toda la doble hélice, su largo es el número de pares de bases multiplicado por lo que mide cada par. Definimos: <b>L</b> = largo total; <b>N</b> = número de pares de bases; <b>h</b> = 3,4 Å = 0,34 nm = 3,4 × 10⁻¹⁰ m por par.'],
['math', String.raw`L = N \times h`, 'L = N × h'],
['steps', 'Cuenta renglón por renglón', [
'Supuesto: una <b>célula humana diploide</b> (no un óvulo ni un espermatozoide), con dos juegos de cromosomas. Un juego (genoma haploide) tiene ≈ 3,2 × 10⁹ pares de bases (dato de ampliación, no figura en la diapositiva).',
'Pares totales: ' + M(String.raw`N = 2 \times 3{,}2 \times 10^{9} = 6{,}4 \times 10^{9}\ \text{pb}`, 'N = 2 × 3,2 × 10⁹ = 6,4 × 10⁹ pb'),
'Distancia por par en metros: ' + M(String.raw`h = 3{,}4\ \text{Å} = 3{,}4 \times 10^{-10}\ \text{m}`, 'h = 3,4 Å = 3,4 × 10⁻¹⁰ m'),
'Reemplazo: ' + M(String.raw`L = 6{,}4 \times 10^{9} \times 3{,}4 \times 10^{-10}\ \text{m}`, 'L = 6,4 × 10⁹ × 3,4 × 10⁻¹⁰ m'),
'Multiplico números y potencias por separado: 6,4 × 3,4 ≈ 21,8 y 10⁹ × 10⁻¹⁰ = 10⁻¹. Entonces ' + M(String.raw`L \approx 21{,}8 \times 10^{-1}\ \text{m} \approx 2{,}2\ \text{m}`, 'L ≈ 21,8 × 10⁻¹ m ≈ 2,2 m'),
'Resultado: <b>unos 2 metros</b> de ADN, guardados en un núcleo de pocos micrómetros. (Se desprecia el ADN mitocondrial, que es muy chico.)'
]],
['h', 'Polimorfismo conformacional: formas A, B y Z'],
['quote', 'Según las condiciones físicas del medio, el DNA puede adoptar distintas conformaciones (A, B, Z). A: cuando el medio está enriquecido con cationes (Mg++, Ca++) o hay deshidratación (<65%). RNA y RNA-DNA en forma A. B: es la normal en estado fisiológico, se describe un surco mayor y otro menor, las bases están perpendiculares al plano de giro. Z: (zig-zag) ocurre in vitro ante ciertas secuencias con repeticiones de d(GC) y d(AC).', 31],
['table', ['Tipo de ADN', 'Giro de hélice', 'nm por vuelta', 'Plano entre bases', 'Nucleótidos por vuelta', 'Cuándo aparece'], [
['<b>A</b>', 'Dextrógiro', '3,2', 'Inclinado', '11', 'Con cationes (Mg²⁺, Ca²⁺) o deshidratación (<65 %). ARN y híbridos ARN-ADN'],
['<b>B</b>', 'Dextrógiro', '3,4', 'Perpendicular', '10', 'La normal en estado fisiológico; surco mayor y menor'],
['<b>Z</b>', '<b>Levógiro</b>', '4,5', 'Zig-zag', '12', 'In vitro, con repeticiones de d(GC) y d(AC)']
]],
['img', 'p031-abz', 'A-DNA, B-DNA y Z-DNA vistas de costado y desde arriba (dextrógiro, dextrógiro, levógiro; en Z, «zigzag backbones»), con la tabla y las condiciones de cada forma.', 31],
['steps', 'Qué tan «estirada» es cada forma: subida por nucleótido', [
'Forma A: ' + M(String.raw`\dfrac{3{,}2\ \text{nm}}{11} \approx 0{,}29\ \text{nm}`, '3,2 nm / 11 ≈ 0,29 nm') + ' por nucleótido: la más corta y ancha.',
'Forma B: ' + M(String.raw`\dfrac{3{,}4\ \text{nm}}{10} = 0{,}34\ \text{nm}`, '3,4 nm / 10 = 0,34 nm') + ' (los 3,4 Å de siempre).',
'Forma Z: ' + M(String.raw`\dfrac{4{,}5\ \text{nm}}{12} \approx 0{,}375\ \text{nm}`, '4,5 nm / 12 ≈ 0,375 nm') + ': la más alargada y delgada.'
]],
['why', 'Con poca agua o muchos cationes, los fosfatos quedan menos rodeados de agua y el esqueleto se compacta: la hélice se acorta, se ensancha y las bases se inclinan (forma A). En el ARN y en los híbridos ARN-ADN, el OH del C2′ de la ribosa impide la forma B y los empuja a la forma A. Las secuencias que alternan purina-pirimidina (como GCGCGC) pueden adoptar una conformación que gira al revés: la forma Z, cuyo esqueleto dibuja un zig-zag.', 'Por qué cambia la forma'],
['trap', 'La forma Z es <b>levógira</b> (gira a la izquierda), es de <b>doble</b> cadena y <b>no</b> es la más común (la más común es la B). Se forma in vitro con repeticiones de d(GC). Es exactamente la pregunta de opción múltiple de la diapositiva 63 (capítulo 78).'],
['check', [
['Si un ADN B tiene 10,5 pares por vuelta y 3,4 Å por par, ¿cuánto mide una vuelta?', '10,5 × 3,4 Å ≈ 35,7 Å (≈ 3,6 nm).'],
['¿Cuántos pares de bases hay en 34 nm de ADN B?', '34 nm = 340 Å; 340 Å / 3,4 Å = 100 pares.'],
['¿Qué forma adopta una doble hélice ARN-ADN?', 'La forma A.'],
['¿Cuál forma es levógira?', 'La forma Z.']
]]
]
},
{
n: 67, group: G, pages: '32–35', title: 'La historia detrás del modelo (1951–1962)',
lead: 'La doble hélice no la resolvió una sola persona. Esta es la cronología que se presentó en clase, con los artículos originales y algunos recuerdos del lugar donde se anunció.',
blocks: [
['h', 'Cronología de la clase'],
['table', ['Fecha', 'Hechos (tal como aparecen en la diapositiva)'], [
['1951', 'Rosalind Franklin llega al King’s College London · Comienza a trabajar con rayos X sobre ADN · Raymond Gosling toma la famosa Fotografía 51 · Watson y Crick intentan modelar ADN sin datos sólidos.'],
['1952', 'Franklin obtiene datos que sugieren estructura helicoidal · Wilkins muestra la Fotografía 51 a Watson sin permiso · Watson y Crick ajustan su modelo con esa imagen y datos de Chargaff.'],
['Feb 1953', 'Watson y Crick construyen el modelo de doble hélice · Crick anuncia en el pub The Eagle: «We have discovered the secret of life!».'],
['Mar 1953', 'Watson y Crick redactan su artículo para Nature · Wilkins y Franklin preparan sus propios papers · Se acuerda publicar los tres artículos juntos para evitar conflicto.'],
['25 Abr 1953', 'Nature publica tres artículos consecutivos: 1. Watson & Crick: modelo de doble hélice · 2. Wilkins et al.: datos de rayos X que lo respaldan · 3. Franklin & Gosling: datos clave, incluyendo la Fotografía 51.'],
['1962', 'Watson, Crick y Wilkins reciben el Premio Nobel · Franklin había fallecido en 1958 y no fue reconocida en vida.']
]],
['img', 'p032-cronologia', 'Recuadro original de la cronología (diapositiva 32).', 32],
['note', 'Según las fuentes históricas habituales, la Foto 51 se tomó en mayo de 1952 (no en 1951) y Wilkins se la mostró a Watson a fines de enero de 1953. La cronología de la clase agrupa los hechos de forma aproximada; para el examen usá la de la clase.', 'fechas'],
['p', '<b>Para profundizar fuera de clase</b> (la clase lo recomienda como «un buen material para ver fuera de clase si quieren profundizar en la parte histórica»): documental que cuenta la historia de los investigadores que descubrieron la estructura del DNA.'],
['links', [
['Documental (parte 1)', 'https://www.youtube.com/watch?v=1vm3od_UmFg', 'youtube.com'],
['Documental (desde el minuto 9:31)', 'https://www.youtube.com/watch?v=FMIsQlrtg_w&t=571s', 'youtube.com']
]],
['h', 'La edición de Nature del 25 de abril de 1953'],
['gallery', [['p033-nature-1', 'Nature, 25/04/1953: «Molecular structure of nucleic acids» (Watson y Crick)'], ['p033-nature-2', 'Páginas siguientes, con la imagen de difracción y la cita resaltada']], 33],
['quote', '“We have been stimulated by a knowledge of the general nature of the unpublished experimental results and ideas of Dr. M. H. F. Wilkins and Dr. R. E. Franklin and their co-workers at King’s College, London.” (Watson y Crick)', 33],
['p', 'En castellano: «Nos estimuló el conocimiento de la naturaleza general de los resultados experimentales y las ideas no publicadas del Dr. M. H. F. Wilkins y la Dra. R. E. Franklin y sus colaboradores en el King’s College de Londres». Es el reconocimiento, en el propio artículo, de que el modelo se apoyó en datos de King’s College.'],
['table', ['', 'Referencias de los tres artículos'], [
['1', 'FRANKLIN R, GOSLING RG. Molecular configuration in sodium thymonucleate. Nature. 1953 Apr 25;171(4356):740-1.'],
['2', 'WILKINS MH, STOKES AR, WILSON HR. Molecular structure of deoxypentose nucleic acids. Nature. 1953 Apr 25;171(4356):738-40.'],
['3', 'WATSON JD, CRICK FH. Molecular structure of nucleic acids; a structure for deoxyribose nucleic acid. Nature. 1953 Apr 25;171(4356):737-8.']
]],
['h', '«The paper mountain»'],
['img', 'p034-paper-mountain', 'Infografía de Nature (Van Noorden, Maher y Nuzzo, 29 de octubre de 2014): si se imprimiera la primera página de cada artículo indexado, la pila de papel sería altísima. El artículo de Watson y Crick sobre la estructura del ADN (1953) figura con 5.207 citas. La clase agrega: «Hoy la pila mediría más que el Everest (9500 m)».', 34],
['note', 'Es una imagen de contexto (no es contenido bioquímico). El Everest mide ≈ 8.849 m; la frase de la clase usa 9.500 m como cifra redondeada para decir que la pila ya superaría esa altura.', 'infografía'],
['h', 'The Eagle y el modelo original'],
['quote', '“We have discovered the secret of life” — Francis Crick.', 35],
['gallery', [['p035-eagle-cartel', 'Cartel del pub The Eagle, en Cambridge'], ['p035-eagle-pizarra', 'Pizarra de bienvenida del pub'], ['p035-eagle-placa', 'Placa conmemorativa en el pub: «We have discovered the secret of life»'], ['p035-modelo-placas', 'Placas del modelo exhibidas en un museo'], ['p035-modelo-original', 'Modelo original de Watson y Crick (1953)']], 35],
['key', [
'El modelo combinó datos de difracción (Franklin, Gosling, Wilkins), reglas de composición (Chargaff) y construcción de modelos (Watson y Crick).',
'Los tres artículos se publicaron juntos en Nature el 25 de abril de 1953.',
'Watson, Crick y Wilkins recibieron el Nobel en 1962; Franklin había muerto en 1958.'
]]
]
},
{
n: 68, group: G, pages: '36–37', title: 'Desnaturalización, efecto hipercrómico y temperatura de fusión (Tm)',
lead: 'Las dos cadenas del ADN se pueden separar y volver a juntar. Seguir ese proceso con luz ultravioleta permite medir cuán estable es un ADN.',
blocks: [
['img', 'p036-desnaturalizacion', 'Estado nativo (doble hélice) → con calor u OH⁻ (Heat, OH⁻) → estado desnaturalizado de cadena simple → renaturalización (requiere condiciones especiales) → estado renaturalizado.', 36],
['table', ['Lo que dice la clase', 'Por qué'], [
['El DNA se desnaturaliza por efecto de la temperatura', 'El calor agita las moléculas y aporta energía para romper los puentes de H y el apilamiento entre bases.'],
['El DNA se desnaturaliza por efecto del pH (extremos)', 'Con pH muy ácido o muy básico cambian las cargas de las bases: los dadores y aceptores de puentes de H dejan de coincidir y las cadenas se separan.'],
['La desnaturalización consiste en la ruptura de los puentes de H entre bases apareadas', 'Se separan las dos cadenas; cada una sigue entera.'],
['Cuando la temperatura o las condiciones de pH retornan a valores fisiológicos, las cadenas de DNA se aparean nuevamente y se obtiene la estructura de doble hélice', 'Las secuencias siguen siendo complementarias, así que pueden volver a encontrarse (renaturalización). El dibujo aclara que necesita condiciones especiales: por ejemplo, enfriar lentamente.'],
['En el proceso de desnaturalización los enlaces covalentes del DNA se mantienen inalterados', 'No se rompen los fosfodiéster ni los N-glicosídicos: la secuencia no cambia.'],
['Los DNA de distintos orígenes tienen una temperatura de desnaturalización (temperatura de fusión) característica que depende de la composición de bases', 'Más G+C → más puentes de H y mejor apilamiento → hace falta más temperatura.'],
['La transición de DNA de doble cadena a simple puede detectarse por el efecto hipercrómico, que se debe al incremento de absorción de luz UV por las bases del DNA', 'Ver abajo.']
]],
['trap', 'Desnaturalizar el ADN <b>no</b> es romperlo. Se separan las cadenas (se rompen interacciones no covalentes), pero cada cadena conserva su secuencia. Por eso puede renaturalizar.'],
['h', 'El efecto hipercrómico'],
['quote', 'La absorbancia a 260 nm de una solución de DNA aumenta cuando se desnaturaliza.', 37],
['img', 'p037-hipercromico', 'Absorbancia según la longitud de onda (220–300 nm): la curva de filamentos simples (ssDNA) queda por encima de la de doble hélice (dsDNA), con el máximo en 260 nm.', 37],
['why', 'En la doble hélice las bases están apiladas muy juntas y sus electrones interactúan entre sí; eso reduce cuánto absorbe cada una. Al separarse las cadenas, las bases quedan más libres y absorben más luz UV. «Hiper-crómico» significa justamente «más color» (más absorción).', 'Por qué el ADN separado absorbe más'],
['h', 'La temperatura de fusión (Tm)'],
['quote', 'Curvas de desnaturalización de diferentes DNA con distinto contenido de G+C. Tm (temp. de fusión o melting): 50% de la molécula se encuentra desapareada.', 37],
['img', 'p037-tm', 'Absorbancia relativa (1,0 a 1,4) en función de la temperatura (°C) para ADN con [G + C] = 35 %, 50 % y 66 %. La línea marca la absorbancia relativa 1,2 y la Tm correspondiente en el eje de temperatura.', 37],
['steps', 'Cómo obtener la Tm de una curva', [
'Abajo (temperatura baja), la absorbancia relativa vale 1,0: todo el ADN está apareado.',
'Arriba (temperatura alta), vale 1,4: todo está desapareado.',
'La mitad del camino es ' + M(String.raw`\dfrac{1{,}0 + 1{,}4}{2} = 1{,}2`, '(1,0 + 1,4) / 2 = 1,2') + '. En ese punto la mitad de la molécula está desapareada.',
'Desde 1,2 en el eje vertical, andá horizontal hasta la curva y bajá al eje de temperatura: ese valor es la <b>Tm</b>.',
'En el gráfico de la clase, la línea marcada corresponde a la curva de 66 % G+C, con su Tm algo por encima de 75 °C.'
]],
['fig', F.melt, 'Esquema propio con valores ilustrativos: tres ADN con distinto contenido de G+C. Abajo de cada curva el ADN está apareado (doble cadena); arriba, desapareado. A más G+C, la curva se corre a la derecha.'],
['trap', 'La Tm es una <b>temperatura</b> (se lee en el eje horizontal). El 1,2 es la absorbancia relativa a mitad de la transición, no la Tm.'],
['check', [
['¿Qué enlaces se rompen al desnaturalizar el ADN y cuáles no?', 'Se rompen los puentes de H entre bases (y se pierde el apilamiento). Los covalentes (fosfodiéster, N-glicosídicos) quedan intactos.'],
['Ordená por Tm creciente tres ADN con 35 %, 66 % y 50 % de G+C.', '35 % < 50 % < 66 %.'],
['¿Qué le pasa a la absorbancia a 260 nm cuando el ADN se desnaturaliza?', 'Aumenta (efecto hipercrómico).'],
['¿Qué significa Tm?', 'La temperatura a la que el 50 % de la molécula de ADN está desapareada.']
]]
]
}
];
