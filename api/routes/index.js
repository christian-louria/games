var express = require('express');
var router = express.Router();
var cache = require('memory-cache');

/* GET home page. */
router.get('/', function(req, res, next) {
  // if (cache.get('players') === null) {
  //   cache.put('players', []);
  //   cache.put("playerNum", 1)
  // }
  // let playerList = cache.get("players");
  //
  // const person = new Person(cache.get("playerNum"));
  // playerList.push(person);
  //
  // cache.put('players', playerList);

  res.json({"playerList": "playerList"});
});

module.exports = router;
