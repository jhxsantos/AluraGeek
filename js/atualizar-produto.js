export const atualizarProduto = async (idProduto, nome, preco, descricao, categoria, imagem) => {

    const resposta = await fetch(`http://localhost:3000/produtos/${idProduto}`, {
        method: "PUT",
        headers: {
            'content-type': "application/json"
        },
        body: JSON.stringify({
                nome: nome,
                preco: preco,
                descricao: descricao,
                categoria: categoria,
                imagem: imagem
            })
    })
    if (!resposta.ok) {
        throw new Error('Problemas ao executar o "fetch".');
    }
    return resposta.json();
}