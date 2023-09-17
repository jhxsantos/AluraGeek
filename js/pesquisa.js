import { listarItens } from "./listar-produtos.js";
import { preparaProdutosParaMostrar } from "./listar-produtos.js";
import { urlAPIProdutos } from "./urlAPI.js";

export async function pesquisar(termoPesquisa) {    

    const produtos = await listarItens(urlAPIProdutos);
    let produtosEncontrados = [];

    if (termoPesquisa.length > 0) {
        produtos.forEach( produto => {

            if ( produto.nome.toLowerCase().indexOf(termoPesquisa) >= 0  || 
                 produto.descricao.toLowerCase().indexOf(termoPesquisa) >= 0) {
    
                produtosEncontrados.push(produto);
    
            }
            
        });
    } else {
        produtosEncontrados = produtos;
    }    

    let mensagem;
    switch (produtosEncontrados.length) {
        case 0:
            mensagem = 'Nenhum produto encontrados';
            break;
        case 1:
            mensagem = '1 produto encontrado.';
            break;
        default:
            mensagem = produtosEncontrados.length + ' produtos encontrados.';
    }
    
    const produtosParaMostrar = await preparaProdutosParaMostrar("", 
                                                            '', 
                                                            mensagem, 
                                                            'cadastro', 
                                                            produtosEncontrados);
    return produtosParaMostrar;

}