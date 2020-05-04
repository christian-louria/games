class TicTacToeGame {
    constructor(obj) {
        if (typeof obj === "string") {
            this.turn = ""
            this.winner = null
            this.x = obj
            this.o = ""
            this.gameBoard = ["", "", "", "", "", "", "", "", ""]
            this.winningLine = ""
        } else {
            this.turn = obj.turn
            this.winner = obj.winner
            this.x = obj.x
            this.o = obj.o
            this.gameBoard = obj.gameBoard
            this.winningLine = obj.winningLine

        }
    };

    getStarter() {
        this.turn = ((Math.random() < .5) ?  this.x : this.o)
    }

    checkSpaces(char) {
        if (this.gameBoard["0"] === char &&
            this.gameBoard["3"] === char &&
            this.gameBoard["6"] === char) {
            this.turn = "::END::";
            this.winningLine = 0;

        } else if (this.gameBoard["1"] === char &&
            this.gameBoard["4"] === char &&
            this.gameBoard["7"] === char) {
            this.turn = "::END::";
            this.winningLine = 1;

        } else if (this.gameBoard["2"] === char &&
            this.gameBoard["5"] === char &&
            this.gameBoard["8"] === char) {
            this.turn = "::END::";
            this.winningLine = 2;

        } else if (this.gameBoard["0"] === char &&
            this.gameBoard["1"] === char &&
            this.gameBoard["2"] === char) {
            this.turn = "::END::";
            this.winningLine = 3;

        } else if (this.gameBoard["3"] === char &&
            this.gameBoard["4"] === char &&
            this.gameBoard["5"] === char) {
            this.turn = "::END::";
            this.winningLine = 4;

        } else if (this.gameBoard["6"] === char &&
            this.gameBoard["7"] === char &&
            this.gameBoard["8"] === char) {
            this.turn = "::END::";
            this.winningLine = 5;

        } else if (this.gameBoard["0"] === char &&
            this.gameBoard["4"] === char &&
            this.gameBoard["8"] === char) {
            this.turn = "::END::";
            this.winningLine = 6;

        } else if (this.gameBoard["2"] === char &&
            this.gameBoard["4"] === char &&
            this.gameBoard["6"] === char) {
            this.turn = "::END::";
            this.winningLine = 7;
        }

        if (this.turn === "::END::"){
            if (char === "x") {
                this.winner = this.x;
            } else {
                this.winner = this.o;
            }
        }
    }

    checkFull() {
        let full = true;
        for (let i = 0; i < 9; i++) {
            if (this.gameBoard[i] === ""){
                full = false;
            }
        }
        if (full) {
            this.turn = "::END::";
            this.winner = "::FULL::"
        }
    }

    winCheck() {
        this.checkSpaces("x");
        this.checkSpaces("o");
        this.checkFull();
    }

    resetGame() {
        this.getStarter();
        this.winningLine = null;
        this.winner = null;
        this.gameBoard = ["", "", "", "", "", "", "", "", ""];
    }

}

module.exports = TicTacToeGame
