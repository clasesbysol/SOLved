(function(){
  "use strict";

  const MATERIALS=["Programa","Apuntes","Diapositivas","Bibliografía","Guías","Trabajos prácticos","Parciales","Finales","Resoluciones","Gráficos","Imágenes","Indicaciones del profesor"];
  const QUALITY=["Todos los archivos revisados","Índice comparado con las fuentes","Temas completos","Tablas e imágenes incluidas","Fórmulas verificadas","Variables y unidades definidas","Errores frecuentes","Preguntas de examen","Referencias","Glosario","Tarjetas","Ejercicios","Mapa mental","Informe de cobertura"];
  const DEFAULT_DRAFT={subjectId:"",unit:"",objective:"Preparar un resumen completo para estudiar",examDate:"",availableTime:"",initialLevel:"desde cero",prioritySource:"programa y material del profesor",externalInfo:"separada",evaluationType:"escrito",depth:"completa",notes:"",profile:"general",materials:[]};

  const SUMMARY_FACTORY_GUIDE={
    general:{
      objective:"Transformar todos los documentos aportados en un material de estudio completo, pedagógico, verificable y útil para rendir, junto con glosario, tarjetas, ejercicios, fórmulas, mapa mental y preguntas de examen cuando correspondan.",
      mainRule:"Revisá todos los documentos antes de redactar. No omitas temas presentes en las fuentes y no reduzcas cobertura para acortar la respuesta. Si la entrega es extensa, dividila en partes conservando el índice y la cobertura total.",
      sources:[
        "Inventariá cada archivo recibido, indicá qué tipo de fuente es y señalá archivos ilegibles, incompletos, duplicados o faltantes.",
        "Priorizá el programa, las indicaciones docentes y la fuente indicada por la estudiante. Marcá contradicciones entre fuentes.",
        "Basá el contenido en las fuentes adjuntas. Toda ampliación externa debe quedar separada, identificada y no reemplazar lo exigido por la cátedra."
      ],
      firstMessage:[
        "En el primer mensaje hacé todas las preguntas necesarias en una única ronda agrupada.",
        "No preguntes información que pueda inferirse de los documentos o de esta ficha.",
        "Ofrecé opciones claras y una recomendación concreta en cada pregunta.",
        "Incluí inventario preliminar, faltantes detectados y un índice propuesto; luego esperá la configuración de la estudiante.",
        "Después de recibir las respuestas, avanzá sin confirmaciones intermedias. Volvé a preguntar sólo si falta información imprescindible o aparece una contradicción que cambia el resultado."
      ],
      initialQuestions:["Objetivo y fecha de evaluación","Tiempo real disponible","Nivel inicial","Formato y tipo de evaluación","Profundidad esperada","Fuente prioritaria","Permiso para ampliaciones externas","Recursos derivados necesarios"],
      topicInventory:"Construí un inventario jerárquico de unidades, temas, subtemas, conceptos, procedimientos, fórmulas, gráficos, tablas, ejemplos y consignas de evaluación detectados en todas las fuentes.",
      coverageMatrix:"Creá una matriz que cruce cada tema con sus fuentes, nivel de cobertura, contradicciones, faltantes y recurso final donde será tratado. Usala para controlar que nada desaparezca.",
      pedagogy:["Proponé un índice progresivo antes de fabricar el contenido.","Explicá desde cero, definiendo vocabulario antes de usarlo y conectando ideas previas con nuevas.","Asumí que el resumen puede reemplazar la asistencia a clase: incluí contexto, razonamiento, ejemplos, advertencias y pasos intermedios.","Separá teoría, métodos, ejemplos resueltos, errores frecuentes y criterios de elección."],
      writing:["Usá títulos informativos, párrafos claros, listas sólo cuando mejoren comprensión y tablas cuando permitan comparar.","No copies fragmentos sin explicar ni uses frases vagas como ‘es evidente’. Definí símbolos, variables, unidades y condiciones de validez.","Conservá precisión técnica y distinguí hechos de interpretaciones, recomendaciones o ampliaciones externas."],
      derivedResources:["Glosario con definiciones comprensibles y relaciones","Tarjetas de recuperación activa","Ejercicios graduados con resolución explicada","Fórmulas visuales y lineales, variables, unidades y condiciones","Mapa mental con relaciones etiquetadas","Preguntas de examen representativas con criterios de respuesta"],
      finalControl:["Compará el índice final con todas las fuentes y la matriz de cobertura.","Verificá temas, tablas, imágenes, fórmulas, variables, unidades, referencias, errores frecuentes y recursos derivados.","No declares verificado aquello que no pudiste comprobar."],
      coverageReport:"Cerrá con un informe de cobertura: temas cubiertos, fuente usada, temas parcialmente cubiertos, faltantes, contradicciones, ampliaciones externas y decisiones tomadas."
    },
    profiles:{
      general:{label:"General",rules:["Equilibrá conceptos, relaciones, ejemplos y práctica.","Priorizá claridad, cobertura y recuperación activa."]},
      calculus:{label:"Análisis y cálculo",rules:["Explicá intuición, definición formal, hipótesis y lectura geométrica.","Mostrá procedimientos paso a paso, dominio, signos, unidades y comprobación del resultado.","Incluí ejercicios graduados y errores algebraicos frecuentes."]},
      statistics:{label:"Estadística",rules:["Separá población, muestra, parámetro, estimador y supuestos.","Justificá la elección de cada técnica e interpretá resultados en contexto.","Incluí fórmulas, variables, unidades, lectura de gráficos y errores de inferencia."]},
      physics:{label:"Física",rules:["Partí del fenómeno y del modelo antes de las ecuaciones.","Definí sistema, ejes, signos, unidades, hipótesis y límites del modelo.","Incluí diagramas conceptuales, despejes, análisis dimensional y problemas resueltos."]},
      organicChemistry:{label:"Química orgánica",rules:["Organizá por grupos funcionales, estructura, propiedades, reactividad y mecanismos.","Mostrá movimiento electrónico, condiciones, regioselectividad, estereoquímica y productos esperados.","Incluí comparaciones, transformaciones y errores de mecanismo frecuentes."]},
      generalChemistry:{label:"Química general e inorgánica",rules:["Relacioná estructura, enlace, periodicidad, equilibrio y propiedades macroscópicas.","Balanceá ecuaciones y explicitá especies, estados, unidades y condiciones.","Incluí cálculos estequiométricos, equilibrios y criterios para elegir aproximaciones."]},
      biochemistry:{label:"Química biológica",rules:["Vinculá estructura molecular, función, energía, regulación y contexto celular.","Ordená rutas por propósito, localización, entradas, productos, enzimas clave y regulación.","Incluí integración metabólica, comparaciones y consecuencias de alteraciones."]},
      biology:{label:"Biología",rules:["Organizá por nivel de organización, estructura, función, mecanismo y evidencia.","Explicá procesos como secuencias causales y conectá escalas molecular, celular y sistémica.","Incluí comparaciones, ciclos, regulación, técnicas experimentales y vocabulario clave."]}
    }
  };

  let host,subjects=[],getSettings,saveSettings,getContext,draft={...DEFAULT_DRAFT},saveQueue=Promise.resolve();
  const safe=value=>String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const profileOptions=()=>Object.entries(SUMMARY_FACTORY_GUIDE.profiles).map(([value,item])=>`<option value="${value}">${safe(item.label)}</option>`).join("");
  const subjectOptions=()=>`<option value="">Elegir materia</option>${subjects.map(item=>`<option value="${item.id}">${safe(item.name)}</option>`).join("")}`;
  const field=(label,name,control)=>`<label class="factory-field"><span>${label}</span>${control.replace("{name}",name)}</label>`;
  const list=(items,ordered=false)=>`<${ordered?"ol":"ul"}>${items.map(item=>`<li>${safe(item)}</li>`).join("")}</${ordered?"ol":"ul"}>`;

  function suggestProfile(subject){const value=`${subject?.id||""} ${subject?.name||""}`.toLowerCase();if(/an[aá]lisis|[aá]lgebra|c[aá]lculo/.test(value))return"calculus";if(/estad/.test(value))return"statistics";if(/f[ií]sic/.test(value))return"physics";if(/org[aá]nic/.test(value))return"organicChemistry";if(/qu[ií]mica biol|bioqu[ií]mica|biomol|prote[ií]na/.test(value))return"biochemistry";if(/qu[ií]mic/.test(value))return"generalChemistry";if(/biolog|gen[eé]t|micro|inmun|biotec/.test(value))return"biology";return"general"}
  function subjectName(){return subjects.find(item=>item.id===draft.subjectId)?.name||"materia a definir"}

  function render(){
    host.innerHTML=`
      <header class="factory-hero"><div><span class="eyebrow">Guía interactiva</span><h1>Fabricar resumen</h1><p>Prepará una solicitud completa para la IA que elijas. Biblioteca LBT no envía ni procesa documentos.</p></div><div class="privacy-note"><strong>Privacidad</strong><span>El formulario sólo guarda preferencias. Adjuntá los archivos en el chat elegido; esta función no los carga ni los almacena en el repositorio.</span></div></header>
      <div class="factory-layout"><div class="factory-builder">
        <section class="factory-card" data-section="material"><h2>1. Preparar material</h2><p>No todo es obligatorio. La IA debe inventariar lo recibido y detectar faltantes.</p><div class="factory-check-grid">${MATERIALS.map(item=>`<label><input type="checkbox" name="materials" value="${safe(item)}"> ${safe(item)}</label>`).join("")}</div></section>
        <section class="factory-card" data-section="configure"><h2>2. Configurar resumen</h2><div class="factory-form">
          ${field("Materia","subjectId",`<select name="{name}">${subjectOptions()}</select>`)}
          ${field("Unidad o tema","unit",'<input name="{name}" placeholder="Ej.: Unidad 2 — Cinemática">')}
          ${field("Objetivo","objective",'<input name="{name}">')}
          ${field("Fecha de evaluación","examDate",'<input name="{name}" type="date">')}
          ${field("Tiempo disponible","availableTime",'<input name="{name}" placeholder="Ej.: 3 semanas, 2 h por día">')}
          ${field("Nivel inicial","initialLevel",'<select name="{name}"><option>desde cero</option><option>básico</option><option>intermedio</option><option>avanzado</option></select>')}
          ${field("Fuente prioritaria","prioritySource",'<input name="{name}">')}
          ${field("Información externa","externalInfo",'<select name="{name}"><option value="separada">Permitida, claramente separada</option><option value="no">No permitida</option><option value="solo-faltantes">Sólo para completar faltantes</option></select>')}
          ${field("Tipo de evaluación","evaluationType",'<select name="{name}"><option>escrito</option><option>oral</option><option>práctico</option><option>mixto</option><option>todavía no sé</option></select>')}
          ${field("Profundidad","depth",'<select name="{name}"><option value="completa">Completa</option><option value="repaso">Repaso concentrado</option><option value="profunda">Profunda y técnica</option></select>')}
          ${field("Perfil de estudio","profile",`<select name="{name}">${profileOptions()}</select>`)}
          ${field("Observaciones","notes",'<textarea name="{name}" rows="4" placeholder="Indicaciones, dificultades o preferencias"></textarea>')}
        </div></section>
        <section class="factory-card" data-section="guide"><h2>3. Instrucción y perfiles</h2><p>La instrucción maestra se incorpora completa al prompt. Podés revisar su estructura antes de copiar.</p>${renderGuide()}</section>
        <section class="factory-card" data-section="quality"><h2>4. Control de calidad</h2><p>Este checklist es instructivo: no afirma que la IA haya verificado nada.</p><div class="quality-list">${QUALITY.map(item=>`<label><input type="checkbox" disabled> ${safe(item)}</label>`).join("")}</div></section>
      </div><aside class="factory-preview"><div class="factory-preview-head"><div><span class="eyebrow">Vista previa en tiempo real</span><h2>Prompt listo para copiar</h2></div><span id="factoryCopyStatus" class="copy-status" role="status" aria-live="polite"></span></div><pre id="factoryPrompt"></pre><div class="factory-actions"><button type="button" data-copy="initial">Copiar mensaje inicial</button><button type="button" data-copy="instruction">Copiar instrucción completa</button><button type="button" class="primary-btn" data-copy="all">Copiar todo</button><button type="button" data-reset>Restaurar formulario</button></div></aside></div>`;
    bind();fill();updatePrompt();
  }

  function renderGuide(){const guide=SUMMARY_FACTORY_GUIDE.general,profile=SUMMARY_FACTORY_GUIDE.profiles[draft.profile]||SUMMARY_FACTORY_GUIDE.profiles.general;return `<div class="guide-sections"><details><summary>Objetivo, regla y fuentes</summary><p>${safe(guide.objective)}</p><p><strong>Regla principal:</strong> ${safe(guide.mainRule)}</p>${list(guide.sources)}</details><details><summary>Primer mensaje y preguntas</summary>${list(guide.firstMessage,true)}<p><strong>Preguntas iniciales:</strong></p>${list(guide.initialQuestions)}</details><details><summary>Inventario, cobertura y organización</summary><p>${safe(guide.topicInventory)}</p><p>${safe(guide.coverageMatrix)}</p>${list(guide.pedagogy)}</details><details><summary>Redacción y recursos derivados</summary>${list(guide.writing)}${list(guide.derivedResources)}</details><details><summary>Control e informe final</summary>${list(guide.finalControl)}<p>${safe(guide.coverageReport)}</p></details><details open><summary>Perfil: ${safe(profile.label)}</summary>${list(profile.rules)}</details></div>`}

  function instruction(){const guide=SUMMARY_FACTORY_GUIDE.general,profile=SUMMARY_FACTORY_GUIDE.profiles[draft.profile]||SUMMARY_FACTORY_GUIDE.profiles.general;return [
    "INSTRUCCIÓN MAESTRA PARA FABRICAR EL MATERIAL",
    `Objetivo: ${guide.objective}`,
    `Regla principal: ${guide.mainRule}`,
    "Fuentes:\n- "+guide.sources.join("\n- "),
    "Primer mensaje obligatorio:\n1. "+guide.firstMessage.join("\n2. "),
    "Preguntas iniciales a resolver en esa única ronda:\n- "+guide.initialQuestions.join("\n- "),
    `Inventario temático: ${guide.topicInventory}`,
    `Matriz de cobertura: ${guide.coverageMatrix}`,
    "Organización pedagógica:\n- "+guide.pedagogy.join("\n- "),
    "Redacción:\n- "+guide.writing.join("\n- "),
    "Recursos derivados:\n- "+guide.derivedResources.join("\n- "),
    "Control final:\n- "+guide.finalControl.join("\n- "),
    `Informe de cobertura: ${guide.coverageReport}`,
    `Perfil específico — ${profile.label}:\n- ${profile.rules.join("\n- ")}`
  ].join("\n\n")}

  function initialMessage(){return `Voy a adjuntar material de ${subjectName()}${draft.unit?`, sobre ${draft.unit}`:""}. Antes de redactar, revisá todos los archivos, inventarialos, detectá faltantes y hacé en un único primer mensaje todas las preguntas imprescindibles con opciones y una recomendación por pregunta. Proponé también un índice y esperá mi configuración. No empieces el resumen todavía.`}
  function configuration(){return ["FICHA DE CONFIGURACIÓN",`Materia: ${subjectName()}`,`Unidad o tema: ${draft.unit||"a definir"}`,`Objetivo: ${draft.objective||"a definir"}`,`Fecha de evaluación: ${draft.examDate||"no indicada"}`,`Tiempo disponible: ${draft.availableTime||"no indicado"}`,`Nivel inicial: ${draft.initialLevel}`,`Fuente prioritaria: ${draft.prioritySource}`,`Información externa: ${draft.externalInfo}`,`Tipo de evaluación: ${draft.evaluationType}`,`Profundidad: ${draft.depth}`,`Perfil: ${(SUMMARY_FACTORY_GUIDE.profiles[draft.profile]||SUMMARY_FACTORY_GUIDE.profiles.general).label}`,`Observaciones: ${draft.notes||"ninguna"}`,`Material que planeo adjuntar: ${draft.materials.length?draft.materials.join(", "):"todavía no marcado; detectá faltantes"}`].join("\n")}
  function finalChecklist(){return `CHECKLIST FINAL (informar el estado real, sin afirmar verificaciones no realizadas)\n- ${QUALITY.join("\n- ")}`}
  function promptParts(){return{initial:initialMessage(),instruction:instruction(),all:[initialMessage(),instruction(),configuration(),finalChecklist()].join("\n\n---\n\n")}}
  function updatePrompt(){const output=host.querySelector("#factoryPrompt");if(output)output.textContent=promptParts().all}
  function fill(){for(const [key,value] of Object.entries(draft)){if(key==="materials")continue;const control=host.querySelector(`[name="${key}"]`);if(control)control.value=value??""}host.querySelectorAll('[name="materials"]').forEach(input=>input.checked=draft.materials.includes(input.value))}
  function read(){for(const key of Object.keys(DEFAULT_DRAFT)){if(key==="materials")continue;const control=host.querySelector(`[name="${key}"]`);draft[key]=String(control?.value||"")}draft.materials=[...host.querySelectorAll('[name="materials"]:checked')].map(input=>input.value)}
  function persist(){read();updatePrompt();saveQueue=saveQueue.then(()=>saveSettings({...draft}));return saveQueue}

  async function copyText(text){try{if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(text);else{const area=document.createElement("textarea");area.value=text;area.setAttribute("readonly","");area.style.position="fixed";area.style.opacity="0";document.body.append(area);area.select();if(!document.execCommand("copy"))throw Error("copy unavailable");area.remove()}announce("Copiado al portapapeles")}catch(error){announce("No se pudo copiar; seleccioná el texto manualmente");throw error}}
  function announce(message){const status=host.querySelector("#factoryCopyStatus");status.textContent=message;setTimeout(()=>{if(status.textContent===message)status.textContent=""},2400)}
  function bind(){host.querySelector(".factory-builder").addEventListener("input",persist);host.querySelector(".factory-builder").addEventListener("change",event=>{persist();if(event.target.name==="profile"){host.querySelector('[data-section="guide"]').innerHTML=`<h2>3. Instrucción y perfiles</h2><p>La instrucción maestra se incorpora completa al prompt. Podés revisar su estructura antes de copiar.</p>${renderGuide()}`}});host.querySelectorAll("[data-copy]").forEach(button=>button.onclick=()=>copyText(promptParts()[button.dataset.copy]));host.querySelector("[data-reset]").onclick=async()=>{draft={...DEFAULT_DRAFT,materials:[]};fill();updatePrompt();await saveSettings({...draft});announce("Formulario restaurado")}}

  function open(context={}){const selected=subjects.find(item=>item.id===context.subjectId);if(selected){draft.subjectId=selected.id;draft.unit=context.unitId&&context.unitId!=="legacy"?context.unitId:"";draft.profile=suggestProfile(selected);saveSettings({...draft})}render()}
  function init(options){host=document.querySelector("#summaryFactory");subjects=options.subjects;getSettings=options.getSettings;saveSettings=options.saveSettings;getContext=options.getContext;draft={...DEFAULT_DRAFT,...(getSettings().summaryFactoryDraft||{}),materials:[...(getSettings().summaryFactoryDraft?.materials||[])]};render()}

  window.LBT_SUMMARY_FACTORY={SUMMARY_FACTORY_GUIDE,DEFAULT_DRAFT,init,open,suggestProfile,promptParts:()=>promptParts()};
})();
