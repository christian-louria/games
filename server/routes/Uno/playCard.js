var cache = require('memory-cache');
const UnoGame = require("../../model/UnoGame")

function playCard (socket, io, data) {
    let newData = {"data":"info"}
    let gameName = data['gameName']
    let initializer = cache.get("initializer")
    let unoGames = initializer.uno["games"];
    let updatedGame = new UnoGame(unoGames[gameName])

    if (updatedGame.playCard(data)) {
        newData['game'] = updatedGame;
        unoGames[gameName] = updatedGame
        initializer.uno["games"] = unoGames;
        cache.put('initializer', initializer);

        io.to(gameName).emit('uno', newData);
    } else{
        socket.emit('unoMoveBack', data);
    }

    if (updatedGame['winner'] !== null) {
        let message = "";
        for (let i = 0; i < updatedGame['players'].length; i++) {
            message += updatedGame['players'][i]['name'] + ": " + updatedGame['players'][i]['score'] + "\n"
        }

        newData['message'] = {"userName" : "Server", "messageContent" : message}
        io.to(gameName).emit('unoChat', newData);
    }


}

module.exports = playCard
