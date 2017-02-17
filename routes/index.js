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

router.get('/genreselection', function(req, res, next) {
    res.render('genrescreen');
});


router.get('/matchlist', function(req, res, next) {
    res.render('matchlist', { title: 'matchlist' });
});

module.exports = router;
