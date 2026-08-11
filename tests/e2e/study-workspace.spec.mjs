import {test,expect} from "@playwright/test";

const ready=async page=>{await page.goto("/");await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");await page.locator('[data-open="fisica1"]').first().click();await expect(page.locator("#studyPage")).toBeVisible()};

async function uploadHtml(page,title="Mi tabla"){
  await page.locator("#uploadHtmlBtn").click();
  await page.locator("#htmlFileInput").setInputFiles({name:"tabla.html",mimeType:"text/html",buffer:Buffer.from('<!doctype html><style>h1{color:rgb(255,0,0)}</style><h1 id="inicio">Resumen propio</h1><table><tr><td>Dato</td></tr></table><script>document.body.dataset.ready="yes"</script>')});
  await expect(page.locator("#htmlImportMessage")).toContainText("Vista previa");
  await page.locator("#htmlTitleInput").fill(title);
  await page.locator("#htmlImportSave").click();
  await expect(page.locator("#htmlImportModal")).toBeHidden();
  return (await page.evaluate(()=>LBT_DB.getAll("userMaterials"))).find(item=>item.type==="html"&&!item.deletedAt);
}

test("@desktop importa HTML real, recarga y lo abre aislado",async({page})=>{
  await ready(page);const stored=await uploadHtml(page);
  expect(stored).toMatchObject({type:"html",section:"summary",title:"Mi tabla",originalFilename:"tabla.html",subjectId:"fisica1"});
  await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");await page.locator('[data-open="fisica1"]').first().click();await page.locator("#splitViewBtn").click();const right=page.locator('.workspace-panel[data-side="right"]');await right.locator("select").selectOption(`material:${stored.id}`);const frame=right.locator("iframe");await expect(frame).toBeVisible();expect(await frame.getAttribute("sandbox")).toBe("allow-scripts allow-popups allow-popups-to-escape-sandbox");await expect(frame.contentFrame().locator("h1")).toHaveText("Resumen propio");
});

test("@desktop puede guardar cambios de un HTML sin volver a elegir archivo y eliminarlo",async({page})=>{
  await ready(page);const stored=await uploadHtml(page,"HTML a corregir");
  await page.locator("#splitViewBtn").click();const right=page.locator('.workspace-panel[data-side="right"]');await right.locator("select").selectOption(`material:${stored.id}`);
  await right.locator(`[data-material-edit="${stored.id}"]`).click();await page.locator("#htmlTitleInput").fill("HTML corregido");await page.locator("#htmlImportSave").click();await expect(page.locator("#htmlImportModal")).toBeHidden();
  const edited=await page.evaluate(id=>LBT_DB.get("userMaterials",id),stored.id);expect(edited.title).toBe("HTML corregido");expect(edited.textContent).toContain("Resumen propio");
  await right.locator("select").selectOption(`material:${stored.id}`);page.once("dialog",dialog=>dialog.accept());await right.locator(`[data-material-delete="${stored.id}"]`).click();await expect.poll(async()=>page.evaluate(id=>LBT_DB.get("userMaterials",id).then(item=>!!item?.deletedAt),stored.id)).toBe(true);await expect(right.locator("select")).not.toHaveValue(`material:${stored.id}`);
});

test("@desktop persiste división, tamaño y panel colapsado",async({page})=>{
  await ready(page);await page.locator("#splitViewBtn").click();const divider=page.locator(".workspace-divider");await expect(divider).toHaveAttribute("aria-orientation","vertical");const box=await divider.boundingBox();await page.mouse.move(box.x+3,box.y+20);await page.mouse.down();await page.mouse.move(box.x+100,box.y+20);await page.mouse.up();await divider.press("ArrowLeft");await page.locator('.workspace-panel[data-side="left"] [data-panel-action="collapse"]').click();const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("solved-study-workspace-v2:fisica1")));expect(saved).toMatchObject({mode:"split",collapsed:"left"});expect(saved.ratio).toBeGreaterThanOrEqual(10);expect(saved.ratio).toBeLessThanOrEqual(90);expect(saved).not.toHaveProperty("html");await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");await page.locator('[data-open="fisica1"]').first().click();await expect(page.locator('.workspace-panel[data-side="left"]')).toHaveClass(/is-collapsed/);
});

test("@desktop usa contenido real y conserva la división en lectura inmersiva",async({page})=>{
  await ready(page);await expect(page.locator("#studyUnit option")).toHaveText(["Resumen integral de Física I"]);await page.locator("#splitViewBtn").click();await expect(page.locator('.workspace-panel[data-side="left"] iframe')).toBeVisible();await page.locator('.workspace-panel[data-side="right"] select').selectOption("tab:formulas");await expect(page.locator('.workspace-panel[data-side="right"]')).toContainText("Fórmulas");await page.locator("#readingBtn").click();await expect(page.locator("html")).toHaveClass(/immersive-reading/);await expect(page.locator(".workspace-panel")).toHaveCount(2);await expect(page.locator("body")).not.toContainText("Texto de prueba de la herramienta");
});

test("@mobile acepta TXT y permite arrastrar la división vertical",async({page})=>{
  await ready(page);await page.locator("#uploadHtmlBtn").click();await page.locator("#htmlFileInput").setInputFiles({name:"notas.txt",mimeType:"text/plain",buffer:Buffer.from("hola")});await expect(page.locator("#materialTextInput")).toHaveValue("hola");await page.locator("#htmlImportCancel").click();await page.locator("#splitViewBtn").click();const divider=page.locator(".workspace-divider");await expect(divider).toHaveAttribute("aria-orientation","horizontal");const before=Number(await divider.getAttribute("aria-valuenow")),box=await divider.boundingBox();await divider.dispatchEvent("pointerdown",{pointerId:7,pointerType:"touch",clientX:box.x+box.width/2,clientY:box.y+box.height/2});await divider.dispatchEvent("pointermove",{pointerId:7,pointerType:"touch",clientX:box.x+box.width/2,clientY:box.y+100});await divider.dispatchEvent("pointerup",{pointerId:7,pointerType:"touch"});expect(Number(await divider.getAttribute("aria-valuenow"))).not.toBe(before);expect(await page.locator("#studyBody").evaluate(node=>getComputedStyle(node).gridTemplateColumns)).toBe("412px");
});
