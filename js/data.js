(function(){
  const SUBJECTS = [
    {id:"analisis1",code:"N1",name:"Análisis I",term:1,hours:128,hue:211,offering:"Mar-Jun / Ago-Nov",defaultStatus:"aprobada"},
    {id:"cts",code:"CB02",name:"Ciencia, Tecnología y Sociedad",term:1,hours:64,hue:28,offering:"Mar-Jun / Ago-Nov",defaultStatus:"sin_estado"},
    {id:"quimica_general",code:"CB03",name:"Química General",term:1,hours:128,hue:186,offering:"Mar-Jun / Ago-Nov",defaultStatus:"sin_estado"},
    {id:"biologia1",code:"CB04",name:"Biología I",term:1,hours:64,hue:133,offering:"Mar-Jun / Ago-Nov",defaultStatus:"aprobada"},

    {id:"intro_biotec",code:"N2",name:"Introducción a la Biotecnología",term:2,hours:80,hue:169,offering:"Mar-Jun / Ago-Nov",defaultStatus:"sin_estado",courseReqCursadas:["quimica_general","cts"],finalReqFinals:["quimica_general","cts"]},
    {id:"algebra",code:"CB06",name:"Álgebra y Geometría Analítica",term:2,hours:96,hue:247,offering:"Mar-Jun / Ago-Nov",defaultStatus:"sin_estado"},
    {id:"biologia2",code:"CB07",name:"Biología II",term:2,hours:96,hue:118,offering:"Mar-Jun / Ago-Nov",defaultStatus:"aprobada",courseReqCursadas:["quimica_general","biologia1"],finalReqFinals:["quimica_general","biologia1"]},
    {id:"quimica_inorganica",code:"CB08",name:"Química Inorgánica",term:2,hours:128,hue:194,offering:"Mar-Jun / Ago-Nov",defaultStatus:"aprobada",courseReqCursadas:["quimica_general","analisis1"],finalReqFinals:["quimica_general","analisis1"]},
    {id:"informatica",name:"Prueba de suficiencia en informática",term:2,hue:202,offering:"Requisito del plan",defaultStatus:"sin_estado",kind:"requirement"},

    {id:"quimica_organica",code:"CB12",name:"Química Orgánica",term:3,hours:128,hue:155,offering:"Mar-Jun / Ago-Nov",defaultStatus:"final_pendiente",courseReqCursadas:["quimica_inorganica"],courseReqFinals:["quimica_general","analisis1"],finalReqFinals:["quimica_inorganica"]},
    {id:"analisis2",code:"N10",name:"Análisis II",term:3,hours:128,hue:265,offering:"Mar-Jun / Ago-Nov",defaultStatus:"final_pendiente",courseReqCursadas:["analisis1"],finalReqFinals:["analisis1"]},
    {id:"fisica1",code:"CB10",name:"Física I",term:3,hours:128,hue:214,offering:"Mar-Jun / Ago-Nov",defaultStatus:"recursando",courseReqCursadas:["analisis1"],finalReqFinals:["analisis1"]},

    {id:"fisica2",code:"N3",name:"Física II",term:4,hours:128,hue:229,offering:"Mar-Jun / Ago-Nov",defaultStatus:"sin_estado",courseReqCursadas:["analisis2","fisica1"],courseReqFinals:["analisis1"],finalReqFinals:["analisis2","fisica1"]},
    {id:"biologia3",code:"CB11",name:"Biología III",term:4,hours:96,hue:103,offering:"Ago-Nov",defaultStatus:"aprobada",courseReqCursadas:["biologia2"],courseReqFinals:["quimica_general","biologia1"],finalReqFinals:["biologia2"]},
    {id:"estadistica",code:"CB14",name:"Estadística Aplicada",term:4,hours:96,hue:38,offering:"Mar-Jun / Ago-Nov",defaultStatus:"en_curso",courseReqCursadas:["analisis1","algebra"],finalReqFinals:["analisis1","algebra"]},
    {id:"quimica_biologica1",code:"N4",name:"Química Biológica I",term:4,hours:96,hue:344,offering:"Ago-Nov",defaultStatus:"en_curso",courseReqCursadas:["quimica_organica","biologia2"],courseReqFinals:["quimica_general","analisis1","biologia1"],finalReqFinals:["quimica_organica","biologia2"]},

    {id:"fisicoquimica",name:"Fisicoquímica",term:5,hue:258,offering:"Mar-Jun / Ago-Nov",defaultStatus:"sin_estado",courseReqCursadas:["quimica_inorganica","fisica2"],courseReqFinals:["quimica_general","analisis1","analisis2","fisica1"],finalReqFinals:["quimica_inorganica","fisica2"]},
    {id:"genetica_general",name:"Genética General",term:5,hue:91,offering:"Mar-Jun",defaultStatus:"sin_estado",courseReqCursadas:["biologia2","estadistica","quimica_biologica1"],courseReqFinals:["quimica_general","biologia1","analisis1","algebra","quimica_organica"],finalReqFinals:["biologia2","estadistica","quimica_biologica1"]},
    {id:"quimica_biologica2",name:"Química Biológica II",term:5,hue:333,offering:"Mar-Jun",defaultStatus:"sin_estado",courseReqCursadas:["quimica_biologica1"],courseReqFinals:["quimica_organica","biologia2"],finalReqFinals:["quimica_biologica1"]},
    {id:"biologia4",name:"Biología IV",term:5,hue:112,offering:"Mar-Jun",defaultStatus:"sin_estado",courseReqCursadas:["biologia2","quimica_organica"],courseReqFinals:["quimica_inorganica","quimica_general","biologia1"],finalReqFinals:["biologia2","quimica_organica"]},

    {id:"microbiologia",name:"Microbiología",term:6,hue:76,offering:"Ago-Nov",defaultStatus:"sin_estado",courseReqCursadas:["intro_biotec","quimica_biologica2","genetica_general"],courseReqFinals:["cts","quimica_biologica1","biologia2","estadistica"],finalReqFinals:["intro_biotec","quimica_biologica2","genetica_general"]},
    {id:"biologia_celular",name:"Biología Celular",term:6,hue:126,offering:"Ago-Nov",defaultStatus:"sin_estado",courseReqCursadas:["quimica_biologica2","biologia3"],courseReqFinals:["quimica_biologica1","biologia2"],finalReqFinals:["quimica_biologica2","biologia3"]},
    {id:"bioinformatica",name:"Introducción a la Bioinformática",term:6,hue:199,offering:"Ago-Nov",defaultStatus:"sin_estado",courseReqCursadas:["estadistica","biologia2"],courseReqFinals:["analisis1","algebra","quimica_general","biologia1"],finalReqFinals:["estadistica","biologia2"]},
    {id:"ingles_tecnico",name:"Prueba de suficiencia de idioma inglés técnico",term:6,hue:220,offering:"Requisito del plan",defaultStatus:"sin_estado",kind:"requirement"},

    {id:"inmunologia_basica",name:"Inmunología Básica",term:7,hue:9,offering:"Mar-Jun",defaultStatus:"sin_estado",courseReqCursadas:["quimica_biologica2","genetica_general"],courseReqFinals:["quimica_biologica1","biologia2","estadistica"],finalReqFinals:["quimica_biologica2","genetica_general"]},
    {id:"genetica_molecular",name:"Genética Molecular",term:7,hue:292,offering:"Mar-Jun",defaultStatus:"sin_estado",courseReqCursadas:["genetica_general","microbiologia","biologia_celular"],courseReqFinals:["biologia2","estadistica","quimica_biologica1","intro_biotec","quimica_biologica2","genetica_general","biologia3"],finalReqFinals:["genetica_general","microbiologia","biologia_celular"]},
    {id:"quimica_analitica",name:"Química Analítica",term:7,hue:181,offering:"Mar-Jun (prioridad LBT) / Ago-Nov (prioridad Ingeniería)",defaultStatus:"sin_estado",courseReqCursadas:["quimica_organica","estadistica","fisicoquimica"],courseReqFinals:["quimica_inorganica","analisis1","algebra","fisica2"],finalReqFinals:["quimica_organica","estadistica","fisicoquimica"]},

    {id:"inmunologia_molecular",name:"Inmunología Molecular",term:8,hue:356,offering:"Ago-Nov",defaultStatus:"sin_estado",courseReqCursadas:["inmunologia_basica","genetica_molecular"],courseReqFinals:["quimica_biologica2","genetica_general","microbiologia","biologia_celular"],finalReqFinals:["inmunologia_basica","genetica_molecular"]},
    {id:"biotecnologia_animal",name:"Biotecnología Animal",term:8,hue:21,offering:"Ago-Nov",defaultStatus:"sin_estado",courseReqCursadas:["genetica_molecular"],courseReqFinals:["genetica_general","microbiologia","biologia_celular"],finalReqFinals:["genetica_molecular"]},
    {id:"bioquimica_proteinas",name:"Bioquímica de Proteínas",term:8,hue:320,offering:"Ago-Nov",defaultStatus:"sin_estado",courseReqCursadas:["quimica_biologica2","quimica_analitica","fisicoquimica"],courseReqFinals:["quimica_organica","estadistica","quimica_biologica1","quimica_inorganica","fisica2"],finalReqFinals:["quimica_biologica2","quimica_analitica","fisicoquimica"]},

    {id:"biotecnologia_vegetal",name:"Biotecnología Vegetal",term:9,hue:143,offering:"Mar-Jun",defaultStatus:"sin_estado",courseReqCursadas:["biologia4","bioinformatica","genetica_molecular"],courseReqFinals:["genetica_general","microbiologia","biologia_celular","biologia2","quimica_organica","estadistica"],finalReqFinals:["biologia4","bioinformatica","genetica_molecular"]},
    {id:"bioprocesos",name:"Bioprocesos",term:9,hue:46,offering:"Mar-Jun",defaultStatus:"sin_estado",courseReqCursadas:["microbiologia","genetica_molecular","fisicoquimica"],courseReqFinals:["genetica_general","microbiologia","biologia_celular","intro_biotec","quimica_biologica2","quimica_inorganica","fisica2"],finalReqFinals:["microbiologia","genetica_molecular","fisicoquimica"]},
    {id:"analisis_biomoleculas",name:"Métodos de Análisis de Biomoléculas",term:9,hue:274,offering:"Mar-Jun",defaultStatus:"sin_estado",courseReqCursadas:["quimica_analitica","inmunologia_molecular","bioinformatica"],courseReqFinals:["quimica_organica","estadistica","fisicoquimica","inmunologia_basica","genetica_molecular","biologia2"],finalReqFinals:["quimica_analitica","inmunologia_molecular","bioinformatica"]},

    {id:"optativa",name:"Materia Optativa",term:10,hue:168,offering:"Mar-Jun / Ago-Nov (a partir del 7.º cuatrimestre)",defaultStatus:"sin_estado"},
    {id:"proyectos_biotecnologicos",name:"Proyectos Biotecnológicos",term:10,hue:14,offering:"Ago-Nov",defaultStatus:"sin_estado",allCursadasRequired:true}
  ];

  const STATUS = {
    sin_estado:"Sin estado",
    pendiente:"Pendiente",
    cursada:"Cursada aprobada",
    final_pendiente:"Final pendiente",
    en_curso:"En curso",
    recursando:"Recursando",
    aprobada:"Aprobada"
  };

  const DEFAULT_SETTINGS = {
    theme:"light",
    visualTheme:"classic",
    subjectHueOverrides:{},
    studyIdleSeconds:75,
    currentIds:["fisica1","estadistica","quimica_biologica1"],
    order:["fisica1","estadistica","quimica_biologica1"],
    recentSubjectIds:[],
    weeklySchedule:[],
    calendar:{year:2026,month:6},
    lastPage:"dashboard",
    zoomIndex:1,
    viewerVisible:true,
    indexVisible:false,
    lastSubject:"fisica1",
    lastTab:"summary",
    lastBlock:"Vista integral",
    lastUnitBySubject:{fisica1:"resumen-integral"},
    readingGlobal:{narrow:false,wideLine:false,large:false,hideSecondary:false,contrast:false,ruler:false,focus:false},
    readingBySubject:{}
  };

  const SUMMARY_BLOCKS = [
    {id:"purpose",title:"Cómo se va a construir esta materia",text:"Esta pantalla separa el contenido académico del progreso personal. Los documentos originales se incorporarán sin modificar el funcionamiento de la aplicación, y cada explicación tendrá un identificador estable para conservar los resaltados cuando se agreguen temas nuevos."},
    {id:"coverage",title:"Control de cobertura",text:"Cada archivo del campus quedará registrado con sus páginas revisadas, temas detectados y secciones del resumen donde fue utilizado. La versión actual prepara esa estructura y no agrega contenido académico que no esté respaldado por documentos reales."},
    {id:"progress",title:"Progreso local",text:"Las materias a mano, el orden, las fechas, los porcentajes de avance, las preferencias y los resaltados se guardan en IndexedDB. El respaldo en formato JSON permite mover esos datos a otro navegador antes de incorporar la sincronización con Google Drive."}
  ];

  for(const item of SUBJECTS){
    item.sourcePage=item.term<=5?1:item.term<=9?2:3;
    item.sourceVerified=true;
  }

window.LBT_DATA={SUBJECTS,STATUS,DEFAULT_SETTINGS,SUMMARY_BLOCKS,APP_VERSION:"0.10.2",CONTENT_VERSION:"catalog-v2"};
})();
