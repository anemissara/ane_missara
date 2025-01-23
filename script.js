// URL ou caminho do arquivo JSON com os produtos
const jsonURL = "produtos.json"; // Altere para o caminho do seu arquivo JSON

// Seleciona os contêineres do catálogo, modais e a área para o dropdown
const catalog = document.getElementById("catalog");
const modals = document.getElementById("modals");
const dropdownContainer = document.querySelector(".dropdown-container");

// Função para carregar o JSON e gerar o dropdown e produtos
async function carregarProdutos() {
    try {
        // Faz o fetch do JSON
        const resposta = await fetch(jsonURL);
        const produtos = await resposta.json();

        // Obter categorias únicas e incluir "Todas"
        const categorias = ["Todas", ...new Set(produtos.map((produto) => produto.categoria))];

        // Criar o dropdown para as categorias
        const select = document.createElement("select");
        select.className = "dropdown";

        categorias.forEach((categoria) => {
            const option = document.createElement("option");
            option.value = categoria;
            option.textContent = categoria;
            select.appendChild(option);
        });

        // Adiciona um evento de mudança para o dropdown
        select.addEventListener("change", () => {
            filtrarProdutos(select.value, produtos); // Filtra os produtos
        });

        // Adiciona o dropdown ao contêiner
        dropdownContainer.appendChild(select);

        // Exibir todos os produtos inicialmente
        filtrarProdutos("Todas", produtos);
    } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
    }
}

function filtrarProdutos(categoria, produtos) {
    // Limpa o catálogo e os modais
    catalog.innerHTML = "";
    modals.innerHTML = "";

    // Filtra os produtos com base na categoria
    const produtosFiltrados = categoria === "Todas"
        ? produtos
        : produtos.filter((produto) => produto.categoria === categoria);

    // Gera os elementos para os produtos filtrados
    produtosFiltrados.forEach((produto, index) => {
        // Cria o elemento do produto no catálogo
        const productDiv = document.createElement("div");
        productDiv.className = "product";

        productDiv.innerHTML = `
            <div onclick="abrirModal(${index + 1})">
                <img src="${produto.link_imagem}" alt="${produto.nome}">
            </div>
            <div class="product-name">${produto.nome}</div>
            <div class="product-price">R$ ${produto.preco.toFixed(2)}</div>
            <div class="product-id">ID - ${produto.id}</div>
        `;

        catalog.appendChild(productDiv);

        // Cria o modal correspondente
        const modalDiv = document.createElement("div");
        modalDiv.id = `modal${index + 1}`;
        modalDiv.className = "modal";

        modalDiv.innerHTML = `
            <div class="modal-content">
                <img src="${produto.link_imagem}" alt="${produto.nome}" onclick="fecharModal(${index + 1})">
            </div>
        `;

        modals.appendChild(modalDiv);
    });
}

// Funções para abrir e fechar modais
function abrirModal(index) {
    const modal = document.getElementById(`modal${index}`);
    modal.style.display = "flex"; // Mostra o modal
    document.body.style.overflow = "hidden"; // Desabilita o scroll da página
}

function fecharModal(index) {
    const modal = document.getElementById(`modal${index}`);
    modal.style.display = "none"; // Oculta o modal
    document.body.style.overflow = ""; // Habilita o scroll da página novamente
}


// Chama a função para carregar os produtos
carregarProdutos();
