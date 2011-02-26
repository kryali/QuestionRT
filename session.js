var express = require('express'),
    server = express.createServer();
server.use(express.logger());
server.use(express.bodyDecoder());
server.use(express.cookieDecoder());
server.use(express.session( { secret:'mySecret' } ));
server.use(server.router);

server.get('/', function(req, res){
  if (!req.session.user) {
    req.session.user = 'none';
  }
  res.send(req.session.user);
});

server.get('/login', function(req, res){
  res.send('<form method="post"><input type="text" name="user"/></form>')
})

server.post('/login', function( req, res ){
  req.session.regenerate(function() {
    req.session.user = req.body.user;
    res.redirect('home');
  });
});

server.listen(3000);
