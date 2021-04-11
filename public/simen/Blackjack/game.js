const suits = ["spades", "diamonds", "clubs", "hearts"];
const suitSymbols = '♠︎ ♥︎ ♣︎ ♦︎'.split(' ');
const names = 'A 2 3 4 5 6 7 8 9 10 J Q K'.split(' ');
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

const playersEL = document.querySelector(".player__hands");
const dealerEl = document.querySelector(".dealer");

const Game = new Blackjack(1, 4); //Amount of players || Amount of decks in use

Game.start();
Game.deal();
Game.displayTotals();
Game.displayButtons();