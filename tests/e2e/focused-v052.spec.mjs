import {test,expect} from "@playwright/test";
const ready=async page=>{await page.goto("/");await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true")};
const openPhysics=async page=>{await ready(page);await page.locator('[data-open="fisica1"]').first().click();await expect(page.locator("#studyUnit")).toHaveValue("resumen-integral")};

test("@desktop personaliza, persiste y restaura el color de una materia",async({page})=>{
  await openPhysics(page);await page.locator("#themeBtn").click();await page.locator("#appearanceSubject").selectOption("fisica1");await page.locator('[data-subject-hue="132"]').click();await expect(page.locator("html")).toHaveCSS("--subject-hue","132");await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");await page.locator('[data-open="fisica1"]').first().click();await expect(page.locator("html")).toHaveCSS("--subject-hue","132");await page.locator("#themeBtn").click();await page.locator("#resetSubjectColor").click();await expect(page.locator("html")).toHaveCSS("--subject-hue","214");
});

test("@desktop detalle semanal agrupa estudio real por pestaña",async({page})=>{
  await ready(page);await page.evaluate(async()=>{await LBT_UTILS.saveDetectedStudy(2_700_000,{subjectId:"fisica1",unitId:"resumen-integral",tab:"summary"});await LBT_UTILS.saveDetectedStudy(1_500_000,{subjectId:"fisica1",unitId:"resumen-integral",tab:"exercises"});await LBT_UTILS.renderWeekly()});await page.getByText("Detalle del estudio detectado").click();const detail=page.locator(".detected-study-detail");await expect(detail).toContainText("Física I");await expect(detail).toContainText("Resumen · resumen-integral");await expect(detail).toContainText("Ejercicios · resumen-integral");
});
