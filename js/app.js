(function(){
  "use strict";
  const {SUBJECTS,STATUS,DEFAULT_SETTINGS,SUMMARY_BLOCKS,APP_VERSION,CONTENT_VERSION}=window.LBT_DATA;
  const DB=window.LBT_DB;
  const $=id=>document.getElementById(id);
  const els={
    pageTitle:$("pageTitle"),crumb:$("crumb"),globalSearch:$("globalSearch"),backupBtn:$("backupBtn"),themeBtn:$("themeBtn"),appearancePanel:$("appearancePanel"),visualTheme:$("visualTheme"),appearanceSubject:$("appearanceSubject"),subjectHuePalette:$("subjectHuePalette"),subjectHueRange:$("subjectHueRange"),subjectColorPreview:$("subjectColorPreview"),subjectColorValue:$("subjectColorValue"),resetSubjectColor:$("resetSubjectColor"),resetAllSubjectColors:$("resetAllSubjectColors"),appearanceClose:$("appearanceClose"),resetAppearance:$("resetAppearance"),restoreInput:$("restoreInput"),
    handList:$("handList"),recentSubjectsSection:$("recentSubjectsSection"),recentSubjectsList:$("recentSubjectsList"),manageCourses:$("manageCourses"),dashboardPage:$("dashboardPage"),subjectsPage:$("subjectsPage"),calendarPage:$("calendarPage"),favoritesPage:$("favoritesPage"),reviewPage:$("reviewPage"),factoryPage:$("factoryPage"),studyPage:$("studyPage"),
    currentCount:$("currentCount"),currentGrid:$("currentGrid"),termSummary:$("termSummary"),miniMonthTitle:$("miniMonthTitle"),miniCalendar:$("miniCalendar"),planGrid:$("planGrid"),
    termFilter:$("termFilter"),calendarTitle:$("calendarTitle"),calendarGrid:$("calendarGrid"),eventCountLabel:$("eventCountLabel"),studyTitle:$("studyTitle"),studyMeta:$("studyMeta"),
    subjectMark:$("subjectMark"),studyStatus:$("studyStatus"),studyUnit:$("studyUnit"),studyTabs:$("studyTabs"),studyBody:$("studyBody"),eventModal:$("eventModal"),eventForm:$("eventForm"),
    eventSubject:$("eventSubject"),eventDate:$("eventDate"),eventTitle:$("eventTitle"),eventNote:$("eventNote"),coursesModal:$("coursesModal"),coursesForm:$("coursesForm"),courseChecks:$("courseChecks"),
    backupModal:$("backupModal"),manageCoursesPlan:$("manageCoursesPlan"),addEventTop:$("addEventTop"),addEventSide:$("addEventSide"),addEventCalendar:$("addEventCalendar"),
    prevMonth:$("prevMonth"),nextMonth:$("nextMonth"),todayMonth:$("todayMonth"),backStudy:$("backStudy"),exportBackupBtn:$("exportBackup"),importBackupBtn:$("importBackup"),
    exportBackupModal:$("exportBackupModal"),importMergeBtn:$("importMergeBtn"),importReplaceBtn:$("importReplaceBtn"),replaceDriveBtn:$("replaceDriveBtn"),syncPill:$("syncPill"),syncText:$("syncText"),driveActionBtn:$("driveActionBtn"),driveDisconnectBtn:$("driveDisconnectBtn"),installBtn:$("installBtn"),accountInstall:$("accountInstall"),installHelpModal:$("installHelpModal"),updateBtn:$("updateBtn"),
    studyToolbar:$("studyToolbar"),highlightBtn:$("highlightBtn"),highlightLabel:$("highlightLabel"),selectionHelp:$("selectionHelp"),newNoteBtn:$("newNoteBtn"),contentUpdateBtn:$("contentUpdateBtn"),indexBtn:$("indexBtn"),zoomBtn:$("zoomBtn"),
    fullscreenBtn:$("fullscreenBtn"),fullscreenExit:$("fullscreenExit"),factoryFromStudy:$("factoryFromStudy"),previewWarning:$("previewWarning"),calendarLegend:$("calendarLegend"),correlationModal:$("correlationModal"),correlationTitle:$("correlationTitle"),correlationContent:$("correlationContent"),weeklyScheduleSection:$("weeklyScheduleSection"),addScheduleBlock:$("addScheduleBlock"),scheduleEmpty:$("scheduleEmpty"),scheduleGrid:$("scheduleGrid"),scheduleModal:$("scheduleModal"),scheduleForm:$("scheduleForm"),scheduleModalTitle:$("scheduleModalTitle"),scheduleId:$("scheduleId"),scheduleName:$("scheduleName"),scheduleDay:$("scheduleDay"),scheduleColor:$("scheduleColor"),scheduleStart:$("scheduleStart"),scheduleEnd:$("scheduleEnd"),scheduleError:$("scheduleError"),deleteScheduleBlock:$("deleteScheduleBlock")
  };
  let settings={...DEFAULT_SETTINGS},subjectStates={},events=[],highlights=[];
  let currentSubject=null,currentTab="summary",draggedId=null,activeHighlightId=null,pendingSelection=null,restoreMode="merge",deferredInstallPrompt=null,waitingWorker=null,savedSettingsSnapshot={};
  let driveSync=null;
  const ZOOMS=[.9,1,1.1,1.25,1.4];

  function subject(id){return SUBJECTS.find(s=>s.id===id)}
  function icon(id){return `<svg class="icon"><use href="#${id}"/></svg>`}
  function safe(t){return String(t??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]))}
  function uuid(){return crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random().toString(16).slice(2)}`}
  function nowISO(){return new Date().toISOString()}
  function subjectHue(item=currentSubject){return Number(settings.subjectHueOverrides?.[item?.id]??item?.hue??28)}
  window.LBT_THEME={subjectHue:id=>subjectHue(subject(id))};
  function applyRenderedSubjectHues(){document.querySelectorAll(".course-link[data-open],.current-card[data-id],.plan-course[data-correlation]").forEach(element=>{const id=element.dataset.open||element.dataset.id||element.dataset.correlation,item=subject(id);if(item)element.style.setProperty("--hue",subjectHue(item))});document.querySelectorAll(".course-check input").forEach(input=>input.closest(".course-check")?.style.setProperty("--hue",subjectHue(subject(input.value))))}
  function refreshSubjectColorEditor(){const item=subject(els.appearanceSubject.value)||currentSubject||SUBJECTS[0],value=subjectHue(item),custom=Object.prototype.hasOwnProperty.call(settings.subjectHueOverrides||{},item.id);els.appearanceSubject.value=item.id;els.subjectHueRange.value=String(value);els.subjectColorPreview.style.setProperty("--preview-hue",value);els.subjectColorValue.textContent=`${value}°${custom?" · personalizado":" · original"}`;els.subjectHuePalette.querySelectorAll("[data-subject-hue]").forEach(button=>button.classList.toggle("active",Number(button.dataset.subjectHue)===value))}
  function previewSubjectHue(id,hue){settings.subjectHueOverrides={...(settings.subjectHueOverrides||{}),[id]:Number(hue)};const item=subject(id);if(currentSubject?.id===id){els.studyPage.style.setProperty("--hue",hue);els.subjectMark.style.setProperty("--hue",hue);document.documentElement.style.setProperty("--subject-hue",hue);window.LBT_NOTES?.render()}applyRenderedSubjectHues();refreshSubjectColorEditor()}
  async function persistSubjectHue(id,hue){previewSubjectHue(id,hue);await saveSettings()}
  function monthName(m){return new Intl.DateTimeFormat("es-AR",{month:"long"}).format(new Date(2026,m,1))}
  function dateParts(dateStr){const d=new Date(dateStr+"T12:00:00");return {day:d.getDate(),month:new Intl.DateTimeFormat("es-AR",{month:"short"}).format(d).replace(".",""),full:new Intl.DateTimeFormat("es-AR",{day:"numeric",month:"long",year:"numeric"}).format(d)}}
  function statusOptions(current){return Object.entries(STATUS).map(([v,l])=>`<option value="${v}" ${v===current?"selected":""}>${l}</option>`).join("")}
  function setSaveState(type="saved",text="Guardado localmente"){
    els.syncPill.classList.toggle("saving",type==="saving");els.syncPill.classList.toggle("error",type==="error");els.syncText.textContent=text;
  }
  async function persist(store,value){
    setSaveState("saving","Guardando…");try{await DB.put(store,value);setSaveState("saved",DB.isFallback()?"Guardado local alternativo":"Guardado localmente");driveSync?.localChanged()}catch(e){console.error(e);setSaveState("error","Error al guardar");toast("No se pudo guardar el cambio")}
  }
  function getSubjectState(id){return subjectStates[id]||{id,status:subject(id)?.defaultStatus||"sin_estado",progress:0,updatedAt:nowISO()}}
  async function saveSettings(){const stamp=nowISO();settings.fieldUpdatedAt={...(settings.fieldUpdatedAt||{})};for(const field of window.LBT_SYNC.SETTINGS_FIELDS)if(JSON.stringify(settings[field])!==JSON.stringify(savedSettingsSnapshot[field]))settings.fieldUpdatedAt[field]=stamp;settings.updatedAt=stamp;savedSettingsSnapshot=structuredClone(settings);await persist("kv",{key:"settings",value:settings,updatedAt:settings.updatedAt})}
  async function saveSubjectState(id,patch){const next={...getSubjectState(id),...patch,id,updatedAt:nowISO()};subjectStates[id]=next;await persist("subjects",next);return next}

  async function initialize(){
    delete document.documentElement.dataset.appReady;
    await window.SOLVED_AUTH?.ready;DB.setProfile(window.SOLVED_AUTH?.profile());
    const versionLabel=document.getElementById("versionLabel");if(versionLabel)versionLabel.textContent=`publicación ${APP_VERSION}`;
    const result=await DB.open();if(result.fallback)toast("IndexedDB no está disponible: se usa un guardado local alternativo");
    await window.SOLVED_CLOUD?.init(DB,async()=>{await loadData();renderDashboard();renderPlan();renderCalendar();if(currentSubject)renderStudy()}).catch(error=>{console.error(error);toast("No se pudo sincronizar con Supabase; tus datos locales siguen disponibles")});
    await migrateHistoricalOwner();await migrateV03();await loadData();driveSync=new window.LBT_SYNC.DriveSync({DB,appVersion:APP_VERSION,contentVersion:CONTENT_VERSION,onState:updateDriveState,onApplied:async()=>{await loadData();await window.LBT_NOTES?.reload();applyTheme();applyStudyPreferences();renderDashboard();renderPlan();renderCalendar();if(settings.lastPage==="study"&&currentSubject)renderStudy()}});await driveSync.init();await window.LBT_CONTENT.init(DB,()=>{if(currentSubject){refreshUnitSelector(currentSubject.id);renderStudy()}toast("Contenido actualizado")});const studyContext=()=>{const unit=window.LBT_CONTENT.getUnit(currentSubject?.id,els.studyUnit?.value);return {subjectId:currentSubject?.id,unitId:unit?.unitId||"legacy",tab:currentTab,contentVersion:unit?.contentVersion||"legacy"}};await window.LBT_NOTES.init(DB,driveSync,studyContext);await window.LBT_UTILS.init(DB,driveSync,studyContext,()=>SUBJECTS);els.replaceDriveBtn.hidden=!driveSync.isAuthoritativePending();bindEvents();window.LBT_SUMMARY_FACTORY.init({subjects:SUBJECTS,getSettings:()=>settings,saveSettings:async draft=>{settings.summaryFactoryDraft=draft;await saveSettings()},getContext:studyContext});window.SOLVED_CAREER.init();applyTheme();applyStudyPreferences();renderDashboard();renderPlan();renderCalendar();
    if(location.protocol==="file:")els.previewWarning.style.display="block";
    setPage(settings.lastPage==="study"?"dashboard":settings.lastPage||"dashboard");
    await new Promise(resolve=>requestAnimationFrame(resolve));
    document.documentElement.dataset.appReady="true";
    window.dispatchEvent(new CustomEvent("lbt-app-ready"));
    registerPWA();auditButtons();
  }
  async function migrateHistoricalOwner(){if(window.SOLVED_AUTH?.profile().mode!=="authorized-google"||await DB.get("meta","solved-owner-migration-v1"))return;const names=await indexedDB.databases?.()||[];if(!names.some(item=>item.name==="biblioteca-lbt")){await DB.put("meta",{key:"solved-owner-migration-v1",done:true,empty:true,updatedAt:nowISO()});return}const legacy=await new Promise((resolve,reject)=>{const request=indexedDB.open("biblioteca-lbt");request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error)}),stores=["kv","subjects","events","highlights","cardProgress","exerciseProgress","notes","studySessions","collections","bookmarks","activityLog"],backup={};for(const store of stores){if(!legacy.objectStoreNames.contains(store)){backup[store]=[];continue}backup[store]=await new Promise((resolve,reject)=>{const request=legacy.transaction(store).objectStore(store).getAll();request.onsuccess=()=>resolve(request.result||[]);request.onerror=()=>reject(request.error)})}legacy.close();await DB.put("meta",{key:"solved-owner-migration-backup-v1",counts:Object.fromEntries(stores.map(store=>[store,backup[store].length])),data:backup,updatedAt:nowISO()});for(const store of stores)for(const item of backup[store])await DB.put(store,item);const verified=Object.fromEntries(await Promise.all(stores.map(async store=>[store,(await DB.getAll(store)).length])));for(const store of stores)if(verified[store]<backup[store].length)throw new Error(`Migración incompleta en ${store}`);await DB.put("meta",{key:"solved-owner-migration-v1",done:true,counts:verified,updatedAt:nowISO()})}
  async function migrateV03(){
    const done=await DB.get("meta","migration-v03");if(done)return;
    let migrated=false;
    try{
      const raw=localStorage.getItem("biblioteca-lbt-v03");
      if(raw){
        const old=JSON.parse(raw);
        const merged={...DEFAULT_SETTINGS,theme:old.theme||"light",currentIds:Array.isArray(old.currentIds)?old.currentIds:DEFAULT_SETTINGS.currentIds,order:Array.isArray(old.order)?old.order:DEFAULT_SETTINGS.order,calendar:old.calendar||DEFAULT_SETTINGS.calendar,lastPage:old.lastPage||"dashboard"};
        await DB.put("kv",{key:"settings",value:merged,updatedAt:nowISO()});
        for(const s of SUBJECTS)await DB.put("subjects",{id:s.id,status:old.statuses?.[s.id]||s.defaultStatus,progress:Number(old.progress?.[s.id]||0),updatedAt:nowISO()});
        for(const e of Array.isArray(old.events)?old.events:[])await DB.put("events",{...e,id:e.id||uuid(),updatedAt:e.updatedAt||nowISO()});
        migrated=true;
      }
    }catch(e){console.warn("No se pudo migrar v0.3",e)}
    await DB.put("meta",{key:"migration-v03",done:true,migrated,updatedAt:nowISO()});
    if(migrated)setTimeout(()=>toast("Progreso de la versión 0.3 migrado a IndexedDB"),500);
  }
  async function loadData(){
    const saved=await DB.get("kv","settings");settings=window.LBT_SYNC.normalizeSettings({...DEFAULT_SETTINGS,...(saved?.value||{})},saved?.updatedAt||"2026-07-23T00:00:00.000Z");savedSettingsSnapshot=structuredClone(settings);if(!saved?.value?.fieldUpdatedAt)await DB.put("kv",{key:"settings",value:settings,updatedAt:settings.updatedAt});
    const storedSubjects=await DB.getAll("subjects");subjectStates=Object.fromEntries(storedSubjects.map(x=>[x.id,x]));
    for(const s of SUBJECTS)if(!subjectStates[s.id]){subjectStates[s.id]={id:s.id,status:s.defaultStatus,progress:0,updatedAt:"1970-01-01T00:00:00.000Z"};await DB.put("subjects",subjectStates[s.id])}
    events=await DB.getAll("events");highlights=await DB.getAll("highlights");
    currentSubject=subject(settings.lastSubject)||subject("fisica1");currentTab=settings.lastTab||"summary";
  }
  function orderedCurrent(){const ids=[...settings.order.filter(id=>settings.currentIds.includes(id)),...settings.currentIds.filter(id=>!settings.order.includes(id))];settings.order=ids;return ids.map(subject).filter(Boolean)}
  function setPage(page){
    if(page==="career"&&window.SOLVED_AUTH?.profile().mode!=="authorized-google")page="dashboard";["dashboard","subjects","calendar","favorites","review","factory","career","study"].forEach(p=>{const el=$(p+"Page");if(el)el.hidden=p!==page});
    document.querySelectorAll(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
    const titles={dashboard:["Vista general",""],subjects:["Plan y materias","Plan completo y correlatividades"],calendar:["Calendario","Fechas importantes por materia"],favorites:["Favoritos","Colecciones personales"],review:["Repaso aleatorio","Contenido publicado"],factory:["Fabricar resumen","Guía y prompt para tu IA"],career:["Crear mi carrera","Instrucciones para continuar en ChatGPT"],study:[currentSubject?.name||"Materia","SOLved"]};
    els.pageTitle.textContent=titles[page][0];els.crumb.textContent=titles[page][1];settings.lastPage=page;saveSettings();
    els.newNoteBtn.hidden=page!=="study";if(page==="dashboard"){renderDashboard();window.LBT_UTILS?.renderWeekly()}if(page==="subjects")renderPlan();if(page==="calendar")renderCalendar();if(page==="favorites")window.LBT_UTILS?.renderCollections();
    applyRenderedSubjectHues();
  }
  async function openFactory(context={}){if(!els.studyPage.hidden)await window.LBT_UTILS?.transitionStudyContext();setPage("factory");window.LBT_SUMMARY_FACTORY.open(context)}
  function subjectLink(s){return `<button class="course-link" data-open="${s.id}" style="--hue:${subjectHue(s)}"><span class="dot"></span><span class="label"><strong>${safe(s.name)}</strong><small>${safe(STATUS[getSubjectState(s.id).status])}</small></span></button>`}
  function renderHandList(){els.handList.innerHTML=orderedCurrent().map(subjectLink).join("");const recent=(settings.recentSubjectIds||[]).filter(id=>!settings.currentIds.includes(id)).map(subject).filter(Boolean).slice(0,3);els.recentSubjectsList.innerHTML=recent.map(subjectLink).join("");els.recentSubjectsSection.hidden=!recent.length;[els.handList,els.recentSubjectsList].forEach(list=>list.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>openSubject(b.dataset.open)))}
  function scheduleMinutes(value){const [h,m]=value.split(":").map(Number);return h*60+m}
  function renderWeeklySchedule(){const days=["Lunes","Martes","Miércoles","Jueves","Viernes"],blocks=[...(settings.weeklySchedule||[])].sort((a,b)=>a.day-b.day||a.start.localeCompare(b.start));els.scheduleEmpty.hidden=!!blocks.length;els.scheduleGrid.innerHTML=days.map((day,index)=>`<section class="schedule-day"><h3>${day}</h3><div class="schedule-day-blocks">${blocks.filter(block=>Number(block.day)===index+1).map(block=>`<button type="button" class="schedule-block" data-schedule-id="${block.id}" style="--schedule-color:${safe(block.color)}" title="Editar ${safe(block.name)}"><strong>${safe(block.name)}</strong><span>${safe(block.start)}–${safe(block.end)}</span></button>`).join("")||'<span class="schedule-day-empty">Sin bloques</span>'}</div></section>`).join("");els.scheduleGrid.querySelectorAll("[data-schedule-id]").forEach(button=>button.onclick=()=>openScheduleModal((settings.weeklySchedule||[]).find(block=>block.id===button.dataset.scheduleId)))}
  function openScheduleModal(block=null){els.scheduleForm.reset();els.scheduleId.value=block?.id||"";els.scheduleModalTitle.textContent=block?"Editar bloque":"Agregar bloque";els.scheduleName.value=block?.name||"";els.scheduleDay.value=String(block?.day??1);els.scheduleColor.value=block?.color||"#7b5cff";els.scheduleStart.value=block?.start||"09:00";els.scheduleEnd.value=block?.end||"10:00";els.scheduleError.textContent="";els.scheduleError.hidden=true;els.deleteScheduleBlock.hidden=!block;els.scheduleModal.hidden=false;els.scheduleName.focus()}
  function eventsFor(id){return events.filter(e=>e.subjectId===id&&!e.deletedAt).sort((a,b)=>a.date.localeCompare(b.date))}
  function renderCurrent(){
    const list=orderedCurrent();els.currentCount.textContent=list.length;
    if(!list.length){els.currentGrid.innerHTML=`<div class="empty-box" style="grid-column:1/-1">No hay materias a mano. Usá “Materias a mano” para elegirlas.</div>`;return}
    els.currentGrid.innerHTML=list.map(s=>{const event=eventsFor(s.id).find(e=>e.date>=new Date().toISOString().slice(0,10)),st=getSubjectState(s.id);return `<article class="current-card compact-course-card" draggable="true" data-id="${s.id}" style="--hue:${subjectHue(s)}"><div class="drag-row"><span class="drag-handle">${icon("i-grip")}</span><span class="term-tag">${s.code||`${s.term}.º cuatrimestre`}</span></div><h3>${safe(s.name)}</h3><div class="status-line"><span class="status-badge">${safe(STATUS[st.status])}</span></div>${event?`<div class="course-date-badges"><span class="date-badge"><strong>${dateParts(event.date).day} ${dateParts(event.date).month}</strong> ${safe(event.title)}</span></div>`:""}<div class="card-actions"><button class="course-open" data-open="${s.id}">Abrir materia</button><button class="move-btn" data-move="${s.id}" data-dir="-1" title="Mover a la izquierda">${icon("i-chevron-left")}</button><button class="move-btn" data-move="${s.id}" data-dir="1" title="Mover a la derecha">${icon("i-chevron-right")}</button></div></article>`}).join("");
    els.currentGrid.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>openSubject(b.dataset.open));els.currentGrid.querySelectorAll("[data-move]").forEach(b=>b.onclick=()=>moveCourse(b.dataset.move,Number(b.dataset.dir)));
    els.currentGrid.querySelectorAll(".current-card").forEach(card=>{card.ondragstart=()=>{draggedId=card.dataset.id;card.classList.add("dragging")};card.ondragend=()=>{draggedId=null;card.classList.remove("dragging");document.querySelectorAll(".drag-over").forEach(x=>x.classList.remove("drag-over"))};card.ondragover=e=>{e.preventDefault();if(draggedId!==card.dataset.id)card.classList.add("drag-over")};card.ondragleave=()=>card.classList.remove("drag-over");card.ondrop=e=>{e.preventDefault();card.classList.remove("drag-over");reorderCourse(draggedId,card.dataset.id)}})
  }
  async function moveCourse(id,dir){const arr=[...settings.order],i=arr.indexOf(id),j=i+dir;if(i<0||j<0||j>=arr.length)return;[arr[i],arr[j]]=[arr[j],arr[i]];settings.order=arr;await saveSettings();renderDashboard()}
  async function reorderCourse(from,to){if(!from||from===to)return;const arr=[...settings.order],a=arr.indexOf(from),b=arr.indexOf(to);if(a<0||b<0)return;arr.splice(a,1);arr.splice(b,0,from);settings.order=arr;await saveSettings();renderDashboard()}
  function renderEvents(targetId,limit=8){
    const el=$(targetId),list=events.filter(e=>!e.deletedAt).sort((a,b)=>a.date.localeCompare(b.date)).filter(e=>e.date>=new Date().toISOString().slice(0,10)).slice(0,limit);
    el.innerHTML=list.length?list.map(e=>{const s=subject(e.subjectId),d=dateParts(e.date),hue=subjectHue(s);return `<div class="event-row" style="--hue:${hue}"><div class="event-date"><strong>${d.day}</strong><small>${d.month}</small></div><div class="event-body"><strong>${safe(e.title)}</strong><small><span class="event-subject-chip" style="--hue:${hue}">${safe(s?.name||"Materia")}</span> · ${d.full}</small></div><button class="event-delete" data-delete-event="${e.id}" title="Eliminar">${icon("i-trash")}</button></div>`}).join(""):`<div class="empty-box">Todavía no cargaste fechas importantes.</div>`;
    el.querySelectorAll("[data-delete-event]").forEach(b=>b.onclick=()=>deleteEvent(b.dataset.deleteEvent));
  }
  async function deleteEvent(id){const e=events.find(x=>x.id===id);if(!e)return;e.deletedAt=nowISO();e.updatedAt=e.deletedAt;await persist("events",e);renderDashboard();renderCalendar()}
  function termStats(term){const items=SUBJECTS.filter(s=>s.term===term),done=items.filter(s=>["aprobada","cursada","final_pendiente"].includes(getSubjectState(s.id).status)).length,avg=Math.round(items.reduce((a,s)=>a+Number(getSubjectState(s.id).progress||0),0)/items.length);return {items,done,avg}}
  function renderTermSummary(){els.termSummary.innerHTML=[1,2,3,4,5,6,7,8,9,10].map(t=>{const x=termStats(t);return `<article class="term-mini"><strong>${t}.º cuatrimestre</strong><p>${x.done} de ${x.items.length} con cursada registrada · avance personal ${x.avg}%</p><div class="small-progress"><i style="--w:${x.avg}%"></i></div></article>`}).join("")}
  function renderMiniCalendar(){const now=new Date(),year=now.getFullYear(),month=now.getMonth();els.miniMonthTitle.textContent=`${monthName(month)} ${year}`;const first=new Date(year,month,1),start=(first.getDay()+6)%7,days=new Date(year,month+1,0).getDate();let cells=["L","M","X","J","V","S","D"].map(x=>`<div class="mini-day" style="font-weight:850">${x}</div>`);for(let i=0;i<start;i++)cells.push(`<div class="mini-day"></div>`);for(let d=1;d<=days;d++){const ds=`${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`,has=events.some(e=>!e.deletedAt&&e.date===ds),today=d===now.getDate();cells.push(`<div class="mini-day ${has?"has-event":""} ${today?"today":""}">${d}</div>`)}els.miniCalendar.innerHTML=cells.join("")}
  function renderCareerProgress(){const total=SUBJECTS.length,approved=SUBJECTS.filter(item=>getSubjectState(item.id).status==="aprobada").length,percent=Math.round(approved/total*100),host=$("careerProgress");if(host)host.innerHTML=`<h2>Avance de la carrera</h2><strong>${approved} de ${total} materias y requisitos aprobados</strong><span>${percent} %</span>`}
  function renderDashboard(){renderHandList();renderCurrent();renderWeeklySchedule();renderEvents("upcomingEvents",5);renderMiniCalendar();renderCareerProgress()}
  function coursePassed(id){return ["cursada","final_pendiente","aprobada"].includes(getSubjectState(id).status)}
  function finalPassed(id){return getSubjectState(id).status==="aprobada"}
  function requirementResult(id,kind){
    const status=getSubjectState(id).status;
    if(status==="sin_estado")return "unknown";
    const ok=kind==="cursada"?coursePassed(id):finalPassed(id);
    return ok?"ok":"missing";
  }
  function courseEligibility(s){
    if(s.kind==="requirement")return {type:"requirement",label:"Requisito",missing:[],unknown:[]};
    if(s.allCursadasRequired){
      const requirements=SUBJECTS.filter(x=>x.kind!=="requirement"&&x.id!==s.id).map(x=>({id:x.id,kind:"cursada",result:requirementResult(x.id,"cursada")}));
      const missing=requirements.filter(x=>x.result==="missing"),unknown=requirements.filter(x=>x.result==="unknown");
      const type=missing.length?"blocked":unknown.length?"unknown":"ready";
      const label=missing.length?`${missing.length} faltante${missing.length===1?"":"s"}${unknown.length?` · ${unknown.length} sin estado`:""}`:unknown.length?`${unknown.length} sin estado`:"Disponible";
      return {type,label,missing,unknown};
    }
    const requirements=[
      ...(s.courseReqCursadas||[]).map(id=>({id,kind:"cursada",result:requirementResult(id,"cursada")})),
      ...(s.courseReqFinals||[]).map(id=>({id,kind:"final",result:requirementResult(id,"final")}))
    ];
    const missing=requirements.filter(x=>x.result==="missing"),unknown=requirements.filter(x=>x.result==="unknown");
    const noReq=requirements.length===0;
    const type=noReq?"free":missing.length?"blocked":unknown.length?"unknown":"ready";
    const label=noReq?"Sin correlativas":missing.length?`${missing.length} faltante${missing.length===1?"":"s"}${unknown.length?` · ${unknown.length} sin estado`:""}`:unknown.length?`${unknown.length} sin estado`:"Podés cursar";
    return {type,label,missing,unknown};
  }
  function subjectMeta(s){const pieces=[];if(s.code)pieces.push(s.code);if(s.hours)pieces.push(`${s.hours} h`);if(s.offering)pieces.push(s.offering);return pieces.join(" · ")}
  function renderPlan(term="all"){
    const terms=term==="all"?[1,2,3,4,5,6,7,8,9,10]:[Number(term)];
    els.planGrid.innerHTML=terms.map(t=>{const items=SUBJECTS.filter(s=>s.term===t);return `<section class="term-panel"><div class="term-panel-head"><h2>${t}.º cuatrimestre</h2><span>${items.length} elemento${items.length===1?"":"s"}</span></div>${items.map(s=>{const e=courseEligibility(s);return `<div class="plan-course" data-correlation="${s.id}" style="--hue:${s.hue}"><span class="plan-color"></span><button class="plan-course-main" data-open="${s.id}"><strong>${safe(s.name)}</strong><small>${safe(subjectMeta(s)||"Contenido pendiente")}</small></button><span class="eligibility-pill ${e.type}">${safe(e.label)}</span><select class="status-select" data-status="${s.id}">${statusOptions(getSubjectState(s.id).status)}</select></div>`}).join("")}</section>`}).join("");
    els.planGrid.querySelectorAll("[data-open]").forEach(b=>b.onclick=e=>{e.stopPropagation();openSubject(b.dataset.open)});
    els.planGrid.querySelectorAll("[data-status]").forEach(sel=>sel.onchange=async e=>{e.stopPropagation();await saveSubjectState(sel.dataset.status,{status:sel.value});renderPlan(term);renderDashboard()});
    els.planGrid.querySelectorAll("[data-correlation]").forEach(row=>row.onclick=e=>{if(e.target.closest("select")||e.target.closest("button"))return;openCorrelation(row.dataset.correlation)});
  }
  function renderCalendar(){
    const {year,month}=settings.calendar;els.calendarTitle.textContent=`${monthName(month)} ${year}`;
    const first=new Date(year,month,1),start=(first.getDay()+6)%7,days=new Date(year,month+1,0).getDate(),prevDays=new Date(year,month,0).getDate(),now=new Date();let html="";
    for(let i=0;i<42;i++){
      let d,cm=month,cy=year,muted=false;if(i<start){d=prevDays-start+i+1;cm=month-1;muted=true}else if(i>=start+days){d=i-start-days+1;cm=month+1;muted=true}else d=i-start+1;if(cm<0){cm=11;cy--}if(cm>11){cm=0;cy++}
      const ds=`${cy}-${String(cm+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`,ev=events.filter(e=>!e.deletedAt&&e.date===ds),isToday=cy===now.getFullYear()&&cm===now.getMonth()&&d===now.getDate();
      html+=`<div class="cal-cell ${muted?"muted":""} ${isToday?"today":""}"><span class="day-num">${d}</span><button class="cal-add" data-add-date="${ds}" title="Agregar fecha">${icon("i-plus")}</button><div class="cal-events">${ev.map(e=>{const s=subject(e.subjectId);return `<div class="cal-event" style="--hue:${subjectHue(s)}" title="${safe(s?.name||"")}: ${safe(e.title)}">${safe(e.title)}</div>`}).join("")}</div></div>`;
    }
    els.calendarGrid.innerHTML=html;els.calendarGrid.querySelectorAll("[data-add-date]").forEach(b=>b.onclick=()=>openEventModal(b.dataset.addDate));renderEvents("calendarEventList",50);
    const active=events.filter(e=>!e.deletedAt&&e.date.startsWith(`${year}-${String(month+1).padStart(2,"0")}`));
    const ids=[...new Set(active.map(e=>e.subjectId))];
    els.calendarLegend.innerHTML=ids.length?ids.map(id=>{const s=subject(id),count=active.filter(e=>e.subjectId===id).length;return `<div class="calendar-legend-item" style="--hue:${subjectHue(s)}"><i></i><span>${safe(s?.name||"Materia")}</span><strong>${count}</strong></div>`}).join(""):`<div class="empty-box">No hay fechas en este mes.</div>`;
    els.eventCountLabel.textContent=`${events.filter(e=>!e.deletedAt).length} cargada${events.filter(e=>!e.deletedAt).length===1?"":"s"}`;
  }
  function refreshUnitSelector(subjectId){if(subjectId&&!settings.currentIds.includes(subjectId))settings.recentSubjectIds=[subjectId,...(settings.recentSubjectIds||[]).filter(id=>id!==subjectId&&!settings.currentIds.includes(id))].slice(0,3);const units=window.LBT_CONTENT.units(subjectId),migrationKey=`solved-fisica-integral-v3:${DB.dbName||"profile"}`,introduceIntegral=subjectId==="fisica1"&&!localStorage.getItem(migrationKey)&&units.some(unit=>unit.unitId==="resumen-integral");if(introduceIntegral){settings.lastUnitBySubject={...(settings.lastUnitBySubject||{}),fisica1:"resumen-integral"};localStorage.setItem(migrationKey,"1")}const preferred=settings.lastUnitBySubject?.[subjectId],selected=units.some(unit=>unit.unitId===preferred)?preferred:units[0]?.unitId||"legacy";els.studyUnit.innerHTML=units.length?units.map(unit=>`<option value="${safe(unit.unitId)}">${safe(unit.title)}</option>`).join(""):'<option value="legacy">Sin unidades publicadas</option>';els.studyUnit.value=selected;els.studyUnit.disabled=!units.length;return selected}
  async function openSubject(id){await window.LBT_UTILS?.transitionStudyContext();currentSubject=subject(id);if(!currentSubject)return;settings.lastSubject=id;settings.lastTab=currentTab="summary";settings.lastUnitBySubject={...(settings.lastUnitBySubject||{})};settings.lastUnitBySubject[id]=refreshUnitSelector(id);await saveSettings();els.studyTitle.textContent=currentSubject.name;els.studyMeta.textContent=subjectMeta(currentSubject)||`${currentSubject.term}.º cuatrimestre`;const hue=subjectHue();els.subjectMark.style.setProperty("--hue",hue);els.studyPage.style.setProperty("--hue",hue);document.documentElement.style.setProperty("--subject-hue",hue);els.studyStatus.innerHTML=statusOptions(getSubjectState(id).status);els.studyTabs.querySelectorAll(".tab").forEach(tab=>tab.classList.toggle("active",tab.dataset.tab==="summary"));renderStudy();setPage("study");window.LBT_UTILS?.logActivity("unit-opened",{subjectId:id,unitId:els.studyUnit.value})}
  function formulaSheet(subjectId){const formulas=window.LBT_UTILS.contentItems(subjectId).filter(item=>item.contentType==="formula");if(!formulas.length)return '<div class="content-card"><h2>Fórmulas</h2><p>Todavía no hay fórmulas publicadas para esta materia.</p></div>';return `<div class="formula-sheet"><div class="section-head"><h2>Hoja rápida de fórmulas</h2><button onclick="window.print()">Imprimir</button></div>${formulas.map(item=>{const f=item.source,refs=f.references||[];return `<article class="formula-card" data-anchor-id="${safe(item.targetId)}"><small>${safe(item.unitId)}</small><h3>${safe(item.title)}</h3><div class="formula-visual">${safe(f.visual||f.linear)}</div><code>${safe(f.linear)}</code>${f.latex?`<code>LaTeX: ${safe(f.latex)}</code>`:""}<dl>${(f.variables||[]).map(v=>`<div><dt>${safe(v.symbol)}</dt><dd>${safe(v.definition)}</dd></div>`).join("")}</dl>${f.units?.length?`<p>Unidades: ${safe(f.units.join(", "))}</p>`:""}${f.conditions?.length?`<p>Condiciones: ${safe(f.conditions.join(", "))}</p>`:""}${f.relatedExercises?.length?`<p>Ejercicios relacionados: ${safe(f.relatedExercises.join(", "))}</p>`:""}<p>${refs.map(r=>`${safe(r.sourceId)}${r.page?` · p. ${r.page}`:""}`).join("; ")}</p><button data-copy="${safe(f.linear)}">Copiar fórmula</button><button data-formula-favorite="${safe(item.targetId)}">Llevar al parcial</button></article>`}).join("")}</div>`}
  async function renderStudy(){
    const s=currentSubject,unitId=els.studyUnit.value;activeHighlightId=null;pendingSelection=null;updateHighlightButton();
    const selectedUnit=window.LBT_CONTENT.getUnit(s.id,unitId),duplicateButton=$("duplicateOfficialBtn"),hideButton=$("hideOfficialBtn"),canPersonalize=window.SOLVED_AUTH?.profile().mode==="authorized-google"&&selectedUnit?.origin==="official-supabase";duplicateButton.hidden=!canPersonalize;hideButton.hidden=!canPersonalize;duplicateButton.onclick=async()=>{try{await window.LBT_CONTENT.duplicateOfficial(selectedUnit.cloudId);refreshUnitSelector(s.id);toast("Copia personal creada")}catch(error){toast(error.message)}};hideButton.onclick=async()=>{try{await window.LBT_CONTENT.setOfficialHidden(selectedUnit.cloudId,true);refreshUnitSelector(s.id);renderStudy();toast("Contenido oficial ocultado para tu cuenta")}catch(error){toast(error.message)}};
    els.studyPage.dataset.subjectId=s.id;els.studyPage.dataset.unitId=unitId;els.studyPage.dataset.tab=currentTab;
    const empty='<div class="content-card empty-state"><strong>Todavía no hay contenido publicado para esta sección.</strong></div>',contentByTab={};
    for(const tab of ["summary","glossary","cards","exercises","map"])contentByTab[tab]=window.LBT_CONTENT.render(s.id,unitId,tab)||empty;
    contentByTab.formulas=formulaSheet(s.id)||empty;
    await window.LBT_STUDY_WORKSPACE.render({subjectId:s.id,unitId,tab:currentTab,subjectTitle:s.name,contentByTab,contentVersion:selectedUnit?.contentVersion||"empty"});
    const pane=els.studyBody.querySelector(".content-pane");if(pane&&!pane.querySelector(".notes-layer")){const layer=document.createElement("div");layer.className="notes-layer";layer.setAttribute("aria-label","Notas de estudio");pane.append(layer)}
    const flash=$("flash");if(flash)flash.onclick=()=>flash.classList.toggle("flipped");
    window.LBT_CONTENT.bind(els.studyBody);els.studyBody.querySelectorAll("[data-open-factory-context]").forEach(button=>button.onclick=()=>openFactory({subjectId:currentSubject.id,unitId:els.studyUnit.value}));window.LBT_NOTES.render();window.LBT_UTILS?.applyReading(currentSubject?.id);
    document.querySelectorAll("[data-formula-favorite]").forEach(button=>button.onclick=()=>window.LBT_UTILS.addBookmark({subjectId:s.id,unitId,contentType:"formula",targetId:button.dataset.formulaFavorite,title:button.closest("article").querySelector("h3").textContent},"default-1"));
    if(currentTab==="summary")document.querySelectorAll(".highlightable").forEach(block=>block.__baseText=block.textContent);
    applyZoom();if(currentTab==="summary"){applyAllHighlights();bindSummaryIndex()}
    updateToolbarVisibility();
  }
  function bindSummaryIndex(){document.querySelectorAll(".summary-index a").forEach(a=>a.onclick=e=>{e.preventDefault();const el=document.querySelector(a.getAttribute("href"));el?.scrollIntoView({behavior:"smooth",block:"start"})})}
  function updateToolbarVisibility(){const summary=currentTab==="summary",hasText=!!document.querySelector(".highlightable");els.highlightBtn.hidden=!summary||!hasText;els.indexBtn.hidden=!summary||!hasText;els.selectionHelp.hidden=!summary||!hasText;els.indexBtn.classList.toggle("active",settings.indexVisible)}
  function applyStudyPreferences(){document.documentElement.style.setProperty("--study-zoom",ZOOMS[settings.zoomIndex]||1);els.zoomBtn.textContent=`Zoom ${Math.round((ZOOMS[settings.zoomIndex]||1)*100)}%`}
  function applyZoom(){document.querySelectorAll(".zoom-target").forEach(el=>{el.style.zoom=ZOOMS[settings.zoomIndex]||1})}
  async function cycleZoom(){settings.zoomIndex=(Number(settings.zoomIndex||0)+1)%ZOOMS.length;applyStudyPreferences();applyZoom();await saveSettings()}
  async function toggleIndex(){settings.indexVisible=!settings.indexVisible;await saveSettings();const idx=$("summaryIndex");if(idx)idx.hidden=!settings.indexVisible;els.indexBtn.classList.toggle("active",settings.indexVisible)}

  function textOffset(block,node,offset){
    if(node===block)return [...block.childNodes].slice(0,offset).reduce((total,child)=>total+(child.textContent?.length||0),0);
    let total=0;const walker=document.createTreeWalker(block,NodeFilter.SHOW_TEXT);
    while(walker.nextNode()){const n=walker.currentNode;if(n===node)return total+offset;total+=n.nodeValue.length}
    return total;
  }
  function selectionPieces(range){
    const blocks=[...document.querySelectorAll(".highlightable")].filter(block=>{try{return range.intersectsNode(block)}catch(e){return false}});
    return blocks.map(block=>{
      const base=block.__baseText||block.textContent;let start=0,end=base.length;
      if(block.contains(range.startContainer))start=textOffset(block,range.startContainer,range.startOffset);
      if(block.contains(range.endContainer))end=textOffset(block,range.endContainer,range.endOffset);
      start=Math.max(0,Math.min(start,base.length));end=Math.max(start,Math.min(end,base.length));
      const exact=base.slice(start,end);if(!exact.trim())return null;
      return {blockId:block.dataset.blockId,start,end,exact,prefix:base.slice(Math.max(0,start-24),start),suffix:base.slice(end,end+24)};
    }).filter(Boolean);
  }
  function captureSelection(){
    if(currentTab!=="summary")return;
    const sel=window.getSelection();if(!sel||sel.rangeCount===0||sel.isCollapsed)return;
    const range=sel.getRangeAt(0);if(!els.studyBody.contains(range.commonAncestorContainer))return;
    const pieces=selectionPieces(range);if(!pieces.length)return;
    pendingSelection=pieces;activeHighlightId=null;
    document.querySelectorAll(".highlightable").forEach(b=>b.classList.toggle("selection-ready",pieces.some(p=>p.blockId===b.dataset.blockId)));
    updateHighlightButton();
  }
  function preserveSelection(event){
    captureSelection();
    if(event?.type==="mousedown"||(event?.type==="pointerdown"&&event.pointerType!=="touch"))event.preventDefault();
  }
  function captureSelectionSoon(){setTimeout(captureSelection,0)}
  function updateHighlightButton(){
    const removing=!!activeHighlightId;els.highlightLabel.textContent=removing?"Quitar resaltado":"Resaltar";els.highlightBtn.classList.toggle("active",removing);
    const total=Array.isArray(pendingSelection)?pendingSelection.reduce((n,p)=>n+p.exact.length,0):0;
    const preview=Array.isArray(pendingSelection)?pendingSelection.map(p=>p.exact.trim()).join(" "):"";
    els.selectionHelp.textContent=removing?"Presioná para eliminar este resaltado.":total?`Selección lista: “${preview.slice(0,38)}${preview.length>38?"…":""}”`:"Seleccioná texto dentro del resumen.";
  }
  async function highlightAction(){
    captureSelection();
    if(activeHighlightId){const item=highlights.find(h=>h.id===activeHighlightId);if(item){item.deletedAt=nowISO();item.updatedAt=item.deletedAt;await persist("highlights",item)}activeHighlightId=null;updateHighlightButton();applyAllHighlights();toast("Resaltado eliminado");return}
    if(!Array.isArray(pendingSelection)||!pendingSelection.length){toast("Primero seleccioná una frase del resumen");return}
    const overlap=pendingSelection.some(piece=>highlights.some(h=>!h.deletedAt&&h.subjectId===currentSubject.id&&h.blockId===piece.blockId&&Math.max(h.start,piece.start)<Math.min(h.end,piece.end)));
    if(overlap){toast("La selección toca un resaltado existente. Quitalo antes de volver a marcar esa parte.");return}
    const stamp=nowISO();
    const unit=window.LBT_CONTENT.getUnit(currentSubject.id,els.studyUnit.value);for(const piece of pendingSelection){const h={id:uuid(),subjectId:currentSubject.id,unitId:unit?.unitId||null,studyBlock:els.studyUnit.value,tab:"summary",...piece,color:"yellow",contentVersion:unit?.contentVersion||CONTENT_VERSION,createdAt:stamp,updatedAt:stamp};highlights.push(h);await persist("highlights",h)}
    pendingSelection=null;window.getSelection()?.removeAllRanges();document.querySelectorAll(".selection-ready").forEach(b=>b.classList.remove("selection-ready"));updateHighlightButton();applyAllHighlights();toast("Resaltado guardado");
  }
  function resolveRange(h,text){
    if(text.slice(h.start,h.end)===h.exact)return {start:h.start,end:h.end};
    const matches=[];let start=text.indexOf(h.exact);
    while(start>=0){
      const end=start+h.exact.length;
      const prefix=h.prefix&&text.slice(Math.max(0,start-h.prefix.length),start)===h.prefix;
      const suffix=h.suffix&&text.slice(end,end+h.suffix.length)===h.suffix;
      matches.push({start,end,anchors:Number(prefix)+Number(suffix),distance:Math.abs(start-Number(h.start||0))});
      start=text.indexOf(h.exact,start+1);
    }
    if(!matches.length)return null;
    matches.sort((a,b)=>b.anchors-a.anchors||a.distance-b.distance);
    return {start:matches[0].start,end:matches[0].end};
  }
  function applyAllHighlights(){
    const blocks=[...document.querySelectorAll(".highlightable")];for(const block of blocks){block.__baseText=block.__baseText||block.textContent;block.textContent=block.__baseText}const unit=window.LBT_CONTENT.getUnit(currentSubject.id,els.studyUnit.value),legacyMap={intro:"demo-intro",purpose:"purpose",coverage:"coverage",progress:"progress"},retired=h=>h.unitId&&!window.LBT_CONTENT.getUnit(currentSubject.id,h.unitId),eligible=highlights.filter(h=>!h.deletedAt&&h.subjectId===currentSubject.id&&(h.unitId===unit?.unitId||(!h.unitId&&unit?.unitId==="resumen-integral")||retired(h))),resolved=[],orphans=[];
    for(const h of eligible){if(retired(h)){orphans.push(h);continue}let block=blocks.find(item=>item.dataset.blockId===h.blockId),range=block&&resolveRange(h,block.__baseText);if(!range&&!h.unitId){const local=String(h.blockId).split(":").at(-1),mapped=legacyMap[local];block=blocks.find(item=>item.dataset.localBlockId===mapped);range=block&&resolveRange(h,block.__baseText)}if(!range)for(const candidate of blocks){const found=resolveRange(h,candidate.__baseText);if(found){block=candidate;range=found;break}}if(!range&&block&&Number.isFinite(Number(h.start))){const start=Math.max(0,Math.min(block.__baseText.length,Number(h.start))),end=Math.max(start,Math.min(block.__baseText.length,start+String(h.exact||"").length));if(end>start){range={start,end};h.exact=block.__baseText.slice(start,end);h.prefix=block.__baseText.slice(Math.max(0,start-24),start);h.suffix=block.__baseText.slice(end,end+24)}}if(!range){orphans.push(h);continue}if(h.blockId!==block.dataset.blockId||h.unitId!==unit?.unitId||h.contentVersion!==unit?.contentVersion){h.blockId=block.dataset.blockId;h.unitId=unit?.unitId||null;h.contentVersion=unit?.contentVersion||h.contentVersion;h.updatedAt=nowISO();persist("highlights",h)}resolved.push({h,r:range,block})}
    for(const block of blocks){const records=resolved.filter(item=>item.block===block).sort((a,b)=>a.r.start-b.r.start),base=block.__baseText;block.textContent="";let pos=0;for(const {h,r} of records){if(r.start<pos)continue;block.append(document.createTextNode(base.slice(pos,r.start)));const mark=document.createElement("mark");mark.className="study-highlight";mark.dataset.highlightId=h.id;mark.textContent=base.slice(r.start,r.end);if(h.id===activeHighlightId)mark.classList.add("active");mark.onclick=e=>{e.stopPropagation();activeHighlightId=h.id;pendingSelection=null;window.getSelection()?.removeAllRanges();document.querySelectorAll(".selection-ready").forEach(item=>item.classList.remove("selection-ready"));updateHighlightButton()};block.append(mark);pos=r.end}block.append(document.createTextNode(base.slice(pos)))}renderOrphanHighlights(orphans,unit)
  }
  function renderOrphanHighlights(items,unit){document.querySelector(".orphan-highlights")?.remove();if(!items.length)return;const tray=document.createElement("aside");tray.className="orphan-highlights";tray.innerHTML="<strong>Resaltados sin ubicación</strong>";for(const item of items){const row=document.createElement("div"),quote=document.createElement("q");quote.textContent=item.exact;row.append(quote);for(const [label,action] of [["Copiar",()=>window.LBT_CONTENT.copyText(item.exact)],["Reanclar",async()=>{captureSelection();if(!pendingSelection?.length){toast("Seleccioná el nuevo texto antes de reanclar");return}const piece=pendingSelection[0];Object.assign(item,piece,{unitId:unit?.unitId||null,contentVersion:unit?.contentVersion||item.contentVersion,updatedAt:nowISO()});await persist("highlights",item);pendingSelection=null;applyAllHighlights()}],["Eliminar",async()=>{item.deletedAt=nowISO();item.updatedAt=item.deletedAt;await persist("highlights",item);applyAllHighlights()}]]){const button=document.createElement("button");button.textContent=label;button.onclick=action;row.append(button)}tray.append(row)}document.querySelector(".content-pane")?.append(tray)}
  function corrList(ids,requirement){
    if(!ids?.length)return `<div class="corr-empty">No exige materias en esta categoría.</div>`;
    return `<div class="corr-list">${ids.map(id=>{const s=subject(id);if(!s)return "";const result=requirementResult(id,requirement);const label=result==="ok"?"Cumplida":result==="unknown"?"Sin estado":"Falta";return `<div class="corr-item" style="--hue:${s.hue}"><i class="corr-dot"></i><div><strong>${safe(s.name)}</strong><small>${safe(STATUS[getSubjectState(id).status])}</small></div><span class="corr-check ${result}">${label}</span></div>`}).join("")}</div>`;
  }
  function unlockReason(target,id){
    const reasons=[];
    if((target.courseReqCursadas||[]).includes(id))reasons.push("su cursada aprobada habilita cursar");
    if((target.courseReqFinals||[]).includes(id))reasons.push("su final aprobado habilita cursar");
    if((target.finalReqFinals||[]).includes(id))reasons.push("su final aprobado habilita rendir");
    return reasons.join(" · ");
  }
  function openCorrelation(id){
    const s=subject(id);if(!s)return;const e=courseEligibility(s);
    els.correlationTitle.textContent=s.name;
    const allText=s.allCursadasRequired?"Para cursar exige tener aprobadas las cursadas de todas las materias del plan.":null;
    const unlocks=SUBJECTS.filter(x=>(x.courseReqCursadas||[]).includes(id)||(x.courseReqFinals||[]).includes(id)||(x.finalReqFinals||[]).includes(id));
    els.correlationContent.innerHTML=`<div class="correlation-source-note"><strong>Verificado con el plan de correlatividades · página ${s.sourcePage}</strong><span>“Sin estado” significa que todavía no cargaste ese dato: no se cuenta automáticamente como correlativa incumplida.</span></div><div class="correlation-summary"><div class="correlation-stat"><strong>${safe(e.label)}</strong><span>Situación calculada con los estados que cargaste.</span></div><div class="correlation-stat"><strong>${s.term}.º cuatrimestre</strong><span>${safe(s.offering||"Oferta no indicada")}</span></div><div class="correlation-stat"><strong>${safe(STATUS[getSubjectState(id).status])}</strong><span>Estado académico actual.</span></div></div>${allText?`<div class="corr-section"><h3>Para cursar</h3><div class="corr-empty">${safe(allText)}</div></div>`:`<div class="corr-section"><h3>Para cursar: cursadas aprobadas</h3>${corrList(s.courseReqCursadas,"cursada")}</div><div class="corr-section"><h3>Para cursar: finales aprobados</h3>${corrList(s.courseReqFinals,"final")}</div>`}<div class="corr-section"><h3>Para rendir el final: finales aprobados</h3>${corrList(s.finalReqFinals,"final")}</div><div class="corr-section"><h3>Esta materia interviene como correlativa en</h3>${unlocks.length?`<div class="corr-list">${unlocks.map(x=>`<div class="corr-item" style="--hue:${x.hue}"><i class="corr-dot"></i><div><strong>${safe(x.name)}</strong><small>${safe(unlockReason(x,id))}</small></div></div>`).join("")}</div>`:`<div class="corr-empty">No figura como correlativa directa de otra materia en el documento.</div>`}</div>`;
    els.correlationModal.hidden=false;
  }
  async function enterFullscreen(){const shell=document.querySelector(".study-shell");if(!document.fullscreenElement){await shell.requestFullscreen()}else await document.exitFullscreen()}

  function openEventModal(date=""){els.eventSubject.innerHTML=SUBJECTS.map(s=>`<option value="${s.id}" ${currentSubject?.id===s.id?"selected":""}>${safe(s.name)}</option>`).join("");els.eventDate.value=date||new Date().toISOString().slice(0,10);els.eventTitle.value="";els.eventNote.value="";els.eventModal.hidden=false}
  function openCoursesModal(){els.courseChecks.innerHTML=SUBJECTS.map(s=>`<label class="course-check" style="--hue:${s.hue}"><input type="checkbox" value="${s.id}" ${settings.currentIds.includes(s.id)?"checked":""}><span class="dot"></span><span><strong style="display:block;font-size:11px">${safe(s.name)}</strong><small style="color:var(--muted);font-size:9px">${s.term}.º cuatrimestre</small></span></label>`).join("");els.coursesModal.hidden=false}
  async function exportBackup(){const payload=await DB.exportAll(),blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`solved-respaldo-v060-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast("Respaldo completo exportado")}
  function chooseImport(mode){restoreMode=mode;els.restoreInput.click()}
  async function importBackupFile(file){try{const text=await file.text(),payload=JSON.parse(text);await DB.importAll(payload,restoreMode);await loadData();await window.LBT_CONTENT.reload();await window.LBT_NOTES.reload();refreshUnitSelector(currentSubject?.id);applyTheme();applyStudyPreferences();renderDashboard();renderPlan();renderCalendar();if(currentSubject)renderStudy();if(restoreMode==="replace"){await driveSync?.markLocalReplace();els.replaceDriveBtn.hidden=false}else driveSync?.localChanged();closeModals();toast(restoreMode==="replace"?"Respaldo restaurado localmente":"Respaldo combinado")}catch(e){console.error(e);toast("El archivo no es un respaldo válido")}}
  function closeModals(){document.querySelectorAll(".modal-backdrop").forEach(m=>m.hidden=true)}
  function toast(msg){document.querySelector(".toast")?.remove();const el=document.createElement("div");el.className="toast";el.textContent=msg;document.body.appendChild(el);setTimeout(()=>el.remove(),2800)}
  function applyTheme(){document.documentElement.dataset.theme=settings.theme||"light";document.documentElement.dataset.visualTheme=settings.visualTheme||"classic";els.visualTheme.value=settings.visualTheme||"classic";els.appearancePanel?.querySelectorAll("[data-color-mode]").forEach(button=>button.classList.toggle("active",button.dataset.colorMode===settings.theme));if(currentSubject)document.documentElement.style.setProperty("--subject-hue",subjectHue())}
  function updateDriveState(state){
    const labels={disconnected:"Conectar Google Drive",syncing:"Sincronizando…",synced:"Sincronizado con Drive",pending:"Cambios pendientes",offline:"Sin conexión",reconnect:"Drive pausado · tocar para reconectar",error:"Error de sincronización","pending-authoritative":"Cambios pendientes"};
    els.syncText.textContent=labels[state]||"Guardado localmente";const mobileState=document.querySelector("#mobileSyncState");if(mobileState)mobileState.textContent=labels[state]||"Guardado localmente";els.syncPill.classList.toggle("saving",state==="syncing");els.syncPill.classList.toggle("error",state==="error"||state==="reconnect");
    const connected=!!driveSync?.hasToken();els.driveActionBtn.hidden=state==="syncing";els.driveActionBtn.textContent=state==="reconnect"?"Reconectar Drive":connected?"Sincronizar ahora":"Conectar Google Drive";els.driveDisconnectBtn.hidden=!connected;
  }
  async function driveAction(){try{if(driveSync.hasToken())await driveSync.syncNow();else await driveSync.requestToken()}catch(error){toast(error.message||"No se pudo sincronizar con Google Drive")}}
  function filterPlan(query){const q=query.trim().toLowerCase();setPage("subjects");document.querySelectorAll(".plan-course").forEach(row=>row.hidden=q&&!row.textContent.toLowerCase().includes(q))}
  function auditButtons(){document.querySelectorAll("button").forEach(btn=>{if(btn.hidden)return;if(!btn.onclick&&!btn.hasAttribute("data-page")&&!btn.hasAttribute("data-close")&&!btn.hasAttribute("data-page-link")&&!btn.closest("form")&&!btn.id)console.warn("Botón sin enlace explícito",btn)})}

  function bindEvents(){
    window.addEventListener("solved-user-material-changed",()=>driveSync?.localChanged());
    document.querySelectorAll("[data-open-factory]").forEach(button=>button.onclick=()=>openFactory());
    document.querySelectorAll(".nav-btn").forEach(b=>b.onclick=async()=>{if(!els.studyPage.hidden&&b.dataset.page!=="study")await window.LBT_UTILS?.transitionStudyContext();setPage(b.dataset.page)});document.querySelectorAll("[data-page-link]").forEach(b=>b.onclick=async()=>{if(!els.studyPage.hidden&&b.dataset.pageLink!=="study")await window.LBT_UTILS?.transitionStudyContext();setPage(b.dataset.pageLink)});document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>$(b.dataset.close).hidden=true);
    [els.eventModal,els.scheduleModal,els.coursesModal,els.backupModal,els.correlationModal].forEach(m=>m.onclick=e=>{if(e.target===m)m.hidden=true});els.manageCourses.onclick=els.manageCoursesPlan.onclick=openCoursesModal;els.addEventTop.onclick=els.addEventSide.onclick=els.addEventCalendar.onclick=()=>openEventModal();els.addScheduleBlock.onclick=()=>openScheduleModal();
    els.eventForm.onsubmit=async e=>{e.preventDefault();const item={id:uuid(),subjectId:els.eventSubject.value,date:els.eventDate.value,title:els.eventTitle.value.trim(),note:els.eventNote.value.trim(),createdAt:nowISO(),updatedAt:nowISO()};events.push(item);await persist("events",item);els.eventModal.hidden=true;renderDashboard();renderCalendar();toast("Fecha guardada")};
    els.scheduleForm.onsubmit=async e=>{e.preventDefault();const id=els.scheduleId.value||uuid(),day=Number(els.scheduleDay.value),start=els.scheduleStart.value,end=els.scheduleEnd.value,name=els.scheduleName.value.trim(),startMinutes=scheduleMinutes(start),endMinutes=scheduleMinutes(end);let error="";if(!name)error="Escribí el nombre de la materia.";else if(startMinutes<420||endMinutes>1380)error="El horario debe estar entre las 07:00 y las 23:00.";else if(endMinutes<=startMinutes)error="La hora de fin debe ser posterior a la de inicio.";else if((settings.weeklySchedule||[]).some(block=>block.id!==id&&Number(block.day)===day&&startMinutes<scheduleMinutes(block.end)&&endMinutes>scheduleMinutes(block.start)))error="Este bloque se superpone con otro del mismo día.";if(error){els.scheduleError.textContent=error;els.scheduleError.hidden=false;return}const item={id,name,day,start,end,color:els.scheduleColor.value,updatedAt:nowISO()};settings.weeklySchedule=[...(settings.weeklySchedule||[]).filter(block=>block.id!==id),item];await saveSettings();els.scheduleModal.hidden=true;renderWeeklySchedule();toast("Horario actualizado")};
    els.deleteScheduleBlock.onclick=async()=>{const id=els.scheduleId.value;if(!id)return;settings.weeklySchedule=(settings.weeklySchedule||[]).filter(block=>block.id!==id);await saveSettings();els.scheduleModal.hidden=true;renderWeeklySchedule();toast("Bloque eliminado")};
    els.coursesForm.onsubmit=async e=>{e.preventDefault();const ids=[...els.courseChecks.querySelectorAll("input:checked")].map(x=>x.value);settings.currentIds=ids;settings.order=[...settings.order.filter(id=>ids.includes(id)),...ids.filter(id=>!settings.order.includes(id))];settings.recentSubjectIds=(settings.recentSubjectIds||[]).filter(id=>!ids.includes(id)).slice(0,3);await saveSettings();els.coursesModal.hidden=true;renderDashboard();toast("Materias a mano actualizadas")};
    els.termFilter.querySelectorAll("button").forEach(b=>b.onclick=()=>{els.termFilter.querySelectorAll("button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderPlan(b.dataset.term)});
    els.prevMonth.onclick=async()=>{settings.calendar.month--;if(settings.calendar.month<0){settings.calendar.month=11;settings.calendar.year--}await saveSettings();renderCalendar()};els.nextMonth.onclick=async()=>{settings.calendar.month++;if(settings.calendar.month>11){settings.calendar.month=0;settings.calendar.year++}await saveSettings();renderCalendar()};els.todayMonth.onclick=async()=>{const d=new Date();settings.calendar={year:d.getFullYear(),month:d.getMonth()};await saveSettings();renderCalendar()};
    els.backStudy.onclick=async()=>{await window.LBT_UTILS?.transitionStudyContext();setPage("dashboard")};els.studyStatus.onchange=async()=>{await saveSubjectState(currentSubject.id,{status:els.studyStatus.value});renderDashboard()};els.studyTabs.querySelectorAll(".tab").forEach(t=>t.onclick=async()=>{if(t.dataset.tab===currentTab)return;await window.LBT_UTILS?.transitionStudyContext();currentTab=t.dataset.tab;settings.lastTab=currentTab;await saveSettings();els.studyTabs.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x===t));renderStudy()});els.studyUnit.onchange=async()=>{await window.LBT_UTILS?.transitionStudyContext();settings.lastUnitBySubject={...(settings.lastUnitBySubject||{}),[currentSubject.id]:els.studyUnit.value};await saveSettings();renderStudy()};
    window.addEventListener("lbt-open-study-tab",event=>{const tab=event.detail?.tab,target=els.studyTabs.querySelector(`[data-tab="${tab}"]`);if(!currentSubject||!target)return;window.LBT_UTILS?.transitionStudyContext();currentTab=tab;settings.lastTab=tab;saveSettings();els.studyTabs.querySelectorAll(".tab").forEach(item=>item.classList.toggle("active",item===target));renderStudy()});
    els.factoryFromStudy.onclick=()=>openFactory({subjectId:currentSubject.id,unitId:els.studyUnit.value});
    els.appearanceSubject.innerHTML=SUBJECTS.map(item=>`<option value="${item.id}">${safe(item.name)}</option>`).join("");els.appearanceSubject.value=currentSubject?.id||SUBJECTS[0].id;const palette=[12,28,48,88,132,168,198,214,250,286,326,348];els.subjectHuePalette.innerHTML=palette.map(hue=>`<button type="button" data-subject-hue="${hue}" style="--preview-hue:${hue}" aria-label="Matiz ${hue}"></button>`).join("");els.appearanceSubject.onchange=refreshSubjectColorEditor;els.subjectHuePalette.querySelectorAll("[data-subject-hue]").forEach(button=>button.onclick=()=>persistSubjectHue(els.appearanceSubject.value,button.dataset.subjectHue));els.subjectHueRange.oninput=()=>previewSubjectHue(els.appearanceSubject.value,els.subjectHueRange.value);els.subjectHueRange.onchange=()=>persistSubjectHue(els.appearanceSubject.value,els.subjectHueRange.value);els.resetSubjectColor.onclick=async()=>{const id=els.appearanceSubject.value,next={...(settings.subjectHueOverrides||{})};delete next[id];settings.subjectHueOverrides=next;applyTheme();applyRenderedSubjectHues();if(currentSubject?.id===id)renderStudy();refreshSubjectColorEditor();await saveSettings()};els.resetAllSubjectColors.onclick=async()=>{settings.subjectHueOverrides={};applyTheme();renderDashboard();renderPlan();renderCalendar();if(currentSubject)renderStudy();refreshSubjectColorEditor();await saveSettings()};refreshSubjectColorEditor();els.themeBtn.onclick=()=>{els.appearancePanel.hidden=!els.appearancePanel.hidden;els.themeBtn.setAttribute("aria-expanded",String(!els.appearancePanel.hidden));if(!els.appearancePanel.hidden)refreshSubjectColorEditor()};els.appearanceClose.onclick=()=>{els.appearancePanel.hidden=true;els.themeBtn.setAttribute("aria-expanded","false")};els.appearancePanel.querySelectorAll("[data-color-mode]").forEach(button=>button.onclick=async()=>{settings.theme=button.dataset.colorMode;applyTheme();await saveSettings()});els.visualTheme.onchange=async()=>{settings.visualTheme=els.visualTheme.value;applyTheme();await saveSettings()};els.resetAppearance.onclick=async()=>{settings.theme="light";settings.visualTheme="classic";settings.subjectHueOverrides={};applyTheme();renderDashboard();renderPlan();renderCalendar();if(currentSubject)renderStudy();refreshSubjectColorEditor();await saveSettings()};
    els.backupBtn.onclick=()=>els.backupModal.hidden=false;els.exportBackupBtn.onclick=els.exportBackupModal.onclick=exportBackup;els.importBackupBtn.onclick=()=>chooseImport("merge");els.importMergeBtn.onclick=()=>chooseImport("merge");els.importReplaceBtn.onclick=()=>chooseImport("replace");els.replaceDriveBtn.onclick=async()=>{if(!confirm("¿Reemplazar la copia de Drive con este respaldo local?"))return;try{const uploaded=await driveSync.replaceRemote();if(uploaded===true){els.replaceDriveBtn.hidden=true;toast("Copia de Drive reemplazada")}}catch(error){toast(error.message)}};els.restoreInput.onchange=()=>{const f=els.restoreInput.files[0];if(f)importBackupFile(f);els.restoreInput.value=""};
    els.driveActionBtn.onclick=driveAction;els.driveDisconnectBtn.onclick=()=>{driveSync.disconnect();toast("Google Drive desconectado; los datos locales se conservaron")};window.addEventListener("online",()=>{if(driveSync.hasToken())driveSync.syncNow().catch(()=>{});else driveSync.localChanged()});window.addEventListener("offline",()=>updateDriveState("offline"));window.addEventListener("lbt-fallback-error",event=>{setSaveState("error","Cambios sólo en memoria");toast(event.detail)});
    window.addEventListener("lbt-open-content",async event=>{await openSubject(event.detail.subjectId);if([...els.studyUnit.options].some(option=>option.value===event.detail.unitId)){els.studyUnit.value=event.detail.unitId;settings.lastUnitBySubject={...(settings.lastUnitBySubject||{}),[event.detail.subjectId]:event.detail.unitId};await saveSettings();await renderStudy()}if(String(event.detail.targetId||"").startsWith("material:")){await window.LBT_STUDY_WORKSPACE.openResource(event.detail.targetId,"left");return}requestAnimationFrame(()=>document.querySelector(`[data-block-id="${CSS.escape(event.detail.targetId)}"],[data-anchor-id="${CSS.escape(event.detail.targetId)}"]`)?.scrollIntoView({block:"center"}))});
    ["pointerdown","mousedown","touchstart"].forEach(type=>els.studyToolbar.addEventListener(type,preserveSelection,{passive:false}));
    els.studyToolbar.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" ")captureSelection()});
    els.highlightBtn.onclick=highlightAction;els.newNoteBtn.onclick=()=>window.LBT_NOTES.create();els.contentUpdateBtn.onclick=async()=>{try{const changed=await window.LBT_CONTENT.check(true);toast(changed?"Contenido actualizado":"El contenido ya está actualizado")}catch(error){toast(error.message)}};window.addEventListener("lbt-content-error",event=>toast(`${event.detail}. Se conserva la versión anterior.`));window.addEventListener("solved-toast",event=>toast(event.detail));els.zoomBtn.onclick=cycleZoom;els.indexBtn.onclick=toggleIndex;els.fullscreenBtn.onclick=enterFullscreen;els.fullscreenExit.onclick=()=>document.exitFullscreen();
    document.addEventListener("selectionchange",captureSelection);els.studyBody.addEventListener("pointerup",captureSelectionSoon);els.studyBody.addEventListener("touchend",captureSelectionSoon);els.studyBody.addEventListener("mouseup",captureSelectionSoon);els.studyBody.addEventListener("keyup",captureSelectionSoon);els.studyBody.onclick=e=>{if(currentTab==="summary"&&!e.target.closest("mark.study-highlight")&&!window.getSelection()?.toString()){activeHighlightId=null;updateHighlightButton();document.querySelectorAll("mark.study-highlight").forEach(m=>m.classList.remove("active"))}};
    if(!document.documentElement.requestFullscreen)els.fullscreenBtn.hidden=true;
  }
  function registerPWA(){
    const installed=()=>matchMedia("(display-mode: standalone)").matches||navigator.standalone===true,updateInstallState=()=>{const active=installed();els.accountInstall.textContent=active?"SOLved está instalada":"Instalar SOLved en esta PC";els.accountInstall.disabled=active;els.installBtn.hidden=active||!deferredInstallPrompt},requestInstall=async()=>{if(installed())return updateInstallState();if(!deferredInstallPrompt){els.installHelpModal.hidden=false;return}deferredInstallPrompt.prompt();await deferredInstallPrompt.userChoice;deferredInstallPrompt=null;updateInstallState()};
    window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredInstallPrompt=e;updateInstallState()});els.installBtn.onclick=els.accountInstall.onclick=requestInstall;
    window.addEventListener("appinstalled",()=>{deferredInstallPrompt=null;updateInstallState();toast("Aplicación instalada")});matchMedia("(display-mode: standalone)").addEventListener?.("change",updateInstallState);updateInstallState();
    if("serviceWorker" in navigator&&location.protocol.startsWith("http"))navigator.serviceWorker.register(`./sw.js?v=${APP_VERSION}`,{scope:"./"}).then(reg=>{const activate=async worker=>{showUpdate(worker);try{await window.LBT_NOTES?.flushPendingSaves();worker?.postMessage({type:"SKIP_WAITING"})}catch(error){console.warn("Actualización diferida",error)}};if(reg.waiting)activate(reg.waiting);reg.update();reg.addEventListener("updatefound",()=>{const worker=reg.installing;worker?.addEventListener("statechange",()=>{if(worker.state==="installed"&&navigator.serviceWorker.controller)activate(worker)})})}).catch(e=>console.warn("Service worker",e));
    navigator.serviceWorker?.addEventListener("controllerchange",()=>location.reload());els.updateBtn.onclick=async()=>{els.updateBtn.disabled=true;try{await window.LBT_NOTES.flushPendingSaves();waitingWorker?.postMessage({type:"SKIP_WAITING"})}finally{els.updateBtn.disabled=false}};
  }
  function showUpdate(worker){waitingWorker=worker;els.updateBtn.hidden=false}

  initialize().catch(e=>{console.error(e);setSaveState("error","Error de inicio");toast("La aplicación no pudo iniciarse correctamente")});
})();
