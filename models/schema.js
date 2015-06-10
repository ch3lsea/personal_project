var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: String,
    content: {type: String, required: true},
    date: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('blogPosts', schema);