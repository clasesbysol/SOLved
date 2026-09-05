import {test,expect} from "@playwright/test";

async function openAnalysis2(page){
  await page.goto("/");
  await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");
  await page.locator('[data-page="subjects"]').click();
  await page.locator('.plan-course-main[data-open="analisis2"]').click();
  await expect(page.locator("#studyPage")).toBeVisible();
  await expect(page.locator(".analysis2-unified-shell")).toBeVisible({timeout:20000});
}

test("@desktop Análisis II abre un único resumen integral amarillo",async({page})=>{
  test.setTimeout(60000);
  await openAnalysis2(page);
  await expect(page.locator("html")).toHaveClass(/analysis2-integrated-mode/);
  await expect(page.locator(".analysis2-unified-side")).toContainText("Análisis II");
  await expect(page.locator('[data-a2-target="theory:teoremasprofundos"]')).toContainText("Teoremas uno por uno");
  await expect(page.locator('[data-a2-target="map:route-map"]')).toContainText("Mapa general de decisiones");
  await expect(page.locator('[data-a2-target="parciales"]')).toContainText("Parciales");
  await expect(page.locator('[data-a2-target="finales"]')).toContainText("5 finales");
  const hue=await page.evaluate(()=>window.LBT_DATA.SUBJECTS.find(x=>x.id==="analisis2")?.hue);
  expect(hue).toBe(46);

  const master=page.frameLocator("[data-analysis2-frame]");
  await expect(master.locator("h1")).toHaveText("Análisis II",{timeout:20000});
  await expect(master.locator("#teoria")).toContainText("Teoría por tema y teoremas uno por uno");
  await expect(master.locator("#mapas")).toContainText("Tres formas de ordenar la materia");
  await expect(master.locator("#parciales")).toContainText("Banco por familias");
  await expect(master.locator("#finales")).toContainText("Cinco finales resueltos completos");
});

test("@desktop índice y machete comparten el lateral de Análisis II",async({page})=>{
  test.setTimeout(60000);
  await openAnalysis2(page);
  await page.locator('[data-a2-mode="formulas"]').click();
  await expect(page.locator(".analysis2-unified-side")).toHaveAttribute("data-mode","formulas");
  await expect(page.locator("[data-a2-formulas]")).toContainText("Machete acumulativo");
  await page.evaluate(()=>window.postMessage({type:"solved-formula-batch",subjectId:"analisis2",formulas:["∇f=(fₓ,fᵧ)","∬D 1 dA"]},"*"));
  await expect(page.locator("[data-a2-formulas]")).toContainText("∇f=(fₓ,fᵧ)");
  await page.locator("[data-a2-close]").click();
  await expect(page.locator("[data-a2-reopen]")).toBeVisible();
  await page.locator("[data-a2-reopen]").click();
  await expect(page.locator(".analysis2-unified-side")).toBeVisible();
});