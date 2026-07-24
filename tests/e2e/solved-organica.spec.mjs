import {test,expect} from "@playwright/test";

test("@desktop ofrece acceso invitado y aísla el perfil autorizado",async({page})=>{
 await page.goto("/");await page.evaluate(()=>localStorage.removeItem("solved-access-profile-v1"));await page.reload();
 await expect(page.getByRole("heading",{name:"Tu espacio de estudio"})).toBeVisible();
 await page.getByRole("button",{name:"Continuar como invitado"}).click();await expect(page.locator("html")).toHaveAttribute("data-access-mode","guest");
 await page.evaluate(()=>localStorage.setItem("solved-access-profile-v1",JSON.stringify({mode:"authorized-google",sub:"tester-sol",email:"clasesbysol@gmail.com",name:"Sol",role:"owner"})));await page.reload();
 await expect(page.locator("html")).toHaveAttribute("data-access-mode","authorized-google");await expect(page.locator("[data-account-name]")).toHaveText("clasesbysol@gmail.com");
 await page.getByRole("button",{name:"Abrir menú de cuenta"}).click();await expect(page.getByRole("button",{name:"Crear mi carrera"})).toBeVisible();
 expect(await page.evaluate(()=>LBT_DB.dbName)).toBe("solved-profile-tester-sol");
});

test("@desktop renderiza el resumen orgánico seguro y carga imágenes bajo demanda",async({page})=>{
 await page.goto("/");await page.locator('[data-page="subjects"]').click();await page.locator('[data-open="quimica_organica"]').click();
 await expect(page.locator("#studyUnit")).toHaveValue("resumen-integral");await expect(page.locator(".rich-content")).toBeVisible();
 await expect(page.locator(".rich-details")).toHaveCount(419);const detail=page.locator(".rich-details").filter({has:page.locator("img")}).first();await detail.locator("summary").click();
 const image=detail.locator("img").first();await expect(image).toHaveAttribute("loading","lazy");await image.click();await expect(page.locator(".rich-lightbox")).toBeVisible();await page.getByRole("button",{name:"Cerrar"}).click();
 await page.getByRole("button",{name:"Glosario"}).click();await expect(page.getByText("Esta sección se generará después de revisar el resumen importado.")).toBeVisible();
});

test("@mobile mantiene utilizable el resumen enriquecido",async({page})=>{
 await page.goto("/");await page.locator('[data-page="subjects"]').click();await page.locator('[data-open="quimica_organica"]').click();
 await expect(page.locator(".rich-content")).toBeVisible();await page.locator(".rich-details summary").first().click();await expect(page.locator(".rich-details").first()).toHaveAttribute("open","");
});
