//Escribir las categorías 
let drawCategorias = (data) => {
    //console.log(data);
    data.forEach(category => {
      let parent = document.getElementsByTagName('ul')[0]
      let child = document.createElement('li')
      child.setAttribute("id", category.id);
      child.setAttribute("onclick", `clickCategory(${category.id})`);
      // child.innerText = JSON.stringify(category)
      //console.log(category.id)
      child.innerText = category.name
      parent.appendChild(child)
    })
}

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
      td.innerText = sites.createdAt
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
      i = document.createElement('i')
      i.setAttribute("class","fa-solid fa-pencil")
      i.setAttribute("onclick", `editar(${sites.categoryId},${sites.id})`);
      td.appendChild(i)

      tr.appendChild(td)
      parent.appendChild(tr)
    })
}

//Evento de clickado de categoría
let clickCategory = (id) => {
  fetch(`http://localhost:3000/categories/${id}`)
      .then(res => res.json())
      .then(data => drawTable(data))
  document.getElementById('buttonSite').setAttribute('onclick',`searchSite(${id})`)
  let selectedCategory = document.getElementsByClassName('selected-category')[0]
  if(selectedCategory !== undefined){
    selectedCategory.classList.remove("selected-category")
  }
  document.getElementById(id).classList.add('selected-category')

  let idCategoria = `${id}`;

  // Parámetros url
  let params = new URLSearchParams();
  params.append("categoria", idCategoria);

  let addSite = document.getElementById("addSite");
  let url = "file:///C:/Users/A8-PC100/Documents/dwec_aa1_server/www/addSite.html?" + params.toString();
  addSite.href = url;



}
//console.log(window.location.href)
//Al cargar la página que cargue las categorías
fetch("http://localhost:3000/categories").then(res => res.json()).then(data => drawCategorias(data));

//Buscar categoría
const searchCategory = async() => {
  document.getElementsByTagName('ul')[0].innerHTML = ""
  const value = document.getElementById('searchCategory').value.toLowerCase()
  if(value != ""){
    const url = 'http://localhost:3000/categories'
    const respuesta = await fetch(url)
    const resultado = await respuesta.json()
    const categories = resultado.filter(item => item.name.toLowerCase().startsWith(value))
    drawCategorias(categories)
  } else {
    fetch("http://localhost:3000/categories").then(res => res.json()).then(data => drawCategorias(data));
  }
}

//Buscar site
const searchSite = async(id) => {
  document.getElementsByTagName('tbody')[0].innerHTML = ""
  const value = document.getElementById('searchSite').value.toLowerCase()
  if(value != ""){
    const url = `http://localhost:3000/categories/${id}`
    const respuesta = await fetch(url)
    const resultado = await respuesta.json()
    const sites = resultado.filter(item => item.name.toLowerCase().startsWith(value))
    drawTable(sites)
  } else {
    clickCategory(id)
  }
}

const editar = (idCategoria, idSite) => {
  let params = new URLSearchParams();
  params.append("categoria", idCategoria);
  params.append("site", idSite);

  let url = "file:///C:/Users/A8-PC100/Documents/dwec_aa1_server/www/addSite.html?" + params.toString();
  window.location = url;
}
