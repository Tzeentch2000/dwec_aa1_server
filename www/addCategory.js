
const checkEmpty = () =>{
    return document.getElementById('categoryName').value.match(/^\s*$/)
}

const insertCategory = async() => {
    let newCategory = document.getElementById('categoryName')
    let parent = document.getElementsByTagName('ul')[0]
    let child = document.createElement('li')
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


const saveCategory = () =>{
    let newCategory = document.getElementById('categoryName')
    if(checkEmpty(newCategory.value)){
        document.getElementsByClassName('small')[0].classList.remove("d-none")
        document.querySelector('label[for="categoryName"]').classList.add('errorColor')
        newCategory.value = ''
    } else {
        document.getElementsByClassName('small')[0].classList.add("d-none")
        document.querySelector('label[for="categoryName"]').classList.remove('errorColor')

        //Hide boostrap modal
        var myModalEl = document.getElementById('addCategory')
        var modal = bootstrap.Modal.getInstance(myModalEl)
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
