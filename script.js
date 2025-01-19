// URL ou caminho do arquivo JSON com os produtos
const jsonURL = "produtos.json"; // Altere para o caminho do seu arquivo JSON

// Seleciona os contêineres do catálogo e dos modais
const catalog = document.getElementById("catalog");
const modals = document.getElementById("modals");

// Função para carregar o JSON e gerar o conteúdo
async function carregarProdutos() {
    try {
        // Faz o fetch do JSON
        const resposta = await fetch(jsonURL);
        const produtos = await resposta.json();

        // Itera sobre os produtos para criar os elementos HTML
        produtos.forEach((produto, index) => {
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
    } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
    }
}

// Chama a função para carregar os produtos
carregarProdutos();
