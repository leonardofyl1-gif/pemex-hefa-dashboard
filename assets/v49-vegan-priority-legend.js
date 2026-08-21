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
