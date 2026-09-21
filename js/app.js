
let eventos = [
    {
        id: 1,
        titulo: "Workshop",
        tipo: "Workshop",
        data: "2026-09-25",
        local: "Laboratório 2",
        descricao: "Atividade prática sobre versionamento.",
        status: "Agendado"
    },
    {
        id: 2,
        titulo: "Palestral",
        tipo: "Palestra",
        data: "2026-10-05",
        local: "Auditório",
        descricao: "Palestra",
        status: "Agendado"
    },
    {
        id: 3,
        titulo: "Minicurso",
        tipo: "Minicurso",
        data: "2026-09-10",
        local: "Laboratório 1",
        descricao: "Mini Curso.",
        status: "Realizado"
    },
];



const app = document.querySelector("#app");

const linksMenu = document.querySelectorAll("[data-view]");



linksMenu.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const view = link.dataset.view;

        mostrarTela(view);

    });

});


function mostrarTela(view) {

    if (view === "dashboard") {
        mostrarDashboard();
    }

    if (view === "novo") {
        mostrarNovoEvento();
    }

    if (view === "eventos") {
        mostrarEventos();
    }

}


function mostrarDashboard() {

    const totalEventos = eventos.length;

    const agendados = eventos.filter(function (evento) {
        return evento.status === "Agendado";
    }).length;

    const realizados = eventos.filter(function (evento) {
        return evento.status === "Realizado";
    }).length;


    app.innerHTML = `
        <h1 class="mb-4">Dashboard</h1>

        <div class="row g-4">

            <div class="col-md-4">
                <div class="card shadow-sm">
                    <div class="card-body text-center">

                        <h5 class="card-title">
                            Total de Eventos
                        </h5>

                        <p class="display-4">
                            ${totalEventos}
                        </p>

                    </div>
                </div>
            </div>


            <div class="col-md-4">
                <div class="card shadow-sm">
                    <div class="card-body text-center">

                        <h5 class="card-title">
                            Eventos Agendados
                        </h5>

                        <p class="display-4 text-primary">
                            ${agendados}
                        </p>

                    </div>
                </div>
            </div>


            <div class="col-md-4">
                <div class="card shadow-sm">
                    <div class="card-body text-center">

                        <h5 class="card-title">
                            Eventos Realizados
                        </h5>

                        <p class="display-4 text-success">
                            ${realizados}
                        </p>

                    </div>
                </div>
            </div>

        </div>
    `;

}


function mostrarNovoEvento() {

    app.innerHTML = `
        <h1 class="mb-4">Novo Evento</h1>

        <div id="mensagem"></div>

        <div class="card shadow-sm">

            <div class="card-body">

                <form id="formEvento">

                    <div class="mb-3">

                        <label for="titulo" class="form-label">
                            Título
                        </label>

                        <input
                            type="text"
                            id="titulo"
                            class="form-control"
                        >

                    </div>


                    <div class="mb-3">

                        <label for="tipo" class="form-label">
                            Tipo
                        </label>

                        <select id="tipo" class="form-select">

                            <option value="">
                                Selecione
                            </option>

                            <option value="Palestra">
                                Palestra
                            </option>

                            <option value="Workshop">
                                Workshop
                            </option>

                            <option value="Minicurso">
                                Minicurso
                            </option>

                            <option value="Visita Técnica">
                                Visita Técnica
                            </option>

                        </select>

                    </div>


                    <div class="mb-3">

                        <label for="data" class="form-label">
                            Data
                        </label>

                        <input
                            type="date"
                            id="data"
                            class="form-control"
                        >

                    </div>


                    <div class="mb-3">

                        <label for="local" class="form-label">
                            Local
                        </label>

                        <input
                            type="text"
                            id="local"
                            class="form-control"
                        >

                    </div>


                    <div class="mb-3">

                        <label for="descricao" class="form-label">
                            Descrição
                        </label>

                        <textarea
                            id="descricao"
                            class="form-control"
                            rows="4"
                        ></textarea>

                    </div>


                    <button
                        type="submit"
                        class="btn btn-primary"
                    >
                        Cadastrar
                    </button>

                </form>

            </div>
        </div>
    `;


    const form = document.querySelector("#formEvento");

    form.addEventListener("submit", cadastrarEvento);

}


function cadastrarEvento(event) {

    event.preventDefault();


    const titulo = document.querySelector("#titulo").value.trim();

    const tipo = document.querySelector("#tipo").value;

    const data = document.querySelector("#data").value;

    const local = document.querySelector("#local").value.trim();

    const descricao = document.querySelector("#descricao").value.trim();

    const mensagem = document.querySelector("#mensagem");



    if (
        titulo === "" ||
        tipo === "" ||
        data === "" ||
        local === "" ||
        descricao === ""
    ) {

        mensagem.innerHTML = `
            <div class="alert alert-danger">
                Preencha todos os campos.
            </div>
        `;

        return;
    }


    // Geração de ID
    let novoId = 1;

    if (eventos.length > 0) {

        novoId = Math.max(
            ...eventos.map(function (evento) {
                return evento.id;
            })
        ) + 1;

    }


    // Novo objeto
    const novoEvento = {

        id: novoId,

        titulo: titulo,

        tipo: tipo,

        data: data,

        local: local,

        descricao: descricao,

        status: "Agendado"

    };

    eventos.push(novoEvento);

    document.querySelector("#formEvento").reset();

    mensagem.innerHTML = `
        <div class="alert alert-success">
            Evento cadastrado com sucesso!
        </div>
    `;

}


function mostrarEventos() {

    app.innerHTML = `
        <h1 class="mb-4">Eventos</h1>


        <div class="row mb-4">

            <div class="col-md-8 mb-2">

                <label for="pesquisa" class="form-label">
                    Pesquisar evento
                </label>

                <input
                    type="text"
                    id="pesquisa"
                    class="form-control"
                    placeholder="Digite o título do evento"
                >

            </div>


            <div class="col-md-4 mb-2">

                <label for="filtroStatus" class="form-label">
                    Status
                </label>

                <select
                    id="filtroStatus"
                    class="form-select"
                >

                    <option value="Todos">
                        Todos
                    </option>

                    <option value="Agendado">
                        Agendado
                    </option>

                    <option value="Realizado">
                        Realizado
                    </option>

                </select>

            </div>

        </div>


        <div
            id="listaEventos"
            class="row g-4"
        ></div>
    `;


    const pesquisa = document.querySelector("#pesquisa");

    const filtroStatus = document.querySelector("#filtroStatus");


    pesquisa.addEventListener("input", aplicarFiltros);

    filtroStatus.addEventListener("change", aplicarFiltros);


    renderizarEventos(eventos);

}


function aplicarFiltros() {

    const texto = document
        .querySelector("#pesquisa")
        .value
        .toLowerCase()
        .trim();


    const status = document
        .querySelector("#filtroStatus")
        .value;


    const eventosFiltrados = eventos.filter(function (evento) {

        const tituloEncontrado = evento.titulo
            .toLowerCase()
            .includes(texto);


        const statusEncontrado =
            status === "Todos" ||
            evento.status === status;


        return tituloEncontrado && statusEncontrado;

    });


    renderizarEventos(eventosFiltrados);

}


function renderizarEventos(lista) {

    const listaEventos = document.querySelector("#listaEventos");

    listaEventos.innerHTML = "";


    if (lista.length === 0) {

        const mensagem = document.createElement("div");

        mensagem.className = "col-12";

        mensagem.innerHTML = `
            <div class="alert alert-warning">
                Nenhum evento encontrado.
            </div>
        `;

        listaEventos.appendChild(mensagem);

        return;
    }


    lista.forEach(function (evento) {


        const coluna = document.createElement("div");

        coluna.className = "col-md-6 col-lg-4";



        const card = document.createElement("div");

        card.className = "card shadow-sm";


        const cardBody = document.createElement("div");

        cardBody.className = "card-body";


        const titulo = document.createElement("h5");

        titulo.className = "card-title";

        titulo.textContent = evento.titulo;


        const tipo = document.createElement("span");

        tipo.className = "badge bg-primary me-2";

        tipo.textContent = evento.tipo;


        const status = document.createElement("span");

        if (evento.status === "Realizado") {

            status.className = "badge bg-success";

        } else {

            status.className = "badge bg-warning text-dark";

        }

        status.textContent = evento.status;


        const data = document.createElement("p");

        data.className = "mt-3 mb-1";

        data.textContent = "Data: " + formatarData(evento.data);


        const local = document.createElement("p");

        local.className = "mb-1";

        local.textContent = "Local: " + evento.local;


        const descricao = document.createElement("p");

        descricao.className = "evento-descricao mt-3";

        descricao.textContent = evento.descricao;


        cardBody.appendChild(titulo);

        cardBody.appendChild(tipo);

        cardBody.appendChild(status);

        cardBody.appendChild(data);

        cardBody.appendChild(local);

        cardBody.appendChild(descricao);



        if (evento.status === "Agendado") {

            const btnRealizado = document.createElement("button");

            btnRealizado.className = "btn btn-success me-2";

            btnRealizado.textContent = "Marcar como Realizado";


            btnRealizado.addEventListener("click", function () {

                marcarRealizado(evento.id);

            });


            cardBody.appendChild(btnRealizado);

        }


        const btnExcluir = document.createElement("button");

        btnExcluir.className = "btn btn-danger";

        btnExcluir.textContent = "Excluir";


        btnExcluir.addEventListener("click", function () {

            excluirEvento(evento.id);

        });


        cardBody.appendChild(btnExcluir);


        card.appendChild(cardBody);

        coluna.appendChild(card);

        listaEventos.appendChild(coluna);

    });

}


function marcarRealizado(id) {

    const evento = eventos.find(function (evento) {

        return evento.id === id;

    });


    if (evento) {

        evento.status = "Realizado";

    }


    aplicarFiltros();

}

function excluirEvento(id) {

    eventos = eventos.filter(function (evento) {

        return evento.id !== id;

    });


    aplicarFiltros();

}

function formatarData(data) {

    const partes = data.split("-");

    return partes[2] + "/" + partes[1] + "/" + partes[0];

}

mostrarDashboard();