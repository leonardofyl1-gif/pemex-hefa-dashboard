(()=>{
  const replacements=[
    [/Degumming \/ desgomado/g,'Degumming (desgomado)'],
    [/degumming \/ desgomado/g,'Degumming (desgomado)'],
    [/Bleaching \/ filtración avanzada/g,'Bleaching (blanqueo) / Advanced filtration (filtración avanzada)'],
    [/bleaching\/filtración avanzada/g,'Bleaching (blanqueo) / Advanced filtration (filtración avanzada)'],
    [/Secado \/ drying/g,'Drying (secado)'],
    [/secado \/ drying/g,'Drying (secado)'],
    [/Filtración de pulido \/ polishing/g,'Polishing filtration (filtración de pulido)'],
    [/filtración de pulido \/ polishing/g,'Polishing filtration (filtración de pulido)'],
    [/Filtración fina \/ polishing/g,'Polishing filtration (filtración de pulido)'],
    [/Degumming:/g,'Degumming (desgomado):'],
    [/Bleaching:/g,'Bleaching (blanqueo):'],
    [/Secado:/g,'Drying (secado):'],
    [/Polishing:/g,'Polishing filtration (filtración de pulido):'],
    [/Sección de hydrotreatment Vegan/g,'Hydrotreatment (hidrotratamiento) · Vegan'],
    [/Sección de hidroisomerización Vegan/g,'Hydroisomerization (hidroisomerización) · Vegan'],
    [/Enfriamiento, fraccionamiento y blending/g,'Cooling (enfriamiento), Fractionation (fraccionamiento) y Blending (mezcla)'],
    [/Hidrodesoxigenación \(HDO\)/g,'Hydrodeoxygenation — HDO (hidrodesoxigenación)'],
    [/Isomerización \/ dewaxing/g,'Hydroisomerization (hidroisomerización) / Dewaxing (desparafinado)']
  ];

  const setTitle=(panel,no,title)=>{
    const el=[...panel.querySelectorAll('.step-no')].find(n=>n.textContent.trim()===no);
    const h=el?.closest('.col')?.querySelector('h3');
    if(h) h.textContent=title;
  };

  const replaceTextNodes=(root)=>{
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      let value=node.nodeValue;
      replacements.forEach(([from,to])=>{value=value.replace(from,to);});
      if(value!==node.nodeValue) node.nodeValue=value;
    });
  };

  const normalizeEco=(panel)=>{
    if(panel.dataset.terminologyV28==='true') return;
    setTitle(panel,'01','Rendering (procesamiento de subproductos animales)');
    setTitle(panel,'02','HVO/HEFA Pretreatment (pretratamiento HVO/HEFA) · fuera de Tula');
    setTitle(panel,'04','Degumming (desgomado)');
    setTitle(panel,'05','Bleaching (blanqueo)');
    setTitle(panel,'06','Hydrodeoxygenation — HDO (hidrodesoxigenación)');
    setTitle(panel,'07','Isomerization (isomerización)');
    replaceTextNodes(panel);
    panel.dataset.terminologyV28='true';
  };

  const normalizeHydro=(panel)=>{
    if(panel.dataset.terminologyV28==='true'||!panel.querySelector('.eco-scroll')) return false;
    setTitle(panel,'01','Rendering (procesamiento de subproductos animales)');
    setTitle(panel,'04.1','Degumming (desgomado)');
    setTitle(panel,'04.2','Bleaching (blanqueo) / Advanced filtration (filtración avanzada)');
    setTitle(panel,'04.3','Drying (secado)');
    setTitle(panel,'04.4','Polishing filtration (filtración de pulido)');
    setTitle(panel,'05','Guard bed (lecho de guarda) + Graded bed (lecho graduado)');
    setTitle(panel,'07','Hydrodeoxygenation — HDO (hidrodesoxigenación)');
    setTitle(panel,'08','Hydroisomerization (hidroisomerización) / Dewaxing (desparafinado)');
    replaceTextNodes(panel);
    panel.dataset.terminologyV28='true';
    return true;
  };

  const normalizeVegan=(panel)=>{
    if(panel.dataset.terminologyV28==='true'||!panel.querySelector('.eco-scroll')) return false;
    setTitle(panel,'01','Rendering (procesamiento de subproductos animales)');
    setTitle(panel,'02','External feedstock pretreatment (pretratamiento externo del feedstock)');
    setTitle(panel,'05','Hydrotreatment (hidrotratamiento) · Vegan');
    setTitle(panel,'06','Hydroisomerization (hidroisomerización) · Vegan');
    setTitle(panel,'07','Cooling (enfriamiento), Fractionation (fraccionamiento) y Blending (mezcla)');
    replaceTextNodes(panel);
    panel.dataset.terminologyV28='true';
    return true;
  };

  const eco=document.querySelector('[data-process="ecofining"]')||document.querySelector('.ecofining-board');
  if(eco) normalizeEco(eco);

  let attempts=0;
  const timer=setInterval(()=>{
    attempts+=1;
    const hydro=document.querySelector('[data-process="hydroflex"]');
    const vegan=document.querySelector('[data-process="vegan"]');
    const hydroDone=hydro ? normalizeHydro(hydro) || hydro.dataset.terminologyV28==='true' : false;
    const veganDone=vegan ? normalizeVegan(vegan) || vegan.dataset.terminologyV28==='true' : false;
    if((hydroDone&&veganDone)||attempts>=80){
      clearInterval(timer);
      document.title='Feedstock Process Dashboard BIARAI v28 — Terminología estandarizada';
      const eyebrow=document.querySelector('.eyebrow');
      if(eyebrow) eyebrow.textContent='Criterios técnicos · Terminología estandarizada · v28';
    }
  },100);
})();
