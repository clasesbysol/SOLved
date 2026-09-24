(()=>{
'use strict';
const VERSION='1.2.0';
const FIRST=42;
const LAST=57;
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const chapters=[
{
n:42,group:'Lípidos I',title:'Lípidos: diversidad química, funciones y clasificación',
lead:'Los lípidos no forman una única familia química: se agrupan por su comportamiento hidrofóbico o anfipático y por las funciones que cumplen en los sistemas biológicos.',
blocks:[
['idea','Idea guía','La estructura lipídica conecta tres niveles: composición química → propiedades físicas → función biológica. Por eso conviene estudiar cada clase preguntando qué esqueleto tiene, qué grupos polares posee, cuántas colas hidrofóbicas presenta y qué consecuencias tiene esa geometría.'],
['cols',[
['Funciones principales',['Reserva energética y de carbono: triacilglicéridos y gotas lipídicas.','Arquitectura de membranas: glicerofosfolípidos, esfingolípidos, esteroles, galactolípidos y lípidos éter.','Señalización: DAG, PA, ceramida, S1P, fosfoinosítidos y derivados de PUFA.']],
['Otras funciones',['Aislamiento e impermeabilización: ceras y acilceramidas.','Cofactores/pigmentos: vitamina K, retinoides, carotenoides y dolicol.','Anclaje de proteínas: GPI, prenilación, miristoilación y palmitoilación.']]
]],
['table',['Familia','Rasgo estructural','Rol dominante'],[
['Triacilglicéridos','Glicerol + 3 acilos, sin cabeza polar','Reserva energética'],
['Glicerofosfolípidos','Glicerol + 2 acilos + fosfato + cabeza polar','Bicapas y señalización'],
['Esfingolípidos','Base esfingoide + acilo por amida + cabeza polar','Membrana, reconocimiento, señalización'],
['Esteroles','Núcleo tetracíclico rígido + OH','Modulación de propiedades de membrana y precursores'],
['Galacto/sulfolípidos','DAG + azúcares, sin fosfato','Membranas fotosintéticas'],
['Lípidos éter arqueanos','Glicerol-1-P + cadenas isoprenoides por éter','Membranas de Archaea, alta estabilidad'],
['Ceras','AG de cadena larga + alcohol de cadena larga','Impermeabilización y protección']
]],
['deep','Ampliación · otras reservas y categorías','En bacterias aparecen poli-hidroxialcanoatos (PHA), como PHB, acumulados en gránulos de reserva. Muchos procariotas también contienen hopanoides, moléculas pentacíclicas que pueden cumplir funciones de organización de membrana análogas —no idénticas— a las de esteroles.']
]},
{
n:43,group:'Lípidos I',title:'Ácidos grasos: estructura, nomenclatura y lectura de fórmulas',
lead:'Los ácidos grasos son ácidos carboxílicos con una cadena hidrocarbonada. Longitud, número y posición de dobles enlaces determinan gran parte de sus propiedades.',
blocks:[
['formula','Notación abreviada','C:D  →  número de carbonos : número de dobles enlaces'],
['cols',[
['Sistema Δ (delta)',['Se cuenta desde el carbono del carboxilo, que es C1.','Ejemplo: oleato = 18:1 Δ9.','En PUFA se listan todas las posiciones: araquidonato = 20:4 Δ5,8,11,14.']],
['Sistema ω / n',['Se cuenta desde el extremo metilo.','Indica la familia del ácido graso.','ALA = 18:3 n-3; linoleato = 18:2 n-6.']]
]],
['table',['Ácido graso','Notación','Familia / comentario'],[
['Palmítico','16:0','Saturado'],
['Esteárico','18:0','Saturado'],
['Palmitoleico','16:1 Δ9','n-7'],
['Oleico','18:1 Δ9','n-9'],
['Linoleico','18:2 Δ9,12','n-6; esencial'],
['α-linolénico (ALA)','18:3 Δ9,12,15','n-3; esencial'],
['Araquidónico (AA)','20:4 Δ5,8,11,14','n-6'],
['EPA','20:5 Δ5,8,11,14,17','n-3'],
['DHA','22:6 Δ4,7,10,13,16,19','n-3']
]],
['idea','Cis y trans','En los dobles enlaces cis los segmentos de la cadena quedan desviados y se dificulta el empaquetamiento compacto. Los dobles enlaces trans conservan una geometría mucho más lineal, por lo que el comportamiento físico se parece más al de una cadena saturada.'],
['deep','Procariotas: estructuras especiales','Además de cadenas lineales, algunas bacterias usan ácidos grasos ramificados iso/anteiso, ciclopropánicos y otras variantes. Cambiar ramificación, saturación o longitud permite ajustar las propiedades de la membrana sin cambiar necesariamente la clase de cabeza polar.']
]},
{
n:44,group:'Lípidos I',title:'De la estructura a las propiedades físicas: fusión, solubilidad y empaquetamiento',
lead:'Dos variables explican gran parte del comportamiento físico de los ácidos grasos: longitud de cadena y grado de insaturación.',
blocks:[
['flow',['Cadena más larga','↑ contactos de dispersión','↑ punto de fusión','↓ solubilidad acuosa']],
['flow',['Más dobles enlaces cis','Peor empaquetamiento','↓ punto de fusión','↑ fluidez relativa']],
['table',['Comparación','Empaquetamiento','Estado relativo a igual longitud'],[
['Saturado','Compacto','Mayor Tm; tendencia a sólido'],
['Monoinsaturado cis','Interrumpido por un quiebre','Tm menor'],
['Poliinsaturado cis','Muy poco compacto','Tm aún menor'],
['Insaturado trans','Bastante lineal','Más parecido a saturado']
]],
['idea','Cómo razonar un ejercicio','No memorices una lista de puntos de fusión. Primero compará longitud; después, para longitudes similares, compará cantidad y geometría de dobles enlaces. Esa lógica permite explicar por qué aceite de oliva, manteca y sebo tienen estados físicos diferentes a temperatura ambiente.'],
['deep','Transición de fase en bicapas','En una bicapa, el paso de un estado gel/ordenado a uno líquido-cristalino/desordenado implica mayor movilidad de las cadenas, aumento del área por lípido y reducción del espesor. La temperatura de transición depende fuertemente de longitud, saturación, cabeza polar y colesterol.']
]},
{
n:45,group:'Lípidos I',title:'Familias ω-3 y ω-6, esencialidad y mediadores lipídicos',
lead:'Los mamíferos no introducen de novo dobles enlaces en ciertas posiciones distales; por eso linoleato y α-linolenato deben obtenerse de la dieta.',
blocks:[
['flow',['Linoleato 18:2 n-6','elongación/desaturación','Araquidonato 20:4 n-6','eicosanoides y otros mediadores']],
['flow',['ALA 18:3 n-3','elongación/desaturación','EPA 20:5 n-3 → DHA 22:6 n-3','resolvinas, protectinas y maresinas']],
['table',['Precursor','Derivados destacados','Función general'],[
['Araquidonato','Prostaglandinas, tromboxanos, leucotrienos, lipoxinas','Inflamación, hemostasia, tono vascular y resolución según mediador'],
['EPA','Eicosanoides serie 3/5 y resolvinas E','Modulación inflamatoria'],
['DHA','Resolvinas D, protectinas, maresinas','Resolución y funciones especializadas en tejidos ricos en DHA']
]],
['idea','Punto conceptual','“ω-3” y “ω-6” no describen si una molécula es buena o mala: indican dónde aparece el primer doble enlace desde el extremo metilo. La función depende de la especie molecular concreta, el tejido, la enzima y el contexto.'],
['deep','Gotas lipídicas y señalización','Los ácidos grasos no sólo se oxidan o almacenan. También se incorporan en fosfolípidos, desde donde fosfolipasas pueden liberarlos para generar mensajeros. La composición acílica de la membrana, por lo tanto, condiciona qué señales pueden producirse.']
]},
{
n:46,group:'Lípidos I',title:'Triacilglicéridos, gotas lipídicas, ceras y grasas trans',
lead:'Los triacilglicéridos son lípidos neutros de reserva; no son los componentes arquitectónicos principales de una bicapa.',
blocks:[
['table',['Molécula','Estructura','Propiedad / función'],[
['TAG','Glicerol esterificado con 3 AG','Reserva muy reducida y prácticamente anhidra'],
['TAG simple','Tres acilos iguales','Ej.: tripalmitina, trioleína'],
['TAG mixto','Acilos distintos en sn-1/sn-2/sn-3','Muy frecuentes en grasas naturales'],
['Cera','AG largo + alcohol largo','Barrera hidrofóbica, impermeabilización']
]],
['idea','Gotas lipídicas','Los TAG y ésteres de colesterol se almacenan en gotas lipídicas: organelas dinámicas con un núcleo neutro rodeado por una monocapa de fosfolípidos y proteínas. Las lipasas movilizan estas reservas cuando la célula necesita combustible o precursores.'],
['cols',[
['Hidrogenación parcial',['Aumenta saturación y estabilidad oxidativa.','Puede generar isómeros trans.','Trans empaqueta mejor que cis.']],
['Consecuencia bioquímica',['Mayor orden relativo de la cadena.','Punto de fusión más alto que el isómero cis comparable.','El contexto sanitario se explica aparte del mecanismo estructural.']]
]],
['deep','Transesterificación y biodiésel','La química de los enlaces éster de TAG permite reacciones de transesterificación con alcoholes para formar ésteres de ácidos grasos. Es una aplicación útil para conectar estructura, reactividad y biotecnología.']
]},
{
n:47,group:'Lípidos I',title:'Síntesis de ácidos grasos y puente hacia membranas',
lead:'La diversidad lipídica empieza antes de la bicapa: síntesis, elongación, desaturación y disponibilidad de acil-CoA condicionan qué especies pueden construirse.',
blocks:[
['flow',['Acetil-CoA','malonil-CoA + FAS','ácido graso','elongación / desaturación','acil-CoA disponibles']],
['idea','FAS I y FAS II','Los sistemas de síntesis de ácidos grasos difieren entre grupos biológicos, pero comparten la lógica de elongar unidades de dos carbonos. Esa lógica ayuda a entender por qué predominan cadenas pares.'],
['cols',[
['Destino 1 · Energía',['Oxidación de AG.','Almacenamiento en TAG.']],
['Destino 2 · Estructura/señal',['Incorporación en glicerofosfolípidos y esfingolípidos.','Liberación posterior para mensajeros lipídicos.']]
]],
['idea','Puente a Lípidos II','Un ácido graso aislado explica sólo parte del problema. En una membrana importa qué cabeza polar lo acompaña, en qué posición sn está, qué otra cadena tiene la molécula, qué esteroles hay alrededor y en qué monocapa u organela se encuentra.']
]},
{
n:48,group:'Lípidos II',title:'Anfipaticidad y autoensamblaje: micelas, bicapas y vesículas',
lead:'Las membranas se autoensamblan porque las superficies hidrofóbicas se minimizan frente al agua y las cabezas polares permanecen hidratadas.',
blocks:[
['idea','Efecto hidrofóbico','El agua alrededor de superficies apolares pierde grados de libertad. Al agruparse las colas hidrofóbicas, parte de esa agua ordenada se libera y aumenta la entropía del sistema. El proceso no se explica por una “atracción entre colas” aislada, sino por el balance termodinámico del conjunto.'],
['table',['Geometría molecular aproximada','Agregado favorecido','Ejemplos'],[
['Cono invertido','Micelas / curvatura positiva','Ácidos grasos libres, lisofosfolípidos, detergentes'],
['Cilindro','Bicapa lamelar','PC, PS y muchos fosfolípidos'],
['Cono','Curvatura negativa / fases no lamelares','PE, PA, DAG, cardiolipina']
]],
['flow',['Bicapa abierta','bordes hidrofóbicos expuestos','cierre espontáneo','vesícula / liposoma']],
['deep','Liposomas y LNP','El mismo principio físico se aprovecha para formular vesículas y nanopartículas lipídicas capaces de transportar moléculas hidrofílicas o hidrofóbicas. La composición controla estabilidad, curvatura, fusión y liberación.']
]},
{
n:49,group:'Lípidos II',title:'Glicerofosfolípidos, galactolípidos y lípidos éter',
lead:'Los glicerofosfolípidos combinan un esqueleto de glicerol, dos cadenas hidrofóbicas y una cabeza polar fosforilada; una misma clase contiene muchas especies moleculares.',
blocks:[
['table',['Clase','Cabeza / carga aproximada a pH fisiológico','Idea clave'],[
['PA','Fosfato; negativa','Precursor central y señal; favorece curvatura'],
['PE','Etanolamina; neta 0','Frecuente en cara citosólica y bacterias; geometría cónica'],
['PC','Colina; neta 0','Muy abundante en membranas eucariotas'],
['PS','Serina; negativa','Cara citosólica; exposición externa en apoptosis'],
['PG','Glicerol; negativa','Bacterias, tilacoides, surfactante'],
['PI','Inositol; negativa','Precursor de fosfoinosítidos'],
['Cardiolipina','Dos fosfatidatos unidos por glicerol; muy aniónica','Membrana interna mitocondrial y bacterias']
]],
['idea','Cadenas acilo y posición sn','En muchos GPL animales, sn-1 suele contener una cadena más saturada y sn-2 una más insaturada, aunque existen numerosas excepciones. Cambiar sólo las cadenas convierte una “misma clase” de fosfolípido en múltiples especies con propiedades distintas.'],
['cols',[
['Galactolípidos / sulfolípidos',['MGDG, DGDG y SQDG son abundantes en membranas fotosintéticas.','Permiten construir membranas con poco o ningún fosfato.','Las plantas sí poseen fosfolípidos; el punto es el enriquecimiento específico de tilacoides.']],
['Éter-lípidos',['Plasmógenos: enlace vinil-éter en sn-1.','En Archaea predominan glicerol-1-P y cadenas isoprenoides unidas por éter.','Los tetraéteres pueden formar membranas muy estables.']]
]],
['deep','Archaea','La combinación de enlaces éter, isoprenoides ramificados y estereoquímica opuesta del glicerol distingue a muchos lípidos arqueanos de bacterias/eucariotas. Algunas arqueas forman tetraéteres que atraviesan toda la membrana.']
]},
{
n:50,group:'Lípidos II',title:'Esfingolípidos: ceramida, mielina, glicoesfingolípidos y reconocimiento',
lead:'Los esfingolípidos no usan glicerol como esqueleto: parten de una base esfingoide y de una ceramida.',
blocks:[
['flow',['Esfingosina / base esfingoide','+ ácido graso por enlace amida','Ceramida','+ cabeza polar','esfingomielina o glicoesfingolípido']],
['table',['Subclase','Cabeza polar','Función / localización destacada'],[
['Esfingomielina','Fosfocolina','Membrana plasmática animal y mielina'],
['Cerebrósido','Un monosacárido','Tejido nervioso y otros tejidos según azúcar'],
['Globósido','Oligosacárido neutro','Reconocimiento de superficie'],
['Gangliósido','Oligosacárido con ácido siálico','Receptores, identidad y señalización']
]],
['idea','Reconocimiento celular','Los azúcares de glicoesfingolípidos miran hacia el exterior celular. Participan en identidad, adhesión y reconocimiento; el gangliósido GM1 es un receptor clásico para la toxina colérica. Determinantes ABO también pueden presentarse sobre glicolípidos y glicoproteínas.'],
['deep','Señalización y patología','Ceramida y esfingosina-1-fosfato actúan como moléculas señal. Alteraciones de síntesis o degradación de esfingolípidos producen enfermedades; la clase también conecta con autoanticuerpos antigangliósido en ciertos cuadros neuropáticos.']
]},
{
n:51,group:'Lípidos II',title:'Esteroles y colesterol: estructura, derivados y regulación de propiedades',
lead:'El colesterol combina un pequeño OH polar con un núcleo esteroide rígido y una cola hidrofóbica; por eso se intercala entre otros lípidos de membrana.',
blocks:[
['cols',[
['Esteroles por grupo',['Animales: colesterol.','Hongos: ergosterol.','Plantas: fitosteroles como estigmasterol.','La mayoría de bacterias no usa esteroles, aunque existen excepciones.']],
['Derivados',['Sales/ácidos biliares.','Hormonas esteroideas.','Vitamina D y otros derivados.','Ésteres de colesterol para almacenamiento.']]
]],
['idea','Buffer de fluidez','A temperaturas relativamente altas, el núcleo rígido del colesterol limita movimientos de las cadenas y aumenta el orden. A temperaturas bajas, interfiere con el empaquetamiento cristalino excesivo. Por eso su efecto no se resume como “sube” o “baja” la fluidez: amortigua cambios.'],
['deep','Glucocorticoides','Prednisona/prednisolona son derivados esteroideos con acciones antiinflamatorias principalmente mediadas por regulación génica. No conviene simplificar su acción como una inhibición directa única de PLA₂.']
]},
{
n:52,group:'Lípidos II',title:'Mosaico fluido, permeabilidad, movilidad y asimetría',
lead:'La membrana es una bicapa dinámica con proteínas y lípidos distribuidos de manera asimétrica; no es una lámina homogénea.',
blocks:[
['table',['Propiedad','Consecuencia'],[
['Núcleo hidrofóbico','Barrera fuerte a iones y moléculas polares grandes'],
['Difusión lateral','Lípidos y muchas proteínas se redistribuyen en el plano de la membrana'],
['Autosellado','Los bordes expuestos son energéticamente desfavorables'],
['Asimetría','Cada monocapa puede tener composición y funciones distintas']
]],
['table',['Monocapa externa típica','Monocapa citosólica típica'],[
['PC, esfingomielina, glicoesfingolípidos','PE, PS, PI y fosfoinosítidos']
]],
['idea','Asimetría activa','Flipasas, floppasas y scramblasas participan en el establecimiento o pérdida regulada de asimetría. La exposición de PS en la cara externa puede funcionar como señal biológica, por ejemplo durante apoptosis.'],
['deep','Perfil de presiones laterales','A lo largo del espesor de la bicapa cambian las fuerzas repulsivas y atractivas. Ese perfil puede influir en conformaciones de proteínas transmembrana, canales y sensores.']
]},
{
n:53,group:'Lípidos II',title:'La composición de membrana cambia entre organismos, tejidos y organelas',
lead:'No existe una “membrana universal”: distintas células y organelas seleccionan composiciones que ajustan grosor, orden, curvatura, carga y señalización.',
blocks:[
['table',['Territorio','Composición / propiedades generales'],[
['Retículo endoplasmático','Menos esteroles/esfingolípidos; más defectos de empaquetamiento; membrana relativamente fina'],
['Golgi tardío / membrana plasmática','Más colesterol, esfingolípidos y cadenas saturadas; mayor orden y espesor'],
['Mitocondria interna','Cardiolipina y composición especializada para complejos respiratorios'],
['Tilacoides','Gran proporción de galactolípidos y sulfolípidos']
]],
['idea','Dos diversidades simultáneas','Diversidad química = tipos de esqueletos, cabezas, enlaces y cadenas. Diversidad composicional = cuánto hay de cada especie en una célula, organela, monocapa o nanodominio. Ambas determinan función.'],
['deep','Gradiente de la vía secretora','Durante el tránsito RE → Golgi → membrana plasmática se remodelan y redistribuyen lípidos. Esta progresión acompaña cambios en espesor de bicapa, saturación, colesterol y esfingolípidos.']
]},
{
n:54,group:'Lípidos II',title:'Biosíntesis y remodelado: PA, vía de Kennedy, ciclo de Lands y sesgo metabólico',
lead:'La composición final de una membrana surge de síntesis de novo, disponibilidad de sustratos, especificidad enzimática y remodelado continuo.',
blocks:[
['flow',['Glicerol-3-P','GPAT / LPAAT','LPA → PA','CDP-DAG o DAG','PI/PG/CL o PC/PE']],
['idea','Vía de Kennedy','PA puede desfosforilarse a DAG; mediante intermediarios CDP-colina o CDP-etanolamina se forman PC y PE. Otras ramas usan CDP-DAG para PI, PG y cardiolipina.'],
['flow',['Fosfolípido','PLA₂ elimina sn-2','Lisofosfolípido','aciltransferasa incorpora otro acilo','fosfolípido remodelado']],
['idea','Ciclo de Lands','El recambio de cadenas acilo permite enriquecer una clase en especies concretas. Enzimas como LPCAT, LPIAT y otras aciltransferasas pueden preferir determinados sustratos.'],
['deep','Sesgo metabólico','Una red puede canalizar especies con una firma acílica particular. Ejemplos discutidos en la bibliografía incluyen el enriquecimiento de PI con 18:0/20:4 y la selección de especies ricas en DHA en rutas de PC. El punto importante es que las enzimas “leen” más que la cabeza polar: también discriminan las cadenas.']
]},
{
n:55,group:'Lípidos II',title:'Geometría, curvatura, nanodominios y el papel de los PUFA',
lead:'La forma molecular y el grado de insaturación afectan cómo una membrana se dobla, se organiza lateralmente y acopla proteínas.',
blocks:[
['table',['Tipo de lípido','Geometría aproximada','Curvatura favorecida'],[
['PC / PS','Cilíndrica','Bicapa relativamente plana'],
['PE / PA / DAG / cardiolipina','Cónica','Curvatura negativa'],
['Lisofosfolípidos / algunas especies con cabeza grande','Cono invertido','Curvatura positiva']
]],
['idea','Orden lateral','Colesterol y cadenas saturadas favorecen estados líquido-ordenados; muchas cadenas insaturadas favorecen estados líquido-desordenados. Interacciones entre esfingolípidos, colesterol y fosfolípidos pueden formar dominios dinámicos, no “islas” rígidas permanentes.'],
['idea','PUFA','Araquidonato y DHA introducen gran flexibilidad conformacional. Esa flexibilidad puede reducir la rigidez de flexión y facilitar procesos de curvatura, fusión, fisión y endocitosis.'],
['deep','Acoplamiento entre monocapas','Cadenas largas pueden interdigitarse y transmitir organización de una monocapa a la otra. La composición de una cara puede, por lo tanto, influir en nanodominios y proteínas de la cara opuesta.']
]},
{
n:56,group:'Lípidos II',title:'Adaptación homeoviscosa: cómo las células mantienen propiedades físicas',
lead:'Cuando temperatura, presión o solventes alteran una membrana, los organismos pueden ajustar composición para sostener propiedades compatibles con la función.',
blocks:[
['table',['Perturbación','Respuesta composicional frecuente'],[
['Frío','Más insaturación, cadenas más cortas o más anteiso/ramificadas según organismo'],
['Calor','Mayor saturación y/o cadenas más largas según sistema'],
['Solventes que fluidifican','Algunas bacterias convierten cis → trans rápidamente'],
['Alta presión + frío','Algunas bacterias marinas enriquecen PUFA como EPA/DHA']
]],
['idea','No sólo “fluidez”','La adaptación homeoviscosa puede sostener viscosidad, orden, espesor, permeabilidad, presión lateral y rigidez de flexión. “Fluidez” es una palabra útil pero incompleta.'],
['deep','Sensor bacteriano DesK/DesR','En Bacillus subtilis, DesK cambia su actividad quinasa/fosfatasa cuando varían el espesor y empaquetamiento de la membrana. A bajas temperaturas activa DesR y la expresión de una desaturasa, aumentando insaturación hasta restaurar el estado físico.'],
['deep','Sensor eucariota Mga2','En levadura, la hélice transmembrana de Mga2 responde al empaquetamiento/saturación del RE. Su procesamiento regula OLE1, una desaturasa Δ9. El principio general es retroalimentación: la membrana regula la maquinaria que modifica su propia composición.']
]},
{
n:57,group:'Lípidos II',title:'Sensores, fisiología, patología y aplicaciones: cierre integrador',
lead:'Los lípidos son simultáneamente material estructural, señales, reguladores de proteínas y variables homeostáticas.',
blocks:[
['cols',[
['Sensores y homeostasis',['Motivos ALPS reconocen defectos de empaquetamiento.','Opi1/PA conectan estado metabólico, pH y síntesis de fosfolípidos.','TORC2–Orm participa en homeostasis de esfingolípidos.','SREBP/Scap regula respuesta a colesterol bajo en RE.']],
['Funciones especializadas',['DHA en retina, cerebro y espermatogénesis.','Eicosanoides y mediadores pro-resolutivos en inflamación.','Fosfoinosítidos y DAG/PA en señalización.','Cardiolipina en mitocondria.']]
]],
['table',['Ejemplo','Relación con lípidos'],[
['Síndrome de Barth','Remodelado defectuoso de cardiolipina por tafazina'],
['Ferroptosis','Peroxidación de PUFA esterificados en fosfolípidos; sensibilidad modulada por ACSL4/LPCAT3'],
['Barrera cutánea','Acilceramidas y metabolismo de esfingolípidos'],
['Nanomedicina','Liposomas y nanopartículas lipídicas'],
['Bioplásticos','PHA/PHB bacterianos']
]],
['idea','Mapa final','Estructura molecular → empaquetamiento y curvatura → composición de monocapa/orgánulo → actividad de proteínas y señalización → respuesta fisiológica. Ésa es la lógica que une Lípidos I con Lípidos II.'],
['deep','Aplicación ecológica opcional','Perfiles de ácidos grasos pueden usarse como biomarcadores de fuentes tróficas y comunidades microbianas. Es una ampliación útil para biotecnología/ecología, pero no es requisito para entender la arquitectura de membranas.']
]}
];

function blockHtml(block){
 const [kind,a,b]=block;
 if(kind==='idea')return '<aside class="qbi-lip-callout"><h3>'+esc(a)+'</h3><p>'+esc(b)+'</p></aside>';
 if(kind==='deep')return '<details class="qbi-lip-deep"><summary>'+esc(a)+'</summary><div><p>'+esc(b)+'</p></div></details>';
 if(kind==='formula')return '<div class="formula-box qbi-lip-formula"><b>'+esc(a)+'</b><div>'+esc(b)+'</div></div>';
 if(kind==='flow')return '<div class="qbi-lip-flow">'+a.map((x,i)=>'<span>'+esc(x)+'</span>'+(i<a.length-1?'<b>→</b>':'')).join('')+'</div>';
 if(kind==='cols')return '<div class="qbi-lip-cols">'+a.map(([t,items])=>'<section><h3>'+esc(t)+'</h3><ul>'+items.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></section>').join('')+'</div>';
 if(kind==='table')return '<div class="qbi-study-table qbi-lip-table"><table><thead><tr>'+a.map(x=>'<th>'+esc(x)+'</th>').join('')+'</tr></thead><tbody>'+b.map(row=>'<tr>'+row.map(x=>'<td>'+esc(x)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
 return '';
}
function sectionHtml(ch){
 return '<section id="cap'+ch.n+'" class="qb-chapter qbi-lip-chapter" data-qbi-lipidos="'+esc(ch.group)+'"><div class="qb-chapter-number">'+ch.n+'</div><div class="qbi-lip-kicker">'+esc(ch.group)+'</div><h2>'+esc(ch.title)+'</h2><p class="qbi-lip-lead">'+esc(ch.lead)+'</p>'+ch.blocks.map(blockHtml).join('')+'</section>';
}
function tp4Html(){
 const sampleRows=[
  ['Mejillón','0,5 g','Folch','Cloroformo : Metanol (2:1)','7 mL'],
  ['Hojas','1,0 g','Bligh-Dyer adaptado','Cloroformo : Metanol (1:1)','5 mL'],
  ['Avena','0,5 g','Folch','Cloroformo : Metanol (2:1)','5 mL']
 ];
 const extractionSteps=[
  ['1. Preparar la muestra','Homogeneizar o morterear la muestra sólida antes de agregar los solventes.'],
  ['2. Agregar la mezcla correspondiente','Usar el método asignado según la muestra: C:M 2:1 para Folch o C:M 1:1 para Bligh-Dyer adaptado, con el volumen indicado en la tabla.'],
  ['3. Homogeneizar','Mezclar vigorosamente durante 3 minutos en vórtex. El objetivo es poner en contacto íntimo la matriz biológica con los solventes orgánicos para solubilizar los lípidos.'],
  ['4. Centrifugar','Centrifugar 5 minutos a 5000 rpm. En esta etapa el material sólido insoluble forma un pellet y el extracto con solventes queda por encima del pellet. Si persiste material sin precipitar o la separación no es adecuada, agregar metanol, agitar y centrifugar nuevamente.'],
  ['5. Recuperar el extracto orgánico','Tomar el sobrenadante/extracto orgánico con pipeta Pasteur de plástico y transferirlo a un Falcon limpio. Si se agregó metanol extra, agregar cloroformo suficiente para recuperar la proporción inicial del método.']
 ];
 const washSteps=[
  ['Lavado con KCl 0,88 % · repetir 2 veces','Agregar 0,2 volúmenes de KCl 0,88 % p/v. Centrifugar 5 minutos a 5000 rpm. Luego de la partición líquido-líquido, descartar la fase acuosa superior y conservar la fase orgánica clorofórmica inferior.'],
  ['Lavado con FST · repetir 2 veces','Agregar 0,2 volúmenes de Fase Superior Teórica (FST): Cloroformo : Metanol : KCl 0,88 % = 3:48:47 v/v/v. Centrifugar 5 minutos a 5000 rpm. Descartar nuevamente la fase acuosa superior y conservar la fase orgánica inferior.'],
  ['Concentrar','Evaporar el solvente bajo corriente de N₂ en baño termostatizado a 40 °C hasta que quede un residuo oleoso.'],
  ['Resuspender','Resuspender el residuo en 50 µL de Cloroformo : Metanol (2:1). Ese extracto concentrado se usa para la TLC.']
 ];
 const tlcSteps=[
  ['1. Preparar la fase móvil','Mezclar Hexano : Éter etílico : Ácido acético concentrado = 60:40:2,5 v/v/v. Colocar en la cuba cantidad suficiente para formar una columna de aproximadamente 1 cm.'],
  ['2. Saturar la cuba','Tapar la cuba y dejarla reposar para que la atmósfera interna se sature con vapores de la fase móvil.'],
  ['3. Sembrar','Sembrar 20 µL de cada muestra sobre la línea de origen. La guía incluye una solución estándar de glicéridos entre los materiales; su siembra se usa como referencia según la indicación de la práctica.'],
  ['4. Secar la siembra','Esperar a que las manchas sembradas estén bien secas antes de colocar la placa en la cuba.'],
  ['5. Desarrollar la cromatografía','Colocar la placa de sílica gel 60 en la cuba. El solvente asciende por capilaridad y los componentes migran a distinta velocidad según su afinidad relativa por la fase estacionaria y la fase móvil.'],
  ['6. Marcar el frente','Retirar la placa cuando el frente del solvente llegue a pocos centímetros del borde superior y marcar inmediatamente la posición alcanzada.'],
  ['7. Secar y revelar','Secar la placa con secador bajo campana y revelar las bandas bajo luz UV.']
 ];
 const cards=items=>'<div class="qbi-tp4-steps">'+items.map(([t,d])=>'<article><h4>'+esc(t)+'</h4><p>'+esc(d)+'</p></article>').join('')+'</div>';
 return '<section id="tp4" class="qb-chapter qbi-lip-tp4">'+
  '<div class="qbi-lip-kicker">Trabajo práctico Nº 4</div>'+
  '<h2 class="qbi-lip-tp4-title">Extracción y separación de lípidos presentes en alimentos y muestras ambientales</h2>'+
  '<p class="qbi-lip-lead"><strong>Objetivo:</strong> extraer lípidos de diferentes materiales biológicos con solventes orgánicos y luego separar las fracciones del extracto mediante cromatografía en capa delgada (TLC).</p>'+

  '<h3>1. Teoría del TP · ¿qué son los lípidos y por qué se pueden extraer?</h3>'+
  '<p>La palabra <em>lípido</em> proviene del griego <em>lipos</em>, “grasa”. No define una única familia química: reúne sustancias estructuralmente diferentes que comparten un comportamiento físico-químico dominado por regiones hidrocarbonadas hidrofóbicas. Por eso presentan <strong>muy baja solubilidad en agua</strong> y <strong>alta solubilidad en solventes orgánicos</strong>.</p>'+
  '<aside class="qbi-lip-callout"><h3>Idea central del práctico</h3><p>Primero se aprovecha la solubilidad de los lípidos en mezclas orgánicas para <strong>extraerlos</strong> de la muestra. Después se elimina agua e impurezas mediante <strong>lavados y partición de fases</strong>. Finalmente, los distintos lípidos del extracto se <strong>separan por TLC</strong>. Extracción y separación son etapas diferentes.</p></aside>'+
  '<div class="qbi-lip-cols"><section><h3>Propiedades comunes</h3><ul><li>Muy baja solubilidad en agua.</li><li>Muy elevada solubilidad en solventes orgánicos.</li><li>Presencia importante de regiones hidrocarbonadas largas e hidrofóbicas.</li><li>Algunos son completamente apolares y otros son anfipáticos, con una cabeza polar y una región hidrofóbica.</li></ul></section><section><h3>Ejemplos incluidos en el grupo</h3><ul><li>Triglicéridos, diglicéridos y monoglicéridos.</li><li>Ceras y fosfoglicéridos.</li><li>Esfingolípidos y esteroides.</li><li>Tocoferoles, carotenoides y terpenos.</li><li>Hidrocarburos policíclicos y otros compuestos liposolubles.</li></ul></section></div>'+

  '<h3>2. Importancia fisiológica</h3>'+
  '<div class="qbi-lip-cols"><section><h3>Estructura y transporte</h3><ul><li>Junto con las proteínas, son componentes estructurales importantes de las membranas celulares.</li><li>Participan en sistemas asociados al transporte de electrones de membranas, como la membrana mitocondrial interna.</li><li>Algunos actúan como aislantes térmicos y forman barreras protectoras.</li></ul></section><section><h3>Nutrición y metabolismo</h3><ul><li>Son fuente de vitaminas liposolubles A, D, E y K.</li><li>Aportan ácidos grasos esenciales.</li><li>Constituyen una reserva y fuente de energía a través de la β-oxidación.</li><li>Grasas y aceites aportan aproximadamente 9 kcal/g, frente a unas 4 kcal/g de proteínas y carbohidratos.</li></ul></section></div>'+

  '<h3>3. Clasificación química usada en la guía</h3>'+
  '<div class="qbi-study-table qbi-lip-table"><table><thead><tr><th>Grupo</th><th>Qué caracteriza al grupo</th><th>Ejemplos</th></tr></thead><tbody>'+
  '<tr><td><strong>Lípidos simples</strong></td><td>Poseen ácidos grasos y alcoholes en su estructura, separables por hidrólisis.</td><td>Mono-, di- y triglicéridos; ceras; ésteres de esteroides.</td></tr>'+
  '<tr><td><strong>Lípidos complejos</strong></td><td>Al hidrolizarse generan, además de alcoholes y ácidos grasos, otros componentes.</td><td>Glicerofosfolípidos, gliceroglicolípidos y esfingolípidos.</td></tr>'+
  '<tr><td><strong>Compuestos y derivados</strong></td><td>Productos de hidrólisis y otros compuestos lipídicos de estructura variada.</td><td>Ácidos grasos, alcoholes grasos, vitaminas liposolubles, esteroides e hidrocarburos.</td></tr>'+
  '</tbody></table></div>'+

  '<h3>4. Los dos métodos de extracción que aparecen en este TP</h3>'+
  '<p>Los métodos de aislamiento se basan en homogeneizar la muestra con mezclas de solventes orgánicos capaces de extraer fosfolípidos, acilgliceroles, colesterol y otros lípidos. En esta guía aparecen <strong>dos mezclas de extracción distintas</strong>:</p>'+
  '<div class="qbi-tp4-methods">'+
   '<article><div class="qbi-tp4-method-tag">MÉTODO DE FOLCH</div><h3>Cloroformo : Metanol = 2:1</h3><p>La mezcla contiene proporcionalmente más cloroformo. En este TP se utiliza para <strong>mejillón</strong> y <strong>avena</strong>.</p><p><strong>Función:</strong> extraer los lípidos de la matriz biológica antes de los lavados.</p></article>'+
   '<article><div class="qbi-tp4-method-tag">BLIGH-DYER ADAPTADO</div><h3>Cloroformo : Metanol = 1:1</h3><p>En esta práctica se emplea una adaptación con partes iguales de ambos solventes. Se utiliza para la muestra de <strong>hojas</strong>.</p><p><strong>Función:</strong> también es un método de extracción; no es la cromatografía ni un lavado.</p></article>'+
  '</div>'+
  '<aside class="qbi-lip-callout"><h3>No confundir</h3><p><strong>Folch / Bligh-Dyer adaptado = extracción.</strong> <strong>KCl y FST = lavados/partición del extracto.</strong> <strong>N₂ a 40 °C = concentración.</strong> <strong>TLC = separación cromatográfica de los lípidos ya extraídos.</strong></p></aside>'+

  '<h3>5. ¿Qué muestra usa cada método?</h3>'+
  '<div class="qbi-study-table qbi-lip-table"><table><thead><tr><th>Muestra</th><th>Masa</th><th>Método</th><th>Mezcla de extracción</th><th>Volumen</th></tr></thead><tbody>'+sampleRows.map(r=>'<tr>'+r.map(x=>'<td>'+esc(x)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>'+

  '<h3>6. Parte 1 · Extracción de los lípidos</h3>'+
  '<div class="qbi-lip-flow"><span>Muestra biológica</span><b>→</b><span>Folch o Bligh-Dyer adaptado</span><b>→</b><span>Homogeneización</span><b>→</b><span>Centrifugación</span><b>→</b><span>Extracto orgánico</span></div>'+
  cards(extractionSteps)+
  '<details class="qbi-lip-deep" open><summary>Atención con “fase superior” y “fase inferior”</summary><div><p>En la <strong>primera centrifugación</strong> la guía describe al extracto clorofórmico como sobrenadante porque está por encima del <strong>pellet sólido</strong>. Después, cuando se agregan soluciones acuosas y se forman <strong>dos fases líquidas</strong>, el cloroformo —más denso— queda en la <strong>fase orgánica inferior</strong>, mientras que la fase acuosa que se descarta queda arriba. Son dos comparaciones diferentes.</p></div></details>'+

  '<h3>7. Lavados del extracto · KCl y FST</h3>'+
  '<p>El extracto obtenido todavía contiene agua y sustancias hidrosolubles. Los lavados generan una partición entre una fase acuosa y una fase orgánica: los lípidos permanecen preferentemente en la fase orgánica mientras se eliminan contaminantes polares.</p>'+
  '<div class="qbi-tp4-methods">'+
   '<article><div class="qbi-tp4-method-tag">LAVADO 1</div><h3>KCl 0,88 %</h3><p>Se agregan <strong>0,2 volúmenes</strong>, se centrifuga y se descarta la fase acuosa superior. Se realiza <strong>dos veces</strong>.</p></article>'+
   '<article><div class="qbi-tp4-method-tag">LAVADO 2</div><h3>Fase Superior Teórica (FST)</h3><p><strong>Cloroformo : Metanol : KCl 0,88 % = 3:48:47 v/v/v.</strong> También se usan 0,2 volúmenes y se repite <strong>dos veces</strong>.</p></article>'+
  '</div>'+
  cards(washSteps)+
  '<aside class="qbi-lip-callout"><h3>¿Por qué N₂ y 40 °C?</h3><p>La evaporación elimina los solventes y concentra el extracto. La corriente de N₂ ayuda a desplazar el solvente y reduce la exposición al oxígeno; una temperatura moderada de 40 °C acelera la evaporación sin recurrir a calentamientos intensos. El residuo oleoso final concentra los lípidos recuperados.</p></aside>'+

  '<h3>8. Parte 2 · Separación por cromatografía en capa delgada (TLC)</h3>'+
  '<p>La TLC ya no busca sacar lípidos de la muestra original: busca <strong>separar entre sí los distintos componentes del extracto</strong>. La separación depende de la competencia entre la afinidad del compuesto por la fase estacionaria y su solubilidad en la fase móvil.</p>'+
  '<div class="qbi-lip-cols"><section><h3>Fase estacionaria</h3><ul><li>Placa de sílica gel 60 sobre soporte de vidrio de 20 × 20 cm.</li><li>La sílica es polar y adsorbe los compuestos con distinta intensidad.</li><li>Cuanto mayor sea la interacción con la sílica, menor será la migración.</li></ul></section><section><h3>Fase móvil</h3><ul><li>Hexano : Éter etílico : Ácido acético concentrado = 60:40:2,5.</li><li>Asciende por capilaridad.</li><li>Cuanto mejor se solubilice un compuesto en la fase móvil y menor sea su retención en sílica, más avanzará.</li></ul></section></div>'+
  '<div class="qbi-lip-flow"><span>Extracto concentrado</span><b>→</b><span>Siembra en sílica</span><b>→</b><span>Corrida con fase móvil</span><b>→</b><span>Separación en bandas</span><b>→</b><span>Revelado UV</span></div>'+
  cards(tlcSteps)+

  '<h3>9. Cómo interpretar conceptualmente la TLC</h3>'+
  '<div class="qbi-tp4-methods">'+
   '<article><div class="qbi-tp4-method-tag">MÁS RETENIDO</div><h3>Mayor afinidad por la sílica</h3><p>Un compuesto que interactúa más fuertemente con la fase estacionaria polar avanza menos y queda más cerca del origen.</p></article>'+
   '<article><div class="qbi-tp4-method-tag">MÁS MÓVIL</div><h3>Mayor afinidad por la fase móvil</h3><p>Un compuesto menos retenido por la sílica y más compatible con la mezcla de corrida avanza más hacia el frente del solvente.</p></article>'+
  '</div>'+
  '<div class="formula-box qbi-lip-formula"><b>Factor de retención (Rf)</b><div>Rf = distancia recorrida por el compuesto / distancia recorrida por el frente del solvente</div></div>'+
  '<p>El valor de Rf sirve para comparar la migración de una banda bajo las mismas condiciones cromatográficas. Nunca puede ser mayor que 1.</p>'+

  '<h3>10. Mapa completo del TP4</h3>'+
  '<div class="qbi-tp4-roadmap">'+
   '<article><b>1</b><div><strong>Elegir mezcla de extracción</strong><span>Folch 2:1 o Bligh-Dyer adaptado 1:1 según la muestra.</span></div></article>'+
   '<article><b>2</b><div><strong>Extraer</strong><span>Homogeneizar, centrifugar y recuperar el extracto orgánico.</span></div></article>'+
   '<article><b>3</b><div><strong>Lavar</strong><span>2× KCl 0,88 % y 2× FST; retirar contaminantes hidrosolubles.</span></div></article>'+
   '<article><b>4</b><div><strong>Concentrar</strong><span>Evaporar bajo N₂ a 40 °C y resuspender en 50 µL de C:M 2:1.</span></div></article>'+
   '<article><b>5</b><div><strong>Separar</strong><span>TLC en sílica con Hexano : Éter : Ácido acético 60:40:2,5.</span></div></article>'+
   '<article><b>6</b><div><strong>Visualizar e interpretar</strong><span>Marcar frente, secar, revelar bajo UV y comparar migraciones/bandas.</span></div></article>'+
  '</div>'+
  '<aside class="qbi-lip-callout"><h3>Qué deberías poder explicar antes del laboratorio</h3><p>Por qué los lípidos se extraen con solventes orgánicos; diferencia entre Folch y Bligh-Dyer adaptado en esta guía; qué hacen KCl y FST; por qué después de los lavados se conserva la fase orgánica inferior; para qué se evapora bajo N₂; diferencia entre extracción y TLC; qué son fase estacionaria y fase móvil; y por qué distintas moléculas recorren distancias diferentes.</p></aside>'+
 '</section>';
}
function ensureStyle(){
 if(document.getElementById('qbi-lipidos-style'))return;
 const s=document.createElement('style');s.id='qbi-lipidos-style';s.textContent=`
 .qbi-lip-chapter{scroll-margin-top:18px}.qbi-lip-kicker{margin:2px 0 7px;color:var(--qb-accent-strong,#8d2452);font-size:.78rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.qbi-lip-lead{font-size:1.05rem;line-height:1.7;color:var(--qb-muted,#75596a)}
 .qbi-lip-callout{margin:18px 0;padding:15px 17px;border-left:4px solid var(--qb-accent,#e74888);border-radius:12px;background:var(--qb-accent-soft,#fff0f6)}.qbi-lip-callout h3{margin:0 0 6px;color:var(--qb-accent-strong,#8d2452)}.qbi-lip-callout p{margin:0;line-height:1.65}
 .qbi-lip-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px;margin:18px 0}.qbi-lip-cols section{padding:14px;border:1px solid rgba(113,78,99,.15);border-radius:13px;background:#fff}.qbi-lip-cols h3{margin:0 0 8px;color:var(--qb-accent-strong,#8d2452)}.qbi-lip-cols ul{margin:0;padding-left:20px}.qbi-lip-cols li{margin:6px 0;line-height:1.5}
 .qbi-lip-table{margin:18px 0;overflow:auto;border:1px solid rgba(113,78,99,.15);border-radius:13px;background:#fff}.qbi-lip-table table{width:100%;border-collapse:collapse}.qbi-lip-table th,.qbi-lip-table td{padding:10px 12px;border-bottom:1px solid rgba(113,78,99,.12);text-align:left;vertical-align:top;line-height:1.45}.qbi-lip-table th{background:var(--qb-accent-soft,#fff0f6);color:var(--qb-accent-strong,#8d2452)}
 .qbi-lip-flow{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin:16px 0;padding:13px;border:1px solid rgba(113,78,99,.14);border-radius:13px;background:#fff}.qbi-lip-flow span{padding:8px 10px;border-radius:10px;background:var(--qb-accent-soft,#fff0f6);font-weight:750}.qbi-lip-flow b{color:var(--qb-accent-strong,#8d2452)}
 .qbi-lip-deep{margin:14px 0;border:1px solid rgba(113,78,99,.16);border-radius:12px;background:#fff;overflow:hidden}.qbi-lip-deep summary{padding:12px 14px;cursor:pointer;font-weight:850;color:var(--qb-accent-strong,#8d2452)}.qbi-lip-deep div{padding:0 14px 14px}.qbi-lip-deep p{margin:0;line-height:1.62}
 .qbi-lip-formula{margin:15px 0;padding:13px 15px;border-left:4px solid var(--qb-accent,#e74888);border-radius:11px;background:var(--qb-accent-soft,#fff0f6)} .qbi-tp4-steps{display:grid;gap:10px;margin:14px 0 22px}.qbi-tp4-steps article{padding:13px 15px;border:1px solid rgba(113,78,99,.15);border-radius:12px;background:#fff}.qbi-tp4-steps h4{margin:0 0 6px;color:var(--qb-accent-strong,#8d2452)}.qbi-tp4-steps p{margin:0;line-height:1.58}
 .qbi-lip-index-group{display:block!important;margin-top:10px!important;padding-top:9px!important;border-top:1px solid rgba(113,78,99,.15)!important;color:var(--qb-accent-strong,#8d2452)!important;font-weight:900!important}.qbi-lip-index-group[data-empty="1"]{opacity:.78}
 .qbi-tp4-methods{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin:16px 0 22px}.qbi-tp4-methods article{padding:16px;border:1px solid rgba(113,78,99,.16);border-radius:14px;background:#fff}.qbi-tp4-methods h3{margin:7px 0 8px;color:var(--qb-accent-strong,#8d2452)}.qbi-tp4-methods p{margin:7px 0;line-height:1.58}.qbi-tp4-method-tag{display:inline-block;padding:5px 8px;border-radius:999px;background:var(--qb-accent-soft,#fff0f6);color:var(--qb-accent-strong,#8d2452);font-size:.72rem;font-weight:900;letter-spacing:.06em}.qbi-tp4-roadmap{display:grid;gap:9px;margin:16px 0 24px}.qbi-tp4-roadmap article{display:grid;grid-template-columns:36px 1fr;gap:11px;align-items:start;padding:12px 14px;border:1px solid rgba(113,78,99,.14);border-radius:12px;background:#fff}.qbi-tp4-roadmap article>b{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:var(--qb-accent,#e74888);color:#fff}.qbi-tp4-roadmap strong,.qbi-tp4-roadmap span{display:block}.qbi-tp4-roadmap span{margin-top:3px;line-height:1.5;color:var(--qb-muted,#75596a)}#tp4{min-height:72px}.qbi-lip-tp4-title{margin:28px 0 4px}
 @media(max-width:680px){.qbi-lip-cols{grid-template-columns:1fr}.qbi-lip-flow{align-items:stretch}.qbi-lip-flow span{flex:1 1 100%}.qbi-lip-flow b{display:none}}
 `;document.head.append(s);
}
function nav(){
 return document.querySelector('.qb-summary .qb-sidebar #summaryIndex')||document.querySelector('.qb-sidebar #summaryIndex')||document.querySelector('#summaryIndex');
}
function addIndex(){
 const index=nav(); if(!index)return false;
 index.querySelectorAll('[data-qbi-lip-index]').forEach(x=>x.remove());
 const anchor=index.querySelector('a[href="#cap41"]')||[...index.querySelectorAll('a[href^="#cap"]')].pop();
 if(!anchor)return false;
 let cursor=anchor;
 const add=(href,text,cls='',empty='')=>{const a=anchor.cloneNode(false);a.removeAttribute('id');a.classList.remove('active');a.removeAttribute('style');a.href=href;a.textContent=text;a.dataset.qbiLipIndex='1';if(cls)a.classList.add(cls);if(empty)a.dataset.empty=empty;cursor.insertAdjacentElement('afterend',a);cursor=a;return a};
 add('#lipidos-i','Lípidos I','qbi-lip-index-group');
 chapters.filter(x=>x.group==='Lípidos I').forEach(ch=>add('#cap'+ch.n,ch.n+'. '+ch.title));
 add('#lipidos-ii','Lípidos II','qbi-lip-index-group');
 chapters.filter(x=>x.group==='Lípidos II').forEach(ch=>add('#cap'+ch.n,ch.n+'. '+ch.title));
 add('#tp4','TP4 · Extracción y separación de lípidos','qbi-lip-index-group');
 return true;
}
function build(){
 if(chapters.every(ch=>document.getElementById('cap'+ch.n))&&document.getElementById('tp4'))return true;
 const anchor=document.getElementById('cap41'); if(!anchor?.parentNode)return false;
 for(let n=FIRST;n<=LAST;n++)document.getElementById('cap'+n)?.remove();
 document.getElementById('lipidos-i')?.remove();document.getElementById('lipidos-ii')?.remove();document.getElementById('tp4')?.remove();
 let cursor=anchor;
 const group1=document.createElement('div');group1.id='lipidos-i';group1.className='qbi-lip-anchor';cursor.insertAdjacentElement('afterend',group1);cursor=group1;
 chapters.filter(x=>x.group==='Lípidos I').forEach(ch=>{const wrap=document.createElement('div');wrap.innerHTML=sectionHtml(ch);const s=wrap.firstElementChild;cursor.insertAdjacentElement('afterend',s);cursor=s});
 const group2=document.createElement('div');group2.id='lipidos-ii';group2.className='qbi-lip-anchor';cursor.insertAdjacentElement('afterend',group2);cursor=group2;
 chapters.filter(x=>x.group==='Lípidos II').forEach(ch=>{const wrap=document.createElement('div');wrap.innerHTML=sectionHtml(ch);const s=wrap.firstElementChild;cursor.insertAdjacentElement('afterend',s);cursor=s});
 const tpWrap=document.createElement('div');tpWrap.innerHTML=tp4Html();const tp=tpWrap.firstElementChild;cursor.insertAdjacentElement('afterend',tp);
 return true;
}
function updateMeta(){
 const badge=[...document.querySelectorAll('.qb-hero-badges span')].find(x=>/cap[ií]tulos/i.test(x.textContent||''));if(badge)badge.textContent=LAST+' capítulos';
 document.documentElement.dataset.qbiLipidos=VERSION;
 document.documentElement.dataset.qbiVisibleIndex=String(LAST);
}
function ensure(){
 ensureStyle();
 if(!build())return false;
 if(!addIndex())return false;
 updateMeta();
 return true;
}
let tries=0;function boot(){if(ensure())return;if(++tries<200)setTimeout(boot,150)}
function maintain(){if(!document.getElementById('cap57')||!document.getElementById('tp4')||!nav()?.querySelector('[data-qbi-lip-index]'))ensure()}
const observer=new MutationObserver(()=>{clearTimeout(observer.timer);observer.timer=setTimeout(maintain,100)});
function start(){observer.observe(document.documentElement,{subtree:true,childList:true});boot();setTimeout(maintain,1000);setInterval(maintain,3000)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();