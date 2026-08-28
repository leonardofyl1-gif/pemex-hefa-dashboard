/* Preserved source: v28-safe-terminology-standard.js */
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

/* Preserved source: v29-ecofining-pretreatment-substeps.js */
(()=>{
  const eco=document.querySelector('.ecofining-board');
  if(!eco||eco.dataset.pretreatmentV29==='true') return;

  const strip=eco.querySelector('.eco-strip');
  const strip2=eco.querySelector('.eco-strip2');
  const canvas=eco.querySelector('.eco-canvas');
  if(!strip||!strip2||!canvas) return;

  const cols=[...strip.children];
  const step02=cols.find(col=>col.querySelector?.('.step-no')?.textContent.trim()==='02');
  if(!step02) return;

  const style=document.createElement('style');
  style.textContent=`
    .ecofining-board .eco-canvas.eco-v29-canvas{min-width:4920px}
    .ecofining-board .eco-strip.eco-v29-strip,
    .ecofining-board .eco-strip2.eco-v29-strip2{grid-template-columns:repeat(12,minmax(410px,1fr))}
    .eco-pretreatment-group{grid-column:span 4;display:grid;grid-template-rows:auto 1fr;background:linear-gradient(180deg,var(--surface),var(--pre-soft) 260%);box-shadow:inset 0 4px 0 var(--pre);border-right:1px solid var(--line)}
    .eco-pretreatment-parent{padding:14px 16px 13px;border-bottom:1px solid var(--line);background:linear-gradient(90deg,var(--surface),var(--pre-soft),var(--surface))}
    .eco-pretreatment-parent .parent-head{display:flex;align-items:flex-start;gap:12px}
    .eco-pretreatment-parent .parent-no{font-family:var(--font-display);font-size:13px;font-weight:900;color:var(--pre);padding:5px 8px;border-radius:999px;background:var(--pre-soft);white-space:nowrap}
    .eco-pretreatment-parent h3{font-family:var(--font-display);font-size:16px;line-height:1.2;color:var(--blue-1);margin:2px 0 6px}
    .eco-pretreatment-parent p{font-size:var(--text-xs);line-height:1.45;color:var(--text-soft);margin:0;max-width:120ch}
    .eco-pretreatment-subgrid{display:grid;grid-template-columns:repeat(4,minmax(410px,1fr))}
    .eco-pretreatment-subgrid .col{min-width:0;background:linear-gradient(180deg,var(--surface),var(--pre-soft) 310%);box-shadow:inset 0 4px 0 var(--pre)}
    .eco-pretreatment-subgrid .col:not(:last-child){border-right:1px solid var(--line)}
    .eco-pretreatment-subgrid .macro-subtitle{display:inline-flex;margin-bottom:8px;padding:5px 8px;border-radius:999px;background:var(--pre-soft);color:var(--pre);font-size:10px;font-weight:800;letter-spacing:.03em}
    .eco-pretreatment-control{grid-column:span 4;background:linear-gradient(180deg,#FBFDFE,var(--pre-soft) 350%)}
    .eco-pretreatment-control .checkpoint-decision{background:var(--pre-soft);border-color:var(--line)}
    @media(max-width:900px){.ecofining-board .eco-canvas.eco-v29-canvas{min-width:4920px}}
  `;
  document.head.appendChild(style);

  const group=document.createElement('div');
  group.className='eco-pretreatment-group';
  group.innerHTML=`
    <div class="eco-pretreatment-parent">
      <div class="parent-head">
        <span class="parent-no">02</span>
        <div>
          <h3>HVO/HEFA Pretreatment (pretratamiento HVO/HEFA) · fuera de Tula</h3>
          <p>Este bloque agrupa el <strong>pretratamiento HVO/HEFA del feedstock</strong>, formado por las etapas de degumming, bleaching, secado y filtración de pulido, que limpian la grasa antes de la conversión HEFA.</p>
        </div>
      </div>
    </div>
    <div class="eco-pretreatment-subgrid">
      <article class="col type-pre">
        <div class="macro-subtitle">02 · HVO/HEFA Pretreatment</div>
        <div class="step-no">02.1</div>
        <h3>Degumming (desgomado)</h3>
        <div class="desc dual-desc">
          <div class="desc-point"><b>Proceso físico:</b> La grasa se mezcla con agua y/o ácidos suaves y después pasa por separación o centrifugación para retirar una fase que concentra <strong>gomas y fosfolípidos</strong>.</div>
          <div class="desc-point"><b>Proceso químico:</b> En el <strong>Degumming (desgomado)</strong>, los fosfolípidos se hidratan o se convierten en gomas que son más fáciles de separar del aceite. Así se reducen fosfolípidos, gomas y parte del fósforo y metales asociados, mejorando la limpieza antes de las etapas siguientes.</div>
        </div>
        <div class="type-tags"><span class="type-tag pre"><i></i>Pretratamiento · 1/4</span></div>
      </article>
      <article class="col type-pre">
        <div class="macro-subtitle">02 · HVO/HEFA Pretreatment</div>
        <div class="step-no">02.2</div>
        <h3>Bleaching (blanqueo) / Advanced filtration (filtración avanzada)</h3>
        <div class="desc dual-desc">
          <div class="desc-point"><b>Proceso físico:</b> La grasa entra en contacto con <strong>tierras o arcillas activadas</strong> y, después del tiempo de contacto, el adsorbente cargado de contaminantes se retira mediante filtración.</div>
          <div class="desc-point"><b>Proceso químico:</b> En el <strong>Bleaching (blanqueo)</strong>, predominan la <strong>adsorción de fósforo residual, metales y otros compuestos</strong> sobre la superficie del adsorbente. Esta etapa reduce contaminantes traza que podrían dañar el catalizador en el proceso Ecofining.</div>
        </div>
        <div class="type-tags"><span class="type-tag pre"><i></i>Pretratamiento · 2/4</span></div>
      </article>
      <article class="col type-pre">
        <div class="macro-subtitle">02 · HVO/HEFA Pretreatment</div>
        <div class="step-no">02.3</div>
        <h3>Drying (secado)</h3>
        <div class="desc dual-desc">
          <div class="desc-point"><b>Proceso físico:</b> Se reduce la <strong>humedad residual del feedstock</strong> mediante secado —por temperatura, vacío u otra configuración de ingeniería— para entregar una corriente más seca.</div>
          <div class="desc-point"><b>Proceso químico:</b> No se busca una reacción química; el objetivo es retirar agua libre y agua disuelta para que el feedstock sea más estable y adecuado para el siguiente paso del proceso.</div>
        </div>
        <div class="type-tags"><span class="type-tag pre"><i></i>Pretratamiento · 3/4</span></div>
      </article>
      <article class="col type-pre">
        <div class="macro-subtitle">02 · HVO/HEFA Pretreatment</div>
        <div class="step-no">02.4</div>
        <h3>Polishing filtration (filtración de pulido)</h3>
        <div class="desc dual-desc">
          <div class="desc-point"><b>Proceso físico:</b> El feedstock atraviesa una <strong>filtración fina final</strong> para retirar partículas muy pequeñas —finos— que hayan permanecido después del desgomado, el blanqueo y el secado.</div>
          <div class="desc-point"><b>Proceso químico:</b> No se busca una reacción química; la función es física y consiste en reducir al mínimo los sólidos residuales antes de la sección catalítica.</div>
        </div>
        <div class="type-tags"><span class="type-tag pre"><i></i>Pretratamiento · 4/4</span></div>
      </article>
    </div>`;

  step02.replaceWith(group);

  const stages=[...strip2.children];
  const stage02=stages[1];
  if(stage02){
    stage02.classList.add('eco-pretreatment-control');
    const title=stage02.querySelector('.panel-title');
    if(title) title.textContent='Punto de control · bloque 02 completo';
    const explain=stage02.querySelector('.stage-explain');
    if(explain) explain.innerHTML='Este paso define los <strong>requisitos mínimos de limpieza</strong> que la tecnología Ecofining necesita: sólidos, plásticos, fósforo, metales y otros contaminantes que deben filtrarse, eliminarse o reducirse. <strong>El pretratamiento ocurre fuera de Tula y no es operado directamente por PEMEX.</strong> Su cumplimiento se verifica más adelante en Tula mediante las pruebas de recepción y el checkpoint técnico HEFA, no dentro de 02.1–02.4.';
  }

  canvas.classList.add('eco-v29-canvas');
  strip.classList.add('eco-v29-strip');
  strip2.classList.add('eco-v29-strip2');
  eco.dataset.pretreatmentV29='true';

  requestAnimationFrame(()=>{
    const flow=eco.querySelector('.scroll.eco-scroll');
    const track=eco.previousElementSibling?.querySelector?.('.flow-top-scroll-track') || eco.querySelector('.flow-top-scroll-track');
    if(flow&&track) track.style.width=`${flow.scrollWidth}px`;
    window.dispatchEvent(new Event('resize'));
  });
})();

/* Preserved source: v35-technology-descriptions.js */
(()=>{
  const style=document.createElement('style');
  style.textContent=`
    .technology-description{margin-top:14px;padding:15px 17px;border:1px solid var(--line);border-radius:14px;background:linear-gradient(180deg,var(--surface),var(--surface-2));color:var(--text-soft);font-size:var(--text-sm);line-height:1.55;max-width:1200px}
    .technology-description p{margin:0}
    .technology-description p+p{margin-top:10px}
    .technology-description strong{color:var(--blue-1)}
    .technology-description .technology-description-label{display:inline-flex;margin-bottom:8px;padding:5px 9px;border-radius:999px;background:var(--blue-5);color:var(--blue-6);font-size:10px;font-weight:800;letter-spacing:.05em;text-transform:uppercase}
  `;
  document.head.appendChild(style);

  const descriptions={
    ecofining:`
      <span class="technology-description-label">Descripción de la tecnología</span>
      <p>Ecofining™ es una tecnología HEFA desarrollada por Honeywell UOP y Eni para producir diésel renovable y SAF a partir de aceites y grasas residuales, incluyendo aceites usados y grasas animales. Se caracteriza por un <strong>esquema relativamente compacto</strong> donde el pretratamiento —con Degumming (desgomado) y Bleaching (blanqueo)— y la sección de hidrogenación/isomerización están muy integrados para maximizar rendimiento a diésel/jet y eficiencia energética.</p>
      <p>Frente a HydroFlex y Vegan, Ecofining suele verse como la <strong>opción “probada en muchas refinerías” con foco en eficiencia y rendimiento</strong>: lleva más de una década en servicio comercial y tiene múltiples casos de conversión de refinerías fósiles a renovables. Es especialmente atractiva cuando el portafolio de feedstocks está más acotado —aceites usados y algunas grasas— y se prioriza rendimiento y aprovechamiento de activos existentes.</p>`,
    hydroflex:`
      <span class="technology-description-label">Descripción de la tecnología</span>
      <p>HydroFlex™ es una tecnología HEFA de Topsoe que permite convertir una gama muy amplia de grasas y aceites —sebos animales, aceites usados, tall oil, aceites vegetales y otros feedstocks renovables— en diésel renovable y SAF “drop-in”. Su gran sello es la <strong>flexibilidad de feedstock</strong>: está pensada para manejar materias primas difíciles mediante un esquema robusto de guard beds y catalizadores que ayudan a capturar fósforo y metales antes del catalizador principal.</p>
      <p>En comparación con las otras tecnologías, HydroFlex suele presentarse como la opción <strong>“todoterreno”</strong>: procesa una gama muy amplia de grasas y aceites y puede integrarse tanto en unidades nuevas como en reconversiones de refinerías existentes. Es especialmente relevante cuando el proyecto contempla una mezcla amplia de residuos —como UCO, sebo, FOG u otros aceites residuales— y necesita tolerar variaciones importantes en la calidad del feedstock.</p>`,
    vegan:`
      <span class="technology-description-label">Descripción de la tecnología</span>
      <p>Vegan® es la tecnología HEFA de Axens para producir diésel renovable y SAF a partir de una amplia gama de lípidos —aceites vegetales, UCO, grasas animales y otros residuos grasos—. Axens la presenta como una <strong>solución modular de nueva generación</strong>, combinando un tren de pretratamiento flexible con Hydrotreatment (hidrotratamiento) e Hydroisomerization (hidroisomerización) optimizados para producir SAF cuando el proyecto lo requiere.</p>
      <p>Comparada con HydroFlex y Ecofining, Vegan suele posicionarse como una <strong>opción muy enfocada en maximizar SAF y en esquemas HEFA de nueva generación</strong>. Es especialmente interesante cuando el objetivo estratégico del proyecto es alcanzar una participación alta de SAF dentro del total de productos.</p>`
  };

  function insert(panel,key){
    if(!panel||panel.dataset.techDescriptionV35==='true') return false;
    const head=panel.querySelector('.board-head');
    if(!head) return false;
    const route=head.querySelector('p');
    if(!route) return false;
    const box=document.createElement('div');
    box.className='technology-description';
    box.innerHTML=descriptions[key];
    route.insertAdjacentElement('afterend',box);
    panel.dataset.techDescriptionV35='true';
    return true;
  }

  let attempts=0;
  const timer=setInterval(()=>{
    attempts+=1;
    insert(document.querySelector('.ecofining-board'),'ecofining');
    insert(document.querySelector('[data-process="hydroflex"]'),'hydroflex');
    insert(document.querySelector('[data-process="vegan"]'),'vegan');
    const done=document.querySelector('.ecofining-board')?.dataset.techDescriptionV35==='true' && document.querySelector('[data-process="hydroflex"]')?.dataset.techDescriptionV35==='true' && document.querySelector('[data-process="vegan"]')?.dataset.techDescriptionV35==='true';
    if(done||attempts>=100) clearInterval(timer);
  },100);
})();

/* Preserved source: v37-ecofining-separation-fractionation.js */
(()=>{
  const eco=document.querySelector('.ecofining-board');
  if(!eco||eco.dataset.separationV37==='true') return;

  const strip=eco.querySelector('.eco-strip');
  const strip2=eco.querySelector('.eco-strip2');
  const canvas=eco.querySelector('.eco-canvas');
  if(!strip||!strip2||!canvas) return;

  const existing=[...strip.querySelectorAll(':scope > .col')].find(col=>col.querySelector('.step-no')?.textContent.trim()==='08');
  if(existing) return;

  const step07=[...strip.querySelectorAll(':scope > .col')].find(col=>col.querySelector('.step-no')?.textContent.trim()==='07');
  if(!step07) return;

  const style=document.createElement('style');
  style.textContent=`
    .ecofining-board .eco-canvas.eco-v37-canvas{min-width:5330px}
    .ecofining-board .eco-strip.eco-v37-strip,
    .ecofining-board .eco-strip2.eco-v37-strip2{grid-template-columns:repeat(13,minmax(410px,1fr))}
    @media(max-width:900px){.ecofining-board .eco-canvas.eco-v37-canvas{min-width:5330px}}
  `;
  document.head.appendChild(style);

  const step08=document.createElement('article');
  step08.className='col conversion-col';
  step08.innerHTML=`
    <div class="step-no">08</div>
    <h3>Separation / Fractionation (separación y fraccionamiento)</h3>
    <div class="desc dual-desc">
      <div class="desc-point"><b>Proceso físico (separa los hidrocarburos según su punto de ebullición):</b> La corriente de hidrocarburos isomerizados se enfría y pasa por un tren de separación (separador gas‑líquido y columnas de destilación). Ahí se divide en distintos cortes según su punto de ebullición.</div>
      <div class="desc-point"><b>Proceso químico:</b> No ocurre ninguna reacción química; es una separación física por temperatura de ebullición. Se obtienen las fracciones finales: gases ligeros/propano, nafta, SAF (combustible de aviación sostenible) y diésel renovable, cada una con su especificación comercial.</div>
    </div>
    <div class="type-tags"><span class="type-tag conversion"><i></i>Terminación de producto Ecofining</span></div>`;
  step07.insertAdjacentElement('afterend',step08);

  const lower08=document.createElement('section');
  lower08.className='stage muted-stage';
  lower08.innerHTML=`
    <div class="panel-title">Conversión química</div>
    <div class="stage-explain">La materia prima lipídica para SAF (grasas, aceites y sebos) ya fue convertida en hidrocarburos. En configuración de dos etapas y modo máximo SAF, aproximadamente <strong>75–80% del producto líquido final se obtiene como SAF (corte jet)</strong>, complementado con diésel renovable, nafta y una fracción de gases ligeros.</div>`;
  strip2.appendChild(lower08);

  canvas.classList.add('eco-v37-canvas');
  strip.classList.add('eco-v37-strip');
  strip2.classList.add('eco-v37-strip2');
  eco.dataset.separationV37='true';

  requestAnimationFrame(()=>{
    const flow=eco.querySelector('.scroll.eco-scroll');
    const track=eco.previousElementSibling?.querySelector?.('.flow-top-scroll-track') || eco.querySelector('.flow-top-scroll-track');
    if(flow&&track) track.style.width=`${flow.scrollWidth}px`;
    window.dispatchEvent(new Event('resize'));
  });
})();

/* Preserved source: v38-ecofining-stage-labels.js */
(()=>{
  const eco=document.querySelector('.ecofining-board');
  if(!eco||eco.dataset.stageLabelsV38==='true') return;

  const strip=eco.querySelector('.eco-strip');
  const strip2=eco.querySelector('.eco-strip2');
  if(!strip||!strip2) return;

  const topLevel=[...strip.children];
  const step06=topLevel.find(el=>el.querySelector?.('.step-no')?.textContent.trim()==='06');
  const step07=topLevel.find(el=>el.querySelector?.('.step-no')?.textContent.trim()==='07');

  if(step06){
    const title06=step06.querySelector('h3');
    if(title06) title06.textContent='Stage 1 – Hydrodeoxygenation — HDO (hidrodesoxigenación)';
  }

  if(step07){
    const title07=step07.querySelector('h3');
    if(title07) title07.textContent='Stage 2 – Isomerization (isomerización)';
  }

  const lowerStages=[...strip2.children];
  // Visual mapping after the 02 parent span remains:
  // 0=01, 1=02, 2=03, 3=03b, 4=04, 5=05, 6=05b, 7=06, 8=07, 9=08.
  const lower06=lowerStages[7];
  if(lower06){
    const panelTitle=lower06.querySelector('.panel-title');
    const explain=lower06.querySelector('.stage-explain');
    if(panelTitle) panelTitle.textContent='Conversión química';
    if(explain) explain.innerHTML='En este punto la materia prima lipídica dejó de definirse por especificación de feedstock y empieza a definirse por cómo se transforma en hidrocarburos. <strong>Stage 1 (HDO)</strong> elimina oxígeno y contaminantes, y <strong>Stage 2 (isomerización)</strong> ajusta la estructura de las parafinas para que el producto final pueda orientarse a diésel renovable o a modo máximo SAF (corte jet).';
  }

  eco.dataset.stageLabelsV38='true';
})();

/* Preserved source: v39-ecofining-hdo-balance-text.js */
(()=>{
  const eco=document.querySelector('.ecofining-board');
  if(!eco||eco.dataset.hdoBalanceV39==='true') return;

  const strip=eco.querySelector('.eco-strip');
  const strip2=eco.querySelector('.eco-strip2');
  if(!strip||!strip2) return;

  const topLevel=[...strip.children];
  const step06=topLevel.find(el=>el.querySelector?.('.step-no')?.textContent.trim()==='06');
  if(step06){
    const physicalHeader=step06.querySelector('.desc-point:first-child b');
    if(physicalHeader) physicalHeader.textContent='Proceso físico (elimina el oxígeno de la grasa usando hidrógeno):';
  }

  const step08=topLevel.find(el=>el.querySelector?.('.step-no')?.textContent.trim()==='08');
  const lowerStages=[...strip2.children];
  const lower08=step08 ? lowerStages[9] : null;
  if(lower08){
    const panelTitle=lower08.querySelector('.panel-title');
    const explain=lower08.querySelector('.stage-explain');
    if(panelTitle?.textContent.trim().toLowerCase()==='conversión química'&&explain){
      explain.textContent='La materia prima lipídica para SAF (grasas, aceites y sebos) ya fue convertida en hidrocarburos a través de Stage 1 (HDO) y Stage 2 (isomerización). Del 100% del producto líquido que sale de Ecofining en modo máximo SAF, aproximadamente 75–80% termina como SAF (corte jet), y el 20–25% restante se reparte entre diésel renovable, nafta y una fracción de gases ligeros (principalmente propano).';
    }
  }

  eco.dataset.hdoBalanceV39='true';
})();

/* Preserved source: v40-ecofining-stage2-physical-header.js */
(()=>{
  const eco=document.querySelector('.ecofining-board');
  if(!eco||eco.dataset.stage2HeaderV40==='true') return;

  const strip=eco.querySelector('.eco-strip');
  if(!strip) return;

  const step07=[...strip.children].find(el=>el.querySelector?.('.step-no')?.textContent.trim()==='07');
  if(!step07) return;

  const physicalHeader=step07.querySelector('.desc-point:first-child b');
  if(physicalHeader){
    physicalHeader.textContent='Proceso físico (transforma parafinas lineales en parafinas ramificadas para mejorar el comportamiento en frío):';
  }

  eco.dataset.stage2HeaderV40='true';
})();

/* Preserved source: v41-vegan-stage-labels-product-balance.js */
(()=>{
  const apply=()=>{
    const vegan=document.querySelector('.vegan-board');
    if(!vegan||vegan.dataset.stageLabelsProductV41==='true') return false;

    const strip=vegan.querySelector('.vegan-strip');
    const strip2=vegan.querySelector('.vegan-strip2');
    if(!strip||!strip2) return false;

    const topLevel=[...strip.children];
    const step05=topLevel.find(el=>el.querySelector?.('.step-no')?.textContent.trim()==='05');
    const step06=topLevel.find(el=>el.querySelector?.('.step-no')?.textContent.trim()==='06');

    if(!step05||!step06) return false;

    const title05=step05.querySelector('h3');
    if(title05) title05.textContent='Stage 1 – Hydrotreatment (hidrotratamiento) · Vegan';
    const physical05=step05.querySelector('.desc-point:first-child b');
    if(physical05) physical05.textContent='Proceso físico (elimina el oxígeno de los lípidos con hidrógeno y forma parafinas lineales):';

    const title06=step06.querySelector('h3');
    if(title06) title06.textContent='Stage 2 – Hydroisomerization (hidroisomerización) · Vegan';
    const physical06=step06.querySelector('.desc-point:first-child b');
    if(physical06) physical06.textContent='Proceso físico (convierte parafinas lineales en parafinas ramificadas y ajusta el balance entre diésel renovable y SAF):';

    const productStage=[...strip2.children].find(stage=>stage.querySelector?.('.panel-title')?.textContent.trim().toLowerCase()==='producto');
    if(productStage){
      const explain=productStage.querySelector('.stage-explain');
      if(explain){
        explain.textContent='Se separan y terminan las fracciones para obtener renewable diesel y SAF. En modo de máxima producción de SAF, del 100% del producto líquido que sale de Vegan aproximadamente 75–80% termina como SAF (corte jet), y el 20–25% restante se reparte entre diésel renovable, nafta y una fracción de gases ligeros (principalmente propano). Estos porcentajes pueden variar según la configuración de operación y el blending comercial.';
      }
    }

    vegan.dataset.stageLabelsProductV41='true';
    return true;
  };

  if(apply()) return;
  let tries=0;
  const timer=setInterval(()=>{
    tries+=1;
    if(apply()||tries>=240) clearInterval(timer);
  },250);
})();

/* Preserved source: v42-final-product-labels.js */
(()=>{
  const applyEco=()=>{
    const eco=document.querySelector('.ecofining-board');
    if(!eco||eco.dataset.finalProductLabelsV42==='true') return !!eco;

    const strip=eco.querySelector('.eco-strip');
    if(!strip) return false;

    const step08=[...strip.children].find(el=>el.querySelector?.('.step-no')?.textContent.trim()==='08');
    if(!step08) return false;

    const title08=step08.querySelector('h3');
    if(title08) title08.textContent='Separation / Fractionation (separación y fraccionamiento en gases, nafta, SAF y diésel renovable)';

    const physical08=step08.querySelector('.desc-point:first-child b');
    if(physical08) physical08.textContent='Proceso físico (separa los hidrocarburos según su punto de ebullición en gases, nafta, SAF y diésel renovable):';

    eco.dataset.finalProductLabelsV42='true';
    return true;
  };

  const applyVegan=()=>{
    const vegan=document.querySelector('.vegan-board');
    if(!vegan||vegan.dataset.finalProductLabelsV42==='true') return !!vegan;
    if(vegan.dataset.terminologyV28!=='true'||vegan.dataset.stageLabelsProductV41!=='true') return false;

    const strip=vegan.querySelector('.vegan-strip');
    if(!strip) return false;

    const step07=[...strip.children].find(el=>el.querySelector?.('.step-no')?.textContent.trim()==='07');
    if(!step07) return false;

    const title07=step07.querySelector('h3');
    if(title07) title07.textContent='Cooling (enfría las corrientes), Fractionation (separa en cortes de producto) y Blending (mezcla para alcanzar la especificación comercial)';

    const physical07=step07.querySelector('.desc-point:first-child b');
    if(physical07) physical07.textContent='Proceso físico (enfría y separa las corrientes en cortes de producto antes del blending):';

    vegan.dataset.finalProductLabelsV42='true';
    return true;
  };

  applyEco();
  if(applyVegan()) return;

  let tries=0;
  const timer=setInterval(()=>{
    tries+=1;
    applyEco();
    if(applyVegan()||tries>=240) clearInterval(timer);
  },250);
})();

/* Preserved source: v52-ecofining-controlled-blending.js */
(()=>{
  const eco=document.querySelector('.ecofining-board');
  if(!eco||eco.dataset.controlledBlendingV52==='true') return;

  const strip=eco.querySelector('.eco-strip');
  const strip2=eco.querySelector('.eco-strip2');
  const canvas=eco.querySelector('.eco-canvas');
  if(!strip||!strip2||!canvas) return;

  const topLevel=[...strip.children];
  if(topLevel.some(el=>el.querySelector?.('.step-no')?.textContent.trim()==='03c')) return;

  const step03b=topLevel.find(el=>el.querySelector?.('.step-no')?.textContent.trim()==='03b');
  const lower03b=strip2.querySelector('.commercial-stage');
  if(!step03b||!lower03b) return;

  const style=document.createElement('style');
  style.textContent=`
    .ecofining-board .eco-canvas.eco-v52-canvas{min-width:5740px}
    .ecofining-board .eco-strip.eco-v52-strip,
    .ecofining-board .eco-strip2.eco-v52-strip2{grid-template-columns:repeat(14,minmax(410px,1fr))}
    .eco-controlled-blend-col{background:linear-gradient(180deg,var(--surface),#FFF7E8 285%);box-shadow:inset 0 5px 0 #E6A23C}
    .eco-controlled-blend-stage{background:linear-gradient(180deg,#FFFCF6,#FFF7E8);box-shadow:inset 0 4px 0 #E6A23C}
    .type-tag.controlled-blend{background:#FFF0D4;color:#9A5D00}
    .type-tag.controlled-blend i{display:inline-block;width:8px;height:8px;border-radius:999px;background:#E6A23C}
    .checkpoint-chip.controlled-blend{background:#FFF7E8;border-color:#F1CD91}
    .blend-decision{background:#FFF7E8;border-color:#F1CD91}
    @media(max-width:900px){.ecofining-board .eco-canvas.eco-v52-canvas{min-width:5740px}}
  `;
  document.head.appendChild(style);

  const blend=document.createElement('article');
  blend.className='col eco-controlled-blend-col';
  blend.innerHTML=`
    <div class="step-no">03c</div>
    <h3>Controlled blending (mezcla controlada)</h3>
    <div class="desc dual-desc">
      <div class="desc-point"><b>Proceso físico:</b> Después de liberar cada lote en 03b, grasas renderizadas de distintas especies pueden dosificarse y homogeneizarse en un tanque controlado. Las categorías sanitarias se mantienen segregadas; una mezcla entre categorías adopta la categoría de mayor riesgo.</div>
      <div class="desc-point"><b>Efecto técnico:</b> La mezcla no crea una reacción nueva, pero sí modifica la composición y el comportamiento del feedstock: perfil de ácidos grasos, punto de fusión, viscosidad, FFA, MIU, oxidación, fósforo y metales. Por eso el blend final se muestrea y analiza de nuevo antes del pretratamiento.</div>
    </div>
    <div class="type-tags"><span class="type-tag controlled-blend"><i></i>Operación condicionada a liberación y trazabilidad</span></div>`;
  step03b.insertAdjacentElement('afterend',blend);

  const lowerBlend=document.createElement('section');
  lowerBlend.className='stage eco-controlled-blend-stage';
  lowerBlend.innerHTML=`
    <div class="panel-title">Regla de mezcla y liberación</div>
    <div class="stage-explain"><strong>Categoría sanitaria:</strong> mantener Cat. 1, 2 y 3 en circuitos o campañas segregadas. <strong>Especie animal:</strong> puede mezclarse después del rendering, siempre que cada lote sea elegible, trazable y haya sido liberado contra la especificación de compra. La clasificación Cat. 1/2/3 funciona aquí como referencia sanitaria UE; no implica una equivalencia jurídica mexicana.</div>
    <div class="checkpoint-decision blend-decision"><b>Secuencia de control:</b> liberar cada lote → definir receta de blend → mezclar → muestrear el tanque → verificar la especificación del blend → liberar a pretratamiento. No se permite mezclar para ocultar trazabilidad, diluir contaminación prohibida o reclasificar material.</div>`;
  lower03b.insertAdjacentElement('afterend',lowerBlend);

  const legend=eco.querySelector('.checkpoint-legend');
  if(legend&&!legend.querySelector('.controlled-blend')){
    const chip=document.createElement('div');
    chip.className='checkpoint-chip controlled-blend';
    chip.innerHTML='<b>03c · Mezcla controlada</b><span>lotes liberados + análisis del blend</span>';
    legend.appendChild(chip);
  }

  canvas.classList.add('eco-v52-canvas');
  strip.classList.add('eco-v52-strip');
  strip2.classList.add('eco-v52-strip2');
  eco.dataset.controlledBlendingV52='true';

  requestAnimationFrame(()=>{
    const flow=eco.querySelector('.scroll.eco-scroll');
    const track=eco.previousElementSibling?.querySelector?.('.flow-top-scroll-track')||eco.querySelector('.flow-top-scroll-track');
    if(flow&&track) track.style.width=`${flow.scrollWidth}px`;
    window.dispatchEvent(new Event('resize'));
  });
})();

/* Preserved source: v53-ecofining-blend-criteria-table.js */
(()=>{
  const eco=document.querySelector('.ecofining-board');
  if(!eco||eco.dataset.blendCriteriaV53==='true') return;

  const stage=eco.querySelector('.eco-controlled-blend-stage');
  if(!stage) return;

  const explain=stage.querySelector('.stage-explain');
  const decision=stage.querySelector('.blend-decision');
  if(!explain||!decision) return;

  const style=document.createElement('style');
  style.textContent=`
    .ecofining-board .blend-matrix-details{margin-top:10px;border:1px solid #F1CD91;border-radius:11px;background:#FFFCF6;overflow:hidden}
    .ecofining-board .blend-matrix-details summary{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 11px;cursor:pointer;list-style:none;font-size:var(--text-xs);font-weight:800;color:var(--blue-1);background:#FFF7E8}
    .ecofining-board .blend-matrix-details summary::-webkit-details-marker{display:none}
    .ecofining-board .blend-matrix-details summary::after{content:'+';display:grid;place-items:center;flex:0 0 20px;width:20px;height:20px;border-radius:999px;background:#FFF0D4;color:#9A5D00;font-size:15px;line-height:1}
    .ecofining-board .blend-matrix-details[open] summary::after{content:'−'}
    .ecofining-board .blend-matrix-content{padding:10px}
    .ecofining-board .blend-matrix-heading{margin:2px 0 6px;font-size:10px;line-height:1.3;font-weight:900;letter-spacing:.06em;text-transform:uppercase;color:#9A5D00}
    .ecofining-board .blend-matrix-heading:not(:first-child){margin-top:12px}
    .ecofining-board .blend-matrix-table{width:100%;border-collapse:separate;border-spacing:0;table-layout:fixed;border:1px solid var(--line);border-radius:9px;overflow:hidden;background:#fff;font-size:10px;line-height:1.35;color:var(--text-soft)}
    .ecofining-board .blend-matrix-table th{padding:7px;background:#F5F9FB;color:var(--blue-1);font-weight:800;text-align:left;border-bottom:1px solid var(--line)}
    .ecofining-board .blend-matrix-table th:first-child{width:36%}
    .ecofining-board .blend-matrix-table td{padding:7px;vertical-align:top;border-bottom:1px solid var(--line)}
    .ecofining-board .blend-matrix-table td+td,.ecofining-board .blend-matrix-table th+th{border-left:1px solid var(--line)}
    .ecofining-board .blend-matrix-table tr:last-child td{border-bottom:0}
    .ecofining-board .blend-matrix-table strong{color:var(--blue-1)}
    .ecofining-board .blend-formula,.ecofining-board .blend-source{margin:8px 0 0;padding:8px 9px;border-radius:9px;font-size:10px;line-height:1.4;color:var(--text-soft)}
    .ecofining-board .blend-formula{background:#F2F9FC;border:1px solid var(--proc-soft)}
    .ecofining-board .blend-source{background:#FFF7E8;border:1px solid #F1CD91}
    .ecofining-board .blend-source a{color:#7A4A00;font-weight:800}
  `;
  document.head.appendChild(style);

  explain.innerHTML='La mezcla se controla en dos niveles: <strong>la categoría sanitaria no se promedia</strong> y <strong>la composición técnica sí cambia con cada proporción</strong>. La receta sirve para estimar; la muestra del tanque final decide la liberación.';

  const details=document.createElement('details');
  details.className='blend-matrix-details';
  details.innerHTML=`
    <summary>Ver matriz de mezcla · categorías y variables T01–T27</summary>
    <div class="blend-matrix-content">
      <div class="blend-matrix-heading">1 · Cómo se combinan las categorías</div>
      <table class="blend-matrix-table" aria-label="Reglas de combinación por categoría">
        <thead><tr><th>Combinación</th><th>Resultado y decisión</th></tr></thead>
        <tbody>
          <tr><td><strong>Misma categoría</strong><br>Distintas especies</td><td>Permitida con condición: liberar cada lote, registrar origen y proporción, mezclar y analizar nuevamente el tanque.</td></tr>
          <tr><td><strong>Cat. 2 + Cat. 3</strong></td><td>La mezcla completa se gestiona como <strong>Cat. 2</strong>. Para el proyecto se recomienda mantener las rutas segregadas.</td></tr>
          <tr><td><strong>Cat. 1 + Cat. 2 o 3</strong></td><td>La mezcla completa se gestiona como <strong>Cat. 1</strong>. Para el proyecto se recomienda mantener las rutas segregadas.</td></tr>
          <tr><td><strong>Origen/categoría desconocidos</strong><br>Contaminante prohibido</td><td><strong>No mezclar para corregir.</strong> Inmovilizar y decidir conforme al criterio regulatorio, contractual y técnico aplicable.</td></tr>
        </tbody>
      </table>

      <div class="blend-matrix-heading">2 · Qué variables cambian y cómo se liberan</div>
      <table class="blend-matrix-table" aria-label="Comportamiento de las variables de la Matriz Maestra al mezclar">
        <thead><tr><th>Variables</th><th>Comportamiento del blend</th></tr></thead>
        <tbody>
          <tr><td><strong>Liberación comercial</strong><br>T01, T04–T09, T24</td><td>Contenido lipídico, humedad, impurezas, sólidos, cenizas, FFA y MIU pueden estimarse por balance de masa. <strong>T09 oxidación/estabilidad debe medirse en el blend final</strong>; no se acepta por promedio simple.</td></tr>
          <tr><td><strong>Composición y operación</strong><br>T02, T03, T19, T22</td><td>El perfil de ácidos grasos, C/H, insaturación y oxígeno cambian con la receta. Influyen en fusión, viscosidad, estabilidad y demanda de hidrógeno; se calculan para diseñar la mezcla y se verifican según el plan analítico.</td></tr>
          <tr><td><strong>Compatibilidad HEFA</strong><br>T10–T13, T15–T18, T20, T26–T27</td><td>Fósforo, metales, N, S, sales, silicio, jabones, insaponificables, TAN, Na+K y el umbral de N cambian con cada lote. La estimación sirve para formular; la especificación técnica aplicable define la liberación.</td></tr>
          <tr><td><strong>No diluibles</strong><br>T14, T21, T23</td><td>Otros contaminantes, plásticos/polímeros y pesticidas no deben mezclarse para “pasar” un límite. Su presencia activa aislamiento, investigación o rechazo.</td></tr>
          <tr><td><strong>No corresponde a 03c</strong><br>T25</td><td>El porcentaje de coprocesamiento es la mezcla de feedstock renovable con corriente fósil dentro de un hidrotratador; no es la mezcla de grasas animales en recepción.</td></tr>
        </tbody>
      </table>

      <p class="blend-formula"><strong>Estimación inicial para concentraciones:</strong> X<sub>blend</sub> ≈ Σ(w<sub>i</sub> × X<sub>i</sub>), usando fracciones másicas y resultados comparables —misma unidad, base y método—. El cálculo no sustituye el muestreo representativo del tanque.</p>
      <p class="blend-source"><strong>Alcance sanitario:</strong> Cat. 1/2/3 se usa como referencia UE, no como equivalencia jurídica mexicana. En el alcance actual del estudio, Cat. 3 es la ruta candidata; Cat. 1 y 2 permanecen como exclusión, restricción o contexto hasta validación aplicable. Referencia: <a href="https://eur-lex.europa.eu/eli/reg/2009/1069/oj/eng" target="_blank" rel="noopener">Reglamento (CE) 1069/2009, arts. 8(g) y 9(g)</a>.</p>
    </div>`;

  decision.insertAdjacentElement('beforebegin',details);
  eco.dataset.blendCriteriaV53='true';
})();
