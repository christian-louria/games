var cache = require('memory-cache');
const UnoGame = require("../../model/UnoGame")

function playCard (socket, io, data) {
    let newData = {"data":"info"}
    let gameName = data['gameName']
    let initializer = cache.get("initializer")
    let unoGames = initializer.uno["games"];
    let updatedGame = new UnoGame(unoGames[gameName])


    let res = updatedGame.playCard(data)

    if (res === 0) {
        socket.emit('unoMoveBack', data);
    } else if (res === 1) {
        newData['game'] = updatedGame;
        unoGames[gameName] = updatedGame
        initializer.uno["games"] = unoGames;
        cache.put('initializer', initializer);

        io.to(gameName).emit('uno', newData);
    } else {

        setTimeout(function(){
            updatedGame.setUnoable(data);
            newData['game'] = updatedGame;
            unoGames[gameName] = updatedGame
            initializer.uno["games"] = unoGames;
            cache.put('initializer', initializer);
            io.to(gameName).emit('uno', newData);
        }, 1000);

        newData['game'] = updatedGame;
        unoGames[gameName] = updatedGame
        initializer.uno["games"] = unoGames;
        cache.put('initializer', initializer);

        io.to(gameName).emit('uno', newData);
    }
}

module.exports = playCard
