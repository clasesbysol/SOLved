import {test,expect} from "@playwright/test";

const ready=async page=>{await page.goto("/");await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");await page.locator('[data-open="fisica1"]').first().click();await expect(page.locator("#studyPage")).toBeVisible()};

async function uploadHtml(page,title="Mi tabla"){
  await page.locator("#uploadHtmlBtn").click();
  await page.locator("#htmlFileInput").setInputFiles({name:"tabla.html",mimeType:"text/html",buffer:Buffer.from('<!doctype html><h1 id="inicio">Resumen propio</h1>')});
  await expect(page.locator("#htmlImportMessage")).toContainText("Vista previa");await page.locator("#htmlTitleInput").fill(title);await page.locator("#htmlImportSave").click();await expect(page.locator("#htmlImportModal")).toBeHidden();
  return (await page.evaluate(()=>LBT_DB.getAll("userMaterials"))).find(item=>item.type==="html"&&!item.deletedAt);
}

test("@desktop importa HTML real, recarga y lo abre aislado",async({page})=>{
  test.setTimeout(60000);
  await ready(page);await page.locator("#uploadHtmlBtn").click();
  await page.locator("#htmlFileInput").setInputFiles({name:"tabla.html",mimeType:"text/html",buffer:Buffer.from('<!doctype html><style>h1{color:rgb(255,0,0)}</style><h1 id="inicio">Resumen propio</h1><table><tr><td>Dato</td></tr></table><script>document.body.dataset.ready="yes"</script>')});
  await expect(page.locator("#htmlImportMessage")).toContainText("Vista previa");await page.locator("#htmlTitleInput").fill("Mi tabla");await page.locator("#htmlImportSave").click();await expect(page.locator("#htmlImportModal")).toBeHidden();
  const stored=await page.evaluate(()=>LBT_DB.getAll("userMaterials"));expect(stored).toHaveLength(1);expect(stored[0]).toMatchObject({type:"html",section:"summary",title:"Mi tabla",originalFilename:"tabla.html",subjectId:"fisica1"});
  await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");await page.locator('[data-open="fisica1"]').first().click();await page.locator("#splitViewBtn").click();const right=page.locator('.workspace-panel[data-side="right"]'),resource=await right.locator(`option[value$=":${stored[0].id}"]`).getAttribute("value");await right.locator("select").selectOption(resource);const frame=right.locator("iframe");await expect(frame).toBeVisible();expect(await frame.getAttribute("sandbox")).toBe("allow-scripts allow-popups allow-popups-to-escape-sandbox");await expect(frame.contentFrame().locator("h1")).toHaveText("Resumen propio");
});

test("@desktop guarda cambios del HTML sin reemplazar el archivo y permite eliminarlo",async({page})=>{
  test.setTimeout(60000);
  await ready(page);const stored=await uploadHtml(page,"HTML a corregir");
  await page.locator("#splitViewBtn").click();const right=page.locator('.workspace-panel[data-side="right"]'),resource=await right.locator(`option[value$=":${stored.id}"]`).getAttribute("value");await right.locator("select").selectOption(resource);
  await right.locator(`[data-material-edit="${stored.id}"]`).click();await page.locator("#htmlTitleInput").fill("HTML corregido");await page.locator("#htmlImportSave").click();await expect(page.locator("#htmlImportModal")).toBeHidden();
  const edited=await page.evaluate(id=>LBT_DB.get("userMaterials",id),stored.id);expect(edited.title).toBe("HTML corregido");expect(edited.textContent).toContain("Resumen propio");
  await right.locator("select").selectOption(resource);page.once("dialog",dialog=>dialog.accept());await right.locator(`[data-material-delete="${stored.id}"]`).click();await expect.poll(async()=>page.evaluate(id=>LBT_DB.get("userMaterials",id).then(item=>!!item?.deletedAt),stored.id)).toBe(true);await expect(right.locator("select")).not.toHaveValue(resource);
});

test("@desktop mantiene identidad A/B/C, previews independientes y lectura persistente",async({page})=>{
  await ready(page);
  const ids=await page.evaluate(async()=>{
    const stamp=new Date().toISOString(),rows=[...Array(3)].map((_,index)=>({id:`html-${index+1}`,userId:"guest",subjectId:"fisica1",section:"summary",type:"html",title:`Documento ${String.fromCharCode(65+index)}`,textContent:`<!doctype html><h1>Contenido ${String.fromCharCode(65+index)}</h1>`,mimeType:"text/html",order:index,createdAt:stamp,updatedAt:stamp,deletedAt:null}));
    for(const row of rows)await LBT_DB.put("userMaterials",row);return rows.map(row=>row.id);
  });
  await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");await page.locator('[data-open="fisica1"]').first().click();
  const previews=page.locator(".library-preview");await expect(previews).toHaveCount(3);
  for(let index=0;index<3;index++)await expect(previews.nth(index).locator("iframe").contentFrame().locator("h1")).toHaveText(`Contenido ${String.fromCharCode(65+index)}`);
  await page.locator("#globalSearch").fill("Documento B");await page.locator('#searchResults [data-result$=":html-2"]').click();await expect(page.locator('.workspace-panel[data-side="left"] iframe').contentFrame().locator("h1")).toHaveText("Contenido B");
  await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");await page.locator('[data-open="fisica1"]').first().click();await expect(page.locator('.workspace-panel[data-side="left"] iframe').contentFrame().locator("h1")).toHaveText("Contenido B");
  await page.locator("#splitViewBtn").click();const panels=page.locator(".workspace-panel"),left=panels.nth(0),right=panels.nth(1),optionA=await left.locator(`option[value$=":${ids[0]}"]`).getAttribute("value"),optionC=await right.locator(`option[value$=":${ids[2]}"]`).getAttribute("value");
  await left.locator("select").selectOption(optionA);await right.locator("select").selectOption(optionC);await expect(left.locator("iframe").contentFrame().locator("h1")).toHaveText("Contenido A");await expect(right.locator("iframe").contentFrame().locator("h1")).toHaveText("Contenido C");
  await right.locator('[data-panel-action="close"]').click();await expect(page.locator(".workspace-panel")).toHaveCount(1);await expect(page.locator(".workspace-panel iframe").contentFrame().locator("h1")).toHaveText("Contenido A");
});

test("@desktop persiste división, tamaño y panel colapsado",async({page})=>{
  await ready(page);await page.locator("#splitViewBtn").click();const divider=page.locator(".workspace-divider");await expect(divider).toHaveAttribute("aria-orientation","vertical");const box=await divider.boundingBox();await page.mouse.move(box.x+3,box.y+20);await page.mouse.down();await page.mouse.move(box.x+100,box.y+20);await page.mouse.up();await divider.press("ArrowLeft");await page.locator('.workspace-panel[data-side="left"] [data-panel-action="collapse"]').click();const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("solved-study-workspace-v3:fisica1")));expect(saved).toMatchObject({mode:"split",collapsed:"left"});expect(saved.ratio).toBeGreaterThanOrEqual(10);expect(saved.ratio).toBeLessThanOrEqual(90);expect(saved).not.toHaveProperty("html");await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");await page.locator('[data-open="fisica1"]').first().click();await expect(page.locator('.workspace-panel[data-side="left"]')).toHaveClass(/is-collapsed/);
});

test("@desktop resuelve HTML por materia, sección e ID estable",async({page})=>{
  await ready(page);const subjects=[{id:"fisica1",unit:"resumen-integral",label:"Física"},{id:"estadistica",unit:"probabilidad-practica-1",label:"Estadística"},{id:"quimica_organica",unit:"resumen-integral",label:"Orgánica"}];
  await page.evaluate(async subjects=>{const stamp=new Date().toISOString();for(const [index,subject] of subjects.entries())await LBT_DB.put("userMaterials",{id:`shared-name-${index}`,userId:"guest",subjectId:subject.id,section:"summary",type:"html",title:"Resumen similar",textContent:`<!doctype html><h1>${subject.label}</h1>`,mimeType:"text/html",order:0,createdAt:stamp,updatedAt:stamp,deletedAt:null})},subjects);
  for(const subject of subjects){await page.evaluate(subject=>window.dispatchEvent(new CustomEvent("lbt-open-content",{detail:{subjectId:subject.id,unitId:subject.unit,targetId:"missing"}})),subject);await expect(page.locator("#studyTitle")).toContainText(subject.label);const preview=page.locator(".library-preview").last();await expect(preview.locator("iframe").contentFrame().locator("h1")).toHaveText(subject.label)}
});

test("@desktop usa contenido real y conserva la división en lectura inmersiva",async({page})=>{
  await ready(page);await expect(page.locator("#studyUnit option")).toHaveText(["Resumen integral de Física I"]);await page.locator("#splitViewBtn").click();await expect(page.locator('.workspace-panel[data-side="left"] iframe')).toBeVisible();await page.locator('.workspace-panel[data-side="right"] select').selectOption("tab:formulas");await expect(page.locator('.workspace-panel[data-side="right"]')).toContainText("Fórmulas");await page.locator("#readingBtn").click();await expect(page.locator("html")).toHaveClass(/immersive-reading/);await expect(page.locator(".workspace-panel")).toHaveCount(2);await expect(page.locator("body")).not.toContainText("Texto de prueba de la herramienta");
});

test("@mobile acepta TXT y permite arrastrar la división vertical",async({page})=>{
  await ready(page);await page.locator("#uploadHtmlBtn").click();await page.locator("#htmlFileInput").setInputFiles({name:"notas.txt",mimeType:"text/plain",buffer:Buffer.from("hola")});await expect(page.locator("#materialTextInput")).toHaveValue("hola");await page.locator("#htmlImportCancel").click();await page.locator("#splitViewBtn").click();const divider=page.locator(".workspace-divider");await expect(divider).toHaveAttribute("aria-orientation","horizontal");const before=Number(await divider.getAttribute("aria-valuenow")),box=await divider.boundingBox();await divider.dispatchEvent("pointerdown",{pointerId:7,pointerType:"touch",clientX:box.x+box.width/2,clientY:box.y+box.height/2});await divider.dispatchEvent("pointermove",{pointerId:7,pointerType:"touch",clientX:box.x+box.width/2,clientY:box.y+100});await divider.dispatchEvent("pointerup",{pointerId:7,pointerType:"touch"});expect(Number(await divider.getAttribute("aria-valuenow"))).not.toBe(before);expect(await page.locator("#studyBody").evaluate(node=>getComputedStyle(node).gridTemplateColumns)).toBe("412px");
});
