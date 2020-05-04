var express = require('express');
var router = express();
var cache = require('memory-cache');
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data

router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const TicTakToeGame = require('../../model/TicTacToeGame');

router.post('/', upload.array(), function(req, res) {
    let response;
    let gameReqName = req.body.game;
    let userReqName = req.body.user;
    let initializer = cache.get("initializer")
    let privateGames = initializer.ticTakToe["privateGames"];

    let gameInfo = privateGames[gameReqName];
    let updatedGame = new TicTakToeGame(gameInfo["game"]);
    let xPlayer = updatedGame.x;
    let oPlayer = updatedGame.o;

    if (updatedGame.o === '' || updatedGame.x === ''){
        delete privateGames[gameReqName];
    } else {
        if (updatedGame.x === userReqName) {
            updatedGame = new TicTakToeGame(oPlayer);
        } else {
            updatedGame = new TicTakToeGame(xPlayer);
        }
        gameInfo.ready = false;
        gameInfo.game = updatedGame;
        privateGames[gameReqName] = gameInfo;
    }
    initializer.ticTakToe["privateGames"] = privateGames;
    cache.put('initializer', initializer);

    res.json({"body" : "Done"});
});

module.exports = router;
