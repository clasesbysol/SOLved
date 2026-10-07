'use strict';
/* Ácidos nucleicos I · Bloque 5: metabolismo de nucleótidos (diapositivas 48–59). Capítulos 72 a 77. */
const { F } = require('./figs-acidos');
const { M } = require('./kit-an');
const G = 'Ácidos nucleicos I';

module.exports = [
{
n: 72, group: G, pages: '48–50', title: 'Metabolismo de nucleótidos: degradación, síntesis «de novo» y rescate',
lead: 'Los nucleótidos se fabrican desde cero o se reciclan a partir de bases ya hechas. Antes de entrar en cada ruta, conviene ver el mapa completo y saber de dónde sale cada átomo.',
blocks: [
['h', 'El mapa general'],
['img', 'p048-metabolismo', 'DNA/RNA → (nucleasas) oligonucleótidos → (fosfodiesterasas) nucleótidos → (nucleotidasas) nucleósidos + Pi → (nucleósido fosforilasa) base + ribosa-1-P. Desde ahí: degradación (ácido úrico) o vías de recuperación. A los nucleótidos llega también la biosíntesis «de novo».', 48],
['fig', F.metab, 'Esquema propio del mismo mapa, con cada enzima sobre su flecha.'],
['steps', 'Cada flecha del mapa', [
'<b>Nucleasas:</b> cortan los enlaces fosfodiéster de ADN y ARN y los parten en <b>oligonucleótidos</b> (cadenas cortas).',
'<b>Fosfodiesterasas:</b> siguen cortando enlaces fosfodiéster hasta liberar <b>nucleótidos</b> sueltos.',
'<b>Nucleotidasas:</b> sacan el fosfato del nucleótido (hidrolizan el enlace fosfoéster): queda un <b>nucleósido + Pi</b>.',
'<b>Nucleósido fosforilasa:</b> rompe el enlace N-glicosídico usando un fosfato (no agua): queda la <b>base libre + ribosa-1-fosfato</b>.',
'La base puede ir a <b>degradación</b> (las purinas terminan en ácido úrico, capítulo 76) o a las <b>vías de recuperación</b>, donde se une a PRPP y vuelve a ser nucleótido.',
'Los nucleótidos (rescatados o fabricados «de novo») se polimerizan para formar nuevo ADN y ARN (flechas violetas).'
]],
['table', ['Rescate (recuadro de la diapositiva)'], [
['Adenine + PRPP → adenylate + PPi (adenina → AMP)'],
['Hypoxanthine + PRPP → inosinate + PPi (hipoxantina → IMP)'],
['Guanine + PRPP → guanylate + PPi (guanina → GMP)']
]],
['h', 'Vías «de novo» y de recuperación'],
['quote', '<b>«De novo»:</b> La mayoría de los organismos pueden sintetizar los nucleótidos que necesitan a partir de precursores de bajo peso molecular. Estas vías «de novo» están muy conservadas en la evolución. <b>Recuperación o rescate:</b> Las vías de recuperación reutilizan bases de purinas y pirimidinas ya formadas. Estas bases provienen de la degradación de ác. nucleicos propios o de la dieta: la degradación puede darse intracelularmente o por digestión de ácidos nucleicos de la dieta (animales). En animales la hidrólisis extracelular a partir de la ingesta representa la ruta principal de importación de bases y nucleósidos. En la catálisis participan endonucleasas, que digieren los ácidos nucleicos en el intestino delgado. Se producen mononucleótidos. Si las bases o nucleósidos no son utilizados para síntesis de ácidos nucleicos por la vía de recuperación, se degradan a ácido úrico (purinas) o beta-ureidopropionato (pirimidinas).', 49],
['cols', [
['«De novo» (desde cero)', 'Se arman las bases a partir de moléculas chicas (aminoácidos, CO₂, derivados del folato). Es largo y gasta mucho ATP. Está muy conservado: casi todos los organismos lo hacen igual.'],
['Recuperación o rescate', 'Se reutilizan bases ya formadas (de ácidos nucleicos propios que se degradan o de la dieta). Es mucho más barato: un solo paso con PRPP.']
]],
['why', 'Fabricar una purina «de novo» cuesta muchos pasos y varios ATP (capítulo 73). Si la célula ya tiene la base armada, unirla al PRPP en un solo paso es un enorme ahorro. Por eso, antes de degradar una base hasta ácido úrico, la célula intenta reciclarla.', 'Por qué existe el rescate'],
['note', 'En la digestión participan varias enzimas: nucleasas (endonucleasas pancreáticas, entre otras), fosfodiesterasas y nucleotidasas o fosfatasas, como en el esquema de la diapositiva 48. Las endonucleasas inician el corte; la producción de mononucleótidos y de nucleósidos es el resultado del conjunto.', 'digestión'],
['h', '¿De dónde vienen los átomos?'],
['quote', 'El anillo de purina es sintetizado a partir de aminoácidos, derivados del tetrahidrofolato y CO₂. El anillo de pirimidina es más simple, es sintetizado a partir de carbamoil fosfato y aspartato.', 50],
['gallery', [['p050-atomos-purina', 'Purina: amina del aspartato, HCO₃⁻, glicina, formato (×2) y amida de la glutamina (×2)'], ['p050-atomos-pirimidina', 'Pirimidina: amida de la glutamina y HCO₃⁻ (vía carbamoil fosfato) y aspartato']], 50],
['table', ['Anillo', 'Átomo', 'De dónde viene'], [
['Purina', 'N1', 'Grupo amino del aspartato'],
['Purina', 'C2 y C8', 'Formato (transportado por el tetrahidrofolato, N¹⁰-formil-THF)'],
['Purina', 'N3 y N9', 'Nitrógeno amida de la glutamina'],
['Purina', 'C4, C5 y N7', 'Glicina (entra entera)'],
['Purina', 'C6', 'HCO₃⁻ (CO₂)'],
['Pirimidina', 'N1, C4, C5 y C6', 'Aspartato'],
['Pirimidina', 'C2', 'HCO₃⁻, a través del carbamoil fosfato'],
['Pirimidina', 'N3', 'Amida de la glutamina, a través del carbamoil fosfato']
]],
['ex', 'Purina (9 átomos): glicina 3 + glutamina 2 + formato 2 + aspartato 1 + CO₂ 1 = 9. Pirimidina (6 átomos): aspartato 4 + carbamoil fosfato 2 = 6. Si al contar no te da el total, te olvidaste de alguna fuente.', 'Para controlar que no falte nada'],
['h', 'PRPP: el dador de la ribosa'],
['quote', 'En ambos casos: 5-fosforibosil-1-pirofosfato o PRPP es el dador de la unidad de ribosa presente en todos los nucleótidos.', 50],
['img', 'p050-prpp', 'Ribosa 5-fosfato (que viene de la vía de las pentosas) + ATP → PRPP + AMP, catalizado por la PRPP sintetasa.', 50],
['math', String.raw`\text{ribosa-5-P} + \text{ATP} \xrightarrow{\ \text{PRPP sintetasa}\ } \text{PRPP} + \text{AMP}`, 'ribosa-5-P + ATP → (PRPP sintetasa) → PRPP + AMP'],
['why', 'La PRPP sintetasa transfiere un pirofosfato (dos fosfatos juntos) desde el ATP al C1 de la ribosa-5-fosfato; por eso el ATP queda como AMP. Ese pirofosfato es un gran «grupo saliente»: cuando después una base (o el anillo en construcción) se une al C1, sale el pirofosfato (PPi) y la reacción queda favorecida. La ribosa-5-fosfato viene de la vía de las pentosas fosfato.', 'Por qué PRPP es una ribosa «activada»'],
['check', [
['¿Qué enzima convierte un nucleósido en base + ribosa-1-P?', 'La nucleósido fosforilasa (usa Pi).'],
['¿De qué aminoácido vienen tres átomos juntos del anillo de purina?', 'De la glicina (C4, C5 y N7).'],
['¿Cuáles son los dos precursores directos del anillo de pirimidina?', 'Carbamoil fosfato y aspartato.'],
['¿A qué se degradan las purinas y las pirimidinas que no se reciclan?', 'Purinas a ácido úrico; pirimidinas a β-ureidopropionato.']
]]
]
},
{
n: 73, group: G, pages: '51–53', title: 'Síntesis de purinas: de PRPP a IMP, AMP y GMP, y su regulación',
lead: 'Las purinas se construyen átomo por átomo directamente sobre la ribosa. Es una vía larga y cara, así que la célula la controla con frenos en la entrada y en cada rama.',
blocks: [
['h', 'Dos estrategias distintas'],
['quote', 'PRPP es el dador de la unidad de ribosa presente en los nucleótidos. Pu: el anillo de purina es ensamblado sobre la ribosa fosfato. Py: el anillo de pirimidina es sintetizado (por separado) y luego adquiere el grupo ribosa fosfato (dador: PRPP).', 51],
['img', 'p051-estrategias', 'Izquierda (purinas): el anillo se arma sobre la ribosa-P con aspartato, CO₂, glicina, N¹⁰-formil-tetrahidrofolato (×2) y glutamina (×2); 10 u 11 reacciones hasta el IMP (inosina monofosfato o inosinato) = 1.ª etapa; luego ATP y GTP (para ARN) y dATP y dGTP (para ADN) = 2.ª etapa. Derecha (pirimidinas): bicarbonato + NH₃ + 2 ATP → carbamoil fosfato; con aspartato se forma el anillo; recién entonces recibe PRPP → UTP → CTP (para ARN); TTP y dCTP (para ADN).', 51],
['table', ['', 'Purinas', 'Pirimidinas'], [
['¿Cuándo entra la ribosa (PRPP)?', 'Al principio: el anillo se ensambla sobre ella', 'Al final: el anillo se arma solo y después se une al PRPP'],
['Primer nucleótido completo', 'IMP (inosinato)', 'OMP (orotidilato), que da UMP'],
['Productos', 'AMP y GMP → ATP, GTP, dATP, dGTP', 'UMP → UTP → CTP; dCTP y dTTP'],
['Paso comprometido', 'PRPP + glutamina → 5-fosforibosil-1-amina', 'Formación de carbamoilaspartato'],
['Capítulo', '73', '74']
]],
['h', 'Un desvío para el café'],
['quote', 'La cafeína es un derivado de la purina: Purina → Xantina → 1,3,7-trimetilxantina (cafeína). Les gusta el café?', 51],
['img', 'p051-cafeina', 'Cafeína (1,3,7-trimetilxantina): el esqueleto de purina con dos carbonilos (como la xantina) y tres metilos en los nitrógenos 1, 3 y 7.', 51],
['note', 'La flecha «purina → xantina → cafeína» muestra una relación de estructura: la cafeína es una xantina con tres metilos. No es una ruta metabólica humana (la cafeína la fabrican las plantas).', 'cafeína'],
['h', 'La regulación y el paso comprometido'],
['quote', 'La conversión de PRPP + glutamina en 5-fosforibosil-1-amina por la enz. glutamina-PRPP amidotransferasa es el <b>paso comprometido</b> en la biosíntesis de nucleótidos de purina (una vez que se forma *, ya no puede ir hacia otras rutas).', 52],
['img', 'p052-regulacion', 'Ribosa 5-fosfato → PRPP → fosforribosilamina (*) → IMP → adenilosuccinato → AMP y xantilato → GMP. El PRPP también puede ir a histidina y a nucleótidos de pirimidina. RETROINHIBICIÓN: IMP, AMP y GMP son inhibidores de la síntesis de purinas. Recuadro: «AMP también inhibe la formación de su precursor inmediato, lo mismo que GMP».', 52],
['fig', F.purines, 'Esquema propio de la vía con sus frenos (⊖) y el cruce de energía entre las dos ramas.'],
['why', 'El PRPP no es exclusivo de las purinas: también se usa para fabricar histidina, pirimidinas y para el rescate. Si el freno estuviera antes del PRPP, al cortar las purinas se cortarían también esas otras rutas. La primera molécula que <b>solo</b> sirve para hacer purinas es la 5-fosforibosil-1-amina: por eso la enzima que la forma es el punto de control lógico.', 'Por qué el paso comprometido está después del PRPP'],
['steps', 'Los frenos de la vía', [
'<b>En la entrada:</b> IMP, AMP y GMP (los productos) inhiben la glutamina-PRPP amidotransferasa. Si sobran purinas, se deja de empezar la vía.',
'<b>En la rama del AMP:</b> el AMP inhibe la formación de su precursor inmediato (adenilosuccinato).',
'<b>En la rama del GMP:</b> el GMP inhibe la formación de su precursor inmediato (xantilato, XMP).',
'Así, si sobra AMP pero falta GMP, el IMP se desvía hacia GMP, y viceversa.'
]],
['h', 'De IMP a AMP y a GMP'],
['img', 'p052-amp-gmp', 'AMP y GMP se forman a partir de IMP. Arriba: inosinato + aspartato (con GTP → GDP + Pi) → adenilosuccinato → (sale fumarato) → adenilato (AMP). Abajo: inosinato + NAD⁺ + H₂O → (NADH + H⁺) xantilato (XMP) → con glutamina → glutamato y ATP → AMP + PPi → guanilato (GMP).', 52],
['quote', 'AMP se genera por adición de un grupo amino en el C-6. GTP dador de energía para el intermediario. GMP es sintetizado por oxidación de inosinato, seguido por la inserción de un grupo NH₂ en C-2. Requiere ATP.', 52],
['table', ['Rama', 'Qué se agrega', 'Quién lo dona', 'Energía', 'Producto'], [
['IMP → AMP', 'Grupo amino en el C6 (reemplaza al C=O)', 'Aspartato (luego sale como fumarato)', '<b>GTP</b> → GDP + Pi', 'Adenilato (AMP)'],
['IMP → GMP', 'Primero oxidación en C2 (IMP → XMP); después NH₂ en el C2', 'NAD⁺ (oxidante) y glutamina (→ glutamato)', '<b>ATP</b> → AMP + PPi', 'Guanilato (GMP)']
]],
['why', 'Para hacer AMP se gasta GTP, y para hacer GMP se gasta ATP. Si hay mucho ATP, eso «financia» la síntesis de GMP; si hay mucho GTP, financia la de AMP. Así las dos poblaciones tienden a equilibrarse.', 'Por qué cada rama usa la energía de la otra'],
['h', 'Los pasos de la síntesis de IMP: vía larga y costosa en energía'],
['img', 'p053-imp', 'Los nueve pasos desde la fosforribosilamina hasta el inosinato (IMP), con la tabla de enzimas. «La base purínica del inosinato se denomina HIPOXANTINA».', 53],
['table', ['Paso', 'Qué entra (y qué sale)', 'Producto', 'Enzima (tabla original)'], [
['1', 'Glicina + ATP (→ ADP + Pi)', 'Glicinamida ribonucleótido (GAR)', 'GAR sintetasa (Glycinamide ribonucleotide synthetase)'],
['2', 'Formilo del N¹⁰-formil-THF (→ THF)', 'Formilglicinamida ribonucleótido (FGAR)', 'GAR transformilasa (GAR transformylase)'],
['3', 'Glutamina + ATP (→ glutamato, ADP + Pi)', 'Formilglicinamidina ribonucleótido (FGAM)', 'Formilglicinamidina sintasa (Formylglycinamidine synthase)'],
['4', 'ATP (→ ADP + Pi); cierra el anillo de cinco', '5-aminoimidazol ribonucleótido (AIR)', 'Aminoimidazol ribonucleótido sintetasa (Aminoimidazole ribonucleotide synthetase)'],
['5', 'HCO₃⁻ + ATP (→ ADP + Pi), según el dibujo', 'Carboxiaminoimidazol ribonucleótido (CAIR)', 'Carboxiaminoimidazol ribonucleótido sintetasa (Carboxyaminoimidazole ribonucleotide synthetase)'],
['6', 'Aspartato + ATP (→ ADP + Pi)', '5-aminoimidazol-4-(N-succinilcarboxamida) ribonucleótido (SAICAR)', 'Succinilaminoimidazol carboxamida ribonucleótido sintetasa (Succinylaminoimidazole carboxamide ribonucleotide synthetase)'],
['7', 'Sale fumarato', '5-aminoimidazol-4-carboxamida ribonucleótido (AICAR)', 'Adenilosuccinato liasa (Adenylosuccinate lyase)'],
['8', 'Formilo del N¹⁰-formil-THF (→ THF)', '5-formaminoimidazol-4-carboxamida ribonucleótido (FAICAR)', 'Aminoimidazol carboxamida ribonucleótido transformilasa (Aminoimidazole carboxamide ribonucleotide transformylase)'],
['9', 'Sale H₂O; cierra el anillo de seis', '<b>Inosinato (IMP)</b>, cuya base es la hipoxantina', 'Inosina monofosfato ciclohidrolasa (Inosine monophosphate cyclohydrolase)']
]],
['note', 'Los 9 pasos dibujados empiezan <b>después</b> de formar la 5-fosforribosil-1-amina. Por eso la clase habla de «10 u 11 reacciones» para toda la vía: a los 9 se suma la amidotransferasa (10) y, según cómo se cuente, la formación de PRPP o la carboxilación del paso 5, que en bacterias ocurre en dos reacciones (11).', '¿9, 10 u 11 pasos?'],
['steps', 'Por qué es «costosa en energía»: contá en el dibujo', [
'Formar PRPP: 1 ATP que se convierte en AMP (se gastan dos enlaces fosfoanhídrido).',
'Pasos 1, 3, 4, 5 y 6: un ATP cada uno → 5 ATP.',
'Además se consumen dos glutaminas (amidotransferasa y paso 3), una glicina, un aspartato, dos formilos del folato y un CO₂.',
'Y todavía falta convertir IMP en AMP (1 GTP) o en GMP (1 ATP). Comparado con el rescate (un solo paso con PRPP), la diferencia es enorme.'
]],
['check', [
['¿Qué enzima cataliza el paso comprometido de la síntesis de purinas?', 'La glutamina-PRPP amidotransferasa (PRPP + glutamina → 5-fosforibosil-1-amina).'],
['¿Qué moléculas la inhiben?', 'IMP, AMP y GMP (retroinhibición).'],
['¿Cuál es la base del IMP?', 'La hipoxantina.'],
['¿Qué nucleótido aporta la energía para hacer AMP? ¿Y para hacer GMP?', 'GTP para AMP; ATP para GMP.'],
['¿En qué se diferencian las estrategias para purinas y pirimidinas?', 'Las purinas se arman sobre la ribosa-P (PRPP al principio); las pirimidinas arman el anillo por separado y después lo unen al PRPP.']
]]
]
},
{
n: 74, group: G, pages: '51 y 54', title: 'Síntesis de pirimidinas y su regulación',
lead: 'La vía de las pirimidinas es más corta: primero se arma el anillo con carbamoil fosfato y aspartato, y recién al final se le pega la ribosa.',
blocks: [
['img', 'p054-pirimidinas', 'Aspartato + carbamoil fosfato → (ATCasa) carbamoilaspartato → → → UMP → UDP → UTP → CTP (CTP sintetasa). Abajo: orotato + PRPP → orotidilato (nucleótido de pirimidina). Arriba: regulada por inhibición de CTP de la ATCasa (aspartato transcarbamilasa), RETROINHIBICIÓN; ATP con signo ⊕.', 54],
['quote', '· El paso comprometido en la síntesis de pirimidinas es la formación de carbamoilaspartato. · Luego se forma orotato que recién entonces se une al PRPP para dar orotidilato. · Decarboxilación de orotidilato (nucleótido de pirimidina) da UMP y CTP es luego formado por aminación de UTP.', 54],
['fig', F.pyrimidines, 'Esquema propio de la vía y su regulación.'],
['steps', 'La vía paso a paso', [
'<b>Carbamoil fosfato:</b> bicarbonato + el nitrógeno de la glutamina + 2 ATP (diapositiva 51).',
'<b>Carbamoilaspartato:</b> la <b>ATCasa</b> (aspartato transcarbamilasa) une carbamoil fosfato y aspartato. Es el <b>paso comprometido</b>.',
'<b>Dihidroorotato → orotato:</b> se cierra el anillo y se oxida. El orotato es una pirimidina libre, todavía sin azúcar.',
'<b>Orotato + PRPP → orotidilato (OMP):</b> recién ahora entra la ribosa-5-fosfato. Es el primer nucleótido de pirimidina.',
'<b>OMP → UMP:</b> se descarboxila (sale CO₂).',
'<b>UMP → UDP → UTP:</b> se agregan fosfatos (quinasas).',
'<b>UTP → CTP:</b> la CTP sintetasa agrega un grupo amino (aminación; el NH₂ viene de la glutamina).'
]],
['h', 'La regulación'],
['why', 'El CTP es el producto final de la vía. Cuando se acumula, se une a la ATCasa y la frena: si ya hay suficiente CTP, no tiene sentido seguir comprometiendo aspartato y carbamoil fosfato. El ATP, en cambio, la activa (⊕ en el dibujo): señal de que hay energía y de que se necesitan pirimidinas para acompañar a las purinas.', 'Por qué el CTP frena la ATCasa'],
['note', 'El control de la ATCasa por CTP (y su activación por ATP) es el ejemplo clásico, estudiado en la bacteria <i>E. coli</i>. En los mamíferos el control principal de la vía está en el paso anterior, la síntesis de carbamoil fosfato.', 'en humanos'],
['note', 'En la diapositiva aparece «oritidilato» y «transcarbomilasa»: son erratas de <b>orotidilato</b> y <b>transcarbamilasa</b>.', 'erratas'],
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
lead: 'Para hacer ADN hacen falta desoxirribonucleótidos, y la timina pide un paso extra. Justamente ese paso es el blanco de varios fármacos contra el cáncer.',
blocks: [
['h', 'De ribo a desoxi'],
['quote', 'Desoxinucleótidos se sintetizan por reducción de ribonucleótidos y, en el caso de dTMP se forma por metilación de dUMP.', 55],
['img', 'p055-reductasa', 'ADP, GDP, CDP y UDP → ribonucleótido reductasa (Ribonucleotide reductase) → dADP, dGDP, dCDP y dUDP (productos de la reductasa) → procesamiento posterior (Further processing yields dNTP) → dATP, dGTP, dCTP y TTP.', 55],
['fig', F.dntp, 'Esquema propio: la reductasa trabaja sobre difosfatos; la timina sigue un camino aparte.'],
['steps', 'Qué hay que entender del dibujo', [
'La <b>ribonucleótido reductasa</b> quita el oxígeno del C2′ (reduce la ribosa a desoxirribosa). Actúa sobre los <b>difosfatos</b>: ADP, GDP, CDP, UDP.',
'Los productos (dADP, dGDP, dCDP, dUDP) se fosforilan después a trifosfatos (dATP, dGTP, dCTP). No se pasa de ribonucleótido a dNTP en un solo paso.',
'La reductasa no fabrica timina: no hay ribo-timidina que reducir. El dTTP sale del dUDP por un camino extra.'
]],
['quote', 'El dTMP requiere un paso extra: dUDP pasa a dUTP, y la dUTPasa lo hidroliza enseguida a dUMP (evita que el uracilo entre al ADN). Así se obtiene el dUMP que la timidilato sintasa va a metilar.', 55],
['why', 'La ADN polimerasa no distingue bien dUTP de dTTP. Si hubiera mucho dUTP en la célula, se metería uracilo en el ADN a cada rato. La dUTPasa mantiene el dUTP casi en cero y, de paso, deja dUMP listo para fabricar timidilato.', 'Por qué la dUTPasa es tan importante'],
['quote', 'No hay ribonucleótidos que se formen de desoxirribonucleótidos (RNA world).', 55],
['p', 'El camino va siempre de ribo a desoxi, nunca al revés. La clase lo relaciona con la hipótesis del <b>mundo de ARN</b>: el ARN habría aparecido primero en la evolución (puede guardar información y también catalizar reacciones), y el ADN después, como una versión más estable para guardar información. Por eso la maquinaria fabrica primero ribonucleótidos y recién de ellos obtiene los desoxi.'],
['note', 'La figura dice «TTP»; es el dTTP (la timidina se encuentra en el ADN, por eso a veces se omite la d, como en el capítulo 62).', 'TTP = dTTP'],
['h', 'Síntesis de timidilato y drogas que la bloquean'],
['quote', 'dTMP se forma por metilación de dUMP usando N⁵,N¹⁰-metilen-THF.', 56],
['img', 'p056-timidilato', 'dUMP → dTMP (timidilato sintasa). El N⁵,N¹⁰-metilen-tetrahidrofolato pasa a dihidrofolato; la dihidrofolato reductasa (con NADPH + H⁺ → NADP⁺) regenera tetrahidrofolato; serina → glicina vuelve a formar metilen-THF. Fluorouracilo → fluorodesoxiuridilato (inhibidor suicida) bloquea la timidilato sintasa; aminopterina y metotrexato (ametopterina) bloquean la dihidrofolato reductasa.', 56],
['fig', F.thymidylate, 'Esquema propio del ciclo del timidilato con los dos puntos de bloqueo.'],
['steps', 'El ciclo, flecha por flecha', [
'<b>Timidilato sintasa (TS):</b> pasa un grupo de un carbono del N⁵,N¹⁰-metilen-THF al C5 del uracilo del dUMP y lo deja como metilo: se forma <b>dTMP</b>. Para reducir ese carbono a metilo, el folato cede además electrones y queda como <b>dihidrofolato (DHF)</b>.',
'<b>Dihidrofolato reductasa (DHFR):</b> reduce el DHF a <b>tetrahidrofolato (THF)</b> usando NADPH + H⁺.',
'<b>Serina → glicina:</b> la serina le cede un carbono al THF y lo convierte otra vez en N⁵,N¹⁰-metilen-THF. El ciclo vuelve a empezar.',
'Sin DHFR, todo el folato queda atrapado como DHF y la TS se queda sin dador de metilo.'
]],
['quote', '• Varias drogas anticáncer bloquean la síntesis de timidilato (dTMP): • Fluorouracilo, un inhibidor de la timidilato sintasa, es usado como droga en cáncer. • DHFR cataliza la reacción de regeneración de THF y es inhibida por análogos de folato, por ej: aminopterina y metotrexato. · Análogos de nucleótidos son drogas utilizadas en el tratamiento de cáncer, infecciones virales, enfermedades autoinmunes y desórdenes genéticos como la gota (next slide).', 56],
['table', ['Fármaco', 'A qué se parece', 'Qué bloquea', 'Consecuencia'], [
['Fluorouracilo', 'Al uracilo', 'Timidilato sintasa (como fluorodesoxiuridilato, FdUMP: inhibidor suicida)', 'No se forma dTMP'],
['Aminopterina y metotrexato (ametopterina)', 'Al folato', 'Dihidrofolato reductasa (DHFR)', 'No se regenera THF → no hay metilen-THF → no se forma dTMP']
]],
['why', 'Una célula que se divide rápido (como una célula tumoral) tiene que copiar todo su ADN y necesita mucho dTTP. Sin timidilato no puede replicar el ADN y deja de dividirse. Las células que no se dividen dependen mucho menos de esta vía.', 'Por qué estas drogas sirven contra el cáncer'],
['note', 'El fluorouracilo actúa a través de un metabolito: la célula lo convierte en fluorodesoxiuridilato (FdUMP), que es el que se une a la timidilato sintasa y la inactiva («inhibidor suicida»). En la diapositiva figura «metrotexate»: el nombre correcto es <b>metotrexato</b>.', 'precisiones'],
['p', 'Esta vía conecta con el capítulo 69: «fabricar T requiere un paso extra (la timidilato sintasa, con gasto de folato)». Ahora ya sabés cuál es ese paso y por qué gasta folato.'],
['check', [
['¿Sobre qué nucleótidos actúa la ribonucleótido reductasa?', 'Sobre los ribonucleótidos difosfato (ADP, GDP, CDP, UDP).'],
['¿De qué molécula se obtiene el dTMP y quién la metila?', 'Del dUMP; lo metila la timidilato sintasa con N⁵,N¹⁰-metilen-THF.'],
['¿Qué enzima bloquea el metotrexato y por qué eso frena la síntesis de dTMP?', 'La DHFR: sin ella no se regenera THF, no hay metilen-THF y la timidilato sintasa no puede trabajar.'],
['¿Se pueden fabricar ribonucleótidos a partir de desoxirribonucleótidos?', 'No. El camino va de ribo a desoxi, nunca al revés.']
]]
]
},
{
n: 76, group: G, pages: '57–58', title: 'Degradación de purinas a urato, gota (Carlos V) y vías de rescate',
lead: 'Los humanos degradamos las purinas hasta ácido úrico, que es poco soluble. Si se acumula, cristaliza: eso es la gota, la enfermedad que padecía el emperador Carlos V.',
blocks: [
['h', '¿Por qué la clase muestra esta pintura?'],
['img', 'p057-carlos-v', 'Retrato de Carlos V atribuido a Tiziano (1548). Óleo sobre lienzo, 205 × 122 cm. Pinacoteca Antigua de Múnich. Recuadro: «Las carnes rojas, las vísceras y los mariscos son ricos en ácidos nucleicos, y por lo tanto en purinas».', 57],
['p', '<b>Carlos V</b> vivió entre 1500 y 1558. Fue emperador del Sacro Imperio Romano Germánico, rey de España, Nápoles, Sicilia y Cerdeña, duque de Borgoña, soberano de los Países Bajos y archiduque de Austria. La diapositiva lo presenta con la pregunta: «Carlos V y las alteraciones en el metabolismo de nucleótidos que pueden causar patologías. ¿Por qué les muestro esta pintura?». La respuesta está en la diapositiva siguiente: tenía gota.'],
['h', 'Las purinas en humanos se degradan a urato'],
['img', 'p058-urato', 'AMP → adenosina → inosina → hipoxantina → xantina → ácido úrico ⇄ urato. La guanina también llega a xantina. Recuadros: los humanos no tenemos la enzima que convierte el urato en alantoína (mucho más soluble); GOTA (cristales de uratos, inflamación), mayormente se debe a que el riñón elimina poco urato; TRATAMIENTO: alopurinol; VÍA DE RESCATE con la hipoxantina-guanina fosforribosiltransferasa; el artículo del NEJM de 2006.', 58],
['fig', F.uric, 'Esquema propio de la degradación de purinas, el punto donde actúa el alopurinol y el rescate.'],
['table', ['Paso', 'Enzima', 'Qué entra / qué sale'], [
['AMP → adenosina', 'Nucleotidasa', 'Entra H₂O; sale Pi'],
['Adenosina → inosina', 'Adenosina desaminasa', 'Entra H₂O; sale NH₄⁺ (se quita el amino del C6)'],
['Inosina → hipoxantina', 'Nucleósido fosforilasa', 'Entra Pi; sale ribosa-1-P'],
['Hipoxantina → xantina', 'Xantina oxidasa', 'Entran O₂ y H₂O; sale H₂O₂'],
['Guanina → xantina', '(flecha del dibujo)', 'La guanina, que viene del GMP, también termina en xantina'],
['Xantina → ácido úrico', 'Xantina oxidasa', 'Entran H₂O y O₂; sale H₂O₂'],
['Ácido úrico ⇄ urato + H⁺', '—', 'A pH fisiológico predomina la forma urato']
]],
['p', 'En el dibujo, hipoxantina y xantina aparecen marcadas como «<b>más solubles y reciclables</b>»: son más solubles que el ácido úrico y la hipoxantina puede volver a ser nucleótido por rescate.'],
['h', '¿Por qué nosotros acumulamos urato?'],
['table', ['Organismos', 'Producto final que excretan'], [
['Primates, aves, reptiles, insectos', 'Ácido úrico'],
['Otros mamíferos', 'Alantoína (la urato oxidasa convierte el urato: 2 H₂O + O₂ entran, salen CO₂ + H₂O₂)']
]],
['why', 'Los humanos no tenemos la enzima <b>urato oxidasa</b> (uricasa), que transforma el urato en alantoína, mucho más soluble. Así que el urato es nuestro producto final, y es poco soluble. Si se produce mucho o el riñón elimina poco (la causa más frecuente según la clase), su concentración sube y precipita como <b>cristales de urato</b>. En las articulaciones, esos cristales provocan <b>inflamación</b>: eso es la <b>gota</b>.', 'Cómo se llega a la gota'],
['ex', 'En 2006, un artículo de la revista <i>N Engl J Med</i> analizó un dedo momificado de Carlos V y confirmó que sufría de gota. El estudio encontró cristales de urato por microscopía electrónica en la carne del dedo, lo que demostraba la presencia de la enfermedad. <i>N Engl J Med</i> 2006;355:516-520. DOI: 10.1056/NEJMon060780.', 'Carlos V tenía gota'],
['p', 'La dieta del emperador, rica en carnes rojas, vísceras y mariscos (alimentos ricos en ácidos nucleicos y por lo tanto en purinas), aportaba muchas purinas para degradar.'],
['h', 'Tratamiento: alopurinol'],
['quote', 'TRATAMIENTO: Alopurinol, un análogo de la hipoxantina, se da para la gota (inhibidor suicida de la enz. Xantina oxidasa).', 58],
['why', 'El alopurinol se parece a la hipoxantina, así que entra al sitio activo de la xantina oxidasa. La enzima lo transforma en un producto que queda unido y la inactiva («inhibidor suicida»: la enzima fabrica su propio inhibidor). Se forma menos ácido úrico, y en su lugar se acumulan hipoxantina y xantina, que son más solubles, y la hipoxantina además puede reciclarse por rescate.', 'Por qué funciona'],
['h', 'La vía de rescate'],
['table', ['Base', '+ PRPP →', 'Nucleótido', 'Enzima'], [
['Adenina', '+ PRPP →', 'adenilato (AMP) + PPi', 'Adenina fosforribosiltransferasa (ampliación: APRT)'],
['Hipoxantina', '+ PRPP →', 'inosinato (IMP) + PPi', '<b>Hipoxantina-guanina fosforribosiltransferasa</b> (HGPRT)'],
['Guanina', '+ PRPP →', 'guanilato (GMP) + PPi', '<b>Hipoxantina-guanina fosforribosiltransferasa</b> (HGPRT)']
]],
['why', 'Cada base que se rescata es una base que no se degrada a urato y un IMP o GMP que no hay que fabricar «de novo». La salida del PPi (pirofosfato) hace que la reacción avance.', 'Por qué el rescate baja la producción de urato'],
['note', 'La información clínica es la de la clase, para entender la bioquímica; no es una indicación médica. Tampoco toda gota tiene un origen genético: según la clase, lo más frecuente es que el riñón elimine poco urato.', 'alcance'],
['check', [
['Nombrá en orden los intermediarios desde AMP hasta ácido úrico.', 'AMP → adenosina → inosina → hipoxantina → xantina → ácido úrico.'],
['¿Qué enzima inhibe el alopurinol?', 'La xantina oxidasa.'],
['¿Por qué los humanos producen ácido úrico y otros mamíferos alantoína?', 'Porque no tenemos urato oxidasa, la enzima que convierte el urato en alantoína.'],
['¿Qué bases recupera la HGPRT?', 'Hipoxantina (→ IMP) y guanina (→ GMP), usando PRPP.']
]]
]
},
{
n: 77, group: G, pages: '5 y 59', title: 'Nucleótidos dentro de coenzimas y la SAM',
lead: 'Muchas coenzimas llevan un nucleótido «escondido» en su estructura. Con lo que ya sabés podés reconocerlo en cada una.',
blocks: [
['h', 'Electrones'],
['quote', 'Muchas coenzimas transportan electrones. Actúan como reguladores de la cadena respiratoria celular. Intervienen en el equilibrio redox intracelular. Ejemplos: NADPH, FADH, NADH y Coenzima A.', 59],
['img', 'p059-coenzimas', 'Nucleótidos coenzimáticos. Nucleótidos de flavina: flavina (base nitrogenada) + ribitol (pentosa) → riboflavina (nucleósido); + fosfato → FMN (flavin-mononucleótido); + AMP → FAD (flavin-adenin-dinucleótido). Nucleótidos de piridina: nucleótido de nicotinamida + nucleótido de adenina → NAD (nicotin-adenin-dinucleótido); + fosfato → NADP. Coenzima A: β-mercaptoetilamina + ácido pantoténico + ADP. «Coenzima A contiene ADP con un fosfato extra en el 3′».', 59],
['table', ['Coenzima', 'Cómo se arma (diapositiva)', 'Parte de nucleótido', 'Qué hace'], [
['FMN', 'Flavina + ribitol = riboflavina; + fosfato', 'Riboflavina-fosfato (el ribitol es un azúcar-alcohol abierto)', 'Transporta electrones'],
['FAD', 'FMN + AMP', 'AMP', 'Transporta electrones (FADH₂ es su forma reducida)'],
['NAD', 'Nucleótido de nicotinamida + nucleótido de adenina', 'Dos nucleótidos unidos por sus fosfatos (dinucleótido)', 'Transporta electrones (NADH)'],
['NADP', 'NAD + un fosfato', 'El fosfato extra va en el 2′ de la ribosa de la adenosina', 'Transporta electrones para biosíntesis (NADPH)'],
['Coenzima A', 'β-mercaptoetilamina + ácido pantoténico + ADP con un fosfato extra en el 3′', 'ADP (3′-fosfato)', 'Su –SH terminal se une a grupos acilo y los transfiere']
]],
['note', 'La clase incluye a la Coenzima A en el grupo de «electrones», pero su función no es transportar electrones: con su grupo –SH forma tioésteres con grupos acilo (como el acetilo de la acetil-CoA) y los transfiere. Lo que comparte con NAD y FAD es que contiene un nucleótido de adenina.', 'Coenzima A'],
['h', 'Intermediarios activados: la SAM'],
['quote', 'S-adenosilmetionina (SAM), principal dador de grupos metilo de la célula. Para regenerarla, la homocisteína vuelve a metionina gracias a la vitamina B12 y ác. fólico. Se forma uniendo metionina con la adenosina del ATP. ¿Cuál es uno de los destinos de esos metilos que aporta SAM? <b>Metilación del DNA.</b>', 59],
['img', 'p059-sam', 'Ciclo de la SAM: (a) metionina + ATP → SAM («se forma uniendo metionina con la adenosina del ATP»); (b) la SAM dona su metilo (por ejemplo, a lípidos de membrana neural) y, al liberar la adenosina, queda homocisteína; la metionina sintasa, con metil-B₁₂, devuelve el metilo a la homocisteína y regenera metionina; el metilo viene del N⁵-metil-THF, que vuelve a THF; B₁₂ y folato vienen de la dieta.', 59],
['steps', 'El ciclo de la SAM', [
'<b>(a) Activación:</b> la metionina se une a la adenosina del ATP y se forma la <b>S-adenosilmetionina</b>. Su metilo queda unido a un azufre con carga positiva: listo para ser transferido.',
'<b>(b) Donación:</b> la SAM entrega el metilo a otra molécula (lípidos de membrana neural, ADN y muchas otras). Después de perder el metilo y la adenosina queda <b>homocisteína</b>.',
'<b>Regeneración:</b> la <b>metionina sintasa</b> pasa un metilo desde el N⁵-metil-THF (folato) a la vitamina B₁₂ (metil-B₁₂) y de ahí a la homocisteína: vuelve a ser <b>metionina</b>.',
'El folato queda como THF, que se recarga (pasando por N⁵,N¹⁰-metilen-THF) para dar otra vez N⁵-metil-THF. B₁₂ y ácido fólico vienen de la dieta.'
]],
['p', 'Uno de los destinos de esos metilos es la <b>metilación del ADN</b>: agregar metilos a ciertas citosinas del ADN es una forma de regular qué genes se expresan.'],
['table', ['Nucleótido-coenzima', 'Función de la clase'], [
['ATP, GTP', 'Energía'],
['NADH, NADPH, FADH₂', 'Electrones'],
['AMPc, GMPc', 'Señalización (segundos mensajeros)'],
['UDP-glucosa, SAM', 'Intermediarios activados'],
['Coenzima A', 'Agrupada en «electrones» en la clase (transfiere acilos)']
]],
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
