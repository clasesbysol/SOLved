import {test,expect} from "@playwright/test";

const openSubject=async(page,id)=>{await page.goto("/");await expect.poll(()=>page.evaluate(()=>typeof document.querySelector('[data-page="subjects"]')?.onclick==="function")).toBe(true);await page.locator('[data-page="subjects"]').click();await page.locator(`.plan-course-main[data-open="${id}"]`).click()};

test("@desktop Física I migra automáticamente al HTML integral y ofrece tarjetas",async({page})=>{
 await page.addInitScript(()=>localStorage.setItem("solved-fisica-integral-v1:biblioteca-lbt-guest","1"));await openSubject(page,"fisica1");await expect(page.locator("#studyUnit")).toHaveValue("resumen-integral");await expect(page.locator(".rich-document")).toBeVisible();const frame=page.frameLocator(".rich-document");await expect(frame.getByRole("heading",{name:/FORMULARIO DE FÍSICA/i})).toBeVisible();await expect(frame.getByText("PARTE A — PRIMER PARCIAL")).toBeVisible();await page.getByRole("button",{name:"Tarjetas"}).click();await expect(page.locator(".content-item")).toHaveCount(102);
});

test("@desktop Orgánica publica tarjetas basadas en el resumen",async({page})=>{
 await openSubject(page,"quimica_organica");await page.getByRole("button",{name:"Tarjetas"}).click();await expect(page.getByRole("heading",{name:"Tarjetas de estudio"})).toBeVisible();await expect(page.getByRole("button",{name:/Memorizar reacciones y teoría/})).toBeVisible();
});

test("@mobile Física I conserva el resumen integral utilizable por defecto",async({page})=>{
 await openSubject(page,"fisica1");await expect(page.locator("#studyUnit")).toHaveValue("resumen-integral");await expect(page.locator(".rich-document")).toBeVisible();await expect(page.frameLocator(".rich-document").getByRole("heading",{name:/FORMULARIO DE FÍSICA/i})).toBeVisible();
});
