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
