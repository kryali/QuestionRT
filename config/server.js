// Configuration

app.configure(function(){
//  app.set('views', __dirname + '/views');
  app.set('views', __dirname + '/../views');
  console.log( __dirname );
  app.set('view engine', 'jade');
  app.use(express.logger());
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(express.cookieDecoder());
  app.use(express.session({ secret: 'secret'}));
  //app.use(express.session({ store: new RedisStore , secret: 'this is a secret'}));
  app.use(express.staticProvider(__dirname + '/../'+ '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.get('/test', function(req, res){
  if (!req.session.user) {
    req.session.user = 'none';
  }
  res.send(req.session.user);
});

app.get('/test/login', function(req, res){
  res.send('<form method="post"><input type="text" name="user"/></form>')
})

app.post('/test/login', function( req, res ){
  req.session.regenerate(function() {
    req.session.user = req.body.user;
    res.redirect('home');
  });
});

