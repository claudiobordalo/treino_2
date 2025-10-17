const APP_VERSION = 'v2.0-tech-cardio';
const $ = s=>document.querySelector(s);
const daysEl = $('#days');
const tabsEl = $('#tabs');
const planPick = $('#planPick');
const datePick = $('#datePick');
const saveFlag = $('#saveFlag');

function todayStr(){ const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` }
function keyBase(){ return `planner_${APP_VERSION}_${planPick.value}_${datePick.value||todayStr()}` }
function flashSaved(){ saveFlag.textContent='✔ salvo'; clearTimeout(window._t); window._t=setTimeout(()=>saveFlag.textContent=' ',1500); }

function ex(name, sets, reps, img, tech='T'){
  return {name, sets, reps, img, tech}
}
function cardio(name='Cardio', tipo='Corrida leve', dur='20–30min', z='Z2', notes=''){
  return {cardio:true, name, tipo, dur, z, notes}
}

const T3 = [
  { title:"Full Body A", items:[
    ex("Agachamento livre",4,"6–8","img/agachamento.jpg","C"),
    ex("Supino reto (halteres)",3,"8–10","img/supino_reto_halteres.jpg","T"),
    ex("Remada curvada (barra)",3,"8–10","img/remada_curvada.jpg","T"),
    ex("Elevação lateral",3,"12–20","img/elevacao_lateral.jpg","D"),
    ex("Panturrilha em pé",3,"15–20","img/panturrilha_pe.jpg","T"),
  ]},
  { title:"Full Body B", items:[
    ex("Levantamento terra romeno",4,"6–8","img/levantamento_terra.jpg","T"),
    ex("Supino inclinado (halteres)",3,"8–10","img/supino_inclinado.jpg","T"),
    ex("Puxada pronada / Barra fixa",3,"6–10","img/barra_fixa.jpg","R"),
    ex("Rosca direta (barra)",3,"8–12","img/rosca_direta.jpg","R"),
    ex("Tríceps corda",3,"12–15","img/triceps_pulley.jpg","D"),
  ]},
  { title:"Full Body C", items:[
    ex("Leg press 45°",4,"10–12","img/leg_press.jpg","T"),
    ex("Desenvolvimento ombros",3,"8–10","img/desenvolvimento_ombros.jpg","T"),
    ex("Remada baixa",3,"10–12","img/remada_baixa.jpg","T"),
    ex("Crucifixo máquina",2,"12–15","img/crucifixo.jpg","D"),
    ex("Abdominal com peso",3,"12–20","img/crunch_peso.jpg","T"),
  ]}
];

const T4 = [
  { title:"Upper A (Peito/Costas/Tríceps)", items:[
    ex("Supino reto/halteres",4,"6–10","img/supino_reto_halteres.jpg","T"),
    ex("Remada curvada (barra)",4,"6–10","img/remada_curvada.jpg","T"),
    ex("Crucifixo máquina",2,"12–15","img/crucifixo.jpg","D"),
    ex("Tríceps corda",2,"12–15","img/triceps_pulley.jpg","R"),
  ]},
  { title:"Lower A (Quadríceps/Glúteo + Core)", items:[
    ex("Agachamento livre",4,"4–6 (cluster)","img/agachamento.jpg","C"),
    ex("Leg press 45°",3,"8–12","img/leg_press.jpg","T"),
    ex("Afundo estacionário",3,"8–12 c/perna","img/afundo.jpg","T"),
    ex("Panturrilha em pé",3,"12–20 + iso","img/panturrilha_pe.jpg","T"),
  ]},
  { title:"Upper B (Ombros/Costas/Bíceps)", items:[
    ex("Desenvolvimento ombros (halteres)",4,"6–10","img/desenvolvimento_ombros.jpg","T"),
    ex("Puxada supinada",3,"6–10","img/puxada_supinada.jpg","R"),
    ex("Elevação lateral",2,"12–20","img/elevacao_lateral.jpg","D"),
    ex("Rosca direta (barra)",3,"8–12","img/rosca_direta.jpg","R"),
  ]},
  { title:"Lower B (Posterior/Glúteo + Core)", items:[
    ex("Terra romeno",3,"6–10","img/levantamento_terra.jpg","T"),
    ex("Cadeira/mesa flexora",2,"10–15","img/mesa_flexora.jpg","D"),
    ex("Hip thrust",3,"6–10","img/hip_thrust.jpg","R"),
    ex("Panturrilha sentado",3,"15–25","img/panturrilha_sentado.jpg","T"),
  ]}
];

const T5 = [
  { title:"Push A", items:[
    ex("Supino reto (halteres)",4,"6–10","img/supino_reto_halteres.jpg","T"),
    ex("Crucifixo máquina",2,"12–15","img/crucifixo.jpg","D"),
    ex("Desenvolvimento ombros",3,"8–12","img/desenvolvimento_ombros.jpg","T"),
    ex("Elevação lateral",2,"12–20","img/elevacao_lateral.jpg","D"),
    ex("Tríceps corda",2,"12–15","img/triceps_pulley.jpg","R"),
  ]},
  { title:"Pull A", items:[
    ex("Puxada pronada",4,"6–10","img/puxada_pronada.jpg","T"),
    ex("Remada curvada (barra)",3,"6–10","img/remada_curvada.jpg","T"),
    ex("Rosca direta",3,"8–12","img/rosca_direta.jpg","R"),
    ex("Face pull",2,"12–20","img/face_pull.jpg","T"),
  ]},
  { title:"Legs A", items:[
    ex("Agachamento livre",4,"4–6 (cluster)","img/agachamento.jpg","C"),
    ex("Leg press 45°",3,"8–12","img/leg_press.jpg","T"),
    ex("Afundo estacionário",3,"8–12 c/perna","img/afundo.jpg","T"),
    ex("Panturrilha em pé",3,"12–20","img/panturrilha_pe.jpg","T"),
  ]},
  { title:"Push B", items:[
    ex("Supino inclinado",4,"6–10","img/supino_inclinado.jpg","T"),
    ex("Crossover",2,"12–15","img/crucifixo.jpg","D"),
    ex("Desenvolvimento máquina",3,"8–12","img/desenvolvimento_ombros.jpg","T"),
    ex("Tríceps testa",3,"8–12","img/triceps_testa.jpg","R"),
  ]},
  { title:"Pull B", items:[
    ex("Puxada neutra/supinada",3,"6–10","img/puxada_fechada.jpg","R"),
    ex("Remada baixa",3,"8–12","img/remada_baixa.jpg","T"),
    ex("Rosca Scott",3,"10–12","img/rosca_scott.jpg","D"),
    ex("Face pull",2,"15–20","img/face_pull.jpg","T"),
  ]},
];

const templates = {"3d":T3,"4d":T4,"5d":T5};

function techniqueLabel(code){
  return code==='D'?'Drop':
         code==='R'?'Rest‑Pause':
         code==='C'?'Cluster':'Tradicional';
}

const $daysWrap = document.getElementById('days');
const $tabs = document.getElementById('tabs');

function save(){
  const data = [...$daysWrap.querySelectorAll('.day')].map(day=>{
    if(day.dataset.cardio==='1'){
      return {
        cardio:true,
        title: day.querySelector('h3').textContent,
        tipo: day.querySelector('.tipo').value,
        dur: day.querySelector('.dur').value,
        zona: day.querySelector('.zona').value,
        notes: day.querySelector('.notes').value
      }
    }
    return {
      title: day.querySelector('h3').textContent,
      items: [...day.querySelectorAll('.ex')].map(exEl=>({
        name: exEl.querySelector('.name').value,
        target: exEl.querySelector('.target').value,
        tech: exEl.querySelector('.tech').value,
        sets: [...exEl.querySelectorAll('.set')].map(s=>({
          done: s.querySelector('input[type=checkbox]').checked,
          load: s.querySelector('.load').value,
          reps: s.querySelector('.reps').value,
          rpe: s.querySelector('.rpe').value
        })),
        notes: exEl.querySelector('.notes').value
      }))
    }
  });
  localStorage.setItem(keyBase(), JSON.stringify(data));
  const saveFlag = document.getElementById('saveFlag');
  saveFlag.textContent = '✔ salvo';
  setTimeout(()=>saveFlag.textContent=' ',1200);
}

function load(){
  const raw = localStorage.getItem(keyBase());
  if(!raw) return;
  try{
    const data = JSON.parse(raw);
    [...$daysWrap.querySelectorAll('.day')].forEach((day,i)=>{
      const d=data[i]; if(!d) return;
      day.querySelector('h3').textContent = d.title||day.querySelector('h3').textContent;
      if(day.dataset.cardio==='1'){
        day.querySelector('.tipo').value = d.tipo||'Corrida leve';
        day.querySelector('.dur').value = d.dur||'20–30min';
        day.querySelector('.zona').value = d.zona||'Z2';
        day.querySelector('.notes').value = d.notes||'';
      }else{
        [...day.querySelectorAll('.ex')].forEach((exEl,j)=>{
          const it=d.items&&d.items[j]; if(!it) return;
          exEl.querySelector('.name').value = it.name;
          exEl.querySelector('.target').value = it.target||exEl.querySelector('.target').value;
          exEl.querySelector('.tech').value = it.tech||'T';
          [...exEl.querySelectorAll('.set')].forEach((sEl,k)=>{
            const s=it.sets&&it.sets[k]; if(!s) return;
            sEl.querySelector('input[type=checkbox]').checked = !!s.done;
            sEl.querySelector('.load').value = s.load||'';
            sEl.querySelector('.reps').value = s.reps||'';
            sEl.querySelector('.rpe').value = s.rpe||'';
          });
          exEl.querySelector('.notes').value = it.notes||'';
        });
      }
    });
  }catch(e){console.warn('Erro ao carregar',e)}
}

function buildEx(it){
  const sets = Number(String(it.sets).toString().split(' ')[0])||3;
  let setsHtml = '';
  for(let i=1;i<=sets;i++){
    setsHtml += `<label class="set badge">S${i} <input type="checkbox"/></label>
    <input class="load" type="number" placeholder="kg" inputmode="decimal" />
    <input class="reps" type="number" placeholder="reps" inputmode="numeric" />
    <input class="rpe" type="number" placeholder="RPE/RIR" inputmode="decimal" />`;
  }
  const imgTag = it.img ? `<img class="thumb" src="${it.img}" alt="${it.name}" onerror="this.style.display='none'"/>` : '';
  return `<div class="ex">${imgTag}
    <input class="name" type="text" value="${it.name}" />
    <input class="target" type="text" value="${it.reps}" />
    <select class="tech" title="Técnica (Tradicional/Drop/Rest‑Pause/Cluster)">
      <option value="T" ${it.tech==='T'?'selected':''}>Tradicional</option>
      <option value="D" ${it.tech==='D'?'selected':''}>Drop</option>
      <option value="R" ${it.tech==='R'?'selected':''}>Rest‑Pause</option>
      <option value="C" ${it.tech==='C'?'selected':''}>Cluster</option>
    </select>
    <span class="badge">séries: ${it.sets}</span>
    <button class="ghost" onclick="removeEx(this)">Remover</button>
    <div class="sets">${setsHtml}</div>
    <input class="notes opt" type="text" placeholder="Observações / dor / ajuste" />
  </div>`
}

function buildCardio(dayTitle){
  const day = document.createElement('div');
  day.className='day';
  day.dataset.cardio='1';
  day.innerHTML = `<h3>${dayTitle}</h3>
  <div class="ex">
    <select class="tipo">
      <option>Corrida leve</option>
      <option>Bicicleta</option>
      <option>Escada</option>
      <option>Elíptico</option>
      <option>Caminhada inclinada</option>
      <option>HIIT curto</option>
    </select>
    <input class="dur" type="text" value="20–30min" />
    <select class="zona">
      <option>Z2 (leve)</option>
      <option>Z3 (moderado)</option>
      <option>Intervalado</option>
    </select>
    <input class="notes" type="text" placeholder="Ritmo, FC, percepção..." />
  </div>`;
  return day;
}

function render(){
  $tabs.innerHTML='';
  $daysWrap.innerHTML='';
  const plan = templates[planPick.value];
  plan.forEach((d,idx)=>{
    const t = document.createElement('button');
    t.className='tab'+(idx===0?' active':'');
    t.textContent = `Dia ${idx+1}`;
    t.addEventListener('click',()=>switchDay(idx));
    $tabs.appendChild(t);

    const day = document.createElement('div');
    day.className='day';
    day.dataset.idx=idx;
    day.innerHTML = `<h3>${d.title}</h3>` + d.items.map(buildEx).join('') + `
      <div class="footer">
        <div class="hint">Use técnicas em isoladores / última série. Evite sobrecarregar compostos.</div>
        <div class="row">
          <button class="ghost" onclick="duplicateDay(${idx})">Duplicar dia</button>
          <button class="primary" onclick="save()">Salvar</button>
        </div>
      </div>`;
    $daysWrap.appendChild(day);
  });
  switchDay(0);
  load();
}

function switchDay(idx){
  [...$tabs.children].forEach((el,i)=>el.classList.toggle('active',i===idx));
  [...$daysWrap.children].forEach((el,i)=>el.style.display = (i===idx?'block':'none'));
}

function duplicateDay(idx){
  const d = $daysWrap.children[idx];
  const clone = d.cloneNode(true);
  clone.querySelectorAll('input').forEach(i=>{
    if(i.type==="checkbox") i.checked=false;
    else if(!i.classList.contains('name') && !i.classList.contains('target')) i.value='';
  });
  $daysWrap.appendChild(clone);
  const n = $daysWrap.children.length;
  const t = document.createElement('button'); t.className='tab'; t.textContent = `Dia ${n}`; t.onclick=()=>switchDay(n-1); $tabs.appendChild(t);
  save();
}

function removeEx(btn){
  const ex = btn.closest('.ex'); ex.parentElement.removeChild(ex); save();
}

function exportCSV(){
  const data = JSON.parse(localStorage.getItem(keyBase())||'[]');
  if(!data.length){alert('Nada para exportar hoje.');return}
  const rows = [['data','plano','dia','tipo','exercicio','alvo','tecnica','serie','feito','carga','reps','RPE','obs']];
  data.forEach((d,i)=>{
    if(d.cardio){
      rows.push([datePick.value||todayStr(), planPick.value, `Dia ${i+1}`, 'CARDIO', d.tipo, d.dur, d.zona, '', '', '', '', '', d.notes||'']);
      return;
    }
    (d.items||[]).forEach(it=>{
      (it.sets||[]).forEach((s,si)=>{
        rows.push([datePick.value||todayStr(), planPick.value, `Dia ${i+1}`, 'FORCA', it.name, it.target, techniqueLabel(it.tech||'T'), `S${si+1}`, s.done?'1':'0', s.load||'', s.reps||'', s.rpe||'', (it.notes||'').replace(/,/g,';')])
      })
    })
  })
  const csv = rows.map(r=>r.join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `treino_${planPick.value}_${datePick.value||todayStr()}.csv`;
  a.click();
}

document.getElementById('exportCsv').addEventListener('click', exportCSV);
document.getElementById('clearDay').addEventListener('click', ()=>{
  if(!confirm('Limpar todos os campos do dia atual?')) return;
  const idx=[...$tabs.children].findIndex(t=>t.classList.contains('active'));
  const day=$daysWrap.children[idx];
  day.querySelectorAll('input').forEach(i=>{
    if(i.type==='checkbox') i.checked=false;
    else if(!i.classList.contains('name') && !i.classList.contains('target')) i.value='';
  });
  save();
});
document.getElementById('compactBtn').addEventListener('click', ()=>{ document.body.classList.toggle('compact'); });
document.getElementById('toggleImgs').addEventListener('click', ()=>{ document.body.classList.toggle('hide-thumb'); });
document.getElementById('addCardio').addEventListener('click', ()=>{
  const count = [...$daysWrap.children].filter(x=>x.dataset.cardio==='1').length;
  if(count>=2){ alert('Limite de 2 dias de cardio por semana.'); return; }
  const idx = $daysWrap.children.length;
  const day = buildCardio(`Cardio ${count? 'B':'A'}`);
  $daysWrap.appendChild(day);
  const t = document.createElement('button'); t.className='tab'; t.textContent = `Dia ${idx+1}`; t.onclick=()=>switchDay(idx); $tabs.appendChild(t);
  switchDay(idx);
  save();
});

planPick.addEventListener('change', ()=>{render(); save()});
['input','change'].forEach(ev=>document.addEventListener(ev, e=>{ if(e.target.closest('.day')) save(); }));

(function(){ document.getElementById('datePick').value = todayStr(); render(); })();
