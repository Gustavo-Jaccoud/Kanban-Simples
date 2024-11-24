const entradaTarefa = document.getElementById("taskInput");
const botaoAdicionarTarefa = document.getElementById("addTaskBtn");
const listaAfazer = document.getElementById("afazer");
const listaFazendo = document.getElementById("fazendo");
const listaFinalizado = document.getElementById("finalizado");

let afazer = [];
let fazendo = [];
let finalizado = [];

function carregarTarefas() {
    afazer = (localStorage.getItem("afazer") || "").split(",").filter(Boolean);
    fazendo = (localStorage.getItem("fazendo") || "").split(",").filter(Boolean);
    finalizado = (localStorage.getItem("finalizado") || "").split(",").filter(Boolean);
    atualizarLista();
}

function salvarTarefas() {
    localStorage.setItem("afazer", afazer.join(","));
    localStorage.setItem("fazendo", fazendo.join(","));
    localStorage.setItem("finalizado", finalizado.join(","));
}

function criarTarefaElemento(descricaoTarefa, estado) {
    const tarefaDiv = document.createElement("li");
    tarefaDiv.classList.add("task");

    const textoTarefa = document.createElement("span");
    textoTarefa.textContent = descricaoTarefa;

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "X";
    botaoRemover.classList.add("remove-btn");

    botaoRemover.onclick = function () {
        if (estado === "afazer") {
            afazer = afazer.filter(t => t !== descricaoTarefa);
        } else if (estado === "fazendo") {
            fazendo = fazendo.filter(t => t !== descricaoTarefa);
        } else if (estado === "finalizado") {
            finalizado = finalizado.filter(t => t !== descricaoTarefa);
        }
        salvarTarefas();
        atualizarLista();
        tarefaDiv.remove();
    };

    const botaofazendo = document.createElement("button");
    botaofazendo.classList.add("fazendo-btn");
    botaofazendo.onclick = function () {
        moverTarefa(descricaoTarefa, "afazer", "fazendo");
    };

    const botaofinalizado = document.createElement("button");
    botaofinalizado.classList.add("finalizado-btn");
    botaofinalizado.onclick = function () {
        moverTarefa(descricaoTarefa, "fazendo", "finalizado");
    };

    const botaoafazer = document.createElement("button");
    botaoafazer.classList.add("afazer-btn");
    botaoafazer.onclick = function () {
        moverTarefa(descricaoTarefa, "finalizado", "afazer");
    };

    const divlist = document.createElement("div");
    divlist.classList.add("divlist");

    divlist.appendChild(textoTarefa);
    divlist.appendChild(botaoRemover);
    tarefaDiv.appendChild(divlist);

    const divbutton = document.createElement("div");
    divbutton.classList.add("divbutton");
    divbutton.appendChild(botaoafazer);
    divbutton.appendChild(botaofazendo);
    divbutton.appendChild(botaofinalizado);

    tarefaDiv.appendChild(divbutton);

    return tarefaDiv;
}

function moverTarefa(descricaoTarefa, origem, destino) {
    if (origem === "afazer") afazer = afazer.filter(t => t !== descricaoTarefa);
    if (origem === "fazendo") fazendo = fazendo.filter(t => t !== descricaoTarefa);
    if (origem === "finalizado") finalizado = finalizado.filter(t => t !== descricaoTarefa);

    if (destino === "afazer" && !afazer.includes(descricaoTarefa)) afazer.push(descricaoTarefa);
    if (destino === "fazendo" && !fazendo.includes(descricaoTarefa)) fazendo.push(descricaoTarefa);
    if (destino === "finalizado" && !finalizado.includes(descricaoTarefa)) finalizado.push(descricaoTarefa);

    salvarTarefas();
    atualizarLista();
}

function adicionarTarefa() {
    const descricaoTarefa = entradaTarefa.value.trim();

    if (descricaoTarefa !== "") {
        afazer.push(descricaoTarefa);
        salvarTarefas();
        atualizarLista();
        entradaTarefa.value = "";
    }
}

function atualizarLista() {
    listaAfazer.innerHTML = "";
    listaFazendo.innerHTML = "";
    listaFinalizado.innerHTML = "";

    for (let i = 0; i < afazer.length; i++) {
        const tarefaDiv = criarTarefaElemento(afazer[i], "afazer");
        listaAfazer.appendChild(tarefaDiv);
    }

    for (let i = 0; i < fazendo.length; i++) {
        const tarefaDiv = criarTarefaElemento(fazendo[i], "fazendo");
        listaFazendo.appendChild(tarefaDiv);
    }

    for (let i = 0; i < finalizado.length; i++) {
        const tarefaDiv = criarTarefaElemento(finalizado[i], "finalizado");
        listaFinalizado.appendChild(tarefaDiv);
    }
}

carregarTarefas();
botaoAdicionarTarefa.onclick = adicionarTarefa;
