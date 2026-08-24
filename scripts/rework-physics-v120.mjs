import fs from "node:fs";

const base="content/subjects/fisica1/units/resumen-integral";
const read=file=>fs.readFileSync(`${base}/${file}`,"utf8");
const write=(file,value)=>fs.writeFileSync(`${base}/${file}`,value);

const glossary=[
["Sistema de referencia","Conjunto formado por un origen, ejes coordenados y un reloj respecto del cual se describen posiciones y movimientos."],
["Posición","Vector que ubica un cuerpo respecto del origen del sistema de referencia."],
["Desplazamiento","Cambio de posición entre dos instantes. Es vectorial y no coincide necesariamente con la distancia recorrida."],
["Trayectoria","Conjunto de posiciones sucesivas ocupadas por un móvil."],
["Distancia recorrida","Longitud total de la trayectoria. Es escalar y siempre no negativa."],
["Velocidad media","Cociente entre desplazamiento e intervalo de tiempo; informa el cambio neto de posición."],
["Velocidad instantánea","Derivada de la posición respecto del tiempo; es tangente a la trayectoria."],
["Rapidez","Módulo de la velocidad. Es una magnitud escalar."],
["Aceleración","Derivada de la velocidad respecto del tiempo; puede cambiar su módulo, su dirección o ambos."],
["MRU","Movimiento rectilíneo con velocidad constante y aceleración nula."],
["MRUV","Movimiento rectilíneo con aceleración constante; sus ecuaciones no valen para aceleración variable."],
["Caída libre","Movimiento sometido únicamente a la gravedad, despreciando el rozamiento con el aire."],
["Vector","Magnitud definida por módulo, dirección y sentido."],
["Componente","Proyección de un vector sobre un eje elegido."],
["Versor","Vector de módulo uno que indica una dirección y un sentido."],
["Producto escalar","Operación entre vectores cuyo resultado es un escalar; mide cuánto apunta uno en la dirección del otro."],
["Producto vectorial","Operación cuyo resultado es perpendicular al plano de los vectores y cuyo módulo mide el área del paralelogramo que forman."],
["Movimiento relativo","Descripción del movimiento de un cuerpo visto desde otro sistema de referencia."],
["Velocidad angular","Rapidez con la que cambia el ángulo; se mide en radianes por segundo."],
["Período","Tiempo necesario para completar un ciclo o una vuelta."],
["Frecuencia","Cantidad de ciclos por unidad de tiempo; es la inversa del período."],
["Aceleración centrípeta","Componente de la aceleración dirigida hacia el centro que cambia la dirección de la velocidad."],
["Aceleración tangencial","Componente que cambia el módulo de la velocidad en un movimiento curvo."],
["Inercia","Tendencia de un cuerpo a conservar su estado de reposo o movimiento rectilíneo uniforme."],
["Fuerza","Interacción vectorial capaz de cambiar la cantidad de movimiento de un cuerpo."],
["Fuerza neta","Suma vectorial de todas las fuerzas externas que actúan sobre el cuerpo elegido."],
["Diagrama de cuerpo libre","Representación del cuerpo aislado con todas y sólo las fuerzas externas que actúan sobre él."],
["Peso","Fuerza gravitatoria ejercida por la Tierra sobre un cuerpo; cerca de la superficie vale mg."],
["Normal","Fuerza de contacto perpendicular a la superficie; no es necesariamente igual al peso."],
["Tensión","Fuerza transmitida por una cuerda o cable ideal, dirigida a lo largo de él."],
["Rozamiento estático","Fuerza que evita el deslizamiento y se ajusta desde cero hasta un valor máximo."],
["Rozamiento cinético","Fuerza que se opone al deslizamiento entre superficies y cuyo módulo ideal es proporcional a la normal."],
["Equilibrio","Estado con aceleración lineal y angular nulas; exige fuerza neta y torque neto iguales a cero."],
["Ley de Hooke","Modelo lineal de un resorte ideal: la fuerza restauradora es proporcional y opuesta a la deformación."],
["Trabajo","Transferencia de energía debida a la componente de una fuerza paralela al desplazamiento."],
["Energía cinética","Energía asociada al movimiento traslacional de un cuerpo."],
["Energía potencial","Energía asociada a la configuración de un sistema bajo fuerzas conservativas."],
["Energía mecánica","Suma de las energías cinética y potencial."],
["Fuerza conservativa","Fuerza cuyo trabajo depende sólo de las posiciones inicial y final y permite definir energía potencial."],
["Potencia","Rapidez con la que se realiza trabajo o se transfiere energía."],
["Cantidad de movimiento","Producto de masa y velocidad; es vectorial y se conserva si el impulso externo es nulo."],
["Impulso","Integral de la fuerza en el tiempo; equivale al cambio de cantidad de movimiento."],
["Choque elástico","Colisión que conserva cantidad de movimiento y energía cinética."],
["Choque inelástico","Colisión que conserva cantidad de movimiento pero no energía cinética."],
["Centro de masa","Punto promedio de la distribución de masa cuyo movimiento responde a la fuerza externa neta."],
["Incertidumbre","Intervalo asociado a una medición que expresa la resolución y variabilidad del procedimiento."],
["Error sistemático","Sesgo que desplaza repetidamente las mediciones en una misma dirección y no desaparece promediando."],
["Error aleatorio","Variación impredecible entre mediciones que produce dispersión y puede reducirse mediante repeticiones."],
["Exactitud","Cercanía de un resultado al valor de referencia."],
["Precisión","Grado de concordancia entre mediciones repetidas."],
["Propagación de incertidumbres","Cálculo de la incertidumbre de una magnitud obtenida a partir de otras magnitudes medidas."],
["Linealización","Transformación de variables que permite representar una relación mediante una recta y extraer parámetros de su pendiente u ordenada."],
["Torque","Efecto rotacional de una fuerza respecto de un punto o eje."],
["Momento de inercia","Medida de cómo está distribuida la masa respecto de un eje y de la resistencia a cambiar la rotación."],
["Momento angular","Magnitud rotacional cuya variación es producida por el torque externo."],
["Rodadura sin deslizamiento","Movimiento en el que el punto de contacto está instantáneamente en reposo y se cumple la restricción v=ωR."],
["Movimiento armónico simple","Oscilación producida por una fuerza restauradora lineal, con aceleración opuesta y proporcional al desplazamiento."],
["Amplitud","Máximo desplazamiento respecto de la posición de equilibrio."],
["Fase","Estado del ciclo oscilatorio que fija la posición y el sentido de movimiento en un instante."],
["Presión","Fuerza normal por unidad de área."],
["Densidad","Masa por unidad de volumen."],
["Presión manométrica","Diferencia entre la presión absoluta y la atmosférica."],
["Principio de Pascal","Una variación de presión aplicada a un fluido confinado se transmite a todos sus puntos."],
["Empuje","Fuerza vertical ascendente igual al peso del fluido desplazado."],
["Caudal volumétrico","Volumen de fluido que atraviesa una sección por unidad de tiempo."],
["Flujo estacionario","Flujo cuyas variables en cada punto no cambian con el tiempo."],
["Ecuación de continuidad","Expresión de conservación de masa; para fluido incompresible establece que Av permanece constante."],
["Ecuación de Bernoulli","Balance de energía mecánica por unidad de volumen para flujo estacionario, incompresible y no viscoso."],
["Viscosidad","Medida de la resistencia interna de un fluido a deformarse y fluir."],
["Número de Reynolds","Parámetro adimensional que compara efectos inerciales y viscosos y ayuda a distinguir regímenes de flujo."],
["Línea de corriente","Curva tangente en cada punto al vector velocidad del fluido."],
["Venturi","Dispositivo que infiere caudal mediante el cambio de velocidad y presión causado por una reducción de sección."],
["Tubo de Pitot","Instrumento que obtiene velocidad comparando presión estática y presión de estancamiento."],
["Ley de Torricelli","Resultado ideal que relaciona la velocidad de salida de un tanque grande con el desnivel de carga."],
];
write("glossary.json",JSON.stringify({entries:glossary.map(([term,definition],i)=>({id:`fisica-glosario-${i+1}`,term,definition,references:[{sourceId:"fisica-html"}]}))},null,2)+"\n");
write("cards.json",JSON.stringify({cards:[]},null,2)+"\n");
write("exercises.json",JSON.stringify({exercises:[]},null,2)+"\n");

const groups=[
 {id:"primer-parcial",label:"Primer parcial · describir y explicar el movimiento",description:"Del lenguaje vectorial a las leyes que conectan fuerzas, energía y cantidad de movimiento.",chapters:[
  ["Cinemática","fisica-tema-2",["Sistema de referencia, posición y desplazamiento","Velocidad y aceleración","MRU y MRUV","Caída libre y tiro vertical","Tiro oblicuo"]],
  ["Vectores y movimiento relativo","fisica-tema-3",["Componentes, módulo y ángulo","Suma vectorial","Producto escalar y vectorial","Cambio de observador"]],
  ["Movimiento circular","fisica-tema-5",["Variables angulares","Aceleración centrípeta","Aceleración tangencial"]],
  ["Dinámica","fisica-tema-6",["Leyes de Newton","Diagrama de cuerpo libre","Peso, normal y tensión","Rozamiento","Resortes","Gravitación"]],
  ["Trabajo y energía","fisica-tema-10",["Trabajo de una fuerza","Energía cinética y potencial","Conservación y disipación","Potencia"]],
  ["Impulso y choques","fisica-tema-11",["Cantidad de movimiento","Impulso","Sistemas aislados","Choques elásticos e inelásticos","Centro de masa"]]
 ]},
 {id:"laboratorio",label:"Laboratorio · medir, modelar y decidir",description:"Cómo expresar una medición, estimar su calidad y extraer una ley física de los datos.",chapters:[
  ["Medición e incertidumbre","laboratorio",["Magnitud, unidad y resolución","Errores sistemáticos y aleatorios","Exactitud y precisión","Cifras significativas"]],
  ["Tratamiento de datos","laboratorio",["Media y dispersión","Incertidumbre de la media","Propagación","Compatibilidad de resultados"]],
  ["Gráficos y ajuste","laboratorio",["Variable independiente y dependiente","Pendiente y ordenada","Linealización","Interpretación física de parámetros"]],
  ["Modelos experimentales","laboratorio",["Péndulo simple","Resorte","Caída y movimiento","Hipótesis y límites"]]
 ]},
 {id:"segundo-parcial",label:"Segundo parcial · rotación, oscilaciones y fluidos",description:"Extensión de las leyes de traslación a cuerpos rígidos, sistemas oscilantes y medios continuos.",chapters:[
  ["Rotación y momento angular","segundo-parcial",["Torque y aceleración angular","Momento de inercia","Teorema de Steiner","Conservación del momento angular"]],
  ["Rodadura y equilibrio","segundo-parcial",["Restricción de rodadura","Energía traslacional y rotacional","Poleas con inercia","Equilibrio de fuerzas y torques"]],
  ["Oscilaciones","segundo-parcial",["Movimiento armónico simple","Frecuencia, período y fase","Energía del MAS","Péndulo simple y físico"]],
  ["Hidrostática","segundo-parcial",["Presión y profundidad","Pascal y manómetros","Arquímedes y flotación"]],
  ["Hidrodinámica","segundo-parcial",["Caudal y continuidad","Hipótesis de Bernoulli","Venturi, Pitot y Torricelli","Pérdidas y límites del modelo ideal"]]
 ]}
];
write("physics-mind-map.json",JSON.stringify({schemaVersion:1,contentVersion:"1.2.0",groups:groups.map(g=>({...g,chapters:g.chapters.map(([label,target,topics])=>({label,target,topics}))}))},null,2)+"\n");
write("map.json",JSON.stringify({nodes:[{id:"fisica-map-entry",type:"subject",label:"Mapa mental integral de Física I"}],edges:[]},null,2)+"\n");

let html=read("summary.html");
const marker="data-physics-deepening=\"1.2.0\"";
if(!html.includes(marker)){
 const css=`<style ${marker}>
 .formula-explanation{margin:-2px 0 12px;padding:9px 12px;border-left:3px solid var(--blue,#2563eb);background:rgba(37,99,235,.06);border-radius:0 8px 8px 0;font-size:.88rem;line-height:1.5;color:var(--muted,#526071)}
 .fundamental-theory{margin:12px 0;padding:14px;border:1px solid rgba(37,99,235,.2);border-radius:12px;background:rgba(255,255,255,.52)}.fundamental-theory h4{margin:0 0 8px}.fundamental-theory p{margin:7px 0;line-height:1.6}
 </style>`;
 const js=`<script ${marker}>
document.addEventListener('DOMContentLoaded',()=>{
 const topicTheory={
  'Cinemática':['El modelo empieza eligiendo sistema de referencia, origen, ejes y sentido positivo. Posición, velocidad y aceleración son magnitudes distintas: la velocidad describe cómo cambia la posición y la aceleración cómo cambia la velocidad.','MRU supone velocidad constante; MRUV supone aceleración constante. Antes de usar una ecuación comprobá esa hipótesis y separá cada eje. En dos dimensiones, ambos ejes comparten el mismo tiempo.'],
  'Vectores y componentes':['Un vector no queda determinado sólo por un número: necesita módulo, dirección y sentido. Las componentes dependen de los ejes elegidos, pero el vector físico no cambia.','Conviene descomponer, operar por ejes y reconstruir al final. Para el ángulo, atan2(Ay,Ax) evita perder el cuadrante que la arctangente simple no distingue.'],
  'Leyes de Newton y DCL':['La dinámica pregunta por las causas del movimiento. La segunda ley se aplica a un cuerpo o sistema bien delimitado y a la suma de fuerzas externas, nunca a una fuerza aislada.','El DCL precede a las cuentas: aislá el cuerpo, dibujá sólo fuerzas que actúan sobre él, elegí ejes y proyectá. Equilibrio significa aceleración nula, no ausencia de fuerzas.'],
  'Trabajo y energía':['El enfoque energético relaciona estados inicial y final sin reconstruir necesariamente el tiempo. El trabajo neto cambia la energía cinética y las fuerzas conservativas permiten definir energía potencial.','La energía mecánica se conserva sólo si no hay transferencia por fuerzas no conservativas. Con rozamiento hay que incluir la energía disipada y cuidar la convención de signos.'],
  'Cantidad de movimiento, centro de masa y choques':['La cantidad de movimiento es vectorial. Se conserva cuando el impulso externo durante el intervalo considerado es despreciable; la energía cinética sólo se conserva en choques elásticos.','Elegí el sistema antes de plantear la conservación. En dos dimensiones se conserva cada componente por separado. El centro de masa responde a la resultante externa como si toda la masa estuviera concentrada allí.'],
  'Cuerpo rígido y rotación':['La rotación es el análogo angular de la traslación: torque cumple el papel de fuerza, momento de inercia el de masa y aceleración angular el de aceleración.','El momento de inercia depende de cómo se distribuye la masa y del eje elegido. Por eso siempre debe informarse el eje antes de usarlo.'],
  'Oscilaciones y resortes':['Un sistema realiza movimiento armónico simple sólo cuando, cerca del equilibrio, la fuerza neta es restauradora y proporcional al desplazamiento.','La frecuencia natural surge de las propiedades del sistema. Amplitud y fase fijan el estado inicial, pero en el modelo ideal no cambian la frecuencia.'],
  'Fluidos dinámica':['Continuidad expresa conservación de masa; Bernoulli expresa conservación de energía mecánica bajo hipótesis ideales. No son fórmulas intercambiables y suelen usarse juntas.','Antes de aplicar Bernoulli verificá flujo estacionario, fluido incompresible, viscosidad despreciable y ausencia de máquinas o pérdidas entre los puntos.']
 };
 const formulaRules=[
  [/x_0.*v.*t|x = x_0/,'Da la posición en MRU: posición inicial más el desplazamiento producido por una velocidad constante durante el tiempo.'],
  [/v_0.*a.*t/,'Relaciona velocidades inicial y final cuando la aceleración es constante; el signo de a depende del eje elegido.'],
  [/tfrac\\{1\\}\\{2\\}a t\^2|frac12at\^2/,'Da la posición en MRUV; el término cuadrático representa el efecto acumulado de la aceleración.'],
  [/v\^2.*v_0\^2.*2a/,'Relaciona velocidad y desplazamiento sin usar el tiempo; sólo vale con aceleración constante.'],
  [/cos.*theta|sin.*theta/,'Es una proyección trigonométrica. El seno o coseno correcto depende de cómo se midió el ángulo respecto de los ejes.'],
  [/sum.*F|ma/,'Expresa la segunda ley para el sistema elegido: la suma vectorial de fuerzas externas determina la aceleración.'],
  [/mu.*N/,'Modelo de rozamiento seco. En estático representa un máximo; en cinético da el módulo durante el deslizamiento.'],
  [/k.*x/,'Relación del resorte ideal dentro del régimen elástico. La fuerza completa lleva sentido opuesto a la deformación.'],
  [/mgh|rho gh/,'Relaciona un cambio vertical con energía potencial o presión hidrostática; la altura debe medirse con una referencia coherente.'],
  [/tfrac\\{1\\}\\{2\\}m?v\^2/,'Representa energía cinética; depende del cuadrado de la rapidez y nunca es negativa.'],
  [/p.*m.*v|vec\\{p\\}/,'Define o conserva cantidad de movimiento. Como es vectorial, debe plantearse componente por componente.'],
  [/tau.*I|I.*alpha/,'Es la segunda ley rotacional respecto del eje elegido; el torque neto produce aceleración angular.'],
  [/omega.*R|R.*omega/,'Es la restricción cinemática de rodadura sin deslizamiento o la relación entre velocidad lineal y angular.'],
  [/sqrt.*k.*m|sqrt.*m.*k/,'Fija la frecuencia o el período natural de un oscilador ideal a partir de su inercia y rigidez.'],
  [/A_1v_1|Q=Av|Q = Av/,'Expresa caudal y continuidad para flujo incompresible: menor sección implica mayor velocidad.'],
  [/Bernoulli|rho gy|rho v\^2/,'Es el balance de Bernoulli entre presión, altura y velocidad bajo las hipótesis del flujo ideal.'],
  [/sqrt\\{2gh\\}/,'Resultado ideal de Torricelli o Pitot: convierte una altura de carga en velocidad.']
 ];
 document.querySelectorAll('.topic-card').forEach(card=>{
  const title=card.querySelector('.topic-head')?.textContent.replace(/^\\s*[A-Z]?\\d+\\s*/, '').trim()||'este tema';
  const details=card.querySelector('.theory-expansion .inside');
  if(details){const key=Object.keys(topicTheory).find(k=>title.includes(k));const extra=topicTheory[key];if(extra&&!details.querySelector('.fundamental-theory'))details.insertAdjacentHTML('afterbegin',\`<section class="fundamental-theory"><h4>Teoría fundamental</h4><p>\${extra[0]}</p><p>\${extra[1]}</p></section>\`)}
  let label='';card.querySelectorAll('.topic-body>*').forEach(el=>{if(el.classList.contains('lbl'))label=el.textContent.trim();if(!el.classList.contains('fml'))return;const raw=el.textContent.replace(/\\s+/g,' ').trim();const rule=formulaRules.find(([rx])=>rx.test(raw));const text=rule?rule[1]:\`Esta relación corresponde a \${label||title}. Usala sólo después de identificar las magnitudes, unidades, signos e hipótesis del modelo; cada símbolo debe referirse al mismo sistema y al mismo instante o estado indicado.\`;const p=document.createElement('p');p.className='formula-explanation';p.innerHTML=\`<strong>Qué expresa y cuándo se usa.</strong> \${text}\`;el.insertAdjacentElement('afterend',p)})
 });
});
</script>`;
 html=html.replace("</head>",css+"</head>").replace("</body>",js+"</body>");
}
write("summary.html",html);

const pkg=JSON.parse(read("package.json"));pkg.contentVersion="1.2.0";write("package.json",JSON.stringify(pkg,null,2)+"\n");
const rich=JSON.parse(read("rich.json"));write("rich.json",JSON.stringify(rich,null,2)+"\n");
