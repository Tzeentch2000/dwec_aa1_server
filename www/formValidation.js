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
    showError('url')
    showError('user')
    showError('password')
    showError('description')
    if(checkEmptyInput('name') && checkEmptyInput('url') && checkEmptyInput('user') &&
        checkEmptyInput('password') && checkEmptyInput('description')){
            console.log('OK')
    } else {
        console.log('Mierda')
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
}