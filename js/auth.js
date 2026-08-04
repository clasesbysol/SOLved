(function(){
  "use strict";
  const PROFILE_KEY="solved-access-profile-v1";
  const normalize=value=>String(value||"").trim().toLowerCase();
  const config=window.SOLVED_SUPABASE_CONFIG||{};
  const configured=/^https:\/\/.+\.supabase\.co$/.test(config.url||"")&&!String(config.publishableKey||"").startsWith("TU_");
  const client=configured&&window.supabase?.createClient?window.supabase.createClient(config.url,config.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}}):null;
  let profile={mode:"guest"},session=null;
  const cached=()=>{try{return JSON.parse(localStorage.getItem(PROFILE_KEY))}catch(_){return null}};
  const write=value=>localStorage.setItem(PROFILE_KEY,JSON.stringify(value));
  const apply=next=>{profile=next;window.SOLVED_PROFILE=next;window.SOLVED_PROFILE_DB_NAME=next.mode==="authorized-google"&&next.sub?`solved-profile-${next.sub}`:"solved-profile-guest";document.documentElement.dataset.accessMode=next.mode;return next};
  apply(cached()?.mode==="authorized-google"?cached():{mode:"guest"});

  async function profileFromSession(nextSession){
    session=nextSession||null;
    if(!session?.user){const next={mode:"guest"};write(next);return apply(next)}
    const {data}=await client.from("solved_admins").select("user_id").eq("user_id",session.user.id).maybeSingle();
    const next={mode:"authorized-google",sub:session.user.id,email:normalize(session.user.email),name:session.user.user_metadata?.name||session.user.email?.split("@")[0]||"Cuenta",role:data?"owner":"user"};write(next);return apply(next);
  }
  const ready=(async()=>{if(!client)return profile;const {data,error}=await client.auth.getSession();if(error)console.warn("No se pudo restaurar la sesión",error);return profileFromSession(data?.session)})();

  function showAuth(message=""){
    const modal=document.querySelector("#supabaseAuthModal");if(!modal)return;
    modal.hidden=false;modal.querySelector("[data-auth-message]").textContent=message;
  }
  function closeAuth(){const modal=document.querySelector("#supabaseAuthModal");if(modal)modal.hidden=true}
  async function submit(event){
    event.preventDefault();if(!client){showAuth("Configurá la Project URL y la Publishable Key para habilitar cuentas.");return}
    const form=event.currentTarget,email=normalize(form.email.value),password=form.password.value,mode=form.querySelector("[name=authMode]:checked")?.value||"login",message=form.querySelector("[data-auth-message]");
    message.textContent="Procesando…";const action=mode==="register"?client.auth.signUp({email,password,options:{emailRedirectTo:"https://clasesbysol.github.io/biblioteca-lbt/"}}):client.auth.signInWithPassword({email,password});const {data,error}=await action;
    if(error){message.textContent=error.message;return}if(mode==="register"&&!data.session){message.textContent="Revisá tu email para confirmar la cuenta.";return}await profileFromSession(data.session);location.reload();
  }
  async function signOut(){if(client)await client.auth.signOut();apply({mode:"guest"});write(profile);location.reload()}
  function bindAccount(){
    const connected=profile.mode==="authorized-google",card=document.querySelector("#accountCard");if(!card)return;
    card.querySelector("img").src="assets/brand/solved-icon-192.png";card.querySelector("[data-account-name]").textContent=connected?(profile.name||profile.email):"Modo invitado";card.querySelector("[data-account-status]").textContent=connected?"Sincronización privada activa":"Datos sólo en este dispositivo";card.querySelector("[data-account-email]").hidden=!connected;card.querySelector("[data-account-email]").textContent=profile.email||"";
    document.querySelector("#accountPanelName").textContent=connected?(profile.name||"Cuenta conectada"):"Modo invitado";document.querySelector("#accountPanelEmail").textContent=connected?profile.email:"Tus datos están sólo en este dispositivo";document.querySelector("#accountLogout").textContent=connected?"Cerrar sesión":"Registrarme o iniciar sesión";
    document.querySelectorAll("[data-owner-only]").forEach(element=>element.hidden=profile.role!=="owner");document.querySelectorAll("[data-authenticated-only]").forEach(element=>element.hidden=!connected);
    const menu=document.querySelector("#accountMenu"),toggle=()=>menu.hidden=!menu.hidden;document.querySelector("#accountMenuToggle").onclick=toggle;document.querySelector("#mobileAccountBtn").onclick=toggle;document.querySelector("#accountLogout").onclick=()=>connected?signOut():showAuth();document.querySelector("#accountGuest").onclick=signOut;document.querySelector("#accountBackup").onclick=()=>document.querySelector("#backupBtn").click();document.querySelector("#accountSync").onclick=()=>document.querySelector("#driveActionBtn").click();document.querySelector("#accountDisconnect").onclick=()=>document.querySelector("#driveDisconnectBtn").click();
  }
  document.addEventListener("DOMContentLoaded",async()=>{await ready;document.querySelector("#supabaseAuthForm")?.addEventListener("submit",submit);document.querySelector("#authModalClose")?.addEventListener("click",closeAuth);document.querySelectorAll("[data-open-auth]").forEach(button=>button.onclick=()=>showAuth());document.querySelectorAll("[data-continue-guest]").forEach(button=>button.onclick=()=>{document.querySelector("#solvedReception").hidden=true});document.querySelector("#solvedReception").hidden=true;bindAccount()});
  client?.auth.onAuthStateChange((event,nextSession)=>{if(event==="SIGNED_OUT")profileFromSession(null)});
  window.SOLVED_AUTH={client,configured,ready,normalize,profile:()=>profile,showAuth,signOut};
})();
