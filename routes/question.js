  // Routes
  app.get('/',  isLoggedIn, function(req, res){
    time = new Date();
    client.get("questions", function(err, reply){
      res.render('index', {
        locals: {
          title: 'Questions',
          questions: reply,
          user: req.session.user['username']
        }
      });
    });
  });

  app.post('/ask', isLoggedIn, function(req, res, next){
    time = new Date();
    var newQuestion = {title: req.body['question'], 
                      time: time.getTime(), 
                      uid: req.session.user['uid'],
                      vote:1};
    //client.lpush("questions", newQuestion);
    io.broadcast({message:'question_add', 'new': newQuestion});
    res.redirect('home');
  });

  app.get('/404', function(req, res){
    res.render('404', {
      locals: {
        title: '404'
      }
    });
  });
