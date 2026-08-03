(function(){
  "use strict";
  const PROFILE_KEY="solved-access-profile-v1";
  const normalize=email=>String(email||"").trim().toLowerCase();
  const authorized=email=>window.SOLVED_AUTHORIZED_USERS?.find(item=>normalize(item.email)===normalize(email));
  const decode=credential=>{const part=credential.split(".")[1].replace(/-/g,"+").replace(/_/g,"/");return JSON.parse(decodeURIComponent(atob(part).split("").map(char=>`%${char.charCodeAt(0).toString(16).padStart(2,"0")}`).join("")))};
  const read=()=>{try{return JSON.parse(localStorage.getItem(PROFILE_KEY))||{mode:"no-profile"}}catch(_){return{mode:"no-profile"}}};
  const write=value=>localStorage.setItem(PROFILE_KEY,JSON.stringify(value));
  let profile=read();
  if(!["guest","authorized-google"].includes(profile.mode))profile={mode:"no-profile"};
  window.SOLVED_PROFILE=profile;
  window.SOLVED_PROFILE_DB_NAME=profile.mode==="guest"?"solved-profile-guest":profile.mode==="authorized-google"&&profile.sub?`solved-profile-${profile.sub}`:"solved-profile-pending";

  function show(state,message=""){
    const reception=document.querySelector("#solvedReception"),denied=document.querySelector("#unauthorizedAccount");
    document.documentElement.dataset.accessMode=state;
    reception.hidden=state!=="no-profile";denied.hidden=state!=="unauthorized-google";
    if(message)denied.querySelector("[data-unauthorized-email]").textContent=message;
  }
  function guest(){write({mode:"guest"});location.reload()}
  function signOut(){localStorage.removeItem(PROFILE_KEY);window.google?.accounts?.id?.disableAutoSelect?.();location.reload()}
  function handleCredential(response){let claims;try{claims=decode(response.credential)}catch(_){show("unauthorized-google","Cuenta no reconocida");return}const entry=authorized(claims.email);if(!entry){show("unauthorized-google",claims.email);return}write({mode:"authorized-google",sub:String(claims.sub),name:String(claims.name||""),email:normalize(claims.email),role:entry.role});location.reload()}
  function initGoogle(){if(!window.google?.accounts?.id){setTimeout(initGoogle,120);return}google.accounts.id.initialize({client_id:window.LBT_SYNC?.CLIENT_ID||"832913804678-2k7r1vb63jnhnq5a33dabmaspnmbpbp9.apps.googleusercontent.com",callback:handleCredential,auto_select:false,cancel_on_tap_outside:true});const target=document.querySelector("#googleSignIn");if(target&&!target.dataset.rendered){target.dataset.rendered="true";google.accounts.id.renderButton(target,{theme:"outline",size:"large",text:"signin_with",shape:"pill",width:260})}}
  function bindAccount(){const card=document.querySelector("#accountCard");if(!card)return;const connected=profile.mode==="authorized-google",menu=document.querySelector("#accountMenu"),toggle=()=>{menu.hidden=!menu.hidden};card.querySelector("img").src="assets/brand/solved-icon-192.png";card.querySelector("[data-account-name]").textContent=connected?profile.email:"Modo invitado";card.querySelector("[data-account-status]").textContent=connected?"Drive disponible · tocar para sincronizar":"Datos sólo en este dispositivo";card.querySelector("[data-account-email]").hidden=!connected;card.querySelector("[data-account-email]").textContent=profile.email||"";document.querySelector("#accountPanelName").textContent=connected?(profile.name||"Cuenta conectada"):"Modo invitado";document.querySelector("#accountPanelEmail").textContent=connected?profile.email:"Tus datos están sólo en este dispositivo";document.querySelector("#accountLogout").textContent=connected?"Cerrar sesión":"Iniciar sesión con Google";document.querySelectorAll("[data-owner-only]").forEach(element=>element.hidden=!connected);document.querySelector("#accountMenuToggle").onclick=toggle;document.querySelector("#mobileAccountBtn").onclick=toggle;document.querySelector("#accountGuest").onclick=guest;document.querySelector("#accountLogout").onclick=signOut;document.querySelector("#accountBackup").onclick=()=>document.querySelector("#backupBtn").click();document.querySelector("#accountSync").onclick=()=>document.querySelector("#driveActionBtn").click();document.querySelector("#accountDisconnect").onclick=()=>document.querySelector("#driveDisconnectBtn").click()}
  document.addEventListener("DOMContentLoaded",()=>{show(profile.mode);document.querySelectorAll("[data-continue-guest]").forEach(button=>button.onclick=guest);bindAccount();initGoogle()});
  window.SOLVED_AUTH={normalize,authorized,profile:()=>profile,guest,signOut,handleCredential};
})();
