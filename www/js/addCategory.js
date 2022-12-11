const checkEmpty = () =>{
    return document.getElementById('categoryName').value.match(/^\s*$/)
}

//Insertar la categoría
const insertCategory = async() => {
    let newCategory = document.getElementById('categoryName')

    let objectCategory = { "name": newCategory.value }
    let resultado = await postCategory(objectCategory)
    console.log(resultado)
    let i = document.createElement('i')
    
    const selectedIcon = document.getElementsByClassName('selected-icon')[0]
    if(selectedIcon !== undefined){
        i.className=`${selectedIcon.classList.value}`
        i.classList.remove('fa-xl')
        i.classList.remove('selected-icon')
        i.classList.add('fa-lg')
        //ESCRIBIR LocalStorage
        let arrayIcons = localStorage.getItem("arrayIcons")
        if(arrayIcons === null){
            let icons = [{"categoryName":resultado.id,"iconClass":`${i.className}`}]
            localStorage.setItem("arrayIcons", JSON.stringify(icons))
        } else {
            arrayIcons = JSON.parse(localStorage.getItem("arrayIcons"));
            arrayIcons.push({"categoryName":resultado.id,"iconClass":`${i.className}`})
            localStorage.setItem("arrayIcons", JSON.stringify(arrayIcons))
        }
    }

    let parent = document.getElementsByTagName('ul')[0]
    let child = document.createElement('li')
        child.setAttribute("id", resultado.id);
        child.setAttribute("onclick", `clickCategory(${resultado.id})`);
    child.innerText = newCategory.value
    child.appendChild(i)
    parent.appendChild(child);
    newCategory.value = ''
    removeSelectIcon()
}
//Volver negros los colores del formulario
const checkOk = () =>{
        document.getElementsByClassName('small')[0].classList.add("d-none")
        document.querySelector('label[for="categoryName"]').classList.remove('errorColor')
        document.getElementById('categoryName').value = ''
        removeSelectIcon()
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


const clickCategoryIcon = name =>{
    const selectedIcon = document.getElementsByClassName('selected-icon')[0]
    if(selectedIcon !== undefined){
        selectedIcon.classList.remove('selected-icon')
    }
    console.log(document.getElementsByClassName(name))
    document.getElementsByClassName(name)[0].classList.add('selected-icon')
}

const removeSelectIcon = () =>{
    const selectedIcon = document.getElementsByClassName('selected-icon')[0]
    if(selectedIcon !== undefined){
        selectedIcon.classList.remove('selected-icon')
    }
}

