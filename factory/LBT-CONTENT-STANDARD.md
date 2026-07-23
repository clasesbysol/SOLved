# Estándar de contenido LBT V1

La Fábrica LBT es un contrato para paquetes producidos fuera de la aplicación por cualquier herramienta. La app no invoca modelos ni incorpora una API de IA. Toda salida debe ser revisable, trazable y validable.

## Principios

No inventar información ni completar vacíos por intuición. No omitir definiciones importantes. Conservar terminología, notación, fórmulas, gráficos, mecanismos, excepciones y condiciones relevantes de las fuentes. Explicar con claridad y permitir aclaraciones sencillas entre paréntesis, marcándolas como explicación adicional. No copiar páginas completas. Cada afirmación relevante debe aceptar referencias estructuradas por `sourceId` y página o rango.

Los documentos originales no forman parte del paquete: `sources.json` puede contener solamente identificadores y metadatos.

## Resumen

Cada unidad incluye conceptos principales, desarrollo teórico, fórmulas/procesos/mecanismos y relaciones entre conceptos. Cada bloque distingue contenido de fuente de aclaraciones adicionales y conserva referencias.

## Glosario

Incluye términos de las fuentes, conceptos técnicos indispensables, siglas, estructuras, métodos, leyes, procesos y conceptos confundibles. Excluye palabras comunes, nombres aislados irrelevantes, duplicados y conceptos ajenos. Cada entrada contiene término, definición breve, explicación ampliada, explicación sencilla opcional, ejemplo, unidad, referencias y términos relacionados.

## Tarjetas

Tipos permitidos: `definition`, `relation`, `comparison`, `sequence`, `mechanism`, `formula`, `variables`, `application`, `common-error`, `visual-interpretation`. Una idea y pregunta concreta por tarjeta; respuesta breve suficiente, sin duplicados semánticos; dificultad `easy`, `medium` o `hard`; referencias obligatorias.

## Ejercicios

`source` transcribe una fuente. `generated` se muestra como “Ejercicio generado por Biblioteca LBT”, declara `basedOn` con ejercicios fuente y no incorpora teoría ni métodos externos. Incluye consigna, desglose, datos, incógnitas, teoría, fórmulas, estrategia, pistas graduadas, resolución, resultado, comprobación, errores y relacionados.

## Mapa mental

Representa materia, unidad, conceptos, definiciones, variables, fórmulas, aplicaciones, procesos, errores y excepciones. Conexiones: `cause`, `consequence`, `belongs-to`, `calculated-with`, `differs-from`, `requires`, `produces`, `related-to`, `applied-in`.

## Flujo

1. Completar `INTAKE-TEMPLATE.yaml` sin adjuntar fuentes privadas.
2. Generar una unidad siguiendo `prompts/generate-unit.md`.
3. Revisarla con `prompts/review-unit.md`.
4. Ejecutar `npm run content:validate` y `npm run content:catalog`.
5. Publicar únicamente paquetes con estado `reviewed` o `published`.
