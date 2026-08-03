import {test,expect} from "@playwright/test";

const openSubject=async(page,id)=>{await page.goto("/");await expect.poll(()=>page.evaluate(()=>typeof document.querySelector('[data-page="subjects"]')?.onclick==="function")).toBe(true);await page.locator('[data-page="subjects"]').click();await page.locator(`.plan-course-main[data-open="${id}"]`).click()};

test("@desktop Física I abre el HTML integral y ofrece tarjetas",async({page})=>{
 await openSubject(page,"fisica1");await page.locator("#studyUnit").selectOption("resumen-integral");await expect(page.locator("#studyUnit")).toHaveValue("resumen-integral");await expect(page.locator(".rich-document")).toBeVisible();const frame=page.frameLocator(".rich-document");await expect(frame.getByRole("heading",{name:/FORMULARIO DE FÍSICA/i})).toBeVisible();await expect(frame.getByText("PARTE A — PRIMER PARCIAL")).toBeVisible();await page.getByRole("button",{name:"Tarjetas"}).click();await expect(page.locator(".content-item")).toHaveCount(102);
});

test("@desktop Orgánica publica tarjetas basadas en el resumen",async({page})=>{
 await openSubject(page,"quimica_organica");await page.getByRole("button",{name:"Tarjetas"}).click();await expect(page.locator(".content-item")).toHaveCount(100);await expect(page.locator(".content-item").first()).not.toBeEmpty();
});

test("@mobile Física I conserva el resumen utilizable",async({page})=>{
 await openSubject(page,"fisica1");await page.locator("#studyUnit").selectOption("resumen-integral");await expect(page.locator(".rich-document")).toBeVisible();await expect(page.frameLocator(".rich-document").getByRole("heading",{name:/FORMULARIO DE FÍSICA/i})).toBeVisible();
});
