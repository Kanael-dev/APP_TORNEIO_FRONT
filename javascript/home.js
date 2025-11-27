
const url = "https://app-torneio.onrender.com";
const requestForms = "/app_status/forms"
const atualizarForms = "/app_status/"
const formsAtivo = "/forms"
const requestFormsInformations = "/valide_forms"
const requestAddUser = "/players"
let idFormsGeneral = null
const tokenUser = localStorage.getitem("authToken")


// Valida se o usuario esta logado
async function validarAcesso() {
  
    if (!tokenUser) {
        window.location.href = "login.html";
        return;
    }

    // Tenta acessar um endpoint protegido
    const response = await fetch("https://app-torneio.onrender.com/app_status/forms", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    });
  
    if (response.status === 401) {
        // Token expirado ou inválido
        localStorage.removeItem("authToken");
        window.location.href = "login.html";
    }
}

// Executa imediatamente ao abrir a página
validarAcesso();



const options = {
  method: "get",
  headers: {
      "Content-Type": "application/json",
      "Authorization": `"Bearer ${tokenUser}`
  },
  //body: JSON.stringify(data),
};
fetch(url + requestForms, options)
.then((response) => response.json())
.then((data) => {
  const allFormsGen = data["forms"]
  allFormsGen.forEach((src, index) => {
      const teste = document.getElementById("test")
      const link = document.createElement("button");
      link.value = allFormsGen[index]["id"]; 
      if(allFormsGen[index]["status"] == 0){
          link.textContent = "Desativado"
      } else {
          link.textContent = "Ativado"
      }

      
      link.addEventListener("click", function (event) {
          event.preventDefault();  
          if(allFormsGen[index]["status"] == 0){
               requestChangeForms(allFormsGen[index]["id"], 1)
          } else {
               requestChangeForms(allFormsGen[index]["id"], 0)
          }
      });

      teste.appendChild(link);
  });
})
.catch((error) => console.error("Error:", error));

function requestChangeForms(idForms, status){
  const optionsPUT = {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + tokenUser
      },
      body: JSON.stringify({"status": status}),
  };
  const urlAtualizar = url + atualizarForms + idForms
  console.log(urlAtualizar)
  fetch(urlAtualizar, optionsPUT)
  .then((response) => response.json())
  .then((data) => {
      console.log(data)
  })
  .catch((error) => console.error("Error:", error));

}
