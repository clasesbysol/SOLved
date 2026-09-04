import {test,expect} from "@playwright/test";

async function openSubject(page,id){
  await page.goto("/");
  await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");
  await page.waitForFunction(()=>!!window.SOLVED_SUBJECT_SKELETON);
  await page.locator('[data-page="subjects"]').click();
  await page.locator(`.plan-course-main[data-open="${id}"]`).click();
  await expect(page.locator("#studyPage")).toBeVisible();
}

test("las materias vacías usan el esqueleto SOLved común",async({page})=>{
  await openSubject(page,"biologia1");
  await expect(page.locator("#studyPage")).toHaveAttribute("data-skeleton","true");
  await expect(page.locator(".subject-skeleton")).toHaveCount(1);
  await expect(page.locator(".subject-skeleton-hero h1")).toHaveText("Biología I");
  await expect(page.locator(".subject-skeleton-section")).toHaveCount(4);
  await expect(page.locator(".subject-skeleton-index nav")).toContainText("Resumen");
  await expect(page.locator(".subject-skeleton-index nav")).toContainText("Mapa mental");
  await expect(page.locator(".subject-skeleton-index nav")).toContainText("Ejercicios");
  await expect(page.locator(".subject-skeleton-index nav")).toContainText("Parciales");
  await expect(page.locator("#studyTabs")).toBeHidden();
  await expect(page.locator("#studyUnit")).toBeHidden();
  await expect(page.locator("[data-skeleton-slot]")).toHaveCount(4);
  await expect(page.locator("[data-skeleton-slot]").first()).toBeEmpty();
});

test("el esqueleto prepara búsqueda, resaltado y notas para contenido futuro",async({page})=>{
  await openSubject(page,"biologia1");
  await page.evaluate(()=>{
    const p=document.createElement("p");
    p.textContent="Membrana plasmática y transporte selectivo de prueba";
    document.querySelector('[data-skeleton-slot="resumen"]').append(p);
  });
  const paragraph=page.locator('[data-skeleton-slot="resumen"] p');
  await expect(paragraph).toHaveClass(/highlightable/);
  await expect(paragraph).toHaveAttribute("data-block-id",/skeleton:biologia1:/);

  await page.locator("[data-skeleton-search]").fill("transporte selectivo");
  await expect(page.locator("[data-skeleton-results]")).toContainText("Membrana plasmática");

  await paragraph.evaluate(node=>{
    const selection=getSelection(),range=document.createRange();
    range.selectNodeContents(node);selection.removeAllRanges();selection.addRange(range);
  });
  await page.locator("[data-skeleton-highlight]").click();
  await expect(page.locator("mark.study-highlight")).toContainText("Membrana plasmática");

  await page.locator("[data-skeleton-note]").click();
  await expect(page.locator(".note-window")).toBeVisible();
});

test("las materias ya trabajadas y Química Orgánica quedan fuera del esqueleto vacío",async({page})=>{
  await page.goto("/");
  await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");
  await page.waitForFunction(()=>!!window.SOLVED_SUBJECT_SKELETON);
  const result=await page.evaluate(()=>({
    fisica:window.SOLVED_SUBJECT_SKELETON.isSkeleton("fisica1"),
    estadistica:window.SOLVED_SUBJECT_SKELETON.isSkeleton("estadistica"),
    qbi:window.SOLVED_SUBJECT_SKELETON.isSkeleton("quimica_biologica1"),
    organica:window.SOLVED_SUBJECT_SKELETON.isSkeleton("quimica_organica"),
    fisica2:window.SOLVED_SUBJECT_SKELETON.isSkeleton("fisica2")
  }));
  expect(result).toEqual({fisica:false,estadistica:false,qbi:false,organica:false,fisica2:true});
});
