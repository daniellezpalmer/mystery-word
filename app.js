const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session')
const expressValidator = require('express-validator');
const app = express();

const wordsArray = require('./words')
console.log(wordsArray)

let randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
console.log(randomWord)

let blanks = randomWord.replace(/[a-z]/gi, '_ ')
console.log(blanks);

// guessLetter(){
//
// }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.get('/', function(req, res) {
  req.session.blanks = blanks;
  res.render('game', req.session);
})

app.post('/', function(req, res){
  console.log(req.body.guesses);
  if (!req.session.letters){
    req.session.letters = [];
  }
  req.session.letters.push(req.body.guesses);
  res.redirect('/');
})

app.listen(3000, function() {
  console.log('Successfully started express application!');
})
