'use strict';
/* Ácidos nucleicos I · Metabolismo de nucleótidos. Capítulos 72 a 77. */
const { F } = require('./figs-acidos');
const { M } = require('./kit-an');
const G = 'Ácidos nucleicos I';

module.exports = [
{
n: 72, group: G, pages: '48–50', title: 'Metabolismo de nucleótidos: degradación, síntesis «de novo» y rescate',
lead: 'Los nucleótidos se fabrican desde cero o se reciclan a partir de bases ya hechas. Antes de entrar en cada vía conviene ver el mapa completo y saber de dónde sale cada átomo.',
blocks: [
['h', 'El mapa general'],
['fig', F.metab, 'Cómo se degradan los ácidos nucleicos y cómo vuelven a formarse nucleótidos, con la enzima de cada flecha.'],
['img', 'p048-metabolismo', 'El mismo mapa: ADN/ARN → oligonucleótidos → nucleótidos → nucleósidos + Pi → base + ribosa-1-P. Desde ahí, degradación (ácido úrico) o vías de recuperación; a los nucleótidos llega también la biosíntesis «de novo».', 48],
['steps', 'Cada flecha del mapa', [
'<b>Nucleasas:</b> cortan enlaces fosfodiéster del ADN y del ARN y los parten en <b>oligonucleótidos</b> (cadenas cortas).',
'<b>Fosfodiesterasas:</b> siguen cortando enlaces fosfodiéster hasta liberar <b>nucleótidos</b> sueltos.',
'<b>Nucleotidasas:</b> sacan el fosfato del nucleótido (cortan el enlace fosfoéster): queda un <b>nucleósido + Pi</b>.',
'<b>Nucleósido fosforilasa:</b> rompe el enlace N-glicosídico usando un fosfato (no agua): queda la <b>base libre + ribosa-1-fosfato</b>.',
'La base puede ir a <b>degradación</b> (las purinas terminan en ácido úrico, capítulo 76) o a las <b>vías de recuperación</b>, donde se une a PRPP y vuelve a ser nucleótido.',
'Los nucleótidos, rescatados o fabricados «de novo», se encadenan para formar ADN y ARN nuevos.'
]],
['table', ['Base', '+ PRPP →', 'Nucleótido que se recupera'], [
['Adenina', '+ PRPP →', 'adenilato (AMP) + PPi'],
['Hipoxantina', '+ PRPP →', 'inosinato (IMP) + PPi'],
['Guanina', '+ PRPP →', 'guanilato (GMP) + PPi']
]],
['h', 'Dos maneras de conseguir nucleótidos'],
['cols', [
['Síntesis «de novo» (desde cero)', 'La mayoría de los organismos fabrica los nucleótidos que necesita a partir de moléculas chicas: aminoácidos, CO₂, derivados del folato y ribosa. Estas vías son largas, gastan mucho ATP y están <b>muy conservadas en la evolución</b>: son prácticamente iguales en todo el mundo biológico.'],
['Recuperación o rescate', 'Se reutilizan bases de purinas y pirimidinas que ya están formadas. Es mucho más barato: un solo paso con PRPP.']
]],
['p', 'Las bases que se rescatan vienen de dos fuentes: la <b>degradación de los ácidos nucleicos propios</b>, que ocurre dentro de las células (por ejemplo, cuando una célula muere y se desarma, o cuando se recambia el ARN), y la <b>dieta</b>. En los animales, la digestión de los ácidos nucleicos de los alimentos en el intestino delgado es la principal vía de entrada de bases y nucleósidos: nucleasas como las endonucleasas los cortan, otras enzimas siguen degradando y se obtienen mononucleótidos, nucleósidos y bases que se absorben.'],
['p', 'Si las bases o nucleósidos no se usan para fabricar ácidos nucleicos por la vía de rescate, se degradan: las <b>purinas a ácido úrico</b> y las <b>pirimidinas a β-ureidopropionato</b>.'],
['why', 'Fabricar una purina «de novo» cuesta muchos pasos y varios ATP (capítulo 73). Si la célula ya tiene la base armada, unirla al PRPP en un solo paso es un gran ahorro. Por eso, antes de degradar una base hasta ácido úrico, la célula intenta reciclarla.', 'Por qué existe el rescate'],
['h', '¿De dónde salen los átomos de los anillos?'],
['p', 'El anillo de <b>purina</b> se arma con átomos de aminoácidos, de derivados del tetrahidrofolato (THF) y del CO₂. El anillo de <b>pirimidina</b> es más simple: se arma con carbamoil fosfato y aspartato.'],
['gallery', [['p050-atomos-purina', 'Purina: aspartato, CO₂, glicina, formato (×2) y amida de la glutamina (×2)'], ['p050-atomos-pirimidina', 'Pirimidina: carbamoil fosfato (amida de la glutamina y HCO₃⁻) y aspartato']], 50],
['table', ['Anillo', 'Átomo', 'De dónde viene'], [
['Purina', 'N1', 'Grupo amino del aspartato'],
['Purina', 'C2 y C8', 'Formato, transportado por el tetrahidrofolato (N¹⁰-formil-THF)'],
['Purina', 'N3 y N9', 'Nitrógeno amida de la glutamina'],
['Purina', 'C4, C5 y N7', 'Glicina (entra entera)'],
['Purina', 'C6', 'HCO₃⁻ (CO₂)'],
['Pirimidina', 'N1, C4, C5 y C6', 'Aspartato'],
['Pirimidina', 'C2', 'HCO₃⁻, a través del carbamoil fosfato'],
['Pirimidina', 'N3', 'Amida de la glutamina, a través del carbamoil fosfato']
]],
['ex', 'Purina (9 átomos): glicina 3 + glutamina 2 + formato 2 + aspartato 1 + CO₂ 1 = 9. Pirimidina (6 átomos): aspartato 4 + carbamoil fosfato 2 = 6. Si al contar no te da el total, te olvidaste de alguna fuente.', 'Para controlar que no falte nada'],
['h', 'PRPP: el dador de la ribosa'],
['p', 'En los dos casos, la ribosa-5-fosfato de todos los nucleótidos la aporta el <b>5-fosforribosil-1-pirofosfato (PRPP)</b>. Se forma a partir de ribosa-5-fosfato, que viene de la vía de las pentosas fosfato, y ATP:'],
['math', String.raw`\text{ribosa-5-P} + \text{ATP} \xrightarrow{\ \text{PRPP sintetasa}\ } \text{PRPP} + \text{AMP}`, 'ribosa-5-P + ATP → (PRPP sintetasa) → PRPP + AMP'],
['img', 'p050-prpp', 'Ribosa-5-fosfato + ATP → PRPP + AMP, catalizado por la PRPP sintetasa.', 50],
['why', 'La PRPP sintetasa pasa un pirofosfato (dos fosfatos juntos) del ATP al C1 de la ribosa-5-fosfato; por eso el ATP queda como AMP. Después, cuando una base (o el anillo en construcción) se une al C1, sale ese pirofosfato (PPi), y su salida empuja la reacción hacia adelante. Por eso el PRPP es una ribosa «activada».', 'Por qué el PRPP sirve como dador'],
['check', [
['¿Qué enzima convierte un nucleósido en base + ribosa-1-P?', 'La nucleósido fosforilasa (usa Pi).'],
['¿De qué aminoácido vienen tres átomos juntos del anillo de purina?', 'De la glicina (C4, C5 y N7).'],
['¿Cuáles son los dos precursores del anillo de pirimidina?', 'Carbamoil fosfato y aspartato.'],
['¿A qué se degradan las purinas y las pirimidinas que no se reciclan?', 'Purinas a ácido úrico; pirimidinas a β-ureidopropionato.']
]]
]
},
{
n: 73, group: G, pages: '51–53', title: 'Síntesis de purinas: de PRPP a IMP, AMP y GMP, y su regulación',
lead: 'Las purinas se construyen átomo por átomo directamente sobre la ribosa. Es una vía larga y cara, así que la célula la controla con frenos en la entrada y en cada rama.',
blocks: [
['h', 'Dos estrategias distintas'],
['p', 'Purinas y pirimidinas usan el PRPP como dador de ribosa, pero en distinto momento. En las <b>purinas</b>, el anillo se <b>ensambla directamente sobre la ribosa-fosfato</b>. En las <b>pirimidinas</b>, el anillo se fabrica <b>por separado</b> y recién después se une a la ribosa-fosfato del PRPP.'],
['img', 'p051-estrategias', 'Izquierda, purinas: el anillo se arma sobre la ribosa-P; tras 10 u 11 reacciones se llega al IMP (1.ª etapa), que da ATP y GTP para el ARN y dATP y dGTP para el ADN (2.ª etapa). Derecha, pirimidinas: bicarbonato + NH₃ + 2 ATP → carbamoil fosfato; con aspartato se cierra el anillo; recién entonces se une al PRPP → UTP → CTP; y dTTP y dCTP para el ADN.', 51],
['table', ['', 'Purinas', 'Pirimidinas'], [
['¿Cuándo entra la ribosa (PRPP)?', 'Al principio: el anillo se arma sobre ella', 'Al final: el anillo se arma solo y después se une al PRPP'],
['Primer nucleótido completo', 'IMP (inosinato)', 'OMP (orotidilato), que da UMP'],
['Productos', 'AMP y GMP → ATP, GTP, dATP, dGTP', 'UMP → UTP → CTP; dCTP y dTTP'],
['Paso comprometido', 'PRPP + glutamina → 5-fosforribosil-1-amina', 'Formación de carbamoilaspartato'],
['Capítulo', '73', '74']
]],
['ex', 'La <b>cafeína</b> es una purina modificada: su nombre químico es <b>1,3,7-trimetilxantina</b>, es decir, una xantina (una purina con dos carbonilos) con tres metilos. Es un parentesco de estructura, no una vía de nuestro metabolismo: la fabrican las plantas.', 'La cafeína es pariente de las purinas'],
['img', 'p051-cafeina', 'Cafeína (1,3,7-trimetilxantina): el esqueleto de purina con dos carbonilos y tres metilos en los nitrógenos 1, 3 y 7.', 51],
['h', 'El paso comprometido y los frenos'],
['p', 'La conversión de <b>PRPP + glutamina en 5-fosforribosil-1-amina</b>, catalizada por la <b>glutamina-PRPP amidotransferasa</b>, es el <b>paso comprometido</b> de la síntesis de purinas: una vez formada la fosforribosilamina, ya no puede ir a ninguna otra vía.'],
['fig', F.purines, 'La vía de las purinas con sus frenos (⊖) y el cruce de energía entre las dos ramas.'],
['img', 'p052-regulacion', 'Ribosa-5-fosfato → PRPP → fosforribosilamina (*) → IMP, que se divide en adenilosuccinato → AMP y xantilato → GMP. El PRPP también puede ir a histidina y a nucleótidos de pirimidina. IMP, AMP y GMP retroinhiben la síntesis.', 52],
['why', 'El PRPP no es exclusivo de las purinas: también se usa para fabricar histidina, pirimidinas y para el rescate. Si el freno estuviera antes del PRPP, al frenar las purinas se frenarían también esas otras vías. La primera molécula que <b>solo</b> sirve para hacer purinas es la 5-fosforribosil-1-amina, así que la enzima que la forma es el punto de control lógico.', 'Por qué el paso comprometido está después del PRPP'],
['steps', 'Los frenos de la vía (retroinhibición)', [
'<b>En la entrada:</b> IMP, AMP y GMP, los productos, inhiben la glutamina-PRPP amidotransferasa. Si sobran purinas, la vía no arranca.',
'<b>En la rama del AMP:</b> el AMP inhibe la formación de su precursor inmediato, el adenilosuccinato.',
'<b>En la rama del GMP:</b> el GMP inhibe la formación de su precursor inmediato, el xantilato (XMP).',
'Así, si sobra AMP pero falta GMP, el IMP se desvía hacia GMP, y al revés.'
]],
['h', 'De IMP a AMP y a GMP'],
['img', 'p052-amp-gmp', 'Arriba: inosinato + aspartato (con GTP → GDP + Pi) → adenilosuccinato → sale fumarato → adenilato (AMP). Abajo: inosinato + NAD⁺ + H₂O → xantilato (XMP) + NADH; xantilato + glutamina + ATP → guanilato (GMP) + glutamato + AMP + PPi.', 52],
['table', ['Rama', 'Qué cambia', 'Quién lo aporta', 'Energía', 'Producto'], [
['IMP → AMP', 'Se agrega un grupo amino en el C6 (en lugar del C=O)', 'Aspartato (después sale como fumarato)', '<b>GTP</b> → GDP + Pi', 'Adenilato (AMP)'],
['IMP → GMP', 'Primero se oxida el C2 (IMP → XMP); después se agrega un NH₂ en el C2', 'NAD⁺ (oxida) y glutamina (→ glutamato)', '<b>ATP</b> → AMP + PPi', 'Guanilato (GMP)']
]],
['why', 'Para hacer AMP se gasta GTP, y para hacer GMP se gasta ATP. Si hay mucho ATP, eso impulsa la síntesis de GMP; si hay mucho GTP, impulsa la de AMP. Así las dos se mantienen equilibradas.', 'Por qué cada rama usa la energía de la otra'],
['h', 'Los pasos hasta el IMP: una vía larga y cara'],
['img', 'p053-imp', 'Los nueve pasos desde la fosforribosilamina hasta el inosinato (IMP), con la tabla de enzimas. La base del IMP es la hipoxantina.', 53],
['table', ['Paso', 'Qué entra (y qué sale)', 'Producto', 'Enzima'], [
['1', 'Glicina + ATP (→ ADP + Pi)', 'Glicinamida ribonucleótido (GAR)', 'GAR sintetasa'],
['2', 'Formilo del N¹⁰-formil-THF (→ THF)', 'Formilglicinamida ribonucleótido (FGAR)', 'GAR transformilasa'],
['3', 'Glutamina + ATP (→ glutamato, ADP + Pi)', 'Formilglicinamidina ribonucleótido (FGAM)', 'Formilglicinamidina sintasa'],
['4', 'ATP (→ ADP + Pi); se cierra el anillo de cinco', '5-aminoimidazol ribonucleótido (AIR)', 'Aminoimidazol ribonucleótido sintetasa'],
['5', 'HCO₃⁻ + ATP (→ ADP + Pi)', 'Carboxiaminoimidazol ribonucleótido (CAIR)', 'Carboxiaminoimidazol ribonucleótido sintetasa'],
['6', 'Aspartato + ATP (→ ADP + Pi)', '5-aminoimidazol-4-(N-succinilcarboxamida) ribonucleótido (SAICAR)', 'Succinilaminoimidazol carboxamida ribonucleótido sintetasa'],
['7', 'Sale fumarato', '5-aminoimidazol-4-carboxamida ribonucleótido (AICAR)', 'Adenilosuccinato liasa'],
['8', 'Formilo del N¹⁰-formil-THF (→ THF)', '5-formaminoimidazol-4-carboxamida ribonucleótido (FAICAR)', 'Aminoimidazol carboxamida ribonucleótido transformilasa'],
['9', 'Sale H₂O; se cierra el anillo de seis', '<b>Inosinato (IMP)</b>, cuya base es la <b>hipoxantina</b>', 'IMP ciclohidrolasa']
]],
['p', 'Contando todo, la vía tiene <b>10 u 11 reacciones</b>: los 9 pasos de la tabla, más la amidotransferasa (10) y, según cómo se cuente, la formación del PRPP o el paso 5, que en las bacterias ocurre en dos reacciones (11).'],
['steps', 'Por qué es costosa: contá la energía', [
'Formar el PRPP: 1 ATP que queda como AMP (se gastan dos enlaces fosfoanhídrido).',
'Pasos 1, 3, 4, 5 y 6: un ATP cada uno → 5 ATP.',
'Además se consumen dos glutaminas (amidotransferasa y paso 3), una glicina, un aspartato, dos formilos del folato y un CO₂.',
'Y todavía falta convertir el IMP en AMP (1 GTP) o en GMP (1 ATP). Comparado con el rescate, que es un solo paso con PRPP, la diferencia es enorme.'
]],
['check', [
['¿Qué enzima cataliza el paso comprometido de la síntesis de purinas?', 'La glutamina-PRPP amidotransferasa (PRPP + glutamina → 5-fosforribosil-1-amina).'],
['¿Qué moléculas la inhiben?', 'IMP, AMP y GMP (retroinhibición).'],
['¿Cuál es la base del IMP?', 'La hipoxantina.'],
['¿Qué nucleótido aporta la energía para hacer AMP? ¿Y para hacer GMP?', 'GTP para AMP; ATP para GMP.'],
['¿En qué se diferencian las estrategias para purinas y pirimidinas?', 'Las purinas se arman sobre la ribosa-P (PRPP al principio); las pirimidinas arman el anillo por separado y después lo unen al PRPP.']
]]
]
},
{
n: 74, group: G, pages: '51 y 54', title: 'Síntesis de pirimidinas y su regulación',
lead: 'La vía de las pirimidinas es más corta: primero se arma el anillo con carbamoil fosfato y aspartato, y recién al final se le une la ribosa.',
blocks: [
['fig', F.pyrimidines, 'La vía de las pirimidinas y su regulación.'],
['img', 'p054-pirimidinas', 'Aspartato + carbamoil fosfato → (ATCasa) carbamoilaspartato → … → UMP → UDP → UTP → CTP (CTP sintetasa). Abajo, orotato + PRPP → orotidilato, el primer nucleótido de pirimidina. El CTP inhibe la ATCasa y el ATP la activa.', 54],
['steps', 'La vía paso a paso', [
'<b>Carbamoil fosfato:</b> se forma con bicarbonato, el nitrógeno de la glutamina y 2 ATP.',
'<b>Carbamoilaspartato:</b> la <b>ATCasa</b> (aspartato transcarbamilasa) une el carbamoil fosfato con el aspartato. Es el <b>paso comprometido</b>.',
'<b>Dihidroorotato → orotato:</b> se cierra el anillo y se oxida. El orotato es una pirimidina todavía sin azúcar.',
'<b>Orotato + PRPP → orotidilato (OMP):</b> recién ahora entra la ribosa-5-fosfato. Es el primer nucleótido de pirimidina.',
'<b>OMP → UMP:</b> el orotidilato se descarboxila (pierde CO₂).',
'<b>UMP → UDP → UTP:</b> se agregan fosfatos.',
'<b>UTP → CTP:</b> la <b>CTP sintetasa</b> agrega un grupo amino (aminación); el nitrógeno viene de la glutamina.'
]],
['h', 'La regulación'],
['p', 'La vía se regula por <b>retroinhibición</b>: el <b>CTP</b>, producto final, inhibe la <b>ATCasa</b>. El <b>ATP</b>, en cambio, la activa.'],
['why', 'Cuando el CTP se acumula, se une a la ATCasa y la frena: si ya hay suficiente CTP, no tiene sentido seguir gastando aspartato y carbamoil fosfato. El ATP la activa porque es señal de que hay energía y de que hacen falta pirimidinas para acompañar a las purinas.', 'Por qué el CTP frena la ATCasa'],
['p', 'Este control de la ATCasa es el ejemplo clásico, estudiado en la bacteria <i>E. coli</i>. En los mamíferos el control principal está un paso antes, en la síntesis del carbamoil fosfato.'],
['check', [
['¿Cuál es el paso comprometido de la síntesis de pirimidinas y qué enzima lo cataliza?', 'La formación de carbamoilaspartato, catalizada por la ATCasa (aspartato transcarbamilasa).'],
['¿En qué momento se une el PRPP en la vía de pirimidinas?', 'Después de formar el orotato: orotato + PRPP → orotidilato (OMP).'],
['¿Cómo se forma el CTP?', 'Por aminación del UTP (CTP sintetasa).'],
['¿Qué molécula inhibe la ATCasa y cuál la activa?', 'La inhibe el CTP; la activa el ATP.']
]]
]
},
{
n: 75, group: G, pages: '55–56', title: 'Desoxirribonucleótidos, timidilato y fármacos que bloquean su síntesis',
lead: 'Para hacer ADN hacen falta desoxirribonucleótidos, y la timina necesita un paso extra. Justamente ese paso es el blanco de varios fármacos contra el cáncer.',
blocks: [
['h', 'De ribo a desoxi'],
['p', 'Los desoxirribonucleótidos se fabrican <b>reduciendo ribonucleótidos</b>: se les quita el oxígeno del C2′. El dTMP es la excepción: se forma <b>metilando dUMP</b>.'],
['fig', F.dntp, 'La ribonucleótido reductasa trabaja sobre difosfatos; la timina sigue un camino aparte.'],
['img', 'p055-reductasa', 'ADP, GDP, CDP y UDP → ribonucleótido reductasa → dADP, dGDP, dCDP y dUDP → procesamiento posterior → dATP, dGTP, dCTP y dTTP.', 55],
['steps', 'Qué hay que entender', [
'La <b>ribonucleótido reductasa</b> transforma la ribosa en desoxirribosa. Actúa sobre los <b>difosfatos</b>: ADP, GDP, CDP y UDP.',
'Sus productos (dADP, dGDP, dCDP, dUDP) después se fosforilan a trifosfatos (dATP, dGTP, dCTP), que son los que usa la ADN polimerasa.',
'La reductasa no fabrica timina. El dTTP sale de un camino extra: el dUDP pasa a dUTP, la <b>dUTPasa</b> lo hidroliza enseguida a dUMP, y la <b>timidilato sintasa</b> metila el dUMP para dar dTMP, que luego se fosforila a dTTP.'
]],
['why', 'La ADN polimerasa casi no distingue el dUTP del dTTP. Si hubiera mucho dUTP en la célula, se metería uracilo en el ADN constantemente. La dUTPasa mantiene el dUTP casi en cero y, de paso, deja el dUMP listo para fabricar timidilato.', 'Por qué la dUTPasa es tan importante'],
['p', 'El camino va siempre de ribo a desoxi: <b>no hay ribonucleótidos que se formen a partir de desoxirribonucleótidos</b>. Esto encaja con la hipótesis del <b>mundo de ARN</b>: el ARN habría aparecido primero en la evolución (puede guardar información y también catalizar reacciones), y el ADN después, como una versión más estable para guardar información.'],
['h', 'Síntesis de timidilato'],
['p', 'La <b>timidilato sintasa</b> forma dTMP metilando el dUMP. El grupo de un carbono lo aporta el <b>N⁵,N¹⁰-metilen-tetrahidrofolato</b> (metilen-THF), un derivado del ácido fólico.'],
['fig', F.thymidylate, 'El ciclo del timidilato con los dos puntos donde actúan los fármacos.'],
['img', 'p056-timidilato', 'dUMP → dTMP (timidilato sintasa). El metilen-THF pasa a dihidrofolato; la dihidrofolato reductasa lo vuelve a tetrahidrofolato con NADPH; la serina, al pasar a glicina, regenera el metilen-THF. El fluorouracilo bloquea la timidilato sintasa; la aminopterina y el metotrexato bloquean la dihidrofolato reductasa.', 56],
['steps', 'El ciclo, flecha por flecha', [
'<b>Timidilato sintasa (TS):</b> pasa un carbono del metilen-THF al C5 del uracilo del dUMP y lo deja como metilo: se forma <b>dTMP</b>. Para reducir ese carbono a metilo, el folato cede además electrones y queda como <b>dihidrofolato (DHF)</b>.',
'<b>Dihidrofolato reductasa (DHFR):</b> reduce el DHF a <b>tetrahidrofolato (THF)</b> usando NADPH.',
'<b>Serina → glicina:</b> la serina le cede un carbono al THF y lo vuelve a convertir en metilen-THF. El ciclo arranca otra vez.',
'Sin DHFR, todo el folato queda atrapado como DHF y la TS se queda sin dador de metilo.'
]],
['h', 'Fármacos que bloquean la síntesis de timidilato'],
['p', 'Varios fármacos contra el cáncer bloquean la síntesis de dTMP. En general, los <b>análogos de nucleótidos</b> (moléculas parecidas a los nucleótidos o a sus precursores) se usan para tratar cáncer, infecciones virales, enfermedades autoinmunes y trastornos como la gota (capítulo 76).'],
['table', ['Fármaco', 'A qué se parece', 'Qué bloquea', 'Consecuencia'], [
['<b>Fluorouracilo</b>', 'Al uracilo', 'La timidilato sintasa. La célula lo convierte en fluorodesoxiuridilato (FdUMP), que se une a la enzima y la inactiva: es un inhibidor suicida', 'No se forma dTMP'],
['<b>Aminopterina</b> y <b>metotrexato</b> (ametopterina)', 'Al folato', 'La dihidrofolato reductasa (DHFR)', 'No se regenera THF → no hay metilen-THF → no se forma dTMP']
]],
['h', 'El folato y las sulfonamidas'],
['p', 'El <b>ácido fólico</b> (vitamina B9) está formado por tres partes: un anillo de <b>pteridina</b>, el <b>ácido para-aminobenzoico (PABA)</b> y uno o varios <b>glutamatos</b> (de 1 a 7). Ya en las células se reduce a tetrahidrofolato (THF), que es la forma que transporta grupos de un carbono: los formilos de la síntesis de purinas (capítulo 73) y el metileno del timidilato.'],
['p', 'Los humanos obtenemos el folato de la dieta, pero muchas bacterias lo fabrican a partir del PABA. Las <b>sulfonamidas</b> (sulfas) son parecidas al PABA: compiten con él y la bacteria no puede fabricar folato. Sin folato no puede hacer purinas ni timidilato, así que no puede copiar su ADN y muere. A nosotros no nos afecta porque no fabricamos folato: lo comemos.'],
['why', 'Una célula que se divide rápido, como una célula tumoral, tiene que copiar todo su ADN y necesita mucho dTTP. Sin timidilato no puede replicar el ADN y deja de dividirse. Las células que no se dividen dependen mucho menos de esta vía.', 'Por qué sirven contra el cáncer'],
['p', 'Ahora se entiende por qué fabricar timina es «más caro» que usar uracilo (capítulo 69): requiere la timidilato sintasa y gasta folato.'],
['check', [
['¿Sobre qué nucleótidos actúa la ribonucleótido reductasa?', 'Sobre los ribonucleótidos difosfato (ADP, GDP, CDP, UDP).'],
['¿De qué molécula se obtiene el dTMP y qué enzima la metila?', 'Del dUMP; lo metila la timidilato sintasa con metilen-THF.'],
['¿Qué enzima bloquea el metotrexato y por qué eso frena la síntesis de dTMP?', 'La DHFR: sin ella no se regenera THF, no hay metilen-THF y la timidilato sintasa no puede trabajar.'],
['¿Se pueden fabricar ribonucleótidos a partir de desoxirribonucleótidos?', 'No. El camino va de ribo a desoxi, nunca al revés.']
]]
]
},
{
n: 76, group: G, pages: '57–58', title: 'Degradación de purinas a urato, gota y vías de rescate',
lead: 'Los humanos degradamos las purinas hasta ácido úrico, que es poco soluble. Si se acumula, cristaliza: eso es la gota, la enfermedad que tenía el emperador Carlos V.',
blocks: [
['h', 'La vía de degradación'],
['fig', F.uric, 'Degradación de purinas hasta urato, el punto donde actúa el alopurinol y el rescate.'],
['img', 'p058-urato', 'AMP → adenosina → inosina → hipoxantina → xantina → ácido úrico ⇄ urato; la guanina también llega a xantina. Los humanos no tenemos la enzima que convierte el urato en alantoína. La gota se debe a cristales de urato; se trata con alopurinol; y la HGPRT recupera bases por rescate.', 58],
['table', ['Paso', 'Enzima', 'Qué entra / qué sale'], [
['AMP → adenosina', 'Nucleotidasa', 'Entra H₂O; sale Pi'],
['Adenosina → inosina', 'Adenosina desaminasa', 'Entra H₂O; sale NH₄⁺ (se quita el amino del C6)'],
['Inosina → hipoxantina', 'Nucleósido fosforilasa', 'Entra Pi; sale ribosa-1-P'],
['Hipoxantina → xantina', 'Xantina oxidasa', 'Entran O₂ y H₂O; sale H₂O₂'],
['Guanina → xantina', 'Guanina desaminasa', 'La guanina, que viene del GMP, también termina en xantina'],
['Xantina → ácido úrico', 'Xantina oxidasa', 'Entran O₂ y H₂O; sale H₂O₂'],
['Ácido úrico ⇄ urato + H⁺', '—', 'A pH fisiológico predomina el urato']
]],
['p', 'La hipoxantina y la xantina son <b>más solubles</b> que el ácido úrico, y la hipoxantina además se puede <b>reciclar</b> por la vía de rescate.'],
['h', '¿Por qué los humanos acumulamos urato?'],
['table', ['Organismos', 'Producto final que eliminan'], [
['Primates (incluidos los humanos), aves, reptiles, insectos', 'Ácido úrico'],
['Otros mamíferos', 'Alantoína: la enzima urato oxidasa transforma el urato (con O₂ y H₂O) en alantoína, CO₂ y H₂O₂']
]],
['why', 'Los humanos no tenemos <b>urato oxidasa</b> (uricasa), la enzima que transforma el urato en alantoína, mucho más soluble. Así que el urato es nuestro producto final, y es poco soluble. Si se produce mucho o, lo más frecuente, el riñón elimina poco, su concentración sube y precipita como <b>cristales de urato</b>. En las articulaciones esos cristales provocan <b>inflamación</b>: eso es la <b>gota</b>.', 'Cómo se llega a la gota'],
['p', 'Las <b>carnes rojas, las vísceras y los mariscos</b> son ricos en ácidos nucleicos y, por lo tanto, en purinas: una dieta con mucho de estos alimentos aporta más purinas para degradar a urato.'],
['img', 'p057-carlos-v', 'Carlos V (1500–1558), emperador del Sacro Imperio Romano Germánico y rey de España, retratado por Tiziano en 1548 (óleo, Pinacoteca Antigua de Múnich). Su dieta era rica en carnes rojas, vísceras y mariscos.', 57],
['ex', 'Carlos V, emperador del Sacro Imperio Romano Germánico, rey de España, Nápoles, Sicilia y Cerdeña, duque de Borgoña, soberano de los Países Bajos y archiduque de Austria, sufría gota. En 2006 un estudio publicado en <i>The New England Journal of Medicine</i> analizó un dedo momificado del emperador y encontró, con microscopía electrónica, <b>cristales de urato</b> en el tejido: la prueba de la enfermedad (N Engl J Med 2006;355:516-520).', 'Un caso histórico'],
['h', 'Tratamiento: alopurinol'],
['p', 'El <b>alopurinol</b> es un <b>análogo de la hipoxantina</b> que se usa para tratar la gota: inhibe la <b>xantina oxidasa</b> como inhibidor suicida.'],
['why', 'Como se parece a la hipoxantina, el alopurinol entra al sitio activo de la xantina oxidasa. La enzima lo transforma en un producto que queda unido a ella y la inactiva: la propia enzima fabrica su inhibidor («inhibidor suicida»). Se forma menos ácido úrico; en su lugar se acumulan hipoxantina y xantina, que son más solubles, y la hipoxantina además puede reciclarse.', 'Por qué funciona'],
['h', 'La vía de rescate'],
['table', ['Base', '+ PRPP →', 'Nucleótido', 'Enzima'], [
['Hipoxantina', '+ PRPP →', 'inosinato (IMP) + PPi', '<b>Hipoxantina-guanina fosforribosiltransferasa</b> (HGPRT)'],
['Guanina', '+ PRPP →', 'guanilato (GMP) + PPi', '<b>Hipoxantina-guanina fosforribosiltransferasa</b> (HGPRT)'],
['Adenina', '+ PRPP →', 'adenilato (AMP) + PPi', 'Adenina fosforribosiltransferasa (APRT)']
]],
['why', 'Cada base que se rescata es una base que no se degrada a urato y un nucleótido que no hay que fabricar «de novo». La salida del pirofosfato (PPi) empuja la reacción hacia adelante.', 'Por qué el rescate baja la producción de urato'],
['check', [
['Nombrá en orden los intermediarios desde AMP hasta ácido úrico.', 'AMP → adenosina → inosina → hipoxantina → xantina → ácido úrico.'],
['¿Qué enzima inhibe el alopurinol?', 'La xantina oxidasa.'],
['¿Por qué los humanos producimos ácido úrico y otros mamíferos alantoína?', 'Porque no tenemos urato oxidasa, la enzima que convierte el urato en alantoína.'],
['¿Qué bases recupera la HGPRT?', 'Hipoxantina (→ IMP) y guanina (→ GMP), usando PRPP.'],
['¿Cuál es la causa más frecuente de acumulación de urato?', 'Que el riñón elimine poco urato.']
]]
]
},
{
n: 77, group: G, pages: '5 y 59', title: 'Nucleótidos dentro de coenzimas y la SAM',
lead: 'Muchas coenzimas llevan un nucleótido «escondido» en su estructura. Con lo que ya sabés podés reconocerlo en cada una.',
blocks: [
['h', 'Coenzimas que transportan electrones'],
['p', 'Muchas coenzimas transportan electrones: participan de la cadena respiratoria y mantienen el equilibrio redox (de óxido-reducción) dentro de la célula. Las más importantes son <b>NADH, NADPH y FADH₂</b>, y todas contienen nucleótidos.'],
['img', 'p059-coenzimas', 'Nucleótidos coenzimáticos. Flavinas: flavina + ribitol → riboflavina; + fosfato → FMN; + AMP → FAD. Piridinas: nucleótido de nicotinamida + nucleótido de adenina → NAD; + fosfato → NADP. Coenzima A: β-mercaptoetilamina + ácido pantoténico + ADP con un fosfato extra en el 3′.', 59],
['table', ['Coenzima', 'Cómo se arma', 'Parte de nucleótido', 'Qué hace'], [
['FMN (flavín mononucleótido)', 'Flavina (base) + ribitol = riboflavina; + fosfato', 'Riboflavina-fosfato (el ribitol es un azúcar-alcohol abierto, no un anillo)', 'Transporta electrones'],
['FAD (flavín adenín dinucleótido)', 'FMN + AMP', 'AMP', 'Transporta electrones; FADH₂ es su forma reducida'],
['NAD (nicotinamida adenín dinucleótido)', 'Nucleótido de nicotinamida + nucleótido de adenina, unidos por sus fosfatos', 'Dos nucleótidos (dinucleótido)', 'Transporta electrones (NADH)'],
['NADP', 'NAD + un fosfato extra', 'El fosfato extra va en el C2′ de la ribosa de la adenosina', 'Transporta electrones para biosíntesis (NADPH)'],
['Coenzima A (CoA)', 'β-mercaptoetilamina + ácido pantoténico + ADP con un fosfato extra en el 3′', 'ADP (3′-fosfato)', 'Su grupo –SH terminal se une a grupos acilo y los transfiere']
]],
['h', 'Las vitaminas que hay detrás'],
['p', 'Varias de estas coenzimas se fabrican a partir de vitaminas del grupo B: por eso esas vitaminas son imprescindibles en la dieta.'],
['table', ['Vitamina', 'Coenzima que forma', 'Detalle'], [
['<b>B2</b> (riboflavina)', 'FMN y FAD', 'Es un anillo de <b>isoaloxazina</b> (una flavina, compuesto nitrogenado) unido a <b>ribitol</b>, un alcohol derivado de la ribosa. La riboflavina es la forma inactiva; fosforilada da FMN, y unida además a un AMP por un pirofosfato da FAD. FMN y FAD son grupos prostéticos de muchas oxidorreductasas, y cada enzima es específica de una de las dos: no son intercambiables.'],
['<b>B3</b> (niacina o vitamina PP)', 'NAD y NADP', 'Tiene dos formas: niacina (anillo de piridina con un –COOH) y niacinamida (con un –CONH₂). El nitrógeno del anillo de nicotinamida es el que acepta o cede el hidrógeno: NAD⁺ ⇄ NADH. Su falta causa pelagra (de ahí «PP», pelagra preventiva): dermatitis, diarrea, demencia y, sin tratamiento, la muerte.'],
['<b>B5</b> (ácido pantoténico)', 'Coenzima A', 'Es ácido pantoico unido a β-alanina. En la CoA, de un lado se une al nucleótido de adenina (ADP 3′-fosfato) y del otro a la β-mercaptoetilamina, cuyo –SH es el grupo funcional que activa a los ácidos grasos y otros grupos acilo.'],
['<b>B9</b> (ácido fólico)', 'THF y sus derivados', 'Transporta grupos de un carbono para fabricar purinas y timidilato (capítulos 73 y 75) y para regenerar la metionina.'],
['<b>B12</b> (cobalamina)', 'Metil-B₁₂ (y otras formas)', 'Tiene un anillo corrinoide con cobalto y una parte parecida a un nucleótido: la base 5,6-dimetilbencimidazol unida a una ribosa (por un enlace α, poco común) con un fosfato en el 3′. Participa en la regeneración de la metionina.']
]],
['trap', 'La coenzima A contiene un nucleótido de adenina, igual que NAD y FAD, pero no transporta electrones: con su grupo –SH forma tioésteres con grupos acilo (como el acetilo de la acetil-CoA) y los transfiere.', 'La coenzima A es distinta'],
['h', 'Intermediarios activados: la SAM'],
['p', 'La <b>S-adenosilmetionina (SAM)</b> es el <b>principal dador de grupos metilo</b> de la célula. Se forma uniendo el aminoácido <b>metionina</b> con la <b>adenosina del ATP</b>.'],
['img', 'p059-sam', 'Ciclo de la SAM: (a) metionina + ATP → SAM; (b) la SAM dona su metilo, por ejemplo a lípidos de membrana neural, y queda homocisteína; la metionina sintasa, con metil-B₁₂, devuelve el metilo a la homocisteína y regenera metionina; el metilo viene del N⁵-metil-THF; la vitamina B₁₂ y el folato vienen de la dieta.', 59],
['steps', 'El ciclo de la SAM', [
'<b>(a) Activación:</b> la metionina se une a la adenosina del ATP y se forma la SAM. Su metilo queda unido a un azufre con carga positiva, listo para ser transferido.',
'<b>(b) Donación:</b> la SAM entrega el metilo a otra molécula (por ejemplo, lípidos de las membranas neuronales o el ADN). Después de perder el metilo y la adenosina queda <b>homocisteína</b>.',
'<b>Regeneración:</b> la <b>metionina sintasa</b> pasa un metilo desde el N⁵-metil-THF (un folato) a la <b>vitamina B₁₂</b> (metil-B₁₂) y de ahí a la homocisteína, que vuelve a ser <b>metionina</b>.',
'El folato queda como THF y se recarga (pasando por metilen-THF) para volver a dar N⁵-metil-THF. La vitamina B₁₂ y el ácido fólico vienen de la dieta.'
]],
['p', 'Uno de los destinos más importantes de esos metilos es la <b>metilación del ADN</b>: agregar metilos a ciertas citosinas del ADN es una forma de regular qué genes se expresan, sin cambiar la secuencia.'],
['check', [
['¿Qué nucleótido forma parte del FAD además de la riboflavina?', 'Un AMP.'],
['¿Qué tiene de particular el ADP de la coenzima A?', 'Lleva un fosfato extra en el C3′.'],
['¿Cómo se forma la SAM?', 'Uniendo metionina con la adenosina del ATP.'],
['¿Qué vitaminas hacen falta para regenerar la metionina desde homocisteína?', 'Vitamina B₁₂ y ácido fólico.'],
['Nombrá un destino de los metilos que dona la SAM.', 'La metilación del ADN (también lípidos de membrana neural).']
]]
]
}
];
