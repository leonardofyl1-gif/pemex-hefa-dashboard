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
