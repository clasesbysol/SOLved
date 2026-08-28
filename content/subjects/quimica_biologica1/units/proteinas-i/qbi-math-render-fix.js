(()=>{
  'use strict';
  const VERSION='4.0.1';
  const ROOT_SELECTORS=[
    '#qbiEmbeddedExercises',
    '#ejercicios-qbi',
    '.qbi-exercise-bank',
    '.qbi-exercises-section'
  ].join(',');
  const SKIP='script,style,textarea,pre,code,mjx-container,svg,.MathJax,.mjx-chtml,.qbi-no-math';
  const mathCommand=/\\(?:mathrm|text|frac|dfrac|tfrac|sqrt|Delta|delta|alpha|beta|gamma|varepsilon|epsilon|mu|sigma|pi|lambda|theta|omega|rightarrow|leftrightarrow|rightleftharpoons|cdot|times|pm|approx|leq|geq|neq|infty|ln|log|exp)\b/;
  const indexedToken=/(?:\b(?:pK|K|V|max|v|k|C|A|E|S|P|Q|R|H|NH|COO|COOH|HCO|NADP|NADPH|G6P)[A-Za-z0-9]*|\b[A-Z])(?:_\{[^{}]+\}|_[A-Za-z0-9\\]+|\^\{[^{}]+\}|\^[+\-A-Za-z0-9\\]+)/;
  const chemistryToken=/\b(?:[A-Z][a-z]?[A-Za-z0-9]*(?:_\{?\d+\}?)+(?:\^\{?[+\-0-9]+\}?)?)(?=[^A-Za-z]|$)/;

  const hasMathish=value=>{
    const text=String(value||'');
    return mathCommand.test(text)||indexedToken.test(text)||chemistryToken.test(text)||/\[[A-Za-z0-9+\-]+\](?:_\{[^{}]+\}|_[A-Za-z0-9\\]+|\^\{[^{}]+\}|\^[+\-A-Za-z0-9\\]+)/.test(text)||/[_^]\{[^{}]+\}/.test(text);
  };

  function protectDelimited(text,label='P'){
    const protectedMath=[];
    const value=String(text||'').replace(/\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/g,match=>{
      const token=`⟪QBI-${label}${protectedMath.length}⟫`;
      protectedMath.push(match);
      return token;
    });
    return {value,restore:input=>String(input).replace(new RegExp(`⟪QBI-${label}(\\d+)⟫`,'g'),(_,index)=>protectedMath[Number(index)]||'')};
  }

  function wrapStandalone(text){
    const patterns=[
      /\\(?:frac|dfrac|tfrac)\{[^{}]+\}\{[^{}]+\}/g,
      /\\(?:mathrm|text)\{[^{}]+\}(?:[_^](?:\{[^{}]+\}|[+\-A-Za-z0-9\\]+))*/g,
      /\\(?:sqrt)\{[^{}]+\}(?:[_^](?:\{[^{}]+\}|[+\-A-Za-z0-9\\]+))*/g,
      /\\(?:Delta|delta|alpha|beta|gamma|varepsilon|epsilon|mu|sigma|pi|lambda|theta|omega|infty)(?:[_^](?:\{[^{}]+\}|[+\-A-Za-z0-9\\]+))*/g,
      /\b(?:pK|K|V|v|k|C|A|E|S|P|Q|R)[A-Za-z0-9]*(?:_\{[^{}]+\}|_[A-Za-z0-9\\]+|\^\{[^{}]+\}|\^[+\-A-Za-z0-9\\]+)+/g,
      /\[[A-Za-z0-9+\-]+\](?:_\{[^{}]+\}|_[A-Za-z0-9\\]+|\^\{[^{}]+\}|\^[+\-A-Za-z0-9\\]+)+/g,
      /\b[A-Z][A-Za-z0-9]*(?:_\{?\d+\}?)+(?:\^\{?[+\-0-9]+\}?)?/g
    ];
    let out=String(text||'');
    const protectedMath=[];
    const protect=match=>{const token=`⟪QBI-W${protectedMath.length}⟫`;protectedMath.push(match);return token};
    for(const pattern of patterns){
      out=out.replace(pattern,match=>hasMathish(match)?protect(`\\(${match}\\)`):match);
    }
    return out.replace(/⟪QBI-W(\d+)⟫/g,(_,index)=>protectedMath[Number(index)]||'');
  }

  function normalizeText(text){
    const original=String(text||'');
    if(!hasMathish(original))return original;
    const guarded=protectDelimited(original);
    let value=guarded.value;
    const whole=value.match(/^(\s*)\[\s*([\s\S]*?)\s*\](\s*)$/);
    if(whole&&hasMathish(whole[2]))return guarded.restore(`${whole[1]}\\[${whole[2].trim()}\\]${whole[3]}`);

    value=value.replace(/\(([^()\n]{1,220})\)/g,(match,inner)=>hasMathish(inner)?`\\(${inner.trim()}\\)`:match);
    const newlyProtected=protectDelimited(value,'N');
    value=wrapStandalone(newlyProtected.value);
    value=newlyProtected.restore(value);
    return guarded.restore(value);
  }

  function normalizeRoot(root){
    if(!root||root.nodeType!==1)return false;
    let changed=false;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){
      if(!node.nodeValue||!hasMathish(node.nodeValue))return NodeFilter.FILTER_REJECT;
      const parent=node.parentElement;
      if(!parent||parent.closest(SKIP))return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }});
    const nodes=[];
    while(walker.nextNode())nodes.push(walker.currentNode);
    for(const node of nodes){
      const next=normalizeText(node.nodeValue);
      if(next!==node.nodeValue){node.nodeValue=next;changed=true}
    }
    return changed;
  }

  async function waitForMathJax(rounds){
    for(let i=0;i<rounds&&!window.MathJax?.typesetPromise;i++)await new Promise(resolve=>setTimeout(resolve,100));
    return window.MathJax?.typesetPromise?window.MathJax:null;
  }

  async function ensureMathJax(){
    if(window.MathJax?.typesetPromise)return window.MathJax;
    const existing=[...document.scripts].some(script=>/mathjax/i.test(script.src||''));
    if(existing){
      const ready=await waitForMathJax(40);
      if(ready)return ready;
    }
    if(!document.getElementById('qbi-math-render-fix-mathjax')){
      window.MathJax=window.MathJax||{};
      window.MathJax.tex=window.MathJax.tex||{};
      window.MathJax.tex.inlineMath=window.MathJax.tex.inlineMath||[["\\(","\\)"]];
      window.MathJax.tex.displayMath=window.MathJax.tex.displayMath||[["\\[","\\]"]];
      window.MathJax.svg=window.MathJax.svg||{fontCache:'global'};
      const script=document.createElement('script');
      script.id='qbi-math-render-fix-mathjax';
      script.src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
      script.defer=true;
      document.head.append(script);
    }
    return (await waitForMathJax(60))||window.MathJax;
  }

  let timer=0,running=false,pending=false;
  async function repair(){
    if(running){pending=true;return}
    running=true;
    try{
      const roots=[...document.querySelectorAll(ROOT_SELECTORS)];
      if(!roots.length)return;
      let changed=false;
      for(const root of roots)changed=normalizeRoot(root)||changed;
      const mj=await ensureMathJax().catch(()=>null);
      if(mj?.typesetPromise&&changed){
        try{await mj.typesetPromise(roots)}catch(error){console.error('QBI math render fix',error)}
      }
    }finally{
      running=false;
      if(pending){pending=false;schedule(80)}
    }
  }
  function schedule(delay=120){clearTimeout(timer);timer=setTimeout(repair,delay)}

  const observer=new MutationObserver(mutations=>{
    const meaningful=mutations.some(item=>[...item.addedNodes].some(node=>{
      if(node.nodeType!==1)return false;
      if(node.matches?.('mjx-container')||node.closest?.('mjx-container'))return false;
      return true;
    }));
    if(meaningful)schedule();
  });
  function start(){
    observer.observe(document.documentElement,{subtree:true,childList:true});
    schedule(0);
    setTimeout(()=>schedule(0),350);
    setTimeout(()=>schedule(0),1200);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();

  window.QBI_MATH_RENDER_FIX={version:VERSION,normalizeText,repair};
})();
