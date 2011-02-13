
/**
 * Module dependencies.
 */

var fs = require('fs');
var io = require('socket.io');
var express = require('express');
var app = module.exports = express.createServer();
var RedisStore = require('connect-redis');

// Connect to the redis server
var client = require("redis").createClient();

var questions = [];

var time = new Date();
questions.push({title:"What is the meaning of life?", time: time.getTime(), vote: 1});
questions.push({title:"What room is your computer in?", time: time.getTime(), vote: 1});

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.cookieDecoder());
  app.use(express.session({ secret: 'this is a secret'}));
  //app.use(express.session({ store: new RedisStore , secret: 'this is a secret'}));
  app.use(express.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  var questionList = client.get( 'Questions' );
  time = new Date();
  res.render('index', {
    locals: {
      title: 'Questions',
      questions: questions 
    }
  });
});

app.post('/ask', function(req, res){
  //client.set( time.getTime(), req.body['question-title']);
  console.log( req.body['question-title']);
  time = new Date();
  var newQuestion = {title: req.body['question-title'], time:time.getTime(), vote: 1 };
  questions.push(newQuestion);
  io.broadcast({message:'question_add', 'new': newQuestion});
  res.render('index', {
    locals: {
      title: 'Questions',
      questions: questions 
    }
  });
});

app.get('/404', function(req, res){
  res.render('404', {
    locals: {
      title: '404'
    }
  });
});



// Only listen on $ node app.js
if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port)
}

io = io.listen(app);
io.on('connection', function(client){
});
