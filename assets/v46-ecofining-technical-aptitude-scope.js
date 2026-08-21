(()=>{
  const eco=document.querySelector('.ecofining-board');
  if(!eco||eco.dataset.technicalAptitudeScopeV46==='true') return;

  const technicalStage=[...eco.querySelectorAll('.technical-stage')].find(stage=>
    stage.querySelector('.panel-title')?.textContent.trim()==='Variables de entrada · aptitud técnica HEFA'
  );
  const varlist=technicalStage?.querySelector('.varlist');
  if(!technicalStage||!varlist) return;

  const allowed=['T10','T11','T04','T05','T06','T08','T15','T16','T17','T18','T20','T22'];
  const prefixOf=card=>{
    const text=card.querySelector('strong')?.textContent.trim()||'';
    return allowed.find(prefix=>text.startsWith(prefix))||null;
  };

  // 05B is exclusively the technical aptitude checkpoint for the conditioned feedstock.
  [...varlist.querySelectorAll('.var')].forEach(card=>{
    if(!prefixOf(card)) card.remove();
  });

  // Short scope explanation above the first technical variable.
  if(!technicalStage.querySelector('.eco-technical-intro-v46')){
    const intro=document.createElement('div');
    intro.className='stage-explain eco-technical-intro-v46';
    intro.style.marginBottom='10px';
    intro.innerHTML='En este punto el lote ya pasó por Degumming y Bleaching. Aquí no se define el precio comercial, sino la <strong>aptitud técnica del feedstock para entrar al HDO/Stage 1 de Ecofining</strong>, verificando que fósforo, metales, sales, sílice, jabones, agua, sólidos y compuestos oxigenados residuales estén dentro de límites seguros para el catalizador.';
    technicalStage.insertBefore(intro,varlist);
  }

  const findCard=prefix=>[...varlist.querySelectorAll('.var')].find(card=>
    card.querySelector('strong')?.textContent.trim().startsWith(prefix)
  );

  const appendSentence=(prefix,sentence,key)=>{
    const card=findCard(prefix);
    if(!card||card.dataset[key]==='true') return;
    const range=card.querySelector('.rangerow');
    if(!range) return;
    const existing=card.textContent;
    if(!existing.includes(sentence)){
      card.insertBefore(document.createTextNode(' '+sentence),range);
    }
    card.dataset[key]='true';
  };

  appendSentence(
    'T10',
    'El fósforo es uno de los venenos más agresivos para el catalizador de HDO; se busca reducirlo a trazas antes de Ecofining.',
    'phosphorusNoteV46'
  );

  appendSentence(
    'T15',
    'Los cloruros y sales son críticos por corrosión y depósitos en la sección catalítica; se controlan a partir del desempeño de Degumming y Bleaching.',
    'chloridesNoteV46'
  );

  eco.dataset.technicalAptitudeScopeV46='true';
})();
