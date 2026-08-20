(()=>{
  const eco=document.querySelector('.ecofining-board');
  if(!eco) return;

  const cols=[...eco.querySelectorAll('.eco-strip .col')];
  const step02=cols.find(col=>col.querySelector('.step-no')?.textContent.trim()==='02');
  if(step02){
    step02.classList.remove('type-sel');
    step02.classList.add('type-pre');

    const title=step02.querySelector('h3');
    if(title) title.textContent='Pretratamiento HVO/HEFA (fuera de Tula)';

    const desc=step02.querySelector('.desc');
    if(desc){
      desc.innerHTML=`
        <div class="desc-point"><b>Proceso físico:</b> La grasa renderizada se filtra y limpia mediante filtros, centrifugación y separación para retirar sólidos visibles, restos de plástico o polietileno, partículas de hueso, tierra y otras impurezas físicas.</div>
        <div class="desc-point"><b>Proceso químico:</b> Etapas previas tipo degumming/bleaching ayudan a remover fosfolípidos, fósforo y metales como Ca, Mg, Na, K y Fe, además de reducir sales, siliconas, jabones e insaponificables que podrían dañar el catalizador.</div>
        <div class="desc-point"><b>Antes → Después:</b> Antes: grasa con pedazos, partículas e impurezas. Después: grasa más clara, filtrada y acondicionada para llegar al sistema de PEMEX.</div>`;
    }

    const tags=step02.querySelector('.type-tags');
    if(tags) tags.innerHTML='<span class="type-tag pre"><i></i>Pretratamiento fuera de Tula</span>';
  }

  const stages=[...eco.querySelectorAll('.eco-strip2 .stage')];
  const stage02=stages[1];
  if(stage02){
    const panelTitle=stage02.querySelector('.panel-title');
    if(panelTitle) panelTitle.textContent='Punto de control';
    const explain=stage02.querySelector('.stage-explain');
    if(explain){
      explain.innerHTML='Este paso define los <strong>requisitos mínimos de limpieza</strong> que la tecnología Ecofining necesita: qué se debe filtrar o eliminar, como sólidos, plásticos, fósforo, metales y otros contaminantes. <strong>Ocurre fuera de Tula y no es controlado directamente por PEMEX.</strong> El cumplimiento se verifica más adelante en Tula mediante las pruebas de recepción y el checkpoint técnico HEFA, no aquí.';
    }
  }
})();
