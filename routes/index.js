var express = require('express');
var router = express.Router();

var matchData = require("../public/json/matches.json");
var songData = require("../public/json/songs.json");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('loginview');
});

router.get('/login', function(req, res, next) {
    res.render('loginview');
});

router.get('/emailsignup', function(req, res, next) {
    res.render('emailsignup');
});

router.get('/onboarding', function(req, res, next) {
    res.render('onboarding');
});

router.get('/genreselection', function(req, res, next) {
    res.render('genrescreen');
});

router.get('/loading', function(req, res, next) {
    res.render('loadingscreen');
});

router.get('/matchlist', function(req, res, next) {
    res.render('matchlist', matchData );
});

router.get('/settings', function(req, res, next) {
    res.render('settings');
});

router.get('/songs/:userId', function(req, res, next) {
    var userId = req.params.userId;
    var usersSongs = [];
    for (i = 0; i< songData.length; i++) {
        var song = songData[i];
        if(song['userid'] == userId)
        {
            usersSongs.push(song);
        }
    }

    res.render('partials/songlist', {layout: false, songs: usersSongs});
});

router.get('/chat', function(req, res, next) {
    res.render('chat');
});

module.exports = router;
