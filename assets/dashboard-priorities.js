/* Preserved source: v45-ecofining-commercial-priority-semaphore.js */
(()=>{
  const eco=document.querySelector('.ecofining-board');
  if(!eco||eco.dataset.commercialPrioritySemaphoreV45==='true') return;

  const receptionStage=[...eco.querySelectorAll('.commercial-stage')].find(stage=>
    stage.querySelector('.panel-title')?.textContent.trim()==='Variables de recepción · calidad comercial'
  );
  const varlist=receptionStage?.querySelector('.varlist');
  if(!varlist) return;

  const style=document.createElement('style');
  style.textContent=`
    .ecofining-board .eco-priority-chip{display:inline-flex;align-items:center;gap:5px;margin-left:7px;padding:2px 7px;border:1px solid;border-radius:999px;font-size:10px;font-weight:800;line-height:1.25;vertical-align:1px;white-space:nowrap;letter-spacing:.01em}
    .ecofining-board .eco-priority-chip i{width:7px;height:7px;border-radius:50%;display:inline-block;flex:0 0 7px}
    .ecofining-board .eco-priority-critical{background:#FDECEC;border-color:#F1BBBB;color:#8B2525}
    .ecofining-board .eco-priority-critical i{background:#D74444}
    .ecofining-board .eco-priority-important{background:#FFF7D8;border-color:#EAD38B;color:#765B08}
    .ecofining-board .eco-priority-important i{background:#D3A516}
    .ecofining-board .eco-priority-control{background:#EAF6EE;border-color:#B8DEC6;color:#286140}
    .ecofining-board .eco-priority-control i{background:#469B67}
  `;
  document.head.appendChild(style);

  const classification={
    T01:['critical','Crítica','Rojo · Crítica · debe medirse siempre y pesa en la decisión comercial'],
    T08:['critical','Crítica','Rojo · Crítica · debe medirse siempre y pesa en la decisión comercial'],
    MIU:['critical','Crítica','Rojo · Crítica · resumen comercial clave; se conserva el nombre actual MIU'],
    T13:['critical','Crítica','Rojo · Crítica · debe medirse siempre y pesa en la decisión comercial'],
    T21:['critical','Crítica','Rojo · Crítica · debe medirse siempre y pesa en la decisión comercial'],
    T04:['important','Importante','Amarillo · Importante · variable de apoyo/diseño'],
    T05:['important','Importante','Amarillo · Importante · variable de apoyo/diseño'],
    T06:['important','Importante','Amarillo · Importante · variable de apoyo/diseño'],
    T09:['important','Importante','Amarillo · Importante · variable de apoyo/diseño'],
    T07:['important','Importante','Amarillo · Importante · variable de apoyo/diseño'],
    T19:['important','Importante','Amarillo · Importante · variable de apoyo/diseño'],
    T23:['control','Control','Verde · Control · seguimiento con menor peso en la decisión inmediata']
  };

  const cards=[...varlist.querySelectorAll('.var')];
  Object.entries(classification).forEach(([prefix,[level,label,title]])=>{
    const card=cards.find(item=>item.querySelector('strong')?.textContent.trim().startsWith(prefix));
    const strong=card?.querySelector('strong');
    if(!strong||strong.querySelector('.eco-priority-chip')) return;

    const chip=document.createElement('span');
    chip.className=`eco-priority-chip eco-priority-${level}`;
    chip.title=title;
    chip.setAttribute('aria-label',title);
    chip.innerHTML=`<i aria-hidden="true"></i>${label}`;
    strong.appendChild(chip);
  });

  eco.dataset.commercialPrioritySemaphoreV45='true';
})();

/* Preserved source: v46-ecofining-technical-aptitude-scope.js */
(()=>{
  const eco=document.querySelector('.ecofining-board');
  if(!eco||eco.dataset.technicalAptitudeScopeV46==='true') return;

  const technicalStage=[...eco.querySelectorAll('.technical-stage')].find(stage=>
    stage.querySelector('.panel-title')?.textContent.trim()==='Variables de entrada · aptitud técnica HEFA'
  );
  const varlist=technicalStage?.querySelector('.varlist');
  if(!technicalStage||!varlist) return;

  const allowed=['T10','T11','T04','T05','T06','T08','T15','T16','T17','T18','T20','T22'];
  const prefixOf=card=>{
    const text=card.querySelector('strong')?.textContent.trim()||'';
    return allowed.find(prefix=>text.startsWith(prefix))||null;
  };

  // 05B is exclusively the technical aptitude checkpoint for the conditioned feedstock.
  [...varlist.querySelectorAll('.var')].forEach(card=>{
    if(!prefixOf(card)) card.remove();
  });

  // Short scope explanation above the first technical variable.
  if(!technicalStage.querySelector('.eco-technical-intro-v46')){
    const intro=document.createElement('div');
    intro.className='stage-explain eco-technical-intro-v46';
    intro.style.marginBottom='10px';
    intro.innerHTML='En este punto el lote ya pasó por Degumming y Bleaching. Aquí no se define el precio comercial, sino la <strong>aptitud técnica del feedstock para entrar al HDO/Stage 1 de Ecofining</strong>, verificando que fósforo, metales, sales, sílice, jabones, agua, sólidos y compuestos oxigenados residuales estén dentro de límites seguros para el catalizador.';
    technicalStage.insertBefore(intro,varlist);
  }

  const findCard=prefix=>[...varlist.querySelectorAll('.var')].find(card=>
    card.querySelector('strong')?.textContent.trim().startsWith(prefix)
  );

  const appendSentence=(prefix,sentence,key)=>{
    const card=findCard(prefix);
    if(!card||card.dataset[key]==='true') return;
    const range=card.querySelector('.rangerow');
    if(!range) return;
    const existing=card.textContent;
    if(!existing.includes(sentence)){
      card.insertBefore(document.createTextNode(' '+sentence),range);
    }
    card.dataset[key]='true';
  };

  appendSentence(
    'T10',
    'El fósforo es uno de los venenos más agresivos para el catalizador de HDO; se busca reducirlo a trazas antes de Ecofining.',
    'phosphorusNoteV46'
  );

  appendSentence(
    'T15',
    'Los cloruros y sales son críticos por corrosión y depósitos en la sección catalítica; se controlan a partir del desempeño de Degumming y Bleaching.',
    'chloridesNoteV46'
  );

  eco.dataset.technicalAptitudeScopeV46='true';
})();

/* Preserved source: v47-ecofining-commercial-priority-order-legend.js */
(()=>{
  const addStyles=()=>{
    if(document.getElementById('eco-priority-v47-style')) return;
    const style=document.createElement('style');
    style.id='eco-priority-v47-style';
    style.textContent=`
      .ecofining-board .eco-description-priority-row{display:grid;grid-template-columns:minmax(0,2fr) minmax(320px,1fr);gap:14px;align-items:stretch;margin-top:14px;max-width:1600px}
      .ecofining-board .eco-description-priority-row>.technology-description{margin-top:0;max-width:none;height:100%;box-sizing:border-box}
      .ecofining-board .eco-priority-legend{padding:15px 17px;border:1px solid var(--line);border-radius:14px;background:linear-gradient(180deg,var(--surface),var(--surface-2));color:var(--text-soft);font-size:var(--text-xs);line-height:1.45;box-sizing:border-box}
      .ecofining-board .eco-priority-legend-title{font-family:var(--font-display);font-size:13px;font-weight:800;color:var(--blue-1);margin:0 0 10px}
      .ecofining-board .eco-priority-legend-item{display:grid;grid-template-columns:max-content 1fr;gap:8px;align-items:start;margin-top:8px}
      .ecofining-board .eco-priority-legend-item:first-of-type{margin-top:0}
      .ecofining-board .eco-priority-legend .eco-priority-chip{margin-left:0;margin-top:1px}
      @media(max-width:1000px){.ecofining-board .eco-description-priority-row{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  };

  const chipInfo={
    T01:['critical','Crítica','Rojo · Crítica · debe medirse siempre y pesa en la decisión comercial'],
    T08:['critical','Crítica','Rojo · Crítica · debe medirse siempre y pesa en la decisión comercial'],
    T24:['critical','Crítica','Rojo · Crítica · debe medirse siempre y pesa en la decisión comercial'],
    T13:['critical','Crítica','Rojo · Crítica · debe medirse siempre y pesa en la decisión comercial'],
    T21:['critical','Crítica','Rojo · Crítica · debe medirse siempre y pesa en la decisión comercial'],
    T04:['important','Importante','Amarillo · Importante · variable de apoyo/diseño'],
    T05:['important','Importante','Amarillo · Importante · variable de apoyo/diseño'],
    T06:['important','Importante','Amarillo · Importante · variable de apoyo/diseño'],
    T09:['important','Importante','Amarillo · Importante · variable de apoyo/diseño'],
    T07:['important','Importante','Amarillo · Importante · variable de apoyo/diseño'],
    T19:['important','Importante','Amarillo · Importante · variable de apoyo/diseño'],
    T23:['control','Control','Verde · Control · seguimiento con menor peso en la decisión inmediata']
  };

  const makeChip=(level,label,title)=>{
    const chip=document.createElement('span');
    chip.className=`eco-priority-chip eco-priority-${level}`;
    chip.title=title;
    chip.setAttribute('aria-label',title);
    chip.innerHTML=`<i aria-hidden="true"></i>${label}`;
    return chip;
  };

  const applyReception=()=>{
    const eco=document.querySelector('.ecofining-board');
    if(!eco) return false;
    const stage=[...eco.querySelectorAll('.commercial-stage')].find(item=>item.querySelector('.panel-title')?.textContent.trim()==='Variables de recepción · calidad comercial');
    const varlist=stage?.querySelector('.varlist');
    if(!varlist) return false;
    if(eco.dataset.commercialPriorityOrderV47==='true') return true;

    const cards=[...varlist.querySelectorAll('.var')];
    const findCard=prefix=>cards.find(card=>card.querySelector('strong')?.textContent.trim().startsWith(prefix));

    const miu=findCard('MIU');
    if(miu){
      const range=miu.querySelector('.rangerow');
      const rangeHtml=range?.outerHTML||'<div class="rangerow"><span class="valchip">Especificación contractual por definir</span></div>';
      miu.innerHTML='<strong>T24 · MIU (Moisture, Insolubles &amp; Unsaponifiables)</strong>Medición conjunta de Moisture, Insolubles &amp; Unsaponifiables para tener una lectura comercial integral de agua, material insoluble y fracción no saponificable del lote.'+rangeHtml;
    }

    const orderedPrefixes=['T01','T08','T24','T13','T21','T04','T05','T06','T09','T07','T19','T23'];
    const current=[...varlist.querySelectorAll('.var')];
    const currentFind=prefix=>current.find(card=>card.querySelector('strong')?.textContent.trim().startsWith(prefix));
    orderedPrefixes.forEach(prefix=>{
      const card=currentFind(prefix);
      if(card) varlist.appendChild(card);
    });

    varlist.querySelectorAll('.eco-priority-chip').forEach(chip=>chip.remove());
    orderedPrefixes.forEach(prefix=>{
      const card=[...varlist.querySelectorAll('.var')].find(item=>item.querySelector('strong')?.textContent.trim().startsWith(prefix));
      const strong=card?.querySelector('strong');
      const info=chipInfo[prefix];
      if(strong&&info) strong.appendChild(makeChip(...info));
    });

    eco.dataset.commercialPriorityOrderV47='true';
    return true;
  };

  const applyLegend=()=>{
    const eco=document.querySelector('.ecofining-board');
    if(!eco) return false;
    if(eco.dataset.commercialPriorityLegendV47==='true') return true;
    const description=eco.querySelector('.technology-description');
    if(!description) return false;

    addStyles();
    const row=document.createElement('div');
    row.className='eco-description-priority-row';
    description.parentNode.insertBefore(row,description);
    row.appendChild(description);

    const legend=document.createElement('aside');
    legend.className='eco-priority-legend';
    legend.setAttribute('aria-label','Significado del semáforo de variables de recepción');
    legend.innerHTML='<div class="eco-priority-legend-title">Significado del semáforo de variables de recepción</div>';

    const items=[
      ['critical','Crítica','Rojo · Crítica','variables que se deben medir siempre y que pueden definir si un lote se acepta, se penaliza, se corrige/mezcla o se rechaza.'],
      ['important','Importante','Amarillo · Importante','variables que se deben medir para entender el desempeño técnico esperado, pero que rara vez bloquean por sí solas la recepción.'],
      ['control','Control','Verde · Control','variables que se miden principalmente para seguimiento y trazabilidad; tienen menor peso en la decisión inmediata de compra.']
    ];
    items.forEach(([level,label,title,text])=>{
      const item=document.createElement('div');
      item.className='eco-priority-legend-item';
      item.appendChild(makeChip(level,label,title));
      const copy=document.createElement('div');
      copy.textContent=text;
      item.appendChild(copy);
      legend.appendChild(item);
    });
    row.appendChild(legend);
    eco.dataset.commercialPriorityLegendV47='true';
    return true;
  };

  addStyles();
  let tries=0;
  const timer=setInterval(()=>{
    tries+=1;
    const receptionDone=applyReception();
    const legendDone=applyLegend();
    if((receptionDone&&legendDone)||tries>=160) clearInterval(timer);
  },100);
})();

/* Preserved source: v48-hydroflex-commercial-priority-legend.js */
(()=>{
  const addStyles=()=>{
    if(document.getElementById('hydro-priority-v48-style')) return;
    const style=document.createElement('style');
    style.id='hydro-priority-v48-style';
    style.textContent=`
      [data-process="hydroflex"] .hydro-description-priority-row{display:grid;grid-template-columns:minmax(0,2fr) minmax(320px,1fr);gap:14px;align-items:stretch;margin-top:14px;max-width:1600px}
      [data-process="hydroflex"] .hydro-description-priority-row>.technology-description{margin-top:0;max-width:none;height:100%;box-sizing:border-box}
      [data-process="hydroflex"] .hydro-priority-legend{padding:15px 17px;border:1px solid var(--line);border-radius:14px;background:linear-gradient(180deg,var(--surface),var(--surface-2));color:var(--text-soft);font-size:var(--text-xs);line-height:1.45;box-sizing:border-box}
      [data-process="hydroflex"] .hydro-priority-legend-title{font-family:var(--font-display);font-size:13px;font-weight:800;color:var(--blue-1);margin:0 0 10px}
      [data-process="hydroflex"] .hydro-priority-legend-item{display:grid;grid-template-columns:max-content 1fr;gap:8px;align-items:start;margin-top:8px}
      [data-process="hydroflex"] .hydro-priority-legend-item:first-of-type{margin-top:0}
      [data-process="hydroflex"] .hydro-priority-chip{display:inline-flex;align-items:center;gap:5px;margin-left:7px;padding:2px 7px;border:1px solid;border-radius:999px;font-size:10px;font-weight:800;line-height:1.25;vertical-align:1px;white-space:nowrap;letter-spacing:.01em}
      [data-process="hydroflex"] .hydro-priority-legend .hydro-priority-chip{margin-left:0;margin-top:1px}
      [data-process="hydroflex"] .hydro-priority-chip i{width:7px;height:7px;border-radius:50%;display:inline-block;flex:0 0 7px}
      [data-process="hydroflex"] .hydro-priority-critical{background:#FDECEC;border-color:#F1BBBB;color:#8B2525}
      [data-process="hydroflex"] .hydro-priority-critical i{background:#D74444}
      [data-process="hydroflex"] .hydro-priority-important{background:#FFF7D8;border-color:#EAD38B;color:#765B08}
      [data-process="hydroflex"] .hydro-priority-important i{background:#D3A516}
      [data-process="hydroflex"] .hydro-priority-control{background:#EAF6EE;border-color:#B8DEC6;color:#286140}
      [data-process="hydroflex"] .hydro-priority-control i{background:#469B67}
      @media(max-width:1000px){[data-process="hydroflex"] .hydro-description-priority-row{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  };

  const makeChip=(level,label,title)=>{
    const chip=document.createElement('span');
    chip.className=`hydro-priority-chip hydro-priority-${level}`;
    chip.title=title;
    chip.setAttribute('aria-label',title);
    chip.innerHTML=`<i aria-hidden="true"></i>${label}`;
    return chip;
  };

  const apply=()=>{
    const panel=document.querySelector('[data-process="hydroflex"]');
    if(!panel) return false;
    if(panel.dataset.commercialPriorityLegendV48==='true') return true;
    const description=panel.querySelector('.technology-description');
    if(!description) return false;

    addStyles();
    const row=document.createElement('div');
    row.className='hydro-description-priority-row';
    description.parentNode.insertBefore(row,description);
    row.appendChild(description);

    const legend=document.createElement('aside');
    legend.className='hydro-priority-legend';
    legend.setAttribute('aria-label','Significado del semáforo de variables de recepción HydroFlex');
    legend.innerHTML='<div class="hydro-priority-legend-title">Significado del semáforo de variables de recepción (HydroFlex)</div>';

    const items=[
      ['critical','Crítica','Rojo · Crítica','variables que se deben medir siempre y que pueden definir si un lote se acepta, se penaliza, se corrige/mezcla o se rechaza.'],
      ['important','Importante','Amarillo · Importante','variables que se miden para entender el desempeño técnico esperado, pero que por sí solas rara vez bloquean la recepción.'],
      ['control','Control','Verde · Control','variables orientadas a seguimiento y trazabilidad; tienen menor peso en la decisión inmediata de compra.']
    ];

    items.forEach(([level,label,title,text])=>{
      const item=document.createElement('div');
      item.className='hydro-priority-legend-item';
      item.appendChild(makeChip(level,label,title));
      const copy=document.createElement('div');
      copy.textContent=text;
      item.appendChild(copy);
      legend.appendChild(item);
    });

    row.appendChild(legend);
    panel.dataset.commercialPriorityLegendV48='true';
    return true;
  };

  addStyles();
  let tries=0;
  const timer=setInterval(()=>{
    tries+=1;
    if(apply()||tries>=160) clearInterval(timer);
  },100);
})();

/* Preserved source: v49-vegan-priority-legend.js */
(()=>{
  const addStyles=()=>{
    if(document.getElementById('vegan-priority-v49-style')) return;
    const style=document.createElement('style');
    style.id='vegan-priority-v49-style';
    style.textContent=`
      [data-process="vegan"] .vegan-description-priority-row{display:grid;grid-template-columns:minmax(0,2fr) minmax(320px,1fr);gap:14px;align-items:stretch;margin-top:14px;max-width:1600px}
      [data-process="vegan"] .vegan-description-priority-row>.technology-description{margin-top:0;max-width:none;height:100%;box-sizing:border-box}
      [data-process="vegan"] .vegan-priority-legend{padding:15px 17px;border:1px solid var(--line);border-radius:14px;background:linear-gradient(180deg,var(--surface),var(--surface-2));color:var(--text-soft);font-size:var(--text-xs);line-height:1.45;box-sizing:border-box}
      [data-process="vegan"] .vegan-priority-legend-title{font-family:var(--font-display);font-size:13px;font-weight:800;color:var(--blue-1);margin:0 0 10px}
      [data-process="vegan"] .vegan-priority-legend-item{display:grid;grid-template-columns:max-content 1fr;gap:8px;align-items:start;margin-top:8px}
      [data-process="vegan"] .vegan-priority-legend-item:first-of-type{margin-top:0}
      [data-process="vegan"] .vegan-priority-chip{display:inline-flex;align-items:center;gap:5px;margin-left:7px;padding:2px 7px;border:1px solid;border-radius:999px;font-size:10px;font-weight:800;line-height:1.25;vertical-align:1px;white-space:nowrap;letter-spacing:.01em}
      [data-process="vegan"] .vegan-priority-legend .vegan-priority-chip{margin-left:0;margin-top:1px}
      [data-process="vegan"] .vegan-priority-chip i{width:7px;height:7px;border-radius:50%;display:inline-block;flex:0 0 7px}
      [data-process="vegan"] .vegan-priority-critical{background:#FDECEC;border-color:#F1BBBB;color:#8B2525}
      [data-process="vegan"] .vegan-priority-critical i{background:#D74444}
      [data-process="vegan"] .vegan-priority-important{background:#FFF7D8;border-color:#EAD38B;color:#765B08}
      [data-process="vegan"] .vegan-priority-important i{background:#D3A516}
      [data-process="vegan"] .vegan-priority-control{background:#EAF6EE;border-color:#B8DEC6;color:#286140}
      [data-process="vegan"] .vegan-priority-control i{background:#469B67}
      @media(max-width:1000px){[data-process="vegan"] .vegan-description-priority-row{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  };

  const makeChip=(level,label,title)=>{
    const chip=document.createElement('span');
    chip.className=`vegan-priority-chip vegan-priority-${level}`;
    chip.title=title;
    chip.setAttribute('aria-label',title);
    chip.innerHTML=`<i aria-hidden="true"></i>${label}`;
    return chip;
  };

  const apply=()=>{
    const panel=document.querySelector('[data-process="vegan"]');
    if(!panel) return false;
    if(panel.dataset.priorityLegendV49==='true') return true;
    const description=panel.querySelector('.technology-description');
    if(!description) return false;

    addStyles();
    const row=document.createElement('div');
    row.className='vegan-description-priority-row';
    description.parentNode.insertBefore(row,description);
    row.appendChild(description);

    const legend=document.createElement('aside');
    legend.className='vegan-priority-legend';
    legend.setAttribute('aria-label','Significado del semáforo de variables para Vegan');
    legend.innerHTML='<div class="vegan-priority-legend-title">Significado del semáforo de variables para Vegan</div>';

    const items=[
      ['critical','Crítica','Rojo · Crítica','variables que se deben medir siempre y que pueden definir si un lote es apto para Vegan, requiere mezcla/corrección o se rechaza.'],
      ['important','Importante','Amarillo · Importante','variables que ayudan a anticipar el desempeño técnico en Vegan, pero que normalmente se interpretan en conjunto con las críticas.'],
      ['control','Control','Verde · Control','variables de seguimiento y trazabilidad (incluidos aspectos regulatorios); su peso en la decisión inmediata es menor.']
    ];

    items.forEach(([level,label,title,text])=>{
      const item=document.createElement('div');
      item.className='vegan-priority-legend-item';
      item.appendChild(makeChip(level,label,title));
      const copy=document.createElement('div');
      copy.textContent=text;
      item.appendChild(copy);
      legend.appendChild(item);
    });

    row.appendChild(legend);
    panel.dataset.priorityLegendV49='true';
    return true;
  };

  addStyles();
  let tries=0;
  const timer=setInterval(()=>{
    tries+=1;
    if(apply()||tries>=160) clearInterval(timer);
  },100);
})();

/* Preserved source: v50-matrix-validation-sync.js */
(()=>{
  const PRIORITY={
    ecofining:{
      T01:'critical',T08:'critical',T24:'critical',T13:'critical',T21:'critical',
      T04:'important',T05:'important',T06:'important',T07:'important',T19:'important',
      T23:'control',T09:'unmapped'
    },
    hydroflex:{
      T01:'critical',T08:'critical',T24:'critical',T13:'critical',
      T04:'important',T05:'important',T06:'important',T09:'important',T07:'important',
      T18:'important',T20:'important',T22:'important',T23:'control'
    },
    vegan:{
      T01:'critical',T08:'critical',T24:'critical',T13:'critical',
      T04:'important',T05:'important',T06:'important',T09:'important',T07:'important'
    }
  };

  // I/K/M are the direct-human-validation columns in the approved Excel baseline.
  // Only green/confirmed cells belong here. As of the 2026-08-24 pre-interview baseline,
  // there are no green confirmations yet, so no contractual value is shown as approved.
  const APPROVED={ecofining:{},hydroflex:{},vegan:{}};

  const INFO={
    critical:['Crítica','Rojo · Crítica · pesa directamente en la decisión'],
    important:['Importante','Amarillo · Importante · debe considerarse en la evaluación'],
    control:['Control','Verde · Control · menor peso en la decisión inmediata'],
    unmapped:['No mapeada','Gris · No mapeada actualmente en la Matriz Madre para esta tecnología']
  };

  const style=document.createElement('style');
  style.id='matrix-validation-sync-v50-style';
  style.textContent=`
    .matrix-priority-chip{display:inline-flex;align-items:center;gap:5px;margin-left:7px;padding:2px 7px;border:1px solid;border-radius:999px;font-size:10px;font-weight:800;line-height:1.25;vertical-align:1px;white-space:nowrap;letter-spacing:.01em}
    .matrix-priority-chip i{width:7px;height:7px;border-radius:50%;display:inline-block;flex:0 0 7px}
    .matrix-priority-critical{background:#FDECEC;border-color:#F1BBBB;color:#8B2525}.matrix-priority-critical i{background:#D74444}
    .matrix-priority-important{background:#FFF7D8;border-color:#EAD38B;color:#765B08}.matrix-priority-important i{background:#D3A516}
    .matrix-priority-control{background:#EAF6EE;border-color:#B8DEC6;color:#286140}.matrix-priority-control i{background:#469B67}
    .matrix-priority-unmapped{background:#F1F3F5;border-color:#CDD3D8;color:#687078}.matrix-priority-unmapped i{background:#9AA2A9}
  `;
  if(!document.getElementById(style.id)) document.head.appendChild(style);

  const normalizeId=card=>{
    const text=card.querySelector('strong')?.textContent.trim()||'';
    const match=text.match(/\bT\d{2}\b/i);
    if(match) return match[0].toUpperCase();
    if(/^MIU\b/i.test(text)) return 'T24';
    return null;
  };

  const cardsFor=(process,panel)=>{
    if(process==='ecofining'){
      const stage=[...panel.querySelectorAll('.commercial-stage')].find(s=>
        /Variables de recepción/i.test(s.querySelector('.panel-title')?.textContent||'')
      );
      return stage?[...stage.querySelectorAll('.varlist .var')]:[];
    }
    if(process==='hydroflex'){
      const stage=[...panel.querySelectorAll('.commercial-stage')].find(s=>
        /Recepción y control de calidad/i.test(s.querySelector('.panel-title')?.textContent||'')
      );
      return stage?[...stage.querySelectorAll('.varlist .var')]:[];
    }
    if(process==='vegan'){
      const stage=panel.querySelector('.vegan-integrated-stage');
      if(!stage) return [];
      const title=[...stage.querySelectorAll(':scope > .panel-title')].find(t=>/^A\s*·\s*Calidad general/i.test(t.textContent.trim()));
      const list=title?.nextElementSibling;
      return list?.classList.contains('varlist')?[...list.querySelectorAll(':scope > .var')]:[];
    }
    return [];
  };

  const removeOldPriorityChips=strong=>{
    strong.querySelectorAll('.eco-priority-chip,.hydro-priority-chip,.vegan-priority-chip,.matrix-priority-chip').forEach(n=>n.remove());
  };

  const makePriorityChip=level=>{
    const [label,title]=INFO[level]||INFO.unmapped;
    const chip=document.createElement('span');
    chip.className=`matrix-priority-chip matrix-priority-${level}`;
    chip.title=title;
    chip.setAttribute('aria-label',title);
    chip.innerHTML=`<i aria-hidden="true"></i>${label}`;
    return chip;
  };

  const applyValidationBadge=(card,process,id)=>{
    const row=card.querySelector('.rangerow');
    if(!row) return;
    let chip=row.querySelector('.valchip,.refchip');
    if(!chip){
      chip=document.createElement('span');
      row.appendChild(chip);
    }
    const approved=APPROVED[process]?.[id];
    if(approved){
      chip.className='refchip';
      chip.textContent=approved;
      chip.title='Confirmado por validación humana directa en la Matriz Madre';
    }else{
      chip.className='valchip';
      chip.textContent='Pendiente de validación directa';
      chip.title='I/K/M sigue pendiente en la Matriz Madre; no presentar un valor como contractual aprobado';
    }
  };

  const applyProcess=(process,panel)=>{
    const cards=cardsFor(process,panel);
    if(!cards.length) return false;
    cards.forEach(card=>{
      const id=normalizeId(card);
      if(!id) return;
      const level=PRIORITY[process]?.[id];
      if(level){
        const strong=card.querySelector('strong');
        if(strong){
          removeOldPriorityChips(strong);
          strong.appendChild(makePriorityChip(level));
        }
      }
      applyValidationBadge(card,process,id);
    });
    panel.dataset.matrixValidationSyncV50='true';
    return true;
  };

  let tries=0;
  const timer=setInterval(()=>{
    tries+=1;
    const eco=document.querySelector('[data-process="ecofining"],.ecofining-board');
    const hydro=document.querySelector('[data-process="hydroflex"]');
    const vegan=document.querySelector('[data-process="vegan"]');
    const okEco=eco?applyProcess('ecofining',eco):false;
    const okHydro=hydro?applyProcess('hydroflex',hydro):false;
    const okVegan=vegan?applyProcess('vegan',vegan):false;
    if((okEco&&okHydro&&okVegan)||tries>=180) clearInterval(timer);
  },100);
})();
