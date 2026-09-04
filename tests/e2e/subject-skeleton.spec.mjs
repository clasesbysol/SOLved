import {test,expect} from "@playwright/test";

async function openSubject(page,id){
  await page.goto("/");
  await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");
  await page.waitForFunction(()=>!!window.SOLVED_SUBJECT_SKELETON);
  await page.locator('[data-page="subjects"]').click();
  await page.locator(`.plan-course-main[data-open="${id}"]`).click();
  await expect(page.locator("#studyPage")).toBeVisible();
}

test("@desktop las materias vacías usan el documento integral y estructuras base",async({page})=>{
  await openSubject(page,"biologia1");
  await expect(page.locator("#studyPage")).toHaveAttribute("data-skeleton","true");
  await expect(page.locator(".subject-skeleton.qb-summary")).toHaveCount(1);
  await expect(page.locator(".subject-skeleton-hero h1")).toHaveText("Biología I");
  await expect(page.locator(".subject-skeleton-section")).toHaveCount(4);
  await expect(page.locator(".subject-skeleton-index nav")).toContainText("Resumen");
  await expect(page.locator(".subject-skeleton-index nav")).toContainText("Mapa mental");
  await expect(page.locator(".subject-skeleton-index nav")).toContainText("Ejercicios");
  await expect(page.locator(".subject-skeleton-index nav")).toContainText("Parciales");
  await expect(page.locator("#studyTabs")).toBeHidden();
  await expect(page.locator("#studyToolbar")).toBeHidden();
  await expect(page.locator(".study-head")).toBeHidden();
  await expect(page.locator("[data-skeleton-slot]")).toHaveCount(4);
  await expect(page.locator('[data-skeleton-slot="resumen"]')).toContainText("Texto temporal para probar la lectura");
  await expect(page.locator('[data-skeleton-slot="mapa-mental"] details')).toHaveCount(2);
  await expect(page.locator('[data-skeleton-slot="ejercicios"] details')).toHaveCount(2);
  await expect(page.locator('[data-skeleton-slot="parciales"] details')).toHaveCount(2);
});

test("@desktop notas y resaltado quedan anclados como en Química Biológica",async({page})=>{
  await openSubject(page,"biologia1");
  const paragraph=page.locator('[data-block-id="skeleton:biologia1:resumen:intro-1"]');
  await expect(paragraph).toBeVisible();

  await paragraph.evaluate(node=>{
    const selection=getSelection(),range=document.createRange();
    range.selectNodeContents(node);selection.removeAllRanges();selection.addRange(range);
  });
  await page.locator("[data-highlight]").dispatchEvent("mousedown");
  await expect(page.locator("mark.study-highlight")).toContainText("Texto temporal");

  await page.locator("[data-add-note]").click();
  await expect(page.locator(".subject-skeleton")).toHaveClass(/note-placement/);
  const box=await paragraph.boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.click(box.x+Math.min(120,box.width/2),box.y+Math.min(18,box.height/2));
  await expect(page.locator(".skeleton-note-editor")).toBeVisible();
  await page.locator(".skeleton-note-editor textarea").fill("Nota persistente de prueba");
  await page.waitForTimeout(250);
  await expect(page.locator(".skeleton-note-marker")).toHaveCount(1);

  await page.reload();
  await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");
  await page.waitForFunction(()=>!!window.SOLVED_SUBJECT_SKELETON);
  await page.locator('[data-page="subjects"]').click();
  await page.locator('.plan-course-main[data-open="biologia1"]').click();
  await expect(page.locator(".skeleton-note-marker")).toHaveCount(1);
  await expect(page.locator("mark.study-highlight")).toHaveCount(1);
});

test("@desktop búsqueda y color siguen integrados",async({page})=>{
  await openSubject(page,"biologia1");
  await page.locator("[data-skeleton-search]").fill("conexiones y cierre");
  await expect(page.locator("[data-skeleton-results]")).toContainText("Conexiones y cierre");
  const colors=await page.locator(".subject-skeleton").evaluate(node=>({ink:getComputedStyle(node).getPropertyValue("--qb-ink").trim(),bg:getComputedStyle(node).getPropertyValue("--qb-bg").trim(),accent:getComputedStyle(node).getPropertyValue("--qb-accent-strong").trim()}));
  expect(colors.ink).toBe("#202a38");
  expect(colors.bg).toBe("#f8fafc");
  expect(colors.accent).toContain("hsl");
});

test("@desktop las materias especiales quedan fuera del esqueleto vacío",async({page})=>{
  await page.goto("/");
  await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");
  await page.waitForFunction(()=>!!window.SOLVED_SUBJECT_SKELETON);
  const result=await page.evaluate(()=>({
    fisica:window.SOLVED_SUBJECT_SKELETON.isSkeleton("fisica1"),
    estadistica:window.SOLVED_SUBJECT_SKELETON.isSkeleton("estadistica"),
    qbi:window.SOLVED_SUBJECT_SKELETON.isSkeleton("quimica_biologica1"),
    organica:window.SOLVED_SUBJECT_SKELETON.isSkeleton("quimica_organica"),
    analisis2:window.SOLVED_SUBJECT_SKELETON.isSkeleton("analisis2"),
    fisica2:window.SOLVED_SUBJECT_SKELETON.isSkeleton("fisica2")
  }));
  expect(result).toEqual({fisica:false,estadistica:false,qbi:false,organica:false,analisis2:false,fisica2:true});
});