export const removerProduto = async (URLServidorProdutos, idProduto) => {

    const resposta = await fetch( `${URLServidorProdutos}/${idProduto}`, {
        method: 'DELETE'
    } );
    if (!resposta.ok) {
        throw new Error('Erro ao executar o "fetch".');
    }
}