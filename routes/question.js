  // Routes
  app.get('/',  isLoggedIn, function(req, res){
    time = new Date();
    res.render('index', {
      locals: {
        title: 'Questions',
        questions: app.questions,
        user: req.session.user
      }
    });
  });

  app.post('/ask', isLoggedIn, function(req, res, next){
    time = new Date();
    var newQuestion = {title: req.body['question'], time: time.getTime(), vote:1};
    questions.push(newQuestion);
    io.broadcast({message:'question_add', 'new': newQuestion});
    //res.redirect('home');
  });

  app.get('/404', function(req, res){
    res.render('404', {
      locals: {
        title: '404'
      }
    });
  });
