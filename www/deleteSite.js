const removeSiteJs = (id) =>{
    const tr = document.getElementById(`tr-${id}`)
    tr.remove()
}

const deleteSite = async(id) =>{
        try{
            const url = `http://localhost:3000/sites/${id}`
            await fetch(url,{
              method: 'delete'
            })
            //await respuesta.json()
            removeSiteJs(id)
        }catch(error){
            console.log(error)
        }
}

const putDeleteEvent = (id,nameTittle) => {
    console.log('bine')
    const aceptModalBtn = document.getElementById('acceptDeleteModal')
    const title = document.getElementById('nameOfSite')
    aceptModalBtn.setAttribute('onclick',`deleteSite(${id})`)
    title.innerText = nameTittle
}