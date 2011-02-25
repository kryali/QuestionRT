
/**
 * Module dependencies.
 */
fs = require('fs');
io = require('socket.io');
express = require('express');
app = express.createServer();
RedisStore = require('connect-redis');

// Global Helpers
require('./globalfn.js');

// Configuration 
require('./config');

// Routes
require('./routes');


// Only listen on $ node app.js
if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}

io = io.listen(app);
io.on('connection', function(client){});
