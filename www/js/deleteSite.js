const removeSiteJs = (id) =>{
    const tr = document.getElementById(`tr-${id}`)
    tr.remove()
}

//Eliminar un site
const deleteSiteOfCategory = async(id) =>{
    deleteSite(id)
    removeSiteJs(id)
}

//Poner en el modal de borrar los datos correspondientes
const putDeleteEvent = (id,nameTittle) => {
    console.log('bine')
    const aceptModalBtn = document.getElementById('acceptDeleteModal')
    const title = document.getElementById('nameOfSite')
    aceptModalBtn.setAttribute('onclick',`deleteSiteOfCategory(${id})`)
    title.innerText = nameTittle
}