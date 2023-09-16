export const listarItens = async (url) => {

    const resposta = await fetch(url);
    if (!resposta.ok) {
        throw new Error('Não foi possível listar os produtos. Erro ao executar o "fetch".');
    }

    return resposta.json();
};

export async function preparaProdutosParaMostrar(url, categoria, descricaoListagem, tipoCabecalho, arrayProdutos = []) {

    let link = "";
    switch (tipoCabecalho) {
        case 'none':
            link = `<a class="produtos__ver-produto" href="./html/listarProdutos.html?categoria=${categoria}" data-${categoria}></a>`;
            break;
        case 'verTudo':
            link = `<a class="produtos__ver-produto" href="./html/listarProdutos.html?categoria=${categoria}" data-${categoria}>Ver tudo &#10140</a>`;
            break;
        case 'cadastro':
            link = '<a class="produtos__botao__adicionar botao" id="produtos__botao__adicionar" href="./cadastrarProdutos.html">Adicionar produto</a>'
            break;
        default:
          throw new Error("Tipo de cabeçalho desconhecido.");
    }    

    const cabecalhoListagem = 
        `<hr>
        <div class="produtos__cabecalho">
            <h2 class="produtos__titulo" id="ancora__${categoria}">${descricaoListagem}</h2>
            ${link}            
        </div>`;

    let resposta = arrayProdutos;

    if (resposta.length === 0 && url !== "") {        
        resposta = await listarItens(url);  
    }

    let produtos = "";
    resposta.forEach( produto => {
        const preco = parseFloat(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        produtos +=
            `<div class="produto">
                <img class="produto__imagem" src="${produto.imagem}" alt="Foto do produto" />
                <div class="alinhar__produto__nome">
                    <p class="produto__nome">${produto.nome}</p>
                </div>
                <p class="produto__preco">${preco}</p>
                <a class="produtos__ver-produto" href="../html/mostrarProduto.html?idProduto=${produto.id}" data-produto${produto.id}>Ver produto</a>
            </div>`;                       
    });    
    
    if (produtos === "") {
        return "";
    }
    return  `<div class="produtos" id="produtos">
                ${cabecalhoListagem}
                <div class="produtos__exibir">
                    ${produtos}
                </div>
            </div>`;
};