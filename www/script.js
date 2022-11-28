let drawCategorias = (data) => {
    //console.log(data);
    data.forEach(category => {
      let parent = document.getElementsByTagName('ul')[0]
      let child = document.createElement('li')
      child.setAttribute("id", category.id);
        child.setAttribute("onclick", `clickCategory(${category.id})`);
      // child.innerText = JSON.stringify(category)
      console.log(category.id)
      child.innerText = category.name
      parent.appendChild(child)
    })
}

let drawTable = data =>{
    let parent = document.getElementsByTagName('tbody')[0]
    parent.innerHTML = ""
    data.forEach(sites => {
      let tr = document.createElement('tr')
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

      parent.appendChild(tr)
    })
}


let clickCategory = (id) => {
  fetch(`http://localhost:3000/categories/${id}`)
      .then(res => res.json())
      .then(data => drawTable(data));
}


fetch("http://localhost:3000/categories").then(res => res.json()).then(data => drawCategorias(data));
