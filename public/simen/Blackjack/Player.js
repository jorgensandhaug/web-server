class Player {
    constructor(name, playerElement) {
        this.name = name;
        this.El = playerElement;
        this.cards = [];
        this.doubleAvailable = true;
        this.standTotal = false;
        this.soft = false;
        this.blackjack = false;
    }
    showTotal = () => {
        if (!this.standTotal) this.total = this.getTotal();
        this.El.childNodes[1].innerHTML = this.total;
    }
    getTotal = () => {
        let sum = 0;
        this.soft = false;
        for (let i = 0; i < this.cards.length; i++) {
            sum += this.cards[i];
            if (this.cards[i] === 1) this.soft = true;
        }
        if (this.soft == true) return sum + 10 >= 21 ? sum : `${sum}/${sum+10}`;
        else return sum;
    }
    placeBet = amount => {
        if (amount > this.balance) return;
        else this.bet = amount;
    }
    win = () => {
        if (this.blackjack) {
            //this.balance += this.bet * 2.5;
            //this.El.childNodes[1].innerHTML = `You won ${this.bet * 2.5}`;
            this.El.childNodes[1].innerHTML = `${this.total} Blackjack`;
        } else {
            //this.balance += this.bet * 2;
            //this.El.childNodes[1].innerHTML = `You won ${this.bet * 2}`;
            this.El.childNodes[1].innerHTML = `${this.total} You win`;
        }
    }
    bust = () => {
        this.El.childNodes[1].innerHTML = `${this.total} You Bust`;
        this.removeButtons();
        Game.nextPlayer();
    }
    lose = () => {
        this.El.childNodes[1].innerHTML = `${this.total} You Lose`;
        this.removeButtons();
    }
    push = () => {
        this.El.childNodes[1].innerHTML = `${this.total} You Push`
    }
    drawCard = () => {
        this.El.appendChild(Game.renderCard(Game.deck[0]));
        this.cards.push(Game.deck[0].Value);
        Game.deck.splice(0, 1);
        Game.displayTotals();
        if (this.total > 21) this.bust();
        if (this.total == 21) this.stand();
        if (this.cards.length > 2) this.doubleAvailable = false;
        if (this.soft) {
            for (let i = 0; i < this.cards.length; i++) {
                if (this.cards[i] == 10) {
                    this.blackjack = true;
                    this.win();
                    return 21;
                }
            }
        }
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