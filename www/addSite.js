const models = require("../../db/models")

function sendForm() {

    let formulario1 = document.forms['formulario'];

    let name = formulario1.elements['name'];
    let url = formulario1.elements['url'];
    let user = formulario1.elements['user'];
    let password = formulario1.elements['password'];
    let description = formulario1.elements['description'];

    alert(name.value+" "+url.value + " " + user.value + " " + password.value + " " + description.value);

    document.getElementById("formulario").submit();
}


async function insertSite(name, url, user, password, description) {
    let objectSite = {
        "name": name,
        "url": url,
        "user": user,
        "password": password,
        "description": description
    }
    const urlAPI = `http://localhost:3000/categories/:id`;
    request =
    {
        method: 'POST',
        body: JSON.stringify(objectSite),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    respuesta = await fetch(urlAPI, request);
    const resultado = await respuesta.json();
    console.log(resultado);
}