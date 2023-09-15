export const buscarProdutoPorId = async (URLServidorProdutos, idProduto) => {        
    const resposta = await fetch(`${URLServidorProdutos}/${idProduto}`);
    if (!resposta.ok) {
        throw new Error("Produto não encontrado no cadastro.");
    }
    return resposta.json();
}