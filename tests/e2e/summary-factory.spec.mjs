import {test,expect} from "@playwright/test";

const ready=async page=>{await page.goto("/");await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true")};

test("@desktop abre desde menú y dashboard y genera el prompt completo",async({page})=>{
  const aiRequests=[];page.on("request",request=>{if(/openai|anthropic|gemini|generativelanguage/i.test(request.url()))aiRequests.push(request.url())});await ready(page);
  await page.locator('[data-page="factory"]').click();await expect(page.locator("#factoryPage")).toBeVisible();await expect(page.getByRole("heading",{name:"Fabricar resumen",level:1})).toBeVisible();await expect(page.locator('[name="materials"]')).toHaveCount(12);await expect(page.locator(".quality-list input")).toHaveCount(14);
  await page.locator('[data-page="dashboard"]').click();await page.locator("[data-open-factory]").click();await expect(page.locator("#factoryPage")).toBeVisible();
  await page.locator('[name="subjectId"]').selectOption("estadistica");await page.locator('[name="unit"]').fill("Inferencia");await page.locator('[name="objective"]').fill("Preparar el parcial");await page.locator('[name="availableTime"]').fill("dos semanas");await page.locator('[name="profile"]').selectOption("statistics");await page.locator('[name="materials"][value="Programa"]').check();
  const prompt=page.locator("#factoryPrompt");await expect(prompt).toContainText("Estadística Aplicada");await expect(prompt).toContainText("Inferencia");await expect(prompt).toContainText("Preparar el parcial");await expect(prompt).toContainText("dos semanas");await expect(prompt).toContainText("Perfil específico — Estadística");await expect(prompt).toContainText("Programa");await expect(prompt).toContainText("único primer mensaje");expect(aiRequests).toHaveLength(0);
});

test("@desktop preselecciona materia, unidad y perfil y persiste o restaura",async({page})=>{
  await ready(page);await page.locator('[data-open="fisica1"]').first().click();await page.locator("#studyUnit").selectOption("demo");await page.locator("#factoryFromStudy").click();await expect(page.locator('[name="subjectId"]')).toHaveValue("fisica1");await expect(page.locator('[name="unit"]')).toHaveValue("demo");await expect(page.locator('[name="profile"]')).toHaveValue("physics");
  await page.locator('[name="notes"]').fill("Priorizar problemas de dinámica");await page.locator('[name="examDate"]').fill("2026-09-10");await expect.poll(()=>page.evaluate(()=>LBT_DB.get("kv","settings").then(row=>row.value.summaryFactoryDraft?.notes))).toBe("Priorizar problemas de dinámica");
  await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");await expect(page.locator("#factoryPage")).toBeVisible();await expect(page.locator('[name="notes"]')).toHaveValue("Priorizar problemas de dinámica");await expect(page.locator('[name="examDate"]')).toHaveValue("2026-09-10");await page.locator("[data-reset]").click();await expect(page.locator('[name="notes"]')).toHaveValue("");await expect(page.locator('[name="subjectId"]')).toHaveValue("");await expect.poll(()=>page.evaluate(()=>LBT_DB.get("kv","settings").then(row=>row.value.summaryFactoryDraft?.subjectId))).toBe("");
});

test("@desktop copia mensaje, instrucción y prompt con confirmación accesible",async({page})=>{
  await ready(page);await page.locator('[data-page="factory"]').click();await page.evaluate(()=>{window.__copied=[];Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async text=>window.__copied.push(text)}})});for(const action of ["initial","instruction","all"]){await page.locator(`[data-copy="${action}"]`).click();await expect(page.locator("#factoryCopyStatus")).toHaveText("Copiado al portapapeles")}const copied=await page.evaluate(()=>window.__copied);expect(copied).toHaveLength(3);expect(copied[0]).toContain("único primer mensaje");expect(copied[1]).toContain("INSTRUCCIÓN MAESTRA");expect(copied[2]).toContain("FICHA DE CONFIGURACIÓN");
});

test("@mobile es responsive y conserva temas claro y oscuro",async({page})=>{
  await ready(page);await page.locator('[data-page="factory"]').click();await expect(page.locator("#factoryPage")).toBeVisible();await expect(page.locator(".factory-layout")).toHaveCSS("grid-template-columns",/^[^ ]+$/);const box=await page.locator(".factory-page").boundingBox();expect(box.width).toBeLessThanOrEqual(page.viewportSize().width);await page.locator("#themeBtn").click();await page.locator('[data-color-mode="dark"]').click();await expect(page.locator("html")).toHaveAttribute("data-theme","dark");await page.locator('[data-color-mode="light"]').click();await expect(page.locator("html")).toHaveAttribute("data-theme","light");
});
