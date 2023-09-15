import { listarItens } from "./listar-produtos.js";
import { buscarProdutoPorId } from "./buscar-produto-por-id.js";
import { atualizarProduto } from "./atualizar-produto.js";
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


const incluirProduto = async (nome, preco, descricao, categoria, imagem) => {

    const resposta = await fetch("http://localhost:3000/produtos", {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
                    nome: nome,
                    preco: preco,
                    descricao: descricao,
                    categoria: categoria,
                    imagem: imagem
                })
    });
    
    if (!resposta.ok) {
        throw new Error('Problema ao executar o "fetch".');
    } 
    return resposta;                    
}

const inputPreco = document.getElementById("cadastro__input_preco");
inputPreco.addEventListener("keyup", formatarMoeda); 
function formatarMoeda(e) {
    var v = e.target.value.replace(/\D/g,"");
    v = (v/100).toFixed(2) + "";
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    e.target.value = v;
}

/*** Ler o arquivo de imagem selecionado **************************/
const inputFile = document.querySelector("#cadastro__input_imagem");
const pictureImage = document.querySelector("#cadastro__imagem");
const pictureImageTxt = "imagem";
pictureImage.innerHTML = pictureImageTxt;

inputFile.addEventListener("change", function (e) {
  const inputTarget = e.target;
  const arquivo = inputTarget.files[0];

  if (arquivo) {
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
      const readerTarget = e.target;

      const img = document.createElement("img");
      img.src = readerTarget.result;
      img.classList.add("cadastro__imagem__imagem");

      pictureImage.innerHTML = "";
      pictureImage.appendChild(img);
    });

    reader.readAsDataURL(arquivo);
  } else {
    pictureImage.innerHTML = pictureImageTxt;
  }
});
/******************************************************************/

const btn = document.querySelector("#cadastro__botao__adicionar");
btn.addEventListener("click", async (evento) => {    
    evento.preventDefault();

    let imagem;
    try {
        imagem = document.querySelector(".cadastro__imagem__imagem").src;
    } catch {
        swal({
            text: "Escolha uma imagem.",
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
        return;
    }

    const formulario = document.querySelector("#cadastro__formulario");    
    const isFormValid = formulario.checkValidity();

    if (!isFormValid) {
        formulario.reportValidity();
    } else {
        let precoFormatado = document.querySelector("#cadastro__input_preco").value;
        precoFormatado = precoFormatado.replace("R$", "");
        precoFormatado = precoFormatado.replace(".",  "");
        precoFormatado = precoFormatado.replace(",", ".");
        precoFormatado = parseFloat(precoFormatado);

        const nome      = document.querySelector("#cadastro__input_nome").value;
        const preco     = precoFormatado;
        const descricao = document.querySelector("#cadastro__input__descricao").value;
        const categoria = document.querySelector("#cadastro__input_categoria").value;

        const url_string = window.location.href;
        const url = new URL(url_string);
        let idProduto = url.searchParams.get("idProduto");

        try {
            if (idProduto) {
                await atualizarProduto(idProduto, nome, preco, descricao, categoria, imagem);
                window.location.href = "../html/mostrarProduto.html?idProduto=" + idProduto;
            } else {
                await incluirProduto(nome, preco, descricao, categoria, imagem);
            }
        } catch(erro) {
            swal({
                title: "Não foi possível salvar o produto!",
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
    }
});

window.addEventListener("load", async () => {  

    // verifica usuário logado
    verificaUsuarioLogado();
  
    // preenche o combo de categorias
    try {
        preencherCategorias();
    } catch(erro) {
        console.log("Não foi possível carregar as categorias! Erro: " + erro);
    }

    // carrega as informações do produto se a página
    // recebeu um "id" por parâmetro.
    const url_string = window.location.href;
    const url = new URL(url_string);
    let idProduto = url.searchParams.get("idProduto");

    if (idProduto) {
        try {
            const resposta = await buscarProdutoPorId("http://localhost:3000/produtos", idProduto);
    
            const nome      = resposta.nome;
            const categoria = resposta.categoria;
            const preco     = parseFloat(resposta.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const descricao = resposta.descricao;
            const imagem    = resposta.imagem;

            // Cria o elemento de imagem no html
            const img = document.createElement("img");
            img.classList.add("cadastro__imagem__imagem");
            document.querySelector("#cadastro__imagem").innerHTML = "";
            document.querySelector("#cadastro__imagem").appendChild(img);
            // ----------------------------------------------------------

            document.querySelector(".cadastro__imagem__imagem").src = imagem;

            document.querySelector("#cadastro__input_nome").value = nome;
            document.querySelector("#cadastro__input_categoria").value = categoria;
            document.querySelector("#cadastro__input_preco").value = preco;
            document.querySelector("#cadastro__input__descricao").textContent = descricao;

        } catch(erro) {
            alert("Erro: " + erro);
        }
    
    }

});

async function preencherCategorias() {
    let categorias = '<option value="" selected disabled></option>';

    const resposta = await listarItens('http://localhost:3000/categorias');
    resposta.forEach( elemento => {
        categorias += `<option class="option" value="${elemento.categoria}">${elemento.nomeCategoria}</option>`;
    });

    document.querySelector(".cadastro__input_categoria").innerHTML = categorias;
}


/*
{
    "produtos": [],
    "usuarios": [
        {
            "nome": "José Henrique",
            "senha": "12345",
            "tipo": "admin",
            "id": 1
        },
        {
            "nome": "Maria Elisa",
            "senha": "12345",
            "tipo": "cliente",
            "id": 2
        }
    ],
  "categorias": [
    {
      "categoria": "consoles",
      "nomeCategoria": "Consoles",
      "id": 1
    },
    {
      "categoria": "diversos",
      "nomeCategoria": "Diversos",
      "id": 2
    },
    {
      "categoria": "starwars",
      "nomeCategoria": "Star Wars",
      "id": 3
    }
  ]
}
  */