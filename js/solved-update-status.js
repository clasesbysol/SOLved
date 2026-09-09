(()=>{
  "use strict";
  const STATUS_ID="solvedVersionStatus";
  const META_URL="version.json";
  let checking=false,bannerTimer=null,lastMeta=null;

  const safe=value=>String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));

  function formatPublished(value){
    const date=new Date(value||"");
    if(Number.isNaN(date.getTime()))return "Fecha no disponible";
    const zone="America/Argentina/Buenos_Aires";
    const day=new Intl.DateTimeFormat("es-AR",{day:"2-digit",month:"2-digit",year:"numeric",timeZone:zone}).format(date);
    const time=new Intl.DateTimeFormat("es-AR",{hour:"2-digit",minute:"2-digit",hour12:false,timeZone:zone}).format(date);
    return `${day} · ${time}`;
  }

  function ensureUI(){
    let chip=document.getElementById(STATUS_ID);
    if(!chip){
      chip=document.createElement("button");
      chip.type="button";
      chip.id=STATUS_ID;
      chip.className="soft-btn solved-version-status";
      chip.title="Ver versión y comprobar actualizaciones de SOLved";
      chip.innerHTML='<span class="solved-version-dot" aria-hidden="true"></span><span class="solved-version-copy"><b>Versión SOLved</b><small>Comprobando…</small></span>';
      const top=document.querySelector(".topbar"),backup=document.getElementById("backupBtn");
      if(top)top.insertBefore(chip,backup||null);
    }else{
      /* Reemplaza la estructura del indicador viejo de Estadística y elimina sus handlers. */
      const fresh=chip.cloneNode(false);
      fresh.type="button";
      fresh.id=STATUS_ID;
      fresh.className="soft-btn solved-version-status";
      fresh.title="Ver versión y comprobar actualizaciones de SOLved";
      fresh.innerHTML='<span class="solved-version-dot" aria-hidden="true"></span><span class="solved-version-copy"><b>Versión SOLved</b><small>Comprobando…</small></span>';
      chip.replaceWith(fresh);
      chip=fresh;
    }
    chip.onclick=()=>check(true);

    if(!document.getElementById("solvedVersionStatusStyle")){
      const style=document.createElement("style");
      style.id="solvedVersionStatusStyle";
      style.textContent=`
        .solved-version-status{display:inline-flex!important;align-items:center;gap:9px;min-height:38px;padding:6px 10px!important;white-space:nowrap;text-align:left}
        .solved-version-dot{width:8px;height:8px;flex:0 0 8px;border-radius:50%;background:#999;box-shadow:0 0 0 3px color-mix(in srgb,#999 15%,transparent)}
        .solved-version-copy{display:grid;gap:1px;line-height:1.1}.solved-version-copy b{font-size:11px;font-weight:800}.solved-version-copy small{font-size:9px;color:var(--muted,#777);font-weight:650}
        .solved-version-status[data-state="ok"] .solved-version-dot{background:#44b56b;box-shadow:0 0 0 3px color-mix(in srgb,#44b56b 16%,transparent)}
        .solved-version-status[data-state="checking"] .solved-version-dot{background:#d5a62b;animation:solvedPulse 1s infinite}
        .solved-version-status[data-state="pending"] .solved-version-dot{background:#d58a2b;box-shadow:0 0 0 3px color-mix(in srgb,#d58a2b 16%,transparent)}
        .solved-version-status[data-state="error"] .solved-version-dot{background:#d35a5a}
        @keyframes solvedPulse{50%{opacity:.35}}
        .solved-update-banner{position:fixed;left:50%;top:18px;transform:translateX(-50%);z-index:2147483000;width:min(620px,calc(100vw - 28px));padding:13px 15px;border-radius:12px;border:1px solid var(--line,#555);background:var(--panel,#17191d);color:var(--text,#fff);box-shadow:0 18px 55px #0007;display:flex;gap:12px;align-items:flex-start}
        .solved-update-banner strong{display:block;margin-bottom:3px}.solved-update-banner p{margin:0;color:var(--muted,#aaa);line-height:1.45}.solved-update-banner button{margin-left:auto;border:0;background:transparent;color:inherit;font-size:20px;cursor:pointer}
        @media(max-width:760px){.solved-version-status{padding:6px 8px!important}.solved-version-copy b{font-size:10px}.solved-version-copy small{font-size:8px}.solved-update-banner{top:10px}}
      `;
      document.head.append(style);
    }
    return chip;
  }

  function setChip(state,headline,detail){
    const chip=document.getElementById(STATUS_ID)||ensureUI();
    chip.dataset.state=state;
    const title=chip.querySelector(".solved-version-copy b"),small=chip.querySelector(".solved-version-copy small");
    if(title)title.textContent=headline;
    if(small)small.textContent=detail;
    chip.setAttribute("aria-label",`${headline}. ${detail}`);
  }

  function showBanner(title,text,auto=true){
    let banner=document.getElementById("solvedUpdateBanner");
    if(!banner){banner=document.createElement("aside");banner.id="solvedUpdateBanner";banner.className="solved-update-banner";banner.setAttribute("role","status");banner.setAttribute("aria-live","polite");document.body.append(banner)}
    banner.innerHTML=`<div><strong>${safe(title)}</strong><p>${safe(text)}</p></div><button type="button" aria-label="Cerrar">×</button>`;
    banner.querySelector("button").onclick=()=>banner.remove();
    clearTimeout(bannerTimer);
    if(auto)bannerTimer=setTimeout(()=>banner.remove(),7000);
  }

  function updateFooter(meta){
    const footer=document.querySelector(".app-version");
    if(!footer||!meta?.appVersion)return;
    footer.textContent=`v${meta.appVersion}`;
    footer.setAttribute("aria-label",`Versión de SOLved ${meta.appVersion}. Última actualización ${formatPublished(meta.publishedAt)}`);
    footer.title=`Última actualización: ${formatPublished(meta.publishedAt)}`;
  }

  function updateButtonPending(){
    const button=document.getElementById("updateBtn");
    return !!button&&!button.hidden;
  }

  async function readMeta(){
    const response=await fetch(`${META_URL}?status=${Date.now()}`,{cache:"no-store"});
    if(!response.ok)throw Error(`version.json ${response.status}`);
    const meta=await response.json();
    if(!meta?.appVersion)throw Error("La versión publicada no es válida");
    return meta;
  }

  function renderMeta(meta){
    lastMeta=meta;
    updateFooter(meta);
    const when=formatPublished(meta.publishedAt);
    if(updateButtonPending())setChip("pending",`SOLved v${meta.appVersion} · actualización lista`, `Publicada ${when}`);
    else setChip("ok",`SOLved v${meta.appVersion} · al día`, `Última actualización: ${when}`);
  }

  async function check(force=false){
    if(checking)return;
    checking=true;
    const previous=lastMeta;
    setChip("checking",previous?.appVersion?`SOLved v${previous.appVersion}`:"Versión SOLved","Comprobando actualización…");
    try{
      if("serviceWorker" in navigator){
        try{const registration=await navigator.serviceWorker.getRegistration?.();await registration?.update?.()}catch(_){ }
      }
      const meta=await readMeta();
      renderMeta(meta);
      if(force){
        const when=formatPublished(meta.publishedAt);
        if(updateButtonPending())showBanner("Hay una actualización lista",`SOLved v${meta.appVersion} fue publicada ${when}. Tocá “Actualizar” para activarla.`,false);
        else showBanner(`SOLved v${meta.appVersion} está al día`,`Última actualización: ${when}.`);
      }
    }catch(error){
      console.warn("SOLved version status",error);
      if(previous)renderMeta(previous);
      else setChip("error","No pude comprobar la versión","Tocá para reintentar");
      if(force)showBanner("No pude comprobar la versión",`${error.message}. La app sigue disponible.`,false);
    }finally{checking=false}
  }

  function observeAppUpdate(){
    const button=document.getElementById("updateBtn");
    if(!button)return;
    const report=()=>{
      if(lastMeta)renderMeta(lastMeta);
      if(!button.hidden&&lastMeta)showBanner("Nueva versión de SOLved lista",`SOLved v${lastMeta.appVersion} ya se descargó. Tocá “Actualizar” para activarla.`,false);
    };
    new MutationObserver(report).observe(button,{attributes:true,attributeFilter:["hidden"]});
  }

  function boot(){
    ensureUI();
    observeAppUpdate();
    check(false);
    window.addEventListener("lbt-app-ready",()=>check(false),{once:true});
    window.addEventListener("online",()=>check(false));
    document.addEventListener("visibilitychange",()=>{if(!document.hidden)check(false)});
    window.addEventListener("focus",()=>check(false));
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
