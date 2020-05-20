class UnoPlayer {
    constructor(name) {
        this.name = name
        this.hand = []
        this.unoable = false
        this.calledUno = false
        this.score = 0
    }

    addCard(card) {
        this.hand.push(card)
    }

    resetPlayer() {
        this.hand = []
        this.unoable = false
        this.calledUno = false
    }

}

module.exports = UnoPlayer