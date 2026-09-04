/* v60 — T01 educational dropdown + Comparative Master Matrix (2026-09-04). */
(()=>{
  const PROCESS_FIELD={ecofining:'ecofining',hydroflex:'hydroflex',vegan:'vegan'};
  const GROUPS=[
    {prefix:'T',title:'Variables técnicas',subtitle:'T01–T27 · calidad comercial y aptitud HEFA'},
    {prefix:'L',title:'Criterios logísticos',subtitle:'L01–L24 · transporte, almacenamiento, recepción y transferencia'},
    {prefix:'R',title:'Criterios regulatorios',subtitle:'R01–R10 · norma, autoridad, permisos y clasificación'}
  ];

  const addStyles=()=>{
    if(document.getElementById('matrix-sync-v55-style')) return;
    const style=document.createElement('style');
    style.id='matrix-sync-v55-style';
    style.textContent=`
      .matrix-sync-hub{background:var(--surface);border:1px solid var(--line);border-radius:22px;padding:18px 20px;box-shadow:var(--shadow);display:grid;gap:13px}
      .matrix-sync-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap}
      .matrix-sync-title{font-family:var(--font-display);font-size:var(--text-lg);font-weight:800;color:var(--blue-1)}
      .matrix-sync-copy{max-width:105ch;color:var(--text-soft);font-size:var(--text-sm);margin-top:4px}
      .matrix-sync-date{display:inline-flex;padding:6px 10px;border-radius:999px;background:var(--ref-bg);color:var(--ref-green);font-size:12px;font-weight:800;white-space:nowrap}
      .matrix-sync-search{width:100%;min-height:42px;border:1px solid var(--line);border-radius:12px;padding:9px 12px;background:#fff;color:var(--text);font:600 14px/1.3 var(--font-body)}
      .matrix-sync-search:focus{outline:3px solid rgba(104,173,199,.25);border-color:var(--blue-3)}
      .matrix-sync-groups{display:grid;gap:9px}
      .matrix-sync-group{border:1px solid var(--line);border-radius:14px;background:var(--surface-2);overflow:hidden}
      .matrix-sync-group>summary{cursor:pointer;list-style:none;padding:12px 14px;color:var(--blue-1);font-weight:800;font-size:14px;display:flex;justify-content:space-between;gap:12px;align-items:center}
      .matrix-sync-group>summary::-webkit-details-marker{display:none}
      .matrix-sync-group>summary span{color:var(--text-soft);font-weight:600;font-size:12px;text-align:right}
      .matrix-sync-list{display:grid;gap:8px;padding:0 10px 10px}
      .matrix-variable-card{border:1px solid var(--line);border-radius:12px;background:#fff;overflow:hidden}
      .matrix-variable-card[hidden]{display:none}
      .matrix-variable-card>summary{cursor:pointer;list-style:none;padding:10px 12px;display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:13px;font-weight:800;color:var(--blue-1)}
      .matrix-variable-card>summary::-webkit-details-marker{display:none}
      .matrix-classification{flex:0 0 auto;max-width:46%;padding:4px 8px;border-radius:999px;background:var(--blue-5);color:var(--blue-6);font-size:10px;line-height:1.25;text-align:center}
      .matrix-variable-body,.matrix-card-body{display:grid;gap:8px;padding:0 12px 12px}
      .matrix-field{padding:8px 9px;border-radius:9px;background:var(--surface-2);border:1px solid var(--line);font-size:12px;line-height:1.42;color:var(--text-soft);white-space:pre-line}
      .matrix-field b{display:block;color:var(--blue-1);margin-bottom:2px}
      .matrix-field.matrix-criterion{background:#FFF9EF;border-color:var(--alm-soft)}
      .matrix-field.matrix-pending{background:#FFF7D8;border-color:#EAD38B}
      .matrix-card-detail{margin-top:8px;border-top:1px dashed var(--line);padding-top:7px}
      .matrix-card-detail>summary{cursor:pointer;color:var(--blue-6);font-size:11px;font-weight:800;list-style:none}
      .matrix-card-detail>summary::-webkit-details-marker{display:none}
      .matrix-card-body{padding:8px 0 0}
      .matrix-evidence-chip{display:inline-flex;align-items:center;padding:3px 9px;border-radius:999px;font-size:10px;font-weight:800;line-height:1.25}
      .matrix-evidence-located{background:var(--ref-bg);color:var(--ref-green)}
      .matrix-evidence-gap{background:var(--pend-soft);color:var(--pend)}
      .matrix-evidence-unsupported{background:var(--nog-bg);color:var(--nog-red)}
      .matrix-evidence-reference{background:var(--blue-5);color:var(--blue-6)}
      .matrix-board{padding-top:0!important}
      .matrix-board .matrix-sync-hub{margin-top:0}
      .matrix-legend{display:flex;gap:8px;flex-wrap:wrap}
      .matrix-legend span,.matrix-tech-status{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:5px 9px;font-size:11px;font-weight:800;line-height:1.25}
      .matrix-status-value{background:var(--ref-bg);color:var(--ref-green)}
      .matrix-status-partial{background:#FFF3D6;color:#966000}
      .matrix-status-applies{background:var(--blue-5);color:var(--blue-6)}
      .matrix-status-na{background:#EEF1F3;color:#63747B}
      .matrix-process-use{margin-top:8px;padding-top:7px;border-top:1px dashed var(--line)}
      .matrix-process-use-title{display:block;margin-bottom:6px;color:var(--blue-1);font-size:11px;font-weight:900}
      .matrix-stage-list{display:flex;flex-wrap:wrap;gap:5px}
      .matrix-stage-chip{display:inline-flex;align-items:center;border-radius:999px;padding:4px 7px;font-size:10px;font-weight:900;line-height:1.25;border:1px solid transparent}
      .matrix-stage-chip.stage-sel{background:var(--sel-soft);color:var(--sel);border-color:var(--sel)}
      .matrix-stage-chip.stage-proc{background:var(--proc-soft);color:var(--proc);border-color:var(--proc)}
      .matrix-stage-chip.stage-pre{background:var(--pre-soft);color:var(--pre);border-color:var(--pre)}
      .matrix-stage-chip.stage-alm{background:var(--alm-soft);color:var(--alm);border-color:var(--alm)}
      .matrix-stage-chip.stage-trans{background:var(--trans-soft);color:var(--trans);border-color:var(--trans)}
      .matrix-stage-chip.stage-unmapped{background:#EEF1F3;color:#63747B;border-color:#AEBBC1}
      .matrix-table-tools{display:flex;gap:9px;align-items:center;flex-wrap:wrap}
      .matrix-table-tools .matrix-sync-search{flex:1 1 360px}
      .matrix-filter{min-height:42px;border:1px solid var(--line);border-radius:12px;padding:8px 34px 8px 11px;background:#fff;color:var(--blue-1);font:700 13px/1.3 var(--font-body)}
      .matrix-table-wrap{overflow:auto;border:1px solid var(--line);border-radius:14px;background:#fff;max-height:72vh}
      .matrix-compare-table{width:100%;min-width:980px;border-collapse:separate;border-spacing:0;font-size:12px}
      .matrix-compare-table th{position:sticky;top:0;z-index:2;background:var(--blue-1);color:#fff;text-align:left;padding:11px 12px;border-right:1px solid rgba(255,255,255,.18)}
      .matrix-compare-table th:first-child{left:0;z-index:3;min-width:270px}
      .matrix-compare-table td{vertical-align:top;padding:10px 12px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);color:var(--text-soft);line-height:1.42}
      .matrix-compare-table td:first-child{position:sticky;left:0;z-index:1;background:#fff;min-width:270px;color:var(--blue-1)}
      .matrix-compare-table tr:hover td,.matrix-compare-table tr:hover td:first-child{background:#F5FAFC}
      .matrix-variable-button{display:flex;width:100%;border:0;background:transparent;color:inherit;text-align:left;padding:0;cursor:pointer;font:800 12px/1.35 var(--font-body);gap:7px;align-items:flex-start}
      .matrix-variable-button::after{content:'⌄';margin-left:auto;color:var(--blue-6);font-size:16px;line-height:1;transition:transform .18s ease;transform-origin:center}
      .matrix-variable-button[aria-expanded="true"]::after{transform:rotate(180deg)}
      .matrix-variable-id{flex:0 0 auto;color:var(--blue-6)}
      .matrix-tech-copy{display:block;margin-top:6px;color:var(--text-soft)}
      .matrix-detail-row[hidden],.matrix-data-row[hidden]{display:none}
      .matrix-detail-row td{position:static!important;background:#F8FBFC!important;padding:0!important}
      .matrix-detail-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;padding:12px}
      .matrix-detail-grid .matrix-field{margin:0}
      .matrix-learning-card{margin:12px 12px 0;border:1px solid #B8D9E5;border-radius:16px;background:linear-gradient(145deg,#F2FAFC 0%,#FFFFFF 64%);overflow:hidden;color:var(--text-soft)}
      .matrix-learning-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;padding:14px 16px;background:#E7F4F8;border-bottom:1px solid #C8E0E8}
      .matrix-learning-head h3{margin:0;color:var(--blue-1);font-family:var(--font-display);font-size:17px;line-height:1.2}
      .matrix-learning-head p{margin:4px 0 0;max-width:84ch;font-size:12px;line-height:1.45}
      .matrix-learning-chip{flex:0 0 auto;padding:5px 9px;border-radius:999px;background:#fff;color:var(--blue-6);font-size:10px;font-weight:900;white-space:nowrap}
      .matrix-learning-body{display:grid;gap:12px;padding:14px 16px}
      .matrix-learning-body h4{margin:0 0 7px;color:var(--blue-1);font-size:12px;line-height:1.3;text-transform:uppercase;letter-spacing:.035em}
      .matrix-lipid-layout{display:grid;grid-template-columns:minmax(260px,.9fr) minmax(360px,1.35fr);gap:10px}
      .matrix-molecule,.matrix-components,.matrix-equation,.matrix-decision{border:1px solid var(--line);border-radius:12px;background:#fff;padding:11px 12px}
      .matrix-triglyceride{display:grid;grid-template-columns:120px 28px minmax(180px,1fr);align-items:center;gap:7px}
      .matrix-glycerol{padding:13px 9px;border-radius:10px;background:#FFF1D9;border:1px solid #E9B75D;text-align:center;color:#845611;font-weight:900}
      .matrix-glycerol code,.matrix-fatty-tail code,.matrix-equation code{display:block;margin-top:3px;color:inherit;font:800 11px/1.4 ui-monospace,SFMono-Regular,Consolas,monospace;white-space:normal}
      .matrix-bonds{color:#D58A18;font-size:20px;font-weight:900;text-align:center}
      .matrix-fatty-tails{display:grid;gap:5px}
      .matrix-fatty-tail{padding:7px 9px;border-left:5px solid #4FA785;border-radius:7px;background:#EAF7F1;color:#246F58;font-size:11px;font-weight:800}
      .matrix-component-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}
      .matrix-component{padding:7px 8px;border-radius:8px;font-size:11px;line-height:1.35}
      .matrix-component b{display:block;color:inherit;margin-bottom:2px}
      .matrix-component.yes{background:#EAF7F1;color:#246F58}
      .matrix-component.no{background:#FFF2ED;color:#9A4A2B}
      .matrix-conversion{display:grid;grid-template-columns:repeat(5,minmax(125px,1fr));gap:7px;overflow-x:auto;padding-bottom:2px}
      .matrix-flow-step{position:relative;min-height:70px;padding:9px 10px;border-radius:10px;background:var(--blue-5);border:1px solid #B8D9E5;color:var(--blue-1);font-size:11px;line-height:1.35}
      .matrix-flow-step b{display:block;margin-bottom:3px;color:var(--blue-6)}
      .matrix-flow-step:not(:last-child)::after{content:'→';position:absolute;right:-8px;top:25px;z-index:1;color:var(--blue-6);font-size:16px;font-weight:900}
      .matrix-learning-bottom{display:grid;grid-template-columns:minmax(280px,.8fr) minmax(360px,1.2fr);gap:10px}
      .matrix-equation{background:#F8FAFB}
      .matrix-equation code{color:var(--blue-1);font-size:12px}
      .matrix-equation p,.matrix-decision p{margin:5px 0 0;font-size:11px;line-height:1.45}
      .matrix-decision{background:#FFF9EF;border-color:var(--alm-soft)}
      .matrix-decision strong{color:var(--blue-1)}
      .matrix-group-row td{position:static!important;background:#EAF3F6!important;color:var(--blue-1)!important;font-weight:900;text-transform:uppercase;letter-spacing:.04em;padding:8px 12px!important}
      .matrix-count{font-size:12px;color:var(--text-soft);font-weight:700}
      .ecofining-board .eco-canvas.eco-v55-canvas{min-width:4510px!important}
      .ecofining-board .eco-strip.eco-v55-strip,.ecofining-board .eco-strip2.eco-v55-strip2{grid-template-columns:repeat(11,minmax(410px,1fr))!important}
      @media(max-width:800px){.matrix-sync-hub{padding:15px}.matrix-sync-group>summary{align-items:flex-start;flex-direction:column}.matrix-sync-group>summary span{text-align:left}.matrix-variable-card>summary{align-items:flex-start;flex-direction:column}.matrix-classification{max-width:100%}.matrix-table-wrap{max-height:none}.matrix-detail-grid{grid-template-columns:1fr}.matrix-lipid-layout,.matrix-learning-bottom{grid-template-columns:1fr}.matrix-learning-head{flex-direction:column}.matrix-compare-table th:first-child,.matrix-compare-table td:first-child{position:static}.matrix-compare-table{min-width:860px}}
    `;
    document.head.appendChild(style);
  };

  const field=(label,value,className='')=>{
    if(!value) return null;
    const block=document.createElement('div');
    block.className=`matrix-field ${className}`.trim();
    const heading=document.createElement('b');
    heading.textContent=label;
    block.append(heading,document.createTextNode(value));
    return block;
  };

  const normalizeId=card=>{
    const label=card.querySelector('strong')?.textContent||'';
    const match=label.match(/\bT\d{2}\b/i);
    if(match) return match[0].toUpperCase();
    return /^MIU\b/i.test(label.trim())?'T24':null;
  };

  const evidenceState=value=>{
    const normalized=(value||'').toUpperCase();
    if(normalized.includes('SE IDENTIFICÓ Y ES')) return ['located','Referencia pública localizada'];
    if(normalized.includes('NO SUSTENTADA')) return ['unsupported','Sin respaldo público localizado'];
    if(normalized.includes('NO SE IDENTIFICÓ')) return ['gap','Sin límite público identificado'];
    if(!normalized||normalized==='NO APLICA') return ['reference','No aplica'];
    return ['reference','Referencia técnica disponible'];
  };

  const addCardDetail=(card,item,process)=>{
    if(card.dataset.matrixDetailV55==='true') return;
    const processReference=item[PROCESS_FIELD[process]]||'';
    const row=card.querySelector('.rangerow');
    if(row){
      row.querySelectorAll('.valchip,.refchip,.nogochip,.matrix-evidence-chip').forEach(node=>node.remove());
      const [state,label]=evidenceState(processReference);
      const chip=document.createElement('span');
      chip.className=`matrix-evidence-chip matrix-evidence-${state}`;
      chip.textContent=label;
      row.appendChild(chip);
    }

    const detail=document.createElement('details');
    detail.className='matrix-card-detail';
    const summary=document.createElement('summary');
    summary.textContent='Ver método, unidad y criterio vigente';
    const body=document.createElement('div');
    body.className='matrix-card-body';
    [
      field('Cómo se verifica',item.verification),
      field('Unidad o evidencia',item.unit),
      field('Referencia de la tecnología',processReference),
      field('Qué verificar / criterio vigente (N)',item.independent_reference,'matrix-criterion'),
      field('Clasificación para la decisión',item.classification),
      field('Validación que todavía falta',item.pending,'matrix-pending')
    ].filter(Boolean).forEach(node=>body.appendChild(node));
    detail.append(summary,body);
    card.appendChild(detail);
    card.dataset.matrixDetailV55='true';
  };

  const createVariableCard=item=>{
    const detail=document.createElement('details');
    detail.className='matrix-variable-card';
    detail.dataset.search=Object.values(item).join(' ').toLocaleLowerCase('es');
    const summary=document.createElement('summary');
    const name=document.createElement('span');
    name.textContent=`${item.id} · ${item.criterion}`;
    const classification=document.createElement('span');
    classification.className='matrix-classification';
    classification.textContent=item.classification||'Por clasificar';
    summary.append(name,classification);
    const body=document.createElement('div');
    body.className='matrix-variable-body';
    [
      field('Qué es y por qué importa',item.meaning),
      field('Cómo se verifica',item.verification),
      field('Unidad o resultado',item.unit),
      field('Qué verificar / criterio vigente (N)',item.independent_reference,'matrix-criterion'),
      field('¿Puede corregirse o mitigarse?',item.mitigation),
      field('Validación que todavía falta',item.pending,'matrix-pending')
    ].filter(Boolean).forEach(node=>body.appendChild(node));
    detail.append(summary,body);
    return detail;
  };

  const compactReference=value=>{
    const cleaned=(value||'')
      .replace(/^(EVIDENCIA VALIDADA(?:\s*\/\s*PARCIAL)?(?:\s*—[^:]+)?|EVIDENCIA PARCIAL(?:\s*\/\s*PROXY)?):\s*/i,'')
      .replace(/^(NO SE IDENTIFICÓ|NO SUSTENTADA(?: EN FUENTE PÚBLICA)?):\s*/i,'')
      .replace(/\s+/g,' ')
      .trim();
    if(cleaned.length<=210) return cleaned;
    const shortened=cleaned.slice(0,210);
    return `${shortened.slice(0,Math.max(shortened.lastIndexOf(' '),150))}…`;
  };

  const technologyStatus=(item,key)=>{
    if(item.dimension!=='Técnico') return {kind:'applies',label:'✓ Criterio transversal',copy:'Aplica al proceso completo; la Matriz no lo asigna a un paso propio del licenciante.'};
    const raw=item[key]||'';
    const upper=raw.toUpperCase();
    if(upper.includes('EVIDENCIA VALIDADA')) return {kind:'value',label:'Criterio identificado',copy:compactReference(raw)};
    if(upper.includes('EVIDENCIA PARCIAL')) return {kind:'partial',label:'Referencia parcial',copy:compactReference(raw)};
    if(!raw||upper.trim()==='NO APLICA') return {kind:'na',label:'— No aplica',copy:''};
    if(upper.includes('NO SUSTENTADA')) return {kind:'na',label:'Sin límite sustentado',copy:'La variable aplica, pero el límite citado no está respaldado públicamente.'};
    return {kind:'na',label:'Sin límite público',copy:'La variable aplica, pero no se identificó un límite público propio de la tecnología.'};
  };

  const technologyCell=(item,key)=>{
    const status=technologyStatus(item,key);
    const td=document.createElement('td');
    td.dataset.variableId=item.id;
    td.dataset.technology=key;
    const badge=document.createElement('span');
    badge.className=`matrix-tech-status matrix-status-${status.kind}`;
    badge.textContent=status.label;
    td.appendChild(badge);
    if(status.copy){
      const copy=document.createElement('span');
      copy.className='matrix-tech-copy';
      copy.textContent=status.copy;
      td.appendChild(copy);
    }
    return td;
  };

  const stepKind=column=>{
    if(!column) return 'unmapped';
    if(column.classList.contains('type-sel')||column.classList.contains('commercial-col')||column.classList.contains('vegan-integrated-col')) return 'sel';
    if(column.classList.contains('type-pre')||column.classList.contains('hydro-conditioning-col')) return 'pre';
    if(column.classList.contains('type-almtrans')) return 'alm';
    if(column.classList.contains('conversion-col')) return 'trans';
    return 'proc';
  };

  const placementFromCard=card=>{
    const stage=card.closest('.stage');
    const process=card.closest('[data-process]');
    if(!stage||!process) return null;
    const panelTitle=stage.querySelector('.panel-title')?.textContent.trim()||'';
    const explicitNumber=panelTitle.match(/^(\d+(?:\.\d+|[a-z])?)(?=\s*·)/i)?.[1];
    let fallbackNumber='';
    if(process.dataset.process==='ecofining') fallbackNumber=stage.classList.contains('commercial-stage')?'03b':stage.classList.contains('technical-stage')?'05b':'';
    if(process.dataset.process==='hydroflex') fallbackNumber=stage.classList.contains('commercial-stage')?'03b':stage.classList.contains('technical-stage')?'06':'';
    if(process.dataset.process==='vegan'&&stage.querySelector('.varlist')) fallbackNumber='04';
    const targetNumber=explicitNumber||fallbackNumber;
    const strip=process.querySelector('.eco-strip,.hydro-strip,.vegan-strip');
    const column=strip?[...strip.querySelectorAll('.col')].find(node=>node.querySelector(':scope > .step-no')?.textContent.trim()===targetNumber):null;
    const number=column?.querySelector(':scope > .step-no')?.textContent.trim()||column?.querySelector('.step-no')?.textContent.trim()||'';
    const title=column?.querySelector(':scope > h3')?.textContent.trim()||column?.querySelector('h3')?.textContent.trim()||panelTitle||'Paso asignado';
    return {number,title,kind:stepKind(column)};
  };

  const processPlacements=(panel,byId)=>{
    const placements=new Map();
    panel.querySelectorAll('.var').forEach(card=>{
      const id=normalizeId(card);
      if(!id||!byId.has(id)) return;
      const placement=placementFromCard(card);
      if(!placement) return;
      const key=`${placement.number}|${placement.title}`;
      if(!placements.has(id)) placements.set(id,new Map());
      placements.get(id).set(key,placement);
    });
    return new Map([...placements].map(([id,items])=>[id,[...items.values()]]));
  };

  const renderProcessUse=(cell,item,placements)=>{
    cell.querySelector('.matrix-process-use')?.remove();
    if(item.dimension!=='Técnico') return;
    const use=document.createElement('div');
    use.className='matrix-process-use';
    const title=document.createElement('span');
    title.className='matrix-process-use-title';
    const list=document.createElement('div');
    list.className='matrix-stage-list';
    if(placements.length){
      title.textContent=`Aplica en ${placements.length} ${placements.length===1?'paso':'pasos'}`;
      placements.forEach(placement=>{
        const chip=document.createElement('span');
        chip.className=`matrix-stage-chip stage-${placement.kind}`;
        chip.textContent=`✓ ${placement.number?`${placement.number} · `:''}${placement.title}`;
        list.appendChild(chip);
      });
    }else{
      title.textContent='Aplica, pero falta ubicarla en el mapa';
      const chip=document.createElement('span');
      chip.className='matrix-stage-chip stage-unmapped';
      chip.textContent='✓ Sin paso asignado';
      list.appendChild(chip);
    }
    use.append(title,list);
    cell.appendChild(use);
  };

  const updateComparisonPlacements=(matrix,byId)=>{
    let mappedProcesses=0;
    Object.keys(PROCESS_FIELD).forEach(process=>{
      const panel=document.querySelector(`[data-process="${process}"]`);
      if(!panel||!panel.querySelector('.var')) return;
      const placements=processPlacements(panel,byId);
      matrix.variables.forEach(item=>{
        const cell=document.querySelector(`td[data-variable-id="${item.id}"][data-technology="${process}"]`);
        if(cell) renderProcessUse(cell,item,placements.get(item.id)||[]);
      });
      mappedProcesses+=1;
    });
    return mappedProcesses;
  };

  const detailRow=item=>{
    const row=document.createElement('tr');
    row.className='matrix-detail-row';
    row.hidden=true;
    row.dataset.group=item.id[0];
    row.dataset.search=Object.values(item).join(' ').toLocaleLowerCase('es');
    const cell=document.createElement('td');
    cell.colSpan=4;
    if(item.id==='T01') cell.appendChild(t01LearningCard());
    const grid=document.createElement('div');
    grid.className='matrix-detail-grid';
    [
      field('Qué es y por qué importa',item.meaning),
      field('Cómo se verifica (F)',item.verification),
      field('Unidad o evidencia (G)',item.unit),
      field('Criterio vigente para la decisión (N)',item.independent_reference,'matrix-criterion'),
      field('Clasificación',item.classification),
      field('Validación pendiente',item.pending,'matrix-pending')
    ].filter(Boolean).forEach(node=>grid.appendChild(node));
    cell.appendChild(grid);
    row.appendChild(cell);
    return row;
  };

  const t01LearningCard=()=>{
    const card=document.createElement('section');
    card.className='matrix-learning-card';
    card.setAttribute('aria-label','Explicación sencilla del contenido lipídico y su conversión a SAF');
    card.innerHTML=`
      <div class="matrix-learning-head">
        <div><h3>T01 en sencillo · De la grasa al SAF</h3><p>El contenido lipídico indica qué proporción del lote es grasa que sí puede convertirse en combustible. En una frase: <strong>el carbono y el hidrógeno de la grasa forman el combustible; el oxígeno se retira durante HEFA.</strong></p></div>
        <span class="matrix-learning-chip">Explicación visual</span>
      </div>
      <div class="matrix-learning-body">
        <div class="matrix-lipid-layout">
          <div class="matrix-molecule">
            <h4>La “figurita” principal: un triglicérido</h4>
            <div class="matrix-triglyceride">
              <div class="matrix-glycerol">Cabeza: glicerol<code>C₃H₈O₃<br>HO–CH₂–CH(OH)–CH₂–OH</code></div>
              <div class="matrix-bonds">＋</div>
              <div class="matrix-fatty-tails">
                <div class="matrix-fatty-tail">Cola 1 · ácido graso <code>R–COOH</code></div>
                <div class="matrix-fatty-tail">Cola 2 · ácido graso <code>R–COOH</code></div>
                <div class="matrix-fatty-tail">Cola 3 · ácido graso <code>R–COOH</code></div>
              </div>
            </div>
          </div>
          <div class="matrix-components">
            <h4>¿Qué componentes del lote ayudan a producir SAF?</h4>
            <div class="matrix-component-grid">
              <div class="matrix-component yes"><b>✓ Triglicéridos</b>Son la mayor reserva de cadenas de carbono.</div>
              <div class="matrix-component yes"><b>✓ Ácidos grasos libres (FFA)</b>También pueden convertirse, aunque elevan la acidez.</div>
              <div class="matrix-component no"><b>✕ Agua</b>No se convierte en SAF y aumenta carga de manejo.</div>
              <div class="matrix-component no"><b>✕ Sólidos, cenizas y minerales</b>No forman combustible; pueden ensuciar o afectar el proceso.</div>
              <div class="matrix-component no"><b>△ Fosfolípidos</b>Aportan fósforo y gomas que deben retirarse.</div>
              <div class="matrix-component no"><b>△ Proteínas</b>No son el objetivo y pueden aportar nitrógeno.</div>
            </div>
          </div>
        </div>
        <div>
          <h4>Cómo se reconfigura en HEFA</h4>
          <div class="matrix-conversion" aria-label="Ruta simplificada de grasa a SAF">
            <div class="matrix-flow-step"><b>1 · Grasa</b>Cadenas con carbono, hidrógeno y oxígeno.</div>
            <div class="matrix-flow-step"><b>2 · Hidrógeno + catalizador</b>Se agrega H₂ para acondicionar las moléculas.</div>
            <div class="matrix-flow-step"><b>3 · Retiro de oxígeno</b>El O sale principalmente como agua; también puede salir como CO o CO₂.</div>
            <div class="matrix-flow-step"><b>4 · Isomerización</b>Las cadenas lineales se ramifican para mejorar su comportamiento en frío.</div>
            <div class="matrix-flow-step"><b>5 · Fraccionamiento</b>Se separa el corte con rango adecuado para SAF.</div>
          </div>
        </div>
        <div class="matrix-learning-bottom">
          <div class="matrix-equation"><h4>Ejemplo muy simplificado</h4><code>C₁₈H₃₆O₂ + 3 H₂ → C₁₈H₃₈ + 2 H₂O</code><p>Después, una parafina lineal puede convertirse en una parafina ramificada: conserva la fórmula, pero cambia su forma.</p></div>
          <div class="matrix-decision"><h4>¿Qué significa para evaluar a un proveedor?</h4><p><strong>Más contenido lipídico suele significar más material convertible y menos agua o sólidos transportados.</strong> No basta por sí solo para aceptar el lote: también deben revisarse humedad, sólidos, FFA, fósforo, metales, trazabilidad y requisitos regulatorios. La especie animal cambia el perfil de ácidos grasos y propiedades como punto de fusión y viscosidad.</p></div>
        </div>
      </div>`;
    return card;
  };

  const addHub=(matrix,byId)=>{
    if(document.querySelector('.matrix-sync-hub')) return true;
    const panel=document.querySelector('[data-process="matrix"]');
    if(!panel) return false;
    panel.innerHTML='';
    const hub=document.createElement('section');
    hub.className='matrix-sync-hub';
    hub.innerHTML=`
      <div class="matrix-sync-head">
        <div><div class="matrix-sync-title">Matriz comparativa de variables por tecnología</div><p class="matrix-sync-copy">Las 61 variables de la Matriz Maestra se comparan entre Ecofining, HydroFlex y Vegan. Cada celda indica en cuántos pasos se revisa la variable y utiliza el mismo color del bloque correspondiente en el mapa. El estatus de evidencia se muestra por separado.</p></div>
        <span class="matrix-sync-date">Sincronizada · ${matrix.meta.synced_on}</span>
      </div>
      <div class="matrix-legend" aria-label="Leyenda de la comparación">
        <span class="matrix-status-value">Evidencia · criterio identificado</span>
        <span class="matrix-status-partial">Evidencia · referencia parcial</span>
        <span class="matrix-status-na">Evidencia · sin límite público</span>
        <span class="matrix-stage-chip stage-sel">✓ Recepción / selección</span>
        <span class="matrix-stage-chip stage-pre">✓ Pretratamiento</span>
        <span class="matrix-stage-chip stage-proc">✓ Control técnico</span>
      </div>`;
    const tools=document.createElement('div');
    tools.className='matrix-table-tools';
    const search=document.createElement('input');
    search.className='matrix-sync-search';
    search.type='search';
    search.placeholder='Buscar por ID, variable, NOM, criterio o evidencia…';
    search.setAttribute('aria-label','Buscar variables de la Matriz Maestra');
    const filter=document.createElement('select');
    filter.className='matrix-filter';
    filter.setAttribute('aria-label','Filtrar por tipo de variable');
    filter.innerHTML='<option value="all">Todas · 61</option><option value="T">Técnicas · 27</option><option value="L">Logísticas · 24</option><option value="R">Regulatorias · 10</option>';
    const count=document.createElement('span');
    count.className='matrix-count';
    tools.append(search,filter,count);
    hub.appendChild(tools);

    const wrap=document.createElement('div');
    wrap.className='matrix-table-wrap';
    const table=document.createElement('table');
    table.className='matrix-compare-table';
    table.innerHTML='<thead><tr><th>Variable</th><th>Ecofining™</th><th>HydroFlex™</th><th>Vegan®</th></tr></thead>';
    const body=document.createElement('tbody');
    GROUPS.forEach(group=>{
      const groupRow=document.createElement('tr');
      groupRow.className='matrix-group-row';
      groupRow.dataset.group=group.prefix;
      groupRow.innerHTML=`<td colspan="4">${group.title} · ${group.subtitle}</td>`;
      body.appendChild(groupRow);
      matrix.variables.filter(item=>item.id.startsWith(group.prefix)).forEach(item=>{
        const row=document.createElement('tr');
        row.className='matrix-data-row';
        row.dataset.group=group.prefix;
        row.dataset.search=Object.values(item).join(' ').toLocaleLowerCase('es');
        const variable=document.createElement('td');
        const button=document.createElement('button');
        button.type='button';
        button.className='matrix-variable-button';
        button.setAttribute('aria-expanded','false');
        button.innerHTML=`<span class="matrix-variable-id">${item.id}</span><span>${item.criterion}</span>`;
        variable.appendChild(button);
        row.append(variable,technologyCell(item,'ecofining'),technologyCell(item,'hydroflex'),technologyCell(item,'vegan'));
        const details=detailRow(item);
        button.addEventListener('click',()=>{
          const open=details.hidden;
          details.hidden=!open;
          button.setAttribute('aria-expanded',String(open));
        });
        body.append(row,details);
      });
    });
    table.appendChild(body);
    wrap.appendChild(table);
    hub.appendChild(wrap);
    panel.appendChild(hub);

    const applyFilters=()=>{
      const query=search.value.trim().toLocaleLowerCase('es');
      const selected=filter.value;
      let visible=0;
      body.querySelectorAll('.matrix-data-row').forEach(row=>{
        const show=(selected==='all'||row.dataset.group===selected)&&(!query||row.dataset.search.includes(query));
        row.hidden=!show;
        const details=row.nextElementSibling;
        if(details?.classList.contains('matrix-detail-row')&&!show) details.hidden=true;
        if(show) visible+=1;
      });
      body.querySelectorAll('.matrix-group-row').forEach(row=>{
        row.hidden=![...body.querySelectorAll(`.matrix-data-row[data-group="${row.dataset.group}"]`)].some(item=>!item.hidden);
      });
      count.textContent=`${visible} variables visibles`;
    };
    search.addEventListener('input',applyFilters);
    filter.addEventListener('change',applyFilters);
    applyFilters();
    return true;
  };

  const updateEcofiningSequence=()=>{
    const eco=document.querySelector('.ecofining-board');
    if(!eco) return false;
    const step02=[...eco.querySelectorAll('.eco-strip>.col')].find(col=>col.querySelector('.step-no')?.textContent.trim()==='02');
    if(step02){
      step02.classList.remove('type-pre');
      step02.classList.add('type-sel');
      const title=step02.querySelector('h3');
      if(title) title.textContent='Feedstock selection filter (filtro de selección del feedstock)';
      const tag=step02.querySelector('.type-tags');
      if(tag) tag.innerHTML='<span class="type-tag sel"><i></i>Selección / elegibilidad</span>';
    }
    const canvas=eco.querySelector('.eco-canvas');
    const strip=eco.querySelector('.eco-strip');
    const strip2=eco.querySelector('.eco-strip2');
    canvas?.classList.add('eco-v55-canvas');
    strip?.classList.add('eco-v55-strip');
    strip2?.classList.add('eco-v55-strip2');
    const stepCount=strip?[...strip.children].filter(node=>node.classList.contains('col')).length:0;
    const stageCount=strip2?[...strip2.children].filter(node=>node.classList.contains('stage')).length:0;
    if(canvas&&strip&&strip2&&stepCount){
      const columns=`repeat(${stepCount},minmax(410px,1fr))`;
      strip.style.setProperty('grid-template-columns',columns,'important');
      strip2.style.setProperty('grid-template-columns',columns,'important');
      canvas.style.setProperty('min-width',`${stepCount*410}px`,'important');
      canvas.dataset.ecoColumnCount=String(stepCount);
      requestAnimationFrame(()=>{
        const topTrack=eco.querySelector('.flow-top-scroll-track');
        if(topTrack) topTrack.style.width=`${canvas.scrollWidth}px`;
      });
    }
    const intro=eco.querySelector('.board-head p');
    if(intro) intro.innerHTML='La ruta se lee de izquierda a derecha. <strong>03b</strong> libera comercialmente cada lote en Tula; <strong>03c</strong> permite la mezcla controlada dentro de Tula y exige volver a muestrear el blend; <strong>05b</strong> confirma la aptitud técnica antes del HDO.';
    const blend=[...eco.querySelectorAll('.eco-strip>.col')].find(col=>col.querySelector('.step-no')?.textContent.trim()==='03c');
    const physical=blend?.querySelector('.desc-point');
    if(physical) physical.innerHTML='<b>Proceso físico:</b> Después de liberar cada lote en 03b, grasas renderizadas de distintas especies pueden dosificarse y homogeneizarse <strong>dentro de Tula</strong> en un tanque controlado. Las categorías sanitarias se mantienen segregadas; una mezcla excepcional entre categorías adopta la categoría de mayor riesgo.';
    return Boolean(step02&&blend&&stepCount===11&&stageCount===11);
  };

  fetch('./assets/matrix-v55.json',{cache:'no-store'})
    .then(response=>{if(!response.ok) throw new Error('No fue posible cargar la Matriz Maestra sincronizada.');return response.json();})
    .then(matrix=>{
      addStyles();
      const byId=new Map(matrix.variables.map(item=>[item.id,item]));
      let attempts=0;
      const timer=setInterval(()=>{
        attempts+=1;
        const hubReady=addHub(matrix,byId);
        const sequenceReady=updateEcofiningSequence();
        let processCount=0;
        document.querySelectorAll('[data-process]').forEach(panel=>{
          const process=panel.dataset.process;
          if(!PROCESS_FIELD[process]) return;
          const cards=[...panel.querySelectorAll('.var')].filter(card=>normalizeId(card));
          if(cards.length){
            cards.forEach(card=>{const item=byId.get(normalizeId(card));if(item)addCardDetail(card,item,process);});
            processCount+=1;
          }
        });
        const mappedProcesses=updateComparisonPlacements(matrix,byId);
        document.title='Feedstock Process Dashboard BIARAI v59 — Matriz comparativa';
        const eyebrow=document.querySelector('.eyebrow');
        if(eyebrow) eyebrow.textContent='Criterios técnicos, logísticos y regulatorios · v59';
        if((hubReady&&sequenceReady&&processCount===3&&mappedProcesses===3)||attempts>=200) clearInterval(timer);
      },150);
    })
    .catch(error=>console.error(error));
})();
