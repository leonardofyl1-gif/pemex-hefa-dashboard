/* v80 · Tratamientos adicionales compactos + liberación técnica antes de envío a Tula */
(()=>{
  const run=()=>{
    const eco=document.querySelector('.ecofining-board');
    const strip=eco?.querySelector('.eco-strip');
    const strip2=eco?.querySelector('.eco-strip2');
    const canvas=eco?.querySelector('.eco-canvas');
    if(!eco||!strip||!strip2||!canvas) return false;
    if(eco.dataset.additionalPretreatmentV79==='true') return true;

    const externalGroup=strip.querySelector('.eco-external-pretreatment-group');
    const lowerExternal=strip2.querySelector('.eco-external-pretreatment-stage');
    if(!externalGroup||!lowerExternal) return false;

    const style=document.createElement('style');
    style.textContent=`
      .ecofining-board .eco-additional-treatment-col{
        background:linear-gradient(180deg,var(--surface),var(--pre-soft) 290%);
        box-shadow:inset 0 4px 0 var(--pre);
      }
      .ecofining-board .eco-additional-treatment-col .compact-treatment-chips{
        display:flex;flex-wrap:wrap;gap:6px;margin-top:2px;
      }
      .ecofining-board .eco-additional-treatment-col .compact-treatment-chip{
        display:inline-flex;align-items:center;padding:5px 8px;border:1px solid var(--line);
        border-radius:999px;background:rgba(255,255,255,.78);font-size:11px;font-weight:700;
        line-height:1.15;color:var(--text-soft);white-space:nowrap;
      }
      .ecofining-board .eco-additional-treatment-stage{
        background:linear-gradient(180deg,#FBFDFE,var(--pre-soft) 350%);
      }
      .ecofining-board .eco-additional-treatment-stage .additional-treatment-detail{
        display:grid;gap:7px;margin-top:10px;
      }
      .ecofining-board .eco-additional-treatment-stage .additional-treatment-detail div{
        padding:8px 10px;border:1px solid var(--line);border-radius:10px;
        background:rgba(255,255,255,.72);font-size:12px;line-height:1.35;color:var(--text-soft);
      }
      .ecofining-board .eco-additional-treatment-stage .additional-treatment-detail b{color:var(--blue-1)}
      .ecofining-board .eco-release-col{
        background:linear-gradient(180deg,var(--surface),var(--sel-soft) 290%);
        box-shadow:inset 0 4px 0 var(--sel);
      }
      .ecofining-board .eco-release-stage{
        background:linear-gradient(180deg,#FBFDFE,var(--sel-soft) 350%);
      }
      .ecofining-board .eco-release-stage .checkpoint-decision{
        background:var(--sel-soft);border-color:var(--line);
      }
    `;
    document.head.appendChild(style);

    const additional=document.createElement('article');
    additional.className='col type-pre eco-additional-treatment-col';
    additional.innerHTML=`
      <div class="macro-subtitle">02A · Pretratamiento externo</div>
      <div class="step-no">02A.5</div>
      <h3>Tratamientos adicionales según feedstock</h3>
      <div class="desc dual-desc">
        <div class="desc-point"><b>Cuándo aplica:</b> Sólo cuando el tren base no es suficiente para alcanzar la especificación HVO/HEFA. No todos los lotes requieren estas operaciones.</div>
        <div class="compact-treatment-chips">
          <span class="compact-treatment-chip">Heat treatment</span>
          <span class="compact-treatment-chip">Cl removal</span>
          <span class="compact-treatment-chip">Polymer removal</span>
          <span class="compact-treatment-chip">Deacidification</span>
          <span class="compact-treatment-chip">Otros</span>
        </div>
      </div>
      <div class="type-tags"><span class="type-tag pre"><i></i>Condicional · según calidad del feedstock</span></div>`;
    externalGroup.insertAdjacentElement('afterend',additional);

    const additionalStage=document.createElement('section');
    additionalStage.className='stage eco-additional-treatment-stage';
    additionalStage.innerHTML=`
      <div class="panel-title">02A.5 · Aplicación condicionada</div>
      <div class="stage-explain"><strong>No todos los feedstocks requieren estas operaciones.</strong> La tecnología, ubicación y secuencia dependen de la calidad de entrada, de los contaminantes presentes y de la especificación exigida por el productor HVO/HEFA.</div>
      <div class="additional-treatment-detail">
        <div><b>Heat treatment:</b> tratamiento térmico para facilitar la remoción de contaminantes difíciles.</div>
        <div><b>Chloride removal:</b> reduce compuestos de cloro que pueden generar corrosión o afectar el procesamiento posterior.</div>
        <div><b>Polymer / polyethylene removal:</b> retira plásticos o polímeros que pueden generar depósitos, ensuciamiento u obstrucciones.</div>
        <div><b>Deacidification / neutralization:</b> reduce FFA cuando la configuración del pretratamiento o del proceso posterior lo requiere.</div>
        <div><b>Otros tratamientos específicos:</b> operaciones adicionales definidas según composición y especificación del feedstock.</div>
      </div>
      <div class="checkpoint-decision"><b>Validar con proveedor / tecnólogo:</b> cuáles se usan realmente, para qué feedstocks, quién los realiza y en qué punto del tren se integran.</div>`;
    lowerExternal.insertAdjacentElement('afterend',additionalStage);

    const release=document.createElement('article');
    release.className='col type-sel eco-release-col';
    release.innerHTML=`
      <div class="step-no">02B</div>
      <h3>Liberación técnica del feedstock</h3>
      <div class="desc dual-desc">
        <div class="desc-point"><b>Proceso:</b> Se muestrea y analiza el material después del pretratamiento para confirmar si cumple la especificación antes de enviarlo a Tula.</div>
        <div class="desc-point"><b>Decisión:</b> liberar, corregir o rechazar el lote según los resultados.</div>
      </div>
      <div class="type-tags"><span class="type-tag sel"><i></i>Checkpoint de calidad antes del envío</span></div>`;
    additional.insertAdjacentElement('afterend',release);

    const releaseStage=document.createElement('section');
    releaseStage.className='stage eco-release-stage';
    releaseStage.innerHTML=`
      <div class="panel-title">02B · Punto de control antes de Tula</div>
      <div class="stage-explain">El objetivo es confirmar que el <strong>feedstock ya acondicionado</strong> cumple la especificación definida para su transporte y posterior recepción en Tula.</div>
      <div class="checkpoint-decision"><b>Variables por validar:</b> identificar cuáles se miden para liberar el producto después del pretratamiento, quién certifica el lote y cuáles deben volver a verificarse en la recepción de Tula.</div>`;
    additionalStage.insertAdjacentElement('afterend',releaseStage);

    /* v76 usa 15 columnas. Se agregan 02A.5 y 02B como dos columnas adicionales. */
    canvas.style.setProperty('min-width','6970px','important');
    strip.style.setProperty('grid-template-columns','repeat(17,minmax(410px,1fr))','important');
    strip2.style.setProperty('grid-template-columns','repeat(17,minmax(410px,1fr))','important');

    eco.dataset.additionalPretreatmentV79='true';
    return true;
  };

  if(run()) return;
  let attempts=0;
  const timer=setInterval(()=>{
    attempts+=1;
    if(run()||attempts>=100) clearInterval(timer);
  },100);
})();
