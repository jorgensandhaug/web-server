const form = document.getElementById('login-form')
const login_text = document.getElementById('login-text')
const errors = document.querySelector(".errors")
const login_div = document.getElementById('login')
const scoreBoardDiv = document.getElementById('scoreBoardDiv')
const sb = document.getElementById("scoreBoard")

const baseURL = "https://nettside-api-v2.herokuapp.com"

// Tre endpoints: 
// Bruker js fetch for å snakke med API-et

// "/ratings" har method GET, og gir ut alle users med sine ratings

function populate_scoreboard() {
    fetch(baseURL + '/highscore')
    .then(res => res.json())
    .then(data => {
    
    
    sb.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
      sb.innerHTML += `
      <tr>
        <td><b>${i+1} ${data[i].name}</b></td><td>${data[i].score}</td>
      </tr>`
    }
    })}

  


// "/new_user" har method POST, og brukes for å legge til ny bruker
function new_user(currNavn) {
  fetch(baseURL + "/new_user", {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: currNavn})
  }).then(res=>res.text())
    .then(res => console.log(res));
}

// "/new_rating" har method POST, og brukes for å legge til ny rating. Trenger id-en til brukeren for å legge til score til brukeren, så må querye to ganger
function new_rating(curr_name, curr_score) {
  fetch(baseURL + "/new_rating", {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: curr_name, score: curr_score})
  }).then(res=>res.text())
    .then(res => console.log(res));
}


let name = ""


form.addEventListener('submit', e=>{
  e.preventDefault()
  name = login_text.value

  if (name.length>20){
      errors.style = "display: block"
      errors.innerHTML = "<li>Ingen har så langt navn</li>"
      login_text.value = ""
      return false
  }
  if (name.length == 0){
    errors.style = "display: block"
    errors.innerHTML = "<li>Kan ikke være tomt gitt</li>"
    login_text.value = ""
    return false
}
login_div.parentElement.removeChild(login_div)
scoreEl.style = "display: block;"
scoreBoardDiv.style = "display: block;"
  
  fetch(baseURL + '/ratings')
    .then(res => res.json())
    .then(data => {
      let name_available = true
      scores = data.data
      scores.map(item=>{
        if(item.name == name){
          name_available = false
        }
      })
  
    if(name_available){
      new_user(name)
    }
      populate_scoreboard()
      animate()
})})