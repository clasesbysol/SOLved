import {test,expect} from "@playwright/test";
const waitForApp=page=>expect.poll(()=>page.evaluate(()=>typeof document.querySelector('[data-page="subjects"]')?.onclick==="function")).toBe(true);
const disableSupabase=page=>page.route("**/js/supabase-config.js*",route=>route.fulfill({status:200,contentType:"application/javascript",body:'window.SOLVED_SUPABASE_CONFIG={url:"",publishableKey:""}'}));

test("@desktop ofrece acceso invitado y aísla el perfil autorizado",async({page})=>{
 await disableSupabase(page);await page.goto("/");await page.evaluate(()=>localStorage.removeItem("solved-access-profile-v1"));await page.reload();
 await expect(page.getByRole("heading",{name:"Mesa de estudio"})).toBeVisible();await expect(page.locator("[data-account-name]")).toHaveText("Modo invitado");await expect(page.locator("html")).toHaveAttribute("data-access-mode","guest");
 await page.evaluate(()=>localStorage.setItem("solved-access-profile-v1",JSON.stringify({mode:"authorized-google",sub:"tester-sol",email:"clasesbysol@gmail.com",name:"Sol",role:"owner"})));await page.reload();
 await expect(page.locator("html")).toHaveAttribute("data-access-mode","authorized-google");await expect(page.locator("[data-account-name]")).toHaveText("Sol");await expect(page.locator("[data-account-email]")).toHaveText("clasesbysol@gmail.com");
 await page.getByRole("button",{name:"Abrir menú de cuenta"}).click();await expect(page.getByRole("button",{name:"Crear mi carrera"})).toBeVisible();
 expect(await page.evaluate(()=>LBT_DB.dbName)).toBe("solved-profile-tester-sol");
});

test("@desktop renderiza el resumen orgánico seguro y carga imágenes bajo demanda",async({page})=>{
 await page.goto("/");await waitForApp(page);await page.locator('[data-page="subjects"]').click();await page.locator('[data-open="quimica_organica"]:visible').click();
 await expect(page.locator("#studyUnit")).toHaveValue("resumen-integral");await expect(page.locator(".rich-content")).toBeVisible();
 const document=page.locator(".rich-document");await expect(document).toBeVisible();const frame=page.frameLocator(".rich-document");await expect(frame.locator("#intro")).toBeVisible();await expect(frame.locator("img").first()).toHaveAttribute("loading","lazy");
 await page.getByRole("button",{name:"Glosario"}).click();await expect(page.getByText("Esta sección se generará después de revisar el resumen importado.")).toBeVisible();
});

test("@mobile mantiene utilizable el resumen enriquecido",async({page})=>{
 await page.goto("/");await waitForApp(page);await page.locator('[data-page="subjects"]').click();await page.locator('[data-open="quimica_organica"]:visible').click();
 await expect(page.locator(".rich-content")).toBeVisible();await expect(page.locator(".rich-document")).toBeVisible();await expect(page.frameLocator(".rich-document").locator("#intro")).toBeVisible();
});
