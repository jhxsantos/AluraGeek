import { preparaProdutosParaMostrar } from "./listar-produtos.js";
import { listarItens } from "./listar-produtos.js";
import { pesquisar } from "./pesquisa.js";
import { verificaUsuarioLogado } from "./verifica-usuario-logado.js";
import { urlAPICategorias } from "./urlAPI.js";
import { urlAPIProdutos } from "./urlAPI.js";

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
    window.location.href = "../html/listarProdutos.html?termoPesquisa=" + termoPesquisa;
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
        window.location.href = "../html/listarProdutos.html?termoPesquisa=" + termoPesquisa;
        // pesquisar(termoPesquisa);
    }
})

window.addEventListener("load", async () => { 

    try {

        const url_string = window.location.href;
        const url = new URL(url_string);
        const categoria = url.searchParams.get("categoria");
        let termoPesquisa = url.searchParams.get("termoPesquisa");

        let nomeCategoria = "Todos os produtos";
        let produtos = "";
        if (categoria) {
            const resposta = await listarItens(`${urlAPICategorias}?categoria=${categoria}`);
            nomeCategoria = resposta[0].nomeCategoria;            
            produtos = await preparaProdutosParaMostrar(`${urlAPIProdutos}?categoria=${categoria}`, categoria, nomeCategoria, "cadastro");
        } else if (termoPesquisa) { //pesquisar pelo termo informado
            produtos = await pesquisar(termoPesquisa);
        } else { //mostrar todos os produtos
            produtos = await preparaProdutosParaMostrar(`${urlAPIProdutos}`, categoria, nomeCategoria, "cadastro");
        }

        let mensagem = "Não há produtos para exibir";
        if (termoPesquisa) mensagem = `A busca por "${termoPesquisa}" não retornou produtos`;        
        await mostrarProdutos(produtos, mensagem);
            
        // verifica usuário logado
        const botaoAdicionar = document.getElementById("produtos__botao__adicionar");        
        botaoAdicionar.style.display = "none";
        const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
        if (verificaUsuarioLogado() && usuarioLogado.tipo === "admin") {
            botaoAdicionar.style.display = "flex";
        };

    } catch(erro){
        swal({
            title: "Não foi possível carregar os produtos!",
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

function mostrarProdutos(produtos, mensagem) {
    const containerProdutos = document.querySelector("#container__produtos");        
    if (produtos === "") {
        containerProdutos.innerHTML = `<div class="mensagem_container">
                                            <p class="mensagem">${mensagem}</p>
                                            <a class="produtos__botao__adicionar botao" id="produtos__botao__adicionar" href="../html/cadastrarProdutos.html"}>Cadastrar produto</a>
                                        </div>`;
    } else {
        containerProdutos.innerHTML = produtos;                    
    }
}