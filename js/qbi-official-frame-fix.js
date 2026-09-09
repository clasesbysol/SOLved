(()=>{
  'use strict';
  const VERSION='1.3.0';
  const QBI_STATIC='content/subjects/quimica_biologica1/units/proteinas-i/qbi-static.html?v=4.7.0';
  const SANDBOX='allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox';
  const FRAME_STYLE_ID='solved-qbi-split-repair-v130';
  const boundFrames=new WeakSet();
  const resizeObservers=new WeakMap();

  const compact=value=>String(value??'').replace(/\s+/g,' ').trim();
  const normalize=value=>compact(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const isQbi=frame=>{
    if(!(frame instanceof HTMLIFrameElement))return false;
    const src=frame.getAttribute('src')||'';
    const source=frame.getAttribute('srcdoc')||'';
    const title=frame.getAttribute('title')||'';
    return /quimica_biologica1\/units\/proteinas-i\/(?:original|qbi-static)\.html/i.test(src)
      || source.includes('QBI_PAYLOAD_VERSION')&&source.includes('quimica_biologica1/units/proteinas-i')
      || frame.classList.contains('rich-document')&&/Química Biológica/i.test(title);
  };
  const canonical=()=>new URL(QBI_STATIC,location.href).href;

  function fitParent(frame){
    const panel=frame.closest('.workspace-panel-scroll');
    const official=frame.closest('.official-section');
    const card=frame.closest('.rich-document-card');
    const workspacePanel=frame.closest('.workspace-panel');
    const body=frame.closest('#studyBody');
    [body,workspacePanel,panel,official].forEach(node=>{
      if(!node)return;
      node.style.minHeight='0';
      node.style.height='100%';
      node.style.maxHeight='none';
      node.style.boxSizing='border-box';
    });
    if(panel){
      panel.style.position='relative';
      panel.style.overflow='hidden';
      panel.style.padding='0';
    }
    if(official){
      official.style.position='relative';
      official.style.overflow='hidden';
      official.style.width='100%';
    }
    if(card){
      Object.assign(card.style,{
        position:'absolute',inset:'0',width:'100%',height:'100%',minHeight:'0',maxWidth:'none',
        margin:'0',padding:'0',border:'0',borderRadius:'0',boxShadow:'none',overflow:'hidden',boxSizing:'border-box'
      });
    }
    Object.assign(frame.style,{
      position:'absolute',inset:'0',display:'block',width:'100%',height:'100%',minHeight:'0',maxHeight:'none',
      maxWidth:'none',margin:'0',border:'0',borderRadius:'0',background:'#fff8fc',boxSizing:'border-box'
    });
    const target=panel||card||workspacePanel;
    if(target&&typeof ResizeObserver!=='undefined'&&!resizeObservers.has(frame)){
      const observer=new ResizeObserver(()=>{
        frame.style.width='100%';
        frame.style.height='100%';
      });
      observer.observe(target);
      resizeObservers.set(frame,observer);
    }
  }

  function injectFrameStyle(doc){
    let style=doc.getElementById(FRAME_STYLE_ID);
    if(!style){
      style=doc.createElement('style');
      style.id=FRAME_STYLE_ID;
      doc.head.append(style);
    }
    style.textContent=`
      html,body{
        box-sizing:border-box!important;width:100%!important;max-width:100%!important;min-width:0!important;
        min-height:100%!important;height:auto!important;margin:0!important;overflow-x:hidden!important;background:#fff8fc!important
      }
      body{position:relative!important}
      .qb-summary,.qb-doc-shell,.qb-document,.qb-main,.qb-content,main,.main-content{
        box-sizing:border-box!important;min-width:0!important;max-width:none!important
      }
      .qb-summary,.qb-doc-shell{width:100%!important;min-height:100dvh!important;height:auto!important}
      .qb-document,.qb-main,.qb-content,main,.main-content{width:100%!important}
      .qb-card,.qb-chapter,.qbi-exercise-card,.qbi-integrated-group,.qbi-integrated-chapter,
      .qbi-integrated-topic,figure,img,svg,canvas,video{max-width:100%!important;min-width:0!important}
      .qbi-study-table,.qb-table-wrap,.table-wrap,.math-display,.qbi-enz2-equation,.formula-box,
      mjx-container[display="true"]{max-width:100%!important;overflow-x:auto!important;overflow-y:hidden!important}
      .solved-formula-chip.is-rendered-formula{
        font-family:inherit!important;text-align:center!important;overflow-x:auto!important;overflow-y:hidden!important;
        white-space:normal!important;line-height:1.45!important
      }
      .solved-formula-chip.is-rendered-formula>.qb-equation,
      .solved-formula-chip.is-rendered-formula>.qbi-integrated-equation,
      .solved-formula-chip.is-rendered-formula>.formula,
      .solved-formula-chip.is-rendered-formula>.formula-box,
      .solved-formula-chip.is-rendered-formula>.formula-card,
      .solved-formula-chip.is-rendered-formula>mjx-container,
      .solved-formula-chip.is-rendered-formula>math{
        margin:0!important;padding:0!important;border:0!important;background:transparent!important;max-width:100%!important
      }
      .solved-formula-chip mjx-container{margin:0!important;max-width:100%!important}
      @media(max-width:980px){
        .qb-doc-shell.solved-has-fixed-study-sidebar{display:block!important;grid-template-columns:none!important;width:100%!important}
        .qb-doc-shell.solved-has-fixed-study-sidebar>.qb-document,
        .qb-doc-shell.solved-has-fixed-study-sidebar>main{grid-column:auto!important;width:100%!important;max-width:none!important}
        .qb-sidebar.solved-fixed-study-sidebar,
        .summary-index.solved-fixed-study-sidebar{
          position:fixed!important;top:0!important;left:0!important;bottom:0!important;
          width:min(88vw,320px)!important;max-width:320px!important;height:100dvh!important;max-height:100dvh!important;
          margin:0!important;overflow:auto!important;z-index:2147482500!important;
          box-shadow:12px 0 34px rgba(63,34,50,.18)!important
        }
        .qb-sidebar.solved-fixed-study-sidebar[hidden],
        .summary-index.solved-fixed-study-sidebar[hidden]{display:none!important}
        .qb-document{padding-left:clamp(10px,2.4vw,20px)!important;padding-right:clamp(10px,2.4vw,20px)!important}
      }
      @media(max-width:620px){
        .qb-document{padding-left:8px!important;padding-right:8px!important}
        .qb-two-col,.qb-compare-3,.qb-formula-grid,.qb-steps,.qb-sim-grid,.qbi-gallery,
        .qbi-exercise-progress,.qbi-exercise-grid{grid-template-columns:minmax(0,1fr)!important}
      }
    `;
    doc.head.append(style);
  }

  function detailsScope(doc,button){
    let scope=button.closest('#qbi-mapa-integral,.qbi-exercises,.qbi-guide-section,.qb-document,.qb-main,main,.main-content,section');
    if(!scope||scope.querySelectorAll('details').length<2)scope=doc.querySelector('.qb-document,.qb-main,main,.main-content')||doc.body;
    return scope;
  }

  function bindBulkControls(doc){
    if(doc.documentElement.dataset.solvedQbiBulkFix===VERSION)return;
    doc.documentElement.dataset.solvedQbiBulkFix=VERSION;
    doc.addEventListener('click',event=>{
      const button=event.target.closest?.('button');
      if(!button)return;
      const label=normalize(button.textContent);
      const action=label.includes('cerrar todo')?'close':label.includes('abrir guias')?'guides':label.includes('abrir todo')?'open':'';
      if(!action)return;
      const scope=detailsScope(doc,button);
      const all=[...scope.querySelectorAll('details')].filter(item=>!item.hidden);
      if(!all.length)return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if(action==='close'){
        all.forEach(item=>item.open=false);
        return;
      }
      if(action==='open'){
        all.forEach(item=>item.open=true);
        return;
      }
      const guideRx=/\b(guia|tp\b|trabajo practico|ejercicio|problema|practica)\b/;
      const guides=all.filter(item=>guideRx.test(normalize(item.querySelector(':scope>summary')?.textContent||item.textContent)));
      (guides.length?guides:all).forEach(item=>item.open=true);
    },true);
  }

  function collectSearchMatches(doc,root,query){
    const matches=[];
    const lower=query.toLocaleLowerCase('es');
    const walker=doc.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){
      const parent=node.parentElement;
      if(!parent||!node.nodeValue?.trim())return NodeFilter.FILTER_REJECT;
      if(parent.closest('script,style,noscript,input,textarea,button,select,option,.qb-sidebar,.summary-index,.solved-formula-sheet'))return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }});
    let node;
    while((node=walker.nextNode())){
      const text=node.nodeValue;
      const hay=text.toLocaleLowerCase('es');
      let from=0,index;
      while((index=hay.indexOf(lower,from))!==-1){
        matches.push({node,start:index,end:index+query.length});
        from=index+Math.max(1,query.length);
        if(matches.length>=600)return matches;
      }
    }
    return matches;
  }

  function bindSearchStepper(doc){
    if(doc.documentElement.dataset.solvedQbiSearchFix===VERSION)return;
    doc.documentElement.dataset.solvedQbiSearchFix=VERSION;
    const state={query:'',matches:[],index:-1};
    const go=direction=>{
      const input=doc.querySelector('#qbGlobalSearch');
      const query=compact(input?.value);
      if(!query)return;
      const root=doc.querySelector('.qb-document,.qb-main,main,.main-content')||doc.body;
      if(state.query!==query||!state.matches.length){
        state.query=query;
        state.matches=collectSearchMatches(doc,root,query);
        state.index=direction<0?state.matches.length: -1;
      }
      if(!state.matches.length)return;
      state.index=(state.index+direction+state.matches.length)%state.matches.length;
      const hit=state.matches[state.index];
      let owner=hit.node.parentElement;
      for(let detail=owner?.closest('details');detail;detail=detail.parentElement?.closest('details'))detail.open=true;
      const range=doc.createRange();
      range.setStart(hit.node,hit.start);range.setEnd(hit.node,hit.end);
      const selection=doc.getSelection?.();
      selection?.removeAllRanges();selection?.addRange(range);
      owner?.scrollIntoView({behavior:'smooth',block:'center',inline:'nearest'});
    };
    doc.addEventListener('input',event=>{
      if(event.target?.id==='qbGlobalSearch'){state.query='';state.matches=[];state.index=-1}
    },true);
    doc.addEventListener('click',event=>{
      const button=event.target.closest?.('.qbi-search-stepper [data-search-prev],.qbi-search-stepper [data-search-next]');
      if(!button)return;
      event.preventDefault();
      event.stopImmediatePropagation();
      go(button.matches('[data-search-prev]')?-1:1);
    },true);
  }

  function cleanCloneIds(root){
    if(root.nodeType!==1)return;
    root.removeAttribute('id');
    root.querySelectorAll('[id]').forEach(node=>node.removeAttribute('id'));
    root.querySelectorAll('script,button,input,textarea,select').forEach(node=>node.remove());
  }

  function formulaKey(value){
    return compact(value).replace(/\s+/g,'').replace(/[−–—]/g,'-').replace(/·/g,'*').toLowerCase();
  }

  function renderFormulaSheet(doc){
    const chips=[...doc.querySelectorAll('.solved-formula-chip')];
    if(!chips.length)return;
    const selectors='.qb-equation,.qbi-integrated-equation,.formula,.formula-box,.formula-card,.fml,.fml-box,[data-formula],math,mjx-container,.MathJax,.katex-display';
    const candidates=[...doc.querySelectorAll(selectors)].filter(node=>!node.closest('.solved-formula-sheet'));
    const indexed=candidates.map(node=>({node,key:formulaKey(node.textContent)})).filter(item=>item.key);
    const typeset=[];
    for(const chip of chips){
      if(chip.dataset.solvedRenderedFormula===VERSION)continue;
      const original=chip.dataset.formulaText||compact(chip.textContent);
      chip.dataset.formulaText=original;
      const key=formulaKey(original);
      let match=indexed.find(item=>item.key===key);
      if(!match&&key.length>5)match=indexed.find(item=>item.key.includes(key)||key.includes(item.key));
      if(match){
        let source=match.node;
        if(source.matches('mjx-container,math,.MathJax')){
          const parent=source.closest('.qb-equation,.qbi-integrated-equation,.formula,.formula-box,.formula-card,.fml,.fml-box,[data-formula]');
          if(parent&&!parent.closest('.solved-formula-sheet'))source=parent;
        }
        const clone=source.cloneNode(true);
        cleanCloneIds(clone);
        chip.replaceChildren(clone);
        chip.classList.add('is-rendered-formula');
        chip.dataset.solvedRenderedFormula=VERSION;
        continue;
      }
      const mathjax=doc.defaultView?.MathJax;
      if(mathjax?.typesetPromise&&/[=≈≃≤≥+\-−*/^()[\]{}→⇌Δ∑∫√]/.test(original)){
        const tex=original.replace(/[−–—]/g,'-').replace(/·/g,'\\cdot ');
        chip.textContent=`\\(${tex}\\)`;
        chip.classList.add('is-rendered-formula');
        chip.dataset.solvedRenderedFormula=VERSION;
        typeset.push(chip);
      }
    }
    const mathjax=doc.defaultView?.MathJax;
    if(typeset.length&&mathjax?.typesetPromise){
      try{mathjax.typesetClear?.(typeset);mathjax.typesetPromise(typeset).catch(()=>{})}catch(_){ }
    }
  }

  function bindFormulaRepair(doc){
    if(doc.documentElement.dataset.solvedQbiFormulaFix===VERSION)return;
    doc.documentElement.dataset.solvedQbiFormulaFix=VERSION;
    let timer=0;
    const schedule=()=>{clearTimeout(timer);timer=setTimeout(()=>renderFormulaSheet(doc),80)};
    const observer=new MutationObserver(records=>{
      for(const record of records){
        if(record.target?.closest?.('.solved-formula-sheet')){schedule();return}
        for(const node of record.addedNodes){
          if(node.nodeType!==1)continue;
          if(node.matches?.('.solved-formula-sheet,.solved-formula-chip')||node.querySelector?.('.solved-formula-sheet,.solved-formula-chip')){schedule();return}
        }
      }
    });
    observer.observe(doc.documentElement,{childList:true,subtree:true});
    schedule();
    setTimeout(schedule,400);setTimeout(schedule,1200);
  }

  function repairFrame(frame){
    fitParent(frame);
    let doc;
    try{doc=frame.contentDocument}catch{return}
    if(!doc?.documentElement)return;
    injectFrameStyle(doc);
    bindBulkControls(doc);
    bindSearchStepper(doc);
    bindFormulaRepair(doc);
  }

  function fix(frame){
    if(!isQbi(frame))return;
    const target=canonical();
    if(!boundFrames.has(frame)){
      boundFrames.add(frame);
      frame.addEventListener('load',()=>{
        setTimeout(()=>repairFrame(frame),20);
        setTimeout(()=>repairFrame(frame),180);
        setTimeout(()=>repairFrame(frame),650);
      });
    }
    frame.dataset.qbiCanonicalFix=VERSION;
    frame.setAttribute('sandbox',SANDBOX);
    fitParent(frame);
    if(frame.hasAttribute('srcdoc'))frame.removeAttribute('srcdoc');
    if(frame.src!==target){frame.src=target;return}
    repairFrame(frame);
  }

  function scan(root=document){
    if(root instanceof HTMLIFrameElement)fix(root);
    root.querySelectorAll?.('iframe').forEach(fix);
  }
  const observer=new MutationObserver(records=>{
    for(const record of records){
      if(record.type==='attributes'){
        if(record.target instanceof HTMLIFrameElement)fix(record.target);
      }else{
        record.addedNodes.forEach(node=>{if(node.nodeType===1)scan(node)});
      }
    }
  });
  function boot(){
    scan();
    observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['src','srcdoc']});
    addEventListener('resize',()=>scan(),{passive:true});
    addEventListener('orientationchange',()=>setTimeout(()=>scan(),80),{passive:true});
    window.visualViewport?.addEventListener('resize',()=>scan(),{passive:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();