export function verificaUsuarioLogado() {

    const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));

    if (usuarioLogado) {

        let nome = usuarioLogado.nome;
        nome = nome.substring(0, nome.indexOf(" "));

        document.getElementById("cabecalho__login__usuario__usuario").innerHTML = nome;
        document.getElementById("cabecalho__login__usuario__avatar").src = "../img/star-wars06.png";

        document.getElementById("cabecalho__login__botao").style.display = "none";
        document.getElementById("cabecalho__login__usuario").style.display = "flex";    

        return true;
    } else {

        document.getElementById("cabecalho__login__botao").style.display = "flex";
        document.getElementById("cabecalho__login__usuario").style.display = "none";

        document.getElementById("cabecalho__login__usuario__usuario").innerHTML = "";
        document.getElementById("cabecalho__login__usuario__avatar").src = "";

        return false;
    }

}
