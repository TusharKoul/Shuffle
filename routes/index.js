var express = require('express');
var router = express.Router();

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
    res.render('matchlist', { title: 'matchlist' });
});

module.exports = router;
