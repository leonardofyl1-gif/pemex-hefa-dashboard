(()=>{
  const eco=document.querySelector('.ecofining-board');
  if(!eco) return;

  const style=document.createElement('style');
  style.textContent=`
    .process-tabs-wrap{background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:8px;box-shadow:var(--shadow);display:flex;gap:8px;flex-wrap:wrap;align-items:center}
    .process-tab{appearance:none;border:1px solid transparent;background:transparent;color:var(--text-soft);font-family:var(--font-display);font-size:var(--text-sm);font-weight:800;padding:11px 18px;border-radius:12px;cursor:pointer;transition:.18s ease;display:inline-flex;align-items:center;gap:8px}
    .process-tab:hover{background:var(--surface-2);color:var(--blue-1)}
    .process-tab.active{background:linear-gradient(180deg,var(--blue-2),var(--blue-1));color:#fff;box-shadow:0 7px 18px rgba(26,58,70,.16)}
    .process-tab .tab-no{font-size:10px;letter-spacing:.08em;opacity:.78;text-transform:uppercase}
    .process-panel{display:none!important}
    .process-panel.active{display:block!important}
    .process-placeholder{min-height:430px;display:flex;align-items:center;justify-content:center;padding:42px 22px}
    .process-placeholder-card{max-width:760px;width:100%;text-align:center;padding:42px;border:1px dashed var(--blue-4);background:linear-gradient(180deg,var(--surface),var(--surface-2));border-radius:22px}
    .process-placeholder-card .process-kicker{margin-bottom:8px}
    .process-placeholder-card h2{font-family:var(--font-display);font-size:var(--text-xl);letter-spacing:-.03em;color:var(--blue-1);margin-bottom:10px}
    .process-placeholder-card p{color:var(--text-soft);max-width:65ch;margin:0 auto}
    .process-placeholder-card .pending-tab{display:inline-flex;margin-top:18px;padding:7px 12px;border-radius:999px;background:var(--pend-soft);color:var(--pend);font-size:var(--text-xs);font-weight:800}
    @media(max-width:700px){.process-tabs-wrap{display:grid;grid-template-columns:1fr}.process-tab{justify-content:center}}
  `;
  document.head.appendChild(style);

  eco.classList.add('process-panel','active');
  eco.dataset.process='ecofining';

  const hydro=document.createElement('section');
  hydro.className='board process-panel';
  hydro.dataset.process='hydroflex';
  hydro.innerHTML=`
    <div class="process-placeholder">
      <div class="process-placeholder-card">
        <div class="process-kicker">Proceso 2 · Topsoe</div>
        <h2>HydroFlex™</h2>
        <p>La pestaña está creada y separada del proceso Ecofining. Aquí se cargará únicamente el proceso HydroFlex aprobado, manteniendo su propia secuencia, checkpoints y variables.</p>
        <span class="pending-tab">Pendiente de cargar proceso</span>
      </div>
    </div>`;

  const vegan=document.createElement('section');
  vegan.className='board process-panel';
  vegan.dataset.process='vegan';
  vegan.innerHTML=`
    <div class="process-placeholder">
      <div class="process-placeholder-card">
        <div class="process-kicker">Proceso 3 · Axens</div>
        <h2>Vegan®</h2>
        <p>La pestaña está creada y separada del proceso Ecofining. Aquí se cargará únicamente el proceso Vegan aprobado, manteniendo su propia secuencia, checkpoints y variables.</p>
        <span class="pending-tab">Pendiente de cargar proceso</span>
      </div>
    </div>`;

  eco.insertAdjacentElement('afterend',hydro);
  hydro.insertAdjacentElement('afterend',vegan);

  const nav=document.createElement('nav');
  nav.className='process-tabs-wrap';
  nav.setAttribute('aria-label','Procesos HEFA');
  nav.innerHTML=`
    <button class="process-tab" type="button" data-target="ecofining"><span class="tab-no">Proceso 1</span>Ecofining™</button>
    <button class="process-tab" type="button" data-target="hydroflex"><span class="tab-no">Proceso 2</span>HydroFlex™</button>
    <button class="process-tab" type="button" data-target="vegan"><span class="tab-no">Proceso 3</span>Vegan®</button>`;
  eco.parentNode.insertBefore(nav,eco);

  const tabs=[...nav.querySelectorAll('.process-tab')];
  const panels=[eco,hydro,vegan];
  const valid=new Set(['ecofining','hydroflex','vegan']);

  function showProcess(name,updateHash=false){
    if(!valid.has(name)) name='ecofining';
    tabs.forEach(tab=>{
      const on=tab.dataset.target===name;
      tab.classList.toggle('active',on);
      tab.setAttribute('aria-selected',String(on));
    });
    panels.forEach(panel=>panel.classList.toggle('active',panel.dataset.process===name));
    if(updateHash && location.hash!==`#${name}`) history.replaceState(null,'',`#${name}`);
  }

  tabs.forEach(tab=>tab.addEventListener('click',()=>showProcess(tab.dataset.target,true)));
  window.addEventListener('hashchange',()=>showProcess(location.hash.slice(1),false));
  showProcess(location.hash.slice(1)||'ecofining',false);

  document.title='Feedstock Process Dashboard BIARAI v20 — Procesos HEFA';
  const e=document.querySelector('.eyebrow'); if(e)e.textContent='Criterios técnicos · Navegación por tecnología · v20';
})();
