(()=>{
  const apply=()=>{
    const vegan=document.querySelector('.vegan-board');
    if(!vegan||vegan.dataset.stageLabelsProductV41==='true') return false;

    const strip=vegan.querySelector('.vegan-strip');
    const strip2=vegan.querySelector('.vegan-strip2');
    if(!strip||!strip2) return false;

    const topLevel=[...strip.children];
    const step05=topLevel.find(el=>el.querySelector?.('.step-no')?.textContent.trim()==='05');
    const step06=topLevel.find(el=>el.querySelector?.('.step-no')?.textContent.trim()==='06');

    if(!step05||!step06) return false;

    const title05=step05.querySelector('h3');
    if(title05) title05.textContent='Stage 1 – Hydrotreatment (hidrotratamiento) · Vegan';
    const physical05=step05.querySelector('.desc-point:first-child b');
    if(physical05) physical05.textContent='Proceso físico (elimina el oxígeno de los lípidos con hidrógeno y forma parafinas lineales):';

    const title06=step06.querySelector('h3');
    if(title06) title06.textContent='Stage 2 – Hydroisomerization (hidroisomerización) · Vegan';
    const physical06=step06.querySelector('.desc-point:first-child b');
    if(physical06) physical06.textContent='Proceso físico (convierte parafinas lineales en parafinas ramificadas y ajusta el balance entre diésel renovable y SAF):';

    const productStage=[...strip2.children].find(stage=>stage.querySelector?.('.panel-title')?.textContent.trim().toLowerCase()==='producto');
    if(productStage){
      const explain=productStage.querySelector('.stage-explain');
      if(explain){
        explain.textContent='Se separan y terminan las fracciones para obtener renewable diesel y SAF. En modo de máxima producción de SAF, del 100% del producto líquido que sale de Vegan aproximadamente 75–80% termina como SAF (corte jet), y el 20–25% restante se reparte entre diésel renovable, nafta y una fracción de gases ligeros (principalmente propano). Estos porcentajes pueden variar según la configuración de operación y el blending comercial.';
      }
    }

    vegan.dataset.stageLabelsProductV41='true';
    return true;
  };

  if(apply()) return;
  let tries=0;
  const timer=setInterval(()=>{
    tries+=1;
    if(apply()||tries>=240) clearInterval(timer);
  },250);
})();
