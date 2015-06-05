var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

router.post('/', passport.authenticate('local'), function(req, res) {
    res.send(req.user);
});

router.get('/loggedin', function(req, res) {
    console.log('checking log in');
    res.send(req.isAuthenticated() ? req.user : '0');
});

router.post('/logout', function(req, res) {
    req.logout();
    res.send(req.isAuthenticated() ? req.user : '0');
});

module.exports = router;
