const canvas = document.getElementById("canvas"); //Henter canvas
const ctx = canvas.getContext("2d"); //Henter canvas.context
const scale = 25; // Hvor store cellene er
//Henter HTML Elementer
const mineCountEl = document.getElementById("mineCount");
const timerEl = document.getElementById("timer");
const buttonEl = document.getElementById("Smiley");
const headerEl = document.getElementById("header");
const taskbarEl = document.getElementById("taskbar");
const settingsEl = document.getElementById("settings");
const settingsBoxEl = document.getElementById("settingsBox");
const newGameButtonEl = document.getElementById("NewGameButton");
//Definerer variabler (Endres i setup)
let mines;
let mineCount;
let time;
let board;
let timer;
let mouseDown;

//Henter images
const imgs = []
for (let i = 0; i < 9; i++) {
    imgs[i] = document.getElementById(String(i))
}
const imgOpen = document.getElementById("open");
const imgMine = document.getElementById("mine");
const imgFlag = document.getElementById("flag");

//Sjekker om man trykker på startknappen og kjører setup
document.getElementById("button").addEventListener("click", setup);

newGameButtonEl.addEventListener("click", setup)
settingsEl.addEventListener("click", openSettings);
//Kjører setup første gang man kjører koden
setup();