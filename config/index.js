
require('./init.js');

// Configuration

app.configure(function(){
//  app.set('views', __dirname + '/views');
  app.set('views', __dirname + '/../views');
  console.log( __dirname );
  app.set('view engine', 'jade');
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.cookieDecoder());
  app.use(express.session({ secret: 'this is a secret'}));
  //app.use(express.session({ store: new RedisStore , secret: 'this is a secret'}));
  app.use(express.staticProvider(__dirname + '/../'+ '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


