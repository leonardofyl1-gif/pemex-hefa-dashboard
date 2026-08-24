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
