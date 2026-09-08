/* v84 · Tratamientos adicionales según feedstock en HydroFlex y Vegan + alineación 4+1 correcta */
(()=>{
  const TRACK=410;

  const spanOf=(el)=>{
    try{
      const cs=getComputedStyle(el);
      const raw=[el.style.gridColumn,el.style.gridColumnEnd,cs.gridColumn,cs.gridColumnEnd].join(' ');
      const m=raw.match(/span\s+(\d+)/i);
      return m ? Math.max(1,Number(m[1])) : 1;
    }catch(_){return 1;}
  };

  const forceSingleRow=(strip,strip2,canvas)=>{
    const place=(container)=>{
      let cursor=1;
      [...container.children].forEach(el=>{
        const span=spanOf(el);
        el.style.setProperty('grid-row','1','important');
        el.style.setProperty('grid-column',`${cursor} / span ${span}`,'important');
        cursor+=span;
      });
      return cursor-1;
    };

    const topUnits=place(strip);
    const lowerUnits=place(strip2);
    const units=Math.max(topUnits,lowerUnits);
    const template=`repeat(${units},minmax(${TRACK}px,1fr))`;

    strip.style.setProperty('display','grid','important');
    strip2.style.setProperty('display','grid','important');
    strip.style.setProperty('grid-template-columns',template,'important');
    strip2.style.setProperty('grid-template-columns',template,'important');
    strip.style.setProperty('grid-template-rows','auto','important');
    strip2.style.setProperty('grid-template-rows','auto','important');
    strip.style.setProperty('grid-auto-flow','column','important');
    strip2.style.setProperty('grid-auto-flow','column','important');
    canvas.style.setProperty('min-width',`${units*TRACK}px`,'important');
  };

  const installStyles=()=>{
    if(document.getElementById('v84-additional-pretreatment-style')) return;
    const old=document.getElementById('v83-additional-pretreatment-style');
    if(old) old.remove();

    const style=document.createElement('style');
    style.id='v84-additional-pretreatment-style';
    style.textContent=`
      .hydroflex-board .feedstock-extra-treatment-col,
      .vegan-board .feedstock-extra-treatment-col{
        background:linear-gradient(180deg,var(--surface),var(--pre-soft) 300%);
        box-shadow:inset 0 4px 0 var(--pre);
      }
      .hydroflex-board .feedstock-extra-treatment-chips,
      .vegan-board .feedstock-extra-treatment-chips{
        display:flex;flex-wrap:wrap;gap:6px;margin-top:2px;
      }
      .hydroflex-board .feedstock-extra-treatment-chip,
      .vegan-board .feedstock-extra-treatment-chip{
        display:inline-flex;align-items:center;padding:5px 8px;border:1px solid var(--line);
        border-radius:999px;background:rgba(255,255,255,.78);font-size:12px!important;
        font-weight:700;line-height:1.15;color:var(--text-soft);white-space:nowrap;
      }
      .hydroflex-board .hydro-extra-treatment-stage,
      .vegan-board .vegan-extra-treatment-stage{
        background:linear-gradient(180deg,#FBFDFE,var(--pre-soft) 350%);
        box-shadow:inset 0 4px 0 var(--pre);
      }
      .hydroflex-board .feedstock-extra-treatment-detail,
      .vegan-board .feedstock-extra-treatment-detail{
        display:grid;gap:7px;margin-top:10px;
      }
      .hydroflex-board .feedstock-extra-treatment-detail > div,
      .vegan-board .feedstock-extra-treatment-detail > div{
        padding:8px 10px;border:1px solid var(--line);border-radius:10px;
        background:rgba(255,255,255,.72);font-size:13.4px!important;line-height:1.35;color:var(--text-soft);
      }
      .hydroflex-board .feedstock-extra-treatment-detail b,
      .vegan-board .feedstock-extra-treatment-detail b{color:var(--blue-1)}
    `;
    document.head.appendChild(style);
  };

  const cardHtml=(prefix)=>`
    <article class="col type-pre feedstock-extra-treatment-col">
      <div class="macro-subtitle">${prefix} · Pretratamiento HVO/HEFA</div>
      <div class="step-no">${prefix}.5</div>
      <h3>Tratamientos adicionales según feedstock</h3>
      <div class="desc dual-desc">
        <div class="desc-point"><b>Cuándo aplica:</b> Sólo cuando el tren base no es suficiente para alcanzar la especificación HVO/HEFA. No todos los lotes requieren estas operaciones.</div>
        <div class="feedstock-extra-treatment-chips">
          <span class="feedstock-extra-treatment-chip">Heat treatment</span>
          <span class="feedstock-extra-treatment-chip">Cl removal</span>
          <span class="feedstock-extra-treatment-chip">Polymer removal</span>
          <span class="feedstock-extra-treatment-chip">Deacidification</span>
          <span class="feedstock-extra-treatment-chip">Otros</span>
        </div>
      </div>
      <div class="type-tags"><span class="type-tag pre"><i></i>Condicional · según calidad del feedstock</span></div>
    </article>`;

  const detailHtml=(prefix)=>`
    <div class="panel-title feedstock-extra-treatment-title">${prefix}.5 · Tratamientos adicionales · sólo para este paso</div>
    <div class="stage-explain"><strong>No todos los feedstocks requieren estas operaciones.</strong> Esta columna corresponde exclusivamente al paso ${prefix}.5; no modifica ni sustituye las etapas ${prefix}.1–${prefix}.4.</div>
    <div class="feedstock-extra-treatment-detail">
      <div><b>Heat treatment:</b> tratamiento térmico para facilitar la remoción de contaminantes difíciles.</div>
      <div><b>Chloride removal:</b> reduce compuestos de cloro que pueden generar corrosión o afectar el procesamiento posterior.</div>
      <div><b>Polymer / polyethylene removal:</b> retira plásticos o polímeros que pueden generar depósitos, ensuciamiento u obstrucciones.</div>
      <div><b>Deacidification / neutralization:</b> reduce FFA cuando la configuración del pretratamiento o del proceso posterior lo requiere.</div>
      <div><b>Otros tratamientos específicos:</b> operaciones adicionales definidas según composición y especificación del feedstock.</div>
    </div>
    <div class="checkpoint-decision"><b>Validar con proveedor / tecnólogo:</b> cuáles se usan realmente, para qué feedstocks, quién los realiza y en qué punto del tren se integran.</div>`;

  const ensureSeparateStage=(control,className,prefix)=>{
    const strip2=control.parentElement;
    let stage=strip2?.querySelector(`.${className}`);
    if(!stage){
      stage=document.createElement('section');
      stage.className=`stage ${className}`;
      stage.innerHTML=detailHtml(prefix);
      control.insertAdjacentElement('afterend',stage);
    }
    return stage;
  };

  const patchHydro=()=>{
    const board=document.querySelector('.hydroflex-board');
    const strip=board?.querySelector('.hydro-strip');
    const strip2=board?.querySelector('.hydro-strip2');
    const canvas=board?.querySelector('.hydro-canvas');
    const group=board?.querySelector('.hydro-pretreatment-group');
    const subgrid=group?.querySelector('.hydro-pretreatment-subgrid');
    const control=board?.querySelector('.hydro-pretreatment-control');
    if(!board||!strip||!strip2||!canvas||!group||!subgrid||!control) return false;

    if(!subgrid.querySelector('.feedstock-extra-treatment-col')){
      subgrid.insertAdjacentHTML('beforeend',cardHtml('02'));
    }

    /* 02.1–02.4 conservan su punto de control original en 4 tracks. */
    group.style.setProperty('grid-column','span 5','important');
    subgrid.style.setProperty('grid-template-columns','repeat(5,minmax(410px,1fr))','important');
    control.style.setProperty('grid-column','span 4','important');

    /* 02.5 recibe su propio panel inferior, exactamente debajo de la quinta columna. */
    const extraStage=ensureSeparateStage(control,'hydro-extra-treatment-stage','02');
    extraStage.style.setProperty('grid-column','span 1','important');

    forceSingleRow(strip,strip2,canvas);
    board.dataset.extraPretreatmentV84='true';
    return true;
  };

  const patchVegan=()=>{
    const board=document.querySelector('.vegan-board');
    const strip=board?.querySelector('.vegan-strip');
    const strip2=board?.querySelector('.vegan-strip2');
    const canvas=board?.querySelector('.vegan-canvas');
    const group=board?.querySelector('.vegan-pretreatment-group');
    const subgrid=group?.querySelector('.vegan-pretreatment-subgrid');
    const control=board?.querySelector('.vegan-pretreatment-control');
    if(!board||!strip||!strip2||!canvas||!group||!subgrid||!control) return false;

    if(!subgrid.querySelector('.feedstock-extra-treatment-col')){
      subgrid.insertAdjacentHTML('beforeend',cardHtml('02'));
    }

    group.style.setProperty('grid-column','span 5','important');
    subgrid.style.setProperty('grid-template-columns','repeat(5,minmax(410px,1fr))','important');
    control.style.setProperty('grid-column','span 4','important');

    const extraStage=ensureSeparateStage(control,'vegan-extra-treatment-stage','02');
    extraStage.style.setProperty('grid-column','span 1','important');

    forceSingleRow(strip,strip2,canvas);
    board.dataset.extraPretreatmentV84='true';
    return true;
  };

  const resync=()=>{
    installStyles();
    const h=patchHydro();
    const v=patchVegan();
    return h&&v;
  };

  let attempts=0;
  const timer=setInterval(()=>{
    attempts+=1;
    const done=resync();
    if(done||attempts>=120){
      clearInterval(timer);
      [50,150,350,800,1500].forEach(ms=>setTimeout(resync,ms));
    }
  },100);
})();
