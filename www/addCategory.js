
const checkEmpty = () =>{
    return document.getElementById('categoryName').value.match(/^\s*$/)
}

//Insertar la categoría
const insertCategory = async() => {
    let newCategory = document.getElementById('categoryName')
    let parent = document.getElementsByTagName('ul')[0]
    let child = document.createElement('li')
    fetch("http://localhost:3000/categories").then(res => res.json()).then(data => {
        child.setAttribute("id", data.length+1);
        child.setAttribute("onclick", `clickCategory(${data.length+1})`);
    });
    child.innerText = newCategory.value
    parent.appendChild(child);

    let objectCategory = { "name": newCategory.value }
    const url = 'http://localhost:3000/categories' 
    respuesta = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(objectCategory),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const resultado = await respuesta.json()
    console.log(resultado)
    newCategory.value = ''
}
//Volver negros los colores del formulario
const checkOk = () =>{
        document.getElementsByClassName('small')[0].classList.add("d-none")
        document.querySelector('label[for="categoryName"]').classList.remove('errorColor')
}

//Comprobar si no hay datos vacíos
const checkCategory = () =>{
    let newCategory = document.getElementById('categoryName')
    if(checkEmpty(newCategory.value)){
        document.getElementsByClassName('small')[0].classList.remove("d-none")
        document.querySelector('label[for="categoryName"]').classList.add('errorColor')
        newCategory.value = ''
        return false
    } else {
        checkOk()
        return true
    }
}

//Cerrar el modal y guardar la categoría si todo está Ok
const saveCategory = () => {
    if(checkCategory()){
        //Hide boostrap modal
        const myModalEl = document.getElementById('addCategory')
        const modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide()
        insertCategory()
    }
}

const visitPage = () =>{
    let url = window.location.href;
    alert(url);
    alert(window.glob);
    window.location='addSite.html';
}
