var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var mongoose = require('mongoose');
var schema = require('./models/schema');

var routes = require('./routes/index');
var posts = require('./routes/posts');
var login = require('./routes/login');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'stuff',
  resave: true,
  saveUninitialized: false
}));

//===========================================================
//Passport set up

app.use(passport.initialize());
app.use(passport.session());

var globalAdmin = { id: 1234, name: 'admin'};

passport.serializeUser(function(user, done) {
  return done(null, user.name);
});

passport.deserializeUser(function(id, done) {
  return done(null, globalAdmin);
});

passport.use('local',new LocalStrategy(
    function(username, password, done) {
      if (username === "admin" && password === "admin")
        return done(null, globalAdmin);

      return done(null, false, { message: 'Incorrect username.' });
    }
));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next) {
      if (!req.isAuthenticated()){
        console.log('no auth', req.isAuthenticated());
        next();}
      else {
        console.log(path.join(__dirname, 'private'));
        express.static(path.join(__dirname, 'private'));
        next();
      }
    }
);

//===========================================================
//MongoDB Set-up
var mongoURI = "mongodb://localhost:27017/personal_project";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
  console.log('mongodb connection error', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open');
});

app.use('/', routes);
app.use('/posts', posts);
app.use('/login', login);

//===========================================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('404:', req.url);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//===========================================================
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    next(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  next(err);
});
//===========================================================

module.exports = app;
