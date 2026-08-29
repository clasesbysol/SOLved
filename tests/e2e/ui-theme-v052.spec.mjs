import {test,expect} from "@playwright/test";

const ready=async page=>{await page.goto("/");await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true")};
const openPhysics=async page=>{await ready(page);await page.locator('[data-open="fisica1"]').first().click();await page.locator("#studyUnit").selectOption("resumen-integral")};

test("@desktop apariencia ofrece cinco temas, claro/oscuro y persiste",async({page})=>{
  await ready(page);await page.locator("#themeBtn").click();await expect(page.locator("#appearancePanel")).toBeVisible();
  await expect(page.locator("#visualTheme option")).toHaveCount(5);await page.locator("#visualTheme").selectOption("technical-blue");await page.locator('[data-color-mode="dark"]').click();
  await expect(page.locator("html")).toHaveAttribute("data-visual-theme","technical-blue");await expect(page.locator("html")).toHaveAttribute("data-theme","dark");
  await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");await expect(page.locator("html")).toHaveAttribute("data-visual-theme","technical-blue");await expect(page.locator("html")).toHaveAttribute("data-theme","dark");
  await page.locator("#themeBtn").click();await page.locator("#resetAppearance").click();await expect(page.locator("html")).toHaveAttribute("data-visual-theme","classic");await expect(page.locator("html")).toHaveAttribute("data-theme","light");
});

test.skip("@desktop resaltado y controles usan el sistema cromático",async({page})=>{
  await openPhysics(page);expect(await page.locator("html").evaluate(element=>getComputedStyle(element).getPropertyValue("--subject-hue").trim())).toBe("214");
  await page.evaluate(()=>{const node=document.querySelector('[data-block-id="fisica1:demo:demo-intro"]'),range=document.createRange();range.selectNodeContents(node);const selection=getSelection();selection.removeAllRanges();selection.addRange(range)});await page.locator("#highlightBtn").click();const mark=page.locator("mark.study-highlight");await expect(mark).toHaveCount(1);expect(await mark.evaluate(element=>getComputedStyle(element).backgroundColor)).not.toBe("rgb(255, 230, 138)");
  const select=page.locator("#studyUnit");expect(parseFloat(await select.evaluate(element=>getComputedStyle(element).borderRadius))).toBeGreaterThanOrEqual(10);expect(parseFloat(await select.evaluate(element=>getComputedStyle(element).minHeight))).toBeGreaterThanOrEqual(40);
});

test("@desktop Inicio y Configuración tienen la nueva jerarquía",async({page})=>{
  await ready(page);await expect(page.getByRole("heading",{name:"Horario semanal"})).toBeVisible();await expect(page.getByRole("heading",{name:"Materias en curso"})).toBeVisible();await expect(page.getByRole("heading",{name:"Fechas importantes"})).toBeVisible();await expect(page.getByRole("heading",{name:"Checklist"})).toBeVisible();
  await expect(page.locator("#dashboardPage #weeklyPanel")).toHaveCount(0);await expect(page.locator("#dashboardPage #careerProgress")).toHaveCount(0);await page.locator('[data-page="settings"]').click();await expect(page.locator("#weeklyPanel")).toBeVisible();await page.locator('[data-page="subjects"]').click();await expect(page.locator("#careerProgress")).toBeVisible();
});

test("@desktop panel semanal separa temporizador, detectado y total",async({page})=>{
  await ready(page);await page.evaluate(async()=>{const stamp=new Date().toISOString();await LBT_DB.put("studySessions",{id:"finished-test",subjectId:"fisica1",unitId:"demo",mode:"countdown",plannedMinutes:25,breakMinutes:5,startedAt:stamp,pausedAt:null,pausedMilliseconds:0,finishedAt:stamp,elapsedMilliseconds:600000,status:"finished",updatedAt:stamp,deletedAt:null});await LBT_UTILS.saveDetectedStudy(300000,{subjectId:"fisica1",unitId:"demo"});await LBT_UTILS.renderWeekly()});
  await expect(page.locator("#weeklyPanel")).toContainText("Temporizador");await expect(page.locator("#weeklyPanel")).toContainText("10 min");await expect(page.locator("#weeklyPanel")).toContainText("Estudio detectado");await expect(page.locator("#weeklyPanel")).toContainText("5 min");await expect(page.locator("#weeklyPanel")).toContainText("Tiempo total");await expect(page.locator("#weeklyPanel")).toContainText("15 min");
});

test("@desktop detector no cuenta dashboard, background y coordina pestañas",async({page,context})=>{
  await ready(page);await page.evaluate(()=>LBT_UTILS.noteStudyInteraction());expect((await page.evaluate(()=>LBT_DB.getAll("activityLog"))).filter(item=>item.type==="passive-study-session")).toHaveLength(0);
  await page.locator('[data-open="fisica1"]').first().click();await page.evaluate(()=>{Object.defineProperty(document,"hidden",{configurable:true,value:true});document.dispatchEvent(new Event("visibilitychange"));LBT_UTILS.noteStudyInteraction()});expect((await page.evaluate(()=>LBT_DB.getAll("activityLog"))).filter(item=>item.type==="passive-study-session")).toHaveLength(0);
  const second=await context.newPage();await openPhysics(second);await page.evaluate(()=>Object.defineProperty(document,"hidden",{configurable:true,value:false}));await page.evaluate(()=>LBT_UTILS.noteStudyInteraction());await second.evaluate(()=>LBT_UTILS.noteStudyInteraction());await expect.poll(()=>page.evaluate(async()=>{const state=await navigator.locks.query();return state.held.filter(lock=>lock.name==="lbt-passive-study").length})).toBe(1);await page.evaluate(()=>LBT_UTILS.stopDetectedStudy());await second.evaluate(()=>LBT_UTILS.stopDetectedStudy());
});

test("@mobile Inicio apila fechas y checklist",async({page})=>{
  await ready(page);await expect(page.locator(".home-secondary")).toHaveCSS("grid-template-columns",/^[^ ]+$/);await expect(page.locator(".important-dates-card")).toBeVisible();await expect(page.locator(".checklist-card")).toBeVisible();
});
