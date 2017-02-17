var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('loginview', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
    res.render('loginview', { title: 'Express' });
});

router.get('/matchlist', function(req, res, next) {
    res.render('matchlist', { title: 'matchlist' });
});

module.exports = router;
