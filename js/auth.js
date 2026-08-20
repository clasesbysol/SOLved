(function(){
  "use strict";
  const PROFILE_KEY="solved-access-profile-v1";
  const normalize=value=>String(value||"").trim().toLowerCase();
  const recoveryRequested=/(?:[?#&]type=)(?:recovery|invite)(?:[&#]|$)/.test(location.href);
  const config=window.SOLVED_SUPABASE_CONFIG||{};
  const configured=/^https:\/\/.+\.supabase\.co$/.test(config.url||"")&&!String(config.publishableKey||"").startsWith("TU_");
  const client=configured&&window.supabase?.createClient?window.supabase.createClient(config.url,config.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}}):null;
  let profile={mode:"guest"},session=null,recoveryMode=recoveryRequested,roleRefresh=null;
  const cached=()=>{try{return JSON.parse(localStorage.getItem(PROFILE_KEY))}catch(_){return null}};
  const write=value=>localStorage.setItem(PROFILE_KEY,JSON.stringify(value));
  const apply=next=>{profile=next;window.SOLVED_PROFILE=next;window.SOLVED_PROFILE_DB_NAME=next.mode==="authorized-google"&&next.sub?`solved-profile-${next.sub}`:"solved-profile-guest";document.documentElement.dataset.accessMode=next.mode;return next};
  apply(cached()?.mode==="authorized-google"?cached():{mode:"guest"});

  function localProfileFromSession(nextSession){
    session=nextSession||null;
    if(!session?.user){const next={mode:"guest"};write(next);return apply(next)}
    const previous=cached(),sameUser=previous?.mode==="authorized-google"&&previous.sub===session.user.id;
    const next={mode:"authorized-google",sub:session.user.id,email:normalize(session.user.email),name:session.user.user_metadata?.name||session.user.email?.split("@")[0]||"Cuenta",role:sameUser&&previous.role?previous.role:"user"};write(next);return apply(next);
  }
  function refreshRole(nextSession){
    if(!client||!nextSession?.user)return Promise.resolve(profile);if(roleRefresh)return roleRefresh;
    roleRefresh=(async()=>{const {data,error}=await client.from("solved_admins").select("user_id").eq("user_id",nextSession.user.id).maybeSingle();if(error)throw error;if(session?.user?.id!==nextSession.user.id)return profile;const next={...profile,role:data?"owner":"user"};write(next);apply(next);if(document.readyState!=="loading")bindAccount();return next})().catch(error=>{console.warn("No se pudo actualizar el rol de la cuenta",error);return profile}).finally(()=>{roleRefresh=null});return roleRefresh;
  }
  async function profileFromSession(nextSession,{verifyRole=true}={}){
    const next=localProfileFromSession(nextSession);if(next.mode!=="authorized-google")return next;
    if(verifyRole)await refreshRole(nextSession);else queueMicrotask(()=>refreshRole(nextSession));return profile;
  }
  const ready=(async()=>{if(!client)return profile;const {data,error}=await client.auth.getSession();if(error)console.warn("No se pudo restaurar la sesión",error);return profileFromSession(data?.session,{verifyRole:false})})();

  function setRecoveryMode(active,message=""){
    recoveryMode=active;const form=document.querySelector("#supabaseAuthForm");if(!form)return;
    form.querySelector("#authModalTitle").textContent=active?"Creá tu contraseña":"Tu cuenta SOLved";
    form.querySelector("#authModalDescription").textContent=active?"Elegí una contraseña nueva para entrar a SOLved con tu email.":"Tu progreso y contenido personal quedan separados de los de cualquier otra cuenta.";
    form.querySelector(".auth-mode").hidden=active;form.querySelector("[data-auth-email]").hidden=active;form.querySelector("[data-auth-confirm]").hidden=!active;form.querySelector("#authForgot").hidden=active;
    form.querySelector("[data-auth-password-label]").textContent=active?"Nueva contraseña":"Contraseña";form.password.autocomplete=active?"new-password":"current-password";form.passwordConfirm.required=active;form.querySelector("[data-auth-submit]").textContent=active?"Guardar contraseña":"Continuar";form.querySelector("[data-auth-message]").textContent=message;
  }
  function showAuth(message="",mode="login"){
    const modal=document.querySelector("#supabaseAuthModal");if(!modal)return;
    setRecoveryMode(mode==="recovery",message);modal.hidden=false;
  }
  function closeAuth(){const modal=document.querySelector("#supabaseAuthModal");if(modal)modal.hidden=true}
  async function requestPasswordReset(){
    const form=document.querySelector("#supabaseAuthForm"),email=normalize(form?.email.value),message=form?.querySelector("[data-auth-message]");
    if(!client){showAuth("La recuperación no está disponible en este momento.");return}
    if(!email){message.textContent="Ingresá tu email primero.";form.email.focus();return}
    message.textContent="Enviando enlace…";const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:"https://clasesbysol.github.io/biblioteca-lbt/"});message.textContent=error?error.message:"Te enviamos un enlace. Abrilo desde este dispositivo para crear tu contraseña.";
  }
  async function submit(event){
    event.preventDefault();if(!client){showAuth("Configurá la Project URL y la Publishable Key para habilitar cuentas.");return}
    const form=event.currentTarget,email=normalize(form.email.value),password=form.password.value,mode=form.querySelector("[name=authMode]:checked")?.value||"login",message=form.querySelector("[data-auth-message]");
    if(recoveryMode){if(password!==form.passwordConfirm.value){message.textContent="Las contraseñas no coinciden.";return}message.textContent="Guardando contraseña…";const {error}=await client.auth.updateUser({password});if(error){message.textContent=error.message;return}await profileFromSession((await client.auth.getSession()).data?.session);history.replaceState({},document.title,location.pathname+location.search);location.reload();return}
    message.textContent="Procesando…";const action=mode==="register"?client.auth.signUp({email,password,options:{emailRedirectTo:"https://clasesbysol.github.io/biblioteca-lbt/"}}):client.auth.signInWithPassword({email,password});const {data,error}=await action;
    if(error){message.textContent=error.message;return}if(mode==="register"&&!data.session){message.textContent="Revisá tu email para confirmar la cuenta.";return}await profileFromSession(data.session);location.reload();
  }
  async function signOut(){if(client)await client.auth.signOut();apply({mode:"guest"});write(profile);location.reload()}
  function bindAccount(){
    const connected=profile.mode==="authorized-google",card=document.querySelector("#accountCard");if(!card)return;
    card.querySelector("img").src="assets/brand/solved-icon-192.png";card.querySelector("[data-account-name]").textContent=connected?(profile.name||profile.email):"Modo invitado";card.querySelector("[data-account-status]").textContent=connected?"Cuenta SOLved activa":"Datos sólo en este dispositivo";card.querySelector("[data-account-email]").hidden=!connected;card.querySelector("[data-account-email]").textContent=profile.email||"";
    document.querySelector("#accountPanelName").textContent=connected?(profile.name||"Cuenta conectada"):"Modo invitado";document.querySelector("#accountPanelEmail").textContent=connected?profile.email:"Tus datos están sólo en este dispositivo";document.querySelector("#accountLogout").textContent=connected?"Cerrar sesión":"Registrarme o iniciar sesión";
    document.querySelectorAll("[data-owner-only]").forEach(element=>element.hidden=profile.role!=="owner");document.querySelectorAll("[data-authenticated-only]").forEach(element=>element.hidden=!connected);
    const accountSync=document.querySelector("#accountSync"),accountDisconnect=document.querySelector("#accountDisconnect");
    if(accountSync){accountSync.hidden=!connected;accountSync.textContent="Conectar / sincronizar Google Drive"}
    if(accountDisconnect)accountDisconnect.hidden=!connected;
    const menu=document.querySelector("#accountMenu"),toggle=()=>menu.hidden=!menu.hidden;document.querySelector("#accountMenuToggle").onclick=toggle;document.querySelector("#mobileAccountBtn").onclick=toggle;document.querySelector("#accountLogout").onclick=()=>connected?signOut():showAuth();document.querySelector("#accountGuest").onclick=signOut;document.querySelector("#accountBackup").onclick=()=>document.querySelector("#backupBtn").click();document.querySelector("#accountSync").onclick=()=>document.querySelector("#driveActionBtn").click();document.querySelector("#accountDisconnect").onclick=()=>document.querySelector("#driveDisconnectBtn").click();
  }
  document.addEventListener("DOMContentLoaded",async()=>{await ready;document.querySelector("#supabaseAuthForm")?.addEventListener("submit",submit);document.querySelector("#authForgot")?.addEventListener("click",requestPasswordReset);document.querySelector("#authModalClose")?.addEventListener("click",closeAuth);document.querySelectorAll("[data-open-auth]").forEach(button=>button.onclick=()=>showAuth());document.querySelectorAll("[data-continue-guest]").forEach(button=>button.onclick=()=>{document.querySelector("#solvedReception").hidden=true});document.querySelector("#solvedReception").hidden=true;bindAccount();if(recoveryRequested&&session)showAuth("El enlace fue validado. Ahora elegí tu contraseña.","recovery")});
  client?.auth.onAuthStateChange((event,nextSession)=>{if(event==="SIGNED_OUT")profileFromSession(null);if(event==="PASSWORD_RECOVERY"){session=nextSession;showAuth("El enlace fue validado. Ahora elegí tu contraseña.","recovery")}});
  window.SOLVED_AUTH={client,configured,ready,normalize,profile:()=>profile,showAuth,requestPasswordReset,signOut};
})();