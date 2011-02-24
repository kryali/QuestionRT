
/**
 * Module dependencies.
 */

fs = require('fs');
io = require('socket.io');
express = require('express');
app = express.createServer();
RedisStore = require('connect-redis');

// Connect to the redis server
//client = app.client = require("redis").createClient();
questions = app.questions = [];


var time = new Date();
questions.push({title:"What is the meaning of life?", time: time.getTime(), vote: 1});
questions.push({title:"What room is your computer in?", time: time.getTime(), vote: 1});

require('./config');
require('./routes');


// Only listen on $ node app.js
if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}

io = io.listen(app);
io.on('connection', function(client){
});
