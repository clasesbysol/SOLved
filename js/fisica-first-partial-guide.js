(() => {
  "use strict";
  const SOURCES=["/js/fisica-guides-a.js?v=1.0.0","/js/fisica-guides-b1.js?v=1.0.0","/js/fisica-guides-b2.js?v=1.0.0","/js/fisica-guides-c.js?v=1.0.0"];
  const load=src=>new Promise((resolve,reject)=>{const el=document.createElement("script");el.src=src;el.async=false;el.onload=resolve;el.onerror=reject;document.head.append(el);});
  const normalize=s=>String(s||"").normalize("NFD").split("").filter(c=>c.charCodeAt(0)<768||c.charCodeAt(0)>879).join("").toLowerCase();
  async function boot(){
    window.SOLVED_FISICA_GUIDES=[];
    try{for(const src of SOURCES)await load(src);}catch(e){console.error("No se pudieron cargar las intros de Física",e);return;}
    const guides=window.SOLVED_FISICA_GUIDES||[];
    const findGuide=title=>{
      const t=normalize(title);
      let best=null,bestLen=-1;
      for(const g of guides)for(const raw of g.match){
        const k=normalize(raw);
        if(t.includes(k)&&k.length>bestLen){best=g;bestLen=k.length;}
      }
      return best;
    };
    const list=items=>`<ul>${items.map(x=>`<li>${x}</li>`).join("")}</ul>`;
    const paragraphs=items=>items.map(x=>`<p>${x}</p>`).join("");
    const math=items=>items.length?`<div class="reentry-maths">${items.map(x=>`<div class="reentry-math">${x}</div>`).join("")}</div>`:"";
    function ensureStyle(){
      if(document.querySelector("style[data-fisica-reentry-style]"))return;
      const style=document.createElement("style");
      style.dataset.fisicaReentryStyle="1";
      style.textContent=`
        .reentry-wrap{margin:0 0 12px;border-bottom:1px solid rgba(146,220,245,.25);padding-bottom:10px}
        details.reentry-guide{padding:0!important;margin:0!important;border:1px solid rgba(87,230,255,.34)!important;border-radius:12px!important;background:#0b1c2b!important;box-shadow:none!important;overflow:hidden}
        details.reentry-guide>summary{padding:11px 12px!important;color:#8eeeff!important;font-size:11.5px!important;font-weight:900!important;letter-spacing:.02em!important;text-transform:none!important;display:flex!important;align-items:center!important;gap:8px!important}
        details.reentry-guide>summary:before{content:"↺"!important;width:23px!important;height:23px!important;border-radius:7px!important;background:#164966!important;color:#c7f5ff!important;display:grid!important;place-items:center!important;flex:0 0 23px!important}
        details.reentry-guide[open]>summary:before{content:"↓"!important}
        .reentry-content{padding:0 13px 13px!important;color:#d8e8f4!important;font-size:12px!important;line-height:1.58!important}
        .reentry-lead{margin:0 0 10px!important;padding:11px!important;background:#10283d!important;border-left:4px solid #57e6ff!important;border-radius:8px!important;color:#e8f6ff!important}
        .reentry-theory{margin-bottom:9px!important;padding:11px!important;background:#0e2436!important;border:1px solid rgba(150,220,245,.22)!important;border-radius:9px!important}
        .reentry-theory h4,.reentry-box h4{margin:0 0 7px!important;color:#bffcff!important;font-size:10.5px!important;text-transform:uppercase!important;letter-spacing:.07em!important}
        .reentry-theory p{margin:5px 0!important;color:#d8e8f4!important}
        .reentry-maths{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;margin-top:9px}
        .reentry-math{min-width:0;padding:7px 8px!important;border-radius:8px!important;background:#fff!important;color:#000!important;border:1px solid #cfd8df!important;overflow-x:auto;text-align:center}
        .reentry-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}
        .reentry-box{background:#10253b!important;border:1px solid rgba(150,220,245,.22)!important;border-radius:9px!important;padding:10px!important}
        .reentry-box ul{margin:0!important;padding-left:17px!important}.reentry-box li{margin:4px 0!important;color:#d8e8f4!important}
        .reentry-anchor{margin:0!important;padding:8px 10px!important;border-radius:8px!important;background:#162d25!important;border:1px solid rgba(119,223,162,.3)!important;color:#c8f4d8!important;font-weight:750!important}
        details.reentry-guide[open]{background:#0b1c2b!important;color:#d8e8f4!important}
        details.reentry-guide[open] summary{color:#8eeeff!important;border-bottom:none!important;margin-bottom:0!important}
        details.reentry-guide[open] .reentry-content,details.reentry-guide[open] .reentry-content p,details.reentry-guide[open] .reentry-content li,details.reentry-guide[open] .reentry-content div{color:inherit!important;background-color:initial}
        details.reentry-guide[open] .reentry-math,details.reentry-guide[open] .reentry-math *{background:#fff!important;color:#000!important}
        @media(max-width:620px){.reentry-grid,.reentry-maths{grid-template-columns:1fr}}
      `;
      document.head.append(style);
    }
    function inject(){
      const cards=[...document.querySelectorAll(".main-content .topic-card")];
      if(!cards.length)return;
      ensureStyle();
      const added=[];
      for(const card of cards){
        const head=card.querySelector(".topic-head"),body=card.querySelector(".topic-body");
        if(!body||body.querySelector(":scope > [data-fisica-reentry]"))continue;
        const g=findGuide(head?.textContent||"");
        if(!g)continue;
        const wrap=document.createElement("div");
        wrap.className="reentry-wrap";wrap.dataset.fisicaReentry="1";
        wrap.innerHTML=`<details class="reentry-guide"><summary>${g.title}</summary><div class="reentry-content"><p class="reentry-lead">${g.intro}</p><section class="reentry-theory"><h4>De dónde viene / idea física</h4>${paragraphs(g.theory)}${math(g.math)}</section><div class="reentry-grid"><section class="reentry-box"><h4>Cuándo usarlo y cómo reconocerlo</h4>${list(g.recognize)}</section><section class="reentry-box"><h4>Ruta de resolución</h4>${list(g.route)}</section><section class="reentry-box"><h4>Hipótesis, chequeos y errores</h4>${list(g.checks)}</section><section class="reentry-box"><h4>Idea ancla</h4><p class="reentry-anchor">${g.anchor}</p></section></div></div></details>`;
        body.prepend(wrap);added.push(wrap);
      }
      if(added.length&&window.MathJax?.typesetPromise)window.MathJax.typesetPromise(added).catch(()=>{});
    }
    if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",inject,{once:true});else inject();
  }
  boot();
})();
