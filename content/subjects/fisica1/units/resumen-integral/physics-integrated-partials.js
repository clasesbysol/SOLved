(()=>{
  'use strict';
  const SECTION_ID='fisica-parciales-resueltos';
  function install(){
    const side=document.getElementById('physicsSummaryIndex'),main=document.querySelector('.main-content');
    if(!side||!main||document.getElementById(SECTION_ID))return false;
    const style=document.createElement('style');
    style.textContent=`
      .physics-partials-index{margin:14px 0;border:1px solid rgba(125,232,255,.22);border-radius:10px;background:#091a2a;overflow:hidden}
      .physics-partials-index>summary{padding:10px 11px;cursor:pointer;color:#bae6fd;font-size:.78rem;font-weight:900}
      .physics-partials-index a{margin:0 6px 7px;color:#fef3c7!important;font-weight:850}
      .physics-partials-integrated{margin:34px 0 80px;scroll-margin-top:12px;border-top:2px solid var(--sum-line);padding-top:28px}
      .physics-partials-integrated>h2{margin:0 0 6px;color:#bffcff;font-size:clamp(1.8rem,4vw,3.4rem)}
      .physics-partials-integrated>p{margin:0 0 18px;color:#b9dcec}
      .physics-partials-frame{display:block;width:100%;height:85vh;min-height:720px;border:1px solid var(--sum-line);border-radius:16px;background:#07131f}
      body.theme-light .physics-partials-index{background:#fff;border-color:#c2d9e7}
      body.theme-light .physics-partials-index>summary,body.theme-light .physics-partials-integrated>h2{color:#075985}
      body.theme-light .physics-partials-integrated>p{color:#315a73}
      body.theme-light .subject-title-only h1{color:#10243a}
      @media(max-width:850px){.physics-partials-frame{height:78vh;min-height:620px}}
    `;
    document.head.append(style);
    const index=document.createElement('details');index.className='physics-partials-index';
    index.innerHTML='<summary>Parciales resueltos · 7 exámenes</summary><a href="#'+SECTION_ID+'">Abrir los 28 ejercicios</a>';
    side.append(index);
    const section=document.createElement('section');section.id=SECTION_ID;section.className='physics-partials-integrated';
    section.innerHTML='<h2>Parciales resueltos</h2><p>7 exámenes y 28 ejercicios completos, integrados dentro de Física I.</p><iframe class="physics-partials-frame" title="7 parciales resueltos de Física I" loading="lazy" src="parciales.html?integrado=1"></iframe>';
    main.append(section);
    return true;
  }
  let attempts=0;const timer=setInterval(()=>{if(install()||attempts++>100)clearInterval(timer)},80);
})();
