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
      i.setAttribute("onclick", `putDeleteEvent(${sites.id},'${sites.name}')`)

          //edit 
      i = document.createElement('i')
      i.setAttribute("class","fa-solid fa-pencil")
      td.appendChild(i)

      tr.appendChild(td)
      parent.appendChild(tr)
    })
}


let clickCategory = (id) => {
  fetch(`http://localhost:3000/categories/${id}`)
      .then(res => res.json())
      .then(data => drawTable(data));
  let selectedCategory = document.getElementsByClassName('selected-category')[0]
  if(selectedCategory !== undefined){
    selectedCategory.classList.remove("selected-category")
  }
  document.getElementById(id).classList.add('selected-category')
}

console.log(window.location.href)


fetch("http://localhost:3000/categories").then(res => res.json()).then(data => drawCategorias(data));



