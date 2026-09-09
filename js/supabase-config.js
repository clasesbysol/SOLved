/* Configuración pública. La Publishable Key es segura para el navegador cuando RLS está activo. */
window.SOLVED_SUPABASE_CONFIG = Object.freeze({
  url: "https://ljmqvrgfbmyxhzmwxrkj.supabase.co",
  publishableKey: "sb_publishable_rkHcbqDI8NN4zGGnhoAyWA_enAzCcbZ"
});

(()=>{
  /*
   * La vista dividida interna de las materias fue retirada.
   * Versiones anteriores podían dejar guardado mode:"split" por materia; al cambiar
   * el ancho de la app ese separador aparecía como una “persiana” vertical u horizontal.
   * Normalizamos esos estados antes de que study-workspace.js los lea y dejamos una
   * defensa visual para que el separador legado nunca vuelva a mostrarse.
   */
  const WORKSPACE_PREFIX='solved-study-workspace-v2:';
  const NO_SPLIT_STYLE_ID='solved-no-legacy-split';
  let retiringLiveSplit=false;

  function retireSavedSplitLayouts(){
    for(let i=0;i<localStorage.length;i++){
      const key=localStorage.key(i);
      if(!key?.startsWith(WORKSPACE_PREFIX))continue;
      try{
        const state=JSON.parse(localStorage.getItem(key)||'null');
        if(!state||typeof state!=='object')continue;
        if(state.mode!=='single'||state.collapsed!==null){
          state.mode='single';
          state.collapsed=null;
          state.ratio=50;
          localStorage.setItem(key,JSON.stringify(state));
        }
      }catch(_){ }
    }
  }

  function installNoSplitStyle(){
    if(document.getElementById(NO_SPLIT_STYLE_ID))return;
    const style=document.createElement('style');
    style.id=NO_SPLIT_STYLE_ID;
    style.textContent=`
      #splitViewBtn,
      .workspace-divider,
      .study-body.workspace-split > .workspace-panel[data-side="right"]{
        display:none!important;
      }
      .study-body.workspace-split{
        grid-template-columns:minmax(0,1fr)!important;
        grid-template-rows:minmax(0,1fr)!important;
      }
      .study-body.workspace-split > .workspace-panel[data-side="left"]{
        grid-column:1 / -1!important;
        grid-row:1!important;
        width:100%!important;
        min-width:0!important;
      }
    `;
    document.head.append(style);
  }

  function retireLiveSplit(){
    const button=document.getElementById('splitViewBtn');
    if(button){
      button.hidden=true;
      button.setAttribute('aria-hidden','true');
      button.tabIndex=-1;
    }

    const root=document.getElementById('studyBody');
    if(!root?.classList.contains('workspace-split'))return;

    /* Si el handler legado ya está enlazado, lo usamos una sola vez para que también
       corrija su estado interno y vuelva a renderizar oficialmente en modo simple. */
    if(typeof button?.onclick==='function'&&!retiringLiveSplit){
      retiringLiveSplit=true;
      try{button.click()}finally{queueMicrotask(()=>{retiringLiveSplit=false})}
      return;
    }

    /* Fallback para la primera pintura, antes de que el handler esté disponible. */
    root.querySelectorAll('.workspace-divider,.workspace-panel[data-side="right"]').forEach(node=>node.remove());
    root.classList.remove('workspace-split');
    root.classList.add('workspace-single');
    root.style.removeProperty('--split');
    retireSavedSplitLayouts();
  }

  retireSavedSplitLayouts();
  installNoSplitStyle();

  const observe=()=>{
    retireLiveSplit();
    const observer=new MutationObserver(()=>retireLiveSplit());
    observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',observe,{once:true});
  else observe();

  if(!document.querySelector('script[data-solved-qbi-frame-fix]')){
    const script=document.createElement('script');
    script.src='js/qbi-official-frame-fix.js?v=1.3.0';
    script.dataset.solvedQbiFrameFix='1';
    script.async=false;
    document.head.append(script);
  }
  if(!document.querySelector('script[data-solved-study-chrome]')){
    const script=document.createElement('script');
    script.src='js/study-chrome.js?v=0.11.17';
    script.dataset.solvedStudyChrome='1';
    script.async=false;
    document.head.append(script);
  }
  if(!document.querySelector('script[data-solved-analysis2-integrated]')){
    const script=document.createElement('script');
    script.src='js/analysis2-integrated.js?v=1.0.0';
    script.dataset.solvedAnalysis2Integrated='1';
    script.async=false;
    document.head.append(script);
  }
})();