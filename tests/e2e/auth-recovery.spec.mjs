import {test,expect} from "@playwright/test";

test("@desktop solicita recuperación y permite crear una contraseña",async({page})=>{
  await page.route("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.57.4/dist/umd/supabase.min.js",route=>route.fulfill({contentType:"application/javascript",body:`
    window.__session=null;
    window.supabase={createClient:()=>({
      from:()=>({select(){return this},eq(){return this},maybeSingle:async()=>({data:{user_id:'owner'}})}),
      auth:{
        getSession:async()=>({data:{session:window.__session}}),
        onAuthStateChange:callback=>{window.__authCallback=callback;return{data:{subscription:{unsubscribe(){}}}}},
        resetPasswordForEmail:async(email,options)=>{window.__resetRequest={email,options};return{}},
        updateUser:async value=>{sessionStorage.setItem('updated-password',value.password);return{}},
        signInWithPassword:async()=>({data:{}}),signUp:async()=>({data:{}}),signOut:async()=>({})
      }
    })};
  `}));
  await page.goto("/");
  await expect.poll(()=>page.evaluate(()=>typeof window.__authCallback)).toBe("function");
  await page.locator("#accountMenuToggle").click();await page.locator("#accountLogout").click();
  await page.locator('#supabaseAuthForm input[name="email"]').fill("clasesbysol@gmail.com");await page.locator("#authForgot").click();
  await expect(page.locator("[data-auth-message]")).toContainText("Te enviamos un enlace");
  await expect.poll(()=>page.evaluate(()=>window.__resetRequest?.email)).toBe("clasesbysol@gmail.com");
  await page.evaluate(()=>{window.__session={user:{id:"owner",email:"clasesbysol@gmail.com",user_metadata:{name:"SOL"}}};window.__authCallback("PASSWORD_RECOVERY",window.__session)});
  await expect(page.locator("#authModalTitle")).toHaveText("Creá tu contraseña");
  await page.locator('#supabaseAuthForm input[name="password"]').fill("una-clave-segura");await page.locator('#supabaseAuthForm input[name="passwordConfirm"]').fill("una-clave-segura");await page.locator("[data-auth-submit]").click();
  await expect.poll(()=>page.evaluate(()=>sessionStorage.getItem("updated-password"))).toBe("una-clave-segura");
});
