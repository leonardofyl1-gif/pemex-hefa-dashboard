(()=>{
  const eco=document.querySelector('.ecofining-board');
  if(!eco) return;

  const commercial=eco.querySelector('.commercial-stage .varlist');
  const technical=eco.querySelector('.technical-stage .varlist');
  if(!commercial||!technical) return;

  const findCard=(root,prefix)=>[...root.querySelectorAll('.var')].find(card=>{
    const strong=card.querySelector('strong');
    return strong && strong.textContent.trim().startsWith(prefix);
  });

  // Approved Ecofining reception placement: move T19, T21 and T23 from 05b to 03b.
  ['T19','T21','T23'].forEach(prefix=>{
    const card=findCard(technical,prefix);
    if(card){
      card.classList.remove('proc');
      card.classList.add('sel');
      commercial.appendChild(card);
    }
  });

  // Reception-specific wording for the variables that moved upstream.
  const t19=findCard(commercial,'T19');
  if(t19){
    const chip=t19.querySelector('.valchip');
    if(chip) chip.textContent='Referencia de recepción por validar';
  }

  // Keep T05 and T06 as separate residual controls at 05b.
  const combined=findCard(technical,'T05 / T06');
  if(combined){
    const t05=document.createElement('div');
    t05.className='var proc';
    t05.innerHTML='<strong>T05 · Impurezas residuales</strong>Material no deseado distinto de la grasa que permanece después del pretratamiento y puede afectar la calidad de alimentación al HDO.<div class="rangerow"><span class="valchip">Límite de entrada por validar</span></div>';
    const t06=document.createElement('div');
    t06.className='var proc';
    t06.innerHTML='<strong>T06 · Sólidos residuales</strong>Partículas finas que permanecen después de la limpieza y filtración final; pueden contribuir a fouling, obstrucción y caída de presión.<div class="rangerow"><span class="valchip">Límite de entrada por validar</span></div>';
    combined.replaceWith(t05,t06);
  }

  // Clarify that T08 is evaluated post-pretreatment at the technical checkpoint.
  const t08=findCard(technical,'T08');
  if(t08){
    const strong=t08.querySelector('strong');
    if(strong) strong.textContent='T08 · FFA post-pretratamiento';
  }

  // Align the process-card descriptions with the approved variable placement.
  const receptionCol=[...eco.querySelectorAll('.eco-strip .col')].find(col=>col.querySelector('.step-no')?.textContent.trim()==='03b');
  if(receptionCol){
    const points=receptionCol.querySelectorAll('.desc-point');
    if(points[1]) points[1].innerHTML='<b>Proceso químico:</b> No se modifica la grasa; se caracteriza el lote recibido mediante humedad, FFA, oxidación, impurezas, azufre, MIU, insaturación, plásticos/polímeros y contaminantes orgánicos específicos, comparando los resultados contra las referencias de recepción aplicables.';
  }

  const technicalCol=[...eco.querySelectorAll('.eco-strip .col')].find(col=>col.querySelector('.step-no')?.textContent.trim()==='05b');
  if(technicalCol){
    const points=technicalCol.querySelectorAll('.desc-point');
    if(points[1]) points[1].innerHTML='<b>Proceso químico:</b> No se busca una nueva reacción; se confirma que fósforo, metales, humedad e impurezas/sólidos residuales, FFA post-pretratamiento, cloruros/sales, silicio/siliconas, jabones, insaponificables, TAN y compuestos oxigenados estén en niveles compatibles con la protección del catalizador y los equipos.';
  }
})();
