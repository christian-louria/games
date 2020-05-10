var cache = require('memory-cache');
const UnoGame = require("../../model/UnoGame")

function startGame (socket, io, data) {
    let newData = {"data":"info"}
    let gameName = data['gameName']
    let initializer = cache.get("initializer")
    let unoGames = initializer.uno["games"];
    let updatedGame = new UnoGame(unoGames[gameName])


    updatedGame.startGame()


    newData['game'] = updatedGame;
    unoGames[gameName] = updatedGame
    initializer.uno["games"] = unoGames;
    cache.put('initializer', initializer);

    io.to(gameName).emit('uno', newData);

}

module.exports = startGame
