import { preparaProdutosParaMostrar } from "./listar-produtos.js";
import { removerProduto } from "./remover-produto.js";
import { buscarProdutoPorId } from "./buscar-produto-por-id.js";
import { verificaUsuarioLogado } from "./verifica-usuario-logado.js";

const logOut = document.getElementById("cabecalho__login__usuario__sair");
logOut.addEventListener("click", () => {
    sessionStorage.removeItem("usuarioLogado");
    window.location.reload();
})

window.addEventListener("resize", (event) => {
    const logotipo       = document.querySelector(".cabecalho__logo");
    const login          = document.querySelector(".cabecalho__login");
    const pesquisa       = document.querySelector(".cabecalho__pesquisa");
    const lupa           = document.querySelector(".cabecalho__pesquisa__lupa-2");
    const fecharPesquisa = document.querySelector(".cabecalho__pesquisa__fechar-pesquisa");

    if (window.innerWidth > 768) {
        logotipo.style.display = "flex";
        login.style.display    = "flex";
        pesquisa.style.display = "flex";
        lupa.style.display     = "none";
        fecharPesquisa.style.display = "none";        
    } else {        
        logotipo.style.display = "flex";
        login.style.display    = "flex";
        pesquisa.style.display = "none";
        lupa.style.display     = "flex";
        fecharPesquisa.style.display = "none";
    }
});

const lupa1 = document.querySelector(".cabecalho__pesquisa__lupa-1");
lupa1.addEventListener("click", async () => {
    const termoPesquisa = document.querySelector(".cabecalho__pesquisa__input").value.toLowerCase();
    window.location.href = "./html/listarProdutos.html?termoPesquisa=" + termoPesquisa;
    // pesquisar(termoPesquisa);
})

const lupa2 = document.querySelector(".cabecalho__pesquisa__lupa-2");
lupa2.addEventListener("click", () => {
    const logotipo       = document.querySelector(".cabecalho__logo");
    const login          = document.querySelector(".cabecalho__login");
    const pesquisa       = document.querySelector(".cabecalho__pesquisa");
    const lupa           = document.querySelector(".cabecalho__pesquisa__lupa-2");
    const fecharPesquisa = document.querySelector(".cabecalho__pesquisa__fechar-pesquisa");
    
    logotipo.style.display = "none";
    login.style.display    = "none";
    pesquisa.style.display = "flex";
    lupa.style.display     = "none";
    fecharPesquisa.style.display = "flex";
});

const fecharPesquisa = document.querySelector(".cabecalho__pesquisa__fechar-pesquisa");
fecharPesquisa.addEventListener("click", () => {
    const logotipo       = document.querySelector(".cabecalho__logo");
    const login          = document.querySelector(".cabecalho__login");
    const pesquisa       = document.querySelector(".cabecalho__pesquisa");
    const lupa           = document.querySelector(".cabecalho__pesquisa__lupa-2");
    const fecharPesquisa = document.querySelector(".cabecalho__pesquisa__fechar-pesquisa");
    
    logotipo.style.display = "flex";
    login.style.display    = "flex";
    pesquisa.style.display = "none";
    lupa.style.display     = "flex";
    fecharPesquisa.style.display = "none";
});

const inputPesquisa = document.querySelector(".cabecalho__pesquisa__input");
inputPesquisa.addEventListener('keyup', (event) => {
    const key = event.key;

    if (key == "Enter") { // codigo da tecla enter
        const termoPesquisa = document.querySelector(".cabecalho__pesquisa__input").value.toLowerCase();
        window.location.href = "./html/listarProdutos.html?termoPesquisa=" + termoPesquisa;
        // pesquisar(termoPesquisa);
    }
})

window.addEventListener("load", async () => {        

    const url_string = window.location.href;
    const url = new URL(url_string);
    let idProduto = url.searchParams.get("idProduto");

    try {
        const resposta = await buscarProdutoPorId("http://localhost:3000/produtos", idProduto);

        const nome      = resposta.nome;
        const categoria = resposta.categoria;
        const preco     = parseFloat(resposta.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const descricao = resposta.descricao;
        const imagem    = resposta.imagem;

        const produto = `<div class="mostrar-produto">
                            <div class="mostrar-produto__imagem">
                                <img class="mostrar-produto__imagem__foto" src="${imagem}"/>
                            </div>
                            <div class="mostrar-produto__info">
                                <div>
                                    <h1 class="mostrar-produto__nome">${nome}</h1>
                                    <p class="mostrar-produto__preco">${preco}</p>
                                    <p class="mostrar-produto__descricao">${descricao}</p>                                
                                </div>
                                <div class="botoes__editar-excluir">
                                    <input class="cadastro__botao__editar botao" type="button" id="cadastro__botao__editar" value="Editar"/>
                                    <input class="cadastro__botao__excluir botao" type="button" id="cadastro__botao__excluir" value="Excluir"/>
                                </div>
                            </div>
                        </div>`;

        const produtosSimilares = await preparaProdutosParaMostrar('http://localhost:3000/produtos?_page=1&_limit=6&categoria=' + categoria, categoria, "Produtos similares", "none");

        const mostrarProduto = document.querySelector(".container__mostrar-produto");
        mostrarProduto.innerHTML = produto + produtosSimilares;

        const btnEditar = document.querySelector("#cadastro__botao__editar");
        const btnExcluir = document.querySelector("#cadastro__botao__excluir");
            
        /*** Inicia o listener do botão excluir só após carregar a página ***/
        btnExcluir.addEventListener("click", () => {
            try {

                swal({
                    title: `O produto "${nome}" vai ser excluido...`,
                    text: "Deseja continuar?",
                    icon: 'warning',
                    closeOnClickOutside: false,
                    buttons: {
                        cancel: {
                          text: "Cancelar",
                          value: null,
                          visible: true,
                          className: "",
                          closeModal: true
                        },
                        confirm: {
                          text: "Excluir",
                          value: true,
                          visible: true,
                          className: "",
                          closeModal: true
                        }
                    }                    
                }).then(async (result) => {   
                    if (result) {
                        await removerProduto("http://localhost:3000/produtos", idProduto);
                        window.location.href = "../html/listarProdutos.html";
                    }
                });

            } catch(erro) {
                swal({
                    title: "O produto não pôde ser excluído.",
                    text: "Erro: " + erro,
                    icon: 'error',
                    closeOnClickOutside: false,
                    buttons: {
                        confirm: {
                          text: "OK",
                          value: true,
                          visible: true,
                          className: "",
                          closeModal: true
                        }
                    }                    
                })
            }
        });

        /*** Inicia o listener do botão editar só após carregar a página ***/
        btnEditar.addEventListener("click", () => {            
            window.location.href = "../html/cadastrarProdutos.html?idProduto=" + idProduto;                        
        });

        // verifica usuário logado
        btnEditar.style.display = "none";
        btnExcluir.style.display = "none";
        const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
        if (verificaUsuarioLogado() && usuarioLogado.tipo === "admin") {
            btnEditar.style.display = "block";
            btnExcluir.style.display = "block";
        };

    } catch(erro) {
        swal({
            title: "Não foi possível mostrar o produto!",
            text: "Erro: " + erro,
            icon: 'error',
            closeOnClickOutside: false,
            buttons: {
                confirm: {
                  text: "OK",
                  value: true,
                  visible: true,
                  className: "",
                  closeModal: true
                }
            }                    
        })
        
    }        
});


