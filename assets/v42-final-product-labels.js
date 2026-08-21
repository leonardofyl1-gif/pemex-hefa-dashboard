(()=>{
  const applyEco=()=>{
    const eco=document.querySelector('.ecofining-board');
    if(!eco||eco.dataset.finalProductLabelsV42==='true') return !!eco;

    const strip=eco.querySelector('.eco-strip');
    if(!strip) return false;

    const step08=[...strip.children].find(el=>el.querySelector?.('.step-no')?.textContent.trim()==='08');
    if(!step08) return false;

    const title08=step08.querySelector('h3');
    if(title08) title08.textContent='Separation / Fractionation (separación y fraccionamiento en gases, nafta, SAF y diésel renovable)';

    const physical08=step08.querySelector('.desc-point:first-child b');
    if(physical08) physical08.textContent='Proceso físico (separa los hidrocarburos según su punto de ebullición en gases, nafta, SAF y diésel renovable):';

    eco.dataset.finalProductLabelsV42='true';
    return true;
  };

  const applyVegan=()=>{
    const vegan=document.querySelector('.vegan-board');
    if(!vegan||vegan.dataset.finalProductLabelsV42==='true') return !!vegan;
    if(vegan.dataset.terminologyV28!=='true'||vegan.dataset.stageLabelsProductV41!=='true') return false;

    const strip=vegan.querySelector('.vegan-strip');
    if(!strip) return false;

    const step07=[...strip.children].find(el=>el.querySelector?.('.step-no')?.textContent.trim()==='07');
    if(!step07) return false;

    const title07=step07.querySelector('h3');
    if(title07) title07.textContent='Cooling (enfría las corrientes), Fractionation (separa en cortes de producto) y Blending (mezcla para alcanzar la especificación comercial)';

    const physical07=step07.querySelector('.desc-point:first-child b');
    if(physical07) physical07.textContent='Proceso físico (enfría y separa las corrientes en cortes de producto antes del blending):';

    vegan.dataset.finalProductLabelsV42='true';
    return true;
  };

  applyEco();
  if(applyVegan()) return;

  let tries=0;
  const timer=setInterval(()=>{
    tries+=1;
    applyEco();
    if(applyVegan()||tries>=240) clearInterval(timer);
  },250);
})();
