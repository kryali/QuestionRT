
/**
 * Module dependencies.
 */
 var fs = require('fs');

var express = require('express');

var app = module.exports = express.createServer();


// Connect to the redis server
var client = require("redis").createClient();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(app.router);
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
  res.render('index', {
    locals: {
      title: 'Questions'
    }
  });
});

app.post('/ask', function(req, res){
// (req.body['question-title']);
  time = new Date();
  console.log(time.getTime());
  client.set( time.getTime(), req.body['question-title']);
  res.render('404', {
    locals: {
      title: '404'
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
