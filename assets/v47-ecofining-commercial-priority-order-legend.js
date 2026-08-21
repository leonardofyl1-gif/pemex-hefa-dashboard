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
