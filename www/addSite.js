// const models = require("../../db/models");

window.onload = () => {
    console.log();

    // conseguir los id de la url
    let params = new URLSearchParams(window.location.search);
    categoria = params.get("categoria");
    site = params.get("site");
    
    // Hacer una llamada y que devuelva los datos del site en concreto
    fetch(`http://localhost:3000/categories/${categoria}`)
      .then(res => res.json())
      .then(data => {
        data.forEach(e => {
            if(e.id == site){
                let formulario1 = document.forms['formulario'];
                formulario1.elements['name'].value = e.name;
                formulario1.elements['url'].value = e.url;
                formulario1.elements['user'].value = e.user;
                formulario1.elements['password'].value = e.password;
                formulario1.elements['description'].value = e.description;
            }
        });
      })

};

function sendForm() {

    let formulario1 = document.forms['formulario'];

    let name = formulario1.elements['name'];
    let url = formulario1.elements['url'];
    let user = formulario1.elements['user'];
    let password = formulario1.elements['password'];
    let description = formulario1.elements['description'];

    // alert(name.value+" "+url.value + " " + user.value + " " + password.value + " " + description.value);

    // document.getElementById("formulario").submit();
    goToIndex();

}

function goToIndex() {
    window.location = 'index.html';
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