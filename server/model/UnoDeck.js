const UnoCard = require("./UnoCard");

class UnoDeck {
    constructor(deckNumber) {
        this.deck = [
            new UnoCard(0, "R", deckNumber, 1),
            new UnoCard(0, "Y", deckNumber, 1),
            new UnoCard(0, "G", deckNumber, 1),
            new UnoCard(0, "B", deckNumber, 1),
            new UnoCard(1, "R", deckNumber, 1),
            new UnoCard(1, "Y", deckNumber, 1),
            new UnoCard(1, "G", deckNumber, 1),
            new UnoCard(1, "B", deckNumber, 1),
            new UnoCard(1, "R", deckNumber, 2),
            new UnoCard(1, "Y", deckNumber, 2),
            new UnoCard(1, "G", deckNumber, 2),
            new UnoCard(1, "B", deckNumber, 2),
            new UnoCard(2, "R", deckNumber, 1),
            new UnoCard(2, "Y", deckNumber, 1),
            new UnoCard(2, "G", deckNumber, 1),
            new UnoCard(2, "B", deckNumber, 1),
            new UnoCard(2, "R", deckNumber, 2),
            new UnoCard(2, "Y", deckNumber, 2),
            new UnoCard(2, "G", deckNumber, 2),
            new UnoCard(2, "B", deckNumber, 2),
            new UnoCard(3, "R", deckNumber, 1),
            new UnoCard(3, "Y", deckNumber, 1),
            new UnoCard(3, "G", deckNumber, 1),
            new UnoCard(3, "B", deckNumber, 1),
            new UnoCard(3, "R", deckNumber, 2),
            new UnoCard(3, "Y", deckNumber, 2),
            new UnoCard(3, "G", deckNumber, 2),
            new UnoCard(3, "B", deckNumber, 2),
            new UnoCard(4, "R", deckNumber, 1),
            new UnoCard(4, "Y", deckNumber, 1),
            new UnoCard(4, "G", deckNumber, 1),
            new UnoCard(4, "B", deckNumber, 1),
            new UnoCard(4, "R", deckNumber, 2),
            new UnoCard(4, "Y", deckNumber, 2),
            new UnoCard(4, "G", deckNumber, 2),
            new UnoCard(4, "B", deckNumber, 2),
            new UnoCard(5, "R", deckNumber, 1),
            new UnoCard(5, "Y", deckNumber, 1),
            new UnoCard(5, "G", deckNumber, 1),
            new UnoCard(5, "B", deckNumber, 1),
            new UnoCard(5, "R", deckNumber, 2),
            new UnoCard(5, "Y", deckNumber, 2),
            new UnoCard(5, "G", deckNumber, 2),
            new UnoCard(5, "B", deckNumber, 2),
            new UnoCard(6, "R", deckNumber, 1),
            new UnoCard(6, "Y", deckNumber, 1),
            new UnoCard(6, "G", deckNumber, 1),
            new UnoCard(6, "B", deckNumber, 1),
            new UnoCard(6, "R", deckNumber, 2),
            new UnoCard(6, "Y", deckNumber, 2),
            new UnoCard(6, "G", deckNumber, 2),
            new UnoCard(6, "B", deckNumber, 2),
            new UnoCard(7, "R", deckNumber, 1),
            new UnoCard(7, "Y", deckNumber, 1),
            new UnoCard(7, "G", deckNumber, 1),
            new UnoCard(7, "B", deckNumber, 1),
            new UnoCard(7, "R", deckNumber, 2),
            new UnoCard(7, "Y", deckNumber, 2),
            new UnoCard(7, "G", deckNumber, 2),
            new UnoCard(7, "B", deckNumber, 2),
            new UnoCard(8, "R", deckNumber, 1),
            new UnoCard(8, "Y", deckNumber, 1),
            new UnoCard(8, "G", deckNumber, 1),
            new UnoCard(8, "B", deckNumber, 1),
            new UnoCard(8, "R", deckNumber, 2),
            new UnoCard(8, "Y", deckNumber, 2),
            new UnoCard(8, "G", deckNumber, 2),
            new UnoCard(8, "B", deckNumber, 2),
            new UnoCard(9, "R", deckNumber, 1),
            new UnoCard(9, "Y", deckNumber, 1),
            new UnoCard(9, "G", deckNumber, 1),
            new UnoCard(9, "B", deckNumber, 1),
            new UnoCard(9, "R", deckNumber, 2),
            new UnoCard(9, "Y", deckNumber, 2),
            new UnoCard(9, "G", deckNumber, 2),
            new UnoCard(9, "B", deckNumber, 2),
            new UnoCard("O", "R", deckNumber, 1),
            new UnoCard("O", "Y", deckNumber, 1),
            new UnoCard("O", "G", deckNumber, 1),
            new UnoCard("O", "B", deckNumber, 1),
            new UnoCard("O", "R", deckNumber, 2),
            new UnoCard("O", "Y", deckNumber, 2),
            new UnoCard("O", "G", deckNumber, 2),
            new UnoCard("O", "B", deckNumber, 2),
            new UnoCard("+", "R", deckNumber, 1),
            new UnoCard("+", "Y", deckNumber, 1),
            new UnoCard("+", "G", deckNumber, 1),
            new UnoCard("+", "B", deckNumber, 1),
            new UnoCard("+", "R", deckNumber, 2),
            new UnoCard("+", "Y", deckNumber, 2),
            new UnoCard("+", "G", deckNumber, 2),
            new UnoCard("+", "B", deckNumber, 2),
            new UnoCard("R", "R", deckNumber, 1),
            new UnoCard("R", "Y", deckNumber, 1),
            new UnoCard("R", "G", deckNumber, 1),
            new UnoCard("R", "B", deckNumber, 1),
            new UnoCard("R", "R", deckNumber, 2),
            new UnoCard("R", "Y", deckNumber, 2),
            new UnoCard("R", "G", deckNumber, 2),
            new UnoCard("R", "B", deckNumber, 2),
            new UnoCard("W", "W", deckNumber, 1),
            new UnoCard("W", "W", deckNumber, 2),
            new UnoCard("W", "W", deckNumber, 3),
            new UnoCard("W", "W", deckNumber, 4),
            new UnoCard("S", "W", deckNumber, 1),
            new UnoCard("S", "W", deckNumber, 2),
            new UnoCard("S", "W", deckNumber, 3),
            new UnoCard("S", "W", deckNumber, 4),
        ]
    };

    draw(){
        return this.deck.pop();
    }

    deckShuffle() {
        let currentIndex = this.deck.length;
        let temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = this.deck[currentIndex];
            this.deck[currentIndex] = this.deck[randomIndex];
            this.deck[randomIndex] = temporaryValue;
        }
    }
}

module.exports = UnoDeck
