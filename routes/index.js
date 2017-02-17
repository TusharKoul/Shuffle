var express = require('express');
var router = express.Router();

var data = require("../public/json/matches.json");
console.log(data);
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
    res.render('matchlist', data);
});

router.get('/settings', function(req, res, next) {
    res.render('settings');
});


module.exports = router;
