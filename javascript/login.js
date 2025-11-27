const urlAPI = "https://app-torneio.onrender.com"
const RotaLogin = "/login"


function getInformationsUser() {
    const email = document.getElementById("userEmail").value;
    const password = document.getElementById("userPassword").value;

    if (!email || !password) {
        return JSON.stringify({ message: "Necessário preencher todos os campos", "status": 0 });
    }

    
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
    })
    .then(async response => {
        console.log(response.ok);  
        console.log(response.status); 
    
        const data = await response.json(); 
    
        if (!response.ok) {
            console.log("Erro:", data.message);
            const divUser = document.getElementById("formsCadastroUser")
            divUser.innerHTML = "<p style='color:red;'>Não autorizado</p>";
            return;
        }
    
        console.log("Token gerado:", data.token);
        localStorage.setItem("authToken", data.token);
        redirecionarUser();
    })
    .catch(err => {
        console.error(err)
    });
}


function redirecionarUser(){
    window.location.href="./home.html"
}
