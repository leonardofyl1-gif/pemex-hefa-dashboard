(()=>{
  let attempts=0;
  const timer=setInterval(()=>{
    attempts+=1;
    const hydro=document.querySelector('[data-process="hydroflex"]');
    if(!hydro||!hydro.querySelector('.eco-scroll')){
      if(attempts>=100) clearInterval(timer);
      return;
    }
    clearInterval(timer);
    if(hydro.dataset.pretreatmentV30==='true') return;

    const strip=hydro.querySelector('.hydro-strip');
    const strip2=hydro.querySelector('.hydro-strip2');
    const canvas=hydro.querySelector('.hydro-canvas');
    if(!strip||!strip2||!canvas) return;

    const cols=[...strip.children];
    const step02=cols.find(col=>col.querySelector?.('.step-no')?.textContent.trim()==='02');
    if(!step02) return;

    const style=document.createElement('style');
    style.textContent=`
      .hydroflex-board .hydro-canvas.hydro-v30-canvas{min-width:6150px}
      .hydroflex-board .hydro-strip.hydro-v30-strip,
      .hydroflex-board .hydro-strip2.hydro-v30-strip2,
      .hydroflex-board .hydro-conditioning-band{grid-template-columns:repeat(15,minmax(410px,1fr))}
      .hydroflex-board .hydro-conditioning-group{grid-column:8/12}
      .hydro-pretreatment-group{grid-column:span 4;display:grid;grid-template-rows:auto 1fr;background:linear-gradient(180deg,var(--surface),var(--pre-soft) 260%);box-shadow:inset 0 4px 0 var(--pre);border-right:1px solid var(--line)}
      .hydro-pretreatment-parent{padding:14px 16px 13px;border-bottom:1px solid var(--line);background:linear-gradient(90deg,var(--surface),var(--pre-soft),var(--surface))}
      .hydro-pretreatment-parent .parent-head{display:flex;align-items:flex-start;gap:12px}
      .hydro-pretreatment-parent .parent-no{font-family:var(--font-display);font-size:13px;font-weight:900;color:var(--pre);padding:5px 8px;border-radius:999px;background:var(--pre-soft);white-space:nowrap}
      .hydro-pretreatment-parent h3{font-family:var(--font-display);font-size:16px;line-height:1.2;color:var(--blue-1);margin:2px 0 6px}
      .hydro-pretreatment-parent p{font-size:var(--text-xs);line-height:1.45;color:var(--text-soft);margin:0;max-width:120ch}
      .hydro-pretreatment-subgrid{display:grid;grid-template-columns:repeat(4,minmax(410px,1fr))}
      .hydro-pretreatment-subgrid .col{min-width:0;background:linear-gradient(180deg,var(--surface),var(--pre-soft) 310%);box-shadow:inset 0 4px 0 var(--pre)}
      .hydro-pretreatment-subgrid .col:not(:last-child){border-right:1px solid var(--line)}
      .hydro-pretreatment-control{grid-column:span 4;background:linear-gradient(180deg,#FBFDFE,var(--pre-soft) 350%)}
      @media(max-width:900px){.hydroflex-board .hydro-canvas.hydro-v30-canvas{min-width:6150px}}
    `;
    document.head.appendChild(style);

    const headText=hydro.querySelector('.board-head p');
    if(headText) headText.innerHTML='La ruta se lee de izquierda a derecha y respeta el proceso canónico aprobado. El <strong>02 · Pretratamiento HVO/HEFA del feedstock</strong> se muestra como un macroproceso externo a Tula dividido en cuatro operaciones consecutivas; el <strong>04 · Acondicionamiento del feedstock</strong> conserva su estructura actual.';

    const group=document.createElement('div');
    group.className='hydro-pretreatment-group';
    group.innerHTML=`
      <div class="hydro-pretreatment-parent">
        <div class="parent-head">
          <span class="parent-no">02</span>
          <div>
            <h3>02 – Pretratamiento HVO/HEFA del feedstock (fuera de Tula)</h3>
            <p>Este bloque agrupa el <strong>pretratamiento HVO/HEFA del feedstock</strong> asociado al proyecto HydroFlex. Aquí se realizan, de forma típica en la industria, las etapas de desgomado (degumming), blanqueo con tierras (bleaching), secado y filtración de pulido, que reducen gomas, fósforo, metales, agua y sólidos antes de la sección catalítica HydroFlex.</p>
          </div>
        </div>
      </div>
      <div class="hydro-pretreatment-subgrid">
        <article class="col type-pre">
          <div class="macro-subtitle">02 · Pretratamiento HVO/HEFA</div>
          <div class="step-no">02.1</div>
          <h3>Degumming (desgomado)</h3>
          <div class="desc dual-desc">
            <div class="desc-point"><b>Proceso físico:</b> La grasa se mezcla con agua y/o ácidos suaves y después pasa por separación o centrifugación para retirar una fase que concentra gomas y fosfolípidos.</div>
            <div class="desc-point"><b>Proceso químico:</b> Los fosfolípidos se hidratan o acondicionan para facilitar su separación, reduciendo gomas, fosfolípidos y parte del fósforo antes de las etapas posteriores.</div>
          </div>
          <div class="type-tags"><span class="type-tag pre"><i></i>Pretratamiento · 1/4</span></div>
        </article>
        <article class="col type-pre">
          <div class="macro-subtitle">02 · Pretratamiento HVO/HEFA</div>
          <div class="step-no">02.2</div>
          <h3>Bleaching (blanqueo) / Advanced filtration (filtración avanzada)</h3>
          <div class="desc dual-desc">
            <div class="desc-point"><b>Proceso físico:</b> La grasa entra en contacto con tierras o arcillas activadas y, después, el adsorbente cargado de contaminantes se retira mediante filtración.</div>
            <div class="desc-point"><b>Proceso químico:</b> Predomina la adsorción de fósforo residual, metales y otros contaminantes sobre la superficie del adsorbente, reduciendo su carga antes de la sección catalítica.</div>
          </div>
          <div class="type-tags"><span class="type-tag pre"><i></i>Pretratamiento · 2/4</span></div>
        </article>
        <article class="col type-pre">
          <div class="macro-subtitle">02 · Pretratamiento HVO/HEFA</div>
          <div class="step-no">02.3</div>
          <h3>Drying (secado)</h3>
          <div class="desc dual-desc">
            <div class="desc-point"><b>Proceso físico:</b> Se reduce la humedad residual del feedstock mediante secado, pudiendo utilizar temperatura, vacío u otra configuración de ingeniería.</div>
            <div class="desc-point"><b>Proceso químico:</b> No se busca una reacción química; el objetivo es retirar agua para entregar una corriente más seca y estable.</div>
          </div>
          <div class="type-tags"><span class="type-tag pre"><i></i>Pretratamiento · 3/4</span></div>
        </article>
        <article class="col type-pre">
          <div class="macro-subtitle">02 · Pretratamiento HVO/HEFA</div>
          <div class="step-no">02.4</div>
          <h3>Polishing filtration (filtración de pulido)</h3>
          <div class="desc dual-desc">
            <div class="desc-point"><b>Proceso físico:</b> El feedstock atraviesa una filtración fina final para retirar partículas muy pequeñas y finos residuales que hayan permanecido después de las etapas anteriores.</div>
            <div class="desc-point"><b>Proceso químico:</b> No se busca una reacción química; la función es física y consiste en reducir al mínimo los sólidos residuales antes de la sección catalítica.</div>
          </div>
          <div class="type-tags"><span class="type-tag pre"><i></i>Pretratamiento · 4/4</span></div>
        </article>
      </div>`;

    step02.replaceWith(group);

    const stages=[...strip2.children];
    const stage02=stages[1];
    if(stage02){
      stage02.classList.add('hydro-pretreatment-control');
      const title=stage02.querySelector('.panel-title');
      if(title) title.textContent='Punto de control · bloque 02 completo';
      const explain=stage02.querySelector('.stage-explain');
      if(explain) explain.innerHTML='<strong>Este tren de pretratamiento HVO/HEFA se diseña específicamente para el proyecto HydroFlex, siguiendo el esquema estándar de la industria; los detalles exactos se definen con el licenciante y los proveedores de pretreatment.</strong> El bloque ocurre fuera de Tula y prepara el feedstock antes del transporte y de los controles posteriores.';
    }

    canvas.classList.add('hydro-v30-canvas');
    strip.classList.add('hydro-v30-strip');
    strip2.classList.add('hydro-v30-strip2');
    hydro.dataset.pretreatmentV30='true';

    requestAnimationFrame(()=>{
      window.dispatchEvent(new Event('resize'));
      const flow=hydro.querySelector('.scroll.eco-scroll');
      const top=flow?.previousElementSibling?.querySelector('.flow-top-scroll');
      const track=top?.querySelector('.flow-top-scroll-track');
      if(flow&&track) track.style.width=`${flow.scrollWidth}px`;
    });
  },100);
})();
