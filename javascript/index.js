console.log("====== Startou execução ==========");

const url = "https://app-torneio.onrender.com";
const requestForms = "/forms"
const requestFormsInformations = "/valide_forms"
const requestAddUser = "/players"
let idFormsGeneral = null
let EloSelected = null
let selectedEloCard = null
window.addEventListener("load", (event) => {

    const options = {
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
        //body: JSON.stringify(data),
    };

    fetch(url + requestForms, options)
        .then((response) => response.json())
        .then((data) => {
            if (data["forms"] == 0) {

                const mostrarMensagem = document.getElementById("statusRequest")
                removeForms()
                mostrarMensagem.innerText = "Sem nenhum evento para o momento"
                disponibilizaForms()
            } else {
                const Title = document.getElementById("TitleTorneio")
                const id = data["forms"];
                Title.innerText = data["title"] + " - " + data["date"]
                idFormsGeneral = id;
                validadorUsuarios(id)
            }
        })
        .catch((error) => console.error("Error:", error));
});

// valida se tem vagas disponiveis
function validadorUsuarios(id) {

    disponibilizaForms()

    fetch(url + requestFormsInformations, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "id": id })
    })
        .then((response) => response.json())
        .then((data) => {
            const qtdVagasDisponiveis = data["vagas"]
            if (qtdVagasDisponiveis == 0) {
                removeForms()
                mostrarVagas(qtdVagasDisponiveis)
            } else {
                mostrarVagas(qtdVagasDisponiveis)
            }
        })
        .catch((error) => console.error("Error:", error));
}

// Disponibilizar o formulario para os usuarios
function disponibilizaForms() {
    const loading = document.getElementById("loading_settings")
    if (loading) loading.remove()
}

function removeForms() {
    const FormsUsers = document.getElementById("formsCadastroUser")
    const btnUser = document.getElementById("btnCadastrarUser")
    if (FormsUsers) { FormsUsers.remove(); btnUser.remove() }
}



function mostrarVagas(qtdVagas) {
    const labelVagas = document.getElementById("qtdVagas");
    const mostrarVagas = document.getElementById("numVagas");

    if (labelVagas) labelVagas.innerText = "Vagas disponiveis:";
    const textUsers = qtdVagas;
    if (mostrarVagas) mostrarVagas.innerText = textUsers;

}

// Getting elo
function GetElo(a, element){
    EloSelected = a
    if (selectedEloCard) {
        selectedEloCard.classList.remove("selected-elo")
    }
    if (element) {
        element.classList.add("selected-elo")
        selectedEloCard = element
    }
}

// SALVAR INFORMACOES NO BANCO DE DADOS
function getInformationsUser() {
    console.log("Processando usuario")

    const UserNick = document.getElementById("userNick").value;
    const UserTag = document.getElementById("userTag").value;
    const UserElo = EloSelected;

    dataUsers = {
        "name": UserNick,
        "tag": UserTag,
        "elo": UserElo
    }

    // validação: todos obrigatórios
    if (!UserNick || !UserTag || !EloSelected) {
        alert("É necessário preencher Nickname, User Tag e selecionar o Elo.");
        return; // para a função aqui
    }

    confirmarInclusao(dataUsers);
}

function addUser(data) {
    fetch(url + requestAddUser, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((data) => {
            const messageUser = document.getElementById("statusRequest");
            const isOk = data["status"] === 200;
            if (messageUser) {
                messageUser.innerText = data["message"] || (isOk ? "Você foi cadastrado!" : "Não foi possível cadastrar.");
            }
            if (isOk) {
                removeForms();
                // Atualiza vagas consultando novamente o backend
                if (idFormsGeneral) {
                    validadorUsuarios(idFormsGeneral);
                }
            }
        })
        .catch((error) => console.error("Error:", error));
}

// Confirma a inclusao do item na base de dados
function confirmarInclusao() {
    fetch(url + requestFormsInformations, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "id": idFormsGeneral })
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
var idioma = (navigator.browserLanguage != undefined) ?
    navigator.browserLanguage : navigator.language;
    const translations = {
    en: {
        welcome: "Welcome",
        login: "Login",
        logout: "Logout",
        message: "This is an example message.",
        buttonCadastrese: "Sign Up",
        placeholderNick: "Nickname",
       
    },
    fr: {
        welcome: "Bienvenue",
        login: "Connexion",
        logout: "Déconnexion",
        message: "Ceci est un message d'exemple.",
        buttonCadastrese: "Inscrevez-vous",
        placeholderNick: "Surname",
        
    },
    pt: {
        welcome: "Bem-vindo",
        login: "Entrar",
        logout: "Sair",
        message: "Esta é uma mensagem de exemplo.",
        buttonCadastrese: "Cadastre-se",
        placeholderNick: "Nickname",
   

    }
};


// Mostra o idioma do usuario ligado
console.log(idioma)
var lingua = idioma.substring(0, 2)
function mostrarIdioma(lingua) {


    console.log(lingua)
    const inputElemento = document.getElementById('botao')
    const inputNick = document.getElementById('userNick')
    if (translations[lingua]) {
        if (inputElemento) {
            inputElemento.innerText = translations[lingua].buttonCadastrese;
        }
        if (inputNick) {
            inputNick.placeholder = translations[lingua].placeholderNick;
        }
    }
    console.log("final de execução");

}

mostrarIdioma(lingua)

const imagens = [
    "imagens/ferro.png",
    "imagens/bronze.png",
    "imagens/prata.png",
    "imagens/ouro.png",
    "imagens/platina.png",
    "imagens/esmeralda.png",
    "imagens/diamante.png",
    "imagens/mestre.png",
    "imagens/grao_mestre.png",
    "imagens/desafiante.png",
];

const imagem = document.getElementById("imagem")
imagens.forEach((src, index) => {
    const link = document.createElement("a");
    link.href = "#";

    const img = document.createElement("img");
    img.src = src;

    
    link.addEventListener("click", function (event) {
        event.preventDefault();
        GetElo(index + 1, link);     
    });

    link.appendChild(img);
    imagem.appendChild(link);
});

