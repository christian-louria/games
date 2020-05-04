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
    let gameReqName = req.body.game;
    let user = req.body.user;
    if (cache.get('initialized') === null) {
        const temp = new Initializer();

        cache.put('initializer', temp);
        cache.put("initialized", true);
    }
    let status;
    let initializer = cache.get("initializer")
    let privateGames = initializer.ticTakToe["privateGames"];
    if (!(gameReqName in privateGames)) {
        status = "Success"
        privateGames[gameReqName] = {
            "ready" : false,
            "game" : new TicTakToeGame(user)
        }

        initializer.ticTakToe["privateGames"] = privateGames;
        cache.put('initializer', initializer);
    } else {
        status = "Game name is taken";
    }

    res.json({"res" : status});
});

module.exports = router;
