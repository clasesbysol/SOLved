/* Configuración pública. La Publishable Key es segura para el navegador cuando RLS está activo. */
window.SOLVED_SUPABASE_CONFIG = Object.freeze({
  url: "https://ljmqvrgfbmyxhzmwxrkj.supabase.co",
  publishableKey: "sb_publishable_rkHcbqDI8NN4zGGnhoAyWA_enAzCcbZ"
});

(()=>{
  if(document.querySelector('script[data-solved-study-chrome]'))return;
  const script=document.createElement('script');
  script.src='js/study-chrome.js?v=0.11.17';
  script.dataset.solvedStudyChrome='1';
  script.async=false;
  document.head.append(script);
})();