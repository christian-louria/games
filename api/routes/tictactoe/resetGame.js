var express = require('express');
var router = express();
var cache = require('memory-cache');
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data


router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const Initializer = require('../../model/Initializer');
const TicTakToeGame = require('../../model/TicTacToeGame');


router.post('/', upload.array(), function(req, res) {
    let response;
    let gameReqName = req.body.game;
    let initializer = cache.get("initializer")
    let privateGames = initializer.ticTakToe["privateGames"];

    let gameInfo = privateGames[gameReqName];
    let updatedGame = new TicTakToeGame(gameInfo["game"]);

    updatedGame.resetGame();

    privateGames[gameReqName].game = updatedGame;
    initializer.ticTakToe["privateGames"] = privateGames;
    cache.put('initializer', initializer);

    res.json({"body" : "Done"});

});

module.exports = router;
