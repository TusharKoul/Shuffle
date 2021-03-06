var express = require('express');
var router = express.Router();

var matchData = require("../public/json/matches.json");
var songFileName = "../public/json/songs.json";
var songData = require(songFileName);

var fs = require('fs');

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
    res.render('selectgenres');
});

router.get('/genreselection_A', function(req, res, next) {
    res.render('selectgenres');
});

router.get('/genreselection_B', function(req, res, next) {
    res.render('selectgenresB');
});

router.get('/loading', function(req, res, next) {
    res.render('loadingscreen');
});

router.get('/matchlist', function(req, res, next) {
    res.render('matchlist', matchData );
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


router.get('/support', function(req, res, next) {
   res.render('Support');
});

router.get('/chat', function(req, res, next) {
    res.render('chat');
});


router.get('/home', function(req, res, next) {
    res.render('home');
});

router.get('/songsjson/:userId', function(req, res, next) {
    var userId = req.params.userId;
    var usersSongs = [];
    for (i = 0; i< songData.length; i++) {
        var song = songData[i];
        if(song['userid'] == userId)
        {
            usersSongs.push(song);
        }
    }

    res.json(usersSongs);
});

router.put('/togglelike', function(req, res, next) {
    var songid = req.body.songid;
    var liked = req.body.liked;

    var songFileName = "./public/json/songs.json";

    songData[songid-1].liked = parseInt(liked);


    fs.writeFile(songFileName, JSON.stringify(songData, null, 2), function (err) {
        if (err) return console.log(err);
        console.log(songData[songid]);
    });


    res.json({"success":"1"});
});
module.exports = router;
