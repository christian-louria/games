class UnoCard {
    constructor(number, color, deck, dup) {
        this.cardID = deck + color + number + dup
        this.number = number
        this.color = color
        this.dup = dup
    };
}

module.exports = UnoCard
