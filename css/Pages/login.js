function getInformationsUser() {
    const email = document.getElementById("userEmail").value ;
    const password = document.getElementById("UserPassword").value;

    const DataUsers = {
        "email": email,
        "password": password
    }

    console.log("Object created: " + DataUsers)
    
    console.log("Email");
    console.log("Senha");

}
