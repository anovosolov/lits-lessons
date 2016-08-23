/* ------------------- Simple example --------------------- */
var User = function (name){
  this.sayHello = function(){
    console.log("Hello, " + name);
  }
};

var olia = new User("Olia");
olia.sayHello();


/* ------------------- Requiring modules --------------------- */
/*var user = require("./user.js");

var olia = new user.User("Olia");
olia.sayHello();
user.welcome();*/

/* ------------------- Simple http server --------------------- */
/*var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
}).listen(3000);

console.log('Server running on port 3000.');*/


/* ------------------- Simple express server --------------------- */
// to install express run > node install express

/*var express = require('express'),
    app = express();

app.listen(3000);
console.log('Server running on port 3000.');

app.get('/', function(req, res){
  res.send('hello world!');
});

app.get('/comments', function(req, res){
  var data = {
    id: 0,
    name: "Khrysytna",
    email: "example@example.com",
    message: "Bla bla bla"
  };

  res.json(data);
});

app.get('/comments/:id', function(req, res){
  res.send('Comment  ' + req.params.id);
});

app.post('/comments/', function(req, res){
  res.send('Comment was posted ' + req.body);
});*/



/* ------------------- Lets create own json-server --------------------- */
/*
var express = require('express');

// Якщо ви хочете обробляти POST запити, то вашій аплікації необхідно використовувати спеціальний middleware - bodyParser
// Підключається він дуже легко, а саме через app.use()
// BodyParser обробляє тіла запиту і записує оброблені дані в req.body
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var path = require('path');
var fs = require('fs');



/!* ------------------- Configuration --------------------- *!/
var app = express();
app.use(express.static('public')); // все, що лежить в цій папці буде досупно по запиту localhost:3000/!***,
                                   // де *** - шлях до файлу, який ми хочемо побачити

app.use(bodyParser.json()); // вказує, що слід обробляти запити типу application/json
app.use(methodOverride('X-HTTP-Method-Override')); // support for PUT and DELETE

var DB_FILE = path.join(__dirname, 'db.json');

/!* ------------------- Listen to localhost:3000 --------------------- *!/
app.listen(3000, function () {
 console.log('Server running on port 3000.');
});


/!* ------------------- Route handling --------------------- *!/
app.get('/comments', function(req, res) {
  fs.readFile(DB_FILE, function(err, data) {
    if (err) {
      console.error(err);
    }
    res.json(JSON.parse(data));
  });
});


app.post('/comments', function(req, res) {
  fs.readFile(DB_FILE, function(err, data) {
    if (err) {
      console.error(err);
    }

    var comments = JSON.parse(data),
        comment = {
          id: Date.now(),
          name: req.body.name,
          email: req.body.email,
          message: req.body.message
        };
    comments.push(comment);

    fs.writeFile(DB_FILE, JSON.stringify(comments), function(err) {
      if (err) {
        console.error(err);
      }
      res.json(comment);
    });
  });
});

app.get('/comments/:id', function(req, res) {
  res.send('This is not implemented now');
});

app.put('/comments/:id', function (req, res){
  res.send('This is not implemented now');
});

app.delete('/comments/:id', function (req, res){
  res.send('This is not implemented now');
});
*/

