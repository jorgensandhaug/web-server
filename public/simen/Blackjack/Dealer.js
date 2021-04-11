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
