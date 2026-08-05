import {test,expect} from "@playwright/test";
const openPhysics=async page=>{await page.goto("/");await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");await page.locator('[data-open="fisica1"]').first().click();await page.locator("#studyUnit").selectOption("resumen-integral")};

test("@desktop nota compacta, búsqueda, temporizador, lectura y fórmulas persisten",async({page})=>{
  await openPhysics(page);
  await page.locator("#newNoteBtn").click();await page.locator(".post-it textarea").fill("recordar mitocondria");await page.getByRole("button",{name:"Minimizar"}).click();
  await expect(page.locator(".note-book")).toHaveCount(1);await page.reload();await page.locator('[data-open="fisica1"]').first().click();await page.locator("#studyUnit").selectOption("resumen-integral");await expect(page.locator(".note-book")).toHaveCount(1);
  await page.locator("#globalSearch").fill("mitocondira");await expect(page.locator("#searchResults")).toContainText("Nota personal");await page.locator("#globalSearch").fill("");
  await page.locator("#timerBtn").click();await page.locator('#timerPanel [data-minutes="15"]').click();await expect.poll(()=>page.evaluate(()=>LBT_DB.getAll("studySessions").then(items=>items.some(item=>item.status==="running")))).toBe(true);
  await page.locator("#readingSettingsBtn").click();await page.locator('#readingPanel input[name="large"]').check();await expect(page.locator("html")).toHaveClass(/reading-large/);await page.reload();await page.locator('[data-open="fisica1"]').first().click();await expect(page.locator("html")).toHaveClass(/reading-large/);
  await page.getByRole("button",{name:"Fórmulas"}).click();await expect(page.getByText("Todavía no hay fórmulas publicadas para esta materia.")).toBeVisible();
});

test("@mobile repaso reproducible y colecciones quedan en IndexedDB",async({page})=>{
  await page.addInitScript(()=>{window.__appReadyEvents=0;window.addEventListener("lbt-app-ready",()=>window.__appReadyEvents++);document.addEventListener("DOMContentLoaded",()=>{window.__prematureReview=LBT_UTILS.reviewPool({count:4})},{once:true})});
  await page.goto("/");
  await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");
  const result=await page.evaluate(async()=>{const a=LBT_UTILS.reviewPool({count:4,seed:73}).map(item=>item.targetId),b=LBT_UTILS.reviewPool({count:4,seed:73}).map(item=>item.targetId);await LBT_UTILS.addBookmark(LBT_UTILS.contentItems("fisica1")[0]);return {a,b,premature:window.__prematureReview,readyEvents:window.__appReadyEvents,bookmarks:await LBT_DB.getAll("bookmarks"),collections:await LBT_DB.getAll("collections")}});
  expect(result.premature).toEqual([]);expect(result.readyEvents).toBe(1);
  expect(result.a).toEqual(result.b);expect(new Set(result.a).size).toBe(result.a.length);expect(result.bookmarks).toHaveLength(1);expect(result.collections.length).toBeGreaterThanOrEqual(5);
});
