const UnoGame = require("../../model/UnoGame")
var cache = require('memory-cache');

function unoCreate (socket, io, data) {
    let gameName = data['gameName']
    let initializer = cache.get("initializer")
    let unoGames = initializer.uno["games"];
    if (!(gameName in unoGames)) {
        let updatedGame = new UnoGame(gameName)

        updatedGame.host = data['userName'];
        updatedGame.addPlayer(data['userName'])
        unoGames[gameName] = updatedGame;

        initializer.uno["games"] = unoGames;
        cache.put('initializer', initializer);
        socket.emit('unoCreate', "created")
        socket.join(gameName);
    } else {

    }
}

module.exports = unoCreate
