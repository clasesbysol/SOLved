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

test("@mobile checklist persiste entre sesiones",async({page})=>{
  await page.goto("/");await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");
  await page.locator("#checklistInput").fill("Repasar cinemática");await page.locator("#checklistForm").getByRole("button").click();
  await expect(page.locator("#checklistList")).toContainText("Repasar cinemática");await page.locator("#checklistList input").check();await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");
  await expect(page.locator("#checklistList input")).toBeChecked();await page.locator("#checklistList button").click();await expect(page.locator("#checklistList")).not.toContainText("Repasar cinemática");
});
