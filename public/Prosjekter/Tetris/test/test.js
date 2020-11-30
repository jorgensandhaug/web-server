const URL1 = "https://nettside-api-v2.herokuapp.com"


async function post_rating(name,score) {
    fetch_obj = {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, score: score})
        }

    const response = await fetch(URL1 + "/new_rating", fetch_obj)
    const text = await response.text()
    console.log(text)
}

async function new_user(name) {
  fetch_obj = {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name})
      }

  const response = await fetch(URL1 + "/new_user", fetch_obj)
  const text = await response.text()
  console.log(text)
}

fetch(URL1 + '/ratings').then(res => res.json()).then(data => console.log(data))

// new_user("Jørgen").catch(err => console.log(err))
// post_rating("TEST123", 4000).catch(err=>console.log(err))