'use strict';
/* Ácidos nucleicos I · El ADN como material genético y la doble hélice. Capítulos 63 a 68. */
const { F } = require('./figs-acidos');
const { M } = require('./kit-an');
const G = 'Ácidos nucleicos I';

module.exports = [
{
n: 63, group: G, pages: '17–20', title: 'El ADN como material genético: Griffith, Avery y Hershey–Chase',
lead: 'Hoy parece obvio que los genes son ADN, pero durante años la candidata favorita fue la proteína. Tres experimentos, uno tras otro, cerraron la discusión.',
blocks: [
['h', 'El punto de partida'],
['p', 'A comienzos del siglo XX se sabía que las <b>proteínas</b> eran cadenas formadas por <b>20 aminoácidos diferentes</b>, y que los <b>ácidos nucleicos</b> eran polímeros de solo <b>cuatro nucleótidos diferentes</b>: tres comunes al ADN y al ARN (adenina, guanina y citosina) y un cuarto que es timina en el ADN o uracilo en el ARN.'],
['why', 'Con 20 «letras» distintas, una proteína puede escribir muchísimas más secuencias que un polímero de solo 4. Además, la idea del tetranucleótido (capítulo 59) sugería que el ADN era una repetición monótona. Las proteínas parecían las candidatas obvias para llevar la información y el ADN parecía demasiado simple. Faltaba entender que, aun con 4 letras, una secuencia muy larga puede guardar una cantidad enorme de información.', 'Por qué todos apostaban por las proteínas'],
['h', 'Experimento de Griffith (1928)'],
['p', 'Frederick Griffith trabajaba con neumococos, las bacterias que causan neumonía, y tenía dos cepas:'],
['cols', [
['Cepa R (rugosa)', 'Forma colonias de aspecto rugoso sobre un medio sólido y es <b>poco virulenta</b>: no mata al ratón.'],
['Cepa S (lisa)', 'Forma colonias lisas y brillantes porque tiene una cápsula de polisacárido. Es <b>virulenta</b>: provoca infecciones letales. Pero es sensible al calor.']
]],
['fig', F.griffith, 'Los cuatro ensayos de Griffith y su resultado.'],
['img', 'p018-griffith', 'Los mismos ensayos ilustrados: R → ratón vive; S → ratón muere; S muertas por calor → ratón vive; R vivas + S muertas por calor → ratón muere. ¿Qué pasó de las S muertas a las R?', 18],
['steps', 'El razonamiento', [
'Ni las R vivas ni las S muertas por calor matan al ratón por separado.',
'Juntas, sí lo matan, y del ratón muerto se recuperan bacterias <b>S vivas</b>. Las S muertas no revivieron: fueron las R las que se <b>transformaron</b> en S.',
'Esas nuevas S pueden infectar a otros ratones y pasan la característica a su descendencia: el cambio es <b>estable y heredable</b>. Cambió la información genética de las bacterias R.',
'Conclusión: en las S muertas hay un «<b>factor transformante</b>» (FT) que pasa a las R y las transforma. Griffith no sabía de qué molécula se trataba.'
]],
['trap', 'Griffith demostró que <b>existe</b> la transformación y un factor transformante, pero <b>no identificó</b> qué molécula era. Por eso es falso decir que «Griffith demostró que el ADN era el principio transformante».'],
['h', 'Experimento de Avery, MacLeod y McCarty (1944)'],
['p', 'Oswald Avery, Colin MacLeod y Maclyn McCarty buscaron identificar el factor transformante. Rompieron bacterias S muertas por calor con detergente y obtuvieron un <b>lisado</b>: un extracto sin células que contenía el FT, junto con todo lo demás de la bacteria (el polisacárido de la cápsula, las proteínas, el ARN y el ADN). Después trataron ese lisado con enzimas que destruyen un tipo de molécula cada una, y lo inyectaron a ratones junto con bacterias R vivas.'],
['table', ['Tratamiento del lisado', 'Resultado', 'Conclusión'], [
['Ninguno', 'El ratón muere', 'El FT está en el lisado'],
['Enzima SIII, que degrada la cápsula de polisacárido', 'El ratón muere', 'El FT no es el polisacárido'],
['Además, las enzimas proteolíticas tripsina y quimiotripsina', 'El ratón muere', 'El FT no es una proteína: debe ser un ácido nucleico'],
['Se extraen los ácidos nucleicos y se agrega ARNasa (degrada el ARN)', 'El ratón muere', 'El FT no es el ARN'],
['A los ácidos nucleicos se les agrega ADNasa (degrada el ADN)', '<b>El ratón vive</b>', '<b>FT = ADN</b>']
]],
['fig', F.avery, 'Cada enzima destruye un candidato. Solo cuando se destruye el ADN desaparece la transformación y el ratón sobrevive.'],
['img', 'p019-avery', 'Resultados de cada tratamiento: el ratón muere en todos los casos, salvo cuando se agrega ADNasa.', 19],
['why', 'Es un experimento por descarte. Si destruís una molécula y la transformación <b>sigue</b> ocurriendo (el ratón muere), esa molécula no era el FT. Si al destruirla la transformación <b>desaparece</b> (el ratón vive), esa molécula era imprescindible. Solo la ADNasa anula la transformación: <b>la transformación bacteriana requiere ADN</b>.', 'Por qué el ratón que vive es la clave'],
['h', 'Experimento de Hershey y Chase (1952)'],
['p', 'Alfred Hershey y Martha Chase usaron un <b>bacteriófago</b> (fago): un virus que infecta bacterias y que está formado solo por ADN envuelto en una cubierta de proteína. La pregunta era cuál de las dos partes entra a la bacteria y dirige la fabricación de fagos nuevos.'],
['steps', 'Cómo lo resolvieron', [
'Marcaron una tanda de fagos con fósforo radiactivo (<b>³²P</b>): el fósforo está en el ADN (en los fosfatos) y no en las proteínas.',
'Marcaron otra tanda con azufre radiactivo (<b>³⁵S</b>): el azufre está en las proteínas (en cisteína y metionina) y no en el ADN.',
'Dejaron que cada tanda infectara bacterias. Después las agitaron en una licuadora para desprender lo que había quedado afuera y centrifugaron: las bacterias, más pesadas, se van al fondo.',
'El ³²P (ADN) apareció <b>dentro</b> de las bacterias; el ³⁵S (proteína) quedó <b>afuera</b>. Y de esas bacterias salían fagos nuevos.',
'Conclusión: lo que entra y lleva las instrucciones es el ADN. <b>El ADN es el material genético de los fagos.</b>'
]],
['links', [['Video del experimento de Hershey y Chase', 'https://www.youtube.com/watch?v=ZtSfFqqhEIY', 'YouTube']]],
['table', ['Experimento', 'Año', 'Qué demostró'], [
['Griffith', '1928', 'Existe un factor transformante en las bacterias S muertas; la transformación es estable y heredable'],
['Avery, MacLeod y McCarty', '1944', 'El factor transformante es el ADN: la transformación bacteriana requiere ADN'],
['Hershey y Chase', '1952', 'El ADN, y no la proteína, es el material genético de los fagos']
]],
['check', [
['¿Qué controles le permitieron a Griffith hablar de transformación?', 'R vivas solas (el ratón vive) y S muertas solas (el ratón vive). Así se ve que la muerte con la mezcla no la causa ninguna de las dos por separado.'],
['En el experimento de Avery, ¿por qué la ARNasa sola no alcanza para decir que el FT es ADN?', 'Porque solo descarta al ARN. Para afirmar que es ADN hay que mostrar que al destruir el ADN la transformación desaparece.'],
['¿Quiénes demostraron que el ADN es el material genético de los fagos y cómo?', 'Hershey y Chase (1952), marcando el ADN con ³²P y la proteína con ³⁵S: solo el ADN entraba a la bacteria.']
]]
]
},
{
n: 64, group: G, pages: '21–24', title: 'Hacia la estructura: rayos X, Foto 51 y las reglas de Chargaff',
lead: 'Una vez que se supo que los genes son ADN, la pregunta fue qué forma tiene. Dos tipos de datos la respondieron: las imágenes de difracción de rayos X y la composición de bases.',
blocks: [
['h', 'Los protagonistas'],
['fig', F.timeline, 'Línea de tiempo: de la herencia (Mendel, Johannsen) a la molécula (Griffith, Avery, Hershey–Chase) y a su forma (Watson–Crick).'],
['table', ['Persona', 'Qué hizo'], [
['<b>Linus Pauling</b> (EE. UU.)', 'En 1939 desarrolló el concepto de hibridación de orbitales atómicos y luego propuso la α-hélice de las proteínas. Eso lo llevó a intentar resolver la estructura del ADN: propuso una <b>triple hélice</b>, que resultó incorrecta. Ganó el Nobel de Química (1954) y el de la Paz (1962).'],
['<b>James Watson</b> y <b>Francis Crick</b> (Universidad de Cambridge)', 'Construyeron el modelo de doble hélice en 1953 usando los datos de rayos X y las reglas de Chargaff. Nobel 1962.'],
['<b>Maurice Wilkins</b> (King’s College London)', 'Estudió el ADN con rayos X. Nobel 1962, compartido con Watson y Crick. Su frase: «El ADN es como el oro de Midas; todo el que lo toca, enloquece».'],
['<b>Rosalind Franklin</b> (King’s College London)', 'Con su estudiante Raymond Gosling obtuvo las imágenes de difracción de rayos X más claras del ADN, entre ellas la Foto 51. Murió en 1958, antes del Nobel, que no se otorga después de la muerte.']
]],
['gallery', [['p021-pauling', 'Linus Pauling'], ['p021-watson', 'James Watson'], ['p021-crick', 'Francis Crick'], ['p021-wilkins', 'Maurice Wilkins'], ['p021-franklin', 'Rosalind Franklin']], 21],
['h', 'Qué es la difracción de rayos X'],
['p', 'La difracción de rayos X es una técnica <b>no destructiva</b> que da información sobre la estructura de una molécula. Se coloca la muestra entre una fuente de rayos X y una placa fotográfica: los rayos que atraviesan la muestra se desvían y dejan una marca en la placa. Analizando los ángulos en que se desvían se deducen las distancias dentro de la molécula.'],
['p', 'Los rayos X tienen una longitud de onda parecida a la distancia entre átomos. Cuando atraviesan algo con estructuras que se repiten (como las vueltas de una hélice), las ondas desviadas se suman en algunas direcciones (<b>interferencia constructiva</b>: aparece una mancha) y se anulan en otras (<b>interferencia destructiva</b>: no aparece nada). La posición de las manchas indica qué distancias se repiten.'],
['img', 'p023-bragg', 'Los rayos X atraviesan el objeto y se desvían un ángulo 2θ hasta la película. Abajo, la ley de Bragg y las distancias del ADN con su ángulo.', 23],
['p', 'La relación entre el ángulo y la distancia que se repite es la <b>ley de Bragg</b>. Antes, los símbolos: <b>n</b> es un número entero (1, 2, 3…); <b>λ</b> es la longitud de onda de los rayos X; <b>d</b> es la distancia que se repite en la muestra; <b>θ</b> es el ángulo de desviación (en la película se mide 2θ, el doble).'],
['math', String.raw`n\,\lambda = 2\,d\,\operatorname{sen}\theta`, 'n·λ = 2·d·sen θ'],
['steps', 'Comprobación con los datos del ADN', [
'Despejando: ' + M(String.raw`d = \dfrac{n\,\lambda}{2\,\operatorname{sen}\theta}`, 'd = n·λ / (2·sen θ)') + '. Con n = 1 y los rayos X de cobre que se usan habitualmente, ' + M(String.raw`\lambda \approx 1{,}54\ \text{Å}`, 'λ ≈ 1,54 Å') + '.',
'Mancha a 2θ = 26,2°: θ = 13,1° y sen 13,1° ≈ 0,227. Entonces ' + M(String.raw`d = \dfrac{1{,}54\ \text{Å}}{2 \times 0{,}227} \approx 3{,}4\ \text{Å}`, 'd = 1,54 Å / (2 × 0,227) ≈ 3,4 Å') + ': la distancia entre bases apiladas.',
'Mancha a 2θ = 2,6°: θ = 1,3° y sen 1,3° ≈ 0,0227. ' + M(String.raw`d = \dfrac{1{,}54\ \text{Å}}{2 \times 0{,}0227} \approx 34\ \text{Å}`, 'd = 1,54 Å / (2 × 0,0227) ≈ 34 Å') + ': lo que mide una vuelta de la hélice.',
'Mancha a 2θ = 4,0°: θ = 2,0° y sen 2,0° ≈ 0,0349. ' + M(String.raw`d \approx 22\ \text{Å}`, 'd ≈ 22 Å') + '.',
'La relación es inversa: <b>distancias chicas dan ángulos grandes</b>. Por eso la distancia entre bases (3,4 Å) aparece lejos del centro de la foto, arriba y abajo.'
]],
['h', 'La Foto 51'],
['img', 'p022-foto51', 'Foto 51, obtenida por Rosalind Franklin y Raymond Gosling: patrón de difracción de rayos X de fibras de ADN.', 22],
['img', 'p023-paneles', 'Cuatro lecturas de la Foto 51: la cruz en X indica una hélice; cada vuelta mide 34 Å; la distancia entre nucleótidos es 3,4 Å; la cuarta línea que falta indica una doble hélice.', 23],
['img', 'p023-helice-anotada', 'Distancia entre pares de bases (3,4 Å), una vuelta = 34 Å (10 pares por vuelta) y diámetro de la hélice ≈ 20 Å.', 23],
['table', ['Lo que se ve en la foto', 'Lo que significa'], [
['Una cruz en forma de X', 'La molécula es una <b>hélice</b>'],
['Manchas que se repiten cada 34 Å', 'Cada <b>vuelta</b> de la hélice mide <b>34 Å</b>'],
['Manchas fuertes arriba y abajo (3,4 Å)', 'Las bases están apiladas cada <b>3,4 Å</b>'],
['34 Å ÷ 3,4 Å', 'Hay <b>10 a 10,5 nucleótidos por vuelta</b>'],
['Falta la cuarta línea de manchas', 'Hay <b>dos</b> cadenas: es una <b>doble hélice</b>'],
['Ancho del patrón', 'El diámetro de la hélice es de unos <b>20–24 Å</b>']
]],
['why', 'En el patrón de una hélice las manchas se ordenan en líneas horizontales. Con una sola hélice estarían todas. Con dos cadenas desplazadas una respecto de la otra, las ondas que vienen de cada cadena se anulan justo en la cuarta línea: esa interferencia destructiva delata que hay dos cadenas.', 'Por qué falta la cuarta línea'],
['h', 'Las reglas de Chargaff'],
['p', '<b>Erwin Chargaff</b> (1905–2002), químico austríaco, midió la composición de bases del ADN de muchos organismos y encontró cuatro regularidades:'],
['steps', 'Las cuatro reglas', [
'La composición de bases del ADN <b>varía de un organismo a otro</b>.',
'El ADN de una misma especie, aislado de <b>distintos tejidos</b>, tiene la <b>misma</b> composición de bases.',
'Esa composición <b>no cambia</b> con la edad, el estado nutricional ni el ambiente.',
'La cantidad de A es igual a la de T, y la de G es igual a la de C. Por eso el ADN se mide en <b>pares de bases</b> (pb).'
]],
['math', String.raw`[\mathrm{A}] = [\mathrm{T}] \qquad [\mathrm{G}] = [\mathrm{C}] \qquad [\mathrm{A}+\mathrm{G}] = [\mathrm{T}+\mathrm{C}]`, '[A] = [T] · [G] = [C] · [A + G] = [T + C]'],
['p', 'La última igualdad, <b>[purinas] = [pirimidinas]</b>, se conoce como ley de Chargaff (1949).'],
['why', 'Las reglas 1 a 3 dicen que la composición es una «firma» de la especie: distinta entre especies e igual en todas las células de un mismo organismo, que es justo lo esperable para el material genético. La regla 4 sugiere que A siempre va con T y G con C: si las bases forman pares fijos, cada A tiene una T enfrente y por eso se cuentan igual.', 'Qué significa cada regla'],
['steps', 'Ejercicio: un ADN de doble cadena tiene 30 % de A. ¿Cuánto tiene de cada base?', [
'Como [A] = [T]: T = 30 %.',
'A + T = 60 %, así que G + C = 100 % − 60 % = 40 %.',
'Como [G] = [C]: G = C = 20 %.',
'Comprobación: purinas (A + G) = 30 + 20 = 50 %; pirimidinas (T + C) = 30 + 20 = 50 %.'
]],
['trap', 'Las igualdades de Chargaff valen para el <b>ADN de doble cadena</b>. En una cadena sola, o en el ARN, que suele tener una sola cadena, no tienen por qué cumplirse.'],
['check', [
['¿Qué distancia de la hélice corresponde a la mancha más alejada del centro de la Foto 51?', 'La más chica: 3,4 Å, la separación entre bases. Distancias chicas dan ángulos grandes.'],
['¿Qué detalle de la Foto 51 indica que hay dos cadenas?', 'La ausencia de la cuarta línea de manchas.'],
['Un ADN de doble cadena tiene 22 % de G. Calculá A, T y C.', 'C = 22 %; G + C = 44 %; A + T = 56 %; A = T = 28 %.'],
['¿Por qué tiene sentido que el ADN de distintos tejidos tenga la misma composición?', 'Porque todas las células de un organismo tienen la misma información genética.']
]]
]
},
{
n: 65, group: G, pages: '25–28 y 30', title: 'El modelo de Watson y Crick: cómo está armada la doble hélice',
lead: 'Con los datos de rayos X y las reglas de Chargaff, Watson y Crick propusieron en 1953 la doble hélice. Cada característica del modelo tiene una razón química.',
blocks: [
['img', 'p025-modelo', 'El modelo de Watson y Crick en forma de escalera: la cadena izquierda va de 5′ (arriba) a 3′ y la derecha de 3′ a 5′; los pares T–A, G–C, C–G y A–T forman los peldaños; fosfatos (P) y azúcares quedan afuera.', 25],
['table', ['Característica', 'Qué significa', 'Por qué es así'], [
['Doble hélice', 'Dos cadenas enrolladas una alrededor de la otra', 'Lo muestran la cruz y la cuarta línea faltante de la Foto 51'],
['Dextrógira', 'Gira hacia la derecha, como un tornillo común', 'Es la forma estable en condiciones fisiológicas (forma B, capítulo 66)'],
['Eje de simetría', 'Las dos cadenas giran alrededor de un mismo eje imaginario', 'Las dos cadenas tienen la misma forma'],
['Fosfatos afuera', 'El esqueleto azúcar-fosfato forma la parte externa', 'Los fosfatos tienen carga y son hidrofílicos: les conviene estar en contacto con el agua'],
['Bases adentro', 'Las bases planas se apilan en el centro', 'Son hidrofóbicas: quedan protegidas del agua y se apilan entre sí'],
['Pares purina–pirimidina', 'Cada peldaño tiene una base de dos anillos y una de uno', 'Así todos los pares miden lo mismo y el diámetro es constante; explica [purinas] = [pirimidinas]'],
['Complementarias: A–T y C–G', 'Frente a A siempre hay T; frente a G siempre hay C', 'Son las parejas cuyos puentes de hidrógeno encajan; explica [A]=[T] y [G]=[C]'],
['Antiparalelas', 'Una cadena va 5′→3′ y la otra 3′→5′', 'Es la única orientación en la que los pares encajan']
]],
['fig', F.pairWidth, 'Una purina con una pirimidina ocupa siempre el mismo ancho. Dos purinas no entran; dos pirimidinas quedan cortas.'],
['why', 'Una purina con otra purina sería demasiado ancha para el espacio entre los dos esqueletos; dos pirimidinas, demasiado angostas. Con una de cada tipo, todos los peldaños miden lo mismo y la hélice mantiene un diámetro constante (≈ 20 Å). Así el modelo explicaba a la vez la Foto 51 y las reglas de Chargaff.', 'Por qué siempre purina con pirimidina'],
['h', 'El esqueleto: enlaces fosfodiéster y extremos 5′ y 3′'],
['p', 'Dentro de cada cadena, los nucleótidos se unen por <b>enlaces fosfodiéster</b>: un fosfato une el <b>C3′</b> de un azúcar con el <b>C5′</b> del azúcar siguiente. Como el fosfato queda unido a dos azúcares por dos enlaces éster, se llama fosfo<b>di</b>éster.'],
['img', 'p026-fosfodiester', 'dCMP (violeta) unido a dAMP (rojo) por una unión fosfodiéster: el fosfato une el C3′ del primer azúcar con el C5′ del segundo. Abajo queda libre el OH del C3′ del dAMP.', 26],
['p', 'Gracias a esto la cadena tiene dos puntas distintas. En un extremo queda un <b>fosfato libre en el C5′</b>: es el <b>extremo 5′</b>. En el otro queda un <b>OH libre en el C3′</b>: es el <b>extremo 3′</b>. Por convención, las secuencias se escriben siempre de 5′ a 3′.'],
['img', 'p027-cadena', 'El enlace fosfodiéster en la cadena: esqueleto de fosfato y desoxirribosa con las bases (adenina, timina, guanina, citosina) y la ampliación de un fosfato que une dos azúcares (C3′ de uno y C5′ del otro).', 27],
['fig', F.chainBonds, 'Enlaces covalentes dentro de cada cadena (fosfodiéster) y puentes de hidrógeno no covalentes entre cadenas. Las flechas muestran que las cadenas corren en sentidos opuestos.'],
['h', 'Puentes de hidrógeno entre bases'],
['p', 'Las dos cadenas se mantienen unidas por <b>puentes de hidrógeno</b> entre las bases enfrentadas: son las uniones <b>intercatenarias</b>. Un puente de hidrógeno se forma entre un hidrógeno unido a un nitrógeno (el dador) y un oxígeno o nitrógeno con pares de electrones libres (el aceptor).'],
['img', 'p028-puentes-h', 'Par adenina–timina, con 2 puentes de hidrógeno, y par guanina–citosina, con 3 (zonas celestes).', 28],
['steps', 'Cómo se forman los pares', [
'<b>A–T:</b> el NH₂ del C6 de la adenina dona un H al C=O de la timina, y el NH del N3 de la timina dona un H al N1 de la adenina. Total: <b>2 puentes</b>.',
'<b>G–C:</b> el C=O de la guanina recibe un H del NH₂ de la citosina; el NH del N1 de la guanina dona al N3 de la citosina; el NH₂ del C2 de la guanina dona al C=O de la citosina. Total: <b>3 puentes</b>.',
'Si intentás aparear A con C o G con T, los dadores y aceptores no coinciden. Por eso las parejas son siempre las mismas.'
]],
['p', 'El ADN rico en pares G–C es <b>más estable</b> y necesita más temperatura para separar sus cadenas (capítulo 68). Además de los puentes de hidrógeno, aporta mucho el <b>apilamiento</b> entre bases vecinas, que también es más fuerte en los pares G–C.'],
['h', 'Cadenas antiparalelas: la información está en el orden de las bases'],
['img', 'p030-antiparalelas', 'Izquierda: la hélice con el surco menor (minor groove) y el surco mayor (major groove). Derecha: las dos cadenas en fórmula, una de 5′ a 3′ y la otra de 3′ a 5′, unidas por pares de bases.', 30],
['p', 'El esqueleto azúcar-fosfato es igual en toda la molécula. Lo que cambia es el <b>orden lineal de las bases</b>, y ese orden es el <b>sistema de almacenamiento de información</b> de la célula. Como las cadenas son complementarias, cada una contiene la información para reconstruir la otra.'],
['steps', 'Ejercicio: cadena complementaria de 5′-ATGCCA-3′', [
'Apareá base por base: A→T, T→A, G→C, C→G, C→G, A→T. Queda TACGGT.',
'La complementaria es antiparalela: frente al extremo 5′ de la original está su extremo 3′. Entonces se lee 3′-TACGGT-5′.',
'Escrita en el sentido convencional (de 5′ a 3′): <b>5′-TGGCAT-3′</b>.'
]],
['check', [
['¿Qué grupo libre tiene el extremo 5′ de una cadena? ¿Y el 3′?', 'Extremo 5′: un fosfato en el C5′. Extremo 3′: un OH en el C3′.'],
['¿Qué une a los nucleótidos de una misma cadena y qué une a las dos cadenas?', 'Dentro de cada cadena, enlaces covalentes fosfodiéster. Entre cadenas, puentes de hidrógeno entre bases (no covalentes).'],
['¿Por qué el ADN rico en G+C necesita más temperatura para separarse?', 'Porque los pares G–C tienen 3 puentes de hidrógeno (A–T tiene 2) y además se apilan mejor.'],
['Cadena complementaria de 5′-GGATC-3′, escrita de 5′ a 3′.', '5′-GATCC-3′.']
]]
]
},
{
n: 66, group: G, pages: '29 y 31', title: 'Medidas de la doble hélice y formas A, B y Z',
lead: 'Las medidas de la hélice se relacionan entre sí con cuentas simples. Con ellas se puede calcular, por ejemplo, cuánto mide todo el ADN de una célula humana.',
blocks: [
['img', 'p029-vista-lateral', 'Vista lateral: las dos cadenas antiparalelas; una vuelta cada 34 Å con unas 10,4 bases por vuelta; bases casi perpendiculares al eje y separadas 3,4 Å; azúcares y fosfatos afuera, bases adentro.', 29],
['img', 'p029-vista-superior', 'Vista desde arriba: cada base está girada unos 36° respecto de la anterior; azúcares y fosfatos afuera; ancho de unos 20 Å.', 29],
['fig', F.helix, 'Medidas de la forma B del ADN.'],
['h', 'Las cuentas que unen las medidas'],
['p', 'Llamemos <b>P</b> a lo que avanza la hélice en una vuelta, <b>n</b> al número de pares de bases por vuelta y <b>h</b> a la distancia entre un par y el siguiente.'],
['math', String.raw`h = \frac{P}{n} = \frac{34\ \text{Å}}{10} = 3{,}4\ \text{Å por par}`, 'h = P / n = 34 Å / 10 = 3,4 Å por par'],
['math', String.raw`\text{giro por par} = \frac{360^\circ}{n} = \frac{360^\circ}{10} = 36^\circ`, 'giro por par = 360° / n = 360° / 10 = 36°'],
['p', 'Vas a ver valores parecidos pero no idénticos: <b>10</b> pares por vuelta en el modelo original, <b>≈ 10,4–10,5</b> en el ADN medido en solución. Con 10,4 pares el giro es 360°/10,4 ≈ 34,6°, que suele redondearse a ~36°. Lo mismo con el diámetro: <b>≈ 20 Å</b>, o <b>20–24 Å</b> según el método. Son aproximaciones de la misma molécula, no datos que se contradicen.'],
['h', '¿Cuánto mide el ADN de una célula humana?'],
['p', 'Si estiramos toda la doble hélice, su largo es la cantidad de pares de bases por lo que mide cada par. Símbolos: <b>L</b> = largo total; <b>N</b> = número de pares de bases; <b>h</b> = 3,4 Å = 0,34 nm = 3,4 × 10⁻¹⁰ m por par.'],
['math', String.raw`L = N \times h`, 'L = N × h'],
['steps', 'Cuenta paso a paso', [
'Tomamos una <b>célula humana diploide</b> (cualquier célula del cuerpo salvo óvulos y espermatozoides), con dos juegos de cromosomas. Cada juego tiene ≈ 3,2 × 10⁹ pares de bases.',
'Pares totales: ' + M(String.raw`N = 2 \times 3{,}2 \times 10^{9} = 6{,}4 \times 10^{9}\ \text{pb}`, 'N = 2 × 3,2 × 10⁹ = 6,4 × 10⁹ pb'),
'Distancia por par en metros: ' + M(String.raw`h = 3{,}4\ \text{Å} = 3{,}4 \times 10^{-10}\ \text{m}`, 'h = 3,4 Å = 3,4 × 10⁻¹⁰ m'),
'Reemplazo: ' + M(String.raw`L = 6{,}4 \times 10^{9} \times 3{,}4 \times 10^{-10}\ \text{m}`, 'L = 6,4 × 10⁹ × 3,4 × 10⁻¹⁰ m'),
'Multiplico números y potencias por separado: 6,4 × 3,4 ≈ 21,8 y 10⁹ × 10⁻¹⁰ = 10⁻¹. Entonces ' + M(String.raw`L \approx 21{,}8 \times 10^{-1}\ \text{m} \approx 2{,}2\ \text{m}`, 'L ≈ 21,8 × 10⁻¹ m ≈ 2,2 m'),
'Resultado: <b>unos 2 metros</b> de ADN, guardados en un núcleo de pocos micrómetros. (El ADN mitocondrial es tan chico que no cambia la cuenta.)'
]],
['h', 'Las formas A, B y Z'],
['p', 'El ADN no tiene una única forma: según las condiciones del medio puede adoptar distintas conformaciones. Las tres más conocidas son A, B y Z.'],
['table', ['Forma', 'Giro', 'Paso (nm por vuelta)', 'Bases respecto del eje', 'Nucleótidos por vuelta', 'Cuándo aparece'], [
['<b>A</b>', 'Dextrógira', '3,2', 'Inclinadas', '11', 'Con muchos cationes (Mg²⁺, Ca²⁺) o con deshidratación (menos de 65 % de humedad). Es la forma del ARN de doble cadena y de los híbridos ARN-ADN'],
['<b>B</b>', 'Dextrógira', '3,4', 'Perpendiculares', '10', 'La forma normal en condiciones fisiológicas; tiene un surco mayor y uno menor'],
['<b>Z</b>', '<b>Levógira</b>', '4,5', 'En zig-zag', '12', 'In vitro, en secuencias con repeticiones de d(GC) y d(AC)']
]],
['img', 'p031-abz', 'ADN A, B y Z vistos de costado y desde arriba (dextrógiro, dextrógiro, levógiro). En la forma Z el esqueleto dibuja un zig-zag.', 31],
['steps', 'Qué tan estirada es cada forma: avance por nucleótido', [
'Forma A: ' + M(String.raw`\dfrac{3{,}2\ \text{nm}}{11} \approx 0{,}29\ \text{nm}`, '3,2 nm / 11 ≈ 0,29 nm') + ' por nucleótido: la más corta y ancha.',
'Forma B: ' + M(String.raw`\dfrac{3{,}4\ \text{nm}}{10} = 0{,}34\ \text{nm}`, '3,4 nm / 10 = 0,34 nm') + ' (los 3,4 Å de siempre).',
'Forma Z: ' + M(String.raw`\dfrac{4{,}5\ \text{nm}}{12} \approx 0{,}375\ \text{nm}`, '4,5 nm / 12 ≈ 0,375 nm') + ': la más alargada y delgada.'
]],
['why', 'Con poca agua o muchos cationes, los fosfatos quedan menos rodeados de agua y el esqueleto se compacta: la hélice se acorta, se ensancha y las bases se inclinan (forma A). En el ARN y en los híbridos ARN-ADN, el OH del C2′ de la ribosa impide la forma B y los lleva a la forma A. Las secuencias que alternan purina y pirimidina, como GCGCGC, pueden girar al revés: la forma Z, cuyo esqueleto hace un zig-zag.', 'Por qué cambia la forma'],
['trap', 'La forma Z es <b>levógira</b> (gira a la izquierda), es de <b>doble</b> cadena y <b>no</b> es la más común: la más común es la B. Aparece in vitro con repeticiones de d(GC).'],
['check', [
['Si un ADN B tiene 10,5 pares por vuelta y 3,4 Å por par, ¿cuánto mide una vuelta?', '10,5 × 3,4 Å ≈ 35,7 Å (≈ 3,6 nm).'],
['¿Cuántos pares de bases hay en 34 nm de ADN B?', '34 nm = 340 Å; 340 Å / 3,4 Å = 100 pares.'],
['¿Qué forma adopta una doble hélice ARN-ADN?', 'La forma A.'],
['¿Cuál forma es levógira y en qué condiciones aparece?', 'La forma Z, in vitro con repeticiones de d(GC) o d(AC).']
]]
]
},
{
n: 67, group: G, pages: '32–35', title: 'La historia del descubrimiento (1951–1962)',
lead: 'La doble hélice no la resolvió una sola persona: combinó los datos de rayos X de un laboratorio con la construcción de modelos de otro.',
blocks: [
['table', ['Fecha', 'Qué pasó'], [
['1951', 'Rosalind Franklin llega al King’s College de Londres y empieza a estudiar el ADN con rayos X. Watson y Crick, en Cambridge, intentan modelar el ADN todavía sin datos sólidos.'],
['1952', 'Franklin obtiene datos que indican una estructura helicoidal. Su estudiante Raymond Gosling toma la Fotografía 51 (mayo de 1952).'],
['Enero–febrero de 1953', 'Wilkins le muestra la Foto 51 a Watson sin permiso de Franklin. Watson y Crick ajustan su modelo con esa imagen y con las reglas de Chargaff, y construyen la doble hélice. Crick lo anuncia en el pub The Eagle de Cambridge: «We have discovered the secret of life!» («¡Descubrimos el secreto de la vida!»).'],
['Marzo de 1953', 'Watson y Crick escriben su artículo; Wilkins y Franklin preparan los suyos. Se acuerda publicar los tres juntos.'],
['25 de abril de 1953', 'La revista Nature publica tres artículos seguidos: el modelo de doble hélice (Watson y Crick), los datos de rayos X que lo respaldan (Wilkins y colaboradores) y los datos clave de Franklin y Gosling, incluida la Foto 51.'],
['1962', 'Watson, Crick y Wilkins reciben el Premio Nobel de Fisiología o Medicina. Franklin había muerto en 1958 y no recibió reconocimiento en vida.']
]],
['gallery', [['p033-nature-1', 'Nature, 25 de abril de 1953: el artículo de Watson y Crick'], ['p033-nature-2', 'Las páginas siguientes, con una imagen de difracción']], 33],
['p', 'En su artículo, Watson y Crick reconocen: «Nos estimuló el conocimiento de los resultados experimentales y las ideas no publicados del Dr. M. H. F. Wilkins y la Dra. R. E. Franklin y sus colaboradores en el King’s College de Londres». Es decir, su modelo se apoyó en datos de ese laboratorio.'],
['table', ['', 'Los tres artículos de Nature (25 de abril de 1953)'], [
['1', 'Watson JD, Crick FH. Molecular structure of nucleic acids; a structure for deoxyribose nucleic acid. Nature 171:737-738.'],
['2', 'Wilkins MH, Stokes AR, Wilson HR. Molecular structure of deoxypentose nucleic acids. Nature 171:738-740.'],
['3', 'Franklin R, Gosling RG. Molecular configuration in sodium thymonucleate. Nature 171:740-741.']
]],
['p', 'El artículo de Watson y Crick ocupa apenas una página y es uno de los más citados de la historia de la ciencia.'],
['gallery', [['p035-eagle-cartel', 'El pub The Eagle, en Cambridge'], ['p035-eagle-placa', 'Placa en el pub: «We have discovered the secret of life»'], ['p035-modelo-original', 'Modelo original de Watson y Crick (1953)'], ['p035-modelo-placas', 'Piezas del modelo en exhibición']], 35],
['links', [
['Documental sobre el descubrimiento de la estructura del ADN', 'https://www.youtube.com/watch?v=1vm3od_UmFg', 'YouTube'],
['Otro documental (desde el minuto 9:31)', 'https://www.youtube.com/watch?v=FMIsQlrtg_w&t=571s', 'YouTube']
]],
['key', [
'El modelo combinó datos de difracción (Franklin, Gosling, Wilkins), reglas de composición (Chargaff) y construcción de modelos (Watson y Crick).',
'Los tres artículos se publicaron juntos en Nature el 25 de abril de 1953.',
'Watson, Crick y Wilkins recibieron el Nobel en 1962; Franklin había muerto en 1958.'
]]
]
},
{
n: 68, group: G, pages: '36–37', title: 'Desnaturalización, efecto hipercrómico y temperatura de fusión (Tm)',
lead: 'Las dos cadenas del ADN se pueden separar y volver a juntar. Seguir ese proceso con luz ultravioleta permite medir qué tan estable es un ADN.',
blocks: [
['img', 'p036-desnaturalizacion', 'Estado nativo (doble hélice) → con calor o con OH⁻ → cadenas simples separadas → renaturalización (necesita condiciones especiales) → doble hélice otra vez.', 36],
['h', 'Qué es desnaturalizar el ADN'],
['p', '<b>Desnaturalizar</b> el ADN es separar sus dos cadenas rompiendo los <b>puentes de hidrógeno</b> entre las bases apareadas. Los enlaces covalentes (fosfodiéster y N-glicosídicos) no se rompen: cada cadena sigue entera y con la misma secuencia.'],
['table', ['Qué la provoca', 'Por qué'], [
['Temperatura alta', 'El calor agita las moléculas y aporta la energía para romper los puentes de hidrógeno y el apilamiento entre bases.'],
['pH extremo (muy ácido o muy básico)', 'Cambia las cargas de las bases: dadores y aceptores de puentes de hidrógeno dejan de coincidir y las cadenas se separan.']
]],
['p', 'Si la temperatura o el pH vuelven a valores fisiológicos, las cadenas pueden volver a aparearse y formar otra vez la doble hélice: es la <b>renaturalización</b>. Ocurre porque las secuencias siguen siendo complementarias, aunque necesita condiciones adecuadas (por ejemplo, enfriar lentamente para que cada cadena encuentre a su pareja exacta).'],
['trap', 'Desnaturalizar el ADN <b>no</b> es romperlo. Se separan las cadenas, pero cada una conserva su secuencia. Por eso puede renaturalizar.'],
['h', 'El efecto hipercrómico'],
['p', 'La absorbancia a 260 nm de una solución de ADN <b>aumenta</b> cuando se desnaturaliza. A ese aumento se lo llama <b>efecto hipercrómico</b> («hiper-crómico» = más color, es decir, más absorción), y permite seguir la separación de las cadenas con un espectrofotómetro.'],
['img', 'p037-hipercromico', 'Absorbancia según la longitud de onda (220–300 nm): la curva del ADN de cadena simple (ssDNA) queda por encima de la del ADN de doble hélice (dsDNA), con el máximo en 260 nm.', 37],
['why', 'En la doble hélice las bases están apiladas muy juntas y sus electrones interactúan entre sí, lo que reduce cuánta luz absorbe cada una. Al separarse las cadenas, las bases quedan más libres y absorben más luz ultravioleta.', 'Por qué el ADN separado absorbe más'],
['h', 'La temperatura de fusión (Tm)'],
['p', 'Cada ADN tiene una temperatura de desnaturalización característica, la <b>temperatura de fusión o Tm</b> (de «melting»): la temperatura a la que el <b>50 % de la molécula está desapareada</b>. Depende de la composición de bases: cuanto más <b>G+C</b>, más alta es la Tm.'],
['img', 'p037-tm', 'Absorbancia relativa (1,0 a 1,4) en función de la temperatura para ADN con 35 %, 50 % y 66 % de G+C. La línea marca la absorbancia relativa 1,2 y la Tm de una de las curvas.', 37],
['steps', 'Cómo leer la Tm en una curva', [
'Abajo (temperatura baja), la absorbancia relativa vale 1,0: todo el ADN está apareado.',
'Arriba (temperatura alta), vale 1,4: todo está desapareado.',
'La mitad del camino es ' + M(String.raw`\dfrac{1{,}0 + 1{,}4}{2} = 1{,}2`, '(1,0 + 1,4) / 2 = 1,2') + '. En ese punto la mitad de la molécula está desapareada.',
'Desde 1,2 en el eje vertical, andá en horizontal hasta la curva y bajá al eje de temperatura: ese valor es la <b>Tm</b>.',
'Las curvas con más G+C están más a la derecha: necesitan más temperatura.'
]],
['fig', F.melt, 'Tres ADN con distinto contenido de G+C (valores ilustrativos). Abajo de cada curva el ADN está apareado; arriba, desapareado. Más G+C corre la curva hacia la derecha.'],
['trap', 'La Tm es una <b>temperatura</b>: se lee en el eje horizontal. El 1,2 es la absorbancia relativa a mitad de la transición, no la Tm.'],
['check', [
['¿Qué enlaces se rompen al desnaturalizar el ADN y cuáles no?', 'Se rompen los puentes de hidrógeno entre bases (y se pierde el apilamiento). Los covalentes (fosfodiéster, N-glicosídicos) quedan intactos.'],
['Ordená por Tm creciente tres ADN con 35 %, 66 % y 50 % de G+C.', '35 % < 50 % < 66 %.'],
['¿Qué le pasa a la absorbancia a 260 nm cuando el ADN se desnaturaliza?', 'Aumenta (efecto hipercrómico).'],
['¿Qué es la Tm?', 'La temperatura a la que el 50 % de la molécula de ADN está desapareada.']
]]
]
}
];
