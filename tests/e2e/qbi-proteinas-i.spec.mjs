import {test,expect} from "@playwright/test";

const openSubject=async(page,id="quimica_biologica1")=>{
  await page.goto("/");
  await expect.poll(()=>page.evaluate(()=>typeof document.querySelector('[data-page="subjects"]')?.onclick==="function"),{timeout:20000}).toBe(true);
  await page.locator('[data-page="subjects"]').click();
  await page.locator(`.plan-course-main[data-open="${id}"]`).click();
};

const openQbiExercises=async page=>{
  await openSubject(page);
  await expect(page.locator("#studyUnit")).toHaveValue("proteinas-i");
  await page.getByRole("button",{name:"Ejercicios"}).click();
  await expect(page.getByRole("heading",{name:/Guía 1 de Proteínas I/})).toBeVisible();
};

const startFullGuide=async page=>{
  await openQbiExercises(page);
  await page.getByRole("button",{name:"Seleccionar toda la guía"}).click();
  await page.getByRole("button",{name:/Comenzar · 43 ejercicios/}).click();
  await expect(page.getByText("Ejercicio 1 de 43",{exact:true})).toBeVisible();
};

test("@desktop QBI abre el resumen integral v3 con interfaz SOLved",async({page})=>{
  await openSubject(page);
  await expect(page.locator("#studyUnit")).toHaveValue("proteinas-i");
  await expect(page.locator("#studyUnit option:checked")).toHaveText("Resumen integral · Proteínas y métodos");
  const frameElement=page.locator(".rich-document");
  await expect(frameElement).toHaveAttribute("src",/quimica_biologica1\/units\/proteinas-i\/original\.html\?v=3\.1\.0$/);
  await expect(frameElement).toHaveAttribute("sandbox","allow-scripts");
  const frame=page.frameLocator(".rich-document");
  await expect(frame.locator("#qb-top")).toBeVisible({timeout:20000});
  await expect(frame.locator("#summaryIndex")).toBeVisible();
  await expect(frame.locator("#qbGlobalSearch")).toBeVisible();
  await expect(frame.locator("#qbMethodCarousel .qb-method-card")).toHaveCount(9);
  await expect(frame.locator("#cap1")).toContainText("Aminoácidos");
  await expect(frame.locator("#cap13")).toBeVisible();
});

test("@desktop QBI conserva herramientas, rosa y simuladores",async({page})=>{
  await openSubject(page);
  const frame=page.frameLocator(".rich-document");
  await expect(frame.locator("#qbAccentPicker")).toBeVisible({timeout:20000});
  await expect(frame.locator("#qbThemeToggle")).toBeVisible();
  await expect(frame.locator("#qbPrint")).toBeVisible();
  await expect(frame.locator("#sim-ph-pi")).toBeVisible();
  await expect(frame.locator("#sim-sds")).toBeVisible();
  await expect(frame.locator("#cap1")).toContainText("Henderson");
  await expect(frame.locator("#cap4")).toContainText("Levinthal");
  await expect(frame.locator("#cap8")).toContainText("actividad específica");
});

test("@desktop QBI resalta dentro del HTML y conserva el marcado",async({page})=>{
  await openSubject(page);
  const frame=page.frameLocator(".rich-document");
  const paragraph=frame.locator("#cap1 p[data-highlight-block]").first();
  await expect(paragraph).toBeVisible({timeout:20000});
  await paragraph.evaluate(node=>{const text=[...node.childNodes].find(n=>n.nodeType===Node.TEXT_NODE&&n.nodeValue.trim())||node.firstChild;const range=document.createRange();range.setStart(text,0);range.setEnd(text,Math.min(28,text.nodeValue.length));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);node.dispatchEvent(new PointerEvent("pointerup",{bubbles:true}))});
  await expect(page.locator("#selectionHelp")).toContainText("Selección lista:");
  await page.locator("#highlightBtn").click();
  await expect(frame.locator("mark.solved-rich-highlight")).toHaveCount(1);
  await page.reload();
  await page.locator('[data-open="quimica_biologica1"]').first().click();
  await expect(page.frameLocator(".rich-document").locator("mark.solved-rich-highlight")).toHaveCount(1,{timeout:20000});
});

test("@desktop QBI carga la guía completa y sólo gira con el control explícito",async({page})=>{
  await startFullGuide(page);
  const card=page.locator(".qbi-study .organic-card");
  await page.locator(".organic-front .qbi-card-html").click();
  await expect(card).not.toHaveClass(/flipped/);
  await expect(page.locator(".organic-back")).toBeHidden();
  await page.getByRole("button",{name:"Ver respuesta"}).click();
  await expect(card).toHaveClass(/flipped/);
  await expect(page.locator(".organic-front")).toBeHidden();
  await expect(page.locator(".organic-back")).toBeVisible();
});

test("@desktop QBI clasifica derecha, izquierda y abajo después de girar",async({page})=>{
  await startFullGuide(page);
  await page.getByRole("button",{name:"Ver respuesta"}).click();
  await page.getByRole("button",{name:"Correcta",exact:true}).click();
  await expect(page.getByText("1 de 43 clasificados",{exact:true})).toBeVisible();
  await page.getByRole("button",{name:"Ver respuesta"}).click();
  await page.getByRole("button",{name:"Incorrecta",exact:true}).click();
  await expect(page.getByText("2 de 43 clasificados",{exact:true})).toBeVisible();
  await page.getByRole("button",{name:"Ver respuesta"}).click();
  await page.getByRole("button",{name:"Revisar",exact:true}).click();
  await expect(page.getByText("3 de 43 clasificados",{exact:true})).toBeVisible();
});

test("@desktop QBI conserva el progreso después de recargar",async({page})=>{
  await startFullGuide(page);
  await page.getByRole("button",{name:"Ver respuesta"}).click();
  await page.getByRole("button",{name:"Correcta",exact:true}).click();
  await expect(page.getByText("1 de 43 clasificados",{exact:true})).toBeVisible();
  await page.reload();
  await page.locator('[data-open="quimica_biologica1"]').first().click();
  await page.getByRole("button",{name:"Ejercicios"}).click();
  await expect(page.getByText("1 de 43 clasificados",{exact:true})).toBeVisible();
});

test("@desktop la integración QBI no altera tarjetas ni mapa de Orgánica",async({page})=>{
  await openSubject(page,"quimica_organica");
  await page.getByRole("button",{name:"Tarjetas"}).click();
  await expect(page.getByRole("heading",{name:"Tarjetas de estudio"})).toBeVisible();
  await page.getByRole("button",{name:"Mapa mental"}).click();
  await expect(page.locator("[data-organic-map]")).toBeVisible();
});

test("@desktop QBI integra la guía de Electroforesis con respuestas desplegables",async({page})=>{
  await openQbiExercises(page);
  const guide=page.getByText(/Guía de Problemas · Electroforesis · 7 ejercicios/);
  await expect(guide).toBeVisible();
  await guide.click();
  const exercise=page.locator(".qbi-solved-exercise").filter({hasText:/Ejercicio 1 · Discuta las siguientes afirmaciones/});
  await exercise.locator("summary").first().click();
  await exercise.getByText("Ver respuesta explicada").click();
  await expect(exercise.getByText(/movilidad electroforética puede pensarse/)).toBeVisible();
});
