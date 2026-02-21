const frases = [
"Disciplina constrói liberdade.",
"Consistência vence talento.",
"Você está evoluindo todos os dias.",
"Hoje é dia de avanço.",
"Pequenos passos geram grandes resultados."
];

document.getElementById("motivacao").innerText =
frases[Math.floor(Math.random() * frases.length)];

const dataInput = document.getElementById("dataSelecionada");
const tarefasDiv = document.getElementById("tarefas");

dataInput.valueAsDate = new Date();
carregarTarefas();

dataInput.addEventListener("change", carregarTarefas);

function salvar(data, tarefas){
localStorage.setItem(data, JSON.stringify(tarefas));
}

function carregarTarefas() {
  tarefasDiv.innerHTML = "";

  const data = dataInput.value;
  const tarefas = JSON.parse(localStorage.getItem(data)) || [];

  const pendentes = tarefas.filter(t => !t.concluida);
  const concluidas = tarefas.filter(t => t.concluida);

  if (pendentes.length > 0) {
    const tituloPendentes = document.createElement("h3");
    tituloPendentes.innerText = "🌿 Pendentes";
    tarefasDiv.appendChild(tituloPendentes);

    pendentes.forEach((t, i) => {
      criarElementoTarefa(t, i, tarefas);
    });
  }

  if (concluidas.length > 0) {
    const tituloConcluidas = document.createElement("h3");
    tituloConcluidas.innerText = "✅ Concluídas";
    tarefasDiv.appendChild(tituloConcluidas);

    concluidas.forEach((t, i) => {
      criarElementoTarefa(t, i, tarefas);
    });
  }
}
function criarElementoTarefa(tarefa, indexOriginal, listaCompleta) {
  const div = document.createElement("div");
  div.className = "tarefa";

  if (tarefa.concluida) {
    div.style.opacity = "0.6";
    div.style.textDecoration = "line-through";
  }

  const texto = document.createElement("span");
  texto.innerText = tarefa.hora + " - " + tarefa.texto;

  const btnConcluir = document.createElement("button");
  btnConcluir.innerText = "✔";
  btnConcluir.onclick = () => {
    listaCompleta[indexOriginal].concluida = !listaCompleta[indexOriginal].concluida;
    salvar(dataInput.value, listaCompleta);
    carregarTarefas();
  };

  const btnApagar = document.createElement("button");
  btnApagar.innerText = "🗑";
  btnApagar.onclick = () => {
    listaCompleta.splice(indexOriginal, 1);
    salvar(dataInput.value, listaCompleta);
    carregarTarefas();
  };

  div.appendChild(texto);
  div.appendChild(btnConcluir);
  div.appendChild(btnApagar);

  tarefasDiv.appendChild(div);
}

tarefas.forEach(t=>{
const div = document.createElement("div");
div.className = "tarefa";
div.innerHTML = t.hora + " - " + t.texto;
tarefasDiv.appendChild(div);
});
}

function adicionarTarefa(){
const data = dataInput.value;
const hora = document.getElementById("hora").value;
const texto = document.getElementById("textoTarefa").value;
const recorrente = document.getElementById("recorrente").checked;

if(!texto || !hora) return;

let tarefas = JSON.parse(localStorage.getItem(data)) || [];
tarefas.push({hora, texto, concluida: false});
salvar(data,tarefas);

if(recorrente){
for(let i=1;i<=30;i++){
let nova = new Date(data);
nova.setDate(nova.getDate()+i);
let chave = nova.toISOString().split("T")[0];
let tarefasRec = JSON.parse(localStorage.getItem(chave)) || [];
tarefasRec.push({hora,texto});
salvar(chave,tarefasRec);
}
}

agendarNotificacao(texto,hora);
carregarTarefas();
}

function agendarNotificacao(texto,hora){
if(Notification.permission==="granted"){
let agora = new Date();
let [h,m] = hora.split(":");
let horario = new Date();
horario.setHours(h,m,0);

let tempo = horario-agora;

if(tempo>0){
setTimeout(()=>{
new Notification("🌿 Lembrete",{body:texto});
},tempo);
}
}else{
Notification.requestPermission();
}
}