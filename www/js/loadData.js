//Escribir las categorías 
let drawCategorias = async(datos) => {
    const data = await datos
    data.forEach(category => {
      let parent = document.getElementsByTagName('ul')[0]
      let child = document.createElement('li')
      child.setAttribute("id", category.id);
      child.setAttribute("onclick", `clickCategory(${category.id})`);
      // child.innerText = JSON.stringify(category)
      //console.log(category.id)
      child.innerText = category.name
      let arrayIcons = localStorage.getItem("arrayIcons")
      if(arrayIcons !== null){
        let iconElement = JSON.parse(localStorage.getItem("arrayIcons")).find(element => element.categoryName === category.id) 
        if(iconElement !== undefined){
          let i = document.createElement('i')
          i.className = iconElement.iconClass
          child.appendChild(i)
        }
      }
    parent.appendChild(child)
    })
}

//Al cargar la página que cargue las categorías
drawCategorias(getCategories())

//Printar sites en la tabla cuando clicke en una categoría
let drawTable = data =>{
  let parent = document.getElementsByTagName('tbody')[0]
  parent.innerHTML = ""
  data.forEach(sites => {
    let tr = document.createElement('tr')
      tr.id = `tr-${sites.id}`
      //Site
      let td = document.createElement('td')
      td.innerText = sites.name
      tr.appendChild(td)
      //User
      td = document.createElement('td')
      td.innerText = sites.user
      tr.appendChild(td)
      //Created At
      td = document.createElement('td')
      td.innerText = sites.createdAt.substring(0, 10)
      tr.appendChild(td)
      //Created Icons
      td = document.createElement('td')
          //folder 
      let a = document.createElement('a')
      a.href = sites.url
      a.setAttribute('target','_blank')
      let i = document.createElement('i')
      i.setAttribute("class","fa-regular fa-folder-open")
      a.appendChild(i)
      td.appendChild(a)

          //trash 
      i = document.createElement('i')
      i.setAttribute("class","fa-solid fa-trash-can")
      td.appendChild(i)
      i.setAttribute("data-bs-toggle","modal")
      i.setAttribute("data-bs-target","#deleteModal")
      i.setAttribute("onclick", `putDeleteEvent(${sites.id},"${sites.name}")`)

          //edit 
      a = document.createElement('a')
      a.href = `addSite.html?categoria=${sites.CategoryId}&&site=${sites.id}`
      i = document.createElement('i')
      i.setAttribute("class","fa-solid fa-pencil")
      a.appendChild(i)
      td.appendChild(a)

      tr.appendChild(td)
      parent.appendChild(tr)
    })
}

//Evento de clickado de categoría
let clickCategory = async(id) => {
  const data = await getSitesOfCategory(id)
  drawTable(data)
  document.getElementById('buttonSite').setAttribute('onclick',`searchSite(${id})`)
  let selectedCategory = document.getElementsByClassName('selected-category')[0]
  if(selectedCategory !== undefined){
    selectedCategory.classList.remove("selected-category")
  }
  document.getElementById(id).classList.add('selected-category')

  let addSite = document.getElementById("addSite");
  addSite.classList.remove('d-none')
  addSite.href = `addSite.html?categoria=${id}`;

  const buttonDelete = document.getElementById('eliminarCategoriaButton')
  buttonDelete.classList.remove('d-none')
  buttonDelete.setAttribute('onclick',`deleteCategoryOfCategories(${id})`)
}

//Buscar categoría
const searchCategory = async() => {
  document.getElementsByTagName('ul')[0].innerHTML = ""
  const value = document.getElementById('searchCategory').value.toLowerCase()
  if(value != ""){
    const resultado = await getCategories()
    const categories = resultado.filter(item => item.name.toLowerCase().startsWith(value))
    drawCategorias(categories)
  } else {
    drawCategorias(getCategories())
  }
}

//Buscar site
const searchSite = async(id) => {
  document.getElementsByTagName('tbody')[0].innerHTML = ""
  const value = document.getElementById('searchSite').value.toLowerCase()
  if(value != ""){
    const data = await getSitesOfCategory(id)
    const sites = data.filter(item => item.name.toLowerCase().startsWith(value))
    drawTable(sites)
  } else {
    clickCategory(id)
  }
}

