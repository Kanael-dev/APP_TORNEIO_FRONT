const urlAPI = "https://app-torneio.onrender.com"
const RotaLogin = "/login"


function getInformationsUser() {
    const email = document.getElementById("userEmail").value;
    const password = document.getElementById("userPassword").value;

    requestUser(email,password)
}

function requestUser(userEmail, userSenha){

    const url = urlAPI + RotaLogin

    const DataUsers = {
        "email": userEmail,
        "password": userSenha
    }

    fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(DataUsers)
        }
    )
    .then(response => response.json())
    .then(data => {
        console.log("Token gerado: " + data["token"])
        localStorage.setItem("authToken", data["token"])
        redirecionarUser()
    })
    .catch(err => {
        console.error(err)
    })
}


function redirecionarUser(){
    window.location.href="./home.html"
}