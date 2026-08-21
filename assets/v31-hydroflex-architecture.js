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
    if(hydro.dataset.architectureV31==='true') return;

    const strip=hydro.querySelector('.hydro-strip');
    const strip2=hydro.querySelector('.hydro-strip2');
    const canvas=hydro.querySelector('.hydro-canvas');
    if(!strip||!strip2||!canvas) return;

    const findStep=no=>[...strip.querySelectorAll(':scope > .col')].find(col=>col.querySelector('.step-no')?.textContent.trim()===no);
    const step02=findStep('02');
    const step041=findStep('04.1');
    const step042=findStep('04.2');
    const step043=findStep('04.3');
    const step044=findStep('04.4');
    const step05=findStep('05');
    if(!step02||!step041||!step042||!step043||!step044||!step05) return;

    const stages=[...strip2.children];
    if(stages.length<12) return;
    const stage04=stages[4];
    const stage042=stages[5];
    const stage043=stages[6];
    const stage044=stages[7];
    const stage05=stages[8];

    const style=document.createElement('style');
    style.textContent=`
      .hydroflex-board .hydro-canvas.hydro-v31-canvas{min-width:6150px}
      .hydroflex-board .hydro-strip.hydro-v31-strip,
      .hydroflex-board .hydro-strip2.hydro-v31-strip2{grid-template-columns:repeat(15,minmax(410px,1fr))}
      .hydro-pretreatment-group{grid-column:span 4;display:grid;grid-template-rows:auto 1fr;background:linear-gradient(180deg,var(--surface),var(--pre-soft) 260%);box-shadow:inset 0 4px 0 var(--pre);border-right:1px solid var(--line)}
      .hydro-pretreatment-parent,.hydro-guard-parent{padding:14px 16px 13px;border-bottom:1px solid var(--line);background:linear-gradient(90deg,var(--surface),var(--pre-soft),var(--surface))}
      .hydro-pretreatment-parent .parent-head,.hydro-guard-parent .parent-head{display:flex;align-items:flex-start;gap:12px}
      .hydro-pretreatment-parent .parent-no,.hydro-guard-parent .parent-no{font-family:var(--font-display);font-size:13px;font-weight:900;color:var(--pre);padding:5px 8px;border-radius:999px;background:var(--pre-soft);white-space:nowrap}
      .hydro-pretreatment-parent h3,.hydro-guard-parent h3{font-family:var(--font-display);font-size:16px;line-height:1.2;color:var(--blue-1);margin:2px 0 6px}
      .hydro-pretreatment-parent p,.hydro-guard-parent p{font-size:var(--text-xs);line-height:1.45;color:var(--text-soft);margin:0;max-width:120ch}
      .hydro-pretreatment-subgrid{display:grid;grid-template-columns:repeat(4,minmax(410px,1fr))}
      .hydro-pretreatment-subgrid .col,.hydro-guard-subgrid .col{min-width:0;background:linear-gradient(180deg,var(--surface),var(--pre-soft) 310%);box-shadow:inset 0 4px 0 var(--pre)}
      .hydro-pretreatment-subgrid .col:not(:last-child),.hydro-guard-subgrid .col:not(:last-child){border-right:1px solid var(--line)}
      .hydro-pretreatment-control{grid-column:span 4;background:linear-gradient(180deg,#FBFDFE,var(--pre-soft) 350%)}
      .hydro-degumming-single{background:linear-gradient(180deg,var(--surface),var(--pre-soft) 290%);box-shadow:inset 0 4px 0 var(--pre)}
      .hydro-guard-group{grid-column:span 3;display:grid;grid-template-rows:auto 1fr;background:linear-gradient(180deg,var(--surface),var(--pre-soft) 260%);box-shadow:inset 0 4px 0 var(--pre);border-right:1px solid var(--line)}
      .hydro-guard-subgrid{display:grid;grid-template-columns:repeat(3,minmax(410px,1fr))}
      .hydro-guard-control{grid-column:span 3;background:linear-gradient(180deg,#FBFDFE,var(--pre-soft) 350%)}
      .hydro-contaminants{margin-top:2px;padding:8px 9px;border:1px dashed var(--line);border-radius:10px;background:rgba(255,255,255,.62);font-size:11px;color:var(--text-soft);line-height:1.4}
      .hydro-contaminants b{color:var(--blue-1)}
      @media(max-width:900px){.hydroflex-board .hydro-canvas.hydro-v31-canvas{min-width:6150px}}
    `;
    document.head.appendChild(style);

    const oldBand=hydro.querySelector('.hydro-conditioning-band');
    if(oldBand) oldBand.remove();

    const headText=hydro.querySelector('.board-head p');
    if(headText) headText.innerHTML='La ruta se lee de izquierda a derecha y respeta el proceso canónico aprobado. El <strong>02 · Pretratamiento HVO/HEFA</strong> ocurre fuera de Tula; después de la recepción, <strong>04 · Degumming (desgomado)</strong> se mantiene como operación aislada y <strong>05 · Acondicionamiento interno</strong> agrupa los guard beds HydroFlex antes del catalizador principal.';

    const pretreatment=document.createElement('div');
    pretreatment.className='hydro-pretreatment-group';
    pretreatment.innerHTML=`
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
        <article class="col type-pre"><div class="macro-subtitle">02 · Pretratamiento HVO/HEFA</div><div class="step-no">02.1</div><h3>Degumming (desgomado)</h3><div class="desc dual-desc"><div class="desc-point"><b>Proceso físico:</b> La grasa se mezcla con agua y/o ácidos suaves y después pasa por separación o centrifugación para retirar una fase que concentra gomas y fosfolípidos.</div><div class="desc-point"><b>Proceso químico:</b> Los fosfolípidos se hidratan o acondicionan para facilitar su separación, reduciendo gomas, fosfolípidos y parte del fósforo antes de las etapas posteriores.</div></div><div class="type-tags"><span class="type-tag pre"><i></i>Pretratamiento · 1/4</span></div></article>
        <article class="col type-pre"><div class="macro-subtitle">02 · Pretratamiento HVO/HEFA</div><div class="step-no">02.2</div><h3>Bleaching (blanqueo) / Advanced filtration (filtración avanzada)</h3><div class="desc dual-desc"><div class="desc-point"><b>Proceso físico:</b> La grasa entra en contacto con tierras o arcillas activadas y, después, el adsorbente cargado de contaminantes se retira mediante filtración.</div><div class="desc-point"><b>Proceso químico:</b> Predomina la adsorción de fósforo residual, metales y otros contaminantes sobre la superficie del adsorbente, reduciendo su carga antes de la sección catalítica.</div></div><div class="type-tags"><span class="type-tag pre"><i></i>Pretratamiento · 2/4</span></div></article>
        <article class="col type-pre"><div class="macro-subtitle">02 · Pretratamiento HVO/HEFA</div><div class="step-no">02.3</div><h3>Drying (secado)</h3><div class="desc dual-desc"><div class="desc-point"><b>Proceso físico:</b> Se reduce la humedad residual del feedstock mediante secado, pudiendo utilizar temperatura, vacío u otra configuración de ingeniería.</div><div class="desc-point"><b>Proceso químico:</b> No se busca una reacción química; el objetivo es retirar agua para entregar una corriente más seca y estable.</div></div><div class="type-tags"><span class="type-tag pre"><i></i>Pretratamiento · 3/4</span></div></article>
        <article class="col type-pre"><div class="macro-subtitle">02 · Pretratamiento HVO/HEFA</div><div class="step-no">02.4</div><h3>Polishing filtration (filtración de pulido)</h3><div class="desc dual-desc"><div class="desc-point"><b>Proceso físico:</b> El feedstock atraviesa una filtración fina final para retirar partículas muy pequeñas y finos residuales que hayan permanecido después de las etapas anteriores.</div><div class="desc-point"><b>Proceso químico:</b> No se busca una reacción química; la función es física y consiste en reducir al mínimo los sólidos residuales antes de la sección catalítica.</div></div><div class="type-tags"><span class="type-tag pre"><i></i>Pretratamiento · 4/4</span></div></article>
      </div>`;
    step02.replaceWith(pretreatment);

    step041.classList.remove('hydro-conditioning-col');
    step041.classList.add('hydro-degumming-single');
    step041.querySelector('.macro-subtitle')?.remove();
    const no04=step041.querySelector('.step-no'); if(no04) no04.textContent='04';
    const h04=step041.querySelector('h3'); if(h04) h04.textContent='Degumming (desgomado)';
    const tag04=step041.querySelector('.type-tags'); if(tag04) tag04.innerHTML='<span class="type-tag pre"><i></i>Degumming (desgomado)</span>';
    step042.remove(); step043.remove(); step044.remove();

    const guardGroup=document.createElement('div');
    guardGroup.className='hydro-guard-group';
    guardGroup.innerHTML=`
      <div class="hydro-guard-parent">
        <div class="parent-head">
          <span class="parent-no">05</span>
          <div>
            <h3>05 – Acondicionamiento interno del feedstock (guard beds HydroFlex)</h3>
            <p>Este bloque representa los <strong>guard beds del esquema de carga catalítica HydroFlex</strong>, que capturan fósforo, metales y otros venenos residuales antes de que alcancen el catalizador principal.</p>
          </div>
        </div>
      </div>
      <div class="hydro-guard-subgrid">
        <article class="col type-pre">
          <div class="macro-subtitle">05 · Acondicionamiento interno</div><div class="step-no">05.1</div><h3>Guard bed de fósforo (PhosTrap™)</h3>
          <div class="desc dual-desc"><div class="desc-point"><b>Proceso físico:</b> El feedstock pretratado entra primero a un <strong>guard bed de fósforo</strong>. Pasa a través de un lecho de partículas sólidas diseñadas para retener compuestos que contienen fósforo, sin necesidad de separar físicamente una nueva fase.</div><div class="desc-point"><b>Proceso químico:</b> El guard bed utiliza un catalizador tipo <strong>PhosTrap™</strong> u otros materiales equivalentes con alta afinidad por fósforo. El fósforo residual se fija sobre el sólido del guard bed en lugar de depositarse en el catalizador principal, prolongando la vida de la carga y reduciendo el riesgo de desactivación prematura.</div><div class="hydro-contaminants"><b>Contaminantes objetivo:</b> fósforo total (P), fosfolípidos residuales y compuestos organofosforados.</div></div>
          <div class="type-tags"><span class="type-tag pre"><i></i>Acondicionamiento interno – captura de fósforo (PhosTrap™)</span></div>
        </article>
        <article class="col type-pre">
          <div class="macro-subtitle">05 · Acondicionamiento interno</div><div class="step-no">05.2</div><h3>Guard beds de metales alcalinos y alcalinotérreos</h3>
          <div class="desc dual-desc"><div class="desc-point"><b>Proceso físico:</b> A continuación, el feedstock puede pasar por uno o más <strong>guard beds para metales ligeros</strong>, donde el aceite fluye a través de un lecho poroso que atrapa sales y especies metálicas disueltas.</div><div class="desc-point"><b>Proceso químico:</b> Estos guard catalysts están formulados para capturar principalmente <strong>Na, K, Ca y Mg</strong>, formando depósitos controlados dentro del lecho. De este modo, las sales y metales alcalinos y alcalinotérreos no llegan al catalizador principal HydroFlex.</div><div class="hydro-contaminants"><b>Contaminantes objetivo:</b> sodio (Na), potasio (K), calcio (Ca), magnesio (Mg) y sus sales asociadas.</div></div>
          <div class="type-tags"><span class="type-tag pre"><i></i>Acondicionamiento interno – captura de Na, K, Ca, Mg</span></div>
        </article>
        <article class="col type-pre">
          <div class="macro-subtitle">05 · Acondicionamiento interno</div><div class="step-no">05.3</div><h3>Guard beds de metales pesados y otros venenos</h3>
          <div class="desc dual-desc"><div class="desc-point"><b>Proceso físico:</b> En un tercer guard bed se pueden usar materiales específicos para <strong>metales pesados y otros venenos</strong>, colocados antes del catalizador de hydrotreating principal.</div><div class="desc-point"><b>Proceso químico:</b> Guard catalysts de la familia HydroFlex están diseñados para atrapar <strong>Fe, Ni, V y, en algunos casos, especies con Si u otros elementos traza</strong>, reduciendo su concentración en el feed que llega al catalizador principal y evitando fouling o pérdida de actividad.</div><div class="hydro-contaminants"><b>Contaminantes objetivo:</b> hierro (Fe), níquel (Ni), vanadio (V) y, según el diseño, otros venenos traza como compuestos con silicio (Si) u otros metales pesados.</div></div>
          <div class="type-tags"><span class="type-tag pre"><i></i>Acondicionamiento interno – captura de Fe, Ni, V y otros venenos</span></div>
        </article>
      </div>`;
    step05.replaceWith(guardGroup);

    stage04.classList.remove('hydro-conditioning-stage');
    const p04=stage04.querySelector('.panel-title'); if(p04) p04.textContent='04 · Degumming (desgomado)';
    const e04=stage04.querySelector('.stage-explain'); if(e04) e04.innerHTML='<strong>Objetivo:</strong> remover fosfolípidos, gomas y parte del fósforo mediante hidratación/acondicionamiento y separación.';
    stage04.querySelectorAll('.hydro-scope-mini').forEach(el=>el.remove());
    stage042.remove(); stage043.remove(); stage044.remove();

    stage05.classList.add('hydro-guard-control');
    const p05=stage05.querySelector('.panel-title'); if(p05) p05.textContent='Punto de control · 05 Guard beds HydroFlex';
    const e05=stage05.querySelector('.stage-explain'); if(e05) e05.innerHTML='En este punto se verifica que los <strong>guard beds HydroFlex</strong> estén cumpliendo su función de acondicionamiento interno: que el fósforo y los metales residuales —Na, K, Ca, Mg, Fe, Ni, V, Si, etc.— queden atrapados en los lechos de protección y no lleguen al catalizador principal. El desempeño se sigue mediante análisis periódicos de impurezas antes y después de los guard beds y el monitoreo de la caída de presión y de la vida del catalizador.';

    const foot=hydro.querySelector('.foot');
    if(foot) foot.innerHTML='<strong>Proceso canónico HydroFlex:</strong> 02 es el pretratamiento HVO/HEFA externo; 04 es una operación aislada de Degumming (desgomado); 05 es el acondicionamiento interno mediante guard beds HydroFlex dividido en 05.1 fósforo, 05.2 Na/K/Ca/Mg y 05.3 Fe/Ni/V/otros venenos. Después continúan 06 Control técnico, 07 HDO y 08 Hydroisomerization/Dewaxing.';

    canvas.classList.remove('hydro-v30-canvas');
    strip.classList.remove('hydro-v30-strip');
    strip2.classList.remove('hydro-v30-strip2');
    canvas.classList.add('hydro-v31-canvas');
    strip.classList.add('hydro-v31-strip');
    strip2.classList.add('hydro-v31-strip2');
    hydro.dataset.architectureV31='true';

    requestAnimationFrame(()=>{
      window.dispatchEvent(new Event('resize'));
      const flow=hydro.querySelector('.scroll.eco-scroll');
      const top=flow?.previousElementSibling?.querySelector('.flow-top-scroll');
      const track=top?.querySelector('.flow-top-scroll-track');
      if(flow&&track) track.style.width=`${flow.scrollWidth}px`;
    });
  },100);
})();
