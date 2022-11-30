
const checkEmpty = () =>{
    return document.getElementById('categoryName').value.match(/^\s*$/)
}

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

const closeModal = () =>{
    //Para que quede mejor cuando cierras el modal(sin timeout queda peor)
    setTimeout(() => {
        document.getElementsByClassName('small')[0].classList.add("d-none")
        document.querySelector('label[for="categoryName"]').classList.remove('errorColor')
      }, "500")
}

const saveCategory = () =>{
    let newCategory = document.getElementById('categoryName')
    if(checkEmpty(newCategory.value)){
        document.getElementsByClassName('small')[0].classList.remove("d-none")
        document.querySelector('label[for="categoryName"]').classList.add('errorColor')
        newCategory.value = ''
    } else {
       closeModal()
        //Hide boostrap modal
        var myModalEl = document.getElementById('addCategory')
        var modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide()
    
        insertCategory()
    }
}

