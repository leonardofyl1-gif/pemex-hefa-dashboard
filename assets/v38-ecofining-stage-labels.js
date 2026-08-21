(()=>{
  const eco=document.querySelector('.ecofining-board');
  if(!eco||eco.dataset.stageLabelsV38==='true') return;

  const strip=eco.querySelector('.eco-strip');
  const strip2=eco.querySelector('.eco-strip2');
  if(!strip||!strip2) return;

  const topLevel=[...strip.children];
  const step06=topLevel.find(el=>el.querySelector?.('.step-no')?.textContent.trim()==='06');
  const step07=topLevel.find(el=>el.querySelector?.('.step-no')?.textContent.trim()==='07');

  if(step06){
    const title06=step06.querySelector('h3');
    if(title06) title06.textContent='Stage 1 – Hydrodeoxygenation — HDO (hidrodesoxigenación)';
  }

  if(step07){
    const title07=step07.querySelector('h3');
    if(title07) title07.textContent='Stage 2 – Isomerization (isomerización)';
  }

  const lowerStages=[...strip2.children];
  // Visual mapping after the 02 parent span remains:
  // 0=01, 1=02, 2=03, 3=03b, 4=04, 5=05, 6=05b, 7=06, 8=07, 9=08.
  const lower06=lowerStages[7];
  if(lower06){
    const panelTitle=lower06.querySelector('.panel-title');
    const explain=lower06.querySelector('.stage-explain');
    if(panelTitle) panelTitle.textContent='Conversión química';
    if(explain) explain.innerHTML='En este punto la materia prima lipídica dejó de definirse por especificación de feedstock y empieza a definirse por cómo se transforma en hidrocarburos. <strong>Stage 1 (HDO)</strong> elimina oxígeno y contaminantes, y <strong>Stage 2 (isomerización)</strong> ajusta la estructura de las parafinas para que el producto final pueda orientarse a diésel renovable o a modo máximo SAF (corte jet).';
  }

  eco.dataset.stageLabelsV38='true';
})();
