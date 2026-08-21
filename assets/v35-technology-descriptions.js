(()=>{
  const style=document.createElement('style');
  style.textContent=`
    .technology-description{margin-top:14px;padding:15px 17px;border:1px solid var(--line);border-radius:14px;background:linear-gradient(180deg,var(--surface),var(--surface-2));color:var(--text-soft);font-size:var(--text-sm);line-height:1.55;max-width:1200px}
    .technology-description p{margin:0}
    .technology-description p+p{margin-top:10px}
    .technology-description strong{color:var(--blue-1)}
    .technology-description .technology-description-label{display:inline-flex;margin-bottom:8px;padding:5px 9px;border-radius:999px;background:var(--blue-5);color:var(--blue-6);font-size:10px;font-weight:800;letter-spacing:.05em;text-transform:uppercase}
  `;
  document.head.appendChild(style);

  const descriptions={
    ecofining:`
      <span class="technology-description-label">Descripción de la tecnología</span>
      <p>Ecofining™ es una tecnología HEFA desarrollada por Honeywell UOP y Eni para producir diésel renovable y SAF a partir de aceites y grasas residuales, incluyendo aceites usados y grasas animales. Se caracteriza por un <strong>esquema relativamente compacto</strong> donde el pretratamiento —con Degumming (desgomado) y Bleaching (blanqueo)— y la sección de hidrogenación/isomerización están muy integrados para maximizar rendimiento a diésel/jet y eficiencia energética.</p>
      <p>Frente a HydroFlex y Vegan, Ecofining suele verse como la <strong>opción “probada en muchas refinerías” con foco en eficiencia y rendimiento</strong>: lleva más de una década en servicio comercial y tiene múltiples casos de conversión de refinerías fósiles a renovables. Es especialmente atractiva cuando el portafolio de feedstocks está más acotado —aceites usados y algunas grasas— y se prioriza rendimiento y aprovechamiento de activos existentes.</p>`,
    hydroflex:`
      <span class="technology-description-label">Descripción de la tecnología</span>
      <p>HydroFlex™ es una tecnología HEFA de Topsoe que permite convertir una gama muy amplia de grasas y aceites —sebos animales, aceites usados, tall oil, aceites vegetales y otros feedstocks renovables— en diésel renovable y SAF “drop-in”. Su gran sello es la <strong>flexibilidad de feedstock</strong>: está pensada para manejar materias primas difíciles mediante un esquema robusto de guard beds y catalizadores que ayudan a capturar fósforo y metales antes del catalizador principal.</p>
      <p>En comparación con las otras tecnologías, HydroFlex suele presentarse como la opción <strong>“todoterreno”</strong>: procesa una gama muy amplia de grasas y aceites y puede integrarse tanto en unidades nuevas como en reconversiones de refinerías existentes. Es especialmente relevante cuando el proyecto contempla una mezcla amplia de residuos —como UCO, sebo, FOG u otros aceites residuales— y necesita tolerar variaciones importantes en la calidad del feedstock.</p>`,
    vegan:`
      <span class="technology-description-label">Descripción de la tecnología</span>
      <p>Vegan® es la tecnología HEFA de Axens para producir diésel renovable y SAF a partir de una amplia gama de lípidos —aceites vegetales, UCO, grasas animales y otros residuos grasos—. Axens la presenta como una <strong>solución modular de nueva generación</strong>, combinando un tren de pretratamiento flexible con Hydrotreatment (hidrotratamiento) e Hydroisomerization (hidroisomerización) optimizados para producir SAF cuando el proyecto lo requiere.</p>
      <p>Comparada con HydroFlex y Ecofining, Vegan suele posicionarse como una <strong>opción muy enfocada en maximizar SAF y en esquemas HEFA de nueva generación</strong>. Es especialmente interesante cuando el objetivo estratégico del proyecto es alcanzar una participación alta de SAF dentro del total de productos.</p>`
  };

  function insert(panel,key){
    if(!panel||panel.dataset.techDescriptionV35==='true') return false;
    const head=panel.querySelector('.board-head');
    if(!head) return false;
    const route=head.querySelector('p');
    if(!route) return false;
    const box=document.createElement('div');
    box.className='technology-description';
    box.innerHTML=descriptions[key];
    route.insertAdjacentElement('afterend',box);
    panel.dataset.techDescriptionV35='true';
    return true;
  }

  let attempts=0;
  const timer=setInterval(()=>{
    attempts+=1;
    insert(document.querySelector('.ecofining-board'),'ecofining');
    insert(document.querySelector('[data-process="hydroflex"]'),'hydroflex');
    insert(document.querySelector('[data-process="vegan"]'),'vegan');
    const done=document.querySelector('.ecofining-board')?.dataset.techDescriptionV35==='true' && document.querySelector('[data-process="hydroflex"]')?.dataset.techDescriptionV35==='true' && document.querySelector('[data-process="vegan"]')?.dataset.techDescriptionV35==='true';
    if(done||attempts>=100) clearInterval(timer);
  },100);
})();
