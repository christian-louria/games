class UnoPlayer {
    constructor(name) {
        this.name = name
        this.hand = []
        this.unoable = false
        this.calledUno = false
    }

    addCard(card) {
        this.hand.push(card)
    }

}

module.exports = UnoPlayer