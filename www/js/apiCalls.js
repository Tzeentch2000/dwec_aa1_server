const getCategories = async() =>{
    return fetch(`http://localhost:3000/categories`)
    .then(res => res.json())
    .then(data => {return data})
}

const getSitesOfCategory = async(id) =>{
    return fetch(`http://localhost:3000/categories/${id}`)
      .then(res => res.json())
      .then(data => {return data})
}

const deleteSite = async(id) =>{
    try{
        const url = `http://localhost:3000/sites/${id}`
        await fetch(url,{
          method: 'delete'
        })
        //await respuesta.json()
    }catch(error){
        console.log(error)
    }
}

const postCategory = async(objectCategory) => {
    const url = 'http://localhost:3000/categories' 
    respuesta = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(objectCategory),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const resultado = await respuesta.json()
    return resultado
}

const postSite = async(id,objectSite) =>{
    const url = `http://localhost:3000/categories/${id}` 
    respuesta = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(objectSite),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const resultado = await respuesta.json()
    return resultado
}