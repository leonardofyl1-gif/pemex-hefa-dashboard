(()=>{
  const step=(panel,no)=>[...panel.querySelectorAll('.step-no')].find(el=>el.textContent.trim()===no)?.closest('.col');
  const setTitle=(panel,no,title)=>{const col=step(panel,no);const h=col?.querySelector('h3');if(h)h.textContent=title;};

  function replaceHTML(root,replacements){
    if(!root) return;
    root.querySelectorAll('p,.desc-point,.stage-explain,.panel-title,.macro-subtitle,.hydro-conditioning-group,.type-tag,.foot').forEach(el=>{
      let html=el.innerHTML;
      replacements.forEach(([from,to])=>{html=html.replace(from,to);});
      el.innerHTML=html;
    });
  }

  function normalizeEco(panel){
    setTitle(panel,'01','Rendering (procesamiento de subproductos animales)');
    setTitle(panel,'02','HVO/HEFA Pretreatment (pretratamiento HVO/HEFA) · fuera de Tula');
    setTitle(panel,'04','Degumming (desgomado)');
    setTitle(panel,'05','Bleaching (blanqueo)');
    setTitle(panel,'06','Hydrodeoxygenation — HDO (hidrodesoxigenación)');
    setTitle(panel,'07','Isomerization (isomerización)');
    replaceHTML(panel,[
      [/degumming\s*\/\s*bleaching/gi,'Degumming (desgomado) / Bleaching (blanqueo)'],
      [/Degumming \+ Bleaching/g,'Degumming (desgomado) + Bleaching (blanqueo)']
    ]);
  }

  function normalizeHydro(panel){
    setTitle(panel,'01','Rendering (procesamiento de subproductos animales)');
    setTitle(panel,'04.1','Degumming (desgomado)');
    setTitle(panel,'04.2','Bleaching (blanqueo) / Advanced filtration (filtración avanzada)');
    setTitle(panel,'04.3','Drying (secado)');
    setTitle(panel,'04.4','Polishing filtration (filtración de pulido)');
    setTitle(panel,'05','Guard bed (lecho de guarda) + Graded bed (lecho graduado)');
    setTitle(panel,'07','Hydrodeoxygenation — HDO (hidrodesoxigenación)');
    setTitle(panel,'08','Hydroisomerization (hidroisomerización) / Dewaxing (desparafinado)');
    replaceHTML(panel,[
      [/Degumming, Bleaching, Secado y Filtración de pulido/g,'Degumming (desgomado), Bleaching (blanqueo), Drying (secado) y Polishing filtration (filtración de pulido)'],
      [/04\.1 Degumming → 04\.2 Bleaching → 04\.3 Secado → 04\.4 Filtración de pulido/g,'04.1 Degumming (desgomado) → 04.2 Bleaching (blanqueo) → 04.3 Drying (secado) → 04.4 Polishing filtration (filtración de pulido)'],
      [/Secado \/ drying/g,'Drying (secado)'],
      [/Filtración de pulido \/ polishing/g,'Polishing filtration (filtración de pulido)'],
      [/Degumming \/ desgomado/g,'Degumming (desgomado)'],
      [/Bleaching \/ filtración avanzada/g,'Bleaching (blanqueo) / Advanced filtration (filtración avanzada)'],
      [/Isomerización \/ dewaxing/g,'Hydroisomerization (hidroisomerización) / Dewaxing (desparafinado)']
    ]);
  }

  function normalizeVegan(panel){
    setTitle(panel,'01','Rendering (procesamiento de subproductos animales)');
    setTitle(panel,'02','External feedstock pretreatment (pretratamiento externo del feedstock)');
    setTitle(panel,'05','Hydrotreatment (hidrotratamiento) · Vegan');
    setTitle(panel,'06','Hydroisomerization (hidroisomerización) · Vegan');
    setTitle(panel,'07','Cooling (enfriamiento), Fractionation (fraccionamiento) y Blending (mezcla)');
    replaceHTML(panel,[
      [/degumming, bleaching\/filtración avanzada, secado y filtración fina/gi,'Degumming (desgomado), Bleaching (blanqueo) / Advanced filtration (filtración avanzada), Drying (secado) y Polishing filtration (filtración de pulido)'],
      [/<strong>Degumming:<\/strong>/g,'<strong>Degumming (desgomado):</strong>'],
      [/<strong>Bleaching:<\/strong>/g,'<strong>Bleaching (blanqueo):</strong>'],
      [/<strong>Secado:<\/strong>/g,'<strong>Drying (secado):</strong>'],
      [/<strong>Polishing:<\/strong>/g,'<strong>Polishing filtration (filtración de pulido):</strong>'],
      [/hacia hydrotreatment/g,'hacia Hydrotreatment (hidrotratamiento)'],
      [/mediante blending/g,'mediante Blending (mezcla)'],
      [/Hidroisomerización/g,'Hydroisomerization (hidroisomerización)']
    ]);
    const s06=step(panel,'06');
    const tag=s06?.querySelector('.type-tag');
    if(tag) tag.innerHTML='<i></i>Hydroisomerization (hidroisomerización)';
  }

  function normalizeAll(){
    const eco=document.querySelector('[data-process="ecofining"]');
    const hydro=document.querySelector('[data-process="hydroflex"]');
    const vegan=document.querySelector('[data-process="vegan"]');
    if(eco) normalizeEco(eco);
    if(hydro?.querySelector('.eco-scroll')) normalizeHydro(hydro);
    if(vegan?.querySelector('.eco-scroll')) normalizeVegan(vegan);

    const complete=eco?.querySelector('.eco-scroll')&&hydro?.querySelector('.eco-scroll')&&vegan?.querySelector('.eco-scroll');
    if(complete){
      document.title='Feedstock Process Dashboard BIARAI v27 — Terminología estandarizada';
      const eyebrow=document.querySelector('.eyebrow');
      if(eyebrow) eyebrow.textContent='Criterios técnicos · Terminología estandarizada · v27';
      return true;
    }
    return false;
  }

  if(normalizeAll()) return;
  const observer=new MutationObserver(()=>{
    if(normalizeAll()) observer.disconnect();
  });
  observer.observe(document.documentElement,{subtree:true,childList:true});
})();
