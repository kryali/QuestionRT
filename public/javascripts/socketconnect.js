
  var socket = new io.Socket(null, { port: 3000, rememberTransport: false});
  socket.connect();

  socket.on('message', function(obj){
    if( obj['message'] == "question_add"){
        var newQuestion = obj['new'];
        var listItem = document.createElement('li');
        var question = document.createElement('h1');
        var question_time = document.createElement('span');
        question.innerHTML = newQuestion['title'];
        question.className = "title";
        question_time.innerHTML = newQuestion['time'];
        question_time.className = "time";
        listItem.appendChild(question);
        listItem.appendChild(question_time);
        document.getElementById('questions').appendChild(listItem);
    }else{
      alert("bad message");
    }
  });

  function addQuestion(){

  }
