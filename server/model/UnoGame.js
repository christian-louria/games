const UnoDeck = require('./UnoDeck');
const UnoPlayer = require("./UnoPlayer");

class UnoGame {
    constructor(obj) {
        if (typeof obj === "string") {
            this.name = obj
            this.host = null
            this.turn = null
            this.number = null
            this.players = []
            this.gameView = 0
            this.turnNumber = null
            this.stackTwos = null;
            this.winOnWild = null;
            this.infiniteDraw = null;

            this.someoneIsUnoable = false
            this.youGotUnoed = false
            this.gotUnoed = ''
            this.winner = null;
            this.pickingColor = false
            this.forceUnoDraw = 0;
            this.forceDraw = 0;
            this.forcing = false;
            this.deckNumber = 1
            this.rotation = 1
            this.deck = new UnoDeck(0)
            this.topCard = null
        } else {
            this.infiniteDraw = obj.infiniteDraw;
            this.stackTwos = obj.stackTwos;
            this.winOnWild = obj.winOnWild;
            this.name = obj.name
            this.gameView = obj.gameView
            this.host = obj.host
            this.turn = obj.turn
            this.players = obj.players

            this.someoneIsUnoable = obj.someoneIsUnoable
            this.forceUnoDraw = obj.forceUnoDraw;
            this.youGotUnoed = obj.youGotUnoed
            this.gotUnoed = obj.gotUnoed
            this.winner = obj.winner;
            this.pickingColor = obj.pickingColor;
            this.forceDraw = obj.forceDraw;
            this.forcing = obj.forcing;
            this.turnNumber = obj.turnNumber
            this.deckNumber = 1
            this.rotation = obj.rotation
            this.deck = obj.deck
            this.topCard = obj.topCard
        }
    };

    sortUnoCards(data) {
        let playerName = data['playerName'];

        let playerHand;
        let player;
        let newHand = []
        for (let i = 0; i < this.players.length; i++){
            if (this.players[i]['name'] === playerName) {
                player = this.players[i]
                playerHand = this.players[i]['hand'];
            }
        }

        newHand.push(playerHand[0])
        for (let i = 1; i < playerHand.length; i++) {
            for (let j = 0; j < newHand.length; j++){
                if (this.compareCards(playerHand[i], newHand[j]) <= 0 ) {
                    newHand.splice(j, 0, playerHand[i])
                    break;
                } else if (j === newHand.length - 1) {
                    newHand.push(playerHand[i])
                    break;
                }
            }

        }
        player['hand'] = newHand
    }

    attackUnoCall() {
        if (this.winner === null) {
            for (let i = 0; i < this.players.length; i++) {
                if (this.players[i]['unoable'] && !this.players[i]['calledUno']) {
                    this.players[i]['unoable'] = false;
                    this.gotUnoed = this.players[i]['name']
                    this.turn = this.gotUnoed
                    this.youGotUnoed = true
                    this.forceUnoDraw = 4;
                    this.someoneIsUnoable = false;
                    return true
                }
            }
        }
    }

    selfUno(data) {
        let playerName = data['playerName'];

        let player;
        for (let i = 0; i < this.players.length; i++){
            if (this.players[i]['name'] === playerName) {
                player = this.players[i]
            }
        }
        if (player['hand'].length === 1) {
            this.someoneIsUnoable = false;
            player['calledUno'] = true
        }

    }

    addPlayer(playerName) {
        if (this.gameView !== 0 )
            return
        if (!this.players.includes(playerName))
            this.players.push(playerName);
    }

    canBeUnoed(player) {
        this.someoneIsUnoable = true;
        setTimeout(function(){

            player['unoable'] = true;
            }, 2000);
    }

    drawCard(data) {
        let playerName = data['playerName'];

        let playerHand;
        let player;
        for (let i = 0; i < this.players.length; i++){
            if (this.players[i]['name'] === playerName) {
                player = this.players[i]
                playerHand = this.players[i]['hand'];
            }
        }

        if (!this.infiniteDraw && this.forceDraw === 0) {
            for (let i = 0; i < playerHand.length; i++) {
                if (playerHand[i]['color'] === this.topCard['color'] ||
                    playerHand[i]['number'] === this.topCard['number'] ||
                    playerHand[i]['color'] === "W"
                ) {
                    return;
                }
            }
        }

        if (player['hand'].length === 1) {
            player['unoable'] = false
            player['calledUno'] = false
            this.someoneIsUnoable = false;

        }

        if (this.forceUnoDraw !== 0) {
            this.forceUnoDraw--;
        } else if (this.forceDraw !== 0) {
            this.forceDraw--;
            this.forcing = true;
        }

        player.addCard(this.deck.draw());
        if (this.deck['deck'].length === 0) {
            this.reshuffle()
        }

        if (this.forceDraw === 0 && this.forcing) {
            this.forcing = false;
            this.nextTurn()
        }
        if (this.forceUnoDraw === 0) {
            this.youGotUnoed = false;
            this.turn = this.players[this.turnNumber]['name'];
            this.gotUnoed = '';
        }
    }

    compareCards(card, compare) {
        if (card['color'] === compare['color']) {
            if (!isNaN(parseInt(card['number'])) && !isNaN(parseInt(compare['number']))){
                return card['number'] - compare['number']
            }
            if (card['number'] === compare['number']) {
                return 0
            }
            if (!isNaN(parseInt(card['number']) && isNaN(parseInt(compare['number'])))) {
                return 1
            }
            if (card['number'] === "O") {
                return -1
            } else if (compare['number'] === "O") {
                return 1
            } else if (card['number'] === "R") {
                return -1
            } else if (compare['number'] === "R") {
                return 1
            } else if (card['number'] === "+") {
                return -1
            } else if (compare['number'] === "+") {
                return 1
            }


        }
        if (card['color'] === 'R') {
            return -1
        } else if (compare['color'] === 'R') {
            return 1
        } else if (card['color'] === 'Y') {
            return -1
        } else if (compare['color'] === 'Y') {
            return 1
        } else if (card['color'] === 'B') {
            return -1
        } else if (compare['color'] === 'B') {
            return 1
        } else if (card['color'] === 'G') {
            return -1
        } else if (compare['color'] === 'G') {
            return 1
        }


    }

    playCard(data) {
        if (this.pickingColor) {
            return 0;
        }
        if (this.youGotUnoed) {
            return 0;
        }
        const cardID = data['cardID'];
        let playerName = data['playerName'];

        let playerHand;
        let player;
        for (let i = 0; i < this.players.length; i++){
            if (this.players[i]['name'] === playerName) {
                player = this.players[i]
                playerHand = this.players[i]['hand'];
            }
        }
        for (let i = 0; i < playerHand.length; i++) {
            if (playerHand[i]['cardID'] === cardID) {
                let cardPlayed = playerHand[i]
                if (this.forcing) {
                    return false;
                }
                if (this.forceDraw !== 0 && this.topCard['number'] === "S") {
                    return false;
                }
                if (this.forceDraw !== 0 && cardPlayed['number'] !== "+") {
                    return false;
                }
                if (this.forceDraw !== 0 && !this.stackTwos) {
                    return false;
                }
                if (cardPlayed['number'] === "W") {
                    if (playerHand.length === 1 && !this.winOnWild) {
                        return false;
                    }
                    this.topCard = cardPlayed;
                    this.pickingColor = true;
                    playerHand.splice(i, 1);

                    this.checkWin()
                    if (playerHand.length === 1) {
                        this.canBeUnoed(player)
                        return true;
                    }
                    return true;
                } else if (cardPlayed['number'] === "S") {
                    this.forceDraw += 4;
                    this.topCard = cardPlayed;
                    this.pickingColor = true;
                    playerHand.splice(i, 1);
                    this.checkWin()
                    if (playerHand.length === 1) {
                        this.canBeUnoed(player)
                        return true;
                    }
                    return true;
                } else if (cardPlayed['color'] === this.topCard['color'] ||
                    cardPlayed['number'] === this.topCard['number']) {
                    this.topCard = cardPlayed;
                    playerHand.splice(i, 1);

                    if (cardPlayed['number'] === "R") {
                        this.rotation = this.rotation * -1
                        this.nextTurn()
                    } else if (cardPlayed['number'] === "O") {
                        this.nextTurn()
                        this.nextTurn()
                    } else if (cardPlayed['number'] === "+") {
                        this.forceDraw += 2;
                        this.nextTurn()
                    } else {
                        this.nextTurn()
                    }

                    this.checkWin()

                    if (playerHand.length === 1) {
                        this.canBeUnoed(player)
                        return true;
                    }
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    checkWin() {
        for (let i = 0; i < this.players.length; i++){
            if (this.players[i]['hand'].length === 0) {
                this.turn = null;
                this.winner = this.players[i]['name'];
                this.forceDraw = 0;

                this.calcScores()
            }
        }
    }

    calcScore(playerNumber) {
        let playerScore = this.players[playerNumber]['score']
        let player = this.players[playerNumber];
        for (let j = 0; j < player['hand'].length; j++){
            if (!isNaN(player['hand'][j]['number'])) {
                playerScore += player['hand'][j]['number']
            } else if (player['hand'][j]['color'] === 'W') {
                playerScore += 50
            } else {
                playerScore += 20
            }
        }
        return playerScore
    }

    calcScores() {
        for (let i = 0; i < this.players.length; i++){
            this.players[i]['score'] = this.calcScore(i)
        }
    }

    pickColor(data) {
        this.pickingColor = false;
        this.topCard["color"] = data["color"];
        this.nextTurn();
    }

    nextTurn() {
        this.turnNumber += this.rotation;

        if (this.turnNumber === this.players.length && this.rotation === 1){
            this.turnNumber = 0;
        } else if (this.turnNumber === - 1 && this.rotation === -1) {
            this.turnNumber = this.players.length - 1;
        }

        this.turn = this.players[this.turnNumber]['name'];
    }

    reshuffle() {
        this.deck = new UnoDeck(this.deckNumber++);
        this.deck.deckShuffle();
    }

    startGame(stackTwos, winOnWild, infiniteDraw) {
        this.stackTwos = stackTwos;
        this.winOnWild = winOnWild;
        this.infiniteDraw = infiniteDraw;
        this.gameView = 1
        this.deck.deckShuffle()
        for (let i = 0; i < this.players.length; i++) {
            this.players[i] = new UnoPlayer(this.players[i]);
            for (let j = 0; j < 7; j++){
                this.players[i].addCard(this.deck.draw());
            }
        }
        this.turnNumber = Math.floor(Math.random()*this.players.length)
        this.turn = this.players[this.turnNumber]['name']
        this.topCard = this.deck.draw();
        if (this.topCard['color'] === "W") {
            this.pickingColor = true;
        }
    }

    playAgain() {
        this.gameView = 1
        this.someoneIsUnoable = false;
        this.youGotUnoed = false;

        this.gotUnoed = ''
        this.winner = null;
        this.forceUnoDraw = 0;
        this.forceDraw = 0;
        this.forcing = false;
        this.deckNumber = 1
        this.rotation = 1

        this.deck = new UnoDeck(0)
        this.deck.deckShuffle()
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].resetPlayer();
            for (let j = 0; j < 7; j++){
                this.players[i].addCard(this.deck.draw());
            }
        }
        this.turnNumber = Math.floor(Math.random()*this.players.length)
        this.turn = this.players[this.turnNumber]['name']
        this.topCard = this.deck.draw();
        if (this.topCard['color'] === "W") {
            this.pickingColor = true;
        }
    }
}

module.exports = UnoGame
