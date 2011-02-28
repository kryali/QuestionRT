app.get('/login', function(req, res){
  res.render('login', {
    locals: {
      title: 'Login'
    }
  });
});

app.post('/login', function(req,res, next){
  client.get(req.body['username'] + ":uid", function( e, uid){
    if( !uid ){
      res.writeHead(200);
      res.end("Bad username!");
      return;
    }

    client.get("uid:" + uid + ":password", function( e, hash){
      if( !hash || (md5(req.body['password']) != hash) ){
        res.writeHead(200);
        res.end("Bad username!");
        return;
      } else {
        req.session.user = { 'username':req.body['username'], 'uid':uid};
        console.log("\n Setting user in session \n");
        res.redirect('home');
      }
    });
  });
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
      client.set(req.body['username'] + ":uid", id);
      client.incr("global:uid");
      req.session.user = {'username': req.body['username'], 'id' : id };
      res.redirect('home');
    }
    else{
      next(new Error("Couldn't get id"));
    }
  });
});
