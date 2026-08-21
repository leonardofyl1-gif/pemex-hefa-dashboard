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
