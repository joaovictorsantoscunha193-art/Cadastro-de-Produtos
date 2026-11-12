// AARRAY E MONTAGEM DA ESTRUTURA
const produtos = [
    { nome: "Teclado Mecânico", preco: 250, categoria: "Periféricos" },
    { nome: "Mouse Gamer", preco: 1000, categoria: "Periféricos" },
    { nome: "Notebook I5", preco: 9000, categoria: "Eletrônicos" },
    { nome: "Notebook I9", preco: 13500, categoria: "Eletrônicos" }
];

// ELEMENTOS
const formulario = document.querySelector('.formulario');
const inputNome = document.getElementById('nome');
const inputValor = document.getElementById('valor');
const selectCategoria = document.getElementById('categoria');
const inputBusca = document.getElementById('busca');
const lista = document.getElementById('lista');
const botoesFiltro = document.querySelectorAll('.filtro');

let categoriaAtiva = 'todos';

// MOSTRANDO NA TELA
function mostrarProdutos(listaProdutos) {
    if (listaProdutos.length === 0) {
        lista.innerHTML = '<p class="vazio">Nenhum produto encontrado.</p>';
        return;
    }

    lista.innerHTML = listaProdutos.map((produto) => {
        const precoFormatado = produto.preco.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        return `
            <article class="card-produto">
                <h3>${produto.nome}</h3>
                <p>${precoFormatado}</p>
                <span>${produto.categoria}</span>
            </article>
        `;
    }).join('');
}

// APLICANDO A BUSCA E FILTRANDO
function aplicarFiltros() {
    const termo = inputBusca.value.toLowerCase().trim();

    const filtrados = produtos.filter((produto) => {
        const bateBusca = produto.nome.toLowerCase().includes(termo);
        const bateCategoria = categoriaAtiva === 'todos' || produto.categoria === categoriaAtiva;
        return bateBusca && bateCategoria;
    });

    mostrarProdutos(filtrados);
}

// CADASTRO DO PRODUTO
formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    produtos.push({
        nome: inputNome.value.trim(),
        preco: parseFloat(inputValor.value),
        categoria: selectCategoria.value
    });

    aplicarFiltros();
    formulario.reset();
    inputNome.focus();
});

// BUSCA
inputBusca.addEventListener('input', aplicarFiltros);

// BOTÃO DE FILTRAGEM
botoesFiltro.forEach((botao) => {
    botao.addEventListener('click', () => {
        botoesFiltro.forEach((b) => b.classList.remove('ativo'));
        botao.classList.add('ativo');

        categoriaAtiva = botao.dataset.categoria;
        aplicarFiltros();
    });
});


aplicarFiltros();