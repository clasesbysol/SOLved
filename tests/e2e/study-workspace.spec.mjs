import {test,expect} from "@playwright/test";

const ready=async page=>{await page.goto("/");await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");await page.locator('[data-open="fisica1"]').first().click();await expect(page.locator("#studyPage")).toBeVisible()};

test("@desktop importa, previsualiza y abre HTML aislado",async({page})=>{
  await ready(page);await page.locator("#uploadHtmlBtn").click();
  await page.locator("#htmlFileInput").setInputFiles({name:"tabla.html",mimeType:"text/html",buffer:Buffer.from('<!doctype html><style>h1{color:rgb(255,0,0)}</style><h1 id="inicio">Resumen propio</h1><table><tr><td>Dato</td></tr></table><script>document.body.dataset.ready="yes"</script>')});
  await expect(page.locator("#htmlImportMessage")).toContainText("Vista previa");await page.locator("#htmlTitleInput").fill("Mi tabla");await page.locator("#htmlImportSave").click();await expect(page.locator("#htmlImportModal")).toBeHidden();
  const stored=await page.evaluate(()=>LBT_DB.getAll("importedHtml"));expect(stored).toHaveLength(1);expect(stored[0]).toMatchObject({title:"Mi tabla",originalFilename:"tabla.html",subjectId:"fisica1"});
  await page.locator("#splitViewBtn").click();const right=page.locator('.workspace-panel[data-side="right"]');await right.locator("select").selectOption(`html:${stored[0].id}`);const frame=right.locator("iframe");await expect(frame).toBeVisible();expect(await frame.getAttribute("sandbox")).toBe("allow-scripts allow-popups allow-popups-to-escape-sandbox");await expect(frame.contentFrame().locator("h1")).toHaveText("Resumen propio");
});

test("@desktop persiste división, tamaño y panel colapsado",async({page})=>{
  test.setTimeout(60_000);
  await ready(page);await page.locator("#splitViewBtn").click();await expect(page.locator(".workspace-panel")).toHaveCount(2);const divider=page.locator(".workspace-divider"),box=await divider.boundingBox();await page.mouse.move(box.x+3,box.y+20);await page.mouse.down();await page.mouse.move(box.x+100,box.y+20);await page.mouse.up();await page.locator('.workspace-panel[data-side="left"] [data-panel-action="collapse"]').click();await expect(page.locator('.workspace-panel[data-side="left"]')).toHaveClass(/is-collapsed/);const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("solved-study-workspace-v1")));expect(saved.mode).toBe("split");expect(saved.collapsed).toBe("left");expect(saved.ratio).not.toBe(50);await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");await page.locator('[data-open="fisica1"]').first().click();await expect(page.locator('.workspace-panel[data-side="left"]')).toHaveClass(/is-collapsed/);await page.locator('.workspace-panel[data-side="left"] [data-panel-action="collapse"]').click();await expect(page.locator('.workspace-panel[data-side="left"]')).not.toHaveClass(/is-collapsed/);
});

test("@mobile rechaza archivos no HTML y apila paneles",async({page})=>{
  await ready(page);await page.locator("#uploadHtmlBtn").click();await page.locator("#htmlFileInput").setInputFiles({name:"notas.txt",mimeType:"text/plain",buffer:Buffer.from("hola")});await expect(page.locator("#htmlImportMessage")).toContainText("extensión .html");await expect(page.locator("#htmlImportSave")).toBeDisabled();await page.locator("#htmlImportCancel").click();await page.locator("#splitViewBtn").click();await expect(page.locator(".workspace-panel")).toHaveCount(2);const columns=await page.locator("#studyBody").evaluate(node=>getComputedStyle(node).gridTemplateColumns);expect(columns.split(" ")).toHaveLength(1);
});
