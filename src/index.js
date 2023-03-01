let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  document.querySelector(".add-toy-form").addEventListener("submit", (event) => {
    event.preventDefault()
    let formData ={
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    }
    renderToys(formData)
    postToys(formData)
  })
  getReq()
});

function renderToys(toys){
  let card = document.createElement("li")
  card.className = "card"
  card.innerHTML = `
  <img src="${toys.image}" class="toy-avatar">
  <div class="content">
    <h4>${toys.name}
    <p>
      <span class="likes">${toys.likes}</span> Likes
    </p>
  </div>
    <button class="like-btn" id="${toys.id}"> Like </button>
  </div>
  `
  card.querySelector('.like-btn').addEventListener("click", () => {
    toys.likes+= 1
    card.querySelector("span").textContent = toys.likes
    updateLikes(toys)
  })
  document.querySelector("#toy-collection").appendChild(card)
}


function getReq(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(data => data.forEach(toy => renderToys(toy)))
}

function postToys(formData){
  fetch("http://localhost:3000/toys",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}

function updateLikes(formData){
  fetch(`http://localhost:3000/toys/${formData.id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}
