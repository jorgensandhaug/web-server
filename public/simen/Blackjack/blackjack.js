const suits = ["spades", "diamonds", "clubs", "hearts"];
const suitSymbols = '♠︎ ♥︎ ♣︎ ♦︎'.split(' ');
const names = 'A 2 3 4 5 6 7 8 9 10 J Q K'.split(' ');
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

const playersEL = document.querySelector(".player__hands");
const dealerEl = document.querySelector(".dealer");

class Player {
    constructor(name, playerElement) {
        this.name = name;
        this.El = playerElement;
        this.cards = [];
        this.doubleAvailable = true;
        this.standTotal = false;
    }
    showTotal = () => {
        if(!this.standTotal) this.total = this.getTotal();
        this.El.childNodes[1].innerHTML = this.total;
    }
    getTotal = () => {
        let sum = 0;
        let soft = false;
        for (let i = 0; i < this.cards.length; i++) {
            sum += this.cards[i];
            if (this.cards[i] === 1) soft = true;
        }
        if (soft == true) return sum + 10 >= 21 ? sum : `${sum}/${sum+10}`;
        else return sum;
    }
    placeBet = amount => {
        if (amount > this.balance) return;
        else this.bet = amount;
    }
    win = blackjack => {
        // if (blackjack) {
        //     this.balance += this.bet * 2.5;
        //     this.El.childNodes[1].innerHTML = `You won ${this.bet * 2.5}`;
        // } else this.balance += this.bet * 2;
        // this.El.childNodes[1].innerHTML = `You won ${this.bet * 2}`;
        this.El.childNodes[1].innerHTML = `You win`;
    }
    bust = () => {
        this.El.childNodes[1].innerHTML = `${this.total} You Bust`;
        this.removeButtons();
        Game.nextPlayer();
    }
    lose = () => {
        this.El.childNodes[1].innerHTML = "You Lose";
        this.removeButtons();
    }
    drawCard = () => {
        this.El.appendChild(Game.renderCard(Game.deck[0]));
        this.cards.push(Game.deck[0].Value);
        Game.deck.splice(0, 1);
        Game.displayTotals();
        if (this.total > 21) this.bust();
        if (this.total == 21) this.stand();
        if(this.cards.length > 2) this.doubleAvailable = false;
        this.showButtons();
    }
    stand = () => {
        if (typeof (this.getTotal()) == "string") {
            console.log(`${this.getTotal().split("")}`);
            this.total = this.getTotal().split("").length > 4 ? `${this.getTotal().split("").splice(3, 4).join("")}` : `${this.getTotal().split("").splice(2, 3).join("")}`;
            this.total = parseInt(this.total);
            Game.displayTotals();
        }
        this.standTotal = true;
        this.removeButtons();
        Game.nextPlayer();
    }
    double = () => {
        this.drawCard();
        this.bet *= 2;
        this.removeButtons();
        if (this.total < 21) Game.nextPlayer();
    }
    showButtons = () => {
        this.El.childNodes[0].innerHTML = "";
        if (this.getTotal() < 21 || typeof (this.getTotal()) == "string") {
            this.El.childNodes[0].innerHTML += `<button class="hit" id="${this.name}" onclick="Game.hit()">Hit</button>`;
            this.El.childNodes[0].innerHTML += `<button class="stand" id="${this.name}" onclick="Game.stand()">Stand</button>`;
            if (this.doubleAvailable) this.El.childNodes[0].innerHTML += `<button class="double" id="${this.name}" onclick="Game.double()">Double</button>`;
        }
    }
    removeButtons = () => {
        this.El.childNodes[0].innerHTML = "";
    }
}

class Dealer {
    constructor(dealerElement) {
        this.El = dealerElement;
        this.cards = [];
    }
    showTotal = () => {
        this.total = this.getTotal();
        dealerEl.childNodes[1].innerHTML = this.total;
    }
    getTotal = () => {
        let sum = 0;
        let soft = false;
        for (let i = 0; i < this.cards.length; i++) {
            sum += this.cards[i].Value;
            if (this.cards[i].Value === 1) soft = true;
        }
        if (soft == true) return sum + 10 >= 17 ? sum : `${sum}/${sum+10}`;
        else return sum;
    }
    revealSecondCard = () => {
        this.El.childNodes[1].childNodes[0].style.visibility = 'visible';
        this.El.childNodes[1].childNodes[1].style.visibility = 'visible';
        this.El.childNodes[1].childNodes[2].style.visibility = 'visible';
        this.El.childNodes[1].className = "card";
    }
    drawCard = () => {
        this.El.appendChild(Game.renderCard(Game.deck[0]));
        this.cards.push(Game.deck[0]);
        Game.deck.splice(0, 1);
        Game.displayTotals();
    }
}

class Blackjack {
    constructor(amountOfPlayers, amountOfDecks) {
        this.amountOfPlayers = amountOfPlayers;
        this.amountOfDecks = amountOfDecks > 4 ? 4 : amountOfDecks;
        this.players = new Array(this.amountOfPlayers);
        this.currentPlayer = 0;
        this.end = false;
    }
    start = () => {
        this.deck = this.getDeck();
        this.shuffle(this.deck);

        for (let i = 0; i < this.amountOfPlayers; i++) {
            const playerDiv = document.createElement("div");
            playerDiv.className = `player playerID${i}`;
            playersEL.appendChild(playerDiv);
            this.players[i] = new Player(`Player${i}`, playerDiv);

            const buttonDiv = document.createElement("div");
            buttonDiv.className = "buttonDiv";
            this.players[i].El.appendChild(buttonDiv);

            const totalDiv = document.createElement("div");
            totalDiv.className = "total";
            this.players[i].El.appendChild(totalDiv);
        }

        const dealerTotal = document.createElement("div");
        dealerTotal.className = "dealerTotal";
        dealerEl.appendChild(dealerTotal);

        const dealerDiv = document.createElement("div");
        dealerDiv.className = `dealerCards`;
        dealerEl.appendChild(dealerDiv);
        this.dealer = new Dealer(dealerDiv);
    }
    deal = () => {
        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < this.players.length; i++) {
                this.players[i].El.appendChild(this.renderCard(this.deck[0]));
                this.players[i].cards.push(this.deck[0].Value);
                this.deck.splice(0, 1);
            }
            if (j == 1) this.dealer.El.appendChild(this.renderCard(this.deck[0], true));
            else this.dealer.El.appendChild(this.renderCard(this.deck[0]));
            this.dealer.cards.push(this.deck[0]);
            this.deck.splice(0, 1);
        }
        this.dealer.El.childNodes[1].childNodes[0].style.visibility = 'hidden';
        this.dealer.El.childNodes[1].childNodes[1].style.visibility = 'hidden';
        this.dealer.El.childNodes[1].childNodes[2].style.visibility = 'hidden';
    }
    hit = () => {
        if (this.players[this.currentPlayer]) this.players[this.currentPlayer].drawCard();
    }
    stand = () => this.players[this.currentPlayer].stand();
    double = () => this.players[this.currentPlayer].double();
    nextPlayer = () => {
        this.currentPlayer++;
        if (this.players[this.currentPlayer]) Game.displayButtons()
        else this.endGame();
    }
    endGame = () => {
        this.end = true;
        this.dealer.revealSecondCard();

        console.log("Dealer: " + this.dealer.getTotal())
        console.log("Player 1: " + this.players[0].getTotal())

        while (this.dealer.getTotal() < 17 || typeof (this.dealer.getTotal()) == "string") {
            this.dealer.drawCard();
        }
        for (let i = 0; i < this.players.length; i++) {
            if (this.dealer.getTotal() > 21 && this.players[i].getTotal() < 21) {
                this.players[i].win();
            } else if (this.players[i].getTotal() < 21 && this.players[i].getTotal() > this.dealer.getTotal()) {
                this.players[i].win();
            } else this.players[i].lose();
        }

        setTimeout(() => {
            location.reload();
        }, 2000);
    }
    displayTotals = () => {
        for (let i = 0; i < this.players.length; i++) this.players[i].showTotal();
        if (this.end) this.dealer.showTotal();
    }
    displayButtons = () => {
        this.players[this.currentPlayer].showButtons();
    }
    renderCard = (cardInfo, hidden) => {
        const card = document.createElement("div");
        const valueTopRight = document.createElement("div");
        const suit = document.createElement("div");
        const valueBottomLeft = document.createElement("div");
        card.className = hidden ? "cardHidden" : "card";
        valueTopRight.className = "valueTopRight";
        suit.className = `suit ${cardInfo.SuitColor}`;
        valueBottomLeft.className = "valueBottomLeft";

        valueTopRight.innerHTML = cardInfo.Name;
        suit.innerHTML = cardInfo.SuitSymbol;
        valueBottomLeft.innerHTML = cardInfo.Name;
        card.appendChild(valueTopRight);
        card.appendChild(suit);
        card.appendChild(valueBottomLeft);

        return card;
    }
    shuffle = deck => {
        for (let i = 0; i < 10000; i++) {
            let location1 = Math.floor(Math.random() * deck.length);
            let location2 = Math.floor(Math.random() * deck.length);
            let tmp = deck[location1];

            deck[location1] = deck[location2];
            deck[location2] = tmp;
        }
    }
    getColor = symbol => {
        if (symbol == '♠︎' || symbol == '♣︎') return 'black';
        else return 'red';
    }
    getDeck = () => {
        const deck = new Array();

        for (let k = 0; k < this.amountOfDecks; k++) {
            for (let i = 0; i < suits.length; i++) {
                for (let j = 0; j < names.length; j++) {
                    const card = {
                        Name: names[j],
                        Suit: suits[i],
                        Value: values[j],
                        SuitSymbol: suitSymbols[i],
                        SuitColor: this.getColor(suitSymbols[i])
                    };
                    deck.push(card);
                }
            }
        }
        return deck;
    }
}
const Game = new Blackjack(1, 4); //Amount of players || Amount of decks in use
Game.start();
Game.deal();
Game.displayTotals();
Game.displayButtons();