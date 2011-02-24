  // Routes
  app.get('/', function(req, res){
    time = new Date();
    res.render('index', {
      locals: {
        title: 'Questions',
        questions: app.questions
      }
    });
  });

  app.post('/ask', function(req, res, next){
    time = new Date();
    var newQuestion = {title: 'test', time: time.getTime(), vote:1};
    questions.push(newQuestion);
    io.broadcast({message:'question_add', 'new': newQuestion});
    res.render('index', {
      locals: {
        title: 'Questions',
        questions: app.questions
      }
    });
  });

  app.get('/404', function(req, res){
    res.render('404', {
      locals: {
        title: '404'
      }
    });
  });
