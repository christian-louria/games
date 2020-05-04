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
    let user = req.body.user;
    let gameReqName = req.body.game;
    if (cache.get('initialized') === null) {
        const temp = new Initializer();

        cache.put('initializer', temp);
        cache.put("initialized", true);
    }
    let initializer = cache.get("initializer")
    let privateGames = initializer.ticTakToe["privateGames"];
    let status;
    if ((gameReqName in privateGames)) {
        let gameInfo = privateGames[gameReqName]
        if (gameInfo.ready === false) {
            gameInfo.ready = true;
            let game = gameInfo.game
            let updatedGame = new TicTakToeGame(game);
            status = "Success"
            if (updatedGame.o === '') {
                updatedGame.o = user;
            } else {
                updatedGame.x = user;
            }
            updatedGame.getStarter();
            privateGames[gameReqName].game = updatedGame;
            initializer.ticTakToe["privateGames"] = privateGames;
            cache.put('initializer', initializer);
        } else {
            status = "Game full"
        }
    } else {
        status = "Game not found"
    }

    res.json({"res" : status});
});

module.exports = router;
