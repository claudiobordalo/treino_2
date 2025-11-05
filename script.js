const $ = s=>document.querySelector(s);
const tabsEl = $('#tabs');
const daysEl = $('#days');
const planPick = $('#planPick');

function ex(name, group, tech='T', img='img/placeholder.jpg'){
  return {name, group, tech, img};
}
function day(title, arr){ return {title, items: arr}; }
function seal(tech){
  const map = {T:'Tradicional', D:'Drop', R:'Rest‑Pause', C:'Cluster'};
  return `<span class="seal tech-${tech}">${map[tech]||'Tradicional'}</span>`;
}

const FULL3 = [
  day("Full Body A", [
    ex("Agachamento livre","Quadríceps/Glúteo","C","img/agachamento.jpg"),
    ex("Supino reto (halteres)","Peito/Tríceps","T","img/supino_reto_halteres.jpg"),
    ex("Remada curvada (barra)","Costas/Bíceps","T","img/remada_curvada.jpg"),
    ex("Elevação lateral","Ombros (medial)","D","img/elevacao_lateral.jpg"),
    ex("Panturrilha em pé","Gastrocnêmio","T","img/panturrilha_pe.jpg"),
    ex("Prancha","Core","T","img/prancha.jpg")
  ]),
  day("Full Body B", [
    ex("Levantamento terra romeno","Posterior/Glúteo","T","img/levantamento_terra.jpg"),
    ex("Supino inclinado (halteres)","Peito/Ombro ant.","T","img/supino_inclinado.jpg"),
    ex("Puxada pronada / Barra fixa","Costas/Bíceps","R","img/barra_fixa.jpg"),
    ex("Rosca direta (barra)","Bíceps/Antebraço","R","img/rosca_direta.jpg"),
    ex("Tríceps corda","Tríceps","D","img/triceps_pulley.jpg"),
    ex("Crunch com peso","Core","T","img/crunch_peso.jpg")
  ]),
  day("Full Body C", [
    ex("Leg press 45°","Quadríceps/Glúteo","T","img/leg_press.jpg"),
    ex("Desenvolvimento ombros","Ombros","T","img/desenvolvimento_ombros.jpg"),
    ex("Remada baixa (cabo)","Costas","T","img/remada_baixa.jpg"),
    ex("Crucifixo máquina","Peito","D","img/crucifixo.jpg"),
    ex("Panturrilha sentado","Sóleo","T","img/panturrilha_sentado.jpg"),
    ex("Prancha lateral","Core/Oblíquos","T","img/prancha.jpg")
  ])
];

const UL4 = [
  day("Full A (Quad ênfase + Empurrar/Remada)", [
    ex("Agachamento livre","Quadríceps/Glúteo","C","img/agachamento.jpg"),
    ex("Supino reto (halteres)","Peito/Tríceps","T","img/supino_reto_halteres.jpg"),
    ex("Remada curvada (barra)","Costas/Bíceps","T","img/remada_curvada.jpg"),
    ex("Búlgaro","Quadríceps/Glúteo","T","img/bulgarian.jpg"),
    ex("Elevação lateral","Ombros (medial)","D","img/elevacao_lateral.jpg"),
    ex("Tríceps corda","Tríceps","R","img/triceps_pulley.jpg"),
    ex("Panturrilha em pé","Gastrocnêmio","T","img/panturrilha_pe.jpg"),
    ex("Prancha","Core","T","img/prancha.jpg")
  ]),
  day("Full B (Posterior ênfase + Puxar/Empurrar vertical)", [
    ex("Terra romeno","Posterior/Glúteo","T","img/levantamento_terra.jpg"),
    ex("Puxada pronada","Costas/Bíceps","R","img/puxada_pronada.jpg"),
    ex("Desenvolvimento halteres","Ombros","T","img/desenvolvimento_ombros.jpg"),
    ex("Hip thrust","Glúteo","R","img/hip_thrust.jpg"),
    ex("Mesa flexora","Posterior","D","img/mesa_flexora.jpg"),
    ex("Rosca direta","Bíceps/Antebraço","R","img/rosca_direta.jpg"),
    ex("Crunch com peso","Core","T","img/crunch_peso.jpg")
  ]),
  day("Full C (Quad + Peito/Ombros variações)", [
    ex("Agachamento frontal / Hack","Quadríceps","T","img/agachamento.jpg"),
    ex("Supino inclinado","Peito/Ombro ant.","T","img/supino_inclinado.jpg"),
    ex("Remada sentada (cabo)","Costas/Bíceps","T","img/remada_baixa.jpg"),
    ex("Step-up / Afundo estacionário","Quadríceps/Glúteo","T","img/afundo.jpg"),
    ex("Crucifixo máquina","Peito","D","img/crucifixo.jpg"),
    ex("Rosca inversa","Antebraço extensores","T","img/rosca_inversa.jpg"),
    ex("Panturrilha sentado","Sóleo","T","img/panturrilha_sentado.jpg")
  ]),
  day("Full D (Posterior + Puxada vertical)", [
    ex("Deadlift pesado / RDL","Posterior/Glúteo","T","img/levantamento_terra.jpg"),
    ex("Puxada neutra/supinada","Costas/Bíceps","R","img/puxada_fechada.jpg"),
    ex("Arnold press / Máquina","Ombros","T","img/desenvolvimento_ombros.jpg"),
    ex("Good morning / Extensão lombar","Lombar/Posterior","T","img/good_morning.jpg"),
    ex("Cadeira flexora","Posterior","D","img/mesa_flexora.jpg"),
    ex("Rosca Scott","Bíceps","D","img/rosca_scott.jpg"),
    ex("Cable crunch","Core","T","img/crunch_peso.jpg")
  ])
];

const PPL5 = [
  day("Push A", [
    ex("Supino reto (halteres)","Peito/Tríceps","T","img/supino_reto_halteres.jpg"),
    ex("Crucifixo máquina","Peito","D","img/crucifixo.jpg"),
    ex("Desenvolvimento ombros","Ombros","T","img/desenvolvimento_ombros.jpg"),
    ex("Elevação lateral","Ombros (medial)","D","img/elevacao_lateral.jpg"),
    ex("Tríceps corda","Tríceps","R","img/triceps_pulley.jpg"),
    ex("Prancha","Core","T","img/prancha.jpg")
  ]),
  day("Pull A", [
    ex("Puxada pronada","Costas/Bíceps","T","img/puxada_pronada.jpg"),
    ex("Remada curvada (barra)","Costas/Bíceps","T","img/remada_curvada.jpg"),
    ex("Rosca direta","Bíceps/Antebraço","R","img/rosca_direta.jpg"),
    ex("Face pull","Posterior de ombro","T","img/face_pull.jpg"),
    ex("Rosca inversa","Antebraço extensores","T","img/rosca_inversa.jpg")
  ]),
  day("Legs A", [
    ex("Agachamento livre (cluster)","Quadríceps/Glúteo","C","img/agachamento.jpg"),
    ex("Leg press 45°","Quadríceps/Glúteo","T","img/leg_press.jpg"),
    ex("Afundo estacionário","Quadríceps/Glúteo","T","img/afundo.jpg"),
    ex("Panturrilha em pé","Gastrocnêmio","T","img/panturrilha_pe.jpg")
  ]),
  day("Push B", [
    ex("Supino inclinado","Peito/Ombro ant.","T","img/supino_inclinado.jpg"),
    ex("Crossover","Peito","D","img/crucifixo.jpg"),
    ex("Desenvolvimento máquina","Ombros","T","img/desenvolvimento_ombros.jpg"),
    ex("Tríceps testa","Tríceps","R","img/triceps_testa.jpg"),
    ex("Prancha lateral","Core/Oblíquos","T","img/prancha.jpg")
  ]),
  day("Pull B", [
    ex("Puxada neutra/supinada","Costas/Bíceps","R","img/puxada_fechada.jpg"),
    ex("Remada baixa","Costas/Bíceps","T","img/remada_baixa.jpg"),
    ex("Rosca Scott","Bíceps","D","img/rosca_scott.jpg"),
    ex("Face pull","Posterior de ombro","T","img/face_pull.jpg")
  ])
];

const templates = {"3d":FULL3,"4d":UL4,"5d":PPL5};

function render(){
  const plan = templates[planPick.value];
  tabsEl.innerHTML = '';
  daysEl.innerHTML = '';
  plan.forEach((d,idx)=>{
    const t = document.createElement('button');
    t.className='tab'+(idx===0?' active':'');
    t.textContent = `Dia ${idx+1}`;
    t.addEventListener('click',()=>switchDay(idx));
    tabsEl.appendChild(t);

    const dayEl = document.createElement('section');
    dayEl.className='day';
    dayEl.innerHTML = `<h3>${d.title}</h3>
      <table class="table">
        <thead><tr><th>Imagem</th><th>Exercício</th><th>Grupo</th><th>Técnica</th></tr></thead>
        <tbody>
          ${d.items.map(it => `
            <tr>
              <td><img class="thumb" src="${it.img}" alt="${it.name}" onerror="this.style.display='none'"></td>
              <td>${it.name}</td>
              <td><span class="group">${it.group}</span></td>
              <td>${seal(it.tech)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>`;
    daysEl.appendChild(dayEl);
  });
  switchDay(0);
}

function switchDay(idx){
  const tabs=[...tabsEl.children];
  const days=[...daysEl.children];
  tabs.forEach((el,i)=>el.classList.toggle('active',i===idx));
  days.forEach((el,i)=>el.style.display = (i===idx?'block':'none'));
}

document.getElementById('toggleImgs').addEventListener('click', ()=>document.body.classList.toggle('hide-thumb'));
document.getElementById('exportCsv').addEventListener('click', ()=>{
  const plan = templates[planPick.value];
  const rows = [['plano','dia','ordem','exercicio','grupo','tecnica']];
  plan.forEach((d,di)=>d.items.forEach((it,oi)=>{
    const techMap = {T:'Tradicional',D:'Drop',R:'Rest‑Pause',C:'Cluster'};
    rows.push([planPick.value, `Dia ${di+1}`, oi+1, it.name, it.group, techMap[it.tech]||'Tradicional']);
  }));
  const csv = rows.map(r=>r.join(',')).join('\\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));
  a.download = `treino_minimal_${planPick.value}.csv`;
  a.click();
});
planPick.addEventListener('change', render);
render();
