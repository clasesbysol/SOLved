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

test("@desktop Favoritos filtra por materia, colección y tipo",async({page})=>{
  await ready(page);await page.evaluate(async()=>{const stamp=new Date().toISOString();for(const item of [{id:"fav-a",collectionId:"default-0",subjectId:"fisica1",unitId:"resumen-integral",contentType:"summary",targetId:"fisica1:resumen-integral:fisica-import",title:"Física favorita"},{id:"fav-b",collectionId:"default-1",subjectId:"estadistica",unitId:"legacy",contentType:"formula",targetId:"missing-formula",title:"Estadística parcial"}])await LBT_DB.put("bookmarks",{...item,createdAt:stamp,updatedAt:stamp,deletedAt:null})});await page.locator('[data-page="favorites"]').click();
  await expect(page.locator("#favoriteSubject")).toBeVisible();await expect(page.locator("#favoriteCollection option")).toContainText(["Todas las colecciones","Favoritos","Para el parcial","No entiendo","Memorizar","Preguntar en clase"]);await expect(page.locator("#favoriteCount")).toHaveText("2 elementos");
  await page.locator("#favoriteSubject").selectOption("fisica1");await expect(page.locator("#favoriteCount")).toHaveText("1 elemento");await expect(page.locator(".favorite-groups")).toContainText("Física favorita");await expect(page.locator(".favorite-groups")).not.toContainText("Estadística parcial");
  await page.locator("#favoriteSubject").selectOption("all");await page.locator("#favoriteCollection").selectOption("default-1");await expect(page.locator("#favoriteCount")).toHaveText("1 elemento");await expect(page.locator(".orphan-bookmarks")).toContainText("Estadística parcial");
});

test("@desktop Repaso distingue materia, unidad, favoritos y global",async({page})=>{
  await openPhysics(page);await page.locator('[data-page="review"]').click();await expect(page.locator("[data-review-scope]")).toHaveCount(4);await expect(page.locator("#reviewAdvanced")).toBeHidden();
  await page.locator('[data-review-scope="subject"]').click();await page.locator("#startReview").click();await expect(page.locator(".review-card").first()).toContainText("Física I");
  await page.locator('[data-review-scope="global"]').click();await page.locator("#reviewAdvancedToggle").click();await expect(page.locator("#reviewAdvanced")).toBeVisible();await page.locator("#reviewType").selectOption("summary");await page.locator("#startReview").click();await expect(page.locator(".review-card").first()).toBeVisible();await page.locator(".review-card [data-reveal]").first().click();await expect(page.locator(".review-answer").first()).toBeVisible();
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

test("@mobile temas, favoritos y repaso conservan jerarquía básica",async({page})=>{
  await ready(page);await page.locator("#themeBtn").click();await expect(page.locator("#appearancePanel")).toBeVisible();await page.locator("#appearanceClose").click();await page.locator('[data-page="favorites"]').click();await expect(page.locator(".favorite-filters")).toBeVisible();await page.locator('[data-page="review"]').click();await expect(page.locator(".review-scopes")).toBeVisible();expect(await page.locator(".review-scopes").evaluate(element=>getComputedStyle(element).display)).toBe("grid");
});
