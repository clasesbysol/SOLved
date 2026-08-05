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
  await page.getByRole("button",{name:/Comenzar · 28 ejercicios/}).click();
  await expect(page.getByText("Ejercicio 1 de 28",{exact:true})).toBeVisible();
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
  await frame.getByRole("button",{name:/Teoría · Proteínas I/}).click();
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
  await expect(page.getByText("1 de 28 clasificados",{exact:true})).toBeVisible();
  await page.getByRole("button",{name:"Ver respuesta"}).click();
  await page.getByRole("button",{name:"Incorrecta",exact:true}).click();
  await expect(page.getByText("2 de 28 clasificados",{exact:true})).toBeVisible();
  await page.getByRole("button",{name:"Ver respuesta"}).click();
  await page.getByRole("button",{name:"Revisar",exact:true}).click();
  await expect(page.getByText("3 de 28 clasificados",{exact:true})).toBeVisible();
});

test("@desktop QBI conserva el progreso después de recargar",async({page})=>{
  await startFullGuide(page);
  await page.getByRole("button",{name:"Ver respuesta"}).click();
  await page.getByRole("button",{name:"Correcta",exact:true}).click();
  await expect(page.getByText("1 de 28 clasificados",{exact:true})).toBeVisible();
  await page.reload();
  await page.locator('[data-open="quimica_biologica1"]').first().click();
  await page.getByRole("button",{name:"Ejercicios"}).click();
  await expect(page.getByText("1 de 28 clasificados",{exact:true})).toBeVisible();
});

test("@desktop la integración QBI no altera tarjetas ni mapa de Orgánica",async({page})=>{
  await openSubject(page,"quimica_organica");
  await page.getByRole("button",{name:"Tarjetas"}).click();
  await expect(page.getByRole("heading",{name:"Tarjetas de estudio"})).toBeVisible();
  await page.getByRole("button",{name:"Mapa mental"}).click();
  await expect(page.locator("[data-organic-map]")).toBeVisible();
});
