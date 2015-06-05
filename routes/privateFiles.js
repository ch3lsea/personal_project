var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/*', function(req,res,next){
    if (req.isAuthenticated()) {
        var file = req.params[0];

        res.sendFile(path.join(__dirname, '../private', file));
    }else{
        res.sendStatus(404);
    }
});

module.exports = router;