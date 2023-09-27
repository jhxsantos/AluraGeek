import { firebaseSufix } from "./urlAPI.js";

export const buscarProdutoPorId = async (URLServidorProdutos, idProduto) => {  
    
    const resposta = await fetch(`${URLServidorProdutos}/${idProduto}${firebaseSufix}`);
    if (!resposta.ok) {
        throw new Error("Produto não encontrado no cadastro.");
    }
    return resposta.json();
}