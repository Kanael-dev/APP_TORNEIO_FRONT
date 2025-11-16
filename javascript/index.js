console.log("====== Startou execução ==========");

const url = "http://127.0.0.1:5000";
const requestForms = "/forms"
const requestFormsInformations = "/valide_forms"
const requestAddUser = "/players"
let idFormsGeneral = null

window.addEventListener("load", (event) => {
  
  const options = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    //body: JSON.stringify(data),
  };

  fetch(url+requestForms, options)
    .then((response) => response.json())
    .then((data) => {
        if(data["forms"] == 0){
            
            const mostrarMensagem = document.getElementById("statusRequest")
            removeForms()
            mostrarMensagem.innerText = "Sem nenhum evento para o momento"
            disponibilizaForms()
        } else {
            const id = data["forms"];
            idFormsGeneral = id;
            validadorUsuarios(id)
        }
    })
    .catch((error) => console.error("Error:", error));
});

// valida se tem vagas disponiveis
function validadorUsuarios(id){

    disponibilizaForms()

    fetch(url+requestFormsInformations, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"id": id})
    })
    .then((response) => response.json())
    .then((data) => {
         const qtdVagasDisponiveis = data["vagas"]
        if (qtdVagasDisponiveis== 0) {
            removeForms()
            mostrarVagas(qtdVagasDisponiveis)
        } else {
            mostrarVagas(qtdVagasDisponiveis)
        }
    })
    .catch((error) => console.error("Error:", error));
}

// Disponibilizar o formulario para os usuarios
function disponibilizaForms(){
    const loading = document.getElementById("loading_settings")
    if (loading) loading.remove()
}

function removeForms(){
    const FormsUsers = document.getElementById("formsCadastroUser")
    const btnUser = document.getElementById("btnCadastrarUser")
    if (FormsUsers) {FormsUsers.remove(); btnUser.remove()}
}



function mostrarVagas(qtdVagas){
    const mostrarVagas = document.getElementById("numVagas");

    const textUsers = qtdVagas
    mostrarVagas.innerText = textUsers

}


// SALVAR INFORMACOES NO BANCO DE DADOS
function getInformationsUser(){
    console.log("Processando usuario")

    const UserNick = document.getElementById("userNick").value;
    const UserTag = document.getElementById("userTag").value;
    const UserElo = document.getElementById("userElo").value;

    dataUsers = {
         "name": UserNick,
         "tag": UserTag,
         "elo": UserElo
     }

     confirmarInclusao()
}

function addUser(data){
    fetch(url+requestAddUser, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
        const messageUser = document.getElementById("statusRequest");
        messageUser.innerText = data["message"]
    })
    .catch((error) => console.error("Error:", error));
}

function confirmarInclusao(){
    fetch(url+requestFormsInformations, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"id": idFormsGeneral})
    })
    .then((response) => response.json())
    .then((data) => {
         const qtdVagasDisponiveis = data["vagas"]
        if (qtdVagasDisponiveis || 0) {
            addUser(dataUsers)
        } else {
            alert("Nao foi possivel cadastrar! As vagas foram encerradas")
            window.location.reload()
        }
    })
    .catch((error) => console.error("Error:", error));
}
