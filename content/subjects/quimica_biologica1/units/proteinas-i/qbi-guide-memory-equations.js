(()=>{
  'use strict';
  const STYLE='qbi-guide-memory-equations-style';
  function branch(root,prefix){return [...root.querySelectorAll('.qbi-memory-branch')].find(item=>item.querySelector('h4')?.textContent.trim().startsWith(prefix))}
  function patch(){
    const root=document.getElementById('qbi-guide-memory-maps');
    if(!root)return false;
    if(!document.getElementById(STYLE)){
      const style=document.createElement('style');style.id=STYLE;style.textContent='#qbi-guide-memory-maps .qbi-frac{display:inline-grid;grid-template-rows:auto auto;vertical-align:middle;text-align:center;line-height:1.15;margin:0 .18em}#qbi-guide-memory-maps .qbi-frac>span:first-child{border-bottom:1px solid currentColor;padding:0 .22em .08em}#qbi-guide-memory-maps .qbi-frac>span:last-child{padding:.08em .22em 0}';document.head.append(style);
    }
    const pi=branch(root,'4. pI:');
    if(pi){const rule=pi.querySelector('.qbi-memory-rule');if(rule)rule.innerHTML='<strong>pI</strong> = <span class="qbi-frac"><span>pK<sub>a, antes de Q=0</sub> + pK<sub>a, después de Q=0</sub></span><span>2</span></span>'}
    const sds=branch(root,'9. Cómo leer una SDS-PAGE');
    if(sds){const items=sds.querySelectorAll('li');if(items[2])items[2].innerHTML='<strong>R<sub>f</sub></strong> = <span class="qbi-frac"><span>distancia recorrida por la proteína</span><span>distancia recorrida por el frente de corrida</span></span>'}
    const activity=branch(root,'7. Purificación:');
    if(activity){const rule=activity.querySelector('.qbi-memory-rule');if(rule)rule.innerHTML='<strong>Actividad específica</strong> = <span class="qbi-frac"><span>actividad enzimática total</span><span>masa total de proteína</span></span>. Si el proceso purifica bien, este cociente aumenta.'}
    return true;
  }
  let attempts=0;function boot(){if(patch())return;if(++attempts<80)setTimeout(boot,150)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
