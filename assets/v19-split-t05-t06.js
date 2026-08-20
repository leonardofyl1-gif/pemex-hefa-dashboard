(()=>{
  const technicalStage=document.querySelector('.technical-stage .varlist');
  if(!technicalStage) return;

  const combined=[...technicalStage.querySelectorAll('.var')].find(card=>{
    const strong=card.querySelector('strong');
    return strong && strong.textContent.includes('T05 / T06');
  });

  if(combined){
    const t05=document.createElement('div');
    t05.className='var proc';
    t05.innerHTML='<strong>T05 · Impurezas residuales</strong>Material no deseado distinto de la grasa que permanece después del pretratamiento y puede afectar la calidad de alimentación al HDO.<div class="rangerow"><span class="valchip">Límite de entrada por validar</span></div>';

    const t06=document.createElement('div');
    t06.className='var proc';
    t06.innerHTML='<strong>T06 · Sólidos residuales</strong>Partículas finas que permanecen después de la limpieza y filtración final; pueden contribuir a fouling, obstrucción y caída de presión.<div class="rangerow"><span class="valchip">Límite de entrada por validar</span></div>';

    combined.replaceWith(t05,t06);
  }

  document.title='Feedstock Process Dashboard BIARAI v19 — Proceso 1 Ecofining';
  const e=document.querySelector('.eyebrow');
  if(e) e.textContent='Criterios técnicos · Procesos por tecnología · v19';
})();
