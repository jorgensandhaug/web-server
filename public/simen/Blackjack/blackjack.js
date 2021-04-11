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