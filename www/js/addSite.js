// const models = require("../../db/models");

window.onload = async() => {
    console.log();

    // conseguir los id de la url
    let params = new URLSearchParams(window.location.search);
    categoria = params.get("categoria");
    site = params.get("site");
    
    // Hacer una llamada y que devuelva los datos del site en concreto
    const data = await getSitesOfCategory(categoria)
    data.map(e => {
            if(e.id == site){
                const formulario1 = document.forms['formulario'];
                formulario1.elements['name'].value = e.name;
                formulario1.elements['url'].value = e.url;
                formulario1.elements['user'].value = e.user;
                formulario1.elements['password'].value = e.password;
                formulario1.elements['description'].value = e.description;
            }
        });
};

function goToIndex() {
    window.location = 'index.html';
}

const insertSite = async(id) => {
    const formulario = document.forms['formulario'];
    //console.log(formulario.elements['description'].value)
    let objectSite = {
        "name": formulario.elements['name'].value,
        "url": formulario.elements['url'].value,
        "user": formulario.elements['user'].value,
        "password": formulario.elements['password'].value,
        "description": formulario.elements['description'].value === '' ? "" : formulario.elements['description'].value
    }
    postSite(id,objectSite)
}

const showError = inputName =>{
    let input = document.getElementById(inputName)
     if(input.value.match(/^\s*$/)){
        document.getElementsByClassName(`input-${inputName}`)[0].classList.remove("d-none")
        document.querySelector(`label[for="${inputName}"]`).classList.add('errorColor')
     } else {
        document.getElementsByClassName(`input-${inputName}`)[0].classList.add("d-none")
        document.querySelector(`label[for="${inputName}"]`).classList.remove('errorColor')
     }
}

//El método de arriba no puedo poner return boolean porque en el checkform 
//puede que no llegue a realizarse el showError
const checkEmptyInput = inputName =>{
    let formulario = document.forms['formulario'];
    let input = formulario.elements[inputName];
     if(input.value.match(/^\s*$/)){
        return false
     } else {
        return true
     }
}

//Cada vez que clicke en el botón de guardar comprobar que todo funciona de forma correcta
const checkForm = () =>{
    showError('name')
    showError('user')
    showError('password')
    if(checkEmptyInput('name') && checkEmptyInput('user') &&
        checkEmptyInput('password')){
        // conseguir los id de la url
        let params = new URLSearchParams(window.location.search);
        //Creando un site
        if(params.get("site") === null){
            insertSite(params.get("categoria"))
            goToIndex()
        } else { //Editando un site

        }
    }
}

const passwordGenerator = () => {
    let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 20;
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
       password += chars.substring(randomNumber, randomNumber +1);
    }
    document.getElementById('password').value=password
    showError('password')
}
