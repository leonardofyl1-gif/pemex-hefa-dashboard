(()=>{
  const eco=document.querySelector('.ecofining-board');
  if(!eco||eco.dataset.stage2HeaderV40==='true') return;

  const strip=eco.querySelector('.eco-strip');
  if(!strip) return;

  const step07=[...strip.children].find(el=>el.querySelector?.('.step-no')?.textContent.trim()==='07');
  if(!step07) return;

  const physicalHeader=step07.querySelector('.desc-point:first-child b');
  if(physicalHeader){
    physicalHeader.textContent='Proceso físico (transforma parafinas lineales en parafinas ramificadas para mejorar el comportamiento en frío):';
  }

  eco.dataset.stage2HeaderV40='true';
})();
