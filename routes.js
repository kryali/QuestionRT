exports.setRoutes = function(app){

  // Routes
  app.get('/test', function(req, res){
    console.log("Testing getter");
    res.writeHead('200');
    res.end("Hello World");
  });
  app.get('/', function(req, res){
    var questionList = app.client.get( 'Questions' );
    time = new Date();
    res.render('index', {
      locals: {
        title: 'Questions',
        questions: app.questions
      }
    });
  });

  app.post('/ask/:question', function(req, res){
    //client.set( time.getTime(), req.body['question-title']);
    console.log( req.params );
    time = new Date();
    var newQuestion = {title: req.body['question-title'], time:time.getTime(), vote: 1 };
    questions.push(newQuestion);
    io.broadcast({message:'question_add', 'new': newQuestion});
    res.render('index', {
      locals: {
        title: 'Questions',
        questions: questions
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

};
