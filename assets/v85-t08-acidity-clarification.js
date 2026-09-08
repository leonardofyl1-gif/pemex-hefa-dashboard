/* v85 · T08 clarification: Acid Value / FFA relationship + commercial reference */
(()=>{
  const TITLE='Acidez libre — Acid Value (AV) / FFA';
  const MEANING='Los ácidos grasos libres (Free Fatty Acids, FFA) son ácidos grasos que ya no están unidos al triglicérido, normalmente por hidrólisis o degradación. El Acid Value (índice de acidez) y el FFA describen la misma condición de acidez libre, pero en unidades distintas. El FFA se expresa como % m/m sobre una base de ácido graso especificada; el Acid Value se expresa como mg KOH/g, es decir, cuántos miligramos de KOH se requieren para neutralizar los ácidos libres de 1 g de muestra. Un valor alto puede indicar mayor deterioro y puede afectar selección comercial, blending y necesidad de acondicionamiento; no implica por sí solo rechazo técnico HEFA.';
  const UNIT='FFA: % m/m (especificar la base, p. ej. como ácido oleico)\nAcid Value (AV): mg KOH/g\nConversión si FFA se reporta como ácido oleico: AV ≈ 1.99 × FFA. Por tanto, 15% FFA ≈ 29.9 mg KOH/g.';
  const CRITERION='EVIDENCIA AUDITADA — REFERENCIA COMERCIAL, NO LÍMITE UNIVERSAL HEFA:\nSe verificó una especificación comercial para grasas Cat. 1 y 2 con FFA máximo de 15%. Si el FFA está expresado como ácido oleico, este valor equivale aproximadamente a 29.9 mg KOH/g de Acid Value. Usar este valor como referencia de screening / aceptación comercial del feedstock, no como límite técnico universal de Ecofining, HydroFlex o Vegan.';
  const PENDING='Validar con cada tecnólogo HEFA el máximo de FFA / Acid Value técnicamente aceptable y confirmar la base usada para reportar FFA (% como ácido oleico u otra).';

  const setField=(grid,labelStarts,value)=>{
    const fields=[...grid.querySelectorAll('.matrix-field')];
    const field=fields.find(el=>el.querySelector('b')?.textContent.trim().startsWith(labelStarts));
    if(!field) return false;
    const label=field.querySelector('b')?.textContent.trim()||labelStarts;
    field.innerHTML=`<b>${label}</b>${value}`;
    return true;
  };

  const patchCompareTable=()=>{
    let changed=false;
    document.querySelectorAll('.matrix-variable-button').forEach(button=>{
      const id=button.querySelector('.matrix-variable-id')?.textContent.trim();
      if(id!=='T08') return;
      const spans=button.querySelectorAll('span');
      if(spans[1]) spans[1].textContent=TITLE;
      const row=button.closest('tr');
      const detail=row?.nextElementSibling;
      const grid=detail?.querySelector('.matrix-detail-grid');
      if(grid){
        changed=setField(grid,'Qué es y por qué importa',MEANING)||changed;
        changed=setField(grid,'Unidad o evidencia',UNIT)||changed;
        changed=setField(grid,'Criterio vigente para la decisión',CRITERION)||changed;
        changed=setField(grid,'Validación pendiente',PENDING)||changed;
      }
      changed=true;
    });
    return changed;
  };

  const patchVariableCards=()=>{
    let changed=false;
    document.querySelectorAll('.matrix-variable-card').forEach(card=>{
      const summary=card.querySelector(':scope > summary');
      if(!summary || !summary.textContent.includes('T08')) return;
      const body=card.querySelector('.matrix-variable-body');
      if(body){
        changed=setField(body,'Qué es y por qué importa',MEANING)||changed;
        changed=setField(body,'Unidad o resultado',UNIT)||changed;
        changed=setField(body,'Qué verificar / criterio vigente',CRITERION)||changed;
        changed=setField(body,'Validación que todavía falta',PENDING)||changed;
      }
      changed=true;
    });
    return changed;
  };

  const patch=()=>patchCompareTable()||patchVariableCards();

  let attempts=0;
  const timer=setInterval(()=>{
    attempts+=1;
    const done=patch();
    if(done||attempts>=120){
      clearInterval(timer);
      [100,300,800,1500].forEach(ms=>setTimeout(()=>{patchCompareTable();patchVariableCards();},ms));
    }
  },100);
})();
