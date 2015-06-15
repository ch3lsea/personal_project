var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var Schema = require('../models/schema');

/* GET posts listing. */
router.get('/', function(req, res, next) {
  Schema.find(function(err, posts) {
    res.json(posts);
  });
});

router.post("/", function(req,res,next){
  console.log("The post function works...? " + req.body);
  //check auth
  Schema.create(req.body, function(err, bPost){
    res.json(bPost);
  })
});

router.delete('/:id', function(req, res, next) {
  console.log("Delete button route hit");
  bPost.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;