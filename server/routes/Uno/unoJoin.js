var cache = require('memory-cache');
const UnoGame = require("../../model/UnoGame")

function unoJoin (socket, io, data) {
    let newData = {"data":"info"}
    let gameName = data['gameName']
    let initializer = cache.get("initializer")
    let unoGames = initializer.uno["games"];
    if ((gameName in unoGames)) {
        let updatedGame = new UnoGame(unoGames[gameName])

        updatedGame.addPlayer(data['playerName'])
        unoGames[gameName] = updatedGame

        newData['game'] = updatedGame;
        initializer.uno["games"] = unoGames;
        cache.put('initializer', initializer);
        socket.join(gameName);
        socket.emit('unoJoinResp', newData);
        io.to(gameName).emit('uno', newData);

    } else {
        newData['res'] = "error"
        socket.emit('unoJoinResp', newData);
    }
}

module.exports = unoJoin
