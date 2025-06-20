(function () {
    const buttons = document.getElementsByName("button");
    const paragrafo = document.getElementById("paragrafo");
    for (let i = 0; buttons.length; i++) {
        buttons[i].onclick = function(e) { //funcao chamada quando o event click acontece
            if (e.target.innerHTML === 'none') {    //"e" e o evento de click e target e o bottao
                paragrafo.className = "escondido"
            } else {
                paragrafo.removeAttribute("class")
            }
        }
    }
})() //funcao anonima - funcao e criada e imediatamente invocada, isso acontece pq em js nao se deve criar variaveis globais, pois isso geralmente causa conflitos de nome.

