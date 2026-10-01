'use strict';
/* Glúcidos I · capítulos 29 a 41 del resumen, reescritos para entender el porqué de cada cosa. */
const { F } = require('./figs-glucidos');
const G = 'Glúcidos I';

module.exports = [
{
n: 29, group: G, title: 'Qué son los glúcidos y para qué sirven',
lead: 'Antes de memorizar nombres conviene tener una idea clara: los glúcidos son moléculas con muchos grupos OH y un grupo carbonilo, y la célula los usa para tres cosas muy distintas: sacar energía, construir estructuras y llevar información.',
blocks: [
['h', 'La definición, traducida'],
['p', 'La definición formal dice que los glúcidos (o carbohidratos) son <b>polihidroxialdehídos o polihidroxicetonas</b>, o sustancias que al hidrolizarse liberan esas moléculas. Desarmemos la palabra: <i>poli-hidroxi</i> significa «muchos OH»; <i>aldehído</i> o <i>cetona</i> indica que además tienen un grupo carbonilo (C=O). Es decir, un glúcido simple es una cadena de carbonos donde casi todos llevan un OH y uno lleva un C=O.'],
['p', 'Muchos cumplen aproximadamente la fórmula (CH₂O)ₙ, que es de donde sale el nombre «hidratos de carbono»: parece carbono con agua. No es una regla estricta; hay derivados que además tienen nitrógeno, fósforo o azufre, como la glucosamina o la glucosa-6-fosfato.'],
['eq', '(CH₂O)ₙ · glucosa: C₆H₁₂O₆ = 6 × (CH₂O)'],
['h', 'Tres funciones muy distintas'],
['p', 'La idea más importante de toda la unidad es que los glúcidos <b>no son solamente «azúcares que dan energía»</b>. La misma glucosa puede terminar quemándose en la mitocondria, formando parte de la madera de un árbol o siendo una etiqueta en la superficie de un glóbulo rojo. Lo que cambia es cómo se unen y con qué.'],
['cols', [
['Energía', 'La glucosa es el combustible central de casi todas las células. Para guardarla, las plantas arman <b>almidón</b> y los animales <b>glucógeno</b>: largas cadenas de glucosa listas para desarmarse cuando hace falta.'],
['Estructura', '<b>Celulosa</b> (paredes de plantas), <b>quitina</b> (caparazones y hongos), <b>peptidoglucano</b> (pared bacteriana) y los GAG de la matriz extracelular forman materiales resistentes o geles hidratados.'],
['Información', 'Cadenas cortas de azúcares unidas a proteínas y lípidos funcionan como <b>etiquetas</b>: indican a dónde va una proteína, de qué tipo es una célula o qué grupo sanguíneo tenés.']
]],
['ex', 'La fotosíntesis convierte la energía de la luz en energía química guardada en glúcidos. Cuando comés pan, el almidón de la harina se desarma en glucosa, la glucosa viaja por la sangre y tus células la usan como combustible o la guardan como glucógeno en el hígado y el músculo.'],
['h', 'Cómo se clasifican por tamaño'],
['p', 'La clasificación más básica cuenta cuántas unidades de azúcar tiene la molécula. Cada unidad es un <b>monosacárido</b>; cuando varias se unen, el enlace que las une se llama <b>enlace glucosídico</b> (lo vemos en el capítulo 33).'],
['fig', F.classes, 'Monosacárido: una unidad. Oligosacárido: unas pocas (el caso más común es el disacárido, dos). Polisacárido: cientos o miles, en cadena lineal o ramificada.'],
['why', 'Dos polisacáridos pueden estar hechos exactamente del mismo monosacárido y servir para cosas opuestas. El almidón y la celulosa son ambos solo glucosa, pero uno es alimento y el otro es fibra que no podemos digerir. La diferencia está en <b>cómo se orienta el enlace</b> entre glucosas. Por eso, para entender un glúcido hay que mirar cuatro cosas: qué monosacáridos tiene, cómo están unidos (α o β, y entre qué carbonos), la configuración de cada carbono y cuánto se ramifica.', 'Por qué no alcanza con saber «de qué está hecho»'],
['check', [
['¿Por qué se llaman «hidratos de carbono»?', 'Porque muchos cumplen (CH₂O)ₙ, que parece carbono más agua (H₂O). Es un nombre histórico: no hay agua «pegada» al carbono.'],
['Nombrá un glúcido de cada función.', 'Energía: glucógeno o almidón. Estructura: celulosa o quitina. Información: los oligosacáridos de una glicoproteína, como los que definen el grupo sanguíneo.'],
['¿Qué cuatro preguntas hay que hacerse ante un glúcido?', 'Qué monosacáridos tiene, cómo están unidos (α/β y posiciones), qué configuración tiene cada carbono y si está ramificado.']
]]
]
},
{
n: 30, group: G, title: 'Monosacáridos: cómo se nombran y por qué importa la forma 3D',
lead: 'El nombre de un monosacárido cuenta dos cosas: qué tipo de carbonilo tiene y cuántos carbonos. Su forma en el espacio cuenta otra, igual de importante: cómo lo van a reconocer las enzimas.',
blocks: [
['h', 'Aldosas y cetosas: dónde está el C=O'],
['p', 'Todos los monosacáridos comunes son cadenas sin ramificar con un solo grupo carbonilo. Si el C=O está en la punta de la cadena, es un <b>aldehído</b> y el azúcar es una <b>aldosa</b>. Si está en el medio, es una <b>cetona</b> y el azúcar es una <b>cetosa</b>. Los más chicos posibles tienen tres carbonos: el gliceraldehído (aldosa) y la dihidroxiacetona (cetosa).'],
['p', 'El número de carbonos se dice con un sufijo: triosa (3), tetrosa (4), pentosa (5), hexosa (6), heptosa (7). Juntando las dos informaciones se arma el nombre completo.'],
['table', ['Azúcar', 'Tipo', 'Por qué'], [
['Glucosa', 'Aldohexosa', 'C=O en el C1 (aldehído) y 6 carbonos'],
['Fructosa', 'Cetohexosa', 'C=O en el C2 (cetona) y 6 carbonos'],
['Ribosa', 'Aldopentosa', 'Aldehído y 5 carbonos; está en el ARN'],
['2-desoxirribosa', 'Aldopentosa', 'Como la ribosa pero sin el OH del C2; está en el ADN']
]],
['h', 'Carbono quiral: la «mano» de la molécula'],
['p', 'Un carbono es <b>quiral</b> cuando tiene cuatro sustituyentes distintos. En ese caso los cuatro grupos se pueden ordenar en el espacio de dos maneras que son imágenes en el espejo una de la otra y no se pueden superponer, igual que tu mano derecha y tu mano izquierda.'],
['p', 'Casi todos los monosacáridos tienen al menos un carbono quiral. La excepción es la dihidroxiacetona: su carbono central tiene el C=O y los otros dos carbonos son iguales (CH₂OH), así que ninguno tiene cuatro grupos distintos.'],
['eq', 'n carbonos quirales → como máximo 2ⁿ estereoisómeros'],
['steps', 'Cuántos estereoisómeros tiene una aldohexosa', [
'Dibujá la cadena abierta: C1 es el aldehído (CHO) y C6 es un CH₂OH. Ninguno de los dos es quiral.',
'C2, C3, C4 y C5 tienen cada uno H, OH y dos «pedazos» de cadena distintos: son 4 carbonos quirales.',
'2⁴ = 16 estereoisómeros posibles: 8 de la serie D y 8 de la serie L. La glucosa es solo uno de ellos.'
]],
['why', 'Las enzimas y los receptores son proteínas con bolsillos de forma muy precisa. Un azúcar con un OH apuntando al otro lado ya no encaja igual, como un guante derecho que no entra en la mano izquierda. Por eso dos azúcares con la misma fórmula (C₆H₁₂O₆) pueden tener destinos metabólicos completamente distintos.', 'Por qué a la biología le importa la forma 3D'],
['h', 'Proyección de Fischer y series D y L'],
['p', 'Para dibujar la forma 3D en un papel se usa la <b>proyección de Fischer</b>: la cadena va vertical con el C=O arriba, las líneas horizontales salen hacia vos y las verticales se van hacia atrás. Cada cruce es un carbono.'],
['p', 'Para decidir si un azúcar es D o L se mira <b>el carbono quiral más alejado del carbonilo</b> (en la glucosa, el C5). Si su OH está a la derecha, es <b>D</b>; si está a la izquierda, es <b>L</b>. El nombre viene del gliceraldehído, que tiene un solo carbono quiral y sirve de referencia.'],
['fig', F.glyceraldehyde, 'D- y L-gliceraldehído son imágenes en el espejo (enantiómeros). La regla de D/L sale de compararse con ellos.'],
['trap', 'D y L <b>no</b> indican hacia dónde gira la luz polarizada (eso es + o −). Solo dicen cómo está el OH del carbono de referencia. Además, casi todos los azúcares de los seres vivos son de la serie D; no hay una explicación definitiva de por qué, pero una vez que las enzimas se especializaron en D, esa preferencia se mantuvo.'],
['h', 'Enantiómeros, diastereoisómeros y epímeros'],
['p', 'Estos tres nombres ordenan las distintas formas de «ser parecidos». Los <b>enantiómeros</b> son imágenes en el espejo completas (D-glucosa y L-glucosa). Los <b>diastereoisómeros</b> son estereoisómeros que <i>no</i> son imagen especular. Dentro de ellos, los <b>epímeros</b> son el caso más cercano: difieren en un solo carbono quiral.'],
['fig', F.epimers, 'Manosa y galactosa son epímeros de la glucosa: cambian un único OH de lado. Ese pequeño cambio alcanza para que las enzimas las traten como moléculas diferentes.'],
['eq', 'glucosa ↔ manosa: epímeros en C2 · glucosa ↔ galactosa: epímeros en C4'],
['ex', 'La galactosa de la leche no puede entrar directamente a la glucólisis: primero una enzima (epimerasa) tiene que dar vuelta el OH del C4 para convertirla en glucosa. Un solo OH de diferencia obliga a tener una enzima especial.'],
['check', [
['¿La fructosa es aldosa o cetosa? ¿Por qué?', 'Cetosa: su C=O está en el C2, en el medio de la cadena, así que es una cetona.'],
['¿Qué carbono se mira para decir que la glucosa es D?', 'El C5, que es el carbono quiral más alejado del aldehído. Su OH está a la derecha en Fischer, por eso es D.'],
['Manosa y galactosa, ¿son epímeros entre sí?', 'No. Difieren en dos carbonos (C2 y C4), así que son diastereoisómeros pero no epímeros. Cada una es epímero de la glucosa.'],
['¿Por qué la dihidroxiacetona no tiene isómeros D y L?', 'Porque no tiene ningún carbono con cuatro sustituyentes distintos: no tiene carbono quiral.']
]]
]
},
{
n: 31, group: G, title: 'Del azúcar lineal al anillo: anómeros, mutarrotación y forma silla',
lead: 'En el agua, la glucosa casi nunca está como cadena recta: se cierra en un anillo. Entender ese cierre explica tres cosas que aparecen todo el tiempo: los anómeros α y β, la mutarrotación y el poder reductor.',
blocks: [
['h', 'Por qué el azúcar se cierra solo'],
['p', 'Un grupo carbonilo (C=O) puede reaccionar con un grupo OH: el oxígeno del OH ataca al carbono del C=O. Cuando el OH y el C=O están en moléculas distintas se forma un hemiacetal; en un azúcar están en la <b>misma</b> molécula, así que la reacción cierra un anillo.'],
['p', 'En la glucosa, el OH del <b>C5</b> ataca al aldehído del <b>C1</b>. Queda un anillo de seis átomos (cinco carbonos y un oxígeno). Como la glucosa es una aldosa, lo que se forma es un <b>hemiacetal</b>; en una cetosa, como la fructosa, se forma un <b>hemicetal</b>.'],
['fig', F.cyclization, 'El OH del C5 se acerca al C1 y lo ataca. Al cerrarse el anillo, el C1 pasa a tener cuatro sustituyentes diferentes: es un centro quiral nuevo, el carbono anomérico.'],
['why', 'Los anillos de cinco y seis átomos casi no tienen tensión: los ángulos de enlace quedan cómodos. Además, en una cadena de seis carbonos el OH del C5 queda justo a la distancia adecuada del C1. Por eso, en solución, más del 99 % de la glucosa está como anillo.', 'Por qué el anillo es tan favorable'],
['h', 'Piranosas y furanosas'],
['p', 'Los anillos se nombran por parecido con dos compuestos simples: si tienen seis átomos se llaman <b>piranosas</b> (como el pirano) y si tienen cinco, <b>furanosas</b> (como el furano). La glucosa forma sobre todo glucopiranosa. La fructosa puede formar las dos; cuando está dentro de la sacarosa, está como fructofuranosa.'],
['h', 'El carbono anomérico y los anómeros α y β'],
['p', 'El carbono que era el C=O (C1 en las aldosas, C2 en las cetosas) se llama <b>carbono anomérico</b>. Al cerrarse el anillo, el OH nuevo de ese carbono puede quedar para un lado o para el otro, porque el ataque puede venir por cualquiera de las dos caras del C=O. Así salen dos formas: los <b>anómeros α y β</b>.'],
['fig', F.anomers, 'En un azúcar D dibujado en Haworth: α tiene el OH anomérico del lado contrario al CH₂OH (abajo); β lo tiene del mismo lado (arriba).'],
['steps', 'Cómo pasar de Fischer a Haworth sin memorizar dibujos', [
'Lo que en Fischer está a la <b>derecha</b>, en Haworth va <b>abajo</b>.',
'Lo que en Fischer está a la <b>izquierda</b>, en Haworth va <b>arriba</b>.',
'En los azúcares D, el CH₂OH (C6) va <b>arriba</b>.',
'El OH anomérico decide: abajo es α, arriba es β.',
'Prueba con la glucosa: en Fischer el OH de C2 está a la derecha → abajo; el de C3 a la izquierda → arriba; el de C4 a la derecha → abajo. Es exactamente el dibujo de arriba.'
]],
['trap', 'α y β <b>no</b> son enantiómeros: solo difieren en el carbono anomérico, el resto de la molécula es igual. Son un tipo particular de diastereoisómeros que se llaman anómeros.'],
['h', 'Mutarrotación: el anillo se abre y se cierra'],
['p', 'El anillo no queda trabado para siempre. Mientras el carbono anomérico sea un hemiacetal «libre» (no unido a otro azúcar), el anillo se abre por un instante, vuelve a la forma lineal y se cierra otra vez. Al cerrarse puede quedar α o β. Por eso, si disolvés α-glucosa pura, con el tiempo aparece β, hasta llegar a un equilibrio. Ese cambio se llama <b>mutarrotación</b> porque se detecta como un cambio en la rotación de la luz polarizada.'],
['fig', F.mutarotation, 'Equilibrio de la D-glucosa en agua: predomina β. La forma abierta casi no existe, pero es indispensable porque es el paso intermedio entre α y β.'],
['why', 'Porque en β todos los grupos grandes del anillo quedan «hacia afuera», lejos unos de otros (lo vemos en la forma silla, abajo). Menos choques entre grupos significa una forma más estable, y la forma más estable es la que más abunda en el equilibrio.', '¿Por qué predomina β y no α?'],
['h', 'La forma real: silla'],
['p', 'Haworth dibuja el anillo plano porque es cómodo para ver qué está arriba y qué abajo, pero en realidad un anillo de seis átomos se pliega en forma de <b>silla</b>. En una silla, cada sustituyente puede apuntar casi vertical (<b>axial</b>) o hacia afuera, siguiendo el borde del anillo (<b>ecuatorial</b>).'],
['p', 'Los grupos grandes prefieren la posición ecuatorial porque en axial chocan con otros grupos axiales del mismo lado del anillo (interacciones 1,3-diaxiales). En la <b>β-D-glucopiranosa todos los grupos voluminosos quedan ecuatoriales</b>: es la hexosa más cómoda posible. En manosa o galactosa algún OH queda axial y eso suma choques.'],
['ex', 'Que la glucosa sea el azúcar más común de la naturaleza no parece casualidad: su forma β es la más estable de todas las aldohexosas, porque es la única en la que ningún grupo grande queda axial.'],
['check', [
['¿Qué grupos reaccionan para cerrar la glucosa?', 'El OH del C5 con el aldehído del C1. Se forma un hemiacetal y un anillo de seis átomos (piranosa).'],
['¿Qué carbono es el anomérico en la fructosa?', 'El C2, porque ahí estaba su grupo cetona.'],
['Si mezclás α-glucosa en agua, ¿qué pasa?', 'Mutarrota: el anillo se abre y cierra, aparece β y se llega al equilibrio con ≈64 % β y ≈36 % α.'],
['¿Por qué β-glucosa es tan estable?', 'Porque en la forma silla todos sus grupos grandes quedan en posición ecuatorial y no chocan entre sí.']
]]
]
},
{
n: 32, group: G, title: 'Qué reacciones hacen los monosacáridos y qué derivados forman',
lead: 'La química de los azúcares gira alrededor de dos cosas: el grupo carbonilo que aparece cuando el anillo se abre y los muchos OH que se pueden modificar. De ahí salen el poder reductor, la glicación y una familia enorme de derivados.',
blocks: [
['h', 'Azúcares reductores: qué significa y cómo se reconocen'],
['p', 'Un azúcar es <b>reductor</b> cuando puede cederle electrones a otra sustancia, que se reduce. Para eso necesita un grupo carbonilo libre, que se oxida. Pero en el anillo no hay C=O… salvo que el anillo se abra. Y el anillo solo se puede abrir si el <b>carbono anomérico está libre</b>, como hemiacetal. Esa es toda la clave.'],
['fig', F.reducing, 'La pregunta que decide todo: ¿el carbono anomérico está libre? Si está atado en un enlace glucosídico, el anillo no se abre y no hay carbonilo para oxidar.'],
['p', 'En el laboratorio se usa el <b>reactivo de Fehling</b>, que tiene Cu²⁺ (azul). Si el azúcar es reductor, se oxida y el cobre se reduce a Cu⁺, que precipita como óxido cuproso <b>rojo ladrillo</b>. Si no es reductor, la solución sigue azul.'],
['ex', 'En clase: glucosa, lactosa y maltosa dan Fehling positivo (rojo ladrillo); la sacarosa da negativo (sigue azul). Glucosa, lactosa y maltosa tienen un carbono anomérico libre; en la sacarosa, los dos carbonos anoméricos están usados en el enlace entre glucosa y fructosa.'],
['trap', 'La fructosa es una cetosa, pero también da Fehling positivo. En el medio alcalino del ensayo se reacomoda (tautomeriza) y forma un aldehído, que sí se oxida. No digas «solo las aldosas son reductoras».'],
['h', 'Glicosilación y glicación: parecen iguales pero no'],
['p', 'El grupo carbonilo de un azúcar abierto también puede reaccionar con los grupos amino (–NH₂) de las proteínas. Cuando eso pasa <b>sin enzima</b>, por simple química, se llama <b>glicación</b>. Cuando una enzima pega un azúcar en un lugar preciso y con un propósito, se llama <b>glicosilación</b>.'],
['cols', [
['Glicosilación', 'Enzimática, controlada y programada. Pone azúcares en sitios específicos de proteínas y lípidos para darles función (etiquetas, plegamiento, reconocimiento).'],
['Glicación', 'No enzimática, depende de cuánta glucosa haya y de cuánto tiempo. Modifica proteínas al azar y puede dañarlas.']
]],
['why', 'La glicación es lenta y depende de la concentración de glucosa. La hemoglobina vive dentro del glóbulo rojo unos 120 días, así que va acumulando glucosa pegada de forma proporcional a la glucemia de esos meses. Por eso la <b>HbA1c</b> (hemoglobina glicada) sirve para estimar la glucemia promedio de los últimos 2–3 meses, y no solo la de la mañana del análisis.', 'Por qué la HbA1c mide la glucemia «de varios meses»'],
['p', 'Si la glucosa está alta mucho tiempo, la glicación sigue avanzando y forma <b>productos finales de glicación avanzada (AGE)</b>, que pueden unir proteínas entre sí y alterar su función. Esto se relaciona con el daño de tejidos en la diabetes mal controlada. La <b>reacción de Maillard</b> es la misma química pero en la cocina: el dorado y el aroma del pan tostado o de la carne a la plancha son azúcares reductores reaccionando con aminoácidos.'],
['h', 'Derivados: pequeños cambios, funciones nuevas'],
['p', 'Cambiar un solo grupo de un monosacárido crea moléculas con propiedades muy distintas. Conviene aprenderlos preguntando <b>qué se cambió y en qué carbono</b>.'],
['fig', F.derivatives, 'Los derivados más importantes de la glucosa, según qué grupo se modifica.'],
['table', ['Derivado', 'Qué cambia', 'Ejemplos y para qué sirve'], [
['Aminoazúcares', 'Un OH (en general del C2) se reemplaza por NH₂, muchas veces acetilado (N-acetil)', 'Glucosamina, GlcNAc (quitina, peptidoglucano, glicoproteínas), GalNAc (mucinas, grupo sanguíneo A)'],
['Desoxiazúcares', 'Un OH se reemplaza por H', '2-desoxirribosa (ADN); L-fucosa (glicanos de superficie)'],
['Ácidos aldónicos', 'Se oxida el C1 (aldehído → COOH)', 'Ácido glucónico'],
['Ácidos urónicos', 'Se oxida el C6 (alcohol → COOH)', 'Ácido glucurónico: parte de los GAG; aporta carga negativa'],
['Ácidos aldáricos', 'Se oxidan los dos extremos', 'Ácido glucárico'],
['Lactonas', 'El COOH de un ácido de azúcar forma un éster con un OH de la misma molécula', 'Gluconolactona'],
['Ésteres fosfato', 'Se une un fosfato a un OH', 'Glucosa-6-P, fructosa-1-P, ribosa-5-P'],
['Azúcares nucleotídicos', 'El azúcar se une a un nucleótido', 'UDP-glucosa, UDP-GlcNAc, CMP-ácido siálico'],
['Ácidos siálicos', 'Azúcares de 9 carbonos', 'Neu5Ac, en las puntas de glicoproteínas y glicolípidos']
]],
['why', 'Cuando la glucosa entra a la célula, lo primero que pasa es que se le pega un fosfato (glucosa-6-fosfato). El fosfato tiene carga negativa, y las moléculas cargadas no atraviesan la membrana: la glucosa queda «atrapada» adentro. Además, el fosfato la deja activada, lista para las reacciones siguientes.', 'Por qué la célula fosforila los azúcares'],
['p', 'Los <b>azúcares nucleotídicos</b> cumplen un papel parecido en la construcción de glicanos: son la versión «cargada de energía» de un azúcar, listo para ser transferido. Cuando una enzima arma un oligosacárido, no usa glucosa suelta sino UDP-glucosa; el nucleótido sale y el azúcar queda pegado.'],
['check', [
['¿Por qué la maltosa es reductora y la sacarosa no?', 'La maltosa tiene un carbono anomérico libre que puede abrir el anillo. En la sacarosa los dos carbonos anoméricos forman el enlace, así que no hay hemiacetal libre.'],
['¿Cuál es la diferencia entre glicación y glicosilación?', 'La glicosilación es enzimática y controlada; la glicación es química, sin enzima, y depende de la glucosa disponible.'],
['¿Qué se oxida para formar ácido glucurónico?', 'El C6, el alcohol primario del extremo.'],
['¿Qué tienen en común GlcNAc y GalNAc?', 'Son aminoazúcares N-acetilados: un OH fue reemplazado por un grupo amino que lleva un acetilo.']
]]
]
},
{
n: 33, group: G, title: 'Enlace glucosídico y disacáridos',
lead: 'Para que dos azúcares se unan, uno de ellos pone su carbono anomérico. Esa sola regla explica cómo se nombran los disacáridos y por qué unos son reductores y otros no.',
blocks: [
['h', 'Cómo se forma el enlace glucosídico'],
['p', 'El <b>enlace glucosídico</b> se forma cuando el OH del carbono anomérico de un azúcar reacciona con un OH de otra molécula (en general, otro azúcar) y se libera agua. El hemiacetal pasa a ser un <b>acetal</b>. Y un acetal ya no se abre solo: la configuración α o β de ese carbono queda <b>fija</b>.'],
['p', 'Para nombrar un enlace hay que decir tres cosas: qué azúcares participan, si el carbono anomérico que puso el primero era α o β, y qué carbonos quedaron unidos.'],
['eq', 'Glc α(1→4) Glc = el C1 (en α) de una glucosa unido al C4 de la siguiente'],
['h', 'Extremo reductor y extremo no reductor'],
['p', 'Si en una cadena queda algún carbono anomérico sin usar, ese extremo todavía puede abrirse y reducir: es el <b>extremo reductor</b>. Los extremos cuyo carbono anomérico ya está atado en un enlace son <b>extremos no reductores</b>. Una cadena lineal tiene un extremo de cada tipo.'],
['steps', 'Cómo decidir si un disacárido es reductor', [
'Ubicá los carbonos anoméricos de cada azúcar: el C1 si es aldosa, el C2 si es cetosa.',
'Mirá el enlace: ¿qué carbonos están unidos?',
'Si al menos un carbono anomérico <b>no</b> participa del enlace, el disacárido es reductor (y además mutarrota).',
'Si los dos carbonos anoméricos participan del enlace (unión «cabeza con cabeza»), no queda ninguno libre: es no reductor.'
]],
['fig', F.disaccharides, 'El punto amarillo marca el carbono anomérico libre (extremo reductor). En sacarosa y trehalosa el enlace usa los dos carbonos anoméricos, por eso no hay punto.'],
['h', 'Los cuatro disacáridos que hay que conocer'],
['table', ['Disacárido', 'Composición y enlace', '¿Reductor?', 'Dónde aparece'], [
['Maltosa', 'Glucosa + glucosa, α(1→4)', 'Sí: el C1 de la segunda glucosa queda libre', 'Producto de digerir almidón'],
['Lactosa', 'Galactosa + glucosa, β(1→4)', 'Sí: el C1 de la glucosa queda libre', 'Azúcar de la leche'],
['Sacarosa', 'Glucosa + fructosa, α1↔β2', 'No: se unen los dos anoméricos (C1 de Glc y C2 de Fru)', 'Azúcar de mesa'],
['Trehalosa', 'Glucosa + glucosa, α1↔1α', 'No: se unen los dos C1', 'Reserva en insectos; protege frente a deshidratación']
]],
['trap', 'Fijate que maltosa y trehalosa están hechas de lo mismo (dos glucosas) y sin embargo una es reductora y la otra no. Lo que decide no es la composición sino <b>qué carbonos se unieron</b>.'],
['ex', 'La sacarosa no mutarrota y no reduce el Fehling, pero si la hervís con ácido se rompe el enlace y quedan glucosa y fructosa libres, que sí reducen. Por eso a veces se usa la hidrólisis previa para demostrar que la sacarosa estaba formada por azúcares reductores.'],
['h', 'Aplicación: intolerancia a la lactosa'],
['p', 'Para absorber la lactosa hay que romperla en galactosa y glucosa. Eso lo hace la <b>lactasa</b>, una enzima del intestino delgado que corta específicamente el enlace β(1→4). Muchas personas pierden la lactasa con la edad.'],
['steps', 'Por qué aparecen los síntomas', [
'Sin lactasa, la lactosa no se rompe y no se absorbe en el intestino delgado.',
'Llega intacta al intestino grueso. Como es una molécula disuelta, atrae agua por ósmosis: diarrea osmótica.',
'Las bacterias del colon la fermentan y producen gases: distensión y dolor.'
]],
['check', [
['¿Qué queda fijo cuando se forma un enlace glucosídico?', 'La configuración (α o β) del carbono anomérico que participa, porque el acetal ya no se abre.'],
['¿La lactosa mutarrota? ¿Por qué?', 'Sí: el carbono anomérico de la glucosa queda libre y puede abrirse y cerrarse.'],
['Un disacárido Glc α(1→6) Glc, ¿es reductor?', 'Sí: el C1 de la segunda glucosa no participa del enlace (el enlace usa su C6), así que queda libre.'],
['¿Por qué la intolerancia a la lactosa da diarrea?', 'La lactosa sin digerir llega al colon, arrastra agua por ósmosis y además se fermenta.']
]]
]
},
{
n: 34, group: G, title: 'Polisacáridos: cómo guardar glucosa y cómo construir fibras',
lead: 'Con la misma glucosa se pueden armar dos tipos de polímero muy distintos: unos para guardarla y sacarla rápido, otros para construir estructuras durísimas. La diferencia está en el tipo de enlace y en las ramificaciones.',
blocks: [
['h', 'Homopolisacáridos y heteropolisacáridos'],
['p', 'Un <b>homopolisacárido</b> tiene un solo tipo de monosacárido (almidón, glucógeno, celulosa: todos solo glucosa). Un <b>heteropolisacárido</b> tiene dos o más tipos (los GAG, el peptidoglucano).'],
['p', 'A diferencia de las proteínas o el ADN, los polisacáridos <b>no se copian de un molde</b>. Las enzimas los van armando agregando unidades y ramas, así que no todas las moléculas tienen el mismo largo: hay una distribución de tamaños.'],
['why', 'Si la célula guardara toda su reserva de glucosa como moléculas sueltas, cada glucosa contaría como una partícula disuelta. La concentración interna sería altísima y entraría agua por ósmosis hasta hinchar o romper la célula. Un polímero de miles de glucosas cuenta como <b>una sola partícula</b>: guarda la misma energía casi sin efecto osmótico.', 'Por qué guardar glucosa como polímero y no suelta'],
['h', 'Almidón: la reserva de las plantas'],
['p', 'El almidón es una mezcla de dos polímeros de glucosa. La <b>amilosa</b> es casi lineal, con enlaces α(1→4). Por la geometría de ese enlace, la cadena se enrolla en una <b>hélice</b>. El yodo se mete dentro de esa hélice y da el color azul que se usa para detectar almidón.'],
['p', 'La <b>amilopectina</b> tiene las mismas cadenas α(1→4) pero además <b>ramificaciones α(1→6)</b> cada 24 a 30 glucosas, aproximadamente.'],
['h', 'Glucógeno: la reserva de los animales'],
['p', 'El glucógeno se parece a la amilopectina pero está mucho más ramificado: tiene una rama α(1→6) cada <b>8 a 12</b> glucosas. Se guarda sobre todo en el hígado y en el músculo.'],
['fig', F.branching, 'Cada rama agrega un extremo no reductor (amarillo). El glucógeno tiene un solo extremo reductor pero cientos de extremos no reductores.'],
['steps', 'Por qué tanta ramificación sirve para movilizar glucosa rápido', [
'Las enzimas que sacan glucosa del glucógeno trabajan desde las puntas: los <b>extremos no reductores</b>.',
'Cada ramificación α(1→6) crea una punta nueva.',
'Con muchas puntas, muchas enzimas pueden trabajar al mismo tiempo, cada una en su extremo.',
'Resultado: cuando hace falta energía (ayuno, ejercicio), la glucosa se libera muchísimo más rápido que desde una cadena lineal del mismo tamaño. Además, la molécula queda compacta y muy hidratada.'
]],
['ex', 'El hígado y el músculo usan su glucógeno de forma distinta. El hígado lo desarma para mandar glucosa a la sangre y mantener la glucemia (por ejemplo, entre comidas). El músculo lo usa para sí mismo, como combustible durante el ejercicio.'],
['h', 'Celulosa: misma glucosa, otra geometría'],
['p', 'La celulosa también es solo glucosa, pero sus enlaces son <b>β(1→4)</b>. Ese cambio de α a β hace que cada glucosa quede girada respecto de la anterior y la cadena salga <b>recta y extendida</b>, en vez de enrollarse.'],
['p', 'Muchas cadenas rectas se acomodan una al lado de la otra y forman una enorme cantidad de <b>puentes de hidrógeno</b> entre ellas. El resultado son fibras muy resistentes, insolubles en agua: la pared de las células vegetales.'],
['fig', F.alphaBeta, 'α(1→4) curva la cadena y la enrolla; β(1→4) la deja recta para que muchas cadenas se peguen entre sí.'],
['why', 'Las enzimas que digieren el almidón (amilasas) reconocen específicamente el enlace α. El enlace β tiene otra forma y no encaja en su sitio activo. Los humanos no tenemos enzimas para β(1→4) entre glucosas; las vacas sí digieren pasto porque bacterias de su rumen fabrican celulasas.', 'Por qué no podemos digerir la celulosa aunque es glucosa'],
['h', 'Quitina, quitosano y peptidoglucano'],
['p', 'La <b>quitina</b> es como la celulosa pero hecha de <b>N-acetilglucosamina</b> (GlcNAc) unida por β(1→4): en el C2, en lugar de un OH, tiene un grupo amino con acetilo. Forma el exoesqueleto de insectos y crustáceos y la pared de los hongos. Si se le sacan los acetilos se obtiene el <b>quitosano</b>, que tiene muchos grupos amino libres y otras propiedades.'],
['p', 'El <b>peptidoglucano</b> forma la pared de las bacterias. Son cadenas que alternan GlcNAc y ácido N-acetilmurámico, unidas por β(1→4), y esas cadenas se conectan entre sí con péptidos cortos. Queda una malla que resiste la presión del agua que intenta entrar a la bacteria.'],
['ex', 'Dos defensas atacan justo esta malla: la <b>lisozima</b> (en lágrimas y saliva) corta el enlace entre los dos azúcares, y la <b>penicilina</b> impide que se formen los puentes de péptidos. Sin una malla completa, la bacteria se hincha con agua y revienta.'],
['check', [
['¿Qué diferencia estructural hay entre amilopectina y glucógeno?', 'Los dos tienen α(1→4) con ramas α(1→6), pero el glucógeno se ramifica mucho más seguido (cada 8–12 vs. cada 24–30 glucosas).'],
['¿Por qué el almidón se tiñe con yodo y la celulosa no?', 'La amilosa forma una hélice donde se aloja el yodo; la celulosa tiene cadenas rectas, sin hélice.'],
['¿Qué ventaja tiene que el glucógeno tenga tantos extremos no reductores?', 'Muchas enzimas pueden sacar glucosa a la vez, así que se moviliza rápido.'],
['¿En qué se parecen celulosa y quitina?', 'Las dos son cadenas rectas con enlaces β(1→4) que forman fibras resistentes; la quitina usa GlcNAc en lugar de glucosa.']
]]
]
},
{
n: 35, group: G, title: 'Glicosaminoglicanos (GAG): cadenas cargadas que atrapan agua',
lead: 'Los GAG son los responsables de que el cartílago amortigüe golpes y de que las articulaciones se deslicen. Todo eso sale de una sola propiedad: tienen muchísima carga negativa.',
blocks: [
['h', 'Qué es un GAG'],
['p', 'Un <b>glicosaminoglicano</b> es un heteropolisacárido lineal formado por un <b>disacárido que se repite</b> muchas veces. En casi todos, uno de los dos azúcares es un aminoazúcar acetilado (GlcNAc o GalNAc) y el otro es un ácido urónico (como el glucurónico). Muchos llevan además grupos <b>sulfato</b>.'],
['fig', F.gag, 'Cada unidad aporta cargas negativas: carboxilatos (COO⁻) de los ácidos urónicos y sulfatos (SO₃⁻). Las cargas se repelen y atraen agua.'],
['steps', 'De la carga a las propiedades del tejido', [
'Los carboxilatos y sulfatos están cargados negativamente a pH fisiológico.',
'Cargas iguales se repelen: la cadena no puede enrollarse y queda <b>extendida</b>, ocupando mucho volumen.',
'Las cargas negativas atraen cationes (como Na⁺) y, con ellos, muchísima <b>agua</b>.',
'Resultado: un gel hidratado que ocupa espacio, <b>resiste la compresión</b> (al apretarlo, el agua «empuja» de vuelta) y <b>lubrica</b>.'
]],
['ex', 'Cuando caminás, el cartílago de la rodilla se comprime y suelta un poco de agua; al levantar el pie, los GAG la vuelven a atraer y el cartílago recupera su forma. Funciona como una esponja que siempre vuelve a llenarse.'],
['h', 'Los GAG principales'],
['table', ['GAG', 'Unidad que se repite', 'Rasgo clave', 'Dónde está'], [
['Hialuronano (ácido hialurónico)', 'Ácido glucurónico + GlcNAc', '<b>No</b> está sulfatado y es larguísimo; da soluciones muy viscosas', 'Líquido sinovial, humor vítreo, cartílago'],
['Condroitín sulfato', 'Ácido glucurónico + GalNAc sulfatada', 'Muy abundante; da resistencia mecánica', 'Cartílago, tendones, ligamentos'],
['Dermatán sulfato', 'Como el condroitín, pero con mucho ácido <b>idurónico</b>', 'Variante del anterior', 'Piel, vasos sanguíneos'],
['Queratán sulfato', 'Galactosa + GlcNAc', 'Excepción: <b>no tiene ácido urónico</b>', 'Córnea, cartílago, hueso'],
['Heparán sulfato / heparina', 'Patrón variable de zonas sulfatadas', 'El patrón de sulfatos le permite unir proteínas específicas', 'Superficie celular / heparina en mastocitos']
]],
['why', 'Porque el patrón de sulfatos no es al azar: algunas zonas forman un «dibujo» de cargas que encaja con proteínas concretas. La heparina, muy sulfatada, se une a la <b>antitrombina</b> y la vuelve mucho más activa para frenar la coagulación. Por eso se usa como anticoagulante.', 'Por qué la heparina sirve como medicamento'],
['trap', 'Las dos excepciones que suelen preguntar: el <b>hialuronano no tiene sulfato</b> y el <b>queratán sulfato no tiene ácido urónico</b>.'],
['check', [
['¿Qué dos tipos de azúcar forman la unidad típica de un GAG?', 'Un aminoazúcar acetilado (GlcNAc o GalNAc) y un ácido urónico.'],
['¿Por qué los GAG quedan extendidos y no enrollados?', 'Porque sus muchas cargas negativas se repelen entre sí.'],
['¿Por qué el cartílago resiste la compresión?', 'Sus GAG retienen mucha agua; al apretarlo, el agua y las cargas oponen resistencia y luego el agua vuelve.'],
['¿Cuál GAG no está sulfatado?', 'El hialuronano.']
]]
]
},
{
n: 36, group: G, title: 'Glicoconjugados: azúcares pegados a proteínas y lípidos',
lead: 'Gran parte de los azúcares de una célula no están sueltos: están unidos a proteínas o lípidos, formando una capa por fuera de la membrana llamada glicocálix. Hay tres familias, y conviene no mezclarlas.',
blocks: [
['h', 'Las tres familias'],
['cols', [
['Proteoglicano', 'Mucho azúcar y poca proteína: una <b>proteína central</b> con cadenas <b>largas de GAG</b>. Función: llenar espacio, retener agua, organizar la matriz.'],
['Glicoproteína', 'Mucha proteína y poco azúcar: una proteína con <b>oligosacáridos cortos y ramificados</b>. Función: plegamiento, destino, reconocimiento.'],
['Glicolípido', 'Un <b>lípido de membrana</b> con azúcares en su cabeza. Función: reconocimiento en la superficie celular.']
]],
['h', 'Proteoglicanos'],
['p', 'En un proteoglicano, cadenas de GAG se unen a una <b>serina</b> de la proteína central a través de una pequeña región de azúcares que funciona como enlazador. Algunos están anclados a la membrana (sindecanos, glipicanos) y otros forman parte de la matriz extracelular.'],
['fig', F.proteoglycan, 'En el cartílago, muchas moléculas de agrecano (proteína central + GAG) se enganchan sobre un eje larguísimo de hialuronano, con ayuda de proteínas de enlace. El resultado parece un cepillo gigante lleno de agua.'],
['p', 'No son solo relleno: además de retener agua, sus GAG se unen a <b>factores de crecimiento</b> y a otras proteínas, y pueden regular cuándo esas señales llegan a sus receptores.'],
['h', 'Glicoproteínas: unión O y unión N'],
['p', 'El azúcar se puede unir a la proteína de dos formas, según qué aminoácido lo reciba. En la unión <b>O-glicosídica</b>, el azúcar se une al <b>oxígeno</b> del OH de una serina o treonina. En la unión <b>N-glicosídica</b>, se une al <b>nitrógeno</b> de la amida de una asparagina.'],
['fig', F.glycoprotein, 'Truco para recordarlo: O de OH (Ser/Thr tienen OH) y N de Asn (que tiene un N en su amida).'],
['p', 'Los azúcares cambian mucho a la proteína: la hacen más soluble, la ayudan a plegarse, la protegen de las proteasas, sirven de control de calidad en el retículo endoplasmático, funcionan como <b>etiquetas de destino</b> y como sitios donde se unen receptores, anticuerpos o patógenos. Las <b>mucinas</b>, que forman el moco, están cubiertas de cadenas O-unidas.'],
['h', 'Glicolípidos'],
['p', 'Son lípidos de membrana con azúcares en su cabeza polar, siempre mirando hacia afuera de la célula. Los más importantes son los <b>glicoesfingolípidos</b>, muy abundantes en el tejido nervioso. Los <b>gangliósidos</b> son glicoesfingolípidos que llevan ácido siálico. Algunos de estos azúcares definen grupos sanguíneos y otros son la «puerta de entrada» de toxinas y microorganismos.'],
['h', 'LPS: el glicolípido de las bacterias Gram negativas'],
['p', 'La membrana externa de las bacterias Gram negativas está cubierta de <b>lipopolisacárido (LPS)</b>, que tiene tres partes: el <b>lípido A</b>, que lo ancla a la membrana y es la parte tóxica (endotoxina); un <b>núcleo</b> de oligosacárido; y el <b>antígeno O</b>, una cadena de azúcares repetidos que cambia de una cepa a otra.'],
['ex', 'Cuando se produce una proteína recombinante en <i>E. coli</i> (por ejemplo, una insulina o una enzima para usar en personas), el producto puede arrastrar LPS de la bacteria. Una cantidad mínima de lípido A dispara una inflamación muy fuerte a través del receptor TLR4. Por eso la eliminación y el control de endotoxinas es un paso obligatorio en biotecnología.'],
['check', [
['¿En qué se diferencia un proteoglicano de una glicoproteína?', 'El proteoglicano tiene cadenas largas de GAG y es mayormente azúcar; la glicoproteína tiene oligosacáridos cortos y ramificados y es mayormente proteína.'],
['¿A qué aminoácidos se unen los glicanos O y N?', 'O-unidos: Ser o Thr (al OH). N-unidos: Asn (al N de la amida).'],
['¿Qué parte del LPS es la endotoxina?', 'El lípido A.'],
['¿Qué es un gangliósido?', 'Un glicoesfingolípido que tiene ácido siálico en su cadena de azúcares.']
]]
]
},
{
n: 37, group: G, title: 'Los azúcares como información: el código de azúcares y las lectinas',
lead: 'Las cadenas de azúcares en la superficie de las células funcionan como un código. Hay proteínas especializadas, las lectinas, que «leen» ese código, y así se controla desde a dónde va una proteína hasta cómo un virus entra a la célula.',
blocks: [
['h', 'Por qué los azúcares pueden guardar tanta información'],
['p', 'Una proteína es una fila de aminoácidos unidos siempre del mismo modo. Un oligosacárido, en cambio, puede variar en muchas más cosas a la vez: qué monosacáridos tiene, en qué orden, <b>entre qué carbonos</b> se une cada uno, si cada enlace es <b>α o β</b>, si hay <b>ramas</b> y si lleva sulfatos, fosfatos o acetilos.'],
['ex', 'Dos glucosas se pueden unir de 11 maneras distintas (α o β, y a cualquiera de varios OH del otro azúcar). Dos aminoácidos se unen de una sola manera: el enlace peptídico. Por eso, con pocas «letras», los azúcares forman muchísimas «palabras» diferentes.'],
['p', 'Un detalle importante: los glicanos <b>no se copian de un molde</b> como el ADN. La estructura final depende de qué enzimas hay en esa célula, dónde están y qué azúcares activados tienen disponibles. La información queda escrita en la forma 3D del glicano.'],
['h', 'Lectinas: las proteínas que leen el código'],
['p', 'Las <b>lectinas</b> son proteínas que se unen a azúcares de manera muy específica, sin modificarlos. Reconocen no solo qué azúcar es, sino su configuración, la posición de los enlaces y las ramas. Lo hacen con puentes de hidrógeno, interacciones iónicas, contactos hidrofóbicos y a veces iones metálicos.'],
['fig', F.lectin, 'Una sola unión lectina–azúcar es débil. Pero la lectina tiene varios sitios y la célula muchos glicanos: varias uniones simultáneas dan una adherencia total muy fuerte (avidez).'],
['why', 'Una unión débil se suelta enseguida. Pero si la lectina está unida por varios sitios a la vez, cuando uno se suelta los otros la sostienen y ese sitio se vuelve a unir. Para despegarla habría que soltar todos al mismo tiempo, algo muy improbable. Eso es la <b>avidez</b>: la fuerza total de muchas uniones juntas.', 'Por qué muchas uniones débiles hacen una unión fuerte'],
['h', 'Cuatro ejemplos para entender cómo se usa el código'],
['p', '<b>1. Selectinas y glóbulos blancos.</b> Cuando un tejido se inflama, las células de los vasos exponen <b>selectinas</b>, lectinas que reconocen un glicano de los glóbulos blancos llamado sialyl-Lewis X. Esas uniones son rápidas y débiles: el glóbulo blanco no se frena de golpe, sino que <b>rueda</b> por la pared. Al ir más lento, se activan otras proteínas (integrinas) que lo pegan firme, y entonces puede salir del vaso hacia el tejido.'],
['fig', F.selectin, 'Primero pocas uniones (rodamiento), después más uniones (rodamiento lento), después adhesión firme y salida al tejido inflamado.'],
['p', '<b>2. Manosa-6-fosfato: la dirección del lisosoma.</b> Las enzimas que tienen que ir al lisosoma reciben en el Golgi un glicano con <b>manosa-6-fosfato</b>. Un receptor reconoce esa marca y las envía al lisosoma. Sin la marca, se pierden: terminan secretadas fuera de la célula.'],
['p', '<b>3. Toxinas y virus que usan glicanos como puerta.</b> La toxina del cólera se une al gangliósido <b>GM1</b> de las células del intestino para entrar. El virus de la gripe (influenza) usa su <b>hemaglutinina</b> para pegarse al ácido siálico de nuestras células; cuando los virus nuevos salen, su <b>neuraminidasa</b> corta ese ácido siálico para no quedar enganchados. Hay antivirales que bloquean la neuraminidasa, y así los virus no se pueden liberar.'],
['p', '<b>4. Fecha de vencimiento de las proteínas de la sangre.</b> Muchas glicoproteínas del plasma terminan en ácido siálico. Con el tiempo lo pierden y queda expuesta una galactosa. Un receptor del hígado reconoce esa galactosa, capta la proteína «vieja» y la degrada.'],
['check', [
['¿Por qué los oligosacáridos pueden guardar más información que un péptido del mismo largo?', 'Porque además del orden pueden variar la posición del enlace, α o β, las ramas y las modificaciones; los aminoácidos se unen siempre igual.'],
['¿Qué es la avidez?', 'La fuerza total que surge de muchas uniones débiles simultáneas.'],
['¿Para qué rueda un glóbulo blanco sobre el endotelio?', 'Para frenarse de a poco y dar tiempo a que se activen las uniones firmes que le permiten salir al tejido.'],
['¿Qué hace la neuraminidasa del virus de la gripe?', 'Corta el ácido siálico para que los virus nuevos se suelten de la célula.']
]]
]
},
{
n: 38, group: G, title: 'Cómo se estudian los glúcidos en el laboratorio',
lead: 'Descifrar un glicano es más difícil que secuenciar una proteína. Hay que combinar varios métodos, cada uno responde una pregunta distinta.',
blocks: [
['why', 'Una proteína es una cadena lineal con un solo tipo de enlace. Un glicano puede tener ramas, distintos tipos de enlace, posiciones α o β y grupos frágiles como los sulfatos, que se pierden con facilidad. No existe una «máquina secuenciadora» única: hay que resolver por separado <b>qué hay</b>, <b>en qué orden</b>, <b>cómo está unido</b> y <b>con qué configuración</b>.', 'Por qué es tan difícil'],
['fig', F.analysis, 'Cada paso responde una pregunta: liberar el glicano, separarlo, saber su composición, saber qué OH estaban unidos, leer el orden y confirmar todo.'],
['table', ['Pregunta', 'Método', 'Cómo funciona'], [
['¿Cómo saco el glicano de la proteína o el lípido?', 'Glicosidasas específicas; lipasas', 'Enzimas que cortan justo la unión O o N, o separan la cabeza de un glicolípido'],
['¿Cómo lo separo de otros?', 'Precipitación, cromatografía de intercambio iónico, exclusión molecular o afinidad con lectinas', 'Las lectinas inmovilizadas atrapan solo glicanos con cierta estructura'],
['¿Qué monosacáridos tiene?', 'Hidrólisis ácida', 'Rompe todos los enlaces y deja los monosacáridos sueltos para identificarlos'],
['¿Qué OH estaban en enlaces?', 'Metilación exhaustiva + hidrólisis', 'Se metilan todos los OH libres; al hidrolizar, los OH que aparecen sin metilo eran los que estaban unidos'],
['¿En qué orden y con qué α/β?', 'Exoglicosidasas', 'Enzimas que sacan un azúcar por vez desde el extremo no reductor y solo si es de un tipo y configuración precisos'],
['Confirmación completa', 'Espectrometría de masas y RMN', 'Dan masa, composición, secuencia, posiciones de enlace y configuración anomérica']
]],
['ex', 'Si una exoglicosidasa que solo corta β-galactosa terminal libera galactosa, ya sabés dos cosas: la última unidad era galactosa y estaba unida en β. Si después otra que corta α-ácido siálico no libera nada, sabés que no había siálico en esa punta.'],
['p', 'También se sintetizan químicamente oligosacáridos definidos, incluso sobre soportes sólidos, para estudiar con precisión cómo se unen a lectinas o anticuerpos.'],
['check', [
['¿Qué información da la metilación exhaustiva?', 'Qué grupos OH participaban en enlaces glucosídicos.'],
['¿Desde qué extremo actúan las exoglicosidasas?', 'Desde el extremo no reductor, de a un azúcar por vez.'],
['¿Para qué sirve una columna con lectinas?', 'Para separar glicanos según su estructura, porque cada lectina reconoce un tipo de azúcar o enlace.']
]]
]
},
{
n: 39, group: G, title: 'Razonar la unidad: problemas resueltos',
lead: 'Las preguntas de examen rara vez piden una definición suelta: piden encadenar ideas. Estos cinco razonamientos conectan toda la unidad.',
blocks: [
['steps', 'Del carbono anomérico al poder reductor', [
'¿El carbono anomérico es un hemiacetal libre? Entonces el anillo se puede abrir.',
'Al abrirse aparece un C=O que se puede oxidar: el azúcar es reductor.',
'El mismo mecanismo explica la mutarrotación: al cerrarse, puede quedar α o β.',
'Si el carbono anomérico forma un enlace glucosídico (acetal), el anillo no se abre: si todos los anoméricos están usados, no hay poder reductor ni mutarrotación. Ejemplos: sacarosa y trehalosa.'
]],
['steps', 'De α/β a la función del polímero', [
'No cambia el monómero (es glucosa en los dos casos): cambia la orientación del enlace.',
'α(1→4) hace que la cadena gire: hélice. Esa forma es compacta y fácil de atacar por las enzimas → reserva (almidón, glucógeno).',
'β(1→4) deja la cadena recta. Las cadenas rectas se pegan con puentes de hidrógeno → fibras insolubles y resistentes (celulosa).',
'Conclusión: una diferencia de un solo carbono a nivel molecular produce una diferencia gigante a nivel del organismo.'
]],
['steps', 'De la ramificación a la velocidad', [
'Cada rama α(1→6) suma un extremo no reductor.',
'Las enzimas que liberan glucosa actúan desde esos extremos.',
'Más ramas = más enzimas trabajando a la vez = glucosa disponible más rápido. Por eso el glucógeno, la reserva de los animales que necesitan energía de golpe, es el más ramificado.'
]],
['steps', 'De la carga de los GAG al cartílago', [
'Carboxilatos y sulfatos dan carga negativa.',
'Las cargas se repelen (cadena extendida) y atraen cationes y agua (gel hidratado).',
'Ese gel resiste la compresión y lubrica: amortiguación en el cartílago y deslizamiento en las articulaciones.'
]],
['steps', 'De la diversidad de glicanos al reconocimiento', [
'Un cambio mínimo (un azúcar, un enlace, una rama, un sulfato) cambia la superficie 3D del glicano.',
'Las lectinas reconocen esa superficie con mucha especificidad.',
'Así, la variedad química se convierte en información biológica: destino de proteínas, adhesión de células, entrada de patógenos.'
]],
['check', [
['Te dan un trisacárido Gal β(1→4) Glc α(1→2)β Fru. ¿Es reductor?', 'No. La galactosa usa su C1 para unirse a la glucosa; la glucosa usa su C1 para unirse al C2 de la fructosa (que es el anomérico de la fructosa). No queda ningún carbono anomérico libre.'],
['¿Por qué una planta usaría almidón para guardar energía y no celulosa?', 'Porque el almidón (α) forma hélices compactas que sus enzimas pueden desarmar; la celulosa (β) forma fibras insolubles difíciles de degradar, útiles para estructura.'],
['Si una mutación disminuye las ramificaciones del glucógeno, ¿qué esperás?', 'Menos extremos no reductores: la glucosa se liberaría más lento, por ejemplo durante el ayuno o el ejercicio.']
]]
]
},
{
n: 40, group: G, title: 'Ampliaciones de la bibliografía',
lead: 'Estos temas no son el eje de la clase, pero aparecen como ejemplos y ayudan a ver para qué sirve todo lo anterior.',
blocks: [
['h', 'Dulzor y estereoquímica'],
['p', 'El receptor del gusto dulce también es una proteína con un sitio de unión de forma precisa. Con el edulcorante aspartamo pasa algo muy claro: dos estereoisómeros con los mismos átomos y las mismas uniones producen sensaciones distintas, porque solo uno encaja bien en el receptor. Es el mismo principio que explica por qué las enzimas distinguen D de L.'],
['h', 'HbA1c y productos de glicación avanzada'],
['p', 'La HbA1c se usa para estimar cuánta glucosa hubo en sangre en promedio durante los últimos meses. Si la glucemia queda alta por mucho tiempo, la glicación avanza hacia productos de glicación avanzada (AGE), que unen proteínas entre sí y alteran su función y la señalización de las células. Esto se relaciona con complicaciones de la diabetes en vasos, riñón, retina y nervios.'],
['h', 'Glicómica'],
['p', 'Así como la genómica estudia todos los genes, la <b>glicómica</b> busca describir todos los glicanos de una célula o un tejido, incluidos los que están unidos a proteínas y lípidos, y en qué sitios de cada proteína están. La espectrometría de masas y la RMN son sus herramientas principales.'],
['h', 'Glicosilación y enfermedad'],
['p', 'Existen muchas enfermedades genéticas en las que falla alguna enzima de la glicosilación. Las proteínas afectadas pueden plegarse mal, ser más inestables, ir al lugar equivocado o no ser reconocidas. Que haya tantas enfermedades distintas muestra lo importante que es la glicosilación en casi todos los tejidos.'],
['h', 'Grupos sanguíneos'],
['p', 'Los grupos sanguíneos ABO dependen de qué azúcar hay en la punta de ciertos glicanos de glicoproteínas y glicolípidos de los glóbulos rojos. Las personas del grupo A tienen una N-acetilgalactosamina terminal; las del grupo B, una galactosa; las del grupo O, ninguna de las dos. Una diferencia de un solo azúcar alcanza para que el sistema inmune reconozca la sangre como propia o ajena.'],
['h', 'Patógenos y glicanos'],
['p', 'Además del cólera y la gripe, muchas bacterias, virus y parásitos usan glicanos de nuestras células para adherirse o se cubren con glicanos para esconderse del sistema inmune. Más que memorizar cada organismo, importa el principio: el reconocimiento lectina–glicano puede decidir a qué células se pega un patógeno, si logra entrar y cómo responde el huésped.']
]
},
{
n: 41, group: G, title: 'Repaso final: lo que hay que saber sí o sí',
lead: 'Si tuvieras que reconstruir toda la unidad desde pocas ideas, estas son las que no pueden faltar. Cada una tiene al lado el porqué en una línea.',
blocks: [
['table', ['Idea', 'Por qué'], [
['Un glúcido puede ser energía, estructura o información.', 'Depende de cómo se unen sus monosacáridos y con qué se combinan.'],
['Aldosa/cetosa dice dónde está el C=O; triosa, hexosa, etc., cuántos carbonos.', 'Son dos datos independientes que se combinan en el nombre (aldohexosa).'],
['La estereoquímica importa.', 'Enzimas y receptores reconocen formas 3D, no fórmulas.'],
['D/L se define por el carbono quiral más alejado del C=O.', 'Se compara con el D- o L-gliceraldehído; no dice nada de la rotación de la luz.'],
['Glucosa–manosa: epímeros en C2. Glucosa–galactosa: epímeros en C4.', 'Difieren en un solo carbono quiral.'],
['La ciclación crea el carbono anomérico y los anómeros α y β.', 'El ataque al C=O puede venir por dos caras.'],
['Con hemiacetal anomérico libre hay mutarrotación y poder reductor.', 'El anillo puede abrirse y exponer el C=O.'],
['El enlace glucosídico fija la configuración del anomérico.', 'Un acetal ya no se abre solo.'],
['Maltosa y lactosa son reductoras; sacarosa y trehalosa no.', 'En las dos últimas se unen los dos carbonos anoméricos.'],
['Almidón y glucógeno usan α; celulosa usa β.', 'α enrolla la cadena (reserva); β la deja recta (fibras).'],
['Más ramas = más extremos no reductores = movilización más rápida.', 'Las enzimas trabajan desde esos extremos.'],
['Los GAG son cadenas cargadas e hidratadas.', 'Carboxilatos y sulfatos repelen y atraen agua: amortiguan y lubrican.'],
['Proteoglicano, glicoproteína y glicolípido no son sinónimos.', 'Difieren en qué es lo principal y en el largo del azúcar.'],
['Los glicanos son etiquetas y sitios de reconocimiento.', 'Varían en muchas dimensiones a la vez.'],
['Las lectinas leen el código de azúcares.', 'Explican adhesión de leucocitos, destino lisosomal y entrada de patógenos.'],
['Analizar un glicano exige combinar métodos.', 'Hay que resolver composición, enlaces, orden, ramas y α/β.']
]],
['check', [
['Explicá con tus palabras por qué la sacarosa no da Fehling.', 'Sus dos carbonos anoméricos (C1 de glucosa y C2 de fructosa) forman el enlace. Sin hemiacetal libre, el anillo no se abre, no aparece C=O y no reduce el Cu²⁺.'],
['¿Qué tienen en común la quitina y el peptidoglucano?', 'Los dos son polímeros estructurales con GlcNAc y enlaces β(1→4) que forman cadenas resistentes.'],
['¿Qué cambia entre α-glucosa y β-glucosa y por qué importa?', 'Solo la orientación del OH del carbono anomérico. Importa porque decide el tipo de enlace que formará en un polímero (α: reserva; β: estructura) y qué enzimas la reconocen.'],
['¿Por qué la heparina es anticoagulante?', 'Por su patrón de sulfatos se une a la antitrombina y aumenta su actividad para frenar la coagulación.']
]]
]
}
];
