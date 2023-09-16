import { urlAPI } from "./urlAPI.js";

export const atualizarProduto = async (idProduto, nome, preco, descricao, categoria, imagem) => {

    const resposta = await fetch(`${urlAPI}/produtos/${idProduto}`, {
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