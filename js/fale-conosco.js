const btnFaleConosco = document.querySelector(".rodape__fale-conosco__botao");

btnFaleConosco.addEventListener("click", (evento) => {
    evento.preventDefault();

    const formulario = document.querySelector("#rodape__fale-conosco");    
    const isFormValid = formulario.checkValidity();

    if (!isFormValid) {
        formulario.reportValidity();
    } else {
        swal({
            title: "Mensagem enviada!",
            text: "Retornaremos assim que possível.",
            icon: 'success',
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
})