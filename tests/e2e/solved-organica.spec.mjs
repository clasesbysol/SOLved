import {test,expect} from "@playwright/test";
const waitForApp=page=>expect.poll(()=>page.evaluate(()=>typeof document.querySelector('[data-page="subjects"]')?.onclick==="function")).toBe(true);
const disableSupabase=page=>page.route("**/js/supabase-config.js*",route=>route.fulfill({status:200,contentType:"application/javascript",body:'window.SOLVED_SUPABASE_CONFIG={url:"",publishableKey:""}'}));

test("@desktop ofrece acceso invitado y aísla el perfil autorizado",async({page})=>{
 await disableSupabase(page);await page.goto("/");await page.evaluate(()=>localStorage.removeItem("solved-access-profile-v1"));await page.reload();
 await expect(page.getByRole("heading",{name:"Mesa de estudio"})).toBeVisible();await expect(page.locator("[data-account-name]")).toHaveText("Modo invitado");await expect(page.locator("html")).toHaveAttribute("data-access-mode","guest");
 await page.evaluate(()=>localStorage.setItem("solved-access-profile-v1",JSON.stringify({mode:"authorized-google",sub:"tester-sol",email:"clasesbysol@gmail.com",name:"Sol",role:"owner"})));await page.reload();
 await expect(page.locator("html")).toHaveAttribute("data-access-mode","authorized-google");await expect(page.locator("[data-account-name]")).toHaveText("Sol");await expect(page.locator("[data-account-email]")).toHaveText("clasesbysol@gmail.com");
 await page.locator('[data-page="settings"]').click();await expect(page.getByRole("heading",{name:"Perfil"})).toBeVisible();await expect(page.locator("#settingsProfileName")).toHaveText("Sol");
 expect(await page.evaluate(()=>LBT_DB.dbName)).toBe("solved-profile-tester-sol");
});

test("@desktop renderiza el HTML original completo y ejecuta sus controles",async({page})=>{
 await page.goto("/");await waitForApp(page);await page.locator('[data-page="subjects"]').click();await page.locator('[data-open="quimica_organica"]:visible').click();
 await expect(page.locator("#studyUnit")).toHaveValue("resumen-integral");await expect(page.locator(".rich-content")).toBeVisible({timeout:30000});
 const document=page.locator(".rich-document");await expect(document).toBeVisible();await expect(page.locator(".organic-original-card .rich-document-head")).toHaveCount(0);await expect(page.locator("[data-reaction-menu]")).toHaveCount(0);
 const frame=page.frameLocator(".rich-document");await expect(frame.locator("#intro")).toBeVisible();await expect(frame.locator("#sidebar")).toHaveCount(0);await expect(frame.locator("#studySearchInput")).toBeVisible();await expect(frame.locator("#indice-maestro-reacciones")).toBeVisible();
 await frame.locator("#studySearchInput").fill("alquenos");await expect(frame.locator("mark.search-hit").first()).toBeVisible();
 await page.getByRole("button",{name:"Glosario"}).click();await expect(page.getByText("Todavía no hay contenido publicado para esta sección.")).toBeVisible();
});

test("@mobile mantiene utilizable el resumen enriquecido",async({page})=>{
 await page.goto("/");await waitForApp(page);await page.locator('[data-page="subjects"]').click();await page.locator('[data-open="quimica_organica"]:visible').click();
 await expect(page.locator(".rich-content")).toBeVisible({timeout:30000});await expect(page.locator(".rich-document")).toBeVisible();await expect(page.frameLocator(".rich-document").locator("#intro")).toBeVisible({timeout:30000});
});
