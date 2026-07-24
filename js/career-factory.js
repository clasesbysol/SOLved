(function(){
  "use strict";
  const PROMPT=`Quiero crear mi propia carrera dentro de una copia independiente de la arquitectura pública de SOLved.

OBJETIVO
Construí una aplicación local-first de estudio a partir del plan oficial que voy a adjuntar. Primero analizá el documento completo, inventariá materias, requisitos, correlatividades y estructura académica. Hacé todas las preguntas imprescindibles en una sola ronda, con opciones y una recomendación por pregunta. No preguntes datos inferibles.

ARQUITECTURA A REUTILIZAR
- Catálogo público de materias y unidades.
- Correlatividades y estados académicos verificables.
- Contenido por unidad: resumen, glosario, tarjetas, ejercicios, fórmulas y mapa mental.
- Fabricar resumen con perfiles por materia, matriz de cobertura y control final.
- Diseño accesible, responsive, local-first, IndexedDB, PWA y funcionamiento offline.
- Separación estricta entre contenido académico público y datos personales.

PROCESO
1. Revisá el plan oficial completo antes de proponer código o contenido.
2. Inventariá materias, códigos, carga horaria, cuatrimestres, requisitos y correlatividades.
3. Señalá faltantes y contradicciones; proponé un modelo normalizado.
4. Proponé un índice y un plan de implementación por etapas.
5. Para cada materia, definí un perfil de estudio apropiado y paquetes de contenido versionados.
6. Exigí fuentes, referencias y una matriz de cobertura para resumen, glosario, tarjetas, ejercicios, fórmulas y mapa.
7. No publiques contenido académico sin revisión humana.
8. Dividí entregas largas sin reducir cobertura.

PRIVACIDAD Y EXCLUSIONES
No copies ni solicites notas personales, progreso, calendario, correo, tokens, contenido de Drive ni respaldos privados. No uses datos personales de la instalación original. No integres APIs de IA ni transfieras archivos automáticamente.

ENTREGA ESPERADA
Entregá primero el inventario del plan, las preguntas agrupadas y el índice propuesto. Esperá mis respuestas. Después avanzá sin confirmaciones intermedias salvo contradicción imprescindible. Cerrá cada etapa con validación de schema, referencias, cobertura y revisión humana pendiente.`;
  async function copy(){if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(PROMPT);else{const area=document.createElement("textarea");area.value=PROMPT;document.body.append(area);area.select();document.execCommand("copy");area.remove()}const status=document.querySelector("#careerCopyStatus");if(status)status.textContent="Instrucciones copiadas"}
  function init(){const output=document.querySelector("#careerPrompt");if(!output)return;output.textContent=PROMPT;document.querySelector("#copyCareerPrompt").onclick=copy;document.querySelector("#openCareerChatGPT").onclick=async()=>{await copy();window.open("https://chatgpt.com/","_blank","noopener,noreferrer")}}
  window.SOLVED_CAREER={PROMPT,init,copy};
})();
