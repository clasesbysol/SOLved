import {test,expect} from "@playwright/test";

const disableSupabase=page=>page.route("**/js/supabase-config.js*",route=>route.fulfill({status:200,contentType:"application/javascript",body:'window.SOLVED_SUPABASE_CONFIG={url:"",publishableKey:""}'}));
async function openSubject(page,id){await disableSupabase(page);await page.goto("/");await page.waitForFunction(()=>document.documentElement.dataset.appReady==="true");await page.locator('[data-page="subjects"]').click();await page.locator(`[data-open="${id}"]:visible`).first().click()}

test("@desktop ofrece acceso invitado y aísla el perfil autorizado",async({page})=>{
 await disableSupabase(page);await page.goto("/");await page.evaluate(()=>localStorage.removeItem("solved-access-profile-v1"));await page.reload();
 await expect(page.getByRole("heading",{name:"Horario semanal"})).toBeVisible();await expect(page.locator("[data-account-name]")).toHaveText("Modo invitado");await expect(page.locator("html")).toHaveAttribute("data-access-mode","guest");
 await page.evaluate(()=>localStorage.setItem("solved-access-profile-v1",JSON.stringify({mode:"authorized-google",sub:"tester-sol",email:"clasesbysol@gmail.com",name:"Sol",role:"owner"})));await page.reload();
 await expect(page.locator("html")).toHaveAttribute("data-access-mode","authorized-google");await expect(page.locator("[data-account-name]")).toHaveText("Sol");await expect(page.locator("[data-account-email]")).toHaveText("clasesbysol@gmail.com");
 await page.locator('[data-page="settings"]').click();await expect(page.getByRole("heading",{name:"Perfil"})).toBeVisible();await expect(page.locator("#settingsProfileName")).toHaveText("Sol");expect(await page.evaluate(()=>LBT_DB.dbName)).toBe("solved-profile-tester-sol");
});

test("@desktop Orgánica usa lectura nativa y una sola barra de controles",async({page})=>{
 await openSubject(page,"quimica_organica");await expect(page.locator(".organic-native")).toBeVisible({timeout:90000});await expect(page.locator("#studyUnit")).toHaveValue("organica-01");
 await expect(page.locator(".organic-native-section")).toHaveCount(26);await expect(page.locator("#studyBody iframe,.rich-document,.rich-document-card")).toHaveCount(0);
 await expect(page.locator(".sidebar")).toBeVisible();await expect(page.locator("#studyToolbar button:visible")).toHaveCount(3);await expect(page.locator(".workspace-panel-head:visible")).toHaveCount(0);
 await expect(page.locator(".organic-native-hero h2")).toContainText("Índice maestro");await page.locator("#studyUnit").selectOption("organica-03");await expect(page.locator(".organic-native img").first()).toHaveAttribute("loading","lazy");
 const broken=await page.locator(".organic-native img").evaluateAll(images=>images.filter(image=>image.complete&&image.naturalWidth===0).length);expect(broken).toBe(0);
});

test("@desktop comparte el shell visual con Estadística",async({page})=>{
 await openSubject(page,"estadistica");await expect(page.locator("#studyPage")).toHaveAttribute("data-subject-id","estadistica",{timeout:90000});await expect(page.locator("#studyPage")).toBeVisible();await expect(page.frameLocator(".rich-document").getByRole("heading",{name:/Probabilidad y variables aleatorias/i}).first()).toBeVisible({timeout:90000});
 await expect(page.locator(".study-head,.tabs")).toHaveCount(2);await test.info().attach("estadistica-desktop",{body:await page.screenshot(),contentType:"image/png"});
 await page.locator('[data-page="subjects"]').click();await page.locator('[data-open="quimica_organica"]:visible').first().click();await expect(page.locator(".organic-native")).toBeVisible({timeout:90000});
 await expect(page.locator(".study-head,.tabs")).toHaveCount(2);await expect(page.locator(".sidebar")).toBeVisible();await test.info().attach("organica-desktop",{body:await page.screenshot(),contentType:"image/png"});
 await expect(page.locator(".organic-native")).toHaveCSS("background-color","rgb(255, 255, 255)");
});

test("@desktop busca, recorre coincidencias y abre ejercicios y glosario",async({page})=>{
 await openSubject(page,"quimica_organica");await expect(page.locator(".organic-native")).toBeVisible({timeout:90000});await page.locator("#studyUnit").selectOption("organica-06");
 await page.locator("[data-organic-search]").fill("radical");await expect(page.locator("[data-organic-search-count]")).toContainText(/de \d+/);await page.locator("[data-organic-next]").click();await expect(page.locator("[data-organic-search-count]")).toContainText(/de \d+/);
 await page.locator('[data-tab="exercises"]').click();await expect(page.getByRole("heading",{name:"Ejercicios de síntesis"})).toBeVisible();await expect(page.locator(".organic-native-entry")).toHaveCount(2);await page.getByText("Ver resolución").first().click();await expect(page.locator(".organic-native-entry details[open]")).toHaveCount(1);
 await page.locator('[data-tab="glossary"]').click();await expect(page.getByRole("heading",{name:"Glosario"})).toBeVisible();await expect(page.locator(".organic-native-entry")).toHaveCount(11);
});

test("@mobile mantiene la lectura nativa sin desborde horizontal ni barra duplicada",async({page})=>{
 await openSubject(page,"estadistica");await expect(page.locator("#studyPage")).toHaveAttribute("data-subject-id","estadistica",{timeout:90000});await expect(page.locator("#studyPage")).toBeVisible();await expect(page.frameLocator(".rich-document").getByRole("heading",{name:/Probabilidad y variables aleatorias/i}).first()).toBeVisible({timeout:90000});await test.info().attach("estadistica-mobile",{body:await page.screenshot(),contentType:"image/png"});
 await openSubject(page,"quimica_organica");await expect(page.locator(".organic-native")).toBeVisible({timeout:90000});await expect(page.locator("#studyBody iframe")).toHaveCount(0);await expect(page.locator(".workspace-panel-head:visible")).toHaveCount(0);await test.info().attach("organica-mobile",{body:await page.screenshot(),contentType:"image/png"});
 const sizes=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth,reader:document.querySelector(".organic-native").getBoundingClientRect().width}));expect(sizes.document).toBeLessThanOrEqual(sizes.viewport+1);expect(sizes.reader).toBeLessThanOrEqual(sizes.viewport);
 await page.locator("#studyUnit").selectOption("organica-03");await expect(page.locator(".organic-native img").first()).toHaveAttribute("loading","lazy");
});
