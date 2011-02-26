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
  if(req.body['username'] != 'kiran')
    next(new Error("Authentication incorrect!"));
  else
    res.end("Logged you in dawg");
});
