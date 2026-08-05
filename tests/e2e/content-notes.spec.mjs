import {test,expect} from "@playwright/test";
const ready=async page=>{await page.goto("/");await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true")};
const openPhysics=async page=>{await ready(page);await page.locator('[data-open="fisica1"]').first().click();await expect(page.locator("#studyUnit option")).toHaveText(["Resumen integral de Física I"])};

test("@desktop publica sólo el contenido real de Física I y lo persiste",async({page})=>{
  await openPhysics(page);await expect(page.locator("#studyUnit")).toHaveValue("resumen-integral");await expect(page.locator(".rich-document")).toBeVisible();await page.reload();await page.locator('[data-open="fisica1"]').first().click();await expect(page.locator("#studyUnit")).toHaveValue("resumen-integral");await expect(page.locator("body")).not.toContainText("Texto de prueba de la herramienta");
});

test("@desktop la migración elimina oficiales retirados y conserva personales",async({page})=>{
  await ready(page);await page.evaluate(async()=>{await LBT_DB.del("meta","remove-fisica-demo-packages-v091");const real=await LBT_DB.get("contentPackages","fisica1/resumen-integral");await LBT_DB.put("contentPackages",{...real,id:"fisica1/demo",unitId:"demo",origin:"official"});await LBT_DB.put("contentPackages",{...real,id:"fisica1/formula-map",unitId:"formula-map",origin:"official"});await LBT_DB.put("contentPackages",{...real,id:"personal/resumen-integral",subjectId:"personal",origin:"personal"})});await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");const records=await page.evaluate(async()=>({officialDemo:await LBT_DB.get("contentPackages","fisica1/demo"),officialMap:await LBT_DB.get("contentPackages","fisica1/formula-map"),personal:await LBT_DB.get("contentPackages","personal/resumen-integral")}));expect(records.officialDemo).toBeNull();expect(records.officialMap).toBeNull();expect(records.personal.origin).toBe("personal");
});

test("@mobile mueve una nota y conserva su posición documental",async({page})=>{
  await openPhysics(page);await page.evaluate(()=>document.querySelector("#newNoteBtn").click());const header=page.locator(".note-grip"),box=await header.boundingBox();await page.mouse.move(box.x+10,box.y+10);await page.mouse.down();await page.mouse.move(box.x+60,box.y+80);await page.mouse.up();const record=await page.evaluate(()=>LBT_DB.getAll("notes").then(items=>items[0]));expect(record.position.xRatio).toBeGreaterThanOrEqual(0);expect(record.position.xRatio).toBeLessThanOrEqual(1);expect(record.position.documentY).toBeGreaterThanOrEqual(0);
});
