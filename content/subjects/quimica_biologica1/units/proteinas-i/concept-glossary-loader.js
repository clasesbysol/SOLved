(async()=>{
  try{
    const names=[1,2,3,4,5,6].map(n=>`concept-glossary-${n}.txt`);
    const parts=await Promise.all(names.map(name=>fetch(name,{cache:'no-store'}).then(r=>{if(!r.ok) throw new Error(name); return r.text();})));
    const raw=atob(parts.join('').replace(/\s+/g,''));
    const bytes=Uint8Array.from(raw,c=>c.charCodeAt(0));
    if(typeof DecompressionStream==='undefined') throw new Error('Tu navegador no soporta DecompressionStream');
    const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    const code=await new Response(stream).text();
    const script=document.createElement('script');
    script.textContent=code;
    document.documentElement.appendChild(script);
    script.remove();
  }catch(error){
    console.error('No se pudo cargar el glosario interactivo de Química Biológica',error);
  }
})();
