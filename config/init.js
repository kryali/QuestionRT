client = app.client = require("redis").createClient();
questions = app.questions = [];

var time = new Date();
questions.push({title:"What is the meaning of life?", time: time.getTime(), vote: 1});
questions.push({title:"What room is your computer in?", time: time.getTime(), vote: 1});
