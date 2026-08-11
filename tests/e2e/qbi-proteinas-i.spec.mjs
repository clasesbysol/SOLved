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
  await page.getByRole("button",{name:/Comenzar · 35 ejercicios/}).click();
  await expect(page.getByText("Ejercicio 1 de 35",{exact:true})).toBeVisible();
};

test("@desktop QBI publica Proteínas I y abre el resumen interactivo",async({page})=>{
  await openSubject(page);
  await expect(page.locator("#studyUnit")).toHaveValue("proteinas-i");
  await expect(page.locator("#studyUnit option:checked")).toHaveText("Proteínas I · Parcial 1");
  const frameElement=page.locator(".rich-document");
  await expect(frameElement).toHaveAttribute("src",/quimica_biologica1\/units\/proteinas-i\/original\.html$/);
  await expect(frameElement).toHaveAttribute("sandbox","allow-scripts");
  const frame=page.frameLocator(".rich-document");
  await expect(frame.getByRole("button",{name:/Organización · Parcial 1/})).toBeVisible();
  await page.getByRole("navigation",{name:"Secciones del resumen"}).getByRole("button",{name:"Teoría"}).click();
  await expect(frame.locator("#theory")).toHaveClass(/active/);
  await page.getByRole("navigation",{name:"Secciones del resumen"}).getByRole("button",{name:"Organización"}).click();
  await expect(frame.locator("#program")).toHaveClass(/active/);
  await frame.getByRole("button",{name:"Teoría",exact:true}).click();
  await expect(frame.locator("#theory")).toHaveClass(/active/);
  await frame.getByRole("button",{name:/Organización · Parcial 1/}).click();
  const jump=frame.locator(".topic-jump").first();
  await expect(jump).toHaveText("Ir a la teoría");
  const target=await jump.getAttribute("data-target");
  await jump.click();
  await expect(frame.locator("#theory")).toHaveClass(/active/);
  await expect(frame.locator(`#${target}`)).toBeVisible();
});

test("@desktop QBI carga 28 ejercicios y sólo gira con el control explícito",async({page})=>{
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
  await expect(page.getByText("1 de 35 clasificados",{exact:true})).toBeVisible();
  await page.getByRole("button",{name:"Ver respuesta"}).click();
  await page.getByRole("button",{name:"Incorrecta",exact:true}).click();
  await expect(page.getByText("2 de 35 clasificados",{exact:true})).toBeVisible();
  await page.getByRole("button",{name:"Ver respuesta"}).click();
  await page.getByRole("button",{name:"Revisar",exact:true}).click();
  await expect(page.getByText("3 de 35 clasificados",{exact:true})).toBeVisible();
});

test("@desktop QBI conserva el progreso después de recargar",async({page})=>{
  await startFullGuide(page);
  await page.getByRole("button",{name:"Ver respuesta"}).click();
  await page.getByRole("button",{name:"Correcta",exact:true}).click();
  await expect(page.getByText("1 de 35 clasificados",{exact:true})).toBeVisible();
  await page.reload();
  await page.locator('[data-open="quimica_biologica1"]').first().click();
  await page.getByRole("button",{name:"Ejercicios"}).click();
  await expect(page.getByText("1 de 35 clasificados",{exact:true})).toBeVisible();
});

test("@desktop la integración QBI no altera tarjetas ni mapa de Orgánica",async({page})=>{
  await openSubject(page,"quimica_organica");
  await page.getByRole("button",{name:"Tarjetas"}).click();
  await expect(page.getByRole("heading",{name:"Tarjetas de estudio"})).toBeVisible();
  await page.getByRole("button",{name:"Mapa mental"}).click();
  await expect(page.locator("[data-organic-map]")).toBeVisible();
});

test("@desktop QBI abre la teoría relacionada en el panel de origen",async({page})=>{
  await openSubject(page);await page.locator("#splitViewBtn").click();const right=page.locator('.workspace-panel[data-side="right"]');await right.locator("select").selectOption("tab:exercises");await right.getByRole("button",{name:/Seleccionar toda la gu/}).click();await right.getByRole("button",{name:/Comenzar/}).click();await right.getByRole("button",{name:"Ver respuesta"}).click();await right.getByRole("button",{name:"Ver teoría relacionada"}).click();await expect(right.locator("select")).toHaveValue("tab:summary");const frame=right.frameLocator("iframe");await expect(frame.locator("#theory")).toHaveClass(/active/);await expect(frame.locator(".workspace-target")).toHaveCount(1);
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


test("@desktop QBI ofrece unidades completas, carrusel de métodos y portada de guías",async({page})=>{
  await openSubject(page);
  const frame=page.frameLocator(".rich-document");
  await frame.getByRole("button",{name:"Proteínas I",exact:true}).click();
  await expect(frame.locator("#proteins1 .deep-study-unit")).toHaveCount(41);
  await expect(frame.locator("#proteins1 .method-carousel-links a")).toHaveCount(10);
  await expect(frame.locator("#proteins1")).toContainText("Henderson–Hasselbalch");
  await expect(frame.locator("#proteins1")).toContainText("SDS-PAGE");
  await frame.locator("#proteins1 .method-carousel-links a").filter({hasText:"PAGE nativa"}).click();
  await expect(frame.locator("#p1-method-page-nativa")).toBeInViewport();
  await frame.getByRole("button",{name:"Proteínas II",exact:true}).click();
  await expect(frame.locator("#proteins2 .deep-study-unit")).toHaveCount(42);
  await expect(frame.locator("#p2-folding")).toContainText("Levinthal");
  await expect(frame.locator("#p2-calculations")).toContainText("actividad específica");
  await page.getByRole("button",{name:"Ejercicios"}).click();
  await expect(page.getByRole("heading",{name:"¿Qué guía querés revisar?"})).toBeVisible();
  await expect(page.locator("[data-open-guide]")).toHaveCount(2);
});
