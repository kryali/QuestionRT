app.get('/login', function(req, res){
  res.render('login', {
    locals: {
      title: 'Login'
    }
  });
});

app.post('/login', function(req,res, next){
  res.writeHead('200');
  console.log(req.body['username'] + ":" + req.body['password']);
  if(req.body['username'] != 'kiran' && req.body['password'] != 'ryali'){
    next(new Error("Authentication incorrect!"));
  }
  else{
    req.session.user = [1,3]; 
    res.end("Logged you in dawg");
  }
});
