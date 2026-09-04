import {test,expect} from "@playwright/test";

async function openSubject(page,id){
  await page.goto("/");
  await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");
  await page.waitForFunction(()=>!!window.SOLVED_SUBJECT_SKELETON);
  await page.locator('[data-page="subjects"]').click();
  await page.locator(`.plan-course-main[data-open="${id}"]`).click();
  await expect(page.locator("#studyPage")).toBeVisible();
}

test("@desktop las materias vacías abren directamente con la interfaz integral de Estadística",async({page})=>{
  await openSubject(page,"biologia1");
  await expect(page.locator("#studyPage")).toHaveAttribute("data-skeleton","true");
  await expect(page.locator("#studyPage")).toHaveAttribute("data-unit-id","skeleton");
  await expect(page.locator(".subject-skeleton.qb-summary")).toHaveCount(1);
  await expect(page.locator(".subject-skeleton .qb-doc-shell")).toHaveCount(1);
  await expect(page.locator(".subject-skeleton #summaryIndex.qb-sidebar")).toHaveCount(1);
  await expect(page.locator(".subject-skeleton-hero h1")).toHaveText("Biología I");
  await expect(page.locator(".subject-skeleton-section.qb-chapter")).toHaveCount(4);
  await expect(page.locator(".subject-skeleton-index nav")).toContainText("Resumen");
  await expect(page.locator(".subject-skeleton-index nav")).toContainText("Mapa mental");
  await expect(page.locator(".subject-skeleton-index nav")).toContainText("Ejercicios");
  await expect(page.locator(".subject-skeleton-index nav")).toContainText("Parciales");
  await expect(page.locator(".study-head")).toBeHidden();
  await expect(page.locator("#studyTabs")).toBeHidden();
  await expect(page.locator("#studyToolbar")).toBeHidden();
  await expect(page.locator("#previewWarning")).toBeHidden();
  await expect(page.locator("#studyUnit")).toBeHidden();
  await expect(page.locator("[data-skeleton-slot]")).toHaveCount(4);
  await expect(page.locator("[data-skeleton-slot]").first()).toBeEmpty();
});

test("@desktop el esqueleto prepara búsqueda, resaltado y notas para contenido futuro",async({page})=>{
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

test("@desktop todos los colores definidos mantienen contraste legible",async({page})=>{
  await openSubject(page,"biologia1");
  const result=await page.evaluate(()=>{
    const parse=value=>{const m=value.match(/[\d.]+/g);return m?m.slice(0,3).map(Number):[0,0,0]};
    const linear=value=>{value/=255;return value<=.04045?value/12.92:Math.pow((value+.055)/1.055,2.4)};
    const luminance=rgb=>.2126*linear(rgb[0])+.7152*linear(rgb[1])+.0722*linear(rgb[2]);
    const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
    const study=document.querySelector("#studyPage"),root=document.querySelector(".subject-skeleton"),kicker=document.querySelector(".qb-kicker"),heading=document.querySelector(".qb-hero h1");
    const hues=window.LBT_DATA.SUBJECTS.filter(s=>window.SOLVED_SUBJECT_SKELETON.isSkeleton(s.id)).map(s=>({id:s.id,hue:s.hue}));
    return hues.map(item=>{
      study.style.setProperty("--hue",item.hue);
      const rootStyle=getComputedStyle(root),kickerStyle=getComputedStyle(kicker),headingStyle=getComputedStyle(heading),bg=parse(rootStyle.backgroundColor);
      return {id:item.id,kicker:contrast(parse(kickerStyle.color),bg),heading:contrast(parse(headingStyle.color),bg)};
    });
  });
  for(const item of result){expect(item.heading,`${item.id}: contraste del título`).toBeGreaterThanOrEqual(4.5);expect(item.kicker,`${item.id}: contraste del acento`).toBeGreaterThanOrEqual(4.5)}
});

test("@desktop las materias ya trabajadas y Química Orgánica quedan fuera del esqueleto vacío",async({page})=>{
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