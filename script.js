// URL ou caminho do arquivo JSON com os produtos
const jsonURL = "produtos.json"; // Altere para o caminho do seu arquivo JSON

// Seleciona os contêineres do catálogo, modais e botões
const catalog = document.getElementById("catalog");
const modals = document.getElementById("modals");
const buttonGroup = document.querySelector(".button-group");

// Função para carregar o JSON e gerar os botões e produtos
async function carregarProdutos() {
    try {
        // Faz o fetch do JSON
        const resposta = await fetch(jsonURL);
        const produtos = await resposta.json();

        // Obter categorias únicas e incluir "Todas"
        const categorias = ["Todas", ...new Set(produtos.map((produto) => produto.categoria))];

        // Criar os botões para as categorias
        categorias.forEach((categoria) => {
            const button = document.createElement("button");
            button.textContent = categoria;
            button.className = "button";
            button.addEventListener("click", () => {
                atualizarSelecaoBotao(button); // Atualiza a seleção
                filtrarProdutos(categoria, produtos); // Aplica o filtro
            });
            buttonGroup.appendChild(button);
        });

        // Seleciona o botão "Todas" por padrão
        const primeiroBotao = buttonGroup.querySelector(".button");
        if (primeiroBotao) {
            primeiroBotao.classList.add("selected");
        }

        // Exibir todos os produtos inicialmente
        filtrarProdutos("Todas", produtos);
    } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
    }
}

// Função para atualizar a classe do botão selecionado
function atualizarSelecaoBotao(botaoSelecionado) {
    // Remove a classe "selected" de todos os botões
    const botoes = buttonGroup.querySelectorAll(".button");
    botoes.forEach((botao) => botao.classList.remove("selected"));

    // Adiciona a classe "selected" ao botão clicado
    botaoSelecionado.classList.add("selected");
}

// Função para exibir os produtos filtrados
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
            <a href="#modal${index + 1}">
                <img src="${produto.link_imagem}" alt="${produto.nome}">
            </a>
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
            <a href="#">
                <img src="${produto.link_imagem}" alt="${produto.nome}">
            </a>
        `;

        modals.appendChild(modalDiv);
    });
}

// Chama a função para carregar os produtos
carregarProdutos();
