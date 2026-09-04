/* Preserved source: v19-split-t05-t06.js */
(()=>{
  const technicalStage=document.querySelector('.technical-stage .varlist');
  if(!technicalStage) return;

  const combined=[...technicalStage.querySelectorAll('.var')].find(card=>{
    const strong=card.querySelector('strong');
    return strong && strong.textContent.includes('T05 / T06');
  });

  if(combined){
    const t05=document.createElement('div');
    t05.className='var proc';
    t05.innerHTML='<strong>T05 · Impurezas residuales</strong>Material no deseado distinto de la grasa que permanece después del pretratamiento y puede afectar la calidad de alimentación al HDO.<div class="rangerow"><span class="valchip">Límite de entrada por validar</span></div>';

    const t06=document.createElement('div');
    t06.className='var proc';
    t06.innerHTML='<strong>T06 · Sólidos residuales</strong>Partículas finas que permanecen después de la limpieza y filtración final; pueden contribuir a fouling, obstrucción y caída de presión.<div class="rangerow"><span class="valchip">Límite de entrada por validar</span></div>';

    combined.replaceWith(t05,t06);
  }

  document.title='Feedstock Process Dashboard BIARAI v19 — Proceso 1 Ecofining';
  const e=document.querySelector('.eyebrow');
  if(e) e.textContent='Criterios técnicos · Procesos por tecnología · v19';
})();

/* Preserved source: v25-ecofining-variable-placement.js */
(()=>{
  const eco=document.querySelector('.ecofining-board');
  if(!eco) return;

  const commercial=eco.querySelector('.commercial-stage .varlist');
  const technical=eco.querySelector('.technical-stage .varlist');
  if(!commercial||!technical) return;

  const findCard=(root,prefix)=>[...root.querySelectorAll('.var')].find(card=>{
    const strong=card.querySelector('strong');
    return strong && strong.textContent.trim().startsWith(prefix);
  });

  // Approved Ecofining reception placement: move T19, T21 and T23 from 05b to 03b.
  ['T19','T21','T23'].forEach(prefix=>{
    const card=findCard(technical,prefix);
    if(card){
      card.classList.remove('proc');
      card.classList.add('sel');
      commercial.appendChild(card);
    }
  });

  // Reception-specific wording for the variables that moved upstream.
  const t19=findCard(commercial,'T19');
  if(t19){
    const chip=t19.querySelector('.valchip');
    if(chip) chip.textContent='Referencia de recepción por validar';
  }

  // Keep T05 and T06 as separate residual controls at 05b.
  const combined=findCard(technical,'T05 / T06');
  if(combined){
    const t05=document.createElement('div');
    t05.className='var proc';
    t05.innerHTML='<strong>T05 · Impurezas residuales</strong>Material no deseado distinto de la grasa que permanece después del pretratamiento y puede afectar la calidad de alimentación al HDO.<div class="rangerow"><span class="valchip">Límite de entrada por validar</span></div>';
    const t06=document.createElement('div');
    t06.className='var proc';
    t06.innerHTML='<strong>T06 · Sólidos residuales</strong>Partículas finas que permanecen después de la limpieza y filtración final; pueden contribuir a fouling, obstrucción y caída de presión.<div class="rangerow"><span class="valchip">Límite de entrada por validar</span></div>';
    combined.replaceWith(t05,t06);
  }

  // Clarify that T08 is evaluated post-pretreatment at the technical checkpoint.
  const t08=findCard(technical,'T08');
  if(t08){
    const strong=t08.querySelector('strong');
    if(strong) strong.textContent='T08 · FFA post-pretratamiento';
  }

  // Align the process-card descriptions with the approved variable placement.
  const receptionCol=[...eco.querySelectorAll('.eco-strip .col')].find(col=>col.querySelector('.step-no')?.textContent.trim()==='03b');
  if(receptionCol){
    const points=receptionCol.querySelectorAll('.desc-point');
    if(points[1]) points[1].innerHTML='<b>Proceso químico:</b> No se modifica la grasa; se caracteriza el lote recibido mediante humedad, FFA, oxidación, impurezas, azufre, MIU, insaturación, plásticos/polímeros y contaminantes orgánicos específicos, comparando los resultados contra las referencias de recepción aplicables.';
  }

  const technicalCol=[...eco.querySelectorAll('.eco-strip .col')].find(col=>col.querySelector('.step-no')?.textContent.trim()==='05b');
  if(technicalCol){
    const points=technicalCol.querySelectorAll('.desc-point');
    if(points[1]) points[1].innerHTML='<b>Proceso químico:</b> No se busca una nueva reacción; se confirma que fósforo, metales, humedad e impurezas/sólidos residuales, FFA post-pretratamiento, cloruros/sales, silicio/siliconas, jabones, insaponificables, TAN y compuestos oxigenados estén en niveles compatibles con la protección del catalizador y los equipos.';
  }
})();

/* Preserved source: v26-ecofining-step02-pretreatment.js */
(()=>{
  // v55: retired. Step 02 is the feedstock-selection filter in the approved
  // Ecofining sequence; pretreatment remains at steps 04 and 05 in Tula.
  return;
  const eco=document.querySelector('.ecofining-board');
  if(!eco) return;

  const cols=[...eco.querySelectorAll('.eco-strip .col')];
  const step02=cols.find(col=>col.querySelector('.step-no')?.textContent.trim()==='02');
  if(step02){
    step02.classList.remove('type-sel');
    step02.classList.add('type-pre');

    const title=step02.querySelector('h3');
    if(title) title.textContent='Pretratamiento HVO/HEFA (fuera de Tula)';

    const desc=step02.querySelector('.desc');
    if(desc){
      desc.innerHTML=`
        <div class="desc-point"><b>Proceso físico:</b> La grasa renderizada se filtra y limpia mediante filtros, centrifugación y separación para retirar sólidos visibles, restos de plástico o polietileno, partículas de hueso, tierra y otras impurezas físicas.</div>
        <div class="desc-point"><b>Proceso químico:</b> Etapas previas tipo degumming/bleaching ayudan a remover fosfolípidos, fósforo y metales como Ca, Mg, Na, K y Fe, además de reducir sales, siliconas, jabones e insaponificables que podrían dañar el catalizador.</div>
        <div class="desc-point"><b>Antes → Después:</b> Antes: grasa con pedazos, partículas e impurezas. Después: grasa más clara, filtrada y acondicionada para llegar al sistema de PEMEX.</div>`;
    }

    const tags=step02.querySelector('.type-tags');
    if(tags) tags.innerHTML='<span class="type-tag pre"><i></i>Pretratamiento fuera de Tula</span>';
  }

  const stages=[...eco.querySelectorAll('.eco-strip2 .stage')];
  const stage02=stages[1];
  if(stage02){
    const panelTitle=stage02.querySelector('.panel-title');
    if(panelTitle) panelTitle.textContent='Punto de control';
    const explain=stage02.querySelector('.stage-explain');
    if(explain){
      explain.innerHTML='Este paso define los <strong>requisitos mínimos de limpieza</strong> que la tecnología Ecofining necesita: qué se debe filtrar o eliminar, como sólidos, plásticos, fósforo, metales y otros contaminantes. <strong>Ocurre fuera de Tula y no es controlado directamente por PEMEX.</strong> El cumplimiento se verifica más adelante en Tula mediante las pruebas de recepción y el checkpoint técnico HEFA, no aquí.';
    }
  }
})();

/* Preserved source: v20-process-tabs.js */
(async()=>{
  const eco=document.querySelector('.ecofining-board');
  if(!eco) return;

  const style=document.createElement('style');
  style.textContent=`
    .process-tabs-wrap{background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:8px;box-shadow:var(--shadow);display:flex;gap:8px;flex-wrap:wrap;align-items:center}
    .process-tab{appearance:none;border:1px solid transparent;background:transparent;color:var(--text-soft);font-family:var(--font-display);font-size:var(--text-sm);font-weight:800;padding:11px 18px;border-radius:12px;cursor:pointer;transition:.18s ease;display:inline-flex;align-items:center;gap:8px}
    .process-tab:hover{background:var(--surface-2);color:var(--blue-1)}
    .process-tab.active{background:linear-gradient(180deg,var(--blue-2),var(--blue-1));color:#fff;box-shadow:0 7px 18px rgba(26,58,70,.16)}
    .process-tab .tab-no{font-size:10px;letter-spacing:.08em;opacity:.78;text-transform:uppercase}
    .process-panel{display:none!important}
    .process-panel.active{display:block!important}
    .process-placeholder{min-height:430px;display:flex;align-items:center;justify-content:center;padding:42px 22px}
    .process-placeholder-card{max-width:760px;width:100%;text-align:center;padding:42px;border:1px dashed var(--blue-4);background:linear-gradient(180deg,var(--surface),var(--surface-2));border-radius:22px}
    .process-placeholder-card .process-kicker{margin-bottom:8px}
    .process-placeholder-card h2{font-family:var(--font-display);font-size:var(--text-xl);letter-spacing:-.03em;color:var(--blue-1);margin-bottom:10px}
    .process-placeholder-card p{color:var(--text-soft);max-width:65ch;margin:0 auto}
    .process-placeholder-card .pending-tab{display:inline-flex;margin-top:18px;padding:7px 12px;border-radius:999px;background:var(--pend-soft);color:var(--pend);font-size:var(--text-xs);font-weight:800}
    .hydroflex-board .foot,.vegan-board .foot{border-top:1px solid var(--line);padding-top:16px}
    .hydroflex-board .valchip::before,.vegan-board .valchip::before{content:'⏳ '}
    .hydro-boundary-note,.vegan-boundary-note{margin-top:10px}
    .hydro-guard-col{background:linear-gradient(180deg,var(--surface),var(--pre-soft) 300%)}
    .hydroflex-board .hydro-canvas{min-width:4920px}
    .hydroflex-board .hydro-strip,.hydroflex-board .hydro-strip2,.hydroflex-board .hydro-conditioning-band{display:grid;grid-template-columns:repeat(12,minmax(410px,1fr))}
    .hydroflex-board .hydro-strip2{border-top:1px solid var(--line)}
    .hydro-conditioning-band{background:linear-gradient(90deg,var(--surface),var(--pre-soft),var(--surface));border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
    .hydro-conditioning-group{grid-column:5/9;padding:10px 14px;display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;text-align:center;border-left:1px solid var(--line);border-right:1px solid var(--line)}
    .hydro-conditioning-group strong{font-family:var(--font-display);font-size:13px;color:var(--blue-1)}
    .hydro-conditioning-group span{font-size:11px;color:var(--text-soft)}
    .hydro-conditioning-col{background:linear-gradient(180deg,var(--surface),var(--pre-soft) 260%);box-shadow:inset 0 4px 0 var(--pre)}
    .macro-subtitle{display:inline-flex;margin-bottom:8px;padding:5px 8px;border-radius:999px;background:var(--pre-soft);color:var(--pre);font-size:10px;font-weight:800;letter-spacing:.03em}
    .hydro-conditioning-stage{background:linear-gradient(180deg,#FBFDFE,var(--pre-soft) 350%)}
    .hydro-scope-mini{margin-top:10px}
    .vegan-canvas{min-width:2870px}
    .vegan-strip,.vegan-strip2{display:grid;grid-template-columns:repeat(7,minmax(410px,1fr))}
    .vegan-strip2{border-top:1px solid var(--line)}
    .vegan-strip .col .desc{min-height:170px;font-size:var(--text-xs);color:var(--text-soft);line-height:1.42}
    .vegan-external-col{background:linear-gradient(180deg,var(--surface),var(--pre-soft) 260%)}
    .vegan-integrated-col{background:linear-gradient(180deg,var(--surface),#EEF8F4 260%);box-shadow:inset 0 5px 0 var(--sel)}
    .checkpoint-chip.vegan-integrated{background:linear-gradient(90deg,#F1FAF5,#F2F9FC);border-color:var(--sel-soft)}
    .type-tag.checkpoint-integrated{background:linear-gradient(90deg,var(--sel-soft),var(--proc-soft));color:var(--blue-1)}
    .type-tag.checkpoint-integrated i{display:inline-block;width:8px;height:8px;border-radius:999px;background:var(--sel)}
    .vegan-integrated-stage{background:linear-gradient(180deg,#FBFEFC,#F7FBFD);box-shadow:inset 0 4px 0 var(--sel)}
    .vegan-tech-title{margin-top:18px!important;padding-top:14px;border-top:1px solid var(--line)}
    .vegan-decision{background:linear-gradient(90deg,#F1FAF5,#F2F9FC);border-color:var(--sel-soft)}
    .vegan-finish-col{background:linear-gradient(180deg,var(--surface),var(--blue-5) 290%)}
    .type-tag.finish{background:var(--blue-5);color:var(--blue-6)}
    .type-tag.finish i{display:inline-block;width:8px;height:8px;border-radius:999px;background:var(--blue-6)}
    .flow-top-scroll-wrap{padding:0 22px;margin-top:12px;margin-bottom:-4px}
    .flow-top-scroll{width:100%;height:22px;overflow-x:auto;overflow-y:hidden;scrollbar-gutter:stable;scrollbar-color:var(--blue-4) var(--surface-2)}
    .flow-top-scroll-track{height:1px;pointer-events:none}
    .flow-top-scroll::-webkit-scrollbar{height:12px}
    .flow-top-scroll::-webkit-scrollbar-track{background:var(--surface-2);border-radius:999px}
    .flow-top-scroll::-webkit-scrollbar-thumb{background:var(--blue-4);border-radius:999px;border:2px solid var(--surface-2)}
    .flow-top-scroll::-webkit-scrollbar-thumb:hover{background:var(--blue-3)}
    @media(max-width:900px){.vegan-canvas{min-width:2870px}.hydroflex-board .hydro-canvas{min-width:4920px}}
    @media(max-width:700px){.process-tabs-wrap{display:grid;grid-template-columns:1fr}.process-tab{justify-content:center}.flow-top-scroll-wrap{padding:0 12px}}
  `;
  document.head.appendChild(style);

  eco.classList.add('process-panel','active');
  eco.dataset.process='ecofining';

  const hydro=document.createElement('section');
  hydro.className='board process-panel hydroflex-board';
  hydro.dataset.process='hydroflex';
  hydro.innerHTML=`
    <div class="process-placeholder">
      <div class="process-placeholder-card">
        <div class="process-kicker">Proceso 2 · Topsoe</div>
        <h2>HydroFlex™</h2>
        <p>Cargando proceso canónico HydroFlex…</p>
      </div>
    </div>`;

  const vegan=document.createElement('section');
  vegan.className='board process-panel vegan-board';
  vegan.dataset.process='vegan';
  vegan.innerHTML=`
    <div class="process-placeholder">
      <div class="process-placeholder-card">
        <div class="process-kicker">Proceso 3 · Axens</div>
        <h2>Vegan®</h2>
        <p>Cargando proceso canónico Vegan…</p>
      </div>
    </div>`;

  const matrix=document.createElement('section');
  matrix.className='board process-panel matrix-board';
  matrix.dataset.process='matrix';
  matrix.innerHTML=`
    <div class="process-placeholder">
      <div class="process-placeholder-card">
        <div class="process-kicker">Vista inicial · 61 variables</div>
        <h2>Matriz comparativa</h2>
        <p>Cargando comparación por tecnología…</p>
      </div>
    </div>`;

  eco.insertAdjacentElement('beforebegin',matrix);
  eco.insertAdjacentElement('afterend',hydro);
  hydro.insertAdjacentElement('afterend',vegan);

  const nav=document.createElement('nav');
  nav.className='process-tabs-wrap';
  nav.setAttribute('aria-label','Procesos HEFA');
  nav.innerHTML=`
    <button class="process-tab" type="button" data-target="matrix"><span class="tab-no">Vista inicial</span>Matriz comparativa</button>
    <button class="process-tab" type="button" data-target="ecofining"><span class="tab-no">Proceso 1</span>Ecofining™</button>
    <button class="process-tab" type="button" data-target="hydroflex"><span class="tab-no">Proceso 2</span>HydroFlex™</button>
    <button class="process-tab" type="button" data-target="vegan"><span class="tab-no">Proceso 3</span>Vegan®</button>`;
  matrix.parentNode.insertBefore(nav,matrix);

  const tabs=[...nav.querySelectorAll('.process-tab')];
  const panels=[matrix,eco,hydro,vegan];
  const valid=new Set(['matrix','ecofining','hydroflex','vegan']);

  function ensureTopScroller(panel){
    const flow=panel.querySelector('.scroll.eco-scroll');
    if(!flow) return;

    let wrap=flow.previousElementSibling;
    if(!wrap || !wrap.classList.contains('flow-top-scroll-wrap')){
      wrap=document.createElement('div');
      wrap.className='flow-top-scroll-wrap';
      wrap.innerHTML='<div class="flow-top-scroll" aria-label="Desplazamiento horizontal superior del proceso" role="region" tabindex="0"><div class="flow-top-scroll-track"></div></div>';
      flow.insertAdjacentElement('beforebegin',wrap);
    }

    const top=wrap.querySelector('.flow-top-scroll');
    const track=wrap.querySelector('.flow-top-scroll-track');

    if(!wrap.dataset.bound){
      let syncing=false;
      top.addEventListener('scroll',()=>{
        if(syncing) return;
        syncing=true;
        flow.scrollLeft=top.scrollLeft;
        syncing=false;
      });
      flow.addEventListener('scroll',()=>{
        if(syncing) return;
        syncing=true;
        top.scrollLeft=flow.scrollLeft;
        syncing=false;
      });
      wrap.dataset.bound='true';
    }

    const canvas=flow.querySelector('.canvas')||flow.firstElementChild;
    const contentWidth=Math.max(flow.scrollWidth,canvas?canvas.scrollWidth:0);
    if(contentWidth>0) track.style.width=`${contentWidth}px`;
    top.scrollLeft=flow.scrollLeft;
  }

  function showProcess(name,updateHash=false){
    if(!valid.has(name)) name='matrix';
    tabs.forEach(tab=>{
      const on=tab.dataset.target===name;
      tab.classList.toggle('active',on);
      tab.setAttribute('aria-selected',String(on));
    });
    panels.forEach(panel=>panel.classList.toggle('active',panel.dataset.process===name));
    const activePanel=panels.find(panel=>panel.dataset.process===name);
    requestAnimationFrame(()=>ensureTopScroller(activePanel));
    if(updateHash && location.hash!==`#${name}`) history.replaceState(null,'',`#${name}`);
  }

  tabs.forEach(tab=>tab.addEventListener('click',()=>showProcess(tab.dataset.target,true)));
  window.addEventListener('hashchange',()=>showProcess(location.hash.slice(1),false));
  window.addEventListener('resize',()=>{
    const active=panels.find(panel=>panel.classList.contains('active'));
    if(active) requestAnimationFrame(()=>ensureTopScroller(active));
  });
  showProcess(location.hash.slice(1)||'matrix',false);

  const loadPanel=async(panel,path,label,processNo)=>{
    try{
      const res=await fetch(path,{cache:'no-store'});
      if(!res.ok) throw new Error(`No fue posible cargar ${label}.`);
      panel.innerHTML=await res.text();
    }catch(err){
      panel.innerHTML=`
        <div class="process-placeholder">
          <div class="process-placeholder-card">
            <div class="process-kicker">Proceso ${processNo}</div>
            <h2>${label}</h2>
            <p>${String(err.message||err)}</p>
            <span class="pending-tab">Error de carga</span>
          </div>
        </div>`;
    }
  };

  await Promise.all([
    loadPanel(hydro,'./assets/processes/hydroflex.html','HydroFlex™','2 · Topsoe'),
    loadPanel(vegan,'./assets/processes/vegan.html','Vegan®','3 · Axens')
  ]);

  panels.forEach(panel=>ensureTopScroller(panel));
  showProcess(location.hash.slice(1)||'matrix',false);

  document.title='Feedstock Process Dashboard BIARAI v61 — Matriz comparativa';
  const e=document.querySelector('.eyebrow'); if(e)e.textContent='Criterios técnicos · Comparación por tecnología · v61';
})();
