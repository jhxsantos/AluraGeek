import { verificaUsuarioLogado } from "./verifica-usuario-logado.js";

window.addEventListener("load", () => {  
    // verifica usuário logado
    verificaUsuarioLogado();  
});

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

const btnlogin = document.querySelector("#login__botao__entrar");
btnlogin.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const formulario = document.querySelector("#login__formulario");    
    const isFormValid = formulario.checkValidity();

    if (!isFormValid) {
        formulario.reportValidity();
    } else {
        const email = document.querySelector(".login__input_email").value;
        const senha = document.querySelector(".login__input_senha").value;
        executaLogin(email, senha);
    }
})

async function executaLogin(email, senha) {
    try {
        const resposta = await fetch('http://localhost:3000/usuarios?email=' + email);
        const usuario  = await resposta.json();

        if (usuario.length > 0) {

            if (email === usuario[0].email && senha === usuario[0].senha) {

                const usarioLogado = {
                    nome: usuario[0].nome,
                    tipo: usuario[0].tipo           
                }

                sessionStorage.setItem("usuarioLogado", JSON.stringify(usarioLogado));
                window.location.href = "../index.html";

            } else {
                await swal({
                    text: "Email ou senha inválidos!",
                    icon: 'warning',
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
                });
                document.querySelector(".login__input_email").focus();
            }
        } else {
            await swal({
                text: "Email ou senha inválidos!",
                icon: 'warning',
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
            });
            document.querySelector(".login__input_email").focus();
        }

    } catch(erro) {  
        swal({
            title: "Erro ao fazer login!",
            text: erro + "",
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
        });            
    }
};