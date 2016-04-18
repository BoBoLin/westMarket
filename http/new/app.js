var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var fs = require('fs');
var querystring = require('querystring');
var port = parseInt(fs.readFileSync('./port'));

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('index.html');
});

app.get('/ID', function(req, res) {
  var studentID = req.query.student;
  var name = JSON.parse(fs.readFileSync('./public/name.json', 'utf8'));

  name = (typeof name[studentID] === 'undefined') ? '沒有此學號，請再輸入一次' : name[studentID] ;

  res.header('content-type','text/html');
  res.header('charset','utf-8');
  
  res.send(name);

  res.end();
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});