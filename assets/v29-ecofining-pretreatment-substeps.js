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
