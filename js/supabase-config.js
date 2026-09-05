/* Configuración pública. La Publishable Key es segura para el navegador cuando RLS está activo. */
window.SOLVED_SUPABASE_CONFIG = Object.freeze({
  url: "https://ljmqvrgfbmyxhzmwxrkj.supabase.co",
  publishableKey: "sb_publishable_rkHcbqDI8NN4zGGnhoAyWA_enAzCcbZ"
});

(()=>{
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