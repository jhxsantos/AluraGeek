// import { removerProduto } from "./js/remover-produto.js";
// import { atualizarProduto } from "./js/atualizar-produto.js";
import { preparaProdutosParaMostrar } from "./js/listar-produtos.js";
import { verificaUsuarioLogado } from "./js/verifica-usuario-logado.js";

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

    // verifica usuário logado
    verificaUsuarioLogado();
  
    // preenche a página com produtos
    try {
        let produtos = "";
        
        produtos += await preparaProdutosParaMostrar('http://localhost:3000/produtos?_page=1&_limit=6&categoria=starwars', "starwars", "Star Wars", "verTudo");
        produtos += await preparaProdutosParaMostrar('http://localhost:3000/produtos?_page=1&_limit=6&categoria=consoles', "consoles", "Consoles", "verTudo");
        produtos += await preparaProdutosParaMostrar('http://localhost:3000/produtos?_page=1&_limit=6&categoria=diversos', "diversos", "Diversos", "verTudo");
    
        const containerProdutos = document.querySelector("#container__produtos");
        if (produtos === "") {
            containerProdutos.innerHTML = '<div class="mensagem_container">' +
                                            '<p class="mensagem">Não há produtos para exibir</p>' +
                                            '<a class="mensagem__botao" href="./html/cadastrarProdutos.html"}>Cadastrar produto</a>' +
                                            '</div>';
        } else {
            containerProdutos.innerHTML = produtos;
        }
    } catch(erro){
        console.log("Não foi possível carregar os produtos! Erro: " + erro);
    }
});

