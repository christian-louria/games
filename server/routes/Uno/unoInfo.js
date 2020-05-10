var cache = require('memory-cache');
const UnoGame = require("../../model/UnoGame")

function unoInfo (socket, io, data) {
    let newData = {}
    let gameName = data['gameName']
    let initializer = cache.get("initializer")
    let unoGames = initializer.uno["games"];

    newData['game'] = new UnoGame(unoGames[gameName]);
    newData['data'] = "info";
    socket.emit('uno', newData);
}

module.exports = unoInfo
