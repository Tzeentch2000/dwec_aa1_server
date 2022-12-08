const checkEmpty = () =>{
    return document.getElementById('categoryName').value.match(/^\s*$/)
}

//Insertar la categoría
const insertCategory = async() => {
    let newCategory = document.getElementById('categoryName')

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

    let parent = document.getElementsByTagName('ul')[0]
    let child = document.createElement('li')
        child.setAttribute("id", resultado.id);
        child.setAttribute("onclick", `clickCategory(${resultado.id})`);
    child.innerText = newCategory.value
    parent.appendChild(child);
    newCategory.value = ''
}
//Volver negros los colores del formulario
const checkOk = () =>{
        document.getElementsByClassName('small')[0].classList.add("d-none")
        document.querySelector('label[for="categoryName"]').classList.remove('errorColor')
        document.getElementById('categoryName').value=''
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
        document.getElementsByClassName('small')[0].classList.add("d-none")
        document.querySelector('label[for="categoryName"]').classList.remove('errorColor')
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
