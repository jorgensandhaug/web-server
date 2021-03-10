const canvas = document.createElement("CANVAS");
const c = canvas.getContext("2d");
const scoreP = document.getElementById("score");
const div = document.querySelector("div");
const button = document.querySelector("button");
let d = new Date();
class ScoreObj {
  constructor(date, score) {
    this.date = date;
    this.score = score;
  }
}

let itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
localStorage.setItem("items", JSON.stringify(itemsArray));
div.innerHTML = `<h2>HIGHSCORES</h2>`;
for (let i = 0; i < itemsArray.length; i++) {
  if (i < 10) {
    div.innerHTML += `<p>${itemsArray[i].date} - <b>${itemsArray[i].score}</b></p>
  `;
  }
}
let scoreboard = score => {
  if (score != 0) {
    itemsArray.push(
      new ScoreObj(
        `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`,
        score
      )
    );
    itemsArray.sort((a, b) => b.score - a.score);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    div.innerHTML = "";
    div.innerHTML = `<h2>HIGHSCORES</h2>`;
    for (let i = 0; i < itemsArray.length; i++) {
      if (i < 10) {
        div.innerHTML += `<p>${itemsArray[i].date} - <b>${itemsArray[i].score}</b> </p>
    `;
      }
    }
  }
};

// window.addEventListener("keydown", () => {
//   if (e.ctrlKey && e.key == "e") {
//     window.localStorage.clear();
//     itemsArray = [];
//     div.innerHTML = "";
//   }
// });
// button.addEventListener('click', function() {
//   window.localStorage.clear()
//   itemsArray = []
//   div.innerHTML = ""
//   }
// )

window.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key == "b") {
    score++;
    tailArr.push(new Tail());
  }
});

document.querySelector("body").appendChild(canvas);
canvas.width = 1000;
canvas.height = 600;

let scale = 30;
let rows = canvas.height / scale;
let cols = canvas.width / scale;
let tailArr, player, apple;
let dir = "r";
let score = 0;
let speed = 15;
let colorArr = [
  "#001f3f",
  "#2ECC40",
  "#01FF70",
  "#FFDC00",
  "#FF851B",
  "#FF4136",
  "#85144b",
  "#F012BE",
  "#B10DC9"
];
let newColor = () => colorArr[Math.floor(Math.random() * colorArr.length)];

function newApple() {
  apple = {
    x: Math.floor(Math.random() * (cols - 1) + 1) * scale,
    y: Math.floor(Math.random() * (rows - 1) + 1) * scale,

    draw: function() {
      c.beginPath;
      c.save();
      c.fillStyle = "red";
      c.fillRect(this.x, this.y, scale, scale);
      c.restore();
    }
  };
}

newApple();

player = {
  x: 5 * scale,
  y: 5 * scale,
  color: "green",

  draw: function() {
    c.beginPath();
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, scale, scale);
  },
  update: function() {
    switch (dir) {
      case "r":
        this.x += scale;
        tailArr.forEach((item, i) => {

          if(i!=0 && this.x == item.x && this.y == item.y) this.x-=scale
        })
        break;
      case "l":
        this.x -= scale;
        tailArr.forEach((item, i) => {

          if(i!=0 && this.x == item.x && this.y == item.y) this.x+=scale
        })
        break;
      case "d":
        this.y += scale;
        tailArr.forEach((item, i) => {

          if(i!=0 && this.x == item.x && this.y == item.y) this.y-=scale
        })
        break;
      case "u":
        this.y -= scale;
        tailArr.forEach((item, i) => {

          if(i!=0 && this.x == item.x && this.y == item.y) this.y+=scale
        })
        break;
    }
    this.draw();
  }
};

tailArr = [player];

setInterval(function() {
  c.beginPath();
  c.save();
  c.fillStyle = "lightblue";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
  c.closePath();

  c.beginPath();
  c.save();

  for (var i = 0; i < cols; i++) {
    c.strokeStyle = "rgba(192, 192, 192, 0.7)";
    c.moveTo(i * scale, 0);
    c.lineTo(i * scale, canvas.height);
  }
  for (var i = 0; i < rows; i++) {
    c.strokeStyle = "rgba(192, 192, 192, 0.7)";
    c.moveTo(0, i * scale);
    c.lineTo(canvas.width, i * scale);
  }
  c.stroke();
  c.closePath();
  c.restore();

  if (
    player.x < 0 ||
    player.x + scale > canvas.width ||
    player.y < 0 ||
    player.y + scale > canvas.height
  ) {
    restart();
  }

  if (player.x == apple.x && player.y == apple.y) {
    newApple();
    score++;
    tailArr.push(new Tail());
  }

  for (var i = tailArr.length - 1; i > 0; i--) {
    tailArr[i].x = tailArr[i - 1].x;
    tailArr[i].y = tailArr[i - 1].y;

    tailArr[i].draw();
  }

  apple.draw();
  player.update();

  for (var i = 1; i < tailArr.length; i++) {
    if (player.x == tailArr[i].x && player.y == tailArr[i].y) {
      restart();
    }
  }
  newTail = false;
  c.beginPath();
  c.font = "20px Georgia";
  c.fillText(score, 50, canvas.height - 50);

  speed += 5;
}, 1000 / speed);

function restart() {
  player.x = 5 * scale;
  player.y = 5 * scale;
  newApple();
  scoreboard(score);
  score = 0;
  tailArr = [player];
  dir = "r";
}

window.addEventListener("keydown", function(e) {
  switch (e.keyCode) {
    case 37:
      if (dir != "r") dir = "l";
      break;
    case 38:
      if (dir != "d") dir = "u";
      break;
    case 39:
      if (dir != "l") dir = "r";
      break;
    case 40:
      if (dir != "u") dir = "d";
      break;
  }
});

function Tail() {
  this.color = newColor();
  this.draw = function() {
    c.beginPath();
    c.save();
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, scale, scale);
    c.restore();
  };
}
