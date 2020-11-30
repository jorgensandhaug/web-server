const hode = document.getElementById('hode')
const hale_rett = document.getElementById('hale_rett')
const hale_vri = document.getElementById('hale_vri')
const hale_slutt = document.getElementById('hale_slutt')
const eple = document.getElementById('eple')
const poengsum_nå = document.querySelector('.poengsum_nå')
const table = document.querySelector('table')


// Funksjon som roterer image i canvas
function drawRotated(img, x, y, angle) {
  c.save()
  c.translate(x+scale/2, y+scale/2)
  c.rotate(angle)
  c.translate(-(x+scale/2), -(y+scale/2))
  c.drawImage(img, x, y, scale, scale)
  c.restore()
}
 
// Funksjon som returnerer en vinkel utifra fire koordinater
function compare(x1, y1, x2, y2) {
  if(x1 > x2)return 1.5 * Math.PI
  if(x1 < x2)return Math.PI/2
  if(y1 < y2)return Math.PI
  if(y1 > y2)return 0
}

// Funksjon som returnerer en vinkel utifra seks koordinater
function findAngle3(x1, y1, x2, y2, x3, y3) {
  // fra venstre -> ned
  if(x2 > x3 && y1 > y2) return 0
  // fra venstre -> opp
  if(x2 > x3 && y1 < y2) return 0.5*Math.PI
  // fra opp -> venstre
  if(y2 > y3 && x1 < x2) return 0.5*Math.PI
  // fra opp -> høyre
  if(y2 > y3 && x1 > x2) return Math.PI
  // fra høyre -> ned
  if(x2 < x3 && y1 > y2) return 1.5*Math.PI
  // fra høyre -> opp
  if(x2 < x3 && y1 < y2) return Math.PI
  // fra ned -> venstre
  if(y2 < y3 && x1 < x2) return 0
  // fra ned -> høyre
  if(y2 < y3 && x1 > x2) return 1.5*Math.PI
}

// Klasse for hale
class Tail {
  constructor(angle, image){
    this.x=0;
    this.y=0;
    this.angle = angle
    this.image = image
  }
  // metode som tar i bruk drawRotated funksjonen, egentlig ikke vits å ha med, men orker ikke endre alt.
  draw() {
    drawRotated(this.image, this.x, this.y, this.angle)
  }
}

// starter med en hale, ser ikke noe bra ut med bare hodet
let first = new Tail(Math.PI / 2, hale_slutt)

// slange-class
class Snake {
  // har noen egenskaper
    constructor(xs, ys) {
        this.x = 0
        this.y = 0
        this.xs = xs
        this.ys = ys
        this.tail = [first]
        this.total = 0
        this.angle = Math.PI/2
        this.direction = "Right"
    }
    // metode som tegner hodet
    draw() {
      drawRotated(hode, this.x, this.y, this.angle)
    }

    // tegner alle halene etter hver update for å gjøre det lettere å finne hvilken av delene som er hjørne, og som må roteres
    drawTails() {
      // har egen case for lengde lik 1 siden den første halen følger hodet
      let f = this.tail[0]
      // hvis lengden er en må man ha egen case, for man har ikke 3 deler å sammenligne
      if(this.tail.length == 1){
        f.angle = this.angle
        f.image = hale_slutt
        drawRotated(f.image, f.x, f.y, f.angle)
        this.tail[0] = f
      } 
      // lengde større enn 1 bruker a som siste del å sammenligne
      else {
        let a = this.tail[1]
        // "Nøkkel" if-setningen for å finne ut om halen er et hjørne eller ikke. Om den er et gjørne vil conditionen i if-setningen være false. Bruker den for casen når halen er større enn to og.
        if((f.x == this.x && f.x == a.x) || (f.y == this.y && f.y == a.y)){
          f.image = hale_rett
          f.angle = this.angle
          drawRotated(f.image, f.x, f.y, f.angle)
          this.tail[0] = f
        }
        // halen er en vri
          else {
            f.angle = findAngle3(this.x, this.y, f.x, f.y, a.x, a.y)
            f.image = hale_vri
            drawRotated(f.image, f.x, f.y, f.angle)
            this.tail[0] = f
          }
      }

      // egen case om lengden er 2
      if(this.tail.length == 2){
        let curr = this.tail[1]
        curr.angle = compare(curr.x, curr.y, this.tail[0].x, this.tail[0].y)
        curr.image = hale_slutt
        drawRotated(curr.image, curr.x, curr.y, curr.angle)
        this.tail[1] = curr
      }

      // skjer bare om lengden er større enn 2, og går gjennom alle halene og finner riktig sprite i riktig rotasjon til hver hale-bit, og tegner det inn i canvaset
      if(this.tail.length > 2) {
        for (let i = 1; i < this.tail.length-1; i++) {
          let f = this.tail[i-1]
          let curr = this.tail[i]
          let e = this.tail[i+1]
            if((curr.x == f.x && curr.x == e.x) || (curr.y == f.y && curr.y == e.y)){
              curr.image = hale_rett
              curr.angle = compare(curr.x, curr.y, f.x, f.y)
            } else {
            // halen er en vri
              curr.image = hale_vri
              curr.angle = findAngle3(f.x, f.y, curr.x, curr.y, e.x, e.y)
            }

          drawRotated(curr.image, curr.x, curr.y, curr.angle)
          this.tail[i] = curr
        }
        let hale = this.tail[this.tail.length-1]
        let før = this.tail[this.tail.length-2]
        hale.angle = compare(hale.x, hale.y, før.x, før.y)
      drawRotated(hale_slutt, hale.x, hale.y, hale.angle)
      }
    }
      

    // metoden som kalles hvert intervall i setinterval-funksjonen. Hovedfunksjonen er å inkrementere plasseringen basert på en konstant variabel, som da er like stor som gridlinesa
    update() {
      
      // om den kræsjer med veggen
      if(this.x <0 || this.x>(cWidth-scale) || this.y < 0 || this.y > (cHeight-scale)){
        this.reset()
      }
      
      // om hodet er på samme sted som en del av halen skal den resettes
      for (let i = 0; i < this.tail.length; i++) {
        if(this.x == this.tail[i].x && this.y == this.tail[i].y && this.tail.length > 2) {
          this.reset()
        }
      }

      // Går gjennom halearrayen og flytter hver hale til der halen foran var forrige intervall
      for (let i = this.tail.length-1; i>0;  i--) {
        this.tail[i].x = this.tail[i-1].x
        this.tail[i].y = this.tail[i-1].y
      }

      this.tail[0].x = this.x         
      this.tail[0].y = this.y     
      
      // setter en direksjon for å forhindre at man kan endre retning 180 grader ved å presse to knapper samtidig
      if(this.xs > 0 && this.ys == 0) this.direction = "Right"
      if(this.xs < 0 && this.ys == 0) this.direction = "Left" 
      if(this.ys > 0 && this.xs == 0) this.direction = "Down"
      if(this.ys < 0 && this.xs == 0) this.direction = "Up"

      // flytter hodet med farten
        this.x += this.xs;
        this.y += this.ys;
    }

      // resetter slangen
    reset() {
      if(this.total > 0) newScore(this.total)
        scoreboard()
      this.x = 0, this.y=0, this.xs = scale, this.ys = 0, this.tail = [first], this.total = 0, this.angle = Math.PI / 2, poengsum_nå.innerHTML = `Din poengsum: ${this.total}`
    }

    // tar imot et argument, og endrer farten basert på dette argumentet. Argumentet baserer seg på en eventlistener på pilene i app.js
    changeDirection(direction){
        switch(direction) {
          case "Up":
            if(this.direction != "Down"){
            this.xs=0;
            this.ys=-scale*1;
            this.angle = 0
          }
            break;
          case "Down":
          if(this.direction != "Up"){
            this.xs=0;
            this.ys=scale*1;
            this.angle = Math.PI
          }
            break;
          case "Right":
          if(this.direction != "Left"){
            this.xs=scale*1;
            this.ys=0;
            this.angle = Math.PI/2
          }
            break;
            case "Left":
            if(this.direction != "Right"){
              this.xs=-scale*1;
              this.ys=0;
              this.angle = 1.5*Math.PI
            }
              break;
        }
      }

      // metode som legger til ny hale om hodet befinner seg på samme plass som frukten
      eating(fruit) {
          if(this.x == fruit.x && this.y == fruit.y) {
            fruit.pickNewLocation()
            this.tail.push(new Tail(Math.PI / 2, hale_slutt))
            this.total +=1
            poengsum_nå.innerHTML = `Din poengsum: ${this.total}`
          }
      }
}

// Klasse for frukt som starter med random x og y etter grid, og har en metode som finner ny lokasjon som kalles inn når slangen "spiser" eplet
class Fruit {
    constructor() {
        this.pickNewLocation()
    }

    draw() {
        // c.fillStyle = "red"
        c.drawImage(eple, this.x, this.y, scale, scale)
        // c.fillRect(this.x, this.y, scale, scale)
        // c.fill()
    }

    pickNewLocation() {
        this.x = (Math.floor(Math.random()*cols))*scale
        this.y = (Math.floor(Math.random()*rows))*scale
    }
}


// LOCALSTORAGE-del
// variabel hvor scores lagres, ternary expression som setter scores lik det som er i localstorage, eller om den er tom lik en tom array
let scores = localStorage.getItem("scores") ? JSON.parse(localStorage.getItem("scores")) : [];


// score-classe med egenskaper om en score
class Score {
  constructor(date, score) {
    this.date = date;
    this.score = score;
  }
}


// Funksjon som legger inn ny score i localstorage, gjør date om til norsk dato-format
function newScore(score) {
  let date = new Date().toLocaleString("no-NO")

  scores.push(new Score(date, score))
  localStorage.setItem('scores', JSON.stringify(scores))
}
// funksjon hvor scoresa legges inn, og sorteres etter beste først
function scoreboard() {
  scores.sort((a, b) => b.score - a.score);

  table.innerHTML = "";
  table.innerHTML += `
  <tr>
    <th>Dato</th>
    <th>Poengsum</th>
</tr>`

  for (let i = 0; i < scores.length; i++) {
    if(i == 10)return
      table.innerHTML += `
      <tr>
        <td>${scores[i].date}</td>
        <td>${scores[i].score}</td>
      </tr> 
  `;
  }
  }
