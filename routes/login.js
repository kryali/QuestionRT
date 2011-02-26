app.get('/login', function(req, res){
  res.render('login', {
    locals: {
      title: 'Login'
    }
  });
});

app.post('/login', function(req,res, next){
  console.log(req.body['username'] + ":" + req.body['password']);
  if(req.body['username'] != 'kiran' && req.body['password'] != 'ryali'){
    next(new Error("Authentication incorrect!"));
  }
  else{
    req.session.regenerate(function(){
      req.session.user = req.body['username'];
      console.log("\n Setting user in session \n");
      console.log(req.session);
      res.redirect('home');
    });
  }
});

app.get('/signup', function(req, res){
  res.render('signup', {
    locals: {
      title: 'Sign Up'
    }
  });
});

// Create a new user account and add it to the database
app.post('/signup', function(req, res, next){

  // Get a fresh uid from the database
  client.get("global:uid", function( err, id){
    if( id != null){
      client.set("uid:"+id+":username", req.body['username']);
      client.set("uid:"+id+":password", md5(req.body['password']));
      client.set("username:uid", id);
      client.incr("global:uid");
      req.session.user = id;
      res.redirect('home');
    }
    else{
      next(new Error("Couldn't get id"));
    }
  });
});
