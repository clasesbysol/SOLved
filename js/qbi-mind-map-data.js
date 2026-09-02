(function(){
  "use strict";
  const topic=(label,explanation,equations=[],visual="")=>({label,explanation,equations,visual});
  const chapter=(label,target,intro,topics)=>({label,target,intro,topics});
  window.QBI_MIND_MAP_DATA=[
    {id:"proteinas",label:"Proteínas · de aminoácidos a función",description:"Primero qué piezas existen; después cómo se unen, se pliegan y se asocian.",chapters:[
      chapter("1. Aminoácidos y péptidos","cap1","La cadena lateral R determina polaridad, carga, tamaño y reactividad. El enlace peptídico conecta aminoácidos y deja una cadena con dirección N → C.",[
        topic("Estructura, ionización y pI","Un aminoácido puede tener cargas positivas y negativas al mismo tiempo. El pI es el pH donde la carga neta promedio vale cero. Para calcularlo se promedian los dos pKa que rodean a la especie neutra. Si el pH supera al pI, predomina carga negativa; si queda por debajo, positiva.",["pH < pI  →  carga positiva","pH = pI  →  carga neta promedio 0","pH > pI  →  carga negativa"]),
        topic("Enlace peptídico","Se forma entre el carboxilo de un aminoácido y el amino del siguiente. Tiene resonancia, carácter parcial de doble enlace y por eso es plano: no gira libremente. La cadena se escribe desde el extremo N hacia el C."),
        topic("Mnemotecnias de los grupos","🚫🧲🫃 Apolares alifáticos: «Pero metele lengua, Ala Val» → Pro, Met, Ile, Leu, Gly, Ala, Val. 🤏⌬ Aromáticos: «Pe–Ti–Tri» → Phe, Tyr, Trp. 🇦🇷 Básicos: «Los argentinos tienen historia» → Arg, Lys, His. 😐0️⃣ Polares sin carga: Ser, Thr, Cys, Asn, Gln; acá va Gln, no Glu. 😢🤢 Ácidos: «Glu–Asp» → Glu y Asp.")
      ]),
      chapter("2. Estructuras proteicas","cap2","Los cuatro niveles no son proteínas distintas: son cuatro maneras de describir la misma arquitectura.",[
        topic("Primaria, secundaria, terciaria y cuaternaria","Primaria: secuencia y enlaces covalentes. Secundaria: arreglos locales del esqueleto, como hélice α y lámina β. Terciaria: forma tridimensional completa de una cadena. Cuaternaria: asociación de varias cadenas o subunidades."),
        topic("Hojas β paralelas y antiparalelas","En la paralela, las hebras avanzan en el mismo sentido N → C y los puentes de H quedan algo inclinados. En la antiparalela, avanzan en sentidos opuestos y los puentes de H son más lineales; por eso suelen ser individualmente más favorables. Los grupos R alternan arriba y abajo de la lámina."),
        topic("Qué estabiliza la forma","El efecto hidrofóbico reúne grupos apolares lejos del agua; puentes de H, interacciones iónicas y van der Waals afinan la estructura. Los puentes disulfuro son covalentes. Muchas interacciones débiles juntas pueden estabilizar mucho.")
      ]),
      chapter("3. Plegamiento, desnaturalización y chaperonas","cap4","La secuencia contiene la información de plegamiento, pero el camino real depende del paisaje energético y del medio celular.",[
        topic("Desnaturalización y renaturalización","Desnaturalizar suele perder secundaria, terciaria y cuaternaria, junto con la función; normalmente no corta enlaces peptídicos ni destruye la primaria. Si al retirar el agente la proteína recupera forma y función, hubo renaturalización. Agregación o daño químico pueden volver el proceso irreversible."),
        topic("Anfinsen, Levinthal y embudo energético","Anfinsen mostró que la secuencia puede contener la información necesaria para llegar al estado nativo. Levinthal señaló que probar todas las conformaciones al azar demoraría muchísimo. El embudo resuelve la aparente paradoja: existen muchas configuraciones arriba, pero las interacciones van sesgando rutas hacia estados de menor energía libre."),
        topic("Chaperonas","Evitan contactos incorrectos, agregación y estados atrapados. Algunas brindan una cavidad protegida y consumen ATP. No deciden la secuencia ni inventan la forma final: ayudan a que la información de la secuencia pueda expresarse.")
      ]),
      chapter("4. Proteínas de membrana","cap5","La forma de asociación depende de si una superficie toca agua, lípido o ambas fases.",[
        topic("Integrales, periféricas y anfipáticas","Las integrales penetran la bicapa y suelen requerir detergente para extraerse. Las periféricas se unen por interacciones no covalentes a cabezas polares o a otras proteínas y pueden liberarse con cambios suaves de sal o pH. Muchas proteínas y hélices son anfipáticas: presentan una cara polar y otra apolar; «anfitrópica» suele usarse para proteínas que alternan entre estado soluble y asociado a membrana."),
        topic("Hélices y barriles transmembrana","Las caras que contactan las colas lipídicas son hidrofóbicas. Una hélice puede cruzar la bicapa; los barriles β de porinas dejan exterior apolar e interior polar para formar un canal.")
      ])
    ]},
    {id:"purificacion",label:"Purificación y cromatografía",description:"Desde la fuente biológica hasta comprobar cuánto se purificó y cuánto se recuperó.",chapters:[
      chapter("5. Preparar y fraccionar el extracto","cap6","Una purificación es una cadena de decisiones: obtener la muestra, romper sin destruir, retirar restos, concentrar y separar.",[
        topic("Fuente, ruptura y extracto","La fuente debe contener suficiente proteína. La ruptura puede ser mecánica, sonicación, congelamiento/descongelamiento, choque osmótico, detergentes o enzimas. Después se centrifuga: los restos grandes sedimentan y el sobrenadante forma el extracto soluble."),
        topic("Salting out con sulfato de amonio","A alta concentración de sal, los iones compiten eficazmente por el agua. Queda menos agua disponible para hidratar la superficie proteica; aumentan los contactos proteína–proteína y algunas precipitan. Como cada proteína lo hace en un intervalo de saturación distinto, se puede fraccionar sin desnaturalizar necesariamente."),
        topic("Precipitación cerca del pI","Cerca del pI la carga neta promedio se aproxima a cero. No desaparecen todas las cargas, pero disminuye la repulsión electrostática entre moléculas. Pueden acercarse, agregarse y precipitar con mayor facilidad."),
        topic("Diálisis y ultrafiltración","En diálisis de laboratorio la membrana retiene macromoléculas y deja difundir sales pequeñas. En diálisis clínica no se coloca sangre nueva: la misma sangre circula junto a una membrana, pierde urea, exceso de sales y agua, y regresa al cuerpo. En ultrafiltración, una presión impulsa solvente y solutos pequeños a través de la membrana y concentra lo retenido.")
      ]),
      chapter("6. Cromatografía de columna","cap7","El buffer arrastra la muestra por una matriz. Cuanto más fuerte sea una interacción con la fase estacionaria, más tarde eluye la molécula.",[
        topic("Arquitectura, empaquetamiento y tiempo de retención","Fase estacionaria = matriz; fase móvil = buffer. Un mal empaquetamiento crea canales preferenciales, ensancha bandas y reduce la resolución. La absorbancia a 280 nm permite seguir proteínas, pero no identifica por sí sola la proteína buscada. El tiempo de retención es el tiempo hasta el pico.",["tR = Ve / Q","Ve: volumen de elución","Q: caudal"]),
        topic("Intercambio iónico","El nombre indica qué ion retiene la matriz, no el signo de la matriz. El intercambiador catiónico tiene matriz negativa y retiene proteínas positivas. El aniónico tiene matriz positiva y retiene proteínas negativas. Se eluye aumentando sal o modificando pH.",["pH > pI → proteína negativa → intercambiador aniónico","pH < pI → proteína positiva → intercambiador catiónico"]),
        topic("Exclusión molecular","La matriz tiene poros. Las moléculas grandes no entran, recorren un camino corto y salen primero. Las pequeñas exploran el interior de los poros y salen después. Más volumen de muestra ensancha la zona y baja resolución; una columna más larga suele mejorarla, aunque aumenta tiempo y difusión.",[],"gel-filtration"),
        topic("Gradientes, escalones y caudal","Un gradiente continuo cambia suavemente la fuerza de elución y separa especies cercanas. Los escalones cambian de golpe y son más rápidos, pero menos finos. Caudal excesivo reduce el tiempo para equilibrar con la matriz; caudal muy bajo aumenta difusión.")
      ]),
      chapter("7. Medir si la purificación funcionó","cap8","Pureza y recuperación responden preguntas diferentes: cuánto enriquecí la proteína buscada y cuánto de su actividad conservé.",[
        topic("Proteína, actividad y actividad específica","Proteína total combina concentración y volumen. Actividad total hace lo mismo con la actividad volumétrica. La actividad específica relaciona función buscada con toda la proteína presente; si aumenta, la preparación se enriqueció.",["proteína total = [proteína] · V","actividad total = actividad volumétrica · V","AE = actividad total / proteína total"]),
        topic("Factor de purificación","Compara la actividad específica de una etapa con la inicial. Un factor 10 significa que ahora hay diez veces más actividad de la enzima buscada por cada miligramo de proteína total; no significa que recuperaste diez veces más enzima.",["FP = AE(etapa) / AE(inicial)"]),
        topic("Rendimiento","Mide qué fracción de la actividad inicial sobrevivió. Normalmente baja porque siempre hay pérdidas, aunque la actividad específica suba.",["Rendimiento (%) = actividad total(etapa) / actividad total(inicial) · 100"])
      ])
    ]},
    {id:"electroforesis",label:"Electroforesis y análisis",description:"Qué impulsa la migración, qué hace el gel y qué información conserva cada variante.",chapters:[
      chapter("8. Fundamento y materiales","cap9","El campo impulsa a las cargas; el medio se opone mediante fricción. La velocidad observada surge del equilibrio entre ambas tendencias.",[
        topic("Ánodo, cátodo, pH y pI","Ánodo = positivo y atrae aniones. Cátodo = negativo y atrae cationes. En una proteína nativa hay que comparar pH con pI para conocer el signo. En SDS-PAGE, el SDS domina y lleva las cadenas al ánodo."),
        topic("Agarosa, acrilamida y bisacrilamida","La agarosa es un polisacárido de poros grandes, usual para ADN/ARN y montaje horizontal. Acrilamida es el monómero de la poliacrilamida; bisacrilamida entrecruza cadenas y define la red. Más porcentaje de gel produce poros menores."),
        topic("APS, TEMED y voltaje","APS inicia radicales y TEMED acelera la polimerización. Más voltaje aumenta velocidad, pero también calentamiento, difusión y deformación de bandas. Demasiada muestra satura el carril y la tinción, ensancha bandas y hace que especies cercanas se superpongan.")
      ]),
      chapter("9. Agarosa, PAGE nativa y SDS-PAGE","cap10","Antes de interpretar una banda, preguntá qué propiedad domina la separación y qué estructura fue destruida o conservada.",[
        topic("Agarosa y orientación del equipo","La agarosa suele correrse horizontalmente y separa ADN/ARN principalmente por tamaño: los fragmentos pequeños atraviesan más fácilmente la malla y avanzan más. La poliacrilamida suele montarse verticalmente entre placas."),
        topic("PAGE nativa","No desnaturaliza intencionalmente. La migración depende a la vez de carga, tamaño y forma; puede conservar complejos y actividad, pero no permite leer masa molecular de manera simple."),
        topic("SDS-PAGE reductora y no reductora","SDS desnaturaliza y aporta una relación carga negativa/masa aproximadamente uniforme; separa principalmente por masa aparente. SDS no rompe puentes disulfuro. β-mercaptoetanol o DTT sí los reducen. Comparar corrida reductora y no reductora permite inferir si cadenas estaban unidas por disulfuros.")
      ]),
      chapter("10. IEF, 2D e identificación","cap11","Combinar propiedades distintas aumenta muchísimo la capacidad de resolver mezclas complejas.",[
        topic("Isoelectroenfoque","Existe un gradiente de pH. Cada proteína migra mientras tenga carga y se detiene donde pH = pI; si se aleja de ese punto recupera carga y vuelve, por eso se “enfoca”."),
        topic("Electroforesis bidimensional","Primera dimensión: IEF separa por pI. Segunda dimensión, perpendicular: SDS-PAGE separa por masa. No es una cromatografía de agarosa. Permite separar proteínas con masa similar pero carga distinta."),
        topic("Tinciones, Western y masas","Coomassie es simple y de sensibilidad intermedia; plata es muy sensible pero menos lineal; fluorescencia ofrece buen rango. Western identifica mediante anticuerpos. Espectrometría de masas identifica por masas y fragmentación de péptidos. Una sola banda sugiere pureza alta, pero no prueba pureza absoluta.")
      ])
    ]},
    {id:"tp1",label:"TP1 · Determinación de proteínas",description:"Cómo una absorbancia se transforma en concentración y por qué los métodos no responden igual.",chapters:[
      chapter("11. Biuret, Lowry y Bradford","cap-tp1","Los tres estiman proteína comparando la señal de la muestra con estándares, pero la química de la señal cambia.",[
        topic("Biuret","Cu²⁺ forma un complejo con enlaces peptídicos en medio alcalino. Es robusto y relativamente poco sensible; necesita concentraciones mayores."),
        topic("Lowry","Combina la reacción tipo Biuret con reducción del reactivo de Folin, especialmente por residuos aromáticos. Es más sensible, pero tiene más pasos e interferencias."),
        topic("Bradford","Coomassie cambia su espectro al unirse, especialmente a residuos básicos y aromáticos. Es rápido y sensible, aunque la respuesta depende más de la composición de la proteína."),
        topic("Curva e interpolación","Se resta el blanco, se ajusta la región lineal, se interpola la absorbancia de la incógnita y se multiplica por el factor de dilución. Una muestra fuera del rango debe diluirse y medirse otra vez.",["A = m·C + b","C = (A - b) / m","C(original) = C(medida) · FD"])
      ])
    ]},
    {id:"enzimas1",label:"Enzimas I · catálisis",description:"Energía, estado de transición y por qué el ajuste inducido acelera una reacción.",chapters:[
      chapter("12. Catálisis y sitio activo","cap14","Una reacción puede ser favorable y aun así ser lenta. La termodinámica decide el balance; la barrera decide la rapidez.",[
        topic("ΔG de reacción frente a ΔG‡","La enzima no cambia el ΔG global, el equilibrio ni el sentido termodinámicamente favorable. Reduce la energía libre de activación ΔG‡ proporcionando un camino alternativo. Si la barrera catalizada fuera igual a la no catalizada, no habría aceleración.",["ΔGreacción = GP - GS","ΔG‡ = Gestado de transición - GS","k = A · e^(-ΔG‡/RT)"]),
        topic("Choques y residuos del sitio activo","Un choque efectivo requiere energía y orientación. Residuos de fijación posicionan el sustrato, residuos catalíticos transfieren protones/electrones o forman intermediarios, y residuos estructurales sostienen la geometría."),
        topic("Llave–cerradura y ajuste inducido","Si el sitio activo estabilizara perfectamente al sustrato sin deformar, aumentaría la barrera para salir de ese pozo. En el ajuste inducido de Koshland, contactos iniciales cambian la conformación, alinean grupos y estabilizan preferentemente el estado de transición.")
      ])
    ]},
    {id:"enzimas2",label:"Enzimas II · Michaelis–Menten y TP2",description:"Del complejo ES a la hipérbola, sus parámetros, linealizaciones y mecanismos con dos sustratos.",chapters:[
      chapter("13. Estados de la reacción y Michaelis–Menten","cap15","La ecuación sale de contar cómo se forma y cómo desaparece ES, no de memorizar una hipérbola.",[
        topic("Transitorio, estacionario y etapa tardía","Al inicio ES se acumula. Luego llega el estado estacionario: ES sigue formándose y desapareciendo, pero ambas velocidades son casi iguales y [ES] permanece aproximadamente constante. No es equilibrio ni reacción detenida. Más tarde baja mucho S, sube P y ya no sirve la aproximación de velocidad inicial.",[],"progress"),
        topic("Formación y desaparición de ES","ES se forma por encuentro de E y S. Desaparece por dos rutas: disociarse otra vez o formar producto; por eso las dos constantes se suman. En estado estacionario se igualan formación y desaparición.",["E + S ⇌ ES → E + P","formación: k₁[E][S]","desaparición: (k₋₁ + k₂)[ES]","k₁[E][S] = (k₋₁ + k₂)[ES]"]),
        topic("De KM a la ecuación","KM agrupa las constantes que vacían ES respecto de la que lo forma. Al combinar estado estacionario con conservación de enzima se obtiene [ES]; como la velocidad es k₂[ES], aparece Michaelis–Menten.",["KM = (k₋₁ + k₂) / k₁","[E]T = [E] + [ES]","[ES] = [E]T[S] / (KM + [S])","v₀ = Vmax[S] / (KM + [S])"]),
        topic("Cómo leer la curva","Con poca S hay mucha enzima libre y v₀ crece casi proporcionalmente a [S]. Cuando [S] = KM, v₀ = Vmax/2. Con mucha S casi todos los sitios están ocupados y se llega a la meseta Vmax.",[],"michaelis"),
        topic("kcat","Es el número de recambio: cuántas moléculas transforma por segundo cada sitio activo cuando está saturado. Vmax se obtiene de la meseta y [E]T debe conocerse por separado.",["kcat = Vmax / [E]T","unidad: s⁻¹"])
      ]),
      chapter("14. Linealizaciones y bisustrato","cap15","Las tres linealizaciones son transformaciones algebraicas de Michaelis–Menten y se ajustan como rectas; no son regresiones logarítmicas.",[
        topic("Lineweaver–Burk","Grafica 1/v₀ frente a 1/[S]. La ordenada es 1/Vmax, la abscisa es −1/KM y la pendiente KM/Vmax. Los recíprocos amplifican el error de puntos a baja [S].",["1/v₀ = (KM/Vmax)(1/[S]) + 1/Vmax"]),
        topic("Hanes–Woolf","Grafica [S]/v₀ frente a [S]. Pendiente 1/Vmax y ordenada KM/Vmax.",["[S]/v₀ = [S]/Vmax + KM/Vmax"]),
        topic("Eadie–Hofstee","Grafica v₀ frente a v₀/[S]. Pendiente −KM y ordenada Vmax.",["v₀ = -KM(v₀/[S]) + Vmax"]),
        topic("Secuencial y ping-pong","En secuencial ambos sustratos llegan a estar unidos antes de liberar producto; puede ser ordenado o al azar. En ping-pong sale el primer producto antes de entrar el segundo y la enzima queda modificada. En familias de Lineweaver–Burk, rectas que se cruzan sugieren complejo ternario secuencial; paralelas sugieren ping-pong. Esto solo no distingue secuencial ordenado de azar."),
        topic("Cofactor, coenzima, prostético y activador","Cofactor es todo componente no proteico necesario. Coenzima es un cofactor orgánico que transporta grupos o electrones. Grupo prostético permanece firmemente unido. Activador es cualquier sustancia que aumenta actividad y no necesariamente forma parte estable de la enzima.")
      ]),
      chapter("15. TP2: lógica de cada parte","cap15","Cada etapa fija una condición experimental antes de estimar parámetros.",[
        topic("Cantidad de enzima y tiempo lineal","Se elige suficiente enzima para medir señal, pero no tanta como para agotar sustrato enseguida. La pendiente se toma en el tramo inicial lineal, donde casi no cambiaron [S] y [P]."),
        topic("KM y Vmax de cada sustrato","Se varía un sustrato y se mantiene el otro saturante; después se invierte. Se ajusta preferentemente la hipérbola por regresión no lineal."),
        topic("Temperatura y energía de activación","Se usan velocidades de la rama ascendente, antes de que domine la desnaturalización. En el gráfico de ln(v₀) frente a 1/T, la pendiente permite calcular Ea.",["ln(v₀) = C - (Ea/R)(1/T)","Ea = -pendiente · R"])
      ])
    ]},
    {id:"enzimas3",label:"Enzimas III · inhibición y regulación",description:"Cómo leer inhibidores, pH, temperatura, cooperatividad y modelos alostéricos.",chapters:[
      chapter("16. Inhibición enzimática","cap16","Preguntá primero a qué especie se une I y si una concentración alta de S puede revertir el efecto.",[
        topic("Reversibles e irreversibles","La unión reversible está en equilibrio y la actividad puede recuperarse al retirar I. Un irreversible inactiva persistentemente. Un inhibidor suicida es procesado por la enzima y genera dentro del sitio activo la especie que la inactiva. Un análogo del estado de transición imita la configuración de máxima energía y se une muy fuerte."),
        topic("Qué significan α y α′","α mide el peso de la unión del inhibidor a E; α′, a ES. Aumentan cuando sube [I] o cuando la constante de inhibición es pequeña.",["α = 1 + [I]/Ki","α′ = 1 + [I]/Ki′","v₀ = Vmax[S] / (αKM + α′[S])"]),
        topic("Competitiva","I se une a E y compite con S. Mucha S puede desplazarla: Vmax no cambia, KM aparente aumenta. En Lineweaver–Burk, las rectas comparten la ordenada 1/Vmax.",["Vmax(ap) = Vmax","KM(ap) = αKM"]),
        topic("Acompetitiva","I se une solo a ES. No se vence agregando S; de hecho, más ES ofrece más blanco. Vmax y KM disminuyen por el mismo factor y Lineweaver–Burk da paralelas.",["Vmax(ap) = Vmax/α′","KM(ap) = KM/α′"]),
        topic("Mixta y no competitiva","La mixta se une a E y ES con afinidades distintas: Vmax baja y KM puede subir o bajar. La no competitiva pura es el caso α = α′: Vmax baja y KM queda igual. En Lineweaver–Burk la pura corta en el eje x; la mixta general se cruza fuera de los ejes.",["Vmax(ap) = Vmax/α′","KM(ap) = KM·α/α′"],"inhibition"),
        topic("Dixon y Cornish–Bowden","Dixon grafica 1/v₀ frente a [I] y ayuda a obtener Ki, asociado a unión a E. Cornish–Bowden grafica [S]/v₀ frente a [I] y ayuda a obtener Ki′, asociado a unión a ES. Se trazan varias rectas a concentraciones fijas de S y son especialmente útiles para separar las dos afinidades de una inhibición mixta.",["Dixon: 1/v₀ vs [I]","Cornish–Bowden: [S]/v₀ vs [I]"])
      ]),
      chapter("17. Efecto del pH y la temperatura","cap17","Una curva con máximo puede mezclar un efecto reversible sobre la catálisis con una pérdida irreversible de estructura.",[
        topic("pH óptimo y reversibilidad","El pH cambia la protonación del sustrato y de residuos catalíticos o estructurales. Se mide v₀ a varios pH manteniendo lo demás constante. Para distinguir efecto reversible de desnaturalización: preincubar a cada pH, devolver todas las muestras al pH óptimo y medir actividad residual. Si recupera, era reversible; si no, hubo inestabilidad.",[],"ph"),
        topic("Temperatura óptima y estabilidad","Al principio, subir T aumenta choques y velocidad. A temperaturas mayores domina la inactivación. El óptimo depende del tiempo del ensayo. Para estudiar estabilidad se preincuba a distintas T y luego se mide todo a la misma T óptima.",[],"temperature")
      ]),
      chapter("18. Alosterismo y cooperatividad","cap18","Las enzimas reguladoras convierten cambios de ligando en cambios grandes de actividad.",[
        topic("Homotrópico y heterotrópico","El propio sustrato es efector homotrópico cuando su unión cambia la afinidad de otros sitios. Un efector distinto del sustrato es heterotrópico. Uno positivo desplaza la respuesta hacia menor [S] o aumenta actividad; uno negativo hace lo contrario."),
        topic("S0,5 y coeficiente de Hill","S0,5 es la concentración que produce la mitad de Vmax en una curva sigmoidea. nH cuantifica cuán cooperativa/empinada es la transición; no equivale necesariamente al número real de sitios.",["v₀ = Vmax/2 cuando [S] = S0,5","nH > 1: cooperatividad positiva","nH = 1: sin cooperatividad","nH < 1: cooperatividad negativa"]),
        topic("Monod y Koshland","En Monod–Wyman–Changeux todas las subunidades cambian concertadamente entre T, menor afinidad, y R, mayor afinidad; el ligando estabiliza una población. En Koshland el cambio es secuencial: primero cambia la subunidad que une ligando y luego influye sobre las vecinas; pueden coexistir conformaciones."),
        topic("Modificación covalente y proteólisis","Agregar o retirar grupos como fosfato regula de forma reversible. La proteólisis corta un precursor, suele ser irreversible y activa zimógenos.")
      ])
    ]}
  ];
})();
