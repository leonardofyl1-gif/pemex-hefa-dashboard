(()=>{
  const eco=document.querySelector('.ecofining-board');
  if(!eco||eco.dataset.hdoBalanceV39==='true') return;

  const strip=eco.querySelector('.eco-strip');
  const strip2=eco.querySelector('.eco-strip2');
  if(!strip||!strip2) return;

  const topLevel=[...strip.children];
  const step06=topLevel.find(el=>el.querySelector?.('.step-no')?.textContent.trim()==='06');
  if(step06){
    const physicalHeader=step06.querySelector('.desc-point:first-child b');
    if(physicalHeader) physicalHeader.textContent='Proceso físico (elimina el oxígeno de la grasa usando hidrógeno):';
  }

  const step08=topLevel.find(el=>el.querySelector?.('.step-no')?.textContent.trim()==='08');
  const lowerStages=[...strip2.children];
  const lower08=step08 ? lowerStages[9] : null;
  if(lower08){
    const panelTitle=lower08.querySelector('.panel-title');
    const explain=lower08.querySelector('.stage-explain');
    if(panelTitle?.textContent.trim().toLowerCase()==='conversión química'&&explain){
      explain.textContent='La materia prima lipídica para SAF (grasas, aceites y sebos) ya fue convertida en hidrocarburos a través de Stage 1 (HDO) y Stage 2 (isomerización). Del 100% del producto líquido que sale de Ecofining en modo máximo SAF, aproximadamente 75–80% termina como SAF (corte jet), y el 20–25% restante se reparte entre diésel renovable, nafta y una fracción de gases ligeros (principalmente propano).';
    }
  }

  eco.dataset.hdoBalanceV39='true';
})();
