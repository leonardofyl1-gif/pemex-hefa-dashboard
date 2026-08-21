(()=>{
  const eco=document.querySelector('.ecofining-board');
  if(!eco||eco.dataset.separationV37==='true') return;

  const strip=eco.querySelector('.eco-strip');
  const strip2=eco.querySelector('.eco-strip2');
  const canvas=eco.querySelector('.eco-canvas');
  if(!strip||!strip2||!canvas) return;

  const existing=[...strip.querySelectorAll(':scope > .col')].find(col=>col.querySelector('.step-no')?.textContent.trim()==='08');
  if(existing) return;

  const step07=[...strip.querySelectorAll(':scope > .col')].find(col=>col.querySelector('.step-no')?.textContent.trim()==='07');
  if(!step07) return;

  const style=document.createElement('style');
  style.textContent=`
    .ecofining-board .eco-canvas.eco-v37-canvas{min-width:5330px}
    .ecofining-board .eco-strip.eco-v37-strip,
    .ecofining-board .eco-strip2.eco-v37-strip2{grid-template-columns:repeat(13,minmax(410px,1fr))}
    @media(max-width:900px){.ecofining-board .eco-canvas.eco-v37-canvas{min-width:5330px}}
  `;
  document.head.appendChild(style);

  const step08=document.createElement('article');
  step08.className='col conversion-col';
  step08.innerHTML=`
    <div class="step-no">08</div>
    <h3>Separation / Fractionation (separación y fraccionamiento)</h3>
    <div class="desc dual-desc">
      <div class="desc-point"><b>Proceso físico (separa los hidrocarburos según su punto de ebullición):</b> La corriente de hidrocarburos isomerizados se enfría y pasa por un tren de separación (separador gas‑líquido y columnas de destilación). Ahí se divide en distintos cortes según su punto de ebullición.</div>
      <div class="desc-point"><b>Proceso químico:</b> No ocurre ninguna reacción química; es una separación física por temperatura de ebullición. Se obtienen las fracciones finales: gases ligeros/propano, nafta, SAF (combustible de aviación sostenible) y diésel renovable, cada una con su especificación comercial.</div>
    </div>
    <div class="type-tags"><span class="type-tag conversion"><i></i>Terminación de producto Ecofining</span></div>`;
  step07.insertAdjacentElement('afterend',step08);

  const lower08=document.createElement('section');
  lower08.className='stage muted-stage';
  lower08.innerHTML=`
    <div class="panel-title">Conversión química</div>
    <div class="stage-explain">La materia prima lipídica para SAF (grasas, aceites y sebos) ya fue convertida en hidrocarburos. En configuración de dos etapas y modo máximo SAF, aproximadamente <strong>75–80% del producto líquido final se obtiene como SAF (corte jet)</strong>, complementado con diésel renovable, nafta y una fracción de gases ligeros.</div>`;
  strip2.appendChild(lower08);

  canvas.classList.add('eco-v37-canvas');
  strip.classList.add('eco-v37-strip');
  strip2.classList.add('eco-v37-strip2');
  eco.dataset.separationV37='true';

  requestAnimationFrame(()=>{
    const flow=eco.querySelector('.scroll.eco-scroll');
    const track=eco.previousElementSibling?.querySelector?.('.flow-top-scroll-track') || eco.querySelector('.flow-top-scroll-track');
    if(flow&&track) track.style.width=`${flow.scrollWidth}px`;
    window.dispatchEvent(new Event('resize'));
  });
})();
