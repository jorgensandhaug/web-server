const suits = ["spades", "diamonds", "clubs", "hearts"];
const suitSymbols = '♠︎ ♥︎ ♣︎ ♦︎'.split(' ');
const names = 'A 2 3 4 5 6 7 8 9 10 J Q K'.split(' ');
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

const AMOUNT_OF_PLAYERS = 4;
const AMOUNT_OF_DECKS = 4;

const playersEL = document.querySelector(".player__hands");
const dealerEl = document.querySelector(".dealer");

const Game = new Blackjack(AMOUNT_OF_PLAYERS, AMOUNT_OF_DECKS); //Amount of players || Amount of decks in use

Game.start();
Game.deal();
Game.displayTotals();
Game.displayButtons();

for (let i = 0; i < AMOUNT_OF_PLAYERS; i++) {
    document.getElementById(`sitdown${i+1}`).addEventListener("click", () => {
        Game.players[i] = new Player(`Player${i+1}`, document.getElementById(`player${i+1}`));
    });
}